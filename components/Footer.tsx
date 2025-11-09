import Link from 'next/link';
import {
  CreditCard,
  Facebook,
  Headset,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Twitter,
} from 'lucide-react';

const serviceHighlights = [
  {
    icon: ShieldCheck,
    title: 'Trade Assurance',
    description: 'Secure payments with guaranteed delivery on every order',
  },
  {
    icon: CreditCard,
    title: 'Instant Payments',
    description: 'Flexible payment links tailored to your business needs',
  },
  {
    icon: Truck,
    title: 'Smart Logistics',
    description: 'Door-to-door transport with live shipment tracking',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'Dedicated sourcing experts and customer success teams',
  },
];

const footerLinks = [
  {
    heading: 'Trade Services',
    links: [
      { href: '/trade-protection', label: 'Airavat Assurance' },
      { href: '/payment-links', label: 'Secure Payment Links' },
      { href: '/logistics', label: 'Logistics Solutions' },
      { href: '/inspection', label: 'Inspection Services' },
      { href: '/financing', label: 'Trade Financing' },
    ],
  },
  {
    heading: 'Buyer Resources',
    links: [
      { href: '/how-to-buy', label: 'How to Buy' },
      { href: '/rfq', label: 'Request for Quotation' },
      { href: '/events', label: 'Events & Webinars' },
      { href: '/help/buyer', label: 'Buyer Help Center' },
      { href: '/covid-resources', label: 'Compliance & Certifications' },
    ],
  },
  {
    heading: 'Supplier Resources',
    links: [
      { href: '/supplier/register', label: 'Join as Supplier' },
      { href: '/supplier/tools', label: 'Supplier Tools' },
      { href: '/supplier/academy', label: 'Airavat Academy' },
      { href: '/supplier/insights', label: 'Market Insights' },
      { href: '/supplier/help', label: 'Supplier Support' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceHighlights.map((service) => (
            <div
              key={service.title}
              className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:border-regal-gold-500/60 hover:bg-white/10"
            >
              <service.icon className="mt-1 h-10 w-10 flex-shrink-0 text-regal-gold-400" />
              <div>
                <h3 className="text-base font-semibold text-white">{service.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="text-3xl font-semibold text-white">Aira</span>
              <span className="text-3xl font-semibold text-regal-gold-400">vat</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Airavat connects Indian businesses with trusted suppliers across the globe. Discover millions of products, manage
              trade digitally, and scale your supply chain with confidence.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <MapPin size={18} className="text-regal-gold-400" />
              <span>Global Trade Tower, Bengaluru, India</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2">
                <Phone size={18} className="text-regal-gold-400" /> +91 1800-120-5005
              </span>
              <span className="inline-flex items-center gap-2">
                <Headset size={18} className="text-regal-gold-400" /> support@airavat.com
              </span>
            </div>
            <div className="flex gap-3 text-gray-400">
              <Link href="https://facebook.com" className="rounded-full border border-white/10 p-2 hover:border-regal-gold-400 hover:text-regal-gold-400 transition">
                <Facebook size={18} />
              </Link>
              <Link href="https://twitter.com" className="rounded-full border border-white/10 p-2 hover:border-regal-gold-400 hover:text-regal-gold-400 transition">
                <Twitter size={18} />
              </Link>
              <Link href="https://linkedin.com" className="rounded-full border border-white/10 p-2 hover:border-regal-gold-400 hover:text-regal-gold-400 transition">
                <Linkedin size={18} />
              </Link>
              <Link href="https://instagram.com" className="rounded-full border border-white/10 p-2 hover:border-regal-gold-400 hover:text-regal-gold-400 transition">
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.heading} className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-white/90">{group.heading}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-regal-gold-300 transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/90">Get the App</h4>
              <p className="text-sm text-gray-400">
                Manage sourcing, chat with suppliers, and track orders on the go with the Airavat mobile app.
              </p>
              <div className="space-y-3">
                <Link
                  href="/download/android"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-regal-gold-400 hover:bg-white/10 transition"
                >
                  <span>Download for Android</span>
                  <span className="text-xs text-regal-gold-300">APK</span>
                </Link>
                <Link
                  href="/download/ios"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-regal-gold-400 hover:bg-white/10 transition"
                >
                  <span>Download for iOS</span>
                  <span className="text-xs text-regal-gold-300">App Store</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/80">
        <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Airavat Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="hover:text-regal-gold-300 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-regal-gold-300 transition">
                Terms of Use
              </Link>
              <Link href="/sitemap" className="hover:text-regal-gold-300 transition">
                Sitemap
              </Link>
              <Link href="/compliance" className="hover:text-regal-gold-300 transition">
                Compliance & Certificates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

