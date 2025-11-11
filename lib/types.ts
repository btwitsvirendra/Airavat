// Import database schema types
import type {
  Users,
  UserProfiles,
  Addresses,
  Suppliers,
  Products,
  Categories,
  Orders,
  OrderItems,
  RFQs,
  RFQQuotes,
  PaymentLinks,
  TransportBookings,
  Conversations,
  Messages,
  Reviews,
  CartItems,
  Wishlists,
} from './database-schema';

// User Types (compatible with database schema)
export interface User extends Omit<Users, 'password_hash' | 'is_verified' | 'is_active' | 'last_login' | 'created_at' | 'updated_at'> {
  phone?: string;
  company?: string;
  gstin?: string;
  createdAt: Date;
  profile?: UserProfile;
}

export interface UserProfile extends UserProfiles {
  addresses?: Address[];
}

// Product Types (compatible with database schema)
export interface Product extends Omit<Products, 'created_at' | 'updated_at' | 'supplier_id' | 'category_id' | 'min_order_quantity' | 'max_order_quantity' | 'stock_quantity' | 'price_per_unit'> {
  supplierId?: string;
  categoryId?: string;
  category?: string; // For backward compatibility
  images: string[]; // Aggregated from ProductImages
  minOrderQuantity: number; // camelCase for backward compatibility
  maxOrderQuantity?: number; // camelCase for backward compatibility
  stock: number; // camelCase alias for stock_quantity
  supplier?: {
    id?: string;
    name: string;
    location?: string;
    rating?: number;
  };
  price: {
    amount: number; // camelCase alias for price_per_unit
    currency: string;
    unit: string;
  };
  specifications?: Record<string, string>; // Aggregated from ProductSpecifications
  tags: string[]; // Aggregated from ProductTags
  createdAt: Date;
  updatedAt: Date;
}

// Supplier Types (compatible with database schema)
export interface Supplier extends Omit<Suppliers, 'created_at' | 'updated_at' | 'user_id'> {
  role: 'supplier';
  userId?: string;
  businessName: string;
  businessAddress: string;
  verificationStatus: 'pending' | 'verified' | 'gold' | 'rejected';
  rating: number;
  totalOrders: number;
  responseTime: string; // For display (e.g., "24 hours")
  responseTimeHours?: number; // From database
  products?: Product[];
  certifications?: Array<{
    type: string;
    number?: string;
    issuedBy?: string;
  }>;
}

// Order Types (compatible with database schema)
export interface Order extends Omit<Orders, 'created_at' | 'updated_at' | 'buyer_id' | 'supplier_id' | 'shipping_address_id' | 'billing_address_id'> {
  buyerId: string;
  supplierId: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'failed' | 'refunded';
  paymentLinkId?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  orderNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem extends Omit<OrderItems, 'created_at' | 'order_id' | 'product_id'> {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  unit?: string;
  variantDetails?: Record<string, string>;
}

// Address Types (compatible with database schema)
export interface Address extends Omit<Addresses, 'created_at' | 'updated_at' | 'user_id' | 'id'> {
  id?: string;
  type?: 'billing' | 'shipping' | 'business';
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark?: string;
  isDefault?: boolean;
}

// Chat Types (compatible with database schema)
export interface ChatMessage extends Omit<Messages, 'created_at' | 'conversation_id' | 'sender_id' | 'receiver_id'> {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: string;
  type: 'text' | 'image' | 'document' | 'quote' | 'payment_link' | 'transport_request';
  timestamp: Date;
  read: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface Conversation extends Omit<Conversations, 'created_at' | 'updated_at' | 'buyer_id' | 'supplier_id'> {
  id: string;
  buyerId: string;
  supplierId: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  unreadCountBuyer?: number;
  unreadCountSupplier?: number;
  createdAt: Date;
  orderId?: string;
  rfqId?: string;
}

// Payment Link Types (compatible with database schema)
export interface PaymentLink extends Omit<PaymentLinks, 'created_at' | 'updated_at' | 'supplier_id' | 'order_id'> {
  id: string;
  orderId?: string;
  supplierId?: string;
  linkCode?: string;
  amount: number;
  currency: string;
  status: 'active' | 'paid' | 'expired' | 'cancelled';
  expiresAt?: Date;
  createdAt: Date;
  paidAt?: Date;
  description?: string;
}

// Transport/Logistics Types (compatible with database schema)
export interface TransportBooking extends Omit<TransportBookings, 'created_at' | 'updated_at' | 'buyer_id' | 'supplier_id' | 'pickup_address_id' | 'delivery_address_id' | 'order_id'> {
  id: string;
  orderId?: string;
  buyerId: string;
  supplierId?: string;
  bookingNumber?: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  vehicleType: 'van' | 'truck' | 'container' | 'air' | 'sea';
  weight: number;
  weightKg?: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit?: 'cm' | 'inch';
  };
  estimatedCost: number;
  actualCost?: number;
  status: 'requested' | 'quoted' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  trackingId?: string;
  carrierName?: string;
  createdAt: Date;
  estimatedDelivery?: Date;
  pickupDate?: Date;
  actualDeliveryDate?: Date;
}

// Category Types (compatible with database schema)
export interface Category extends Omit<Categories, 'created_at' | 'updated_at' | 'parent_id'> {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  imageUrl?: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
}

// RFQ Types (from database schema)
export interface RFQ extends Omit<RFQs, 'created_at' | 'updated_at' | 'buyer_id' | 'category_id'> {
  buyerId: string;
  categoryId?: string;
  category?: string;
  attachmentUrls?: string[];
  quotes?: RFQQuote[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface RFQQuote extends Omit<RFQQuotes, 'created_at' | 'updated_at' | 'rfq_id' | 'supplier_id'> {
  rfqId: string;
  supplierId: string;
  supplier?: Supplier;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

// Review Types (from database schema)
export interface Review extends Omit<Reviews, 'created_at' | 'updated_at' | 'order_id' | 'reviewer_id' | 'reviewed_id' | 'product_id'> {
  orderId: string;
  reviewerId: string;
  reviewedId: string;
  productId?: string;
  product?: Product;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}
