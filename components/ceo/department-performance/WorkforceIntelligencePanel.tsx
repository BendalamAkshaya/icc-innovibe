'use client';

import React from 'react';
import { Users, UserPlus, UserMinus, Clock, Briefcase, Award, GraduationCap, CheckCircle2 } from 'lucide-react';

export function WorkforceIntelligencePanel() {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-5 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-sky-600" />
          <h2 className="text-base font-extrabold text-slate-900">Workforce Intelligence & Talent Analytics</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
          148 Active Employees
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">New Hires Q2</span>
          <p className="text-xl font-black text-emerald-600 mt-1">+12 Staff</p>
          <span className="text-[10px] text-slate-500 font-medium">96% Onboarding Score</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Attrition Rate</span>
          <p className="text-xl font-black text-slate-900 mt-1">2.1%</p>
          <span className="text-[10px] text-emerald-600 font-bold">Well below industry 8%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Open Positions</span>
          <p className="text-xl font-black text-amber-600 mt-1">8 Roles</p>
          <span className="text-[10px] text-slate-500 font-medium">Avg 18 days time-to-hire</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Avg Experience</span>
          <p className="text-xl font-black text-indigo-600 mt-1">4.2 Years</p>
          <span className="text-[10px] text-slate-500 font-medium">High Senior Retention</span>
        </div>
      </div>

      {/* Employment Type Distribution Stream */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
          <span>Executive Workforce Distribution</span>
          <span className="text-slate-500 font-mono">156 Total Capacity Units</span>
        </div>

        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
          <div className="h-full bg-indigo-600" style={{ width: '75%' }} title="118 Full Time Staff (75%)" />
          <div className="h-full bg-sky-500" style={{ width: '15%' }} title="24 Contract Staff (15%)" />
          <div className="h-full bg-emerald-500" style={{ width: '5%' }} title="6 Interns (5%)" />
          <div className="h-full bg-amber-400" style={{ width: '5%' }} title="8 Vacancies (5%)" />
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-1 flex-wrap">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-indigo-600" /> Full Time (118)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Contract (24)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Intern (6)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Open Vacancies (8)</span>
        </div>
      </div>
    </div>
  );
}
