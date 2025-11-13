/**
 * Airavat Database Schema
 * Complete database schema matching the ERD diagram
 * All column names use snake_case as per database convention
 */

// ============================================
// USER & AUTHENTICATION TABLES
// ============================================

export interface Users {
  user_id: string; // UUID, PK
  email: string;
  password_hash: string;
  full_name: string;
  phone?: string;
  role: string; // 'buyer', 'seller', 'admin', etc.
  is_verified: boolean;
  status: string; // 'active', 'inactive', 'suspended'
  email_verified: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

// ============================================
// BUSINESS TABLES
// ============================================

export interface BusinessTypes {
  business_type_id: string; // UUID, PK
  type_name: string;
  description?: string;
  created_at: Date;
}

export interface Business {
  business_id: string; // UUID, PK
  user_id: string; // FK -> Users
  business_type_id: string; // FK -> BusinessTypes
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
  verification_level?: string; // 'basic', 'verified', 'gold', 'platinum'
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  primary_contact_phone: string;
  primary_contact_email: string;
  verified_at?: Date;
  verified_by?: string; // FK -> Users (admin)
  created_at: Date;
  updated_at: Date;
}

export interface BusinessDocuments {
  document_id: string; // UUID, PK
  business_id: string; // FK -> Business
  document_type: string; // 'gst', 'pan', 'msme', 'license', 'certificate', etc.
  document_name: string;
  document_url: string;
  is_verified: boolean;
  verified_at?: Date;
  verified_by?: string; // FK -> Users (admin)
  uploaded_at: Date;
}

export interface BusinessConnections {
  connection_id: string; // UUID, PK
  buyer_business_id: string; // FK -> Business
  seller_business_id: string; // FK -> Business
  following_since?: Date;
  is_following: boolean;
  created_at: Date;
}

// ============================================
// PRODUCT & CATALOG TABLES
// ============================================

export interface Categories {
  category_id: string; // UUID, PK
  parent_category_id?: string; // FK -> Categories (self-referential)
  category_name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Currencies {
  currency_id: string; // UUID, PK
  currency_code: string; // 'INR', 'USD', 'EUR', etc.
  currency_name: string;
  symbol: string; // '₹', '$', '€', etc.
  is_active: boolean;
  display_order: number;
  created_at: Date;
}

export interface PriceUnits {
  unit_id: string; // UUID, PK
  unit_code: string; // 'kg', 'piece', 'meter', 'litre', etc.
  unit_name: string;
  unit_type: string; // 'weight', 'length', 'volume', 'count', etc.
  abbreviation: string;
  is_active: boolean;
  display_order: number;
  created_at: Date;
}

export interface Products {
  product_id: string; // UUID, PK
  business_id: string; // FK -> Business (seller)
  category_id: string; // FK -> Categories
  currency_id: string; // FK -> Currencies
  price_unit_id: string; // FK -> PriceUnits
  product_name: string;
  slug: string;
  description: string;
  specifications?: string; // JSON or text
  base_price: number;
  min_order_quantity: number;
  max_order_quantity?: number;
  unit_in_stock: number;
  available_quantity: number;
  hs_code?: string;
  brand?: string;
  manufacturer?: string;
  country_of_origin?: string;
  status: string; // 'active', 'inactive', 'draft', 'pending_review'
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ProductImages {
  image_id: string; // UUID, PK
  product_id: string; // FK -> Products
  image_url: string;
  display_order: number;
  is_primary: boolean;
  uploaded_at: Date;
}

// ============================================
// INQUIRY & QUOTATION TABLES
// ============================================

export interface Inquiries {
  inquiry_id: string; // UUID, PK
  buyer_business_id: string; // FK -> Business
  product_id: string; // FK -> Products
  inquiry_title: string;
  description: string;
  required_quantity: number;
  budget_range?: string;
  expected_delivery?: Date;
  status: string; // 'open', 'closed', 'cancelled'
  created_at: Date;
  updated_at: Date;
}

export interface Quotations {
  quotation_id: string; // UUID, PK
  inquiry_id: string; // FK -> Inquiries
  seller_business_id: string; // FK -> Business
  validity_days: number;
  delivery_time_days: number;
  payment_terms?: string;
  other_terms?: string;
  status: string; // 'pending', 'accepted', 'rejected', 'expired'
  setup?: string; // JSON or text for additional setup info
  created_at: Date;
  updated_at: Date;
}

// ============================================
// ORDER & TRANSACTION TABLES
// ============================================

export interface Orders {
  order_id: string; // UUID, PK
  buyer_business_id: string; // FK -> Business
  seller_business_id: string; // FK -> Business
  currency_id: string; // FK -> Currencies
  order_number: string; // Unique order number
  status: string; // 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
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
  payment_status: string; // 'pending', 'partial', 'paid', 'failed', 'refunded'
  buyer_notes?: string;
  seller_notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItems {
  order_item_id: string; // UUID, PK
  order_id: string; // FK -> Orders
  product_id: string; // FK -> Products
  product_name: string; // Snapshot at time of order
  quantity_unit: string;
  unit_price: number;
  discount_rate: number; // Percentage
  total_price: number;
  tax_rate: number; // Percentage
  hs_code?: string;
}

// ============================================
// REVIEWS & RATINGS TABLES
// ============================================

export interface Reviews {
  review_id: string; // UUID, PK
  order_id: string; // FK -> Orders
  reviewer_business_id: string; // FK -> Business (buyer who reviews)
  reviewed_business_id: string; // FK -> Business (seller being reviewed)
  rating: number; // 1-5
  review_text?: string;
  product_quality_rating?: number; // 1-5
  delivery_rating?: number; // 1-5
  communication_rating?: number; // 1-5
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
}

// ============================================
// PRISMA MIGRATIONS (Internal)
// ============================================

export interface PrismaMigrations {
  id: string; // PK
  checksum: string;
  finished_at?: Date;
  migration_name: string;
  logs?: string;
  rolled_back_at?: Date;
  started_at: Date;
  applied_steps_count: number;
}

// ============================================
// EXPORT ALL TYPES
// ============================================

export type DatabaseSchema = {
  users: Users;
  business_types: BusinessTypes;
  business: Business;
  business_documents: BusinessDocuments;
  business_connections: BusinessConnections;
  categories: Categories;
  currencies: Currencies;
  price_units: PriceUnits;
  products: Products;
  product_images: ProductImages;
  inquiries: Inquiries;
  quotations: Quotations;
  orders: Orders;
  order_items: OrderItems;
  reviews: Reviews;
  _prisma_migrations: PrismaMigrations;
};
