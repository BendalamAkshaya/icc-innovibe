'use client';

import React from 'react';
import { AlertTriangle, BatteryCharging, ShieldAlert, Cpu, CloudRain, Radio, Zap } from 'lucide-react';

interface FleetAlertsTickerProps {
  onAlertClick?: (alertType: string) => void;
}

export function FleetAlertsTicker({ onAlertClick }: FleetAlertsTickerProps) {
  const alerts = [
    { id: 'a1', label: '3 Critical Battery Cell Alerts', icon: BatteryCharging, color: 'text-red-600 bg-red-50 border-red-200' },
    { id: 'a2', label: '5 Vehicles Offline (GPS Telemetry Lost)', icon: ShieldAlert, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'a3', label: '12 Active Fast Charging Sessions', icon: Zap, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'a4', label: '1 Thermal Cutoff Pre-warning (AP39CD5678)', icon: AlertTriangle, color: 'text-red-700 bg-red-100 border-red-300' },
    { id: 'a5', label: 'v4.2.1 OTA Firmware Update Available (148 EVs)', icon: Cpu, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { id: 'a6', label: 'Weather: 32°C • 68% Humidity (Coastal AP)', icon: CloudRain, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  ];

  return (
    <div className="glass-panel p-3 rounded-2xl border border-slate-200 bg-slate-900 text-white flex items-center gap-3 overflow-hidden shadow-md">
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider whitespace-nowrap shadow-xs">
        <Radio className="h-3.5 w-3.5 animate-pulse" />
        <span>Bloomberg Fleet Ticker</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5 text-xs font-bold w-full">
        {alerts.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onAlertClick && onAlertClick(item.label)}
              className={`px-3 py-1 rounded-xl border flex items-center gap-2 whitespace-nowrap transition-all hover:scale-105 ${item.color}`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
