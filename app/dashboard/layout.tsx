'use client';

import React, { useEffect, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { useRole } from '../../components/RoleContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeRole, isSuperAdmin, isAuthenticated } = useRole();

  useEffect(() => {
    // Route guard check
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }

    // Role-based route guards
    const roleRoutes: Record<string, string> = {
      CEO: '/dashboard/ceo',
      COO: '/dashboard/coo',
      CTO: '/dashboard/cto',
      SERVICE_MANAGER: '/dashboard/service-manager',
      HR: '/dashboard/hr',
    };

    // If not Super Admin (CEO), prevent accessing CEO dashboard or Role & Access Control Matrix
    if (!isSuperAdmin) {
      if (pathname.includes('/dashboard/ceo') || pathname.includes('/dashboard/roles')) {
        const defaultAllowed = roleRoutes[activeRole] || '/dashboard/coo';
        router.replace(defaultAllowed);
      }
    }
  }, [pathname, activeRole, isSuperAdmin, isAuthenticated, router]);

  if (pathname.startsWith('/dashboard/coo') || pathname.startsWith('/dashboard/cto')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" suppressHydrationWarning>
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Suspense fallback={<aside className="w-64 bg-white border-r border-slate-200 hidden md:block" />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-61px)]">
          <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading module workspace...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

