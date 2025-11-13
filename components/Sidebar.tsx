'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingCart,
  MessageSquare,
  FileText,
  IndianRupee,
  Truck,
  BarChart3,
  Box,
  TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  mode?: 'buyer' | 'seller';
}

export default function Sidebar({ mode = 'buyer' }: SidebarProps) {
  const [isBuyMode, setIsBuyMode] = useState(mode === 'buyer');
  const pathname = usePathname();

  const buyerMenuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: FileText, label: 'RFQ', href: '/rfq' },
    { icon: IndianRupee, label: 'Payments', href: '/payment-links' },
    { icon: Truck, label: 'Transport Service', href: '/logistics' },
  ];

  const sellerMenuItems = [
    { icon: Home, label: 'Home', href: '/supplier/dashboard' },
    { icon: ShoppingCart, label: 'Orders', href: '/supplier/dashboard' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: FileText, label: 'RFQ', href: '/rfq' },
    { icon: IndianRupee, label: 'Payments', href: '/payment-links' },
    { icon: Truck, label: 'Transport Service', href: '/logistics' },
    { icon: BarChart3, label: 'Sales', href: '/supplier/dashboard' },
    { icon: Box, label: 'Inventory', href: '/supplier/dashboard' },
    { icon: TrendingUp, label: 'Grow', href: '/supplier/dashboard' },
  ];

  const menuItems = isBuyMode ? buyerMenuItems : sellerMenuItems;

  return (
    <aside className="w-64 bg-white rounded-lg shadow-sm p-4 h-fit sticky top-24">
      {/* Toggle Switch */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setIsBuyMode(true)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
              isBuyMode
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setIsBuyMode(false)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
              !isBuyMode
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-teal-50 text-teal-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

