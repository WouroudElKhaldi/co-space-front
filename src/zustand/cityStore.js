import { create } from "zustand";

const useCityStore = create((set) => ({
  cityData: [],
  setCityData: (data) => set({ cityData: data }),
}));

export default useCityStore;
