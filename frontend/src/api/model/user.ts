/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * DH - Piskotki
 * API for DH - Piskotki
 * OpenAPI spec version: 1.0
 */
import type { Book } from './book';
import type { Achievement } from './achievement';
import type { UserReview } from './userReview';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  numberOfBooksBorrowed: number;
  ownedBooks: Book[];
  borrowedBooks: Book[];
  friendsTo: User[];
  friendsFrom: User[];
  achievements: Achievement[];
  reviewsProfile: UserReview[];
  reviewsLeft: UserReview[];
}
