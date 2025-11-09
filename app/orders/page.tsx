'use client';

import { useMemo, useState } from 'react';
import { BadgeCheck, Package, Truck } from 'lucide-react';

const orders = [
  {
    id: 'ORD-2024-001',
    supplier: 'TechLight Industries',
    amount: 125000,
    status: 'processing',
    nextStep: 'Awaiting inspection',
    eta: '15 Nov 2024',
  },
  {
    id: 'ORD-2024-002',
    supplier: 'Textile Hub',
    amount: 275000,
    status: 'shipped',
    nextStep: 'In transit to Bengaluru',
    eta: '11 Nov 2024',
  },
  {
    id: 'ORD-2024-003',
    supplier: 'Organic Farms Co',
    amount: 45000,
    status: 'delivered',
    nextStep: 'Payment released',
    eta: 'Delivered 2 Nov 2024',
  },
];

const statusLabels: Record<string, string> = {
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-regal-blue-900">My Orders</h1>
            <p className="text-gray-600">Track RFQ conversions, shipments, and assurance milestones in real time.</p>
          </div>
          <div className="flex gap-2">
            {(['all', 'processing', 'shipped', 'delivered'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === filter ? 'bg-teal-500 text-white' : 'bg-white text-gray-600 hover:bg-teal-50'
                }`}
              >
                {filter === 'all' ? 'All' : statusLabels[filter]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <article key={order.id} className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Order ID</p>
                  <h2 className="text-2xl font-semibold text-regal-blue-900">{order.id}</h2>
                  <p className="text-sm text-gray-500">Supplier · {order.supplier}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-teal-50 px-4 py-2 text-right">
                    <p className="text-xs text-gray-500">Order value</p>
                    <p className="text-2xl font-bold text-regal-blue-900">₹{order.amount.toLocaleString()}</p>
                  </div>
                  <button className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-teal-400 hover:text-teal-600">
                    View timeline
                  </button>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl bg-teal-50 p-4 text-teal-700">
                  <BadgeCheck size={22} /> {statusLabels[order.status]}
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-700">
                  <Truck size={22} /> {order.nextStep}
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-yellow-50 p-4 text-yellow-800">
                  <Package size={22} /> {order.eta}
                </div>
              </div>
            </article>
          ))}
          {filteredOrders.length === 0 && (
            <div className="rounded-2xl border border-dashed border-teal-300 bg-white p-8 text-center">
              <p className="text-lg font-semibold text-regal-blue-900">No orders yet</p>
              <p className="mt-2 text-sm text-gray-500">Post an RFQ or add ready-to-ship items to cart to see them tracked here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
