import './globals.css';
import type { Metadata } from 'next';
import { RoleProvider } from '../components/RoleContext';

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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-sky-500 selection:text-white" suppressHydrationWarning>
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}

