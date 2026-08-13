'use client';

import React from 'react';
import { MediaPrItem } from '../../../lib/types';
import { Globe, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';

interface MediaPublicRelationsPanelProps {
  items: MediaPrItem[];
}

export function MediaPublicRelationsPanel({ items }: MediaPublicRelationsPanelProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-sky-600" />
          <h2 className="text-base font-extrabold text-slate-900">Media, PR & Public Statements</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-200">
          Executive Brand Presence
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-slate-100/80"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-300">
                  {item.mediaType.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-bold text-slate-500">{item.outletName} • {item.publishedDate}</span>
              </div>

              <h3 className="font-extrabold text-xs text-slate-900">{item.headline}</h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {item.reachCount}
              </span>
              <button className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
