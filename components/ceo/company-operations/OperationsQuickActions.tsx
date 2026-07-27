'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wrench, Layers, Users, Download, Sliders, Loader2 } from 'lucide-react';
import { downloadClientExportFile, generateReportCsv } from '../../../lib/quick-actions-handler';
import { mockBranchEfficiencyList } from '../../../lib/mock-data';

interface OperationsQuickActionsProps {
  selectedBranch?: string;
  onActionClick?: (actionName: string) => void;
}

export function OperationsQuickActions({ selectedBranch = 'All Operating Hubs', onActionClick }: OperationsQuickActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (id: string, label: string) => {
    setLoadingAction(id);
    if (onActionClick) onActionClick(label);

    try {
      if (id === 'act_ops1') {
        // View Service Operations
        router.push(`/dashboard/ceo?module=company-operations`);
      } else if (id === 'act_ops2') {
        // Branch Capacity Report -> Export CSV
        const headers = ['Hub Name', 'City', 'Operational Score', 'Services Completed', 'Pending Jobs', 'SLA %'];
        const rows = mockBranchEfficiencyList.map((b) => [b.branchName, b.city, b.operationalScore + '/100', b.servicesCompleted, b.pendingJobs, b.slaCompliancePercent + '%']);
        const csvContent = generateReportCsv(`Branch Capacity Report (${selectedBranch})`, headers, rows);
        downloadClientExportFile(`InnoVibe_Branch_Capacity_Report_${Date.now()}.csv`, csvContent);
      } else if (id === 'act_ops3') {
        // Technician Productivity -> Navigate to HR
        router.push(`/dashboard/hr?module=performance`);
      } else if (id === 'act_ops4') {
        // Export Operations Report -> CSV
        const headers = ['Hub Name', 'Services Completed', 'Pending Jobs', 'Operational Score', 'SLA Compliance %'];
        const rows = mockBranchEfficiencyList.map((b) => [b.branchName, b.servicesCompleted, b.pendingJobs, b.operationalScore + '/100', b.slaCompliancePercent + '%']);
        const csvContent = generateReportCsv(`Operations Performance (${selectedBranch})`, headers, rows);
        downloadClientExportFile(`InnoVibe_Operations_Report_${Date.now()}.csv`, csvContent);
      } else if (id === 'act_ops5') {
        // Open Operations Analytics -> Reports & Analytics
        router.push(`/dashboard/ceo?module=reports-analytics&category=OPERATIONS`);
      }
    } finally {
      setTimeout(() => setLoadingAction(null), 400);
    }
  };

  const actions = [
    { id: 'act_ops1', label: 'View Service Operations', icon: Wrench, color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { id: 'act_ops2', label: 'Branch Capacity Report', icon: Layers, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { id: 'act_ops3', label: 'Technician Productivity', icon: Users, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { id: 'act_ops4', label: 'Export Operations Report', icon: Download, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'act_ops5', label: 'Open Operations Analytics', icon: Sliders, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Executive Operations Shortcuts</h3>
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
