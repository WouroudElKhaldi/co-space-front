import { create } from "zustand";

const useAmenityStore = create((set) => ({
  amenitiesData: [],
  setAmenitiesData: (data) => set({ amenitiesData: data }),
}));

export default useAmenityStore;
