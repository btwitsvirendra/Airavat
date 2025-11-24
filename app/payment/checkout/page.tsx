'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, CreditCard, Lock, ShieldCheck, Smartphone, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');

    // Mock data - in real app, fetch from API using ID
    const amount = 225000;
    const currency = 'INR';
    const orderId = 'ORD-2025-001';
    const description = 'Advance payment for Industrial LED Lights';

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">
                        Your payment of {currency === 'INR' ? '₹' : '$'}{amount.toLocaleString()} has been processed successfully.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Transaction ID</span>
                            <span className="font-mono font-medium">TXN-{Math.floor(Math.random() * 1000000)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date</span>
                            <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/messages')}
                        className="w-full bg-[#3373FF] hover:bg-[#265ACC] text-white py-3 rounded-xl font-semibold transition"
                    >
                        Return to Chat
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-2xl font-bold text-[#3373FF]">Airavat</Link>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <Lock size={16} />
                        Encrypted Connection
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Payment Methods */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>

                        <div className="space-y-4">
                            {/* Credit/Debit Card */}
                            <label className={`block p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'card' ? 'border-[#3373FF] bg-blue-50/30' : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="w-5 h-5 text-[#3373FF]"
                                    />
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                        <CreditCard size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">Credit / Debit Card</h3>
                                        <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                                    </div>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="mt-4 pl-9 space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] outline-none"
                                        />
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3373FF] outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                            </label>

                            {/* UPI */}
                            <label className={`block p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'upi' ? 'border-[#3373FF] bg-blue-50/30' : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'upi'}
                                        onChange={() => setPaymentMethod('upi')}
                                        className="w-5 h-5 text-[#3373FF]"
                                    />
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                        <Smartphone size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">UPI</h3>
                                        <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                                    </div>
                                </div>
                            </label>

                            {/* Net Banking */}
                            <label className={`block p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'netbanking' ? 'border-[#3373FF] bg-blue-50/30' : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'netbanking'}
                                        onChange={() => setPaymentMethod('netbanking')}
                                        className="w-5 h-5 text-[#3373FF]"
                                    />
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                        <Building2 size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">Net Banking</h3>
                                        <p className="text-sm text-gray-500">All Indian banks supported</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Order ID</span>
                                    <span className="font-medium text-gray-900">{orderId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Description</span>
                                    <span className="font-medium text-gray-900 text-right max-w-[200px]">{description}</span>
                                </div>
                                <div className="h-px bg-gray-100 my-2"></div>
                                <div className="flex justify-between text-base font-semibold">
                                    <span className="text-gray-900">Total Amount</span>
                                    <span className="text-[#3373FF]">{currency === 'INR' ? '₹' : '$'}{amount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-3 flex gap-3 mb-6">
                                <ShieldCheck size={20} className="text-[#3373FF] flex-shrink-0" />
                                <p className="text-xs text-blue-800">
                                    Your payment is secured by Airavat Secure. Money is held in escrow until you confirm receipt of goods.
                                </p>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3373FF] hover:bg-[#265ACC]'
                                    }`}
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>Pay {currency === 'INR' ? '₹' : '$'}{amount.toLocaleString()}</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
