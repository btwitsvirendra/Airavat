'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, Grid, List, Star, MapPin, MessageSquare, ShoppingCart } from 'lucide-react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

// Mock data - in real app, this would come from API
const mockProducts = [
  {
    id: '1',
    name: 'Industrial LED Light 100W',
    description: 'High-efficiency LED lighting solution for warehouses and factories',
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1524501537239-6e6d23b24ea8?w=500'],
    price: { amount: 1250, currency: 'INR', unit: 'piece' },
    minOrderQuantity: 50,
    stock: 1000,
    supplier: { id: 's1', name: 'TechLight Industries', location: 'Mumbai', rating: 4.5 },
    tags: ['LED', 'Industrial', 'Energy Efficient'],
  },
  {
    id: '2',
    name: 'Cotton Fabric Rolls',
    description: 'Premium quality cotton fabric, 40s count, perfect for garments',
    category: 'Textiles',
    images: ['https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=500'],
    price: { amount: 280, currency: 'INR', unit: 'meter' },
    minOrderQuantity: 500,
    stock: 5000,
    supplier: { id: 's2', name: 'Textile Hub', location: 'Surat', rating: 4.8 },
    tags: ['Cotton', 'Fabric', 'Textile'],
  },
  {
    id: '3',
    name: 'Hydraulic Press Machine',
    description: '50 Ton hydraulic press for metal forming and fabrication',
    category: 'Machinery',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500'],
    price: { amount: 450000, currency: 'INR', unit: 'unit' },
    minOrderQuantity: 1,
    stock: 15,
    supplier: { id: 's3', name: 'MachineWorks Ltd', location: 'Pune', rating: 4.7 },
    tags: ['Machinery', 'Hydraulic', 'Manufacturing'],
  },
  {
    id: '4',
    name: 'Organic Turmeric Powder',
    description: 'Premium organic turmeric powder, certified and lab-tested',
    category: 'Food',
    images: ['https://images.unsplash.com/photo-1615485500134-275e3a8b8d21?w=500'],
    price: { amount: 450, currency: 'INR', unit: 'kg' },
    minOrderQuantity: 100,
    stock: 2000,
    supplier: { id: 's4', name: 'Organic Farms Co', location: 'Kerala', rating: 4.9 },
    tags: ['Organic', 'Spices', 'Food'],
  },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useStore();

  const categories = ['all', 'Electronics', 'Textiles', 'Machinery', 'Food', 'Chemicals', 'Building Materials'];

  const handleAddToCart = (product: any) => {
    addToCart(product, product.minOrderQuantity);
    toast.success('Added to cart!');
  };

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-regal-blue-800 mb-2">Browse Products</h1>
          <p className="text-gray-600">Discover quality products from verified suppliers</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === category
                          ? 'bg-teal-100 text-teal-700 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input type="number" placeholder="Min" className="input-field text-sm py-2" />
                  <input type="number" placeholder="Max" className="input-field text-sm py-2" />
                </div>
              </div>

              {/* Minimum Order */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Min Order Quantity</h4>
                <select className="input-field text-sm py-2">
                  <option>Any</option>
                  <option>1-50</option>
                  <option>51-100</option>
                  <option>100+</option>
                </select>
              </div>

              <button className="w-full btn-secondary py-2">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* View Toggle and Sort */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-4">
                <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Min Order Quantity</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-teal-100 text-teal-600' : 'text-gray-400'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-teal-100 text-teal-600' : 'text-gray-400'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-md card-hover ${viewMode === 'list' ? 'flex gap-4' : ''}`}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`${viewMode === 'grid' ? 'w-full h-48' : 'w-48 h-48'} object-cover rounded-t-lg`}
                  />
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                      <span className="badge badge-info">{product.category}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <MapPin size={16} />
                        <span>{product.supplier.location}</span>
                        <div className="flex items-center ml-auto">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="ml-1">{product.supplier.rating}</span>
                        </div>
                      </div>
                      <Link
                        href={`/suppliers/${product.supplier.id}`}
                        className="text-sm text-teal-600 hover:underline"
                      >
                        {product.supplier.name}
                      </Link>
                    </div>

                    <div className="border-t pt-3 mb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-regal-blue-700">
                            ₹{product.price.amount}
                            <span className="text-sm font-normal text-gray-500">/{product.price.unit}</span>
                          </p>
                          <p className="text-xs text-gray-500">Min Order: {product.minOrderQuantity} units</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/messages?supplier=${product.supplier.id}`}
                        className="flex-1 border border-teal-600 text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={18} />
                        Chat
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <button className="px-4 py-2 border rounded hover:bg-gray-50">Previous</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded">1</button>
              <button className="px-4 py-2 border rounded hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border rounded hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border rounded hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
