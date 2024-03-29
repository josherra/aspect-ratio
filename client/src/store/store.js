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

export const useCatalogueStore = create(
  devtools((set) => ({
    catalogue: {},
    history: [],
    addToCatalogue: (data) =>
      set((state) => ({ catalogue: state.catalogue.push(data) })),
  }))
);
