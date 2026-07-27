'use client';

import React from 'react';
import { GoalOkrTracker } from '../../../lib/types';
import { Target, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface GoalKpiTrackingProps {
  okrs: GoalOkrTracker[];
}

export function GoalKpiTracking({ okrs }: GoalKpiTrackingProps) {
  const getStatusBadge = (status: GoalOkrTracker['status']) => {
    switch (status) {
      case 'COMPLETED':
        return { label: 'Completed', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'DELAYED':
        return { label: 'Delayed', bg: 'bg-red-100 text-red-800 border-red-300' };
      default:
        return { label: 'Active Progress', bg: 'bg-sky-100 text-sky-800 border-sky-300' };
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 h-full flex flex-col justify-between text-left">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <h2 className="text-base font-extrabold text-slate-900">Organizational OKRs & Strategic Goals</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Quarterly objectives, strategic initiatives, and key result achievement status.
            </p>
          </div>

          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
            Q2 2026 Objectives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-4">
          {okrs.map((okr) => {
            const badge = getStatusBadge(okr.status);

            return (
              <div key={okr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {okr.department} • {okr.quarter}
                    </span>
                    <h3 className="font-extrabold text-xs text-slate-900 mt-1.5">{okr.title}</h3>
                  </div>

                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase shrink-0 ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Current: {okr.currentValue}</span>
                    <span className="text-indigo-600 font-mono font-black">{okr.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        okr.progressPercent === 100
                          ? 'bg-emerald-500'
                          : okr.status === 'DELAYED'
                          ? 'bg-red-500'
                          : 'bg-indigo-600'
                      }`}
                      style={{ width: `${okr.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-medium text-right">
                  Target: <strong className="text-slate-700">{okr.targetValue}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Executive Summary Footer Badge */}
      <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between font-bold">
        <span>OKR Target Health: 4 Active • 1 Completed • 1 Delayed • 89.2% Avg Goal Achievement</span>
        <CheckCircle2 className="h-4 w-4 text-indigo-600" />
      </div>
    </div>
  );
}
