'use client';

import React from 'react';
import { BatteryAnalyticsData } from '../../../lib/types';
import { BatteryCharging, AlertTriangle, RefreshCw, Zap, Flame, ShieldCheck } from 'lucide-react';

interface BatteryIntelligenceCardProps {
  batteryData: BatteryAnalyticsData;
}

export function BatteryIntelligenceCard({ batteryData }: BatteryIntelligenceCardProps) {
  const {
    avgBatteryHealthSoh,
    vehiclesBelow80PercentCount,
    predictedReplacements30Days,
    fastChargingUsagePercent,
    avgDegradationRatePer10kKm,
    batteryTemperatureOptimalPercent,
  } = batteryData;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <BatteryCharging className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">Battery Intelligence & Degradation Analytics</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Predictive BMS cell health, thermal management, and degradation forecasting.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300">
          State of Health: {avgBatteryHealthSoh}%
        </span>
      </div>

      {/* Grid of Battery Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* SOH Average */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Avg Battery SOH</span>
          <p className="text-xl font-black text-slate-900">{avgBatteryHealthSoh}%</p>
          <span className="text-[9px] font-extrabold text-emerald-600">Optimal Cell Balance</span>
        </div>

        {/* Vehicles < 80% */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Vehicles &lt; 80% SOH</span>
          <p className="text-xl font-black text-slate-900">{vehiclesBelow80PercentCount} <span className="text-xs text-amber-600">EVs</span></p>
          <span className="text-[9px] font-extrabold text-amber-600">Monitored for Swap</span>
        </div>

        {/* Predicted Replacements */}
        <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 block">30-Day Forecast</span>
          <p className="text-xl font-black text-slate-900">{predictedReplacements30Days} <span className="text-xs text-red-600">Swaps</span></p>
          <span className="text-[9px] font-extrabold text-red-600">LFP Replacements</span>
        </div>

        {/* Fast Charging Usage */}
        <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">Fast Charge Ratio</span>
          <p className="text-xl font-black text-slate-900">{fastChargingUsagePercent}%</p>
          <span className="text-[9px] font-extrabold text-sky-600">DC Fast Stations</span>
        </div>

        {/* Degradation Rate */}
        <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">Degradation / 10k km</span>
          <p className="text-xl font-black text-slate-900">{avgDegradationRatePer10kKm}%</p>
          <span className="text-[9px] font-extrabold text-purple-600">Best in Class (&lt;1.5%)</span>
        </div>

        {/* Thermal Performance */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">Thermal Stability</span>
          <p className="text-xl font-black text-slate-900">{batteryTemperatureOptimalPercent}%</p>
          <span className="text-[9px] font-extrabold text-indigo-600">Optimal Operating Temp</span>
        </div>
      </div>
    </div>
  );
}
