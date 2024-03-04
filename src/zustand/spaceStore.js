"use client";

import { create } from "zustand";

const useSpaceStore = create((set) => ({
  spacesData: [],
  setSpacesData: (data) => set({ spacesData: data }),

  spacesByCity: [],
  setSpacesByCity: (data) => set({ spacesData: data }),

  top5Spaces: [],
  setTop5Spaces: (data) => set({ top5Spaces: data }),
}));

export default useSpaceStore;
