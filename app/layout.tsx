import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import ConditionalFooter from '@/components/ConditionalFooter';
import BackToTop from '@/components/BackToTop';
import NavigationLoader from '@/components/NavigationLoader';

export const metadata: Metadata = {
  title: 'Airavat - B2B E-commerce Platform',
  description: 'Leading B2B marketplace connecting Indian businesses with suppliers',
  keywords: 'B2B, wholesale, suppliers, manufacturers, India, e-commerce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#F8FAFC', background: '#F8FAFC' }}>
      <body 
        className="font-sans antialiased" 
        style={{ 
          backgroundColor: '#F8FAFC', 
          background: '#F8FAFC',
          color: '#1A1A2E',
          margin: 0,
          padding: 0,
          minHeight: '100vh'
        }}
      >
        <NavigationLoader />
        <Navbar />
        <main 
          className="min-h-screen" 
          style={{ 
            backgroundColor: '#F8FAFC',
            background: '#F8FAFC',
            minHeight: '100vh'
          }}
        >
          {children}
        </main>
        <ConditionalFooter />
        <BackToTop />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
