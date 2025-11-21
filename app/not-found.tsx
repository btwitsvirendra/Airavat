import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
        <p className="text-gray-500 mb-8">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#3373FF] text-white rounded-lg hover:bg-[#265ACC] transition inline-block"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}


