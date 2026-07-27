'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ShieldCheck, Download, Activity, Sliders, Loader2 } from 'lucide-react';
import { downloadClientExportFile, generateReportCsv } from '../../../lib/quick-actions-handler';
import { mockRiskDetections } from '../../../lib/mock-data';

interface RiskQuickActionsProps {
  onActionClick?: (actionName: string) => void;
}

export function RiskQuickActions({ onActionClick }: RiskQuickActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (id: string, label: string) => {
    setLoadingAction(id);
    if (onActionClick) onActionClick(label);

    try {
      if (id === 'act_rk1') {
        // View All Risks
        router.push(`/dashboard/ceo?module=alerts-risk`);
      } else if (id === 'act_rk2') {
        // Risk Heatmap
        router.push(`/dashboard/ceo?module=alerts-risk`);
      } else if (id === 'act_rk3') {
        // Mitigation Center
        router.push(`/dashboard/ceo?module=alerts-risk`);
      } else if (id === 'act_rk4') {
        // Export Risk Report
        const headers = ['Risk ID', 'Category', 'Severity', 'Title', 'Impact Description', 'Status'];
        const rows = mockRiskDetections.map((r) => [r.id, r.category, r.severity, r.title, r.description, 'ACTIVE']);
        const csvContent = generateReportCsv('Enterprise Executive Risk Assessment Audit', headers, rows);
        downloadClientExportFile(`InnoVibe_Risk_Assessment_Report_${Date.now()}.csv`, csvContent);
      } else if (id === 'act_rk5') {
        // Compliance Dashboard
        router.push(`/dashboard/ceo?module=reports-analytics&category=COMPLIANCE`);
      }
    } finally {
      setTimeout(() => setLoadingAction(null), 400);
    }
  };

  const actions = [
    { id: 'act_rk1', label: 'View All Risks', icon: AlertTriangle, color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
    { id: 'act_rk2', label: 'Risk Heatmap', icon: Activity, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
    { id: 'act_rk3', label: 'Mitigation Center', icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'act_rk4', label: 'Export Risk Report', icon: Download, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { id: 'act_rk5', label: 'Compliance Dashboard', icon: Sliders, color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Executive Risk Shortcuts</h3>
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
