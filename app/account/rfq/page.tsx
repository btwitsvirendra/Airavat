'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Clock, CheckCircle2, XCircle, FileText, Eye, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock RFQ data
const mockRFQs = [
  {
    id: 'rfq-001',
    title: 'Custom LED Light Strips - 1000 units',
    category: 'Electronics',
    status: 'open',
    postedDate: '2024-01-15',
    responses: 5,
    budget: '$5,000 - $10,000',
    description: 'Need custom LED light strips with RGB capability, waterproof, 5 meters length each.',
  },
  {
    id: 'rfq-002',
    title: 'Organic Cotton Fabric - 5000 meters',
    category: 'Textiles',
    status: 'closed',
    postedDate: '2024-01-10',
    responses: 12,
    budget: '$15,000 - $20,000',
    description: 'Looking for organic cotton fabric suppliers for sustainable clothing line.',
  },
  {
    id: 'rfq-003',
    title: 'Industrial Packaging Materials',
    category: 'Packaging',
    status: 'open',
    postedDate: '2024-01-20',
    responses: 3,
    budget: '$8,000 - $12,000',
    description: 'Need eco-friendly packaging materials for food products.',
  },
];

export default function RFQManagerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');

  const filteredRFQs = mockRFQs.filter((rfq) => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rfq.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-[#FF6A00]">Airavat</Link>
              <span className="text-gray-600">My RFQs</span>
            </div>
            <Link href="/rfq" className="bg-[#FF6A00] hover:bg-[#E55A00] text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2">
              <Plus size={20} />
              Post an RFQ
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0 bg-white rounded-lg shadow-sm p-6 h-fit">
            <nav className="space-y-1">
              <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#FF6A00]">
                <FileText size={20} />
                <span>My Airavat</span>
              </Link>
              <Link href="/account/rfq" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#FFF4E6] text-[#FF6A00] font-medium">
                <FileText size={20} />
                <span>My RFQs</span>
              </Link>
              <Link href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#FF6A00]">
                <FileText size={20} />
                <span>Orders</span>
              </Link>
              <Link href="/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#FF6A00]">
                <FileText size={20} />
                <span>Messages</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My RFQs</h1>
              <p className="text-gray-600">Manage your Request for Quotations and view supplier responses</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search RFQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RFQ List */}
            <div className="space-y-4">
              {filteredRFQs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No RFQs found</h3>
                  <p className="text-gray-600 mb-6">Start by posting your first RFQ to get quotes from suppliers</p>
                  <Link href="/rfq" className="inline-flex items-center gap-2 bg-[#FF6A00] hover:bg-[#E55A00] text-white px-6 py-3 rounded-lg font-semibold transition">
                    <Plus size={20} />
                    Post an RFQ
                  </Link>
                </div>
              ) : (
                filteredRFQs.map((rfq) => (
                  <motion.div
                    key={rfq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{rfq.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            rfq.status === 'open'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {rfq.status === 'open' ? (
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                Open
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                Closed
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{rfq.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span><strong>Category:</strong> {rfq.category}</span>
                          <span><strong>Budget:</strong> {rfq.budget}</span>
                          <span><strong>Posted:</strong> {new Date(rfq.postedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare size={16} />
                        <span><strong>{rfq.responses}</strong> supplier responses</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/account/rfq/${rfq.id}`}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                        >
                          <Eye size={16} />
                          View Details
                        </Link>
                        {rfq.status === 'open' && (
                          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-2">
                            <XCircle size={16} />
                            Close RFQ
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


