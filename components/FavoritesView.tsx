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
import { useStore } from '@/lib/store';
import { Product as StoreProduct } from '@/lib/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { catalogProducts } from '@/lib/data/catalog';

export default function FavoritesView() {
  const router = useRouter();
  const { favorites, removeFromFavorites, isFavorite, addToCart, startProductChat } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'favorites' | 'wishlist'>('favorites');

  // Use store favorites (already sorted with latest on top)
  const favoriteProducts = favorites;
  const wishlistItems = favorites; // For now, wishlist is same as favorites

  // Suggested products (20 items for 5 columns x 4 rows) - using catalog products
  const suggestedProducts = catalogProducts.slice(0, 20);

  const currentProducts = activeTab === 'favorites' ? favoriteProducts : wishlistItems;

  const handleRemoveFavorite = (productId: string) => {
    removeFromFavorites(productId);
  };

  const handleAddToCartFromFavorite = (product: StoreProduct) => {
    addToCart(product, product.minOrderQuantity);
  };

  const handleChatFromFavorite = (product: StoreProduct) => {
    startProductChat(product, product.supplier?.id);
    router.push('/account?view=messages');
  };

  const ProductCard = ({ product }: { product: StoreProduct }) => {
    if (viewMode === 'list') {
      return (
        <div className="group bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 p-4">
          <div className="flex items-start gap-4">
            {/* Product Image */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              {/* Product badges can be added here if needed */}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">{product.supplier?.name || 'Supplier'}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <LikeButton 
                    checked={isFavorite(product.id)}
                    onChange={(checked) => {
                      if (!checked) {
                        handleRemoveFavorite(product.id);
                      }
                    }}
                    size="sm"
                    className="p-1"
                  />
                  <button 
                    onClick={() => handleChatFromFavorite(product)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Chat with supplier"
                  >
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500">MOQ: {product.minOrderQuantity} {product.price.unit}</span>
                {product.stock <= 0 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price.currency} {product.price.amount.toFixed(2)} / {product.price.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleChatFromFavorite(product)}
                    className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm font-semibold transition flex items-center gap-2"
                  >
                    <MessageSquare size={16} />
                    Chat
                  </button>
                  <button 
                    onClick={() => handleAddToCartFromFavorite(product)}
                    className="px-4 py-2 bg-[#03C4CB] hover:bg-[#02A8B0] text-white rounded-lg text-sm font-semibold transition flex items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
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
            {product.stock <= 0 && (
              <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded-md">
                Out of Stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-2 bg-white rounded-full shadow-md hover:bg-teal-50 transition">
              <LikeButton 
                checked={isFavorite(product.id)}
                onChange={(checked) => {
                  if (!checked) {
                    handleRemoveFavorite(product.id);
                  }
                }}
                size="sm"
              />
            </div>
            <button 
              onClick={() => handleChatFromFavorite(product)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-teal-50 hover:text-teal-600 transition"
              title="Chat with supplier"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-teal-50 hover:text-teal-600 transition">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-teal-600 transition">
              {product.name}
            </p>
            <p className="text-xs text-gray-500">{product.supplier?.name || 'Supplier'}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {product.price.currency} {product.price.amount.toFixed(2)} / {product.price.unit}
            </span>
          </div>

          {/* MOQ */}
          <p className="text-xs text-gray-500 mb-3">MOQ: {product.minOrderQuantity} {product.price.unit}</p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleChatFromFavorite(product)}
              className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
            >
              <MessageSquare size={14} />
              Chat
            </button>
            <button 
              onClick={() => handleAddToCartFromFavorite(product)}
              className="flex-1 px-3 py-2 bg-[#03C4CB] hover:bg-[#02A8B0] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
            >
              <ShoppingCart size={14} />
              Add to Cart
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

