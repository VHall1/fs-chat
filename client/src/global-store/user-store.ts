import { create } from "zustand";

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
