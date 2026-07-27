'use client';

import React from 'react';
import { CommSummaryMetric } from '../../../lib/types';

interface CommunicationSummaryCardsProps {
  metrics: CommSummaryMetric[];
}

export function CommunicationSummaryCards({ metrics }: CommunicationSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="glass-card p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-2 transition-all hover:border-purple-300"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">{m.label}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-slate-900">{m.value}</span>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${m.badgeColor}`}>
                {m.trend}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium truncate">
            {m.comparison}
          </div>
        </div>
      ))}
    </div>
  );
}
