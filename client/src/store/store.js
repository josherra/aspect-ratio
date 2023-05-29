import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    isLoggedIn: false,
    token: null,
    user: null,
    login: (data) => set({ isLoggedIn: true, token: data.token, user: data }),
    logout: () => set({ isLoggedIn: false, token: null, user: null }),
  }))
);

export const useLibraryStore = create(
  devtools((set) => ({
    library: [],
    history: [],
    addToLibrary: (data) =>
      set((state) => ({ library: state.library.push(data) })),
    setUserLibrary: (data) => set({ library: data }),
  }))
);
