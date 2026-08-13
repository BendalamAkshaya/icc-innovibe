'use client';

import React, { useState } from 'react';
import { Sparkles, Play, ShieldAlert, Zap, BarChart2, Presentation, ChevronDown, ChevronUp } from 'lucide-react';

interface ExecutiveAiBriefingProps {
  greeting: string;
  summaryText: string;
  lastAnalysisTime: string;
  onOpenBoardModal?: () => void;
  onOpenChat?: () => void;
}

export function ExecutiveAiBriefing({
  greeting,
  summaryText,
  lastAnalysisTime,
  onOpenBoardModal,
  onOpenChat,
}: ExecutiveAiBriefingProps) {
  const [expandedChipId, setExpandedChipId] = useState<string | null>(null);

  const chips = [
    { id: 'c1', label: '🟢 Revenue +18.4%', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300', detail: 'Q2 revenue reached ₹12.45L with 33.1% operating margin across all hubs.' },
    { id: 'c2', label: '🟢 Fleet Healthy (92/100)', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300', detail: '144 of 148 EVs online and active. Zero overnight thermal incidents.' },
    { id: 'c3', label: '🟡 Guntur Bay Queue Delay', bg: 'bg-amber-50 text-amber-800 border-amber-300', detail: 'Technician queue time in Guntur Bay increased by 14 mins during peak hours.' },
    { id: 'c4', label: '🔴 Spare Parts Lead Warning', bg: 'bg-red-50 text-red-800 border-red-300', detail: 'Procurement lead time for Ather 450X brake pads is currently 38 hrs.' },
    { id: 'c5', label: '🟢 Customer Growth (+24%)', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300', detail: 'AMC subscriptions up 24% following Kakinada & Rajahmundry expansion.' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-5 text-left">
      {/* Header & Confidence Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-200">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Good Morning, Sri Hari.
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Today's Organization Health is <strong className="text-emerald-600 font-black">EXCELLENT (93/100)</strong> • {lastAnalysisTime}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-200 text-center">
            <span className="text-[10px] font-black uppercase text-slate-500 block">AI Business Confidence</span>
            <span className="text-xl font-black text-sky-700">94.0%</span>
          </div>
        </div>
      </div>

      {/* Conversational Narrative */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs font-medium shadow-inner">
        <div className="flex items-center justify-between text-sky-400 font-extrabold text-[11px]">
          <span>AUTONOMOUS AI COPILOT SYNTHESIS</span>
          <span className="font-mono text-emerald-400">STATUS: OPTIMAL</span>
        </div>
        <p className="text-slate-200 text-sm font-semibold leading-relaxed">
          "Organization operating above quarterly targets. Revenue increased by 18.4%. No critical fleet incidents overnight. One operational bottleneck detected in Guntur Bay. Three executive approvals require your attention."
        </p>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <button
          onClick={() => onOpenChat && onOpenChat()}
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 flex items-center gap-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span>▶ Ask Copilot</span>
        </button>

        <button
          onClick={() => alert('Filtering active operational risks...')}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center gap-1.5"
        >
          <ShieldAlert className="h-3.5 w-3.5 text-red-600" />
          <span>▶ Show Risks</span>
        </button>

        <button
          onClick={() => alert('Filtering growth opportunities...')}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center gap-1.5"
        >
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span>▶ Opportunities</span>
        </button>

        {onOpenBoardModal && (
          <button
            onClick={onOpenBoardModal}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
          >
            <Presentation className="h-3.5 w-3.5 text-white" />
            <span>▶ Generate Board Presentation</span>
          </button>
        )}
      </div>

      {/* Progressive Disclosure Insight Chips */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
          Click Insight Chips to Expand Details
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => {
            const isExpanded = expandedChipId === chip.id;
            return (
              <div key={chip.id} className="relative">
                <button
                  onClick={() => setExpandedChipId(isExpanded ? null : chip.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${chip.bg}`}
                >
                  <span>{chip.label}</span>
                  {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {isExpanded && (
                  <div className="mt-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-xl text-xs font-medium text-slate-800 w-72 z-20 animate-in fade-in">
                    <p className="leading-relaxed">{chip.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
