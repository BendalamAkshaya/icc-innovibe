'use client';

import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Plus,
  Filter,
  Search,
  User,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Users,
  Briefcase,
  UserCheck,
  Building2,
  FileCheck,
  BarChart3,
  LogOut,
  Megaphone,
  Bell,
  Sliders,
  TrendingUp,
  Award,
  AlertTriangle,
  FileText,
  PieChart,
  UserPlus,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { CreateTaskModal } from './tasks/CreateTaskModal';
import { TmsAttendanceView } from './attendance/TmsAttendanceView';
import { TmsDepartmentsView } from './departments/TmsDepartmentsView';
import { TmsEmployeesView } from './employees/TmsEmployeesView';
import { TmsLeaveApprovalsView } from './leave/TmsLeaveApprovalsView';
import { TmsReportsView } from './reports/TmsReportsView';
import { TmsLogoutReportsView } from './logout/TmsLogoutReportsView';
import { TmsAnnouncementsView } from './announcements/TmsAnnouncementsView';
import { TmsNotificationsView } from './notifications/TmsNotificationsView';
import { TmsSettingsView } from './settings/TmsSettingsView';

interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  role: string;
  department: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT';
  dueDate: string;
  status: 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED' | 'PENDING';
  progressPercent: number;
}

const initialMockTasks: TaskItem[] = [
  {
    id: 'TMS-801',
    title: 'Q3 Executive HR Performance & Compensation Audit',
    assignee: 'Ananya Sharma',
    role: 'HR Director',
    department: 'Human Resources',
    priority: 'URGENT',
    dueDate: 'Aug 10, 2026',
    status: 'IN_PROGRESS',
    progressPercent: 65,
  },
  {
    id: 'TMS-802',
    title: 'Senior EV Telematics Engineer Recruitment & Onboarding',
    assignee: 'Vikram Mehta',
    role: 'Talent Acquisition Lead',
    department: 'Engineering & HR',
    priority: 'HIGH',
    dueDate: 'Aug 12, 2026',
    status: 'UNDER_REVIEW',
    progressPercent: 85,
  },
  {
    id: 'TMS-803',
    title: 'Zero Back-Office Operations Staff Workload Rebalancing',
    assignee: 'Rajesh Kumar',
    role: 'Operations Lead',
    department: 'Fleet Operations',
    priority: 'MEDIUM',
    dueDate: 'Aug 15, 2026',
    status: 'IN_PROGRESS',
    progressPercent: 40,
  },
  {
    id: 'TMS-804',
    title: 'Quarterly Employee Satisfaction & Mobility Safety Survey',
    assignee: 'Priya Verma',
    role: 'People Operations Specialist',
    department: 'Human Resources',
    priority: 'LOW',
    dueDate: 'Aug 20, 2026',
    status: 'PENDING',
    progressPercent: 10,
  },
  {
    id: 'TMS-805',
    title: 'Service Manager Attendance & KPI Verification Automated Pipeline',
    assignee: 'Srinivas Rao',
    role: 'Systems Architect',
    department: 'Tech & People Ops',
    priority: 'HIGH',
    dueDate: 'Aug 04, 2026',
    status: 'COMPLETED',
    progressPercent: 100,
  },
];

interface TmsModuleProps {
  subModule?: string;
}

