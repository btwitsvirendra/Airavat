'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  Upload,
  X,
  HelpCircle,
} from 'lucide-react';

// Mock inquiry data
const mockInquiries = [
  {
    id: '1',
    sellerId: 'SELLER123',
    supplierName: 'Supplier name',
    companyName: 'Company Name',
    product: 'Product description and offers',
    amount: 'Amount of the item',
    delivery: 'Modes of delivery available',
    avatar: 'S',
  },
  {
    id: '2',
    sellerId: 'SELLER456',
    supplierName: 'Supplier name',
    companyName: 'Company Name',
    product: 'Product description and offers',
    amount: 'Amount of the item',
    delivery: 'Modes of delivery available',
    avatar: 'S',
  },
];

export default function RFQView() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'post'>('inquiries');
  const [inquiryFilter, setInquiryFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    description: '',
    quantity: '',
    unit: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [agreeToShare, setAgreeToShare] = useState(false);
  const [agreeToRules, setAgreeToRules] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!formData.category) newErrors.push('Category is required');
    if (!formData.productName) newErrors.push('Product name is required');
    if (!formData.description) newErrors.push('Description is required');
    if (!formData.quantity) newErrors.push('Quantity is required');
    if (!agreeToShare) newErrors.push('Please agree to share your Business Card');
    if (!agreeToRules) newErrors.push('Please agree to the Buying Request Posting Rules');

    setErrors(newErrors);

    if (newErrors.length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
      alert('RFQ posted successfully!');
      // Reset form
      setFormData({
        category: '',
        productName: '',
        description: '',
        quantity: '',
        unit: '',
      });
      setFiles([]);
      setAgreeToShare(false);
      setAgreeToRules(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`text-base font-medium transition ${
                activeTab === 'inquiries'
                  ? 'text-[#9A79FF] underline decoration-2 underline-offset-4'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Inquires
            </button>
            <button
              onClick={() => setActiveTab('post')}
              className={`text-base font-medium transition ${
                activeTab === 'post'
                  ? 'text-[#9A79FF] underline decoration-2 underline-offset-4'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Post RFQs
            </button>
          </div>
          {activeTab === 'post' && (
            <a href="#" className="text-sm text-gray-600 hover:text-[#9A79FF] flex items-center gap-1">
              How to Use
              <HelpCircle size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {activeTab === 'inquiries' ? (
          <div className="p-6">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <button className="flex items-center gap-2 bg-[#9A79FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8A69EF] transition">
                All Inquires
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                <Filter size={16} />
                Filter
              </button>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-[#9A79FF]"
              >
                <option value="">Select the category</option>
                <option value="electronics">Electronics</option>
                <option value="textiles">Textiles</option>
                <option value="packaging">Packaging</option>
              </select>
            </div>

            {/* Inquiry Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="col-span-3">
                  <h3 className="font-bold text-gray-900">Supplier Information</h3>
                </div>
                <div className="col-span-3">
                  <h3 className="font-bold text-gray-900">Product</h3>
                </div>
                <div className="col-span-2">
                  <h3 className="font-bold text-gray-900">Amount</h3>
                </div>
                <div className="col-span-2">
                  <h3 className="font-bold text-gray-900">Delivery</h3>
                </div>
                <div className="col-span-2"></div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-200">
                {mockInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition">
                    <div className="col-span-3 flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-semibold">{inquiry.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Seller ID:</span> {inquiry.sellerId}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mb-1">{inquiry.supplierName}</p>
                        <p className="text-sm text-gray-600">{inquiry.companyName}</p>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-sm text-gray-700">{inquiry.product}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <p className="text-sm text-gray-700">{inquiry.amount}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <p className="text-sm text-gray-700">{inquiry.delivery}</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-end">
                      <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-6 py-2 rounded-lg text-sm font-medium transition">
                        Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Category */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Product Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A79FF]"
                >
                  <option value="">Select the category</option>
                  <option value="electronics">Electronics</option>
                  <option value="textiles">Textiles</option>
                  <option value="packaging">Packaging</option>
                  <option value="machinery">Machinery</option>
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="Please enter product name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A79FF]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Describe you requirement
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please enter your product requirement to make customization to suite your business."
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A79FF] resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Upload Files
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#9A79FF] transition cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.doc,.xls,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload size={32} className="text-[#9A79FF] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Upload a jpg, jpeg, png, doc, xls, or pdf, less than 10MB
                    </p>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                        <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Quantity */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Product Quantity
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="Enter required Quantity"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A79FF]"
                  />
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="Enter Unit (optional)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A79FF]"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Terms and Condition</h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToShare}
                      onChange={(e) => setAgreeToShare(e.target.checked)}
                      className="mt-1 w-5 h-5 text-[#9A79FF] border-gray-300 rounded focus:ring-[#9A79FF]"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to share my Business Card with quoted suppliers.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToRules}
                      onChange={(e) => setAgreeToRules(e.target.checked)}
                      className="mt-1 w-5 h-5 text-[#9A79FF] border-gray-300 rounded focus:ring-[#9A79FF]"
                    />
                    <span className="text-sm text-gray-700">
                      I have read, understood and agreed to abide by the Buying Request Posting Rules
                    </span>
                  </label>
                </div>
                {errors.length > 0 && (
                  <p className="mt-2 text-sm text-red-600">
                    Please fill in the required fields before submitting.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#9A79FF] hover:bg-[#8A69EF] text-white font-bold py-4 rounded-lg transition"
                >
                  Post RFQ
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

