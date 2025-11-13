'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, X, ArrowUp, ArrowLeft } from 'lucide-react';
import { categories } from '@/lib/data/categories';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryPopupProps {
  category: typeof categories[0];
  onClose: () => void;
  position: { top: number; left: number };
}

function CategoryPopup({ category, onClose, position }: CategoryPopupProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedMicroCategory, setSelectedMicroCategory] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const selectedSub = category.subcategories?.find((sub) => sub.id === selectedSubcategory);

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setSelectedMicroCategory(null);
  };

  const handleBack = () => {
    if (selectedMicroCategory) {
      setSelectedMicroCategory(null);
    } else if (selectedSubcategory) {
      setSelectedSubcategory(null);
    }
  };

  // Featured products for the category
  const featuredProducts = [
    { name: 'Bottle', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Reed Diffuser Sticks', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200' },
    { name: 'Lunch Boxes', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Christmas Gifts', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Party supplies', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Party Favors', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Santa Claus', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Champagne', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Comforters', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Openers', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Spice Grinder', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200' },
    { name: 'Plastic Hangers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Spice Mill', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200' },
    { name: 'Table Numbers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Folding Screen', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Christmas Supplies', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Bottle Rack', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Wine Glasses', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
  ];

  // Micro categories for subcategory
  const microCategories = [
    { name: 'Bottle', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Reed Diffuser Sticks', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200' },
    { name: 'Lunch Boxes', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Christmas Gifts', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Party supplies', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Party Favors', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Santa Claus', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Champagne', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Comforters', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Openers', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Spice Grinder', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200' },
    { name: 'Plastic Hangers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Spice Mill', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200' },
    { name: 'Table Numbers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Folding Screen', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Christmas Supplies', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { name: 'Bottle Rack', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
    { name: 'Wine Glasses', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200' },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-[55]"
      />
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
        onClick={onClose}
      >
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white border-2 border-[#1E3A8A] rounded-lg shadow-2xl w-[1800px] max-h-[1200px] overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full">
            {/* Left: Subcategories List */}
            <div className="w-80 border-r border-gray-200 bg-gray-50 overflow-y-auto">
              <div className="p-6 border-b border-gray-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(selectedSubcategory || selectedMicroCategory) && (
                    <button
                      onClick={handleBack}
                      className="p-1.5 hover:bg-gray-100 rounded transition"
                    >
                      <ArrowLeft size={20} className="text-[#1E3A8A]" />
                    </button>
                  )}
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-semibold text-[#1E3A8A] text-lg">{category.name}</h3>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded transition">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <nav className="p-3">
                <AnimatePresence mode="wait">
                  {!selectedSubcategory ? (
                    <motion.div
                      key="categories"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {category.subcategories?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubcategoryClick(sub.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition group text-left hover:bg-white"
                        >
                          <span className="text-xl">{sub.icon}</span>
                          <span className="text-sm flex-1 font-medium text-gray-700 group-hover:text-[#1E3A8A]">
                            {sub.name}
                          </span>
                          <ChevronRight size={16} className="text-gray-400 group-hover:text-[#1E3A8A]" />
                        </button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="subcategories"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {category.subcategories?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubcategoryClick(sub.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition group text-left ${
                            selectedSubcategory === sub.id
                              ? 'bg-white text-[#1E3A8A] font-semibold'
                              : 'text-gray-700 hover:bg-white'
                          }`}
                        >
                          <span className="text-xl">{sub.icon}</span>
                          <span className="text-sm flex-1">{sub.name}</span>
                          <ChevronRight size={16} className="text-gray-400 group-hover:text-[#1E3A8A]" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>
            </div>

            {/* Right: Featured Products Grid */}
            <div className="flex-1 p-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                {!selectedSubcategory ? (
                  <motion.div
                    key="category-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Link
                      href={`/products?category=${category.slug}`}
                      onClick={onClose}
                      className="block"
                    >
                      <div className="flex items-center justify-between mb-6 cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-[#1E3A8A] group-hover:text-[#1E40AF] transition">
                            {category.name}
                          </h3>
                        </div>
                        <div className="text-[#1E3A8A] hover:text-[#1E40AF] text-sm font-medium flex items-center gap-1">
                          Browse featured selections
                          <ArrowUp size={14} className="rotate-45" />
                        </div>
                      </div>
                    </Link>
                    <div className="grid grid-cols-8 gap-6">
                      {featuredProducts.map((product, index) => (
                        <Link
                          key={index}
                          href={`/products?q=${encodeURIComponent(product.name)}`}
                          className="flex flex-col items-center group"
                          onClick={onClose}
                        >
                          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-3 group-hover:ring-2 group-hover:ring-[#1E3A8A] transition-all duration-300">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <span className="text-sm text-center text-gray-700 group-hover:text-[#1E3A8A] transition line-clamp-2">
                            {product.name}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="flex flex-col items-center justify-center group"
                        onClick={onClose}
                      >
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:ring-2 group-hover:ring-[#1E3A8A] transition-all duration-300">
                          <ChevronRight size={28} className="text-gray-400 group-hover:text-[#1E3A8A]" />
                        </div>
                        <span className="text-sm text-center text-gray-700 group-hover:text-[#1E3A8A] transition">
                          View all
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="subcategory-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Link
                      href={`/products?category=${selectedSub?.slug || category.slug}`}
                      onClick={onClose}
                      className="block"
                    >
                      <div className="flex items-center justify-between mb-6 cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-[#1E3A8A] group-hover:text-[#1E40AF] transition">
                            {selectedSub?.name}
                          </h3>
                        </div>
                        <div className="text-[#1E3A8A] hover:text-[#1E40AF] text-sm font-medium flex items-center gap-1">
                          Browse featured selections
                          <ArrowUp size={14} className="rotate-45" />
                        </div>
                      </div>
                    </Link>
                    <div className="grid grid-cols-8 gap-6">
                      {microCategories.map((item, index) => (
                        <Link
                          key={index}
                          href={`/products?q=${encodeURIComponent(item.name)}`}
                          className="flex flex-col items-center group"
                          onClick={onClose}
                        >
                          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-3 group-hover:ring-2 group-hover:ring-[#1E3A8A] transition-all duration-300">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <span className="text-sm text-center text-gray-700 group-hover:text-[#1E3A8A] transition line-clamp-2">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href={`/products?category=${selectedSub?.slug || category.slug}`}
                        className="flex flex-col items-center justify-center group"
                        onClick={onClose}
                      >
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:ring-2 group-hover:ring-[#1E3A8A] transition-all duration-300">
                          <ChevronRight size={28} className="text-gray-400 group-hover:text-[#1E3A8A]" />
                        </div>
                        <span className="text-sm text-center text-gray-700 group-hover:text-[#1E3A8A] transition">
                          View all
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function CategorySidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleCategoryClick = (categoryId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(categoryId);
  };

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="relative">
      {/* Left Sidebar - Categories List */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          <nav className="p-2">
            {categories.map((category) => (
              <button
                key={category.id}
                ref={(el) => {
                  categoryRefs.current[category.id] = el;
                }}
                onClick={(e) => handleCategoryClick(category.id, e)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group text-left"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm text-gray-700 group-hover:text-[#1E3A8A] font-medium flex-1">
                  {category.name}
                </span>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-[#1E3A8A] opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Category Popup */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryData && (
          <CategoryPopup
            category={selectedCategoryData}
            onClose={() => setSelectedCategory(null)}
            position={{ top: 0, left: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
