'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Edit, HeadphonesIcon, Heart } from 'lucide-react';

export default function SellerDashboardPage() {
  const [mode, setMode] = useState<'buy' | 'sell'>('sell');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar mode={mode} onModeChange={setMode} />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-4xl text-gray-400">👤</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Member Id : SE8641784306743287
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Virendra singh
                      </h2>
                    </div>
                  </div>

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

                <div className="bg-gray-50 rounded-lg p-6 relative">
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
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
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
                    →
                  </button>
                  <div className="flex justify-center space-x-2 mt-4">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-teal rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                {/* Sales Overview */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Overview</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-blue-600">0</p>
                      <p className="text-sm text-gray-600 mt-1">Total Orders</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-green-600">₹0</p>
                      <p className="text-sm text-gray-600 mt-1">Revenue</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600">0</p>
                      <p className="text-sm text-gray-600 mt-1">Products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">History</h3>
                  <button className="text-sm text-teal hover:underline">View ▼</button>
                </div>
                <div className="text-center text-gray-400 py-8">
                  <p>No recent activity</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Favorite</h3>
                  <button className="text-sm text-teal hover:underline">View ▼</button>
                </div>
                <div className="text-center text-gray-400 py-8">
                  <p>No favorites yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
