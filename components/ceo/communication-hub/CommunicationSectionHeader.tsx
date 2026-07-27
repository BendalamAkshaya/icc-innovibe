'use client';

import React from 'react';
import { Search, Filter, Calendar, MessageSquare, Plus, Download, Sparkles } from 'lucide-react';

interface CommunicationSectionHeaderProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onComposeNew: () => void;
  onExportComm: () => void;
  onOpenAiDraft: () => void;
}

export function CommunicationSectionHeader({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onComposeNew,
  onExportComm,
  onOpenAiDraft,
}: CommunicationSectionHeaderProps) {
  const categories = [
    'All Communications',
    'Company Updates',
    'Policy',
    'Branch Launches',
    'Performance',
    'Leadership Threads',
    'Board & Investor',
    'Media PR',
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5 text-purple-600" /> Strategic Executive Platform
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Communication Hub</h1>
        <p className="text-xs text-slate-500 font-medium">
          Unified executive platform for organizational broadcasts, C-suite discussions, board reports, and AI speech drafting.
        </p>
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
            placeholder="Search communications..."
            className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-500 shadow-xs w-44 lg:w-52"
          />
        </div>

        {/* Category Filter */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer appearance-none shadow-xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* AI Draft Generator Button */}
        <button
          onClick={onOpenAiDraft}
          className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          <span>AI Speech Draft</span>
        </button>

        {/* Compose New Announcement */}
        <button
          onClick={onComposeNew}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Publish Announcement</span>
        </button>
      </div>
    </div>
  );
}
