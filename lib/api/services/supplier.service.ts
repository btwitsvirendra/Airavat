import apiClient from '../client';
import { Supplier, SupplierReview } from '@/lib/types/api/supplier.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/lib/types/api/common.types';

export const supplierService = {
  // Get all suppliers
  getSuppliers: async (params?: PaginationParams): Promise<PaginatedResponse<Supplier>> => {
    const response = await apiClient.get<PaginatedResponse<Supplier>>('/suppliers', { params });
    return response.data;
  },

  // Get supplier by ID
  getSupplierById: async (id: string): Promise<Supplier> => {
    const response = await apiClient.get<ApiResponse<Supplier>>(`/suppliers/${id}`);
    return response.data.data;
  },

  // Update supplier profile
  updateSupplier: async (id: string, data: Partial<Supplier>): Promise<Supplier> => {
    const response = await apiClient.put<ApiResponse<Supplier>>(`/suppliers/${id}`, data);
    return response.data.data;
  },

  // Get supplier reviews
  getSupplierReviews: async (
    supplierId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<SupplierReview>> => {
    const response = await apiClient.get<PaginatedResponse<SupplierReview>>(
      `/suppliers/${supplierId}/reviews`,
      { params }
    );
    return response.data;
  },

  // Add supplier review
  addSupplierReview: async (
    supplierId: string,
    data: { rating: number; comment: string; orderId?: string }
  ): Promise<SupplierReview> => {
    const response = await apiClient.post<ApiResponse<SupplierReview>>(
      `/suppliers/${supplierId}/reviews`,
      data
    );
    return response.data.data;
  },

  // Get verified suppliers
  getVerifiedSuppliers: async (limit = 10): Promise<Supplier[]> => {
    const response = await apiClient.get<ApiResponse<Supplier[]>>('/suppliers/verified', {
      params: { limit },
    });
    return response.data.data;
  },

  // Search suppliers
  searchSuppliers: async (query: string): Promise<PaginatedResponse<Supplier>> => {
    const response = await apiClient.get<PaginatedResponse<Supplier>>('/suppliers/search', {
      params: { q: query },
    });
    return response.data;
  },
};
