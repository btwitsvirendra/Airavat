'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingCart,
  MessageSquare,
  FileText,
  Wallet,
  Truck,
  Receipt,
  Package,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  mode?: 'buy' | 'sell';
  onModeChange?: (mode: 'buy' | 'sell') => void;
}

export default function Sidebar({ mode = 'buy', onModeChange }: SidebarProps) {
  const pathname = usePathname();

  const buyerLinks = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/rfq', icon: FileText, label: 'RFQ' },
    { href: '/payments', icon: Wallet, label: 'Payments' },
    { href: '/transport', icon: Truck, label: 'Transport Service' },
  ];

  const sellerLinks = [
    { href: '/seller/dashboard', icon: Home, label: 'Home' },
    { href: '/seller/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/rfq', icon: FileText, label: 'RFQ' },
    { href: '/payments', icon: Wallet, label: 'Payments' },
    { href: '/transport', icon: Truck, label: 'Transport Service' },
    { href: '/seller/sales', icon: Receipt, label: 'Sales' },
    { href: '/seller/inventory', icon: Package, label: 'Inventory' },
    { href: '/seller/grow', icon: TrendingUp, label: 'Grow' },
  ];

  const links = mode === 'sell' ? sellerLinks : buyerLinks;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Mode Toggle */}
      {onModeChange && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => onModeChange('buy')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                mode === 'buy'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => onModeChange('sell')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                mode === 'sell'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sell
            </button>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-teal-50 text-teal border-l-4 border-teal'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-teal'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Note */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        <p>Powered by CamScanner</p>
      </div>
    </div>
  );
}
