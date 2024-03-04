import { create } from "zustand";

const useCategoryStore = create((set) => ({
  categoryData: [],
  setCategoryData: (data) => set({ categoryData: data }),
}));

export default useCategoryStore;
