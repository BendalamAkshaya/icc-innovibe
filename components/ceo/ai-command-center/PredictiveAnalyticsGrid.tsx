'use client';

import React from 'react';
import { PredictiveForecastItem } from '../../../lib/types';
import { TrendingUp, TrendingDown, Activity, Sparkles, Target } from 'lucide-react';

interface PredictiveAnalyticsGridProps {
  forecasts: PredictiveForecastItem[];
}

export function PredictiveAnalyticsGrid({ forecasts }: PredictiveAnalyticsGridProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">AI Predictive Analytics & Forecasts</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Statistical forecasting models trained on historical ledgers, seasonal trends, and IoT usage.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300">
          6 Predictive Forecast Models
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecasts.map((fc) => (
          <div
            key={fc.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 transition-all hover:bg-white hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {fc.category} • {fc.forecastPeriod}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900 mt-1.5">{fc.metricName}</h3>
              </div>

              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shrink-0">
                <Sparkles className="h-3 w-3" /> {fc.confidencePercent}% Confidence
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Current State</span>
                <span className="text-xs font-bold text-slate-600">{fc.currentValue}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-medium block">AI Forecast Target</span>
                <span className="text-base font-black text-slate-900 flex items-center gap-1">
                  {fc.trend === 'UP' ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  {fc.forecastedValue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
