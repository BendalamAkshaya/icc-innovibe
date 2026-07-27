'use client';

import React from 'react';
import { Zap, Clock, BatteryCharging, ShieldAlert, Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';

export function ChargingIntelligencePanel() {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-5 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h2 className="text-base font-extrabold text-slate-900">EV Fast Charging & Grid Load Intelligence</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time grid load, energy kwH throughput, fast charger utilization, and thermal management.
          </p>
        </div>

        <span className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-xs">
          <Zap className="h-4 w-4 text-amber-500" /> 1,840 kWh Delivered Today
        </span>
      </div>

      {/* Grid Cards (4 Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Sessions Today</span>
          <p className="text-2xl font-black text-slate-900">142 Sessions</p>
          <span className="text-[11px] font-bold text-emerald-600">+14% vs last week</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Avg Charge Duration</span>
          <p className="text-2xl font-black text-slate-900">42 Mins</p>
          <span className="text-[11px] font-bold text-sky-600">80% Fast Charge Target</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Peak Grid Load</span>
          <p className="text-2xl font-black text-amber-600">180 kW</p>
          <span className="text-[11px] font-bold text-slate-500">Kakinada Central Substation</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Fast Charger Status</span>
          <p className="text-2xl font-black text-slate-900 flex items-center gap-2">
            24 Active
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              4 Idle • 1 Faulty
            </span>
          </p>
        </div>
      </div>

      {/* Charging Hub Distribution Visualizer */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
          <span>Charging Hub Utilization Stream</span>
          <span className="text-slate-500 font-mono">29 Total Charger Guns Connected</span>
        </div>

        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
          <div className="h-full bg-emerald-500" style={{ width: '82.7%' }} title="24 Active Chargers (82.7%)" />
          <div className="h-full bg-amber-400" style={{ width: '13.8%' }} title="4 Idle Chargers (13.8%)" />
          <div className="h-full bg-red-500" style={{ width: '3.5%' }} title="1 Faulty Charger (3.5%)" />
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Active Fast Charging (24)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Available Idle (4)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Maintenance Required (1)
          </span>
        </div>
      </div>
    </div>
  );
}
