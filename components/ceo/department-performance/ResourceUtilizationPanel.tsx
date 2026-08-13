'use client';

import React from 'react';
import { ResourceUtilizationData } from '../../../lib/types';
import { Cpu, Users, IndianRupee, Building2, HardDrive, CheckCircle2 } from 'lucide-react';

interface ResourceUtilizationPanelProps {
  resources: ResourceUtilizationData;
}

export function ResourceUtilizationPanel({ resources }: ResourceUtilizationPanelProps) {
  const {
    employeeUtilizationPercent,
    budgetUtilizationPercent,
    technologyUtilizationPercent,
    infrastructureUsagePercent,
    departmentCapacityPercent,
  } = resources;

  const items = [
    { label: 'Employee Capacity & Workload', val: employeeUtilizationPercent, color: 'bg-indigo-600', text: 'Optimal Headcount' },
    { label: 'Budget Utilization Plan', val: budgetUtilizationPercent, color: 'bg-emerald-500', text: 'Within Q2 Plan' },
    { label: 'Tech & Cloud Infrastructure', val: technologyUtilizationPercent, color: 'bg-sky-500', text: 'High Software Adoption' },
    { label: 'Physical Facilities & Hubs', val: infrastructureUsagePercent, color: 'bg-purple-500', text: 'Service Hub Capacity' },
    { label: 'Overall Department Capacity', val: departmentCapacityPercent, color: 'bg-amber-500', text: 'Balanced Scalability' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Resource & Capacity Utilization</h2>
          </div>
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
            {departmentCapacityPercent}% Capacity
          </span>
        </div>

        <div className="space-y-3.5 my-4">
          {items.map((item) => (
            <div key={item.label} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                <span className="truncate pr-2">{item.label}</span>
                <span className="font-mono text-sm">{item.val}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between font-bold">
        <span>Resource Status: Optimal Across All 8 Depts</span>
        <CheckCircle2 className="h-4 w-4 text-indigo-600" />
      </div>
    </div>
  );
}
