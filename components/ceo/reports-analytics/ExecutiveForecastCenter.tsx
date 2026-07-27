'use client';

import React from 'react';
import { Cpu, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

export function ExecutiveForecastCenter() {
  const forecasts = [
    { title: 'Quarterly Gross Revenue', current: '₹12.45L', forecast: '₹14.80L', confidence: '94.0%', timeframe: 'Q2 2026', color: 'text-emerald-600' },
    { title: 'Connected Fleet Expansion', current: '148 EVs', forecast: '180 EVs', confidence: '96.2%', timeframe: 'Next 60 Days', color: 'text-sky-600' },
    { title: 'Battery Module Replacement', current: '3 Packs', forecast: '12 Packs', confidence: '91.8%', timeframe: 'Next 90 Days', color: 'text-amber-600' },
    { title: 'Technician Headcount Hiring', current: '148 Staff', forecast: '156 Staff', confidence: '89.4%', timeframe: 'Next 30 Days', color: 'text-purple-600' },
    { title: 'Net Operating Cash Flow', current: '₹4.20L', forecast: '₹5.80L', confidence: '93.5%', timeframe: 'Q2 2026', color: 'text-emerald-600' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-emerald-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900">Executive Predictive Forecast Center</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          Forward-Looking AI Models
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-2 flex-1">
        {forecasts.map((f) => (
          <div key={f.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between hover:bg-slate-100/80 transition-all">
            <div>
              <span className="text-[10px] font-mono font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 block mb-1">
                {f.timeframe}
              </span>
              <h3 className="font-extrabold text-xs text-slate-900 leading-tight">{f.title}</h3>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-200">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-slate-400 text-[10px] font-bold">Current: {f.current}</span>
                <span className={`font-black font-mono text-sm ${f.color}`}>{f.forecast}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold text-right">AI Conf: <strong className="text-slate-800">{f.confidence}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
