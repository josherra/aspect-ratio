import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set: (arg0: { isLoggedIn: boolean; token: any }) => any) => ({
    isLoggedIn: false,
    token: null,
    login: (token: any) => set({ isLoggedIn: true, token }),
    logout: () => set({ isLoggedIn: false, token: null }),
  }))
);
