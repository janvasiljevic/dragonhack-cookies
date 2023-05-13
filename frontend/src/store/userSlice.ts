import { User } from '@/api/model';
import { StateCreator } from 'zustand';

export interface UserSlice {
  user: User | null;

  setUser: (user: User) => void;
  clearAllUserDatas: () => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  user: null,

  setUser: (user: User) => set({ user }),
  clearAllUserDatas: () => set({ user: null }),
});
