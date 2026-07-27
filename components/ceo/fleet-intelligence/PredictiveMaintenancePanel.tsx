'use client';

import React from 'react';
import { PredictiveMaintenanceItem } from '../../../lib/types';
import { Wrench, AlertTriangle, ShieldCheck, Calendar, ArrowUpRight } from 'lucide-react';

interface PredictiveMaintenancePanelProps {
  maintenanceItems: PredictiveMaintenanceItem[];
  onSelectVehicle?: (vin: string) => void;
}

export function PredictiveMaintenancePanel({ maintenanceItems, onSelectVehicle }: PredictiveMaintenancePanelProps) {
  const getRiskBadge = (risk: PredictiveMaintenanceItem['riskLevel']) => {
    switch (risk) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'HIGH':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-sky-100 text-sky-800 border-sky-300';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-amber-600" />
            <h2 className="text-base font-extrabold text-slate-900">Predictive Maintenance & Risk Queue</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            AI-driven breakdown risk predictions, battery degradation warnings, and AMC/Warranty expiries.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300">
          4 High-Priority Items
        </span>
      </div>

      <div className="space-y-3">
        {maintenanceItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-100/80"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shrink-0 shadow-xs">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-xs text-slate-900">{item.vehicleModel}</h3>
                  <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-bold">
                    VIN: {item.vin}
                  </span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${getRiskBadge(item.riskLevel)}`}>
                    {item.riskLevel} RISK
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-bold leading-relaxed">{item.aiPrediction}</p>
                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-400" /> Target Due Date: <strong className="text-slate-700">{item.dueDate}</strong>
                  </span>
                  <span>Category: <strong className="text-slate-700">{item.issueType.replace('_', ' ')}</strong></span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onSelectVehicle && onSelectVehicle(item.vin)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-extrabold text-xs shadow-xs inline-flex items-center gap-1 transition-all"
              >
                <span>Inspect Vehicle</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
