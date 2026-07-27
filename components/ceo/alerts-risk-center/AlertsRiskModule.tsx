'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Activity, Filter, Search, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';
import { ExecutiveRiskHero } from './ExecutiveRiskHero';
import { RiskHeatmapMatrix } from './RiskHeatmapMatrix';
import { RiskDetailDrawer } from './RiskDetailDrawer';
import { PredictiveRisksBoard } from './PredictiveRisksBoard';
import { LiveRiskEventStream } from './LiveRiskEventStream';
import { AiWhatIfSimulator } from './AiWhatIfSimulator';
import { RiskDependencyGraph } from './RiskDependencyGraph';
import { RiskQuickActions } from './RiskQuickActions';

import { mockRiskDetections } from '../../../lib/mock-data';
import { RiskDetectionItem } from '../../../lib/types';

export function AlertsRiskModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskDrawer, setSelectedRiskDrawer] = useState<RiskDetectionItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredRisks = mockRiskDetections.filter((r) => {
    const matchSev = selectedSeverity === 'ALL' || r.severity === selectedSeverity;
    const matchQuery = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSev && matchQuery;
  });

  const criticalCount = mockRiskDetections.filter((r) => r.severity === 'CRITICAL').length;
  const highCount = mockRiskDetections.filter((r) => r.severity === 'HIGH').length;
  const mediumCount = mockRiskDetections.filter((r) => r.severity === 'MEDIUM').length;

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
        <div className="p-3.5 rounded-2xl bg-red-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Executive Risk Action: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Executive Risk Hero & Radar */}
      <ExecutiveRiskHero
        criticalCount={criticalCount}
        highCount={highCount}
        mediumCount={mediumCount}
        monitoringCount={12}
        onFilterBySeverity={(sev) => setSelectedSeverity(sev)}
      />

      {/* 2. Executive Risk Heatmap Matrix & Live Risk Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <RiskHeatmapMatrix
            risks={mockRiskDetections}
            onSelectRisk={(r) => setSelectedRiskDrawer(r)}
          />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <LiveRiskEventStream />
        </div>
      </div>

      {/* 3. AI What-If Business Impact Simulator */}
      <AiWhatIfSimulator />

      {/* 4. Systemic Risk Dependency Graph */}
      <RiskDependencyGraph />

      {/* 5. Predictive Risk Forecast Board */}
      <PredictiveRisksBoard />

      {/* 6. Active Risk Incidents Queue */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              <h2 className="text-base font-extrabold text-slate-900">Active Executive Risk Incidents Queue ({filteredRisks.length})</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Detailed list of active operational risks, SLA countdown timers, and mitigation controls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search active risks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-slate-800 w-36 font-bold"
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 outline-none"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Risk</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredRisks.map((risk) => (
            <div
              key={risk.id}
              onClick={() => setSelectedRiskDrawer(risk)}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all cursor-pointer group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase ${
                    risk.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {risk.severity}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase">{risk.category}</span>
                  <span className="text-[10px] font-mono font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 flex items-center gap-1">
                    <Clock className="h-3 w-3 animate-pulse" /> SLA: 02h 13m
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">{risk.title}</h3>
                <p className="text-xs text-slate-600 font-medium">{risk.description}</p>
                <p className="text-[10px] text-slate-400 font-bold">Impact: <strong className="text-slate-800">{risk.impactPotential}</strong></p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerNotification(`Executed Mitigation Protocol for ${risk.title}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Execute Mitigation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Executive Quick Actions */}
      <RiskQuickActions onActionClick={(msg) => triggerNotification(`Quick Action Executed: ${msg}`)} />

      {/* Slide-Over Incident Inspection Drawer */}
      <RiskDetailDrawer
        risk={selectedRiskDrawer}
        onClose={() => setSelectedRiskDrawer(null)}
        onExecuteMitigation={(title) => triggerNotification(`Dispatched Mitigation Flow for: ${title}`)}
      />
    </div>
  );
}
