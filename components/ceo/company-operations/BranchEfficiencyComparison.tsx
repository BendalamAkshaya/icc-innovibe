'use client';

import React from 'react';
import { BranchEfficiency } from '../../../lib/types';
import { Building2, Award, AlertTriangle, Star, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface BranchEfficiencyComparisonProps {
  branches: BranchEfficiency[];
  onDrillDown?: (branchName: string) => void;
}

export function BranchEfficiencyComparison({ branches, onDrillDown }: BranchEfficiencyComparisonProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Branch Operational Efficiency Rankings</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Regional hubs ranked by operational score, SLA adherence, and customer satisfaction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
            5 Regional Operating Centers
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
              <th className="pb-3 px-3">Rank & Branch Hub</th>
              <th className="pb-3 px-3">Location</th>
              <th className="pb-3 px-3">Completed Today</th>
              <th className="pb-3 px-3">Pending Queue</th>
              <th className="pb-3 px-3">SLA Compliance</th>
              <th className="pb-3 px-3">CSAT Rating</th>
              <th className="pb-3 px-3">Efficiency Score</th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {branches.map((b, idx) => (
              <tr
                key={b.id}
                className={`transition-all hover:bg-slate-50 ${
                  b.isBestPerformer ? 'bg-amber-50/30' : b.requiresAttention ? 'bg-red-50/20' : ''
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
                        <p className="font-extrabold text-slate-900">{b.branchName}</p>
                        {b.isBestPerformer && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <Award className="h-3 w-3 text-amber-600 fill-amber-500" /> Best Performer
                          </span>
                        )}
                        {b.requiresAttention && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-red-600" /> Requires Attention
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-3 font-semibold text-slate-700">{b.city}</td>

                <td className="py-3.5 px-3 font-extrabold text-emerald-600">
                  {b.servicesCompleted} Jobs
                </td>

                <td className="py-3.5 px-3 font-extrabold text-amber-600">
                  {b.pendingJobs} Pending
                </td>

                <td className="py-3.5 px-3">
                  <span className={`font-black ${
                    b.slaCompliancePercent >= 95 ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {b.slaCompliancePercent}%
                  </span>
                </td>

                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1 font-black text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{b.customerRating}</span>
                  </div>
                </td>

                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          b.operationalScore >= 90 ? 'bg-emerald-500' : b.operationalScore >= 85 ? 'bg-sky-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${b.operationalScore}%` }}
                      />
                    </div>
                    <span className="font-mono font-black text-slate-900">{b.operationalScore}/100</span>
                  </div>
                </td>

                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onDrillDown && onDrillDown(b.branchName)}
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
