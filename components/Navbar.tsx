'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MessageSquare,
  Store,
  Shield,
  Zap
} from 'lucide-react';
import { useStore } from '@/lib/store';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, cart, searchQuery, setSearchQuery } = useStore();

  return (
    <nav className="bg-white sticky top-0 z-50 border-b">
      {/* Main Top Section */}
      <div className="border-b">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 relative">
                {/* Elephant logo placeholder - in real app, use Image component */}
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-regal-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
              </div>
              <span className="text-2xl font-bold text-regal-blue">Airavat</span>
            </Link>

            {/* Search Bar - Center */}
            <div className="flex-1 max-w-3xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, suppliers, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border-2 border-regal-blue rounded-full focus:outline-none focus:ring-2 focus:ring-teal transition"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal text-white p-2 rounded-full hover:bg-teal-600 transition">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Deliver To */}
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <span className="text-gray-600">Deliver To</span>
                <div className="flex items-center gap-1">
                  <span className="text-xl">🇮🇳</span>
                  <span className="font-semibold">Delhi..</span>
                </div>
              </div>

              {/* Become a merchant */}
              <Link href="/supplier/register" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-teal transition">
                <Store size={20} />
                <span className="text-sm">Become a merchant</span>
              </Link>

              {/* Messages */}
              <Link href="/messages" className="relative text-gray-700 hover:text-teal transition">
                <MessageSquare size={24} />
                {user && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative text-gray-700 hover:text-teal transition">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              {user ? (
                <Link href="/account" className="flex items-center gap-2 text-gray-700 hover:text-teal transition">
                  <User size={24} />
                  <span className="hidden lg:block text-sm">Account</span>
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-teal transition">
                  <User size={24} />
                  <span className="hidden lg:block text-sm">Account</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Left Side Nav */}
            <div className="flex items-center gap-6">
              {/* Categories */}
              <button className="flex items-center gap-2 text-gray-700 hover:text-teal transition font-medium">
                <Menu size={20} />
                <span>Categories</span>
              </button>

              <Link href="/discover" className="flex items-center gap-2 text-gray-700 hover:text-teal transition font-medium">
                <Zap size={20} />
                <span>Discover</span>
              </Link>

              <Link href="/rfq" className="flex items-center gap-2 text-gray-700 hover:text-teal transition font-medium">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>RFQ</span>
              </Link>

              <Link href="/trade-protection" className="flex items-center gap-2 text-gray-700 hover:text-teal transition font-medium">
                <Shield size={20} />
                <span>Trade Protection</span>
              </Link>
            </div>

            {/* Right Side Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-teal transition font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-teal transition font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-teal transition font-medium">
                Contact Us
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-teal transition font-medium">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/discover" className="block text-gray-700 hover:text-teal py-2">
              Discover
            </Link>
            <Link href="/rfq" className="block text-gray-700 hover:text-teal py-2">
              RFQ
            </Link>
            <Link href="/trade-protection" className="block text-gray-700 hover:text-teal py-2">
              Trade Protection
            </Link>
            <div className="border-t pt-3 mt-3">
              <Link href="/" className="block text-gray-700 hover:text-teal py-2">
                Home
              </Link>
              <Link href="/about" className="block text-gray-700 hover:text-teal py-2">
                About
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-teal py-2">
                Contact Us
              </Link>
              <Link href="/help" className="block text-gray-700 hover:text-teal py-2">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
