import Link from 'next/link';
import {
  ShoppingBag,
  Users,
  TrendingUp,
  Shield,
  MessageSquare,
  CreditCard,
  Truck,
  Star,
  ArrowRight,
  Package,
  Zap,
  Globe
} from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Electronics & Components', icon: '🔌', count: '15,234 products' },
    { name: 'Textiles & Apparel', icon: '👔', count: '22,567 products' },
    { name: 'Machinery & Equipment', icon: '⚙️', count: '8,943 products' },
    { name: 'Building Materials', icon: '🏗️', count: '12,456 products' },
    { name: 'Chemicals & Plastics', icon: '🧪', count: '6,789 products' },
    { name: 'Food & Beverages', icon: '🍽️', count: '18,234 products' },
    { name: 'Automotive Parts', icon: '🚗', count: '9,876 products' },
    { name: 'Home & Furniture', icon: '🛋️', count: '14,567 products' },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: 'Direct Chat with Suppliers',
      description: 'Connect instantly with verified suppliers and negotiate deals in real-time',
      color: 'text-teal-600'
    },
    {
      icon: CreditCard,
      title: 'Secure Payment Links',
      description: 'Get customized payment links with secure transactions and buyer protection',
      color: 'text-regal-blue-600'
    },
    {
      icon: Truck,
      title: 'Integrated Logistics',
      description: 'Book transport services directly through our platform with live tracking',
      color: 'text-regal-gold-600'
    },
    {
      icon: Shield,
      title: 'Verified Suppliers',
      description: 'All suppliers are verified with business documents and quality certifications',
      color: 'text-green-600'
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Products Listed' },
    { value: '5,000+', label: 'Verified Suppliers' },
    { value: '₹500Cr+', label: 'Transaction Value' },
    { value: '98%', label: 'Customer Satisfaction' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                India's Premier <br />
                <span className="text-regal-gold-400">B2B Marketplace</span>
              </h1>
              <p className="text-xl text-blue-100">
                Connect with verified suppliers, negotiate directly, and grow your business with integrated payments and logistics
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-gold flex items-center justify-center gap-2">
                  Start Sourcing
                  <ArrowRight size={20} />
                </Link>
                <Link href="/supplier/register" className="bg-white text-regal-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  Become a Supplier
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-500 p-3 rounded-lg">
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Quick Search</p>
                    <p className="font-semibold">Find products instantly</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-regal-gold-500 p-3 rounded-lg">
                    <MessageSquare size={32} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Direct Chat</p>
                    <p className="font-semibold">Connect with suppliers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-500 p-3 rounded-lg">
                    <Shield size={32} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Secure Payments</p>
                    <p className="font-semibold">Protected transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-regal-blue-700">{stat.value}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-regal-blue-800 mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Browse through our wide range of product categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/products?category=${category.name}`}
                className="bg-white p-6 rounded-xl shadow-md card-hover text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/categories" className="text-teal-600 font-semibold hover:text-teal-700 flex items-center justify-center gap-2">
              View All Categories
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-regal-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-regal-blue-800 mb-4">
              Why Choose Airavat?
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need for seamless B2B transactions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg card-hover"
              >
                <feature.icon className={`${feature.color} mb-4`} size={40} />
                <h3 className="font-semibold text-xl text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-regal-blue-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Simple steps to start buying or selling
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Register', description: 'Create your buyer or supplier account', icon: Users },
              { step: '2', title: 'Browse & Connect', description: 'Find products and chat with suppliers', icon: MessageSquare },
              { step: '3', title: 'Negotiate & Pay', description: 'Get custom quotes and payment links', icon: CreditCard },
              { step: '4', title: 'Ship & Track', description: 'Book logistics and track deliveries', icon: Truck },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <item.icon className="mx-auto text-regal-blue-600 mb-4" size={48} />
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-teal-200 -ml-4">
                    <ArrowRight className="absolute right-0 -top-3 text-teal-400" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using Airavat to streamline their procurement and sales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-gold flex items-center justify-center gap-2">
              Get Started Now
              <ArrowRight size={20} />
            </Link>
            <Link href="/about" className="bg-white text-regal-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
