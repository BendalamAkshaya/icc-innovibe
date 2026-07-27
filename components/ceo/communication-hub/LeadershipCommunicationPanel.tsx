'use client';

import React from 'react';
import { LeadershipThread } from '../../../lib/types';
import { Users, MessageSquare, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

interface LeadershipCommunicationPanelProps {
  threads: LeadershipThread[];
  onOpenThread?: (title: string) => void;
}

export function LeadershipCommunicationPanel({ threads, onOpenThread }: LeadershipCommunicationPanelProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">C-Suite Leadership Discussion Threads</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Dedicated strategic collaboration workspace for CEO, COO, CTO, CFO, and HR heads.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          Executive Workspace
        </span>
      </div>

      <div className="space-y-3">
        {threads.map((th) => (
          <div
            key={th.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-100/80"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {th.departmentFocus}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Last activity: {th.lastActivity}</span>
              </div>

              <h3 className="font-extrabold text-xs text-slate-900">{th.topicTitle}</h3>
              <p className="text-xs text-slate-700 font-medium">{th.summarySnippet}</p>

              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold pt-1">
                <span>Participants: <strong className="text-slate-800">{th.leadParticipant}</strong></span>
                <span>Messages: <strong className="text-slate-800">{th.messagesCount}</strong></span>
                <span>Action Items: <strong className="text-indigo-600">{th.actionItemsCount} Action Items</strong></span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onOpenThread && onOpenThread(th.topicTitle)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-extrabold text-xs shadow-xs inline-flex items-center gap-1 transition-all"
              >
                <span>Join Discussion</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
