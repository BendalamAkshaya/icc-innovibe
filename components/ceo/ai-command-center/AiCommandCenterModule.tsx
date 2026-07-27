'use client';

import React, { useState, useEffect } from 'react';
import { AiCommandHeader } from './AiCommandHeader';
import { ExecutiveAiBriefing } from './ExecutiveAiBriefing';
import { AiConfidenceDashboard } from './AiConfidenceDashboard';
import { BusinessCategoryInsights } from './BusinessCategoryInsights';
import { PredictiveAnalyticsGrid } from './PredictiveAnalyticsGrid';
import { RiskDetectionPanel } from './RiskDetectionPanel';
import { OpportunityCenterCard } from './OpportunityCenterCard';
import { AskAiExecutiveChat } from './AskAiExecutiveChat';
import { RecommendationEngine } from './RecommendationEngine';
import { AiActivityTimeline } from './AiActivityTimeline';
import { AiQuickActions } from './AiQuickActions';
import { BoardPackGeneratorModal } from './BoardPackGeneratorModal';

import {
  mockExecutiveAiBriefing,
  mockCategoryInsights,
  mockPredictiveForecasts,
  mockRiskDetections,
  mockOpportunities,
  mockAiRecommendations,
  mockAiTimelineLogs,
  mockInitialChatMessages,
} from '../../../lib/mock-data';

export function AiCommandCenterModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState(mockExecutiveAiBriefing.lastAnalysisTime);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleRefreshAnalysis = () => {
    const newTime = `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Live IoT Sync)`;
    setLastAnalysisTime(newTime);
    triggerNotification('Re-scanned all 148 IoT streams & ledger entries. AI Briefing updated.');
  };

  if (!isMounted) {
    return (
      <div className="space-y-6 text-left" suppressHydrationWarning>
        <div className="h-12 w-full bg-slate-900 rounded-2xl animate-pulse" />
        <div className="h-32 w-full bg-slate-100 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
          <div className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" suppressHydrationWarning>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-sky-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ AI Engine Command: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Header & Controls */}
      <AiCommandHeader
        lastAnalysisTime={lastAnalysisTime}
        onRefreshAnalysis={handleRefreshAnalysis}
        onOpenSettings={() => triggerNotification('Opening Autonomous AI Model Settings')}
      />

      {/* 2. Conversational Executive Copilot Briefing & Progressive Insight Chips */}
      <ExecutiveAiBriefing
        greeting={mockExecutiveAiBriefing.greeting}
        summaryText={mockExecutiveAiBriefing.summaryText}
        lastAnalysisTime={lastAnalysisTime}
        onOpenBoardModal={() => setIsBoardModalOpen(true)}
      />

      {/* 3. AI Confidence Dashboard & Prediction Matrix */}
      <AiConfidenceDashboard />

      {/* 4. Multi-Dimensional Category Insights */}
      <BusinessCategoryInsights insights={mockCategoryInsights} />

      {/* 5. Ranked Risk Radar & Opportunity Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <RiskDetectionPanel
          risks={mockRiskDetections}
          onTakeAction={(title) => triggerNotification(`Executed risk mitigation flow for: ${title}`)}
        />
        <OpportunityCenterCard
          opportunities={mockOpportunities}
          onExecuteOpportunity={(title) => triggerNotification(`Triggered strategic growth initiative: ${title}`)}
        />
      </div>

      {/* 6. Interactive Executive AI Chat Assistant */}
      <AskAiExecutiveChat initialMessages={mockInitialChatMessages} />

      {/* 7. Strategic Recommendation Engine & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <RecommendationEngine
            recommendations={mockAiRecommendations}
            onExecuteRecommendation={(title) => triggerNotification(`Dispatched recommendation: ${title}`)}
          />
        </div>
        <div className="lg:col-span-1">
          <AiActivityTimeline logs={mockAiTimelineLogs} />
        </div>
      </div>

      {/* 8. Quick Actions */}
      <AiQuickActions
        onActionClick={(action) => triggerNotification(`Triggered: ${action}`)}
      />

      {/* Board Presentation Generator Modal */}
      <BoardPackGeneratorModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
      />
    </div>
  );
}
