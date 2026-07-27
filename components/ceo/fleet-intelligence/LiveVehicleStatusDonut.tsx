'use client';

import React, { useState } from 'react';
import { VehicleStatusBreakdown } from '../../../lib/types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Radio, ChevronRight } from 'lucide-react';

interface LiveVehicleStatusDonutProps {
  statusList: VehicleStatusBreakdown[];
}

export function LiveVehicleStatusDonut({ statusList }: LiveVehicleStatusDonutProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const activeData = statusList.find((s) => s.status === selectedStatus);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-emerald-600 animate-pulse" />
            <h2 className="text-base font-extrabold text-slate-900">Live Telemetry Vehicle Status</h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            148 Connected EVs
          </span>
        </div>

        {/* Donut Chart Canvas */}
        <div className="h-56 w-full relative my-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusList}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="count"
                onClick={(entry) => setSelectedStatus(entry.status)}
                cursor="pointer"
              >
                {statusList.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={entry.color}
                    stroke={selectedStatus === entry.status ? '#0f172a' : 'transparent'}
                    strokeWidth={selectedStatus === entry.status ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(val: any) => [`${val} Vehicles`, 'Count']}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Info */}
          <div className="absolute pointer-events-none text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Fleet</p>
            <p className="text-xl font-black text-slate-900 leading-tight">148 EVs</p>
          </div>
        </div>

        {/* Status Legend Buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {statusList.map((item) => {
            const isSelected = selectedStatus === item.status;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedStatus(isSelected ? null : item.status)}
                className={`p-2 rounded-xl text-left transition-all border flex items-center justify-between text-xs ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-bold truncate text-[11px]">{item.status}</span>
                </div>
                <span className="font-mono font-extrabold text-[11px] shrink-0 ml-1">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Status Filter Preview */}
      {selectedStatus && activeData && (
        <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center justify-between">
          <div>
            <p className="font-bold">Filtered Status: {activeData.status}</p>
            <p className="text-[10px] opacity-80">{activeData.count} Vehicles ({activeData.percentage}% of active fleet)</p>
          </div>
          <button
            onClick={() => setSelectedStatus(null)}
            className="text-[10px] font-bold px-2 py-1 bg-white border border-sky-300 rounded-lg hover:bg-sky-100 text-sky-800"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
