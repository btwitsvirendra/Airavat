'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Globe, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - in production, this would call your API
    setUser({
      id: 'user-001',
      email: email || 'demo@airavat.com',
      full_name: 'Virendra',
      name: 'Virendra',
      role: 'buyer',
      phone: '+91 98765 43210',
      company: 'Demo Business',
      status: 'active',
      is_verified: true,
      email_verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    toast.success('Signed in successfully!');
    router.push('/account');
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`Signing in with ${provider}...`);
    // In production, implement OAuth flow
    setUser({
      id: 'user-001',
      email: `demo@${provider.toLowerCase()}.com`,
      full_name: 'Virendra',
      name: 'Virendra',
      role: 'buyer',
      phone: '+91 98765 43210',
      company: 'Demo Business',
      status: 'active',
      is_verified: true,
      email_verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    router.push('/account');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Promotional */}
      <div className="hidden lg:flex lg:w-2/3 bg-gradient-to-br from-[#FF6A00] via-[#FF8C00] to-[#FFA500] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Global B2B sourcing with
            <br />
            <span className="text-yellow-200">order protection and great savings</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Connect with verified Indian suppliers and businesses for seamless global trade
          </p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🚚</span>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🌍</span>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">📦</span>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign In Form */}
      <div className="w-full lg:w-1/3 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#FF6A00]">
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

        {/* Sign In Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
            <p className="text-gray-600 mb-8">Use your last sign-in method</p>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition font-medium"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                  G
                </div>
                Continue with Google
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition font-medium"
              >
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                  f
                </div>
                Continue with Facebook
              </button>

              <button
                onClick={() => handleSocialLogin('LinkedIn')}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition font-medium"
              >
                <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
                  in
                </div>
                Continue with LinkedIn
              </button>

              <button
                onClick={() => handleSocialLogin('Email')}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition font-medium"
              >
                <Mail size={20} className="text-gray-600" />
                Continue with email
              </button>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF6A00] hover:bg-[#E55A00] text-white py-3 rounded-lg font-semibold transition"
              >
                Sign in
              </button>
            </form>

            <p className="text-center text-gray-600 mb-8">
              New to Airavat?{' '}
              <Link href="/register" className="text-[#FF6A00] hover:underline font-semibold">
                Create an account
              </Link>
            </p>

            {/* Additional Options */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <Link
                href="/supplier/login"
                className="flex items-center gap-3 text-gray-600 hover:text-[#FF6A00] transition"
              >
                <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs">📦</span>
                </div>
                Supplier sign-in
              </Link>
              <Link
                href="/login/qr"
                className="flex items-center gap-3 text-gray-600 hover:text-[#FF6A00] transition"
              >
                <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs">◻◻</span>
                </div>
                Sign in with QR code
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
