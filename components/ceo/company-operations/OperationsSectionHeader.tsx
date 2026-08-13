'use client';

import React from 'react';
import { Calendar, Building2, RefreshCw, ExternalLink, Activity } from 'lucide-react';

interface OperationsSectionHeaderProps {
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
  onRefresh: () => void;
  onViewFullOperations: () => void;
}

export function OperationsSectionHeader({
  selectedBranch,
  onBranchChange,
  selectedDateRange,
  onDateRangeChange,
  onRefresh,
  onViewFullOperations,
}: OperationsSectionHeaderProps) {
  const branches = [
    'All Operating Hubs',
    'Kakinada Main Hub',
    'Rajahmundry East',
    'Vijayawada Central',
    'Visakhapatnam Port',
    'Guntur South',
  ];

  const dateRanges = [
    'Today (Live Operational Flow)',
    'Yesterday',
    'Last 7 Days',
    'This Month (Jun 2026)',
    'Quarter to Date (Q2)',
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            Realtime Operational Intelligence
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Company Operations</h1>
        <p className="text-xs text-slate-500 font-medium">
          Monitor operational performance, service center throughput, and SLA compliance across all branches.
        </p>
      </div>

      {/* Controls & Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Branch Filter */}
        <div className="relative flex items-center">
          <Building2 className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer appearance-none shadow-xs"
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="relative flex items-center">
          <Calendar className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedDateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer appearance-none shadow-xs"
          >
            {dateRanges.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5 text-slate-600" />
          <span>Refresh</span>
        </button>

        {/* View Full Operations Button */}
        <button
          onClick={onViewFullOperations}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
        >
          <Activity className="h-3.5 w-3.5 text-sky-400" />
          <span>View Full Operations</span>
        </button>
      </div>
    </div>
  );
}
