'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Megaphone, Radio, Users, Calendar, Sliders, Loader2 } from 'lucide-react';

interface CommunicationQuickActionsProps {
  onActionClick?: (actionName: string) => void;
}

export function CommunicationQuickActions({ onActionClick }: CommunicationQuickActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (id: string, label: string) => {
    setLoadingAction(id);
    if (onActionClick) onActionClick(label);

    try {
      if (id === 'act_comm1') {
        // Create Announcement
        router.push(`/dashboard/ceo?module=communication-hub`);
      } else if (id === 'act_comm2') {
        // Broadcast Organization
        router.push(`/dashboard/ceo?module=communication-hub`);
      } else if (id === 'act_comm3') {
        // Leadership Discussions
        router.push(`/dashboard/ceo?module=communication-hub`);
      } else if (id === 'act_comm4') {
        // Meeting Center
        router.push(`/dashboard/ceo?module=communication-hub`);
      } else if (id === 'act_comm5') {
        // Communication Analytics
        router.push(`/dashboard/ceo?module=reports-analytics&category=COMMUNICATION`);
      }
    } finally {
      setTimeout(() => setLoadingAction(null), 400);
    }
  };

  const actions = [
    { id: 'act_comm1', label: 'Create Announcement', icon: Megaphone, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
    { id: 'act_comm2', label: 'Broadcast Organization', icon: Radio, color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { id: 'act_comm3', label: 'Leadership Discussions', icon: Users, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { id: 'act_comm4', label: 'Meeting Center', icon: Calendar, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'act_comm5', label: 'Communication Analytics', icon: Sliders, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-200 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Executive Communication Shortcuts</h3>
        <span className="text-[10px] font-bold text-slate-400">Context-Aware Controls</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          const isLoading = loadingAction === act.id;

          return (
            <button
              key={act.id}
              disabled={isLoading}
              onClick={() => handleAction(act.id, act.label)}
              className={`p-3.5 rounded-2xl border text-left flex items-center justify-between font-extrabold text-xs transition-all shadow-xs disabled:opacity-50 ${act.color}`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {isLoading ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : <Icon className="h-4 w-4 shrink-0" />}
                <span className="truncate">{act.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
