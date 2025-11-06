'use client';

import { Star, MapPin, Phone, Mail, Clock, CheckCircle, TrendingUp, MessageSquare, Package } from 'lucide-react';
import Link from 'next/link';

export default function SupplierProfile({ params }: { params: { id: string } }) {
  // Mock data
  const supplier = {
    id: params.id,
    name: 'TechLight Industries',
    businessName: 'TechLight Industries Pvt. Ltd.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    rating: 4.8,
    totalReviews: 342,
    location: 'Mumbai, Maharashtra',
    yearEstablished: 2015,
    verified: true,
    responseTime: '< 2 hours',
    totalOrders: 1250,
    description: 'Leading manufacturer and supplier of industrial LED lighting solutions. We specialize in energy-efficient lighting for warehouses, factories, and commercial spaces. ISO 9001:2015 certified with in-house R&D facility.',
    products: [
      {
        id: '1',
        name: 'Industrial LED Light 100W',
        price: 1250,
        image: 'https://images.unsplash.com/photo-1524501537239-6e6d23b24ea8?w=300',
        minOrder: 50,
      },
      {
        id: '2',
        name: 'LED Flood Light 200W',
        price: 2100,
        image: 'https://images.unsplash.com/photo-1565372455536-4f2a6b6d4e5d?w=300',
        minOrder: 25,
      },
      {
        id: '3',
        name: 'Street Light LED 150W',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=300',
        minOrder: 100,
      },
    ],
    certifications: ['ISO 9001:2015', 'CE Certified', 'BIS Approved'],
    contact: {
      phone: '+91 98765 43210',
      email: 'sales@techlight.com',
      address: 'Plot No. 45, MIDC Industrial Area, Andheri East, Mumbai - 400093',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${supplier.banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-regal-blue-900/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        {/* Supplier Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={supplier.logo}
              alt={supplier.name}
              className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    {supplier.name}
                    {supplier.verified && (
                      <CheckCircle className="text-green-500" size={28} />
                    )}
                  </h1>
                  <p className="text-gray-600">{supplier.businessName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={20} />
                  <span className="font-semibold text-lg">{supplier.rating}</span>
                  <span className="text-gray-500">({supplier.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  {supplier.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  Response: {supplier.responseTime}
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/messages?supplier=${supplier.id}`} className="btn-primary flex items-center gap-2">
                  <MessageSquare size={20} />
                  Chat Now
                </Link>
                <button className="border border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About Company</h2>
              <p className="text-gray-600 leading-relaxed">{supplier.description}</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Package className="mx-auto text-teal-600 mb-2" size={32} />
                <p className="text-3xl font-bold text-regal-blue-700">{supplier.totalOrders}+</p>
                <p className="text-gray-600">Total Orders</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <TrendingUp className="mx-auto text-green-600 mb-2" size={32} />
                <p className="text-3xl font-bold text-regal-blue-700">{supplier.yearEstablished}</p>
                <p className="text-gray-600">Year Established</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Star className="mx-auto text-yellow-500 mb-2" size={32} />
                <p className="text-3xl font-bold text-regal-blue-700">{supplier.rating}/5</p>
                <p className="text-gray-600">Avg Rating</p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {supplier.products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold text-regal-blue-700">₹{product.price}</p>
                        <p className="text-xs text-gray-500">Min: {product.minOrder} units</p>
                      </div>
                      <button className="text-teal-600 hover:text-teal-700 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-teal-600 font-semibold hover:text-teal-700">
                View All Products →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="text-teal-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{supplier.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-teal-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{supplier.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-teal-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{supplier.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Certifications</h3>
              <div className="space-y-2">
                {supplier.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                  Save Supplier
                </button>
                <button className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                  Share Profile
                </button>
                <button className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12" />
    </div>
  );
}
