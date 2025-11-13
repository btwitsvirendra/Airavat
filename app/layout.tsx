import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import ConditionalFooter from '@/components/ConditionalFooter';

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
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <ConditionalFooter />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
