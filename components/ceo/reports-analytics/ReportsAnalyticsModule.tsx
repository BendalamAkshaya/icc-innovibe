'use client';

import React, { useState, useEffect } from 'react';
import { ReportsSectionHeader } from './ReportsSectionHeader';
import { ExecutiveIntelligenceScoreHero } from './ExecutiveIntelligenceScoreHero';
import { ExecutiveReportLibrary } from './ExecutiveReportLibrary';
import { ExecutiveForecastCenter } from './ExecutiveForecastCenter';
import { BoardPresentationModeCard } from './BoardPresentationModeCard';
import { ScheduledReportsWidget } from './ScheduledReportsWidget';
import { StudioDashboardAnalytics } from './StudioDashboardAnalytics';
import { KpiVarianceAnalytics } from './KpiVarianceAnalytics';
import { TrendAnalysisComparer } from './TrendAnalysisComparer';
import { PredictiveForecastingPanel } from './PredictiveForecastingPanel';
import { CustomReportBuilder } from './CustomReportBuilder';
import { AiReportGeneratorModal } from './AiReportGeneratorModal';
import { ExportWizardModal } from './ExportWizardModal';
import { ExportCenterWidget } from './ExportCenterWidget';
import { BiActivityStream } from './BiActivityStream';
import { ReportsQuickActions } from './ReportsQuickActions';

import {
  mockReportLibraryCards,
  mockKpiVariances,
  mockScheduledReports,
  mockPredictiveAnalyticsModels,
  mockBoardPresentationSlides,
  mockAiGeneratedReports,
} from '../../../lib/mock-data';

export function ReportsAnalyticsModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [isExportWizardOpen, setIsExportWizardOpen] = useState(false);
  const [isFullscreenBoard, setIsFullscreenBoard] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredReports = mockReportLibraryCards.filter((rpt) => {
    const matchCategory = selectedCategory === 'All Categories' || rpt.category.toLowerCase().includes(selectedCategory.toLowerCase().replace(' reports', ''));
    const matchSearch = !searchQuery || rpt.reportTitle.toLowerCase().includes(searchQuery.toLowerCase()) || rpt.summarySnippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

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
        <div className="p-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Executive Analytics Command: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Executive Intelligence Health Hero & Workspace Tabs */}
      <ExecutiveIntelligenceScoreHero
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          triggerNotification(`Switched intelligence view to: ${tab.toUpperCase()}`);
        }}
        onOpenAiGenerator={() => setShowAiModal(true)}
        onOpenExportWizard={() => setIsExportWizardOpen(true)}
      />

      {/* 2. Workspace View Tabs Rendering (0 White Space Grid) */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 flex flex-col">
              <ExecutiveReportLibrary
                reports={filteredReports}
                onOpenReport={(title) => triggerNotification(`Opening executive report pack: "${title}"`)}
              />
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <BiActivityStream />
            </div>
          </div>

          <ExecutiveForecastCenter />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 flex flex-col">
              <BoardPresentationModeCard
                slides={mockBoardPresentationSlides}
                onLaunchBoardMode={() => {
                  setIsFullscreenBoard(true);
                  triggerNotification('Launched Board Meeting Presentation Mode');
                }}
              />
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <ScheduledReportsWidget
                schedules={mockScheduledReports}
                onToggleSchedule={(id) => triggerNotification(`Updated automated schedule job ${id}`)}
              />
            </div>
          </div>

          <ExportCenterWidget
            onExportFormat={(fmt) => triggerNotification(`Exporting executive data as ${fmt}`)}
          />

          <ReportsQuickActions
            onActionClick={(action) => triggerNotification(`Triggered: ${action}`)}
          />
        </div>
      )}

      {activeTab === 'explorer' && (
        <ExecutiveReportLibrary
          reports={filteredReports}
          onOpenReport={(title) => triggerNotification(`Opening executive report pack: "${title}"`)}
        />
      )}

      {activeTab === 'forecast' && (
        <div className="space-y-6">
          <ExecutiveForecastCenter />
          <PredictiveForecastingPanel models={mockPredictiveAnalyticsModels} />
        </div>
      )}

      {activeTab === 'board' && (
        <BoardPresentationModeCard
          slides={mockBoardPresentationSlides}
          onLaunchBoardMode={() => {
            setIsFullscreenBoard(true);
            triggerNotification('Launched Board Meeting Presentation Mode');
          }}
        />
      )}

      {activeTab === 'export' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col">
            <ExportCenterWidget
              onExportFormat={(fmt) => triggerNotification(`Exporting executive data as ${fmt}`)}
            />
          </div>
          <div className="lg:col-span-1 flex flex-col">
            <ScheduledReportsWidget
              schedules={mockScheduledReports}
              onToggleSchedule={(id) => triggerNotification(`Updated automated schedule job ${id}`)}
            />
          </div>
        </div>
      )}

      {activeTab === 'studio' && (
        <div className="space-y-6">
          <StudioDashboardAnalytics />
          <KpiVarianceAnalytics variances={mockKpiVariances} />
          <CustomReportBuilder
            onGenerateCustomReport={(cfg) => triggerNotification(`Compiled custom dashboard for ${cfg.dataSource}`)}
          />
        </div>
      )}

      {/* Export Center Wizard Modal */}
      <ExportWizardModal
        isOpen={isExportWizardOpen}
        onClose={() => setIsExportWizardOpen(false)}
      />

      {/* AI Executive Report Generator Modal */}
      {showAiModal && (
        <AiReportGeneratorModal
          reports={mockAiGeneratedReports}
          onClose={() => setShowAiModal(false)}
          onDownloadAiReport={(title) => triggerNotification(`Downloaded AI Report: "${title}"`)}
        />
      )}

      {/* Fullscreen Board Presentation Mode Overlay */}
      {isFullscreenBoard && (
        <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-8 animate-in fade-in" suppressHydrationWarning>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase bg-indigo-600 px-3 py-1 rounded-full">
                Board Presentation Mode • Confidential
              </span>
              <h2 className="text-xl font-black">{mockBoardPresentationSlides[0].title}</h2>
            </div>
            <button
              onClick={() => setIsFullscreenBoard(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-extrabold text-xs"
            >
              Exit Presentation (ESC)
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 my-auto text-center">
            <span className="text-4xl font-black text-emerald-400 block">
              {mockBoardPresentationSlides[0].headlineMetric}
            </span>
            <p className="text-lg font-medium text-slate-300 leading-relaxed">
              "{mockBoardPresentationSlides[0].executiveSummary}"
            </p>

            <div className="grid grid-cols-2 gap-4 text-left pt-6">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-indigo-400">Quarterly Milestones</span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 font-medium">
                  {mockBoardPresentationSlides[0].keyPoints.map((kp, i) => (
                    <li key={i}>{kp}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-amber-400">Executive Strategic Recommendation</span>
                <p className="text-xs text-slate-200 font-bold leading-relaxed">
                  "{mockBoardPresentationSlides[0].recommendationText}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500 font-mono">
            <span>InnoVibe Board Deck 2026</span>
            <span>Slide 1 of {mockBoardPresentationSlides.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
