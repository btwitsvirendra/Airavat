'use client';

import { useState } from 'react';
import { X, Upload, Calendar, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface RequestQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
}

export default function RequestQuoteModal({ isOpen, onClose, product }: RequestQuoteModalProps) {
    const [quantity, setQuantity] = useState(product.minOrderQuantity || 100);
    const [targetPrice, setTargetPrice] = useState('');
    const [requiredDate, setRequiredDate] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Quote request sent successfully!');
        setIsSubmitting(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-900">Request for Quote</h3>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Product Summary */}
                        <div className="p-4 bg-blue-50 border-b border-blue-100 flex gap-3">
                            <div className="w-16 h-16 bg-white rounded border border-blue-100 overflow-hidden flex-shrink-0">
                                <img
                                    src={product.images?.[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                                <p className="text-sm text-gray-600">MOQ: {product.minOrderQuantity} {product.price.unit}</p>
                                <p className="text-sm font-bold text-[#3373FF]">
                                    Current Price: {product.price.currency} {product.price.amount}
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Target Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min={product.minOrderQuantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] focus:border-[#3373FF] outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Target Price / Unit
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Offer your price"
                                            value={targetPrice}
                                            onChange={(e) => setTargetPrice(e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] focus:border-[#3373FF] outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Required By Date
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={requiredDate}
                                        onChange={(e) => setRequiredDate(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] focus:border-[#3373FF] outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Additional Notes / Specs
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Describe your specific requirements (e.g., packaging, logo printing)..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] focus:border-[#3373FF] outline-none transition resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <Upload size={16} />
                                    <span>Attach technical drawings or specs (Optional)</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#3373FF] hover:bg-[#265ACC] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Request for Quote
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
