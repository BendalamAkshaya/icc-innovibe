'use client';

import React, { useState } from 'react';
import { CategoryInsightItem } from '../../../lib/types';
import { Layers, TrendingUp, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

interface BusinessCategoryInsightsProps {
  insights: CategoryInsightItem[];
}

export function BusinessCategoryInsights({ insights }: BusinessCategoryInsightsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Revenue', 'Operations', 'Fleet', 'Customers', 'Employees', 'Departments', 'Service Centers'];

  const filteredInsights = activeCategory === 'ALL'
    ? insights
    : insights.filter((i) => i.category === activeCategory);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-600" />
            <h2 className="text-base font-extrabold text-slate-900">Multi-Dimensional Business AI Insights</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Categorized executive intelligence synthesized from operational & financial telemetry.
          </p>
        </div>

        {/* Category Pill Tabs */}
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

      {/* Grid of Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredInsights.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
              item.trend === 'ATTENTION'
                ? 'bg-amber-50/40 border-amber-200'
                : 'bg-slate-50 border-slate-200 hover:border-sky-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-300">
                {item.category}
              </span>

              <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                item.trend === 'ATTENTION' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {item.metricHighlight}
              </span>
            </div>

            <p className="text-xs text-slate-800 font-bold leading-relaxed">{item.insightText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
