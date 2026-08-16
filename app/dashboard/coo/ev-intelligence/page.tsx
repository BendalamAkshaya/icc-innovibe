'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { Cpu, Sparkles, Activity } from 'lucide-react';
import Link from 'next/link';

function EVIntelligenceInner() {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') || 'health' : 'health';

  return (
    <RouteGuard module="ev-intelligence">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-600" />
              EV Health Intelligence & AI Diagnostics
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Battery Cell Degradation • Risk Scoring • Predictive Maintenance • Telemetry Engine
            </p>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex space-x-2 border-b border-slate-200 bg-white px-4 pt-3 rounded-xl">
          {[
            { id: 'health', label: 'EV Health Reports', icon: Cpu },
            { id: 'ai', label: 'AI Diagnostics', icon: Sparkles },
            { id: 'telemetry', label: 'Telemetry Dashboard', icon: Activity },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <Link
                key={t.id}
                href={`/dashboard/coo/ev-intelligence?tab=${t.id}`}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  active
                    ? 'border-purple-600 text-purple-700 bg-purple-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Tab Views */}
        {currentTab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase">Avg Battery Health</span>
              <span className="text-3xl font-black text-purple-700 block mt-2">94.2 / 100</span>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Optimal Fleet Range</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase">High Risk Alerts</span>
              <span className="text-3xl font-black text-rose-600 block mt-2">2 Vehicles</span>
              <p className="text-xs text-rose-600 font-semibold mt-1">Immediate Cell Balancing Needed</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase">AI Predictive Triggers</span>
              <span className="text-3xl font-black text-blue-600 block mt-2">4 Suggestions</span>
              <p className="text-xs text-slate-500 mt-1">Preventive Brake Pad Replacement</p>
            </div>
          </div>
        )}

        {(currentTab === 'ai' || currentTab === 'telemetry') && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI Diagnostic Terminal Logs ({currentTab.toUpperCase()})
            </h3>
            <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs space-y-2">
              <div>[AI-DIAGNOSTICS] 10:14:02 - KA-01-EQ-9983: Battery Temp 54.2°C exceeds threshold (50°C). Risk Score: 88.</div>
              <div>[AI-DIAGNOSTICS] 10:10:12 - KA-01-EQ-9982: Regenerative braking efficiency optimal at 98.4%.</div>
              <div>[AI-DIAGNOSTICS] 10:05:00 - Telemetry sync complete across 148 active vehicles.</div>
            </div>
          </div>
        )}
      </div>
    </RouteGuard>
  );
}

export default function EVIntelligencePage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading...</div>}>
      <EVIntelligenceInner />
    </Suspense>
  );
}


