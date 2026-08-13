'use client';

import React from 'react';
import { BarChart2, Eye, CheckCircle2, Users } from 'lucide-react';

export function CommunicationAnalyticsWidget() {
  const departmentRates = [
    { dept: 'Field Operations', readRate: 98, ackRate: 94 },
    { dept: 'Technology & AI', readRate: 100, ackRate: 98 },
    { dept: 'Finance & Accounts', readRate: 96, ackRate: 92 },
    { dept: 'HR & Talent', readRate: 94, ackRate: 90 },
    { dept: 'Customer Support', readRate: 97, ackRate: 95 },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-purple-600" />
          <h2 className="text-base font-extrabold text-slate-900">Communication Reach & Read Rates by Department</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
          96.2% Avg Read Rate
        </span>
      </div>

      <div className="space-y-3">
        {departmentRates.map((d) => (
          <div key={d.dept} className="space-y-1 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>{d.dept}</span>
              <span className="font-mono font-black text-purple-700">{d.readRate}% Read Rate</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: `${d.readRate}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
