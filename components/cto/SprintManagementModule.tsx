'use client';

import React, { useState } from 'react';
import {
  Kanban,
  CheckCircle2,
  Clock,
  Users,
  AlertTriangle,
  Zap,
  ChevronRight,
  TrendingUp,
  FileText,
  Wand2,
  Search,
  Filter,
  Layers,
  Sparkles,
} from 'lucide-react';

export function SprintManagementModule() {
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);

  return (
    <div className="space-y-6 text-left">
      {/* PAGE HEADER & ACTIONS TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Kanban className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sprint Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitor engineering execution, team delivery performance, sprint health, and development efficiency across InnoVibe Mobility squads.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => alert('Sprint Status: Sprint 42 (92% Complete)')} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Sprint 42 (92% Complete)
          </button>
          <button onClick={() => alert('Opening Velocity Matrix...')} className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4" /> Team Velocity Matrix
          </button>
          <button onClick={() => alert('Exporting Sprint Report PDF...')} className="px-3 py-1.5 rounded-xl bg-white text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 hover:bg-slate-50">
            <FileText className="h-4 w-4 text-purple-600" /> Export Sprint Report
          </button>
        </div>
      </div>

      {/* SECTION 1: CURRENT SPRINT HEALTH */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Current Sprint Health</h2>
              <p className="text-xs text-slate-500">Sprint status, story points completion & delivery prediction</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Sprint 42 Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Planned Story Points</span>
            <p className="text-2xl font-black text-slate-900 mt-1">180 Points</p>
            <span className="text-[11px] text-slate-500">Allocated across 4 squads</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Completed Points</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">165 Points</p>
            <span className="text-[11px] text-emerald-600 font-bold">91.6% Completion Rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Remaining Points</span>
            <p className="text-2xl font-black text-amber-600 mt-1">15 Points</p>
            <span className="text-[11px] text-amber-600 font-medium">3 Days Remaining</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Delivery Prediction</span>
            <p className="text-2xl font-black text-purple-600 mt-1">On Schedule</p>
            <span className="text-[11px] text-slate-500">Predicted 98% Completion</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: TEAM VELOCITY & CAPACITY */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Team Velocity & Capacity</h2>
              <p className="text-xs text-slate-500">Engineering squad capacity, velocity trend, and workload distribution</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">EV Telematics Squad</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">100% On Track</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Capacity: <strong>48 Points</strong></div>
              <div>Completed: <strong className="text-emerald-600">44 Points (91%)</strong></div>
              <div>Tech Lead: <strong>Marcus Chen</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">Mobile Engineering</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">BLE Latency Sync</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Capacity: <strong>42 Points</strong></div>
              <div>Completed: <strong className="text-amber-600">36 Points (85%)</strong></div>
              <div>Tech Lead: <strong>Priya Sharma</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">AI / ML Research Pod</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">100% On Track</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Capacity: <strong>50 Points</strong></div>
              <div>Completed: <strong className="text-emerald-600">48 Points (96%)</strong></div>
              <div>Tech Lead: <strong>Dr. Elena Rostova</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">Cloud Infra & Security</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">100% On Track</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Capacity: <strong>40 Points</strong></div>
              <div>Completed: <strong className="text-emerald-600">37 Points (92%)</strong></div>
              <div>Tech Lead: <strong>Tariq Mansoor</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
