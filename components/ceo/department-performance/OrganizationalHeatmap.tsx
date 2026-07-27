'use client';

import React from 'react';
import { Activity, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export function OrganizationalHeatmap() {
  const depts = [
    { name: 'Technology & AI', score: 98, status: 'EXCEEDING', color: 'bg-emerald-500 text-white', label: 'Healthy' },
    { name: 'Finance & Accounts', score: 95, status: 'EXCEEDING', color: 'bg-emerald-500 text-white', label: 'Healthy' },
    { name: 'Field Operations', score: 94, status: 'EXCEEDING', color: 'bg-emerald-500 text-white', label: 'Healthy' },
    { name: 'HR & Talent', score: 91, status: 'ON_TRACK', color: 'bg-emerald-400 text-white', label: 'Healthy' },
    { name: 'Sales & Growth', score: 88, status: 'ON_TRACK', color: 'bg-emerald-400 text-white', label: 'Healthy' },
    { name: 'Procurement & SCM', score: 84, status: 'ATTENTION', color: 'bg-amber-400 text-slate-900', label: 'Monitor' },
    { name: 'Customer Support', score: 79, status: 'BEHIND', color: 'bg-orange-500 text-white', label: 'Improvement' },
    { name: 'Legal & Compliance', score: 92, status: 'ON_TRACK', color: 'bg-emerald-400 text-white', label: 'Healthy' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900">Organizational Department Performance Heatmap</h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-emerald-500" /> Healthy (90+)</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-amber-400" /> Monitor (80-89)</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-orange-500" /> Action Required (&lt;80)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {depts.map((d) => (
          <div
            key={d.name}
            className={`p-4 rounded-2xl border transition-all hover:scale-105 ${d.color} shadow-xs`}
          >
            <div className="flex items-center justify-between text-xs font-black">
              <span className="uppercase text-[10px] tracking-wider opacity-90">{d.label}</span>
              <span className="font-mono text-base">{d.score}</span>
            </div>
            <p className="font-extrabold text-sm mt-2 leading-tight">{d.name}</p>
            <p className="text-[10px] opacity-80 mt-1 font-mono">Q2 Target Achievement</p>
          </div>
        ))}
      </div>
    </div>
  );
}
