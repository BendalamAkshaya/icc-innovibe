'use client';

import React from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface AiPermissionAdvisorProps {
  onApplyFix: (roleName: string) => void;
}

export function AiPermissionAdvisor({ onApplyFix }: AiPermissionAdvisorProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600 animate-pulse" />
            <h2 className="text-base font-extrabold text-slate-900">AI Security Risk Analyzer & Governance Advisor</h2>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
            SOC2 Compliance Guard
          </span>
        </div>

        <div className="space-y-3 my-3">
          {/* Security Alert 1 */}
          <div className="p-4 rounded-2xl bg-white border border-red-200 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Privilege Escalation Warning (92% Risk)
              </span>
              <span className="text-xs font-mono font-bold text-red-600">HIGH RISK</span>
            </div>
            <p className="font-extrabold text-xs text-slate-900">
              Role "HR Director" has active access to <strong className="text-red-700">Financial P&L Statements</strong> & <strong className="text-red-700">BMS Diagnostic Remote Overrides</strong>.
            </p>
            <p className="text-[11px] text-slate-600 font-medium">
              Recommendation: Revoke P&L and BMS override from HR Director to enforce least-privilege compliance.
            </p>

            <button
              onClick={() => onApplyFix('HR Director')}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center gap-1 transition-all"
            >
              <span>Auto-Apply Least Privilege Fix</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Security Alert 2 */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900">2FA Enforcement Coverage</span>
              <span className="font-mono font-black text-emerald-700">100% Active</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">All 148 active staff accounts have mandatory SMS/TOTP 2FA enabled.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