export function TmsModule({ subModule = 'tms-dashboard' }: TmsModuleProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialMockTasks);
  const [activeTab, setActiveTab] = useState<'ALL' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  // If subModule is 'tms-tasks', render the Tasks management table view
  if (subModule === 'tms-tasks') {
    return <TmsTasksView tasks={tasks} setTasks={setTasks} />;
  }

  // If subModule is 'tms-dashboard' or 'tms', render the Actual Executive TMS Dashboard Overview
  if (subModule === 'tms-dashboard' || subModule === 'tms') {
    return <TmsDashboardView />;
  }

  // If subModule is 'tms-attendance', render the Attendance Management System
  if (subModule === 'tms-attendance') {
    return <TmsAttendanceView />;
  }

  // If subModule is 'tms-departments', render the Departments Management System
  if (subModule === 'tms-departments') {
    return <TmsDepartmentsView />;
  }

  // If subModule is 'tms-employees', render the Workforce Directory & Employees System
  if (subModule === 'tms-employees') {
    return <TmsEmployeesView />;
  }

  // If subModule is 'tms-leave-approvals', render the Organization Leave Approvals System
  if (subModule === 'tms-leave-approvals') {
    return <TmsLeaveApprovalsView />;
  }

  // If subModule is 'tms-reports', render the Export Reports & Reporting Engine
  if (subModule === 'tms-reports') {
    return <TmsReportsView />;
  }

  // If subModule is 'tms-logout-reports', render the Logout Reports & Work Sessions System
  if (subModule === 'tms-logout-reports') {
    return <TmsLogoutReportsView />;
  }

  // If subModule is 'tms-announcements', render the Corporate Announcements System
  if (subModule === 'tms-announcements') {
    return <TmsAnnouncementsView />;
  }

  // If subModule is 'tms-notifications', render the Notifications & System Alerts
  if (subModule === 'tms-notifications') {
    return <TmsNotificationsView />;
  }

  // If subModule is 'tms-settings', render the Executive Settings & Credentials
  if (subModule === 'tms-settings') {
    return <TmsSettingsView />;
  }

  // Render generic sub-view wrapper for other TMS submenus
  return <TmsGenericSubView subModule={subModule} tasks={tasks} />;
}

