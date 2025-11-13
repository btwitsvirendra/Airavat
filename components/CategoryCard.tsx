'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/lib/data/categories';

export default function CategoryCard() {
  return (
    <div className="relative w-[220px] h-[320px]">
      {/* Card with categories list */}
      <div className="card-category relative w-full h-full bg-white rounded-[15px] overflow-hidden border border-gray-200">
        {/* Categories List with Scrollbar */}
        <div className="absolute inset-0 p-4 overflow-y-auto">
          <nav className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/?category=${category.slug || category.name.toLowerCase()}`}
                className="category-link flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition group text-left"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm text-gray-900 font-medium flex-1 truncate">
                  {category.name}
                </span>
                <ChevronRight size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <style jsx global>{`
        .card-category::-webkit-scrollbar {
          width: 6px;
        }

        .card-category::-webkit-scrollbar-track {
          background: transparent;
        }

        .card-category::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .card-category::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }

        .category-link {
          transform: translateY(0);
          transition: transform 0.1s ease;
        }

        .category-link:hover {
          transform: translateY(-0.2em);
        }

        .category-link:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

