'use client';

import React from 'react';
import { FleetAiInsight } from '../../../lib/types';
import { Sparkles, BatteryCharging, ShieldCheck, Activity, ArrowUpRight } from 'lucide-react';

interface FleetAiInsightsProps {
  insights: FleetAiInsight[];
}

export function FleetAiInsights({ insights }: FleetAiInsightsProps) {
  const getCategoryIcon = (cat: FleetAiInsight['category']) => {
    switch (cat) {
      case 'BATTERY':
        return <BatteryCharging className="h-4 w-4 text-emerald-600" />;
      case 'HEALTH':
        return <ShieldCheck className="h-4 w-4 text-purple-600" />;
      case 'UTILIZATION':
        return <Activity className="h-4 w-4 text-sky-600" />;
      default:
        return <Sparkles className="h-4 w-4 text-amber-600" />;
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
            <h2 className="text-base font-extrabold text-slate-900">Conversational AI Fleet & BMS Insights</h2>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-200 text-sky-900 border border-sky-300">
            Autonomous Advisor
          </span>
        </div>

        <p className="text-xs text-slate-600 font-medium mt-3 mb-4">
          Synthesized from 148 IoT telemetry streams, BMS cell voltages, and thermal sensors.
        </p>

        {/* Conversational Insights Feed */}
        <div className="space-y-3">
          {insights.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 transition-all hover:border-sky-300"
            >
              <div className="p-2 rounded-xl border bg-slate-50 border-slate-200 shrink-0">
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-900">{item.title}</h3>
                  <span className="text-[9px] font-black uppercase text-slate-400">{item.category}</span>
                </div>
                <p className="text-xs text-slate-800 font-bold leading-relaxed">{item.summary}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.impact}
                  </span>
                  <button className="text-[10px] font-bold text-slate-400 hover:text-sky-600 flex items-center gap-0.5">
                    <span>Inspect</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-sky-200/60 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Powered by InnoVibe Autonomous EV Telemetry & BMS AI Advisor.
        </p>
      </div>
    </div>
  );
}
