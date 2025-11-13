import { Product } from '../types';
import { alibabaProducts } from './alibaba-products';

export interface InventoryRecord {
  available: number;
  reserved: number;
}

export const catalogProducts: Product[] = [
  {
    id: 'prod-led-100w',
    productId: 'prod-led-100w',
    supplierId: 's1',
    businessId: 'b1',
    categoryId: 'cat-electronics',
    category: 'Electronics',
    currencyId: 'curr-inr',
    priceUnitId: 'unit-piece',
    product_name: 'Industrial LED Light 100W',
    slug: 'industrial-led-light-100w',
    description:
      'High-efficiency LED lighting solution for warehouses and factories with BIS certification and 50,000 hour lifespan.',
    specifications: JSON.stringify({
      Wattage: '100W',
      Voltage: '220-240V',
      Certification: 'BIS, ISO 9001:2015',
    }),
    base_price: 1250,
    minOrderQuantity: 50,
    maxOrderQuantity: 10000,
    unit_in_stock: 1000,
    available_quantity: 1000,
    status: 'active',
    is_featured: true,
    name: 'Industrial LED Light 100W',
    images: ['https://images.unsplash.com/photo-1524501537239-6e6d23b24ea8?w=800'],
    stock: 1000,
    supplier: {
      id: 's1',
      name: 'TechLight Industries',
      location: 'Mumbai',
      rating: 4.6,
    },
    price: { amount: 1250, currency: 'INR', unit: 'piece' },
    tags: ['LED', 'Industrial', 'Energy Efficient'],
    createdAt: new Date('2024-02-15T09:00:00Z'),
    updatedAt: new Date('2024-10-10T09:00:00Z'),
  },
  {
    id: 'prod-cotton-rolls',
    productId: 'prod-cotton-rolls',
    supplierId: 's2',
    businessId: 'b2',
    categoryId: 'cat-textiles',
    category: 'Textiles',
    currencyId: 'curr-inr',
    priceUnitId: 'unit-meter',
    product_name: 'Cotton Fabric Rolls',
    slug: 'cotton-fabric-rolls',
    description:
      'Premium quality cotton fabric, 40s count, perfect for garments. Available in custom dyes and weaves for private labels.',
    specifications: JSON.stringify({
      Composition: '100% Cotton',
      Width: '63 inch',
      GSM: '140',
    }),
    base_price: 280,
    minOrderQuantity: 500,
    maxOrderQuantity: 50000,
    unit_in_stock: 5000,
    available_quantity: 5000,
    status: 'active',
    is_featured: true,
    name: 'Cotton Fabric Rolls',
    images: ['https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800'],
    stock: 5000,
    supplier: {
      id: 's2',
      name: 'Textile Hub',
      location: 'Surat',
      rating: 4.8,
    },
    price: { amount: 280, currency: 'INR', unit: 'meter' },
    tags: ['Cotton', 'Fabric', 'Textile'],
    createdAt: new Date('2024-01-18T06:30:00Z'),
    updatedAt: new Date('2024-10-05T06:30:00Z'),
  },
  {
    id: 'prod-hydraulic-press',
    productId: 'prod-hydraulic-press',
    supplierId: 's3',
    businessId: 'b3',
    categoryId: 'cat-machinery',
    category: 'Machinery',
    currencyId: 'curr-inr',
    priceUnitId: 'unit-unit',
    product_name: 'Hydraulic Press Machine',
    slug: 'hydraulic-press-machine',
    description:
      '50 Ton hydraulic press for metal forming and fabrication with PLC controls and onsite installation support.',
    specifications: JSON.stringify({
      Capacity: '50 Ton',
      Stroke: '250 mm',
      TableSize: '900 x 600 mm',
    }),
    base_price: 450000,
    minOrderQuantity: 1,
    maxOrderQuantity: 10,
    unit_in_stock: 15,
    available_quantity: 15,
    status: 'active',
    is_featured: true,
    name: 'Hydraulic Press Machine',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'],
    stock: 15,
    supplier: {
      id: 's3',
      name: 'MachineWorks Ltd',
      location: 'Pune',
      rating: 4.7,
    },
    price: { amount: 450000, currency: 'INR', unit: 'unit' },
    tags: ['Machinery', 'Hydraulic', 'Manufacturing'],
    createdAt: new Date('2023-12-01T04:45:00Z'),
    updatedAt: new Date('2024-09-20T04:45:00Z'),
  },
  {
    id: 'prod-organic-turmeric',
    productId: 'prod-organic-turmeric',
    supplierId: 's4',
    businessId: 'b4',
    categoryId: 'cat-food',
    category: 'Food',
    currencyId: 'curr-inr',
    priceUnitId: 'unit-kg',
    product_name: 'Organic Turmeric Powder',
    slug: 'organic-turmeric-powder',
    description:
      'Premium organic turmeric powder, lab-tested and FSSAI certified with custom packaging options for export.',
    specifications: JSON.stringify({
      Curcumin: '5.5%',
      Moisture: '< 8%',
      ShelfLife: '18 months',
    }),
    base_price: 450,
    minOrderQuantity: 100,
    maxOrderQuantity: 10000,
    unit_in_stock: 2000,
    available_quantity: 2000,
    status: 'active',
    is_featured: true,
    name: 'Organic Turmeric Powder',
    images: ['https://images.unsplash.com/photo-1615485500134-275e3a8b8d21?w=800'],
    stock: 2000,
    supplier: {
      id: 's4',
      name: 'Organic Farms Co',
      location: 'Kochi',
      rating: 4.9,
    },
    price: { amount: 450, currency: 'INR', unit: 'kg' },
    tags: ['Organic', 'Spices', 'Food'],
    createdAt: new Date('2024-03-11T11:20:00Z'),
    updatedAt: new Date('2024-10-12T11:20:00Z'),
  },
  // Add Alibaba.com products
  ...alibabaProducts,
];