/* ========================================================================== */
/* 1. ACTUAL EXECUTIVE TMS DASHBOARD VIEW                                      */
/* ========================================================================== */
function TmsDashboardView() {
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Task Management System (TMS)
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              HR & Operations
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Executive task assignment, HR management, employee workflows, and departmental deliverable tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-apfel font-bold text-xs shadow-2xs flex items-center gap-2 transition-all">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Filter</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>+ Create Task & Action</span>
          </button>
        </div>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={() => {}}
      />

      {/* KPI Cards (4 Summary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Employees */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                TOTAL EMPLOYEES
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                148
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> +5.2% vs last month
            </span>
            <svg className="w-14 h-5 text-[#d97706]" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 15 Q15 18 25 10 T45 8 T60 3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Active Today */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                ACTIVE TODAY
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                94.2%
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <UserCheck className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-emerald-600">139 / 148 Staff Checked In</span>
            <svg className="w-14 h-5 text-emerald-500" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 16 Q15 14 30 15 T45 7 T60 4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Organization Productivity */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                ORGANIZATION PRODUCTIVITY
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                91.8%
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-amber-700">+3.4% this week</span>
            <svg className="w-14 h-5 text-amber-500" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 14 Q15 17 30 11 T45 13 T60 5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Pending Actions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                PENDING ACTIONS
              </span>
              <p className="font-apfel text-2xl font-black text-rose-600 tracking-tight leading-none mt-1">
                12
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-rose-600">Requires CEO Review</span>
            <svg className="w-14 h-5 text-rose-500" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 16 Q15 12 30 16 T45 8 T60 3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 1: Organization Performance Chart + Attention Required Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organization Performance Multi-Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-gotham text-base font-extrabold text-slate-900">Organization Performance</h2>
              <p className="font-sans text-xs text-slate-500 font-medium">Cross-departmental productivity, attendance, and task execution trends</p>
            </div>

            {/* Legend & Week Selector */}
            <div className="flex items-center gap-3 font-apfel text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d97706]" /> Productivity
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Attendance
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Task Completion
                </span>
              </div>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 outline-none"
              >
                <option>This Week</option>
                <option>Previous Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          {/* Analytics Line Chart — Polished SVG */}
          <div className="relative w-full mt-4">
            <svg
              className="w-full overflow-visible"
              viewBox="0 0 600 200"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Gradient fills — each series gets its own clean gradient */}
                <linearGradient id="gradAtt2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradProd2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradComp2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
                {/* Drop shadow filter for dot glow */}
                <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── Y-axis labels ── */}
              {[
                { y: 20, label: '100%' },
                { y: 65, label: '90%' },
                { y: 110, label: '80%' },
                { y: 155, label: '70%' },
              ].map((row) => (
                <g key={row.label}>
                  <text
                    x="28"
                    y={row.y + 4}
                    textAnchor="end"
                    fontSize="9"
                    fontFamily="system-ui"
                    fontWeight="600"
                    fill="#94a3b8"
                  >
                    {row.label}
                  </text>
                  <line
                    x1="34"
                    y1={row.y}
                    x2="580"
                    y2={row.y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                    strokeDasharray={row.y === 155 ? '' : '5 4'}
                  />
                </g>
              ))}

              {/* ── Chart left border ── */}
              <line x1="34" y1="10" x2="34" y2="165" stroke="#e2e8f0" strokeWidth="1" />

              {/* ─────────────────────────────────────────────
                  DATA: map values to SVG coords
                  X positions: 80, 185, 290, 395, 500
                  Y range: 20 (100%) → 155 (70%)  →  range=135 per 30%
                  Formula: y = 155 - ((val - 70) / 30) * 135
                  Attendance:      94  96  95  93  97
                  Productivity:    88  91  93  90  95
                  Task Completion: 82  86  89  87  92
              ───────────────────────────────────────────── */}

              {/* Attendance Area Fill (Emerald) */}
              <path
                d="M 80,20 C 120,14 145,9 185,9 C 225,9 250,14 290,11 C 330,9 360,18 395,20 C 430,22 465,4 500,4 L 500,165 L 80,165 Z"
                fill="url(#gradAtt2)"
              />
              {/* Attendance Line */}
              <path
                d="M 80,20 C 120,14 145,9 185,9 C 225,9 250,14 290,11 C 330,9 360,18 395,20 C 430,22 465,4 500,4"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Productivity Area Fill (Amber) */}
              <path
                d="M 80,65 C 120,55 145,47 185,41 C 225,35 250,29 290,20 C 330,11 360,32 395,38 C 430,44 465,20 500,11 L 500,165 L 80,165 Z"
                fill="url(#gradProd2)"
              />
              {/* Productivity Line */}
              <path
                d="M 80,65 C 120,55 145,47 185,41 C 225,35 250,29 290,20 C 330,11 360,32 395,38 C 430,44 465,20 500,11"
                fill="none"
                stroke="#d97706"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Task Completion Area Fill (Sky) */}
              <path
                d="M 80,110 C 120,96 145,83 185,69 C 225,56 250,43 290,29 C 330,16 360,38 395,47 C 430,56 465,29 500,20 L 500,165 L 80,165 Z"
                fill="url(#gradComp2)"
              />
              {/* Task Completion Line */}
              <path
                d="M 80,110 C 120,96 145,83 185,69 C 225,56 250,43 290,29 C 330,16 360,38 395,47 C 430,56 465,29 500,20"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* ── Data Dots — Attendance ── */}
              {[
                { x: 80,  y: 20,  val: '94%' },
                { x: 185, y: 9,   val: '96%' },
                { x: 290, y: 11,  val: '95%' },
                { x: 395, y: 20,  val: '93%' },
                { x: 500, y: 4,   val: '97%' },
              ].map((pt, i) => (
                <g key={`att2-${i}`} aria-label={`Attendance: ${pt.val}`}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#10b981" opacity="0.2" />
                  <circle cx={pt.x} cy={pt.y} r="3.5" fill="#fff" stroke="#10b981" strokeWidth="2.5" />
                  <title>{`Attendance: ${pt.val}`}</title>
                </g>
              ))}

              {/* ── Data Dots — Productivity ── */}
              {[
                { x: 80,  y: 65,  val: '88%' },
                { x: 185, y: 41,  val: '91%' },
                { x: 290, y: 20,  val: '93%' },
                { x: 395, y: 38,  val: '90%' },
                { x: 500, y: 11,  val: '95%' },
              ].map((pt, i) => (
                <g key={`prod2-${i}`} aria-label={`Productivity: ${pt.val}`}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#d97706" opacity="0.2" />
                  <circle cx={pt.x} cy={pt.y} r="3.5" fill="#fff" stroke="#d97706" strokeWidth="2.5" />
                  <title>{`Productivity: ${pt.val}`}</title>
                </g>
              ))}

              {/* ── Data Dots — Task Completion ── */}
              {[
                { x: 80,  y: 110, val: '82%' },
                { x: 185, y: 69,  val: '86%' },
                { x: 290, y: 29,  val: '89%' },
                { x: 395, y: 47,  val: '87%' },
                { x: 500, y: 20,  val: '92%' },
              ].map((pt, i) => (
                <g key={`comp2-${i}`} aria-label={`Task Completion: ${pt.val}`}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#0ea5e9" opacity="0.2" />
                  <circle cx={pt.x} cy={pt.y} r="3.5" fill="#fff" stroke="#0ea5e9" strokeWidth="2.5" />
                  <title>{`Task Completion: ${pt.val}`}</title>
                </g>
              ))}

              {/* ── X-Axis tick labels ── */}
              {[
                { x: 80,  label: 'Week 1' },
                { x: 185, label: 'Week 2' },
                { x: 290, label: 'Week 3' },
                { x: 395, label: 'Week 4' },
                { x: 500, label: 'This Week', highlight: true },
              ].map((tick) => (
                <text
                  key={tick.label}
                  x={tick.x}
                  y="185"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="system-ui"
                  fontWeight={tick.highlight ? '800' : '600'}
                  fill={tick.highlight ? '#d97706' : '#94a3b8'}
                >
                  {tick.label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Attention Required Vertical Alert Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-600" />
              <h2 className="font-gotham text-base font-extrabold text-slate-900">Attention Required</h2>
            </div>
            <span className="font-apfel text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              4 Critical
            </span>
          </div>

          <div className="space-y-3 font-sans">
            {/* Alert 1 */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-[#fde68a] hover:bg-[#fef3c7] transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-[#b45309]" />
                  <span className="font-gotham text-xs font-bold text-slate-900">Pending Leave Approvals</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">7 employee PTO & sick leave requests pending CEO signature</p>
            </div>

            {/* Alert 2 */}
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 hover:bg-rose-100/80 transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-rose-600" />
                  <span className="font-gotham text-xs font-bold text-slate-900">Incomplete Onboarding</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">3 senior EV engineers missing compliance document verification</p>
            </div>

            {/* Alert 3 */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-[#fde68a] hover:bg-[#fef3c7] transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#b45309]" />
                  <span className="font-gotham text-xs font-bold text-slate-900">Departments Below Threshold</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">Fleet Operations productivity dropped to 82% this week</p>
            </div>

            {/* Alert 4 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4 text-slate-700" />
                  <span className="font-gotham text-xs font-bold text-slate-900">Unsubmitted Shift Reports</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">2 daily shift exit reports pending from Service Managers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Top Performers Leaderboard + Department Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers Leaderboard */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-[#d97706]" />
              <h2 className="font-gotham text-base font-extrabold text-slate-900">Top Performers</h2>
            </div>
            <span className="font-apfel text-[10px] font-bold text-slate-400">Monthly Index</span>
          </div>

          <div className="space-y-3 font-sans">
            {[
              { rank: '1', name: 'Ananya Sharma', dept: 'HR Director', score: '98.4', trend: '+4.2%' },
              { rank: '2', name: 'Srinivas Rao', dept: 'Tech Systems', score: '96.8', trend: '+2.1%' },
              { rank: '3', name: 'Vikram Mehta', dept: 'Talent Lead', score: '95.2', trend: '+3.8%' },
              { rank: '4', name: 'Rajesh Kumar', dept: 'Fleet Lead', score: '93.9', trend: '+1.5%' },
            ].map((person, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-apfel text-xs font-black text-[#d97706] w-4 text-center">#{person.rank}</span>
                  <div className="h-8 w-8 rounded-full bg-[#fef3c7] text-[#b45309] font-apfel font-bold text-xs flex items-center justify-center border border-[#fde68a]">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-gotham text-xs font-bold text-slate-900 leading-tight">{person.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{person.dept}</p>
                  </div>
                </div>
                <div className="text-right font-apfel">
                  <p className="text-xs font-black text-slate-900">{person.score}</p>
                  <span className="text-[9px] font-bold text-emerald-600">{person.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Health Grid */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="h-4.5 w-4.5 text-[#d97706]" />
              <h2 className="font-gotham text-base font-extrabold text-slate-900">Department Health & Capacity</h2>
            </div>
            <button className="font-apfel text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl">
              View All 8 Departments
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            {[
              { dept: 'Human Resources', staff: 14, att: '98%', prod: '95%', status: 'Optimal', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { dept: 'Tech & Engineering', staff: 42, att: '96%', prod: '92%', status: 'Optimal', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { dept: 'Fleet Operations', staff: 56, att: '93%', prod: '89%', status: 'Attention', badgeBg: 'bg-amber-50 text-amber-800 border-amber-200' },
              { dept: 'Customer Service', staff: 36, att: '91%', prod: '86%', status: 'Attention', badgeBg: 'bg-amber-50 text-amber-800 border-amber-200' },
            ].map((d, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-3 hover:border-amber-200 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-gotham text-xs font-bold text-slate-900">{d.dept}</h3>
                  <span className={`font-apfel text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${d.badgeBg}`}>
                    {d.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-apfel text-xs pt-1 border-t border-slate-50">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-sans">Staff</span>
                    <p className="font-bold text-slate-800">{d.staff} People</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-sans">Attendance</span>
                    <p className="font-bold text-emerald-600">{d.att}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-sans">Productivity</span>
                    <p className="font-bold text-[#b45309]">{d.prod}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Workforce Activity & Task Intelligence (Donut Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workforce Activity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4.5 w-4.5 text-emerald-600" />
              <h2 className="font-gotham text-base font-extrabold text-slate-900">Workforce Activity</h2>
            </div>
            <span className="font-apfel text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live Shifts
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Donut Chart */}
            <div className="relative h-36 w-36 mx-auto flex items-center justify-center">
              <svg className="h-36 w-36 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray="94, 100"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center font-apfel">
                <p className="text-xl font-black text-slate-900">139</p>
                <span className="text-[9px] font-bold text-slate-400 block font-sans">Logged In</span>
              </div>
            </div>

            {/* Today's Activity Summary */}
            <div className="space-y-2.5 font-apfel text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-600">Logged In</span>
                <span className="font-black text-emerald-600">139 Staff</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-600">Logged Out</span>
                <span className="font-black text-slate-400">5 Staff</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-600">Shift Reports</span>
                <span className="font-black text-[#b45309]">42 Submitted</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-600">Active Users</span>
                <span className="font-black text-sky-600">144 Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Intelligence */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <PieChart className="h-4.5 w-4.5 text-[#d97706]" />
              <h2 className="font-gotham text-base font-extrabold text-slate-900">Task Intelligence</h2>
            </div>
            <span className="font-apfel text-[10px] font-bold text-amber-800 bg-[#fef3c7] px-2 py-0.5 rounded-full border border-[#fde68a]">
              48 Total Tasks
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Donut Chart */}
            <div className="relative h-36 w-36 mx-auto flex items-center justify-center">
              <svg className="h-36 w-36 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#d97706]"
                  strokeDasharray="68, 100"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center font-apfel">
                <p className="text-xl font-black text-slate-900">68%</p>
                <span className="text-[9px] font-bold text-slate-400 block font-sans">Completed</span>
              </div>
            </div>

            {/* Task Priority Breakdown */}
            <div className="space-y-2.5 font-apfel text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50">
                <span className="font-semibold text-rose-800">Urgent Tasks</span>
                <span className="font-black text-rose-600">4 Items</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50">
                <span className="font-semibold text-amber-900">High Priority</span>
                <span className="font-black text-[#b45309]">12 Items</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-700">Medium Priority</span>
                <span className="font-black text-slate-800">18 Items</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-700">Low Priority</span>
                <span className="font-black text-slate-600">14 Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Onboarding Center */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <UserPlus className="h-4.5 w-4.5 text-[#d97706]" />
              <h2 className="font-gotham text-base font-extrabold text-slate-900">Onboarding Center</h2>
            </div>
            <p className="font-sans text-xs text-slate-500 font-medium">New employee onboarding progress, document compliance, and department integration</p>
          </div>

          <div className="flex items-center gap-4 font-apfel text-xs">
            <span className="font-bold text-slate-700">Dept Heads: <strong className="text-emerald-600">100%</strong></span>
            <span className="font-bold text-slate-700">Employees: <strong className="text-amber-700">82%</strong></span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">+12% Monthly</span>
          </div>
        </div>

        {/* Pending Onboarding Employees List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          {[
            { name: 'Rahul Verma', role: 'EV Systems Specialist', progress: 75, status: 'Compliance Docs Pending' },
            { name: 'Divya Teja', role: 'Battery Tech Lead', progress: 60, status: 'Safety Orientation' },
            { name: 'Amit Patel', role: 'Service Advisor', progress: 40, status: 'ID & Badge Verification' },
          ].map((emp, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-amber-200 transition-all space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#b45309] font-apfel font-bold text-xs flex items-center justify-center border border-[#fde68a] shrink-0">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <p className="font-gotham text-xs font-bold text-slate-900 leading-tight">{emp.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{emp.role}</p>
                </div>
              </div>

              <div className="space-y-1.5 font-apfel">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-sans">{emp.status}</span>
                  <span className="font-black text-[#b45309]">{emp.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#d97706] to-[#b45309] rounded-full" style={{ width: `${emp.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 2. TASKS & ASSIGNMENT HUB VIEW (MOVED CONTENT)                             */
/* ========================================================================== */
function TmsTasksView({
  tasks,
  setTasks,
}: {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}) {
  const [activeTab, setActiveTab] = useState<'ALL' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchesTab =
      activeTab === 'ALL'
        ? true
        : activeTab === 'IN_PROGRESS'
        ? task.status === 'IN_PROGRESS'
        : activeTab === 'UNDER_REVIEW'
        ? task.status === 'UNDER_REVIEW'
        : task.status === 'COMPLETED';

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getPriorityStyle = (priority: TaskItem['priority']) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'HIGH':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'MEDIUM':
        return 'bg-amber-50/60 text-[#b45309] border-[#fde68a]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusStyle = (status: TaskItem['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'UNDER_REVIEW':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'IN_PROGRESS':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Tasks & Assignment Hub
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Task Manager
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Manage, assign, and track employee deliverables and high-priority HR tasks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-apfel font-bold text-xs shadow-2xs flex items-center gap-2 transition-all">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Filter Tasks</span>
          </button>

          <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2 transition-all">
            <Plus className="h-4 w-4" />
            <span>Create New Task</span>
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                TOTAL ACTIVE TASKS
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {tasks.length}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
              <Briefcase className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-amber-700">Across 4 Departments</span>
            <span className="text-slate-400">Live Workspace</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                IN PROGRESS
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {tasks.filter((t) => t.status === 'IN_PROGRESS').length}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-sky-700">Active Execution</span>
            <span className="text-slate-400">HR & Fleet</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                PENDING APPROVAL
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {tasks.filter((t) => t.status === 'UNDER_REVIEW').length}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-amber-700">Requires Review</span>
            <span className="text-slate-400">CEO Priority</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                COMPLETED TASKS
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {tasks.filter((t) => t.status === 'COMPLETED').length}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-emerald-600">100% Verified</span>
            <span className="text-slate-400">This Month</span>
          </div>
        </div>
      </div>

      {/* Main Task List Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 font-apfel">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ALL'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              All Tasks ({tasks.length})
            </button>
            <button
              onClick={() => setActiveTab('IN_PROGRESS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'IN_PROGRESS'
                  ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveTab('UNDER_REVIEW')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'UNDER_REVIEW'
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Under Review
            </button>
            <button
              onClick={() => setActiveTab('COMPLETED')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'COMPLETED'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Completed
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 w-full sm:w-64">
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, assignees..."
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] font-montserrat tracking-wider font-extrabold">
                <th className="pb-3 px-2">TASK ID & TITLE</th>
                <th className="pb-3 px-2">ASSIGNEE / ROLE</th>
                <th className="pb-3 px-2">DEPARTMENT</th>
                <th className="pb-3 px-2">PRIORITY</th>
                <th className="pb-3 px-2">PROGRESS</th>
                <th className="pb-3 px-2">DUE DATE</th>
                <th className="pb-3 px-2">STATUS</th>
                <th className="pb-3 px-2 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-sans">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-4 px-2 max-w-xs">
                    <span className="font-apfel text-[10px] font-extrabold text-[#b45309] block">
                      {task.id}
                    </span>
                    <p className="font-gotham text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {task.title}
                    </p>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-[10px] shrink-0 font-apfel">
                        {task.assignee.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">{task.assignee}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{task.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {task.department}
                    </span>
                  </td>
                  <td className="py-4 px-2 font-apfel">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityStyle(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2 w-28">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            task.progressPercent === 100
                              ? 'bg-emerald-500'
                              : task.progressPercent > 60
                              ? 'bg-[#d97706]'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${task.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-apfel font-bold text-slate-700 text-[10px]">
                        {task.progressPercent}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-apfel text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{task.dueDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-apfel">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusStyle(
                        task.status
                      )}`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-slate-300 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-medium">
          <span className="font-sans">Showing {filteredTasks.length} of {tasks.length} task entries</span>
          <button className="font-apfel px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-1 transition-all">
            <span>View All HR Workflow Logs</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 3. GENERIC TMS SUB-VIEW WRAPPER FOR OTHER SUBMENUS                          */
/* ========================================================================== */
function TmsGenericSubView({
  subModule,
  tasks,
}: {
  subModule: string;
  tasks: TaskItem[];
}) {
  const getSubModuleInfo = () => {
    switch (subModule) {
      case 'tms-attendance':
        return {
          title: 'Attendance & Time Tracking',
          badge: 'Live Biometrics',
          desc: 'Monitor real-time employee check-ins, shift timings, and zero back-office attendance logs.',
          icon: UserCheck,
        };
      case 'tms-departments':
        return {
          title: 'Departments & Hierarchy',
          badge: 'Org Structure',
          desc: 'Organizational chart, departmental budget distribution, and team leadership mapping.',
          icon: Building2,
        };
      case 'tms-employees':
        return {
          title: 'Employee Directory & Personnel',
          badge: 'Staff Roster',
          desc: 'Master directory of all Innovibe mobility staff, engineers, technicians, and executives.',
          icon: Users,
        };
      case 'tms-leave-approvals':
        return {
          title: 'Leave Approvals & Time Off',
          badge: 'Leave Portal',
          desc: 'Review and approve employee leave requests, PTO balances, and shift substitutions.',
          icon: FileCheck,
        };
      case 'tms-reports':
        return {
          title: 'TMS HR Analytics & Reports',
          badge: 'HR Analytics',
          desc: 'Deep-dive productivity audits, employee performance metrics, and headcount trends.',
          icon: BarChart3,
        };
      case 'tms-logout-reports':
        return {
          title: 'Logout & Shift Exit Reports',
          badge: 'Shift End',
          desc: 'Daily shift closure summaries, technician handovers, and evening operational checkouts.',
          icon: LogOut,
        };
      case 'tms-announcements':
        return {
          title: 'Company HR Announcements',
          badge: 'Broadcast',
          desc: 'Publish organization-wide notices, policy updates, and executive briefings.',
          icon: Megaphone,
        };
      case 'tms-notifications':
        return {
          title: 'TMS System Notifications',
          badge: 'Live Feed',
          desc: 'Real-time alert stream for task deadlines, employee check-ins, and HR approvals.',
          icon: Bell,
        };
      case 'tms-settings':
        return {
          title: 'TMS Configuration & HR Settings',
          badge: 'System Admin',
          desc: 'Configure HR permissions, automated task rules, and attendance integration hooks.',
          icon: Sliders,
        };
      default:
        return {
          title: 'TMS Workspace Module',
          badge: 'HR Hub',
          desc: 'Executive workforce management and operational administration.',
          icon: CheckSquare,
        };
    }
  };

  const info = getSubModuleInfo();
  const IconComponent = info.icon;

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <IconComponent className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              {info.title}
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              {info.badge}
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">{info.desc}</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] text-white font-apfel font-extrabold text-xs shadow-md flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>+ Add Record</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-2xs text-center space-y-3">
        <div className="h-12 w-12 rounded-2xl bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center mx-auto shadow-2xs">
          <IconComponent className="h-6 w-6" />
        </div>
        <h3 className="font-gotham text-base font-extrabold text-slate-900">{info.title} Workspace Active</h3>
        <p className="font-sans text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Integrated with Innovibe Zero Back-Office HR engine. Realtime records sync actively connected to the executive backend.
        </p>
      </div>
    </div>
  );
}
