'use client';

import React from 'react';
import { BoardInvestorReport } from '../../../lib/types';
import { FileText, Download, ShieldCheck, Lock, ArrowUpRight } from 'lucide-react';

interface BoardInvestorCommSectionProps {
  reports: BoardInvestorReport[];
  onDownloadReport?: (title: string) => void;
}

export function BoardInvestorCommSection({ reports, onDownloadReport }: BoardInvestorCommSectionProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">Board & Investor Communication Vault</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Encrypted corporate governance reports, investor growth pitch decks, and AGM filings.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
          Encrypted Repository
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 transition-all hover:bg-white hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {doc.type.replace('_', ' ')}
                </span>
                <span className="text-[9px] font-extrabold text-slate-400 flex items-center gap-1">
                  <Lock className="h-3 w-3 text-slate-400" /> {doc.accessLevel}
                </span>
              </div>

              <h3 className="font-extrabold text-xs text-slate-900 leading-snug">{doc.documentTitle}</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Uploaded: {doc.uploadedAt} • {doc.fileSize}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">{doc.downloadCount} Access Downloads</span>

              <button
                onClick={() => onDownloadReport && onDownloadReport(doc.documentTitle)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs inline-flex items-center gap-1 transition-all"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Vault PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
