// Import database schema types
import type {
  Users,
  Business,
  BusinessTypes,
  BusinessDocuments,
  BusinessConnections,
  Products,
  ProductImages,
  Categories,
  Currencies,
  PriceUnits,
  Inquiries,
  Quotations,
  Orders,
  OrderItems,
  Reviews,
} from './database-schema';

// ============================================
// USER TYPES (Application-level, camelCase)
// ============================================

export interface User extends Omit<Users, 'user_id' | 'password_hash' | 'created_at' | 'updated_at' | 'last_login' | 'full_name'> {
  id: string; // camelCase alias for user_id
  userId?: string; // For backward compatibility
  full_name: string; // Database field
  name: string; // Application alias for full_name (backward compatibility)
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  phone?: string;
  company?: string; // For backward compatibility
  gstin?: string; // For backward compatibility
  profile?: UserProfile;
}

export interface UserProfile {
  business?: BusinessProfile;
  addresses?: Address[];
}

export interface BusinessProfile extends Omit<Business, 'business_id' | 'user_id' | 'business_type_id' | 'created_at' | 'updated_at' | 'verified_at'> {
  id: string; // camelCase alias for business_id
  businessId?: string;
  userId?: string;
  businessTypeId?: string;
  businessType?: BusinessType;
  documents?: BusinessDocument[];
  createdAt: Date;
  updatedAt: Date;
  verifiedAt?: Date;
}

export interface BusinessType extends Omit<BusinessTypes, 'business_type_id' | 'created_at'> {
  id: string;
  businessTypeId?: string;
  createdAt: Date;
}

export interface BusinessDocument extends Omit<BusinessDocuments, 'document_id' | 'business_id' | 'uploaded_at' | 'verified_at'> {
  id: string;
  businessId?: string;
  uploadedAt: Date;
  verifiedAt?: Date;
}

// ============================================
// ADDRESS TYPES
// ============================================

