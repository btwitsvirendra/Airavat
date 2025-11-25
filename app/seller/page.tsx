'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    AlertCircle,
    ArrowRight,
    Plus,
    MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {change}
            </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
);

export default function SellerDashboard() {
    const { user, currentView, toggleView } = useStore();
    
    const stats = [
        { title: 'Total Revenue', value: '₹12,45,000', change: '+12.5%', icon: TrendingUp, color: 'bg-blue-500' },
        { title: 'Active RFQs', value: '18', change: '+4', icon: Users, color: 'bg-purple-500' },
        { title: 'Pending Orders', value: '7', change: '-2', icon: ShoppingBag, color: 'bg-orange-500' },
        { title: 'Low Stock Items', value: '3', change: '0', icon: AlertCircle, color: 'bg-red-500' },
    ];

    const recentRFQs = [
        { id: 'RFQ-2024-001', product: 'Industrial LED Light 100W', buyer: 'TechCorp Industries', quantity: 500, status: 'New', date: '2 mins ago' },
        { id: 'RFQ-2024-002', product: 'Heavy Duty Copper Wire', buyer: 'BuildWell Constructions', quantity: 2000, status: 'Negotiating', date: '1 hour ago' },
        { id: 'RFQ-2024-003', product: 'Safety Helmets (Yellow)', buyer: 'Safety First Ltd', quantity: 150, status: 'Pending', date: '3 hours ago' },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name || user?.full_name || 'Seller'}, here&apos;s what&apos;s happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    {user?.roles?.includes('buyer') && (
                        <Link
                            href="/buyer/dashboard"
                            onClick={() => toggleView()}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                        >
                            Switch to Buying
                        </Link>
                    )}
                    <button className="bg-[#3373FF] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-blue-600 transition">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent RFQs */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-bold text-gray-900">Recent RFQs</h2>
                        <Link href="/seller/rfq" className="text-[#3373FF] text-sm font-medium hover:underline flex items-center">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentRFQs.map((rfq, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50 transition flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                                        {rfq.buyer.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{rfq.product}</p>
                                        <p className="text-xs text-gray-500">{rfq.buyer} • {rfq.quantity} units</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${rfq.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                        rfq.status === 'Negotiating' ? 'bg-orange-100 text-orange-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {rfq.status}
                                    </span>
                                    <p className="text-xs text-gray-400">{rfq.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Notifications */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-bold text-gray-900 mb-4">Action Required</h2>
                    <div className="space-y-4">
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-red-800">Low Stock Alert</p>
                                    <p className="text-xs text-red-600 mt-1">Product &quot;Safety Gloves&quot; is below threshold (15 units).</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex gap-3">
                                <MessageSquare className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800">New Message</p>
                                    <p className="text-xs text-blue-600 mt-1">Buyer &quot;Global Traders&quot; asked about bulk pricing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

                                <MessageSquare className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800">New Message</p>
                                    <p className="text-xs text-blue-600 mt-1">Buyer &quot;Global Traders&quot; asked about bulk pricing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
