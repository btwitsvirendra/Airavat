import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { ReactQueryProvider } from '@/lib/providers/react-query-provider';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { ErrorBoundary } from '@/components/errors/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airavat - B2B E-commerce Platform',
  description: 'Leading B2B marketplace connecting Indian businesses with suppliers',
  keywords: 'B2B, wholesale, suppliers, manufacturers, India, e-commerce',
  authors: [{ name: 'Airavat' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#09546A',
  openGraph: {
    type: 'website',
    title: 'Airavat - B2B E-commerce Platform',
    description: 'Leading B2B marketplace connecting Indian businesses with suppliers',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <ReactQueryProvider>
              <Navbar />
              <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {children}
              </main>
              <Footer />
              <Toaster position="top-right" />
            </ReactQueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
