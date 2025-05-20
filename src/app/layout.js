'use client'; // This makes the component client-side

import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from '../components/ClientWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import { metadata } from './metadata';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Import Bootstrap JavaScript
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
