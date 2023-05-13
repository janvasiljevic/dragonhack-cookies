import { User as _User } from './user';
import { UserReview as _UserReview } from './user_review';
import { Book as _Book } from './book';
import { BookReservation as _BookReservation } from './book_reservation';
import { Achievement as _Achievement } from './achievement';

export namespace PrismaModel {
  export class User extends _User {}
  export class UserReview extends _UserReview {}
  export class Book extends _Book {}
  export class BookReservation extends _BookReservation {}
  export class Achievement extends _Achievement {}

  export const extraModels = [
    User,
    UserReview,
    Book,
    BookReservation,
    Achievement,
  ];
}
