export interface Supplier {
  id: string;
  companyName: string;
  description: string;
  logo?: string;
  coverImage?: string;
  businessType: 'manufacturer' | 'wholesaler' | 'distributor' | 'trader';
  yearEstablished: number;
  employeeCount: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  certifications: Certification[];
  categories: string[];
  rating: number;
  reviewCount: number;
  responseTime: string;
  responseRate: number;
  verified: boolean;
  premium: boolean;
  stats: {
    totalProducts: number;
    totalOrders: number;
    successfulTransactions: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  validUntil: string;
  documentUrl?: string;
}

export interface SupplierReview {
  id: string;
  supplierId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  orderId?: string;
  createdAt: string;
}
