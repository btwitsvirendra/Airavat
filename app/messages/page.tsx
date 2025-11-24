'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  CreditCard,
  Heart,
  Package,
  MapPin,
  Bookmark,
  Headphones,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import ChatInterface from '@/components/ChatInterface';

export default function MessagesPage() {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-[#3373FF]">Airavat</Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/messages" className="text-[#3373FF]">Messages</Link>
              <Link href="/contacts" className="hover:text-gray-900">Contacts</Link>
              <Link href="/rfq" className="hover:text-gray-900">RFQs</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Headphones size={20} />
            </button>
            <div className="w-8 h-8 bg-[#3373FF] rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.[0] || 'U'}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-4 py-6 h-[calc(100vh-64px)]">
        <div className="flex gap-6 h-full">

          {/* Sidebar Navigation */}
          <aside className="w-16 flex-shrink-0 hidden md:block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex flex-col gap-2 h-full">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', href: '/account' },
                { icon: MessageSquare, label: 'Messages', href: '/messages', active: true },
                { icon: FileText, label: 'Orders', href: '/orders' },
                { icon: CreditCard, label: 'Wallet', href: '/payment' },
                { icon: Package, label: 'Logistics', href: '/logistics' },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg transition ${item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  title={item.label}
                >
                  <item.icon size={20} />
                </Link>
              ))}
            </div>
          </aside>

          {/* Chat Interface */}
          <div className="flex-1">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}
