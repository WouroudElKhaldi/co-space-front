import { create } from "zustand";

const useAlertStore = create((set) => ({
  alertData: { message: "", type: "" },
  setAlertData: (data) => set({ alertData: data }),
}));

export default useAlertStore;
