import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
} from '@nestjs/swagger';
import { BookReservation } from 'src/_gen/prisma-class/book_reservation';

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
    summary: 'Returns all userIds that reserved this book',
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

  @Get('reservations/user/:userId')
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'id of the user',
    required: true,
  })
  @ApiOperation({
    summary: 'Returns all reservations for books owned by userId',
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
}
