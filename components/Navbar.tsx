'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  MessageSquare,
  ShoppingCart,
  User,
  ShieldCheck,
  PackageSearch,
  ChevronDown,
  ChevronRight,
  Globe,
  X,
  AppWindow,
  HelpCircle,
  Camera,
  FileText,
  Store,
  Rocket,
  FileText as FileTextIcon,
  Star,
  LogOut,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { categories } from '@/lib/data/categories';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [isTradeProtectionOpen, setIsTradeProtectionOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'manufacturers' | 'worldwide'>('products');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, cart, searchQuery, setSearchQuery } = useStore();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll for shrinking header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
        setIsDiscoverOpen(false);
        setIsRFQOpen(false);
        setIsTradeProtectionOpen(false);
        setIsHomeOpen(false);
        setIsAboutOpen(false);
        setIsContactUsOpen(false);
        setIsHelpCenterOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainCategories = categories.slice(0, 12);
  const frequentlySearched = ['glass bottles', 'perfume bottle', 'sport car', 'perfume bottle with box'];

  // Helper function to close all dropdowns
  const closeAllDropdowns = () => {
    setIsCategoriesOpen(false);
    setIsDiscoverOpen(false);
    setIsRFQOpen(false);
    setIsTradeProtectionOpen(false);
    setIsHomeOpen(false);
    setIsAboutOpen(false);
    setIsContactUsOpen(false);
    setIsHelpCenterOpen(false);
  };

  // Mega Menu Component
  const MegaMenu = ({ isOpen, onClose, sections }: { isOpen: boolean; onClose: () => void; sections: Array<{ title: string; items: Array<{ icon: React.ReactNode; title: string; description: string; href: string }> }> }) => {
  return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onMouseEnter={() => {}}
            onMouseLeave={onClose}
            className="absolute left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 overflow-hidden"
          >
            <div className="w-full rounded-xl bg-white p-2 lg:p-8">
              <div className="grid gap-5 lg:grid-cols-2 max-w-[850px] mx-auto">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4 className="mb-3 text-sm font-semibold text-gray-800">
                      {section.title}
                    </h4>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className="group flex flex-col gap-4 rounded-lg p-4 duration-200 hover:bg-gray-100 lg:flex-row"
                          onClick={onClose}
                        >
                          <div className="text-[#5044e4]">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="mb-1 text-base font-semibold text-gray-800 duration-200 group-hover:text-[#5044e4]">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
          </div>
            </Link>
                      ))}
          </div>
                  </div>
                ))}
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* Top Section - Main Header */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-[1920px] px-4">
          <div className="flex h-20 items-center relative">
            {/* Left: Logo with Elephant and Crown + Location */}
            <div className="flex-shrink-0 flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  {/* Elephant with Crown SVG */}
                  <svg width="48" height="48" viewBox="0 0 48 48" className="relative">
                    {/* Elephant body - teal outline */}
                    <path
                      d="M24 12 C 18 12, 12 16, 12 22 C 12 26, 14 29, 17 31 L 17 36 C 17 38, 19 40, 21 40 L 27 40 C 29 40, 31 38, 31 36 L 31 31 C 34 29, 36 26, 36 22 C 36 16, 30 12, 24 12 Z"
                      fill="none"
                      stroke="#03C4CB"
                      strokeWidth="2.5"
                    />
                    {/* Trunk */}
                    <path
                      d="M 24 24 L 24 32"
                      fill="none"
                      stroke="#03C4CB"
                      strokeWidth="2.5"
                    />
                    {/* Crown - golden yellow */}
                    <path
                      d="M 18 14 L 24 8 L 30 14 L 28 12 L 24 10 L 20 12 Z"
                      fill="#C89B3C"
                      stroke="#C89B3C"
                      strokeWidth="1"
                    />
                    {/* Crown jewels */}
                    <circle cx="24" cy="10" r="2" fill="#FFD700" />
                    <circle cx="20" cy="12" r="1.5" fill="#FFD700" />
                    <circle cx="28" cy="12" r="1.5" fill="#FFD700" />
                    {/* Tusks - golden yellow */}
                    <path
                      d="M 18 22 L 14 24 M 30 22 L 34 24"
                      stroke="#C89B3C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
              </div>
                <span className="text-2xl font-bold text-gray-800">Airavat</span>
            </Link>
              
              {/* Deliver To Section - Moved to Left */}
              <div className="hidden lg:flex flex-col items-start border-l border-gray-200 pl-6">
                <span className="text-xs text-gray-500 font-medium leading-tight">Deliver To</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 leading-tight mt-0.5">
                  <span className="text-lg leading-none">🇮🇳</span>
                  <span>Delhi..</span>
                </div>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4" ref={dropdownRef}>
              <div className="relative w-full bg-gray-100 rounded-2xl shadow-md p-1.5 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg border border-gray-300">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Airavat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="w-full pl-8 pr-24 py-3 text-base text-gray-700 bg-transparent rounded-lg focus:outline-none"
                />
                <button
                  onClick={() => {
                    window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                  }}
                  className="absolute right-1 top-1 bottom-1 px-6 bg-[#5044e4] hover:bg-[#4338ca] text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5044e4] transition"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Right: Navigation Icons */}
            <div className="ml-auto flex items-center gap-4">
              {/* Icons with Labels - Professional Expand on Hover Style */}
              <div className="p-2 bg-white rounded-[15px] shadow-[0_10px_25px_0_rgba(0,0,0,0.075)] flex items-center justify-center">
                <Link 
                  href="/supplier/register" 
                  className="group relative inline-flex justify-center items-center w-[70px] h-[50px] rounded-lg overflow-hidden transition-[width] duration-200 ease-in origin-left hover:w-[165px] focus:outline-none z-[1] text-inherit no-underline"
                >
                  <span className="absolute left-[18px] w-[28px] h-[28px] flex-shrink-0 block pointer-events-none">
                    <Store size={28} className="text-gray-700" />
                  </span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gray-200 rounded-lg transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 z-[-1]"></span>
                  <span className="transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 block text-center w-full" style={{ textIndent: '28px' }}>
                    Become a merchant
                  </span>
                </Link>
                <Link 
                  href="/account?view=messages" 
                  className="group relative inline-flex justify-center items-center w-[70px] h-[50px] rounded-lg overflow-hidden transition-[width] duration-200 ease-in origin-left hover:w-[130px] focus:outline-none z-[1] text-inherit no-underline"
                >
                  <span className="absolute left-[18px] w-[28px] h-[28px] flex-shrink-0 block pointer-events-none">
                    <MessageSquare size={28} className="text-gray-700" />
                  </span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gray-200 rounded-lg transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 z-[-1]"></span>
                  <span className="transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 block text-center w-full" style={{ textIndent: '28px' }}>
                    Messages
                  </span>
                </Link>
                <Link 
                  href="/cart" 
                  className="group relative inline-flex justify-center items-center w-[70px] h-[50px] rounded-lg overflow-hidden transition-[width] duration-200 ease-in origin-left hover:w-[110px] focus:outline-none z-[1] text-inherit no-underline"
                >
                  <span className="absolute left-[18px] w-[28px] h-[28px] flex-shrink-0 block pointer-events-none">
                    <ShoppingCart size={28} className="text-gray-700" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#03C4CB] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold z-20">
                        {cart.length}
                      </span>
                    )}
                  </span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gray-200 rounded-lg transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 z-[-1]"></span>
                  <span className="transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 block text-center w-full" style={{ textIndent: '28px' }}>
                    Cart
                  </span>
                </Link>
                {user ? (
                  <Link 
                    href="/account" 
                    className="group relative inline-flex justify-center items-center w-[70px] h-[50px] rounded-lg overflow-hidden transition-[width] duration-200 ease-in origin-left hover:w-[120px] focus:outline-none z-[1] text-inherit no-underline"
                  >
                    <span className="absolute left-[18px] w-[28px] h-[28px] flex-shrink-0 block pointer-events-none">
                      <User size={28} className="text-gray-700" />
                    </span>
                    <span className="absolute left-0 top-0 w-full h-full bg-gray-200 rounded-lg transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 z-[-1]"></span>
                    <span className="transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 block text-center w-full" style={{ textIndent: '28px' }}>
                      Account
                    </span>
                  </Link>
                ) : (
                  <Link 
                    href="/login" 
                    className="group relative inline-flex justify-center items-center w-[70px] h-[50px] rounded-lg overflow-hidden transition-[width] duration-200 ease-in origin-left hover:w-[120px] focus:outline-none z-[1] text-inherit no-underline"
                  >
                    <span className="absolute left-[18px] w-[28px] h-[28px] flex-shrink-0 block pointer-events-none">
                      <User size={28} className="text-gray-700" />
                    </span>
                    <span className="absolute left-0 top-0 w-full h-full bg-gray-200 rounded-lg transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 z-[-1]"></span>
                    <span className="transform translate-x-full transition-transform duration-200 ease-in origin-right group-hover:translate-x-0 block text-center w-full" style={{ textIndent: '28px' }}>
                      Account
                    </span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="block lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>

      {/* Bottom Section - Secondary Navigation */}
      <div className="bg-white border-b border-gray-200 relative" ref={dropdownRef}>
        <div className="mx-auto max-w-[1920px] px-4">
          <div className="flex items-center justify-between h-12">
            {/* Left: Categories, Discover, RFQ, Trade Protection */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => { closeAllDropdowns(); setIsCategoriesOpen(!isCategoriesOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <Menu size={18} />
                <span>Categories</span>
                <ChevronDown size={14} className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsDiscoverOpen(!isDiscoverOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <Rocket size={18} />
                <span>Discover</span>
                <ChevronDown size={14} className={`transition-transform ${isDiscoverOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsRFQOpen(!isRFQOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <FileText size={18} />
                <span>RFQ</span>
                <ChevronDown size={14} className={`transition-transform ${isRFQOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsTradeProtectionOpen(!isTradeProtectionOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <ShieldCheck size={18} />
                <span>Trade Protection</span>
                <ChevronDown size={14} className={`transition-transform ${isTradeProtectionOpen ? 'rotate-180' : ''}`} />
              </button>
              </div>

            {/* Right: Home, About, Contact Us, Help Center */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => { closeAllDropdowns(); setIsHomeOpen(!isHomeOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                Home
                <ChevronDown size={14} className={`transition-transform ${isHomeOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsAboutOpen(!isAboutOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                About
                <ChevronDown size={14} className={`transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsContactUsOpen(!isContactUsOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                Contact Us
                <ChevronDown size={14} className={`transition-transform ${isContactUsOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsHelpCenterOpen(!isHelpCenterOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                Help Center
                <ChevronDown size={14} className={`transition-transform ${isHelpCenterOpen ? 'rotate-180' : ''}`} />
              </button>
          </div>
        </div>
      </div>

        {/* Categories Mega Menu */}
      <MegaMenu
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        sections={[
          {
            title: 'Get Started',
            items: [
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 23.325C9.11255 23.325 6.18755 22.2375 3.97505 20.025C1.83755 17.8875 0.675049 15.0375 0.675049 12C0.675049 8.9625 1.83755 6.1125 4.01255 3.975C6.11255 1.8375 8.96255 0.675003 12 0.675003C15.0375 0.675003 17.8876 1.8375 20.025 4.0125C24.4501 8.4375 24.4501 15.6375 20.025 20.0625C17.8125 22.2375 14.8875 23.325 12 23.325Z" fill="currentColor" />
                  </svg>
                ),
                title: 'Browse All Categories',
                description: 'Explore our complete product catalog organized by industry.',
                href: '/products',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4 7.72501H13.9875C14.4375 7.72501 14.8125 7.35001 14.8125 6.90001C14.8125 6.45001 14.4375 6.07501 13.9875 6.07501H13.2375V5.73751C13.2375 5.28751 12.8625 4.91251 12.4125 4.91251C11.9625 4.91251 11.5875 5.28751 11.5875 5.73751V6.07501H11.4375C10.2 6.07501 9.1875 7.08751 9.1875 8.28751C9.1875 9.52501 10.2 10.5 11.4375 10.5H12.6375C12.9375 10.5 13.2 10.7625 13.2 11.025C13.2 11.2875 12.9375 11.55 12.6375 11.55H10.05C9.6 11.55 9.225 11.925 9.225 12.375C9.225 12.825 9.6 13.2 10.05 13.2H11.5875V13.5375C11.5875 13.9875 11.9625 14.3625 12.4125 14.3625C12.8625 14.3625 13.2375 13.9875 13.2375 13.5375V13.0875C14.175 12.825 14.85 11.9625 14.85 10.95C14.85 9.71251 13.8375 8.73751 12.6 8.73751H11.4C11.1 8.73751 10.8375 8.51251 10.8375 8.21251C10.8375 7.91251 11.1 7.72501 11.4 7.72501Z" fill="currentColor" />
                    <path d="M20.9998 1.27499H2.9998C1.7248 1.27499 0.674805 2.32499 0.674805 3.59999V15.1125C0.674805 16.3875 1.7248 17.4375 2.9998 17.4375H11.1748V21H8.13731C7.68731 21 7.3123 21.375 7.3123 21.825C7.3123 22.275 7.68731 22.65 8.13731 22.65H15.8998C16.3498 22.65 16.7248 22.275 16.7248 21.825C16.7248 21.375 16.3498 21 15.8998 21H12.8623V17.4375H20.9998C22.2748 17.4375 23.3248 16.3875 23.3248 15.1125V3.59999C23.3623 2.32499 22.2748 1.27499 20.9998 1.27499Z" fill="currentColor" />
                  </svg>
                ),
                title: 'Featured Categories',
                description: 'Discover trending and popular product categories.',
                href: '/products?featured=true',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9374 23.3625H7.4999C5.7749 23.3625 4.3124 22.05 4.1249 20.3625C4.1249 20.2875 4.0874 20.25 4.0874 20.175V2.96249C4.0874 1.68749 5.0999 0.674988 6.3749 0.674988H17.5499C18.8249 0.674988 19.8374 1.68749 19.8374 2.96249V16.0125C19.8374 17.2875 18.8249 18.3 17.5499 18.3H7.4999C7.0499 18.3 6.5999 18.4875 6.2999 18.7875C5.9624 19.0875 5.8124 19.5375 5.8124 19.9875C5.8124 20.925 6.5624 21.675 7.4999 21.675H18.9374C19.3874 21.675 19.7999 22.05 19.7999 22.5375C19.7999 23.025 19.4249 23.3625 18.9374 23.3625Z" fill="currentColor" />
                  </svg>
                ),
                title: 'Category Directory',
                description: 'Browse all categories in an organized directory format.',
                href: '/categories',
              },
            ],
          },
          {
            title: 'Popular Categories',
            items: [
              {
                icon: <PackageSearch size={24} />,
                title: 'Electronics',
                description: 'Consumer electronics, components, and accessories.',
                href: '/products?category=electronics',
              },
              {
                icon: <Store size={24} />,
                title: 'Apparel & Textiles',
                description: 'Clothing, fabrics, and fashion accessories.',
                href: '/products?category=apparel-accessories',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Industrial Equipment',
                description: 'Machinery, tools, and industrial supplies.',
                href: '/products?category=industrial-parts',
              },
            ],
          },
        ]}
      />

      {/* Discover Mega Menu */}
      <MegaMenu
        isOpen={isDiscoverOpen}
        onClose={() => setIsDiscoverOpen(false)}
        sections={[
          {
            title: 'Explore',
            items: [
              {
                icon: <Rocket size={24} />,
                title: 'Trending Products',
                description: 'Discover the most popular products right now.',
                href: '/products?sort=trending',
              },
              {
                icon: <Star size={24} />,
                title: 'Featured Suppliers',
                description: 'Browse verified and top-rated suppliers.',
                href: '/suppliers?featured=true',
              },
              {
                icon: <Globe size={24} />,
                title: 'Global Markets',
                description: 'Explore products from different regions worldwide.',
                href: '/markets',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                icon: <FileText size={24} />,
                title: 'Industry Insights',
                description: 'Latest trends and market analysis reports.',
                href: '/insights',
              },
              {
                icon: <Camera size={24} />,
                title: 'Product Showcases',
                description: 'View curated product collections and showcases.',
                href: '/showcases',
              },
              {
                icon: <AppWindow size={24} />,
                title: 'Trade Shows',
                description: 'Upcoming trade shows and exhibitions.',
                href: '/trade-shows',
              },
            ],
          },
        ]}
      />

      {/* RFQ Mega Menu */}
      <MegaMenu
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        sections={[
          {
            title: 'Request for Quotation',
            items: [
              {
                icon: <FileText size={24} />,
                title: 'Post an RFQ',
                description: 'Create a new request for quotation and get multiple quotes.',
                href: '/account/rfq/new',
              },
              {
                icon: <PackageSearch size={24} />,
                title: 'My RFQs',
                description: 'View and manage all your RFQ requests.',
                href: '/account/rfq',
              },
              {
                icon: <MessageSquare size={24} />,
                title: 'RFQ Responses',
                description: 'Review quotes and responses from suppliers.',
                href: '/account/rfq/responses',
              },
            ],
          },
          {
            title: 'Learn More',
            items: [
              {
                icon: <HelpCircle size={24} />,
                title: 'How RFQ Works',
                description: 'Learn how to use our RFQ system effectively.',
                href: '/help/rfq',
              },
              {
                icon: <FileTextIcon size={24} />,
                title: 'RFQ Templates',
                description: 'Download ready-to-use RFQ templates.',
                href: '/templates/rfq',
              },
              {
                icon: <Store size={24} />,
                title: 'Supplier Directory',
                description: 'Browse suppliers who respond to RFQs.',
                href: '/suppliers',
              },
            ],
          },
        ]}
      />

      {/* Trade Protection Mega Menu */}
      <MegaMenu
        isOpen={isTradeProtectionOpen}
        onClose={() => setIsTradeProtectionOpen(false)}
        sections={[
          {
            title: 'Protection Services',
            items: [
              {
                icon: <ShieldCheck size={24} />,
                title: 'Trade Assurance',
                description: 'Get protection for your orders with our escrow service.',
                href: '/trade-assurance',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Order Protection',
                description: 'Secure payment and delivery protection for all orders.',
                href: '/protection',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Dispute Resolution',
                description: 'Fair and fast resolution for trade disputes.',
                href: '/disputes',
              },
            ],
          },
          {
            title: 'Verification',
            items: [
              {
                icon: <ShieldCheck size={24} />,
                title: 'Verified Suppliers',
                description: 'Browse suppliers verified by Airavat.',
                href: '/suppliers?verified=true',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Get Verified',
                description: 'Apply for supplier verification badge.',
                href: '/supplier/verify',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'Security Center',
                description: 'Learn about our security measures and policies.',
                href: '/security',
              },
            ],
          },
        ]}
      />

      {/* Home Mega Menu */}
      <MegaMenu
        isOpen={isHomeOpen}
        onClose={() => setIsHomeOpen(false)}
        sections={[
          {
            title: 'Quick Links',
            items: [
              {
                icon: <Store size={24} />,
                title: 'Homepage',
                description: 'Return to the main homepage.',
                href: '/',
              },
              {
                icon: <PackageSearch size={24} />,
                title: 'All Products',
                description: 'Browse our complete product catalog.',
                href: '/products',
              },
              {
                icon: <Star size={24} />,
                title: 'Featured Deals',
                description: 'Special offers and featured products.',
                href: '/deals',
              },
            ],
          },
          {
            title: 'Account',
            items: [
              {
                icon: <User size={24} />,
                title: 'My Account',
                description: 'Access your account dashboard.',
                href: '/account',
              },
              {
                icon: <ShoppingCart size={24} />,
                title: 'My Cart',
                description: 'View items in your shopping cart.',
                href: '/cart',
              },
              {
                icon: <MessageSquare size={24} />,
                title: 'Messages',
                description: 'Check your messages and inquiries.',
                href: '/messages',
              },
            ],
          },
        ]}
      />

      {/* About Mega Menu */}
      <MegaMenu
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        sections={[
          {
            title: 'Company',
            items: [
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 23.325C9.11255 23.325 6.18755 22.2375 3.97505 20.025C1.83755 17.8875 0.675049 15.0375 0.675049 12C0.675049 8.9625 1.83755 6.1125 4.01255 3.975C6.11255 1.8375 8.96255 0.675003 12 0.675003C15.0375 0.675003 17.8876 1.8375 20.025 4.0125C24.4501 8.4375 24.4501 15.6375 20.025 20.0625C17.8125 22.2375 14.8875 23.325 12 23.325Z" fill="currentColor" />
                  </svg>
                ),
                title: 'About Us',
                description: 'Learn about Airavat and our mission.',
                href: '/about',
              },
              {
                icon: <Store size={24} />,
                title: 'Our Story',
                description: 'The journey of Airavat and our vision.',
                href: '/about/story',
              },
              {
                icon: <Star size={24} />,
                title: 'Careers',
                description: 'Join our team and build the future of B2B commerce.',
                href: '/careers',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                icon: <FileText size={24} />,
                title: 'Press & Media',
                description: 'Latest news, press releases, and media kit.',
                href: '/press',
              },
              {
                icon: <Globe size={24} />,
                title: 'Global Presence',
                description: 'Our offices and presence around the world.',
                href: '/locations',
              },
              {
                icon: <MessageSquare size={24} />,
                title: 'Contact Us',
                description: 'Get in touch with our team.',
                href: '/contact',
              },
            ],
          },
        ]}
      />

      {/* Contact Us Mega Menu */}
      <MegaMenu
        isOpen={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
        sections={[
          {
            title: 'Get in Touch',
            items: [
              {
                icon: <MessageSquare size={24} />,
                title: 'General Inquiry',
                description: 'Send us a message for general questions.',
                href: '/contact',
              },
              {
                icon: <Store size={24} />,
                title: 'Sales Team',
                description: 'Contact our sales team for business inquiries.',
                href: '/contact/sales',
              },
              {
                icon: <HelpCircle size={24} />,
                title: 'Support',
                description: 'Get help with your account or orders.',
                href: '/contact/support',
              },
            ],
          },
          {
            title: 'Other Ways',
            items: [
              {
                icon: <MessageSquare size={24} />,
                title: 'Live Chat',
                description: 'Chat with our support team in real-time.',
                href: '/chat',
              },
              {
                icon: <FileText size={24} />,
                title: 'Email Us',
                description: 'Send us an email at support@airavat.com',
                href: 'mailto:support@airavat.com',
              },
              {
                icon: <Globe size={24} />,
                title: 'Office Locations',
                description: 'Find our office locations worldwide.',
                href: '/locations',
              },
            ],
          },
        ]}
      />

      {/* Help Center Mega Menu */}
      <MegaMenu
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        sections={[
          {
            title: 'Help & Support',
            items: [
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3498 3.5625H7.64981C3.7873 3.5625 0.674805 6.675 0.674805 10.5375V18.15C0.674805 19.3875 1.6873 20.4 2.9248 20.4H16.3873C20.2498 20.4 23.3623 17.2875 23.3623 13.425V10.5375C23.3623 6.7125 20.2123 3.5625 16.3498 3.5625Z" fill="currentColor" />
                    <circle cx="6.4873" cy="12" r="0.9375" fill="currentColor" />
                    <circle cx="12" cy="12" r="0.9375" fill="currentColor" />
                    <circle cx="17.5122" cy="12" r="0.9375" fill="currentColor" />
                  </svg>
                ),
                title: 'Help Center',
                description: 'Find answers to frequently asked questions.',
                href: '/help',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5873 6.22499L15.4123 1.12499C15.1123 0.824988 14.6998 0.674988 14.2873 0.674988H5.2873C4.0123 0.674988 2.9248 1.72499 2.9248 3.03749V21.0375C2.9248 22.3125 3.9748 23.4 5.2873 23.4H18.6748C19.9498 23.4 21.0373 22.35 21.0373 21.0375V7.34999C21.0373 6.93749 20.8873 6.52499 20.5873 6.22499Z" fill="currentColor" />
                    <path d="M14.5873 10.9125H8.09981C7.64981 10.9125 7.2373 11.2875 7.2373 11.775C7.2373 12.2625 7.61231 12.6375 8.09981 12.6375H14.5873C15.0373 12.6375 15.4498 12.2625 15.4498 11.775C15.4498 11.2875 15.0748 10.9125 14.5873 10.9125Z" fill="currentColor" />
                    <path d="M14.5873 15.0375H8.09981C7.64981 15.0375 7.2373 15.4125 7.2373 15.9C7.2373 16.3875 7.61231 16.7625 8.09981 16.7625H14.5873C15.0373 16.7625 15.4498 16.3875 15.4498 15.9C15.4498 15.4125 15.0748 15.0375 14.5873 15.0375Z" fill="currentColor" />
                  </svg>
                ),
                title: 'Documentation',
                description: 'Comprehensive guides and tutorials.',
                href: '/docs',
              },
              {
                icon: <MessageSquare size={24} />,
                title: 'Contact Support',
                description: 'Get personalized help from our team.',
                href: '/contact/support',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                icon: <FileText size={24} />,
                title: 'FAQs',
                description: 'Browse frequently asked questions.',
                href: '/help/faq',
              },
              {
                icon: <HelpCircle size={24} />,
                title: 'Video Tutorials',
                description: 'Watch step-by-step video guides.',
                href: '/help/videos',
              },
              {
                icon: <FileTextIcon size={24} />,
                title: 'User Guides',
                description: 'Detailed guides for using Airavat.',
                href: '/help/guides',
              },
            ],
          },
        ]}
      />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
      {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex items-center gap-2">
                <svg className="h-8 text-teal-600 dark:text-teal-300" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z" fill="currentColor"></path>
                </svg>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <X size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <div className="relative w-full bg-gray-100 rounded-2xl shadow-md p-1.5">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              <input
                type="text"
                  placeholder="Search Airavat"
                value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-20 py-2 text-sm text-gray-700 bg-transparent rounded-lg focus:outline-none"
                />
                <button
                  onClick={() => {
                    window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                    setIsMobileMenuOpen(false);
                  }}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-[#5044e4] hover:bg-[#4338ca] text-white text-xs font-medium rounded-xl"
                >
                  Search
                </button>
            </div>
              <nav className="space-y-2">
                <Link href="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  About
                </Link>
                <Link href="/supplier/register" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Careers
                </Link>
                <Link href="/products" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  History
                </Link>
                <Link href="/trade-services" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Services
              </Link>
                <Link href="/products" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Projects
              </Link>
                <Link href="/help" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Blog
              </Link>
                <Link href="/cart" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Cart ({cart.length})
              </Link>
                {user ? (
                  <Link href="/account" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    My Account
                </Link>
                ) : (
                  <Link href="/login" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                Sign In
              </Link>
                )}
              </nav>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
