'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Plus, MinusCircle, HeadphonesIcon, Search, Calendar, Info } from 'lucide-react';

export default function PaymentsPage() {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [activeTab, setActiveTab] = useState<'all' | 'purchase' | 'refund' | 'generate'>('all');

  const walletBalance = 10000;
  const walletId = '7613896134';

  const transactions = [
    // Sample transactions would go here
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar mode={mode} onModeChange={setMode} />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Wallet Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Wallet Card */}
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:shadow-md">
                ←
              </button>

              <div className="mx-8">
                <div className="bg-gradient-to-br from-teal to-teal-600 rounded-3xl p-8 text-white shadow-xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                      <span className="text-4xl">💳</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:shadow-md">
                →
              </button>

              {/* Indicator dots */}
              <div className="flex justify-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-teal rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Wallet Balance : ₹{walletBalance.toLocaleString()}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center space-x-2">
                    <span>💳</span>
                    <span>Wallet ID : {walletId}</span>
                  </p>
                </div>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-teal">
                  <HeadphonesIcon className="w-5 h-5" />
                  <span className="font-medium">Support</span>
                </button>
              </div>

              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-teal text-white rounded-lg hover:bg-teal-600 transition-colors">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Add Money</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 border-2 border-teal text-teal rounded-lg hover:bg-teal-50 transition-colors">
                  <MinusCircle className="w-5 h-5" />
                  <span className="font-medium">Withdraw</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                    activeTab === 'all'
                      ? 'border-teal text-teal'
                      : 'border-transparent text-gray-600 hover:text-teal'
                  }`}
                >
                  All Transactions
                </button>
                <button
                  onClick={() => setActiveTab('purchase')}
                  className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                    activeTab === 'purchase'
                      ? 'border-teal text-teal'
                      : 'border-transparent text-gray-600 hover:text-teal'
                  }`}
                >
                  Purchase
                </button>
                <button
                  onClick={() => setActiveTab('refund')}
                  className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                    activeTab === 'refund'
                      ? 'border-teal text-teal'
                      : 'border-transparent text-gray-600 hover:text-teal'
                  }`}
                >
                  Refund
                </button>
                {mode === 'sell' && (
                  <button
                    onClick={() => setActiveTab('generate')}
                    className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                      activeTab === 'generate'
                        ? 'border-teal text-teal'
                        : 'border-transparent text-gray-600 hover:text-teal'
                    }`}
                  >
                    Generate Payment Link
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px] relative">
                  <input
                    type="text"
                    placeholder="Search by amount, supplier, Product"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <div className="relative">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-teal transition-colors bg-white">
                    <Calendar size={18} className="text-gray-600" />
                    <span className="text-gray-700">Select Time</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Order Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Company Name & Details
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Payment Term
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 flex items-center space-x-1">
                        <span>Amount</span>
                        <Info size={14} className="text-gray-400" />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Payment Method
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Date & Time stamp
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center">
                          <div className="text-gray-400">
                            <div className="text-4xl mb-4">💸</div>
                            <p className="text-lg font-medium text-gray-500">No transactions yet</p>
                            <p className="text-sm text-gray-400 mt-2">
                              This Column shows the amount paid to the <br />
                              Airavatvat (The Default is 5%). These stats <br />
                              may vary as per the foreign country, <br />
                              Exchange rates, Tariffs etc
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction: any, index: number) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{transaction.orderName}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{transaction.company}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{transaction.paymentTerm}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">₹{transaction.amount}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{transaction.method}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{transaction.timestamp}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
