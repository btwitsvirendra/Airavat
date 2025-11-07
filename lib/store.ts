import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Product, ChatMessage } from './types';

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  orderName?: string;
  companyName?: string;
  paymentMethod?: string;
  status: 'completed' | 'pending' | 'failed';
}

interface AppState {
  // User state
  user: User | null;
  userRole: 'buyer' | 'seller';
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: () => void;
  setUser: (user: User | null) => void;

  // Wallet state
  walletBalance: number;
  walletId: string;
  transactions: WalletTransaction[];
  addMoney: (amount: number) => void;
  withdraw: (amount: number) => void;
  addTransaction: (transaction: WalletTransaction) => void;

  // Cart state
  cart: { product: Product; quantity: number }[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Chat state
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;

  // UI state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      userRole: 'buyer',
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Demo login - accepts iamvirendra07@gmail.com / 12345678
        if (email === 'iamvirendra07@gmail.com' && password === '12345678') {
          const user: User = {
            id: 'user-1',
            email: email,
            name: 'Virendra Singh',
            role: get().userRole,
            phone: '+91 98765 43210',
            company: 'Gorilla Glass Manufacturing Pvt Ltd',
            createdAt: new Date(),
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      switchRole: () => {
        const currentRole = get().userRole;
        const newRole = currentRole === 'buyer' ? 'seller' : 'buyer';
        set({ userRole: newRole });
        // Update user role if logged in
        const user = get().user;
        if (user) {
          set({ user: { ...user, role: newRole } });
        }
      },

      setUser: (user) => set({ user }),

      // Wallet state
      walletBalance: 10000,
      walletId: '7613897634',
      transactions: [],

      addMoney: (amount) => {
        const newBalance = get().walletBalance + amount;
        const transaction: WalletTransaction = {
          id: `txn-${Date.now()}`,
          type: 'credit',
          amount,
          description: 'Added money to wallet',
          timestamp: new Date(),
          status: 'completed',
          paymentMethod: 'UPI',
        };
        set({
          walletBalance: newBalance,
          transactions: [transaction, ...get().transactions],
        });
      },

      withdraw: (amount) => {
        const currentBalance = get().walletBalance;
        if (currentBalance >= amount) {
          const newBalance = currentBalance - amount;
          const transaction: WalletTransaction = {
            id: `txn-${Date.now()}`,
            type: 'debit',
            amount,
            description: 'Withdrawal from wallet',
            timestamp: new Date(),
            status: 'completed',
            paymentMethod: 'Bank Transfer',
          };
          set({
            walletBalance: newBalance,
            transactions: [transaction, ...get().transactions],
          });
        }
      },

      addTransaction: (transaction) => {
        set({ transactions: [transaction, ...get().transactions] });
      },

      // Cart state
      cart: [],
      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),

      // Chat state
      activeConversationId: null,
      setActiveConversationId: (id) => set({ activeConversationId: id }),
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      // UI state
      isSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'airavat-storage',
    }
  )
);
