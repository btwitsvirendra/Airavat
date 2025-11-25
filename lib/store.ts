import { create } from 'zustand';
import { User, Product, ChatMessage } from './types';
import { initialInventory, InventoryRecord } from './data/catalog';

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Role-based view state (Alibaba-style)
  currentView: 'buyer' | 'seller'; // Current active view mode
  setCurrentView: (view: 'buyer' | 'seller') => void;
  toggleView: () => void; // Toggle between buyer and seller views for hybrid users

  // Cart state
  cart: { product: Product; quantity: number }[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Inventory state
  inventory: Record<string, InventoryRecord>;
  updateInventory: (productId: string, quantity: number) => void;
  releaseReservation: (productId: string) => void;

  // Chat state
  activeConversationId: string | null;
  activeProductContext: Product | null;
  setActiveConversationId: (id: string | null) => void;
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  startProductChat: (product: Product, supplierId?: string) => void;

  // Favorites state
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;

  // UI state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>((set) => ({
  // User state
  user: null,
  setUser: (user: User | null) => {
    // Auto-set currentView based on user roles and defaultView preference
    if (user) {
      const hasSellerRole = user.roles?.includes('seller') && user.supplierStatus === 'active';
      const hasBuyerRole = user.roles?.includes('buyer') ?? true; // Default to buyer if no roles specified
      
      let initialView: 'buyer' | 'seller' = 'buyer';
      if (user.defaultView) {
        initialView = user.defaultView;
      } else if (hasSellerRole && !hasBuyerRole) {
        initialView = 'seller';
      } else if (hasSellerRole && hasBuyerRole) {
        // Hybrid user - prefer seller view if supplier is active
        initialView = user.supplierStatus === 'active' ? 'seller' : 'buyer';
      }
      
      set({ user, currentView: initialView });
    } else {
      set({ user, currentView: 'buyer' });
    }
  },
  
  // Role-based view state (initialize from localStorage if available)
  currentView: (() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('airavat_current_view');
      return (saved === 'buyer' || saved === 'seller') ? saved : 'buyer';
    }
    return 'buyer';
  })(),
  setCurrentView: (view: 'buyer' | 'seller') => {
    set({ currentView: view });
    // Persist preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('airavat_current_view', view);
    }
  },
  toggleView: () => {
    set((state) => {
      const newView = state.currentView === 'buyer' ? 'seller' : 'buyer';
      // Persist preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('airavat_current_view', newView);
      }
      return { currentView: newView };
    });
  },

  // Cart state
  cart: [],
  addToCart: (product, quantity) =>
    set((state) => {
      const inventoryRecord = state.inventory[product.id] ?? { available: product.stock, reserved: 0 };
      const available = inventoryRecord.available;
      const existingItem = state.cart.find((item) => item.product.id === product.id);
      const baselineQuantity = existingItem?.quantity ?? 0;
      const desiredQuantity = Math.max(product.minOrderQuantity, baselineQuantity + quantity);
      const cappedQuantity = Math.min(available, desiredQuantity);

      if (cappedQuantity === 0) {
        return state;
      }

      const nextCart = existingItem
        ? state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: cappedQuantity }
            : item
        )
        : [...state.cart, { product, quantity: cappedQuantity }];

      return {
        cart: nextCart.filter((item) => item.quantity > 0),
        inventory: {
          ...state.inventory,
          [product.id]: {
            available,
            reserved: cappedQuantity,
          },
        },
      };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const nextCart = state.cart.filter((item) => item.product.id !== productId);
      const nextInventory = { ...state.inventory };
      if (nextInventory[productId]) {
        nextInventory[productId] = {
          ...nextInventory[productId],
          reserved: 0,
        };
      }
      return {
        cart: nextCart,
        inventory: nextInventory,
      };
    }),
  clearCart: () =>
    set((state) => {
      const resetInventory = Object.fromEntries(
        Object.entries(state.inventory).map(([productId, record]) => [
          productId,
          { ...record, reserved: 0 },
        ])
      );
      return { cart: [], inventory: resetInventory };
    }),

  // Inventory state
  inventory: Object.fromEntries(
    Object.entries(initialInventory).map(([productId, record]) => [
      productId,
      { ...record },
    ])
  ),
  updateInventory: (productId, quantity) =>
    set((state) => {
      const safeQuantity = Math.max(0, quantity);
      const existingCartItem = state.cart.find((item) => item.product.id === productId);
      const adjustedCart = existingCartItem
        ? state.cart
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.min(item.quantity, safeQuantity) }
              : item
          )
          .filter((item) => item.quantity > 0)
        : state.cart;

      return {
        cart: adjustedCart,
        inventory: {
          ...state.inventory,
          [productId]: {
            available: safeQuantity,
            reserved: Math.min(state.inventory[productId]?.reserved ?? 0, safeQuantity),
          },
        },
      };
    }),
  releaseReservation: (productId) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        [productId]: {
          available: state.inventory[productId]?.available ?? 0,
          reserved: 0,
        },
      },
    })),

  // Chat state
  activeConversationId: null,
  activeProductContext: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  startProductChat: (product: Product, supplierId?: string) => {
    const conversationId = `conv-${product.id}-${supplierId || 'supplier'}`;
    set((state) => {
      // We don't auto-send a message anymore, we just set the context
      // The ChatInterface will handle the "context card" display
      return {
        activeConversationId: conversationId,
        activeProductContext: product,
      };
    });
  },

  // Favorites state
  favorites: [],
  addToFavorites: (product) =>
    set((state) => {
      const exists = state.favorites.find((p) => p.id === product.id);
      if (exists) return state;
      // Add to beginning (latest on top)
      return { favorites: [product, ...state.favorites] };
    }),
  removeFromFavorites: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== productId),
    })),

  // UI state
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

    ])
  ),
  updateInventory: (productId, quantity) =>
    set((state) => {
      const safeQuantity = Math.max(0, quantity);
      const existingCartItem = state.cart.find((item) => item.product.id === productId);
      const adjustedCart = existingCartItem
        ? state.cart
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.min(item.quantity, safeQuantity) }
              : item
          )
          .filter((item) => item.quantity > 0)
        : state.cart;

      return {
        cart: adjustedCart,
        inventory: {
          ...state.inventory,
          [productId]: {
            available: safeQuantity,
            reserved: Math.min(state.inventory[productId]?.reserved ?? 0, safeQuantity),
          },
        },
      };
    }),
  releaseReservation: (productId) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        [productId]: {
          available: state.inventory[productId]?.available ?? 0,
          reserved: 0,
        },
      },
    })),

  // Chat state
  activeConversationId: null,
  activeProductContext: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  startProductChat: (product: Product, supplierId?: string) => {
    const conversationId = `conv-${product.id}-${supplierId || 'supplier'}`;
    set((state) => {
      // We don't auto-send a message anymore, we just set the context
      // The ChatInterface will handle the "context card" display
      return {
        activeConversationId: conversationId,
        activeProductContext: product,
      };
    });
  },

  // Favorites state
  favorites: [],
  addToFavorites: (product) =>
    set((state) => {
      const exists = state.favorites.find((p) => p.id === product.id);
      if (exists) return state;
      // Add to beginning (latest on top)
      return { favorites: [product, ...state.favorites] };
    }),
  removeFromFavorites: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== productId),
    })),

  // UI state
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
