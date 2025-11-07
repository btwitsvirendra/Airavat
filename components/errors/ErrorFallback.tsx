'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  reset?: () => void;
}

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mb-4 inline-flex rounded-full bg-red-100 p-4">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h2>
        <p className="mb-4 text-gray-600">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-regal-blue-600 px-6 py-3 text-white transition-colors hover:bg-regal-blue-700"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
