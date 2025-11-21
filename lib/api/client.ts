/**
 * Airavat API Client
 * Centralized API service for frontend-backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

// Set auth token
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

// Remove auth token
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// API Client
export const apiClient = {
  // ==================== AUTH ====================
  auth: {
    login: async (email: string, password: string) => {
      const response = await apiRequest<{ success: boolean; data: { token: string; user: any } }>(
        '/users/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.success && response.data.token) {
        setAuthToken(response.data.token);
      }
      return response;
    },

    register: async (userData: any) => {
      return apiRequest('/users/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    logout: () => {
      removeAuthToken();
    },
  },

  // ==================== PRODUCTS ====================
  products: {
    getAll: async (params?: { category_id?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.category_id) query.append('category_id', params.category_id);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/products?${query.toString()}`);
    },

    getById: async (id: string) => {
      return apiRequest(`/products/${id}`);
    },

    search: async (query: string, filters?: any) => {
      const params = new URLSearchParams({ q: query });
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value.toString());
        });
      }
      return apiRequest(`/products/search?${params.toString()}`);
    },

    create: async (productData: any) => {
      return apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    },

    update: async (id: string, productData: any) => {
      return apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
    },

    delete: async (id: string) => {
      return apiRequest(`/products/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ==================== CART ====================
  cart: {
    get: async (params?: { business_id?: string; session_id?: string }) => {
      const query = new URLSearchParams();
      if (params?.business_id) query.append('business_id', params.business_id);
      if (params?.session_id) query.append('session_id', params.session_id);
      return apiRequest(`/cart?${query.toString()}`);
    },

    add: async (item: {
      business_id?: string;
      product_id: string;
      quantity: number;
      negotiated_price?: number;
      delivery_option?: string;
      delivery_notes?: string;
      session_id?: string;
    }) => {
      return apiRequest('/cart', {
        method: 'POST',
        body: JSON.stringify(item),
      });
    },

    update: async (cartItemId: string, updates: { quantity?: number; delivery_option?: string; delivery_notes?: string }) => {
      return apiRequest(`/cart/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },

    updateDelivery: async (cartItemId: string, deliveryOption: string, deliveryPartner?: string, notes?: string) => {
      return apiRequest(`/cart/${cartItemId}/delivery`, {
        method: 'PUT',
        body: JSON.stringify({ delivery_option: deliveryOption, delivery_partner: deliveryPartner, delivery_notes: notes }),
      });
    },

    remove: async (cartItemId: string) => {
      return apiRequest(`/cart/${cartItemId}`, {
        method: 'DELETE',
      });
    },

    clear: async (params?: { business_id?: string; session_id?: string }) => {
      const query = new URLSearchParams();
      if (params?.business_id) query.append('business_id', params.business_id);
      if (params?.session_id) query.append('session_id', params.session_id);
      return apiRequest(`/cart?${query.toString()}`, {
        method: 'DELETE',
      });
    },
  },

  // ==================== PAYMENT LINKS ====================
  paymentLinks: {
    create: async (paymentLinkData: {
      seller_business_id: string;
      buyer_business_id?: string;
      conversation_id?: string;
      title?: string;
      description?: string;
      items: Array<{
        product_id: string;
        quantity: number;
        negotiated_price?: number;
        notes?: string;
      }>;
      currency_id?: number;
      tax_amount?: number;
      discount_amount?: number;
      expires_in_days?: number;
    }) => {
      return apiRequest('/payment-links', {
        method: 'POST',
        body: JSON.stringify(paymentLinkData),
      });
    },

    getByCode: async (linkCode: string) => {
      return apiRequest(`/payment-links/code/${linkCode}`);
    },

    getSellerLinks: async (businessId: string, params?: { status?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.status) query.append('status', params.status);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/payment-links/seller/${businessId}?${query.toString()}`);
    },

    addToCart: async (linkCode: string, businessId: string, deliveryOption?: string, deliveryNotes?: string) => {
      return apiRequest(`/payment-links/${linkCode}/add-to-cart`, {
        method: 'POST',
        body: JSON.stringify({ business_id: businessId, delivery_option: deliveryOption, delivery_notes: deliveryNotes }),
      });
    },

    createFromChat: async (conversationId: string, items: any[], options?: any) => {
      return apiRequest('/chat/payment-links/create', {
        method: 'POST',
        body: JSON.stringify({ conversation_id: conversationId, items, ...options }),
      });
    },
  },

  // ==================== INVOICES ====================
  invoices: {
    create: async (invoiceData: {
      order_id?: string;
      payment_link_id?: string;
      seller_business_id: string;
      buyer_business_id: string;
      currency_id?: number;
      subtotal?: number;
      tax_amount?: number;
      discount_amount?: number;
      shipping_amount?: number;
      total_amount?: number;
      due_date_days?: number;
      notes?: string;
    }) => {
      return apiRequest('/invoices', {
        method: 'POST',
        body: JSON.stringify(invoiceData),
      });
    },

    getById: async (invoiceId: string) => {
      return apiRequest(`/invoices/${invoiceId}`);
    },

    getBusinessInvoices: async (businessId: string, role: 'seller' | 'buyer' = 'seller', params?: { status?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams({ role });
      if (params?.status) query.append('status', params.status);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/invoices/business/${businessId}?${query.toString()}`);
    },

    updateStatus: async (invoiceId: string, status: string, pdfUrl?: string) => {
      return apiRequest(`/invoices/${invoiceId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status, pdf_url: pdfUrl }),
      });
    },
  },

  // ==================== CHAT ====================
  chat: {
    getOrCreateConversation: async (conversationData: {
      buyer_business_id: string;
      seller_business_id: string;
      product_id?: string;
      inquiry_id?: string;
      order_id?: string;
    }) => {
      return apiRequest('/chat/conversations', {
        method: 'POST',
        body: JSON.stringify(conversationData),
      });
    },

    getConversations: async (businessId: string) => {
      return apiRequest(`/chat/conversations/business/${businessId}`);
    },

    getMessages: async (conversationId: string, page: number = 1, limit: number = 50) => {
      return apiRequest(`/chat/conversations/${conversationId}/messages?page=${page}&limit=${limit}`);
    },

    sendMessage: async (messageData: {
      conversation_id: string;
      message_type?: string;
      content?: string;
      metadata?: any;
    }) => {
      return apiRequest('/chat/messages', {
        method: 'POST',
        body: JSON.stringify(messageData),
      });
    },
  },

  // ==================== BUSINESS ====================
  businesses: {
    getAll: async () => {
      return apiRequest('/businesses');
    },

    getById: async (id: string) => {
      return apiRequest(`/businesses/${id}`);
    },

    getSellers: async () => {
      return apiRequest('/businesses/sellers');
    },

    create: async (businessData: any) => {
      return apiRequest('/businesses', {
        method: 'POST',
        body: JSON.stringify(businessData),
      });
    },
  },

  // ==================== CATEGORIES ====================
  categories: {
    getAll: async () => {
      return apiRequest('/categories');
    },

    getRoot: async () => {
      return apiRequest('/categories/root');
    },

    getById: async (id: string) => {
      return apiRequest(`/categories/${id}`);
    },
  },
};

// Export socket URL for Socket.io client
export const SOCKET_IO_URL = SOCKET_URL;

// Export API base URL
export const API_URL = API_BASE_URL;

