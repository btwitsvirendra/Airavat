'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Search, ChevronDown, RefreshCw } from 'lucide-react';

export default function InventoryPage() {
  const [mode, setMode] = useState<'buy' | 'sell'>('sell');

  const stats = [
    { label: 'Products', count: 3, icon: '📦', color: 'bg-blue-100 text-blue-600' },
    { label: 'Products', count: 1, icon: '✅', color: 'bg-green-100 text-green-600' },
    { label: 'Draft', count: 1, icon: '🕐', color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Out of Stock', count: 1, icon: '❗', color: 'bg-red-100 text-red-600' },
  ];

  const products = [
    {
      id: 1,
      name: 'Name',
      price: 150,
      stock: 500,
      lastUpdated: '1/11/2025',
      stockUpdate: 'Stock updated from 200 to 300'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar mode={mode} onModeChange={setMode} />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-700">Category</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Construction</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-700">State : Delhi</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-700">Product : All</span>
              </div>

              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-lg ${stat.color} flex items-center justify-center text-3xl`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-teal text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      <input type="checkbox" className="rounded border-white/30" />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Action
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      <button className="flex items-center space-x-2 ml-auto px-4 py-2 bg-white text-teal rounded-lg hover:bg-gray-50 transition-colors">
                        <RefreshCw size={16} />
                        <span>Update</span>
                        <ChevronDown size={16} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📦</span>
                          </div>
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">₹{product.price} per Piece</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{product.stock}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="bg-teal-50 border border-teal rounded-lg p-3 max-w-xs">
                          <p className="text-xs text-gray-700">
                            Last updated-{product.lastUpdated} :
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {product.stockUpdate}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-teal hover:text-teal-700 font-medium text-sm">
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing 1 to {products.length} of {products.length} entries
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-teal text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
