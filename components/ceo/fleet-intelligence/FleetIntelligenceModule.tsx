'use client';

import React, { useState } from 'react';
import { FleetSectionHeader } from './FleetSectionHeader';
import { FleetAlertsTicker } from './FleetAlertsTicker';
import { VizagLiveMap } from './VizagLiveMap';
import { FleetHealthDashboard } from './FleetHealthDashboard';
import { LiveVehicleStatusDonut } from './LiveVehicleStatusDonut';
import { BatteryIntelligenceCard } from './BatteryIntelligenceCard';
import { ChargingIntelligencePanel } from './ChargingIntelligencePanel';
import { PredictiveMaintenancePanel } from './PredictiveMaintenancePanel';
import { FleetCostDriverAnalytics } from './FleetCostDriverAnalytics';
import { DigitalTwinHierarchyTree } from './DigitalTwinHierarchyTree';
import { FleetReplaySimulator } from './FleetReplaySimulator';
import { FleetAiInsights } from './FleetAiInsights';
import { FleetQuickActions } from './FleetQuickActions';
import { VehicleDetailDrawer } from './VehicleDetailDrawer';

import { Vehicle } from '../../../lib/types';
import {
  mockFleetKpiMetrics,
  mockFleetHealthSummary,
  mockVehicleStatusBreakdown,
  mockBatteryAnalytics,
  mockPredictiveMaintenanceList,
  mockFleetPerformance,
  mockFleetAiInsights,
  mockVehicles,
} from '../../../lib/mock-data';
import { Search, Filter, Activity, Clock, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export function FleetIntelligenceModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('All Fleet Hubs');
  const [selectedDateRange, setSelectedDateRange] = useState('Realtime Telemetry (Live)');
  const [selectedVehicleType, setSelectedVehicleType] = useState('All Vehicle Models');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Vehicle Drawer State
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [notification, setNotification] = useState<string | null>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenVehicle = (veh: Vehicle) => {
    setSelectedVehicle(veh);
    setIsDrawerOpen(true);
  };

  if (!isMounted) {
    return (
      <div className="space-y-6 text-left" suppressHydrationWarning>
        <div className="h-12 w-full bg-slate-900 rounded-2xl animate-pulse" />
        <div className="h-24 w-full bg-slate-100 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-100 rounded-3xl animate-pulse" />
          <div className="lg:col-span-1 h-96 bg-slate-100 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" suppressHydrationWarning>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Fleet Action Executed: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Bloomberg Style Persistent Alert Ticker */}
      <FleetAlertsTicker onAlertClick={(msg) => triggerNotification(`Inspecting Alert: ${msg}`)} />

      {/* 2. Section Header & Multi-Filter Search Control */}
      <div className="space-y-4">
        <FleetSectionHeader
          selectedBranch={selectedBranch}
          onBranchChange={(b) => {
            setSelectedBranch(b);
            triggerNotification(`Filtered telemetry for branch hub: ${b}`);
          }}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={(d) => {
            setSelectedDateRange(d);
            triggerNotification(`Updated telemetry range to: ${d}`);
          }}
          selectedVehicleType={selectedVehicleType}
          onVehicleTypeChange={(v) => {
            setSelectedVehicleType(v);
            triggerNotification(`Filtered model telemetry for: ${v}`);
          }}
          onFullAnalytics={() => triggerNotification('Opening Full Fleet IoT Analytics Suite')}
        />

        {/* Live Search & Extended Filter Strip */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex items-center w-full md:w-96">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by VIN, Plate, Driver, IMEI, QR, or Hub..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-emerald-500 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase text-slate-400">Status:</span>
            {(['ALL', 'ONLINE', 'CHARGING', 'OFFLINE', 'CRITICAL'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-black transition-all ${
                  selectedStatusFilter === st
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. HERO ZONE (Zone 1): Live Vizag OSM Map + Fleet Ecosystem Health */}
      <VizagLiveMap className="w-full" />


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <LiveVehicleStatusDonut statusList={mockVehicleStatusBreakdown} />

        {/* Live Fleet Activity Timeline */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-600" /> Fleet Activity Timeline
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-extrabold">LIVE</span>
          </div>

          <div className="space-y-2 text-xs font-medium flex-1 justify-center flex flex-col">
            {[
              { time: '10:42', title: 'Vehicle AP39AB1234', desc: 'Fast Charging Started (80% Target)', status: 'bg-emerald-500' },
              { time: '10:38', title: 'Vehicle AP39CD5678', desc: 'Reached Customer Hub Location', status: 'bg-sky-500' },
              { time: '10:33', title: 'Vehicle AP39EF9012', desc: 'BMS Cell Thermal Alert Logged', status: 'bg-red-500' },
              { time: '10:30', title: 'Firmware v4.2.1 OTA', desc: 'Successfully Updated 12 EVs', status: 'bg-indigo-500' },
            ].map((ev, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-all">
                <span className="font-mono text-[11px] font-bold text-slate-400 whitespace-nowrap">{ev.time}</span>
                <span className={`h-2 w-2 rounded-full mt-1.5 ${ev.status}`} />
                <div>
                  <p className="font-extrabold text-slate-900">{ev.title}</p>
                  <p className="text-[11px] text-slate-500">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* 4. EV Sub-system Health Strip */}
      <FleetHealthDashboard health={mockFleetHealthSummary} />

      {/* 5. ZONE 2: Battery Intelligence + Charging Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <BatteryIntelligenceCard batteryData={mockBatteryAnalytics} />
        <ChargingIntelligencePanel />
      </div>

      {/* 6. ZONE 3: Predictive Maintenance Priority Queue + Cost & Driver Analytics */}
      <PredictiveMaintenancePanel
        maintenanceItems={mockPredictiveMaintenanceList}
        onSelectVehicle={(vin) => {
          const matched = mockVehicles.find((v) => v.vin === vin) || mockVehicles[0];
          handleOpenVehicle(matched);
        }}
      />

      <FleetCostDriverAnalytics />

      {/* 7. Digital Twin Hierarchy & Fleet Replay Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <DigitalTwinHierarchyTree />
        <FleetReplaySimulator />
      </div>

      {/* 8. Executive AI Insights & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <FleetAiInsights insights={mockFleetAiInsights} />
        <FleetQuickActions onActionClick={(action) => triggerNotification(`Triggered: ${action}`)} />
      </div>

      {/* 9. Slide-over Right Vehicle Detail Drawer */}
      <VehicleDetailDrawer
        vehicle={selectedVehicle}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
