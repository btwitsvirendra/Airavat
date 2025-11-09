import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Building2,
  ChartPie,
  FileSearch,
  Globe2,
  Headset,
  MessageSquare,
  Package,
  PackageSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Users,
  Warehouse,
  Wrench,
} from 'lucide-react';

const categoryMenu = [
  { label: 'Industrial Machinery', description: 'CNC machines, automation, robotics' },
  { label: 'Consumer Electronics', description: 'Mobiles, accessories, smart devices' },
  { label: 'Apparel & Fashion', description: 'Ready-to-wear, fabrics, private labels' },
  { label: 'Beauty & Personal Care', description: 'Cosmetics, wellness, salon supplies' },
  { label: 'Packaging & Printing', description: 'Custom boxes, flexo, labeling' },
  { label: 'Home & Garden', description: 'Furniture, décor, kitchenware' },
  { label: 'Hardware & Tools', description: 'Hand tools, power tools, fasteners' },
  { label: 'Agriculture & Food', description: 'Food processing, agro tech, commodities' },
  { label: 'Auto & Transportation', description: 'EV components, auto parts, tyres' },
  { label: 'Health & Medical', description: 'Hospital supplies, diagnostics, pharma' },
  { label: 'Minerals & Chemicals', description: 'Industrial chemicals, metals, polymers' },
  { label: 'Renewable Energy', description: 'Solar, wind, storage solutions' },
];

const heroQuickLinks = [
  { title: 'Airavat Logistics', subtitle: 'Door-to-door freight & customs', href: '/logistics' },
  { title: 'Supplier Membership', subtitle: 'Upgrade to Gold Certified', href: '/supplier/gold' },
  { title: 'Source from India', subtitle: 'Verified manufacturers nationwide', href: '/made-in-india' },
];

const readyToShip = [
  {
    title: 'Smart Factory Robotics Bundles',
    price: 'From ₹1.1L / unit',
    detail: 'Installation-ready, 3 year warranty',
  },
  {
    title: 'Organic Cotton Fabric Rolls',
    price: '₹265 / metre',
    detail: 'MOQ 500m · Custom GSM options',
  },
  {
    title: 'EV Powertrain Components',
    price: 'Request best quote',
    detail: 'Tier-1 certified suppliers',
  },
  {
    title: 'Food Processing Lines',
    price: 'From ₹9.8L / set',
    detail: 'Turnkey installation support',
  },
];

const rfqSteps = [
  {
    icon: FileSearch,
    title: 'Describe your requirements',
    description: 'Upload specs, drawings or target pricing to receive precise quotations.',
  },
  {
    icon: Users,
    title: 'Get quotes in 48 hrs',
    description: 'Matched suppliers reply with pricing, lead time and customisation options.',
  },
  {
    icon: MessageSquare,
    title: 'Negotiate & finalise',
    description: 'Chat, request samples and close orders with Airavat Assurance protection.',
  },
];

const buyerSolutions = [
  {
    icon: ShieldCheck,
    title: 'Trade Assurance',
    description: 'Pay securely with escrow-style protection on every milestone.',
  },
  {
    icon: Truck,
    title: 'Book Logistics',
    description: 'Compare ocean, air and domestic freight options with live tracking.',
  },
  {
    icon: Package,
    title: 'Ready-to-Ship',
    description: 'Discover thousands of stocked products for immediate dispatch.',
  },
  {
    icon: Warehouse,
    title: 'Inventory Services',
    description: 'Consolidate, store and fulfil with bonded warehouse partners.',
  },
];

const supplierPrograms = [
  {
    icon: Store,
    title: 'Gold Supplier Membership',
    description: 'Boost visibility with premium storefronts and verified badges.',
  },
  {
    icon: Sparkles,
    title: 'Product Customisation',
    description: 'Showcase OEM / ODM capabilities and respond to bespoke briefs.',
  },
  {
    icon: Activity,
    title: 'Performance Analytics',
    description: 'Track enquiries, conversion and buyer engagement in real time.',
  },
  {
    icon: Headset,
    title: 'Supplier Success Team',
    description: 'Dedicated experts to optimise listings and close enterprise deals.',
  },
];

