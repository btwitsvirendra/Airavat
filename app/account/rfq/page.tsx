'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ArrowLeft, FileText, Plus, Upload, MessageSquare, Filter } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface RFQ {
  id: string;
  productName: string;
  category: string;
  description: string;
  quantity: {
    min: number;
    unit: string;
  };
  attachments?: string[];
  status: 'pending' | 'responded' | 'closed';
  createdAt: Date;
  responses: number;
}

export default function RFQPage() {
  const router = useRouter();
  const { user, isAuthenticated, userRole } = useStore();
  const [activeTab, setActiveTab] = useState<'myInquires' | 'postRFQ'>('myInquires');
  const [showPostForm, setShowPostForm] = useState(false);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);

  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    description: '',
    minQuantity: '',
    unit: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handlePostRFQ = () => {
    if (!formData.productName || !formData.description || !formData.minQuantity) {
      toast.error('Please fill all required fields');
      return;
    }

    const newRFQ: RFQ = {
      id: `rfq-${Date.now()}`,
      productName: formData.productName,
      category: formData.category,
      description: formData.description,
      quantity: {
        min: parseInt(formData.minQuantity),
        unit: formData.unit || 'pieces',
      },
      status: 'pending',
      createdAt: new Date(),
      responses: 0,
    };

    setRfqs([newRFQ, ...rfqs]);
    toast.success('RFQ posted successfully!');
    setFormData({
      category: '',
      productName: '',
      description: '',
      minQuantity: '',
      unit: '',
    });
    setShowPostForm(false);
    setActiveTab('myInquires');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-teal mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Account</span>
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('myInquires')}
                className={`text-lg font-bold pb-2 border-b-2 transition ${
                  activeTab === 'myInquires'
                    ? 'text-teal border-teal'
                    : 'text-gray-500 border-transparent'
                }`}
              >
                My Inquires
              </button>
              <button
                onClick={() => setActiveTab('postRFQ')}
                className={`text-lg font-bold pb-2 border-b-2 transition ${
                  activeTab === 'postRFQ'
                    ? 'text-teal border-teal'
                    : 'text-gray-500 border-transparent'
                }`}
              >
                Post RFQs
              </button>
            </div>

            {activeTab === 'myInquires' && (
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-teal text-teal rounded-lg hover:bg-teal-50 transition">
                  <Filter size={20} />
                  <span className="text-sm font-medium">Filter</span>
                </button>
              </div>
            )}

            {activeTab === 'postRFQ' && !showPostForm && (
              <button
                onClick={() => setShowPostForm(true)}
                className="flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
              >
                <Plus size={20} />
                <span>Post New RFQ</span>
              </button>
            )}
          </div>

          {/* Content */}
          {activeTab === 'myInquires' && (
            <div>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal">
                  <option>All Inquires</option>
                  <option>Pending</option>
                  <option>Responded</option>
                  <option>Closed</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal">
                  <option>Select the category</option>
                  <option>Electronics</option>
                  <option>Textiles</option>
                  <option>Machinery</option>
                </select>
              </div>

              {/* RFQ List */}
              {rfqs.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto text-gray-400 mb-4" size={64} />
                  <p className="text-gray-600 mb-6">No RFQs posted yet</p>
                  <button
                    onClick={() => {
                      setActiveTab('postRFQ');
                      setShowPostForm(true);
                    }}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Post Your First RFQ
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Supplier Information
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Delivery
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rfqs.map((rfq) => (
                        <tr key={rfq.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  Seller ID: -
                                </p>
                                <p className="text-xs text-gray-600">Supplier name</p>
                                <p className="text-xs text-gray-600">Company Name</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm font-medium text-gray-800">{rfq.productName}</p>
                            <p className="text-xs text-gray-600">{rfq.description}</p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm text-gray-800">Amount of the item</p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm text-gray-800">Modes of delivery available</p>
                          </td>
                          <td className="px-4 py-4">
                            <button className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                              Chat
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'postRFQ' && (
            <div>
              {showPostForm ? (
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Post New RFQ</h3>
                    <Link href="#" className="text-teal text-sm hover:underline">
                      How to Use ?
                    </Link>
                  </div>

                  {/* Form */}
                  <div className="space-y-6">
                    {/* Product Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      >
                        <option value="">Select the category</option>
                        <option value="electronics">Electronics & Components</option>
                        <option value="textiles">Textiles & Apparel</option>
                        <option value="machinery">Machinery & Equipment</option>
                        <option value="chemicals">Chemicals & Plastics</option>
                      </select>
                    </div>

                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Please enter product name"
                        value={formData.productName}
                        onChange={(e) =>
                          setFormData({ ...formData, productName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe your requirement *
                      </label>
                      <textarea
                        placeholder="Please enter your product requirement to make customization to suite your business."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                        required
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal transition cursor-pointer">
                        <Upload className="mx-auto text-teal mb-2" size={32} />
                        <p className="text-sm text-gray-600 mb-1">
                          Upload a file: jpeg, png, doc, xls, or pdf, less than 10MB
                        </p>
                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.pdf" />
                      </div>
                    </div>

                    {/* Product Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Quantity *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Enter required Quantity"
                          value={formData.minQuantity}
                          onChange={(e) =>
                            setFormData({ ...formData, minQuantity: e.target.value })
                          }
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Enter Unit (optional)"
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        Terms and Condition
                      </div>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to share my Business Card with quoted suppliers.
                        </span>
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                        />
                        <span className="text-sm text-gray-700">
                          I have read, understand and agreed to abide by the Buying Request Posting Rules.
                        </span>
                      </label>
                      <p className="text-xs text-red-600 mt-2">
                        Please fill in required fields before submitting.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handlePostRFQ}
                      className="w-full bg-teal text-white py-4 rounded-lg hover:bg-teal-600 transition font-semibold text-lg"
                    >
                      Post RFQ
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="mx-auto text-gray-400 mb-4" size={64} />
                  <p className="text-gray-600 mb-6">Ready to post your first RFQ?</p>
                  <button
                    onClick={() => setShowPostForm(true)}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Post New RFQ
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
