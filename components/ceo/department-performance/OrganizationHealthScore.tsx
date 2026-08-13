'use client';

import React from 'react';
import { OrganizationHealthData } from '../../../lib/types';
import { ShieldCheck, Activity, Target, Zap, CheckCircle2, TrendingUp, AlertTriangle, Cpu, Users, Layers } from 'lucide-react';

interface OrganizationHealthScoreProps {
  healthData: OrganizationHealthData;
}

export function OrganizationHealthScore({ healthData }: OrganizationHealthScoreProps) {
  const {
    overallHealthScore,
    departmentEfficiency,
    goalAchievementPercent,
    productivityIndex,
    operationalStabilityScore,
  } = healthData;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Organization Overall Health Score</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Consolidated organizational health derived across all 8 business units & 148 staff.
          </p>
        </div>

        <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Overall Health: {overallHealthScore}/100 (Optimal)
        </span>
      </div>

      {/* 3-Column Hero Layout: Left (45%) | Center (35%) | Right (20%) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch">
        {/* Left Column (45% -> col-span-4 lg:col-span-4) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-white border border-indigo-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">Health Index</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +2.4% vs Q1
            </span>
          </div>

          <div className="flex items-center gap-5 my-2">
            <div className="h-24 w-24 rounded-full border-4 border-indigo-600 bg-white flex flex-col items-center justify-center shadow-lg shrink-0">
              <span className="text-3xl font-black text-slate-900 leading-none">{overallHealthScore}</span>
              <span className="text-[10px] font-extrabold uppercase text-indigo-600 mt-1">/ 100 PTS</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="font-extrabold text-slate-900">Organization Operating Above Target</p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                • Technology & AI leading at <strong>98/100</strong>.<br />
                • Finance & Accounts at <strong>95/100</strong>.<br />
                • Customer Support requires attention (<strong>79/100</strong>).
              </p>
            </div>
          </div>
        </div>

        {/* Center Column (35% -> col-span-4 lg:col-span-4) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Efficiency</span>
            <p className="text-xl font-black text-sky-600">{departmentEfficiency}%</p>
            <span className="text-[10px] text-slate-500 font-medium">Target: 90%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Goal Completion</span>
            <p className="text-xl font-black text-emerald-600">{goalAchievementPercent}%</p>
            <span className="text-[10px] text-slate-500 font-medium">Target: 92%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Productivity</span>
            <p className="text-xl font-black text-indigo-600">{productivityIndex}/100</p>
            <span className="text-[10px] text-slate-500 font-medium">Target: 88</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Stability Score</span>
            <p className="text-xl font-black text-purple-600">{operationalStabilityScore}/100</p>
            <span className="text-[10px] text-slate-500 font-medium">Zero Back-Office</span>
          </div>
        </div>

        {/* Right Column (20% -> col-span-2 lg:col-span-2) */}
        <div className="lg:col-span-2 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-amber-800 font-extrabold pb-1 border-b border-amber-200/60">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span>Executive Alerts</span>
          </div>

          <div className="space-y-1.5 text-[11px] font-semibold text-slate-800">
            <p className="text-red-700">• 1 Dept Below Target (Support)</p>
            <p className="text-amber-800">• 3 OKRs Delayed in SCM</p>
            <p className="text-slate-700">• 2 Cross-Team Dependencies</p>
            <p className="text-indigo-800">• Hiring Bottleneck (2 Roles)</p>
          </div>

          <button onClick={() => alert('Opening AI Executive Risk Remediation...')} className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] shadow-xs">
            AI Recommendation
          </button>
        </div>
      </div>
    </div>
  );
}
