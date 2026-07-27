'use client';

import React from 'react';
import { ScheduledReportItem } from '../../../lib/types';
import { Clock, Mail, FileText, CheckCircle2, Play, Pause } from 'lucide-react';

interface ScheduledReportsWidgetProps {
  schedules: ScheduledReportItem[];
  onToggleSchedule?: (id: string) => void;
}

export function ScheduledReportsWidget({ schedules, onToggleSchedule }: ScheduledReportsWidgetProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Automated Scheduled Reports Engine</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          4 Active Jobs
        </span>
      </div>

      <div className="space-y-3">
        {schedules.map((sch) => (
          <div
            key={sch.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-slate-100/80"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {sch.scheduleCron}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900">{sch.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-medium">
                <span>Recipients: <strong className="text-slate-800">{sch.recipients}</strong></span>
                <span>Channels: <strong className="text-indigo-600">{sch.deliveryChannels.join(', ')}</strong></span>
              </div>
            </div>

            <button
              onClick={() => onToggleSchedule && onToggleSchedule(sch.id)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold text-[11px] shadow-xs shrink-0 flex items-center gap-1 transition-all"
            >
              {sch.status === 'ACTIVE' ? (
                <>
                  <Pause className="h-3 w-3 text-amber-600" />
                  <span>Pause Schedule</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-emerald-600" />
                  <span>Resume Schedule</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
