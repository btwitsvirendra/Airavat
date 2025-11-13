'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
} from 'lucide-react';
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
  const { addToCart, searchQuery, setSearchQuery } = useStore();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Read category from URL params
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1); // Reset to page 1 when category changes
    }
  }, [searchParams]);

  // Filter products by category
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

    return filtered;
  }, [selectedCategory]);

  // Pagination settings
  const productsPerPage = 10;
  const totalProducts = filteredProducts.length;
  const totalPages = 5; // Always show 5 pages

  // Calculate which products to show for current page
  // If we don't have enough products, cycle through them to fill all pages
  const startIndex = (currentPage - 1) * productsPerPage;
  let currentProducts: typeof catalogProducts = [];
  
  if (filteredProducts.length === 0) {
    // If no products match, show empty
    currentProducts = [];
  } else if (filteredProducts.length <= productsPerPage) {
    // If we have fewer products than one page, show all products on every page
    currentProducts = filteredProducts;
  } else {
    // Normal pagination
    const endIndex = startIndex + productsPerPage;
    currentProducts = filteredProducts.slice(startIndex, endIndex);
    
    // If we've reached the end but need more products for remaining pages,
    // cycle back to the beginning
    if (currentProducts.length < productsPerPage && filteredProducts.length > 0) {
      const remaining = productsPerPage - currentProducts.length;
      const additionalProducts = filteredProducts.slice(0, remaining);
      currentProducts = [...currentProducts, ...additionalProducts];
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4">
          <div className="flex gap-6">
            {/* Category Card */}
            <div className="hidden lg:block flex-shrink-0">
              <CategoryCard />
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
                    className="product-card"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                      HOVER
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
