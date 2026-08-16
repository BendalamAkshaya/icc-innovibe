'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="h-16 w-16 bg-red-50 text-red-600 border border-red-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">Application Runtime Error</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {error?.message || 'A critical error occurred while initializing the application.'}
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-sky-500/20 transition-all mx-auto"
          >
            <RefreshCw className="h-4 w-4" /> Reset Workspace
          </button>
        </div>
      </body>
    </html>
  );
}
