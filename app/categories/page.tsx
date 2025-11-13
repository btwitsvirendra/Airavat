'use client';

import Link from 'next/link';
import { categories } from '@/lib/data/categories';
import { ChevronRight, PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Categories</h1>
          <p className="text-gray-600">Browse products by category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{category.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{category.description}</p>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="flex items-center gap-1 text-sm text-teal-600">
                        <span>{category.subcategories.length} subcategories</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Category Statistics */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">{categories.length}</div>
              <div className="text-sm text-gray-600">Main Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {categories.reduce((acc, cat) => acc + (cat.subcategories?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Subcategories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">10K+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">5K+</div>
              <div className="text-sm text-gray-600">Suppliers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

