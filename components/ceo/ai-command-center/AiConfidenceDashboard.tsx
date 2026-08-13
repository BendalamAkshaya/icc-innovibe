'use client';

import React from 'react';
import { Cpu, ShieldCheck, TrendingUp, BarChart2 } from 'lucide-react';

export function AiConfidenceDashboard() {
  const gauges = [
    { title: 'Revenue Forecast', score: 94, color: 'bg-emerald-500', target: '₹14.8L Forecast' },
    { title: 'Fleet IoT Telemetry', score: 97, color: 'bg-sky-500', target: '180 EVs Target' },
    { title: 'Customer Retention', score: 91, color: 'bg-indigo-600', target: '420 Subscriptions' },
    { title: 'Workforce Hiring', score: 89, color: 'bg-purple-500', target: '8 Roles Onboarding' },
    { title: 'SCM Spare Inventory', score: 88, color: 'bg-amber-500', target: '24hr Lead Threshold' },
  ];

  const predictions = [
    { metric: 'Quarterly Revenue', current: '₹12.45L', forecast: '₹14.80L', confidence: '94.0%', status: 'HIGH_ACCURACY' },
    { metric: 'Connected Fleet Size', current: '148 EVs', forecast: '180 EVs', confidence: '97.2%', status: 'OPTIMAL' },
    { metric: 'Active AMC Memberships', current: '342 Plans', forecast: '420 Plans', confidence: '89.5%', status: 'HIGH_ACCURACY' },
    { metric: 'Predictive Service Overhaul', current: '4 Vehicles', forecast: '12 Vehicles', confidence: '92.1%', status: 'OPTIMAL' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-5 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">AI Confidence Dashboard & Prediction Board</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
          93.8% Overall Model Accuracy
        </span>
      </div>

      {/* Confidence Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {gauges.map((g) => (
          <div key={g.title} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-700 truncate text-[11px]">{g.title}</span>
              <span className="font-mono font-black text-slate-900">{g.score}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${g.color}`} style={{ width: `${g.score}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate">{g.target}</p>
          </div>
        ))}
      </div>

      {/* Unified Prediction Board Table */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
          Unified AI Forecast Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-black">
                <th className="py-2">Prediction Metric</th>
                <th className="py-2">Current Value</th>
                <th className="py-2">Q2 Forecast</th>
                <th className="py-2 text-right">AI Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {predictions.map((p) => (
                <tr key={p.metric} className="font-semibold text-slate-800">
                  <td className="py-2.5 font-bold text-slate-900">{p.metric}</td>
                  <td className="py-2.5 font-mono">{p.current}</td>
                  <td className="py-2.5 font-mono text-emerald-600 font-bold">{p.forecast}</td>
                  <td className="py-2.5 text-right font-mono font-black text-indigo-600">{p.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
