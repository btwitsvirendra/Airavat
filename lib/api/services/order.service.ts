import apiClient from '../client';
import { Order, CreateOrderRequest } from '@/lib/types/api/order.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/lib/types/api/common.types';

export const orderService = {
  // Get all orders for current user
  getOrders: async (params?: PaginationParams): Promise<PaginatedResponse<Order>> => {
    const response = await apiClient.get<PaginatedResponse<Order>>('/orders', { params });
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  },

  // Create new order
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>('/orders', data);
    return response.data.data;
  },

  // Update order status
  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await apiClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, {
      status,
    });
    return response.data.data;
  },

  // Cancel order
  cancelOrder: async (id: string, reason?: string): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`, {
      reason,
    });
    return response.data.data;
  },

  // Get order tracking
  getOrderTracking: async (id: string): Promise<Order['trackingInfo']> => {
    const response = await apiClient.get<ApiResponse<Order['trackingInfo']>>(
      `/orders/${id}/tracking`
    );
    return response.data.data;
  },

  // Get order statistics
  getOrderStats: async (): Promise<{
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
    totalValue: number;
  }> => {
    const response = await apiClient.get<
      ApiResponse<{
        total: number;
        pending: number;
        completed: number;
        cancelled: number;
        totalValue: number;
      }>
    >('/orders/stats');
    return response.data.data;
  },
};
