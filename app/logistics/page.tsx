'use client';

import { useState } from 'react';
import { Truck, Package, MapPin, Calendar, Weight, Ruler, IndianRupee, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<'book' | 'bookings'>('book');
  const [formData, setFormData] = useState({
    orderId: '',
    vehicleType: 'truck',
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    pickupPincode: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPincode: '',
    weight: '',
    length: '',
    width: '',
    height: '',
  });

  // Mock bookings data
  const bookings = [
    {
      id: 'TB001',
      orderId: 'ORD-2024-001',
      supplier: 'TechLight Industries',
      pickupCity: 'Mumbai',
      deliveryCity: 'Delhi',
      vehicleType: 'truck',
      status: 'in_transit',
      trackingId: 'TRK789456123',
      estimatedDelivery: '2024-11-10',
      cost: 15000,
    },
    {
      id: 'TB002',
      orderId: 'ORD-2024-002',
      supplier: 'Textile Hub',
      pickupCity: 'Surat',
      deliveryCity: 'Bangalore',
      vehicleType: 'container',
      status: 'delivered',
      trackingId: 'TRK123789456',
      deliveredOn: '2024-11-03',
      cost: 25000,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateEstimate = () => {
    // Simple estimation logic
    const basePrice = formData.vehicleType === 'truck' ? 5000 : formData.vehicleType === 'van' ? 3000 : 8000;
    const weightCharge = parseFloat(formData.weight || '0') * 10;
    const volumeCharge = (parseFloat(formData.length || '0') * parseFloat(formData.width || '0') * parseFloat(formData.height || '0')) / 1000;
    return Math.round(basePrice + weightCharge + volumeCharge);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Transport booking submitted! You will receive confirmation shortly.');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_transit':
        return <span className="badge bg-blue-100 text-blue-800">In Transit</span>;
      case 'delivered':
        return <span className="badge badge-success">Delivered</span>;
      case 'confirmed':
        return <span className="badge badge-info">Confirmed</span>;
      default:
        return <span className="badge badge-warning">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-regal-blue-800 mb-2">Transport & Logistics</h1>
          <p className="text-gray-600">Book reliable transport services for your orders</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'book'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Book Transport
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'bookings'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Bookings ({bookings.length})
            </button>
          </div>
        </div>

        {activeTab === 'book' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
                {/* Order Details */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order ID
                      </label>
                      <input
                        type="text"
                        name="orderId"
                        value={formData.orderId}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="ORD-2024-001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Type
                      </label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      >
                        <option value="van">Van (Small loads)</option>
                        <option value="truck">Truck (Medium loads)</option>
                        <option value="container">Container (Large loads)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pickup Address */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="text-green-600" size={24} />
                    Pickup Address
                  </h2>
                  <div className="space-y-4">
                    <textarea
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      className="input-field"
                      rows={2}
                      placeholder="Street address"
                      required
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="pickupCity"
                        value={formData.pickupCity}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="City"
                        required
                      />
                      <input
                        type="text"
                        name="pickupState"
                        value={formData.pickupState}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="State"
                        required
                      />
                      <input
                        type="text"
                        name="pickupPincode"
                        value={formData.pickupPincode}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Pincode"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="text-red-600" size={24} />
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      className="input-field"
                      rows={2}
                      placeholder="Street address"
                      required
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="deliveryCity"
                        value={formData.deliveryCity}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="City"
                        required
                      />
                      <input
                        type="text"
                        name="deliveryState"
                        value={formData.deliveryState}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="State"
                        required
                      />
                      <input
                        type="text"
                        name="deliveryPincode"
                        value={formData.deliveryPincode}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Pincode"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Package Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Weight size={16} />
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g., 500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Ruler size={16} />
                        Dimensions (cm)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          name="length"
                          value={formData.length}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="L"
                          required
                        />
                        <input
                          type="number"
                          name="width"
                          value={formData.width}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="W"
                          required
                        />
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="H"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary">
                  Submit Booking Request
                </button>
              </form>
            </div>

            {/* Price Estimate */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Estimated Cost</h3>
                <div className="text-center mb-6">
                  <p className="text-5xl font-bold text-regal-blue-700 mb-2">
                    ₹{calculateEstimate().toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Approximate cost</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-medium">
                      ₹{formData.vehicleType === 'truck' ? '5,000' : formData.vehicleType === 'van' ? '3,000' : '8,000'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight Charges</span>
                    <span className="font-medium">
                      ₹{(parseFloat(formData.weight || '0') * 10).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume Charges</span>
                    <span className="font-medium">
                      ₹{Math.round((parseFloat(formData.length || '0') * parseFloat(formData.width || '0') * parseFloat(formData.height || '0')) / 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  * Final cost may vary based on actual distance and additional services
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Vehicle Types</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="text-teal-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Van</p>
                      <p className="text-sm text-gray-600">Up to 1 ton, ideal for small loads</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="text-teal-600 mt-1" size={24} />
                    <div>
                      <p className="font-medium">Truck</p>
                      <p className="text-sm text-gray-600">Up to 10 tons, for medium loads</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="text-teal-600 mt-1" size={28} />
                    <div>
                      <p className="font-medium">Container</p>
                      <p className="text-sm text-gray-600">20-40 ft, for large bulk orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <Truck className="text-teal-600" size={32} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {booking.pickupCity} → {booking.deliveryCity}
                        </h3>
                        <p className="text-gray-600">{booking.supplier}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Booking ID</p>
                        <p className="font-medium">{booking.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tracking ID</p>
                        <p className="font-medium">{booking.trackingId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Vehicle</p>
                        <p className="font-medium capitalize">{booking.vehicleType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cost</p>
                        <p className="font-bold text-lg text-regal-blue-700">
                          ₹{booking.cost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {booking.status === 'in_transit' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="text-blue-600" size={18} />
                          <span className="text-sm text-gray-700">
                            Estimated Delivery: {booking.estimatedDelivery}
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          Track Shipment
                        </button>
                      </div>
                    )}

                    {booking.status === 'delivered' && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={18} />
                        <span className="text-sm text-gray-700">
                          Delivered on {booking.deliveredOn}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
