'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface FilterSidebarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const sortByOptions = [
  { id: 'default', label: 'Default', value: 'relevance' },
  { id: 'popularity', label: 'Popularity', value: 'popularity' },
  { id: 'rating', label: 'Average rating', value: 'rating' },
  { id: 'newness', label: 'Newness', value: 'newness' },
  { id: 'price-low', label: 'Price: Low to High', value: 'price-low' },
  { id: 'price-high', label: 'Price: High to Low', value: 'price-high' },
];

const colorOptions = [
  { id: 'color-blue', label: 'Blue' },
  { id: 'color-brown', label: 'Brown' },
  { id: 'color-grey', label: 'Grey' },
  { id: 'color-green', label: 'Green' },
  { id: 'color-orange', label: 'Orange' },
  { id: 'color-white', label: 'White' },
];

const priceRanges = [
  { label: '₹0 - ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹50,000', min: 10000, max: 50000 },
  { label: '₹50,000+', min: 50000, max: 1000000 },
];

export default function FilterSidebar({
  sortBy,
  onSortChange,
  minPrice,
  maxPrice,
  onPriceChange,
}: FilterSidebarProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [customMinPrice, setCustomMinPrice] = useState<string>(minPrice.toString());
  const [customMaxPrice, setCustomMaxPrice] = useState<string>(maxPrice.toString());

  const handleMinPriceChange = (value: string) => {
    setCustomMinPrice(value);
    const numValue = parseInt(value) || 0;
    onPriceChange(numValue, maxPrice);
  };

  const handleMaxPriceChange = (value: string) => {
    setCustomMaxPrice(value);
    const numValue = parseInt(value) || 1000000;
    onPriceChange(minPrice, numValue);
  };

  const handlePriceRangeClick = (min: number, max: number) => {
    setCustomMinPrice(min.toString());
    setCustomMaxPrice(max.toString());
    onPriceChange(min, max);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 mt-4">
      <form>
        {/* Sort By */}
        <div>
          <h5 className="text-xl leading-tight font-bold mt-6 text-gray-900">Sort By</h5>
          {sortByOptions.map((option) => (
            <div className="block mt-4" key={option.id}>
              <input
                className="mr-2 cursor-pointer accent-[#3373FF]"
                type="radio"
                id={option.id}
                name="sortBy"
                checked={sortBy === option.value}
                onChange={() => onSortChange(option.value)}
              />
              <label className="cursor-pointer text-gray-700 hover:text-[#3373FF] transition-colors" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Price */}
        <div>
          <h5 className="text-xl leading-tight font-bold mt-6 mb-4 text-gray-900">Price</h5>
          
          {/* Quick Price Ranges */}
          <div className="space-y-2 mb-4">
            {priceRanges.map((range, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handlePriceRangeClick(range.min, range.max)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  minPrice === range.min && maxPrice === range.max
                    ? 'bg-[#3373FF] text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Custom Price Range */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex-1 min-w-[120px]">
              <select
                className="bg-white border border-gray-200 rounded-md p-3 w-full text-sm text-gray-700 focus:outline-none focus:border-[#3373FF]"
                value={customMinPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
              >
                <option value="0">Min Price</option>
                <option value="100">₹100</option>
                <option value="500">₹500</option>
                <option value="1000">₹1,000</option>
                <option value="5000">₹5,000</option>
                <option value="10000">₹10,000</option>
                <option value="50000">₹50,000</option>
              </select>
            </div>
            <div className="mx-2">
              <p className="mb-0 text-nowrap text-gray-600">--</p>
            </div>
            <div className="flex-1 min-w-[120px]">
              <select
                className="bg-white border border-gray-200 rounded-md p-3 w-full text-sm text-gray-700 focus:outline-none focus:border-[#3373FF]"
                value={customMaxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
              >
                <option value="1000000">Max Price</option>
                <option value="1000">₹1,000</option>
                <option value="5000">₹5,000</option>
                <option value="10000">₹10,000</option>
                <option value="50000">₹50,000</option>
                <option value="100000">₹100,000</option>
                <option value="500000">₹500,000</option>
                <option value="1000000">₹1,000,000+</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Color */}
        <div>
          <h5 className="text-xl leading-tight font-bold mt-6 text-gray-900">Color</h5>
          {colorOptions.map((option) => (
            <div className="block mt-4" key={option.id}>
              <input
                className="mr-2 cursor-pointer accent-[#3373FF]"
                type="radio"
                name="flexRadioColor"
                id={option.id}
                checked={selectedColor === option.id}
                onChange={() => setSelectedColor(option.id)}
              />
              <label className="cursor-pointer text-gray-700 hover:text-[#3373FF] transition-colors" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

