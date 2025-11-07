export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  supplierId: string;
  supplierName: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentLinkId?: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingInfo?: TrackingInfo;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
  specifications?: Record<string, string>;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Address {
  fullName: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
}

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  currentStatus: string;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

export interface CreateOrderRequest {
  supplierId: string;
  items: Array<{
    productId: string;
    quantity: number;
    specifications?: Record<string, string>;
  }>;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
}
