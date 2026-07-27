'use client';

import React from 'react';
import { MessageSquare, Bell, Calendar, FileText, Sparkles, UserCheck, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface ExecutiveCommInboxProps {
  onOpenCompose: () => void;
  onOpenItem: (title: string) => void;
}

export function ExecutiveCommInbox({ onOpenCompose, onOpenItem }: ExecutiveCommInboxProps) {
  const queue = [
    { id: 'i1', type: 'BOARD', title: 'Q2 Financial Audit & Board Vault Signoff', from: 'Vikram Mehta (CFO)', time: '15 mins ago', status: 'ACTION_REQUIRED', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'i2', type: 'INVESTOR', title: 'Sequoia Partner Inquiry regarding Coastal Expansion', from: 'Priya Sharma (Sequoia India)', time: '42 mins ago', status: 'PENDING_REPLY', badge: 'bg-sky-100 text-sky-800 border-sky-200' },
    { id: 'i3', type: 'PULSE_ALERT', title: 'Technology Dept Acknowledgment Rate Low (72%)', from: 'Employee Pulse AI', time: '1 hr ago', status: 'RECOMMENDATION', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'i4', type: 'MEETING', title: 'Emergency SLA Review with Field Operations VP', from: 'Sri Hari Kolusu (COO)', time: '2 hrs ago', status: 'SCHEDULED', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'i5', type: 'PR_MEDIA', title: 'Economic Times Press Release Draft Review', from: 'Sneha Roy (Marketing Head)', time: '3 hrs ago', status: 'REVIEW', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-600" />
            <h2 className="text-base font-extrabold text-slate-900">All-in-One Executive Communication Queue</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Single prioritized feed for broadcasts, board updates, investor inquiries, and employee pulse alerts.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
          5 Action Items Pending
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1">
        {queue.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenItem(item.title)}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${item.badge}`}>
                  {item.type}
                </span>
                <span className="text-xs font-bold text-slate-400">• {item.time}</span>
              </div>
              <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-purple-600 transition-colors">{item.title}</h3>
              <p className="text-[11px] text-slate-500 font-medium">From: <strong className="text-slate-800">{item.from}</strong></p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenItem(item.title);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 font-extrabold text-xs text-slate-800 shadow-xs flex items-center gap-1"
              >
                <span>Review Item</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
