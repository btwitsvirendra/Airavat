'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Star,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  Package,
  TrendingUp,
  MessageSquare,
  Share2,
  Award,
  ShieldCheck,
  Truck,
  Clock,
} from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import { catalogProducts } from '@/lib/data/catalog';
import { motion } from 'framer-motion';

// Mock supplier data matching database schema
const supplierData = {
  business_id: 'b1',
  business_name: 'TechLight Industries',
  display_name: 'TechLight Industries',
  company_legal_name: 'TechLight Industries Private Limited',
  description: 'Leading manufacturer of industrial LED lighting solutions and electrical equipment. We specialize in high-quality, energy-efficient products for commercial and industrial applications.',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  pincode: '400001',
  primary_contact_phone: '+91 22 1234 5678',
  primary_contact_email: 'contact@techlight.com',
  website_url: 'https://www.techlight.com',
  year_established: 2010,
  employee_count: '50-100',
  is_verified: true,
  verification_level: 'gold',
  gst_number: '27AABCU9603R1ZM',
  pan_number: 'AABCU9603R',
  address_line1: '123 Industrial Estate',
  address_line2: 'Andheri East',
  rating: 4.8,
  total_products: 120,
  response_rate: '98%',
  response_time: '< 24h',
  on_time_delivery: '95%',
  transaction_level: 'High',
};

export default function SupplierProfilePage() {
  const params = useParams();
  const supplierId = params?.id as string;
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'reviews'>('products');
  
  // Filter products by this supplier
  const supplierProducts = catalogProducts.filter((p) => p.supplierId === 's1' || p.businessId === supplierId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Supplier Header - Alibaba.com Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Supplier Logo/Info */}
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-[#03C4CB] to-[#04D4DD] rounded-lg flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                {supplierData.business_name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{supplierData.display_name}</h1>
                  {supplierData.is_verified && (
                    <CheckCircle2 size={24} className="text-[#03C4CB]" />
                  )}
                  {supplierData.verification_level === 'gold' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      Gold Supplier
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{supplierData.rating}</span>
                    <span className="text-gray-500">({Math.floor(Math.random() * 500) + 100} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{supplierData.total_products} Products</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>{supplierData.city}, {supplierData.state}, {supplierData.country}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 md:ml-auto">
              <button className="px-6 py-2 bg-[#03C4CB] hover:bg-[#02A8B0] text-white rounded-md font-medium transition flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                Contact Supplier
              </button>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <LikeButton size="sm" />
                  <span>Follow</span>
                </div>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Stats - Alibaba.com Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#03C4CB] mb-1">{supplierData.response_rate}</div>
              <div className="text-xs text-gray-600">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#03C4CB] mb-1">{supplierData.response_time}</div>
              <div className="text-xs text-gray-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#03C4CB] mb-1">{supplierData.on_time_delivery}</div>
              <div className="text-xs text-gray-600">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#03C4CB] mb-1">{supplierData.transaction_level}</div>
              <div className="text-xs text-gray-600">Transaction Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Company Info */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-4">
              <h3 className="font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-gray-600 mb-1">Business Type</div>
                  <div className="font-medium text-gray-900">Manufacturer, Trading Company</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Year Established</div>
                  <div className="font-medium text-gray-900">{supplierData.year_established}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Employees</div>
                  <div className="font-medium text-gray-900">{supplierData.employee_count}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Location</div>
                  <div className="font-medium text-gray-900">
                    {supplierData.address_line1}, {supplierData.address_line2}
                    <br />
                    {supplierData.city}, {supplierData.state} {supplierData.pincode}
                    <br />
                    {supplierData.country}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Contact</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{supplierData.primary_contact_phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{supplierData.primary_contact_email}</span>
                    </div>
                    {supplierData.website_url && (
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-gray-400" />
                        <a href={supplierData.website_url} target="_blank" rel="noopener noreferrer" className="font-medium text-[#03C4CB] hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">GST Number</div>
                  <div className="font-medium text-gray-900">{supplierData.gst_number}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">PAN Number</div>
                  <div className="font-medium text-gray-900">{supplierData.pan_number}</div>
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Verification</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#03C4CB]" />
                  <span className="text-sm text-gray-700">Trade Assurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-[#03C4CB]" />
                  <span className="text-sm text-gray-700">Verified Supplier</span>
                </div>
                {supplierData.verification_level === 'gold' && (
                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-700">Gold Supplier</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-6 py-4 font-medium transition ${
                    activeTab === 'products'
                      ? 'text-[#03C4CB] border-b-2 border-[#03C4CB]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Products ({supplierProducts.length})
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-6 py-4 font-medium transition ${
                    activeTab === 'about'
                      ? 'text-[#03C4CB] border-b-2 border-[#03C4CB]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 font-medium transition ${
                    activeTab === 'reviews'
                      ? 'text-[#03C4CB] border-b-2 border-[#03C4CB]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'products' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {supplierProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition"
                      >
                        <div className="aspect-square bg-gray-100 relative">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package size={48} />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-900">₹{product.price.amount.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">/{product.price.unit}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            MOQ: {product.minOrderQuantity} {product.price.unit}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Company Description</h3>
                      <p className="text-gray-600 leading-relaxed">{supplierData.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Main Products</h3>
                      <div className="flex flex-wrap gap-2">
                        {['LED Lights', 'Industrial Lighting', 'Electrical Equipment', 'Energy Solutions'].map((product) => (
                          <span key={product} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                            U{review}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm font-medium text-gray-900">Excellent Product</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Great quality and fast delivery. Highly recommended supplier for industrial lighting solutions.
                            </p>
                            <div className="text-xs text-gray-500">By Buyer • {new Date().toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
