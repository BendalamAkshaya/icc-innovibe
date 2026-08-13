'use client';

import React, { useState } from 'react';
import { useGlobalFilter } from '../../../lib/global-filter-context';
import { Calendar, ChevronDown, Check, ArrowRight, Layers } from 'lucide-react';

export const quickDatePresets = [
  'Today',
  'Yesterday',
  'Last 7 Days',
  'Last 14 Days',
  'Last 30 Days',
  'Last 60 Days',
  'Last 90 Days',
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
  'This Quarter',
  'Last Quarter',
  'This Financial Year',
  'Last Financial Year',
  'Year To Date (YTD)',
  'Month To Date (MTD)',
  'Quarter To Date (QTD)',
  'All Time',
];

export function EnterpriseDatePickerDropdown() {
  const {
    datePreset,
    setDatePreset,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    comparisonMode,
    setComparisonMode,
  } = useGlobalFilter();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'PRESETS' | 'CUSTOM' | 'COMPARE'>('PRESETS');

  const handleSelectPreset = (preset: string) => {
    setDatePreset(preset);
    setIsOpen(false);
  };

  return (
    <div className="relative" suppressHydrationWarning>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-extrabold shadow-xs flex items-center gap-2 transition-all"
      >
        <Calendar className="h-3.5 w-3.5 text-sky-600" />
        <span>{datePreset}</span>
        {comparisonMode !== 'NONE' && (
          <span className="text-[10px] bg-sky-200 text-sky-900 px-1.5 py-0.5 rounded font-extrabold">
            vs {comparisonMode === 'PREVIOUS_PERIOD' ? 'Prev' : 'YoY'}
          </span>
        )}
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 max-w-[90vw] w-[420px] bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 space-y-4 animate-in fade-in zoom-in-95 text-left">
            {/* Popover Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('PRESETS')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                    activeTab === 'PRESETS' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Quick Presets
                </button>
                <button
                  onClick={() => setActiveTab('CUSTOM')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                    activeTab === 'CUSTOM' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Custom Range
                </button>
                <button
                  onClick={() => setActiveTab('COMPARE')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                    activeTab === 'COMPARE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Comparison Mode
                </button>
              </div>
            </div>

            {/* Tab 1: Presets Grid */}
            {activeTab === 'PRESETS' && (
              <div className="grid grid-cols-3 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {quickDatePresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-2.5 py-2 rounded-xl text-[11px] font-extrabold text-left transition-all flex items-center justify-between ${
                      datePreset === preset
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    <span>{preset}</span>
                    {datePreset === preset && <Check className="h-3 w-3 text-white" />}
                  </button>
                ))}
              </div>
            )}

            {/* Tab 2: Custom Date Range Inputs */}
            {activeTab === 'CUSTOM' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setDatePreset(`Custom (${customStartDate} to ${customEndDate})`);
                    setIsOpen(false);
                  }}
                  className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold rounded-xl shadow-xs"
                >
                  Apply Custom Range
                </button>
              </div>
            )}

            {/* Tab 3: Comparison Mode Selector */}
            {activeTab === 'COMPARE' && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-600">
                  Select how performance metrics & charts compare against historical benchmark periods:
                </p>

                <div className="space-y-2">
                  {[
                    { mode: 'NONE', label: 'No Comparison', desc: 'Single timeframe view' },
                    { mode: 'PREVIOUS_PERIOD', label: 'Compare with Previous Period', desc: 'Directly preceding date range (e.g. May vs Jun)' },
                    { mode: 'LAST_YEAR', label: 'Compare with Last Year (YoY)', desc: 'Same timeframe in previous fiscal year' },
                    { mode: 'CUSTOM', label: 'Custom Range Comparison', desc: 'Select custom baseline date' },
                  ].map((item) => (
                    <button
                      key={item.mode}
                      onClick={() => {
                        setComparisonMode(item.mode as any);
                        setIsOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        comparisonMode === item.mode
                          ? 'bg-sky-50 border-sky-300 text-sky-900'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs">{item.label}</span>
                        {comparisonMode === item.mode && <Check className="h-4 w-4 text-sky-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Summary Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-sky-600" />
                Active: <strong className="text-slate-800">{datePreset}</strong>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-slate-900 text-white rounded-xl text-xs font-extrabold hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
