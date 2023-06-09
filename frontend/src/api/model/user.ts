/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * DH - Piskotki
 * API for DH - Piskotki
 * OpenAPI spec version: 1.0
 */
import type { Book } from './book';
import type { Achievement } from './achievement';
import type { UserReview } from './userReview';
import type { BookReservation } from './bookReservation';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  numberOfBooksRead: number;
  ownedBooks: Book[];
  likedBooks: Book[];
  borrowedBooks: Book[];
  friendsTo: User[];
  friendsFrom: User[];
  achievements: Achievement[];
  reviewsProfile: UserReview[];
  reviewsLeft: UserReview[];
  reservations: BookReservation[];
}
