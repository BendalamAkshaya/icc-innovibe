'use client';

import React from 'react';
import { RiskDetectionItem } from '../../../lib/types';
import { ShieldAlert, AlertTriangle, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

interface RiskDetectionPanelProps {
  risks: RiskDetectionItem[];
  onTakeAction?: (riskTitle: string) => void;
}

export function RiskDetectionPanel({ risks, onTakeAction }: RiskDetectionPanelProps) {
  const getSeverityBadge = (sev: RiskDetectionItem['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'HIGH':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'MEDIUM':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <h2 className="text-base font-extrabold text-slate-900">Ranked AI Risk Radar</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ranked list by severity (Critical → High → Medium → Low) with ETA and action mitigation.
            </p>
          </div>

          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300">
            {risks.length} Active Risks
          </span>
        </div>

        <div className="space-y-3 my-4">
          {risks.map((rk) => (
            <div
              key={rk.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-100/80"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shrink-0 shadow-xs">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-xs text-slate-900">{rk.title}</h3>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${getSeverityBadge(rk.severity)}`}>
                      {rk.severity} SEVERITY
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-bold leading-relaxed">{rk.description}</p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium pt-1">
                    <span>Impact: <strong className="text-slate-800">{rk.impactPotential}</strong></span>
                    <span>ETA: <strong className="text-amber-700">24-48 Hours</strong></span>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => onTakeAction && onTakeAction(rk.title)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-extrabold text-xs shadow-xs inline-flex items-center gap-1 transition-all"
                >
                  <span>Execute Action</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
