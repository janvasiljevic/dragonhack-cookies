import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookISBNDto } from './dto/create-book-isbn.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Book } from 'src/_gen/prisma-class/book';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('isbn')
  @ApiOperation({
    summary: 'Creates a new book for the logged-in user from ISBN',
  })
  @ApiCreatedResponse({
    description: 'Book created',
    type: Book,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  create(
    @CurrentUser() { userId }: ExtractedUAT,
    @Body() createBookISBNDto: CreateBookISBNDto,
  ) {
    return this.bookService.createFromISBN(userId, createBookISBNDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Returns all books in the DB',
  })
  @ApiOkResponse({
    description: 'All books',
    type: [Book],
  })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id of the book',
    required: true,
  })
  @ApiOperation({
    summary: 'Returns the book with ID',
  })
  @ApiOkResponse({
    description: 'The book',
    type: Book,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id of the book',
    required: true,
  })
  @ApiOperation({
    summary: 'Deletes the book with ID',
  })
  @ApiOkResponse({
    description: 'Deleted book id',
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  remove(@CurrentUser() { userId }: ExtractedUAT, @Param('id') id: string) {
    return this.bookService.remove(userId, id);
  }
}
