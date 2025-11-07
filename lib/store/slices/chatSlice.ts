import { StateCreator } from 'zustand';

export interface ChatSlice {
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  typingUsers: Record<string, boolean>;
  setUserTyping: (conversationId: string, isTyping: boolean) => void;

  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  decrementUnreadCount: () => void;
}

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  activeConversationId: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),

  typingUsers: {},
  setUserTyping: (conversationId, isTyping) =>
    set((state) => ({
      typingUsers: { ...state.typingUsers, [conversationId]: isTyping },
    })),

  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  decrementUnreadCount: () =>
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
});
