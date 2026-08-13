'use client';

import React from 'react';
import { ExecutiveCalendarItem } from '../../../lib/types';
import { Calendar, Clock, MapPin, Users, ArrowUpRight } from 'lucide-react';

interface ExecutiveCalendarWidgetProps {
  events: ExecutiveCalendarItem[];
  onSelectEvent?: (title: string) => void;
}

export function ExecutiveCalendarWidget({ events, onSelectEvent }: ExecutiveCalendarWidgetProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Executive Schedule & Engagements</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          Next 7 Days
        </span>
      </div>

      <div className="space-y-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-slate-100/80"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {evt.category}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900">{evt.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" /> {evt.dateTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" /> {evt.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-slate-400" /> {evt.attendeesCount} Attendees
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectEvent && onSelectEvent(evt.title)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold text-[11px] shadow-xs shrink-0 flex items-center gap-1 transition-all"
            >
              <span>View Agenda</span>
              <ArrowUpRight className="h-3 w-3 text-slate-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
