// ============================================
// DATABASE SCHEMA TYPES (Base types matching backend)
// ============================================

interface Users {
  user_id: string;
  email: string;
  password_hash: string;
  full_name: string;
  phone?: string;
  role: string;
  is_verified: boolean;
  status: string;
  email_verified: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

interface Business {
  business_id: string;
  user_id: string;
  business_type_id: string;
  business_name: string;
  display_name: string;
  company_legal_name?: string;
  description?: string;
  gst_number?: string;
  pan_number?: string;
  msme_number?: string;
  can_buy: boolean;
  can_sell: boolean;
  license_number?: string;
  tax_number?: string;
  website_url?: string;
  employee_count?: string;
  year_established?: number;
  is_verified: boolean;
  verification_level?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  primary_contact_phone: string;
  primary_contact_email: string;
  verified_at?: Date;
  verified_by?: string;
  created_at: Date;
  updated_at: Date;
}

interface BusinessTypes {
  business_type_id: string;
  type_name: string;
  description?: string;
  created_at: Date;
}

interface BusinessDocuments {
  document_id: string;
  business_id: string;
  document_type: string;
  document_name: string;
  document_url: string;
  is_verified: boolean;
  verified_at?: Date;
  verified_by?: string;
  uploaded_at: Date;
}

interface BusinessConnections {
  connection_id: string;
  buyer_business_id: string;
  seller_business_id: string;
  following_since?: Date;
  is_following: boolean;
  created_at: Date;
}

interface Products {
  product_id: string;
  business_id: string;
  category_id: string;
  currency_id: string;
  price_unit_id: string;
  product_name: string;
  slug: string;
  description: string;
  specifications?: string;
  base_price: number;
  min_order_quantity: number;
  max_order_quantity?: number;
  unit_in_stock: number;
  available_quantity: number;
  hs_code?: string;
  brand?: string;
  manufacturer?: string;
  country_of_origin?: string;
  status: string;
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ProductImages {
  image_id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
  uploaded_at: Date;
}

interface Categories {
  category_id: string;
  parent_category_id?: string;
  category_name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

interface Currencies {
  currency_id: string;
  currency_code: string;
  currency_name: string;
  symbol: string;
  is_active: boolean;
  display_order: number;
  created_at: Date;
}

interface PriceUnits {
  unit_id: string;
  unit_code: string;
  unit_name: string;
  unit_type: string;
  abbreviation: string;
  is_active: boolean;
  display_order: number;
  created_at: Date;
}

interface Inquiries {
  inquiry_id: string;
  buyer_business_id: string;
  product_id: string;
  inquiry_title: string;
  description: string;
  required_quantity: number;
  budget_range?: string;
  expected_delivery?: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface Quotations {
  quotation_id: string;
  inquiry_id: string;
  seller_business_id: string;
  validity_days: number;
  delivery_time_days: number;
  payment_terms?: string;
  other_terms?: string;
  status: string;
  setup?: string;
  created_at: Date;
  updated_at: Date;
}

interface Orders {
  order_id: string;
  buyer_business_id: string;
  seller_business_id: string;
  currency_id: string;
  order_number: string;
  status: string;
  tax_amount: number;
  discount_amount: number;
  shipping_amount: number;
  final_amount: number;
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  delivery_pincode: string;
  delivery_country: string;
  expected_delivery_date?: Date;
  payment_status: string;
  buyer_notes?: string;
  seller_notes?: string;
  created_at: Date;
  updated_at: Date;
}

interface OrderItems {
  order_item_id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity_unit: string;
  unit_price: number;
  discount_rate: number;
  total_price: number;
  tax_rate: number;
  hs_code?: string;
}

interface Reviews {
  review_id: string;
  order_id: string;
  reviewer_business_id: string;
  reviewed_business_id: string;
  rating: number;
  review_text?: string;
  product_quality_rating?: number;
  delivery_rating?: number;
  communication_rating?: number;
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
}

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
  // Role-based authentication (Alibaba-style)
  roles?: ('buyer' | 'seller')[]; // Array of roles (supports hybrid users)
  defaultView?: 'buyer' | 'seller'; // Preferred default view after login
  supplierStatus?: 'active' | 'inactive' | 'pending' | null; // Supplier membership status
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
