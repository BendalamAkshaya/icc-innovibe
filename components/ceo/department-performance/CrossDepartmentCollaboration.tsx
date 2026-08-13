'use client';

import React from 'react';
import { CollaborationPair } from '../../../lib/types';
import { Users, Link2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface CrossDepartmentCollaborationProps {
  pairs: CollaborationPair[];
}

export function CrossDepartmentCollaboration({ pairs }: CrossDepartmentCollaborationProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Cross-Department Collaboration & Dependencies</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Inter-department workflow efficiency, dependency count, and bottleneck identification.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          Inter-Unit Workflows
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pairs.map((pair) => (
          <div
            key={pair.id}
            className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
              pair.status === 'BOTTLENECK' ? 'bg-red-50/30 border-red-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900">
                <span>{pair.deptA}</span>
                <ArrowRight className="h-3.5 w-3.5 text-indigo-600" />
                <span>{pair.deptB}</span>
              </div>

              <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${
                pair.status === 'BOTTLENECK'
                  ? 'bg-red-100 text-red-800 border-red-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {pair.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium">{pair.primaryWorkflow}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
              <span className="text-slate-400 text-[10px]">Dependencies: <strong>{pair.dependenciesCount} Workflows</strong></span>
              <span className={`font-mono font-black ${
                pair.collaborationEfficiencyPercent >= 90 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {pair.collaborationEfficiencyPercent}% Efficiency
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
