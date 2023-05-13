import { User as _User } from './user';
import { UserReview as _UserReview } from './user_review';
import { Book as _Book } from './book';
import { Achievement as _Achievement } from './achievement';

export namespace PrismaModel {
  export class User extends _User {}
  export class UserReview extends _UserReview {}
  export class Book extends _Book {}
  export class Achievement extends _Achievement {}

  export const extraModels = [User, UserReview, Book, Achievement];
}
