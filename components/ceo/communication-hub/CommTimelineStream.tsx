'use client';

import React from 'react';
import { Activity, Clock, Send, MessageSquare, ShieldCheck, Globe } from 'lucide-react';

export function CommTimelineStream() {
  const events = [
    { time: '08:30 AM', title: 'Q2 All-Hands Announcement Published', channel: 'Broadcast', target: 'All Staff (148)', status: 'PUBLISHED', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
    { time: '09:00 AM', title: 'Board of Directors Audit Reply Received', channel: 'Board Vault', target: 'CFO Vikram Mehta', status: 'RECEIVED', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { time: '10:15 AM', title: 'Sequoia Capital Q2 Portfolio Feedback', channel: 'Investor Update', target: 'Sequoia VC', status: 'RECEIVED', bg: 'bg-sky-100 text-sky-800 border-sky-200' },
    { time: '11:00 AM', title: 'Townhall Meeting Invitation Dispatched', channel: 'Meeting Center', target: 'Operations & Tech Leads', status: 'SCHEDULED', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
    { time: '12:30 PM', title: 'Emergency SLA Broadcast Sent to Guntur Hub', channel: 'Broadcast', target: 'Field Technicians', status: 'PUBLISHED', bg: 'bg-red-100 text-red-800 border-red-200' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900">Communication History Stream</h2>
        </div>
        <span className="text-[10px] text-purple-600 font-mono font-extrabold flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" /> LIVE TIMELINE
        </span>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-80 pr-1">
        {events.map((e, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-black text-slate-400 shrink-0">{e.time}</span>
              <div>
                <p className="font-extrabold text-slate-900">{e.title}</p>
                <p className="text-[10px] text-slate-500 font-semibold">{e.channel} • {e.target}</p>
              </div>
            </div>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase shrink-0 ${e.bg}`}>
              {e.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
