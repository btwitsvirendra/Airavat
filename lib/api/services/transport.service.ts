import apiClient from '../client';
import {
  TransportBooking,
  CreateTransportBookingRequest,
  TransportQuote,
} from '@/lib/types/api/transport.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/lib/types/api/common.types';

export const transportService = {
  // Get transport bookings
  getBookings: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<TransportBooking>> => {
    const response = await apiClient.get<PaginatedResponse<TransportBooking>>('/transport/bookings', {
      params,
    });
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id: string): Promise<TransportBooking> => {
    const response = await apiClient.get<ApiResponse<TransportBooking>>(
      `/transport/bookings/${id}`
    );
    return response.data.data;
  },

  // Create booking
  createBooking: async (data: CreateTransportBookingRequest): Promise<TransportBooking> => {
    const response = await apiClient.post<ApiResponse<TransportBooking>>(
      '/transport/bookings',
      data
    );
    return response.data.data;
  },

  // Update booking status
  updateBookingStatus: async (
    id: string,
    status: TransportBooking['status']
  ): Promise<TransportBooking> => {
    const response = await apiClient.patch<ApiResponse<TransportBooking>>(
      `/transport/bookings/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  // Cancel booking
  cancelBooking: async (id: string, reason?: string): Promise<TransportBooking> => {
    const response = await apiClient.post<ApiResponse<TransportBooking>>(
      `/transport/bookings/${id}/cancel`,
      { reason }
    );
    return response.data.data;
  },

  // Get transport quotes
  getQuotes: async (
    data: Pick<
      CreateTransportBookingRequest,
      'pickupAddress' | 'deliveryAddress' | 'weight' | 'dimensions'
    >
  ): Promise<TransportQuote[]> => {
    const response = await apiClient.post<ApiResponse<TransportQuote[]>>(
      '/transport/quotes',
      data
    );
    return response.data.data;
  },

  // Track shipment
  trackShipment: async (trackingNumber: string): Promise<TransportBooking> => {
    const response = await apiClient.get<ApiResponse<TransportBooking>>(
      `/transport/track/${trackingNumber}`
    );
    return response.data.data;
  },
};
