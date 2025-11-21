'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookiesPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-sm"
        >
          <div className="bg-gray-50 shadow-lg dark:bg-[#1E2735] rounded-2xl hover:bg-[#3373FF] hover:bg-opacity-10 dark:hover:bg-[#3373FF] dark:hover:bg-opacity-10 hover:-translate-y-3 transition duration-300 p-6 md:p-12">
            <div className="text-center">
              <img
                src="https://cdn.easyfrontend.com/pictures/cookies.png"
                alt=""
                className="mb-4 mx-auto"
                width="100"
                height="auto"
              />
              <p className="leading-normal opacity-80 mb-4 text-zinc-900 dark:text-white">
                This website uses cookies to ensure you the best experience on
                our website.
              </p>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  handleAccept();
                }}
                className="text-lg font-bold leading-none hover:text-[#3373FF] mb-3 mr-1 transition-colors cursor-pointer text-zinc-900 dark:text-white"
              >
                Accept
              </a>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  handleReject();
                }}
                className="text-lg font-bold leading-none hover:text-[#3373FF] mb-3 ml-1 transition-colors cursor-pointer text-zinc-900 dark:text-white"
              >
                Reject
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookiesPopup;

