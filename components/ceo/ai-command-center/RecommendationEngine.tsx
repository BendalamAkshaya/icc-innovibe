'use client';

import React, { useState } from 'react';
import { AiRecommendationItem } from '../../../lib/types';
import { Lightbulb, CheckCircle2, ArrowUpRight, Zap } from 'lucide-react';

interface RecommendationEngineProps {
  recommendations: AiRecommendationItem[];
  onExecuteRecommendation?: (title: string) => void;
}

export function RecommendationEngine({ recommendations, onExecuteRecommendation }: RecommendationEngineProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Revenue', 'Operations', 'Fleet', 'HR', 'Technology'];

  const filteredRecs = activeCategory === 'ALL'
    ? recommendations
    : recommendations.filter((r) => r.category === activeCategory);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500 fill-amber-400" />
            <h2 className="text-base font-extrabold text-slate-900">AI Strategic Recommendation Engine</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Prioritized strategic actions recommended by enterprise AI algorithms to optimize revenue and throughput.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecs.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 transition-all hover:bg-white hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {rec.category}
                </span>

                <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${
                  rec.priority === 'HIGH' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-sky-100 text-sky-800 border-sky-300'
                }`}>
                  {rec.priority} PRIORITY
                </span>
              </div>

              <h3 className="font-extrabold text-xs text-slate-900">{rec.actionTitle}</h3>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{rec.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {rec.impactSummary}
              </span>

              <button
                onClick={() => onExecuteRecommendation && onExecuteRecommendation(rec.actionTitle)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs inline-flex items-center gap-1 transition-all"
              >
                <span>Execute Action</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
