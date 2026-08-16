'use client';

import React from 'react';
import {
  FileText,
  BarChart3,
  TrendingUp,
  HeartPulse,
  Brain,
  CheckCircle2,
  Sliders,
  Calendar,
} from 'lucide-react';

export function ReportsAnalyticsModule() {
  return (
    <div className="space-y-6 text-left">
      {/* PAGE HEADER & ACTIONS TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reports & Technology Analytics</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Provide the CTO with technology intelligence, performance analysis, strategic insights, and decision support for managing InnoVibe Mobility operations.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => alert('Generating CTO Intelligence Report...')} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-purple-700">
            <FileText className="h-4 w-4" /> Generate Technology Report
          </button>
          <button onClick={() => alert('Exporting Executive Summary PDF...')} className="px-3 py-1.5 rounded-xl bg-white text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 hover:bg-slate-50">
            Export Executive Summary
          </button>
        </div>
      </div>

      {/* SECTION 1: TECHNOLOGY EXECUTIVE HEALTH VIEW */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Technology Executive Health View</h2>
              <p className="text-xs text-slate-500">Visual technology health snapshot & domain maturity index</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Enterprise Health 94% Optimal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">Software Engineering</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Optimal (94%)</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex justify-between"><span>Trend Direction:</span> <strong className="text-emerald-600">Improving ↗</strong></div>
              <div className="flex justify-between"><span>Attention Level:</span> <strong>Low</strong></div>
              <div className="flex justify-between"><span>Tech Maturity:</span> <strong className="text-purple-600">Level 4 (Advanced)</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">Cloud Infrastructure</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Healthy (92%)</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex justify-between"><span>Trend Direction:</span> <strong>Stable ➔</strong></div>
              <div className="flex justify-between"><span>Attention Level:</span> <strong className="text-amber-600">Monitor Scaling</strong></div>
              <div className="flex justify-between"><span>Tech Maturity:</span> <strong className="text-purple-600">Level 4 (Cloud Native)</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">AI Platforms</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Excellent (96%)</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex justify-between"><span>Trend Direction:</span> <strong className="text-emerald-600">Improving ↗</strong></div>
              <div className="flex justify-between"><span>Attention Level:</span> <strong className="text-purple-600">Monitor Latency</strong></div>
              <div className="flex justify-between"><span>Tech Maturity:</span> <strong className="text-purple-600">Level 5 (Autonomous)</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
