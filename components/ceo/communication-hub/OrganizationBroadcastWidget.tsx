'use client';

import React, { useState } from 'react';
import { Radio, Send, Bell, Mail, Smartphone, Monitor } from 'lucide-react';

interface OrganizationBroadcastWidgetProps {
  onSendBroadcast: (target: string, message: string) => void;
}

export function OrganizationBroadcastWidget({ onSendBroadcast }: OrganizationBroadcastWidgetProps) {
  const [selectedTarget, setSelectedTarget] = useState('Entire Company (148 Employees)');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [channelPush, setChannelPush] = useState(true);
  const [channelEmail, setChannelEmail] = useState(true);
  const [channelWeb, setChannelWeb] = useState(true);

  const targets = [
    'Entire Company (148 Employees)',
    'Kakinada Main Hub Team',
    'Field Operations & Service Mechanics',
    'Technology & AI Engineering Dept',
    'C-Suite Leadership Council',
  ];

  const handleBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    onSendBroadcast(selectedTarget, broadcastMessage);
    setBroadcastMessage('');
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-purple-600 animate-pulse" />
          <h2 className="text-base font-extrabold text-slate-900">Instant Organization Broadcast Engine</h2>
        </div>
        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900 border border-purple-300">
          Push • Email • Web Dashboard
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {/* Target Audience Dropdown */}
        <div className="space-y-1">
          <label className="font-extrabold text-slate-700">Target Audience:</label>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-purple-500"
          >
            {targets.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Message Input */}
        <div className="space-y-1">
          <label className="font-extrabold text-slate-700">Broadcast Message:</label>
          <textarea
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="Type urgent executive broadcast message to dispatch across mobile apps and web..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-purple-500 h-20"
          />
        </div>

        {/* Channels Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-purple-200/60">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={channelPush} onChange={(e) => setChannelPush(e.target.checked)} className="rounded text-purple-600" />
              <Smartphone className="h-3.5 w-3.5 text-purple-600" /> Push Notification
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={channelEmail} onChange={(e) => setChannelEmail(e.target.checked)} className="rounded text-purple-600" />
              <Mail className="h-3.5 w-3.5 text-purple-600" /> Email Briefing
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={channelWeb} onChange={(e) => setChannelWeb(e.target.checked)} className="rounded text-purple-600" />
              <Monitor className="h-3.5 w-3.5 text-purple-600" /> Web Banner
            </label>
          </div>

          <button
            onClick={handleBroadcast}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Dispatch Broadcast</span>
          </button>
        </div>
      </div>
    </div>
  );
}
