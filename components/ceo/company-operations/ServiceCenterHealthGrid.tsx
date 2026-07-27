'use client';

import React from 'react';
import { ServiceCenterHealth } from '../../../lib/types';
import { Activity, Wrench, Clock, Users, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ServiceCenterHealthGridProps {
  serviceCenters: ServiceCenterHealth[];
}

export function ServiceCenterHealthGrid({ serviceCenters }: ServiceCenterHealthGridProps) {
  const getStatusBadge = (status: ServiceCenterHealth['status']) => {
    switch (status) {
      case 'OPTIMAL':
        return { text: 'Optimal Capacity', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 };
      case 'MODERATE':
        return { text: 'Moderate Load', bg: 'bg-amber-100 text-amber-800 border-amber-300', icon: Activity };
      case 'OVERLOADED':
        return { text: 'Queue Overloaded', bg: 'bg-red-100 text-red-800 border-red-300', icon: ShieldAlert };
      default:
        return { text: 'Normal', bg: 'bg-slate-100 text-slate-800 border-slate-300', icon: Activity };
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-600" />
            <h2 className="text-base font-extrabold text-slate-900">Service Center Operational Health</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Capacity utilization, active technician rosters, and queue health indicators.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">
          5 Service Bays Active
        </span>
      </div>

      {/* Grid of Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {serviceCenters.map((center) => {
          const statusInfo = getStatusBadge(center.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div
              key={center.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                center.status === 'OVERLOADED' ? 'bg-red-50/30 border-red-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-extrabold text-xs text-slate-900 leading-snug">{center.centerName}</h3>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{center.location}</p>
                  </div>
                </div>

                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border inline-flex items-center gap-1 ${statusInfo.bg}`}>
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.text}
                </span>
              </div>

              {/* Capacity Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-600">
                  <span>Capacity Utilization</span>
                  <span className={center.capacityUtilizationPercent >= 90 ? 'text-red-600' : 'text-slate-900'}>
                    {center.capacityUtilizationPercent}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      center.capacityUtilizationPercent >= 90
                        ? 'bg-red-500'
                        : center.capacityUtilizationPercent >= 80
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${center.capacityUtilizationPercent}%` }}
                  />
                </div>
              </div>

              {/* Operational Micro-Stats */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-[10px]">
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-bold block">Active Techs</span>
                  <span className="font-mono font-black text-slate-800 flex items-center gap-1">
                    <Users className="h-3 w-3 text-sky-600" /> {center.activeTechnicians} Staff
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-bold block">Waiting Queue</span>
                  <span className="font-mono font-black text-slate-800 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-600" /> {center.waitingVehicles} EV
                  </span>
                </div>

                <div className="space-y-0.5 col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-400 font-bold">Avg Service Time:</span>
                  <span className="font-mono font-extrabold text-slate-900">{center.avgServiceTimeMins} mins</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
