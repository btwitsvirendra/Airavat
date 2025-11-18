'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from './Loader';

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Show loader when navigation starts
    setIsNavigating(true);
    setLoading(true);
    
    // Hide loader after page has loaded
    const timer = setTimeout(() => {
      setLoading(false);
      // Small delay before allowing next navigation
      setTimeout(() => setIsNavigating(false), 100);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading || !isNavigating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(249, 249, 255, 0.9)' }}>
      <Loader />
    </div>
  );
}

