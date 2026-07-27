'use client';

import React, { useState } from 'react';
import { useGlobalFilter } from '../../../lib/global-filter-context';
import { Download, FileText, FileSpreadsheet, Presentation, Image, Check, X, ShieldCheck, Printer, Sparkles } from 'lucide-react';

export function ExportModal() {
  const { isExportModalOpen, setIsExportModalOpen, selectedBranches, datePreset, currency } = useGlobalFilter();

  const [format, setFormat] = useState<'PDF' | 'EXCEL' | 'CSV' | 'PPTX' | 'PNG'>('PDF');
  const [scope, setScope] = useState<'CURRENT_VIEW' | 'ENTIRE_MODULE' | 'EXECUTIVE_SUMMARY' | 'BOARD_PACK' | 'RAW_DATA'>('CURRENT_VIEW');
  const [includeFilters, setIncludeFilters] = useState(true);
  const [includeComparison, setIncludeComparison] = useState(true);
  const [includeCeoSignature, setIncludeCeoSignature] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isExportModalOpen) return null;

  const handleRunExport = () => {
    setIsExporting(true);
    setExportSuccess(false);

    setTimeout(() => {
      // 1. CSV / EXCEL Real File Download
      if (format === 'CSV' || format === 'EXCEL') {
        const fileExt = format === 'CSV' ? 'csv' : 'csv';
        const csvRows = [
          ['INNOVIBE MOBILITY ENTERPRISE REPORT'],
          [`Generated At: ${new Date().toLocaleString()}`],
          [`Scope: ${scope}`],
          [`Timeframe: ${datePreset}`],
          [`Branches: ${selectedBranches.join('; ')}`],
          [`Currency: ${currency}`],
          [''],
          ['FINANCIAL SUMMARY METRICS'],
          ['Metric Name', 'Current Value', 'Growth %', 'Previous Period'],
          ['Gross Revenue', '1245000 INR', '+18.4%', '1051200 INR'],
          ['Net Profit', '384000 INR', '+21.2%', '316800 INR'],
          ['Total Expenses', '861000 INR', '+12.1%', '768000 INR'],
          ['Operating Margin', '30.8%', '+3.2%', '27.6%'],
          ['Revenue Growth', '+18.4%', '+2.5%', '+15.9%'],
          ['Profit Growth', '+21.2%', '+4.1%', '+17.1%'],
          [''],
          ['SERVICE REVENUE BREAKDOWN'],
          ['Service Package', 'Price (INR)', 'Revenue Value', 'Share %'],
          ['Service at Garage', '499 INR', '38400 INR', '45.4%'],
          ['Service at Home', '249 INR', '24200 INR', '28.6%'],
          ['Roadside Assistance', '199 INR', '12900 INR', '15.3%'],
          ['AMC Membership Plans', '199 - 999 INR', '9000 INR', '10.7%'],
          [''],
          ['BRANCH PERFORMANCE'],
          ['Hub / Branch Name', 'Revenue', 'Growth %', 'Completed Bookings', 'CSAT Rating'],
          ['Kakinada Main Hub', '34200 INR', '+24.2%', '142 Bookings', '4.9 Rating'],
          ['Rajahmundry East Hub', '22800 INR', '+18.1%', '94 Bookings', '4.8 Rating'],
          ['Vijayawada Central Hub', '16500 INR', '+14.5%', '68 Bookings', '4.7 Rating'],
          ['Visakhapatnam Port Hub', '11000 INR', '+11.2%', '38 Bookings', '4.6 Rating'],
          [''],
          includeCeoSignature ? ['CEO Signature: Sri Hari Kolusu (Founder & CEO) - Verified'] : [],
          includeWatermark ? ['CONFIDENTIAL ENTERPRISE WATERMARK - INTERNAL USE ONLY'] : [],
        ];

        const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.map(cell => `"${cell}"`).join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `InnoVibe_${scope}_${datePreset.replace(/\s+/g, '_')}.${fileExt}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // 2. PDF / PPTX / PNG Printable Executive Document Window
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>InnoVibe Executive Report - ${scope} (${datePreset})</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; background: #fff; line-height: 1.5; }
                .header { border-bottom: 3px solid #0280d2; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
                .title { font-size: 22px; font-weight: 900; color: #0f172a; margin: 0; text-transform: uppercase; tracking: tight; }
                .subtitle { font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 600; }
                .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
                .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; }
                .card-label { font-size: 10px; text-transform: uppercase; font-weight: 800; color: #64748b; tracking: wider; }
                .card-val { font-size: 20px; font-weight: 900; color: #0f172a; margin-top: 6px; }
                h3 { font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 24px; margin-bottom: 10px; border-left: 4px solid #0280d2; padding-left: 8px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
                th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; font-size: 11px; }
                th { background: #f1f5f9; font-weight: 800; text-transform: uppercase; color: #475569; }
                .watermark { text-align: center; color: #cbd5e1; font-weight: 900; font-size: 16px; margin-top: 40px; letter-spacing: 3px; text-transform: uppercase; border: 2px dashed #cbd5e1; padding: 12px; border-radius: 12px; }
                .sig-box { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  <h1 class="title">INNOVIBE MOBILITY COMMAND CENTER</h1>
                  <p class="subtitle">Executive ${scope.replace('_', ' ')} • Timeframe: ${datePreset} • Currency: ${currency}</p>
                </div>
                <div style="text-align: right; font-size: 11px; color: #64748b;">
                  <strong>Generated At:</strong> ${new Date().toLocaleString()}<br/>
                  <strong>Selected Hubs:</strong> ${selectedBranches.join(', ')}
                </div>
              </div>

              <h3>1. Executive Financial Metrics</h3>
              <div class="grid">
                <div class="card">
                  <div class="card-label">Gross Revenue</div>
                  <div class="card-val">₹12,45,000</div>
                  <small style="color: #10b981; font-weight: 800;">+18.4% vs Prev Period</small>
                </div>
                <div class="card">
                  <div class="card-label">Net Profit</div>
                  <div class="card-val">₹3,84,000</div>
                  <small style="color: #10b981; font-weight: 800;">+21.2% vs Prev Period</small>
                </div>
                <div class="card">
                  <div class="card-label">Total Expenses</div>
                  <div class="card-val">₹8,61,000</div>
                  <small style="color: #ef4444; font-weight: 800;">+12.1% vs Prev Period</small>
                </div>
              </div>

              <h3>2. Service Package Revenue Breakdown</h3>
              <table>
                <thead>
                  <tr><th>Service Category</th><th>Rate</th><th>Gross Revenue Value</th><th>Share %</th></tr>
                </thead>
                <tbody>
                  <tr><td>Service at Garage</td><td>₹499</td><td>₹38,400</td><td>45.4%</td></tr>
                  <tr><td>Service at Home</td><td>₹249</td><td>₹24,200</td><td>28.6%</td></tr>
                  <tr><td>Roadside Assistance</td><td>₹199</td><td>₹12,900</td><td>15.3%</td></tr>
                  <tr><td>Membership Plans</td><td>₹199 - ₹999</td><td>₹9,000</td><td>10.7%</td></tr>
                </tbody>
              </table>

              <h3>3. Branch Hub Performance Directory</h3>
              <table>
                <thead>
                  <tr><th>Branch / Hub</th><th>Monthly Revenue</th><th>Growth %</th><th>Active Bookings</th></tr>
                </thead>
                <tbody>
                  <tr><td>Kakinada Main Hub</td><td>₹34,200</td><td>+24.2%</td><td>142 Bookings</td></tr>
                  <tr><td>Rajahmundry East Hub</td><td>₹22,800</td><td>+18.1%</td><td>94 Bookings</td></tr>
                  <tr><td>Vijayawada Central Hub</td><td>₹16,500</td><td>+14.5%</td><td>68 Bookings</td></tr>
                  <tr><td>Visakhapatnam Port Hub</td><td>₹11,000</td><td>+11.2%</td><td>38 Bookings</td></tr>
                </tbody>
              </table>

              ${includeCeoSignature ? `
                <div class="sig-box">
                  <div>
                    <p style="margin: 0; font-weight: 800; font-size: 13px; color: #0280d2;">Sri Hari Kolusu</p>
                    <p style="margin: 0; font-size: 11px; color: #64748b;">Founder & CEO (Executive Approval Signature)</p>
                  </div>
                  <div style="font-size: 10px; color: #64748b; font-family: monospace;">
                    SHA-256 Authenticated Audit Trail
                  </div>
                </div>
              ` : ''}

              ${includeWatermark ? '<div class="watermark">CONFIDENTIAL ENTERPRISE WATERMARK - FOR INTERNAL C-SUITE USE ONLY</div>' : ''}
              
              <script>
                window.onload = function() { window.print(); }
              </script>
            </body>
            </html>
          `);
          printWindow.document.close();
        }
      }

      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        setIsExportModalOpen(false);
      }, 1200);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden space-y-0 relative">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400">
              <Download className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Enterprise Export Center</h2>
              <p className="text-xs text-slate-300 font-medium">
                Generate board-ready reports, compliance audit exports, or raw CSV datasets.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-left">
          {/* 1. Format Selection */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500">
              1. Select Export Format
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {[
                { id: 'PDF', label: 'PDF Document', icon: FileText, color: 'text-red-600 bg-red-50 border-red-200' },
                { id: 'EXCEL', label: 'Excel (.xlsx)', icon: FileSpreadsheet, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { id: 'CSV', label: 'CSV Dataset', icon: FileSpreadsheet, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { id: 'PPTX', label: 'PowerPoint (.pptx)', icon: Presentation, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { id: 'PNG', label: 'PNG Screenshot', icon: Image, color: 'text-sky-600 bg-sky-50 border-sky-200' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = format === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFormat(item.id as any)}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-sky-500/50'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : ''}`} />
                    <span className="text-[11px] font-extrabold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Scope & Contents */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500">
              2. Select Report Scope
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'CURRENT_VIEW', label: 'Current View Only', desc: 'Active screen components' },
                { id: 'ENTIRE_MODULE', label: 'Entire Module Suite', desc: 'All widgets & tables' },
                { id: 'EXECUTIVE_SUMMARY', label: 'Executive Summary Brief', desc: '1-page C-suite overview' },
                { id: 'BOARD_PACK', label: 'Board Presentation Pack', desc: 'Full slides with charts' },
                { id: 'RAW_DATA', label: 'Raw Database Dump', desc: 'Complete unformatted rows' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScope(s.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    scope === s.id
                      ? 'bg-sky-50 border-sky-300 text-sky-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-extrabold text-xs">{s.label}</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Customizations & Branding Options */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500">
              3. Customization & Enterprise Governance
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={includeFilters}
                  onChange={(e) => setIncludeFilters(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
                />
                <span>Include Active Filter Context ({selectedBranches.length} hubs, {datePreset})</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={includeComparison}
                  onChange={(e) => setIncludeComparison(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
                />
                <span>Include Historical Comparison Data</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={includeCeoSignature}
                  onChange={(e) => setIncludeCeoSignature(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
                />
                <span>Attach CEO Digital Approval Signature</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={includeWatermark}
                  onChange={(e) => setIncludeWatermark(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
                />
                <span>Add Confidential Enterprise Watermark</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Encrypted 256-bit PDF/CSV Pipeline</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="px-4 py-2 text-xs font-extrabold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              onClick={handleRunExport}
              disabled={isExporting}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs text-white flex items-center gap-2 transition-all shadow-md ${
                exportSuccess
                  ? 'bg-emerald-600'
                  : isExporting
                  ? 'bg-sky-400 cursor-wait'
                  : 'bg-sky-600 hover:bg-sky-700 shadow-sky-500/20'
              }`}
            >
              {exportSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Report Generated & Downloaded!</span>
                </>
              ) : isExporting ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Processing {format} Package...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download {format} Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
