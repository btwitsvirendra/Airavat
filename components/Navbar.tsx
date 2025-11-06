'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MessageSquare,
  Package,
  Truck
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, cart, searchQuery, setSearchQuery } = useStore();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-regal-blue-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <span>📞 1800-123-4567</span>
            <span>📧 support@airavat.com</span>
          </div>
          <div className="hidden md:flex gap-4">
            <Link href="/supplier/register" className="hover:text-regal-gold-400 transition">
              Become a Supplier
            </Link>
            <Link href="/help" className="hover:text-regal-gold-400 transition">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl font-bold">
              <span className="text-regal-blue-700">Aira</span>
              <span className="text-teal-600">vat</span>
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              B2B Marketplace
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, suppliers, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-gray-700 hover:text-teal-600 transition">
              Products
            </Link>
            <Link href="/suppliers" className="text-gray-700 hover:text-teal-600 transition">
              Suppliers
            </Link>

            {user ? (
              <>
                <Link href="/messages" className="relative text-gray-700 hover:text-teal-600 transition">
                  <MessageSquare size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Link>

                {user.role === 'supplier' && (
                  <Link href="/supplier/dashboard" className="text-gray-700 hover:text-teal-600 transition">
                    <Package size={24} />
                  </Link>
                )}

                <Link href="/cart" className="relative text-gray-700 hover:text-teal-600 transition">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-regal-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition">
                  <User size={24} />
                  <span className="font-medium">{user.name}</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-teal-600 transition font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Search bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-4">
            <Link href="/products" className="block text-gray-700 hover:text-teal-600">
              Products
            </Link>
            <Link href="/suppliers" className="block text-gray-700 hover:text-teal-600">
              Suppliers
            </Link>
            {user ? (
              <>
                <Link href="/messages" className="block text-gray-700 hover:text-teal-600">
                  Messages
                </Link>
                <Link href="/cart" className="block text-gray-700 hover:text-teal-600">
                  Cart ({cart.length})
                </Link>
                <Link href="/profile" className="block text-gray-700 hover:text-teal-600">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-teal-600">
                  Login
                </Link>
                <Link href="/register" className="block btn-primary text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
