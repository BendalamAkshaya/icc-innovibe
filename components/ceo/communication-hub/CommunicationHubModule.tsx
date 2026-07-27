'use client';

import React, { useState, useEffect } from 'react';
import { ExecutiveCommScoreHero } from './ExecutiveCommScoreHero';
import { ExecutiveCommInbox } from './ExecutiveCommInbox';
import { CommTimelineStream } from './CommTimelineStream';
import { ComposeMessageDrawer } from './ComposeMessageDrawer';
import { ExecutiveAnnouncementsList } from './ExecutiveAnnouncementsList';
import { LeadershipCommunicationPanel } from './LeadershipCommunicationPanel';
import { ExecutiveMeetingCenter } from './ExecutiveMeetingCenter';
import { EmployeeEngagementWidget } from './EmployeeEngagementWidget';
import { BoardInvestorCommSection } from './BoardInvestorCommSection';
import { MediaPublicRelationsPanel } from './MediaPublicRelationsPanel';
import { CommunicationAnalyticsWidget } from './CommunicationAnalyticsWidget';
import { CommunicationQuickActions } from './CommunicationQuickActions';
import { AiCommAssistantModal } from './AiCommAssistantModal';

import {
  mockCommSummaryMetrics,
  mockExecutiveAnnouncements,
  mockLeadershipThreads,
  mockExecutiveMeetings,
  mockEmployeePulse,
  mockBoardInvestorReports,
  mockMediaPrItems,
  mockAiCommDraftTemplates,
} from '../../../lib/mock-data';

export function CommunicationHubModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
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
        <div className="p-3.5 rounded-2xl bg-purple-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Executive Communication Action: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Executive Communication Score & Workspace Tabs */}
      <ExecutiveCommScoreHero
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          triggerNotification(`Switched workspace to: ${tab.toUpperCase()}`);
        }}
        onOpenCompose={() => setIsComposeOpen(true)}
      />

      {/* 2. Workspace View Tabs Rendering (0 White Space Grid) */}
      {activeTab === 'inbox' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 flex flex-col">
              <ExecutiveCommInbox
                onOpenCompose={() => setIsComposeOpen(true)}
                onOpenItem={(title) => triggerNotification(`Inspecting item: ${title}`)}
              />
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <CommTimelineStream />
            </div>
          </div>

          <ExecutiveAnnouncementsList
            announcements={mockExecutiveAnnouncements}
            onSelectAnnouncement={(title) => triggerNotification(`Opening engagement report for: ${title}`)}
          />
        </div>
      )}

      {activeTab === 'announcements' && (
        <ExecutiveAnnouncementsList
          announcements={mockExecutiveAnnouncements}
          onSelectAnnouncement={(title) => triggerNotification(`Opening engagement report for: ${title}`)}
        />
      )}

      {activeTab === 'meetings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col">
            <ExecutiveMeetingCenter
              meetings={mockExecutiveMeetings}
              onViewMeetingDetails={(title) => triggerNotification(`Opening agenda & AI minutes for: ${title}`)}
            />
          </div>
          <div className="lg:col-span-1 flex flex-col">
            <EmployeeEngagementWidget pulse={mockEmployeePulse} />
          </div>
        </div>
      )}

      {activeTab === 'threads' && (
        <LeadershipCommunicationPanel
          threads={mockLeadershipThreads}
          onOpenThread={(title) => triggerNotification(`Joined C-Suite discussion thread: ${title}`)}
        />
      )}

      {activeTab === 'board' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col">
            <BoardInvestorCommSection
              reports={mockBoardInvestorReports}
              onDownloadReport={(title) => triggerNotification(`Downloaded encrypted document: ${title}`)}
            />
          </div>
          <div className="lg:col-span-1 flex flex-col">
            <MediaPublicRelationsPanel items={mockMediaPrItems} />
          </div>
        </div>
      )}

      {activeTab === 'pr' && (
        <MediaPublicRelationsPanel items={mockMediaPrItems} />
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-1 flex flex-col">
            <CommunicationAnalyticsWidget />
          </div>
          <div className="lg:col-span-2 flex flex-col justify-center">
            <CommunicationQuickActions
              onActionClick={(action) => triggerNotification(`Triggered: ${action}`)}
            />
          </div>
        </div>
      )}

      {/* 3. Floating Broadcast & Message Compose Drawer */}
      <ComposeMessageDrawer
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={(channel, target, title, text) => {
          triggerNotification(`Published ${channel} to ${target}: "${title}"`);
        }}
      />

      {/* 4. AI Communication Assistant Modal */}
      {showAiModal && (
        <AiCommAssistantModal
          drafts={mockAiCommDraftTemplates}
          onClose={() => setShowAiModal(false)}
          onUseDraft={(text) => triggerNotification(`Inserted AI draft into announcement composer`)}
        />
      )}
    </div>
  );
}
