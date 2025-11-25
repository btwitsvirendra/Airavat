'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    MoreVertical,
    ChevronDown,
    AlertCircle,
    CheckCircle2,
    Clock
} from 'lucide-react';

export default function OrderManager() {
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    // Mock Data
    const orders = [
        { id: 'ORD-7829', buyer: 'TechCorp Industries', date: 'Oct 24, 2024', total: '₹45,000', payment: 'Paid', status: 'Processing', sla: 'Ship in 24h' },
        { id: 'ORD-7830', buyer: 'Global Traders', date: 'Oct 24, 2024', total: '₹1,20,000', payment: 'Credit (Khata)', status: 'Unfulfilled', sla: 'Ship Today' },
        { id: 'ORD-7831', buyer: 'BuildWell Constructions', date: 'Oct 23, 2024', total: '₹8,500', payment: 'Paid', status: 'Shipped', sla: 'On Time' },
        { id: 'ORD-7832', buyer: 'Safety First Ltd', date: 'Oct 23, 2024', total: '₹12,400', payment: 'Pending', status: 'Unfulfilled', sla: 'Overdue' },
        { id: 'ORD-7833', buyer: 'ElectroFix', date: 'Oct 22, 2024', total: '₹2,50,000', payment: 'Credit (Khata)', status: 'Delivered', sla: 'Completed' },
        { id: 'ORD-7834', buyer: 'City Builders', date: 'Oct 21, 2024', total: '₹65,000', payment: 'Paid', status: 'Processing', sla: 'Ship in 48h' },
    ];

    const toggleSelectAll = () => {
        if (selectedOrders.length === orders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.map(o => o.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedOrders.includes(id)) {
            setSelectedOrders(selectedOrders.filter(oid => oid !== id));
        } else {
            setSelectedOrders([...selectedOrders, id]);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-500 text-sm">Track and fulfill your incoming orders.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                    <button className="px-4 py-2 bg-[#3373FF] text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                        Create Order
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-wrap gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Buyer, or Product..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center text-gray-600">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </button>
                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center text-gray-600">
                        Status: All <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="p-4 w-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={selectedOrders.length === orders.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Buyer</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Payment</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">SLA</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => toggleSelect(order.id)}
                                        />
                                    </td>
                                    <td className="p-4 font-medium text-gray-900 text-sm">
                                        {order.id}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {order.buyer}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {order.date}
                                    </td>
                                    <td className="p-4 font-medium text-gray-900 text-sm">
                                        {order.total}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' :
                                                order.payment.includes('Credit') ? 'bg-purple-100 text-purple-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-gray-100 text-gray-800' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className={`flex items-center text-xs font-medium ${order.sla === 'Overdue' ? 'text-red-600' :
                                                order.sla === 'Ship Today' ? 'text-orange-500' :
                                                    'text-gray-500'
                                            }`}>
                                            {order.sla === 'Overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                                            {order.sla === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />}
                                            {order.sla !== 'Overdue' && order.sla !== 'Completed' && <Clock className="w-3 h-3 mr-1" />}
                                            {order.sla}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">24</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    1
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    3
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
