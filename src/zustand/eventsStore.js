import { create } from "zustand";

const useEventStore = create((set) => ({
  eventsData: [],
  setEventsData: (data) => set({ eventsData: data }),
}));

export default useEventStore;
