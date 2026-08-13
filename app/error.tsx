'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error?.message || error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
        <div className="h-16 w-16 bg-red-50 text-red-600 border border-red-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900">Something went wrong!</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {error?.message || 'An unexpected error occurred while loading this workspace.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-sky-500/20 transition-all"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-2 border border-slate-200 transition-all"
          >
            <Home className="h-4 w-4" /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
