'use client';

import React from 'react';
import {
  Users,
  Clock,
  UserX,
  CalendarDays,
  UserPlus,
  CreditCard,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Award,
  Cake,
  Megaphone,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { hrRecentActivityList } from './hr-mock-data';

interface DashboardViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function DashboardView({ showToast }: DashboardViewProps) {
  // Recharts Mock Data
  const attendanceTrendData = [
    { month: 'Jan', percentage: 97.4 },
    { month: 'Feb', percentage: 98.1 },
    { month: 'Mar', percentage: 97.8 },
    { month: 'Apr', percentage: 98.5 },
    { month: 'May', percentage: 98.2 },
    { month: 'Jun', percentage: 98.8 },
  ];

  const leaveAnalyticsData = [
    { name: 'Casual Leave', value: 12, color: '#3b82f6' },
    { name: 'Medical Leave', value: 8, color: '#ef4444' },
    { name: 'Earned Leave', value: 15, color: '#10b981' },
    { name: 'Maternity/Paternity', value: 4, color: '#8b5cf6' },
  ];

  const recruitmentFunnelData = [
    { stage: 'Applications', count: 145, fill: '#3b82f6' },
    { stage: 'Screening', count: 82, fill: '#60a5fa' },
    { stage: 'Interview', count: 32, fill: '#818cf8' },
    { stage: 'Offer', count: 12, fill: '#a78bfa' },
    { stage: 'Hired', count: 4, fill: '#34d399' },
  ];

  const departmentDistributionData = [
    { name: 'Engineering', value: 24, color: '#2563eb' },
    { name: 'Operations', value: 18, color: '#3b82f6' },
    { name: 'Technology', value: 14, color: '#8b5cf6' },
    { name: 'HR', value: 8, color: '#ec4899' },
  ];

  // KPI card configuration
  const kpis = [
    {
      title: 'Total Employees',
      value: '64',
      change: '+4%',
      isPositive: true,
      desc: 'Active headcount',
      icon: Users,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
      sparkPath: 'M0,15 Q15,5 30,20 T60,5 T90,2',
      sparkColor: 'text-emerald-500',
    },
    {
      title: 'Attendance Today',
      value: '93.7%',
      change: '+1.2%',
      isPositive: true,
      desc: '58 present / 6 absent',
      icon: Clock,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      sparkPath: 'M0,20 Q15,10 30,22 T60,8 T90,5',
      sparkColor: 'text-emerald-500',
    },
    {
      title: 'Late Employees',
      value: '4',
      change: '-50%',
      isPositive: true,
      desc: 'Checked in after 09:00 AM',
      icon: UserX,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      sparkPath: 'M0,5 Q15,25 30,12 T60,20 T90,28',
      sparkColor: 'text-emerald-500', // Downward trend in bad metric is good!
    },
    {
      title: 'Leave Requests',
      value: '2',
      change: 'Needs review',
      isPositive: false,
      desc: '1 Medical / 1 Casual',
      icon: CalendarDays,
      iconColor: 'text-rose-600 bg-rose-50 border-rose-200',
      sparkPath: 'M0,15 Q15,15 30,15 T60,15 T90,15',
      sparkColor: 'text-slate-400',
    },
    {
      title: 'New Joiners',
      value: '3',
      change: 'This month',
      isPositive: true,
      desc: 'Onboarding active',
      icon: UserPlus,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
      sparkPath: 'M0,25 Q15,20 30,15 T60,8 T90,2',
      sparkColor: 'text-purple-500',
    },
    {
      title: 'Payroll Summary',
      value: 'Processed',
      change: 'June cycle',
      isPositive: true,
      desc: 'Next processing: July 31',
      icon: CreditCard,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      sparkPath: 'M0,15 Q15,15 30,15 T60,15 T90,15',
      sparkColor: 'text-emerald-500',
    },
    {
      title: 'Intern Dashboard',
      value: '2',
      change: '1 Converted',
      isPositive: true,
      desc: 'Assigned to CTO / Sm',
      icon: Sparkles,
      iconColor: 'text-pink-600 bg-pink-50 border-pink-200',
      sparkPath: 'M0,20 Q15,12 30,15 T60,5 T90,2',
      sparkColor: 'text-pink-500',
    },
    {
      title: 'Performance Score',
      value: '4.82★',
      change: '+0.1%',
      isPositive: true,
      desc: 'SLA compliance index',
      icon: Award,
      iconColor: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      sparkPath: 'M0,18 Q15,12 30,10 T60,5 T90,2',
      sparkColor: 'text-amber-500',
    },
    {
      title: 'Training Calendar',
      value: '3 Active',
      change: '2 Ongoing',
      isPositive: true,
      desc: 'HV safety / CAN tuning',
      icon: GraduationCap,
      iconColor: 'text-violet-600 bg-violet-50 border-violet-200',
      sparkPath: 'M0,22 Q15,18 30,12 T60,8 T90,5',
      sparkColor: 'text-violet-500',
    },
    {
      title: 'Birthdays',
      value: '0',
      change: 'None today',
      isPositive: false,
      desc: 'Next: Kiran G. (July 29)',
      icon: Cake,
      iconColor: 'text-rose-500 bg-rose-50 border-rose-100',
      sparkPath: 'M0,15 Q15,15 30,15 T60,15 T90,15',
      sparkColor: 'text-slate-300',
    },
    {
      title: 'Recent Announcements',
      value: '1 New',
      change: 'HR policies',
      isPositive: true,
      desc: 'Rotation shift changes',
      icon: Megaphone,
      iconColor: 'text-sky-600 bg-sky-50 border-sky-200',
      sparkPath: 'M0,20 Q15,12 30,18 T60,8 T90,5',
      sparkColor: 'text-sky-500',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Card */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold">
            <Sparkles className="h-4 w-4" />
            <span>InnoVibe Mobility HR Portal</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Employee Lifecycle Control Suite
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Monitor diagnostics engineering output, field team SLAs, and administrative back-office automation.
          </p>
        </div>
        <button
          onClick={() => showToast('HR Portal overview is fully synced with Laravel Cache DB.', 'info')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex items-center gap-2"
        >
          <span>Sync Status</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        </button>
      </div>

      {/* KPI Cards Horizontal Scrollable / Flexible Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between h-[135px] hover:border-blue-500/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
              onClick={() => showToast(`Opening detailed view for ${kpi.title}`, 'info')}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className={`p-1.5 rounded-lg border ${kpi.iconColor} shrink-0`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="my-1.5 flex items-baseline justify-between">
                <div>
                  <p className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {kpi.value}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">{kpi.desc}</p>
                </div>
                
                {/* SVG sparkline */}
                <svg className={`h-6 w-14 overflow-visible shrink-0 ${kpi.sparkColor}`} viewBox="0 0 100 30">
                  <path
                    d={kpi.sparkPath}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-extrabold">
                {kpi.isPositive ? (
                  <span className="text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" /> {kpi.change}
                  </span>
                ) : (
                  <span className="text-slate-500">
                    {kpi.change}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Attendance Trend & Funnel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Attendance Trend Chart */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
            <div>
              <h3 className="text-sm font-black text-slate-900">Attendance Trend</h3>
              <p className="text-xs text-slate-500 font-medium">Monthly staff presence efficiency score (target: 98%)</p>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis stroke="#94a3b8" domain={[95, 100]} tick={{ fontSize: 11, fontWeight: 'bold' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAtt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recruitment Funnel & Leave Analytics side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recruitment Funnel */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900">Recruitment Funnel</h3>
                <p className="text-xs text-slate-500 font-medium">Candidate conversion pipeline</p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recruitmentFunnelData} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                    <YAxis dataKey="stage" type="category" stroke="#94a3b8" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                      {recruitmentFunnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Leave Analytics */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900">Leave Analytics</h3>
                <p className="text-xs text-slate-500 font-medium">Monthly leave shares by category</p>
              </div>

              <div className="h-60 w-full flex flex-col justify-between">
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leaveAnalyticsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {leaveAnalyticsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {leaveAnalyticsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-bold text-slate-600 truncate">{item.name} ({item.value}d)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Employee Distribution & Recent Activities */}
        <div className="space-y-6">
          
          {/* Employee Distribution (Dept Wise) */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
            <div>
              <h3 className="text-sm font-black text-slate-900">Employee Distribution</h3>
              <p className="text-xs text-slate-500 font-medium">Headcount share across departments</p>
            </div>

            <div className="h-44 w-full flex flex-col justify-between">
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={50}
                      dataKey="value"
                    >
                      {departmentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {departmentDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-bold text-slate-600 truncate">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Panel */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900">Recent Activity</h3>
                <p className="text-xs text-slate-500 font-medium">Real-time lifecycle events</p>
              </div>
              <button
                onClick={() => showToast('Activity log is up to date.', 'info')}
                className="text-[10px] font-black text-blue-600 hover:text-blue-700 transition-colors uppercase"
              >
                Clear Log
              </button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {hrRecentActivityList.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-xs">
                  <div className="mt-1 shrink-0">
                    {item.type === 'JOINED' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-100 flex items-center justify-center" />
                    )}
                    {item.type === 'LEAVE' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white ring-2 ring-rose-100 flex items-center justify-center" />
                    )}
                    {item.type === 'INTERVIEW' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-100 flex items-center justify-center" />
                    )}
                    {item.type === 'DOCS' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500 border-2 border-white ring-2 ring-amber-100 flex items-center justify-center" />
                    )}
                    {item.type === 'TRAINING' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-500 border-2 border-white ring-2 ring-purple-100 flex items-center justify-center" />
                    )}
                  </div>
                  <div className="space-y-0.5 text-left grow">
                    <p className="font-extrabold text-slate-800 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium leading-normal">{item.desc}</p>
                    <p className="text-[9px] text-slate-400 font-mono">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
