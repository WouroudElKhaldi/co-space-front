import { create } from "zustand";

const useRuleStore = create((set) => ({
  ruleData: [],
  setRuleData: (data) => set({ ruleData: data }),
}));

export default useRuleStore;
