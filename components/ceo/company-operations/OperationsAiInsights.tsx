'use client';

import React from 'react';
import { OperationsAiInsight } from '../../../lib/types';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowUpRight } from 'lucide-react';

interface OperationsAiInsightsProps {
  insights: OperationsAiInsight[];
}

export function OperationsAiInsights({ insights }: OperationsAiInsightsProps) {
  const getBadgeStyle = (severity: OperationsAiInsight['severity']) => {
    switch (severity) {
      case 'HIGH':
        return { bg: 'bg-red-50 text-red-800 border-red-200', icon: AlertTriangle };
      case 'MEDIUM':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: Lightbulb };
      default:
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: TrendingUp };
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-white space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-sky-200/60">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900">AI Operational Bottleneck & Health Insights</h2>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-200 text-sky-900 border border-sky-300">
            Executive Synthesis
          </span>
        </div>

        <p className="text-xs text-slate-600 font-medium mt-3 mb-4">
          Autonomous insights generated from live queue telemetry, SLA trackers, and technician GPS feeds.
        </p>

        {/* Executive Summaries */}
        <div className="space-y-3">
          {insights.map((item) => {
            const style = getBadgeStyle(item.severity);
            const Icon = style.icon;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 transition-all hover:border-sky-300"
              >
                <div className={`p-2 rounded-xl border shrink-0 ${style.bg}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-xs text-slate-900">{item.title}</h3>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">{item.category}</span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold leading-relaxed">{item.summary}</p>
                  <p className="text-[11px] text-sky-800 font-medium bg-sky-50 p-2 rounded-xl border border-sky-200">
                    💡 <strong>Actionable Suggestion:</strong> {item.actionableSuggestion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-sky-200/60 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Synthesized automatically by InnoVibe Operations AI Optimization Engine.
        </p>
      </div>
    </div>
  );
}
