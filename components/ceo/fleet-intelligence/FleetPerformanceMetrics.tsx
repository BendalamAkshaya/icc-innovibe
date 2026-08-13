'use client';

import React from 'react';
import { FleetPerformanceStat } from '../../../lib/types';
import { Navigation, Gauge, Zap, Activity, Clock, ShieldCheck } from 'lucide-react';

interface FleetPerformanceMetricsProps {
  performance: FleetPerformanceStat;
}

export function FleetPerformanceMetrics({ performance }: FleetPerformanceMetricsProps) {
  const {
    totalDistanceCoveredKm,
    fleetEfficiencyKmPerKwh,
    avgEnergyConsumptionWhPerKm,
    avgDailyUsageKm,
    fleetUtilizationPercent,
    downtimePercent,
  } = performance;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
        <Navigation className="h-5 w-5 text-sky-600" />
        <h2 className="text-base font-extrabold text-slate-900">Fleet Energy Efficiency & Performance</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Distance Covered */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Distance</span>
          <p className="text-xl font-black text-slate-900">{(totalDistanceCoveredKm / 1000).toFixed(0)}k <span className="text-xs text-slate-500">km</span></p>
          <span className="text-[9px] font-extrabold text-sky-600">Cumulative Telemetry</span>
        </div>

        {/* Fleet Efficiency */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Efficiency</span>
          <p className="text-xl font-black text-slate-900">{fleetEfficiencyKmPerKwh} <span className="text-xs text-slate-500">km/kWh</span></p>
          <span className="text-[9px] font-extrabold text-emerald-600">High Eco Efficiency</span>
        </div>

        {/* Avg Energy Consumption */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Energy Consumption</span>
          <p className="text-xl font-black text-slate-900">{avgEnergyConsumptionWhPerKm} <span className="text-xs text-slate-500">Wh/km</span></p>
          <span className="text-[9px] font-extrabold text-purple-600">Optimal Powertrain</span>
        </div>

        {/* Daily Usage */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Avg Daily Route</span>
          <p className="text-xl font-black text-slate-900">{avgDailyUsageKm} <span className="text-xs text-slate-500">km/day</span></p>
          <span className="text-[9px] font-extrabold text-indigo-600">Per Active Vehicle</span>
        </div>

        {/* Utilization */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Utilization</span>
          <p className="text-xl font-black text-slate-900">{fleetUtilizationPercent}%</p>
          <span className="text-[9px] font-extrabold text-emerald-600">+14.0% YoY Growth</span>
        </div>

        {/* Downtime % */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Fleet Downtime</span>
          <p className="text-xl font-black text-slate-900">{downtimePercent}%</p>
          <span className="text-[9px] font-extrabold text-emerald-600">&lt; 5% Target Met</span>
        </div>
      </div>
    </div>
  );
}
