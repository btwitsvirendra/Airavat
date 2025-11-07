'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  Star,
  MapPin,
  MessageSquare,
  ShoppingCart,
  Heart,
  Share2,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isAuthenticated } = useStore();

  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customizations, setCustomizations] = useState({
    thickness: '50 ml',
    volume: '100 ml',
    logoprinting: '24/5 pieces',
    labelling: 'Other',
    packaging: '24/5 pieces',
    bodyHandling: 'Full wrapped',
    shape: 'Min. order: 10,000 pieces',
  });

  // Demo product data based on Figma design
  const product = {
    id: params.id as string,
    name: 'High End Luxury Round Perfume Bottle Supplier Crimp 50ml 100ml Acrylic Gold Cap Empty Perfume Glass Bottle with Box Packaging',
    supplier: {
      name: 'Gorilla Glass manufacturing Pvt Ltd',
      location: 'Delhi - NY/ Old',
      rating: 4.5,
      totalOrders: 1250,
    },
    images: ['/product1.jpg', '/product2.jpg', '/product3.jpg'],
    price: {
      amount: 839,
      currency: '₹',
      unit: 'piece',
    },
    minOrderQuantity: 100,
    stock: 5000,
    description:
      'Premium quality perfume bottles with gold cap and luxury packaging. Perfect for high-end perfume brands.',
    specifications: {
      'Sealing Type': 'Crimp',
      'Diffuser or not': 'No',
      'Surface Handling': 'Embossed',
      'Model Number': 'PB-50-100',
      'Brand Name': 'Gorilla Glass',
      'Body Material': 'Glass',
      'Keyword': 'Perfume Bottle',
      'Product name': 'Glass Perfume Bottle',
      MOQ: '10,000 pieces',
      'Cap color': 'Gold',
      Feature: 'Eco-friendly',
    },
  };

  const images = Array(5).fill('/placeholder-product.jpg');

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }

    // addToCart(product as any, quantity);
    toast.success(`Added ${quantity} items to cart`);
  };

  const handleSendInquiry = () => {
    if (!isAuthenticated) {
      toast.error('Please login to send inquiry');
      router.push('/login');
      return;
    }

    toast.success('Inquiry sent to supplier!');
  };

  const handleChatWithSupplier = () => {
    if (!isAuthenticated) {
      toast.error('Please login to chat with supplier');
      router.push('/login');
      return;
    }

    router.push('/messages');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-teal">
            Technology & Printing
          </Link>
          <span className="mx-2">/</span>
          <Link href="/" className="hover:text-teal">
            Glass products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">3 items more</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Product Title */}
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${
                        star <= product.supplier.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.supplier.rating} ({product.supplier.totalOrders} total orders)
                </span>
              </div>

              {/* Supplier Info */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-regal-blue rounded-full flex items-center justify-center text-white font-bold">
                  G
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{product.supplier.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{product.supplier.location}</span>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    Product Image
                  </div>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition">
                  <Heart size={20} />
                </button>
                <button className="absolute top-4 right-16 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition">
                  <Share2 size={20} />
                </button>

                {/* Image Navigation */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition">
                  <ChevronLeft size={20} />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square bg-gray-100 rounded-lg cursor-pointer border-2 ${
                      selectedImage === idx ? 'border-teal' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  ></div>
                ))}
              </div>

              {/* Product Description */}
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 bg-teal/10 px-4 py-3 rounded-lg">
                  Product Description:
                </h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* More Products */}
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">More Products like this:</h2>
                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-2"></div>
                      <p className="text-xs text-gray-700 mb-1">
                        High End Luxury Round Perfume Bottle
                      </p>
                      <p className="text-sm font-bold text-gray-800">₹800 - ₹900</p>
                      <p className="text-xs text-gray-600">MOQ: 100 pieces</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 p-6">
              <div className="flex gap-4 border-b mb-6">
                <button className="px-4 py-2 border-b-2 border-teal text-teal font-medium">
                  Attribute
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Reviews</button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Supplier Card
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">About</button>
              </div>

              {/* Key Attributes */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Key Attribute</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b pb-2">
                      <div className="w-1/2 text-sm font-medium text-gray-700 bg-teal/10 px-3 py-2">
                        {key}
                      </div>
                      <div className="w-1/2 text-sm text-gray-800 px-3 py-2">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customization & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* Product Tab */}
              <div className="flex gap-2 mb-6">
                <button className="flex-1 bg-teal text-white px-4 py-2 rounded-lg font-medium">
                  Product
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                  Customization
                </button>
              </div>

              {/* Price & MOQ */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-teal">
                    {product.price.currency}
                    {product.price.amount}
                  </span>
                  <span className="text-gray-600">/ {product.price.unit}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Minimum Order Quantity - {product.minOrderQuantity} piece</span>
                  <button className="text-teal hover:underline">Verify Supplier</button>
                </div>
              </div>

              {/* Customization Options */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-800">Customization options:</h3>

                {/* Thickness */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Thickness</label>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 border border-teal bg-teal/10 text-teal rounded text-sm font-medium">
                      2-3ml
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-sm">
                      <Minus size={14} />
                      <span>50</span>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Volume</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal text-sm">
                    <option>50 ml</option>
                    <option>100 ml</option>
                  </select>
                </div>

                {/* Logo Printing */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Logo Printing</label>
                  <div className="flex gap-2 text-sm">
                    <button className="flex-1 px-3 py-2 border border-teal bg-teal text-white rounded font-medium">
                      +49/5 pieces (Min. order: 19 pieces)
                    </button>
                    <button className="p-2 border border-gray-300 rounded">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>

                {/* Other Options */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Other Customization Options:
                  </label>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Surface Handling</span>
                      <span className="ml-auto text-gray-600">Embossed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Label Printing</span>
                      <span className="ml-auto text-gray-600">5,000 per piece</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Packaging Printing</span>
                      <span className="ml-auto text-gray-600">5,000 per piece</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Shipping and Delivery cost:</strong> is to be negotiated and should be
                  given by the supplier to place the payment order.
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || 0))
                      }
                      className="w-20 text-center border-x border-gray-300 py-2 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Minus size={14} />
                    <Plus size={14} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSendInquiry}
                  className="w-full bg-teal text-white py-3 rounded-lg hover:bg-teal-600 transition font-semibold"
                >
                  Send Inquiry
                </button>
                <button
                  onClick={handleChatWithSupplier}
                  className="w-full bg-regal-blue text-white py-3 rounded-lg hover:bg-regal-blue/90 transition font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} />
                  Chat with Supplier
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full border-2 border-teal text-teal py-3 rounded-lg hover:bg-teal-50 transition font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>

              {/* Payment Options */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600 mb-2">Secure Payment with:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Visa</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Mastercard</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">UPI</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Net Banking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
