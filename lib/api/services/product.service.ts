import apiClient from '../client';
import {
  Product,
  ProductCategory,
  CreateProductRequest,
  ProductFilters,
} from '@/lib/types/api/product.types';
import { ApiResponse, PaginatedResponse, SearchParams } from '@/lib/types/api/common.types';

export const productService = {
  // Get all products with filters
  getProducts: async (params?: SearchParams & ProductFilters): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', { params });
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  // Create product (Supplier only)
  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    const response = await apiClient.post<ApiResponse<Product>>('/products', data);
    return response.data.data;
  },

  // Update product
  updateProduct: async (id: string, data: Partial<CreateProductRequest>): Promise<Product> => {
    const response = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },

  // Get categories
  getCategories: async (): Promise<ProductCategory[]> => {
    const response = await apiClient.get<ApiResponse<ProductCategory[]>>('/products/categories');
    return response.data.data;
  },

  // Search products
  searchProducts: async (query: string, filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  // Get recommended products
  getRecommendedProducts: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/recommended', {
      params: { limit },
    });
    return response.data.data;
  },

  // Get trending products
  getTrendingProducts: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/trending', {
      params: { limit },
    });
    return response.data.data;
  },
};
