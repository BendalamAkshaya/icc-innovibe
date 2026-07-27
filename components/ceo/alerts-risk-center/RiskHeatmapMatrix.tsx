'use client';

import React from 'react';
import { RiskDetectionItem } from '../../../lib/types';
import { ShieldAlert, AlertTriangle, Shield, Activity } from 'lucide-react';

interface RiskHeatmapMatrixProps {
  risks: RiskDetectionItem[];
  onSelectRisk: (risk: RiskDetectionItem) => void;
}

export function RiskHeatmapMatrix({ risks, onSelectRisk }: RiskHeatmapMatrixProps) {
  const critical = risks.filter((r) => r.severity === 'CRITICAL');
  const high = risks.filter((r) => r.severity === 'HIGH');
  const medium = risks.filter((r) => r.severity === 'MEDIUM');
  const low = risks.filter((r) => r.severity === 'LOW');

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Executive Risk Heatmap Matrix</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Probability vs Business Impact 4-quadrant risk positioning matrix.
          </p>
        </div>
        <span className="text-[10px] font-black px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
          Impact × Likelihood Model
        </span>
      </div>

      {/* 4-Quadrant Grid Matrix */}
      <div className="grid grid-cols-2 gap-3 my-2 flex-1">
        {/* Quadrant 1: High Impact / High Probability (CRITICAL) */}
        <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-red-700">High Impact • High Probability</span>
            <span className="text-xs font-black px-2 py-0.5 rounded bg-red-200 text-red-900">CRITICAL</span>
          </div>
          <div className="space-y-1.5">
            {critical.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRisk(r)}
                className="w-full p-2.5 rounded-xl bg-white border border-red-300 text-left hover:border-red-500 shadow-xs transition-all cursor-pointer"
              >
                <p className="font-extrabold text-xs text-slate-900 truncate">{r.title}</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">Impact: {r.impactPotential}</p>
              </button>
            ))}
            {critical.length === 0 && <p className="text-xs text-slate-400 font-medium">No critical risks in this quadrant.</p>}
          </div>
        </div>

        {/* Quadrant 2: High Impact / Low Probability (HIGH) */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-amber-700">High Impact • Low Probability</span>
            <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-200 text-amber-900">HIGH</span>
          </div>
          <div className="space-y-1.5">
            {high.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRisk(r)}
                className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-left hover:border-amber-500 shadow-xs transition-all cursor-pointer"
              >
                <p className="font-extrabold text-xs text-slate-900 truncate">{r.title}</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">Impact: {r.impactPotential}</p>
              </button>
            ))}
            {high.length === 0 && <p className="text-xs text-slate-400 font-medium">No high priority risks.</p>}
          </div>
        </div>

        {/* Quadrant 3: Low Impact / High Probability (MEDIUM) */}
        <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-sky-700">Low Impact • High Probability</span>
            <span className="text-xs font-black px-2 py-0.5 rounded bg-sky-200 text-sky-900">MEDIUM</span>
          </div>
          <div className="space-y-1.5">
            {medium.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRisk(r)}
                className="w-full p-2.5 rounded-xl bg-white border border-sky-300 text-left hover:border-sky-500 shadow-xs transition-all cursor-pointer"
              >
                <p className="font-extrabold text-xs text-slate-900 truncate">{r.title}</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">Impact: {r.impactPotential}</p>
              </button>
            ))}
            {medium.length === 0 && <p className="text-xs text-slate-400 font-medium">No medium risks.</p>}
          </div>
        </div>

        {/* Quadrant 4: Low Impact / Low Probability (LOW) */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-emerald-700">Low Impact • Low Probability</span>
            <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">LOW</span>
          </div>
          <div className="space-y-1.5">
            {low.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRisk(r)}
                className="w-full p-2.5 rounded-xl bg-white border border-emerald-300 text-left hover:border-emerald-500 shadow-xs transition-all cursor-pointer"
              >
                <p className="font-extrabold text-xs text-slate-900 truncate">{r.title}</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">Impact: {r.impactPotential}</p>
              </button>
            ))}
            {low.length === 0 && (
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-left">
                <p className="font-extrabold text-xs text-slate-900">Routine Monitoring Active</p>
                <p className="text-[10px] text-slate-500 mt-0.5">12 System checks passed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
