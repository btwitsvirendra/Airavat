'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  Home,
  ShoppingCart,
  MessageSquare,
  FileText,
  Wallet,
  Truck,
  BarChart3,
  Package,
  TrendingUp,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, userRole, switchRole, logout } = useStore();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const buyerMenuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'rfq', label: 'RFQ', icon: FileText },
    { id: 'payments', label: 'Payments', icon: Wallet },
    { id: 'transport', label: 'Transport Service', icon: Truck },
  ];

  const sellerMenuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'rfq', label: 'RFQ', icon: FileText },
    { id: 'payments', label: 'Payments', icon: Wallet },
    { id: 'transport', label: 'Transport Service', icon: Truck },
    { id: 'sales', label: 'Sales', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'grow', label: 'Grow', icon: TrendingUp },
  ];

  const menuItems = userRole === 'buyer' ? buyerMenuItems : sellerMenuItems;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleRoleSwitch = () => {
    switchRole();
    toast.success(`Switched to ${userRole === 'buyer' ? 'Seller' : 'Buyer'} mode`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* Role Toggle */}
              <div className="p-4 bg-gradient-to-br from-regal-blue to-teal border-b">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-medium">Mode</span>
                  <button
                    onClick={handleRoleSwitch}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
                    style={{
                      backgroundColor: userRole === 'seller' ? '#03C4CB' : '#424242',
                    }}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userRole === 'seller' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-white">
                  <span className={userRole === 'buyer' ? 'font-bold' : 'opacity-70'}>
                    Buy
                  </span>
                  <span className={userRole === 'seller' ? 'font-bold' : 'opacity-70'}>
                    Sell
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
                        isActive
                          ? 'bg-teal text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-6">
                  {/* Avatar */}
                  <div className="w-24 h-24 bg-gradient-to-br from-teal to-regal-blue rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user.name.charAt(0)}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                      {user.name}
                    </h1>
                    <p className="text-gray-600 text-sm mb-2">
                      Member Id: SE8641784306743287
                    </p>

                    {/* Promotional Banner */}
                    <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-teal-50 px-4 py-3 rounded-lg border border-teal/20">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Get Additional Tax benefits right now
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-teal text-sm font-medium hover:underline">
                          Learn More
                        </button>
                        <button className="text-teal text-sm font-medium hover:underline">
                          Complete Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support & Edit */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-teal transition">
                    <MessageSquare size={20} />
                    <span className="text-sm">Support</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                    Edit
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Column */}
              <div className="lg:col-span-2">
                {activeTab === 'home' && (
                  <div className="space-y-6">
                    {/* Orders Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-teal/10 p-2 rounded-lg">
                            <ShoppingCart className="text-teal" size={24} />
                          </div>
                          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                        </div>
                        <Link
                          href="#"
                          onClick={() => setActiveTab('orders')}
                          className="text-teal hover:text-teal-600 font-medium text-sm"
                        >
                          View All
                        </Link>
                      </div>

                      {/* Tabs */}
                      <div className="flex gap-4 mb-6 border-b">
                        <button className="px-4 py-2 border-b-2 border-teal text-teal font-medium">
                          Orders
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                          Track Order
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                          Refund and Dispute
                        </button>
                      </div>

                      {/* Orders Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Product
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Name
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                MOQ
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Amount
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Delivery Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                                No orders yet
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'messages' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Messages</h2>
                    <Link
                      href="/messages"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <MessageSquare size={20} />
                      Open Messages
                    </Link>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Payments & Wallet</h2>
                    <Link
                      href="/account/wallet"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <Wallet size={20} />
                      Manage Wallet
                    </Link>
                  </div>
                )}

                {activeTab === 'rfq' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">RFQ Management</h2>
                    <Link
                      href="/account/rfq"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <FileText size={20} />
                      Manage RFQs
                    </Link>
                  </div>
                )}

                {activeTab === 'transport' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Transport & Logistics</h2>
                    <Link
                      href="/account/logistics"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <Truck size={20} />
                      Book Logistics
                    </Link>
                  </div>
                )}

                {activeTab === 'inventory' && userRole === 'seller' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Inventory Management</h2>
                    <Link
                      href="/account/inventory"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <Package size={20} />
                      Manage Inventory
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar Column */}
              <div className="space-y-6">
                {/* History */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">History</h3>
                    <Link href="#" className="text-teal text-sm hover:underline">
                      View
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-3 pb-3 border-b last:border-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-sm font-medium text-gray-800">Item name</p>
                            <Heart className="text-red-500 fill-current" size={16} />
                          </div>
                          <p className="text-sm text-gray-600">Price: ₹839</p>
                          <p className="text-xs text-gray-500">MOQ: 2</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Favorite */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Favorite</h3>
                    <Link href="#" className="text-teal text-sm hover:underline">
                      View
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3 pb-3 border-b last:border-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-sm font-medium text-gray-800">Item name</p>
                            <Heart className="text-red-500 fill-current" size={16} />
                          </div>
                          <p className="text-sm text-gray-600">Price: ₹839</p>
                          <p className="text-xs text-gray-500">MOQ: 2</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
