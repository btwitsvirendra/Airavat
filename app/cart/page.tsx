'use client';

import { useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const totalValue = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Add items to your cart first.');
      return;
    }
    toast.success('Your Airavat success manager will coordinate payment links shortly.');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-regal-blue-900">Sourcing Cart</h1>
          <p className="text-gray-600">Review the products you plan to order. Quantities are set to supplier minimums.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-regal-blue-900">{product.name}</h2>
                  <p className="text-sm text-gray-500">
                    {product.supplier?.name ?? product.supplierId ?? 'Supplier'}
                  </p>
                  <p className="text-sm text-teal-600">
                    MOQ: {product.minOrderQuantity} · Added Qty: {quantity} {product.price.unit}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total value</p>
                    <p className="text-xl font-semibold text-regal-blue-900">
                      ₹{(product.price.amount * quantity).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-300 hover:text-red-500"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="rounded-2xl border border-dashed border-teal-300 bg-white p-8 text-center">
                <p className="text-lg font-semibold text-regal-blue-900">Your cart is empty</p>
                <p className="mt-2 text-sm text-gray-500">
                  Browse products or Discover clusters to add items and request consolidated quotes.
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-4 rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-regal-blue-900">Order summary</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Estimated value</span>
              <span>₹{totalValue.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full">
              Request payment link
            </button>
            {cart.length > 0 && (
              <button onClick={clearCart} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-300 hover:text-red-500">
                Clear cart
              </button>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
