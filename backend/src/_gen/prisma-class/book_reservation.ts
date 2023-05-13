import { Book } from './book';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class BookReservation {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: () => Book })
  book: Book;

  @ApiProperty({ type: String })
  bookId: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: String })
  userId: string;
}
