import { create } from "zustand";

export const useChatStore = create<ChatState>()((set) => ({
  activeChannel: undefined,
  setActiveChannel: (channelId: number) => set({ activeChannel: channelId }),
}));

interface ChatState {
  activeChannel: number | undefined;
  setActiveChannel: (channelId: number) => void;
}
