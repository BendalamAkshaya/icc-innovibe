'use client';

import React from 'react';
import { Layers, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export function ApprovalWorkflowTracker() {
  const stages = [
    { name: '1. Request Submitted', role: 'Initiator', count: 12, status: 'DONE' },
    { name: '2. Dept Head Review', role: 'VP / Lead', count: 4, status: 'DONE' },
    { name: '3. COO Alignment', role: 'COO Office', count: 3, status: 'ACTIVE' },
    { name: '4. CEO Executive Signoff', role: 'Sri Hari (CEO)', count: 6, status: 'CURRENT' },
    { name: '5. Execution Complete', role: 'Automated/ERP', count: 42, status: 'FINAL' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Executive Approval Workflow Stage Pipeline</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          5 Stage Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {stages.map((stg, idx) => (
          <div
            key={stg.name}
            className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 relative transition-all ${
              stg.status === 'CURRENT'
                ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/20'
                : stg.status === 'ACTIVE'
                ? 'bg-sky-50 border-sky-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>{stg.role}</span>
                <span className={`px-1.5 py-0.5 rounded font-mono font-black ${
                  stg.status === 'CURRENT' ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {stg.count} Requests
                </span>
              </div>
              <h3 className="font-extrabold text-xs text-slate-900">{stg.name}</h3>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <span className={`font-black uppercase ${
                stg.status === 'CURRENT' ? 'text-amber-700' : 'text-slate-500'
              }`}>
                {stg.status === 'CURRENT' ? 'CEO Active Queue' : stg.status}
              </span>
              {idx < stages.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-slate-400 hidden md:block" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
