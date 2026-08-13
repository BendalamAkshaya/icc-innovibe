'use client';

import React from 'react';
import { Cpu, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';

export function PredictiveRisksBoard() {
  const predictions = [
    {
      timeframe: 'Next 24 Hours',
      title: 'Ather 450X Spare Brake Pad Inventory Shortage',
      department: 'Procurement & SCM',
      probability: '84%',
      impact: 'High',
      mitigation: 'Auto-dispatch 14 units from Kakinada central depot',
      status: 'HIGH_LIKELIHOOD',
    },
    {
      timeframe: 'Next Week',
      title: 'Thermal Stress Risk on 3 Fast Chargers (Rajahmundry)',
      department: 'Fleet & Infrastructure',
      probability: '68%',
      impact: 'Medium',
      mitigation: 'Schedule off-peak cooling fan calibration',
      status: 'MODERATE_LIKELIHOOD',
    },
    {
      timeframe: 'This Month',
      title: 'Customer Service Queue Surge during Monsoons',
      department: 'Customer Operations',
      probability: '76%',
      impact: 'Medium',
      mitigation: 'Onboard 4 seasonal support technicians',
      status: 'HIGH_LIKELIHOOD',
    },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900">Predictive Risk Forecast Board</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
          AI Forward-Looking Matrix
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.map((p) => (
          <div key={p.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {p.timeframe}
                </span>
                <span className="text-[10px] font-mono font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Prob: {p.probability}
                </span>
              </div>

              <h3 className="font-extrabold text-xs text-slate-900">{p.title}</h3>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">Dept: {p.department}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[9px] font-extrabold uppercase text-slate-400 block">AI Preventive Action</span>
              <p className="text-[11px] font-extrabold text-indigo-700 leading-tight">{p.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
