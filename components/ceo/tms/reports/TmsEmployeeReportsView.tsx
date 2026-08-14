'use client';

import React, { useState } from 'react';
import { ReportType, ExportFormat, DateRangeOption, ReportConfig } from '../../../../lib/report-models';
import { ReportService } from '../../../../lib/report-service';
import { Download, FileText, FileSpreadsheet, CheckCircle2, RefreshCw } from 'lucide-react';

export function TmsEmployeeReportsView() {
  const [reportType, setReportType] = useState<ReportType>('ATTENDANCE');
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>('LAST_30_DAYS');
  const [specificDate, setSpecificDate] = useState('2026-08-13');
  const [startDate, setStartDate] = useState('2026-07-15');
  const [endDate, setEndDate] = useState('2026-08-13');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('PDF');

  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleGenerateAndDownload = async () => {
    setIsGenerating(true);
    setSuccessMessage(false);

    const config: ReportConfig = {
      reportType,
      dateRangeOption,
      specificDate,
      startDate,
      endDate,
      exportFormat,
      employeeId: 'EMP-102',
      employeeSelection: 'ENTIRE_ORG',
      includeInactive: true,
      includeArchived: false,
    };

    setTimeout(async () => {
      try {
        await ReportService.export(config);
        setIsGenerating(false);
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 4000);
      } catch (err) {
        console.error('Failed to generate report:', err);
        setIsGenerating(false);
      }
    }, 600);
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      
      {/* 1. Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-black text-[#0F172A] tracking-tight">
          My Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Download your personal attendance and productivity history.
        </p>
      </div>

      {/* 2. Main Card: Generate Export Reports */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
        
        {/* Card Header & Subtitle */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Generate Export Reports
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Configure and download secure reports based on your portal scope.
            </p>
          </div>

          {successMessage && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Report Generated & Downloaded Successfully!</span>
            </div>
          )}
        </div>

        {/* 3-Column Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* COLUMN 1: REPORT TYPE */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">Report Type</label>
            <div className="space-y-2.5">
              
              {/* Attendance */}
              <button
                type="button"
                onClick={() => setReportType('ATTENDANCE')}
                className={`w-full py-3 px-4 rounded-2xl border text-xs text-left transition cursor-pointer ${
                  reportType === 'ATTENDANCE'
                    ? 'border-[#2563EB] text-[#2563EB] font-extrabold bg-blue-50/20 ring-2 ring-blue-100'
                    : 'border-slate-200 text-slate-700 font-semibold hover:border-blue-200'
                }`}
              >
                Attendance
              </button>

              {/* Productivity Metrics */}
              <button
                type="button"
                onClick={() => setReportType('PRODUCTIVITY')}
                className={`w-full py-3 px-4 rounded-2xl border text-xs text-left transition cursor-pointer ${
                  reportType === 'PRODUCTIVITY'
                    ? 'border-[#2563EB] text-[#2563EB] font-extrabold bg-blue-50/20 ring-2 ring-blue-100'
                    : 'border-slate-200 text-slate-700 font-semibold hover:border-blue-200'
                }`}
              >
                Productivity Metrics
              </button>

              {/* Tasks & Assignments */}
              <button
                type="button"
                onClick={() => setReportType('TASKS')}
                className={`w-full py-3 px-4 rounded-2xl border text-xs text-left transition cursor-pointer ${
                  reportType === 'TASKS'
                    ? 'border-[#2563EB] text-[#2563EB] font-extrabold bg-blue-50/20 ring-2 ring-blue-100'
                    : 'border-slate-200 text-slate-700 font-semibold hover:border-blue-200'
                }`}
              >
                Tasks & Assignments
              </button>

            </div>
          </div>

          {/* COLUMN 2: DATE RANGE */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">Date Range</label>
            <div className="space-y-2.5">
              
              {/* Last 7 Days */}
              <button
                type="button"
                onClick={() => setDateRangeOption('LAST_7_DAYS')}
                className={`w-full py-3 px-4 rounded-2xl border text-xs text-left transition cursor-pointer ${
                  dateRangeOption === 'LAST_7_DAYS'
                    ? 'border-[#2563EB] text-[#2563EB] font-extrabold bg-blue-50/20 ring-2 ring-blue-100'
                    : 'border-slate-200 text-slate-700 font-semibold hover:border-blue-200'
                }`}
              >
                Last 7 Days
              </button>

              {/* Last 30 Days */}
              <button
                type="button"
                onClick={() => setDateRangeOption('LAST_30_DAYS')}
                className={`w-full py-3 px-4 rounded-2xl border text-xs text-left transition cursor-pointer ${
                  dateRangeOption === 'LAST_30_DAYS'
                    ? 'border-[#2563EB] text-[#2563EB] font-extrabold bg-blue-50/20 ring-2 ring-blue-100'
                    : 'border-slate-200 text-slate-700 font-semibold hover:border-blue-200'
                }`}
              >
                Last 30 Days
              </button>

              {/* Specific Date */}
              <button
                type="button"
                onClick={() => setDateRangeOption('SPECIFIC_DATE')}
                className={`w-full py-3 px-4 rounded-2xl border text-xs text-left transition cursor-pointer ${
                  dateRangeOption === 'SPECIFIC_DATE'
                    ? 'border-[#2563EB] text-[#2563EB] font-extrabold bg-blue-50/20 ring-2 ring-blue-100'
                    : 'border-slate-200 text-slate-700 font-semibold hover:border-blue-200'
                }`}
              >
                Specific Date
              </button>

              {/* Custom Range */}
              <button
                type="button"
                onClick={() => setDateRangeOption('CUSTOM_RANGE')}
                className={`w-full py-3 px-4 rounded-2xl border text-xs text-left transition cursor-pointer ${
                  dateRangeOption === 'CUSTOM_RANGE'
                    ? 'border-[#2563EB] text-[#2563EB] font-extrabold bg-blue-50/20 ring-2 ring-blue-100'
                    : 'border-slate-200 text-slate-700 font-semibold hover:border-blue-200'
                }`}
              >
                Custom Range
              </button>

              {/* Dynamic Date Inputs */}
              {dateRangeOption === 'SPECIFIC_DATE' && (
                <div className="pt-1 animate-in fade-in duration-150">
                  <input
                    type="date"
                    value={specificDate}
                    onChange={(e) => setSpecificDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {dateRangeOption === 'CUSTOM_RANGE' && (
                <div className="pt-1 grid grid-cols-2 gap-2 animate-in fade-in duration-150 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">Start Date</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">End Date</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* COLUMN 3: EXPORT FORMAT */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">Export Format</label>
            <div className="space-y-3">
              
              {/* PDF Document */}
              <div
                onClick={() => setExportFormat('PDF')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  exportFormat === 'PDF'
                    ? 'border-rose-500 bg-rose-50/40 ring-2 ring-rose-100 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/50 hover:border-rose-300'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-rose-700">PDF Document</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Best for printing & sharing</p>
                </div>
              </div>

              {/* Excel Spreadsheet */}
              <div
                onClick={() => setExportFormat('EXCEL')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  exportFormat === 'EXCEL'
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/50 hover:border-blue-300'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800">Excel Spreadsheet</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Best for data analysis</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Generate & Download Primary Action Button (Bottom Right) */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="button"
            onClick={handleGenerateAndDownload}
            disabled={isGenerating}
            className="px-6 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl transition cursor-pointer flex items-center gap-2.5 shadow-md shadow-blue-600/10 active:scale-95 disabled:opacity-75"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating {exportFormat} Report...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate & Download</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
