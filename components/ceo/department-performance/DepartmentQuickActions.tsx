'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Award, Download, Users, Sliders, Loader2 } from 'lucide-react';
import { downloadClientExportFile, generateReportCsv } from '../../../lib/quick-actions-handler';
import { mockDepartmentMetrics } from '../../../lib/mock-data';

interface DepartmentQuickActionsProps {
  onActionClick?: (actionName: string) => void;
}

export function DepartmentQuickActions({ onActionClick }: DepartmentQuickActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (id: string, label: string) => {
    setLoadingAction(id);
    if (onActionClick) onActionClick(label);

    try {
      if (id === 'act_dept1') {
        // Department Comparison
        router.push(`/dashboard/ceo?module=department-performance`);
      } else if (id === 'act_dept2') {
        // Organization Scorecard
        router.push(`/dashboard/ceo?module=department-performance`);
      } else if (id === 'act_dept3') {
        // Export Department Report
        const headers = ['Department Code', 'Department Name', 'Department Lead', 'Score', 'Status'];
        const rows = mockDepartmentMetrics.map((d) => [d.code, d.departmentName, d.headOfDepartment, d.performanceScore + '/100', d.status]);
        const csvContent = generateReportCsv('Enterprise Department Performance Audit', headers, rows);
        downloadClientExportFile(`InnoVibe_Department_Performance_Report_${Date.now()}.csv`, csvContent);
      } else if (id === 'act_dept4') {
        // Collaboration Matrix
        router.push(`/dashboard/ceo?module=department-performance`);
      } else if (id === 'act_dept5') {
        // Performance Analytics
        router.push(`/dashboard/ceo?module=reports-analytics&category=DEPARTMENTS`);
      }
    } finally {
      setTimeout(() => setLoadingAction(null), 400);
    }
  };

  const actions = [
    { id: 'act_dept1', label: 'Department Comparison', icon: BarChart3, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { id: 'act_dept2', label: 'Organization Scorecard', icon: Award, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'act_dept3', label: 'Export Department Report', icon: Download, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { id: 'act_dept4', label: 'Collaboration Matrix', icon: Users, color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { id: 'act_dept5', label: 'Performance Analytics', icon: Sliders, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Executive Department Shortcuts</h3>
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
