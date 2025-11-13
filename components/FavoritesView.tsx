'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  MessageSquare,
  Send,
  Trash2,
  Search,
  Filter,
  Grid3x3,
  List,
  Star,
  Package,
  Eye,
  Share2,
  MoreVertical,
} from 'lucide-react';
import LikeButton from './LikeButton';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  moq: number;
  rating: number;
  reviews: number;
  image?: string;
  supplier: string;
  inStock: boolean;
  isWishlisted?: boolean;
}

export default function FavoritesView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'favorites' | 'wishlist'>('favorites');

  // Sample favorite products
  const favoriteProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Premium',
      price: 45.99,
      originalPrice: 69.99,
      moq: 10,
      rating: 4.5,
      reviews: 234,
      supplier: 'TechGlobal Inc.',
      inStock: true,
    },
    {
      id: 2,
      name: 'Smart Watch Series 8 Pro',
      price: 129.99,
      originalPrice: 179.99,
      moq: 5,
      rating: 4.8,
      reviews: 567,
      supplier: 'SmartTech Solutions',
      inStock: true,
    },
    {
      id: 3,
      name: 'Mechanical Keyboard RGB',
      price: 89.99,
      moq: 20,
      rating: 4.6,
      reviews: 189,
      supplier: 'GamingGear Co.',
      inStock: true,
    },
    {
      id: 4,
      name: 'USB-C Hub Multiport Adapter',
      price: 34.99,
      moq: 50,
      rating: 4.4,
      reviews: 312,
      supplier: 'ConnectTech Ltd.',
      inStock: true,
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      price: 24.99,
      moq: 30,
      rating: 4.3,
      reviews: 145,
      supplier: 'PowerUp Industries',
      inStock: false,
    },
    {
      id: 6,
      name: 'Premium Laptop Stand Aluminum',
      price: 59.99,
      moq: 15,
      rating: 4.7,
      reviews: 278,
      supplier: 'ErgoDesign Pro',
      inStock: true,
    },
  ];

  // Sample wishlist items
  const wishlistItems: Product[] = [
    {
      id: 7,
      name: '4K Ultra HD Monitor 27"',
      price: 299.99,
      originalPrice: 399.99,
      moq: 3,
      rating: 4.9,
      reviews: 892,
      supplier: 'DisplayMax Corp.',
      inStock: true,
      isWishlisted: true,
    },
    {
      id: 8,
      name: 'Ergonomic Office Chair',
      price: 249.99,
      moq: 2,
      rating: 4.6,
      reviews: 445,
      supplier: 'ComfortSeat Inc.',
      inStock: true,
      isWishlisted: true,
    },
    {
      id: 9,
      name: 'Noise Cancelling Earbuds',
      price: 79.99,
      originalPrice: 119.99,
      moq: 12,
      rating: 4.5,
      reviews: 623,
      supplier: 'AudioTech Global',
      inStock: true,
      isWishlisted: true,
    },
  ];

  // Suggested products (20 items for 5 columns x 4 rows)
  const suggestedProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
    id: 100 + i,
    name: `Premium Product ${i + 1}`,
    price: Math.floor(Math.random() * 200) + 20,
    originalPrice: Math.floor(Math.random() * 100) + 50,
    moq: Math.floor(Math.random() * 50) + 5,
    rating: Math.random() * 1 + 4,
    reviews: Math.floor(Math.random() * 500) + 50,
    supplier: `Supplier ${i + 1}`,
    inStock: Math.random() > 0.2,
  }));

  const currentProducts = activeTab === 'favorites' ? favoriteProducts : wishlistItems;

  const ProductCard = ({ product }: { product: Product }) => {
    if (viewMode === 'list') {
      return (
        <div className="group bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 p-4">
          <div className="flex items-start gap-4">
            {/* Product Image */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              {product.originalPrice && (
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">{product.supplier}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <LikeButton 
                    defaultChecked={product.isWishlisted} 
                    size="sm"
                    className="p-1"
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <span className="text-sm text-gray-500">MOQ: {product.moq} units</span>
                {!product.inStock && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2">
                    <Send size={16} />
                    Send Inquiry
                  </button>
                  <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm font-semibold transition">
                    <MessageSquare size={16} />
                  </button>
                  <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm font-semibold transition">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="group bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.originalPrice && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
            {!product.inStock && (
              <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded-md">
                Out of Stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-2 bg-white rounded-full shadow-md hover:bg-teal-50 transition">
              <LikeButton 
                defaultChecked={product.isWishlisted} 
                size="sm"
              />
            </div>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-teal-50 hover:text-teal-600 transition">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-teal-50 hover:text-teal-600 transition">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-teal-600 transition">
              {product.name}
            </p>
            <p className="text-xs text-gray-500">{product.supplier}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* MOQ */}
          <p className="text-xs text-gray-500 mb-3">MOQ: {product.moq} units</p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1">
              <Send size={14} />
              Inquiry
            </button>
            <button className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold transition">
              <MessageSquare size={14} />
            </button>
            <button className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold transition">
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Favorites</h1>
            <p className="text-sm text-gray-600">
              Manage your favorite products and wishlist items
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-teal-100 text-teal-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-teal-100 text-teal-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              activeTab === 'favorites'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <LikeButton 
                defaultChecked={activeTab === 'favorites'} 
                size="sm"
                className="pointer-events-none"
              />
              Favorites ({favoriteProducts.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              activeTab === 'wishlist'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Star className={`w-4 h-4 ${activeTab === 'wishlist' ? 'fill-amber-400 text-amber-400' : ''}`} />
              Wishlist ({wishlistItems.length})
            </div>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter</span>
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-2">
            <Trash2 size={18} />
            <span className="text-sm font-medium">Clear All</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1920px] mx-auto px-6 py-6">
          {/* Favorites/Wishlist Section */}
          {currentProducts.length > 0 ? (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {activeTab === 'favorites' ? 'Favorite Products' : 'Wishlist Items'}
                </h2>
                <span className="text-sm text-gray-600">
                  {currentProducts.length} {currentProducts.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
          <div className="flex flex-col items-center justify-center py-16 mb-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LikeButton size="lg" className="opacity-50" />
            </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                No {activeTab === 'favorites' ? 'favorites' : 'wishlist items'} yet
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Start adding products to your {activeTab === 'favorites' ? 'favorites' : 'wishlist'}
              </p>
              <Link
                href="/products"
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
              >
                Browse Products
              </Link>
            </div>
          )}

          {/* Suggested Products Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Suggested Products</h2>
                <p className="text-sm text-gray-600">
                  Products you might be interested in based on your preferences
                </p>
              </div>
              <Link
                href="/products"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

