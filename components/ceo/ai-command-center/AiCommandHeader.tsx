'use client';

import React from 'react';
import { Sparkles, RefreshCw, Settings, Bot, ShieldCheck, Radio } from 'lucide-react';

interface AiCommandHeaderProps {
  lastAnalysisTime: string;
  onRefreshAnalysis: () => void;
  onOpenSettings: () => void;
}

export function AiCommandHeader({
  lastAnalysisTime,
  onRefreshAnalysis,
  onOpenSettings,
}: AiCommandHeaderProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-full border border-sky-300 flex items-center gap-1.5 shadow-xs">
            <Radio className="h-3 w-3 animate-pulse text-sky-600" /> Autonomous AI Engine Online
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>AI Command Center</span>
          <Sparkles className="h-6 w-6 text-sky-600" />
        </h1>
        <p className="text-xs text-slate-600 font-medium">
          Your intelligent business advisor powered by enterprise AI. Proactively analyzing live telemetry, ledger data, and queue health.
        </p>
      </div>

      {/* Controls & Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-right px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-[11px]">
          <span className="text-slate-400 font-medium block">Last Analysis:</span>
          <span className="font-mono font-extrabold text-slate-800">{lastAnalysisTime}</span>
        </div>

        {/* Refresh Analysis Button */}
        <button
          onClick={onRefreshAnalysis}
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-sky-900 text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5 text-sky-600" />
          <span>Refresh Analysis</span>
        </button>

        {/* AI Settings Button */}
        <button
          onClick={onOpenSettings}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
        >
          <Settings className="h-3.5 w-3.5 text-sky-400" />
          <span>AI Settings</span>
        </button>
      </div>
    </div>
  );
}
