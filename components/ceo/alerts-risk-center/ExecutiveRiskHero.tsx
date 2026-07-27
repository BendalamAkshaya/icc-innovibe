'use client';

import React from 'react';
import { ShieldAlert, TrendingDown, CheckCircle2, AlertTriangle, Shield, Cpu } from 'lucide-react';

interface ExecutiveRiskHeroProps {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  monitoringCount: number;
  onFilterBySeverity: (sev: string) => void;
}

export function ExecutiveRiskHero({
  criticalCount,
  highCount,
  mediumCount,
  monitoringCount,
  onFilterBySeverity,
}: ExecutiveRiskHeroProps) {
  const healthBars = [
    { label: 'Compliance', score: 98, color: 'bg-emerald-500' },
    { label: 'Security & Infrastructure', score: 99, color: 'bg-emerald-500' },
    { label: 'Fleet Telemetry', score: 94, color: 'bg-sky-500' },
    { label: 'Field Operations', score: 91, color: 'bg-indigo-600' },
    { label: 'Financial Controls', score: 96, color: 'bg-purple-500' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6 text-left" suppressHydrationWarning>
      {/* 1. Top Section: Risk Index & Severity Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-slate-200 pb-6">
        {/* Left: Overall Risk Index */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white space-y-2 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black uppercase text-sky-400 tracking-wider">
              OVERALL BUSINESS RISK INDEX
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" /> ↓ Improved 6%
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">18 <span className="text-xl text-slate-400 font-normal">/ 100</span></span>
            <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-500 text-white uppercase shadow-sm">
              LOW RISK
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium pt-1 leading-relaxed">
            Company operational risk is optimal. All 148 IoT streams and ledger audits operating within safety thresholds.
          </p>
        </div>

        {/* Center: Executive Radar Badges */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onFilterBySeverity('CRITICAL')}
            className="p-4 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-red-700">
              <span className="text-[10px] font-black uppercase tracking-wider">Critical</span>
              <ShieldAlert className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">{criticalCount}</p>
            <span className="text-[10px] font-extrabold text-red-600 group-hover:underline mt-0.5 block">Requires Action ▶</span>
          </button>

          <button
            onClick={() => onFilterBySeverity('HIGH')}
            className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-amber-700">
              <span className="text-[10px] font-black uppercase tracking-wider">High</span>
              <AlertTriangle className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">{highCount}</p>
            <span className="text-[10px] font-extrabold text-amber-600 group-hover:underline mt-0.5 block">Inspect Details ▶</span>
          </button>

          <button
            onClick={() => onFilterBySeverity('MEDIUM')}
            className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-sky-700">
              <span className="text-[10px] font-black uppercase tracking-wider">Medium</span>
              <Shield className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">{mediumCount}</p>
            <span className="text-[10px] font-extrabold text-sky-600 group-hover:underline mt-0.5 block">View Queue ▶</span>
          </button>

          <button
            onClick={() => onFilterBySeverity('ALL')}
            className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-emerald-700">
              <span className="text-[10px] font-black uppercase tracking-wider">Monitoring</span>
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">{monitoringCount}</p>
            <span className="text-[10px] font-extrabold text-emerald-600 group-hover:underline mt-0.5 block">System Normal ▶</span>
          </button>
        </div>
      </div>

      {/* 2. Bottom Section: Organization Health Bars & AI Priority Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Organization Health Bars */}
        <div className="lg:col-span-7 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Organization Risk Posture Health
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {healthBars.map((h) => (
              <div key={h.label} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-slate-700 truncate">{h.label}</span>
                  <span className="font-mono font-black text-slate-900">{h.score}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${h.color}`} style={{ width: `${h.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Top Priority Banner */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 shadow-md">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-mono font-black uppercase text-indigo-700">
              AI HIGH PRIORITY RECOMMENDATION
            </span>
            <p className="font-extrabold text-slate-900">
              Resolve technician shortage in Guntur Bay.
            </p>
            <p className="text-slate-600 text-[11px] font-semibold">
              Estimated SLA improvement: <strong className="text-emerald-700">+6.2%</strong> • Suggested completion: <strong className="text-indigo-800">Today</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
