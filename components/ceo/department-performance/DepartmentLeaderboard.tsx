'use client';

import React from 'react';
import { DepartmentLeaderboardItem } from '../../../lib/types';
import { Award, TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface DepartmentLeaderboardProps {
  items: DepartmentLeaderboardItem[];
  onSelectDepartment?: (name: string) => void;
}

export function DepartmentLeaderboard({ items, onSelectDepartment }: DepartmentLeaderboardProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600 fill-amber-500" />
            <h2 className="text-base font-extrabold text-slate-900">Department Leaderboard Rankings</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Ranked organizational units by overall efficiency, growth velocity, and OKR target achievement.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-300">
          Q2 2026 Standing
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
              <th className="pb-3 px-3">Rank & Department</th>
              <th className="pb-3 px-3">Score</th>
              <th className="pb-3 px-3">Growth YoY</th>
              <th className="pb-3 px-3">KPI Achievement</th>
              <th className="pb-3 px-3">Efficiency</th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr
                key={item.id}
                className={`transition-all hover:bg-slate-50 ${
                  item.badge === 'BEST_PERFORMER'
                    ? 'bg-amber-50/30'
                    : item.badge === 'REQUIRES_ATTENTION'
                    ? 'bg-red-50/20'
                    : ''
                }`}
              >
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-6 w-6 rounded-lg font-black text-xs flex items-center justify-center ${
                      item.rank === 1
                        ? 'bg-amber-500 text-white'
                        : item.rank === 2
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      #{item.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-slate-900">{item.departmentName}</p>
                        {item.badge === 'BEST_PERFORMER' && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <Award className="h-3 w-3 text-amber-600 fill-amber-500" /> Best Performer
                          </span>
                        )}
                        {item.badge === 'MOST_IMPROVED' && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-emerald-600" /> Most Improved
                          </span>
                        )}
                        {item.badge === 'REQUIRES_ATTENTION' && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-red-600" /> Requires Attention
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-3 font-black text-slate-900 text-sm">
                  {item.performanceScore}/100
                </td>

                <td className="py-3.5 px-3">
                  <span className={`font-extrabold flex items-center gap-1 ${
                    item.growthPercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {item.growthPercent >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {item.growthPercent >= 0 ? `+${item.growthPercent}%` : `${item.growthPercent}%`}
                  </span>
                </td>

                <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                  {item.kpiAchievementPercent}%
                </td>

                <td className="py-3.5 px-3 font-mono font-bold text-indigo-600">
                  {item.efficiencyPercent}%
                </td>

                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onSelectDepartment && onSelectDepartment(item.departmentName)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-[11px] shadow-xs inline-flex items-center gap-1 transition-all"
                  >
                    <span>Drill-down</span>
                    <ArrowUpRight className="h-3 w-3 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
