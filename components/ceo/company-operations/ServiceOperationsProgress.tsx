'use client';

import React from 'react';
import { OperationsProgress } from '../../../lib/types';
import { CheckCircle2, Clock, Hourglass, AlertCircle, BarChart3, Layers } from 'lucide-react';

interface ServiceOperationsProgressProps {
  progress: OperationsProgress;
}

export function ServiceOperationsProgress({ progress }: ServiceOperationsProgressProps) {
  const { totalJobsToday, completedJobs, inProgressJobs, waitingJobs, delayedJobs, completionRatePercent } = progress;

  const completedPct = ((completedJobs / totalJobsToday) * 100).toFixed(1);
  const inProgressPct = ((inProgressJobs / totalJobsToday) * 100).toFixed(1);
  const waitingPct = ((waitingJobs / totalJobsToday) * 100).toFixed(1);
  const delayedPct = ((delayedJobs / totalJobsToday) * 100).toFixed(1);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-sky-600" />
            <h2 className="text-base font-extrabold text-slate-900">Service Operations Throughput Dashboard</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Realtime visual job distribution across active technician shifts today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Total Jobs Today: <span className="text-sky-600 font-mono">{totalJobsToday}</span>
          </span>
          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Completion Rate: {completionRatePercent}%
          </span>
        </div>
      </div>

      {/* Multi-segmented Visual Stack Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
          <span>Job Fulfillment Breakdown</span>
          <span>{completedJobs} of {totalJobsToday} Completed</span>
        </div>

        <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner p-0.5 gap-0.5">
          <div
            style={{ width: `${completedPct}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500 relative group"
            title={`Completed: ${completedJobs} (${completedPct}%)`}
          />
          <div
            style={{ width: `${inProgressPct}%` }}
            className="h-full bg-sky-500 transition-all duration-500 relative group"
            title={`In Progress: ${inProgressJobs} (${inProgressPct}%)`}
          />
          <div
            style={{ width: `${waitingPct}%` }}
            className="h-full bg-amber-400 transition-all duration-500 relative group"
            title={`Waiting Queue: ${waitingJobs} (${waitingPct}%)`}
          />
          <div
            style={{ width: `${delayedPct}%` }}
            className="h-full bg-red-500 rounded-r-full transition-all duration-500 relative group"
            title={`Delayed: ${delayedJobs} (${delayedPct}%)`}
          />
        </div>
      </div>

      {/* Visual Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Completed */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500 text-white shrink-0 shadow-xs">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">Completed</p>
            <p className="text-xl font-black text-slate-900">{completedJobs} <span className="text-xs font-extrabold text-emerald-600">({completedPct}%)</span></p>
          </div>
        </div>

        {/* In Progress */}
        <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-600 text-white shrink-0 shadow-xs">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800">In Progress</p>
            <p className="text-xl font-black text-slate-900">{inProgressJobs} <span className="text-xs font-extrabold text-sky-600">({inProgressPct}%)</span></p>
          </div>
        </div>

        {/* Waiting */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500 text-white shrink-0 shadow-xs">
            <Hourglass className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">Waiting Queue</p>
            <p className="text-xl font-black text-slate-900">{waitingJobs} <span className="text-xs font-extrabold text-amber-600">({waitingPct}%)</span></p>
          </div>
        </div>

        {/* Delayed */}
        <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-500 text-white shrink-0 shadow-xs">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-red-800">Delayed</p>
            <p className="text-xl font-black text-slate-900">{delayedJobs} <span className="text-xs font-extrabold text-red-600">({delayedPct}%)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
