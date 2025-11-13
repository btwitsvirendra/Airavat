/**
 * Comprehensive Category List based on Alibaba.com structure
 * For B2B E-commerce Platform
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories?: Category[];
}

export const categories: Category[] = [
  {
    id: 'apparel-accessories',
    name: 'Apparel & Accessories',
    slug: 'apparel-accessories',
    icon: '👔',
    description: 'Clothing, textiles, and fashion accessories',
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing", slug: 'mens-clothing', icon: '👕', description: '' },
      { id: 'womens-clothing', name: "Women's Clothing", slug: 'womens-clothing', icon: '👗', description: '' },
      { id: 'bags-luggage', name: 'Bags & Luggage', slug: 'bags-luggage', icon: '👜', description: '' },
      { id: 'textiles', name: 'Textiles & Fabrics', slug: 'textiles', icon: '🧵', description: '' },
    ],
  },
  {
    id: 'automobiles-motorcycles',
    name: 'Automobiles & Motorcycles',
    slug: 'automobiles-motorcycles',
    icon: '🚗',
    description: 'Auto parts, motorcycles, and vehicle accessories',
    subcategories: [
      { id: 'auto-parts', name: 'Auto Parts', slug: 'auto-parts', icon: '🔧', description: '' },
      { id: 'motorcycles', name: 'Motorcycles', slug: 'motorcycles', icon: '🏍️', description: '' },
      { id: 'tires', name: 'Tires & Wheels', slug: 'tires', icon: '⭕', description: '' },
    ],
  },
  {
    id: 'beauty-personal-care',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    icon: '💄',
    description: 'Cosmetics, skincare, and personal care products',
    subcategories: [
      { id: 'cosmetics', name: 'Cosmetics', slug: 'cosmetics', icon: '💋', description: '' },
      { id: 'skincare', name: 'Skincare', slug: 'skincare', icon: '🧴', description: '' },
      { id: 'hair-care', name: 'Hair Care', slug: 'hair-care', icon: '💇', description: '' },
    ],
  },
  {
    id: 'chemicals',
    name: 'Chemicals',
    slug: 'chemicals',
    icon: '⚗️',
    description: 'Industrial chemicals and raw materials',
    subcategories: [
      { id: 'organic-chemicals', name: 'Organic Chemicals', slug: 'organic-chemicals', icon: '🧪', description: '' },
      { id: 'inorganic-chemicals', name: 'Inorganic Chemicals', slug: 'inorganic-chemicals', icon: '⚛️', description: '' },
      { id: 'pharmaceuticals', name: 'Pharmaceuticals', slug: 'pharmaceuticals', icon: '💊', description: '' },
    ],
  },
  {
    id: 'computer-hardware-software',
    name: 'Computer Hardware & Software',
    slug: 'computer-hardware-software',
    icon: '💻',
    description: 'Computers, components, and software',
    subcategories: [
      { id: 'laptops', name: 'Laptops', slug: 'laptops', icon: '💻', description: '' },
      { id: 'components', name: 'Computer Components', slug: 'components', icon: '🔌', description: '' },
      { id: 'peripherals', name: 'Peripherals', slug: 'peripherals', icon: '🖱️', description: '' },
    ],
  },
  {
    id: 'construction-real-estate',
    name: 'Construction & Real Estate',
    slug: 'construction-real-estate',
    icon: '🏗️',
    description: 'Building materials and construction equipment',
    subcategories: [
      { id: 'building-materials', name: 'Building Materials', slug: 'building-materials', icon: '🧱', description: '' },
      { id: 'construction-machinery', name: 'Construction Machinery', slug: 'construction-machinery', icon: '🏗️', description: '' },
      { id: 'tools', name: 'Construction Tools', slug: 'tools', icon: '🔨', description: '' },
    ],
  },
  {
    id: 'consumer-electronics',
    name: 'Consumer Electronics',
    slug: 'consumer-electronics',
    icon: '📱',
    description: 'Mobile phones, tablets, and electronic devices',
    subcategories: [
      { id: 'mobile-phones', name: 'Mobile Phones', slug: 'mobile-phones', icon: '📱', description: '' },
      { id: 'tablets', name: 'Tablets', slug: 'tablets', icon: '📱', description: '' },
      { id: 'audio-video', name: 'Audio & Video', slug: 'audio-video', icon: '🎧', description: '' },
    ],
  },
  {
    id: 'electrical-equipment',
    name: 'Electrical Equipment & Supplies',
    slug: 'electrical-equipment',
    icon: '⚡',
    description: 'Electrical components and equipment',
    subcategories: [
      { id: 'wires-cables', name: 'Wires & Cables', slug: 'wires-cables', icon: '🔌', description: '' },
      { id: 'switches', name: 'Switches & Relays', slug: 'switches', icon: '🔘', description: '' },
      { id: 'batteries', name: 'Batteries', slug: 'batteries', icon: '🔋', description: '' },
    ],
  },
  {
    id: 'energy',
    name: 'Energy',
    slug: 'energy',
    icon: '⚡',
    description: 'Solar panels, batteries, and energy solutions',
    subcategories: [
      { id: 'solar-energy', name: 'Solar Energy', slug: 'solar-energy', icon: '☀️', description: '' },
      { id: 'wind-energy', name: 'Wind Energy', slug: 'wind-energy', icon: '💨', description: '' },
      { id: 'batteries-storage', name: 'Batteries & Storage', slug: 'batteries-storage', icon: '🔋', description: '' },
    ],
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    slug: 'food-beverage',
    icon: '🍽️',
    description: 'Food products, beverages, and ingredients',
    subcategories: [
      { id: 'processed-food', name: 'Processed Food', slug: 'processed-food', icon: '🍕', description: '' },
      { id: 'beverages', name: 'Beverages', slug: 'beverages', icon: '🥤', description: '' },
      { id: 'spices', name: 'Spices & Seasonings', slug: 'spices', icon: '🌶️', description: '' },
    ],
  },
  {
    id: 'furniture',
    name: 'Furniture',
    slug: 'furniture',
    icon: '🪑',
    description: 'Office, home, and commercial furniture',
    subcategories: [
      { id: 'office-furniture', name: 'Office Furniture', slug: 'office-furniture', icon: '🪑', description: '' },
      { id: 'home-furniture', name: 'Home Furniture', slug: 'home-furniture', icon: '🛋️', description: '' },
      { id: 'outdoor-furniture', name: 'Outdoor Furniture', slug: 'outdoor-furniture', icon: '🌳', description: '' },
    ],
  },
  {
    id: 'gifts-crafts',
    name: 'Gifts & Crafts',
    slug: 'gifts-crafts',
    icon: '🎁',
    description: 'Gift items, crafts, and decorative products',
    subcategories: [
      { id: 'gift-items', name: 'Gift Items', slug: 'gift-items', icon: '🎁', description: '' },
      { id: 'craft-supplies', name: 'Craft Supplies', slug: 'craft-supplies', icon: '✂️', description: '' },
      { id: 'decorative-items', name: 'Decorative Items', slug: 'decorative-items', icon: '🖼️', description: '' },
    ],
  },
  {
    id: 'hardware',
    name: 'Hardware',
    slug: 'hardware',
    icon: '🔩',
    description: 'Hardware tools and fasteners',
    subcategories: [
      { id: 'hand-tools', name: 'Hand Tools', slug: 'hand-tools', icon: '🔧', description: '' },
      { id: 'power-tools', name: 'Power Tools', slug: 'power-tools', icon: '⚙️', description: '' },
      { id: 'fasteners', name: 'Fasteners', slug: 'fasteners', icon: '🔩', description: '' },
    ],
  },
  {
    id: 'health-medical',
    name: 'Health & Medical',
    slug: 'health-medical',
    icon: '🏥',
    description: 'Medical equipment and health products',
    subcategories: [
      { id: 'medical-equipment', name: 'Medical Equipment', slug: 'medical-equipment', icon: '🏥', description: '' },
      { id: 'surgical-instruments', name: 'Surgical Instruments', slug: 'surgical-instruments', icon: '🔬', description: '' },
      { id: 'health-supplements', name: 'Health Supplements', slug: 'health-supplements', icon: '💊', description: '' },
    ],
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    slug: 'home-garden',
    icon: '🏡',
    description: 'Home improvement and garden supplies',
    subcategories: [
      { id: 'home-decor', name: 'Home Decor', slug: 'home-decor', icon: '🖼️', description: '' },
      { id: 'kitchen-supplies', name: 'Kitchen Supplies', slug: 'kitchen-supplies', icon: '🍳', description: '' },
      { id: 'garden-tools', name: 'Garden Tools', slug: 'garden-tools', icon: '🌱', description: '' },
    ],
  },
  {
    id: 'industrial-parts',
    name: 'Industrial Parts & Fabrication Services',
    slug: 'industrial-parts',
    icon: '⚙️',
    description: 'Industrial components and fabrication',
    subcategories: [
      { id: 'machinery-parts', name: 'Machinery Parts', slug: 'machinery-parts', icon: '⚙️', description: '' },
      { id: 'fabrication-services', name: 'Fabrication Services', slug: 'fabrication-services', icon: '🔨', description: '' },
      { id: 'industrial-equipment', name: 'Industrial Equipment', slug: 'industrial-equipment', icon: '🏭', description: '' },
    ],
  },
  {
    id: 'lights-lighting',
    name: 'Lights & Lighting',
    slug: 'lights-lighting',
    icon: '💡',
    description: 'LED lights, fixtures, and lighting solutions',
    subcategories: [
      { id: 'led-lights', name: 'LED Lights', slug: 'led-lights', icon: '💡', description: '' },
      { id: 'lighting-fixtures', name: 'Lighting Fixtures', slug: 'lighting-fixtures', icon: '🕯️', description: '' },
      { id: 'outdoor-lighting', name: 'Outdoor Lighting', slug: 'outdoor-lighting', icon: '🌃', description: '' },
    ],
  },
  {
    id: 'machinery',
    name: 'Machinery',
    slug: 'machinery',
    icon: '🏭',
    description: 'Industrial machinery and equipment',
    subcategories: [
      { id: 'cnc-machines', name: 'CNC Machines', slug: 'cnc-machines', icon: '⚙️', description: '' },
      { id: 'packaging-machinery', name: 'Packaging Machinery', slug: 'packaging-machinery', icon: '📦', description: '' },
      { id: 'textile-machinery', name: 'Textile Machinery', slug: 'textile-machinery', icon: '🧵', description: '' },
    ],
  },
  {
    id: 'measurement-analysis',
    name: 'Measurement & Analysis Instruments',
    slug: 'measurement-analysis',
    icon: '📊',
    description: 'Measuring instruments and analytical equipment',
    subcategories: [
      { id: 'measuring-tools', name: 'Measuring Tools', slug: 'measuring-tools', icon: '📏', description: '' },
      { id: 'analytical-instruments', name: 'Analytical Instruments', slug: 'analytical-instruments', icon: '🔬', description: '' },
      { id: 'testing-equipment', name: 'Testing Equipment', slug: 'testing-equipment', icon: '🧪', description: '' },
    ],
  },
  {
    id: 'minerals-metallurgy',
    name: 'Minerals & Metallurgy',
    slug: 'minerals-metallurgy',
    icon: '⛏️',
    description: 'Metals, minerals, and metallurgical products',
    subcategories: [
      { id: 'metals', name: 'Metals', slug: 'metals', icon: '🔩', description: '' },
      { id: 'minerals', name: 'Minerals', slug: 'minerals', icon: '💎', description: '' },
      { id: 'metal-products', name: 'Metal Products', slug: 'metal-products', icon: '⚒️', description: '' },
    ],
  },
  {
    id: 'office-school-supplies',
    name: 'Office & School Supplies',
    slug: 'office-school-supplies',
    icon: '📝',
    description: 'Office equipment and school supplies',
    subcategories: [
      { id: 'office-equipment', name: 'Office Equipment', slug: 'office-equipment', icon: '🖨️', description: '' },
      { id: 'stationery', name: 'Stationery', slug: 'stationery', icon: '✏️', description: '' },
      { id: 'school-supplies', name: 'School Supplies', slug: 'school-supplies', icon: '📚', description: '' },
    ],
  },
  {
    id: 'packaging-printing',
    name: 'Packaging & Printing',
    slug: 'packaging-printing',
    icon: '📦',
    description: 'Packaging materials and printing services',
    subcategories: [
      { id: 'packaging-materials', name: 'Packaging Materials', slug: 'packaging-materials', icon: '📦', description: '' },
      { id: 'printing-services', name: 'Printing Services', slug: 'printing-services', icon: '🖨️', description: '' },
      { id: 'labels', name: 'Labels & Tags', slug: 'labels', icon: '🏷️', description: '' },
    ],
  },
  {
    id: 'raw-materials',
    name: 'Raw Materials',
    slug: 'raw-materials',
    icon: '🌾',
    description: 'Raw materials for manufacturing',
    subcategories: [
      { id: 'agricultural-raw', name: 'Agricultural Raw Materials', slug: 'agricultural-raw', icon: '🌾', description: '' },
      { id: 'industrial-raw', name: 'Industrial Raw Materials', slug: 'industrial-raw', icon: '🏭', description: '' },
      { id: 'chemical-raw', name: 'Chemical Raw Materials', slug: 'chemical-raw', icon: '🧪', description: '' },
    ],
  },
  {
    id: 'rubber-plastics',
    name: 'Rubber & Plastics',
    slug: 'rubber-plastics',
    icon: '🔲',
    description: 'Rubber and plastic products',
    subcategories: [
      { id: 'rubber-products', name: 'Rubber Products', slug: 'rubber-products', icon: '🔲', description: '' },
      { id: 'plastic-products', name: 'Plastic Products', slug: 'plastic-products', icon: '🧩', description: '' },
      { id: 'raw-materials', name: 'Raw Materials', slug: 'raw-materials', icon: '📦', description: '' },
    ],
  },
  {
    id: 'security-protection',
    name: 'Security & Protection',
    slug: 'security-protection',
    icon: '🛡️',
    description: 'Security equipment and protective gear',
    subcategories: [
      { id: 'security-systems', name: 'Security Systems', slug: 'security-systems', icon: '🔒', description: '' },
      { id: 'safety-equipment', name: 'Safety Equipment', slug: 'safety-equipment', icon: '🦺', description: '' },
      { id: 'protective-gear', name: 'Protective Gear', slug: 'protective-gear', icon: '🪖', description: '' },
    ],
  },
  {
    id: 'service-equipment',
    name: 'Service Equipment',
    slug: 'service-equipment',
    icon: '🔧',
    description: 'Service and maintenance equipment',
    subcategories: [
      { id: 'cleaning-equipment', name: 'Cleaning Equipment', slug: 'cleaning-equipment', icon: '🧹', description: '' },
      { id: 'maintenance-tools', name: 'Maintenance Tools', slug: 'maintenance-tools', icon: '🔧', description: '' },
      { id: 'service-supplies', name: 'Service Supplies', slug: 'service-supplies', icon: '📋', description: '' },
    ],
  },
  {
    id: 'shoes-accessories',
    name: 'Shoes & Accessories',
    slug: 'shoes-accessories',
    icon: '👟',
    description: 'Footwear and shoe accessories',
    subcategories: [
      { id: 'mens-shoes', name: "Men's Shoes", slug: 'mens-shoes', icon: '👞', description: '' },
      { id: 'womens-shoes', name: "Women's Shoes", slug: 'womens-shoes', icon: '👠', description: '' },
      { id: 'sports-shoes', name: 'Sports Shoes', slug: 'sports-shoes', icon: '👟', description: '' },
    ],
  },
  {
    id: 'sports-entertainment',
    name: 'Sports & Entertainment',
    slug: 'sports-entertainment',
    icon: '⚽',
    description: 'Sports equipment and entertainment products',
    subcategories: [
      { id: 'sports-equipment', name: 'Sports Equipment', slug: 'sports-equipment', icon: '⚽', description: '' },
      { id: 'outdoor-sports', name: 'Outdoor Sports', slug: 'outdoor-sports', icon: '🏕️', description: '' },
      { id: 'fitness-equipment', name: 'Fitness Equipment', slug: 'fitness-equipment', icon: '💪', description: '' },
    ],
  },
  {
    id: 'textiles-leather',
    name: 'Textiles & Leather Products',
    slug: 'textiles-leather',
    icon: '🧵',
    description: 'Textiles, fabrics, and leather goods',
    subcategories: [
      { id: 'fabrics', name: 'Fabrics', slug: 'fabrics', icon: '🧵', description: '' },
      { id: 'leather-products', name: 'Leather Products', slug: 'leather-products', icon: '👜', description: '' },
      { id: 'yarn-thread', name: 'Yarn & Thread', slug: 'yarn-thread', icon: '🧶', description: '' },
    ],
  },
  {
    id: 'toys-hobbies',
    name: 'Toys & Hobbies',
    slug: 'toys-hobbies',
    icon: '🧸',
    description: 'Toys, games, and hobby products',
    subcategories: [
      { id: 'toys', name: 'Toys', slug: 'toys', icon: '🧸', description: '' },
      { id: 'games', name: 'Games', slug: 'games', icon: '🎮', description: '' },
      { id: 'hobby-supplies', name: 'Hobby Supplies', slug: 'hobby-supplies', icon: '🎨', description: '' },
    ],
  },
  {
    id: 'transportation',
    name: 'Transportation',
    slug: 'transportation',
    icon: '🚚',
    description: 'Transportation equipment and vehicles',
    subcategories: [
      { id: 'commercial-vehicles', name: 'Commercial Vehicles', slug: 'commercial-vehicles', icon: '🚚', description: '' },
      { id: 'transport-equipment', name: 'Transport Equipment', slug: 'transport-equipment', icon: '🚛', description: '' },
      { id: 'logistics-services', name: 'Logistics Services', slug: 'logistics-services', icon: '📦', description: '' },
    ],
  },
];

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

// Helper function to get all categories flattened
export function getAllCategories(): Category[] {
  const all: Category[] = [];
  categories.forEach((cat) => {
    all.push(cat);
    if (cat.subcategories) {
      all.push(...cat.subcategories);
    }
  });
  return all;
}

