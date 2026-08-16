import './globals.css';
import '@/styles.css';
import type { Metadata } from 'next';
import { RoleProvider } from '../components/RoleContext';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'InnoVibe Command Center (ICC) | Office Portal',
  description: 'Building India\'s First Zero Back-Office Employee EV Company',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-500 selection:text-white" suppressHydrationWarning>
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
