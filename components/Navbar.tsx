'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  HelpCircle,
  Menu,
  MessageSquare,
  PackageSearch,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  User,
} from 'lucide-react';
import { useStore } from '@/lib/store';

const quickSearches = [
  'Industrial Machinery',
  'Packaging Supplies',
  'Textiles',
  'Electrical Equipment',
  'Agriculture',
];

const navigationLinks = [
  { href: '/discover', label: 'Discover' },
  { href: '/trade-services', label: 'Trade Services' },
  { href: '/payment-links', label: 'Secure Payments' },
  { href: '/logistics', label: 'Logistics' },
  { href: '/events', label: 'Events & Webinars' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, cart, searchQuery, setSearchQuery } = useStore();

  return (
    <header className="shadow-md">
      <div className="bg-black text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/supplier/register" className="hover:text-regal-gold-300 transition">
              Sell on Airavat
            </Link>
            <Link href="/trade-protection" className="hover:text-regal-gold-300 transition flex items-center gap-1">
              <ShieldCheck size={14} />
              Trade Assurance
            </Link>
            <Link href="/help" className="hover:text-regal-gold-300 transition flex items-center gap-1">
              <HelpCircle size={14} />
              Help Center
            </Link>
          </div>
          <div className="flex items-center gap-4 ml-auto text-[11px] md:text-xs">
            <button className="flex items-center gap-1 hover:text-regal-gold-300 transition">
              <Globe size={14} /> EN / ₹ INR
            </button>
            <Link href="/app" className="hidden sm:inline hover:text-regal-gold-300 transition">
              Download App
            </Link>
            <Link href="/orders" className="hover:text-regal-gold-300 transition">
              Orders
            </Link>
            <Link href="/favorites" className="hover:text-regal-gold-300 transition">
              Favourites
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-regal-blue-600 bg-gradient-to-br from-teal-500 via-regal-blue-600 to-black text-2xl font-bold text-white">
                A
              </div>
              <div>
                <span className="block text-2xl font-semibold text-regal-blue-900 leading-tight">Airavat</span>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-regal-gold-500">Global Trade Hub</span>
              </div>
            </Link>

            <button
              className="lg:hidden ml-auto inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <Menu size={22} />
            </button>

            <div className="hidden lg:block flex-1">
              <div className="flex items-stretch rounded-full border-2 border-regal-blue-600 overflow-hidden bg-white">
                <div className="hidden xl:flex items-center gap-2 bg-regal-blue-900 px-4 text-white text-sm font-medium">
                  <PackageSearch size={16} />
                  Products
                </div>
                <input
                  type="text"
                  placeholder="Search for products, suppliers and deals"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="flex-1 px-4 text-sm outline-none"
                />
                <button className="bg-teal-500 px-6 text-white font-semibold hover:bg-teal-600 transition">
                  <Search size={20} />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-gray-500">
                {quickSearches.map((item) => (
                  <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="hover:text-teal-600 transition">
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 ml-4 text-sm">
              <Link href="/supplier/dashboard" className="flex flex-col items-center gap-1 text-gray-600 hover:text-teal-600 transition">
                <Store size={22} />
                <span>Supplier</span>
              </Link>
              <Link href="/messages" className="flex flex-col items-center gap-1 text-gray-600 hover:text-teal-600 transition relative">
                <MessageSquare size={22} />
                <span>Messages</span>
                {user && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-regal-gold-500 text-[10px] font-semibold text-black">
                    3
                  </span>
                )}
              </Link>
              <Link href="/orders" className="flex flex-col items-center gap-1 text-gray-600 hover:text-teal-600 transition">
                <ShieldCheck size={22} />
                <span>Orders</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-teal-600 transition relative">
                <ShoppingCart size={22} />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-semibold text-white">
                    {cart.length}
                  </span>
                )}
              </Link>
              {user ? (
                <Link href="/account" className="flex flex-col items-center gap-1 text-gray-600 hover:text-teal-600 transition">
                  <User size={22} />
                  <span>My Airavat</span>
                </Link>
              ) : (
                <Link href="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-teal-600 transition">
                  <User size={22} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-regal-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20 transition">
                <Menu size={18} />
                All Categories
              </button>
              <div className="hidden md:flex items-center gap-6 text-sm">
                {navigationLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-regal-gold-300 transition">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/global-discovery"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-regal-gold-500 px-4 py-2 text-sm font-semibold text-black hover:bg-regal-gold-400 transition"
            >
              <Globe size={16} /> Global Expo
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white shadow-inner">
          <div className="px-4 py-4 space-y-4 text-sm">
            <div className="flex items-center gap-2 rounded-lg bg-regal-blue-50 p-3">
              <Search size={18} className="text-regal-blue-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products and suppliers"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/supplier/register" className="rounded-lg border border-gray-200 p-3 text-center font-medium text-gray-700">
                Become a Supplier
              </Link>
              <Link href="/trade-protection" className="rounded-lg border border-gray-200 p-3 text-center font-medium text-gray-700">
                Trade Assurance
              </Link>
              <Link href="/orders" className="rounded-lg border border-gray-200 p-3 text-center font-medium text-gray-700">
                Orders
              </Link>
              <Link href="/messages" className="rounded-lg border border-gray-200 p-3 text-center font-medium text-gray-700">
                Messages
              </Link>
            </div>
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-regal-blue-50">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="flex-1 rounded-full border border-regal-blue-600 px-4 py-2 text-center font-semibold text-regal-blue-700">
                Sign In
              </Link>
              <Link href="/register" className="flex-1 rounded-full bg-teal-500 px-4 py-2 text-center font-semibold text-white">
                Join Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

