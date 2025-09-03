import { create } from "zustand";

type ThreadStore = {
  threadId: number | null;
  setThreadId: (threadId: number | null) => void;
};

export const useThreadStore = create<ThreadStore>((set) => ({
  threadId: null,
  setThreadId: (threadId) => set({ threadId }),
}));
