'use client';

import React, { useState, useEffect } from 'react';
import { useGlobalFilter } from '../../../lib/global-filter-context';
import { BranchSelectorDropdown } from './BranchSelectorDropdown';
import { EnterpriseDatePickerDropdown } from './EnterpriseDatePickerDropdown';
import {
  RefreshCw,
  Download,
  BarChart2,
  Share2,
  Bookmark,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface EnterpriseToolbarProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeColor?: string;
  analyticsPath?: string;
}

export function EnterpriseToolbar({
  title,
  subtitle,
  badge,
  badgeColor = 'text-sky-700 bg-sky-50 border-sky-200',
}: EnterpriseToolbarProps) {
  const {
    currency,
    setCurrency,
    autoRefreshInterval,
    setAutoRefreshInterval,
    lastSyncTime,
    refreshStatus,
    triggerRefresh,
    isLoadingData,
    savedViews,
    applySavedView,
    saveCurrentView,
    setIsExportModalOpen,
    setIsShareModalOpen,
    navigateToAnalyticsStudio,
  } = useGlobalFilter();

  const [isMounted, setIsMounted] = useState(false);
  const [isSavedViewsOpen, setIsSavedViewsOpen] = useState(false);
  const [newViewName, setNewViewName] = useState('');
  const [isSavingView, setIsSavingView] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSaveViewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newViewName.trim()) return;
    saveCurrentView(newViewName.trim());
    setNewViewName('');
    setIsSavingView(false);
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-4" suppressHydrationWarning>
      {/* Row 1: Header & Main CTA Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
              {badge}
            </span>
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-2.5 py-0.5 rounded-full">
              <span
                className={`h-2 w-2 rounded-full ${
                  refreshStatus === 'Live'
                    ? 'bg-emerald-500 animate-pulse'
                    : refreshStatus === 'Syncing'
                    ? 'bg-amber-500 animate-ping'
                    : 'bg-slate-400'
                }`}
              />
              {refreshStatus} • Updated {lastSyncTime}
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold shadow-xs transition-all"
            title="Share Analytics Link"
            suppressHydrationWarning
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-all"
            suppressHydrationWarning
          >
            <Download className="h-3.5 w-3.5 text-slate-600" />
            <span>Export</span>
          </button>

          <button
            onClick={navigateToAnalyticsStudio}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all"
            suppressHydrationWarning
          >
            <BarChart2 className="h-3.5 w-3.5 text-white" />
            <span>Full Analytics</span>
          </button>
        </div>
      </div>

      {/* Row 2: Analytics Filter Control Panel */}
      {isMounted ? (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Filter Controls Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1. Branch Selector */}
            <BranchSelectorDropdown />

            {/* 2. Date Picker */}
            <EnterpriseDatePickerDropdown />

            {/* 3. Currency Switcher with Rate Conversion */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-extrabold text-slate-700">
              {(['INR', 'USD', 'EUR'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                    currency === c ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  suppressHydrationWarning
                >
                  {c === 'INR' ? '₹ INR' : c === 'USD' ? '$ USD' : '€ EUR'}
                </button>
              ))}
            </div>
          </div>

          {/* Utility Tools Group */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Manual Refresh */}
            <button
              onClick={triggerRefresh}
              title="Refresh Data (Ctrl + R)"
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all shadow-xs"
              suppressHydrationWarning
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoadingData ? 'animate-spin text-sky-600' : ''}`} />
            </button>

            {/* Auto Refresh Select */}
            <select
              value={autoRefreshInterval}
              onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-extrabold text-slate-700 focus:outline-none cursor-pointer shadow-xs"
              suppressHydrationWarning
            >
              <option value={0}>Auto: Off</option>
              <option value={30}>Auto: 30s</option>
              <option value={60}>Auto: 1m</option>
              <option value={300}>Auto: 5m</option>
            </select>

            {/* Saved Views Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSavedViewsOpen(!isSavedViewsOpen)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all"
                suppressHydrationWarning
              >
                <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                <span>Saved Views</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {isSavedViewsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSavedViewsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 space-y-2 text-left animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-[11px] font-black uppercase text-slate-500">Saved View Profiles</span>
                      <button
                        onClick={() => setIsSavingView(true)}
                        className="text-[10px] font-bold text-sky-600 hover:underline"
                        suppressHydrationWarning
                      >
                        + Save Current
                      </button>
                    </div>

                    {isSavingView && (
                      <form onSubmit={handleSaveViewSubmit} className="space-y-1.5 pb-2 border-b border-slate-100">
                        <input
                          type="text"
                          value={newViewName}
                          onChange={(e) => setNewViewName(e.target.value)}
                          placeholder="View Name (e.g. Q3 Review)"
                          className="w-full px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none"
                          autoFocus
                          suppressHydrationWarning
                        />
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setIsSavingView(false)}
                            className="px-2 py-0.5 text-[10px] font-bold text-slate-400"
                            suppressHydrationWarning
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-2 py-0.5 bg-sky-600 text-white rounded text-[10px] font-bold"
                            suppressHydrationWarning
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {savedViews.map((sv) => (
                        <button
                          key={sv.id}
                          onClick={() => {
                            applySavedView(sv);
                            setIsSavedViewsOpen(false);
                          }}
                          className="w-full p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 text-left transition-all"
                          suppressHydrationWarning
                        >
                          <p className="text-xs font-extrabold text-slate-800">{sv.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {sv.branches.length} Hubs • {sv.datePreset}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-10 w-full bg-slate-100 rounded-2xl animate-pulse" />
      )}
    </div>
  );
}
