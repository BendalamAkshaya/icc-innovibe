'use client';

import React from 'react';
import { DepartmentMetric } from '../../../lib/types';
import { Layers, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, UserCheck } from 'lucide-react';

interface DepartmentOverviewCardsProps {
  departments: DepartmentMetric[];
  onSelectDepartment?: (deptName: string) => void;
}

export function DepartmentOverviewCards({ departments, onSelectDepartment }: DepartmentOverviewCardsProps) {
  const getStatusBadge = (status: DepartmentMetric['status']) => {
    switch (status) {
      case 'EXCEEDING':
        return { label: 'Exceeding Target', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'ON_TRACK':
        return { label: 'On Track', bg: 'bg-sky-100 text-sky-800 border-sky-300' };
      case 'ATTENTION_NEEDED':
        return { label: 'Attention Needed', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'BEHIND':
        return { label: 'Behind Target', bg: 'bg-red-100 text-red-800 border-red-300' };
      default:
        return { label: 'Normal', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {departments.map((dept) => {
        const statusBadge = getStatusBadge(dept.status);

        return (
          <div
            key={dept.id}
            onClick={() => onSelectDepartment && onSelectDepartment(dept.departmentName)}
            className="glass-card p-5 rounded-2xl border border-slate-200 cursor-pointer flex flex-col justify-between space-y-4 transition-all hover:border-indigo-300"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {dept.code}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-1">{dept.departmentName}</h3>
                  <p className="text-[10px] text-slate-500 font-medium truncate">Lead: {dept.headOfDepartment}</p>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-slate-900">{dept.performanceScore}</span>
                  <span className="text-[10px] text-slate-400 font-bold block">/100 PTS</span>
                </div>
              </div>

              <span className={`text-[9px] font-black px-2 py-0.5 rounded border inline-block ${statusBadge.bg}`}>
                {statusBadge.label}
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">KPI Achievement:</span>
                <span className="font-mono font-extrabold text-slate-900">{dept.kpiAchievementPercent}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Target Completion:</span>
                <span className="font-mono font-extrabold text-indigo-600">{dept.targetCompletionPercent}%</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100/60">
                <span className="text-slate-400 text-[10px]">Growth YoY:</span>
                <span className={`font-extrabold text-[11px] flex items-center gap-0.5 ${
                  dept.growthPercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {dept.growthPercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {dept.growthPercent >= 0 ? `+${dept.growthPercent}%` : `${dept.growthPercent}%`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
