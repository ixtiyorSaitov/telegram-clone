import { create } from "zustand";

type Store = {
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useLoading = create<Store>()((set) => ({
  isCreating: false,
  setIsCreating: (isCreating) => set({ isCreating }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
