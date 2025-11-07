export interface TransportBooking {
  id: string;
  bookingNumber: string;
  orderId: string;
  userId: string;
  transportProvider: string;
  vehicleType: VehicleType;
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupDate: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  distance: number;
  weight: number;
  dimensions: Dimensions;
  cost: number;
  status: TransportStatus;
  trackingNumber?: string;
  driverDetails?: DriverDetails;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  landmark?: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'm' | 'in' | 'ft';
}

export type VehicleType =
  | 'bike'
  | 'mini-truck'
  | 'truck'
  | 'container'
  | 'trailer'
  | 'mini-van';

export type TransportStatus =
  | 'pending'
  | 'confirmed'
  | 'pickup-scheduled'
  | 'in-transit'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export interface DriverDetails {
  name: string;
  phone: string;
  vehicleNumber: string;
  licenseNumber: string;
  photo?: string;
}

export interface CreateTransportBookingRequest {
  orderId: string;
  vehicleType: VehicleType;
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupDate: string;
  weight: number;
  dimensions: Dimensions;
  notes?: string;
}

export interface TransportQuote {
  provider: string;
  vehicleType: VehicleType;
  estimatedCost: number;
  estimatedDuration: string;
  distance: number;
}
