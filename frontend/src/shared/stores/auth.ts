import { create } from "zustand";

interface IAuthStore {
  isAuthenticated: boolean;
  signIn: (user: JwtPayloadWithUser) => JwtPayloadWithUser | null;
  signOut: () => void;
  user: JwtPayloadWithUser | null;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: (user: JwtPayloadWithUser) => {
    set({ isAuthenticated: true, user });
    return user;
  },
  signOut: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
