'use client';

import React from 'react';
import { StrategicInitiativeItem } from '../../../lib/types';
import { Target, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface StrategicInitiativesPanelProps {
  initiatives: StrategicInitiativeItem[];
  onSelectInitiative?: (title: string) => void;
}

export function StrategicInitiativesPanel({ initiatives, onSelectInitiative }: StrategicInitiativesPanelProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Strategic Corporate Initiatives</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Long-term executive projects, budget consumption, timeline tracking, and upcoming milestones.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          4 Active Initiatives
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initiatives.map((init) => (
          <div
            key={init.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 transition-all hover:bg-white hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {init.category}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900 mt-1.5">{init.title}</h3>
                <p className="text-[10px] text-slate-500 font-medium">Sponsor: {init.sponsor}</p>
              </div>

              <button
                onClick={() => onSelectInitiative && onSelectInitiative(init.title)}
                className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-600 shadow-xs"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Budget: {init.budgetUsed} / {init.totalBudget}</span>
                <span className="font-mono font-black text-indigo-600">{init.progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${init.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1 pt-1 border-t border-slate-200/60 text-[11px]">
              <div className="flex justify-between text-slate-600">
                <span>Timeline: <strong className="text-slate-800">{init.timeline}</strong></span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                Next Milestone: <strong className="text-indigo-700">{init.nextMilestone}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
