'use client';

import React from 'react';
import { canView } from '@/lib/permissions';
import Link from 'next/link';

interface RouteGuardProps {
  module: string;
  children: React.ReactNode;
}

export function RouteGuard({ module, children }: RouteGuardProps) {
  const allowed = canView(module);

  if (!allowed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-2xl p-8 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            403
          </div>
          <h2 className="text-2xl font-black text-slate-900">Access Restricted</h2>
          <p className="text-sm text-slate-600">
            The <strong>Chief Operating Officer (COO)</strong> role does not have permission to access the 
            <span className="font-semibold text-rose-600"> {module.toUpperCase()}</span> module.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 text-left">
            <strong>RBAC Security Matrix:</strong> Modules such as Roles & Permissions, User Management, Global Settings, and DevOps are restricted exclusively to Super Admin.
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/coo"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition shadow-md hover:shadow-lg"
            >
              Return to COO Operations Command Center
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
