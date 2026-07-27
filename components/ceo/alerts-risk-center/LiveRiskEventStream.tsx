'use client';

import React from 'react';
import { Activity, Clock, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

export function LiveRiskEventStream() {
  const events = [
    { time: '09:12 AM', title: 'BMS Cell Thermal Warning Detected', category: 'Fleet IoT', severity: 'CRITICAL', bg: 'bg-red-50 text-red-800 border-red-200' },
    { time: '09:06 AM', title: 'Senior Engineer Assigned to Guntur SLA Breach', category: 'Operations', severity: 'RESOLVING', bg: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { time: '08:58 AM', title: 'Rajahmundry Hub Service Queue Threshold Exceeded', category: 'Customer Care', severity: 'HIGH', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    { time: '08:42 AM', title: 'Kakinada Battery Swap Station #2 Risk Closed', category: 'Infrastructure', severity: 'CLOSED', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { time: '08:15 AM', title: 'Autonomous OTA Firmware Security Patch Applied', category: 'Security', severity: 'MONITORING', bg: 'bg-sky-50 text-sky-800 border-sky-200' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900">Live Risk Event Stream</h2>
        </div>
        <span className="text-[10px] text-emerald-600 font-mono font-extrabold flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" /> REAL-TIME STREAM
        </span>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-80 pr-1">
        {events.map((e, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-black text-slate-400 shrink-0">{e.time}</span>
              <div>
                <p className="font-extrabold text-slate-900">{e.title}</p>
                <p className="text-[10px] text-slate-500 font-semibold">{e.category}</p>
              </div>
            </div>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase shrink-0 ${e.bg}`}>
              {e.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
