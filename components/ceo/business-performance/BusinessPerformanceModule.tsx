'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { FinancialSummaryCards } from './FinancialSummaryCards';
import { RevenueAnalyticsChart } from './RevenueAnalyticsChart';
import { RevenueBreakdownDonut } from './RevenueBreakdownDonut';
import { BranchRevenueComparison } from './BranchRevenueComparison';
import { BusinessKpiStrip } from './BusinessKpiStrip';
import { TopRevenueContributors } from './TopRevenueContributors';
import { FinancialAiInsights } from './FinancialAiInsights';
import { FinancialQuickActions } from './FinancialQuickActions';

import {
  mockFinancialSummaryMetrics,
  mockRevenueAnalyticsData,
  mockRevenueBreakdown,
  mockBranchPerformance,
  mockBusinessKpis,
  mockTopContributors,
  mockFinancialAiInsights,
} from '../../../lib/mock-data';

export function BusinessPerformanceModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('All Company Branches');
  const [selectedDateRange, setSelectedDateRange] = useState('This Month (Jun 2026)');
  const [notification, setNotification] = useState<string | null>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  if (!isMounted) {
    return (
      <div className="space-y-6 text-left" suppressHydrationWarning>
        <div className="h-12 w-full bg-slate-900 rounded-2xl animate-pulse" />
        <div className="h-40 w-full bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" suppressHydrationWarning>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-sky-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Action Executed: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Section Header & Controls */}
      <SectionHeader
        selectedBranch={selectedBranch}
        onBranchChange={(b) => {
          setSelectedBranch(b);
          triggerNotification(`Filtered metrics for branch: ${b}`);
        }}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={(d) => {
          setSelectedDateRange(d);
          triggerNotification(`Updated date range to: ${d}`);
        }}
        onExport={() => triggerNotification('Generating Financial PDF/CSV Export...')}
        onFullAnalytics={() => triggerNotification('Opening Full Financial Analytics Engine')}
      />

      {/* 2. Financial Summary Cards (6 Cards) */}
      <FinancialSummaryCards metrics={mockFinancialSummaryMetrics} />

      {/* 3. Main Chart & Donut Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueAnalyticsChart dataByRange={mockRevenueAnalyticsData} />
        </div>
        <div className="lg:col-span-1">
          <RevenueBreakdownDonut sources={mockRevenueBreakdown} />
        </div>
      </div>

      {/* 4. Branch Revenue Comparison Table */}
      <BranchRevenueComparison
        branches={mockBranchPerformance}
        onSelectBranch={(name) => triggerNotification(`Opening detailed drill-down for ${name}`)}
      />

      {/* 5. Business KPI Summary Strip */}
      <BusinessKpiStrip kpis={mockBusinessKpis} />

      {/* 6. Top Contributors & Conversational AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopRevenueContributors contributors={mockTopContributors} />
        <FinancialAiInsights insights={mockFinancialAiInsights} />
      </div>

      {/* 7. Quick Report Actions */}
      <FinancialQuickActions
        onActionClick={(action) => triggerNotification(`Triggered: ${action}`)}
      />
    </div>
  );
}
