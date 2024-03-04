import { create } from "zustand";

const useRatingStore = create((set) => ({
  ratingData: [],
  setRatingData: (data) => set({ ratingData: data }),
}));

export default useRatingStore;
