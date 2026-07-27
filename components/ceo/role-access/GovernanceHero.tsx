'use client';

import React from 'react';
import { ShieldCheck, Users, Key, AlertTriangle, Lock, Cpu, Grid, List } from 'lucide-react';

interface GovernanceHeroProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  viewMode: 'TREE' | 'MATRIX';
  onViewModeChange: (mode: 'TREE' | 'MATRIX') => void;
  onOpenCreateRole: () => void;
}

export function GovernanceHero({
  activeTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  onOpenCreateRole,
}: GovernanceHeroProps) {
  const tabs = [
    { id: 'overview', label: 'Governance Overview' },
    { id: 'tree', label: 'Category Tree' },
    { id: 'matrix', label: 'Permission Matrix' },
    { id: 'assignments', label: 'User Assignments' },
    { id: 'emergency', label: 'Emergency Access' },
    { id: 'compliance', label: 'Security & Compliance' },
  ];

  const kpis = [
    { label: 'Active Roles', value: '12 Roles', note: '7 Custom Roles', color: 'border-indigo-200 bg-indigo-50/40 text-indigo-900' },
    { label: 'Active Employees', value: '148 Users', note: '100% Identity Verified', color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900' },
    { label: 'Permission Groups', value: '36 Groups', note: '5 Core Categories', color: 'border-sky-200 bg-sky-50/40 text-sky-900' },
    { label: 'Pending Approvals', value: '3 Requests', note: 'Requires CEO Signoff', color: 'border-amber-200 bg-amber-50/40 text-amber-900' },
    { label: 'Security Policies', value: '14 Active', note: 'Quantum-Safe SOC2', color: 'border-purple-200 bg-purple-50/40 text-purple-900' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6 text-left" suppressHydrationWarning>
      {/* 1. Header Banner & View Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Enterprise Governance & Identity Center (RBAC)
            </h1>
            <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase">
              ENTRA ID / OKTA LEVEL
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Manage organization identities, permission groups, security policies, branch access scopes, and SOC2 audit compliance.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* View Mode Switcher: Tree vs Matrix */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onViewModeChange('TREE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                viewMode === 'TREE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="h-3.5 w-3.5" /> Tree View
            </button>
            <button
              onClick={() => onViewModeChange('MATRIX')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                viewMode === 'MATRIX' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid className="h-3.5 w-3.5" /> Matrix View
            </button>
          </div>

          <button
            onClick={onOpenCreateRole}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-2"
          >
            <Key className="h-4 w-4" />
            <span>Create Custom Role</span>
          </button>
        </div>
      </div>

      {/* 2. Governance KPIs Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`p-4 rounded-2xl border ${kpi.color} space-y-1`}>
            <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">{kpi.label}</span>
            <p className="text-xl font-black text-slate-900">{kpi.value}</p>
            <span className="text-[10px] font-bold text-slate-600 block">{kpi.note}</span>
          </div>
        ))}
      </div>

      {/* 3. Workspace Navigation Tabs */}
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
