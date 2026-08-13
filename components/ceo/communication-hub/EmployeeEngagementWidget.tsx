'use client';

import React from 'react';
import { EmployeePulseData } from '../../../lib/types';
import { Heart, Smile, Award, MessageCircle, BarChart2 } from 'lucide-react';

interface EmployeeEngagementWidgetProps {
  pulse: EmployeePulseData;
}

export function EmployeeEngagementWidget({ pulse }: EmployeeEngagementWidgetProps) {
  const {
    pulseScore,
    organizationSentiment,
    surveyParticipationPercent,
    feedbackSubmittedCount,
    suggestionsCount,
    recognitionEventsCount,
  } = pulse;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500 fill-rose-400" />
          <h2 className="text-base font-extrabold text-slate-900">Organization Sentiment & Employee Pulse</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300">
          Pulse: {pulseScore}/100 PTS
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Pulse Score */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Pulse Score</span>
          <p className="text-xl font-black text-slate-900">{pulseScore} <span className="text-xs text-emerald-600">/100</span></p>
          <span className="text-[9px] font-extrabold text-emerald-600">Top 5% Industry Benchmark</span>
        </div>

        {/* Sentiment */}
        <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">Overall Sentiment</span>
          <p className="text-base font-black text-slate-900 mt-1">Very Positive</p>
          <span className="text-[9px] font-extrabold text-sky-600">High Employee Morale</span>
        </div>

        {/* Survey Participation */}
        <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">Survey Participation</span>
          <p className="text-xl font-black text-slate-900">{surveyParticipationPercent}%</p>
          <span className="text-[9px] font-extrabold text-purple-600">140 / 148 Staff Responded</span>
        </div>

        {/* Feedback Submitted */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">Ideas & Feedback</span>
          <p className="text-xl font-black text-slate-900">{feedbackSubmittedCount} <span className="text-xs text-indigo-600">Submitted</span></p>
          <span className="text-[9px] font-extrabold text-indigo-600">{suggestionsCount} Innovation Ideas</span>
        </div>

        {/* Recognition Events */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Founder Recognition</span>
          <p className="text-xl font-black text-slate-900">{recognitionEventsCount} <span className="text-xs text-amber-600">Awards</span></p>
          <span className="text-[9px] font-extrabold text-amber-600">Monthly Champions</span>
        </div>
      </div>
    </div>
  );
}
