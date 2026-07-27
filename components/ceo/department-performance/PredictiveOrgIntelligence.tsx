'use client';

import React from 'react';
import { Cpu, AlertTriangle, ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';

export function PredictiveOrgIntelligence() {
  const predictions = [
    { title: 'Customer Support Headcount Risk', desc: 'Support SLA load expected to rise 18% in Q3. Recommend hiring 2 additional support engineers.', risk: 'HIGH', confidence: '94%' },
    { title: 'Technology Infrastructure Budget Forecast', desc: 'AWS IoT telemetry bandwidth usage on track to exceed budget by 4.2%. Optimization recommended.', risk: 'MEDIUM', confidence: '89%' },
    { title: 'Operations Succession Readiness', desc: 'Field team leadership readiness score is optimal (92%). Zero disruption predicted during Q3 expansion.', risk: 'LOW', confidence: '96%' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900">Predictive Organizational Intelligence & Risk Forecasts</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
          AI Risk Engine Active
        </span>
      </div>

      <div className="space-y-3">
        {predictions.map((p) => (
          <div key={p.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900">{p.title}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                p.risk === 'HIGH' ? 'bg-red-100 text-red-800' : p.risk === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {p.risk} RISK ({p.confidence} Conf.)
              </span>
            </div>
            <p className="text-slate-600 font-medium text-[11px]">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
