import { create } from "zustand";

const useUserStore = create((set) => ({
  userData: [],
  setUserData: (data) => set({ userData: data }),
}));

export default useUserStore;
