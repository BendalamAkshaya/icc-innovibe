'use client';

import React from 'react';
import { useGlobalFilter } from '../../../lib/global-filter-context';
import { Layers, X, TrendingUp, ArrowUpRight, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export function DrillDownModal() {
  const { drillDownState, closeDrillDown, selectedBranches, datePreset } = useGlobalFilter();

  if (!drillDownState.isOpen) return null;

  const mockDrillDownRows = [
    { id: 'REC-901', name: 'Kakinada Main Hub', category: 'Service at Garage (₹499)', amount: '₹4,99,000', margin: '34.2%', status: 'VERIFIED' },
    { id: 'REC-902', name: 'Rajahmundry East', category: 'Service at Doorstep (₹249)', amount: '₹3,42,000', margin: '28.9%', status: 'VERIFIED' },
    { id: 'REC-903', name: 'Vijayawada Central', category: 'Roadside Assistance (₹199)', amount: '₹2,18,000', margin: '26.4%', status: 'AUDITED' },
    { id: 'REC-904', name: 'Visakhapatnam Port', category: '3-Year AMC Membership (₹999)', amount: '₹1,86,000', margin: '42.1%', status: 'AUDITED' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden text-left space-y-0">
        <div className="p-6 bg-gradient-to-r from-sky-900 via-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 uppercase">
                  Drill Down Intelligence
                </span>
                <span className="text-[10px] font-mono text-slate-400">{datePreset}</span>
              </div>
              <h2 className="text-lg font-black">{drillDownState.title}</h2>
              <p className="text-xs text-slate-300 font-medium">{drillDownState.subtitle}</p>
            </div>
          </div>
          <button onClick={closeDrillDown} className="p-2 text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Filtered Hubs</span>
              <p className="text-sm font-black text-slate-900">{selectedBranches.join(', ')}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Gross Aggregate</span>
              <p className="text-sm font-black text-emerald-600">₹12,45,000</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">P&L Status</span>
              <p className="text-sm font-black text-sky-600 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Fully Audited
              </p>
            </div>
          </div>

          {/* Drill Down Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-3">Ref ID</th>
                  <th className="py-3 px-3">Branch / Location</th>
                  <th className="py-3 px-3">Revenue Stream</th>
                  <th className="py-3 px-3">Contribution</th>
                  <th className="py-3 px-3">Operating Margin</th>
                  <th className="py-3 px-3">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockDrillDownRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-all font-medium">
                    <td className="py-3 px-3 font-mono font-bold text-sky-700">{row.id}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3 px-3 text-slate-600">{row.category}</td>
                    <td className="py-3 px-3 font-black text-slate-900">{row.amount}</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">{row.margin}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span className="flex items-center gap-1">
            <Activity className="h-4 w-4 text-sky-600" /> PostgreSQL SSOT Sync Active
          </span>
          <button onClick={closeDrillDown} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-extrabold">
            Close Drill Down
          </button>
        </div>
      </div>
    </div>
  );
}
