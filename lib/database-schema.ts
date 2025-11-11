/**
 * Airavat Database Schema
 * Complete database schema for B2B E-commerce Platform
 * Based on industry-standard B2B marketplace patterns
 */

// ============================================
// USER & AUTHENTICATION TABLES
// ============================================

export interface Users {
  id: string; // UUID
  email: string; // Unique
  password_hash: string;
  name: string;
  phone?: string;
  role: 'buyer' | 'supplier' | 'admin';
  is_verified: boolean;
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfiles {
  id: string; // UUID
  user_id: string; // FK -> Users
  company_name?: string;
  gstin?: string;
  pan?: string;
  business_type?: 'manufacturer' | 'trader' | 'retailer' | 'distributor' | 'exporter' | 'importer';
  website?: string;
  logo_url?: string;
  description?: string;
  established_year?: number;
  employee_count?: string;
  annual_turnover?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Addresses {
  id: string; // UUID
  user_id: string; // FK -> Users
  type: 'billing' | 'shipping' | 'business';
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark?: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface VerificationDocuments {
  id: string; // UUID
  user_id: string; // FK -> Users
  document_type: 'gst' | 'pan' | 'aadhaar' | 'company_registration' | 'iec' | 'bank_statement' | 'other';
  document_url: string;
  status: 'pending' | 'approved' | 'rejected';
  verified_by?: string; // FK -> Users (admin)
  verified_at?: Date;
  remarks?: string;
  created_at: Date;
  updated_at: Date;
}

// ============================================
// SUPPLIER SPECIFIC TABLES
// ============================================

export interface Suppliers {
  id: string; // UUID
  user_id: string; // FK -> Users
  business_name: string;
  business_address: string;
  verification_status: 'pending' | 'verified' | 'gold' | 'rejected';
  rating: number; // 0-5
  total_orders: number;
  response_time_hours: number;
  on_time_delivery_rate: number; // percentage
  trade_assurance_enabled: boolean;
  membership_type: 'free' | 'gold' | 'platinum';
  membership_expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SupplierCertifications {
  id: string; // UUID
  supplier_id: string; // FK -> Suppliers
  certification_type: 'iso' | 'bureau_india' | 'export_license' | 'fssai' | 'other';
  certification_number?: string;
  issued_by?: string;
  issued_date?: Date;
  expiry_date?: Date;
  certificate_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface SupplierLocations {
  id: string; // UUID
  supplier_id: string; // FK -> Suppliers
  address_id: string; // FK -> Addresses
  is_primary: boolean;
  warehouse_capacity?: number;
  created_at: Date;
}

// ============================================
// PRODUCT & CATALOG TABLES
// ============================================

export interface Categories {
  id: string; // UUID
  name: string;
  slug: string;
  parent_id?: string; // FK -> Categories (self-referential)
  icon?: string;
  image_url?: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Products {
  id: string; // UUID
  supplier_id: string; // FK -> Suppliers
  category_id: string; // FK -> Categories
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  sku?: string;
  hsn_code?: string;
  min_order_quantity: number;
  max_order_quantity?: number;
  unit: string; // 'piece', 'kg', 'meter', 'litre', etc.
  stock_quantity: number;
  reserved_quantity: number;
  price_per_unit: number;
  currency: string; // 'INR', 'USD', etc.
  discount_percentage?: number;
  is_active: boolean;
  is_featured: boolean;
  is_ready_to_ship: boolean;
  lead_time_days: number;
  view_count: number;
  order_count: number;
  rating_average: number; // 0-5
  rating_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductImages {
  id: string; // UUID
  product_id: string; // FK -> Products
  image_url: string;
  display_order: number;
  is_primary: boolean;
  created_at: Date;
}

export interface ProductSpecifications {
  id: string; // UUID
  product_id: string; // FK -> Products
  specification_key: string;
  specification_value: string;
  display_order: number;
  created_at: Date;
}

export interface ProductTags {
  id: string; // UUID
  product_id: string; // FK -> Products
  tag: string;
  created_at: Date;
}

export interface ProductVariants {
  id: string; // UUID
  product_id: string; // FK -> Products
  variant_name: string; // e.g., 'Color', 'Size'
  variant_value: string; // e.g., 'Red', 'Large'
  price_adjustment: number; // can be negative
  stock_quantity: number;
  sku?: string;
  created_at: Date;
  updated_at: Date;
}

// ============================================
// RFQ (Request for Quotation) TABLES
// ============================================

export interface RFQs {
  id: string; // UUID
  buyer_id: string; // FK -> Users
  title: string;
  description: string;
  category_id?: string; // FK -> Categories
  quantity: number;
  unit: string;
  target_price?: number;
  currency: string;
  delivery_location: string;
  delivery_deadline?: Date;
  status: 'draft' | 'active' | 'closed' | 'cancelled';
  attachment_urls?: string[]; // JSON array
  view_count: number;
  quote_count: number;
  created_at: Date;
  updated_at: Date;
  expires_at?: Date;
}

export interface RFQQuotes {
  id: string; // UUID
  rfq_id: string; // FK -> RFQs
  supplier_id: string; // FK -> Suppliers
  quoted_price: number;
  currency: string;
  quantity: number;
  unit: string;
  lead_time_days: number;
  payment_terms?: string;
  delivery_terms?: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  created_at: Date;
  updated_at: Date;
  expires_at?: Date;
}

export interface RFQAttachments {
  id: string; // UUID
  rfq_id: string; // FK -> RFQs
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: Date;
}

// ============================================
// ORDER & TRANSACTION TABLES
// ============================================

export interface Orders {
  id: string; // UUID
  order_number: string; // Unique, e.g., 'ORD-2024-001234'
  buyer_id: string; // FK -> Users
  supplier_id: string; // FK -> Suppliers
  rfq_id?: string; // FK -> RFQs (if order from RFQ)
  rfq_quote_id?: string; // FK -> RFQQuotes
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'partial' | 'paid' | 'failed' | 'refunded';
  shipping_address_id: string; // FK -> Addresses
  billing_address_id: string; // FK -> Addresses
  notes?: string;
  created_at: Date;
  updated_at: Date;
  confirmed_at?: Date;
  shipped_at?: Date;
  delivered_at?: Date;
  cancelled_at?: Date;
}

export interface OrderItems {
  id: string; // UUID
  order_id: string; // FK -> Orders
  product_id: string; // FK -> Products
  product_name: string; // Snapshot at time of order
  product_sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  unit: string;
  variant_details?: string; // JSON
  created_at: Date;
}

export interface OrderStatusHistory {
  id: string; // UUID
  order_id: string; // FK -> Orders
  status: string;
  notes?: string;
  updated_by?: string; // FK -> Users
  created_at: Date;
}

// ============================================
// PAYMENT TABLES
// ============================================

export interface PaymentLinks {
  id: string; // UUID
  supplier_id: string; // FK -> Suppliers
  order_id?: string; // FK -> Orders
  link_code: string; // Unique identifier for the link
  amount: number;
  currency: string;
  description?: string;
  status: 'active' | 'paid' | 'expired' | 'cancelled';
  expires_at?: Date;
  paid_at?: Date;
  paid_by?: string; // FK -> Users (buyer)
  payment_method?: string;
  transaction_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Payments {
  id: string; // UUID
  order_id: string; // FK -> Orders
  payment_link_id?: string; // FK -> PaymentLinks
  amount: number;
  currency: string;
  payment_method: 'upi' | 'card' | 'netbanking' | 'wallet' | 'bank_transfer' | 'other';
  payment_gateway: string;
  transaction_id: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  gateway_response?: string; // JSON
  paid_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Invoices {
  id: string; // UUID
  order_id: string; // FK -> Orders
  invoice_number: string; // Unique
  invoice_url: string;
  tax_amount: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  issued_at?: Date;
  created_at: Date;
  updated_at: Date;
}

// ============================================
// LOGISTICS & SHIPPING TABLES
// ============================================

export interface TransportBookings {
  id: string; // UUID
  order_id?: string; // FK -> Orders
  buyer_id: string; // FK -> Users
  supplier_id?: string; // FK -> Suppliers
  booking_number: string; // Unique
  pickup_address_id: string; // FK -> Addresses
  delivery_address_id: string; // FK -> Addresses
  vehicle_type: 'van' | 'truck' | 'container' | 'air' | 'sea';
  weight_kg: number;
  length_cm: number;
  width_cm: number;
  height_cm: number;
  estimated_cost: number;
  actual_cost?: number;
  currency: string;
  status: 'requested' | 'quoted' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  tracking_id?: string;
  carrier_name?: string;
  pickup_date?: Date;
  estimated_delivery_date?: Date;
  actual_delivery_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ShippingLabels {
  id: string; // UUID
  transport_booking_id: string; // FK -> TransportBookings
  label_url: string;
  tracking_number: string;
  created_at: Date;
}

// ============================================
// MESSAGING & COMMUNICATION TABLES
// ============================================

export interface Conversations {
  id: string; // UUID
  buyer_id: string; // FK -> Users
  supplier_id: string; // FK -> Suppliers
  order_id?: string; // FK -> Orders
  rfq_id?: string; // FK -> RFQs
  last_message_at?: Date;
  unread_count_buyer: number;
  unread_count_supplier: number;
  is_archived_buyer: boolean;
  is_archived_supplier: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Messages {
  id: string; // UUID
  conversation_id: string; // FK -> Conversations
  sender_id: string; // FK -> Users
  receiver_id: string; // FK -> Users
  message_type: 'text' | 'image' | 'document' | 'quote' | 'payment_link' | 'transport_request';
  content: string;
  attachment_url?: string;
  attachment_name?: string;
  related_quote_id?: string; // FK -> RFQQuotes
  related_payment_link_id?: string; // FK -> PaymentLinks
  related_transport_booking_id?: string; // FK -> TransportBookings
  is_read: boolean;
  read_at?: Date;
  created_at: Date;
}

// ============================================
// REVIEWS & RATINGS TABLES
// ============================================

export interface Reviews {
  id: string; // UUID
  order_id: string; // FK -> Orders
  reviewer_id: string; // FK -> Users (buyer)
  reviewed_id: string; // FK -> Users (supplier)
  product_id?: string; // FK -> Products
  rating: number; // 1-5
  title?: string;
  comment?: string;
  is_verified_purchase: boolean;
  is_approved: boolean;
  helpful_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewImages {
  id: string; // UUID
  review_id: string; // FK -> Reviews
  image_url: string;
  display_order: number;
  created_at: Date;
}

// ============================================
// CART & WISHLIST TABLES
// ============================================

export interface CartItems {
  id: string; // UUID
  user_id: string; // FK -> Users
  product_id: string; // FK -> Products
  quantity: number;
  variant_details?: string; // JSON
  created_at: Date;
  updated_at: Date;
}

export interface Wishlists {
  id: string; // UUID
  user_id: string; // FK -> Users
  product_id: string; // FK -> Products
  created_at: Date;
}

// ============================================
// NOTIFICATIONS TABLES
// ============================================

export interface Notifications {
  id: string; // UUID
  user_id: string; // FK -> Users
  type: 'order_update' | 'message' | 'quote_received' | 'rfq_response' | 'payment' | 'logistics' | 'system';
  title: string;
  message: string;
  related_id?: string; // Generic reference
  is_read: boolean;
  read_at?: Date;
  created_at: Date;
}

// ============================================
// ANALYTICS & TRACKING TABLES
// ============================================

export interface ProductViews {
  id: string; // UUID
  product_id: string; // FK -> Products
  user_id?: string; // FK -> Users (optional, for logged-in users)
  ip_address?: string;
  user_agent?: string;
  viewed_at: Date;
}

export interface SearchQueries {
  id: string; // UUID
  user_id?: string; // FK -> Users (optional)
  query: string;
  filters?: string; // JSON
  results_count: number;
  clicked_product_id?: string; // FK -> Products
  created_at: Date;
}

// ============================================
// ADMIN & SYSTEM TABLES
// ============================================

export interface AdminUsers {
  id: string; // UUID
  user_id: string; // FK -> Users
  role: 'super_admin' | 'admin' | 'moderator' | 'support';
  permissions: string; // JSON array
  created_at: Date;
  updated_at: Date;
}

export interface SystemSettings {
  id: string; // UUID
  key: string; // Unique
  value: string; // JSON or string
  description?: string;
  updated_by?: string; // FK -> Users
  updated_at: Date;
}

export interface AuditLogs {
  id: string; // UUID
  user_id?: string; // FK -> Users
  action: string;
  entity_type: string;
  entity_id: string;
  changes?: string; // JSON
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

// ============================================
// EXPORT ALL TYPES
// ============================================

export type DatabaseSchema = {
  users: Users;
  user_profiles: UserProfiles;
  addresses: Addresses;
  verification_documents: VerificationDocuments;
  suppliers: Suppliers;
  supplier_certifications: SupplierCertifications;
  supplier_locations: SupplierLocations;
  categories: Categories;
  products: Products;
  product_images: ProductImages;
  product_specifications: ProductSpecifications;
  product_tags: ProductTags;
  product_variants: ProductVariants;
  rfqs: RFQs;
  rfq_quotes: RFQQuotes;
  rfq_attachments: RFQAttachments;
  orders: Orders;
  order_items: OrderItems;
  order_status_history: OrderStatusHistory;
  payment_links: PaymentLinks;
  payments: Payments;
  invoices: Invoices;
  transport_bookings: TransportBookings;
  shipping_labels: ShippingLabels;
  conversations: Conversations;
  messages: Messages;
  reviews: Reviews;
  review_images: ReviewImages;
  cart_items: CartItems;
  wishlists: Wishlists;
  notifications: Notifications;
  product_views: ProductViews;
  search_queries: SearchQueries;
  admin_users: AdminUsers;
  system_settings: SystemSettings;
  audit_logs: AuditLogs;
};

