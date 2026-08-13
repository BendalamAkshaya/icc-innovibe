'use client';

import React, { useState } from 'react';
import { DepartmentComparisonPoint } from '../../../lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart2, Layers } from 'lucide-react';

interface DepartmentComparisonChartProps {
  data: DepartmentComparisonPoint[];
}

export function DepartmentComparisonChart({ data }: DepartmentComparisonChartProps) {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<'ALL' | 'CORE'>('ALL');

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Cross-Department Performance Comparison</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Multi-dimensional comparative analysis across productivity, revenue contribution, and SLA execution.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedDeptFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
              selectedDeptFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            All Departments
          </button>
          <button
            onClick={() => setSelectedDeptFilter('CORE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
              selectedDeptFilter === 'CORE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Core Operations Only
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="metric" stroke="#64748b" tick={{ fontSize: 11, fontWeight: 600 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11, fontWeight: 600 }} domain={[60, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600 }} />
            <Bar dataKey="Operations" fill="#0280d2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Technology" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Finance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Service" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            {selectedDeptFilter === 'ALL' && (
              <>
                <Bar dataKey="HR" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Sales" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
