'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Download, Building2, Sliders, Loader2 } from 'lucide-react';
import { downloadClientExportFile, generateReportCsv } from '../../../lib/quick-actions-handler';
import { BranchComparisonModal } from '../common/BranchComparisonModal';
import { mockBranchPerformance } from '../../../lib/mock-data';

interface FinancialQuickActionsProps {
  selectedBranch?: string;
  selectedDateRange?: string;
  onActionClick?: (actionName: string) => void;
}

export function FinancialQuickActions({
  selectedBranch = 'All Company Branches',
  selectedDateRange = 'This Month',
  onActionClick,
}: FinancialQuickActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

  const handleAction = async (id: string, label: string) => {
    setLoadingAction(id);
    if (onActionClick) onActionClick(label);

    try {
      if (id === 'act_fin1') {
        // View Finance Report -> Navigate to Reports & Analytics
        router.push(`/dashboard/ceo?module=reports-analytics&category=FINANCE`);
      } else if (id === 'act_fin2') {
        // Export Revenue Report -> Generate CSV download
        const headers = ['Branch Name', 'City', 'Revenue (₹)', 'Growth %', 'Services Completed', 'Customer Rating'];
        const rows = mockBranchPerformance.map((b) => [b.name, b.city, '₹' + b.revenue.toLocaleString('en-IN'), '+' + b.growthPercent + '%', b.servicesCompleted, b.customerRating + ' ★']);
        const csvContent = generateReportCsv(`Revenue Performance (${selectedBranch} - ${selectedDateRange})`, headers, rows);
        downloadClientExportFile(`InnoVibe_Revenue_Report_${Date.now()}.csv`, csvContent);
      } else if (id === 'act_fin3') {
        // Compare Company Branches -> Open Modal
        setIsBranchModalOpen(true);
      } else if (id === 'act_fin4') {
        // Download Financial Statement -> Generate CSV
        const headers = ['Financial Metric', 'Current Period', 'Previous Period', 'YoY Growth %'];
        const rows = [
          ['Gross Realized Revenue', '₹12,45,000', '₹10,20,000', '+22.06%'],
          ['Operating Expenses', '₹8,61,540', '₹7,73,160', '+11.43%'],
          ['Net EBITDA Margin', '30.8%', '24.2%', '+660 bps'],
        ];
        const csvContent = generateReportCsv(`Financial Statement (${selectedDateRange})`, headers, rows);
        downloadClientExportFile(`InnoVibe_Financial_Statement_${Date.now()}.csv`, csvContent);
      } else if (id === 'act_fin5') {
        // Open Advanced Analytics -> Analytics Studio mode
        router.push(`/dashboard/ceo?module=reports-analytics&view=ANALYTICS_STUDIO`);
      }
    } finally {
      setTimeout(() => setLoadingAction(null), 400);
    }
  };

  const actions = [
    { id: 'act_fin1', label: 'View Finance Report', icon: FileText, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'act_fin2', label: 'Export Revenue Report', icon: Download, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { id: 'act_fin3', label: 'Compare Company Branches', icon: Building2, color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { id: 'act_fin4', label: 'Download Financial Statement', icon: Download, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { id: 'act_fin5', label: 'Open Advanced Analytics', icon: Sliders, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  ];

  return (
    <>
      <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white space-y-3" suppressHydrationWarning>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Executive Financial Shortcuts</h3>
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

      <BranchComparisonModal isOpen={isBranchModalOpen} onClose={() => setIsBranchModalOpen(false)} />
    </>
  );
}
