'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingCart,
  FileText,
  CreditCard,
  UserCog,
  HelpCircle,
  Settings,
  LogOut,
  ChevronDown,
  Heart,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { PanelType } from './AccountRightPanel';

interface MenuProps {
  children: React.ReactNode;
  items: Array<{ name: string; href: string; icon?: React.ReactNode; onClick?: () => void }>;
  onButtonClick?: () => void;
}

interface AccountSidebarProps {
  onPanelOpen?: (panelType: PanelType) => void;
  onBackToDashboard?: () => void;
  activeView?: 'dashboard' | 'messages' | 'rfq' | 'payments' | 'favorites';
}

const Menu = ({ children, items, onButtonClick }: MenuProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <div className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-75 will-change-[background-color]">
        <div className="flex items-center gap-x-2 flex-1" onClick={onButtonClick}>
          {children}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpened(!isOpened);
          }}
          className="p-1 hover:bg-gray-100 rounded sidebar-expand-only"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 duration-150 ${isOpened ? 'rotate-180' : ''}`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpened && (
        <ul className="mx-4 px-2 border-l text-sm font-medium sidebar-expand-only">
          {items.map((item, idx) => (
            <li key={idx}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="w-full flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-75 text-left will-change-[background-color]"
                >
                  {item.icon ? <div className="text-gray-500">{item.icon}</div> : ''}
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-75 will-change-[background-color]"
                >
                  {item.icon ? <div className="text-gray-500">{item.icon}</div> : ''}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function AccountSidebar({ onPanelOpen, onBackToDashboard, activeView = 'dashboard' }: AccountSidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, cart } = useStore();
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

  const handleNavigationClick = useCallback((href: string, panelType?: PanelType) => {
    if (panelType && onPanelOpen) {
      onPanelOpen(panelType);
    } else {
      router.push(href);
    }
  }, [onPanelOpen, router]);

  const navigation = [
    {
      href: '/account',
      name: 'Dashboard',
      panelType: null as PanelType,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
    },
    {
      href: '/messages',
      name: 'Messages',
      panelType: null as PanelType,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C10.8029 21 9.6603 20.7663 8.61549 20.3419C8.41552 20.2607 8.31554 20.2201 8.23472 20.202C8.15566 20.1843 8.09715 20.1778 8.01613 20.1778C7.9333 20.1778 7.84309 20.1928 7.66265 20.2229L4.10476 20.8159C3.73218 20.878 3.54589 20.909 3.41118 20.8512C3.29328 20.8007 3.19933 20.7067 3.14876 20.5888C3.09098 20.4541 3.12203 20.2678 3.18413 19.8952L3.77711 16.3374C3.80718 16.1569 3.82222 16.0667 3.82221 15.9839C3.8222 15.9028 3.81572 15.8443 3.798 15.7653C3.77988 15.6845 3.73927 15.5845 3.65806 15.3845C3.23374 14.3397 3 13.1971 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: '/cart',
      name: 'Cart',
      panelType: null as PanelType,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: '/account/favorites',
      name: 'Favorites',
      panelType: null as PanelType,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      ),
    },
    {
      href: '/account/rfq',
      name: 'RFQ',
      panelType: 'rfq' as PanelType,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
    },
  ];

  const navsFooter = [
    {
      href: '/help',
      name: 'Help',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      href: '/account/settings',
      name: 'Settings',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const nestedNav = [
    { name: 'Payment Links', href: '/payment-links', icon: '' },
    { name: 'Wallet', href: '/account/wallet', icon: '' },
    { name: 'Transactions', href: '/account/transactions', icon: '' },
  ];

  const isActive = useCallback((href: string) => {
    if (href === '/account' && pathname === '/account') return true;
    if (href !== '/account' && pathname?.startsWith(href)) return true;
    return false;
  }, [pathname]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .account-sidebar {
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

        .account-sidebar:hover {
          width: 250px;
        }

        .account-sidebar .sidebar-content {
          width: 250px;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .account-sidebar .sidebar-text {
          opacity: 0;
          transition: opacity 0.3s ease 0.2s;
          white-space: nowrap;
        }

        .account-sidebar:hover .sidebar-text {
          opacity: 1;
        }

        .account-sidebar .sidebar-expand-only {
          opacity: 0;
          transition: opacity 0.3s ease 0.2s;
          pointer-events: none;
        }

        .account-sidebar:hover .sidebar-expand-only {
          opacity: 1;
          pointer-events: auto;
        }

        .account-sidebar .profile-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 0.5rem;
          min-height: 5rem;
        }

        .account-sidebar .profile-avatar {
          flex-shrink: 0;
        }

        .account-sidebar .profile-info {
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }

        .account-sidebar .profile-name {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .account-sidebar .profile-email {
          display: block;
          margin-top: 0.125rem;
          font-size: 0.75rem;
          color: #4b5563;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}} />

      <nav className="account-sidebar">
        <div className="sidebar-content">
          <div className="h-20 flex items-center pl-2">
            <div className="w-full flex items-center gap-x-4">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 profile-avatar">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0 profile-info sidebar-expand-only">
                <span className="profile-name sidebar-text">
                  {user?.name || 'User'}
                </span>
                <span className="profile-email sidebar-text">
                  {user?.email || 'user@airavat.com'}
                </span>
              </div>
              <div className="relative flex-shrink-0 sidebar-expand-only">
                <button
                  ref={profileRef}
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                  onClick={() => setIsProfileActive(!isProfileActive)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isProfileActive && (
                  <div className="absolute z-10 top-12 right-0 w-56 rounded-lg bg-white shadow-md border text-sm text-gray-600 sidebar-expand-only">
                    <div className="p-2 text-left">
                      <span className="block text-gray-500/80 p-2">
                        {user?.email || 'user@airavat.com'}
                      </span>
                      <Link
                        href="/supplier/register"
                        className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150"
                      >
                        Switch to supplier
                      </Link>
                      <div className="relative rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 absolute right-1 inset-y-0 my-auto pointer-events-none"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <select className="w-full cursor-pointer appearance-none bg-transparent p-2 outline-none">
                          <option disabled selected>
                            Theme
                          </option>
                          <option>Dark</option>
                          <option>Light</option>
                        </select>
                      </div>
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
                const isItemActive = 
                  (item.href === '/account' && activeView === 'dashboard') ||
                  (item.href === '/messages' && activeView === 'messages') ||
                  (item.href === '/account/rfq' && activeView === 'rfq') ||
                  (item.href === '/account/favorites' && activeView === 'favorites') ||
                  isActive(item.href);

                return (
                  <li key={idx}>
                    {item.href === '/messages' ? (
                      <button
                        onClick={() => onPanelOpen?.('messages')}
                        className={`w-full flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 text-left will-change-[background-color] ${
                          activeView === 'messages'
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        <div className="text-gray-500 flex-shrink-0">{item.icon}</div>
                        <span className="sidebar-text">{item.name}</span>
                      </button>
                    ) : item.href === '/account/rfq' ? (
                      <button
                        onClick={() => onPanelOpen?.('rfq')}
                        className={`w-full flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 text-left will-change-[background-color] ${
                          activeView === 'rfq'
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        <div className="text-gray-500 flex-shrink-0">{item.icon}</div>
                        <span className="sidebar-text">{item.name}</span>
                      </button>
                    ) : item.href === '/account/favorites' ? (
                      <Link
                        href="/account?view=favorites"
                        className={`flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 will-change-[background-color] ${
                          activeView === 'favorites'
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        <div className="text-gray-500 flex-shrink-0">{item.icon}</div>
                        <span className="sidebar-text">{item.name}</span>
                      </Link>
                    ) : item.panelType ? (
                      <button
                        onClick={() => handleNavigationClick(item.href, item.panelType)}
                        className={`w-full flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 text-left will-change-[background-color] ${
                          isItemActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        <div className="text-gray-500 flex-shrink-0">{item.icon}</div>
                        <span className="sidebar-text">{item.name}</span>
                        {item.href === '/cart' && cart.length > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center sidebar-text">
                            {cart.length}
                          </span>
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 will-change-[background-color] ${
                          isItemActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        <div className="text-gray-500 flex-shrink-0">{item.icon}</div>
                        <span className="sidebar-text">{item.name}</span>
                        {item.href === '/cart' && cart.length > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center sidebar-text">
                            {cart.length}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}

              <li>
                <Menu
                  items={[
                    { name: 'Wallet', href: '/account/wallet', icon: '', onClick: () => onPanelOpen?.('payments') },
                    { name: 'Payment link', href: '/payment-links', icon: '' },
                    { name: 'Transactions', href: '/account/transactions', icon: '' },
                  ]}
                  onButtonClick={() => onPanelOpen?.('payments')}
                >
                  <button
                    onClick={() => onPanelOpen?.('payments')}
                    className={`w-full flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 text-left will-change-[background-color] ${
                      activeView === 'payments'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <div className="text-gray-500 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                    </div>
                    <span className="sidebar-text">Payments</span>
                  </button>
                </Menu>
              </li>

              <li>
                <Link
                  href="/supplier/dashboard"
                  className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-75 will-change-[background-color]"
                >
                  <div className="text-gray-500 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  </div>
                  <span className="sidebar-text">Switch to supplier</span>
                </Link>
              </li>
            </ul>

            <div className="pt-2 mt-2 border-t">
              <ul className="text-sm font-medium">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 will-change-[background-color] ${
                        isActive(item.href)
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
