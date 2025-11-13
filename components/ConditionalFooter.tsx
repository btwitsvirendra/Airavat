'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on account pages (it will be handled by account layout)
  if (pathname?.startsWith('/account')) {
    return null;
  }
  
  return <Footer />;
}

