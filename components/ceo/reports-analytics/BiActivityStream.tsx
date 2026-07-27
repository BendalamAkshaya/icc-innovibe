'use client';

import React from 'react';
import { Activity, Clock, CheckCircle2, FileText, Download, ShieldCheck } from 'lucide-react';

export function BiActivityStream() {
  const events = [
    { time: '08:00 AM', title: 'Executive Morning Intelligence Brief Compiled', type: 'AI_BRIEF', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { time: '09:15 AM', title: 'Q2 Gross Revenue & Ledger Telemetry Synced', type: 'DATA_SYNC', bg: 'bg-sky-100 text-sky-800 border-sky-200' },
    { time: '10:30 AM', title: '148 Connected EV Fleet Battery Degradation Audit', type: 'FLEET_AUDIT', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { time: '11:20 AM', title: 'Customer Satisfaction Index Report Generated', type: 'REPORT_GEN', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
    { time: '12:00 PM', title: 'Encrypted Board Pack PPTX Package Exported', type: 'EXPORT', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
    { time: '12:45 PM', title: 'Ather Spare Parts Lead-Time Warning Cleared', type: 'SCM_ALERT', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { time: '01:30 PM', title: 'Vijayawada Service Queue SLA Stabilized', type: 'OPS_SLA', bg: 'bg-sky-100 text-sky-800 border-sky-200' },
    { time: '02:15 PM', title: 'Quarterly EBITDA & Operating Margin Report Approved', type: 'APPROVAL', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
            <h2 className="text-base font-extrabold text-slate-900">Business Intelligence Activity Stream</h2>
          </div>
          <span className="text-[10px] text-emerald-600 font-mono font-extrabold flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" /> OPERATIONAL NARRATIVE
          </span>
        </div>

        <div className="space-y-2.5">
          {events.map((e, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs hover:bg-slate-100/80 transition-all">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-black text-slate-400 shrink-0">{e.time}</span>
                <p className="font-extrabold text-slate-900 leading-snug">{e.title}</p>
              </div>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase shrink-0 ${e.bg}`}>
                {e.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BI Engine Status Footer */}
      <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between text-xs mt-4">
        <div className="space-y-0.5">
          <span className="text-[9px] font-mono text-emerald-400 font-black uppercase">BI PIPELINE STATUS</span>
          <p className="font-extrabold text-slate-100">100% Operational • 0 Latency</p>
        </div>
        <ShieldCheck className="h-5 w-5 text-emerald-400" />
      </div>
    </div>
  );
}
