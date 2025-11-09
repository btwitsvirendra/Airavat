'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, PackageSearch } from 'lucide-react';

const sampleResults = [
  {
    id: 'prod-1',
    name: 'CNC Milling Machine',
    supplier: 'Precision Works',
    snippet: '5-axis milling with ISO 9001 certification and on-site installation support.',
  },
  {
    id: 'prod-2',
    name: 'Custom Corrugated Boxes',
    supplier: 'PackRight India',
    snippet: 'Export-grade corrugated packaging with digital printing and moisture barriers.',
  },
  {
    id: 'prod-3',
    name: 'Organic Turmeric Powder',
    supplier: 'Spice Route Agro',
    snippet: 'Lab-tested turmeric with FSSAI, USDA organic, and cold chain availability.',
  },
];

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const visibleResults = useMemo(() => {
    if (!query) return sampleResults;
    return sampleResults.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase()) ||
      result.supplier.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6 flex items-center gap-3 text-regal-blue-900">
          <PackageSearch size={28} className="text-teal-500" />
          <div>
            <h1 className="text-3xl font-bold">Search results</h1>
            <p className="text-sm text-gray-600">
              Showing {visibleResults.length} curated matches for <span className="font-semibold text-regal-blue-900">{query || 'all products'}</span>.
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 text-sm text-gray-600">
          <Filter size={16} /> Filters coming soon
        </div>

        <div className="space-y-4">
          {visibleResults.map((result) => (
            <article key={result.id} className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-regal-blue-900">{result.name}</h2>
              <p className="text-sm text-gray-500">Supplier · {result.supplier}</p>
              <p className="mt-2 text-sm text-gray-600">{result.snippet}</p>
              <button className="mt-4 btn-primary">Request quotation</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchFallback() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6 animate-pulse">
        <div className="h-10 w-64 rounded-full bg-gray-200" />
        <div className="mt-4 space-y-3">
          <div className="h-24 rounded-2xl bg-gray-200" />
          <div className="h-24 rounded-2xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
