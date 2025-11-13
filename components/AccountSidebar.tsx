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
          className="p-1 hover:bg-gray-100 rounded"
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
        <ul className="mx-4 px-2 border-l text-sm font-medium">
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
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a2.25 2.25 0 002.25-2.25M7.5 14.25l5-10m5 10a2.25 2.25 0 002.25-2.25m0 0a2.25 2.25 0 00-2.25-2.25m-2.25 0L12.75 4.5M9.75 14.25l-1.5-3m0 0L6.75 9.75m3 4.5v-4.5m0 4.5h-3m3 0h3"
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
    <nav className="fixed top-[132px] left-0 w-full h-[calc(100vh-132px)] border-r bg-white space-y-8 sm:w-[250px] z-30">
      <div className="flex flex-col h-full px-4">
        <div className="h-20 flex items-center pl-2">
          <div className="w-full flex items-center gap-x-4">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-gray-700 text-sm font-semibold truncate">
                {user?.name || 'User'}
              </span>
              <span className="block mt-px text-gray-600 text-xs truncate">
                {user?.email || 'user@airavat.com'}
              </span>
            </div>
            <div className="relative flex-shrink-0">
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
                <div className="absolute z-10 top-12 right-0 w-56 rounded-lg bg-white shadow-md border text-sm text-gray-600">
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
            {navigation.map((item, idx) => (
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
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
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
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
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
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </Link>
                ) : item.panelType ? (
                  <button
                    onClick={() => handleNavigationClick(item.href, item.panelType)}
                    className={`w-full flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 text-left will-change-[background-color] ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                    {item.href === '/cart' && cart.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 will-change-[background-color] ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                    {item.href === '/cart' && cart.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            ))}

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  Payments
                </button>
              </Menu>
            </li>

            <li>
              <Link
                href="/supplier/dashboard"
                className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-75 will-change-[background-color]"
              >
                <div className="text-gray-500">
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
                Switch to supplier
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
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-75 text-left text-gray-600 hover:bg-gray-50 active:bg-gray-100 will-change-[background-color]"
                >
                  <div className="text-gray-500">
                    <LogOut className="w-5 h-5" />
                  </div>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
