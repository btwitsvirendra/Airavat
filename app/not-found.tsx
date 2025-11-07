import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mb-4 inline-flex rounded-full bg-gray-100 p-4">
          <FileQuestion className="h-16 w-16 text-gray-600" />
        </div>
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-regal-blue-600 px-6 py-3 text-white transition-colors hover:bg-regal-blue-700"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
