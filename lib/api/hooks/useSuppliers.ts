import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supplierService } from '../services/supplier.service';
import { PaginationParams } from '@/lib/types/api/common.types';
import toast from 'react-hot-toast';

export const useSuppliers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () => supplierService.getSuppliers(params),
  });
};

export const useSupplier = (id: string) => {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: () => supplierService.getSupplierById(id),
    enabled: !!id,
  });
};

export const useSupplierReviews = (supplierId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['suppliers', supplierId, 'reviews', params],
    queryFn: () => supplierService.getSupplierReviews(supplierId, params),
    enabled: !!supplierId,
  });
};

export const useAddSupplierReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      supplierId,
      data,
    }: {
      supplierId: string;
      data: { rating: number; comment: string; orderId?: string };
    }) => supplierService.addSupplierReview(supplierId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers', variables.supplierId, 'reviews'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers', variables.supplierId] });
      toast.success('Review added successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add review');
    },
  });
};

export const useVerifiedSuppliers = (limit = 10) => {
  return useQuery({
    queryKey: ['suppliers', 'verified', limit],
    queryFn: () => supplierService.getVerifiedSuppliers(limit),
  });
};

export const useSearchSuppliers = (query: string) => {
  return useQuery({
    queryKey: ['suppliers', 'search', query],
    queryFn: () => supplierService.searchSuppliers(query),
    enabled: query.length > 0,
  });
};