export interface Address {
  id?: string;
  type?: 'billing' | 'shipping' | 'business';
  addressLine1: string;
  addressLine2?: string;
  street?: string; // For backward compatibility
  city: string;
  state: string;
  country: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

// ============================================
// PRODUCT TYPES (Application-level, camelCase)
// ============================================

export interface Product extends Omit<Products, 'product_id' | 'business_id' | 'category_id' | 'currency_id' | 'price_unit_id' | 'created_at' | 'updated_at' | 'min_order_quantity' | 'max_order_quantity' | 'unit_in_stock' | 'available_quantity' | 'base_price' | 'product_name' | 'specifications'> {
  id: string; // camelCase alias for product_id
  productId?: string;
  supplierId?: string; // For backward compatibility (maps to business_id)
  businessId?: string;
  categoryId?: string;
  category?: string; // For backward compatibility
  categoryDetails?: Category;
  currencyId?: string;
  currency?: Currency;
  priceUnitId?: string;
  priceUnit?: PriceUnit;
  product_name: string; // Database field
  name: string; // Application alias for product_name (backward compatibility)
  images: string[]; // Aggregated from ProductImages
  minOrderQuantity: number; // camelCase for backward compatibility
  maxOrderQuantity?: number; // camelCase for backward compatibility
  stock: number; // camelCase alias for available_quantity
  unitInStock?: number; // camelCase alias for unit_in_stock
  available_quantity: number; // Database field
  unit_in_stock: number; // Database field
  base_price: number; // Database field
  specifications?: string | Record<string, string>; // Can be JSON string or parsed object
  supplier?: {
    id?: string;
    name: string;
    location?: string;
    rating?: number;
  };
  price: {
    amount: number; // camelCase alias for base_price
    currency: string;
    unit: string;
  };
  tags: string[]; // For backward compatibility
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage extends Omit<ProductImages, 'image_id' | 'product_id' | 'uploaded_at'> {
  id: string;
  productId?: string;
  uploadedAt: Date;
}

export interface Category extends Omit<Categories, 'category_id' | 'parent_category_id' | 'created_at' | 'updated_at'> {
  id: string;
  categoryId?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  productCount?: number; // For backward compatibility
  icon?: string; // For backward compatibility
  imageUrl?: string; // For backward compatibility
  createdAt: Date;
  updatedAt: Date;
}

export interface Currency extends Omit<Currencies, 'currency_id' | 'created_at'> {
  id: string;
  currencyId?: string;
  createdAt: Date;
}

export interface PriceUnit extends Omit<PriceUnits, 'unit_id' | 'created_at'> {
  id: string;
  unitId?: string;
  createdAt: Date;
}

// ============================================
// SUPPLIER TYPES (For backward compatibility)
// ============================================

export interface Supplier extends Omit<Business, 'business_id' | 'user_id' | 'business_type_id' | 'created_at' | 'updated_at' | 'verified_at'> {
  id: string;
  role: 'supplier';
  userId?: string;
  businessId?: string;
  businessName: string; // Alias for business_name
  businessAddress: string; // Combined from address fields
  verificationStatus: 'pending' | 'verified' | 'gold' | 'rejected';
  rating: number; // Calculated from reviews
  totalOrders: number; // Calculated
  responseTime: string; // For display
  responseTimeHours?: number;
  products?: Product[];
  certifications?: Array<{
    type: string;
    number?: string;
    issuedBy?: string;
  }>;
}

// ============================================
// INQUIRY & QUOTATION TYPES
// ============================================

export interface Inquiry extends Omit<Inquiries, 'inquiry_id' | 'buyer_business_id' | 'product_id' | 'created_at' | 'updated_at' | 'expected_delivery'> {
  id: string; // camelCase alias for inquiry_id
  inquiryId?: string;
  buyerId: string; // camelCase alias for buyer_business_id
  buyerBusinessId?: string;
  productId: string;
  product?: Product;
  quotes?: Quotation[];
  createdAt: Date;
  updatedAt: Date;
  expectedDelivery?: Date;
}

export interface Quotation extends Omit<Quotations, 'quotation_id' | 'inquiry_id' | 'seller_business_id' | 'created_at' | 'updated_at'> {
  id: string; // camelCase alias for quotation_id
  quotationId?: string;
  inquiryId: string;
  inquiry?: Inquiry;
  sellerId: string; // camelCase alias for seller_business_id
  sellerBusinessId?: string;
  seller?: Supplier;
  createdAt: Date;
  updatedAt: Date;
}

// RFQ Types (aliases for backward compatibility)
export interface RFQ extends Inquiry {
  rfqId?: string;
}

export interface RFQQuote extends Quotation {
  rfqId?: string;
}

// ============================================
// ORDER TYPES
// ============================================

export interface Order extends Omit<Orders, 'order_id' | 'buyer_business_id' | 'seller_business_id' | 'currency_id' | 'created_at' | 'updated_at' | 'expected_delivery_date'> {
  id: string; // camelCase alias for order_id
  orderId?: string;
  orderNumber?: string;
  buyerId: string; // camelCase alias for buyer_business_id
  buyerBusinessId?: string;
  supplierId: string; // camelCase alias for seller_business_id (for backward compatibility)
  sellerId?: string;
  sellerBusinessId?: string;
  products: OrderItem[];
  totalAmount: number; // Alias for final_amount
  subtotal?: number; // Calculated
  taxAmount?: number;
  discountAmount?: number;
  shippingAmount?: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'failed' | 'refunded';
  paymentLinkId?: string; // For backward compatibility
  shippingAddress: Address;
  billingAddress?: Address;
  currencyId?: string;
  currency?: Currency;
  createdAt: Date;
  updatedAt: Date;
  expectedDeliveryDate?: Date;
}

export interface OrderItem extends Omit<OrderItems, 'order_item_id' | 'order_id' | 'product_id'> {
  id: string; // camelCase alias for order_item_id
  orderItemId?: string;
  orderId?: string;
  productId: string;
  productName: string;
  quantity: number; // Parsed from quantity_unit or calculated
  quantityUnit?: string;
  pricePerUnit: number; // Alias for unit_price
  unitPrice?: number;
  totalPrice: number;
  unit?: string; // For backward compatibility
  discountRate?: number;
  taxRate?: number;
  variantDetails?: Record<string, string>;
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review extends Omit<Reviews, 'review_id' | 'order_id' | 'reviewer_business_id' | 'reviewed_business_id' | 'created_at' | 'updated_at'> {
  id: string; // camelCase alias for review_id
  reviewId?: string;
  orderId: string;
  reviewerId: string; // camelCase alias for reviewer_business_id
  reviewerBusinessId?: string;
  reviewedId: string; // camelCase alias for reviewed_business_id
  reviewedBusinessId?: string;
  productId?: string; // For backward compatibility
  product?: Product;
  images?: string[]; // For backward compatibility
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// CHAT TYPES (For backward compatibility)
// ============================================

export interface ChatMessage {
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

export interface Conversation {
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
  inquiryId?: string;
}

// ============================================
// PAYMENT LINK TYPES (For backward compatibility)
// ============================================

export interface PaymentLink {
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

// ============================================
// TRANSPORT/LOGISTICS TYPES (For backward compatibility)
// ============================================

export interface TransportBooking {
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

// ============================================
// BUSINESS CONNECTION TYPES
// ============================================

export interface BusinessConnection extends Omit<BusinessConnections, 'connection_id' | 'buyer_business_id' | 'seller_business_id' | 'created_at' | 'following_since'> {
  id: string;
  connectionId?: string;
  buyerId: string;
  buyerBusinessId?: string;
  sellerId: string;
  sellerBusinessId?: string;
  followingSince?: Date;
  createdAt: Date;
}
