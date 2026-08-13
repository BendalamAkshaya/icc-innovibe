'use client';

import React from 'react';
import { FleetHealthSummary } from '../../../lib/types';
import { Activity, BatteryCharging, Cpu, Gauge, Zap, CheckCircle2 } from 'lucide-react';

interface FleetHealthDashboardProps {
  health: FleetHealthSummary;
}

export function FleetHealthDashboard({ health }: FleetHealthDashboardProps) {
  const {
    overallScore,
    batteryHealthScore,
    motorHealthScore,
    controllerHealthScore,
    chargingPerformanceScore,
    avgRangeKm,
  } = health;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">EV Sub-system Operational Health Dashboard</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            IoT sensor telemetry across battery packs, PMSM motors, MCU controllers, and fast-charging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Overall Score: {overallScore}/100 (Optimal)
          </span>
        </div>
      </div>

      {/* Main Score Visualizer & Sub-system Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Main Score Circle Badge */}
        <div className="lg:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-white border border-emerald-200 flex flex-col items-center justify-center text-center space-y-2">
          <div className="h-24 w-24 rounded-full border-4 border-emerald-500 bg-white flex flex-col items-center justify-center shadow-lg">
            <span className="text-3xl font-black text-slate-900 leading-none">{overallScore}</span>
            <span className="text-[10px] font-extrabold uppercase text-emerald-600 mt-1">/ 100 PTS</span>
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-900">Fleet Ecosystem Score</h3>
            <p className="text-[10px] text-slate-500 font-medium">94.2% Sensor Connectivity</p>
          </div>
        </div>

        {/* Sub-system Health Bars (3 Columns) */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Battery Health */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-700 flex items-center gap-1">
                <BatteryCharging className="h-3.5 w-3.5 text-emerald-600" /> Battery
              </span>
              <span className="font-mono font-black text-emerald-600">{batteryHealthScore}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${batteryHealthScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">State of Health (SOH)</p>
          </div>

          {/* Motor Health */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-700 flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-amber-600" /> PMSM Motor
              </span>
              <span className="font-mono font-black text-amber-600">{motorHealthScore}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${motorHealthScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Stator & Bearing Temp</p>
          </div>

          {/* Controller Health */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-700 flex items-center gap-1">
                <Cpu className="h-3.5 w-3.5 text-sky-600" /> MCU Controller
              </span>
              <span className="font-mono font-black text-sky-600">{controllerHealthScore}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: `${controllerHealthScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Inverter Efficiency</p>
          </div>

          {/* Average Range */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-700 flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5 text-purple-600" /> Avg Range
              </span>
              <span className="font-mono font-black text-purple-600">{avgRangeKm} km</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(avgRangeKm / 150) * 100}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Per Full Charge Cycle</p>
          </div>
        </div>
      </div>
    </div>
  );
}
