'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error?.message || 'An unexpected error occurred'}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#3373FF] text-white rounded-lg hover:bg-[#265ACC] transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

