'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    Package,
    FileText,
    CreditCard,
    Settings,
    LogOut,
    Repeat,
    Box,
    ClipboardList
} from 'lucide-react';
import { useStore } from '@/lib/store';

interface SellerSidebarProps {
    activeView?: 'dashboard' | 'rfq' | 'orders' | 'inventory' | 'payments';
}

export default function SellerSidebar({ activeView = 'dashboard' }: SellerSidebarProps = {}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useStore();
    const profileRef = useRef<HTMLButtonElement>(null);
    const [isProfileActive, setIsProfileActive] = useState(false);

    useEffect(() => {
        const handleProfile = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileActive(false);
            }
        };
        document.addEventListener('click', handleProfile);
        return () => document.removeEventListener('click', handleProfile);
    }, []);

    const handleLogout = () => {
        useStore.getState().setUser(null);
        router.push('/');
    };

    const navigation = [
        {
            href: '/seller',
            name: 'Dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />,
            view: 'dashboard'
        },
        {
            href: '/seller/rfq',
            name: 'RFQs',
            icon: <ClipboardList className="w-5 h-5" />,
            view: 'rfq'
        },
        {
            href: '/seller/orders',
            name: 'Orders',
            icon: <Package className="w-5 h-5" />,
            view: 'orders'
        },
        {
            href: '/seller/inventory',
            name: 'Inventory',
            icon: <Box className="w-5 h-5" />,
            view: 'inventory'
        },
        {
            href: '/seller/payments',
            name: 'Payments (Khata)',
            icon: <CreditCard className="w-5 h-5" />,
            view: 'payments'
        },
    ];

    const navsFooter = [
        {
            href: '/seller/settings',
            name: 'Settings',
            icon: <Settings className="w-5 h-5" />,
        },
    ];

    const isActive = useCallback((href: string) => {
        if (href === '/seller' && pathname === '/seller') return true;
        if (href !== '/seller' && pathname?.startsWith(href)) return true;
        return false;
    }, [pathname]);

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        .seller-sidebar {
          width: 60px;
          height: calc(100vh - 132px);
          background-color: #ffffff;
          border-right: 1px solid #e5e7eb;
          position: fixed;
          top: 132px;
          left: 0;
          z-index: 30;
          transition: width 0.75s ease;
          overflow: hidden;
        }

        .seller-sidebar:hover {
          width: 250px;
        }

        .seller-sidebar .sidebar-content {
          width: 250px;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .seller-sidebar .sidebar-text {
          opacity: 0;
          transition: opacity 0.3s ease 0.2s;
          white-space: nowrap;
        }

        .seller-sidebar:hover .sidebar-text {
          opacity: 1;
        }

        .seller-sidebar .sidebar-expand-only {
          opacity: 0;
          transition: opacity 0.3s ease 0.2s;
          pointer-events: none;
        }

        .seller-sidebar:hover .sidebar-expand-only {
          opacity: 1;
          pointer-events: auto;
        }

        .seller-sidebar .profile-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 0.5rem;
          min-height: 5rem;
        }

        .seller-sidebar .profile-avatar {
          flex-shrink: 0;
        }

        .seller-sidebar .profile-info {
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }

        .seller-sidebar .profile-name {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .seller-sidebar .profile-email {
          display: block;
          margin-top: 0.125rem;
          font-size: 0.75rem;
          color: #4b5563;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}} />

            <nav className="seller-sidebar">
                <div className="sidebar-content">
                    <div className="h-20 flex items-center pl-2">
                        <div className="w-full flex items-center gap-x-4">
                            <div className="w-10 h-10 bg-[#9A79FF] rounded-full flex items-center justify-center flex-shrink-0 profile-avatar">
                                <span className="text-white font-semibold text-sm">
                                    {user?.name?.[0]?.toUpperCase() || 'S'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 profile-info sidebar-expand-only">
                                <span className="profile-name sidebar-text">
                                    {user?.name || 'Seller Account'}
                                </span>
                                <span className="profile-email sidebar-text">
                                    {user?.email || 'seller@airavat.com'}
                                </span>
                            </div>
                            <div className="relative flex-shrink-0 sidebar-expand-only">
                                <button
                                    ref={profileRef}
                                    className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                                    onClick={() => setIsProfileActive(!isProfileActive)}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </button>
                                {isProfileActive && (
                                    <div className="absolute z-10 top-12 right-0 w-56 rounded-lg bg-white shadow-md border text-sm text-gray-600 sidebar-expand-only">
                                        <div className="p-2 text-left">
                                            <span className="block text-gray-500/80 p-2">
                                                {user?.email || 'seller@airavat.com'}
                                            </span>
                                            <Link
                                                href="/account"
                                                className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150"
                                            >
                                                Switch to Buyer
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-auto flex-1">
                        <ul className="text-sm font-medium">
                            {navigation.map((item, idx) => {
                                const isItemActive = isActive(item.href);

                                return (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 will-change-[background-color] ${isItemActive
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                                                }`}
                                        >
                                            <div className="text-gray-500 flex-shrink-0">{item.icon}</div>
                                            <span className="sidebar-text">{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}

                            <li>
                                <Link
                                    href="/account"
                                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-75 will-change-[background-color]"
                                >
                                    <div className="text-gray-500 flex-shrink-0">
                                        <Repeat className="w-5 h-5" />
                                    </div>
                                    <span className="sidebar-text">Switch to Buyer</span>
                                </Link>
                            </li>
                        </ul>

                        <div className="pt-2 mt-2 border-t">
                            <ul className="text-sm font-medium">
                                {navsFooter.map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 will-change-[background-color] ${isActive(item.href)
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                                                }`}
                                        >
                                            <div className="text-gray-500 flex-shrink-0">{item.icon}</div>
                                            <span className="sidebar-text">{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 text-left text-gray-600 hover:bg-gray-50 active:bg-gray-100 will-change-[background-color]"
                                    >
                                        <div className="text-gray-500 flex-shrink-0">
                                            <LogOut className="w-5 h-5" />
                                        </div>
                                        <span className="sidebar-text">Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

function ChevronDown({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}
