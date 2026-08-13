'use client';

import React, { useState } from 'react';
import { ReportCardItem } from '../../../lib/types';
import { FileText, Download, Clock, Star, ArrowUpRight, ChevronDown, ChevronUp, Sparkles, Activity } from 'lucide-react';

interface ExecutiveReportLibraryProps {
  reports: ReportCardItem[];
  onOpenReport?: (title: string) => void;
}

export function ExecutiveReportLibrary({ reports, onOpenReport }: ExecutiveReportLibraryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(reports[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">Smart Report Explorer (Progressive Disclosure)</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Compact executive report summaries. Click any report to expand live charts, AI highlights, and version history.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
          {reports.length} Report Packs
        </span>
      </div>

      <div className="space-y-3">
        {reports.map((rpt) => {
          const isExpanded = expandedId === rpt.id;

          return (
            <div
              key={rpt.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'bg-white border-emerald-300 shadow-md ring-2 ring-emerald-500/10' : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Compact Card Header (~90-110px height) */}
              <div
                onClick={() => toggleExpand(rpt.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                      {rpt.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500">• {rpt.frequency}</span>
                    <span className="text-xs text-slate-400 font-medium font-mono">• Updated: {rpt.lastGenerated}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">{rpt.reportTitle}</h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-emerald-700 font-mono font-black">Score 94%</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500">{rpt.size}</span>
                  </div>

                  <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Accordion Expansion Panel */}
              {isExpanded && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 animate-in fade-in slide-in-from-top-2 text-xs">
                  <p className="text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    "{rpt.summarySnippet}"
                  </p>

                  <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-sky-400 uppercase font-bold">AI EXECUTIVE HIGHLIGHT</span>
                      <p className="text-slate-200 font-semibold">"Performance exceeding Q2 targets. Zero critical compliance breaches detected."</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenReport) onOpenReport(rpt.reportTitle);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs"
                    >
                      View Live Interactive Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