export const initialInventory: Record<string, InventoryRecord> = catalogProducts.reduce(
  (acc, product) => {
    acc[product.id] = { available: product.stock, reserved: 0 };
    return acc;
  },
  {} as Record<string, InventoryRecord>
);

export const draftCatalog = [
  {
    id: 'draft-smart-light',
    name: 'Smart Street Light 90W',
    status: 'under_review' as const,
    lastUpdated: '06 Nov 2024',
    reviewer: 'Airavat Quality Team',
    notes: 'Awaiting BIS certificate upload and LM79 test report.',
  },
  {
    id: 'draft-solar-kit',
    name: 'Solar Rooftop Kit 3kW',
    status: 'changes_requested' as const,
    lastUpdated: '04 Nov 2024',
    reviewer: 'Energy Onboarding',
    notes: 'Clarify inverter warranty and provide installation SLA.',
  },
];

export const supplierMailThreads = [
  {
    id: 'mail-1',
    subject: 'Buyer follow-up: LED Light samples',
    sender: 'Virendra (Airavat Buyer)',
    receivedAt: '08 Nov 2024 · 09:40 AM',
    status: 'awaiting_reply' as const,
  },
  {
    id: 'mail-2',
    subject: 'Compliance request: Upload BIS license',
    sender: 'Compliance Desk',
    receivedAt: '07 Nov 2024 · 04:25 PM',
    status: 'in_review' as const,
  },
  {
    id: 'mail-3',
    subject: 'Marketing boost: November spotlight campaign',
    sender: 'Airavat Growth',
    receivedAt: '05 Nov 2024 · 11:10 AM',
    status: 'resolved' as const,
  },
];

export const advertisingBundles = [
  {
    id: 'bundle-growth',
    name: 'Growth Booster',
    description: 'Priority placement in search for high-review SKUs plus 5 sponsored RFQ invites.',
    monthlyCost: 7999,
    impressions: 'Up to 35k monthly',
  },
  {
    id: 'bundle-premium',
    name: 'Premium Spotlight',
    description: 'Homepage spotlight tile, logistics subsidy coupons, and dedicated success manager.',
    monthlyCost: 14999,
    impressions: 'Up to 75k monthly',
  },
  {
    id: 'bundle-crossborder',
    name: 'Cross-border Accelerator',
    description: 'Feature on global buyer newsletters with translation support for priority RFQs.',
    monthlyCost: 11999,
    impressions: 'Global reach + 20 RFQ boosts',
  },
];

export type DraftStatus = (typeof draftCatalog)[number]['status'];
