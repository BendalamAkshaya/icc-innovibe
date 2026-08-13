'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, Lock, Check } from 'lucide-react';

interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  permissions: Array<{ name: string; isGranted: boolean; risk: 'LOW' | 'MEDIUM' | 'HIGH'; usersCount: number }>;
}

export function CollapsibleCategoryTree() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    exec: true,
    ops: false,
    fin: false,
    fleet: false,
    tech: false,
  });

  const [categoryData, setCategoryData] = useState<CategoryGroup[]>([
    {
      id: 'exec',
      name: 'Executive Management & Corporate Suite',
      description: 'Super Admin privileges, strategic decision-making, and high-level dashboard metrics.',
      permissions: [
        { name: 'Executive Overview', isGranted: true, risk: 'LOW', usersCount: 4 },
        { name: 'Business Performance & Financial Margins', isGranted: true, risk: 'MEDIUM', usersCount: 3 },
        { name: 'Fleet Intelligence IoT Control', isGranted: true, risk: 'MEDIUM', usersCount: 5 },
        { name: 'Department Performance Digital Twin', isGranted: true, risk: 'LOW', usersCount: 6 },
      ],
    },
    {
      id: 'ops',
      name: 'Field Operations & Service Hubs',
      description: 'RSA dispatching, technician queue management, and service center capacity.',
      permissions: [
        { name: 'Live Dispatch Map', isGranted: true, risk: 'LOW', usersCount: 14 },
        { name: 'Service Center Queue Management', isGranted: true, risk: 'LOW', usersCount: 18 },
        { name: 'SLA Compliance & Resolution Analytics', isGranted: true, risk: 'MEDIUM', usersCount: 8 },
        { name: 'RSA Operations Dispatcher', isGranted: false, risk: 'HIGH', usersCount: 12 },
      ],
    },
    {
      id: 'fin',
      name: 'Finance, Accounts & Procurement',
      description: 'P&L statements, vendor payouts, budget allocations, and procurement approvals.',
      permissions: [
        { name: 'P&L Statements & Margin Ledger', isGranted: false, risk: 'HIGH', usersCount: 2 },
        { name: 'Vendor Fleet Dashboard Sync', isGranted: true, risk: 'MEDIUM', usersCount: 4 },
        { name: 'Procurement Budget Approvals', isGranted: false, risk: 'HIGH', usersCount: 3 },
        { name: 'Quote Workbench & Invoicing', isGranted: true, risk: 'LOW', usersCount: 6 },
      ],
    },
    {
      id: 'fleet',
      name: 'Fleet & IoT Telemetry Control',
      description: 'Battery SOH monitoring, BMS cell analytics, motor controller temps, and live tracking.',
      permissions: [
        { name: 'EV Health Telematics Stream', isGranted: true, risk: 'LOW', usersCount: 24 },
        { name: 'Battery Degradation Audit', isGranted: true, risk: 'MEDIUM', usersCount: 8 },
        { name: 'Remote BMS Diagnostic Override', isGranted: false, risk: 'HIGH', usersCount: 2 },
        { name: 'Firmware OTA Deployment', isGranted: false, risk: 'HIGH', usersCount: 3 },
      ],
    },
    {
      id: 'tech',
      name: 'Technology, AI Agents & Security',
      description: 'Autonomous AI agent pipelines, API monitoring, and quantum-safe security.',
      permissions: [
        { name: 'AI Agent Pipeline Engine', isGranted: true, risk: 'MEDIUM', usersCount: 5 },
        { name: 'API Latency Monitoring', isGranted: true, risk: 'LOW', usersCount: 8 },
        { name: 'Quantum-Safe Security Policy Vault', isGranted: true, risk: 'HIGH', usersCount: 2 },
        { name: 'Role & Permission RBAC Manager', isGranted: true, risk: 'HIGH', usersCount: 1 },
      ],
    },
  ]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePermission = (catId: string, permName: string) => {
    setCategoryData((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          permissions: cat.permissions.map((p) =>
            p.name === permName ? { ...p, isGranted: !p.isGranted } : p
          ),
        };
      })
    );
  };

  const setAllCategoryPermissions = (catId: string, isGranted: boolean) => {
    setCategoryData((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          permissions: cat.permissions.map((p) => ({ ...p, isGranted })),
        };
      })
    );
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left" suppressHydrationWarning>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Categorized Permission Tree (Collapsible Groups)</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            5 core governance categories replacing flat toggle grids.
          </p>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
          5 Core Categories
        </span>
      </div>

      <div className="space-y-3">
        {categoryData.map((cat) => {
          const isExpanded = !!expandedCategories[cat.id];
          const grantedCount = cat.permissions.filter((p) => p.isGranted).length;

          return (
            <div key={cat.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/70">
              {/* Category Header Bar */}
              <div
                onClick={() => toggleCategory(cat.id)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80 transition-all"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{cat.name}</h3>
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {grantedCount} / {cat.permissions.length} Enabled
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{cat.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAllCategoryPermissions(cat.id, true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-extrabold text-emerald-700 hover:bg-emerald-50"
                  >
                    Enable All
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAllCategoryPermissions(cat.id, false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-extrabold text-red-700 hover:bg-red-50"
                  >
                    Disable All
                  </button>
                  <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Permissions List */}
              {isExpanded && (
                <div className="p-4 bg-white border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in">
                  {cat.permissions.map((p) => (
                    <div
                      key={p.name}
                      onClick={() => togglePermission(cat.id, p.name)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        p.isGranted
                          ? 'bg-indigo-50/70 border-indigo-300 text-slate-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-xs">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Used by {p.usersCount} users • Risk: <strong className={p.risk === 'HIGH' ? 'text-red-600' : 'text-slate-600'}>{p.risk}</strong></p>
                      </div>

                      <div className={`h-6 w-6 rounded-lg flex items-center justify-center border ${
                        p.isGranted ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 border-slate-200'
                      }`}>
                        {p.isGranted && <Check className="h-4 w-4 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
