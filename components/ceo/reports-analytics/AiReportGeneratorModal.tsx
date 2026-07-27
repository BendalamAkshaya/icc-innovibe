'use client';

import React, { useState } from 'react';
import { AiGeneratedReport } from '../../../lib/types';
import { Sparkles, Download, CheckCircle2, X, RefreshCw } from 'lucide-react';

interface AiReportGeneratorModalProps {
  reports: AiGeneratedReport[];
  onClose: () => void;
  onDownloadAiReport: (title: string) => void;
}

export function AiReportGeneratorModal({ reports, onClose, onDownloadAiReport }: AiReportGeneratorModalProps) {
  const [selectedType, setSelectedType] = useState<string>('BUSINESS_HEALTH');
  const activeReport = reports[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-purple-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">AI Autonomous Executive Report Generator</h2>
              <p className="text-[10px] text-slate-500 font-medium">Synthesizes enterprise telemetry, P&L ledgers & SLA queues</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Report Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          {['BUSINESS_HEALTH', 'QUARTERLY_CEO', 'INVESTOR_SUMMARY', 'BOARD_PACK'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all ${
                selectedType === type ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* AI Output Preview */}
        {activeReport && (
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                {activeReport.reportType} • {activeReport.generatedAt}
              </span>
              <span className="text-[10px] font-extrabold text-purple-600">Executive AI Summary</span>
            </div>

            <h3 className="font-extrabold text-xs text-slate-900">{activeReport.title}</h3>
            <p className="text-xs text-slate-800 font-medium leading-relaxed bg-white p-3.5 rounded-xl border border-purple-100">
              "{activeReport.executiveSummary}"
            </p>

            <div className="space-y-1 text-xs">
              <span className="font-extrabold text-slate-900 block">AI Recommended Strategic Actions:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-700 font-medium">
                {activeReport.recommendedActions.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs">
            Close Generator
          </button>

          <button
            onClick={() => {
              if (activeReport) onDownloadAiReport(activeReport.title);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF Pack</span>
          </button>
        </div>
      </div>
    </div>
  );
}
