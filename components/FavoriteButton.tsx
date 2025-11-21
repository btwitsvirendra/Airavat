'use client';

import React, { useEffect, useState } from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function FavoriteButton({ isFavorite, onChange, className = '' }: FavoriteButtonProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isFavorite !== undefined) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isFavorite]);

  return (
    <label className={`favorite-container block relative cursor-pointer text-xl select-none transition-all duration-100 hover:scale-110 ${className}`}>
      <input
        type="checkbox"
        checked={isFavorite}
        onChange={(e) => onChange(e.target.checked)}
        className="absolute opacity-0 cursor-pointer h-0 w-0"
      />
      <div className={`favorite-checkmark top-0 left-0 h-8 w-8 transition-all duration-100 ${shouldAnimate ? (isFavorite ? 'like-animation' : 'dislike-animation') : ''}`}>
        <svg viewBox="0 0 256 256" className="w-full h-full">
          <rect fill="none" height={256} width={256} />
          <path
            d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
            strokeWidth={isFavorite ? "20px" : "2px"}
            stroke={isFavorite ? "#FFF" : "#000"}
            fill={isFavorite ? '#FF5353' : 'none'}
            className="transition-all duration-100"
          />
        </svg>
      </div>
    </label>
  );
}

