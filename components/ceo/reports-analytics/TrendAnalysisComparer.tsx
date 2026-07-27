'use client';

import React from 'react';
import { ArrowLeftRight, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export function TrendAnalysisComparer() {
  const comparisons = [
    { metric: 'Monthly Revenue', period1: 'May 26: ₹11.80L', period2: 'Jun 26: ₹12.45L', change: '+5.5% MoM', status: 'POSITIVE' },
    { metric: 'Operating Margin', period1: 'Q1 26: 24.2%', period2: 'Q2 26: 30.8%', change: '+660 bps QoQ', status: 'POSITIVE' },
    { metric: 'Fleet Battery SOH', period1: 'Q1 Avg: 96.5%', period2: 'Q2 Avg: 94.2%', change: '-2.38% (Normal Aging)', status: 'NEUTRAL' },
    { metric: 'Customer CSAT', period1: 'Q1 26: 94.5%', period2: 'Q2 26: 98.2%', change: '+3.7% CSAT Rise', status: 'POSITIVE' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-purple-600" />
          <h2 className="text-base font-extrabold text-slate-900">Period Trend Comparison & Auto Highlights</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
          MoM / QoQ / YoY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {comparisons.map((c) => (
          <div key={c.metric} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{c.metric}</span>
            <div className="space-y-0.5 text-xs">
              <p className="text-slate-500 font-medium">{c.period1}</p>
              <p className="font-extrabold text-slate-900">{c.period2}</p>
            </div>
            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-[10px] font-mono font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block">
                {c.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
