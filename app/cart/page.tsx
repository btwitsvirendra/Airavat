'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalValue = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Add items to your cart first.');
      return;
    }
    setIsCheckingOut(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6A00', '#FF8C00', '#FFA500'],
    });
    setTimeout(() => {
      toast.success('Your Airavat success manager will coordinate payment links shortly.');
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1920px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sourcing Cart</h1>
          <p className="text-gray-600">Review the products you plan to order. Quantities are set to supplier minimums.</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <AnimatePresence>
              {cart.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border-2 border-dashed border-[#FF6A00] bg-[#FFF4E6] p-12 text-center"
                >
                  <ShoppingBag size={64} className="mx-auto text-[#FF6A00] mb-4" />
                  <p className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-600 mb-6">
                    Browse products or Discover clusters to add items and request consolidated quotes.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-[#FF6A00] hover:bg-[#E55A00] text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Explore Products <ArrowRight size={18} />
                  </Link>
                </motion.div>
              )}
              {cart.map(({ product, quantity }) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingBag size={32} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.supplier?.name ?? product.supplierId ?? 'Supplier'}
                      </p>
                      <p className="text-sm text-[#FF6A00] font-medium">
                        MOQ: {product.minOrderQuantity} · Qty: {quantity} {product.price.unit}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Total value</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{(product.price.amount * quantity).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 rounded-lg bg-white p-6 shadow-lg h-fit border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
            <div className="space-y-3 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Items</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Estimated value</span>
                <span className="font-semibold">₹{totalValue.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ShieldCheck size={16} className="text-[#FF6A00]" />
                <span>Trade Assurance Protection</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Truck size={16} className="text-[#FF6A00]" />
                <span>Integrated Logistics Support</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-[#FF6A00] hover:bg-[#E55A00] text-white py-4 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 mt-4"
            >
              Proceed to Checkout
            </Link>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-300 hover:text-red-500"
              >
                Clear cart
              </button>
            )}
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
