'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account?view=favorites');
  }, [router]);

  return null;
}

