'use client';

import React, { useState } from 'react';
import { Cpu, ChevronRight, ChevronDown, Activity, BatteryCharging, Zap, ShieldCheck } from 'lucide-react';

export function DigitalTwinHierarchyTree() {
  const [selectedPath, setSelectedPath] = useState<string>('Fleet → Kakinada Hub → Ather 450X (AP39AB1234) → BMS Cell #4');

  const twinTree = [
    {
      id: 'fleet',
      name: 'InnoVibe EV Fleet (148 Vehicles)',
      type: 'FLEET',
      children: [
        {
          id: 'hub_kkd',
          name: 'Kakinada Main Regional Hub (58 EVs)',
          type: 'HUB',
          children: [
            {
              id: 'veh_001',
              name: 'Ather 450X Apex (AP39AB1234)',
              type: 'VEHICLE',
              children: [
                { id: 'bms_01', name: '7.2 kWh Battery Pack (SOH 96%)', type: 'BATTERY' },
                { id: 'mtr_01', name: '6.2 kW PMSM Motor (98% Eff.)', type: 'MOTOR' },
                { id: 'mcu_01', name: 'MCU Controller (Temp 42°C)', type: 'MCU' },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">AWS IoT TwinMaker Digital Twin Hierarchy</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
          3D Telemetry Graph Active
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-inner">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
          <span>Active Digital Twin Node Trace:</span>
          <span className="text-emerald-400 font-bold">{selectedPath}</span>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Activity className="h-4 w-4" /> 🌐 Entire Enterprise EV Fleet
          </div>

          <div className="pl-4 space-y-1.5 border-l border-slate-800 ml-2">
            <div className="flex items-center gap-2 text-indigo-300">
              <ChevronDown className="h-3.5 w-3.5" /> 📍 Kakinada Regional Service Hub (58 EVs)
            </div>

            <div className="pl-6 space-y-1.5 border-l border-slate-800 ml-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ChevronDown className="h-3.5 w-3.5" /> ⚡ Vehicle: Ather 450X Apex (AP39AB1234)
              </div>

              <div className="pl-6 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => setSelectedPath('Fleet → Kakinada → AP39AB1234 → BMS Cell Pack')}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-left"
                >
                  <p className="font-bold">🔋 BMS Battery Pack</p>
                  <p className="text-[10px] text-slate-400">SOH: 96% | 42.1V</p>
                </button>

                <button
                  onClick={() => setSelectedPath('Fleet → Kakinada → AP39AB1234 → PMSM Motor Stator')}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-left"
                >
                  <p className="font-bold">⚙️ PMSM Motor</p>
                  <p className="text-[10px] text-slate-400">6.2 kW | 98% Eff.</p>
                </button>

                <button
                  onClick={() => setSelectedPath('Fleet → Kakinada → AP39AB1234 → MCU Inverter')}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 text-left"
                >
                  <p className="font-bold">💻 MCU Controller</p>
                  <p className="text-[10px] text-slate-400">Temp: 42°C | v4.2</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
