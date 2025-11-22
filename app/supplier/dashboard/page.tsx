'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  FileText,
  Package,
  Store,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Settings,
  ArrowRight,
  ChevronRight,
  Headphones,
  CheckCircle2,
  Star,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function SupplierDashboard() {
  const { user } = useStore();

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
              <Link href="/" className="text-gray-600 hover:text-[#3373FF]">
                Switch to buyer site
              </Link>
              <Link href="/supplier/register" className="bg-[#3373FF] hover:bg-[#265ACC] text-white px-4 py-2 rounded-lg font-medium transition">
                Start selling
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-[#3373FF]">
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
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-1">
                <Link
                  href="/supplier/dashboard"
                  className="flex items-center gap-3 px-4 py-3 bg-[rgba(154, 121, 255, 0.1)] text-[#3373FF] rounded-lg font-medium"
                >
                  <Home size={20} />
                  Home
                </Link>
                <Link
                  href="/supplier/rfq"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <FileText size={18} />
                  Request for Quotation
                </Link>
                <Link
                  href="/supplier/products"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <Package size={18} />
                  Products
                </Link>
                <Link
                  href="/supplier/store"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <Store size={18} />
                  Store
                </Link>
              </nav>
                    </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Blue Banner - Airavat Style */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 mb-6 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-96 opacity-20">
                <div className="w-full h-full bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                  </div>
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-4">Start your global business journey with Airavat Selling</h1>
                <p className="text-lg text-white/90 mb-6 max-w-2xl">
                  Airavat is a leading ecommerce platform that helps your business to 200+ countries globally. Create seller account today and expose products to 40+ million buyers.
                </p>
                <Link
                  href="/supplier/register"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Become a seller now
                </Link>
            </div>
          </div>

            {/* Tools for B2B Sales */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Grow your margins with a suite of tools built for B2B sales</h2>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  {
                    icon: Home,
                    title: 'Set up storefront',
                    description: 'Showcase your brand and capabilities online - no design or coding required.',
                  },
                  {
                    icon: Package,
                    title: 'Post products',
                    description: 'Optimize your product listings for SEO with posting suggestions based on site data...',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Get traffic',
                    description: 'Increasing awareness and conversions with our marketing tools like Keyword Advertising',
                  },
                  {
                    icon: Users,
                    title: 'Find new business',
                    description: 'Easily find and connect with buyers in the Request for Quotation (RFQ) market.',
                  },
                  {
                    icon: BarChart3,
                    title: 'Analyze data',
                    description: 'Visualize your store\'s metrics and historical data, and get intelligent suggestions...',
                  },
                ].map((tool, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-[rgba(154, 121, 255, 0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <tool.icon size={32} className="text-[#3373FF]" />
                </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                    <Link href="/supplier/learn" className="text-sm text-[#3373FF] hover:underline font-medium">
                      Learn more
                    </Link>
            </div>
                ))}
            </div>
          </div>

            {/* Industry Report Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Add your industry and view the according industry report.</p>
              </div>
                <div className="flex items-center gap-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3373FF] focus:border-transparent outline-none">
                    <option>Please select industry</option>
                    <option>Electronics</option>
                    <option>Textiles</option>
                    <option>Machinery</option>
                    <option>Food & Beverage</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                    Save
                </button>
              </div>
            </div>
          </div>
          </main>
          </div>
      </div>
    </div>
  );
}
