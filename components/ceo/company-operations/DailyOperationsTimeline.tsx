'use client';

import React from 'react';
import { OperationalTimelineEvent } from '../../../lib/types';
import { Clock, CheckCircle2, AlertTriangle, PhoneCall, Zap, Play } from 'lucide-react';

interface DailyOperationsTimelineProps {
  timeline: OperationalTimelineEvent[];
}

export function DailyOperationsTimeline({ timeline }: DailyOperationsTimelineProps) {
  const getCategoryBadge = (category: OperationalTimelineEvent['category']) => {
    switch (category) {
      case 'SERVICE_STARTED':
        return { bg: 'bg-sky-100 text-sky-800 border-sky-300', icon: Play, label: 'Shift Launch' };
      case 'SERVICE_COMPLETED':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2, label: 'Milestone' };
      case 'PEAK_HOURS':
        return { bg: 'bg-purple-100 text-purple-800 border-purple-300', icon: Zap, label: 'Peak Capacity' };
      case 'RSA_CALL':
        return { bg: 'bg-amber-100 text-amber-800 border-amber-300', icon: PhoneCall, label: 'Roadside Dispatch' };
      case 'EMERGENCY':
        return { bg: 'bg-red-100 text-red-800 border-red-300', icon: AlertTriangle, label: 'Bottleneck Alert' };
      default:
        return { bg: 'bg-slate-100 text-slate-800 border-slate-300', icon: Clock, label: 'Event' };
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-sky-600" />
            <h2 className="text-base font-extrabold text-slate-900">Today's Daily Operations Timeline</h2>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
            Realtime Operational Stream
          </span>
        </div>

        <p className="text-xs text-slate-500 font-medium mt-2 mb-4">
          Chronological milestone trail across technician routes, roadside dispatches, and peak queue events.
        </p>

        {/* Timeline Event Feed */}
        <div className="relative pl-6 space-y-4 border-l-2 border-slate-200">
          {timeline.map((event) => {
            const badge = getCategoryBadge(event.category);
            const Icon = badge.icon;

            return (
              <div key={event.id} className="relative group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white flex items-center justify-center ${
                  event.status === 'ALERT' ? 'bg-red-500 ring-4 ring-red-100' : 'bg-sky-600'
                }`} />

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 transition-all hover:bg-slate-100/70">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{event.time}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border inline-flex items-center gap-1 ${badge.bg}`}>
                      <Icon className="h-3 w-3" />
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs text-slate-900">{event.title}</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-center">
        <span className="text-[11px] text-slate-400 font-medium">
          Timeline syncs automatically with active GPS & Service Ticket logs
        </span>
      </div>
    </div>
  );
}
