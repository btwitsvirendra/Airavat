'use client';

import { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const initialFavorites = [
  {
    id: 'fav-1',
    name: 'Industrial LED Light 100W',
    supplier: 'TechLight Industries',
    price: '₹1,250 / unit',
  },
  {
    id: 'fav-2',
    name: 'Organic Cotton Fabric Rolls',
    supplier: 'Textile Hub',
    price: '₹280 / meter',
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from favourites');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8 flex items-center gap-3 text-regal-blue-900">
          <Heart size={28} className="text-regal-gold-500" />
          <div>
            <h1 className="text-3xl font-bold">Saved Favourites</h1>
            <p className="text-sm text-gray-600">Bookmark suppliers and products to revisit quickly.</p>
          </div>
        </div>

        <div className="space-y-4">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-regal-blue-900">{favorite.name}</h2>
                <p className="text-sm text-gray-500">{favorite.supplier}</p>
                <p className="text-sm font-semibold text-teal-600">{favorite.price}</p>
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary text-sm">Request quote</button>
                <button
                  onClick={() => removeFavorite(favorite.id)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-300 hover:text-red-500"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {favorites.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-teal-300 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-regal-blue-900">No favourites yet</p>
            <p className="mt-2 text-sm text-gray-500">
              Explore the marketplace and click the heart icon on products or suppliers to save them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
