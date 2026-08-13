'use client';

import React from 'react';
import { Target, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export function StrategicInitiativeTracker() {
  const initiatives = [
    { title: 'South India Coastal Expansion', owner: 'Field Operations', progress: 85, budget: '₹18.5L', status: 'ON_TRACK', color: 'bg-emerald-500' },
    { title: 'n8n Back-Office Automation Engine', owner: 'Tech & AI Lab', progress: 95, budget: '₹6.2L', status: 'ON_TRACK', color: 'bg-indigo-600' },
    { title: 'Fleet Intelligence IoT Sensor Upgrade', owner: 'EV Tech Team', progress: 72, budget: '₹12.0L', status: 'ON_TRACK', color: 'bg-sky-500' },
    { title: 'Zero-Paper Compliance Directive', owner: 'Finance & HR', progress: 100, budget: '₹1.5L', status: 'COMPLETED', color: 'bg-emerald-600' },
    { title: 'ERP SCM Lead-Time Optimization', owner: 'Procurement', progress: 62, budget: '₹4.8L', status: 'ATTENTION', color: 'bg-amber-500' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Company Strategic Initiative Tracker</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
          5 Major Enterprise Initiatives
        </span>
      </div>

      <div className="space-y-3">
        {initiatives.map((init) => (
          <div key={init.title} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-extrabold text-slate-900">{init.title}</p>
                <p className="text-[10px] text-slate-500 font-medium">Owner: {init.owner} • Budget: {init.budget}</p>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                init.status === 'COMPLETED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : init.status === 'ATTENTION'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-sky-100 text-sky-800'
              }`}>
                {init.status} ({init.progress}%)
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${init.color}`} style={{ width: `${init.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
