import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BookReservation } from 'src/_gen/prisma-class/book_reservation';
import { Book } from 'src/_gen/prisma-class/book';

@Controller('borrow')
@ApiTags('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('reserve/:bookId')
  @ApiOperation({
    summary: 'Tries to reserve the book',
  })
  @ApiParam({
    name: 'bookId',
    type: String,
    description: 'id of the book to reserve',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Reservation created',
    type: BookReservation,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  @ApiBadRequestResponse({
    description: 'Book already borrowed',
  })
  reserve(
    @CurrentUser() { userId }: ExtractedUAT,
    @Param('bookId') bookId: string,
  ) {
    return this.borrowService.reserve(userId, bookId);
  }

  @Get('reservations/book/:bookId')
  @ApiOperation({
    summary:
      'Returns all reservations including the book and book availability',
  })
  @ApiParam({
    name: 'bookId',
    type: String,
    description: 'id of the book',
    required: true,
  })
  @ApiOkResponse({
    description: 'All reservations',
    type: [BookReservation],
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  getBookReservations(@Param('bookId') bookId: string) {
    return this.borrowService.getBookReservations(bookId);
  }

  @Get('reservations/owner/:userId')
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'id of the user',
    required: true,
  })
  @ApiOperation({
    summary:
      'Returns all reservations for books owned by userId and book availability',
  })
  @ApiOkResponse({
    description: 'All reservations',
    type: [BookReservation],
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  getOwnerReservations(@Param('userId') userId: string) {
    return this.borrowService.getOwnerReservations(userId);
  }

  @Get('reservations/user/:userId')
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'id of the user',
    required: true,
  })
  @ApiOperation({
    summary: 'Returns all resrvations made by userId and book availability',
  })
  @ApiOkResponse({
    description: 'All reservations',
    type: [BookReservation],
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  getUserReservations(@Param('userId') userId: string) {
    return this.borrowService.getUserReservations(userId);
  }

  @Put('reservations/accept/:reservationId')
  @ApiParam({
    name: 'reservationId',
    type: String,
    description: 'id of the reservation',
    required: true,
  })
  @ApiOperation({
    summary: 'Book owner accepts one reservation',
  })
  @ApiOkResponse({
    description: 'OK',
  })
  @ApiNotFoundResponse({
    description: 'Reservation not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not the owner of the book',
  })
  @ApiBadRequestResponse({
    description: 'Book is already borrowed',
  })
  acceptReservation(
    @CurrentUser() { userId }: ExtractedUAT,
    @Param('reservationId') id: string,
  ) {
    return this.borrowService.acceptReservation(userId, id);
  }

  @Put('reservations/return/:bookId')
  @ApiParam({
    name: 'bookId',
    type: String,
    description: 'id of the book',
    required: true,
  })
  @ApiOperation({
    summary: "The owner got the book back, so it's available again",
  })
  @ApiOkResponse({
    description: 'Updated book',
    type: Book,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not the owner of the book',
  })
  @ApiBadRequestResponse({
    description: 'Book is not borrowed',
  })
  returnBook(
    @CurrentUser() { userId }: ExtractedUAT,
    @Param('bookId') bookId: string,
  ) {
    return this.borrowService.returnBook(userId, bookId);
  }

  @Delete('reservations/cancel/:reservationId')
  @ApiParam({
    name: 'reservationId',
    type: String,
    description: 'id of the reservation',
    required: true,
  })
  @ApiOperation({
    summary: 'Cancel reservation',
  })
  @ApiOkResponse({
    description: 'Reservation canceled',
  })
  @ApiNotFoundResponse({
    description: 'Reservation not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not the owner of the book or reservation',
  })
  cancelReservation(
    @CurrentUser() { userId }: ExtractedUAT,
    @Param('reservationId') reservationId: string,
  ) {
    return this.borrowService.cancelReservation(userId, reservationId);
  }
}
