'use client';

import React from 'react';
import { ArrowRight, Network, AlertCircle, ShieldAlert } from 'lucide-react';

export function RiskDependencyGraph() {
  const chainSteps = [
    { title: 'Ather Spare Parts Delay', dept: 'Procurement & SCM', status: 'ROOT_CAUSE', color: 'bg-red-50 text-red-800 border-red-300' },
    { title: 'Technician Repair Delays', dept: 'Field Operations', status: 'IMPACTED', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    { title: 'Service Hub Queue Surge', dept: 'Guntur Hub', status: 'IMPACTED', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    { title: 'Customer SLA Breach', dept: 'Customer Support', status: 'RISK', color: 'bg-purple-50 text-purple-800 border-purple-300' },
    { title: 'Revenue Loss Exposure', dept: 'Finance & Accounts', status: 'FINAL_OUTCOME', color: 'bg-slate-900 text-white border-slate-900' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Systemic Risk Dependency Graph</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
          Cascading Chain Reaction Model
        </span>
      </div>

      {/* Cascading Chain Reaction Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
        {chainSteps.map((step, idx) => (
          <React.Fragment key={step.title}>
            <div className={`p-3.5 rounded-2xl border text-left space-y-1 ${step.color}`}>
              <span className="text-[9px] font-mono font-black uppercase tracking-wider block opacity-80">
                STEP {idx + 1} • {step.status}
              </span>
              <p className="font-extrabold text-xs leading-tight">{step.title}</p>
              <p className="text-[10px] opacity-75 font-medium">{step.dept}</p>
            </div>

            {idx < chainSteps.length - 1 && (
              <div className="hidden sm:flex justify-center text-slate-400">
                <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
