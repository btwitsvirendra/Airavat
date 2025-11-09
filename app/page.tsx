import Link from 'next/link';
import {
  ArrowRight,
  Banknote,
  Factory,
  Globe2,
  Handshake,
  LineChart,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Warehouse,
} from 'lucide-react';

const heroCategories = [
  'Consumer Electronics',
  'Industrial Machinery',
  'Apparel & Fashion',
  'Beauty & Personal Care',
  'Packaging & Printing',
  'Home & Garden',
  'Renewable Energy',
  'Automobile & Transportation',
  'Metals & Minerals',
  'Healthcare & Medical',
  'Sports & Entertainment',
  'Gifts & Crafts',
];

const flashDeals = [
  {
    title: 'Smart Manufacturing Robotics',
    price: 'Starting at ₹1.2L / unit',
    discount: 'Save 18%',
    category: 'Industrial Automation',
  },
  {
    title: 'Organic Cotton Fabrics',
    price: '₹245 / metre',
    discount: 'Save 22%',
    category: 'Textiles',
  },
  {
    title: 'Solar Rooftop Modules',
    price: '₹10,500 / KW',
    discount: 'Save 15%',
    category: 'Renewable Energy',
  },
  {
    title: 'Cold Chain Logistics',
    price: '₹55 / km',
    discount: 'Save 12%',
    category: 'Transportation',
  },
];

const industryCollections = [
  {
    title: 'Made in India Showcase',
    description: 'Discover verified Indian manufacturers ready for global trade',
    href: '/collections/made-in-india',
  },
  {
    title: 'Airavat Sustainable Sourcing',
    description: 'Eco-friendly products with traceable supply chains',
    href: '/collections/sustainability',
  },
  {
    title: 'Smart Factory Solutions',
    description: 'Automation, AI and IoT solutions for modern plants',
    href: '/collections/industry-4',
  },
];

const tradeServices = [
  {
    icon: ShieldCheck,
    title: 'Airavat Assurance',
    description: 'Order protection from payment to delivery with dispute resolution support.',
  },
  {
    icon: Truck,
    title: 'Integrated Logistics',
    description: 'Book transport, customs clearance and last-mile delivery in one place.',
  },
  {
    icon: Banknote,
    title: 'Flexible Financing',
    description: 'Unlock working capital with easy pay later and credit line options.',
  },
  {
    icon: Globe2,
    title: 'Global Sourcing',
    description: 'Connect with suppliers across 190+ countries and regional trade shows.',
  },
];

const supplierSpotlight = [
  {
    name: 'Bharat Precision Tools',
    location: 'Pune, Maharashtra',
    speciality: 'CNC machining & tooling for aerospace and auto OEMs',
  },
  {
    name: 'Kerala Naturals Export Co.',
    location: 'Kochi, Kerala',
    speciality: 'Spices, nutraceuticals and organic personal care ingredients',
  },
  {
    name: 'Eastern Textile Mills',
    location: 'Surat, Gujarat',
    speciality: 'Sustainable fabrics, recycled polyester and custom apparel',
  },
];

