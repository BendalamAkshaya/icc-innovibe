'use client';

import React, { useState, useEffect } from 'react';
import { DepartmentSectionHeader } from './DepartmentSectionHeader';
import { OrganizationHealthScore } from './OrganizationHealthScore';
import { OrganizationalHeatmap } from './OrganizationalHeatmap';
import { DepartmentOverviewCards } from './DepartmentOverviewCards';
import { OrgHierarchyExplorer } from './OrgHierarchyExplorer';
import { DepartmentComparisonChart } from './DepartmentComparisonChart';
import { DepartmentLeaderboard } from './DepartmentLeaderboard';
import { CrossDepartmentCollaboration } from './CrossDepartmentCollaboration';
import { GoalKpiTracking } from './GoalKpiTracking';
import { ResourceUtilizationPanel } from './ResourceUtilizationPanel';
import { WorkforceIntelligencePanel } from './WorkforceIntelligencePanel';
import { StrategicInitiativeTracker } from './StrategicInitiativeTracker';
import { PredictiveOrgIntelligence } from './PredictiveOrgIntelligence';
import { DepartmentAiInsights } from './DepartmentAiInsights';
import { DepartmentQuickActions } from './DepartmentQuickActions';
import { DepartmentDetailDrawer } from './DepartmentDetailDrawer';

import { DepartmentMetric } from '../../../lib/types';
import {
  mockOrganizationHealth,
  mockDepartmentMetrics,
  mockDepartmentComparisonPoints,
  mockDepartmentLeaderboard,
  mockCollaborationPairs,
  mockGoalOkrTrackers,
  mockResourceUtilization,
  mockDepartmentAiInsights,
} from '../../../lib/mock-data';
import { Search, Filter, Bookmark, ChevronDown } from 'lucide-react';

export function DepartmentPerformanceModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('All Branches & Hubs');
  const [selectedDateRange, setSelectedDateRange] = useState('Q2 2026 (Active Quarter)');
  const [selectedDepartment, setSelectedDepartment] = useState('All Business Functions');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Drawer State
  const [selectedDeptDrawer, setSelectedDeptDrawer] = useState<DepartmentMetric | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenDrawer = (deptName: string) => {
    const matched = mockDepartmentMetrics.find((d) => d.departmentName.toLowerCase().includes(deptName.toLowerCase())) || mockDepartmentMetrics[0];
    setSelectedDeptDrawer(matched);
    setIsDrawerOpen(true);
  };

  if (!isMounted) {
    return (
      <div className="space-y-6 text-left" suppressHydrationWarning>
        <div className="h-12 w-full bg-slate-900 rounded-2xl animate-pulse" />
        <div className="h-28 w-full bg-slate-100 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-100 rounded-3xl animate-pulse" />
          <div className="lg:col-span-1 h-96 bg-slate-100 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" suppressHydrationWarning>
      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Organization Action Executed: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Header & Filters */}
      <div className="space-y-4">
        <DepartmentSectionHeader
          selectedBranch={selectedBranch}
          onBranchChange={(b) => {
            setSelectedBranch(b);
            triggerNotification(`Filtered metrics for: ${b}`);
          }}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={(d) => {
            setSelectedDateRange(d);
            triggerNotification(`Updated range to: ${d}`);
          }}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={(dept) => {
            setSelectedDepartment(dept);
            triggerNotification(`Focused on: ${dept}`);
          }}
          onCompareDepartments={() => triggerNotification('Opening Cross-Department Comparison Engine')}
          onViewOrg={() => triggerNotification('Opening Organization Explorer')}
        />

        {/* Live Search & Filter Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex items-center w-full md:w-96">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Dept, Manager, OKR, Budget, Initiative..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase text-slate-400">Filter Status:</span>
            {(['ALL', 'EXCEEDING', 'ON_TRACK', 'ATTENTION_NEEDED', 'BEHIND'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-black transition-all ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 3-Column Hero Section: Organization Health */}
      <OrganizationHealthScore healthData={mockOrganizationHealth} />

      {/* 3. Organizational Health Heatmap */}
      <OrganizationalHeatmap />

      {/* 4. Department Cards Grid (8 Cards) */}
      <DepartmentOverviewCards
        departments={mockDepartmentMetrics}
        onSelectDepartment={(name) => handleOpenDrawer(name)}
      />

      {/* 5. Interactive Org Explorer Tree */}
      <OrgHierarchyExplorer />

      {/* 6. Comparison Chart & Leaderboard */}
      <DepartmentComparisonChart data={mockDepartmentComparisonPoints} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <DepartmentLeaderboard
          items={mockDepartmentLeaderboard}
          onSelectDepartment={(name) => handleOpenDrawer(name)}
        />
        <CrossDepartmentCollaboration pairs={mockCollaborationPairs} />
      </div>

      {/* 7. OKR Goal Tracking & Overhauled Resource Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <GoalKpiTracking okrs={mockGoalOkrTrackers} />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <ResourceUtilizationPanel resources={mockResourceUtilization} />
        </div>
      </div>

      {/* 8. Workforce Intelligence & Strategic Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <WorkforceIntelligencePanel />
        <StrategicInitiativeTracker />
      </div>

      {/* 9. Predictive Org Risks & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <PredictiveOrgIntelligence />
        <DepartmentAiInsights insights={mockDepartmentAiInsights} />
      </div>

      {/* 10. Quick Actions */}
      <DepartmentQuickActions onActionClick={(action) => triggerNotification(`Triggered: ${action}`)} />

      {/* 11. Department Detail Drawer */}
      <DepartmentDetailDrawer
        department={selectedDeptDrawer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
