'use client';

import React, { useState } from 'react';
import { RevenueSourceBreakdown } from '../../../lib/types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon, ChevronRight, Filter } from 'lucide-react';

interface RevenueBreakdownDonutProps {
  sources: RevenueSourceBreakdown[];
}

export function RevenueBreakdownDonut({ sources }: RevenueBreakdownDonutProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategoryData = sources.find((s) => s.category === selectedCategory);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between" suppressHydrationWarning>
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <PieIcon className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">Revenue Source Breakdown</h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            Interactive Donut
          </span>
        </div>

        {/* Donut Chart Canvas */}
        <div className="h-56 w-full relative my-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sources}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="amount"
                onClick={(entry) => setSelectedCategory(entry.category)}
                cursor="pointer"
              >
                {sources.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={entry.color}
                    stroke={selectedCategory === entry.category ? '#0f172a' : 'transparent'}
                    strokeWidth={selectedCategory === entry.category ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Info Overlay */}
          <div className="absolute pointer-events-none text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</p>
            <p className="text-lg font-black text-slate-900 leading-tight">₹12.45L</p>
          </div>
        </div>

        {/* Interactive Category Legend List */}
        <div className="space-y-1.5 mt-2 max-h-48 overflow-y-auto pr-1">
          {sources.map((item) => {
            const isSelected = selectedCategory === item.category;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(isSelected ? null : item.category)}
                className={`w-full p-2 rounded-xl text-left transition-all border flex items-center justify-between text-xs ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-bold truncate">{item.category}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`font-mono font-extrabold ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                    ₹{(item.amount / 1000).toFixed(0)}k
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-200/70 text-slate-600'
                  }`}>
                    {item.percentage}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Drill-Down Status */}
      {selectedCategory && activeCategoryData && (
        <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center justify-between">
          <div>
            <p className="font-bold">Active Drill-down: {activeCategoryData.category}</p>
            <p className="text-[10px] opacity-80">Contributes ₹{activeCategoryData.amount.toLocaleString('en-IN')} ({activeCategoryData.percentage}% of total)</p>
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-[10px] font-bold px-2 py-1 bg-white border border-sky-300 rounded-lg hover:bg-sky-100 text-sky-800"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}
