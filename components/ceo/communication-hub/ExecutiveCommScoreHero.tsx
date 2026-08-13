'use client';

import React from 'react';
import { MessageSquare, Sparkles, Send, CheckCircle2, TrendingUp, Cpu, Bell, Shield } from 'lucide-react';

interface ExecutiveCommScoreHeroProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenCompose: () => void;
}

export function ExecutiveCommScoreHero({
  activeTab,
  onTabChange,
  onOpenCompose,
}: ExecutiveCommScoreHeroProps) {
  const tabs = [
    { id: 'inbox', label: 'Communication Queue' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'meetings', label: 'Meetings' },
    { id: 'threads', label: 'Leadership Threads' },
    { id: 'board', label: 'Board Vault' },
    { id: 'pr', label: 'PR & Media' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6 text-left" suppressHydrationWarning>
      {/* 1. Header Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-slate-200 pb-6">
        {/* Left: Overall Communication Health Score */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white space-y-2 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black uppercase text-sky-400 tracking-wider">
              OVERALL COMMUNICATION SCORE
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> ↑ 4.2% Growth
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">96 <span className="text-xl text-slate-400 font-normal">/ 100</span></span>
            <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-500 text-white uppercase shadow-sm">
              EXCELLENT
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium pt-1 leading-relaxed">
            Board engagement 98%, Employee pulse 94%. Technology department has lowest acknowledgment rate.
          </p>
        </div>

        {/* Right: AI Summary & Compose Action */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 shadow-md">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-mono font-black uppercase text-purple-700">
                TODAY'S AI COMMUNICATION SUMMARY
              </span>
              <p className="font-extrabold text-slate-900">
                3 announcements published, 1 investor response pending, Board meeting tomorrow.
              </p>
              <p className="text-slate-600 text-[11px]">
                Recommended Action: <strong className="text-purple-800">Send reminder broadcast to Technology team.</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Real-Time Broadcast Engine Active</span>
            </div>

            <button
              onClick={onOpenCompose}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Compose Message / Broadcast</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Workspace Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-4 py-2 rounded-xl font-extrabold transition-all border whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
