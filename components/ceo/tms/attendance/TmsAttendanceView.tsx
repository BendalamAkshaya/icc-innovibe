'use client';

import React, { useState, useEffect } from 'react';
import {
  AttendanceRecord,
  AttendanceKpis,
  AttendanceFilterParams,
  AttendanceStatus,
} from '../../../../lib/attendance-models';
import { AttendanceService } from '../../../../lib/attendance-service';
import { AttendanceProfileModal } from './AttendanceProfileModal';
import {
  UserCheck,
  Users,
  Clock,
  AlertCircle,
  Download,
  Search,
  Filter,
  Eye,
  Calendar,
  Building2,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  FileCode,
} from 'lucide-react';

export function TmsAttendanceView() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [kpis, setKpis] = useState<AttendanceKpis>({
    totalStrength: 148,
    presentToday: 139,
    includesLateCount: 8,
    lateCheckIns: 8,
    absentToday: 9,
    leaveToday: 3,
    wfhToday: 4,
  });

  // Date & Filter States
  const [dateSelection, setDateSelection] = useState<
    'TODAY' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'CUSTOM' | 'SPECIFIC_DATE'
  >('TODAY');

  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load Data via AttendanceService
  const loadAttendanceData = async () => {
    setIsLoading(true);
    const filters: AttendanceFilterParams = {
      dateRangeSelection: dateSelection,
      department: selectedDepartment,
      role: selectedRole,
      status: selectedStatus,
      searchQuery,
    };

    const dataList = await AttendanceService.getAttendanceRecords(filters);
    const kpiSummary = await AttendanceService.getAttendanceKpis();

    setRecords(dataList);
    setKpis(kpiSummary);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAttendanceData();
    const unsubscribe = AttendanceService.onAttendanceUpdated(() => {
      loadAttendanceData();
    });
    return () => unsubscribe();
  }, [dateSelection, selectedDepartment, selectedRole, selectedStatus, searchQuery]);

  const handleExport = async (format: 'PDF' | 'EXCEL' | 'CSV') => {
    const exportJob = await AttendanceService.exportAttendanceReport(format, {
      department: selectedDepartment,
      dateRangeSelection: dateSelection,
      status: selectedStatus,
    });
    alert(`Export job created! Report downloading in ${exportJob.format} format.`);
    setIsExportOpen(false);
  };

  const getStatusBadgeStyle = (status: AttendanceStatus) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'LATE':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'ABSENT':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'HALF_DAY':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'LEAVE':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'WORK_FROM_HOME':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-emerald-500';
    if (percentage >= 85) return 'bg-[#d97706]';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <UserCheck className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Attendance Dashboard
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Biometric Presence
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Enterprise workforce presence monitoring, biometric time-tracking, and shift exit logs.
          </p>
        </div>

        {/* Top-Right Department Filter Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2 font-apfel text-xs">
            <Building2 className="h-4 w-4 text-slate-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-transparent font-bold text-slate-800 outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Technology">Technology</option>
              <option value="Fleet Operations">Fleet Operations</option>
              <option value="Executive Office">Executive Office</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Date Selection Toolbar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto font-apfel text-xs">
        {[
          { key: 'TODAY', label: 'Today (Aug 06)' },
          { key: 'LAST_7_DAYS', label: 'Last 7 Days' },
          { key: 'LAST_30_DAYS', label: 'Last 30 Days' },
          { key: 'CUSTOM', label: 'Custom Range' },
          { key: 'SPECIFIC_DATE', label: 'Specific Date' },
        ].map((tab) => {
          const active = dateSelection === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setDateSelection(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
                active
                  ? 'text-[#92400e] bg-[#fef3c7] border border-[#fde68a] font-extrabold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Strength */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                TOTAL STRENGTH
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {kpis.totalStrength}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-slate-600">Active Workforce Roster</span>
            <span className="text-slate-400">100% Enrolled</span>
          </div>
        </div>

        {/* KPI 2: Present Today */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                PRESENT TODAY
              </span>
              <p className="font-apfel text-2xl font-black text-emerald-600 tracking-tight leading-none mt-1">
                {kpis.presentToday}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <UserCheck className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-emerald-600">Includes {kpis.includesLateCount} Late Arrivals</span>
            <span className="text-slate-400">93.9% Rate</span>
          </div>
        </div>

        {/* KPI 3: Late Check-ins */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                LATE CHECK-INS
              </span>
              <p className="font-apfel text-2xl font-black text-amber-700 tracking-tight leading-none mt-1">
                {kpis.lateCheckIns}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-amber-700">Flagged Biometric Shifts</span>
            <span className="text-slate-400">Requires Review</span>
          </div>
        </div>

        {/* KPI 4: Absent Today */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                ABSENT TODAY
              </span>
              <p className="font-apfel text-2xl font-black text-rose-600 tracking-tight leading-none mt-1">
                {kpis.absentToday}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-rose-600">6 Unexcused, 3 PTO</span>
            <span className="text-slate-400">HR Alerted</span>
          </div>
        </div>
      </div>

      {/* 4. Attendance Roll Call Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-5">
        {/* Title & Export Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="font-gotham text-base font-extrabold text-slate-900">Attendance Roll Call</h2>
            <span className="font-apfel text-xs font-bold text-slate-400">• Aug 06, 2026</span>
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-apfel font-bold text-xs shadow-2xs flex items-center gap-2 transition-all"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Export Attendance</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 font-apfel text-xs animate-in fade-in duration-150">
                <button
                  onClick={() => handleExport('PDF')}
                  className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-rose-500" /> Export as PDF
                </button>
                <button
                  onClick={() => handleExport('EXCEL')}
                  className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export as Excel
                </button>
                <button
                  onClick={() => handleExport('CSV')}
                  className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-2"
                >
                  <FileCode className="h-4 w-4 text-sky-500" /> Export as CSV
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search & Multi-Filters Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pt-1">
          {/* Search Box */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 w-full lg:w-80 shadow-2xs">
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or department..."
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto font-apfel text-xs">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as AttendanceStatus | 'ALL')}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PRESENT">Present</option>
              <option value="LATE">Late</option>
              <option value="ABSENT">Absent</option>
              <option value="HALF_DAY">Half Day</option>
              <option value="LEAVE">On Leave</option>
              <option value="WORK_FROM_HOME">Work From Home</option>
            </select>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="Founder & CEO">Founder & CEO</option>
              <option value="HR Director">HR Director</option>
              <option value="Talent Acquisition Lead">Talent Lead</option>
              <option value="Fleet Operations Lead">Fleet Lead</option>
              <option value="Tech & Systems Architect">Tech Architect</option>
            </select>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] font-montserrat tracking-wider font-extrabold">
                <th className="pb-3 px-2">EMPLOYEE</th>
                <th className="pb-3 px-2">ROLE</th>
                <th className="pb-3 px-2">DEPARTMENT</th>
                <th className="pb-3 px-2">STATUS</th>
                <th className="pb-3 px-2">FIRST CHECK-IN</th>
                <th className="pb-3 px-2">LAST CHECK-OUT</th>
                <th className="pb-3 px-2">ATTENDANCE %</th>
                <th className="pb-3 px-2 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-apfel text-xs">
                    Loading attendance records...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-sans text-xs">
                    No attendance records match active filters.
                  </td>
                </tr>
              ) : (
                records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Employee Avatar & Name */}
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={rec.avatar}
                          alt={rec.employeeName}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(rec.employeeName)}&background=fef3c7&color=92400e`;
                          }}
                          className="h-8 w-8 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <p className="font-gotham text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                            {rec.employeeName}
                          </p>
                          <span className="font-apfel text-[10px] text-slate-400 font-medium">
                            {rec.employeeId}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-2 font-medium text-slate-700">
                      {rec.role}
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-2">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[10px] font-apfel">
                        {rec.department}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-2 font-apfel">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusBadgeStyle(
                          rec.status
                        )}`}
                      >
                        {rec.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* First Check-in */}
                    <td className="py-3.5 px-2 font-apfel text-slate-800 font-bold">
                      {rec.firstCheckIn}
                    </td>

                    {/* Last Check-out */}
                    <td className="py-3.5 px-2 font-apfel text-slate-600 font-medium">
                      {rec.lastCheckOut}
                    </td>

                    {/* Attendance % & Progress Bar */}
                    <td className="py-3.5 px-2 font-apfel">
                      <div className="flex items-center gap-2 w-28">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(rec.attendancePercentage)}`}
                            style={{ width: `${rec.attendancePercentage}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800 text-[10px]">
                          {rec.attendancePercentage}%
                        </span>
                      </div>
                    </td>

                    {/* Actions Button */}
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => setSelectedEmployeeId(rec.employeeId)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-apfel font-bold text-xs flex items-center gap-1.5 transition-colors ml-auto"
                        title="View Detailed Attendance Profile"
                      >
                        <Eye className="h-3.5 w-3.5 text-amber-700" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Profile Modal Drawer */}
      <AttendanceProfileModal
        employeeId={selectedEmployeeId}
        onClose={() => setSelectedEmployeeId(null)}
      />
    </div>
  );
}
