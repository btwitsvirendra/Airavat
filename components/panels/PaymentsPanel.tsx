'use client';

import { CreditCard, Wallet, Receipt, ArrowRight, Link2 } from 'lucide-react';
import Link from 'next/link';

export default function PaymentsPanel() {
  const paymentMethods = [
    { id: '1', type: 'Credit Card', last4: '4242', expiry: '12/24', default: true },
    { id: '2', type: 'Debit Card', last4: '8888', expiry: '06/25', default: false },
  ];

  const recentTransactions = [
    { id: '1', description: 'Order #12345', amount: '$1,250.00', date: '2024-01-15', status: 'Completed' },
    { id: '2', description: 'Order #12344', amount: '$450.00', date: '2024-01-14', status: 'Pending' },
    { id: '3', description: 'Refund #12343', amount: '-$200.00', date: '2024-01-13', status: 'Completed' },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-[#9A79FF] to-[#8A69EF] rounded-lg p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Wallet Balance</p>
            <p className="text-3xl font-bold">$2,450.00</p>
          </div>
          <Wallet size={32} className="opacity-80" />
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Add Funds
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Withdraw
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          <Link
            href="/account/wallet"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#9A79FF] hover:bg-[rgba(154, 121, 255, 0.1)] transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Wallet size={24} className="text-[#9A79FF]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Wallet</p>
                <p className="text-xs text-gray-500">View and manage your wallet</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-400" />
          </Link>
          <Link
            href="/payment-links"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#9A79FF] hover:bg-[rgba(154, 121, 255, 0.1)] transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Link2 size={24} className="text-[#9A79FF]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Link</p>
                <p className="text-xs text-gray-500">Create and manage payment links</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-400" />
          </Link>
          <Link
            href="/account/transactions"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#9A79FF] hover:bg-[rgba(154, 121, 255, 0.1)] transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Receipt size={24} className="text-[#9A79FF]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Transactions</p>
                <p className="text-xs text-gray-500">View transaction history</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          <button className="text-sm text-[#9A79FF] hover:underline">Add New</button>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#9A79FF] transition"
            >
              <div className="flex items-center gap-3">
                <CreditCard size={24} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{method.type}</p>
                  <p className="text-xs text-gray-500">**** **** **** {method.last4}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.default && (
                  <span className="px-2 py-1 bg-[rgba(154, 121, 255, 0.1)] text-[#9A79FF] text-xs font-medium rounded">Default</span>
                )}
                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Link href="/account/transactions" className="text-sm text-[#9A79FF] hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Receipt size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${transaction.amount.startsWith('-') ? 'text-red-600' : 'text-gray-900'}`}>
                  {transaction.amount}
                </p>
                <p className="text-xs text-gray-500">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

