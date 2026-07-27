'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Download, BarChart2, CheckCircle2 } from 'lucide-react';

interface CustomReportBuilderProps {
  onGenerateCustomReport: (config: any) => void;
}

export function CustomReportBuilder({ onGenerateCustomReport }: CustomReportBuilderProps) {
  const [dataSource, setDataSource] = useState('IoT EV Telemetry & Financial ERP');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 90 Days');
  const [selectedChartType, setSelectedChartType] = useState<'BAR' | 'AREA' | 'LINE'>('BAR');

  const handleBuild = () => {
    onGenerateCustomReport({
      dataSource,
      timeRange: selectedTimeRange,
      chartType: selectedChartType,
    });
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Sliders className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Custom Executive Report Builder Studio</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          No Technical Assistance Needed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Data Source */}
        <div className="space-y-1">
          <label className="font-extrabold text-slate-700">Data Source Pipeline:</label>
          <select
            value={dataSource}
            onChange={(e) => setDataSource(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="IoT EV Telemetry & Financial ERP">IoT EV Telemetry & Financial ERP</option>
            <option value="Coastal Service SLA & Technician Output">Coastal Service SLA & Technician Output</option>
            <option value="Customer Doorstep AMC & CSAT Ledger">Customer Doorstep AMC & CSAT Ledger</option>
          </select>
        </div>

        {/* Time Range */}
        <div className="space-y-1">
          <label className="font-extrabold text-slate-700">Time Range Horizon:</label>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="Last 30 Days">Last 30 Days (Monthly)</option>
            <option value="Last 90 Days">Last 90 Days (Quarterly)</option>
            <option value="Full Year 2026">Full Year 2026 (Annual)</option>
          </select>
        </div>

        {/* Chart Visualization Type */}
        <div className="space-y-1">
          <label className="font-extrabold text-slate-700">Chart Visualization:</label>
          <div className="flex items-center gap-2 pt-0.5">
            {(['BAR', 'AREA', 'LINE'] as const).map((ct) => (
              <button
                key={ct}
                onClick={() => setSelectedChartType(ct)}
                className={`flex-1 py-2 rounded-xl font-extrabold text-[11px] border transition-all ${
                  selectedChartType === ct
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {ct}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
        <button
          onClick={handleBuild}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Compile Custom Dashboard Report</span>
        </button>
      </div>
    </div>
  );
}
