'use client';

import React from 'react';
import { BranchPerformance } from '../../../lib/types';
import { Building2, Award, TrendingUp, TrendingDown, Star, ArrowUpRight, AlertCircle } from 'lucide-react';

interface BranchRevenueComparisonProps {
  branches: BranchPerformance[];
  onSelectBranch?: (branchName: string) => void;
}

export function BranchRevenueComparison({ branches, onSelectBranch }: BranchRevenueComparisonProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">Branch Revenue & Performance Comparison</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Ranked company service hubs by revenue, growth velocity, and customer satisfaction rating.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1.5 shadow-xs">
            <Award className="h-3.5 w-3.5 text-amber-600 fill-amber-500" /> 5 Active Regional Hubs
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
              <th className="pb-3 px-3">Rank & Branch</th>
              <th className="pb-3 px-3">City Hub</th>
              <th className="pb-3 px-3">Revenue (₹)</th>
              <th className="pb-3 px-3">Growth %</th>
              <th className="pb-3 px-3">Services Completed</th>
              <th className="pb-3 px-3">Customer Rating</th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {branches.map((b, idx) => (
              <tr
                key={b.id}
                className={`transition-all hover:bg-slate-50 ${
                  b.isBestPerformer ? 'bg-amber-50/30' : b.isLowestPerformer ? 'bg-red-50/20' : ''
                }`}
              >
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-6 w-6 rounded-lg font-black text-xs flex items-center justify-center ${
                      idx === 0 ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-slate-900">{b.name}</p>
                        {b.isBestPerformer && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <Award className="h-3 w-3 text-amber-600 fill-amber-500" /> Best Performer
                          </span>
                        )}
                        {b.isLowestPerformer && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 text-red-600" /> Lowest Performer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-semibold text-slate-700">{b.city}</td>
                <td className="py-3.5 px-3 font-black text-slate-900 text-sm">
                  ₹{b.revenue.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-3">
                  <span className={`font-extrabold flex items-center gap-1 ${
                    b.growthPercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {b.growthPercent >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {b.growthPercent >= 0 ? `+${b.growthPercent}%` : `${b.growthPercent}%`}
                  </span>
                </td>
                <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                  {b.servicesCompleted} Jobs
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{b.customerRating}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onSelectBranch && onSelectBranch(b.name)}
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
