'use client';

import React, { useState, useEffect } from 'react';
import { WorkSession, SessionStatus, LogoutKpis } from '../../../../lib/logout-models';
import { LogoutService } from '../../../../lib/logout-service';
import { DepartmentItem } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import { ViewReportModal } from './ViewReportModal';
import { DailyWorkReportModal } from './DailyWorkReportModal';
import {
  LogOut,
  Search,
  Clock,
  Building2,
  Calendar,
  Filter,
  User,
  FileText,
  CheckCircle2,
  AlertCircle,
  Activity,
  Eye,
  Plus,
} from 'lucide-react';

export function TmsLogoutReportsView() {
  const [sessions, setSessions] = useState<WorkSession[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [kpis, setKpis] = useState<LogoutKpis>({
    totalSessionsToday: 6,
    activeSessions: 1,
    reportsSubmittedToday: 4,
    autoClosedCount: 1,
    averageWorkingHours: 9.6,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<SessionStatus | 'ALL'>('ALL');

  // Modals
  const [selectedSessionForModal, setSelectedSessionForModal] = useState<WorkSession | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const list = await LogoutService.getAll();
    const depts = await DepartmentService.getAll();
    const summary = await LogoutService.getKpis();

    setSessions(list);
    setDepartments(depts);
    setKpis(summary);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'ALL' ? true : s.departmentName === selectedDepartment;
    const matchesStatus = selectedStatus === 'ALL' ? true : s.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const getStatusBadgeStyle = (status: SessionStatus) => {
    switch (status) {
      case 'LOGGED_OUT':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ACTIVE':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'AUTO_CLOSED':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <LogOut className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Logout Reports & Work Sessions
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Work Session Tracker
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Track employee daily work sessions from login to logout along with their end-of-day work summaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Submit End-of-Day Report</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-apfel">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">TOTAL SESSIONS TODAY</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{kpis.totalSessionsToday}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">REPORTS SUBMITTED TODAY</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{kpis.reportsSubmittedToday}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">ACTIVE SESSIONS NOW</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{kpis.activeSessions}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">AVG WORKING HOURS</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{kpis.averageWorkingHours} hrs</p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 3. Search & Multi-Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 w-full lg:w-96 shadow-2xs">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by employee name or role..."
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
            />
          </div>

          {/* Dynamic Counter & Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto font-apfel text-xs">
            {/* Dynamic Sessions Counter */}
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-extrabold">
              Sessions Found: {filteredSessions.length}
            </span>

            {/* Department (Dynamic from Department Repository) */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.departmentName}>
                  {d.departmentName}
                </option>
              ))}
            </select>

            {/* Session Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as SessionStatus | 'ALL')}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Session Statuses</option>
              <option value="LOGGED_OUT">Logged Out</option>
              <option value="ACTIVE">Active Now</option>
              <option value="AUTO_CLOSED">Auto Closed</option>
            </select>
          </div>
        </div>

        {/* 4. Work Sessions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-apfel text-xs">
              Loading Work Sessions Repository...
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-sans text-xs">
              No work sessions match active search filters.
            </div>
          ) : (
            filteredSessions.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedSessionForModal(s)}
                className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-amber-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={s.avatar}
                      alt={s.employeeName}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.employeeName)}&background=fef3c7&color=92400e`;
                      }}
                      className="h-10 w-10 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                    />
                    <div className="space-y-0.5">
                      <h3 className="font-gotham text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {s.employeeName}
                      </h3>
                      <p className="font-sans text-[11px] text-slate-400">
                        {s.role}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border font-apfel shrink-0 ${getStatusBadgeStyle(s.status)}`}>
                    {s.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Session Timings */}
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100/80 font-apfel text-xs grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">LOGIN</span>
                    <span className="font-bold text-emerald-700">{s.loginTime}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">LOGOUT</span>
                    <span className="font-bold text-amber-700">{s.logoutTime || '--'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">DURATION</span>
                    <span className="font-black text-slate-900">{s.duration}</span>
                  </div>
                </div>

                {/* Report Summary Snippet */}
                <div className="space-y-1">
                  <span className="font-montserrat text-[9px] font-extrabold uppercase text-slate-400 tracking-wider block">
                    WORK SUMMARY
                  </span>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {s.workReport ? s.workReport.workSummary : 'No detailed work report submitted for this session.'}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-apfel text-xs">
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {s.departmentName} • {s.date}
                  </span>

                  {s.workReport ? (
                    <button
                      onClick={() => setSelectedSessionForModal(s)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 font-extrabold border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Report</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 italic">No report submitted</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View Work Report Modal */}
      <ViewReportModal
        session={selectedSessionForModal}
        onClose={() => setSelectedSessionForModal(null)}
      />

      {/* Daily Work Checkout Modal */}
      <DailyWorkReportModal
        isOpen={isCheckoutModalOpen}
        sessionId={sessions.length > 0 ? sessions[0].id : 'SES-901'}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSubmitted={loadData}
      />
    </div>
  );
}
