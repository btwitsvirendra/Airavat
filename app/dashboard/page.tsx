'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Edit, HeadphonesIcon, Heart } from 'lucide-react';

export default function DashboardPage() {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');

  const historyItems = [
    { id: 1, name: 'Item name', price: 839, moq: 2, image: '' },
    { id: 2, name: 'Item name', price: 839, moq: 2, image: '' },
  ];

  const favoriteItems = [
    { id: 1, name: 'Item name', price: 839, moq: 2, badges: ['Best Price', 'Best Buy'], image: '' },
    { id: 2, name: 'Item name', price: 839, moq: 2, badges: ['Best Price', 'Best Buy'], image: '' },
    { id: 3, name: 'Item name', price: 839, moq: 2, badges: [], image: '' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar mode={mode} onModeChange={setMode} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    {/* Profile Picture */}
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-4xl text-gray-400">👤</span>
                    </div>

                    {/* Profile Info */}
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Member Id : SE8641784306743287
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Virendra singh
                      </h2>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-teal transition-colors">
                      <HeadphonesIcon className="w-5 h-5" />
                      <span className="font-medium">Support</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-teal hover:text-teal transition-colors">
                      <Edit className="w-4 h-4" />
                      <span className="font-medium">Edit</span>
                    </button>
                  </div>
                </div>

                {/* Info Cards Carousel */}
                <div className="bg-gray-50 rounded-lg p-6 relative">
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:shadow-md transition-shadow">
                    ←
                  </button>

                  <div className="text-center py-4">
                    <p className="text-gray-700 font-medium">Get Additional Tax benefits right now</p>
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <button className="text-teal hover:underline font-medium">Learn More</button>
                      <button className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                        Complete Profile
                      </button>
                    </div>
                  </div>

                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:shadow-md transition-shadow">
                    →
                  </button>

                  {/* Dots indicator */}
                  <div className="flex justify-center space-x-2 mt-4">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-teal rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                {/* Order Tracking Section */}
                <div className="mt-8">
                  <div className="flex space-x-4 border-b border-gray-200 mb-6">
                    <button className="px-4 py-2 text-teal border-b-2 border-teal font-semibold">
                      Orders
                    </button>
                    <button className="px-4 py-2 text-gray-600 hover:text-teal transition-colors">
                      Track Order
                    </button>
                    <button className="px-4 py-2 text-gray-600 hover:text-teal transition-colors">
                      Refund and Dispute
                    </button>
                  </div>

                  {/* Orders Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">MOQ</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Delivery Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                            No orders yet
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - History & Favorites */}
            <div className="space-y-6">
              {/* History */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">History</h3>
                  <button className="text-sm text-teal hover:underline">View ▼</button>
                </div>

                <div className="space-y-4">
                  {historyItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📦</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                            <p className="text-sm text-gray-600">Price : ₹{item.price}</p>
                            <p className="text-sm text-gray-600">MOQ : {item.moq}</p>
                          </div>
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorite */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Favorite</h3>
                  <button className="text-sm text-teal hover:underline">View ▼</button>
                </div>

                <div className="space-y-4">
                  {favoriteItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📦</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                            <p className="text-sm text-gray-600">Price : ₹{item.price}</p>
                            <p className="text-sm text-gray-600">MOQ : {item.moq}</p>
                            {item.badges.length > 0 && (
                              <div className="flex space-x-1 mt-1">
                                {item.badges.map((badge, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-teal text-white px-2 py-0.5 rounded-full"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </div>
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
  );
}
