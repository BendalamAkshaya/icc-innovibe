'use client';

import React from 'react';
import { X, ShieldCheck, Users, MapPin, Key, Clock, Check } from 'lucide-react';

interface RoleDetailDrawerProps {
  roleName: string | null;
  onClose: () => void;
  onRevokeAccess?: (roleName: string) => void;
}

export function RoleDetailDrawer({ roleName, onClose, onRevokeAccess }: RoleDetailDrawerProps) {
  if (!roleName) return null;

  const users = [
    { name: 'Sri Hari Kolusu', title: 'Founder & CEO', email: 'srihari@innovibe.in', status: 'ACTIVE' },
    { name: 'Vikram Mehta', title: 'Chief Financial Officer', email: 'vikram@innovibe.in', status: 'ACTIVE' },
    { name: 'Priya Sharma', title: 'Head of People & HR', email: 'priya@innovibe.in', status: 'ACTIVE' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in" suppressHydrationWarning>
      <div className="w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between p-6 space-y-6 text-left border-l border-slate-200">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 border border-indigo-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">{roleName} Governance Inspector</h2>
                <p className="text-xs text-slate-400 font-medium">Deep-dive permissions, user roster, and branch access scope.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Branch Access Scope */}
          <div className="space-y-2 text-xs">
            <span className="font-extrabold text-slate-800 uppercase tracking-wider block">Branch Access Scope</span>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-indigo-600" /> Coastal Region (Vizag, Kakinada, Vijayawada, Guntur)
                </span>
                <span className="text-[10px] font-mono font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">ENTIRE COMPANY</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Access scope applies across all 5 coastal operational service hubs.</p>
            </div>
          </div>

          {/* Assigned Roster */}
          <div className="space-y-2 text-xs">
            <span className="font-extrabold text-slate-800 uppercase tracking-wider block">Assigned User Roster (3 Staff)</span>
            <div className="space-y-2">
              {users.map((u, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-slate-900">{u.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{u.title} • {u.email}</p>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit History */}
          <div className="space-y-2 text-xs">
            <span className="font-extrabold text-slate-800 uppercase tracking-wider block">Audit Signoff History</span>
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-1.5 font-mono text-[11px]">
              <p><strong className="text-sky-400">[2026-07-25 10:15]</strong> CEO Sri Hari Kolusu updated security policy</p>
              <p><strong className="text-emerald-400">[2026-07-24 14:30]</strong> SOC2 Access audit verified clean</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 font-extrabold text-xs text-slate-700 hover:bg-slate-50">
            Close Inspector
          </button>
          {onRevokeAccess && (
            <button
              onClick={() => {
                onRevokeAccess(roleName);
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-500/20"
            >
              Revoke Sensitive Access
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
