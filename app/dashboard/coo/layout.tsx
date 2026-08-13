import React from 'react';
import { COOSidebar } from '@/components/coo/COOSidebar';
import { COONavbar } from '@/components/coo/COONavbar';

export default function COOLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <COOSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <COONavbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
