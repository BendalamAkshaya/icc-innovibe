'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRole } from '../../../components/RoleContext';
import { mockTechnicians } from '../../../lib/mock-data';
import {
  Users,
  Star,
  Award,
  CheckCircle,
  TrendingUp,
  UserCheck,
  ShieldAlert,
  Clock,
  Search,
  Filter,
  Calendar,
  MapPin,
  Sparkles,
  Plus,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Activity,
  FileText,
  Zap,
  Check,
  Layers,
  UserPlus,
  Briefcase,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function HRDashboardContent() {
  const { currentProfile } = useRole();
  const searchParams = useSearchParams();
  const activeModule = searchParams ? searchParams.get('module') : null;

  const [techs, setTechs] = useState(mockTechnicians);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedTechModal, setSelectedTechModal] = useState<any | null>(null);

  // All available skill tags across techs
  const allSkills = Array.from(
    new Set(techs.flatMap((t) => t.skills || []))
  );

  // Filtered techs for Technician Dashboard
  const filteredTechs = techs.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.serviceCenter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill =
      selectedSkill === 'ALL' || t.skills.includes(selectedSkill);
    const matchesStatus =
      selectedStatus === 'ALL' || t.status === selectedStatus;
    return matchesSearch && matchesSkill && matchesStatus;
  });

  // Productivity chart data
  const productivityChartData = techs.map((t) => ({
    name: t.name.split(' ')[0],
    completed: t.completedJobsMonth,
    rating: t.customerRating,
  }));

  // CSAT Rating Distribution data
  const csatData = [
    { name: '5.0 Stars (Exceptional)', count: 28, color: '#10b981' },
    { name: '4.5 - 4.9 Stars (Great)', count: 22, color: '#06b6d4' },
    { name: '4.0 - 4.4 Stars (Good)', count: 10, color: '#f59e0b' },
    { name: 'Below 4.0 (Review Needed)', count: 4, color: '#ef4444' },
  ];

  // Roster Shift Data
  const shiftRosterData = [
    { id: 'rst_1', name: 'Ramesh Kumar', center: 'Kakinada Hub', shift: 'Morning (08:00 - 16:00)', status: 'ON_TIME', time: '07:54 AM' },
    { id: 'rst_2', name: 'Suresh Patel', center: 'Visakhapatnam Hub', shift: 'Morning (08:00 - 16:00)', status: 'ON_TIME', time: '07:58 AM' },
    { id: 'rst_3', name: 'Venkatesh Rao', center: 'Vijayawada Hub', shift: 'Afternoon (14:00 - 22:00)', status: 'SCHEDULED', time: 'Shift Starts 14:00' },
    { id: 'rst_4', name: 'Anil Reddy', center: 'Guntur Hub', shift: 'Morning (08:00 - 16:00)', status: 'ON_BREAK', time: '08:10 AM' },
    { id: 'rst_5', name: 'Karthik Raja', center: 'Tirupati Hub', shift: 'Night (22:00 - 06:00)', status: 'OFF_DUTY', time: 'Shift Starts 22:00' },
  ];

  // Render Module 2: Technician Performance Dashboard
  if (activeModule === 'performance') {
    return (
      <div className="space-y-6 text-left">
        {/* Header Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
                Technician Performance & Productivity Dashboard
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              Field Technician Analytics & Skills Matrix
            </h1>
            <p className="text-xs text-slate-600 max-w-xl font-medium">
              Real-time tracking of technician SLA speeds, customer rating distribution, monthly output, and skill certification rankings.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
              <Award className="h-4 w-4 text-amber-500" /> Incentive Qualified: 18 Techs
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search technician or hub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 shrink-0">
              <Filter className="h-4 w-4 text-slate-400" /> Skill:
            </div>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Skills</option>
              {allSkills.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 shrink-0">
              Status:
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="ON_JOB">ON JOB</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
          </div>
        </div>

        {/* Technician Cards Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTechs.map((tech) => (
            <div
              key={tech.id}
              className="glass-panel p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{tech.name}</h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" /> {tech.serviceCenter}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    tech.status === 'AVAILABLE'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : tech.status === 'ON_JOB'
                      ? 'bg-sky-100 text-sky-800 border border-sky-300'
                      : 'bg-slate-100 text-slate-600 border border-slate-300'
                  }`}
                >
                  {tech.status}
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tech.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Jobs (Mo)</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{tech.completedJobsMonth}</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">CSAT</p>
                  <p className="text-sm font-black text-amber-600 mt-0.5 flex items-center justify-center gap-0.5">
                    {tech.customerRating} <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Active</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{tech.activeJobsCount} Active</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <PhoneCall className="h-3.5 w-3.5 text-slate-400" /> {tech.phone}
                </span>
                <button
                  onClick={() => setSelectedTechModal(tech)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recharts Analytics Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200">
            <h2 className="text-base font-extrabold text-slate-900 mb-1">Monthly Technician Job Output</h2>
            <p className="text-xs text-slate-500 font-medium mb-4">Comparison of completed EV service jobs across staff members</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productivityChartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 mb-1">CSAT Rating Distribution</h2>
              <p className="text-xs text-slate-500 font-medium mb-4">Based on 1,240 verified customer service reviews</p>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={csatData} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                      {csatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 mt-2">
                {csatData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-extrabold text-slate-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Detail Drawer Modal */}
        {selectedTechModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="glass-panel bg-white p-6 rounded-3xl border border-slate-200 max-w-lg w-full space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                    {selectedTechModal.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{selectedTechModal.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{selectedTechModal.serviceCenter}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTechModal(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-500 font-bold uppercase text-[10px]">Monthly Jobs Completed</p>
                    <p className="text-xl font-black text-slate-900 mt-1">{selectedTechModal.completedJobsMonth} Jobs</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-500 font-bold uppercase text-[10px]">Customer CSAT Rating</p>
                    <p className="text-xl font-black text-amber-600 mt-1 flex items-center gap-1">
                      {selectedTechModal.customerRating} <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <p className="font-extrabold text-emerald-900">Skill Certifications & Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTechModal.skills.map((sk: string) => (
                      <span key={sk} className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-[10px]">
                        ✓ {sk} Certified
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Module 3: Attendance & Roster
  if (activeModule === 'roster') {
    return (
      <div className="space-y-6 text-left">
        {/* Header Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="text-xs font-black uppercase tracking-widest text-purple-700">
                Attendance & Shift Roster
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              Service Center Shift Roster & Clock-In Log
            </h1>
            <p className="text-xs text-slate-600 max-w-xl font-medium">
              Live attendance tracking, shift schedules across regional hubs, and leave request approvals.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
              <Clock className="h-4 w-4 text-purple-600" /> Shift Attendance: 96.8%
            </div>
          </div>
        </div>

        {/* Shift Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel p-5 rounded-3xl border border-slate-200 space-y-1">
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Morning Shift (08:00 - 16:00)</p>
            <p className="text-2xl font-black text-slate-900">28 Active Staff</p>
            <span className="text-xs text-emerald-600 font-bold">100% Present</span>
          </div>

          <div className="glass-panel p-5 rounded-3xl border border-slate-200 space-y-1">
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Afternoon Shift (14:00 - 22:00)</p>
            <p className="text-2xl font-black text-slate-900">24 Scheduled</p>
            <span className="text-xs text-slate-500 font-medium">Starts in 3 hours</span>
          </div>

          <div className="glass-panel p-5 rounded-3xl border border-slate-200 space-y-1">
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Night Shift (22:00 - 06:00)</p>
            <p className="text-2xl font-black text-slate-900">12 Scheduled</p>
            <span className="text-xs text-slate-500 font-medium">RSA Emergency Coverage</span>
          </div>
        </div>

        {/* Roster Table */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">Today's Staff Clock-In Log</h2>
            <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add Shift Override
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-black tracking-wider">
                  <th className="pb-3 px-3">Staff Name</th>
                  <th className="pb-3 px-3">Service Hub</th>
                  <th className="pb-3 px-3">Assigned Shift</th>
                  <th className="pb-3 px-3">Clock-In Timestamp</th>
                  <th className="pb-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {shiftRosterData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-all">
                    <td className="py-3.5 px-3 font-extrabold text-slate-900">{row.name}</td>
                    <td className="py-3.5 px-3 text-slate-600">{row.center}</td>
                    <td className="py-3.5 px-3 text-slate-600">{row.shift}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">{row.time}</td>
                    <td className="py-3.5 px-3 text-right">
                      <span
                        className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full ${
                          row.status === 'ON_TIME'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : row.status === 'ON_BREAK'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Default Module 1: Staff Analytics Overview
  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-pink-200 bg-gradient-to-r from-pink-500/10 via-pink-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-pink-600" />
            <span className="text-xs font-black uppercase tracking-widest text-pink-700">
              Human Resources Office
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            Technician Productivity & Staff Analytics
          </h1>
          <p className="text-xs text-slate-600 max-w-xl font-medium">
            Monitoring technician SLAs, monthly job output, customer rating indices, and service hub attendance rosters.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
            <UserCheck className="h-4 w-4 text-pink-600" /> Total Staff: 64 Employed
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Technician CSAT</p>
          <p className="text-2xl font-black text-amber-600 mt-2 flex items-center gap-1">
            4.88 <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
          </p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">Based on 1,240 Customer Reviews</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Completed Jobs</p>
          <p className="text-2xl font-black text-slate-900 mt-2">1,410 Jobs</p>
          <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">+14% Productivity Growth</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">SLA Compliance Rate</p>
          <p className="text-2xl font-black text-emerald-600 mt-2">97.6%</p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">On-time service execution</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Technicians On-Duty</p>
          <p className="text-2xl font-black text-slate-900 mt-2">48 Active</p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">16 On Shift Break / Training</span>
        </div>
      </div>

      {/* Productivity Chart & Technician Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200">
          <h2 className="text-base font-extrabold text-slate-900 mb-1">Monthly Technician Job Output</h2>
          <p className="text-xs text-slate-500 font-medium mb-4">Comparison of completed EV service jobs across staff members</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityChartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="completed" fill="#db2777" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Staff Performance Index */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-slate-900">Top Performers</h2>
              <Award className="h-5 w-5 text-amber-500" />
            </div>
            <div className="space-y-3">
              {techs.map((tech) => (
                <div key={tech.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{tech.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{tech.completedJobsMonth} Jobs • Rating {tech.customerRating}★</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">{tech.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HRDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500 font-bold text-xs">Loading HR & Technician Dashboard...</div>}>
      <HRDashboardContent />
    </Suspense>
  );
}
