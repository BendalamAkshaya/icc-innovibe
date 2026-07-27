'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Sliders, Calendar, TrendingUp, BarChart2 } from 'lucide-react';

export function StudioDashboardAnalytics() {
  const [timeframe, setTimeframe] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY'>('MONTHLY');

  const monthlyTrendData = [
    { month: 'Jan 26', revenue: 8.2, fleetSoh: 96.5, csat: 96, opsSla: 96 },
    { month: 'Feb 26', revenue: 9.1, fleetSoh: 95.8, csat: 97, opsSla: 95 },
    { month: 'Mar 26', revenue: 10.4, fleetSoh: 95.2, csat: 97, opsSla: 94 },
    { month: 'Apr 26', revenue: 11.2, fleetSoh: 94.8, csat: 98, opsSla: 95 },
    { month: 'May 26', revenue: 11.8, fleetSoh: 94.5, csat: 98, opsSla: 94 },
    { month: 'Jun 26', revenue: 12.45, fleetSoh: 94.2, csat: 98.2, opsSla: 94.8 },
  ];

  const branchPerformanceData = [
    { branch: 'Kakinada', revenue: 3.98, sla: 98, utilization: 96 },
    { branch: 'Vijayawada', revenue: 3.12, sla: 94, utilization: 94 },
    { branch: 'Rajahmundry', revenue: 2.35, sla: 95, utilization: 92 },
    { branch: 'Vizag', revenue: 1.85, sla: 93, utilization: 90 },
    { branch: 'Guntur', revenue: 1.15, sla: 88, utilization: 86 },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">Analytics Studio & Dynamic Data Exploration</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Interactive multi-metric trend visualization and branch performance benchmarking.
          </p>
        </div>

        {/* Timeframe Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                timeframe === t ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Revenue Trajectory & Operating Growth */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900">Monthly Revenue Trajectory (₹ Lakhs)</h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +51.8% H1 Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Branch Revenue & SLA Benchmarking */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900">Branch Revenue vs Service SLA %</h3>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Kakinada Lead Hub
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="branch" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Revenue (₹L)" />
                <Bar dataKey="sla" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="SLA Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
