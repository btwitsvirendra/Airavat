'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Shirt, Headphones, Activity, Sparkles, Gem, Car, Heart, Home, Wrench, ShoppingBag, Smartphone, Gamepad2, BookOpen, Music, Camera, Palette, Plane, Dumbbell, Utensils, Baby, GraduationCap, Briefcase, Factory, Zap, Package, Truck, Flower2, Stethoscope, Hammer, Lightbulb, Building2, Laptop, Beaker, Building, Sun, Sofa, Lock, Footprints, Scissors, Printer, BarChart3, Pickaxe, Box, Wheat, Square, Shield } from 'lucide-react';
import { categories } from '@/lib/data/categories';
import { motion, AnimatePresence } from 'framer-motion';

// Map category icons to Lucide line icons
const categoryIconMap: Record<string, any> = {
  'apparel-accessories': Shirt,
  'automobiles-motorcycles': Car,
  'beauty-personal-care': Sparkles,
  'consumer-electronics': Headphones,
  'sports-entertainment': Activity,
  'jewelry-eyewear-watches': Gem,
  'health-medical': Heart,
  'home-garden': Home,
  'hardware': Wrench,
  'fashion-accessories': ShoppingBag,
  'electronics': Smartphone,
  'toys-games': Gamepad2,
  'books-media': BookOpen,
  'music-instruments': Music,
  'photography': Camera,
  'arts-crafts': Palette,
  'travel-luggage': Plane,
  'sports-fitness': Dumbbell,
  'food-beverage': Utensils,
  'baby-products': Baby,
  'education': GraduationCap,
  'office-supplies': Briefcase,
  'industrial-equipment': Factory,
  'electrical-equipment': Zap,
  'packaging': Package,
  'transportation': Truck,
  'gifts-crafts': Flower2,
  'medical-equipment': Stethoscope,
  'tools': Hammer,
  'lighting': Lightbulb,
  'construction': Building2,
  'chemicals': Beaker,
  'computer-hardware-software': Laptop,
  'construction-real-estate': Building,
  'energy': Sun,
  'furniture': Sofa,
  'security-protection': Lock,
  'shoes-accessories': Footprints,
  'textiles': Scissors,
  'office-school-supplies': Printer,
  'measurement-analysis': BarChart3,
  'minerals-metallurgy': Pickaxe,
  'packaging-printing': Box,
  'raw-materials': Wheat,
  'rubber-plastics': Square,
  'service-equipment': Shield,
  'lights-lighting': Lightbulb,
  'machinery': Factory,
  'industrial-parts': Factory,
  'industrial-machinery': Factory,
  'commercial-equipment-machinery': Factory,
  'luggage-bags-cases': Package,
  'parents-kids-toys': Baby,
  'personal-care-home-care': Heart,
  'pet-supplies': Heart,
  'school-office-supplies': Printer,
  'construction-building-machinery': Building2,
};

// Default icon if category not found
const DefaultIcon = Star;

