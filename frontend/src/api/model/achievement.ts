/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * DH - Piskotki
 * API for DH - Piskotki
 * OpenAPI spec version: 1.0
 */
import type { User } from './user';

export interface Achievement {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  points: number;
  User?: User;
  userId?: string;
}
