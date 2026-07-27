'use client';

import React from 'react';
import { Search, Filter, Calendar, Building2, Layers, CheckSquare } from 'lucide-react';

interface ActionCenterSectionHeaderProps {
  selectedPriority: string;
  onPriorityChange: (p: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedBranch: string;
  onBranchChange: (b: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function ActionCenterSectionHeader({
  selectedPriority,
  onPriorityChange,
  selectedCategory,
  onCategoryChange,
  selectedBranch,
  onBranchChange,
  searchQuery,
  onSearchChange,
}: ActionCenterSectionHeaderProps) {
  const priorities = ['All Priorities', 'HIGH', 'MEDIUM', 'LOW'];
  const categories = ['All Categories', 'Finance', 'HR', 'Operations', 'Fleet', 'Technology'];
  const branches = [
    'All Branches & Hubs',
    'Kakinada Main Hub',
    'Rajahmundry East',
    'Vijayawada Central',
    'Visakhapatnam Port',
    'Guntur South',
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
            <CheckSquare className="h-3.5 w-3.5 text-amber-600" /> Executive Decision Workspace
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">CEO Action Center</h1>
        <p className="text-xs text-slate-500 font-medium">
          Manage executive approvals, strategic initiatives, delegated tasks, and AI decision support in one unified workspace.
        </p>
      </div>

      {/* Filter Controls & Search */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search decision requests..."
            className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500 shadow-xs w-48 lg:w-56"
          />
        </div>

        {/* Priority Filter */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer appearance-none shadow-xs"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="relative flex items-center">
          <Layers className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer appearance-none shadow-xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Branch Filter */}
        <div className="relative flex items-center">
          <Building2 className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer appearance-none shadow-xs"
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
