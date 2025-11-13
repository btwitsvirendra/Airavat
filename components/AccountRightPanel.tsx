'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MessagesPanel from './panels/MessagesPanel';
import PaymentsPanel from './panels/PaymentsPanel';
import HelpPanel from './panels/HelpPanel';
import RFQPanel from './panels/RFQPanel';

export type PanelType = 'messages' | 'payments' | 'help' | 'rfq' | null;

interface AccountRightPanelProps {
  isOpen: boolean;
  panelType: PanelType;
  onClose: () => void;
}

export default function AccountRightPanel({ isOpen, panelType, onClose }: AccountRightPanelProps) {
  const getPanelTitle = () => {
    switch (panelType) {
      case 'messages':
        return 'Messages';
      case 'payments':
        return 'Payments';
      case 'help':
        return 'Help Center';
      case 'rfq':
        return 'Request for Quotation';
      default:
        return '';
    }
  };

  const renderPanelContent = () => {
    switch (panelType) {
      case 'messages':
        return <MessagesPanel />;
      case 'payments':
        return <PaymentsPanel />;
      case 'help':
        return <HelpPanel />;
      case 'rfq':
        return <RFQPanel />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && panelType && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-[132px] right-0 bottom-0 left-[250px] bg-white shadow-2xl z-50 flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{getPanelTitle()}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{renderPanelContent()}</div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}

