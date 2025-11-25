'use client';

import { useState } from 'react';
import { MoreHorizontal, Clock, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';

interface RFQCardProps {
    id: string;
    product: string;
    buyer: string;
    quantity: number;
    date: string;
    status: 'new' | 'draft' | 'sent' | 'negotiating' | 'approved';
}

const RFQCard = ({ rfq }: { rfq: RFQCardProps }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-3 hover:shadow-md transition cursor-pointer group">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-mono text-gray-500">{rfq.id}</span>
            <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition">
                <MoreHorizontal className="w-4 h-4" />
            </button>
        </div>
        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{rfq.product}</h4>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
            <span>{rfq.buyer}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{rfq.quantity} units</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {rfq.date}
            </div>
            {rfq.status === 'negotiating' && (
                <div className="flex items-center text-xs text-orange-500 font-medium">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Action Needed
                </div>
            )}
        </div>
    </div>
);

const KanbanColumn = ({ title, count, status, children }: any) => (
    <div className="flex-1 min-w-[280px] bg-gray-50 rounded-xl p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-semibold text-gray-700 text-sm flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${status === 'new' ? 'bg-blue-500' :
                        status === 'draft' ? 'bg-yellow-500' :
                            status === 'sent' ? 'bg-purple-500' :
                                status === 'negotiating' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                {title}
            </h3>
            <span className="bg-white px-2 py-0.5 rounded-full text-xs text-gray-500 border border-gray-200">{count}</span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            {children}
        </div>
    </div>
);

export default function RFQManager() {
    // Mock Data
    const rfqs: RFQCardProps[] = [
        { id: 'RFQ-001', product: 'Industrial LED Light 100W', buyer: 'TechCorp', quantity: 500, date: '2h ago', status: 'new' },
        { id: 'RFQ-004', product: 'Safety Helmets (Yellow)', buyer: 'BuildSafe', quantity: 150, date: '4h ago', status: 'new' },
        { id: 'RFQ-002', product: 'Copper Wire 5mm', buyer: 'ElectroFix', quantity: 2000, date: '1d ago', status: 'draft' },
        { id: 'RFQ-003', product: 'PVC Pipes 2 inch', buyer: 'PlumbRight', quantity: 1000, date: '2d ago', status: 'sent' },
        { id: 'RFQ-005', product: 'Steel Rods 10mm', buyer: 'InfraStructure Ltd', quantity: 5000, date: '1d ago', status: 'negotiating' },
        { id: 'RFQ-006', product: 'Cement Bags 50kg', buyer: 'City Builders', quantity: 200, date: '3d ago', status: 'approved' },
    ];

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">RFQ Manager</h1>
                    <p className="text-gray-500 text-sm">Manage and negotiate quotes with buyers.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-[#9A79FF] text-white rounded-lg text-sm font-medium hover:bg-opacity-90">
                        Create Quote
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-4 h-full min-w-max">
                    <KanbanColumn title="New Inquiries" count={2} status="new">
                        {rfqs.filter(r => r.status === 'new').map(r => <RFQCard key={r.id} rfq={r} />)}
                    </KanbanColumn>

                    <KanbanColumn title="Drafting" count={1} status="draft">
                        {rfqs.filter(r => r.status === 'draft').map(r => <RFQCard key={r.id} rfq={r} />)}
                    </KanbanColumn>

                    <KanbanColumn title="Sent to Buyer" count={1} status="sent">
                        {rfqs.filter(r => r.status === 'sent').map(r => <RFQCard key={r.id} rfq={r} />)}
                    </KanbanColumn>

                    <KanbanColumn title="Negotiation" count={1} status="negotiating">
                        {rfqs.filter(r => r.status === 'negotiating').map(r => <RFQCard key={r.id} rfq={r} />)}
                    </KanbanColumn>

                    <KanbanColumn title="Approved" count={1} status="approved">
                        {rfqs.filter(r => r.status === 'approved').map(r => <RFQCard key={r.id} rfq={r} />)}
                    </KanbanColumn>
                </div>
            </div>
        </div>
    );
}
