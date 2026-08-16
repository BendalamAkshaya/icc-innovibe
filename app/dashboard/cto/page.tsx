'use client';

import React from 'react';

export default function CTODashboardPage() {
  return (
    <div className="w-full h-screen min-h-screen bg-slate-900 overflow-hidden flex flex-col">
      <iframe 
        src="/cto/index.html" 
        className="w-full h-full border-none flex-1"
        title="InnoVibe Mobility CTO Portal - Executive Command Center"
      />
    </div>
  );
}
