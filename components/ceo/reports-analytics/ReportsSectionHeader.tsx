'use client';

import React from 'react';
import { Search, Filter, Calendar, BarChart3, FileText, Download, Sparkles, Sliders } from 'lucide-react';

interface ReportsSectionHeaderProps {
  activeView: 'EXECUTIVE_REPORTS' | 'ANALYTICS_STUDIO';
  onViewChange: (view: 'EXECUTIVE_REPORTS' | 'ANALYTICS_STUDIO') => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAiGenerator: () => void;
  onExport: () => void;
}

export function ReportsSectionHeader({
  activeView,
  onViewChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onOpenAiGenerator,
  onExport,
}: ReportsSectionHeaderProps) {
  const categories = [
    'All Categories',
    'Business Reports',
    'Fleet Reports',
    'Operations Reports',
    'HR Reports',
    'Customer Reports',
    'Finance Reports',
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5 text-emerald-600" /> Executive Analytics & Reporting Platform
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Reports & Analytics</h1>
        <p className="text-xs text-slate-500 font-medium">
          Enterprise insights, executive report packs, predictive forecasting, board presentation mode, and custom analytics studio.
        </p>

        {/* Product Dual View Switcher Pills */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onViewChange('EXECUTIVE_REPORTS')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeView === 'EXECUTIVE_REPORTS'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>1. Executive Reports (Quick Brief)</span>
          </button>

          <button
            onClick={() => onViewChange('ANALYTICS_STUDIO')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeView === 'ANALYTICS_STUDIO'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>2. Analytics Studio (Deep Exploration)</span>
          </button>
        </div>
      </div>

      {/* Control Actions & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reports & metrics..."
            className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 shadow-xs w-44 lg:w-48"
          />
        </div>

        {/* Category Filter */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none shadow-xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* AI Report Generator Trigger */}
        <button
          onClick={onOpenAiGenerator}
          className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          <span>AI Report Generator</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
        >
          <Download className="h-4 w-4" />
          <span>Export Center</span>
        </button>
      </div>
    </div>
  );
}
