import { Book } from './book';
import { Achievement } from './achievement';
import { UserReview } from './user_review';
import { BookReservation } from './book_reservation';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  firstName: string = 'Ime';

  @ApiProperty({ type: String })
  lastName: string = 'Priimek';

  @ApiProperty({ type: Number })
  numberOfBooksBorrowed: number;

  @ApiProperty({ isArray: true, type: () => Book })
  ownedBooks: Book[];

  @ApiProperty({ isArray: true, type: () => Book })
  borrowedBooks: Book[];

  @ApiProperty({ isArray: true, type: () => User })
  friendsTo: User[];

  @ApiProperty({ isArray: true, type: () => User })
  friendsFrom: User[];

  @ApiProperty({ isArray: true, type: () => Achievement })
  achievements: Achievement[];

  @ApiProperty({ isArray: true, type: () => UserReview })
  reviewsProfile: UserReview[];

  @ApiProperty({ isArray: true, type: () => UserReview })
  reviewsLeft: UserReview[];

  @ApiProperty({ isArray: true, type: () => BookReservation })
  reservations: BookReservation[];
}
