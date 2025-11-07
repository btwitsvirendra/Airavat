import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
    { name: 'Construction & Real Estate', icon: '🏗️' },
  ];

  const products = [
    {
      id: '1',
      name: 'Grey black 600x600 yellow tile for bathroom and hotel',
      price: 170,
      moq: 2,
      supplier: 'Laxmi Granite and Tiles',
      location: 'Pune',
      listingDate: '2:20 pm, 29/8/2025'
    },
    {
      id: '2',
      name: 'Grey black 600x600 yellow tile for bathroom and hotel',
      price: 170,
      moq: 2,
      supplier: 'Laxmi Granite and Tiles',
      location: 'Pune',
      listingDate: '2:20 pm, 29/8/2025'
    },
    {
      id: '3',
      name: 'Grey black 600x600 yellow tile for bathroom and hotel',
      price: 170,
      moq: 2,
      supplier: 'Laxmi Granite and Tiles',
      location: 'Pune',
      listingDate: '2:20 pm, 29/8/2025'
    },
    {
      id: '4',
      name: 'Grey black 600x600 yellow tile for bathroom and hotel',
      price: 170,
      moq: 2,
      supplier: 'Laxmi Granite and Tiles',
      location: 'Pune',
      listingDate: '2:20 pm, 29/8/2025'
    },
    {
      id: '5',
      name: 'Grey black 600x600 yellow tile for bathroom and hotel',
      price: 170,
      moq: 2,
      supplier: 'Laxmi Granite and Tiles',
      location: 'Pune',
      listingDate: '2:20 pm, 29/8/2025'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Carousel */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50">
              <ChevronLeft className="w-6 h-6 text-regal-blue" />
            </button>

            <div className="overflow-hidden">
              <div className="flex space-x-8 px-12">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/products?category=${category.name}`}
                    className="flex flex-col items-center min-w-[120px] group"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-teal-50 transition-colors">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <p className="text-xs text-center text-gray-700 group-hover:text-teal transition-colors">
                      {category.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50">
              <ChevronRight className="w-6 h-6 text-regal-blue" />
            </button>
          </div>
        </div>
      </section>

      {/* ADS Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-regal-blue to-regal-blue-400 rounded-2xl p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">ADS</h2>
            <p className="text-lg opacity-90">Featured promotions and advertisements</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 text-center">
        <button className="bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
          Load More Products
        </button>
      </section>
    </div>
  );
}
