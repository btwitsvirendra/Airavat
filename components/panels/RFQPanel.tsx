'use client';

import { Plus, Search, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function RFQPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  const rfqs = [
    {
      id: '1',
      title: 'Industrial LED Lights - 100W',
      category: 'Electronics',
      status: 'active',
      responses: 5,
      created: '2024-01-15',
      deadline: '2024-01-25',
    },
    {
      id: '2',
      title: 'Organic Cotton Fabric',
      category: 'Textiles',
      status: 'closed',
      responses: 12,
      created: '2024-01-10',
      deadline: '2024-01-20',
    },
    {
      id: '3',
      title: 'Stainless Steel Pipes',
      category: 'Industrial',
      status: 'draft',
      responses: 0,
      created: '2024-01-18',
      deadline: '2024-02-01',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock size={16} className="text-blue-500" />;
      case 'closed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'draft':
        return <XCircle size={16} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">My RFQs</h3>
          <Link
            href="/account/rfq"
            className="flex items-center gap-2 bg-[#FF6A00] hover:bg-[#E55A00] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus size={16} />
            New RFQ
          </Link>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search RFQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:bg-white"
          />
        </div>
      </div>

      {/* RFQs List */}
      <div className="flex-1 overflow-y-auto p-4">
        {rfqs.map((rfq) => (
          <div
            key={rfq.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-[#FF6A00] hover:bg-[#FFF4E6] transition mb-3 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{rfq.title}</h4>
                <p className="text-xs text-gray-500">{rfq.category}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(rfq.status)}
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(rfq.status)}`}>
                  {rfq.status}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FileText size={12} />
                  {rfq.responses} responses
                </span>
                <span>Created: {rfq.created}</span>
              </div>
              <span>Deadline: {rfq.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rfqs.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No RFQs yet</p>
            <Link
              href="/account/rfq"
              className="inline-flex items-center gap-2 bg-[#FF6A00] hover:bg-[#E55A00] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <Plus size={16} />
              Create Your First RFQ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

