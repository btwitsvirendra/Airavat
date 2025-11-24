'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const pathname = usePathname();
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

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const pageTransition = {
    duration: 0.3,
    ease: "easeInOut"
  };

  return (
    <div className={`${activeView === 'messages' || activeView === 'rfq' || activeView === 'payments' || activeView === 'favorites' ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-gray-50`}>
      <div className="flex relative h-full">
        {/* White Sidebar */}
        <AccountSidebar onPanelOpen={handlePanelOpen} onBackToDashboard={handleBackToDashboard} activeView={activeView} />

        {/* Main Content Area */}
        <div className="flex-1 ml-[60px] min-w-0 h-full relative">
          <AnimatePresence mode="wait">
            {activeView === 'messages' ? (
              <motion.div
                key="messages"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                className="h-full"
              >
                <MessagesView />
              </motion.div>
            ) : activeView === 'rfq' ? (
              <motion.div
                key="rfq"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                className="h-full"
              >
                <RFQView />
              </motion.div>
            ) : activeView === 'payments' ? (
              <motion.div
                key="payments"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                className="h-full"
              >
                <PaymentsView />
              </motion.div>
            ) : activeView === 'favorites' ? (
              <motion.div
                key="favorites"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                className="h-full"
              >
                <FavoritesView />
              </motion.div>
            ) : (
              <motion.div
                key={pathname} // Animate on route change
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                className={`h-full ${isPanelOpen ? 'hidden' : ''}`}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Panel - Outside AnimatePresence to persist state or handle its own animation */}
          {activeView === 'dashboard' && (
            <AccountRightPanel isOpen={isPanelOpen} panelType={panelType} onClose={handlePanelClose} />
          )}
        </div>
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

