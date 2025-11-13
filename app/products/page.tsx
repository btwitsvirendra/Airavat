'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Filter, ShoppingCart, X, ChevronDown, Grid, List, Star, PackageSearch, MessageSquare, Share2 } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { catalogProducts } from '@/lib/data/catalog';
import { categories } from '@/lib/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryCard from '@/components/CategoryCard';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite, startProductChat } = useStore();
  const router = useRouter();

  // Read category from URL params
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = catalogProducts;

    if (selectedCategory !== 'all') {
      // Find category by slug
      const category = categories.find((cat) => cat.slug === selectedCategory);
      if (category) {
        // Match by category name or slug
        filtered = filtered.filter((product) => {
          const productCategory = product.category?.toLowerCase();
          const categoryName = category.name.toLowerCase();
          const categorySlug = category.slug.toLowerCase();
          
          return (
            productCategory === categoryName ||
            productCategory === categorySlug ||
            productCategory?.includes(categoryName.split(' ')[0]) // Match first word
          );
        });
      } else {
        // Fallback: try direct match
        filtered = filtered.filter((product) => product.category?.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    filtered = filtered.filter(
      (product) => product.price.amount >= priceRange[0] && product.price.amount <= priceRange[1]
    );

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price.amount - b.price.amount;
        case 'price-high':
          return b.price.amount - a.price.amount;
        case 'rating':
          return (b.supplier?.rating || 0) - (a.supplier?.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: typeof catalogProducts[0]) => {
    addToCart(product, product.minOrderQuantity);
  };

  const handleToggleFavorite = (product: typeof catalogProducts[0], isFav: boolean) => {
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleChat = (product: typeof catalogProducts[0]) => {
    startProductChat(product, product.supplier?.id);
    router.push('/account?view=messages');
  };

  const allCategories = [{ id: 'all', name: 'All Categories', slug: 'all' }, ...categories];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Category Card */}
          <div className="hidden lg:block flex-shrink-0">
            <CategoryCard />
        </div>

          <main className="flex-1">
            {/* Header */}
              <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Products</h1>
              <p className="text-sm text-gray-600">{filteredProducts.length} products found</p>
              </div>

            {/* Filters Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-[#03C4CB] hover:text-[#03C4CB] transition-colors"
              >
                <Filter size={16} />
                Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:border-[#03C4CB]"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                </select>
              <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition ${
                    viewMode === 'grid' ? 'bg-[#03C4CB] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  >
                  <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition ${
                    viewMode === 'list' ? 'bg-[#03C4CB] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  >
                  <List size={18} />
                  </button>
              </div>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-6 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-gray-900"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-[#03C4CB]"
                      >
                        {allCategories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-[#03C4CB]"
                          placeholder="Min"
                        />
                        <span className="text-gray-400">—</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-[#03C4CB]"
                          placeholder="Max"
                        />
                </div>
              </div>
            </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid/List */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-4'}
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                    key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                    >
                      {viewMode === 'grid' ? (
                        <div className="relative bg-white rounded-2xl overflow-hidden h-full transition-all duration-300 ease-in-out shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:bg-[#fdfdfd] hover:shadow-[rgba(0,0,0,0.09)_0px_2px_1px,rgba(0,0,0,0.09)_0px_4px_2px,rgba(0,0,0,0.09)_0px_8px_4px,rgba(0,0,0,0.09)_0px_16px_8px,rgba(0,0,0,0.09)_0px_32px_16px]" style={{ aspectRatio: '3/4' }}>
                          {/* Like button in top-right */}
                          <div className="absolute top-4 right-4 z-10">
                            <LikeButton 
                              size="sm" 
                              checked={isFavorite(product.id)}
                              onChange={(checked) => handleToggleFavorite(product, checked)}
                            />
                          </div>

                          <div className="p-4 h-full flex flex-col">
                            {/* Image Holder - Unique Design */}
                            <Link href={`/products/${product.id}`} className="block mb-3 flex-1">
                              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative group">
                                {product.images[0] ? (
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <PackageSearch size={32} />
                                  </div>
                                )}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              </div>
                            </Link>

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <Link href={`/products/${product.id}`}>
                                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                                    {product.name}
                                  </h3>
                                </Link>
                                <div className="flex items-center gap-1 mb-2">
                                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-gray-600">
                                    {product.supplier?.rating?.toFixed(1) || 'N/A'}
                                  </span>
                                </div>
                                <div className="flex items-baseline gap-1 mb-1">
                                  <span className="text-base font-bold text-gray-900">
                                    ₹{product.price.amount.toLocaleString()}
                                  </span>
                                  <span className="text-xs text-gray-500">/{product.price.unit}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">
                                  MOQ: {product.minOrderQuantity} {product.price.unit}
                                </p>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="flex-1 bg-[#03C4CB] hover:bg-[#02A8B0] text-white py-2 px-3 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
                                >
                                  <ShoppingCart size={14} />
                                  <span>Cart</span>
                                </button>
                                <button
                                  onClick={() => handleChat(product)}
                                  className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition"
                                  title="Chat with supplier"
                                >
                                  <MessageSquare size={16} className="text-gray-600" />
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
                                  <Share2 size={16} className="text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 p-4">
                          <Link href={`/products/${product.id}`} className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gray-100 relative rounded-md">
                              {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <PackageSearch size={32} />
                      </div>
                              )}
                          </div>
                          </Link>
                          <div className="flex-1">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="text-base font-medium text-gray-900 line-clamp-1 mb-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                              <div className="flex items-center gap-1 mb-1">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">
                                  {product.supplier?.rating?.toFixed(1) || 'N/A'} ({Math.floor((product.id.charCodeAt(0) + product.id.length) % 100) + 1})
                                </span>
                        </div>
                        </Link>
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg font-bold text-gray-900">
                                ₹{product.price.amount.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500">/{product.price.unit}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                MOQ: {product.minOrderQuantity} {product.price.unit}
                          </span>
                        </div>
                      </div>
                          <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                              className="bg-[#03C4CB] hover:bg-[#02A8B0] text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                          >
                              <ShoppingCart size={16} />
                            Add to Cart
                          </button>
                            <div className="flex gap-2">
                              <div className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-200">
                                <LikeButton 
                                  size="sm" 
                                  checked={isFavorite(product.id)}
                                  onChange={(checked) => handleToggleFavorite(product, checked)}
                                />
                              </div>
                              <button
                                onClick={() => handleChat(product)}
                                className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-200"
                                title="Chat with supplier"
                              >
                                <MessageSquare size={16} className="text-gray-600" />
                              </button>
                            </div>
                        </div>
                      </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center p-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <PackageSearch size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                    </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
