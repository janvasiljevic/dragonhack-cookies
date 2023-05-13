import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [HttpModule]
})
export class BookModule {}
