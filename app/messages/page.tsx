'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  FileText,
  Trash2,
  Filter,
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  CheckCircle2,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Heart,
  Package,
  MapPin,
  Bookmark,
  Headphones,
} from 'lucide-react';
import { useStore } from '@/lib/store';

const mockMessages = [
  {
    id: '1',
    contactName: 'Jenny Li',
    company: 'Hisida (Xuzhou) Technology Co., Ltd',
    lastMessage: '[Message]',
    date: '2025-9-29',
    unread: 1,
    avatar: 'J',
  },
  {
    id: '2',
    contactName: 'Sally Lee',
    company: 'TechLight Industries',
    lastMessage: 'Thank you for your inquiry',
    date: '2025-9-6',
    unread: 1,
    avatar: 'S',
  },
  {
    id: '3',
    contactName: 'Grace Ma',
    company: 'Textile Hub Global',
    lastMessage: 'We can provide samples',
    date: '2025-9-5',
    unread: 1,
    avatar: 'G',
  },
  {
    id: '4',
    contactName: 'DE WAELE Sebast...',
    company: 'MachineWorks Ltd',
    lastMessage: 'Hello, I am interested in your products',
    date: '2025-8-20',
    unread: 0,
    avatar: 'D',
  },
  {
    id: '5',
    contactName: 'ivy wang',
    company: 'Agri Solutions Co',
    lastMessage: '[Message]',
    date: '2025-8-15',
    unread: 0,
    avatar: 'I',
  },
];

export default function MessagesPage() {
  const { user } = useStore();
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = mockMessages.filter((msg) => {
    if (selectedTab === 'unread' && msg.unread === 0) return false;
    if (searchQuery && !msg.contactName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !msg.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selectedMsg = mockMessages.find((m) => m.id === selectedMessage) || mockMessages[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-[#03C4CB]">Airavat</Link>
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
              <Link href="/supplier/register" className="text-gray-600 hover:text-[#03C4CB]">
                Start selling
              </Link>
              <Link href="/messages" className="text-[#03C4CB]">
                <MessageSquare size={20} />
              </Link>
              <Link href="/orders" className="text-gray-600 hover:text-[#03C4CB]">
                <FileText size={20} />
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-[#03C4CB] relative">
                <ShoppingBag size={20} />
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-[#03C4CB]">
                <Headphones size={20} />
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-[#03C4CB]">
                <div className="w-8 h-8 bg-[#03C4CB] rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.[0] || 'U'}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 py-6">
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar Navigation - Exact Alibaba.com */}
          <aside className="w-16 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Dashboard"
                >
                  <LayoutDashboard size={20} />
                </Link>
                <Link
                  href="/messages"
                  className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg"
                  title="Messages"
                >
                  <MessageSquare size={20} />
                </Link>
                <Link
                  href="/orders"
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Orders"
                >
                  <FileText size={20} />
                </Link>
                <Link
                  href="/payment"
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Payment"
                >
                  <CreditCard size={20} />
                </Link>
                <Link
                  href="/saved"
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Favorites"
                >
                  <Heart size={20} />
                </Link>
                <Link
                  href="/logistics"
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Logistics"
                >
                  <Package size={20} />
                </Link>
                <Link
                  href="/addresses"
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Addresses"
                >
                  <MapPin size={20} />
                </Link>
                <Link
                  href="/bookmarks"
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Bookmarks"
                >
                  <Bookmark size={20} />
                </Link>
              </nav>
            </div>
          </aside>

          {/* Chat List Panel */}
          <div className="w-96 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            {/* Search and Actions */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <Plus size={18} />
                </button>
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Q Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none text-sm"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <FileText size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedTab('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    selectedTab === 'all'
                      ? 'bg-[#03C4CB] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedTab('unread')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition relative ${
                    selectedTab === 'unread'
                      ? 'bg-[#03C4CB] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unread
                  {selectedTab !== 'unread' && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      6
                    </span>
                  )}
                </button>
                <div className="flex-1"></div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <Filter size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition text-left ${
                    selectedMessage === message.id ? 'bg-[#E6F9FA]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#03C4CB] to-[#04D4DD] rounded-full flex items-center justify-center text-white font-semibold">
                        {message.avatar}
                      </div>
                      {message.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {message.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{message.contactName}</h3>
                        <span className="text-xs text-gray-500 ml-2">{message.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-1">{message.company}</p>
                      <p className="text-sm text-gray-500 truncate">{message.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            {selectedMsg ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#03C4CB] to-[#04D4DD] rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedMsg.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedMsg.contactName}</h3>
                        <p className="text-xs text-gray-500">{selectedMsg.company}</p>
                      </div>
                      {selectedMsg.unread > 0 && (
                        <CheckCircle2 size={16} className="text-green-500" />
                      )}
                    </div>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Sample Messages */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs">
                      {selectedMsg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                        <p className="text-sm text-gray-900">Hello, I am interested in your products. Can you provide more details?</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">2025-9-29 10:30 AM</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="bg-[#03C4CB] text-white rounded-lg p-3 max-w-md">
                        <p className="text-sm">Sure! I can provide you with detailed specifications and pricing. What specific products are you looking for?</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-[#03C4CB] rounded-full flex items-center justify-center text-white text-xs">
                      {user?.name?.[0] || 'U'}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs">
                      {selectedMsg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                        <p className="text-sm text-gray-900">I need LED lights for industrial use. What&apos;s the minimum order quantity?</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">2025-9-29 11:15 AM</span>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none"
                    />
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                      <Smile size={20} />
                    </button>
                    <button className="bg-[#03C4CB] hover:bg-[#02A8B0] text-white px-6 py-2 rounded-lg transition flex items-center gap-2">
                      <Send size={18} />
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat and source on the go</h3>
                  <p className="text-gray-600 mb-6">Select a conversation to start messaging</p>
                  <button className="bg-white border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:border-gray-400 transition">
                    Download the mobile app
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Service Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-[#03C4CB] hover:bg-[#02A8B0] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition">
          <Headphones size={20} />
          Customer service
        </button>
      </div>
    </div>
  );
}
