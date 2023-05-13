import { create } from 'zustand';
import { UserSlice, createUserSlice } from './userSlice';

// Apple sponsored store
export const useAppStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));
