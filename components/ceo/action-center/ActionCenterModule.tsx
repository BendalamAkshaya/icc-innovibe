'use client';

import React, { useState, useEffect } from 'react';
import { ActionCenterSectionHeader } from './ActionCenterSectionHeader';
import { DecisionSummaryCards } from './DecisionSummaryCards';
import { ExecutiveInboxList } from './ExecutiveInboxList';
import { StrategicInitiativesPanel } from './StrategicInitiativesPanel';
import { ExecutiveMasterTimeline } from './ExecutiveMasterTimeline';
import { DelegationCenterTable } from './DelegationCenterTable';
import { ApprovalWorkflowTracker } from './ApprovalWorkflowTracker';
import { ExecutiveNotesWidget } from './ExecutiveNotesWidget';
import { AiDecisionAdvisorModal } from './AiDecisionAdvisorModal';
import { AiDecisionSimulatorModal } from './AiDecisionSimulatorModal';
import { ApprovalDetailDrawer } from './ApprovalDetailDrawer';
import { ActionQuickActions } from './ActionQuickActions';

import {
  mockDecisionSummaryMetrics,
  mockDecisionRequests,
  mockStrategicInitiatives,
  mockExecutiveCalendarEvents,
  mockDelegatedTasks,
  mockExecutiveNotes,
  mockAiDecisionAdviceList,
} from '../../../lib/mock-data';
import { AiDecisionAdvice, DecisionRequestItem } from '../../../lib/types';

export function ActionCenterModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBranch, setSelectedBranch] = useState('All Branches & Hubs');
  const [searchQuery, setSearchQuery] = useState('');

  const [requests, setRequests] = useState<DecisionRequestItem[]>(mockDecisionRequests);
  const [selectedAiAdvice, setSelectedAiAdvice] = useState<AiDecisionAdvice | null>(null);
  const [selectedDrawerReq, setSelectedDrawerReq] = useState<DecisionRequestItem | null>(null);
  const [selectedSimulateReq, setSelectedSimulateReq] = useState<DecisionRequestItem | null>(null);
  const [activeAdvisorReqId, setActiveAdvisorReqId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredRequests = requests.filter((req) => {
    const matchPriority = selectedPriority === 'All Priorities' || req.priority === selectedPriority;
    const matchCategory = selectedCategory === 'All Categories' || req.category === selectedCategory;
    const matchBranch = selectedBranch === 'All Branches & Hubs' || req.branch.includes(selectedBranch);
    const matchSearch = !searchQuery || req.title.toLowerCase().includes(searchQuery.toLowerCase()) || req.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPriority && matchCategory && matchBranch && matchSearch;
  });

  const handleApprove = (id: string, title: string) => {
    setRequests(requests.filter((r) => r.id !== id));
    triggerNotification(`Approved Executive Decision: "${title}"`);
  };

  const handleReject = (id: string, title: string) => {
    setRequests(requests.filter((r) => r.id !== id));
    triggerNotification(`Rejected Request: "${title}"`);
  };

  const handleRequestInfo = (id: string, title: string) => {
    triggerNotification(`Requested additional documentation for: "${title}"`);
  };

  const handleDelegate = (id: string, title: string) => {
    triggerNotification(`Delegated decision request to COO office: "${title}"`);
  };

  const handleOpenAiAdvisor = (requestId: string) => {
    const advice = mockAiDecisionAdviceList[requestId] || {
      requestId,
      summary: 'AI Decision Advisor recommends approval based on Q2 budget limits and low operational risk.',
      pros: ['Aligns with company growth targets.', 'High return on investment.', 'Supported by positive vendor metrics.'],
      risks: ['Minor SLA variance during transition.'],
      alternatives: ['Option A: Approve in full immediately.', 'Option B: Approve 50% now and review in 30 days.'],
      confidenceScore: 92,
    };
    setActiveAdvisorReqId(requestId);
    setSelectedAiAdvice(advice);
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
        <div className="p-3.5 rounded-2xl bg-amber-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Executive Decision Command: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Header & Global Filters */}
      <ActionCenterSectionHeader
        selectedPriority={selectedPriority}
        onPriorityChange={(p) => {
          setSelectedPriority(p);
          triggerNotification(`Filtered by priority: ${p}`);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(c) => {
          setSelectedCategory(c);
          triggerNotification(`Filtered by category: ${c}`);
        }}
        selectedBranch={selectedBranch}
        onBranchChange={(b) => {
          setSelectedBranch(b);
          triggerNotification(`Filtered by branch: ${b}`);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Executive Decision Summary Cards (Overhauled KPIs) */}
      <DecisionSummaryCards metrics={mockDecisionSummaryMetrics} />

      {/* 3. Executive Decision Requests Inbox (Progressive Disclosure & 1-Expanded-Card Rule) */}
      <ExecutiveInboxList
        requests={filteredRequests}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestInfo={handleRequestInfo}
        onDelegate={handleDelegate}
        onOpenAiAdvisor={handleOpenAiAdvisor}
        onOpenDrawer={(req) => setSelectedDrawerReq(req)}
        onOpenSimulate={(req) => setSelectedSimulateReq(req)}
      />

      {/* 4. Approval Workflow Stage Pipeline */}
      <ApprovalWorkflowTracker />

      {/* 5. Strategic Initiatives & Master Executive Timeline Grid (0 White Space) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <StrategicInitiativesPanel
            initiatives={mockStrategicInitiatives}
            onSelectInitiative={(title) => triggerNotification(`Inspecting initiative: ${title}`)}
          />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <ExecutiveMasterTimeline />
        </div>
      </div>

      {/* 6. Delegation Cards & Private CEO Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <DelegationCenterTable
            tasks={mockDelegatedTasks}
            onSendReminder={(title, assignee) => triggerNotification(`Sent status reminder to ${assignee} for "${title}"`)}
          />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <ExecutiveNotesWidget
            notes={mockExecutiveNotes}
            onAddNote={(note) => triggerNotification(`Added private note: "${note.title}"`)}
          />
        </div>
      </div>

      {/* 7. Quick Actions */}
      <ActionQuickActions
        onActionClick={(action) => triggerNotification(`Triggered: ${action}`)}
      />

      {/* Slide-Over Approval Detail Drawer */}
      <ApprovalDetailDrawer
        request={selectedDrawerReq}
        onClose={() => setSelectedDrawerReq(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelegate={handleDelegate}
        onOpenSimulate={(req) => setSelectedSimulateReq(req)}
      />

      {/* AI Rejection Impact Simulator Modal */}
      <AiDecisionSimulatorModal
        request={selectedSimulateReq}
        onClose={() => setSelectedSimulateReq(null)}
      />

      {/* AI Decision Advisor Modal */}
      <AiDecisionAdvisorModal
        advice={selectedAiAdvice}
        onClose={() => setSelectedAiAdvice(null)}
        onApproveWithAi={() => {
          if (activeAdvisorReqId) {
            const req = requests.find((r) => r.id === activeAdvisorReqId);
            if (req) handleApprove(req.id, req.title);
          }
          setSelectedAiAdvice(null);
        }}
      />
    </div>
  );
}
