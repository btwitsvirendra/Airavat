'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  Heart,
  Package,
  MapPin,
  Bookmark,
  Settings,
  ArrowRight,
  ChevronRight,
  Headphones,
  TrendingUp,
  Truck,
  Search,
  Filter,
  FileText,
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function OrdersPage() {
  const { user, currentView, toggleView } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'confirming' | 'unpaid' | 'preparing' | 'delivering' | 'refunds' | 'completed' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-[#3373FF]">Airavat</Link>
              <span className="text-gray-600">My Airavat</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <span>🇮🇳</span>
                <span>Deliver to: IN</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>English-USD</span>
              </div>
              <Link href="/supplier/register" className="text-gray-600 hover:text-[#3373FF]">
                Start selling
              </Link>
              <Link href="/messages" className="text-gray-600 hover:text-[#3373FF]">
                <MessageSquare size={20} />
              </Link>
              <Link href="/orders" className="text-[#3373FF]">
                <FileText size={20} />
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-[#3373FF] relative">
                <ShoppingBag size={20} />
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-[#3373FF]">
                <Headphones size={20} />
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-[#3373FF]">
                <div className="w-8 h-8 bg-[#3373FF] rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.[0] || 'U'}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-1">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                
                <div className="pt-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">Online trading</div>
                  <Link href="/messages" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <MessageSquare size={18} />
                    Messages
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 px-4 py-2 bg-[rgba(154, 121, 255, 0.1)] text-[#3373FF] rounded-lg font-medium">
                    <ShoppingBag size={18} />
                    Orders
                  </Link>
                  <Link href="/payment" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <CreditCard size={18} />
                    Payment
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </Link>
                  <Link href="/saved" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <Heart size={18} />
                    Saved & history
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </Link>
                </div>

                <div className="pt-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">Add-on services</div>
                  <Link href="/logistics" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <Package size={18} />
                    Logistics services
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </Link>
                  <Link href="/dropshipping" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <Truck size={18} />
                    Dropshipping
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </Link>
                  <Link href="/services" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <TrendingUp size={18} />
                    More services
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </Link>
                </div>

                <div className="pt-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">Account settings</div>
                  <Link href="/account/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <Settings size={18} />
                    Account settings
                  </Link>
                  {user?.roles?.includes('seller') && user?.roles?.includes('buyer') && (
                    <button
                      onClick={() => {
                        toggleView();
                        const newView = currentView === 'buyer' ? 'seller' : 'buyer';
                        if (typeof window !== 'undefined') {
                          window.location.href = newView === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard';
                        }
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition w-full text-left"
                    >
                      <ArrowRight size={18} />
                      Switch to {currentView === 'buyer' ? 'Seller' : 'Buyer'}
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

              {/* Search and Filter Bar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, order number, or other information"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] focus:border-transparent outline-none"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3373FF] focus:border-transparent outline-none">
                  <option>Order date</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3373FF] focus:border-transparent outline-none">
                  <option>Select time</option>
                </select>
                <button className="bg-[#3373FF] hover:bg-[#265ACC] text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2">
                  <span>+</span>
                  Bulk Create Order
                </button>
              </div>

              {/* Order Tabs */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'confirming', label: 'Confirming' },
                  { id: 'unpaid', label: 'Unpaid' },
                  { id: 'preparing', label: 'Preparing to ship' },
                  { id: 'delivering', label: 'Delivering' },
                  { id: 'refunds', label: 'Refunds & after-sale' },
                  { id: 'completed', label: 'Completed & in review' },
                  { id: 'closed', label: 'Closed' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${
                      activeTab === tab.id
                        ? 'bg-[#3373FF] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Empty Orders State */}
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-[rgba(154, 121, 255, 0.1)] rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#3373FF]/20 rounded-full flex items-center justify-center">
                      <FileText size={64} className="text-[#3373FF]" />
                    </div>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-900 mb-2">No orders yet</p>
                <p className="text-gray-600 mb-6">Go to the homepage or click below to start sourcing</p>
                <Link
                  href="/products"
                  className="bg-[#3373FF] hover:bg-[#265ACC] text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Start sourcing
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Need Help Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-[#3373FF] text-white px-4 py-6 rounded-lg shadow-lg writing-vertical-rl">
          <p className="text-sm font-semibold mb-2">Need Help?</p>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <Headphones size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
