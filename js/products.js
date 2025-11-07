// Product data for Airavat B2B E-commerce Platform
const products = [
  {
    id: 1,
    name: "Grey black 600x600 yellow tile for bathroom and hotel",
    shortName: "Grey Black 600x600 Yellow Tile",
    price: 170,
    priceRange: "170-200",
    moq: 2,
    supplier: "Laxmi Granite and Tiles",
    location: "Pune",
    rating: 4.5,
    reviews: 999,
    description: "High-quality ceramic tiles perfect for bathroom and hotel applications. These premium tiles feature a sophisticated grey-black color with subtle yellow accents, providing an elegant and modern look. The 600x600mm size is ideal for creating seamless flooring patterns with minimal grout lines. Manufactured using advanced ceramic technology, these tiles offer exceptional durability, water resistance, and easy maintenance. Perfect for both residential and commercial projects.",
    images: ["tile-1.jpg", "tile-2.jpg", "tile-3.jpg", "tile-4.jpg", "tile-5.jpg"],
    category: "Construction & Real Estate",
    listingDate: "2025-11-05 14:30",
    hasEasyReturn: true,
    specifications: {
      sealingType: "Screw Cap",
      size: "600x600mm",
      surfaceHandling: "Polished",
      modelNumber: "GT-600-YB",
      brandName: "Laxmi Granite",
      bodyMaterial: "Ceramic",
      keyword: "bathroom tiles, hotel tiles, floor tiles",
      productName: "Grey Black Yellow Tile",
      capColor: "N/A",
      feature: "Water resistant, Anti-slip, Easy to clean"
    },
    customization: [
      { name: "Custom Size Cutting", price: 0.50 },
      { name: "Edge Polishing", price: 0.75 },
      { name: "Pattern Design", price: 1.00 }
    ],
    shipping: "Free shipping for orders above Rs 10,000. Delivery within 7-10 business days.",
    packaging: "Wooden pallets with protective wrapping"
  },
  {
    id: 2,
    name: "High End Luxury Perfume Bottle - Premium Glass Packaging",
    shortName: "High End Luxury Perfume Bottle",
    price: 1650,
    priceRange: "1650-600",
    moq: 100,
    supplier: "Gorilla Glass Pvt Ltd",
    location: "Delhi - TYI Qid",
    rating: 4.7,
    reviews: 1234,
    description: "Exquisite luxury perfume bottles manufactured with premium quality glass. These high-end bottles are perfect for luxury fragrance brands looking for sophisticated packaging solutions. Features include precision-crafted glass construction, elegant design, customizable finishing options, and superior quality control. Our bottles are manufactured using advanced glass molding technology ensuring consistency and durability. Ideal for premium perfume brands, cosmetic companies, and luxury gift packaging.",
    images: ["bottle-1.jpg", "bottle-2.jpg", "bottle-3.jpg", "bottle-4.jpg", "bottle-5.jpg"],
    category: "Packaging",
    listingDate: "2025-11-04 10:15",
    hasEasyReturn: true,
    specifications: {
      sealingType: "Screw Cap / Spray Pump",
      size: "50ml-200ml",
      surfaceHandling: "Frosted / Polished / Coated",
      modelNumber: "GG-PB-LUX",
      brandName: "Gorilla Glass",
      bodyMaterial: "Premium Glass",
      keyword: "perfume bottle, luxury packaging, glass bottle",
      productName: "Luxury Perfume Bottle",
      capColor: "Gold / Silver / Custom",
      feature: "Leak-proof, Elegant design, Customizable"
    },
    customization: [
      { name: "Logo Printing", price: 0.50 },
      { name: "Label Printing", price: 0.50 },
      { name: "Packaging Print", price: 0.50 }
    ],
    shipping: "Packaging fee: Rs 500. Delivery within 15-20 business days for customized orders.",
    packaging: "Individual boxes with foam inserts, master carton packing"
  },
  {
    id: 3,
    name: "Industrial LED Panel Light - Energy Efficient 40W",
    shortName: "Industrial LED Panel Light",
    price: 450,
    priceRange: "450-550",
    moq: 50,
    supplier: "Bright Tech Solutions",
    location: "Mumbai",
    rating: 4.3,
    reviews: 567,
    description: "High-efficiency industrial LED panel lights designed for commercial and industrial applications. These 40W LED panels provide bright, uniform illumination while consuming minimal energy. Features include long lifespan (50,000+ hours), wide beam angle, instant start, and superior color rendering. Perfect for offices, warehouses, factories, showrooms, and retail spaces. Built with premium aluminum frame and advanced LED chips for reliable performance.",
    images: ["led-1.jpg", "led-2.jpg", "led-3.jpg", "led-4.jpg", "led-5.jpg"],
    category: "Electronics & Technology",
    listingDate: "2025-11-03 16:45",
    hasEasyReturn: false,
    specifications: {
      sealingType: "N/A",
      size: "600x600mm / 300x1200mm",
      surfaceHandling: "Powder Coated",
      modelNumber: "BTS-LED-40W",
      brandName: "Bright Tech",
      bodyMaterial: "Aluminum + PC Diffuser",
      keyword: "led panel, industrial lighting, office lights",
      productName: "LED Panel Light 40W",
      capColor: "White / Silver",
      feature: "Energy efficient, Long lifespan, Uniform light"
    },
    customization: [
      { name: "Color Temperature Selection", price: 0 },
      { name: "Dimming Function", price: 50 },
      { name: "Emergency Backup", price: 150 }
    ],
    shipping: "Standard shipping charges apply. Delivery within 5-7 business days.",
    packaging: "Individual carton boxes with protective foam"
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle - Insulated Vacuum Flask 500ml",
    shortName: "Stainless Steel Water Bottle",
    price: 85,
    priceRange: "85-120",
    moq: 200,
    supplier: "EcoVessel India",
    location: "Bangalore",
    rating: 4.6,
    reviews: 2341,
    description: "Premium stainless steel insulated water bottles perfect for bulk orders. These eco-friendly vacuum flasks keep beverages hot for 12 hours and cold for 24 hours. Made from food-grade 304 stainless steel, BPA-free, leak-proof design with wide mouth opening. Ideal for corporate gifts, promotional items, retail, and wholesale distribution. Available in multiple colors and customization options including logo printing and custom packaging.",
    images: ["bottle-1.jpg", "bottle-2.jpg", "bottle-3.jpg", "bottle-4.jpg", "bottle-5.jpg"],
    category: "Home & Garden",
    listingDate: "2025-11-02 09:20",
    hasEasyReturn: true,
    specifications: {
      sealingType: "Screw Cap with Silicone Seal",
      size: "500ml / 750ml / 1000ml",
      surfaceHandling: "Powder Coated / Polished",
      modelNumber: "EV-SS-500",
      brandName: "EcoVessel",
      bodyMaterial: "304 Stainless Steel",
      keyword: "water bottle, insulated flask, steel bottle",
      productName: "Stainless Steel Water Bottle",
      capColor: "Black / Blue / Red / Custom",
      feature: "Insulated, Leak-proof, BPA-free, Eco-friendly"
    },
    customization: [
      { name: "Logo Laser Engraving", price: 2.00 },
      { name: "Custom Color Coating", price: 5.00 },
      { name: "Gift Box Packaging", price: 3.00 }
    ],
    shipping: "Bulk shipping available. Delivery within 10-15 business days.",
    packaging: "Individual poly bags, 50 pieces per master carton"
  },
  {
    id: 5,
    name: "Cotton T-Shirt Bulk Pack - Premium 180 GSM Round Neck",
    shortName: "Cotton T-Shirt Bulk Pack",
    price: 120,
    priceRange: "120-180",
    moq: 500,
    supplier: "Textile Hub",
    location: "Ahmedabad",
    rating: 4.4,
    reviews: 3456,
    description: "Premium quality 100% cotton t-shirts available for bulk wholesale orders. These 180 GSM round neck t-shirts are made from combed cotton fabric ensuring superior comfort, durability, and breathability. Pre-shrunk fabric, color-fast dyeing, and reinforced stitching for long-lasting wear. Perfect for corporate uniforms, promotional merchandise, events, retail chains, and export. Available in all sizes (S to 5XL) and multiple color options. Excellent customization possibilities including screen printing, embroidery, and heat transfer.",
    images: ["tshirt-1.jpg", "tshirt-2.jpg", "tshirt-3.jpg", "tshirt-4.jpg", "tshirt-5.jpg"],
    category: "Fashion & Apparel",
    listingDate: "2025-11-01 11:00",
    hasEasyReturn: true,
    specifications: {
      sealingType: "N/A",
      size: "S / M / L / XL / XXL / 3XL",
      surfaceHandling: "N/A",
      modelNumber: "TH-CT-180",
      brandName: "Textile Hub",
      bodyMaterial: "100% Combed Cotton",
      keyword: "cotton tshirt, bulk tshirt, plain tshirt",
      productName: "Cotton Round Neck T-Shirt",
      capColor: "N/A",
      feature: "Breathable, Pre-shrunk, Color-fast, Comfortable"
    },
    customization: [
      { name: "Screen Printing", price: 15.00 },
      { name: "Embroidery", price: 25.00 },
      { name: "Heat Transfer Print", price: 18.00 }
    ],
    shipping: "Free shipping for orders above 1000 pieces. Delivery within 15-20 business days.",
    packaging: "Folded and packed in poly bags, 100 pieces per carton"
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
