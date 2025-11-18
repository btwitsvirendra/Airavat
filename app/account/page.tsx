'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Headphones,
  Pencil,
  MessageSquare,
  Send,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Eye,
} from 'lucide-react';
import LikeButton from '@/components/LikeButton';

export default function BuyerDashboard() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('orders');

  // Sample data for demonstration
  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Spent', value: '$24.5K', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Items Viewed', value: '156', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const sampleOrders = [
    { id: 1, name: 'Wireless Bluetooth Headphones', moq: '50', amount: '$1,250.00', status: 'Delivering', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 2, name: 'Smart Watch Series 8', moq: '100', amount: '$3,500.00', status: 'Preparing', statusColor: 'bg-amber-100 text-amber-700' },
  ];

  const historyItems = [
    { name: 'Premium Laptop Stand', price: 839, moq: 2, liked: true },
    { name: 'Ergonomic Mouse Pad', price: 839, moq: 2, liked: false },
  ];

  const router = useRouter();
  const { favorites } = useStore();
  
  // Get latest favorites (already sorted with latest on top from store)
  const favoriteItems = favorites.slice(0, 3).map((product) => ({
    name: product.name,
    price: product.price.amount,
    moq: product.minOrderQuantity,
    id: product.id,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F9FF' }}>
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        <main className="w-full space-y-6">
          {/* Top Profile Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                {/* Profile Picture with Status */}
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#9A79FF] to-[#8A69EF] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-4xl font-bold text-white">
                      {user?.name?.[0]?.toUpperCase() || 'V'}
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                
                {/* User Info */}
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-mono">Member Id : SE8641784306743287</p>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name || 'Virendra singh'}</h1>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[rgba(154,121,255,0.1)] text-[#9A79FF] text-xs font-semibold rounded-full border border-[#D1C2FF]">
                      Verified Buyer
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                      Gold Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Support and Edit */}
              <div className="flex items-center gap-3">
                <Link 
                  href="/support" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#9A79FF] hover:bg-[rgba(154,121,255,0.1)] rounded-lg transition-all duration-200"
                >
                  <Headphones size={20} />
                  <span className="text-sm font-medium">Support</span>
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200">
                  <Pencil size={16} />
                  <span className="text-sm font-medium">Edit</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`${stat.bg} rounded-lg p-4 border border-gray-100`}>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`${stat.color} w-5 h-5`} />
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Promotional Banner */}
            <div className="relative bg-gradient-to-r from-[rgba(154,121,255,0.1)] via-blue-50 to-purple-50 rounded-xl p-5 border border-[#D1C2FF] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(154,121,255,0.2)] opacity-20 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 opacity-20 rounded-full -ml-12 -mb-12"></div>
              <div className="relative flex items-center justify-between">
                <button className="p-2 hover:bg-white/50 rounded-lg transition">
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div className="flex-1 flex items-center justify-center gap-6 mx-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#9A79FF] rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Get Additional Tax benefits right now</p>
                      <p className="text-xs text-gray-600">Complete your profile to unlock exclusive benefits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 bg-[#9A79FF] hover:bg-[#8A69EF] text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                      Learn More
                    </button>
                    <button className="px-5 py-2.5 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg text-sm font-semibold transition-all duration-200">
                      Complete Profile
                    </button>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/50 rounded-lg transition">
                  <ArrowRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex gap-6">
            {/* Main Orders Section */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Tabs */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                {[
                  { id: 'orders', label: 'Orders', icon: Package },
                  { id: 'track', label: 'Track Order', icon: Truck },
                  { id: 'refund', label: 'Refund and Dispute', icon: Clock },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-[#9A79FF] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Order List Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-gray-200 mb-4">
                <div className="col-span-4 text-sm font-bold text-gray-800">Name</div>
                <div className="col-span-2 text-sm font-bold text-gray-800">MOQ</div>
                <div className="col-span-3 text-sm font-bold text-gray-800">Amount</div>
                <div className="col-span-3 text-sm font-bold text-gray-800">Delivery Status</div>
              </div>

              {/* Order Items */}
              {sampleOrders.length > 0 ? (
                <div className="space-y-3">
                  {sampleOrders.map((order) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-12 gap-4 items-center py-4 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                    >
                      <div className="col-span-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">{order.name}</p>
                            <p className="text-xs text-gray-500">Order #ORD-{String(order.id).padStart(6, '0')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-700">{order.moq} units</p>
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm font-bold text-gray-900">{order.amount}</p>
                      </div>
                      <div className="col-span-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${order.statusColor}`}>
                          {order.status === 'Delivering' && <Truck size={12} />}
                          {order.status === 'Preparing' && <Clock size={12} />}
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">No orders yet</p>
                  <p className="text-sm text-gray-500 mb-6">Start shopping to see your orders here</p>
                  <Link
                    href="/products"
                    className="px-6 py-3 bg-[#9A79FF] hover:bg-[#8A69EF] text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Browse Products
                  </Link>
                </div>
              )}
            </div>

            {/* Right Sidebars */}
            <div className="w-80 flex flex-col gap-6">
              {/* History Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">History</h3>
                  <Link 
                    href="/history" 
                    className="text-sm text-[#9A79FF] hover:text-[#8A69EF] hover:underline font-semibold transition"
                  >
                    View
                  </Link>
                </div>
                <div className="space-y-4">
                  {historyItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                          {item.liked && (
                            <LikeButton defaultChecked={true} size="sm" className="flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-0.5">Price : ${item.price}</p>
                        <p className="text-xs text-gray-500">MOQ: {item.moq}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorite Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">Favorite</h3>
                  <Link 
                    href="/account?view=favorites" 
                    className="text-sm text-[#9A79FF] hover:text-[#8A69EF] hover:underline font-semibold transition"
                  >
                    View
                  </Link>
                </div>
                <div className="space-y-4">
                  {favoriteItems.length > 0 ? favoriteItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{item.name}</p>
                        <p className="text-sm font-medium text-gray-700 mb-1">Price : ${item.price}</p>
                        <p className="text-xs text-gray-500 mb-3">MOQ: {item.moq}</p>
                        <div className="flex items-center gap-2">
                          <button className="flex-1 px-3 py-1.5 bg-[#9A79FF] hover:bg-[#8A69EF] text-white rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1">
                            <Send size={12} />
                            Send Inquiry
                          </button>
                          <button className="flex-1 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1">
                            <MessageSquare size={12} />
                            Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No favorites yet</p>
                      <Link 
                        href="/products"
                        className="text-sm text-[#9A79FF] hover:text-[#8A69EF] hover:underline mt-2 inline-block"
                      >
                        Browse products
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
