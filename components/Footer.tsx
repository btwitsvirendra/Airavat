import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-regal-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Aira</span>
              <span className="text-teal-400">vat</span>
            </h3>
            <p className="text-gray-300 mb-4">
              India's leading B2B marketplace connecting businesses with verified suppliers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-teal-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-teal-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-teal-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/suppliers" className="text-gray-300 hover:text-teal-400 transition">
                  Find Suppliers
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-teal-400 transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-teal-400 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Suppliers */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Suppliers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/supplier/register" className="text-gray-300 hover:text-teal-400 transition">
                  Register as Supplier
                </Link>
              </li>
              <li>
                <Link href="/supplier/login" className="text-gray-300 hover:text-teal-400 transition">
                  Supplier Login
                </Link>
              </li>
              <li>
                <Link href="/supplier/benefits" className="text-gray-300 hover:text-teal-400 transition">
                  Supplier Benefits
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-teal-400 transition">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/supplier/help" className="text-gray-300 hover:text-teal-400 transition">
                  Supplier Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-teal-400 mt-1" />
                <span className="text-gray-300">
                  123 Business Hub, Nehru Place,<br />
                  New Delhi - 110019, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-teal-400" />
                <span className="text-gray-300">1800-123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-teal-400" />
                <span className="text-gray-300">support@airavat.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-regal-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © 2024 Airavat. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-teal-400 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-teal-400 transition">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-teal-400 transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
