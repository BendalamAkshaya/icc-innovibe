'use client';

import React, { useState } from 'react';
import { OperationsSectionHeader } from './OperationsSectionHeader';
import { OperationsOverviewCards } from './OperationsOverviewCards';
import { ServiceOperationsProgress } from './ServiceOperationsProgress';
import { BranchEfficiencyComparison } from './BranchEfficiencyComparison';
import { ServiceCenterHealthGrid } from './ServiceCenterHealthGrid';
import { DailyOperationsTimeline } from './DailyOperationsTimeline';
import { OperationsAiInsights } from './OperationsAiInsights';
import { OperationsQuickActions } from './OperationsQuickActions';

import {
  mockOperationsKpiMetrics,
  mockOperationsProgress,
  mockBranchEfficiencyList,
  mockServiceCenterHealthList,
  mockDailyOperationsTimeline,
  mockOperationsAiInsights,
} from '../../../lib/mock-data';

export function CompanyOperationsModule() {
  const [selectedBranch, setSelectedBranch] = useState('All Operating Hubs');
  const [selectedDateRange, setSelectedDateRange] = useState('Today (Live Operational Flow)');
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Notification Toast Banner */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-sky-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Action Executed: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Section Header & Filters */}
      <OperationsSectionHeader
        selectedBranch={selectedBranch}
        onBranchChange={(b) => {
          setSelectedBranch(b);
          triggerNotification(`Filtered operational telemetry for: ${b}`);
        }}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={(d) => {
          setSelectedDateRange(d);
          triggerNotification(`Updated operational range to: ${d}`);
        }}
        onRefresh={() => triggerNotification('Refreshed real-time operations queue data')}
        onViewFullOperations={() => triggerNotification('Opening Full Operational Analytics Engine')}
      />

      {/* 2. Operations Overview Cards (8 Cards) */}
      <OperationsOverviewCards metrics={mockOperationsKpiMetrics} />

      {/* 3. Service Operations Progress Visualizer */}
      <ServiceOperationsProgress progress={mockOperationsProgress} />

      {/* 4. Branch Efficiency Comparison Table */}
      <BranchEfficiencyComparison
        branches={mockBranchEfficiencyList}
        onDrillDown={(branch) => triggerNotification(`Opening operational drill-down for ${branch}`)}
      />

      {/* 5. Service Center Operational Health Grid */}
      <ServiceCenterHealthGrid serviceCenters={mockServiceCenterHealthList} />

      {/* 6. Daily Timeline & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyOperationsTimeline timeline={mockDailyOperationsTimeline} />
        <OperationsAiInsights insights={mockOperationsAiInsights} />
      </div>

      {/* 7. Executive Quick Actions */}
      <OperationsQuickActions
        onActionClick={(action) => triggerNotification(`Triggered: ${action}`)}
      />
    </div>
  );
}