export default function CategoryCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryPosition, setCategoryPosition] = useState<{ top: number; left: number } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const popupRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollbarHeight, setScrollbarHeight] = useState(15);
  const [isDragging, setIsDragging] = useState(false);

  const getCategoryIcon = (categorySlug: string) => {
    const IconComponent = categoryIconMap[categorySlug] || DefaultIcon;
    return IconComponent;
  };

  // Handle category click
  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
    e.preventDefault();
    const popupWidth = 600;
    const popupHeight = 500;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Center the popup on the screen, shifted down by 90px
    const left = (viewportWidth - popupWidth) / 2;
    const top = (viewportHeight - popupHeight) / 2 + 90;
    
    setCategoryPosition({ top, left });
    setSelectedCategory(categoryId);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !Object.values(categoryRefs.current).some((ref) => ref?.contains(event.target as Node))
      ) {
        setSelectedCategory(null);
        setCategoryPosition(null);
      }
    };

    if (selectedCategory) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedCategory]);

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;
      
      if (maxScroll > 0) {
        const progress = (scrollTop / maxScroll) * 100;
        setScrollProgress(progress);
        
        // Calculate scrollbar thumb height based on visible area (reduced by half)
        const thumbHeight = (clientHeight / scrollHeight) * 100;
        setScrollbarHeight(Math.max(7.5, Math.min(thumbHeight * 0.5, 42.5)));
      } else {
        setScrollProgress(0);
        setScrollbarHeight(100);
      }
    };

    container.addEventListener('scroll', updateScrollbar);
    updateScrollbar();
    window.addEventListener('resize', updateScrollbar);
    
    return () => {
      container.removeEventListener('scroll', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
    };
  }, []);

  // Handle scrollbar track click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    const track = scrollbarTrackRef.current;
    if (!container || !track) return;

    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const percentage = clickY / trackHeight;

    const { scrollHeight, clientHeight } = container;
    const maxScroll = scrollHeight - clientHeight;
    const targetScroll = percentage * maxScroll;

    container.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Calculate available track height (excluding arrow buttons)
  const trackHeight = 320 - 48; // Total height minus arrow buttons (24px each)

  // Handle up arrow click
  const handleScrollUp = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ top: -100, behavior: 'smooth' });
  };

  // Handle down arrow click
  const handleScrollDown = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ top: 100, behavior: 'smooth' });
  };

  // Handle scrollbar thumb drag
  useEffect(() => {
    if (!isDragging) return;

    const container = scrollContainerRef.current;
    const track = scrollbarTrackRef.current;
    if (!container || !track) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = track.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const trackHeight = rect.height;
      const percentage = Math.max(0, Math.min(1, mouseY / trackHeight));

      const { scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;
      const targetScroll = percentage * maxScroll;

      container.scrollTop = targetScroll;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="relative flex items-start gap-[0.5px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card with categories list */}
      <div className="relative bg-white rounded-[15px] border border-gray-200 overflow-hidden" style={{ width: '220px' }}>
        {/* Categories List Container */}
        <div className="relative" style={{ height: '320px' }}>
          {/* Scrollable Content */}
          <div 
            ref={scrollContainerRef}
            className="category-scroll-container h-full overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <nav className="p-4 space-y-1">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category.slug);
                const isSelected = selectedCategory === category.id;
                return (
                  <Link
                    key={category.id}
                    ref={(el) => {
                      categoryRefs.current[category.id] = el;
                    }}
                    href={`/?category=${category.slug || category.name.toLowerCase()}`}
                    onClick={(e) => handleCategoryClick(e, category.id)}
                    className={`category-link flex items-center gap-3 px-3 py-2.5 rounded-lg transition group text-left ${
                      isSelected ? 'bg-[rgba(154,121,255,0.1)]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent size={18} className={`flex-shrink-0 ${isSelected ? 'text-[#9A79FF]' : 'text-gray-600'}`} strokeWidth={1.5} />
                    <span className={`text-sm font-medium flex-1 truncate ${isSelected ? 'text-[#9A79FF]' : 'text-gray-900'}`}>
                      {category.name}
                    </span>
                    <ChevronRight size={14} className={`flex-shrink-0 transition ${isSelected ? 'text-[#9A79FF] opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'}`} />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* View All Button - Appears on Hover */}
        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-3 z-10">
            <Link
              href="/products"
              className="cta-button relative inline-flex items-center justify-center py-2.5 px-4 transition-all duration-200 border-none bg-transparent cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span className="cta-button-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-[50px] bg-[rgba(154,121,255,0.1)] w-[38px] h-[38px] transition-all duration-300"></span>
              <span className="relative font-bold text-[12.6px] tracking-wide text-gray-800 z-10 leading-none inline-block">
                View All
              </span>
              <svg
                className="relative ml-1.5 fill-none stroke-gray-800 stroke-2 z-10 transition-all duration-300 translate-x-[-5px] inline-block align-middle"
                width="15px"
                height="10px"
                viewBox="0 0 13 10"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ verticalAlign: 'middle', display: 'inline-block' }}
              >
                <path d="M1,5 L11,5" />
                <polyline points="8 1 12 5 8 9" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Separate Scrollbar - Positioned 0.5px away */}
      <div 
        className="relative flex flex-col items-center"
        style={{ height: '320px', width: '12px' }}
      >
        {/* Up Arrow Button - Custom scrollbar arrow (ONLY used for scrollbar, not elsewhere) */}
        <button
          onClick={handleScrollUp}
          className="w-full h-6 flex items-center justify-center bg-transparent hover:bg-gray-100 transition-colors rounded-t"
          style={{ minHeight: '24px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path
              d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Scrollbar Track */}
        <div 
          ref={scrollbarTrackRef}
          className="relative flex-1 w-full cursor-pointer"
          style={{ minHeight: 0, height: `${trackHeight}px` }}
          onClick={handleTrackClick}
        >
          <div className="relative h-full w-full">
            {/* Scrollbar Track Background - Transparent */}
            <div className="absolute inset-0 bg-transparent"></div>
            {/* Scrollbar Thumb - Rounded pill shape */}
            <div 
              ref={scrollbarRef}
              className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-150 cursor-grab active:cursor-grabbing"
              style={{
                backgroundColor: '#9A79FF',
                top: `${scrollProgress * (100 - scrollbarHeight) / 100}%`,
                height: `${scrollbarHeight}%`,
                minHeight: '10px',
                width: '6px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#8A69EF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#9A79FF';
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(true);
              }}
            ></div>
          </div>
        </div>

        {/* Down Arrow Button - Custom scrollbar arrow (ONLY used for scrollbar, not elsewhere) */}
        <button
          onClick={handleScrollDown}
          className="w-full h-6 flex items-center justify-center bg-transparent hover:bg-gray-100 transition-colors rounded-b"
          style={{ minHeight: '24px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600" style={{ transform: 'rotate(180deg)' }}>
            <path
              d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Category Popup Panel */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryData && categoryPosition && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => {
                setSelectedCategory(null);
                setCategoryPosition(null);
              }}
            />
            
            {/* Popup Panel */}
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
              style={{
                top: `${categoryPosition.top}px`,
                left: `${categoryPosition.left}px`,
                width: '600px',
                maxHeight: '500px',
              }}
            >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{selectedCategoryData.name}</h3>
            <Link
              href={`/products?category=${selectedCategoryData.slug}`}
              className="text-sm text-[#9A79FF] hover:text-[#8A69EF] hover:underline"
              onClick={() => {
                setSelectedCategory(null);
                setCategoryPosition(null);
              }}
            >
              Browse featured selections
            </Link>
          </div>

          {/* Content - Grid of Subcategories */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: '420px' }}>
            <div className="grid grid-cols-8 gap-6">
              {selectedCategoryData.subcategories?.slice(0, 16).map((subcategory, index) => (
                <Link
                  key={subcategory.id}
                  href={`/products?category=${subcategory.slug}`}
                  className="flex flex-col items-center group"
                  onClick={() => {
                    setSelectedCategory(null);
                    setCategoryPosition(null);
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden mb-2 group-hover:ring-2 group-hover:ring-[#9A79FF] transition-all duration-300 flex items-center justify-center">
                    <span className="text-2xl">{subcategory.icon || '📦'}</span>
                  </div>
                  <span className="text-xs text-center text-gray-700 group-hover:text-[#9A79FF] transition line-clamp-2">
                    {subcategory.name}
                  </span>
                </Link>
              ))}
              
              {/* View All Option */}
              <Link
                href={`/products?category=${selectedCategoryData.slug}`}
                className="flex flex-col items-center justify-center group"
                onClick={() => {
                  setSelectedCategory(null);
                  setCategoryPosition(null);
                }}
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:ring-2 group-hover:ring-[#9A79FF] transition-all duration-300">
                  <ChevronRight size={28} className="text-gray-400 group-hover:text-[#9A79FF]" />
                </div>
                <span className="text-xs text-center text-gray-700 group-hover:text-[#9A79FF] transition">
                  View all
                </span>
              </Link>
            </div>
          </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .category-scroll-container {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        .category-scroll-container::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .category-scroll-container::-webkit-scrollbar-track {
          display: none !important;
        }

        .category-scroll-container::-webkit-scrollbar-thumb {
          display: none !important;
        }

        .category-link {
          transform: translateY(0);
          transition: all 0.2s ease;
        }

        .category-link:hover {
          transform: translateX(2px);
        }

        .cta-button {
          position: relative;
        }

        .cta-button-bg {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .cta-button:hover .cta-button-bg {
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          background: rgba(154, 121, 255, 0.1);
        }

        .cta-button:hover svg {
          transform: translateX(0) !important;
        }

        .cta-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}

