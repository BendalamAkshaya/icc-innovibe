'use client';

import React from 'react';
import { ExecutiveMeetingItem } from '../../../lib/types';
import { Calendar, Clock, MapPin, Users, Sparkles, ArrowUpRight } from 'lucide-react';

interface ExecutiveMeetingCenterProps {
  meetings: ExecutiveMeetingItem[];
  onViewMeetingDetails?: (title: string) => void;
}

export function ExecutiveMeetingCenter({ meetings, onViewMeetingDetails }: ExecutiveMeetingCenterProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Executive Meeting Center & Agendas</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          Upcoming Schedule
        </span>
      </div>

      <div className="space-y-3">
        {meetings.map((mtg) => (
          <div
            key={mtg.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 transition-all hover:bg-white hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {mtg.meetingType}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900">{mtg.title}</h3>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" /> {mtg.dateTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" /> {mtg.location}
                </span>
              </div>
            </div>

            {/* AI Pre-Meeting Briefing */}
            {mtg.aiMeetingSummary && (
              <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200 flex items-start gap-2 text-xs">
                <Sparkles className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <p className="font-bold text-slate-800 leading-relaxed">{mtg.aiMeetingSummary}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400">
                Action Items: <strong className="text-indigo-700">{mtg.actionItems.length} Key Deliverables</strong>
              </span>

              <button
                onClick={() => onViewMeetingDetails && onViewMeetingDetails(mtg.title)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold text-[11px] shadow-xs inline-flex items-center gap-1 transition-all"
              >
                <span>View Full Agenda & Minutes</span>
                <ArrowUpRight className="h-3 w-3 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
