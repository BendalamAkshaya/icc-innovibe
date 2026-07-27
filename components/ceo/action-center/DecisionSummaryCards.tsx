'use client';

import React from 'react';
import { DecisionSummaryMetric } from '../../../lib/types';
import { Clock, CheckCircle2, AlertTriangle, ArrowUpRight, UserCheck, IndianRupee, TrendingUp } from 'lucide-react';

interface DecisionSummaryCardsProps {
  metrics: DecisionSummaryMetric[];
}

export function DecisionSummaryCards({ metrics }: DecisionSummaryCardsProps) {
  const customKpis = [
    { label: 'Pending Signatures', value: '6 Decisions', note: 'Requires CEO Signoff', color: 'border-amber-200 bg-amber-50/40 text-amber-900' },
    { label: 'Business Value Waiting', value: '₹1.82 Cr', note: 'Capital Exposure', color: 'border-sky-200 bg-sky-50/40 text-sky-900' },
    { label: 'Today\'s Critical', value: '2 Signatures', note: 'Due by 05:00 PM', color: 'border-red-200 bg-red-50/40 text-red-900' },
    { label: 'Delegated to Leadership', value: '4 Requests', note: 'Active COO & VP Track', color: 'border-indigo-200 bg-indigo-50/40 text-indigo-900' },
    { label: 'Avg Decision Velocity', value: '14 Mins', note: 'Fast Turnaround', color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900' },
    { label: 'Avg ROI Approved', value: '22.4%', note: 'Q2 Portfolio Return', color: 'border-purple-200 bg-purple-50/40 text-purple-900' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-left" suppressHydrationWarning>
      {customKpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`p-4 rounded-2xl border ${kpi.color} flex flex-col justify-between space-y-2 transition-all hover:scale-[1.02] shadow-xs`}
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">{kpi.label}</span>
            <p className="text-xl lg:text-2xl font-black text-slate-900 mt-1 leading-none">{kpi.value}</p>
          </div>

          <div className="pt-2 border-t border-slate-200/50">
            <span className="text-[10px] font-bold text-slate-600 block truncate">{kpi.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
