'use client';

import React from 'react';
import { DelegatedTaskItem } from '../../../lib/types';
import { UserCheck, Clock, ArrowUpRight, BellRing } from 'lucide-react';

interface DelegationCenterTableProps {
  tasks: DelegatedTaskItem[];
  onSendReminder?: (taskTitle: string, assignee: string) => void;
}

export function DelegationCenterTable({ tasks, onSendReminder }: DelegationCenterTableProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Executive Delegation Tracking Cards</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor tasks delegated to CFO, COO, HR, and Tech leads with progress meters.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
          4 Active Delegations
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 flex-1">
        {tasks.map((tsk) => (
          <div key={tsk.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between hover:bg-slate-100/80 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {tsk.department}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">Due: {tsk.deadline}</span>
              </div>

              <h3 className="font-extrabold text-xs text-slate-900 leading-tight">{tsk.taskTitle}</h3>
              <p className="text-[11px] text-slate-500 font-bold mt-1">Lead: <strong className="text-slate-800">{tsk.assignedTo}</strong></p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="text-[10px] text-slate-400 font-medium truncate">{tsk.lastUpdate}</span>
                <span className="font-mono font-black text-indigo-600">{tsk.progressPercent}%</span>
              </div>

              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${tsk.status === 'DELAYED' ? 'bg-red-500' : 'bg-indigo-600'}`}
                  style={{ width: `${tsk.progressPercent}%` }}
                />
              </div>

              <div className="pt-1 text-right">
                <button
                  onClick={() => onSendReminder && onSendReminder(tsk.taskTitle, tsk.assignedTo)}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-purple-700 font-extrabold text-[10px] shadow-xs inline-flex items-center gap-1 transition-all"
                >
                  <BellRing className="h-3 w-3 text-purple-600" />
                  <span>Ping Lead</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
