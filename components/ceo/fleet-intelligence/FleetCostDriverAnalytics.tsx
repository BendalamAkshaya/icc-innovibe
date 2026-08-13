'use client';

import React from 'react';
import { IndianRupee, Users, ShieldAlert, Award, TrendingUp, Zap, Gauge } from 'lucide-react';

export function FleetCostDriverAnalytics() {
  const topDrivers = [
    { name: 'Suresh Kumar', hub: 'Kakinada Main', efficiency: '98.5%', safetyScore: 99, status: 'EXCELLENT' },
    { name: 'Ramesh Reddy', hub: 'Rajahmundry', efficiency: '96.2%', safetyScore: 97, status: 'EXCELLENT' },
    { name: 'Venkatesh P', hub: 'Vijayawada', efficiency: '94.8%', safetyScore: 95, status: 'GOOD' },
  ];

  const riskDrivers = [
    { name: 'Driver #104', hub: 'Vizag Port', issue: '2 Harsh Braking Alerts', riskScore: 'HIGH' },
    { name: 'Driver #108', hub: 'Guntur South', issue: 'Overspeeding > 55 km/h', riskScore: 'MEDIUM' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
      {/* 1. Fleet Cost Intelligence */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">Fleet Unit Economics & Cost Intelligence</h2>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
            ₹0.85 / km Avg Cost
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-slate-400 uppercase text-[10px]">Cost Per Km</span>
            <p className="text-lg font-black text-slate-900 mt-1">₹0.85 / km</p>
            <span className="text-[10px] text-emerald-600 font-bold">-12% vs Internal Combustion</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-slate-400 uppercase text-[10px]">Energy kWh Cost</span>
            <p className="text-lg font-black text-slate-900 mt-1">₹1.42 / kWh</p>
            <span className="text-[10px] text-sky-600 font-bold">Solar Micro-grid Offset</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-slate-400 uppercase text-[10px]">Revenue Per EV / Mo</span>
            <p className="text-lg font-black text-emerald-700 mt-1">₹14,500</p>
            <span className="text-[10px] text-slate-500 font-medium">B2B Delivery & AMC</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-extrabold text-slate-400 uppercase text-[10px]">Profit Margin / EV</span>
            <p className="text-lg font-black text-sky-700 mt-1">₹4,800</p>
            <span className="text-[10px] text-emerald-600 font-bold">33.1% Net Margin</span>
          </div>
        </div>
      </div>

      {/* 2. Driver Performance & Safety Analytics */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-sky-600" />
            <h2 className="text-base font-extrabold text-slate-900">Driver Telematics & Safety Scorecard</h2>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">
            96.4 Avg Fleet Safety
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-slate-800">
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4 text-amber-500" /> Top Energy-Efficient Drivers
            </span>
          </div>

          <div className="space-y-1.5">
            {topDrivers.map((d) => (
              <div key={d.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-slate-900">{d.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{d.hub}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-emerald-600">{d.efficiency} Efficiency</span>
                  <p className="text-[10px] text-slate-400 font-bold">Safety Score: {d.safetyScore}/100</p>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Alerts */}
          {riskDrivers.length > 0 && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between text-xs font-bold text-red-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                <span>{riskDrivers.length} Telemetry Risk Alerts Logged Today</span>
              </div>
              <button onClick={() => alert('Opening Driver Telemetry Risk Register...')} className="underline text-[11px]">
                Inspect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
