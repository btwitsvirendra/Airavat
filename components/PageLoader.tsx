'use client';

import Loader from './Loader';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(249, 249, 255, 0.9)' }}>
      <Loader />
    </div>
  );
}

