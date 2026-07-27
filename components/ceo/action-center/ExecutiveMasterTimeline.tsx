'use client';

import React from 'react';
import { Calendar, Clock, Video, FileCheck, MapPin, Users } from 'lucide-react';

export function ExecutiveMasterTimeline() {
  const schedule = [
    { time: '10:00 AM', title: 'Q2 Executive Board Strategy Meeting', type: 'BOARD', location: 'Boardroom / Zoom', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { time: '11:30 AM', title: 'Approve ₹48L Coastal EV Fleet Procurement', type: 'APPROVAL', location: 'Action Center Queue', badge: 'bg-red-100 text-red-800 border-red-200' },
    { time: '02:00 PM', title: 'Sequoia & Venture Capital Partner Call', type: 'INVESTOR', location: 'Virtual Conference', badge: 'bg-sky-100 text-sky-800 border-sky-200' },
    { time: '04:15 PM', title: 'Vijayawada Mega Hub Operational Audit', type: 'INSPECTION', location: 'Vijayawada Hub Bay', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { time: '05:30 PM', title: 'Sign n8n Automation Vendor Contract', type: 'SIGNATURE', location: 'Legal Document Vault', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-sky-600" />
          <h2 className="text-base font-extrabold text-slate-900">Unified Executive Schedule & Timeline</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
          Today's Sequence
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {schedule.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs hover:bg-slate-100/80 transition-all">
            <div className="flex items-center gap-3">
              <div className="text-center font-mono shrink-0 w-16">
                <span className="text-[11px] font-black text-slate-900 block">{item.time}</span>
              </div>
              <div className="space-y-0.5">
                <p className="font-extrabold text-slate-900 leading-tight">{item.title}</p>
                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" /> {item.location}
                </p>
              </div>
            </div>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase shrink-0 ${item.badge}`}>
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
