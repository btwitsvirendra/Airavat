'use client';

import { useMemo, useState } from 'react';
import { Filter, Star, MapPin, Building2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const clusters = [
  {
    id: 'cnc',
    title: 'Precision CNC & Automation',
    location: 'Pune, Maharashtra',
    rating: 4.8,
    suppliers: 86,
    heroImage: 'https://images.unsplash.com/photo-1581092152835-30ab079f19b9?w=800',
    tags: ['Machinery', 'Automation', 'OEM'],
  },
  {
    id: 'textiles',
    title: 'Sustainable Textiles Collective',
    location: 'Tiruppur, Tamil Nadu',
    rating: 4.9,
    suppliers: 142,
    heroImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
    tags: ['Apparel', 'Organic', 'Private Label'],
  },
  {
    id: 'food',
    title: 'Agro & Food Processing Hub',
    location: 'Ahmedabad, Gujarat',
    rating: 4.7,
    suppliers: 63,
    heroImage: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=800',
    tags: ['F&B', 'Cold Chain', 'Export Ready'],
  },
  {
    id: 'renewables',
    title: 'Renewable Energy Marketplace',
    location: 'Bengaluru, Karnataka',
    rating: 4.6,
    suppliers: 52,
    heroImage: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800',
    tags: ['Solar', 'EV', 'Storage'],
  },
];

const filters = ['All', 'Machinery', 'Textiles', 'Food & Agriculture', 'Energy'];

export default function DiscoverPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleClusters = useMemo(() => {
    if (activeFilter === 'All') return clusters;
    if (activeFilter === 'Machinery') return clusters.filter((cluster) => cluster.id === 'cnc');
    if (activeFilter === 'Textiles') return clusters.filter((cluster) => cluster.id === 'textiles');
    if (activeFilter === 'Food & Agriculture') return clusters.filter((cluster) => cluster.id === 'food');
    if (activeFilter === 'Energy') return clusters.filter((cluster) => cluster.id === 'renewables');
    return clusters;
  }, [activeFilter]);

  return (
    <div className="bg-gray-50">
      <section className="gradient-hero py-16 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/80">
              <Sparkles size={16} /> Curated sourcing journeys
            </p>
            <h1 className="text-5xl font-bold leading-tight mb-6">Discover verified supplier clusters handpicked for Indian buyers</h1>
            <p className="text-lg text-blue-100">
              Airavat curators assemble proven manufacturers, upcoming startups, and export-ready sellers into themed clusters. Filter by industry to plan your next sourcing sprint.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-regal-blue-900">Featured business clusters</h2>
            <p className="text-gray-600">Tap a cluster to access supplier directories, RFQ templates, and logistics playbooks.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-gray-600 shadow">
              <Filter size={16} /> Filter by sector
            </span>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-teal-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {visibleClusters.map((cluster) => (
            <article key={cluster.id} className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${cluster.heroImage})` }}
              />
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{cluster.title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} /> {cluster.location}
                    </p>
                  </div>
                  <div className="rounded-xl bg-teal-50 px-3 py-2 text-right">
                    <p className="flex items-center justify-end gap-1 text-sm font-semibold text-teal-700">
                      <Star size={16} className="text-yellow-400" /> {cluster.rating}
                    </p>
                    <p className="text-xs text-gray-500">Avg rating</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  {cluster.suppliers}+ audited suppliers · Dedicated sourcing advisor · Regional trade compliance kit
                </p>

                <div className="flex flex-wrap gap-2">
                  {cluster.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/rfq?cluster=${cluster.id}`}
                    className="btn-primary flex-1 justify-center"
                  >
                    Launch RFQ brief
                  </Link>
                  <Link
                    href={`/suppliers/${cluster.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-teal-400 hover:text-teal-600"
                  >
                    <Building2 size={16} /> View suppliers
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
