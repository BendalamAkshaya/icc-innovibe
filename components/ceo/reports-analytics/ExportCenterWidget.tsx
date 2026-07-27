'use client';

import React from 'react';
import { Download, FileText, Share2, ShieldCheck, Link2 } from 'lucide-react';

interface ExportCenterWidgetProps {
  onExportFormat: (format: string) => void;
}

export function ExportCenterWidget({ onExportFormat }: ExportCenterWidgetProps) {
  const formats = [
    { id: 'fmt_pdf', label: 'PDF Board Deck', desc: 'Presentation-Ready PDF', icon: FileText, color: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'fmt_xls', label: 'Excel Ledger Data', desc: 'Raw Financial & Telemetry CSV', icon: Download, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'fmt_ppt', label: 'PowerPoint Deck (.pptx)', desc: 'Board Slide Presentation', icon: Share2, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'fmt_link', label: 'Secure Dashboard Link', desc: 'Time-Limited Access Link', icon: Link2, color: 'bg-sky-50 text-sky-700 border-sky-200' },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-emerald-600" />
          <h2 className="text-base font-extrabold text-slate-900">Executive Export & Secure Sharing Center</h2>
        </div>
        <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
          AES-256 Encrypted
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {formats.map((fmt) => {
          const Icon = fmt.icon;
          return (
            <button
              key={fmt.id}
              onClick={() => onExportFormat(fmt.label)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all shadow-xs hover:shadow-md ${fmt.color}`}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-wider">Export</span>
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-slate-900">{fmt.label}</h3>
                <p className="text-[10px] text-slate-500 font-medium">{fmt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
