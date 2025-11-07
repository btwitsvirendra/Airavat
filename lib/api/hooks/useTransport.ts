import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transportService } from '../services/transport.service';
import { CreateTransportBookingRequest, TransportBooking } from '@/lib/types/api/transport.types';
import { PaginationParams } from '@/lib/types/api/common.types';
import toast from 'react-hot-toast';

export const useTransportBookings = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['transport', 'bookings', params],
    queryFn: () => transportService.getBookings(params),
  });
};

export const useTransportBooking = (id: string) => {
  return useQuery({
    queryKey: ['transport', 'bookings', id],
    queryFn: () => transportService.getBookingById(id),
    enabled: !!id,
  });
};

export const useTrackShipment = (trackingNumber: string) => {
  return useQuery({
    queryKey: ['transport', 'track', trackingNumber],
    queryFn: () => transportService.trackShipment(trackingNumber),
    enabled: !!trackingNumber,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useTransportQuotes = () => {
  return useMutation({
    mutationFn: (
      data: Pick<
        CreateTransportBookingRequest,
        'pickupAddress' | 'deliveryAddress' | 'weight' | 'dimensions'
      >
    ) => transportService.getQuotes(data),
  });
};

export const useCreateTransportBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransportBookingRequest) => transportService.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transport', 'bookings'] });
      toast.success('Transport booking created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create booking');
    },
  });
};

export const useUpdateTransportStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TransportBooking['status'] }) =>
      transportService.updateBookingStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transport', 'bookings'] });
      queryClient.invalidateQueries({ queryKey: ['transport', 'bookings', variables.id] });
      toast.success('Booking status updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update booking status');
    },
  });
};

export const useCancelTransportBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      transportService.cancelBooking(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transport', 'bookings'] });
      queryClient.invalidateQueries({ queryKey: ['transport', 'bookings', variables.id] });
      toast.success('Booking cancelled successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel booking');
    },
  });
};
