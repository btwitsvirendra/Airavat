export interface PaymentLink {
  id: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  status: PaymentLinkStatus;
  supplierId: string;
  supplierName: string;
  buyerId: string;
  buyerName: string;
  description: string;
  link: string;
  expiresAt: string;
  paidAt?: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentLinkStatus = 'pending' | 'paid' | 'expired' | 'cancelled';

export interface CreatePaymentLinkRequest {
  orderId: string;
  amount: number;
  description: string;
  expiresIn?: number; // Hours
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  name: string;
  lastFourDigits?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  type: 'payment' | 'refund';
  status: 'pending' | 'success' | 'failed';
  paymentMethod: string;
  transactionId: string;
  gatewayResponse?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
