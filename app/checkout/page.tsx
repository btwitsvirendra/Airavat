'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  FileText, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Minus,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface BillingInfo {
  icon: typeof MapPin;
  value: string;
}

const TopBar = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-4 md:p-6 mb-4">
      <h6 className="font-bold">Order Review</h6>
    </div>
  );
};

const BillingItem = ({ bill }: { bill: BillingInfo }) => {
  const Icon = bill.icon;
  return (
    <div className="text-sm flex mb-4">
      <div>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-grow px-2">
        <p className="mb-0">{bill.value}</p>
      </div>
      <div>
        <button className="text-blue-600 hover:underline font-bold">
          Edit
        </button>
      </div>
    </div>
  );
};

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState('');
  
  const handleApply = () => {
    if (promoCode.trim()) {
      toast.success('Promo code applied!');
    } else {
      toast.error('Please enter a promo code');
    }
  };

  return (
    <div className="mt-3">
      <p className="text-sm mb-1">Promo Code</p>
      <div className="flex h-10">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="bg-blue-100 border-none focus:outline-none h-full flex-grow rounded-md p-3 mr-2"
          placeholder="Recipient's username"
        />
        <button
          onClick={handleApply}
          className="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-2 leading-none h-full rounded-md transition"
          type="button"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const SideBar = ({ 
  subtotal, 
  shipping, 
  tax, 
  total,
  itemCount 
}: { 
  subtotal: number; 
  shipping: number; 
  tax: number; 
  total: number;
  itemCount: number;
}) => {
  const [formData] = useState({
    address: 'Provati-73, East Pirmoholla, Amborkhana, Sylhet',
    billing: 'Bill to the same address',
    phone: '1742***080',
    email: 'xyz@gmail.com',
  });

  const billingInfo: BillingInfo[] = [
    { icon: MapPin, value: formData.address },
    { icon: FileText, value: formData.billing },
    { icon: Phone, value: formData.phone },
    { icon: Mail, value: formData.email },
  ];

  const handlePlaceOrder = () => {
    toast.success('Placing order...');
  };

  const inrTotal = total.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const inrSubtotal = subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const inrShipping = shipping.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <div className="bg-blue-50 rounded-xl p-4 md:p-6">
      <h6 className="text-2xl font-bold mb-4">Shipping & Billing</h6>
      {billingInfo.map((bill, i) => (
        <BillingItem bill={bill} key={i} />
      ))}

      <h6 className="text-2xl font-bold my-6">Order Summary</h6>
      
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <FileText className="w-4 h-4 mr-2 text-blue-600" />
          Store Coupons
        </span>
        <span>
          <button className="text-blue-600 hover:underline font-medium flex items-center">
            View <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center">
          <FileText className="w-4 h-4 mr-2 text-blue-600" />
          BusinessName Coupon
        </span>
        <span>
          <button className="text-blue-600 hover:underline font-medium flex items-center">
            View <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </span>
      </div>

      <PromoCode />

      <hr className="border-gray-300 my-6" />
      <div className="flex justify-between items-center mb-2">
        <span>Subtotal ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})</span>
        <span className="font-semibold">₹{inrSubtotal}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span>Shipping Fee</span>
        <span className="font-semibold">₹{inrShipping}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold">Total</span>
        <span className="text-2xl font-bold">₹{inrTotal}</span>
      </div>
      <p className="text-sm text-end opacity-50">VAT included, where applicable</p>

      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white hover:bg-opacity-90 w-full rounded-md py-3 px-4 mt-6 transition"
      >
        Place Order
      </button>
    </div>
  );
};

