'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Lock, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const [formData, setFormData] = useState({
    email: '',
    country: 'India',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);
  const shipping = shippingMethod === 'express' ? 500 : 200;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Order placed successfully!');
    setIsSubmitting(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/products" className="text-[#9A79FF] hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1920px] mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_500px] gap-8">
          {/* Left Side - Product Information */}
          <div className="space-y-6">
            <div>
              <Link href="/cart" className="text-[#9A79FF] hover:underline text-sm mb-4 inline-block">
                ← Return to cart
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Review your order</h1>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Items in your order</h2>
              <div className="space-y-4">
                {cart.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Truck size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Supplier: {product.supplier?.name || 'Unknown'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Qty: {quantity} {product.price.unit}</span>
                        <span className="text-[#9A79FF] font-semibold">
                          ₹{(product.price.amount * quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping method:</span>
                  <span className="font-semibold text-gray-900">
                    {shippingMethod === 'express' ? 'Express Shipping' : 'Standard Shipping'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated delivery:</span>
                  <span className="font-semibold text-gray-900">
                    {shippingMethod === 'express' ? '3-5 business days' : '7-15 business days'}
                  </span>
                </div>
              </div>
            </div>

            {/* Trade Assurance */}
            <div className="bg-gradient-to-r from-[#9A79FF] to-[#FF9900] rounded-lg p-6 text-white">
              <div className="flex items-start gap-4">
                <ShieldCheck size={32} className="flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Trade Assurance</h3>
                  <p className="text-sm opacity-90">
                    Your payment is protected. We hold your payment until you confirm the order is received as described.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Checkout Form */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact information</h3>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                  />
                </div>

                {/* Delivery */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <select
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent appearance-none bg-white"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                      />
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A79FF] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Shipping method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#9A79FF] transition">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4 text-[#9A79FF] focus:ring-[#9A79FF]"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Standard shipping</div>
                        <div className="text-sm text-gray-600">7-15 business days · ₹200</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#9A79FF] transition">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4 text-[#9A79FF] focus:ring-[#9A79FF]"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Express shipping</div>
                        <div className="text-sm text-gray-600">3-5 business days · ₹500</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#9A79FF] transition">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#9A79FF] focus:ring-[#9A79FF]"
                      />
                      <CreditCard size={20} className="text-gray-600" />
                      <span className="font-semibold text-gray-900">Card</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#9A79FF] transition">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#9A79FF] focus:ring-[#9A79FF]"
                      />
                      <span className="font-semibold text-gray-900">UPI</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#9A79FF] transition">
                      <input
                        type="radio"
                        name="payment"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#9A79FF] focus:ring-[#9A79FF]"
                      />
                      <span className="font-semibold text-gray-900">Net banking</span>
                    </label>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Order summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Items</span>
                      <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold text-gray-900">₹{shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes</span>
                      <span className="font-semibold text-gray-900">₹{tax.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                {/* Complete Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#9A79FF] hover:bg-[#8A69EF] text-white py-3.5 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Complete order
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center">
                  By completing your purchase, you agree to these{' '}
                  <Link href="/terms" className="text-[#9A79FF] hover:underline">
                    Terms of Service
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

