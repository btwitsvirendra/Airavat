'use client';

import { useState } from 'react';
import {
  Search,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Info,
  Copy,
} from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import CreditCard from './CreditCard';

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    orderName: 'Order #12345',
    companyName: 'ABC Suppliers Ltd.',
    companyDetails: 'Supplier details here',
    paymentTerm: 'Net 30',
    amount: '$1,250.00',
    paymentMethod: 'Credit Card',
    dateTime: '15/01/2024, 10:30 AM',
    status: 'Completed',
    date: '15/01/2024',
  },
  {
    id: '2',
    orderName: 'Order #12344',
    companyName: 'XYZ Manufacturing',
    companyDetails: 'Manufacturer details',
    paymentTerm: 'Net 15',
    amount: '$450.00',
    paymentMethod: 'Bank Transfer',
    dateTime: '14/01/2024, 2:15 PM',
    status: 'Pending',
    date: '14/01/2024',
  },
  {
    id: '3',
    orderName: 'Order #12343',
    companyName: 'Global Trading Co.',
    companyDetails: 'Trading company info',
    paymentTerm: 'Net 30',
    amount: '$2,100.00',
    paymentMethod: 'PayPal',
    dateTime: '15/01/2024, 4:45 PM',
    status: 'Completed',
    date: '15/01/2024',
  },
  {
    id: '4',
    orderName: 'Refund #12342',
    companyName: 'ABC Suppliers Ltd.',
    companyDetails: 'Refund details',
    paymentTerm: 'N/A',
    amount: '-$200.00',
    paymentMethod: 'Credit Card',
    dateTime: '13/01/2024, 9:20 AM',
    status: 'Completed',
    date: '13/01/2024',
  },
];

export default function PaymentsView() {
  const [activeTab, setActiveTab] = useState<'all' | 'purchase' | 'refund'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [walletIndex, setWalletIndex] = useState(0);

  const wallets = [
    { id: '76312876324', balance: '10,000' },
    { id: '76312876325', balance: '5,000' },
    { id: '76312876326', balance: '15,000' },
  ];

  const creditCards = [
    {
      cardNumber: '9759 2484 5269 6576',
      cardholderName: 'BRUCE WAYNE',
      expiryMonth: '1 2',
      expiryYear: '2 4',
      cardType: 'MASTERCARD',
      cardColor: '#DC2626', // Red
    },
    {
      cardNumber: '4532 1234 5678 9010',
      cardholderName: 'JOHN DOE',
      expiryMonth: '0 6',
      expiryYear: '2 5',
      cardType: 'VISA',
      cardColor: '#000000', // Black
    },
    {
      cardNumber: '5500 0000 0000 0004',
      cardholderName: 'JANE SMITH',
      expiryMonth: '0 9',
      expiryYear: '2 6',
      cardType: 'MASTERCARD',
      cardColor: '#9333EA', // Purple
    },
  ];

  const currentCard = creditCards[walletIndex];

  const currentWallet = wallets[walletIndex];

  const nextWallet = () => {
    setWalletIndex((prev) => (prev + 1) % wallets.length);
  };

  const prevWallet = () => {
    setWalletIndex((prev) => (prev - 1 + wallets.length) % wallets.length);
  };

  // Filter transactions based on active tab, search query, and selected date
  const filteredTransactions = mockTransactions.filter((transaction) => {
    // Filter by tab
    if (activeTab === 'purchase' && transaction.orderName.startsWith('Refund')) return false;
    if (activeTab === 'refund' && !transaction.orderName.startsWith('Refund')) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !transaction.orderName.toLowerCase().includes(query) &&
        !transaction.companyName.toLowerCase().includes(query) &&
        !transaction.amount.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Filter by selected date
    if (selectedDate) {
      // Normalize date formats for comparison (both to dd/mm/yyyy)
      const normalizeDate = (dateStr: string) => {
        try {
          const date = new Date(dateStr);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        } catch {
          // If already in dd/mm/yyyy format, return as is
          return dateStr;
        }
      };
      
      const selectedDateFormatted = normalizeDate(selectedDate);
      const transactionDateFormatted = normalizeDate(transaction.date);
      
      if (selectedDateFormatted !== transactionDateFormatted) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Wallet Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Wallet Card */}
            <div className="relative">
              <div className="bg-white rounded-lg p-8 h-64 flex items-center justify-center relative overflow-hidden">
                {/* Carousel Arrows */}
                <button
                  onClick={prevWallet}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition z-10"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={nextWallet}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition z-10"
                >
                  <ChevronRight size={20} className="text-gray-700" />
                </button>

                {/* Credit Card */}
                <div className="w-full h-full flex items-center justify-center">
                  <CreditCard
                    cardNumber={currentCard.cardNumber}
                    cardholderName={currentCard.cardholderName}
                    expiryMonth={currentCard.expiryMonth}
                    expiryYear={currentCard.expiryYear}
                    cardType={currentCard.cardType}
                    cardColor={currentCard.cardColor}
                  />
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {creditCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setWalletIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === walletIndex ? 'bg-[#3373FF]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Wallet Details Panel */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Wallet Details</h2>
                <a href="#" className="flex items-center gap-2 text-[#3373FF] hover:text-[#265ACC] text-sm">
                  <Headphones size={16} />
                  Support
                </a>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">Wallet Balance :</p>
                  <p className="text-4xl font-bold text-gray-900">{currentWallet.balance}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentWallet.id);
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    title="Copy Wallet ID"
                  >
                    <Copy size={16} />
                  </button>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Wallet ID :</span> {currentWallet.id}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button className="flex-1 bg-[#3373FF] hover:bg-[#265ACC] text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2">
                    <Wallet size={18} />
                    Add Money
                  </button>
                  <button className="flex-1 bg-[#3373FF] hover:bg-[#265ACC] text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2">
                    <Wallet size={18} />
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Transaction Tabs */}
            <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-4 px-2 text-sm font-medium transition ${
                  activeTab === 'all'
                    ? 'text-[#3373FF] border-b-2 border-[#3373FF]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Transactions
              </button>
              <button
                onClick={() => setActiveTab('purchase')}
                className={`pb-4 px-2 text-sm font-medium transition ${
                  activeTab === 'purchase'
                    ? 'text-[#3373FF] border-b-2 border-[#3373FF]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Purchase
              </button>
              <button
                onClick={() => setActiveTab('refund')}
                className={`pb-4 px-2 text-sm font-medium transition ${
                  activeTab === 'refund'
                    ? 'text-[#3373FF] border-b-2 border-[#3373FF]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Refund
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by amount, supplier, Product"
                  className="w-full border border-black rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#3373FF] min-w-[200px]"
                />
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
              </div>
              <DateRangePicker
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="Select Time"
              />
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Order Name</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Company Name & Details</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Payment Term</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">
                      <div className="flex items-center gap-2 relative group">
                        Amount
                        <Info size={14} className="text-gray-400 cursor-help" />
                        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          <p className="text-xs text-gray-700">
                            This Column show the amount paid to the Organization (Tax included if any). These rates shall change according to the foreign country, Exchange rates, Tariffs etc.
                          </p>
                        </div>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Payment Method</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Date & Time stamp</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-900">{transaction.orderName}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          <div>{transaction.companyName}</div>
                          <div className="text-xs text-gray-500">{transaction.companyDetails}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{transaction.paymentTerm}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{transaction.amount}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{transaction.paymentMethod}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{transaction.dateTime}</td>
                        <td className="py-4 px-4 text-sm">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'Completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
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
  );
}

