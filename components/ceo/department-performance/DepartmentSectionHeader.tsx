'use client';

import React from 'react';
import { Calendar, Building2, Layers, BarChart2, Users } from 'lucide-react';

interface DepartmentSectionHeaderProps {
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (dept: string) => void;
  onCompareDepartments: () => void;
  onViewOrg: () => void;
}

export function DepartmentSectionHeader({
  selectedBranch,
  onBranchChange,
  selectedDateRange,
  onDateRangeChange,
  selectedDepartment,
  onDepartmentChange,
  onCompareDepartments,
  onViewOrg,
}: DepartmentSectionHeaderProps) {
  const branches = [
    'All Branches & Hubs',
    'Kakinada Main Hub',
    'Rajahmundry East',
    'Vijayawada Central',
    'Visakhapatnam Port',
    'Guntur South',
  ];

  const dateRanges = [
    'Q2 2026 (Active Quarter)',
    'This Month (Jun 2026)',
    'Last Month (May 2026)',
    'Year to Date (2026)',
  ];

  const departments = [
    'All Business Functions',
    'Field & Hub Operations',
    'Technology & AI Engineering',
    'Human Resources & Talent',
    'Finance & Accounts',
    'Sales & Growth',
    'Brand Marketing & PR',
    'Customer Support & Success',
    'Inventory & Procurement',
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            Organizational Performance Intelligence
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Department Performance</h1>
        <p className="text-xs text-slate-500 font-medium">
          Monitor organizational performance, department OKRs, and cross-functional efficiency across all business units.
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

        {/* Department Filter */}
        <div className="relative flex items-center">
          <Layers className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer appearance-none shadow-xs"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
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

        {/* Compare Departments Button */}
        <button
          onClick={onCompareDepartments}
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-all"
        >
          <BarChart2 className="h-3.5 w-3.5 text-indigo-600" />
          <span>Compare Depts</span>
        </button>

        {/* View Org Structure Button */}
        <button
          onClick={onViewOrg}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
        >
          <Users className="h-3.5 w-3.5 text-white" />
          <span>View Org Structure</span>
        </button>
      </div>
    </div>
  );
}
