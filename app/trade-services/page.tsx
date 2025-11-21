'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Banknote,
  ClipboardCheck,
  Globe2,
  PackageSearch,
  ShieldCheck,
  Ship,
  Store,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'assurance',
    title: 'Airavat Assurance',
    icon: ShieldCheck,
    summary: 'Escrow-style payments with fulfilment guarantees.',
    details: [
      'Milestone based payouts to suppliers',
      'Independent inspection tie-ups across 40+ cities',
      'Instant dispute resolution with 24h response SLA',
    ],
    cta: '/trade-protection',
  },
  {
    id: 'logistics',
    title: 'Integrated Logistics',
    icon: Truck,
    summary: 'Door-to-door multi-modal freight managed by Airavat.',
    details: [
      'Rate discovery across 18 shipping partners',
      'Live GPS tracking and customs status alerts',
      'Inland haulage bundled with insurance',
    ],
    cta: '/logistics',
  },
  {
    id: 'financing',
    title: 'Trade Financing',
    icon: Banknote,
    summary: 'Flexible credit so you can close larger purchase orders.',
    details: [
      '15/30/60 day payment terms for recurring buyers',
      'LC facilitation with leading Indian banks',
      'Inventory financing for warehouse stocking',
    ],
    cta: '/financing',
  },
  {
    id: 'sourcing',
    title: 'Pro Sourcing Squad',
    icon: PackageSearch,
    summary: 'Category specialists negotiate and audit suppliers for you.',
    details: [
      'Dedicated sourcing manager within 24 hours',
      'Sample consolidation with QC photography',
      'Factory audits and compliance checklisting',
    ],
    cta: '/rfq',
  },
];

const successMetrics = [
  { value: '₹820Cr+', label: 'Payments protected in FY24' },
  { value: '2,300+', label: 'Shipments orchestrated' },
  { value: '96%', label: 'Fulfilment satisfaction score' },
  { value: '18', label: 'Export corridors activated' },
];

const playbooks = [
  {
    title: 'Scale private label apparel',
    description: 'Fabric sourcing, stitching units, packaging, and QC blueprints for D2C brands.',
    link: '/playbooks/apparel',
  },
  {
    title: 'Automate your factory floor',
    description: 'Deployment roadmap covering CNC, cobots, and predictive maintenance sensors.',
    link: '/playbooks/manufacturing',
  },
  {
    title: 'Build a cold chain for exports',
    description: 'Cold storage partners, reefer fleet, and compliance workflows for perishables.',
    link: '/playbooks/cold-chain',
  },
];

export default function TradeServicesPage() {
  const [activeService, setActiveService] = useState(services[0]);

  const Icon = useMemo(() => activeService.icon, [activeService]);

  return (
    <div className="bg-gray-50">
      <section className="gradient-hero py-16 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
              Trusted by enterprise buyers
            </p>
            <h1 className="text-5xl font-bold leading-tight">
              Trade services built for end-to-end B2B commerce
            </h1>
            <p className="text-lg text-blue-100">
              Blend secure payments, logistics, financing, and sourcing expertise into one workflow. Airavat orchestrates every milestone so your procurement teams stay focused on growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Talk to a trade consultant
              </Link>
              <Link
                href="/case-studies"
                className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Browse success stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(154,121,255,0.1)] text-[#3373FF]">
                <Icon size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-regal-blue-900">{activeService.title}</h2>
                <p className="text-sm text-gray-500">{activeService.summary}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {activeService.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-gray-600">
                  <ArrowRight size={18} className="mt-1 text-[#3373FF]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <Link
              href={activeService.cta}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-regal-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-regal-blue-700"
            >
              Explore {activeService.title}
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {successMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-regal-blue-900">{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Service catalogue</p>
            <div className="space-y-4">
              {services.map((service) => {
                const ServiceIcon = service.icon;
                const isActive = service.id === activeService.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                      isActive
                        ? 'border-[#3373FF] bg-[rgba(154,121,255,0.1)] shadow-lg'
                        : 'border-gray-200 bg-white hover:border-[#D1C2FF] hover:bg-[rgba(154,121,255,0.1)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isActive ? 'bg-white text-[#3373FF]' : 'bg-gray-100 text-gray-500'}`}>
                        <ServiceIcon size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-regal-blue-900">{service.title}</p>
                        <p className="text-sm text-gray-500">{service.summary}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
            <h3 className="text-2xl font-semibold text-regal-blue-900 mb-4">Industry playbooks</h3>
            <div className="space-y-4">
              {playbooks.map((playbook) => (
                <Link
                  key={playbook.link}
                  href={playbook.link}
                  className="block rounded-2xl border border-gray-200 p-4 transition hover:border-[#3373FF] hover:bg-[rgba(154,121,255,0.1)]"
                >
                  <p className="font-semibold text-regal-blue-900">{playbook.title}</p>
                  <p className="text-sm text-gray-500">{playbook.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <Globe2 className="text-[#3373FF]" size={22} />
              <h3 className="text-lg font-semibold text-regal-blue-900">Cross-border concierge</h3>
            </div>
            <p className="text-sm text-gray-600">
              Navigating customs or compliance for new destinations? Our export desk co-creates documentation packs and taps into our ecosystem partners for on-ground execution.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[rgba(154,121,255,0.1)] p-4 text-sm text-[#1A1A2E]">Middle East trade lanes</div>
              <div className="rounded-xl bg-[rgba(154,121,255,0.1)] p-4 text-sm text-[#1A1A2E]">EU machinery imports</div>
              <div className="rounded-xl bg-[rgba(154,121,255,0.1)] p-4 text-sm text-[#1A1A2E]">USA FDA compliance</div>
              <div className="rounded-xl bg-[rgba(154,121,255,0.1)] p-4 text-sm text-[#1A1A2E]">SE Asia fulfilment</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Store,
              title: 'Supplier onboarding',
              description: 'Training, catalog audits, and scorecards to keep your sellers conversion-ready.',
            },
            {
              icon: ClipboardCheck,
              title: 'Compliance desk',
              description: 'Country-wise certifications, FSSAI, CE, ISO, and sustainability disclosures.',
            },
            {
              icon: Ship,
              title: 'Ocean & air freight',
              description: 'Negotiated rates with top carriers and weekly consolidation departures.',
            },
          ].map((item) => {
            const CardIcon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <CardIcon className="mb-4 text-[#3373FF]" size={28} />
                <h4 className="text-xl font-semibold text-regal-blue-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