const tradeServices = [
  {
    icon: Globe2,
    title: 'Global Sourcing Hubs',
    description: 'Meet verified suppliers across India, SEA, EU and Middle East.',
  },
  {
    icon: Wrench,
    title: 'Inspection & Quality',
    description: 'Pre-production, during production and pre-shipment QC services.',
  },
  {
    icon: Building2,
    title: 'Trade Finance',
    description: 'Deferred payments, LC facilitation and working capital lines.',
  },
  {
    icon: Truck,
    title: 'Integrated Logistics',
    description: 'Multimodal freight with customs clearance and insurance options.',
  },
];

const marketIntelligence = [
  {
    title: 'India Export Pulse 2024',
    description: 'Track commodity pricing, demand shifts and regulatory updates.',
    href: '/insights/export-pulse',
  },
  {
    title: 'Top RFQ Trends this Week',
    description: 'Discover what Indian buyers are sourcing across industries.',
    href: '/insights/rfq-trends',
  },
  {
    title: 'Supplier Success Stories',
    description: 'How MSMEs expanded globally through Airavat marketplace.',
    href: '/insights/supplier-stories',
  },
];

const partnerLogistics = [
  {
    title: 'Domestic Express Freight',
    description: 'Nationwide pickup within 24 hrs and delivery tracking.',
  },
  {
    title: 'International Consolidation',
    description: 'LCL / air consolidation with bonded warehousing in 8 cities.',
  },
  {
    title: 'Customs Brokerage Desk',
    description: 'On-ground compliance experts for DGFT, GST and port clearance.',
  },
];

