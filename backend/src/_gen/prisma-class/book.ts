import { BookReservation } from './book_reservation';
import { User } from './user';
import { BookStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Book {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ enum: BookStatus, enumName: 'BookStatus' })
  status: BookStatus = BookStatus.AVAILABLE;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  author: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  coverUrl: string;

  @ApiProperty({ type: String })
  isbn: string;

  @ApiPropertyOptional({ type: Number })
  price?: number;

  @ApiProperty({ isArray: true, type: () => BookReservation })
  reservations: BookReservation[];

  @ApiProperty({ type: () => User })
  owner: User;

  @ApiProperty({ type: String })
  ownerId: string;

  @ApiPropertyOptional({ type: () => User })
  borrower?: User;

  @ApiPropertyOptional({ type: String })
  borrowerId?: string;

  @ApiPropertyOptional({ type: Date })
  borrowDate?: Date;

  @ApiPropertyOptional({ type: Date })
  returnDate?: Date;

  @ApiProperty({ isArray: true, type: () => User })
  likedBy: User[];
}
