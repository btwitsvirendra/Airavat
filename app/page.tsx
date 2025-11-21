'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { catalogProducts } from '@/lib/data/catalog';
import { categories } from '@/lib/data/categories';
import CategoryCard from '@/components/CategoryCard';
import Pagination from '@/components/Pagination';
import {
  ShoppingCart,
  Heart,
  Star,
  ArrowRight,
  PackageSearch,
  ChevronRight,
  Eye,
  Truck,
  Sparkles,
  Camera,
  Search,
  Wrench,
  CheckCircle2,
  TrendingUp,
  FileText,
  MessageSquare,
  Share2,
} from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import CookiesPopup from '@/components/CookiesPopup';
import FilterSidebar from '@/components/FilterSidebar';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

const businessProducts = [
  { name: 'Filling Machines', icon: '🏭', category: 'machinery' },
  { name: 'Agri Parts', icon: '🌾', category: 'raw-materials' },
  { name: 'Construction', icon: '🏗️', category: 'construction-real-estate' },
  { name: 'Textile Machinery', icon: '🧵', category: 'machinery' },
  { name: 'Pipes', icon: '🔧', category: 'hardware' },
  { name: 'Food Processing', icon: '🍽️', category: 'machinery' },
];

const topRankingProducts = [
  { name: 'Grain Product Making Machine', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400', price: '$1,200-1,500', badge: 'TOP', hot: true },
  { name: 'Synthetic Leather', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', price: '$5-8', badge: 'TOP', hot: true },
  { name: 'Sugar & Salt Processing Machine', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400', price: '$800-1,200', badge: 'TOP', hot: true },
  { name: 'Rice Mill Machine', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400', price: '$1,000-1,500', badge: 'TOP', hot: true },
  { name: '100% Polyester Fabric', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', price: '$3-5', badge: 'TOP', hot: true },
  { name: 'Spandex Fabric', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', price: '$4-6', badge: 'TOP', hot: true },
];

const frequentlySearched = ['glass bottles', 'perfume bottle', 'sport car', 'perfume bottle with box', 'led lights', 'smartphone'];

export default function HomePage() {
  const { addToCart, addToFavorites, removeFromFavorites, favorites, startProductChat, searchQuery, setSearchQuery } = useStore();
  const isFavorite = (productId: string) => favorites.some((p: any) => p.id === productId);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  // Read category from URL params
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1); // Reset to page 1 when category changes
    }
  }, [searchParams]);

  // Filter products by category, price, and sort
  const filteredProducts = useMemo(() => {
    let filtered = catalogProducts;

    if (selectedCategory !== 'all') {
      // Find category by slug or name
      const category = categories.find(
        (cat) => cat.slug === selectedCategory || cat.name.toLowerCase() === selectedCategory.toLowerCase()
      );
      
      if (category) {
        filtered = filtered.filter((product) => {
          const productCategory = product.category?.toLowerCase();
          const categoryName = category.name.toLowerCase();
          const categorySlug = category.slug.toLowerCase();
          
          return (
            productCategory === categoryName ||
            productCategory === categorySlug ||
            productCategory?.includes(categoryName.split(' ')[0])
          );
        });
      } else {
        // Fallback: try direct match
        filtered = filtered.filter(
          (product) => product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price.amount >= priceRange[0] && product.price.amount <= priceRange[1]
    );

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price.amount - b.price.amount;
        case 'price-high':
          return b.price.amount - a.price.amount;
        case 'rating':
          return (b.supplier?.rating || 0) - (a.supplier?.rating || 0);
        case 'popularity':
          // Sort by rating and stock (higher is more popular)
          const aPopularity = (a.supplier?.rating || 0) * 10 + (a.stock || 0) / 1000;
          const bPopularity = (b.supplier?.rating || 0) * 10 + (b.stock || 0) / 1000;
          return bPopularity - aPopularity;
        case 'newness':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  // Pagination settings - 50 products per page
  const productsPerPage = 50;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));

  // Calculate which products to show for current page - show diverse products
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: typeof catalogProducts[0]) => {
    addToCart(product, product.minOrderQuantity);
  };

  const handleToggleFavorite = (product: typeof catalogProducts[0], checked: boolean) => {
    if (checked) {
      // Button is now checked (liked) - add to favorites
      addToFavorites(product);
    } else {
      // Button is now unchecked (unliked) - remove from favorites
      removeFromFavorites(product.id);
    }
  };

  const handleChat = (product: typeof catalogProducts[0]) => {
    startProductChat(product, product.supplier?.id);
    router.push('/account?view=messages');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', background: '#F8FAFC', minHeight: '100vh' }}>
      {/* Cookies Popup */}
      <CookiesPopup />

      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4">
          <div className="flex gap-6">
            {/* Left Sidebar - Category Card and Filters */}
            <div className="hidden lg:block flex-shrink-0" style={{ width: '233px' }}>
              <CategoryCard />
              <FilterSidebar
                sortBy={sortBy}
                onSortChange={setSortBy}
                minPrice={priceRange[0]}
                maxPrice={priceRange[1]}
                onPriceChange={(min, max) => setPriceRange([min, max])}
              />
            </div>

            {/* Product Cards */}
            <main className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {currentProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-in-out shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:bg-[#fdfdfd] hover:shadow-[rgba(0,0,0,0.09)_0px_2px_1px,rgba(0,0,0,0.09)_0px_4px_2px,rgba(0,0,0,0.09)_0px_8px_4px,rgba(0,0,0,0.09)_0px_16px_8px,rgba(0,0,0,0.09)_0px_32px_16px]"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {/* Like button in top-right */}
                    <div className="absolute top-4 right-4 z-20" onClick={(e) => e.stopPropagation()}>
                      <LikeButton 
                        size="sm" 
                        checked={isFavorite(product.id)}
                        onChange={(checked) => handleToggleFavorite(product, checked)}
                      />
                    </div>

                    <div className="p-4 h-full flex flex-col" style={{ width: '100%' }}>
                      {/* Image Holder */}
                      <Link href={`/products/${product.id}`} className="block mb-3 flex-1" style={{ width: '100%' }}>
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </Link>

                      {/* Product Info - All Left Aligned */}
                      <div className="flex-1 flex flex-col justify-between" style={{ width: '100%', textAlign: 'left' }}>
                        <div style={{ width: '100%', textAlign: 'left' }}>
                          <Link href={`/products/${product.id}`} style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2" style={{ textAlign: 'left', width: '100%' }}>
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-1 mb-2" style={{ justifyContent: 'flex-start', width: '100%' }}>
                            <Star size={12} className="fill-yellow-400 text-yellow-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600" style={{ textAlign: 'left' }}>
                              {product.supplier?.rating?.toFixed(1) || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1 mb-1" style={{ justifyContent: 'flex-start', width: '100%' }}>
                            <span className="text-base font-bold text-gray-900" style={{ textAlign: 'left' }}>
                              ₹{product.price.amount.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500" style={{ textAlign: 'left' }}>/{product.price.unit}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3" style={{ textAlign: 'left', width: '100%' }}>
                            MOQ: {product.minOrderQuantity} {product.price.unit}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mt-auto" style={{ width: '100%' }}>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-[#3373FF] hover:bg-[#265ACC] text-white py-2 px-3 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
                            style={{ minWidth: 0 }}
                          >
                            <ShoppingCart size={14} />
                            <span>Cart</span>
                          </button>
                          <button
                            onClick={() => handleChat(product)}
                            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition flex-shrink-0"
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
                            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition flex-shrink-0"
                            title="Share product"
                          >
                            <Share2 size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}
