'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ArrowLeft, Truck, MapPin, Package, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface LogisticsBooking {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  vehicleType: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  estimatedCost: number;
  status: 'requested' | 'confirmed' | 'in_transit' | 'delivered';
  trackingId?: string;
  createdAt: Date;
  estimatedDelivery?: Date;
}

export default function LogisticsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useStore();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookings, setBookings] = useState<LogisticsBooking[]>([]);

  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupCity: '',
    pickupPincode: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryPincode: '',
    vehicleType: '',
    weight: '',
    length: '',
    width: '',
    height: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleBookLogistics = () => {
    if (!formData.pickupAddress || !formData.deliveryAddress || !formData.vehicleType) {
      toast.error('Please fill all required fields');
      return;
    }

    const estimatedCost = Math.floor(Math.random() * 5000) + 2000; // Random cost for demo

    const newBooking: LogisticsBooking = {
      id: `LOG-${Date.now()}`,
      pickupAddress: `${formData.pickupAddress}, ${formData.pickupCity} - ${formData.pickupPincode}`,
      deliveryAddress: `${formData.deliveryAddress}, ${formData.deliveryCity} - ${formData.deliveryPincode}`,
      vehicleType: formData.vehicleType,
      weight: parseFloat(formData.weight) || 0,
      dimensions: {
        length: parseFloat(formData.length) || 0,
        width: parseFloat(formData.width) || 0,
        height: parseFloat(formData.height) || 0,
      },
      estimatedCost,
      status: 'requested',
      trackingId: `TRK${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    };

    setBookings([newBooking, ...bookings]);
    toast.success(`Logistics booked! Tracking ID: ${newBooking.trackingId}`);
    setFormData({
      pickupAddress: '',
      pickupCity: '',
      pickupPincode: '',
      deliveryAddress: '',
      deliveryCity: '',
      deliveryPincode: '',
      vehicleType: '',
      weight: '',
      length: '',
      width: '',
      height: '',
    });
    setShowBookingForm(false);
  };

  const getStatusColor = (status: LogisticsBooking['status']) => {
    switch (status) {
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-teal mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Account</span>
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-teal/10 p-3 rounded-lg">
                <Truck className="text-teal" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Logistics</h1>
                <p className="text-sm text-gray-600">Book and track your shipments</p>
              </div>
            </div>

            {!showBookingForm && (
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition font-medium"
              >
                Book New Logistics
              </button>
            )}

            {showBookingForm && (
              <Link href="#" className="text-teal text-sm hover:underline">
                How to Use ?
              </Link>
            )}
          </div>

          {/* Content */}
          {showBookingForm ? (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Book Logistics Service</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={20} className="text-green-600" />
                    Pickup Details
                  </h4>
                  <input
                    type="text"
                    placeholder="Pickup Address"
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.pickupCity}
                    onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={formData.pickupPincode}
                    onChange={(e) => setFormData({ ...formData, pickupPincode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                {/* Delivery Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={20} className="text-red-600" />
                    Delivery Details
                  </h4>
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.deliveryCity}
                    onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={formData.deliveryPincode}
                    onChange={(e) => setFormData({ ...formData, deliveryPincode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
              </div>

              {/* Package Details */}
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Package size={20} className="text-teal" />
                  Package Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                    <option value="container">Container</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Length (cm)"
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <input
                    type="number"
                    placeholder="Width (cm)"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <input
                    type="number"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleBookLogistics}
                  className="flex-1 bg-teal text-white py-4 rounded-lg hover:bg-teal-600 transition font-semibold"
                >
                  Book Logistics
                </button>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Truck className="mx-auto text-gray-400 mb-4" size={64} />
                  <p className="text-gray-600 mb-6">No logistics bookings yet</p>
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Truck size={20} />
                    Book Your First Logistics
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">{booking.id}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          {booking.trackingId && (
                            <p className="text-sm text-gray-600">
                              Tracking ID: <span className="font-mono">{booking.trackingId}</span>
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-teal">₹{booking.estimatedCost}</p>
                          <p className="text-xs text-gray-600">Estimated Cost</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                            <MapPin size={16} className="text-green-600" />
                            Pickup
                          </p>
                          <p className="text-sm text-gray-600">{booking.pickupAddress}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                            <MapPin size={16} className="text-red-600" />
                            Delivery
                          </p>
                          <p className="text-sm text-gray-600">{booking.deliveryAddress}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Vehicle: {booking.vehicleType}</span>
                        <span>Weight: {booking.weight} kg</span>
                        <span>
                          Dimensions: {booking.dimensions.length}x{booking.dimensions.width}x
                          {booking.dimensions.height} cm
                        </span>
                        {booking.estimatedDelivery && (
                          <span>
                            Est. Delivery: {booking.estimatedDelivery.toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                          Track Shipment
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