const businessInsights = [
  {
    title: 'India Manufacturing Pulse - Q3 2024',
    description: 'Demand forecasts, commodity trends and sourcing strategies for the next quarter.',
    href: '/insights/manufacturing-pulse',
  },
  {
    title: 'How SMEs are Scaling with Airavat RFQ',
    description: 'Learn how thousands of SMEs reduce sourcing time by 40% using digital quotes.',
    href: '/insights/rfq-success',
  },
  {
    title: 'Cross-border Trade Compliance Guide',
    description: 'Updated GST, customs and documentation rules for exporters and importers.',
    href: '/insights/compliance-guide',
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-regal-blue-900 to-black text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[260px_1fr_300px]">
          <aside className="hidden rounded-3xl bg-white/5 p-6 shadow-lg shadow-black/10 backdrop-blur lg:block">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-regal-gold-300">Top Categories</h2>
            <ul className="mt-4 space-y-3 text-sm text-blue-100">
              {heroCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
                  >
                    <span>{category}</span>
                    <ArrowRight size={16} className="text-regal-gold-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white/10 p-8 shadow-xl shadow-black/20 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-regal-gold-300">Welcome to Airavat</p>
                  <h1 className="mt-2 text-4xl font-bold md:text-5xl">India&apos;s Premier B2B Marketplace</h1>
                  <p className="mt-3 max-w-xl text-sm text-blue-100 md:text-base">
                    Source directly from verified manufacturers, negotiate with suppliers in real time and secure end-to-end trade
                    services for your business.
                  </p>
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-regal-gold-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-regal-gold-400"
                >
                  Join Free <ArrowRight size={18} />
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h3 className="text-lg font-semibold text-white">Sourcing Solutions</h3>
                  <p className="mt-2 text-sm text-blue-100">
                    Post RFQs and receive quotes within 24 hours from verified suppliers in your target industries.
                  </p>
                  <Link href="/rfq" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-regal-gold-300">
                    Submit RFQ <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h3 className="text-lg font-semibold text-white">Trade Protection</h3>
                  <p className="mt-2 text-sm text-blue-100">
                    Secure payments, inspection and logistics under Airavat Assurance with transparent tracking.
                  </p>
                  <Link href="/trade-protection" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-regal-gold-300">
                    Explore Assurance <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {flashDeals.map((deal) => (
                <div key={deal.title} className="group flex items-center justify-between rounded-3xl bg-white/10 p-5 transition hover:bg-white/15">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-regal-gold-300">Featured Deal</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{deal.title}</h3>
                    <p className="mt-1 text-sm text-blue-100">{deal.category}</p>
                    <p className="mt-2 text-sm font-semibold text-regal-gold-300">{deal.price}</p>
                  </div>
                  <span className="rounded-full bg-regal-gold-500/20 px-4 py-2 text-sm font-semibold text-regal-gold-200">{deal.discount}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden flex-col gap-4 rounded-3xl bg-white p-6 text-gray-900 shadow-xl lg:flex">
            <div className="rounded-2xl bg-gray-900/90 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-regal-gold-300">Airavat Account</p>
              <h3 className="mt-3 text-xl font-semibold">Sign in to sync your sourcing</h3>
              <p className="mt-2 text-sm text-blue-100">Track orders, manage RFQs, and chat with suppliers instantly.</p>
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/login" className="rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black">
                  Sign In
                </Link>
                <Link href="/register" className="rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white">
                  Join Free
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Trade Calendar</h3>
              <p className="mt-2 text-xs text-gray-500">Meet suppliers at upcoming events</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex items-center justify-between">
                  <span>Airavat Global Expo</span>
                  <span className="text-xs text-regal-blue-600">July 18</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>North India Buyer Meet</span>
                  <span className="text-xs text-regal-blue-600">Aug 02</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Sustainability Summit</span>
                  <span className="text-xs text-regal-blue-600">Aug 22</span>
                </li>
              </ul>
              <Link href="/events" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-regal-blue-700">
                View all events <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Industry Collections */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-regal-blue-600">Curated Collections</p>
            <h2 className="mt-2 text-3xl font-semibold text-regal-blue-900">Discover opportunities for your business</h2>
          </div>
          <Link href="/discover" className="inline-flex items-center gap-2 text-sm font-semibold text-regal-blue-700">
            Explore all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industryCollections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group relative overflow-hidden rounded-3xl border border-white bg-white shadow-lg shadow-regal-blue-50 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-regal-blue-900/90 via-black/70 to-teal-900/70 opacity-90 transition group-hover:opacity-100" />
              <div className="relative p-8 text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-regal-gold-200">
                  <Sparkles size={14} /> Featured
                </span>
                <h3 className="mt-4 text-2xl font-semibold">{collection.title}</h3>
                <p className="mt-3 text-sm text-blue-100">{collection.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-regal-gold-200">
                  View collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trade Services */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-regal-blue-600">Airavat Services</p>
              <h2 className="mt-2 text-3xl font-semibold text-regal-blue-900">Secure trade with trusted infrastructure</h2>
            </div>
            <Link href="/trade-services" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
              View trade services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tradeServices.map((service) => (
              <div key={service.title} className="rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-regal-blue-50 p-6 shadow-sm">
                <service.icon className="h-10 w-10 text-regal-blue-700" />
                <h3 className="mt-4 text-lg font-semibold text-regal-blue-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                <Link href={`/trade-services#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-regal-blue-700">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier Spotlight & Insights */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_1.2fr]">
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-regal-blue-600">Supplier Spotlight</p>
                <h2 className="mt-2 text-3xl font-semibold text-regal-blue-900">Verified manufacturers you can trust</h2>
              </div>
              <Link href="/suppliers" className="inline-flex items-center gap-2 text-sm font-semibold text-regal-blue-700">
                Browse all suppliers <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 space-y-5">
              {supplierSpotlight.map((supplier) => (
                <div key={supplier.name} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-regal-blue-900">{supplier.name}</h3>
                      <p className="text-sm text-gray-500">{supplier.location}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-regal-blue-50 px-3 py-1 text-xs font-semibold text-regal-blue-700">
                      <Handshake size={14} /> Verified Partner
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{supplier.speciality}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-2">
                      <Factory size={14} /> ISO 9001
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Warehouse size={14} /> 5 production lines
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Package size={14} /> MOQ negotiable
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-regal-blue-900 to-black p-8 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.4em] text-regal-gold-300">Business Dashboard</p>
              <h3 className="mt-3 text-2xl font-semibold">Monitor your sourcing performance</h3>
              <p className="mt-3 text-sm text-blue-100">
                Gain insights on order status, supplier responsiveness and savings achieved with Airavat services.
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm text-regal-gold-200">
                <LineChart size={18} /> Real-time analytics
              </div>
              <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
                View Dashboard <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-regal-blue-900">Insights & Research</h3>
              <p className="mt-2 text-sm text-gray-600">Stay ahead with Airavat intelligence</p>
              <div className="mt-5 space-y-4">
                {businessInsights.map((insight) => (
                  <Link key={insight.href} href={insight.href} className="block rounded-2xl border border-transparent p-4 transition hover:border-regal-blue-200 hover:bg-regal-blue-50">
                    <h4 className="text-sm font-semibold text-regal-blue-900">{insight.title}</h4>
                    <p className="mt-1 text-xs text-gray-500">{insight.description}</p>
                    <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-teal-600">
                      Read report <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-black via-regal-blue-900 to-black py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-regal-gold-300">Ready to grow</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Transform your supply chain with Airavat</h2>
          <p className="max-w-3xl text-sm text-blue-100 md:text-base">
            Join thousands of Indian businesses sourcing smarter with digital procurement, trusted logistics and instant payments on a single platform.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className="rounded-full bg-regal-gold-500 px-6 py-3 text-sm font-semibold text-black hover:bg-regal-gold-400">
              Start sourcing now
            </Link>
            <Link href="/contact" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Speak with an expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

