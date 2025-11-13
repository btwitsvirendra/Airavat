'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { catalogProducts } from '@/lib/data/catalog';
import { alibabaProducts } from '@/lib/data/alibaba-products';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import {
  Star,
  ShoppingCart,
  MessageSquare,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Camera,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Download,
  ArrowUp,
  Star as StarIcon,
  ThumbsUp,
} from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import { motion } from 'framer-motion';
import InquiryModal from '@/components/InquiryModal';

// Combine products
const allProducts = [...catalogProducts, ...alibabaProducts];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const product = allProducts.find((p) => p.id === productId) || allProducts[0];
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite, startProductChat } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [activeTab, setActiveTab] = useState<'attributes' | 'reviews' | 'supplier' | 'description'>('attributes');
  const [showMoreAttributes, setShowMoreAttributes] = useState(false);
  const [showLeadTime, setShowLeadTime] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Parse specifications
  const specs = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications || '{}') 
    : product.specifications || {};

  // Price tiers (Alibaba.com style)
  const priceTiers = [
    { min: 1, max: 499, price: product.price.amount },
    { min: 500, max: 999, price: (product.price.amount * 0.97).toFixed(2) },
    { min: 1000, max: 9999, price: (product.price.amount * 0.95).toFixed(2) },
  ];

  // Color variations
  const colors = ['black', 'dark-red', 'cream', 'dark-blue', 'light-blue', 'grey', 'gold', 'white'];

  // Reviews
  const reviews = [
    {
      id: 1,
      user: 'H H***y',
      country: 'Saudi Arabia',
      rating: 1,
      text: 'products not match requirements, even if you confirm sample first.',
      date: 'Jul 17, 2020',
      verified: true,
    },
    {
      id: 2,
      user: 'U***e',
      country: 'Gibraltar',
      rating: 5,
      text: 'Everything is perfect',
      date: 'Jun 10, 2021',
      verified: true,
    },
    {
      id: 3,
      user: 'B***r',
      country: 'United States',
      rating: 3,
      text: 'Color will change after afew time of using',
      date: 'Nov 8, 2024',
      verified: true,
    },
  ];

  const handleAddToCart = () => {
    addToCart(product, product.minOrderQuantity);
  };

  const handleToggleFavorite = (isFav: boolean) => {
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleChat = () => {
    startProductChat(product, product.supplier?.id);
    router.push('/account?view=messages');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#03C4CB]">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-[#03C4CB]">Fabric & Textile Raw Material</Link>
            <ChevronRight size={14} />
            <Link href="/products?category=leather" className="hover:text-[#03C4CB]">Leather</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">Synthetic Leather</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          {/* Product Title and Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span>No reviews yet</span>
              <span>·</span>
              <span>1539 sold</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold">
                {product.supplier?.name?.[0] || 'S'}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{product.supplier?.name}</div>
                <div className="text-xs text-gray-600">
                  {product.supplier?.location === 'CN' ? '7 yrs' : '5 yrs'} · {product.supplier?.location}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Product Images */}
            <div>
              <div className="flex gap-4">
                {/* Thumbnails */}
                <div className="flex flex-col gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === idx
                          ? 'border-[#03C4CB]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                  {product.images[selectedImage] ? (
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
                    <LikeButton 
                      size="sm" 
                      checked={isFavorite(product.id)}
                      onChange={handleToggleFavorite}
                    />
                  </div>
                  <button className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover:opacity-100">
                    <ArrowLeft size={20} />
                  </button>
                  <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover:opacity-100">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Product Details */}
            <div>
              {/* Price Tiers */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <div className="space-y-2">
                  {priceTiers.map((tier, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {tier.min} - {tier.max === 9999 ? '∞' : tier.max} {product.price.unit}
                      </span>
                      <span className="font-bold text-gray-900">${tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variations - Color */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-900">Variations</span>
                  <span className="text-sm text-gray-600">Color</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded border-2 transition ${
                        selectedColor === color
                          ? 'border-[#03C4CB] ring-2 ring-[#03C4CB]/20'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: color === 'black' ? '#000' : color === 'dark-red' ? '#8B0000' : color === 'cream' ? '#FFFDD0' : color === 'dark-blue' ? '#00008B' : color === 'light-blue' ? '#ADD8E6' : color === 'grey' ? '#808080' : color === 'gold' ? '#FFD700' : '#FFFFFF',
                      }}
                      title={color}
                    />
                  ))}
                  <button className="w-10 h-10 rounded border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center text-xs font-semibold text-gray-600">
                    +4
                  </button>
                  <Link href="#" className="text-sm text-[#03C4CB] hover:underline ml-2">
                    Select now
                  </Link>
                </div>
              </div>

              {/* Shipping */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Shipping</h3>
                <p className="text-sm text-gray-600">
                  Shipping fee and delivery date to be negotiated. Chat with supplier now for more details.
                </p>
              </div>

              {/* Protections */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Protections for this product</h3>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Secure payments</h4>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {['VISA', 'Mastercard', 'AMEX', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                          <span key={method} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                            {method}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Every payment you make on Airavat is secured with strict SSL encryption and PCI DSS data protection protocols
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Standard refund policy</h4>
                      <p className="text-xs text-gray-600">
                        Claim a refund if your order doesn&apos;t ship, is missing, or arrives with product issues
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Airavat protects all your orders placed and paid on the platform with Trade Assurance
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="flex-1 bg-[#03C4CB] hover:bg-[#02A8B0] text-white py-3 rounded-lg font-semibold transition"
                >
                  Send Inquiry
                </button>
                <button
                  onClick={handleChat}
                  className="px-6 py-3 border-2 border-[#03C4CB] text-[#03C4CB] rounded-lg font-semibold hover:bg-[#E6F9FA] transition flex items-center gap-2"
                >
                  <MessageSquare size={20} />
                  Chat now
                </button>
              </div>
              
              {/* Inquiry Modal */}
              <InquiryModal
                isOpen={isInquiryModalOpen}
                onClose={() => setIsInquiryModalOpen(false)}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  minOrderQuantity: product.minOrderQuantity,
                }}
                supplierId={product.supplierId}
              />
            </div>
          </div>
        </div>

        {/* Product Spotlights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <StarIcon size={20} className="text-[#03C4CB]" />
            <h2 className="text-lg font-bold text-gray-900">Product spotlights</h2>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Supplier highlights</h3>
            <p className="text-sm text-gray-600">
              This seller mainly exports to the{' '}
              <span className="text-[#03C4CB] font-semibold">UAE, India, and Indonesia</span>, with a{' '}
              <span className="text-[#03C4CB] font-semibold">customer satisfaction rate of 33.3%</span>.
            </p>
          </div>
        </div>

        {/* Tabs: Attributes, Reviews, Supplier, Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-6 px-6">
              {[
                { id: 'attributes', label: 'Attributes' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'supplier', label: 'Supplier' },
                { id: 'description', label: 'Description' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-[#03C4CB] text-[#03C4CB] font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'attributes' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key attributes</h3>
                <div className="space-y-4">
                  {Object.entries(specs).slice(0, showMoreAttributes ? undefined : 10).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-semibold text-gray-900">{String(value)}</span>
                    </div>
                  ))}
                </div>
                {Object.keys(specs).length > 10 && (
                  <button
                    onClick={() => setShowMoreAttributes(!showMoreAttributes)}
                    className="mt-4 text-[#03C4CB] hover:underline flex items-center gap-1"
                  >
                    {showMoreAttributes ? 'Show less' : 'Show more'}
                    <ChevronDown size={16} className={showMoreAttributes ? 'rotate-180' : ''} />
                  </button>
                )}
                <div className="mt-6">
                  <button
                    onClick={() => setShowLeadTime(!showLeadTime)}
                    className="text-xl font-bold text-gray-900 flex items-center gap-2"
                  >
                    Lead time
                    <ChevronDown size={20} className={showLeadTime ? 'rotate-180' : ''} />
                  </button>
                  {showLeadTime && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Lead time: 7-15 days after order confirmation</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ratings & Reviews</h3>
                    <div className="flex items-center gap-4">
                      <button className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium">Product reviews (0)</button>
                      <button className="px-4 py-2 bg-[#03C4CB] text-white rounded-md text-sm font-medium">Store reviews (3)</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">All</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">With photos/videos (1)</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm flex items-center gap-1">
                      Rating <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Showing all reviews in your chosen language{' '}
                  <Link href="#" className="text-[#03C4CB] hover:underline">
                    Show original
                  </Link>
                </p>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#03C4CB] rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{review.user}</span>
                            <span className="text-xs text-gray-500">{review.country}</span>
                            {review.verified && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified purchase</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{review.date}</span>
                            <button className="flex items-center gap-1 hover:text-[#03C4CB]">
                              <ThumbsUp size={14} />
                              Helpful (0)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'supplier' && (
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Know your supplier</h3>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl font-bold">
                      {product.supplier?.name?.[0] || 'S'}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">{product.supplier?.name}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Trading Company - {product.supplier?.location === 'CN' ? '7' : '5'} yrs on Airavat
                      </div>
                      <div className="text-sm text-gray-600">Located in {product.supplier?.location}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Store performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">89.1%</div>
                        <div className="text-sm text-gray-600">On-time delivery rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">≤12h</div>
                        <div className="text-sm text-gray-600">Response Time</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-[#03C4CB] hover:bg-[#02A8B0] text-white px-6 py-2 rounded-lg font-medium transition">
                      Company profile
                    </button>
                    <button className="border-2 border-[#03C4CB] text-[#03C4CB] px-6 py-2 rounded-lg font-medium hover:bg-[#E6F9FA] transition">
                      More products
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Product descriptions from the supplier</h3>
                  <div className="border-b border-gray-200 mb-4">
                    <button className="px-4 py-2 border-b-2 border-[#03C4CB] text-[#03C4CB] font-semibold">
                      Product Description
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Product Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Other Recommendations */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Other recommendations for your business</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts.slice(0, 6).map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
                <div className="aspect-square bg-gray-100">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{p.name}</p>
                  <p className="text-lg font-bold text-[#03C4CB]">${p.price.amount}</p>
                  <p className="text-xs text-gray-500">MOQ: {p.minOrderQuantity} {p.price.unit}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed right-6 bottom-6 z-40">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group w-[50px] h-[50px] rounded-full bg-[rgb(20,20,20)] border-none font-semibold flex items-center justify-center shadow-[0px_0px_0px_4px_rgba(3,196,203,0.253)] cursor-pointer transition-all duration-300 overflow-hidden relative hover:w-[140px] hover:rounded-[50px] hover:bg-[#03C4CB]"
        >
          <svg 
            className="w-3 transition-all duration-300 group-hover:-translate-y-[200%]" 
            viewBox="0 0 384 512"
          >
            <path 
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" 
              fill="white"
            />
          </svg>
          <span className="absolute -bottom-5 text-white text-[0px] opacity-0 transition-all duration-300 group-hover:text-[13px] group-hover:opacity-100 group-hover:bottom-auto whitespace-nowrap">
            Back to Top
          </span>
        </button>
      </div>
    </div>
  );
}
