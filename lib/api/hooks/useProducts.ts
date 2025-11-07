import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { SearchParams, PaginatedResponse } from '@/lib/types/api/common.types';
import { Product, ProductFilters, CreateProductRequest } from '@/lib/types/api/product.types';
import toast from 'react-hot-toast';

export const useProducts = (params?: SearchParams & ProductFilters) => {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ['products', 'categories'],
    queryFn: productService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchProducts = (query: string, filters?: ProductFilters) => {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', 'search', query, filters],
    queryFn: () => productService.searchProducts(query, filters),
    enabled: query.length > 0,
  });
};

export const useRecommendedProducts = (limit = 10) => {
  return useQuery({
    queryKey: ['products', 'recommended', limit],
    queryFn: () => productService.getRecommendedProducts(limit),
  });
};

export const useTrendingProducts = (limit = 10) => {
  return useQuery({
    queryKey: ['products', 'trending', limit],
    queryFn: () => productService.getTrendingProducts(limit),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => productService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create product');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProductRequest> }) =>
      productService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
      toast.success('Product updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
};
