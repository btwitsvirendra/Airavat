'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MessageSquare, HelpCircle, Upload } from 'lucide-react';

export default function RFQPage() {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [activeTab, setActiveTab] = useState<'my-inquires' | 'post-rfq'>('my-inquires');
  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    description: '',
    requiredQuantity: '',
    unitOptional: '',
    shareBusinessCard: false,
    understandRules: false
  });

  const inquires = [
    // Sample data
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle RFQ submission
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar mode={mode} onModeChange={setMode} />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 border-b-0">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('my-inquires')}
                  className={`py-2 px-2 border-b-4 font-semibold transition-colors ${
                    activeTab === 'my-inquires'
                      ? 'border-teal text-teal'
                      : 'border-transparent text-gray-600 hover:text-teal'
                  }`}
                >
                  My Inquires
                </button>
                <button
                  onClick={() => setActiveTab('post-rfq')}
                  className={`py-2 px-2 border-b-4 font-semibold transition-colors ${
                    activeTab === 'post-rfq'
                      ? 'border-teal text-teal'
                      : 'border-transparent text-gray-600 hover:text-teal'
                  }`}
                >
                  Post RFQs
                </button>
              </div>

              {activeTab === 'post-rfq' && (
                <button className="flex items-center space-x-2 text-gray-600 hover:text-teal">
                  <span className="text-sm">How to Use</span>
                  <HelpCircle size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 p-8">
            {activeTab === 'my-inquires' ? (
              <div>
                {/* Filters */}
                <div className="flex space-x-4 mb-6">
                  <button className="px-4 py-2 bg-teal text-white rounded-lg font-medium">
                    All Inquires
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                    Filter
                  </button>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal">
                    <option>Select the category</option>
                    <option>Construction & Real Estate</option>
                    <option>Electronics</option>
                    <option>Textiles</option>
                  </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
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
                      {inquires.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-12 text-center">
                            <div className="text-gray-400">
                              <div className="text-4xl mb-4">📋</div>
                              <p className="text-lg font-medium text-gray-500">No inquires yet</p>
                              <p className="text-sm text-gray-400 mt-2">
                                Post your first RFQ to get quotes from suppliers
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        inquires.map((inquiry: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <div>
                                <p className="text-sm text-gray-600">Seller ID :</p>
                                <p className="text-sm font-medium text-gray-900">{inquiry.supplier}</p>
                                <p className="text-sm text-gray-600">{inquiry.company}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm font-medium text-gray-900">{inquiry.product}</p>
                              <p className="text-xs text-gray-600">{inquiry.description}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-gray-900">{inquiry.amount}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-gray-900">{inquiry.delivery}</p>
                            </td>
                            <td className="px-4 py-4">
                              <button className="flex items-center space-x-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-600 transition-colors">
                                <MessageSquare size={16} />
                                <span>Chat</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
                {/* Product Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    required
                  >
                    <option value="">Select the category</option>
                    <option value="construction">Construction & Real Estate</option>
                    <option value="electronics">Electronics</option>
                    <option value="textiles">Textiles & Apparel</option>
                  </select>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="Please enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe your requirement
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Please enter your product requirement to make customization to suite your business."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    required
                  />
                </div>

                {/* File Upload */}
                <div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-teal mx-auto mb-3" />
                    <p className="text-sm text-gray-600">
                      Upload a file: jpeg, png, doc, <br />
                      xls, or pdf, less than 10MB
                    </p>
                  </div>
                </div>

                {/* Product Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Quantity
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={formData.requiredQuantity}
                      onChange={(e) => setFormData({ ...formData, requiredQuantity: e.target.value })}
                      placeholder="Enter required Quantity"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      required
                    />
                    <input
                      type="text"
                      value={formData.unitOptional}
                      onChange={(e) => setFormData({ ...formData, unitOptional: e.target.value })}
                      placeholder="Enter Unit (optional)"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <p className="font-semibold text-gray-700">Terms and Condition</p>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shareBusinessCard}
                      onChange={(e) => setFormData({ ...formData, shareBusinessCard: e.target.checked })}
                      className="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I agree to share my Business Card with quoted suppliers.
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.understandRules}
                      onChange={(e) => setFormData({ ...formData, understandRules: e.target.checked })}
                      className="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I have read, understand and agreed to abide by the Buying Request Posting Rules
                    </span>
                  </label>

                  <p className="text-xs text-red-600">
                    Please fill in occupied fields when advertising.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="px-12 py-4 bg-teal text-white rounded-xl font-semibold text-lg hover:bg-teal-600 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Post RFQ
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