const Quantity = ({ 
  quantity, 
  onIncrease, 
  onDecrease 
}: { 
  quantity: number; 
  onIncrease: () => void; 
  onDecrease: () => void;
}) => {
  return (
    <div className="flex items-center">
      <button
        className="w-8 h-8 bg-slate-200 bg-opacity-80 hover:bg-opacity-100 flex justify-center items-center rounded-full font-bold transition"
        type="button"
        onClick={onDecrease}
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        className="bg-transparent text-center pl-3 font-bold w-12"
        placeholder=""
        value={quantity}
        readOnly
      />
      <button
        className="w-8 h-8 bg-slate-200 bg-opacity-80 hover:bg-opacity-100 flex justify-center items-center rounded-full font-bold transition"
        type="button"
        onClick={onIncrease}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

const OrderItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: { product: any; quantity: number }; 
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) => {
  const shippingPrice = 55; // ₹55
  const shippingDays = '53-53';

  const handleIncrease = () => {
    onUpdateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.product.id, item.quantity - 1);
    }
  };

  const productPrice = item.product.price?.amount || 0;
  const inrPrice = (productPrice * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <div className="bg-blue-50 rounded-xl p-4 md:p-6 my-4">
      <p className="text-sm">Seller: {item.product.supplier?.name || 'Unknown Supplier'}</p>
      <hr className="border-gray-300 my-4" />

      <div className="flex max-w-xs bg-slate-200 rounded-md mb-6 p-4">
        <div className="mr-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="font-bold mb-2">₹{shippingPrice}</p>
          <p className="text-sm opacity-75">Home Delivery</p>
          <p className="text-sm opacity-75">
            Estimated Delivery Time: {shippingDays} Days
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="flex-grow w-48 sm:mr-4 mx-auto">
          <Link href={`/products/${item.product.id}`}>
            {item.product.images?.[0] ? (
              <img 
                src={item.product.images[0]} 
                alt={item.product.name} 
                className="w-full h-auto rounded" 
              />
            ) : (
              <div className="w-full h-48 bg-slate-200 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">No Image</span>
              </div>
            )}
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-grow w-full md:w-auto">
              <div className="hover:text-blue-600 hover:underline mb-1">
                <Link 
                  href={`/products/${item.product.id}`}
                  className="text-[15px] leading-[19px]"
                >
                  {item.product.name}
                </Link>
              </div>
              <p className="text-sm mb-2">
                <span className="mr-3">
                  <b>Color</b>: {item.product.color || 'N/A'}
                </span>
                <span>
                  <b>Ships From</b>: {item.product.supplier?.country || 'India'}
                </span>
              </p>
              <div>
                <button className="text-blue-600 hover:underline font-medium text-sm inline-block mb-1">
                  <Plus className="w-4 h-4 inline mr-1" />
                  Leave message
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:text-center">
              <div className="mb-2">
                <span className="text-[17px] font-bold mr-2">
                  ₹{inrPrice}
                </span>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <Quantity
                quantity={item.quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
              <div className="mt-3 text-center">
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="px-5 py-2 mt-4 rounded text-blue-600 hover:bg-slate-200 inline-flex justify-center items-center transition"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CheckoutPage() {
  const cart = useStore((state: any) => state.cart);
  const addToCart = useStore((state: any) => state.addToCart);
  const removeFromCart = useStore((state: any) => state.removeFromCart);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const cartItem = cart.find((item: any) => item.product.id === productId);
    if (cartItem && newQuantity > 0 && newQuantity !== cartItem.quantity) {
      const product = cartItem.product;
      const currentQuantity = cartItem.quantity;
      const difference = newQuantity - currentQuantity;
      
      if (difference > 0) {
        // Increasing quantity - just add the difference
        addToCart(product, difference);
      } else {
        // Decreasing quantity - remove and re-add with exact quantity
        removeFromCart(productId);
        // Add back with the new quantity (since item is removed, this sets it to newQuantity)
        addToCart(product, newQuantity);
      }
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const subtotal = cart.reduce((sum: number, item: any) => 
    sum + (item.product.price?.amount || 0) * item.quantity, 0
  );
  const shipping = 200; // Standard shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 md:py-24 bg-white text-zinc-900 relative overflow-hidden z-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <div className="w-full lg:w-2/3">
            <TopBar />
            {cart.map((item: any) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <OrderItem
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              </motion.div>
            ))}
          </div>
          <div className="w-full lg:w-1/3">
            <SideBar
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              itemCount={cart.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
