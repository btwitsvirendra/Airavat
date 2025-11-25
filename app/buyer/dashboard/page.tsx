'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { PackageSearch, ShoppingCart, Heart, MessageSquare, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BuyerDashboard() {
  const router = useRouter();
  const { user, currentView } = useStore();

  useEffect(() => {
    // Redirect if not logged in or if in seller view
    if (!user) {
      router.push('/login');
      return;
    }
    if (currentView === 'seller') {
      router.push('/seller/dashboard');
      return;
    }
  }, [user, currentView, router]);

  if (!user || currentView === 'seller') {
    return null;
  }

  const stats = [
    { label: 'Active Orders', value: '12', icon: PackageSearch, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Cart Items', value: '5', icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Favorites', value: '28', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Messages', value: '8', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const quickActions = [
    { title: 'Post RFQ', description: 'Request quotations from suppliers', icon: FileText, href: '/account?view=rfq', color: 'bg-blue-500' },
    { title: 'Browse Products', description: 'Discover new suppliers', icon: PackageSearch, href: '/products', color: 'bg-green-500' },
    { title: 'My Orders', description: 'Track your orders', icon: TrendingUp, href: '/orders', color: 'bg-purple-500' },
    { title: 'Message Center', description: 'Chat with suppliers', icon: MessageSquare, href: '/account?view=messages', color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { type: 'order', title: 'Order #12345 confirmed', time: '2 hours ago', status: 'processing' },
    { type: 'message', title: 'New message from TechLight Industries', time: '5 hours ago', status: 'unread' },
    { type: 'quote', title: 'Quote received for LED Lights', time: '1 day ago', status: 'new' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Airavat</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name || user.full_name}</p>
            </div>
            {user.roles?.includes('seller') && (
              <Link
                href="/seller/dashboard"
                className="px-4 py-2 bg-[#3373FF] text-white rounded-lg hover:bg-[#265ACC] transition font-medium"
              >
                Switch to Selling
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition group"
                >
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="mt-1">
                      {activity.status === 'unread' || activity.status === 'new' ? (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      ) : (
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/account?view=activity"
                className="mt-4 block text-center text-sm text-[#3373FF] hover:underline font-medium"
              >
                View all activity
              </Link>
            </div>
          </div>
        </div>

        {/* Sourcing Tools Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sourcing Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/account?view=rfq"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#3373FF] hover:bg-blue-50 transition group"
            >
              <FileText className="w-8 h-8 text-[#3373FF] mb-2 group-hover:scale-110 transition" />
              <h3 className="font-semibold text-gray-900 mb-1">Post RFQ</h3>
              <p className="text-sm text-gray-600">Request quotations from multiple suppliers</p>
            </Link>
            <Link
              href="/products"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#3373FF] hover:bg-blue-50 transition group"
            >
              <PackageSearch className="w-8 h-8 text-[#3373FF] mb-2 group-hover:scale-110 transition" />
              <h3 className="font-semibold text-gray-900 mb-1">Browse Products</h3>
              <p className="text-sm text-gray-600">Discover products from verified suppliers</p>
            </Link>
            <Link
              href="/account?view=messages"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#3373FF] hover:bg-blue-50 transition group"
            >
              <MessageSquare className="w-8 h-8 text-[#3373FF] mb-2 group-hover:scale-110 transition" />
              <h3 className="font-semibold text-gray-900 mb-1">Message Suppliers</h3>
              <p className="text-sm text-gray-600">Chat directly with suppliers</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



