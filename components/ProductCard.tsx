'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus, MessageSquare } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  moq: number;
  image?: string;
  supplier: string;
  location: string;
  listingDate?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  moq,
  image,
  supplier,
  location,
  listingDate
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(moq);

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > moq) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">📦</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-teal hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm text-gray-600 line-clamp-2 mb-2 h-10">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">Easy return</p>

          {/* Price */}
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-lg font-bold text-regal-blue">₹{price}</span>
          </div>

          {/* MOQ & Location */}
          <div className="text-xs text-gray-500 space-y-1 mb-3">
            <p>MOQ : {moq} pieces</p>
            <p>{supplier}</p>
            {listingDate && (
              <p>Listing Date : {listingDate}</p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">Qty</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrease}
                  className="p-1 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="p-1 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
              className="p-2 bg-teal text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