export default function HomePage() {
  return (
    <main className="bg-gray-50 pb-24">
      <section className="bg-gradient-to-br from-regal-blue-950 via-regal-blue-900 to-black text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[230px_minmax(0,1fr)_280px] lg:items-start">
          <div className="hidden rounded-2xl bg-black/30 p-4 shadow-lg backdrop-blur lg:block">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-regal-gold-400">Categories</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {categoryMenu.map((item) => (
                <li
                  key={item.label}
                  className="rounded-xl border border-white/5 bg-white/5 p-3 transition hover:border-regal-gold-400 hover:bg-white/10"
                >
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-xs text-white/70">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-regal-blue-800/90 via-teal-600/70 to-black/70 p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="max-w-xl space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-regal-gold-300">
                    Airavat Marketplace
                  </span>
                  <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                    Source from millions of verified suppliers across India and the world
                  </h1>
                  <p className="text-base text-white/80">
                    Discover ready-to-ship goods, customise OEM products or post an RFQ to receive competitive quotations in under 48 hours.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
                      <ShieldCheck className="h-4 w-4 text-regal-gold-300" /> Trade Assurance Protection
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
                      <Truck className="h-4 w-4 text-regal-gold-300" /> Logistics & Customs Support
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
                      <PackageSearch className="h-4 w-4 text-regal-gold-300" /> RFQ Marketplace
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/rfq"
                      className="inline-flex items-center gap-2 rounded-full bg-regal-gold-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-regal-gold-300"
                    >
                      Post RFQ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/discover"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                    >
                      Explore Products
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-sm text-white/70">
                  {heroQuickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 transition hover:border-regal-gold-300 hover:bg-black/40"
                    >
                      <p className="text-base font-semibold text-white">{link.title}</p>
                      <p>{link.subtitle}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {readyToShip.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-lg transition hover:border-regal-gold-300">
                  <p className="text-sm uppercase tracking-[0.2em] text-regal-gold-300">Ready to Ship</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/80">{item.detail}</p>
                  <p className="mt-4 text-base font-semibold text-regal-gold-200">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden space-y-5 rounded-2xl border border-white/10 bg-black/30 p-6 text-sm shadow-lg backdrop-blur lg:block">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-regal-gold-300">Welcome to Airavat</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Join the leading B2B marketplace</h2>
              <div className="mt-5 space-y-3">
                <Link
                  href="/register"
                  className="block rounded-full bg-regal-gold-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-regal-gold-300"
                >
                  Join for Free
                </Link>
                <Link
                  href="/login"
                  className="block rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
              <p className="mt-5 text-xs text-white/70">
                Access RFQ marketplace, manage enquiries and collaborate with suppliers in one dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-white">RFQ Updates</h3>
              <ul className="mt-4 space-y-3 text-xs text-white/70">
                <li>• Automotive buyer from Pune requested customised wiring harnesses.</li>
                <li>• Textile exporter from Tiruppur seeking organic dyes suppliers.</li>
                <li>• Pharma distributor in Hyderabad posted RFQ for blister packing lines.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-white">Buyer Support</h3>
              <p className="mt-2 text-xs text-white/70">Speak to trade experts for sourcing, inspections and logistics planning.</p>
              <Link
                href="/support"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Headset className="h-4 w-4" /> Contact Support
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-7xl space-y-10 px-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl font-semibold text-regal-blue-900">Request for Quotation Marketplace</h2>
              <p className="text-sm text-gray-600">
                Post a sourcing request and receive curated quotations from verified suppliers. Collaborate through chat, share drawings, request samples and close deals with Trade Assurance.
              </p>
            </div>
            <Link
              href="/rfq/create"
              className="inline-flex items-center gap-2 rounded-full bg-regal-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-regal-blue-800"
            >
              Create RFQ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {rfqSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <step.icon className="h-10 w-10 text-regal-blue-800" />
                <h3 className="mt-4 text-lg font-semibold text-regal-blue-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-regal-blue-900">Solutions for Buyers</h2>
              <Link href="/buyer" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                View buyer guide
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {buyerSolutions.map((solution) => (
                <div key={solution.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-regal-blue-300">
                  <solution.icon className="h-9 w-9 text-regal-blue-800" />
                  <h3 className="mt-4 text-lg font-semibold text-regal-blue-900">{solution.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-regal-blue-900">Supplier Programmes</h2>
              <Link href="/supplier" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                Become a supplier
              </Link>
            </div>
            <div className="mt-6 space-y-5">
              {supplierPrograms.map((programme) => (
                <div key={programme.title} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-regal-blue-300">
                  <programme.icon className="h-10 w-10 flex-shrink-0 text-regal-blue-800" />
                  <div>
                    <h3 className="text-base font-semibold text-regal-blue-900">{programme.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{programme.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-regal-blue-900">Trade Services to Power Your Supply Chain</h2>
            <Link href="/trade-services" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
              Explore all services
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tradeServices.map((service) => (
              <div key={service.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-regal-blue-300">
                <service.icon className="h-10 w-10 text-regal-blue-800" />
                <h3 className="mt-4 text-lg font-semibold text-regal-blue-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-regal-blue-900">Market Intelligence & Updates</h2>
              <Link href="/insights" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                View all insights
              </Link>
            </div>
            <div className="mt-6 space-y-5">
              {marketIntelligence.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-regal-blue-300 hover:bg-white"
                >
                  <h3 className="text-lg font-semibold text-regal-blue-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-regal-blue-900">Airavat Logistics Network</h2>
              <div className="mt-5 space-y-4">
                {partnerLogistics.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <h3 className="text-base font-semibold text-regal-blue-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/logistics"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-regal-blue-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-regal-blue-800"
              >
                Book logistics <Truck className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-regal-blue-900">Tools for teams</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 h-4 w-4 text-regal-blue-800" />
                  Assign buying roles, manage approvals and share supplier notes.
                </li>
                <li className="flex items-start gap-3">
                  <ShoppingBag className="mt-1 h-4 w-4 text-regal-blue-800" />
                  Sync with your ERP for purchase orders and invoice reconciliation.
                </li>
                <li className="flex items-start gap-3">
                  <ChartPie className="mt-1 h-4 w-4 text-regal-blue-800" />
                  Analyse spend by category, location and supplier performance.
                </li>
              </ul>
              <Link
                href="/enterprise"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-regal-blue-200 px-5 py-2 text-sm font-semibold text-regal-blue-900 transition hover:bg-regal-blue-50"
              >
                Explore enterprise suite <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
