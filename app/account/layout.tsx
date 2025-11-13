'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import AccountSidebar from '@/components/AccountSidebar';
import AccountRightPanel, { PanelType } from '@/components/AccountRightPanel';
import MessagesView from '@/components/MessagesView';
import RFQView from '@/components/RFQView';
import PaymentsView from '@/components/PaymentsView';
import FavoritesView from '@/components/FavoritesView';

function AccountLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [panelType, setPanelType] = useState<PanelType>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'messages' | 'rfq' | 'payments' | 'favorites'>('dashboard');

  // Check URL parameter on mount and when it changes
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'messages') {
      setActiveView('messages');
      setIsPanelOpen(false);
      setPanelType(null);
    } else if (view === 'rfq') {
      setActiveView('rfq');
      setIsPanelOpen(false);
      setPanelType(null);
    } else if (view === 'payments') {
      setActiveView('payments');
      setIsPanelOpen(false);
      setPanelType(null);
    } else if (view === 'favorites') {
      setActiveView('favorites');
      setIsPanelOpen(false);
      setPanelType(null);
    }
  }, [searchParams]);

  const handlePanelOpen = useCallback((type: PanelType) => {
    if (type === 'messages') {
      setActiveView('messages');
      setIsPanelOpen(false);
      setPanelType(null);
    } else if (type === 'rfq') {
      setActiveView('rfq');
      setIsPanelOpen(false);
      setPanelType(null);
    } else if (type === 'payments') {
      setActiveView('payments');
      setIsPanelOpen(false);
      setPanelType(null);
    } else {
      setPanelType(type);
      setIsPanelOpen(true);
      setActiveView('dashboard');
    }
  }, []);

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setTimeout(() => setPanelType(null), 300); // Wait for animation to complete
  };

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
  };

  return (
    <div className={`${activeView === 'messages' || activeView === 'rfq' || activeView === 'payments' || activeView === 'favorites' ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-gray-50`}>
      <div className="flex relative h-full">
        {/* White Sidebar */}
        <AccountSidebar onPanelOpen={handlePanelOpen} onBackToDashboard={handleBackToDashboard} activeView={activeView} />

        {/* Main Content Area */}
        {activeView === 'messages' ? (
          <div className="flex-1 ml-[250px] min-w-0 h-full">
            <MessagesView />
          </div>
        ) : activeView === 'rfq' ? (
          <div className="flex-1 ml-[250px] min-w-0 h-full">
            <RFQView />
          </div>
        ) : activeView === 'payments' ? (
          <div className="flex-1 ml-[250px] min-w-0 h-full">
            <PaymentsView />
          </div>
        ) : activeView === 'favorites' ? (
          <div className="flex-1 ml-[250px] min-w-0 h-full">
            <FavoritesView />
          </div>
        ) : (
          <>
            <div className={`flex-1 ml-[250px] min-w-0 transition-all duration-300 ${isPanelOpen ? 'hidden' : ''}`}>
              {children}
            </div>

            {/* Right Panel */}
            <AccountRightPanel isOpen={isPanelOpen} panelType={panelType} onClose={handlePanelClose} />
          </>
        )}
      </div>
    </div>
  );
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <AccountLayoutContent>{children}</AccountLayoutContent>
    </Suspense>
  );
}

