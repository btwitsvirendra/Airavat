import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '../services/payment.service';
import { CreatePaymentLinkRequest, PaymentMethod } from '@/lib/types/api/payment.types';
import { PaginationParams } from '@/lib/types/api/common.types';
import toast from 'react-hot-toast';

export const usePaymentLinks = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['payment-links', params],
    queryFn: () => paymentService.getPaymentLinks(params),
  });
};

export const usePaymentLink = (id: string) => {
  return useQuery({
    queryKey: ['payment-links', id],
    queryFn: () => paymentService.getPaymentLinkById(id),
    enabled: !!id,
  });
};

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: paymentService.getPaymentMethods,
  });
};

export const useTransactions = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => paymentService.getTransactions(params),
  });
};

export const useCreatePaymentLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentLinkRequest) => paymentService.createPaymentLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-links'] });
      toast.success('Payment link created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create payment link');
    },
  });
};

export const useCancelPaymentLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => paymentService.cancelPaymentLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-links'] });
      toast.success('Payment link cancelled');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel payment link');
    },
  });
};

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<PaymentMethod>) => paymentService.addPaymentMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('Payment method added!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add payment method');
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => paymentService.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('Payment method deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete payment method');
    },
  });
};
