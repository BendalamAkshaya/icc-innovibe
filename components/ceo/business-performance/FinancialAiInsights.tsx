'use client';

import React from 'react';
import { FinancialInsight } from '../../../lib/types';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowUpRight } from 'lucide-react';

interface FinancialAiInsightsProps {
  insights: FinancialInsight[];
}

export function FinancialAiInsights({ insights }: FinancialAiInsightsProps) {
  const getBadgeStyle = (type: FinancialInsight['type']) => {
    switch (type) {
      case 'POSITIVE':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: TrendingUp, color: 'text-emerald-600' };
      case 'WARNING':
        return { bg: 'bg-red-50 text-red-800 border-red-200', icon: AlertTriangle, color: 'text-red-600' };
      case 'HIGHLIGHT':
        return { bg: 'bg-purple-50 text-purple-800 border-purple-200', icon: Sparkles, color: 'text-purple-600' };
      default:
        return { bg: 'bg-sky-50 text-sky-800 border-sky-200', icon: Lightbulb, color: 'text-sky-600' };
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
            <h2 className="text-base font-extrabold text-slate-900">Conversational AI Financial Insights</h2>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-200 text-sky-900 border border-sky-300">
            Realtime AI Advisor
          </span>
        </div>

        <p className="text-xs text-slate-600 font-medium mt-3 mb-4">
          Autonomous business intelligence synthesized from live telemetry, service bookings, and financial ledger data.
        </p>

        {/* Conversational Insights Feed */}
        <div className="space-y-3">
          {insights.map((ins) => {
            const style = getBadgeStyle(ins.type);
            const Icon = style.icon;

            return (
              <div
                key={ins.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 transition-all hover:border-sky-300"
              >
                <div className={`p-2 rounded-xl border shrink-0 ${style.bg}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-xs text-slate-800 font-bold leading-relaxed">{ins.text}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {ins.impact}
                    </span>
                    <button className="text-[10px] font-bold text-slate-400 hover:text-sky-600 flex items-center gap-0.5">
                      <span>Detail</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-sky-200/60 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Generated automatically by InnoVibe Autonomous AI Advisor Microservice.
        </p>
      </div>
    </div>
  );
}
