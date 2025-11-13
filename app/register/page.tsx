'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Globe, Lock, User, Building2, Phone } from 'lucide-react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useStore();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    role: 'buyer' as 'buyer' | 'seller',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // Demo registration - in production, this would call your API
    setUser({
      id: 'user-' + Date.now(),
      email: formData.email,
      name: formData.full_name,
      full_name: formData.full_name,
      role: formData.role,
      phone: formData.phone,
      company: formData.company,
      status: 'active',
      is_verified: false,
      email_verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    toast.success('Account created successfully!');
    router.push('/account');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Promotional */}
      <div className="hidden lg:flex lg:w-2/3 bg-gradient-to-br from-[#03C4CB] via-[#04D4DD] to-[#05E4ED] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Join Airavat
            <br />
            <span className="text-yellow-200">India&apos;s leading B2B marketplace</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Connect with thousands of verified suppliers and buyers for seamless global trade
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">✓</span>
              </div>
              <span>Verified suppliers and buyers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">✓</span>
              </div>
              <span>Secure payment processing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">✓</span>
              </div>
              <span>Trade assurance protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-1/3 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#03C4CB]">
              Airavat
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe size={16} />
              <select className="bg-transparent border-none outline-none cursor-pointer">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
            <p className="text-gray-600 mb-8">Join thousands of businesses trading on Airavat</p>

            {/* Role Selection */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setFormData({ ...formData, role: 'buyer' })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition ${
                  formData.role === 'buyer'
                    ? 'border-[#03C4CB] bg-[#E6F9FA] text-[#03C4CB]'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">I&apos;m a Buyer</div>
                <div className="text-xs mt-1">Source products from suppliers</div>
              </button>
              <button
                onClick={() => setFormData({ ...formData, role: 'seller' })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition ${
                  formData.role === 'seller'
                    ? 'border-[#03C4CB] bg-[#E6F9FA] text-[#03C4CB]'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">I&apos;m a Supplier</div>
                <div className="text-xs mt-1">Sell products to buyers</div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {formData.role === 'buyer' && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name (Optional)
                  </label>
                  <div className="relative">
                    <Building2 size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Enter your company name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a password (min. 8 characters)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03C4CB] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#03C4CB] hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#03C4CB] hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#03C4CB] hover:bg-[#02A8B0] text-white py-3 rounded-lg font-semibold transition"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-[#03C4CB] hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
