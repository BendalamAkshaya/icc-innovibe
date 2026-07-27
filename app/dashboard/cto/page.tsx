'use client';

import React, { useState } from 'react';
import { useRole } from '../../../components/RoleContext';
import { mockVehicles } from '../../../lib/mock-data';
import { Zap, Cpu, Server, Activity, ShieldCheck, AlertOctagon, Terminal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CTODashboard() {
  const { currentProfile } = useRole();
  const [vehicles] = useState(mockVehicles);

  const telemetryDistribution = [
    { range: '90-100 (Optimal)', count: 8420 },
    { range: '70-89 (Good)', count: 3120 },
    { range: '50-69 (Attention)', count: 780 },
    { range: '< 50 (Critical)', count: 160 },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600 fill-purple-500" />
            <span className="text-xs font-black uppercase tracking-widest text-purple-700">Chief Technology Office</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">AI Engine & EV Health Telematics</h1>
          <p className="text-xs text-slate-600 max-w-xl font-medium">
            Real-time IoT telemetry stream monitoring EV Health Scores (0-100), AI agent pipelines, and system API health.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
            <Cpu className="h-4 w-4 text-purple-600 animate-spin" /> n8n + Ollama Pipeline: ACTIVE
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Fleet EV Health Score</p>
          <p className="text-2xl font-black text-emerald-600 mt-2">89.4 / 100</p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">12,480 Active Connected Vehicles</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Advisor Accuracy</p>
          <p className="text-2xl font-black text-sky-600 mt-2">96.8%</p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">Based on Diagnostic Audits</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">API Average Latency</p>
          <p className="text-2xl font-black text-slate-900 mt-2">34 ms</p>
          <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">Telescope Monitored</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantum-Safe Security</p>
          <p className="text-2xl font-black text-purple-600 mt-2">ACTIVE</p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">Zero-Trust Gateway</span>
        </div>
      </div>

      {/* EV Health Score (0-100) Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200">
          <h2 className="text-base font-extrabold text-slate-900 mb-1">EV Health Score Distribution (0-100 Algorithm)</h2>
          <p className="text-xs text-slate-500 font-medium mb-4">Calculated from battery state-of-charge, motor efficiency, controller temperature, and brake wear.</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={telemetryDistribution} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live System Log Stream */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-slate-900">Live AI Telemetry Log</h2>
              <Terminal className="h-4 w-4 text-purple-600" />
            </div>
            <div className="font-mono text-[11px] space-y-2 bg-slate-900 text-slate-100 p-4 rounded-2xl h-56 overflow-y-auto">
              <p className="text-emerald-400">[0.02s] TELEMETRY_PING: VIN INNO450X2026001 - Battery: 96% OK</p>
              <p className="text-cyan-300">[0.05s] AI_ADVISOR: Diagnostic fault generated for Ticket #EV-2026-0891</p>
              <p className="text-amber-400">[0.12s] TELEMETRY_ALERT: VIN INNOTVS02026003 Controller Temp 68°C</p>
              <p className="text-emerald-400">[0.18s] WHATSAPP_BOT: Automated invoice PDF dispatched to +91 98765 43210</p>
              <p className="text-purple-300">[0.25s] AI_DISPATCH: Recommending Tech #tech_02 (0.8km dist)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Vehicle Telemetry Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200">
        <h2 className="text-base font-extrabold text-slate-900 mb-4">Connected Vehicle Telemetry Diagnostics (Live Scores)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <th className="pb-3 px-3">VIN / Reg</th>
                <th className="pb-3 px-3">Vehicle Model</th>
                <th className="pb-3 px-3">Owner</th>
                <th className="pb-3 px-3">Overall Health Score</th>
                <th className="pb-3 px-3">Battery Health</th>
                <th className="pb-3 px-3">Controller Temp</th>
                <th className="pb-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((veh) => (
                <tr key={veh.id} className="hover:bg-slate-50 transition-all">
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-slate-900">{veh.registrationNumber}</p>
                    <p className="text-[10px] font-mono text-slate-500">{veh.vin}</p>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{veh.model}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{veh.ownerName}</td>
                  <td className="py-3.5 px-3">
                    <span className={`font-mono font-extrabold text-sm ${veh.healthScore.overall > 80 ? 'text-emerald-700' : veh.healthScore.overall > 60 ? 'text-amber-700' : 'text-red-700'}`}>
                      {veh.healthScore.overall} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-700 font-bold">{veh.healthScore.batteryHealth}%</td>
                  <td className="py-3.5 px-3 font-mono text-slate-700 font-bold">{veh.healthScore.controllerTemp}°C</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      veh.healthScore.status === 'OPTIMAL'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : veh.healthScore.status === 'ATTENTION'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {veh.healthScore.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
