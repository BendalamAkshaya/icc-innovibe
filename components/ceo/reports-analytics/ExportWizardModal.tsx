'use client';

import React, { useState } from 'react';
import { Download, X, FileText, Presentation, FileSpreadsheet, Lock, ShieldCheck, Check } from 'lucide-react';
import { generateReportCsv, downloadClientExportFile } from '../../../lib/quick-actions-handler';

interface ExportWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportWizardModal({ isOpen, onClose }: ExportWizardModalProps) {
  const [format, setFormat] = useState<'CSV' | 'PDF' | 'PPTX'>('CSV');
  const [watermark, setWatermark] = useState(true);
  const [encryption, setEncryption] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setSuccess(false);

    setTimeout(() => {
      if (format === 'CSV') {
        const headers = ['Report Category', 'Metric', 'Current Period', 'Target', 'Status'];
        const rows = [
          ['Business Revenue', 'Gross Revenue', '₹12,45,000', '₹10,000,00', 'EXCEEDING'],
          ['Fleet IoT', 'Active Connected EVs', '148 EVs', '140 EVs', 'OPTIMAL'],
          ['Department Performance', 'Overall Health Score', '93 / 100', '90 / 100', 'EXCEEDING'],
          ['Risk Index', 'Operational Risk Index', '18 / 100', '< 25', 'LOW_RISK'],
        ];
        const csvContent = generateReportCsv(`InnoVibe Executive Intelligence Pack (Watermarked)`, headers, rows);
        downloadClientExportFile(`InnoVibe_Executive_Intelligence_${Date.now()}.csv`, csvContent);
      } else {
        const docWindow = window.open('', '_blank');
        if (docWindow) {
          docWindow.document.write(`
            <html>
            <head><title>InnoVibe Encrypted Executive Pack</title></head>
            <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #fff;">
              <h1 style="color: #38bdf8;">INNOVIBE EXECUTIVE INTELLIGENCE REPORT</h1>
              <p>CONFIDENTIAL • WATERMARKED FOR SRI HARI KOLUSU • ${new Date().toLocaleDateString()}</p>
              <hr />
              <h2>Q2 2026 Executive Summary</h2>
              <p>Gross Revenue: ₹12,45,000 | Net Operating Margin: 30.8% | Connected Fleet: 148 EVs</p>
              <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
          `);
          docWindow.document.close();
        }
      }

      setIsExporting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" suppressHydrationWarning>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden space-y-0 relative text-left">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
              <Download className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Executive Export & Distribution Wizard</h2>
              <p className="text-xs text-slate-400 font-medium">Configure encryption, format, watermarking, and security expiry.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Format Selection */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">Export File Format</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat('CSV')}
                className={`p-3 rounded-2xl border text-xs font-black text-center flex items-center justify-center gap-2 transition-all ${
                  format === 'CSV' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <FileSpreadsheet className="h-4 w-4" /> CSV / Excel
              </button>
              <button
                type="button"
                onClick={() => setFormat('PDF')}
                className={`p-3 rounded-2xl border text-xs font-black text-center flex items-center justify-center gap-2 transition-all ${
                  format === 'PDF' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <FileText className="h-4 w-4" /> Printable PDF
              </button>
              <button
                type="button"
                onClick={() => setFormat('PPTX')}
                className={`p-3 rounded-2xl border text-xs font-black text-center flex items-center justify-center gap-2 transition-all ${
                  format === 'PPTX' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Presentation className="h-4 w-4" /> Board Deck
              </button>
            </div>
          </div>

          {/* Security & Watermark Toggles */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-extrabold text-slate-900">Executive CEO Watermark</p>
                <p className="text-[10px] text-slate-500">Stamp PDF/Image with dynamic watermark & timestamp.</p>
              </div>
              <input
                type="checkbox"
                checked={watermark}
                onChange={(e) => setWatermark(e.target.checked)}
                className="h-4 w-4 rounded text-emerald-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-extrabold text-slate-900">256-Bit Encrypted Vault Link</p>
                <p className="text-[10px] text-slate-500">Requires CEO PIN / Auth signature to view download link.</p>
              </div>
              <input
                type="checkbox"
                checked={encryption}
                onChange={(e) => setEncryption(e.target.checked)}
                className="h-4 w-4 rounded text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs text-white flex items-center gap-2 transition-all shadow-md ${
              success ? 'bg-emerald-600' : isExporting ? 'bg-emerald-400 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
            }`}
          >
            {success ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            <span>{success ? 'Export Complete!' : isExporting ? 'Generating Package...' : `Export Package (${format})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
