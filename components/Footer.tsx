'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1920px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Get support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/live-chat" className="hover:text-white transition">
                  Live chat
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition">
                  Check order status
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-white transition">
                  Refunds
                </Link>
              </li>
              <li>
                <Link href="/report-abuse" className="hover:text-white transition">
                  Report abuse
                </Link>
              </li>
            </ul>
          </div>

          {/* Payments and protections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Payments and protections</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/safe-payments" className="hover:text-white transition">
                  Safe and easy payments
                </Link>
              </li>
              <li>
                <Link href="/money-back" className="hover:text-white transition">
                  Money-back policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  On-time shipping
                </Link>
              </li>
              <li>
                <Link href="/after-sales" className="hover:text-white transition">
                  After-sales protections
                </Link>
              </li>
              <li>
                <Link href="/product-monitoring" className="hover:text-white transition">
                  Product monitoring services
                </Link>
              </li>
            </ul>
          </div>

          {/* Source on Airavat */}
          <div>
            <h3 className="text-white font-semibold mb-4">Source on Airavat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rfq" className="hover:text-white transition">
                  Request for Quotation
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-white transition">
                  Membership program
                </Link>
              </li>
              <li>
                <Link href="/tax" className="hover:text-white transition">
                  Sales tax and VAT
                </Link>
              </li>
              <li>
                <Link href="/reads" className="hover:text-white transition">
                  Airavat Reads
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell on Airavat */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sell on Airavat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/supplier/register" className="hover:text-white transition">
                  Start selling
                </Link>
              </li>
              <li>
                <Link href="/supplier/dashboard" className="hover:text-white transition">
                  Seller Central
                </Link>
              </li>
              <li>
                <Link href="/supplier/verify" className="hover:text-white transition">
                  Become a Verified Supplier
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="hover:text-white transition">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/app" className="hover:text-white transition">
                  Download the app for suppliers
                </Link>
              </li>
            </ul>
          </div>

          {/* Get to know us */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get to know us</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Airavat
                </Link>
              </li>
              <li>
                <Link href="/responsibility" className="hover:text-white transition">
                  Corporate responsibility
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">
                  News center
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-white font-semibold mb-3 text-sm">Stay Connected</p>
              <div className="flex gap-3">
                <Link href="https://facebook.com" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                  <span className="text-white text-xs font-bold">f</span>
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                  <span className="text-white text-xs font-bold">in</span>
                </Link>
                <Link href="https://twitter.com" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                  <span className="text-white text-xs">🐦</span>
                </Link>
                <Link href="https://instagram.com" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                  <Camera size={16} className="text-white" />
                </Link>
                <Link href="https://youtube.com" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                  <span className="text-white text-xs">▶</span>
                </Link>
                <Link href="https://tiktok.com" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                  <span className="text-white text-xs">♪</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Payment and Security Logos */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-xs text-gray-500 mb-2">Security</p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">ID Check</div>
                <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">PCI DSS</div>
                <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">SSL</div>
                <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">VERISIGN</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Payment Methods</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">VISA</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Mastercard</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">AMEX</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">PayPal</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Apple Pay</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Discover</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">UnionPay</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">T/T</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alibaba Lens and Mobile App */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-3">Alibaba Lens</h4>
              <p className="text-sm text-gray-400 mb-4">Add Alibaba Lens to Chrome</p>
              <button className="bg-[#FF6A00] hover:bg-[#E55A00] text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <Camera size={20} />
                Alibaba Lens
              </button>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Mobile App</h4>
              <p className="text-sm text-gray-400 mb-4">Trade on the go with the Airavat app</p>
              <div className="flex gap-3">
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition">
                  Download on the App Store
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition">
                  GET IT ON Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Legal and Affiliate Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
            <Link href="https://aliexpress.com" className="hover:text-white transition">AliExpress</Link>
            <Link href="https://1688.com" className="hover:text-white transition">1688.com</Link>
            <Link href="https://tmall.com" className="hover:text-white transition">Tmall Taobao World</Link>
            <Link href="https://alipay.com" className="hover:text-white transition">Alipay</Link>
            <Link href="https://lazada.com" className="hover:text-white transition">Lazada</Link>
            <Link href="https://taobao.com" className="hover:text-white transition">Taobao Global</Link>
            <Link href="/tao" className="hover:text-white transition">TAO</Link>
            <Link href="https://trendyol.com" className="hover:text-white transition">Trendyol</Link>
            <Link href="https://europages.com" className="hover:text-white transition">Europages</Link>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
            <Link href="/policies" className="hover:text-white transition">Policies and rules</Link>
            <Link href="/legal" className="hover:text-white transition">Legal Notice</Link>
            <Link href="/listing-policy" className="hover:text-white transition">Product Listing Policy</Link>
            <Link href="/ip-protection" className="hover:text-white transition">Intellectual Property Protection</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
            <Link href="/integrity" className="hover:text-white transition">Integrity Compliance</Link>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#FF6A00]">A</span>
              <span className="text-xl font-bold text-white">Airavat</span>
            </div>
            <div className="text-xs text-gray-500">
              <p>© 1999-2025 Airavat.com.</p>
              <p className="mt-1">增值电信业务经营许可证: 浙B2-20241358</p>
              <p className="mt-1">浙公网安备33010002000366 浙ICP备2024067534号-3</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
