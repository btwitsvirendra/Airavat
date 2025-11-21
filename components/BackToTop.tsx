'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Hide on account/profile pages
  const isAccountPage = pathname?.startsWith('/account');

  useEffect(() => {
    // Don't set up scroll listener on account pages
    if (isAccountPage) return;

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [isAccountPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Don't render on account pages
  if (isAccountPage || !isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        className="group relative w-[50px] h-[50px] rounded-full bg-[rgb(20,20,20)] border-none font-semibold flex items-center justify-center shadow-[0px_0px_0px_4px_rgba(154,121,255,0.253)] cursor-pointer transition-all duration-300 overflow-hidden hover:w-[140px] hover:rounded-[50px] hover:bg-[#3373FF]"
      >
        <svg
          className="w-3 transition-all duration-300 group-hover:translate-y-[-200%]"
          viewBox="0 0 384 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            fill="white"
          />
        </svg>
        <span className="absolute bottom-[-20px] text-white text-[0px] opacity-0 transition-all duration-300 group-hover:text-[13px] group-hover:opacity-100 group-hover:bottom-0">
          Back to Top
        </span>
      </button>
    </div>
  );
}

