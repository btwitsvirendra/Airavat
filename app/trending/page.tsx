'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { catalogProducts } from '@/lib/data/catalog';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, MessageSquare, Share2, PackageSearch, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import { motion } from 'framer-motion';
import { categories } from '@/lib/data/categories';

export default function TrendingProductsPage() {
  const { addToCart, addToFavorites, removeFromFavorites, favorites, startProductChat } = useStore();
  const isFavorite = (productId: string) => favorites.some((p: any) => p.id === productId);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterType, setFilterType] = useState<'hot-selling' | 'most-popular' | 'best-reviewed'>('hot-selling');
  const [showGlobalRankings, setShowGlobalRankings] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Group products by category and get top 3 for each
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, typeof catalogProducts> = {};
    
    catalogProducts.forEach(product => {
      const category = product.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });

    // Sort products by rating/featured status and take top 3
    Object.keys(grouped).forEach(category => {
      grouped[category] = grouped[category]
        .sort((a, b) => {
          if (filterType === 'hot-selling') {
            return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
          } else if (filterType === 'most-popular') {
            return (b.supplier?.rating || 0) - (a.supplier?.rating || 0);
          } else {
            return (b.supplier?.rating || 0) - (a.supplier?.rating || 0);
          }
        })
        .slice(0, 3);
    });

    // Filter by selected category
    if (selectedCategory !== 'all') {
      const filtered: Record<string, typeof catalogProducts> = {};
      Object.keys(grouped).forEach(category => {
        if (category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
            selectedCategory.toLowerCase().includes(category.toLowerCase())) {
          filtered[category] = grouped[category];
        }
      });
      return filtered;
    }

    return grouped;
  }, [selectedCategory, filterType]);

  const categoryList = [
    'All',
    'Packaging & Printing',
    'Consumer Electronics',
    'Fabric & Textile Raw Material',
    'Construction & Real Estate',
    'Food & Beverage',
    'Industrial Machinery',
  ];

  const handleAddToCart = (product: typeof catalogProducts[0]) => {
    addToCart(product, product.minOrderQuantity);
  };

  const handleToggleFavorite = (product: typeof catalogProducts[0], checked: boolean) => {
    if (checked) {
      addToFavorites(product);
    } else {
      removeFromFavorites(product.id);
    }
  };

  const handleChat = (product: typeof catalogProducts[0]) => {
    startProductChat(product, product.supplier?.id);
    router.push('/account?view=messages');
  };

  const getRankingBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900';
    if (rank === 2) return 'bg-gray-400 text-gray-900';
    return 'bg-orange-400 text-orange-900';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
            Top ranking
          </h1>
          
          {/* Header Buttons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setShowGlobalRankings(!showGlobalRankings)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-700 font-medium hover:border-[#3373FF] hover:text-[#3373FF] transition-colors"
            >
              Global rankings
              <ChevronDown size={16} className={`transition-transform ${showGlobalRankings ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-700 font-medium hover:border-[#3373FF] hover:text-[#3373FF] transition-colors"
            >
              All categories
              <ChevronDown size={16} className={`transition-transform ${showAllCategories ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[80px] z-40">
        <div className="max-w-[1920px] mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto py-4 scrollbar-hide">
            {categoryList.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? 'all' : category.toLowerCase())}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                  (selectedCategory === 'all' && category === 'All') ||
                  (selectedCategory !== 'all' && category !== 'All' && category.toLowerCase().includes(selectedCategory))
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
            <button className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center ml-2">
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterType('hot-selling')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === 'hot-selling'
                  ? 'bg-gray-900 text-white border-2 border-gray-900'
                  : 'bg-white text-gray-600 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Hot selling
            </button>
            <button
              onClick={() => setFilterType('most-popular')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === 'most-popular'
                  ? 'bg-gray-900 text-white border-2 border-gray-900'
                  : 'bg-white text-gray-600 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Most popular
            </button>
            <button
              onClick={() => setFilterType('best-reviewed')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === 'best-reviewed'
                  ? 'bg-gray-900 text-white border-2 border-gray-900'
                  : 'bg-white text-gray-600 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Best reviewed
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <div className="space-y-12">
          {Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category}>
              {/* Category Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
              
              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => {
                  const rank = index + 1;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative"
                    >
                      {/* Ranking Badge */}
                      <div className={`absolute top-4 left-4 z-10 w-10 h-10 rounded-full ${getRankingBadgeColor(rank)} flex items-center justify-center font-bold text-sm shadow-lg`}>
                        #{rank}
                      </div>

                      {/* Like Button */}
                      <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
                        <LikeButton
                          size="sm"
                          checked={isFavorite(product.id)}
                          onChange={(checked) => handleToggleFavorite(product, checked)}
                        />
                      </div>

                      {/* Product Image */}
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <PackageSearch size={48} />
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Info - All Left Aligned */}
                      <div className="p-4" style={{ width: '100%', textAlign: 'left' }}>
                        <Link href={`/products/${product.id}`} style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#3373FF] transition-colors" style={{ textAlign: 'left', width: '100%' }}>
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Price */}
                        <div className="mb-2" style={{ width: '100%', textAlign: 'left' }}>
                          <span className="text-lg font-bold text-gray-900" style={{ textAlign: 'left' }}>
                            {product.price.currency} {product.price.amount.toLocaleString()}
                            {product.price.amount < 1000 && (
                              <span className="text-sm font-normal text-gray-600">
                                -{Math.round(product.price.amount * 1.1).toLocaleString()}
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Minimum Order */}
                        <p className="text-sm text-gray-600 mb-4" style={{ textAlign: 'left', width: '100%' }}>
                          Min. order: {product.minOrderQuantity} {product.price.unit}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-[#3373FF] hover:bg-[#265ACC] text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            <span>Add to Cart</span>
                          </button>
                          <button
                            onClick={() => handleChat(product)}
                            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition"
                            title="Chat with supplier"
                          >
                            <MessageSquare size={18} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: product.name,
                                  text: `Check out ${product.name} on Airavat`,
                                  url: `${window.location.origin}/products/${product.id}`
                                });
                              } else {
                                navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`);
                              }
                            }}
                            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition"
                            title="Share product"
                          >
                            <Share2 size={18} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Messenger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/account?view=messages"
          className="relative w-14 h-14 bg-[#3373FF] hover:bg-[#265ACC] rounded-full shadow-lg flex items-center justify-center transition-colors group"
        >
          <MessageSquare size={24} className="text-white" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            4
          </span>
        </Link>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg flex items-center justify-center transition-colors">
          <HelpCircle size={24} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
