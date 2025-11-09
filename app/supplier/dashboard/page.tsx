'use client';

import { useMemo, useRef, useState } from 'react';
import {
  BarChart3,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Inbox,
  Layers,
  MailCheck,
  Pencil,
  Plus,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkle,
  Target,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { catalogProducts, draftCatalog, supplierMailThreads, advertisingBundles } from '@/lib/data/catalog';
import { useStore } from '@/lib/store';

interface BiddingCampaign {
  id: string;
  productId: string;
  dailyBudget: number;
  targetKeyword: string;
  status: 'active' | 'paused';
  reviewsWeight: number;
}

interface InvoiceDraft {
  orderId: string;
  buyer: string;
  amount: string;
  dueDate: string;
  notes: string;
  templateName?: string;
}

export default function SupplierDashboardPage() {
  const inventory = useStore((state) => state.inventory);
  const updateInventory = useStore((state) => state.updateInventory);

  const [campaigns, setCampaigns] = useState<BiddingCampaign[]>([
    {
      id: 'cmp-led-boost',
      productId: 'prod-led-100w',
      dailyBudget: 2500,
      targetKeyword: 'industrial led light',
      status: 'active',
      reviewsWeight: 80,
    },
  ]);

  const [campaignDraft, setCampaignDraft] = useState({
    productId: catalogProducts[0]?.id ?? '',
    dailyBudget: 1500,
    targetKeyword: 'top placement',
    reviewsWeight: 70,
  });

  const [invoiceDraft, setInvoiceDraft] = useState<InvoiceDraft>({
    orderId: 'ORD-2024-001',
    buyer: 'Virendra Enterprises',
    amount: '125000',
    dueDate: '2024-11-18',
    notes: '50% advance, balance on dispatch',
  });
  const invoiceTemplateInput = useRef<HTMLInputElement | null>(null);

  const [selectedMail, setSelectedMail] = useState<string | null>(supplierMailThreads[0]?.id ?? null);
  const [mailState, setMailState] = useState(() => supplierMailThreads);

  const [activeBundles, setActiveBundles] = useState<string[]>(['bundle-growth']);

  const activeMail = useMemo(() => mailState.find((thread) => thread.id === selectedMail), [mailState, selectedMail]);

  const handleInventoryChange = (productId: string, value: number) => {
    if (Number.isNaN(value)) {
      toast.error('Enter a valid stock quantity.');
      return;
    }
    updateInventory(productId, value);
    toast.success('Inventory updated — catalog availability refreshed.');
  };

  const createCampaign = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!campaignDraft.productId) return;

    const newCampaign: BiddingCampaign = {
      id: `cmp-${Date.now()}`,
      productId: campaignDraft.productId,
      dailyBudget: campaignDraft.dailyBudget,
      targetKeyword: campaignDraft.targetKeyword,
      status: 'active',
      reviewsWeight: campaignDraft.reviewsWeight,
    };

    setCampaigns((prev) => [...prev, newCampaign]);
    toast.success('Sponsored bidding activated for your product.');
  };

  const updateCampaignStatus = (campaignId: string, status: 'active' | 'paused') => {
    setCampaigns((prev) => prev.map((campaign) => (campaign.id === campaignId ? { ...campaign, status } : campaign)));
  };

  const handleInvoiceTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setInvoiceDraft((prev) => ({ ...prev, templateName: file.name }));
    toast.success('Invoice template uploaded. Ready to generate bills.');
  };

  const generateInvoicePreview = () => {
    toast.success('Invoice generated and shared with buyer inbox.');
  };

  const markMailResolved = (mailId: string) => {
    setMailState((prev) =>
      prev.map((mail) =>
        mail.id === mailId
          ? { ...mail, status: mail.status === 'resolved' ? 'awaiting_reply' : 'resolved' }
          : mail
      )
    );
  };

  const toggleBundle = (bundleId: string) => {
    setActiveBundles((prev) =>
      prev.includes(bundleId) ? prev.filter((id) => id !== bundleId) : [...prev, bundleId]
    );
    toast.success('Advertising preferences updated.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-regal-blue-900">Supplier Control Centre</h1>
            <p className="text-gray-600">
              Manage catalog availability, sponsored placements, invoices, and Airavat support from one workspace.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-700"
            >
              <Rocket size={16} /> Request growth audit
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-600"
              onClick={() => invoiceTemplateInput.current?.click()}
            >
              <FileText size={16} /> Upload invoice template
            </button>
            <input
              ref={invoiceTemplateInput}
              type="file"
              accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              onChange={handleInvoiceTemplateUpload}
            />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-regal-blue-900 flex items-center gap-2">
                  <Layers size={22} className="text-teal-600" /> Inventory manager
                </h2>
                <p className="text-sm text-gray-500">
                  Update available stock so buyers cannot request more than you can dispatch instantly.
                </p>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600">
                {catalogProducts.length} live listings
              </span>
            </div>

            <div className="space-y-4">
              {catalogProducts.map((product) => {
                const record = inventory[product.id];
                const available = record?.available ?? product.stock;
                return (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 rounded-xl border border-gray-100 px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-regal-blue-900">{product.name}</p>
                      <p className="text-xs text-gray-500">MOQ {product.minOrderQuantity} · Current stock {available}</p>
                    </div>
                    <div className="flex flex-col items-stretch gap-2 text-sm md:flex-row md:items-center md:gap-3">
                      <input
                        type="number"
                        min={0}
                        defaultValue={available}
                        onBlur={(event) => handleInventoryChange(product.id, Number(event.target.value))}
                        className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                      />
                      <button
                        className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
                        onClick={() => handleInventoryChange(product.id, available)}
                      >
                        <CheckCircle size={14} /> Sync availability
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-regal-blue-900 flex items-center gap-2 mb-4">
              <Sparkle size={20} className="text-teal-600" /> Draft products
            </h2>
            <div className="space-y-4">
              {draftCatalog.map((draft) => (
                <div key={draft.id} className="rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="font-semibold text-regal-blue-900">{draft.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{draft.status.replace('_', ' ')}</p>
                  <p className="mt-2 text-sm text-gray-600">Reviewer: {draft.reviewer}</p>
                  <p className="text-xs text-gray-400">Updated {draft.lastUpdated}</p>
                  <p className="mt-2 text-xs text-gray-500">{draft.notes}</p>
                  <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
                    <Pencil size={14} /> Submit revisions
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-regal-blue-900 flex items-center gap-2">
                <Target size={22} className="text-teal-600" /> Sponsored bidding
              </h2>
              <span className="text-xs font-semibold text-gray-400">Reviews weighted placements</span>
            </div>

            <form onSubmit={createCampaign} className="grid gap-4 md:grid-cols-4 md:items-end">
              <label className="flex flex-col text-sm text-gray-600 md:col-span-2">
                Product
                <select
                  value={campaignDraft.productId}
                  onChange={(event) => setCampaignDraft((prev) => ({ ...prev, productId: event.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                >
                  {catalogProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col text-sm text-gray-600">
                Daily budget (₹)
                <input
                  type="number"
                  min={500}
                  value={campaignDraft.dailyBudget}
                  onChange={(event) => setCampaignDraft((prev) => ({ ...prev, dailyBudget: Number(event.target.value) }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm text-gray-600">
                Reviews weight (%)
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={campaignDraft.reviewsWeight}
                  onChange={(event) => setCampaignDraft((prev) => ({ ...prev, reviewsWeight: Number(event.target.value) }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm text-gray-600 md:col-span-4">
                Target search phrase
                <input
                  type="text"
                  value={campaignDraft.targetKeyword}
                  onChange={(event) => setCampaignDraft((prev) => ({ ...prev, targetKeyword: event.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. smart LED street lights"
                />
              </label>
              <button
                type="submit"
                className="md:col-span-4 inline-flex items-center justify-center gap-2 rounded-full bg-regal-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-regal-blue-800"
              >
                <Plus size={16} /> Launch sponsored campaign
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {campaigns.map((campaign) => {
                const product = catalogProducts.find((item) => item.id === campaign.productId);
                return (
                  <div
                    key={campaign.id}
                    className="flex flex-col gap-3 rounded-xl border border-gray-100 px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-regal-blue-900">{product?.name}</p>
                      <p className="text-xs text-gray-500">
                        ₹{campaign.dailyBudget.toLocaleString()} / day · Reviews weight {campaign.reviewsWeight}%
                      </p>
                      <p className="text-xs text-gray-400">Keyword: {campaign.targetKeyword}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() => updateCampaignStatus(campaign.id, 'active')}
                        className={`rounded-full px-4 py-2 font-semibold transition ${
                          campaign.status === 'active'
                            ? 'bg-teal-600 text-white'
                            : 'border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600'
                        }`}
                      >
                        Promote to top
                      </button>
                      <button
                        onClick={() => updateCampaignStatus(campaign.id, 'paused')}
                        className={`rounded-full px-4 py-2 font-semibold transition ${
                          campaign.status === 'paused'
                            ? 'bg-gray-200 text-gray-600'
                            : 'border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                        }`}
                      >
                        Pause bidding
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-regal-blue-900 flex items-center gap-2 mb-4">
              <BarChart3 size={20} className="text-teal-600" /> Performance snapshot
            </h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between rounded-xl bg-teal-50 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-teal-600">Sponsored clicks</p>
                  <p className="text-2xl font-bold text-regal-blue-900">3,482</p>
                </div>
                <ShieldCheck size={24} className="text-teal-600" />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-600">RFQ replies</p>
                  <p className="text-2xl font-bold text-regal-blue-900">48</p>
                </div>
                <ShoppingBag size={24} className="text-blue-600" />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-yellow-50 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-600">Payment links generated</p>
                  <p className="text-2xl font-bold text-regal-blue-900">12</p>
                </div>
                <MailCheck size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-regal-blue-900 flex items-center gap-2">
                <Inbox size={22} className="text-teal-600" /> Mail and compliance desk
              </h2>
              <span className="rounded-full bg-regal-gold-100 px-3 py-1 text-xs font-semibold text-regal-blue-900">
                OTP protected changes
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-[240px_1fr]">
              <div className="space-y-2">
                {mailState.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedMail(thread.id)}
                    className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition ${
                      selectedMail === thread.id
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-teal-300 hover:text-teal-600'
                    }`}
                  >
                    <p className="font-semibold">{thread.subject}</p>
                    <p className="text-xs text-gray-500">{thread.receivedAt}</p>
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
                {activeMail ? (
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">From {activeMail.sender}</p>
                    <p>
                      {activeMail.status === 'awaiting_reply'
                        ? 'Buyer expects a response on pricing and lead time. Share OTP-confirmed changes if required.'
                        : activeMail.status === 'in_review'
                        ? 'Compliance desk needs BIS license upload. Use OTP sent to registered email to modify documents.'
                        : 'Marketing booster activated. Campaign performance summary shared below.'}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markMailResolved(activeMail.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                          activeMail.status === 'resolved'
                            ? 'bg-teal-600 text-white'
                            : 'border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600'
                        }`}
                      >
                        <CheckCircle size={14} /> {activeMail.status === 'resolved' ? 'Resolved' : 'Mark resolved'}
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-600">
                        <ExternalLink size={14} /> Request OTP access
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Select a message to review buyer or compliance requests.</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-regal-blue-900 flex items-center gap-2 mb-4">
              <FileText size={20} className="text-teal-600" /> Invoice workspace
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <label className="flex flex-col text-sm text-gray-600">
                Order ID
                <input
                  value={invoiceDraft.orderId}
                  onChange={(event) => setInvoiceDraft((prev) => ({ ...prev, orderId: event.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm text-gray-600">
                Buyer name
                <input
                  value={invoiceDraft.buyer}
                  onChange={(event) => setInvoiceDraft((prev) => ({ ...prev, buyer: event.target.value }))}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </label>
              <div className="flex gap-3">
                <label className="flex flex-1 flex-col text-sm text-gray-600">
                  Amount (₹)
                  <input
                    value={invoiceDraft.amount}
                    onChange={(event) => setInvoiceDraft((prev) => ({ ...prev, amount: event.target.value }))}
                    className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </label>
                <label className="flex flex-1 flex-col text-sm text-gray-600">
                  Due date
                  <input
                    type="date"
                    value={invoiceDraft.dueDate}
                    onChange={(event) => setInvoiceDraft((prev) => ({ ...prev, dueDate: event.target.value }))}
                    className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </label>
              </div>
              <label className="flex flex-col text-sm text-gray-600">
                Notes
                <textarea
                  value={invoiceDraft.notes}
                  onChange={(event) => setInvoiceDraft((prev) => ({ ...prev, notes: event.target.value }))}
                  rows={3}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </label>
              {invoiceDraft.templateName && (
                <p className="text-xs text-gray-500">Template: {invoiceDraft.templateName}</p>
              )}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={generateInvoicePreview}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                >
                  <Download size={16} /> Generate & send invoice
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-600">
                  Preview PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-regal-blue-900 flex items-center gap-2 mb-5">
            <Rocket size={22} className="text-teal-600" /> Advertising bundles
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {advertisingBundles.map((bundle) => (
              <div key={bundle.id} className="rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-lg font-semibold text-regal-blue-900">{bundle.name}</p>
                <p className="text-sm text-gray-600 mt-2">{bundle.description}</p>
                <p className="mt-3 text-xs text-gray-400">{bundle.impressions}</p>
                <p className="mt-4 text-2xl font-bold text-regal-blue-900">₹{bundle.monthlyCost.toLocaleString()}</p>
                <button
                  onClick={() => toggleBundle(bundle.id)}
                  className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeBundles.includes(bundle.id)
                      ? 'bg-teal-600 text-white'
                      : 'border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600'
                  }`}
                >
                  {activeBundles.includes(bundle.id) ? 'Activated' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
