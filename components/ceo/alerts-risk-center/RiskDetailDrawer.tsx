'use client';

import React from 'react';
import { RiskDetectionItem } from '../../../lib/types';
import { X, ShieldAlert, Clock, AlertTriangle, CheckCircle2, ArrowRight, UserCheck, FileText } from 'lucide-react';

interface RiskDetailDrawerProps {
  risk: RiskDetectionItem | null;
  onClose: () => void;
  onExecuteMitigation: (title: string) => void;
}

export function RiskDetailDrawer({ risk, onClose, onExecuteMitigation }: RiskDetailDrawerProps) {
  if (!risk) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in" suppressHydrationWarning>
      <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between p-6 space-y-6 text-left border-l border-slate-200">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-red-100 text-red-700 border border-red-200">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {risk.severity} SEVERITY • {risk.category}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">{risk.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SLA Countdown Timer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white flex items-center justify-between shadow-md">
            <div>
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-red-100 block">
                SLA BREACH COUNTDOWN TIMER
              </span>
              <p className="text-xl font-black font-mono mt-0.5">02h 13m 44s Remaining</p>
            </div>
            <div className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-xs">
              <Clock className="h-6 w-6 animate-pulse" />
            </div>
          </div>

          {/* AI Root Cause Analysis */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
            <span className="text-[10px] font-black uppercase text-sky-400">AI ROOT CAUSE DIAGNOSIS</span>
            <p className="text-slate-200 font-semibold leading-relaxed">
              "Incident triggered by peak technician load exceeding Vijayawada & Guntur hub capacity. 2 technicians on leave combined with Ather spare part delivery delay."
            </p>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Business Impact</span>
              <p className="text-sm font-black text-slate-900">{risk.impactPotential}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Financial Exposure</span>
              <p className="text-sm font-black text-red-600">₹45,000 / day</p>
            </div>
          </div>

          {/* Incident Timeline */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Incident Lifecycle Timeline</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900">09:12 AM • Automated Risk Triggered</p>
                  <p className="text-[11px] text-slate-500">IoT stream telemetry registered threshold breach.</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">ALERT</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900">09:18 AM • AI Root Cause Generated</p>
                  <p className="text-[11px] text-slate-500">Cross-referenced SCM inventory & shift roster.</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">ANALYSIS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 font-extrabold text-xs text-slate-700 hover:bg-slate-50">
            Dismiss
          </button>
          <button
            onClick={() => {
              onExecuteMitigation(risk.title);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-500/20 flex items-center gap-2"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Execute Recommended Mitigation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
