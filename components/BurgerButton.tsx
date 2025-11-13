'use client';

import React from 'react';

interface BurgerButtonProps {
  onToggle?: (isOpen: boolean) => void;
  onSelectChat?: () => void;
  isChecked?: boolean;
}

export default function BurgerButton({ onToggle, onSelectChat, isChecked = false }: BurgerButtonProps) {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (onToggle) {
      onToggle(checked);
    }
    if (onSelectChat) {
      onSelectChat();
    }
  };

  return (
    <label className="relative w-[10px] h-[7.5px] bg-transparent cursor-pointer block" htmlFor="burger">
      <input
        type="checkbox"
        id="burger"
        checked={isChecked}
        onChange={handleToggle}
        className="hidden"
      />
      <span
        className={`absolute h-[1.5px] w-full bg-black rounded-[9px] opacity-100 left-0 transition-all duration-[250ms] ease-in-out origin-left ${
          isChecked
            ? 'rotate-45 top-0 left-[1.25px]'
            : 'rotate-0 top-0'
        }`}
      />
      <span
        className={`absolute h-[1.5px] bg-black rounded-[9px] left-0 transition-all duration-[250ms] ease-in-out top-1/2 -translate-y-1/2 origin-left ${
          isChecked ? 'w-0 opacity-0 pointer-events-none' : 'w-full opacity-100'
        }`}
        style={isChecked ? { width: '0%', opacity: 0 } : { width: '100%', opacity: 1 }}
      />
      <span
        className={`absolute h-[1.5px] w-full bg-black rounded-[9px] opacity-100 left-0 transition-all duration-[250ms] ease-in-out origin-left ${
          isChecked
            ? '-rotate-45 top-[7px] left-[1.25px]'
            : 'rotate-0 top-full -translate-y-full'
        }`}
      />
    </label>
  );
}

