export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  price: number;
  minOrderQuantity: number;
  unit: string;
  images: string[];
  specifications: Record<string, string>;
  supplierId: string;
  supplierName: string;
  supplierLocation: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  leadTime: string;
  certifications?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  subCategories?: ProductSubCategory[];
}

export interface ProductSubCategory {
  id: string;
  name: string;
  productCount: number;
}

export interface ProductFilters {
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  supplier?: string;
  inStock?: boolean;
  certifications?: string[];
  rating?: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  price: number;
  minOrderQuantity: number;
  unit: string;
  images: string[];
  specifications: Record<string, string>;
  leadTime: string;
  certifications?: string[];
  tags: string[];
}
