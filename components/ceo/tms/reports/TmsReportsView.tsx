'use client';

import React, { useState, useEffect } from 'react';
import {
  ReportType,
  ExportFormat,
  DateRangeOption,
  EmployeeSelectionOption,
  ReportConfig,
  GeneratedReportData,
} from '../../../../lib/report-models';
import { ReportService } from '../../../../lib/report-service';
import { DepartmentItem } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import {
  Download,
  FileSpreadsheet,
  FileCode,
  FileText,
  Calendar,
  Filter,
  CheckCircle2,
  Users,
  Building2,
  CheckSquare,
  Activity,
  CalendarCheck,
  Check,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export function TmsReportsView() {
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);

  // Configuration state
  const [reportType, setReportType] = useState<ReportType>('ATTENDANCE');
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>('LAST_30_DAYS');
  const [specificDate, setSpecificDate] = useState('2026-08-06');
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-06');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('CSV');
  const [employeeSelection, setEmployeeSelection] = useState<EmployeeSelectionOption>('ENTIRE_ORG');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [includeInactive, setIncludeInactive] = useState(true);
  const [includeArchived, setIncludeArchived] = useState(false);

  // Status & Live Preview State
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewData, setPreviewData] = useState<GeneratedReportData | null>(null);

  useEffect(() => {
    const loadDepts = async () => {
      const list = await DepartmentService.getAll();
      setDepartments(list);
    };
    loadDepts();
  }, []);

  // Update live preview whenever config changes
  useEffect(() => {
    const config: ReportConfig = {
      reportType,
      dateRangeOption,
      specificDate,
      startDate,
      endDate,
      exportFormat,
      employeeSelection,
      selectedDepartment,
      includeInactive,
      includeArchived,
    };

    ReportService.generate(config).then((data) => {
      setPreviewData(data);
    });
  }, [
    reportType,
    dateRangeOption,
    specificDate,
    startDate,
    endDate,
    exportFormat,
    employeeSelection,
    selectedDepartment,
    includeInactive,
    includeArchived,
  ]);

  const handleGenerateAndDownload = async () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    const config: ReportConfig = {
      reportType,
      dateRangeOption,
      specificDate,
      startDate,
      endDate,
      exportFormat,
      employeeSelection,
      selectedDepartment,
      includeInactive,
      includeArchived,
    };

    // Simulate progress effect
    setTimeout(async () => {
      const data = await ReportService.export(config);
      setPreviewData(data);
      setIsGenerating(false);
      setDownloadSuccess(true);

      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Download className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Export Reports
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Reporting & Export Engine
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Generate and download organizational data in PDF, Excel, or CSV formats.
          </p>
        </div>

        {downloadSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-apfel text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Report Downloaded Successfully!</span>
          </div>
        )}
      </div>

      {/* 2. Large Report Configuration Panel */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-2xs space-y-8">
        {/* Step 1: Select Report Type */}
        <div className="space-y-3">
          <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
            1. SELECT REPORT TYPE
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 font-apfel">
            {/* Card 1: Attendance */}
            <div
              onClick={() => setReportType('ATTENDANCE')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                reportType === 'ATTENDANCE'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white text-[#d97706] shadow-2xs border border-slate-100">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-gotham text-xs font-bold">Attendance Report</h3>
                <p className="font-sans text-[11px] text-slate-500">Check-in times, cutoff compliance, absent & leave metrics</p>
              </div>
            </div>

            {/* Card 2: Productivity Metrics */}
            <div
              onClick={() => setReportType('PRODUCTIVITY')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                reportType === 'PRODUCTIVITY'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white text-emerald-600 shadow-2xs border border-slate-100">
                <Activity className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-gotham text-xs font-bold">Productivity Metrics</h3>
                <p className="font-sans text-[11px] text-slate-500">Performance scores, efficiency ratings & work output</p>
              </div>
            </div>

            {/* Card 3: Tasks & Assignments */}
            <div
              onClick={() => setReportType('TASKS')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                reportType === 'TASKS'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white text-sky-600 shadow-2xs border border-slate-100">
                <CheckSquare className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-gotham text-xs font-bold">Tasks & Assignments</h3>
                <p className="font-sans text-[11px] text-slate-500">Deliverables status, priority breakdown & deadlines</p>
              </div>
            </div>

            {/* Card 4: Employees Directory */}
            <div
              onClick={() => setReportType('EMPLOYEES')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                reportType === 'EMPLOYEES'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white text-purple-600 shadow-2xs border border-slate-100">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-gotham text-xs font-bold">Employees Directory</h3>
                <p className="font-sans text-[11px] text-slate-500">Complete workforce roster, roles & portal credentials</p>
              </div>
            </div>

            {/* Card 5: Departments Overview */}
            <div
              onClick={() => setReportType('DEPARTMENTS')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                reportType === 'DEPARTMENTS'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white text-indigo-600 shadow-2xs border border-slate-100">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-gotham text-xs font-bold">Departments Overview</h3>
                <p className="font-sans text-[11px] text-slate-500">Department heads, staff count & operational hierarchy</p>
              </div>
            </div>

            {/* Card 6: Leave Approvals */}
            <div
              onClick={() => setReportType('LEAVE_REPORTS')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                reportType === 'LEAVE_REPORTS'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white text-rose-600 shadow-2xs border border-slate-100">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-gotham text-xs font-bold">Leave Approvals</h3>
                <p className="font-sans text-[11px] text-slate-500">PTO applications, duration breakdown & decision logs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Date Range Selection */}
        <div className="space-y-3">
          <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
            2. DATE RANGE TIMELINE
          </label>
          <div className="flex flex-wrap items-center gap-2 font-apfel text-xs">
            {(['TODAY', 'LAST_7_DAYS', 'LAST_30_DAYS', 'SPECIFIC_DATE', 'CUSTOM_RANGE'] as DateRangeOption[]).map(
              (opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDateRangeOption(opt)}
                  className={`px-4 py-2 rounded-xl font-extrabold transition-all ${
                    dateRangeOption === opt
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.replace(/_/g, ' ')}
                </button>
              )
            )}
          </div>

          {/* Date Picker Input */}
          {dateRangeOption === 'SPECIFIC_DATE' && (
            <div className="pt-2 max-w-xs">
              <input
                type="date"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-apfel text-xs text-slate-800 outline-none"
              />
            </div>
          )}

          {dateRangeOption === 'CUSTOM_RANGE' && (
            <div className="pt-2 flex items-center gap-3 max-w-md font-apfel text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">FROM DATE</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none"
                />
              </div>
              <span className="text-slate-400 mt-5 font-bold">→</span>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">TO DATE</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Export Format Cards */}
        <div className="space-y-3">
          <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
            3. EXPORT FORMAT
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 font-apfel">
            {/* CSV */}
            <div
              onClick={() => setExportFormat('CSV')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                exportFormat === 'CSV'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-400 text-slate-700'
              }`}
            >
              <FileCode className="h-5 w-5 text-amber-500" />
              <div>
                <h4 className="font-gotham text-xs font-bold">CSV File</h4>
                <p className="text-[10px] opacity-70">Raw tabular data (.csv)</p>
              </div>
            </div>

            {/* Excel */}
            <div
              onClick={() => setExportFormat('EXCEL')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                exportFormat === 'EXCEL'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-400 text-slate-700'
              }`}
            >
              <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
              <div>
                <h4 className="font-gotham text-xs font-bold">Excel Spreadsheet</h4>
                <p className="text-[10px] opacity-70">Formatted workbook (.xls)</p>
              </div>
            </div>

            {/* PDF */}
            <div
              onClick={() => setExportFormat('PDF')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                exportFormat === 'PDF'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-400 text-slate-700'
              }`}
            >
              <FileText className="h-5 w-5 text-rose-500" />
              <div>
                <h4 className="font-gotham text-xs font-bold">PDF Document</h4>
                <p className="text-[10px] opacity-70">Printable document (.pdf)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Dynamic Context Filters */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
            4. DYNAMIC CONTEXT FILTERS
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-apfel text-xs">
            {/* Employee Selection */}
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1.5">
                Target Audience
              </span>
              <select
                value={employeeSelection}
                onChange={(e) => setEmployeeSelection(e.target.value as EmployeeSelectionOption)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold outline-none"
              >
                <option value="ENTIRE_ORG">Entire Organization</option>
                <option value="DEPARTMENT">Department Only</option>
                <option value="DEPARTMENT_HEADS">Department Heads Only</option>
                <option value="ACTIVE_MEMBERS">Active Members Only</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1.5">
                Department Scope
              </span>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold outline-none"
              >
                <option value="ALL">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.departmentName}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col justify-end space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={includeInactive}
                  onChange={(e) => setIncludeInactive(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <span>Include Inactive Employees</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold opacity-60">
                <input
                  type="checkbox"
                  checked={includeArchived}
                  onChange={(e) => setIncludeArchived(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <span>Include Archived Historical Records</span>
              </label>
            </div>
          </div>
        </div>

        {/* Generate & Download Primary Button */}
        <div className="pt-4 flex items-center justify-end">
          <button
            onClick={handleGenerateAndDownload}
            disabled={isGenerating}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating {exportFormat} Report...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Generate & Download {exportFormat} Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Live Report Dataset Preview Table */}
      {previewData && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-gotham text-sm font-bold text-slate-900">
                Live Data Preview: {previewData.reportTitle}
              </h3>
              <p className="font-sans text-xs text-slate-500">
                Found <span className="font-bold text-amber-700">{previewData.recordCount}</span> matching records from browser storage.
              </p>
            </div>

            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              Format: {exportFormat}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] font-montserrat tracking-wider font-extrabold">
                  {previewData.headers.map((h, i) => (
                    <th key={i} className="pb-3 px-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {previewData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-2 font-apfel text-slate-800">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
