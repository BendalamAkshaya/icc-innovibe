'use client';

import React, { useState } from 'react';
import { DecisionRequestItem } from '../../../lib/types';
import { X, Sparkles, AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface AiDecisionSimulatorModalProps {
  request: DecisionRequestItem | null;
  onClose: () => void;
}

export function AiDecisionSimulatorModal({ request, onClose }: AiDecisionSimulatorModalProps) {
  const [isSimulating, setIsSimulating] = useState(false);

  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" suppressHydrationWarning>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden space-y-0 relative text-left">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">AI Decision Rejection Simulator</h2>
              <p className="text-xs text-slate-400 font-medium">Predicting operational impact if request is rejected or delayed.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-black uppercase text-indigo-600">SIMULATION TARGET</span>
            <p className="font-extrabold text-sm text-slate-900">{request.title}</p>
            <p className="text-slate-500 font-medium">Budget: {request.financialImpact} • Department: {request.category}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Projected Rejection Consequences</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-0.5">
                <span className="text-[9px] font-black uppercase text-red-700 block">SLA Penalty Risk</span>
                <p className="text-lg font-black text-red-900">-12.4% SLA</p>
                <p className="text-[10px] text-red-700 font-medium">Guntur & Vijayawada Hubs</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-0.5">
                <span className="text-[9px] font-black uppercase text-amber-700 block">Operational Delay</span>
                <p className="text-lg font-black text-amber-900">14 Days</p>
                <p className="text-[10px] text-amber-700 font-medium">Postpones Fleet Expansion</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
              <span className="text-[9px] font-mono text-sky-400 uppercase font-bold">AI STRATEGIC ADVICE</span>
              <p className="text-slate-200 font-semibold leading-relaxed">
                "Rejecting this proposal will delay the South India Coastal expansion timeline by 14 days and create a spare parts inventory bottleneck. Recommendation: Approve with conditional Q3 milestone review."
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900">
            Close Simulator
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md shadow-sky-500/20"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
