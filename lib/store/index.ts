import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createCartSlice, CartSlice } from './slices/cartSlice';
import { createUISlice, UISlice } from './slices/uiSlice';
import { createChatSlice, ChatSlice } from './slices/chatSlice';

type StoreState = CartSlice & UISlice & ChatSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createUISlice(...a),
      ...createChatSlice(...a),
    }),
    {
      name: 'airavat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist cart data
        cart: state.cart,
      }),
    }
  )
);

// Export individual hooks for convenience
export const useCart = () => useStore((state) => ({
  cart: state.cart,
  addToCart: state.addToCart,
  removeFromCart: state.removeFromCart,
  updateQuantity: state.updateQuantity,
  clearCart: state.clearCart,
  getCartTotal: state.getCartTotal,
  getCartItemCount: state.getCartItemCount,
}));

export const useUI = () => useStore((state) => ({
  isSidebarOpen: state.isSidebarOpen,
  toggleSidebar: state.toggleSidebar,
  setSidebarOpen: state.setSidebarOpen,
  searchQuery: state.searchQuery,
  setSearchQuery: state.setSearchQuery,
  activeModal: state.activeModal,
  openModal: state.openModal,
  closeModal: state.closeModal,
}));

export const useChat = () => useStore((state) => ({
  activeConversationId: state.activeConversationId,
  setActiveConversationId: state.setActiveConversationId,
  typingUsers: state.typingUsers,
  setUserTyping: state.setUserTyping,
  unreadCount: state.unreadCount,
  setUnreadCount: state.setUnreadCount,
  incrementUnreadCount: state.incrementUnreadCount,
  decrementUnreadCount: state.decrementUnreadCount,
}));
