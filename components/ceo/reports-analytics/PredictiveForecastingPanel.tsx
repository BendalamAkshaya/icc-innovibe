'use client';

import React from 'react';
import { PredictiveAnalyticsModel } from '../../../lib/types';
import { Sparkles, TrendingUp, Cpu, ShieldCheck } from 'lucide-react';

interface PredictiveForecastingPanelProps {
  models: PredictiveAnalyticsModel[];
}

export function PredictiveForecastingPanel({ models }: PredictiveForecastingPanelProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-purple-600" />
          <h2 className="text-base font-extrabold text-slate-900">Predictive Machine Learning Forecasting Models</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
          Enterprise AI Predictive Models
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200 space-y-2 flex flex-col justify-between transition-all hover:bg-purple-50/80"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                  {m.targetMetric}
                </span>
                <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  {m.confidencePercent}% Confidence
                </span>
              </div>

              <h3 className="font-extrabold text-xs text-slate-900 mt-1">{m.modelName}</h3>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-xs text-slate-400 font-medium">{m.currentValue}</span>
                <span className="text-sm font-black text-slate-900">→ {m.predictedValue}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-purple-200/60 space-y-0.5 text-[10px]">
              <span className="text-slate-400 font-medium">Primary Driver:</span>
              <p className="font-bold text-slate-700 leading-tight">{m.keyDriver}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
