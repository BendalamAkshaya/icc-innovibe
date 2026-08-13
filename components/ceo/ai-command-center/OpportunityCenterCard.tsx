'use client';

import React from 'react';
import { OpportunityItem } from '../../../lib/types';
import { Sparkles, TrendingUp, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

interface OpportunityCenterCardProps {
  opportunities: OpportunityItem[];
  onExecuteOpportunity?: (title: string) => void;
}

export function OpportunityCenterCard({ opportunities, onExecuteOpportunity }: OpportunityCenterCardProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-white space-y-4 text-left h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-sky-200/60">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sky-600 animate-pulse" />
              <h2 className="text-base font-extrabold text-slate-900">AI Opportunity Matrix (Impact vs Effort)</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Prioritized growth opportunities ranked by High Impact + Low Effort (Do First!).
            </p>
          </div>

          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 border border-sky-300">
            High-Yield Focus Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          {opportunities.map((op) => (
            <div
              key={op.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 transition-all hover:border-sky-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-300">
                    DO FIRST • {op.category}
                  </span>

                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {op.estimatedRevenueGain}
                  </span>
                </div>

                <h3 className="font-extrabold text-xs text-slate-900">{op.title}</h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{op.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">Effort: <strong className="text-emerald-700">{op.difficulty}</strong></span>
                <button
                  onClick={() => onExecuteOpportunity && onExecuteOpportunity(op.title)}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-xs inline-flex items-center gap-1 transition-all"
                >
                  <span>Capitalize</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
