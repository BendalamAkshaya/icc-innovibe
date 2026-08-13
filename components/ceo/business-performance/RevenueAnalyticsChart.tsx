'use client';

import React, { useState } from 'react';
import { RevenueAnalyticsPoint } from '../../../lib/types';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Activity, Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';

interface RevenueAnalyticsChartProps {
  dataByRange: Record<string, RevenueAnalyticsPoint[]>;
}

export function RevenueAnalyticsChart({ dataByRange }: RevenueAnalyticsChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'profit' | 'expenses' | 'netProfit'>('revenue');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'7D' | '30D' | '6M'>('6M');
  const [showComparison, setShowComparison] = useState(true);

  const activeData = dataByRange[selectedTimeFilter] || dataByRange['6M'];

  const metricConfigs = {
    revenue: { label: 'Revenue', color: '#0280d2', gradientStop: '#0280d2' },
    profit: { label: 'Gross Profit', color: '#10b981', gradientStop: '#10b981' },
    expenses: { label: 'Expenses', color: '#ef4444', gradientStop: '#ef4444' },
    netProfit: { label: 'Net Profit', color: '#8b5cf6', gradientStop: '#8b5cf6' },
  };

  const currentConfig = metricConfigs[selectedMetric];

  const timeFilterLabels: Record<string, string> = {
    '7D': 'Last 7 Days',
    '30D': 'This Month',
    '6M': '6 Months (2026)',
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4" suppressHydrationWarning>
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-sky-600" />
            <h2 className="text-base font-extrabold text-slate-900">Revenue & Profitability Analytics</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Interactive trajectory across revenue streams, operating costs, and net margins.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Metric Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['revenue', 'profit', 'expenses', 'netProfit'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all capitalize ${
                  selectedMetric === m ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {metricConfigs[m].label}
              </button>
            ))}
          </div>

          {/* Time Range Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['7D', '30D', '6M'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeFilter(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                  selectedTimeFilter === t ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Comparison Toggle */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              showComparison
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showComparison ? '✓ Prev Period On' : '+ Compare Prev'}
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="mainMetricGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentConfig.gradientStop} stopOpacity={0.35} />
                <stop offset="95%" stopColor={currentConfig.gradientStop} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="period" stroke="#64748b" tick={{ fontSize: 12, fontWeight: 600 }} />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 12, fontWeight: 600 }}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                padding: '12px',
              }}
              formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
            />
            
            <Area
              type="monotone"
              dataKey={selectedMetric}
              name={currentConfig.label}
              stroke={currentConfig.color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#mainMetricGradient)"
            />

            {showComparison && (
              <Line
                type="monotone"
                dataKey="previousRevenue"
                name="Previous Period"
                stroke="#cbd5e1"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: currentConfig.color }} />
          <span>Active Metric: <strong className="text-slate-800">{currentConfig.label}</strong></span>
          {showComparison && (
            <span className="text-slate-400 border-l border-slate-200 pl-2">
              Dashed line represents previous period comparison
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-emerald-600 font-bold">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Showing {timeFilterLabels[selectedTimeFilter]}</span>
        </div>
      </div>
    </div>
  );
}
