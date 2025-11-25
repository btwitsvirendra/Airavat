'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { catalogProducts } from '@/lib/data/catalog';
import { additionalProducts } from '@/lib/data/additional-products';
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
  Heart,
  Share2,
  X,
  Plus,
  Minus,
} from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import { motion } from 'framer-motion';

import RequestQuoteModal from '@/components/RequestQuoteModal';

// Combine products
const allProducts = [...catalogProducts, ...additionalProducts];

// Helper function to build breadcrumb path based on product category
function getBreadcrumbPath(product: typeof allProducts[0]): Array<{ name: string; href: string }> {
  const path = [{ name: 'Home', href: '/' }];

  // Check if product category matches Consumer Electronics
  const categoryLower = product.category?.toLowerCase() || '';
  const productNameLower = product.name?.toLowerCase() || '';

  if (categoryLower.includes('consumer') || categoryLower.includes('electronics') ||
    productNameLower.includes('smartphone') || productNameLower.includes('mobile') ||
    productNameLower.includes('phone')) {
    path.push({ name: 'Consumer Electronics', href: '/products?category=consumer-electronics' });
    path.push({ name: 'Mobile Phone & Accessories', href: '/products?category=mobile-phones' });
    path.push({ name: 'Smart phone', href: '/products?category=smartphones' });
    path.push({ name: '5G smartphone', href: '#' });
  } else if (categoryLower.includes('textile') || categoryLower.includes('fabric')) {
    path.push({ name: 'Fabric & Textile Raw Material', href: '/products?category=textiles' });
    if (productNameLower.includes('leather') || productNameLower.includes('synthetic')) {
      path.push({ name: 'Leather', href: '/products?category=leather' });
      path.push({ name: 'Synthetic Leather', href: '#' });
    } else {
      path.push({ name: product.category || 'Textiles', href: `/products?category=${product.categoryId || 'textiles'}` });
    }
  } else if (categoryLower.includes('machinery')) {
    path.push({ name: 'Machinery', href: '/products?category=machinery' });
    path.push({ name: product.category || 'Industrial Machinery', href: `/products?category=${product.categoryId || 'machinery'}` });
  } else if (categoryLower.includes('food')) {
    path.push({ name: 'Food & Beverage', href: '/products?category=food-beverage' });
    path.push({ name: product.category || 'Food Products', href: `/products?category=${product.categoryId || 'food'}` });
  } else {
    // Default: Home > Category > Product
    if (product.category) {
      path.push({ name: product.category, href: `/products?category=${product.categoryId || product.category.toLowerCase().replace(/\s+/g, '-')}` });
    }
  }

  return path;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const product = allProducts.find((p) => p.id === productId) || allProducts[0];
  const { addToCart, addToFavorites, removeFromFavorites, favorites, startProductChat } = useStore();
  const isFavorite = (productId: string) => favorites.some((p: any) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Multi');
  const [selectedSize, setSelectedSize] = useState('18L');
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const [activeTab, setActiveTab] = useState<'attributes' | 'reviews' | 'supplier' | 'description'>('attributes');
  const [showMoreAttributes, setShowMoreAttributes] = useState(false);
  const [showLeadTime, setShowLeadTime] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Color variants
  const colorVariants = [
    { bgcolor: 'bg-yellow-500', value: 'Multi' },
    { bgcolor: 'bg-blue-500', value: 'Blue' },
    { bgcolor: 'bg-pink-400', value: 'Pink' },
    { bgcolor: 'bg-black', value: 'Black' },
    { bgcolor: 'bg-red-600', value: 'Red' },
  ];

  // Size variants
  const sizeVariants = [
    {
      label: '18L',
      value: '18L',
      content: 'Perfect for a reasonable amount of snacks',
    },
    {
      label: '20L',
      value: '20L',
      content: 'Perfect for a reasonable amount of snacks',
    },
  ];

  // Parse specifications
  const specs = typeof product.specifications === 'string'
    ? JSON.parse(product.specifications || '{}')
    : product.specifications || {};

  // Price tiers (Airavat style)
  const priceTiers = [
    { min: 1, max: 499, price: product.price.amount },
    { min: 500, max: 999, price: (product.price.amount * 0.97).toFixed(2) },
    { min: 1000, max: 9999, price: (product.price.amount * 0.95).toFixed(2) },
  ];

  // Product previews - use product images
  const productPreviews = product.images.length > 0
    ? product.images.map(img => ({
      previewUrl: img,
      thumbUrl: img,
    }))
    : [{
      previewUrl: 'https://images.unsplash.com/photo-1524501537239-6e6d23b24ea8?w=800',
      thumbUrl: 'https://images.unsplash.com/photo-1524501537239-6e6d23b24ea8?w=800',
    }];

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
    addToCart(product, quantity);
  };

  const handleQuantityChange = (newQty: number) => {
    const minQty = product.minOrderQuantity;
    setQuantity(Math.max(minQty, newQty));
  };

  const handleToggleFavorite = (checked: boolean) => {
    if (checked) {
      // Button is now checked (liked) - add to favorites
      addToFavorites(product);
    } else {
      // Button is now unchecked (unliked) - remove from favorites
      removeFromFavorites(product.id);
    }
  };

  const handleChat = () => {
    startProductChat(product, product.supplier?.id);
    router.push('/account?view=messages');
  };

  // Get breadcrumb path
  const breadcrumbPath = getBreadcrumbPath(product);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F9FF' }}>
      <div className="max-w-[1920px] mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <ul className="flex items-center flex-wrap">
              {breadcrumbPath.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index === breadcrumbPath.length - 1 ? (
                    <span className="font-medium text-gray-600" style={{ fontSize: '0.75rem' }}>
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={item.href}
                        className="font-medium text-gray-900 hover:text-[#9A79FF] transition-colors"
                        style={{ fontSize: '0.75rem' }}
                      >
                        {item.name}
                      </Link>
                      <span className="px-1.5 text-gray-400" style={{ fontSize: '0.75rem' }}> / </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

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
              <div className="text-center flex-grow py-6 cursor-pointer relative h-[400px]">
                <Image
                  src={productPreviews[selectedImage].previewUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <ul className="flex gap-3 items-center overflow-x-auto scrollbar-hide">
                {productPreviews.map((preview, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="flex-shrink-0"
                  >
                    <li
                      className={`w-24 h-24 inline-flex justify-center items-center bg-white rounded border-2 cursor-pointer transition relative overflow-hidden ${selectedImage === i
                        ? 'border-[#9A79FF]'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <Image
                        src={preview.thumbUrl}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </li>
                  </button>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="px-6 py-12">
              <div className="mb-6 lg:mb-12">
                <h1 className="text-2xl leading-tight font-medium mb-4 text-gray-900">
                  {product.name}
                </h1>

                {/* Tiered Pricing Display */}
                {/* Tiered Pricing Display */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Volume Pricing</span>
                    <span className="text-xs text-[#3373FF] font-medium cursor-pointer hover:underline">View details</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {priceTiers.map((tier, idx) => (
                      <div key={idx} className={`p-2 rounded border ${idx === 0 ? 'bg-white border-[#3373FF] shadow-sm' : 'border-transparent'}`}>
                        <div className="text-xs text-gray-500 mb-1">{tier.min}{tier.max < 9999 ? `-${tier.max}` : '+'} pcs</div>
                        <div className={`font-bold ${idx === 0 ? 'text-[#3373FF]' : 'text-gray-900'}`}>
                          {product.price.currency} {Number(tier.price).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form action="#!">
                  {/* Color Variants */}
                  <div className="mb-6">
                    <h5 className="font-medium mb-2 text-gray-900">
                      Color:{' '}
                      <span className="opacity-50">
                        {selectedColor &&
                          colorVariants.find((color) => color.value === selectedColor)?.value}
                      </span>
                    </h5>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {colorVariants.map((item, i) => (
                        <div key={i}>
                          <input
                            type="radio"
                            className="absolute hidden"
                            autoComplete="off"
                            checked={selectedColor === item.value}
                            onChange={() => setSelectedColor(item.value)}
                            name="color"
                          />
                          <label
                            className={`w-8 h-8 rounded-full ${item.bgcolor} border-2 border-white cursor-pointer mt-1 hover:outline hover:outline-2 hover:outline-[#9A79FF] ${selectedColor === item.value &&
                              'outline outline-2 outline-[#9A79FF]'
                              }`}
                            onClick={() => setSelectedColor(item.value)}
                          ></label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size Variants */}
                  <div className="mb-6">
                    <h5 className="font-medium mb-2 text-gray-900">
                      Size:{' '}
                      <span className="opacity-50">
                        {selectedSize &&
                          sizeVariants.find((size) => size.label === selectedSize)?.label}
                      </span>
                    </h5>
                    <div className="flex gap-2 mb-2">
                      {sizeVariants.map((size, index) => (
                        <div key={size.label}>
                          <input
                            type="radio"
                            className="sr-only"
                            autoComplete="off"
                            checked={selectedSize === size.value}
                            onChange={() => setSelectedSize(size.value)}
                            name="size"
                          />
                          <label
                            className={`bg-gray-100 cursor-pointer rounded-md flex flex-col overflow-hidden text-start border-2 border-white ${selectedSize === size.label &&
                              'outline outline-1 outline-[#9A79FF]'
                              } hover:outline-[#9A79FF] px-4 py-3`}
                            onClick={() => setSelectedSize(size.value)}
                          >
                            <b className="mb-2 text-gray-900">{size.label}</b>
                            <span className="text-sm opacity-75 mb-2 text-gray-600">{size.content}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <h5 className="font-medium mb-2 text-gray-900">QTY</h5>
                    <div className="h-11 border border-gray-300 rounded-full flex w-36 relative mt-4 overflow-hidden">
                      <button
                        className="w-full pb-1 inline-flex justify-center items-center text-2xl font-medium border-r border-gray-300 text-[#9A79FF] hover:bg-[#9A79FF] hover:bg-opacity-20"
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                      >
                        <Minus size={20} />
                      </button>
                      <input
                        className="text-lg font-bold px-4 pl-5 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none text-gray-900"
                        type="number"
                        placeholder=""
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.minOrderQuantity)}
                        min={product.minOrderQuantity}
                      />
                      <button
                        className="w-full pb-1 inline-flex justify-center items-center text-2xl font-medium border-l border-gray-300 text-[#9A79FF] hover:bg-[#9A79FF] hover:bg-opacity-10"
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 w-full my-7">
                    <div className="flex items-center gap-4 w-full max-w-lg">
                      <button
                        onClick={handleAddToCart}
                        className="bg-[#9A79FF] border border-[#9A79FF] text-white text-sm rounded uppercase hover:bg-[#8A69EF] px-10 py-2.5 h-10 md:px-12 w-1/2 transition-colors"
                      >
                        Add To Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsInquiryModalOpen(true)}
                        className="border border-[#3373FF] text-[#3373FF] hover:bg-[#3373FF] hover:text-white text-sm rounded uppercase px-6 py-2.5 h-10 md:px-12 w-1/2 flex items-center justify-center transition-colors font-medium"
                      >
                        Request Quote
                      </button>
                    </div>
                    <div className="flex items-center gap-4 w-full">
                      <button
                        onClick={() => handleToggleFavorite(!isFavorite(product.id))}
                        className="hover:bg-[#9A79FF] rounded hover:bg-opacity-10 text-[#9A79FF] px-3 py-2 flex items-center gap-2 transition-colors"
                      >
                        <Heart size={18} className={isFavorite(product.id) ? 'fill-[#9A79FF]' : ''} />
                        <span>Add to wishlist</span>
                      </button>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: product.name,
                              text: `Check out ${product.name} on Airavat`,
                              url: `${window.location.origin}/products/${product.id}`
                            });
                          } else {
                            navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`);
                          }
                        }}
                        className="hover:bg-[#9A79FF] rounded hover:bg-opacity-10 text-[#9A79FF] px-3 py-2 flex items-center gap-2 transition-colors"
                      >
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Product Spotlights */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <StarIcon size={20} className="text-[#9A79FF]" />
              <h2 className="text-lg font-bold text-gray-900">Product spotlights</h2>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Supplier highlights</h3>
              <p className="text-sm text-gray-600">
                This seller mainly exports to the{' '}
                <span className="text-[#9A79FF] font-semibold">UAE, India, and Indonesia</span>, with a{' '}
                <span className="text-[#9A79FF] font-semibold">customer satisfaction rate of 33.3%</span>.
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
                    className={`py-4 px-2 border-b-2 transition ${activeTab === tab.id
                      ? 'border-[#9A79FF] text-[#9A79FF] font-semibold'
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
                      className="mt-4 text-[#9A79FF] hover:underline flex items-center gap-1"
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
                        <button className="px-4 py-2 bg-[#9A79FF] text-white rounded-md text-sm font-medium">Store reviews (3)</button>
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
                    <Link href="#" className="text-[#9A79FF] hover:underline">
                      Show original
                    </Link>
                  </p>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-[#9A79FF] rounded-full flex items-center justify-center text-white font-semibold">
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
                              <button className="flex items-center gap-1 hover:text-[#9A79FF]">
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
                      <button
                        onClick={handleChat}
                        className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
                      >
                        <MessageSquare size={18} />
                        Chat Now
                      </button>
                      <button className="border-2 border-[#9A79FF] text-[#9A79FF] px-6 py-2 rounded-lg font-medium hover:bg-[rgba(154,121,255,0.1)] transition">
                        Company profile
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Product descriptions from the supplier</h3>
                    <div className="border-b border-gray-200 mb-4">
                      <button className="px-4 py-2 border-b-2 border-[#9A79FF] text-[#9A79FF] font-semibold">
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
                  <div className="aspect-square bg-gray-100 relative">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{p.name}</p>
                    <p className="text-lg font-bold text-[#9A79FF]">${p.price.amount}</p>
                    <p className="text-xs text-gray-500">MOQ: {p.minOrderQuantity} {p.price.unit}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <RequestQuoteModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          product={product}
        />
      </div>
    </div>
  );
}
