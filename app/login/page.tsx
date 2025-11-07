'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Phone, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handlePhoneLogin = () => {
    toast.success('Redirecting to phone login...');
    router.push('/dashboard');
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`Logging in with ${provider}...`);
    setTimeout(() => router.push('/dashboard'), 1000);
  };

  const handleEmailContinue = () => {
    if (email) {
      toast.success('Continuing with email...');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center">
              <span className="text-2xl">🐘</span>
            </div>
            <span className="text-3xl font-bold text-regal-blue">Airavat</span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-regal-blue text-white rounded-lg hover:bg-regal-blue-600 transition-colors">
              English ▼
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-8 py-12">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-12">
          <div className="text-center space-y-6">
            <div className="relative w-full max-w-md mx-auto">
              {/* Illustration placeholder - Indian B2B theme */}
              <div className="aspect-square bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm border-8 border-white/30">
                <div className="space-y-4">
                  <div className="text-8xl">🐘</div>
                  <div className="flex justify-center space-x-4">
                    <div className="w-16 h-16 bg-teal rounded-lg flex items-center justify-center text-2xl animate-bounce">
                      📦
                    </div>
                    <div className="w-16 h-16 bg-royal-gold rounded-lg flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                      ₹
                    </div>
                  </div>
                  <div className="text-2xl">🛡️</div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-10 left-10 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                ₹
              </div>
              <div className="absolute bottom-10 right-10 w-12 h-12 bg-royal-gold rounded-full flex items-center justify-center shadow-lg text-2xl">
                💰
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-gray-600">Use your last sign in method</p>
            </div>

            {/* Sign In Options */}
            <div className="space-y-4">
              {/* Phone Login */}
              <button
                onClick={handlePhoneLogin}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-teal hover:bg-teal-50 transition-all group"
              >
                <Phone className="w-5 h-5 text-teal group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-gray-700 group-hover:text-teal">
                  Continue with Phone
                </span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
                </div>
              </div>

              {/* Google Login */}
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-semibold text-gray-700">Continue with Google</span>
              </button>

              {/* Zoho Login */}
              <button
                onClick={() => handleSocialLogin('Zoho')}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <span className="text-sm font-bold text-red-600">Z</span>
                    <span className="text-sm font-bold text-orange-500">O</span>
                    <span className="text-sm font-bold text-yellow-500">H</span>
                    <span className="text-sm font-bold text-blue-600">O</span>
                  </div>
                </div>
                <span className="font-semibold text-gray-700">Continue with Zoho</span>
              </button>

              {/* Facebook Login */}
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-semibold text-gray-700">Continue with Facebook</span>
              </button>

              {/* LinkedIn Login */}
              <button
                onClick={() => handleSocialLogin('LinkedIn')}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <svg className="w-6 h-6" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="font-semibold text-gray-700">Continue with Linkedin</span>
              </button>
            </div>

            {/* Create Account Link */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                New to AiravatSupplies.com?{' '}
                <Link
                  href="/register"
                  className="font-semibold text-teal hover:text-teal-700 transition-colors"
                >
                  Create New Account
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="text-center pt-8">
              <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
                <span>Powered with</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>CamScanner</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
