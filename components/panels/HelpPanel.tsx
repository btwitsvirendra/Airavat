'use client';

import { Search, HelpCircle, BookOpen, MessageCircle, FileText, Video } from 'lucide-react';
import { useState } from 'react';

export default function HelpPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      icon: <BookOpen size={20} />,
      title: 'Getting Started',
      description: 'Learn the basics of using Airavat',
      count: 12,
    },
    {
      icon: <MessageCircle size={20} />,
      title: 'Messaging & Communication',
      description: 'How to communicate with suppliers',
      count: 8,
    },
    {
      icon: <FileText size={20} />,
      title: 'Orders & Payments',
      description: 'Manage your orders and payments',
      count: 15,
    },
    {
      icon: <Video size={20} />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      count: 6,
    },
  ];

  const popularArticles = [
    'How to place an order',
    'Payment methods explained',
    'Tracking your shipment',
    'Return and refund policy',
    'Contact supplier support',
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A79FF] focus:bg-white"
          />
        </div>
      </div>

      {/* Help Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Categories</h3>
        <div className="grid grid-cols-1 gap-3">
          {helpCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#9A79FF] hover:bg-[rgba(154, 121, 255, 0.1)] transition cursor-pointer"
            >
              <div className="text-[#9A79FF] mt-0.5">{category.icon}</div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{category.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                <p className="text-xs text-gray-500">{category.count} articles</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
        <div className="space-y-2">
          {popularArticles.map((article, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <HelpCircle size={16} className="text-gray-400" />
              <span className="text-sm text-gray-700">{article}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-[#9A79FF] to-[#8A69EF] rounded-lg p-6 text-white">
        <h3 className="font-semibold mb-2">Still need help?</h3>
        <p className="text-sm opacity-90 mb-4">Our support team is available 24/7 to assist you.</p>
        <button className="bg-white text-[#9A79FF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}

