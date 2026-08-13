'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, BatteryCharging, Wrench, Download, Sliders, Loader2, Radio, Cpu, ShieldCheck, Zap, Activity, AlertCircle } from 'lucide-react';
import { downloadClientExportFile, generateReportCsv } from '../../../lib/quick-actions-handler';
import { mockVehicles } from '../../../lib/mock-data';

interface FleetQuickActionsProps {
  onActionClick?: (actionName: string) => void;
}

export function FleetQuickActions({ onActionClick }: FleetQuickActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [lastActionLog, setLastActionLog] = useState<string>('System Idle • IoT Gateway Telemetry Synchronized at 10:45 AM');

  const handleAction = async (id: string, label: string) => {
    setLoadingAction(id);
    if (onActionClick) onActionClick(label);
    setLastActionLog(`Executed: ${label} • Telemetry Pipeline Updated`);

    try {
      if (id === 'act_fl1') {
        router.push(`/dashboard/ceo?module=fleet-intelligence`);
      } else if (id === 'act_fl2') {
        router.push(`/dashboard/ceo?module=fleet-intelligence`);
      } else if (id === 'act_fl3') {
        router.push(`/dashboard/ceo?module=fleet-intelligence`);
      } else if (id === 'act_fl4') {
        const headers = ['Vehicle Registration', 'Model', 'Health Status', 'Battery SOC %', 'Overall Health Score', 'Location City'];
        const rows = mockVehicles.map((v) => [v.registrationNumber, v.model, v.healthScore.status, v.healthScore.batteryHealth + '%', v.healthScore.overall + '/100', 'Kakinada Hub']);
        const csvContent = generateReportCsv('Connected EV Fleet Intelligence Audit', headers, rows);
        downloadClientExportFile(`InnoVibe_Fleet_Intelligence_Report_${Date.now()}.csv`, csvContent);
      } else if (id === 'act_fl5') {
        router.push(`/dashboard/ceo?module=reports-analytics&category=FLEET`);
      }
    } finally {
      setTimeout(() => setLoadingAction(null), 400);
    }
  };

  const actions = [
    { id: 'act_fl1', label: 'Live Fleet Map', desc: 'Focus GPS Grid', icon: MapPin, color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { id: 'act_fl2', label: 'Battery Analytics', desc: 'Cell Telemetry', icon: BatteryCharging, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'act_fl3', label: 'Predictive Service', desc: 'BMS Diagnostics', icon: Wrench, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { id: 'act_fl4', label: 'Export Telemetry', desc: 'CSV Audit Log', icon: Download, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { id: 'act_fl5', label: 'Analytics Studio', desc: 'Deep IoT Charts', icon: Sliders, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-5 h-full flex flex-col justify-between text-left">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-sky-600 animate-pulse" />
            <h2 className="text-base font-extrabold text-slate-900">Executive Fleet Telematics Shortcuts</h2>
          </div>
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
            AWS IoT Core Online
          </span>
        </div>

        {/* Action Buttons Tiles (2 Columns or Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
          {actions.map((act) => {
            const Icon = act.icon;
            const isLoading = loadingAction === act.id;

            return (
              <button
                key={act.id}
                disabled={isLoading}
                onClick={() => handleAction(act.id, act.label)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between font-extrabold text-xs transition-all shadow-xs disabled:opacity-50 hover:scale-[1.02] ${act.color}`}
              >
                <div className="flex items-center justify-between">
                  {isLoading ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <Icon className="h-4 w-4 shrink-0" />}
                  <span className="text-[9px] font-mono font-bold uppercase opacity-75">Ready</span>
                </div>
                <div className="mt-2">
                  <p className="font-extrabold text-slate-900 leading-tight">{act.label}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{act.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* IoT Telemetry System Health Status Grid */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-indigo-600" /> Gateway & Infrastructure Health
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-600">99.8% Uptime</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-medium">MQTT Broker</span>
              <span className="font-extrabold text-emerald-600">CONNECTED</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-medium">OTA Pipeline</span>
              <span className="font-extrabold text-sky-600">v4.2 READY</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-medium">BMS Alarm Sync</span>
              <span className="font-extrabold text-emerald-600">ACTIVE</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Cell Temp Guard</span>
              <span className="font-extrabold text-emerald-600">38°C OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Command Executed Console Log Footer */}
      <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-[11px] flex items-center justify-between shadow-inner mt-2">
        <div className="flex items-center gap-2 truncate">
          <Activity className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate text-slate-300">{lastActionLog}</span>
        </div>
        <span className="text-[9px] text-emerald-400 font-bold shrink-0 ml-2">ACK</span>
      </div>
    </div>
  );
}
