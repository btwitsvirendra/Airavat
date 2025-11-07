import apiClient from '../client';
import {
  PaymentLink,
  CreatePaymentLinkRequest,
  PaymentMethod,
  Transaction,
} from '@/lib/types/api/payment.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/lib/types/api/common.types';

export const paymentService = {
  // Get payment links
  getPaymentLinks: async (params?: PaginationParams): Promise<PaginatedResponse<PaymentLink>> => {
    const response = await apiClient.get<PaginatedResponse<PaymentLink>>('/payment-links', {
      params,
    });
    return response.data;
  },

  // Get payment link by ID
  getPaymentLinkById: async (id: string): Promise<PaymentLink> => {
    const response = await apiClient.get<ApiResponse<PaymentLink>>(`/payment-links/${id}`);
    return response.data.data;
  },

  // Create payment link
  createPaymentLink: async (data: CreatePaymentLinkRequest): Promise<PaymentLink> => {
    const response = await apiClient.post<ApiResponse<PaymentLink>>('/payment-links', data);
    return response.data.data;
  },

  // Cancel payment link
  cancelPaymentLink: async (id: string): Promise<PaymentLink> => {
    const response = await apiClient.patch<ApiResponse<PaymentLink>>(`/payment-links/${id}/cancel`);
    return response.data.data;
  },

  // Get payment methods
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const response = await apiClient.get<ApiResponse<PaymentMethod[]>>('/payment-methods');
    return response.data.data;
  },

  // Add payment method
  addPaymentMethod: async (data: Partial<PaymentMethod>): Promise<PaymentMethod> => {
    const response = await apiClient.post<ApiResponse<PaymentMethod>>('/payment-methods', data);
    return response.data.data;
  },

  // Delete payment method
  deletePaymentMethod: async (id: string): Promise<void> => {
    await apiClient.delete(`/payment-methods/${id}`);
  },

  // Get transactions
  getTransactions: async (params?: PaginationParams): Promise<PaginatedResponse<Transaction>> => {
    const response = await apiClient.get<PaginatedResponse<Transaction>>('/transactions', {
      params,
    });
    return response.data;
  },

  // Process payment
  processPayment: async (paymentLinkId: string, paymentMethodId: string): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>('/payments/process', {
      paymentLinkId,
      paymentMethodId,
    });
    return response.data.data;
  },
};
