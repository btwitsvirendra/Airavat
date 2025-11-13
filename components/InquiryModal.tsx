'use client';

import { useState } from 'react';
import { X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    id: string;
    name: string;
    price: { amount: number; currency: string };
    minOrderQuantity: number;
  };
  supplierId?: string;
}

// AI-suggested questions based on product type
const aiSuggestedQuestions = [
  'What is the price per unit?',
  'Do you provide size charts?',
  'What is the minimum order quantity?',
  'Can you customize the product?',
  'What is the delivery time?',
  'Do you offer samples?',
  'What payment methods do you accept?',
  'What is your return policy?',
];

export default function InquiryModal({ isOpen, onClose, product, supplierId }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    quantity: product?.minOrderQuantity || '',
    message: '',
    budget: '',
    expectedDelivery: '',
  });
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Inquiry sent successfully! The supplier will respond within 24 hours.');
    setFormData({ quantity: '', message: '', budget: '', expectedDelivery: '' });
    setSelectedQuestions([]);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white">
            <div className="flex items-center gap-3">
              <MessageSquare size={24} />
              <h2 className="text-xl font-bold">Send Inquiry to Supplier</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Product Info */}
            {product && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Product Information</h3>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Product:</span> {product.name}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Price:</span> {product.price.currency} {product.price.amount.toLocaleString()} / unit
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">MOQ:</span> {product.minOrderQuantity} units
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={product?.minOrderQuantity || 1}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                  placeholder={`Minimum: ${product?.minOrderQuantity || 1} units`}
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range (Optional)
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                  placeholder="e.g., $1,000 - $5,000"
                />
              </div>

              {/* Expected Delivery */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Delivery Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                />
              </div>

              {/* AI-Suggested Questions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={18} className="text-[#1E3A8A]" />
                  <label className="block text-sm font-medium text-gray-700">
                    AI-Suggested Questions (Click to add)
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {aiSuggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleQuestionClick(question)}
                      className={`p-3 text-left text-sm rounded-lg border transition ${
                        selectedQuestions.includes(question)
                          ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A]'
                          : 'border-gray-200 hover:border-[#1E3A8A] hover:bg-gray-50'
                      }`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none"
                  placeholder="Tell the supplier about your requirements, customization needs, or any specific questions..."
                />
                {selectedQuestions.length > 0 && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Selected questions will be included:</p>
                    <ul className="text-xs text-gray-700 list-disc list-inside">
                      {selectedQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


