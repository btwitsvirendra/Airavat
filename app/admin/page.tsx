'use client';

import { useMemo, useState } from 'react';
import { CheckCircle, KeyRound, Lock, RefreshCcw, ShieldAlert, ShieldCheck, UserCog } from 'lucide-react';
import toast from 'react-hot-toast';

interface AccessRequest {
  id: string;
  requester: string;
  role: 'buyer' | 'supplier';
  reason: string;
  status: 'pending' | 'otp-sent' | 'completed';
  requestedAt: string;
}

const initialRequests: AccessRequest[] = [
  {
    id: 'req-1001',
    requester: 'Virendra Enterprises',
    role: 'buyer',
    reason: 'Update delivery address and unlock partial payment milestone',
    status: 'pending',
    requestedAt: '08 Nov 2024 · 09:10 AM',
  },
  {
    id: 'req-1002',
    requester: 'TechLight Industries',
    role: 'supplier',
    reason: 'Replace BIS certificate and modify product photos',
    status: 'otp-sent',
    requestedAt: '07 Nov 2024 · 06:35 PM',
  },
  {
    id: 'req-1003',
    requester: 'Textile Hub',
    role: 'supplier',
    reason: 'Disable paid bidding for two SKUs temporarily',
    status: 'completed',
    requestedAt: '05 Nov 2024 · 01:55 PM',
  },
];

export default function AdminPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(initialRequests[0]?.id ?? null);
  const [otp, setOtp] = useState('');

  const activeRequest = useMemo(
    () => requests.find((request) => request.id === activeRequestId) ?? null,
    [activeRequestId, requests]
  );

  const sendOtp = (requestId: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status: 'otp-sent' } : request
      )
    );
    toast.success('OTP sent to registered email and phone. Await confirmation.');
  };

  const approveChange = (requestId: string) => {
    if (!otp || otp.length < 4) {
      toast.error('Enter OTP received from requester before approving.');
      return;
    }
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status: 'completed' } : request
      )
    );
    toast.success('Request approved and changes recorded in audit log.');
    setOtp('');
  };

  const resetRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status: 'pending' } : request
      )
    );
    toast.success('Request reset to pending for additional verification.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-regal-blue-900">Admin governance console</h1>
            <p className="text-gray-600">
              Review buyer and supplier access requests, send OTP verification, and apply platform level updates confidently.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-700">
              <ShieldCheck size={16} /> Run compliance sweep
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-600">
              <ShieldAlert size={16} /> View audit log
            </button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[280px_1fr]">
          <aside className="space-y-3">
            {requests.map((request) => (
              <button
                key={request.id}
                onClick={() => setActiveRequestId(request.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  activeRequestId === request.id
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-600'
                }`}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{request.requester}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{request.role}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{request.requestedAt}</p>
                <p className="mt-2 text-xs text-gray-500 line-clamp-2">{request.reason}</p>
                <span
                  className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${
                    request.status === 'completed'
                      ? 'bg-teal-600 text-white'
                      : request.status === 'otp-sent'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {request.status === 'completed'
                    ? 'Approved'
                    : request.status === 'otp-sent'
                    ? 'OTP sent'
                    : 'Pending'}
                </span>
              </button>
            ))}
          </aside>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            {activeRequest ? (
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Request summary</p>
                  <h2 className="text-2xl font-semibold text-regal-blue-900 mt-2">{activeRequest.requester}</h2>
                  <p className="text-sm text-gray-600 mt-1">{activeRequest.reason}</p>
                </div>
                <div className="rounded-xl border border-gray-100 p-4 shadow-sm text-sm text-gray-600">
                  <p className="font-semibold text-regal-blue-900">Verification workflow</p>
                  <ol className="mt-2 list-decimal space-y-2 pl-4">
                    <li>Send OTP to registered email/phone from Airavat console.</li>
                    <li>Enter OTP received back from buyer/supplier to confirm ownership.</li>
                    <li>Apply requested changes and log action for audit compliance.</li>
                  </ol>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    onClick={() => sendOtp(activeRequest.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-regal-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-regal-blue-800"
                  >
                    <KeyRound size={16} /> Send OTP
                  </button>
                  <button
                    onClick={() => resetRequest(activeRequest.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-red-300 hover:text-red-500"
                  >
                    <RefreshCcw size={16} /> Reset request
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-600">Enter OTP shared by requester</label>
                  <input
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    maxLength={6}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. 482913"
                  />
                  <button
                    onClick={() => approveChange(activeRequest.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                  >
                    <CheckCircle size={16} /> Approve changes
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select a request to review verification workflow.</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-regal-blue-900 flex items-center gap-2 mb-5">
            <UserCog size={22} className="text-teal-600" /> Platform toggles
          </h2>
          <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-600">
            <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
              <Lock className="text-teal-600" size={24} />
              <p className="mt-3 font-semibold text-regal-blue-900">Freeze supplier onboarding</p>
              <p className="text-xs text-gray-500 mt-1">Temporarily stop new seller registrations while running audits.</p>
              <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-600">
                Toggle freeze
              </button>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
              <ShieldCheck className="text-teal-600" size={24} />
              <p className="mt-3 font-semibold text-regal-blue-900">Force RFQ moderation</p>
              <p className="text-xs text-gray-500 mt-1">Route all RFQs to manual review for the next 24 hours.</p>
              <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-600">
                Enable moderation
              </button>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
              <ShieldAlert className="text-teal-600" size={24} />
              <p className="mt-3 font-semibold text-regal-blue-900">Escalate disputes</p>
              <p className="text-xs text-gray-500 mt-1">Flag ongoing disputes for legal review and notify compliance.</p>
              <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-600">
                Escalate cases
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
