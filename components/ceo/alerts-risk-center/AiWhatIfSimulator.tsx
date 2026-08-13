'use client';

import React, { useState } from 'react';
import { Sliders, Sparkles, ArrowRight, Play, RefreshCw, AlertTriangle } from 'lucide-react';

export function AiWhatIfSimulator() {
  const [selectedScenario, setSelectedScenario] = useState('sc1');
  const [isSimulating, setIsSimulating] = useState(false);

  const scenarios = [
    {
      id: 'sc1',
      title: 'What if Guntur Bay remains understaffed for 3 more days?',
      projectedSla: '-14.2%',
      customerImpact: '18 Direct Complaints',
      revenueLoss: '₹38,500',
      fleetDelay: '6 EVs Delayed',
      recommendation: 'Dispatch 2 field technicians from Vijayawada depot immediately.',
    },
    {
      id: 'sc2',
      title: 'What if 10% more EVs are onboarded next month without hiring?',
      projectedSla: '-8.5%',
      customerImpact: '24 Overdue AMC Inspections',
      revenueLoss: '₹62,000',
      fleetDelay: '12 EVs Delayed',
      recommendation: 'Approve expedited hiring of 4 junior technicians before July 1st.',
    },
    {
      id: 'sc3',
      title: 'What if Ather spare part delivery is delayed by 48 additional hours?',
      projectedSla: '-18.0%',
      customerImpact: '32 Pending Replacement Orders',
      revenueLoss: '₹95,000',
      fleetDelay: '14 EVs Grounded',
      recommendation: 'Authorize emergency procurement from alternative Hyderabad distributor.',
    },
  ];

  const active = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  const handleRunSimulation = (id: string) => {
    setIsSimulating(true);
    setSelectedScenario(id);
    setTimeout(() => setIsSimulating(false), 500);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-white space-y-5 text-left" suppressHydrationWarning>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-indigo-200/60">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
            <h2 className="text-base font-extrabold text-slate-900">AI What-If Business Impact Simulator</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Predict systemic SLA, revenue loss, and operational impact before taking strategic decisions.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-300">
          Predictive Decision Engine
        </span>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => handleRunSimulation(sc.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border text-left ${
              selectedScenario === sc.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* Simulation Results Board */}
      <div className="p-5 rounded-2xl bg-white border border-indigo-200 shadow-xs space-y-4">
        {isSimulating ? (
          <div className="p-8 text-center space-y-2">
            <RefreshCw className="h-6 w-6 text-indigo-600 animate-spin mx-auto" />
            <p className="text-xs font-extrabold text-slate-800">Simulating Risk Impact across 148 IoT streams...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                SIMULATION OUTPUT FORECAST
              </span>
              <span className="text-xs font-black text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" /> High Risk Projection
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-0.5">
                <span className="text-[9px] font-black uppercase text-red-700 block">Projected SLA Drop</span>
                <p className="text-xl font-black text-red-900">{active.projectedSla}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-0.5">
                <span className="text-[9px] font-black uppercase text-amber-700 block">Customer Impact</span>
                <p className="text-xs font-extrabold text-slate-900 mt-1">{active.customerImpact}</p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-0.5">
                <span className="text-[9px] font-black uppercase text-purple-700 block">Revenue Loss</span>
                <p className="text-xl font-black text-purple-900">{active.revenueLoss}</p>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-0.5">
                <span className="text-[9px] font-black uppercase text-sky-700 block">Fleet Delay</span>
                <p className="text-xs font-extrabold text-slate-900 mt-1">{active.fleetDelay}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs font-medium">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-sky-400 font-bold uppercase">AI OPTIMAL RECOMMENDATION</span>
                <p className="font-extrabold text-slate-100">{active.recommendation}</p>
              </div>
              <button
                onClick={() => alert(`Executing simulation recommendation: ${active.recommendation}`)}
                className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-xs shrink-0"
              >
                Execute Action
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
