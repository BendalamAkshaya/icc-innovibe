'use client';

import React from 'react';
import { DepartmentMetric } from '../../../lib/types';
import { X, Building2, Users, IndianRupee, Target, ShieldAlert, Award, TrendingUp, CheckCircle2, Activity, Cpu } from 'lucide-react';

interface DepartmentDetailDrawerProps {
  department: DepartmentMetric | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DepartmentDetailDrawer({ department, isOpen, onClose }: DepartmentDetailDrawerProps) {
  if (!isOpen || !department) return null;

  const teamMembers = [
    { name: department.headOfDepartment, role: `Head of ${department.departmentName}`, type: 'Leader' },
    { name: 'Rajesh Varma', role: 'Senior Lead Specialist', type: 'Lead' },
    { name: 'Anita Rao', role: 'Operations & Strategy Lead', type: 'Lead' },
    { name: 'Kiran Kumar', role: 'Senior Analyst', type: 'FTE' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 text-left">
        {/* Drawer Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                Department Intelligence
              </span>
              <span className="text-[10px] font-mono text-slate-400">CODE: {department.code}</span>
            </div>
            <h2 className="text-xl font-black mt-1 text-white">{department.departmentName}</h2>
            <p className="text-xs text-slate-400 font-medium">Head: {department.headOfDepartment}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Health & Score Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                {department.performanceScore}
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-slate-900">Overall Performance Score</h3>
                <p className="text-[10px] text-indigo-700 font-extrabold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="h-3 w-3" /> Status: {department.status.replace('_', ' ')}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-black text-emerald-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              +{department.growthPercent}% QoQ
            </span>
          </div>

          {/* Core Metrics Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target className="h-4 w-4 text-indigo-600" /> Operational & KPI Targets
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">KPI Achievement</span>
                <p className="text-lg font-black text-slate-900 mt-1">{department.kpiAchievementPercent}%</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${department.kpiAchievementPercent}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Target Completion</span>
                <p className="text-lg font-black text-emerald-600 mt-1">{department.targetCompletionPercent}%</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${department.targetCompletionPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Team Structure */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-sky-600" /> Department Leadership & Roster
            </h4>
            <div className="space-y-2">
              {teamMembers.map((m) => (
                <div key={m.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-slate-900">{m.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{m.role}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    m.type === 'Leader' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {m.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs font-medium">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Cpu className="h-4 w-4" /> AI Organizational Diagnosis
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {department.departmentName} is performing at <strong>{department.performanceScore}/100</strong> with a quarter-over-quarter growth of <strong>+{department.growthPercent}%</strong>. Budget utilization is within standard target thresholds and team capacity is balanced.
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => alert(`Exporting detailed department report for ${department.departmentName}`)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-md"
          >
            Export Department Report
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
