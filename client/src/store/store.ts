import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    (set: (arg0: { isLoggedIn: boolean; token: any; user: any }) => any) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      login: (data: any) =>
        set({ isLoggedIn: true, token: data.token, user: data }),
      logout: () => set({ isLoggedIn: false, token: null, user: null }),
    })
  )
);
