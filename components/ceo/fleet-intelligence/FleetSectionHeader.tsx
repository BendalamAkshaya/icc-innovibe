'use client';

import React from 'react';
import { Calendar, Building2, Car, Activity, BarChart2, Radio } from 'lucide-react';

interface FleetSectionHeaderProps {
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
  selectedVehicleType: string;
  onVehicleTypeChange: (type: string) => void;
  onFullAnalytics: () => void;
}

export function FleetSectionHeader({
  selectedBranch,
  onBranchChange,
  selectedDateRange,
  onDateRangeChange,
  selectedVehicleType,
  onVehicleTypeChange,
  onFullAnalytics,
}: FleetSectionHeaderProps) {
  const branches = [
    'All Fleet Hubs',
    'Kakinada Main Hub',
    'Rajahmundry East',
    'Vijayawada Central',
    'Visakhapatnam Port',
    'Guntur South',
  ];

  const dateRanges = [
    'Realtime Telemetry (Live)',
    'Last 24 Hours',
    'Last 7 Days',
    'This Month (Jun 2026)',
    'Year to Date',
  ];

  const vehicleTypes = [
    'All Vehicle Models',
    'Ather 450X / 450S (Scooters)',
    'Ola S1 Pro (Urban Commuters)',
    'Euler HiLoad (Commercial Cargo)',
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Radio className="h-3 w-3 animate-pulse text-emerald-600" /> Live EV IoT Telemetry Active
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Fleet Intelligence</h1>
        <p className="text-xs text-slate-500 font-medium">
          Real-time visibility into connected vehicles, battery degradation, and operational readiness.
        </p>
      </div>

      {/* Control Actions & Filters */}
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

        {/* Vehicle Type Filter */}
        <div className="relative flex items-center">
          <Car className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedVehicleType}
            onChange={(e) => onVehicleTypeChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer appearance-none shadow-xs"
          >
            {vehicleTypes.map((v) => (
              <option key={v} value={v}>
                {v}
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

        {/* Full Analytics Button */}
        <button
          onClick={onFullAnalytics}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
        >
          <BarChart2 className="h-3.5 w-3.5 text-white" />
          <span>Full Fleet Analytics</span>
        </button>
      </div>
    </div>
  );
}
