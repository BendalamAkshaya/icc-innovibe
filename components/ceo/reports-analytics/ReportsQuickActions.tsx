'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Sliders, Presentation, Clock, Bot, Loader2 } from 'lucide-react';

interface ReportsQuickActionsProps {
  onOpenAiModal?: () => void;
  onLaunchBoardMode?: () => void;
  onActionClick?: (actionName: string) => void;
}

export function ReportsQuickActions({ onOpenAiModal, onLaunchBoardMode, onActionClick }: ReportsQuickActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (id: string, label: string) => {
    setLoadingAction(id);
    if (onActionClick) onActionClick(label);

    try {
      if (id === 'act_rpt1') {
        // Generate Executive Report -> AI Modal
        if (onOpenAiModal) onOpenAiModal();
      } else if (id === 'act_rpt2') {
        // Build Custom Dashboard -> Scroll to builder
        const builderEl = document.getElementById('custom-report-builder-section');
        if (builderEl) builderEl.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'act_rpt3') {
        // Launch Board Mode -> Trigger Presentation
        if (onLaunchBoardMode) onLaunchBoardMode();
      } else if (id === 'act_rpt4') {
        // Schedule Report -> Scroll to scheduled reports
        const schedEl = document.getElementById('scheduled-reports-section');
        if (schedEl) schedEl.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'act_rpt5') {
        // Run AI Report Generator -> Open AI Modal
        if (onOpenAiModal) onOpenAiModal();
      }
    } finally {
      setTimeout(() => setLoadingAction(null), 300);
    }
  };

  const actions = [
    { id: 'act_rpt1', label: 'Generate Executive Report', icon: FileText, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'act_rpt2', label: 'Build Custom Dashboard', icon: Sliders, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { id: 'act_rpt3', label: 'Launch Board Mode', icon: Presentation, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
    { id: 'act_rpt4', label: 'Schedule Report', icon: Clock, color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { id: 'act_rpt5', label: 'Run AI Report Generator', icon: Bot, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Executive Report Shortcuts</h3>
        <span className="text-[10px] font-bold text-slate-400">Context-Aware Controls</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          const isLoading = loadingAction === act.id;

          return (
            <button
              key={act.id}
              disabled={isLoading}
              onClick={() => handleAction(act.id, act.label)}
              className={`p-3.5 rounded-2xl border text-left flex items-center justify-between font-extrabold text-xs transition-all shadow-xs disabled:opacity-50 ${act.color}`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {isLoading ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <Icon className="h-4 w-4 shrink-0" />}
                <span className="truncate">{act.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
