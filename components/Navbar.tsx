'use client';

import React, { useState, useRef, useEffect, cloneElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  MessageSquare,
  ShoppingCart,
  User,
  ShieldCheck,
  PackageSearch,
  ChevronDown,
  ChevronRight,
  Globe,
  X,
  AppWindow,
  HelpCircle,
  Camera,
  FileText,
  Store,
  Rocket,
  FileText as FileTextIcon,
  Star,
  LogOut,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { categories } from '@/lib/data/categories';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

// Header Dock Icon Component
type HeaderDockItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
  mouseX: MotionValue<number>;
  spring: { mass: number; stiffness: number; damping: number };
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function HeaderDockItem({
  icon,
  label,
  href,
  badge,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: HeaderDockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className="relative inline-flex items-center justify-center overflow-visible"
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <Link href={href} className="flex items-center justify-center w-full h-full group">
        <div className="relative flex items-center justify-center">
          {React.isValidElement(icon)
            ? cloneElement(icon as React.ReactElement<any>, {
              className: `${(icon as any).props?.className || ''} group-hover:text-[#3373FF] transition-colors duration-300`.trim()
            })
            : icon
          }
          {badge && badge > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#3373FF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold z-20 shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </Link>
      <HeaderDockLabel isHovered={isHovered}>{label}</HeaderDockLabel>
    </motion.div>
  );
}

type HeaderDockLabelProps = {
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function HeaderDockLabel({ children, isHovered }: HeaderDockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 w-fit whitespace-nowrap text-xs text-gray-700 pointer-events-none z-50 font-medium"
          style={{
            x: '-50%',
            top: 'calc(100% + 5px)',
            maxWidth: '200px',
            wordBreak: 'keep-all'
          }}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Account Dropdown Component
type AccountDropdownProps = {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function AccountDropdown({ user, isOpen, onClose, onMouseEnter, onMouseLeave }: AccountDropdownProps) {
  const setUser = useStore((state: any) => state.setUser);

  const handleLogout = () => {
    setUser(null);
    onClose();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const handleSignIn = () => {
    onClose();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  if (!isOpen) return null;

  // If user is not logged in, show sign-in dropdown
  if (!user) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-[320px] divide-y divide-[#E2E8F0] overflow-hidden rounded-lg bg-white shadow-lg z-50"
            style={{ backgroundColor: 'var(--color-bg-surface)' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {/* Sign In Header */}
            <div className="px-6 py-4">
              <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-main)' }}>
                Sign back in to continue
              </h3>
            </div>

            {/* Sign In Button */}
            <div className="px-6 pb-4">
              <button
                onClick={handleSignIn}
                className="w-full text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: 'var(--color-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }}
              >
                Sign in
              </button>
            </div>

            {/* Social Media Sign In */}
            <div className="px-6 pb-4">
              <p className="text-sm mb-3 text-center" style={{ color: 'var(--color-text-body)' }}>
                Or, continue with:
              </p>
              <div className="flex justify-center gap-4">
                {/* Facebook */}
                <button
                  onClick={() => {
                    // Handle Facebook login
                    onClose();
                  }}
                  className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:bg-[#1565C0] transition-all duration-200 hover:scale-110"
                  aria-label="Sign in with Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                {/* Google */}
                <button
                  onClick={() => {
                    // Handle Google login
                    onClose();
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '2px solid var(--color-border)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                  aria-label="Sign in with Google"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </button>
                {/* LinkedIn */}
                <button
                  onClick={() => {
                    // Handle LinkedIn login
                    onClose();
                  }}
                  className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center hover:bg-[#006399] transition-all duration-200 hover:scale-110"
                  aria-label="Sign in with LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Legal Text */}
            <div className="px-6 pb-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                By signing in via social media, I agree to the{' '}
                <Link
                  href="/terms"
                  className="hover:underline transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onClick={onClose}
                >
                  Airavat Free Membership Agreement
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="hover:underline transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onClick={onClose}
                >
                  Privacy Policy
                </Link>
                , and to receive emails about the platform&apos;s products and services.
              </p>
            </div>

            {/* Account Navigation Links */}
            <div style={{ borderTop: '1px solid var(--color-border)' }}>
              <Link
                href="/account"
                onClick={onClose}
                className="flex w-full items-center px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-body)';
                }}
              >
                My Airavat
              </Link>
              <Link
                href="/orders"
                onClick={onClose}
                className="flex w-full items-center px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-body)';
                }}
              >
                Orders
              </Link>
              <Link
                href="/account?view=messages"
                onClick={onClose}
                className="flex w-full items-center px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-body)';
                }}
              >
                Messages
              </Link>
              <Link
                href="/account?view=rfq"
                onClick={onClose}
                className="flex w-full items-center px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-body)';
                }}
              >
                RFQs
              </Link>
              <Link
                href="/account?view=favorites"
                onClick={onClose}
                className="flex w-full items-center px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-body)';
                }}
              >
                Favorites
              </Link>
              <Link
                href="/account"
                onClick={onClose}
                className="flex w-full items-center px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-body)';
                }}
              >
                Account
              </Link>
            </div>

            {/* Membership Program */}
            <div style={{ borderTop: '1px solid var(--color-border)' }}>
              <Link
                href="/membership"
                onClick={onClose}
                className="flex w-full items-center px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-body)';
                }}
              >
                Membership program
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const menuItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 7C6.125 7 4.625 5.525 4.625 3.725C4.625 1.925 6.125 0.449997 8 0.449997C9.875 0.449997 11.375 1.925 11.375 3.725C11.375 5.525 9.875 7 8 7ZM8 1.575C6.75 1.575 5.75 2.55 5.75 3.725C5.75 4.9 6.75 5.875 8 5.875C9.25 5.875 10.25 4.9 10.25 3.725C10.25 2.55 9.25 1.575 8 1.575Z" fill="currentColor" />
          <path d="M13.275 15.575C12.975 15.575 12.7 15.325 12.7 15V14.275C12.7 11.675 10.6 9.575 8.00003 9.575C5.40002 9.575 3.30002 11.675 3.30002 14.275V15C3.30002 15.3 3.05002 15.575 2.72502 15.575C2.40002 15.575 2.15002 15.325 2.15002 15V14.275C2.15002 11.05 4.77502 8.45 7.97502 8.45C11.175 8.45 13.8 11.075 13.8 14.275V15C13.825 15.3 13.575 15.575 13.275 15.575Z" fill="currentColor" />
        </svg>
      ),
      label: 'Profile',
      href: '/account?view=profile',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2453_19971)">
            <path d="M15.175 6.45C14.925 6.175 14.575 6.025 14.2 6.025H14.125C14 6.025 13.9 5.95 13.875 5.85C13.85 5.75 13.8 5.675 13.775 5.575C13.725 5.475 13.775 5.375 13.85 5.3L13.9 5.25C14.175 5 14.325 4.65 14.325 4.275C14.325 3.9 14.2 3.55 13.925 3.275L12.95 2.275C12.425 1.725 11.525 1.7 10.975 2.25L10.9 2.3C10.825 2.375 10.7 2.4 10.575 2.35C10.475 2.3 10.375 2.25 10.25 2.225C10.125 2.175 10.05 2.075 10.05 1.975V1.85C10.05 1.075 9.42504 0.449997 8.65004 0.449997H7.25004C6.87504 0.449997 6.52504 0.599997 6.27504 0.849997C6.00004 1.125 5.87504 1.475 5.87504 1.825V1.925C5.87504 2.025 5.80004 2.125 5.70004 2.175C5.65004 2.2 5.62504 2.2 5.57504 2.225C5.47504 2.275 5.35004 2.25 5.27504 2.175L5.22504 2.1C4.97504 1.825 4.62504 1.675 4.25004 1.675C3.87504 1.675 3.52504 1.8 3.25004 2.075L2.25004 3.05C1.70004 3.575 1.67504 4.475 2.22504 5.025L2.27504 5.1C2.35004 5.175 2.37504 5.3 2.32504 5.375C2.27504 5.475 2.25004 5.55 2.20004 5.65C2.15004 5.75 2.07504 5.8 1.95004 5.8H1.87504C1.50004 5.8 1.15004 5.925 0.875041 6.2C0.600041 6.45 0.450041 6.8 0.450041 7.175L0.425041 8.575C0.400041 9.35 1.02504 9.975 1.80004 10H1.87504C2.00004 10 2.10004 10.075 2.12504 10.175C2.17504 10.25 2.22504 10.325 2.25004 10.425C2.27504 10.525 2.25004 10.625 2.17504 10.7L2.12504 10.75C1.85004 11 1.70004 11.35 1.70004 11.725C1.70004 12.1 1.82504 12.45 2.10004 12.725L3.07504 13.725C3.60004 14.275 4.50004 14.3 5.05004 13.75L5.12504 13.7C5.20004 13.625 5.32504 13.6 5.45004 13.65C5.55004 13.7 5.65004 13.75 5.77504 13.775C5.90004 13.825 5.97504 13.925 5.97504 14.025V14.125C5.97504 14.9 6.60004 15.525 7.37504 15.525H8.77504C9.55004 15.525 10.175 14.9 10.175 14.125V14.025C10.175 13.925 10.25 13.825 10.35 13.775C10.4 13.75 10.425 13.75 10.475 13.725C10.6 13.675 10.7 13.7 10.775 13.775L10.825 13.85C11.075 14.125 11.425 14.275 11.8 14.275C12.175 14.275 12.525 14.15 12.8 13.875L13.8 12.9C14.35 12.375 14.375 11.475 13.825 10.925L13.775 10.85C13.7 10.775 13.675 10.65 13.725 10.575C13.775 10.475 13.8 10.4 13.85 10.3C13.9 10.2 14 10.15 14.1 10.15H14.175H14.2C14.95 10.15 15.575 9.55 15.6 8.775L15.625 7.375C15.575 7.075 15.425 6.7 15.175 6.45ZM14.425 8.8C14.425 8.95 14.3 9.075 14.15 9.075H14.075H14.05C13.475 9.075 12.95 9.425 12.75 9.925C12.725 10 12.675 10.075 12.65 10.15C12.425 10.65 12.525 11.275 12.925 11.675L12.975 11.75C13.075 11.85 13.075 12.025 12.975 12.125L11.975 13.1C11.9 13.175 11.825 13.175 11.775 13.175C11.725 13.175 11.65 13.175 11.575 13.1L11.525 13.025C11.125 12.6 10.525 12.475 9.97504 12.725L9.87504 12.775C9.32504 13 8.97504 13.5 8.97504 14.075V14.175C8.97504 14.325 8.85004 14.45 8.70004 14.45H7.30004C7.15004 14.45 7.02504 14.325 7.02504 14.175V14.075C7.02504 13.5 6.67504 12.975 6.12504 12.775C6.05004 12.75 5.95004 12.7 5.87504 12.675C5.67504 12.575 5.47504 12.55 5.27504 12.55C4.92504 12.55 4.57504 12.675 4.30004 12.95L4.25004 12.975C4.15004 13.075 3.97504 13.075 3.87504 12.975L2.90004 11.975C2.82504 11.9 2.82504 11.825 2.82504 11.775C2.82504 11.725 2.82504 11.65 2.90004 11.575L2.95004 11.525C3.37504 11.125 3.50004 10.5 3.27504 10C3.25004 9.925 3.22504 9.85 3.17504 9.775C2.97504 9.25 2.47504 8.875 1.90004 8.875H1.82504C1.67504 8.875 1.55004 8.75 1.55004 8.6L1.57504 7.2C1.57504 7.1 1.62504 7.05 1.65004 7C1.67504 6.975 1.75004 6.925 1.85004 6.925H1.92504C2.50004 6.95 3.02504 6.6 3.25004 6.075C3.27504 6 3.32504 5.925 3.35004 5.85C3.57504 5.35 3.47504 4.725 3.07504 4.325L3.02504 4.25C2.92504 4.15 2.92504 3.975 3.02504 3.875L4.02504 2.9C4.10004 2.825 4.17504 2.825 4.22504 2.825C4.27504 2.825 4.35004 2.825 4.42504 2.9L4.47504 2.975C4.87504 3.4 5.47504 3.525 6.02504 3.3L6.12504 3.25C6.67504 3.025 7.02504 2.525 7.02504 1.95V1.85C7.02504 1.75 7.07504 1.7 7.10004 1.65C7.12504 1.6 7.20004 1.575 7.30004 1.575H8.70004C8.85004 1.575 8.97504 1.7 8.97504 1.85V1.95C8.97504 2.525 9.32504 3.05 9.87504 3.25C9.95004 3.275 10.05 3.325 10.125 3.35C10.65 3.6 11.275 3.5 11.7 3.1L11.775 3.05C11.875 2.95 12.05 2.95 12.15 3.05L13.125 4.05C13.2 4.125 13.2 4.2 13.2 4.25C13.2 4.3 13.175 4.375 13.125 4.45L13.075 4.5C12.625 4.875 12.5 5.5 12.7 6C12.725 6.075 12.75 6.15 12.8 6.225C13 6.75 13.5 7.125 14.075 7.125H14.15C14.25 7.125 14.3 7.175 14.35 7.2C14.4 7.225 14.425 7.3 14.425 7.4V8.8Z" fill="currentColor" />
            <path d="M8.0001 4.59999C6.1251 4.59999 4.6001 6.12499 4.6001 7.99999C4.6001 9.87499 6.1251 11.4 8.0001 11.4C9.8751 11.4 11.4001 9.87499 11.4001 7.99999C11.4001 6.12499 9.8751 4.59999 8.0001 4.59999ZM8.0001 10.275C6.7501 10.275 5.7251 9.24999 5.7251 7.99999C5.7251 6.74999 6.7501 5.72499 8.0001 5.72499C9.2501 5.72499 10.2751 6.74999 10.2751 7.99999C10.2751 9.24999 9.2501 10.275 8.0001 10.275Z" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clip0_2453_19971">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      label: 'Dashboard',
      href: '/account',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.55 1.97501H2.00005C1.15005 1.97501 0.425049 2.67501 0.425049 3.55001V12.975C0.425049 13.375 0.650049 13.75 1.02505 13.925C1.17505 14 1.32505 14.025 1.47505 14.025C1.72505 14.025 1.95005 13.95 2.15005 13.775L4.27505 12.025H10.55C13.325 12.025 15.575 9.77501 15.575 7.00001C15.575 4.22501 13.3 1.97501 10.55 1.97501ZM10.55 10.9H4.07505C3.95005 10.9 3.82505 10.95 3.72505 11.025L1.57505 12.8V3.55001C1.57505 3.30001 1.77505 3.10001 2.02505 3.10001H10.575C12.725 3.10001 14.475 4.85001 14.475 7.00001C14.45 9.15001 12.7 10.9 10.55 10.9Z" fill="currentColor" />
        </svg>
      ),
      label: 'Chats',
      href: '/account?view=messages',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.1 1.925L15.025 1.85C12.95 -0.0500008 9.79995 -0.0500008 7.72495 1.85L7.64995 1.925C7.52495 2.025 7.47495 2.175 7.47495 2.35V6.425H2.14995C1.34995 6.425 0.699951 7.075 0.699951 7.875V14.15C0.699951 14.95 1.34995 15.6 2.14995 15.6H13.65C14.55 15.6 15.275 14.875 15.275 13.975V2.35C15.3 2.175 15.225 2.025 15.1 1.925ZM1.82495 14.125V7.85C1.82495 7.675 1.97495 7.525 2.14995 7.525H7.44995V14.425H2.14995C1.97495 14.45 1.82495 14.3 1.82495 14.125ZM10.8 14.45V12.95C10.8 12.6 11.075 12.325 11.425 12.325C11.775 12.325 12.05 12.6 12.05 12.95V14.45H10.8ZM14.175 13.925C14.175 14.2 13.95 14.425 13.675 14.425H13.175V12.925C13.175 11.95 12.4 11.175 11.425 11.175C10.45 11.175 9.67495 11.95 9.67495 12.925V14.425H8.57495V6.975V2.6C10.2 1.225 12.55 1.225 14.175 2.6V13.925Z" fill="currentColor" />
        </svg>
      ),
      label: 'Favorite',
      href: '/account?view=favorites',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2.975H2.00005C1.15005 2.975 0.425049 3.675 0.425049 4.55V11.45C0.425049 12.3 1.12505 13.025 2.00005 13.025H14C14.85 13.025 15.575 12.325 15.575 11.45V4.55C15.575 3.675 14.85 2.975 14 2.975ZM14.45 11.45C14.45 11.7 14.25 11.9 14 11.9H2.00005C1.75005 11.9 1.55005 11.7 1.55005 11.45V4.55C1.55005 4.3 1.75005 4.1 2.00005 4.1H14C14.25 4.1 14.45 4.3 14.45 4.55V11.45Z" fill="currentColor" />
          <path d="M10.55 9.725H5.45C5.15 9.725 4.875 9.975 4.875 10.3C4.875 10.625 5.125 10.875 5.45 10.875H10.55C10.85 10.875 11.125 10.625 11.125 10.3C11.125 9.975 10.85 9.725 10.55 9.725Z" fill="currentColor" />
        </svg>
      ),
      label: 'RFQ',
      href: '/account?view=rfq',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2404_1284)">
            <path d="M10.5499 7.425H8.5499V5.45C8.5499 5.15 8.2999 4.9 7.9749 4.9C7.6749 4.9 7.4249 5.15 7.4249 5.475V7.45H5.4499C5.1499 7.45 4.8999 7.7 4.8999 8.025C4.8999 8.325 5.1499 8.575 5.4749 8.575H7.4499V10.55C7.4499 10.85 7.6999 11.1 8.0249 11.1C8.3249 11.1 8.5749 10.85 8.5749 10.525V8.55H10.5499C10.8499 8.55 11.0999 8.3 11.0999 7.975C11.0999 7.675 10.8499 7.425 10.5499 7.425Z" fill="currentColor" />
            <path d="M7.99995 0.45C3.82495 0.45 0.449951 3.825 0.449951 8C0.449951 12.175 3.84995 15.575 8.02495 15.575C12.2 15.575 15.6 12.175 15.6 8C15.575 3.825 12.175 0.45 7.99995 0.45ZM7.99995 14.45C4.44995 14.45 1.57495 11.55 1.57495 8C1.57495 4.45 4.44995 1.575 7.99995 1.575C11.55 1.575 14.45 4.45 14.45 8C14.45 11.55 11.55 14.45 7.99995 14.45Z" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clip0_2404_1284">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      label: 'Payments',
      href: '/account?view=payments',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5.775H4.925C4.625 5.775 4.375 5.525 4.375 5.225C4.375 4.925 4.625 4.675 4.925 4.675H13.8L12.65 3.325C12.45 3.075 12.475 2.725 12.725 2.525C12.975 2.325 13.325 2.35 13.525 2.6L15.45 4.875C15.6 5.05 15.625 5.275 15.525 5.475C15.425 5.65 15.225 5.775 15 5.775Z" fill="currentColor" />
          <path d="M2.92494 13.625C2.77494 13.625 2.59994 13.55 2.49994 13.425L0.574941 11.15C0.424941 10.975 0.399941 10.75 0.499941 10.55C0.599941 10.35 0.799941 10.225 0.999941 10.225H11.0749C11.3749 10.225 11.6249 10.475 11.6249 10.775C11.6249 11.075 11.3749 11.325 11.0749 11.325H2.19994L3.34994 12.675C3.54994 12.925 3.52494 13.275 3.27494 13.475C3.17494 13.6 3.04994 13.625 2.92494 13.625Z" fill="currentColor" />
        </svg>
      ),
      label: 'Switch to supplier',
      href: '/supplier/register',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.3001 6.45001C3.9751 6.45001 3.7251 6.70001 3.7251 7.02501C3.7251 7.35001 3.9751 7.60001 4.3001 7.60001C4.6251 7.60001 4.8751 7.35001 4.8751 7.02501C4.8751 6.70001 4.6001 6.45001 4.3001 6.45001Z" fill="currentColor" />
          <path d="M7.75005 6.45001C7.42505 6.45001 7.17505 6.70001 7.17505 7.02501C7.17505 7.35001 7.42505 7.60001 7.75005 7.60001C8.07505 7.60001 8.32505 7.35001 8.32505 7.02501C8.32505 6.70001 8.05005 6.45001 7.75005 6.45001Z" fill="currentColor" />
          <path d="M11.2 6.45001C10.875 6.45001 10.625 6.70001 10.625 7.02501C10.625 7.35001 10.875 7.60001 11.2 7.60001C11.525 7.60001 11.775 7.35001 11.775 7.02501C11.775 6.70001 11.525 6.45001 11.2 6.45001Z" fill="currentColor" />
          <path d="M10.55 1.97501H2.00005C1.15005 1.97501 0.425049 2.67501 0.425049 3.55001V12.975C0.425049 13.375 0.650049 13.75 1.02505 13.925C1.17505 14 1.32505 14.025 1.47505 14.025C1.72505 14.025 1.95005 13.95 2.15005 13.775L4.27505 12.025H10.55C13.325 12.025 15.575 9.77501 15.575 7.00001C15.575 4.22501 13.3 1.97501 10.55 1.97501ZM10.55 10.9H4.07505C3.95005 10.9 3.82505 10.95 3.72505 11.025L1.57505 12.8V3.55001C1.57505 3.30001 1.77505 3.10001 2.02505 3.10001H10.575C12.725 3.10001 14.475 4.85001 14.475 7.00001C14.45 9.15001 12.7 10.9 10.55 10.9Z" fill="currentColor" />
        </svg>
      ),
      label: 'Help',
      href: '/help',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-[240px] divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg z-50"
          onMouseEnter={onMouseEnter} // Keep dropdown open when hovering over it
          onMouseLeave={onMouseLeave} // Close when leaving dropdown
        >
          {/* User Info Section */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="relative aspect-square w-10 rounded-full bg-gray-200 flex items-center justify-center">
              {user?.avatar ? (
                <Image src={user.avatar} alt="account" fill className="rounded-full object-cover object-center" sizes="40px" />
              ) : (
                <User size={20} className="text-gray-600" />
              )}
              <span className="absolute -right-0.5 -top-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || 'User'}
              </p>
              <p className="text-sm text-gray-600">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>

          {/* Quick Nav Section - Profile & Dashboard */}
          <div>
            <Link
              href="/account?view=profile"
              onClick={onClose}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-2">
                {menuItems[0].icon}
                {menuItems[0].label}
              </span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-2">
                {menuItems[1].icon}
                {menuItems[1].label}
              </span>
            </Link>
          </div>

          {/* Main Menu Items - Chats, Favorite, RFQ, Payments */}
          <div>
            {menuItems.slice(2, 6).map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={onClose}
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Additional Items - Switch to supplier, Help, Settings */}
          <div>
            <Link
              href="/supplier/register"
              onClick={onClose}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-2">
                {menuItems[6].icon}
                {menuItems[6].label}
              </span>
            </Link>
            <Link
              href="/help"
              onClick={onClose}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-2">
                {menuItems[7].icon}
                {menuItems[7].label}
              </span>
            </Link>
            <Link
              href="/account?view=settings"
              onClick={onClose}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2453_19971)">
                    <path d="M15.175 6.45C14.925 6.175 14.575 6.025 14.2 6.025H14.125C14 6.025 13.9 5.95 13.875 5.85C13.85 5.75 13.8 5.675 13.775 5.575C13.725 5.475 13.775 5.375 13.85 5.3L13.9 5.25C14.175 5 14.325 4.65 14.325 4.275C14.325 3.9 14.2 3.55 13.925 3.275L12.95 2.275C12.425 1.725 11.525 1.7 10.975 2.25L10.9 2.3C10.825 2.375 10.7 2.4 10.575 2.35C10.475 2.3 10.375 2.25 10.25 2.225C10.125 2.175 10.05 2.075 10.05 1.975V1.85C10.05 1.075 9.42504 0.449997 8.65004 0.449997H7.25004C6.87504 0.449997 6.52504 0.599997 6.27504 0.849997C6.00004 1.125 5.87504 1.475 5.87504 1.825V1.925C5.87504 2.025 5.80004 2.125 5.70004 2.175C5.65004 2.2 5.62504 2.2 5.57504 2.225C5.47504 2.275 5.35004 2.25 5.27504 2.175L5.22504 2.1C4.97504 1.825 4.62504 1.675 4.25004 1.675C3.87504 1.675 3.52504 1.8 3.25004 2.075L2.25004 3.05C1.70004 3.575 1.67504 4.475 2.22504 5.025L2.27504 5.1C2.35004 5.175 2.37504 5.3 2.32504 5.375C2.27504 5.475 2.25004 5.55 2.20004 5.65C2.15004 5.75 2.07504 5.8 1.95004 5.8H1.87504C1.50004 5.8 1.15004 5.925 0.875041 6.2C0.600041 6.45 0.450041 6.8 0.450041 7.175L0.425041 8.575C0.400041 9.35 1.02504 9.975 1.80004 10H1.87504C2.00004 10 2.10004 10.075 2.12504 10.175C2.17504 10.25 2.22504 10.325 2.25004 10.425C2.27504 10.525 2.25004 10.625 2.17504 10.7L2.12504 10.75C1.85004 11 1.70004 11.35 1.70004 11.725C1.70004 12.1 1.82504 12.45 2.10004 12.725L3.07504 13.725C3.60004 14.275 4.50004 14.3 5.05004 13.75L5.12504 13.7C5.20004 13.625 5.32504 13.6 5.45004 13.65C5.55004 13.7 5.65004 13.75 5.77504 13.775C5.90004 13.825 5.97504 13.925 5.97504 14.025V14.125C5.97504 14.9 6.60004 15.525 7.37504 15.525H8.77504C9.55004 15.525 10.175 14.9 10.175 14.125V14.025C10.175 13.925 10.25 13.825 10.35 13.775C10.4 13.75 10.425 13.75 10.475 13.725C10.6 13.675 10.7 13.7 10.775 13.775L10.825 13.85C11.075 14.125 11.425 14.275 11.8 14.275C12.175 14.275 12.525 14.15 12.8 13.875L13.8 12.9C14.35 12.375 14.375 11.475 13.825 10.925L13.775 10.85C13.7 10.775 13.675 10.65 13.725 10.575C13.775 10.475 13.8 10.4 13.85 10.3C13.9 10.2 14 10.15 14.1 10.15H14.175H14.2C14.95 10.15 15.575 9.55 15.6 8.775L15.625 7.375C15.575 7.075 15.425 6.7 15.175 6.45ZM14.425 8.8C14.425 8.95 14.3 9.075 14.15 9.075H14.075H14.05C13.475 9.075 12.95 9.425 12.75 9.925C12.725 10 12.675 10.075 12.65 10.15C12.425 10.65 12.525 11.275 12.925 11.675L12.975 11.75C13.075 11.85 13.075 12.025 12.975 12.125L11.975 13.1C11.9 13.175 11.825 13.175 11.775 13.175C11.725 13.175 11.65 13.175 11.575 13.1L11.525 13.025C11.125 12.6 10.525 12.475 9.97504 12.725L9.87504 12.775C9.32504 13 8.97504 13.5 8.97504 14.075V14.175C8.97504 14.325 8.85004 14.45 8.70004 14.45H7.30004C7.15004 14.45 7.02504 14.325 7.02504 14.175V14.075C7.02504 13.5 6.67504 12.975 6.12504 12.775C6.05004 12.75 5.95004 12.7 5.87504 12.675C5.67504 12.575 5.47504 12.55 5.27504 12.55C4.92504 12.55 4.57504 12.675 4.30004 12.95L4.25004 12.975C4.15004 13.075 3.97504 13.075 3.87504 12.975L2.90004 11.975C2.82504 11.9 2.82504 11.825 2.82504 11.775C2.82504 11.725 2.82504 11.65 2.90004 11.575L2.95004 11.525C3.37504 11.125 3.50004 10.5 3.27504 10C3.25004 9.925 3.22504 9.85 3.17504 9.775C2.97504 9.25 2.47504 8.875 1.90004 8.875H1.82504C1.67504 8.875 1.55004 8.75 1.55004 8.6L1.57504 7.2C1.57504 7.1 1.62504 7.05 1.65004 7C1.67504 6.975 1.75004 6.925 1.85004 6.925H1.92504C2.50004 6.95 3.02504 6.6 3.25004 6.075C3.27504 6 3.32504 5.925 3.35004 5.85C3.57504 5.35 3.47504 4.725 3.07504 4.325L3.02504 4.25C2.92504 4.15 2.92504 3.975 3.02504 3.875L4.02504 2.9C4.10004 2.825 4.17504 2.825 4.22504 2.825C4.27504 2.825 4.35004 2.825 4.42504 2.9L4.47504 2.975C4.87504 3.4 5.47504 3.525 6.02504 3.3L6.12504 3.25C6.67504 3.025 7.02504 2.525 7.02504 1.95V1.85C7.02504 1.75 7.07504 1.7 7.10004 1.65C7.12504 1.6 7.20004 1.575 7.30004 1.575H8.70004C8.85004 1.575 8.97504 1.7 8.97504 1.85V1.95C8.97504 2.525 9.32504 3.05 9.87504 3.25C9.95004 3.275 10.05 3.325 10.125 3.35C10.65 3.6 11.275 3.5 11.7 3.1L11.775 3.05C11.875 2.95 12.05 2.95 12.15 3.05L13.125 4.05C13.2 4.125 13.2 4.2 13.2 4.25C13.2 4.3 13.175 4.375 13.125 4.45L13.075 4.5C12.625 4.875 12.5 5.5 12.7 6C12.725 6.075 12.75 6.15 12.8 6.225C13 6.75 13.5 7.125 14.075 7.125H14.15C14.25 7.125 14.3 7.175 14.35 7.2C14.4 7.225 14.425 7.3 14.425 7.4V8.8Z" fill="currentColor" />
                    <path d="M8.0001 4.59999C6.1251 4.59999 4.6001 6.12499 4.6001 7.99999C4.6001 9.87499 6.1251 11.4 8.0001 11.4C9.8751 11.4 11.4001 9.87499 11.4001 7.99999C11.4001 6.12499 9.8751 4.59999 8.0001 4.59999ZM8.0001 10.275C6.7501 10.275 5.7251 9.24999 5.7251 7.99999C5.7251 6.74999 6.7501 5.72499 8.0001 5.72499C9.2501 5.72499 10.2751 6.74999 10.2751 7.99999C10.2751 9.24999 9.2501 10.275 8.0001 10.275Z" fill="currentColor" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2453_19971">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Settings
              </span>
            </Link>
          </div>

          {/* Logout */}
          <div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-2">
                <LogOut size={16} />
                Log out
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeaderDockIcons({ cart, user }: { cart: any[]; user: any }) {
  const baseItemSize = 23;
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMessagesDropdownOpen, setIsMessagesDropdownOpen] = useState(false);
  const [isRFQDropdownOpen, setIsRFQDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const messagesDropdownRef = useRef<HTMLDivElement>(null);
  const rfqDropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rfqHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cartHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
      if (messagesDropdownRef.current && !messagesDropdownRef.current.contains(event.target as Node)) {
        setIsMessagesDropdownOpen(false);
      }
      if (rfqDropdownRef.current && !rfqDropdownRef.current.contains(event.target as Node)) {
        setIsRFQDropdownOpen(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsAccountDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsAccountDropdownOpen(false);
    }, 150); // Small delay to allow moving to dropdown
  };

  const handleMessagesMouseEnter = () => {
    if (messagesHoverTimeoutRef.current) {
      clearTimeout(messagesHoverTimeoutRef.current);
      messagesHoverTimeoutRef.current = null;
    }
    setIsMessagesDropdownOpen(true);
  };

  const handleMessagesMouseLeave = () => {
    messagesHoverTimeoutRef.current = setTimeout(() => {
      setIsMessagesDropdownOpen(false);
    }, 150);
  };

  const handleRFQMouseEnter = () => {
    if (rfqHoverTimeoutRef.current) {
      clearTimeout(rfqHoverTimeoutRef.current);
      rfqHoverTimeoutRef.current = null;
    }
    setIsRFQDropdownOpen(true);
  };

  const handleRFQMouseLeave = () => {
    rfqHoverTimeoutRef.current = setTimeout(() => {
      setIsRFQDropdownOpen(false);
    }, 150);
  };

  const handleCartMouseEnter = () => {
    if (cartHoverTimeoutRef.current) {
      clearTimeout(cartHoverTimeoutRef.current);
      cartHoverTimeoutRef.current = null;
    }
    setIsCartDropdownOpen(true);
  };

  const handleCartMouseLeave = () => {
    cartHoverTimeoutRef.current = setTimeout(() => {
      setIsCartDropdownOpen(false);
    }, 150);
  };

  const items = [
    {
      icon: <Store size={23} className="text-gray-600" />,
      label: 'Become a merchant',
      href: '/supplier/register',
    },
    {
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
          <path
            d="M8 9.5H12M8 13H15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.1971 3.23374 14.3397 3.65806 15.3845C3.73927 15.5845 3.77988 15.6845 3.798 15.7653C3.81572 15.8443 3.8222 15.9028 3.82221 15.9839C3.82222 16.0667 3.80718 16.1569 3.77711 16.3374L3.18413 19.8952C3.12203 20.2678 3.09098 20.4541 3.14876 20.5888C3.19933 20.7067 3.29328 20.8007 3.41118 20.8512C3.54589 20.909 3.73218 20.878 4.10476 20.8159L7.66265 20.2229C7.84309 20.1928 7.9333 20.1778 8.01613 20.1778C8.09715 20.1778 8.15566 20.1843 8.23472 20.202C8.31554 20.2201 8.41552 20.2607 8.61549 20.3419C9.6603 20.7663 10.8029 21 12 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: 'Messages',
      href: '/account?view=messages',
    },
    {
      icon: <ShieldCheck size={23} className="text-gray-600" />,
      label: 'Trade Assurance',
      href: '/trade-assurance',
    },
    {
      icon: <ShoppingCart size={23} className="text-gray-600" />,
      label: 'Cart',
      href: '/cart',
      badge: cart.length > 0 ? cart.length : undefined,
    },
  ];

  const accountIcon = (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
      <path
        d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Messages Dropdown Component
  const MessagesDropdown = ({ isOpen, user, onMouseEnter, onMouseLeave }: { isOpen: boolean; user: any; onMouseEnter: () => void; onMouseLeave: () => void }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-[320px] rounded-lg shadow-lg z-50 overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg-surface)' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="px-6 py-4">
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text-main)' }}>
              Messages
            </h3>
            {user ? (
              <>
                <p className="text-sm text-center mb-4" style={{ color: 'var(--color-text-body)' }}>
                  View your conversations
                </p>
                <Link
                  href="/account?view=messages"
                  className="block w-full text-white font-medium py-3 px-4 rounded-lg text-center transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  }}
                >
                  Go to Messages
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm text-center mb-4" style={{ color: 'var(--color-text-body)' }}>
                  Sign in to view more
                </p>
                <Link
                  href="/login"
                  className="block w-full text-white font-medium py-3 px-4 rounded-lg text-center transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  }}
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // RFQ Dropdown Component
  const RFQDropdown = ({ isOpen, onMouseEnter, onMouseLeave }: { isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-[400px] rounded-lg shadow-lg z-50 overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg-surface)' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="px-6 py-4">
            <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--color-text-main)' }}>
              Orders
            </h3>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" />
                </svg>
                <h4 className="text-lg font-bold" style={{ color: 'var(--color-text-main)' }}>
                  Trade Assurance
                </h4>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-body)' }}>
                Enjoy protection from payment to delivery.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" />
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--color-text-body)' }}>Safe & easy payments</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#F59E0B" />
                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--color-text-body)' }}>Money-back policy</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12H22M2 12L8 6M2 12L8 18M22 12L16 6M22 12L16 18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--color-text-body)' }}>Shipping & logistics services</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F59E0B" strokeWidth="2" />
                    <path d="M8 12L11 15L16 9" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--color-text-body)' }}>After-sales protections</span>
                </div>
              </div>
            </div>
            <Link
              href="/trade-assurance"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--color-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
            >
              Learn more
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Cart Dropdown Component
  const CartDropdown = ({ isOpen, cart, onMouseEnter, onMouseLeave }: { isOpen: boolean; cart: any[]; onMouseEnter: () => void; onMouseLeave: () => void }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-[320px] rounded-lg shadow-lg z-50 overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg-surface)' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="px-6 py-4">
            <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--color-text-main)' }}>
              Shopping cart
            </h3>
            {cart.length === 0 ? (
              <>
                <div className="flex justify-center mb-4">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="40" width="80" height="60" rx="4" fill="#E2E8F0" />
                    <rect x="30" y="50" width="60" height="40" rx="2" fill="#CBD5E1" />
                    <rect x="35" y="55" width="50" height="8" rx="1" fill="#94A3B8" />
                    <rect x="35" y="68" width="30" height="8" rx="1" fill="#94A3B8" />
                    <rect x="35" y="81" width="40" height="8" rx="1" fill="#94A3B8" />
                    <path d="M15 75L20 70L25 75" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="25" cy="95" r="4" fill="#64748B" />
                    <circle cx="95" cy="95" r="4" fill="#64748B" />
                  </svg>
                </div>
                <p className="text-sm text-center mb-4" style={{ color: 'var(--color-text-body)' }}>
                  Your cart is empty
                </p>
                <Link
                  href="/cart"
                  className="block w-full text-center font-medium py-2.5 px-4 rounded-lg border transition-all duration-200"
                  style={{
                    color: 'var(--color-text-main)',
                    borderColor: 'var(--color-border)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  Go to cart
                </Link>
              </>
            ) : (
              <div className="space-y-2">
                {cart.slice(0, 3).map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded" style={{ backgroundColor: 'var(--color-bg-page)' }}>
                    <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                      {item.product?.image ? (
                        <Image src={item.product.image} alt={item.product.name || 'Product'} fill className="object-cover" sizes="48px" />
                      ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate" style={{ color: 'var(--color-text-main)' }}>{item.product?.name || item.product?.title || 'Product'}</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
                {cart.length > 3 && (
                  <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
                    +{cart.length - 3} more items
                  </p>
                )}
                <Link
                  href="/cart"
                  className="block w-full text-white font-medium py-2.5 px-4 rounded-lg text-center transition-all duration-200 hover:shadow-md mt-4"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  }}
                >
                  View cart ({cart.length})
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className="ml-auto flex items-center relative"
      style={{ gap: '25px' }}
    >
      {/* Store Icon */}
      {items[0] && (
        <Link
          href={items[0].href || "/supplier/register"}
          className="relative inline-flex items-center justify-center group"
          style={{ width: baseItemSize, height: baseItemSize }}
        >
          <div className="relative flex items-center justify-center">
            {React.isValidElement(items[0].icon)
              ? cloneElement(items[0].icon as React.ReactElement<any>, {
                className: `${(items[0].icon as any).props?.className || ''} group-hover:text-[#3373FF] transition-colors duration-300`.trim()
              })
              : items[0].icon
            }
          </div>
        </Link>
      )}

      {/* Messages Icon with Dropdown */}
      {items[1] && (
        <div
          ref={messagesDropdownRef}
          className="relative"
          onMouseEnter={handleMessagesMouseEnter}
          onMouseLeave={handleMessagesMouseLeave}
        >
          <div
            className="relative inline-flex items-center justify-center cursor-pointer group"
            style={{ width: baseItemSize, height: baseItemSize }}
          >
            <div className="relative flex items-center justify-center">
              {React.isValidElement(items[1].icon)
                ? cloneElement(items[1].icon as React.ReactElement<any>, {
                  className: `${(items[1].icon as any).props?.className || ''} group-hover:text-[#3373FF] transition-colors duration-300`.trim()
                })
                : items[1].icon
              }
            </div>
          </div>
          <MessagesDropdown
            isOpen={isMessagesDropdownOpen}
            user={user}
            onMouseEnter={handleMessagesMouseEnter}
            onMouseLeave={handleMessagesMouseLeave}
          />
        </div>
      )}

      {/* Trade Assurance Icon - Direct Link */}
      {items[2] && (
        <Link
          href="/trade-assurance"
          className="relative inline-flex items-center justify-center group"
          style={{ width: baseItemSize, height: baseItemSize }}
        >
          <div className="relative flex items-center justify-center">
            {React.isValidElement(items[2].icon)
              ? cloneElement(items[2].icon as React.ReactElement<any>, {
                className: `${(items[2].icon as any).props?.className || ''} group-hover:text-[#3373FF] transition-colors duration-300`.trim()
              })
              : items[2].icon
            }
          </div>
        </Link>
      )}

      {/* Cart Icon with Dropdown */}
      {items[3] && (
        <div
          ref={cartDropdownRef}
          className="relative"
          onMouseEnter={handleCartMouseEnter}
          onMouseLeave={handleCartMouseLeave}
        >
          <div
            className="relative inline-flex items-center justify-center cursor-pointer group"
            style={{ width: baseItemSize, height: baseItemSize }}
          >
            <div className="relative flex items-center justify-center">
              {React.isValidElement(items[3].icon)
                ? cloneElement(items[3].icon as React.ReactElement<any>, {
                  className: `${(items[3].icon as any).props?.className || ''} group-hover:text-[#3373FF] transition-colors duration-300`.trim()
                })
                : items[3].icon
              }
              {items[3].badge && items[3].badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3373FF] text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold z-20 shadow-sm">
                  {items[3].badge > 99 ? '99+' : items[3].badge}
                </span>
              )}
            </div>
          </div>
          <CartDropdown
            isOpen={isCartDropdownOpen}
            cart={cart || []}
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
          />
        </div>
      )}

      {/* Account Button with Dropdown */}
      <div
        ref={accountDropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative inline-flex items-center justify-center overflow-visible cursor-pointer group"
          style={{
            width: baseItemSize,
            height: baseItemSize
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex items-center justify-center">
              {React.isValidElement(accountIcon)
                ? cloneElement(accountIcon as React.ReactElement<any>, {
                  className: `${(accountIcon as any).props?.className || ''} group-hover:text-[#3373FF] transition-colors duration-300`.trim()
                })
                : accountIcon
              }
            </div>
          </div>
        </div>
        <AccountDropdown
          user={user}
          isOpen={isAccountDropdownOpen}
          onClose={() => setIsAccountDropdownOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [isTradeProtectionOpen, setIsTradeProtectionOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'manufacturers' | 'worldwide'>('products');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, cart, searchQuery, setSearchQuery } = useStore();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll for shrinking header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
        setIsDiscoverOpen(false);
        setIsRFQOpen(false);
        setIsTradeProtectionOpen(false);
        setIsHomeOpen(false);
        setIsAboutOpen(false);
        setIsContactUsOpen(false);
        setIsHelpCenterOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainCategories = categories.slice(0, 12);
  const frequentlySearched = ['glass bottles', 'perfume bottle', 'sport car', 'perfume bottle with box'];

  // Helper function to close all dropdowns
  const closeAllDropdowns = () => {
    setIsCategoriesOpen(false);
    setIsDiscoverOpen(false);
    setIsRFQOpen(false);
    setIsTradeProtectionOpen(false);
    setIsHomeOpen(false);
    setIsAboutOpen(false);
    setIsContactUsOpen(false);
    setIsHelpCenterOpen(false);
  };

  // Mega Menu Component
  const MegaMenu = ({ isOpen, onClose, sections }: { isOpen: boolean; onClose: () => void; sections: Array<{ title: string; items: Array<{ icon: React.ReactNode; title: string; description: string; href: string }> }> }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onMouseEnter={() => { }}
            onMouseLeave={onClose}
            className="absolute left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 overflow-hidden"
          >
            <div className="w-full rounded-xl bg-white p-2 lg:p-8">
              <div className="grid gap-5 lg:grid-cols-2 max-w-[850px] mx-auto">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4 className="mb-3 text-sm font-semibold text-gray-800">
                      {section.title}
                    </h4>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className="group flex flex-col gap-4 rounded-lg p-4 duration-200 hover:bg-gray-100 lg:flex-row"
                          onClick={onClose}
                        >
                          <div className="text-[#3373FF]">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="mb-1 text-base font-semibold text-gray-800 duration-200 group-hover:text-[#3373FF]">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* Top Section - Main Header */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-[1920px] px-4">
          <div className="flex h-20 items-center relative">
            {/* Left: Logo with Elephant and Crown + Location */}
            <div className="flex-shrink-0 flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  {/* Elephant with Crown SVG */}
                  <svg width="48" height="48" viewBox="0 0 48 48" className="relative">
                    {/* Elephant body - teal outline */}
                    <path
                      d="M24 12 C 18 12, 12 16, 12 22 C 12 26, 14 29, 17 31 L 17 36 C 17 38, 19 40, 21 40 L 27 40 C 29 40, 31 38, 31 36 L 31 31 C 34 29, 36 26, 36 22 C 36 16, 30 12, 24 12 Z"
                      fill="none"
                      stroke="#3373FF"
                      strokeWidth="2.5"
                    />
                    {/* Trunk */}
                    <path
                      d="M 24 24 L 24 32"
                      fill="none"
                      stroke="#3373FF"
                      strokeWidth="2.5"
                    />
                    {/* Crown - golden yellow */}
                    <path
                      d="M 18 14 L 24 8 L 30 14 L 28 12 L 24 10 L 20 12 Z"
                      fill="#C89B3C"
                      stroke="#C89B3C"
                      strokeWidth="1"
                    />
                    {/* Crown jewels */}
                    <circle cx="24" cy="10" r="2" fill="#FFD700" />
                    <circle cx="20" cy="12" r="1.5" fill="#FFD700" />
                    <circle cx="28" cy="12" r="1.5" fill="#FFD700" />
                    {/* Tusks - golden yellow */}
                    <path
                      d="M 18 22 L 14 24 M 30 22 L 34 24"
                      stroke="#C89B3C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-800">Airavat</span>
              </Link>

              {/* Deliver To Section - Moved to Left */}
              <div className="hidden lg:flex flex-col items-start border-l border-gray-200 pl-6">
                <span className="text-xs text-gray-500 font-medium leading-tight">Deliver To</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 leading-tight mt-0.5">
                  <span className="text-lg leading-none">🇮🇳</span>
                  <span>Delhi..</span>
                </div>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4" ref={dropdownRef}>
              <div className="relative w-full bg-gray-100 rounded-2xl shadow-md p-1.5 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg border border-gray-300">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Airavat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="w-full pl-8 pr-24 py-3 text-base text-gray-700 bg-transparent rounded-lg focus:outline-none"
                />
                <button
                  onClick={() => {
                    window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                  }}
                  className="absolute right-1 top-1 bottom-1 px-6 bg-[#3373FF] hover:bg-[#265ACC] text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3373FF] transition"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Right: Navigation Icons - Dock-style Hover Animation */}
            <HeaderDockIcons cart={cart} user={user} />

            {/* Mobile Menu Button */}
            <div className="block lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Secondary Navigation */}
      <div className="bg-white border-b border-gray-200 relative" ref={dropdownRef}>
        <div className="mx-auto max-w-[1920px] px-4">
          <div className="flex items-center justify-between h-12">
            {/* Left: Categories, Discover, RFQ, Trade Protection */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => { closeAllDropdowns(); setIsCategoriesOpen(!isCategoriesOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <Menu size={18} />
                <span>Categories</span>
                <ChevronDown size={14} className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsDiscoverOpen(!isDiscoverOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <Rocket size={18} />
                <span>Discover</span>
                <ChevronDown size={14} className={`transition-transform ${isDiscoverOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsRFQOpen(!isRFQOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <FileText size={18} />
                <span>RFQ</span>
                <ChevronDown size={14} className={`transition-transform ${isRFQOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsTradeProtectionOpen(!isTradeProtectionOpen); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm"
              >
                <ShieldCheck size={18} />
                <span>Trade Protection</span>
                <ChevronDown size={14} className={`transition-transform ${isTradeProtectionOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Right: Home, About, Contact Us, Help Center */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => { closeAllDropdowns(); setIsHomeOpen(!isHomeOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                Home
                <ChevronDown size={14} className={`transition-transform ${isHomeOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsAboutOpen(!isAboutOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                About
                <ChevronDown size={14} className={`transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsContactUsOpen(!isContactUsOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                Contact Us
                <ChevronDown size={14} className={`transition-transform ${isContactUsOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => { closeAllDropdowns(); setIsHelpCenterOpen(!isHelpCenterOpen); }}
                className="text-gray-700 hover:text-gray-900 transition font-medium text-sm flex items-center gap-1"
              >
                Help Center
                <ChevronDown size={14} className={`transition-transform ${isHelpCenterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Mega Menu */}
        <MegaMenu
          isOpen={isCategoriesOpen}
          onClose={() => setIsCategoriesOpen(false)}
          sections={[
            {
              title: 'Get Started',
              items: [
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 23.325C9.11255 23.325 6.18755 22.2375 3.97505 20.025C1.83755 17.8875 0.675049 15.0375 0.675049 12C0.675049 8.9625 1.83755 6.1125 4.01255 3.975C6.11255 1.8375 8.96255 0.675003 12 0.675003C15.0375 0.675003 17.8876 1.8375 20.025 4.0125C24.4501 8.4375 24.4501 15.6375 20.025 20.0625C17.8125 22.2375 14.8875 23.325 12 23.325Z" fill="currentColor" />
                    </svg>
                  ),
                  title: 'Browse All Categories',
                  description: 'Explore our complete product catalog organized by industry.',
                  href: '/products',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4 7.72501H13.9875C14.4375 7.72501 14.8125 7.35001 14.8125 6.90001C14.8125 6.45001 14.4375 6.07501 13.9875 6.07501H13.2375V5.73751C13.2375 5.28751 12.8625 4.91251 12.4125 4.91251C11.9625 4.91251 11.5875 5.28751 11.5875 5.73751V6.07501H11.4375C10.2 6.07501 9.1875 7.08751 9.1875 8.28751C9.1875 9.52501 10.2 10.5 11.4375 10.5H12.6375C12.9375 10.5 13.2 10.7625 13.2 11.025C13.2 11.2875 12.9375 11.55 12.6375 11.55H10.05C9.6 11.55 9.225 11.925 9.225 12.375C9.225 12.825 9.6 13.2 10.05 13.2H11.5875V13.5375C11.5875 13.9875 11.9625 14.3625 12.4125 14.3625C12.8625 14.3625 13.2375 13.9875 13.2375 13.5375V13.0875C14.175 12.825 14.85 11.9625 14.85 10.95C14.85 9.71251 13.8375 8.73751 12.6 8.73751H11.4C11.1 8.73751 10.8375 8.51251 10.8375 8.21251C10.8375 7.91251 11.1 7.72501 11.4 7.72501Z" fill="currentColor" />
                      <path d="M20.9998 1.27499H2.9998C1.7248 1.27499 0.674805 2.32499 0.674805 3.59999V15.1125C0.674805 16.3875 1.7248 17.4375 2.9998 17.4375H11.1748V21H8.13731C7.68731 21 7.3123 21.375 7.3123 21.825C7.3123 22.275 7.68731 22.65 8.13731 22.65H15.8998C16.3498 22.65 16.7248 22.275 16.7248 21.825C16.7248 21.375 16.3498 21 15.8998 21H12.8623V17.4375H20.9998C22.2748 17.4375 23.3248 16.3875 23.3248 15.1125V3.59999C23.3623 2.32499 22.2748 1.27499 20.9998 1.27499Z" fill="currentColor" />
                    </svg>
                  ),
                  title: 'Featured Categories',
                  description: 'Discover trending and popular product categories.',
                  href: '/products?featured=true',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.9374 23.3625H7.4999C5.7749 23.3625 4.3124 22.05 4.1249 20.3625C4.1249 20.2875 4.0874 20.25 4.0874 20.175V2.96249C4.0874 1.68749 5.0999 0.674988 6.3749 0.674988H17.5499C18.8249 0.674988 19.8374 1.68749 19.8374 2.96249V16.0125C19.8374 17.2875 18.8249 18.3 17.5499 18.3H7.4999C7.0499 18.3 6.5999 18.4875 6.2999 18.7875C5.9624 19.0875 5.8124 19.5375 5.8124 19.9875C5.8124 20.925 6.5624 21.675 7.4999 21.675H18.9374C19.3874 21.675 19.7999 22.05 19.7999 22.5375C19.7999 23.025 19.4249 23.3625 18.9374 23.3625Z" fill="currentColor" />
                    </svg>
                  ),
                  title: 'Category Directory',
                  description: 'Browse all categories in an organized directory format.',
                  href: '/categories',
                },
              ],
            },
            {
              title: 'Popular Categories',
              items: [
                {
                  icon: <PackageSearch size={24} />,
                  title: 'Electronics',
                  description: 'Consumer electronics, components, and accessories.',
                  href: '/products?category=electronics',
                },
                {
                  icon: <Store size={24} />,
                  title: 'Apparel & Textiles',
                  description: 'Clothing, fabrics, and fashion accessories.',
                  href: '/products?category=apparel-accessories',
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Industrial Equipment',
                  description: 'Machinery, tools, and industrial supplies.',
                  href: '/products?category=industrial-parts',
                },
              ],
            },
          ]}
        />

        {/* Discover Mega Menu */}
        <MegaMenu
          isOpen={isDiscoverOpen}
          onClose={() => setIsDiscoverOpen(false)}
          sections={[
            {
              title: 'Explore',
              items: [
                {
                  icon: <Rocket size={24} />,
                  title: 'Trending Products',
                  description: 'Discover the most popular products right now.',
                  href: '/trending',
                },
                {
                  icon: <Star size={24} />,
                  title: 'Featured Suppliers',
                  description: 'Browse verified and top-rated suppliers.',
                  href: '/suppliers?featured=true',
                },
                {
                  icon: <Globe size={24} />,
                  title: 'Global Markets',
                  description: 'Explore products from different regions worldwide.',
                  href: '/markets',
                },
              ],
            },
            {
              title: 'Resources',
              items: [
                {
                  icon: <FileText size={24} />,
                  title: 'Industry Insights',
                  description: 'Latest trends and market analysis reports.',
                  href: '/insights',
                },
                {
                  icon: <Camera size={24} />,
                  title: 'Product Showcases',
                  description: 'View curated product collections and showcases.',
                  href: '/showcases',
                },
                {
                  icon: <AppWindow size={24} />,
                  title: 'Trade Shows',
                  description: 'Upcoming trade shows and exhibitions.',
                  href: '/trade-shows',
                },
              ],
            },
          ]}
        />

        {/* RFQ Mega Menu */}
        <MegaMenu
          isOpen={isRFQOpen}
          onClose={() => setIsRFQOpen(false)}
          sections={[
            {
              title: 'Request for Quotation',
              items: [
                {
                  icon: <FileText size={24} />,
                  title: 'Post an RFQ',
                  description: 'Create a new request for quotation and get multiple quotes.',
                  href: '/account/rfq/new',
                },
                {
                  icon: <PackageSearch size={24} />,
                  title: 'My RFQs',
                  description: 'View and manage all your RFQ requests.',
                  href: '/account/rfq',
                },
                {
                  icon: <MessageSquare size={24} />,
                  title: 'RFQ Responses',
                  description: 'Review quotes and responses from suppliers.',
                  href: '/account/rfq/responses',
                },
              ],
            },
            {
              title: 'Learn More',
              items: [
                {
                  icon: <HelpCircle size={24} />,
                  title: 'How RFQ Works',
                  description: 'Learn how to use our RFQ system effectively.',
                  href: '/help/rfq',
                },
                {
                  icon: <FileTextIcon size={24} />,
                  title: 'RFQ Templates',
                  description: 'Download ready-to-use RFQ templates.',
                  href: '/templates/rfq',
                },
                {
                  icon: <Store size={24} />,
                  title: 'Supplier Directory',
                  description: 'Browse suppliers who respond to RFQs.',
                  href: '/suppliers',
                },
              ],
            },
          ]}
        />

        {/* Trade Protection Mega Menu */}
        <MegaMenu
          isOpen={isTradeProtectionOpen}
          onClose={() => setIsTradeProtectionOpen(false)}
          sections={[
            {
              title: 'Protection Services',
              items: [
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Trade Assurance',
                  description: 'Get protection for your orders with our escrow service.',
                  href: '/trade-assurance#trade-assurance',
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Order Protection',
                  description: 'Secure payment and delivery protection for all orders.',
                  href: '/trade-assurance#order-protection',
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Dispute Resolution',
                  description: 'Fair and fast resolution for trade disputes.',
                  href: '/trade-assurance#dispute-resolution',
                },
              ],
            },
            {
              title: 'Verification',
              items: [
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Verified Suppliers',
                  description: 'Browse suppliers verified by Airavat.',
                  href: '/trade-assurance#verified-suppliers',
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Get Verified',
                  description: 'Apply for supplier verification badge.',
                  href: '/trade-assurance#get-verified',
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Security Center',
                  description: 'Learn about our security measures and policies.',
                  href: '/trade-assurance#security-center',
                },
              ],
            },
          ]}
        />

        {/* Home Mega Menu */}
        <MegaMenu
          isOpen={isHomeOpen}
          onClose={() => setIsHomeOpen(false)}
          sections={[
            {
              title: 'Quick Links',
              items: [
                {
                  icon: <Store size={24} />,
                  title: 'Homepage',
                  description: 'Return to the main homepage.',
                  href: '/',
                },
                {
                  icon: <PackageSearch size={24} />,
                  title: 'All Products',
                  description: 'Browse our complete product catalog.',
                  href: '/products',
                },
                {
                  icon: <Star size={24} />,
                  title: 'Featured Deals',
                  description: 'Special offers and featured products.',
                  href: '/deals',
                },
              ],
            },
            {
              title: 'Account',
              items: [
                {
                  icon: <User size={24} />,
                  title: 'My Account',
                  description: 'Access your account dashboard.',
                  href: '/account',
                },
                {
                  icon: <ShoppingCart size={24} />,
                  title: 'My Cart',
                  description: 'View items in your shopping cart.',
                  href: '/cart',
                },
                {
                  icon: <MessageSquare size={24} />,
                  title: 'Messages',
                  description: 'Check your messages and inquiries.',
                  href: '/messages',
                },
              ],
            },
          ]}
        />

        {/* About Mega Menu */}
        <MegaMenu
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
          sections={[
            {
              title: 'Company',
              items: [
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 23.325C9.11255 23.325 6.18755 22.2375 3.97505 20.025C1.83755 17.8875 0.675049 15.0375 0.675049 12C0.675049 8.9625 1.83755 6.1125 4.01255 3.975C6.11255 1.8375 8.96255 0.675003 12 0.675003C15.0375 0.675003 17.8876 1.8375 20.025 4.0125C24.4501 8.4375 24.4501 15.6375 20.025 20.0625C17.8125 22.2375 14.8875 23.325 12 23.325Z" fill="currentColor" />
                    </svg>
                  ),
                  title: 'About Us',
                  description: 'Learn about Airavat and our mission.',
                  href: '/about',
                },
                {
                  icon: <Store size={24} />,
                  title: 'Our Story',
                  description: 'The journey of Airavat and our vision.',
                  href: '/about/story',
                },
                {
                  icon: <Star size={24} />,
                  title: 'Careers',
                  description: 'Join our team and build the future of B2B commerce.',
                  href: '/careers',
                },
              ],
            },
            {
              title: 'Resources',
              items: [
                {
                  icon: <FileText size={24} />,
                  title: 'Press & Media',
                  description: 'Latest news, press releases, and media kit.',
                  href: '/press',
                },
                {
                  icon: <Globe size={24} />,
                  title: 'Global Presence',
                  description: 'Our offices and presence around the world.',
                  href: '/locations',
                },
                {
                  icon: <MessageSquare size={24} />,
                  title: 'Contact Us',
                  description: 'Get in touch with our team.',
                  href: '/contact',
                },
              ],
            },
          ]}
        />

        {/* Contact Us Mega Menu */}
        <MegaMenu
          isOpen={isContactUsOpen}
          onClose={() => setIsContactUsOpen(false)}
          sections={[
            {
              title: 'Get in Touch',
              items: [
                {
                  icon: <MessageSquare size={24} />,
                  title: 'General Inquiry',
                  description: 'Send us a message for general questions.',
                  href: '/contact',
                },
                {
                  icon: <Store size={24} />,
                  title: 'Sales Team',
                  description: 'Contact our sales team for business inquiries.',
                  href: '/contact/sales',
                },
                {
                  icon: <HelpCircle size={24} />,
                  title: 'Support',
                  description: 'Get help with your account or orders.',
                  href: '/contact/support',
                },
              ],
            },
            {
              title: 'Other Ways',
              items: [
                {
                  icon: <MessageSquare size={24} />,
                  title: 'Live Chat',
                  description: 'Chat with our support team in real-time.',
                  href: '/chat',
                },
                {
                  icon: <FileText size={24} />,
                  title: 'Email Us',
                  description: 'Send us an email at support@airavat.com',
                  href: 'mailto:support@airavat.com',
                },
                {
                  icon: <Globe size={24} />,
                  title: 'Office Locations',
                  description: 'Find our office locations worldwide.',
                  href: '/locations',
                },
              ],
            },
          ]}
        />

        {/* Help Center Mega Menu */}
        <MegaMenu
          isOpen={isHelpCenterOpen}
          onClose={() => setIsHelpCenterOpen(false)}
          sections={[
            {
              title: 'Help & Support',
              items: [
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.3498 3.5625H7.64981C3.7873 3.5625 0.674805 6.675 0.674805 10.5375V18.15C0.674805 19.3875 1.6873 20.4 2.9248 20.4H16.3873C20.2498 20.4 23.3623 17.2875 23.3623 13.425V10.5375C23.3623 6.7125 20.2123 3.5625 16.3498 3.5625Z" fill="currentColor" />
                      <circle cx="6.4873" cy="12" r="0.9375" fill="currentColor" />
                      <circle cx="12" cy="12" r="0.9375" fill="currentColor" />
                      <circle cx="17.5122" cy="12" r="0.9375" fill="currentColor" />
                    </svg>
                  ),
                  title: 'Help Center',
                  description: 'Find answers to frequently asked questions.',
                  href: '/help',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.5873 6.22499L15.4123 1.12499C15.1123 0.824988 14.6998 0.674988 14.2873 0.674988H5.2873C4.0123 0.674988 2.9248 1.72499 2.9248 3.03749V21.0375C2.9248 22.3125 3.9748 23.4 5.2873 23.4H18.6748C19.9498 23.4 21.0373 22.35 21.0373 21.0375V7.34999C21.0373 6.93749 20.8873 6.52499 20.5873 6.22499Z" fill="currentColor" />
                      <path d="M14.5873 10.9125H8.09981C7.64981 10.9125 7.2373 11.2875 7.2373 11.775C7.2373 12.2625 7.61231 12.6375 8.09981 12.6375H14.5873C15.0373 12.6375 15.4498 12.2625 15.4498 11.775C15.4498 11.2875 15.0748 10.9125 14.5873 10.9125Z" fill="currentColor" />
                      <path d="M14.5873 15.0375H8.09981C7.64981 15.0375 7.2373 15.4125 7.2373 15.9C7.2373 16.3875 7.61231 16.7625 8.09981 16.7625H14.5873C15.0373 16.7625 15.4498 16.3875 15.4498 15.9C15.4498 15.4125 15.0748 15.0375 14.5873 15.0375Z" fill="currentColor" />
                    </svg>
                  ),
                  title: 'Documentation',
                  description: 'Comprehensive guides and tutorials.',
                  href: '/docs',
                },
                {
                  icon: <MessageSquare size={24} />,
                  title: 'Contact Support',
                  description: 'Get personalized help from our team.',
                  href: '/contact/support',
                },
              ],
            },
            {
              title: 'Resources',
              items: [
                {
                  icon: <FileText size={24} />,
                  title: 'FAQs',
                  description: 'Browse frequently asked questions.',
                  href: '/help/faq',
                },
                {
                  icon: <HelpCircle size={24} />,
                  title: 'Video Tutorials',
                  description: 'Watch step-by-step video guides.',
                  href: '/help/videos',
                },
                {
                  icon: <FileTextIcon size={24} />,
                  title: 'User Guides',
                  description: 'Detailed guides for using Airavat.',
                  href: '/help/guides',
                },
              ],
            },
          ]}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex items-center gap-2">
                <svg className="h-8 text-[#3373FF] dark:text-[#3373FF]" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z" fill="currentColor"></path>
                </svg>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <X size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <div className="relative w-full bg-gray-100 rounded-2xl shadow-md p-1.5">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search Airavat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-20 py-2 text-sm text-gray-700 bg-transparent rounded-lg focus:outline-none"
                />
                <button
                  onClick={() => {
                    window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                    setIsMobileMenuOpen(false);
                  }}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-[#3373FF] hover:bg-[#265ACC] text-white text-xs font-medium rounded-xl"
                >
                  Search
                </button>
              </div>
              <nav className="space-y-2">
                <Link href="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  About
                </Link>
                <Link href="/supplier/register" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Careers
                </Link>
                <Link href="/products" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  History
                </Link>
                <Link href="/trade-services" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Services
                </Link>
                <Link href="/products" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Projects
                </Link>
                <Link href="/help" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Blog
                </Link>
                <Link href="/cart" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Cart ({cart.length})
                </Link>
                {user ? (
                  <Link href="/account" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    My Account
                  </Link>
                ) : (
                  <Link href="/login" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
