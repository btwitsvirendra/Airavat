import { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ variant = 'rectangular', width, height, className, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200',
        {
          'rounded-full': variant === 'circular',
          'rounded': variant === 'rectangular',
          'rounded-md h-4': variant === 'text',
        },
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <Skeleton variant="rectangular" height={200} />
      <div className="p-4">
        <Skeleton variant="text" className="mb-2" />
        <Skeleton variant="text" width="70%" className="mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={80} />
          <Skeleton variant="rectangular" width={100} height={36} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
