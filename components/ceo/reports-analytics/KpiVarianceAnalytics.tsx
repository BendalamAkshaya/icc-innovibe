'use client';

import React from 'react';
import { KpiVarianceItem } from '../../../lib/types';
import { Target, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle } from 'lucide-react';

interface KpiVarianceAnalyticsProps {
  variances: KpiVarianceItem[];
}

export function KpiVarianceAnalytics({ variances }: KpiVarianceAnalyticsProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Strategic KPI Goal vs Actual Variance Tracker</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          Executive Tracking
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
              <th className="pb-3 px-3">Strategic KPI</th>
              <th className="pb-3 px-3">Category</th>
              <th className="pb-3 px-3">Q2 Target Goal</th>
              <th className="pb-3 px-3">Actual Achievement</th>
              <th className="pb-3 px-3">Forecast</th>
              <th className="pb-3 px-3 text-right">Variance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {variances.map((v) => (
              <tr key={v.id} className="transition-all hover:bg-slate-50">
                <td className="py-3.5 px-3 font-extrabold text-slate-900">{v.kpiName}</td>
                <td className="py-3.5 px-3">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {v.category}
                  </span>
                </td>
                <td className="py-3.5 px-3 font-mono font-bold text-slate-600">{v.quarterlyGoal}</td>
                <td className="py-3.5 px-3 font-mono font-black text-slate-900">{v.actualAchievement}</td>
                <td className="py-3.5 px-3 font-mono font-bold text-indigo-600">{v.forecastValue}</td>
                <td className="py-3.5 px-3 text-right">
                  <span
                    className={`inline-flex items-center gap-1 font-mono font-black px-2.5 py-0.5 rounded border text-[11px] ${
                      v.variancePercent >= 0
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-red-50 text-red-800 border-red-300'
                    }`}
                  >
                    {v.variancePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {v.variancePercent > 0 ? `+${v.variancePercent}%` : `${v.variancePercent}%`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
