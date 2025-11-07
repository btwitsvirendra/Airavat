'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  ArrowLeft,
  Wallet,
  Plus,
  Minus,
  Search,
  Calendar,
  Download,
  CreditCard,
  TrendingUp,
  TrendingDown,
  HeadphonesIcon,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function WalletPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    userRole,
    walletBalance,
    walletId,
    transactions,
    addMoney,
    withdraw,
  } = useStore();

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleAddMoney = () => {
    const value = parseFloat(amount);
    if (value > 0) {
      addMoney(value);
      toast.success(`₹${value} added to wallet`);
      setAmount('');
      setShowAddMoney(false);
    }
  };

  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (value > 0 && value <= walletBalance) {
      withdraw(value);
      toast.success(`₹${value} withdrawn from wallet`);
      setAmount('');
      setShowWithdraw(false);
    } else {
      toast.error('Insufficient balance or invalid amount');
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    if (selectedTab === 'purchase') return txn.type === 'debit';
    if (selectedTab === 'refund') return txn.description.toLowerCase().includes('refund');
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-teal mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Account</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Balance Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-8">
                {/* Wallet Visual */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    {/* Wallet Card */}
                    <div className="bg-gradient-to-br from-teal to-regal-blue rounded-2xl p-6 text-white shadow-lg">
                      <div className="flex items-center justify-between mb-8">
                        <div className="bg-white/20 p-2 rounded-lg">
                          <Wallet size={24} />
                        </div>
                        <button className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                          <HeadphonesIcon size={20} />
                        </button>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-white/80 mb-1">Total Balance</p>
                        <p className="text-4xl font-bold">₹{walletBalance.toLocaleString()}</p>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/60">Wallet ID</p>
                          <p className="text-sm font-mono">{walletId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 ml-8">
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl border border-teal/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">Wallet Balance:</h3>
                      <HeadphonesIcon className="text-gray-600 cursor-pointer" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mb-6">
                      ₹{walletBalance.toLocaleString()}
                    </p>
                    <div className="text-xs text-gray-600 mb-4">
                      <CreditCard size={14} className="inline mr-1" />
                      Wallet ID: {walletId}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowAddMoney(true)}
                        className="flex-1 bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Plus size={16} />
                        Add Money
                      </button>
                      <button
                        onClick={() => setShowWithdraw(true)}
                        className="flex-1 bg-white text-teal border border-teal px-4 py-2 rounded-lg hover:bg-teal-50 transition flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Minus size={16} />
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Transaction History</h2>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b">
                <button
                  onClick={() => setSelectedTab('all')}
                  className={`px-4 py-2 font-medium ${
                    selectedTab === 'all'
                      ? 'border-b-2 border-teal text-teal'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  All Transactions
                </button>
                <button
                  onClick={() => setSelectedTab('purchase')}
                  className={`px-4 py-2 font-medium ${
                    selectedTab === 'purchase'
                      ? 'border-b-2 border-teal text-teal'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Purchase
                </button>
                <button
                  onClick={() => setSelectedTab('refund')}
                  className={`px-4 py-2 font-medium ${
                    selectedTab === 'refund'
                      ? 'border-b-2 border-teal text-teal'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Refund
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by amount, supplier, Product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Calendar size={20} />
                  Select Time
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Order Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Company Name & Details
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Payment Term
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 relative group">
                        Amount
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 -top-8 left-0 whitespace-nowrap">
                          This Column shows the amount paid to the Manufacturer (The Default of 7 days ). These rules are set by the foreign money Exchange rates, Tariffs etc.
                        </div>
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
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                          No transactions yet
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((txn) => (
                        <tr key={txn.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-800">
                            {txn.orderName || '-'}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-800">
                            {txn.companyName || '-'}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">-</td>
                          <td className="px-4 py-4 text-sm font-semibold">
                            <span className={txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                              {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {txn.paymentMethod || '-'}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {new Date(txn.timestamp).toLocaleString()}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                txn.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : txn.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {txn.status}
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

          {/* Sidebar - Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-600" size={20} />
                    <span className="text-sm text-gray-600">Total Credits</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    ₹
                    {transactions
                      .filter((t) => t.type === 'credit')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="text-red-600" size={20} />
                    <span className="text-sm text-gray-600">Total Debits</span>
                  </div>
                  <span className="font-semibold text-red-600">
                    ₹
                    {transactions
                      .filter((t) => t.type === 'debit')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Current Balance</span>
                    <span className="text-xl font-bold text-teal">
                      ₹{walletBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add Money to Wallet</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddMoney}
                className="flex-1 bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition font-medium"
              >
                Add Money
              </button>
              <button
                onClick={() => {
                  setShowAddMoney(false);
                  setAmount('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Withdraw from Wallet</h3>
            <p className="text-sm text-gray-600 mb-4">
              Available Balance: ₹{walletBalance.toLocaleString()}
            </p>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <div className="flex gap-3">
              <button
                onClick={handleWithdraw}
                className="flex-1 bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition font-medium"
              >
                Withdraw
              </button>
              <button
                onClick={() => {
                  setShowWithdraw(false);
                  setAmount('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
