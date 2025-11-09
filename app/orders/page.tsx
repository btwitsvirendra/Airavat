'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BadgeCheck, Package, Truck, MapPin, X } from 'lucide-react';
import toast from 'react-hot-toast';

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

const orderTimelines: Record<string, { title: string; description: string; timestamp: string; completed: boolean }[]> = {
  'ORD-2024-001': [
    {
      title: 'Purchase order confirmed',
      description: 'Buyer confirmed specification and payment terms with TechLight Industries.',
      timestamp: '04 Nov 2024 · 09:10',
      completed: true,
    },
    {
      title: 'Production in progress',
      description: 'Supplier preparing 50 units with BIS certification reports attached.',
      timestamp: '05 Nov 2024 · 14:05',
      completed: true,
    },
    {
      title: 'Inspection scheduled',
      description: 'Third-party inspection booked for 10 Nov before dispatch.',
      timestamp: 'Pending',
      completed: false,
    },
    {
      title: 'Dispatch to Bengaluru',
      description: 'Transport partner to pick up consignment post inspection.',
      timestamp: 'Pending',
      completed: false,
    },
  ],
  'ORD-2024-002': [
    {
      title: 'Fabric inspection complete',
      description: 'Quality check and colour fastness test completed with reports uploaded.',
      timestamp: '02 Nov 2024 · 18:20',
      completed: true,
    },
    {
      title: 'In transit to Bengaluru',
      description: 'Container left Surat warehouse with GPS tracking enabled.',
      timestamp: '03 Nov 2024 · 05:45',
      completed: true,
    },
    {
      title: 'Customs documentation',
      description: 'E-way bill and state permits shared for consignee validation.',
      timestamp: '03 Nov 2024 · 08:00',
      completed: true,
    },
    {
      title: 'Delivery to buyer',
      description: 'Final mile delivery scheduled for 11 Nov 2024.',
      timestamp: 'Scheduled',
      completed: false,
    },
  ],
  'ORD-2024-003': [
    {
      title: 'Order delivered',
      description: 'Cold chain shipment delivered and quality accepted by buyer.',
      timestamp: '02 Nov 2024 · 16:00',
      completed: true,
    },
    {
      title: 'Payment released',
      description: 'Escrow payment released to supplier after buyer confirmation.',
      timestamp: '03 Nov 2024 · 11:10',
      completed: true,
    },
  ],
};

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const router = useRouter();

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  const openLogistics = (orderId: string, supplier: string) => {
    router.push(`/logistics?orderId=${orderId}&supplier=${encodeURIComponent(supplier)}`);
    toast.success('Compare logistics partners and negotiate delivery charges.');
  };

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
                  <button
                    onClick={() => setTrackingOrderId(order.id)}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-teal-400 hover:text-teal-600"
                  >
                    Track delivery
                  </button>
                  {order.status !== 'delivered' && (
                    <button
                      onClick={() => openLogistics(order.id, order.supplier)}
                      className="rounded-full border border-teal-500 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50"
                    >
                      Book logistics
                    </button>
                  )}
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
      {trackingOrderId && (
        <OrderTimelineModal
          orderId={trackingOrderId}
          onClose={() => setTrackingOrderId(null)}
          steps={orderTimelines[trackingOrderId] ?? []}
        />
      )}
    </div>
  );
}

function OrderTimelineModal({
  orderId,
  onClose,
  steps,
}: {
  orderId: string;
  onClose: () => void;
  steps: { title: string; description: string; timestamp: string; completed: boolean }[];
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Live tracking</p>
            <h3 className="text-xl font-semibold text-regal-blue-900">{orderId}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close tracking"
          >
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            {steps.length === 0 && (
              <p className="text-sm text-gray-500">No tracking milestones available yet. Please check back soon.</p>
            )}
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${step.completed ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-regal-blue-900">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{step.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
