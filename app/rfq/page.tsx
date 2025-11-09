'use client';

import { Suspense, useMemo, useState } from 'react';
import { FileText, PlusCircle, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

const categories = [
  'Industrial Machinery',
  'Textiles & Apparel',
  'Electronics & Electricals',
  'Food & Agriculture',
  'Packaging & Printing',
  'Chemicals & Plastics',
];

export default function RfqPage() {
  return (
    <Suspense fallback={<RfqFallback />}>
      <RfqForm />
    </Suspense>
  );
}

function RfqForm() {
  const searchParams = useSearchParams();
  const preselectedCluster = searchParams.get('cluster');
  const [requirements, setRequirements] = useState([{ specification: '', quantity: '' }]);
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0],
    budget: '',
    fulfillmentCity: '',
    description: preselectedCluster
      ? `We discovered suppliers via the ${preselectedCluster.toUpperCase()} cluster on Airavat.`
      : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clusterHint = useMemo(() => {
    if (!preselectedCluster) return '';
    switch (preselectedCluster) {
      case 'cnc':
        return 'Looking for CNC machining partners with automation capabilities.';
      case 'textiles':
        return 'Need eco-conscious textile manufacturers for private labels.';
      case 'food':
        return 'Seeking export-ready food processors with cold chain support.';
      case 'renewables':
        return 'Require renewable energy components with compliance documentation.';
      default:
        return '';
    }
  }, [preselectedCluster]);

  const updateRequirement = (index: number, field: 'specification' | 'quantity', value: string) => {
    setRequirements((prev) =>
      prev.map((requirement, idx) => (idx === index ? { ...requirement, [field]: value } : requirement))
    );
  };

  const addRequirement = () => {
    setRequirements((prev) => [...prev, { specification: '', quantity: '' }]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const isValid = requirements.every((requirement) => requirement.specification && requirement.quantity);
    if (!isValid) {
      toast.error('Please complete specification and quantity for each line item.');
      return;
    }

    setIsSubmitting(true);
    toast.success('RFQ posted! Verified suppliers will respond within 48 hours.');
    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-regal-blue-900">Create a Request for Quotation</h1>
          <p className="text-gray-600 mt-2">
            Share your requirements and Airavat will circulate them to matching suppliers. Expect initial responses in 48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Project title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="e.g. Source smart LED street lights"
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Indicative budget (₹)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(event) => setFormData((prev) => ({ ...prev, budget: event.target.value }))}
                placeholder="500000"
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Delivery city</label>
              <input
                type="text"
                value={formData.fulfillmentCity}
                onChange={(event) => setFormData((prev) => ({ ...prev, fulfillmentCity: event.target.value }))}
                placeholder="Bengaluru, Karnataka"
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">Line items</label>
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[2fr_1fr]">
                  <input
                    type="text"
                    value={requirement.specification}
                    onChange={(event) => updateRequirement(index, 'specification', event.target.value)}
                    placeholder="Specification details (materials, certifications, dimensions)"
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    value={requirement.quantity}
                    onChange={(event) => updateRequirement(index, 'quantity', event.target.value)}
                    placeholder="Quantity & unit"
                    className="input-field"
                    required
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="inline-flex items-center gap-2 rounded-full border border-teal-500 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50"
            >
              <PlusCircle size={16} /> Add another line item
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Additional details</label>
            <textarea
              value={formData.description}
              onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Share context about order frequency, certifications, packaging, etc."
              rows={5}
              className="input-field"
            />
            {clusterHint && <p className="text-sm text-teal-700">Suggestion: {clusterHint}</p>}
          </div>

          <div className="rounded-2xl border border-dashed border-teal-300 bg-teal-50 p-6 text-center">
            <FileText className="mx-auto mb-3 text-teal-500" size={28} />
            <p className="font-semibold text-regal-blue-900">Attach drawings or BOM</p>
            <p className="text-sm text-teal-700 mb-4">Upload PDFs, CAD files, or spreadsheets so suppliers can respond precisely.</p>
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white">
              <Upload size={16} /> Upload files
            </button>
          </div>

          <button type="submit" className="btn-primary w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Post RFQ'}
          </button>
        </form>
      </div>
    </div>
  );
}

function RfqFallback() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6 animate-pulse">
        <div className="h-12 w-72 rounded-full bg-gray-200" />
        <div className="mt-6 space-y-4">
          <div className="h-36 rounded-2xl bg-gray-200" />
          <div className="h-36 rounded-2xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
