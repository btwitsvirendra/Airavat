'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import SellerDashboard from '../page';

export default function SellerDashboardPage() {
  const router = useRouter();
  const { user, currentView } = useStore();

  useEffect(() => {
    // Redirect if not logged in or if in buyer view
    if (!user) {
      router.push('/login');
      return;
    }
    if (currentView === 'buyer') {
      router.push('/buyer/dashboard');
      return;
    }
    // Check if user has seller role
    const hasSellerRole = user.roles?.includes('seller') && user.supplierStatus === 'active';
    if (!hasSellerRole) {
      router.push('/buyer/dashboard');
      return;
    }
  }, [user, currentView, router]);

  if (!user || currentView === 'buyer') {
    return null;
  }

  return <SellerDashboard />;
}



