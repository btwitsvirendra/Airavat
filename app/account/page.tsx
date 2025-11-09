'use client';

import { useState } from 'react';
import { Calendar, Mail, Phone, User } from 'lucide-react';
import { useStore } from '@/lib/store';
import WorkInProgress from '@/components/WorkInProgress';

export default function AccountPage() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!user) {
    return (
      <WorkInProgress
        title="My Airavat"
        description="Sign in with the demo credentials to preview personalised dashboards."
        suggestions={[
          'Use iamvirendra07@gmail.com to explore the buyer experience',
          'Post an RFQ to watch it appear under Orders',
          'Chat with suppliers to unlock full messaging capabilities',
        ]}
      />
    );
  }

  const handleSignOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      setUser(null);
      setIsSigningOut(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 text-2xl font-semibold text-white">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-regal-blue-900">{user.name}</h1>
              <p className="text-sm text-gray-500">Buyer · {user.company}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 text-gray-700">
              <Mail size={18} className="text-teal-500" /> {user.email}
            </div>
            {user.phone && (
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 text-gray-700">
                <Phone size={18} className="text-teal-500" /> {user.phone}
              </div>
            )}
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 text-gray-700">
              <User size={18} className="text-teal-500" /> Role: {user.role.toUpperCase()}
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 text-gray-700">
              <Calendar size={18} className="text-teal-500" /> Joined {user.createdAt.toLocaleDateString('en-IN')}
            </div>
          </div>

          <button onClick={handleSignOut} className="mt-8 btn-outline" disabled={isSigningOut}>
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </div>
    </div>
  );
}
