// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'supplier';
  phone?: string;
  company?: string;
  gstin?: string;
  createdAt: Date;
}

// Product Types
export interface Product {
  id: string;
  supplierId: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  price: {
    amount: number;
    currency: string;
    unit: string;
  };
  stock: number;
  specifications?: Record<string, string>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Supplier Types
export interface Supplier extends User {
  role: 'supplier';
  businessName: string;
  businessAddress: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  rating: number;
  totalOrders: number;
  responseTime: string;
  products: Product[];
}

// Order Types
export interface Order {
  id: string;
  buyerId: string;
  supplierId: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentLinkId?: string;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

// Address Types
export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: string;
  type: 'text' | 'image' | 'document';
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  buyerId: string;
  supplierId: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: Date;
}

// Payment Link Types
export interface PaymentLink {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'active' | 'paid' | 'expired';
  expiresAt: Date;
  createdAt: Date;
  paidAt?: Date;
}

// Transport/Logistics Types
export interface TransportBooking {
  id: string;
  orderId: string;
  buyerId: string;
  supplierId: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  vehicleType: 'truck' | 'van' | 'container';
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'inch';
  };
  estimatedCost: number;
  status: 'requested' | 'confirmed' | 'in_transit' | 'delivered';
  trackingId?: string;
  createdAt: Date;
  estimatedDelivery?: Date;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}
