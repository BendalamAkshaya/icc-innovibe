'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  Download,
  UploadCloud,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  User,
  GraduationCap,
  BookOpen,
  Award,
  Video,
  FileText,
  Calendar,
  BarChart3,
  Bot,
  Zap,
  TrendingUp,
  Briefcase,
  Layers,
  Star,
  ShieldCheck,
  ChevronRight,
  BookMarked,
  Lightbulb,
  FileSpreadsheet,
  BrainCircuit,
  MessageSquare,
  Users
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Toast {
  (message: string, type?: 'success' | 'warning' | 'info' | 'error'): void;
}

interface TrainingLearningViewProps {
  showToast: Toast;
}

// ---------------------------------------------------------------------------
// MOCK DATA
// ---------------------------------------------------------------------------

const MOCK_COURSES = [
  { id: 'c1', name: 'High Voltage EV Safety', category: 'Compliance', department: 'Engineering', instructor: 'Dr. Alan Grant', duration: '4 Hours', mode: 'Online', enrolled: 145, completionRate: 85, status: 'Ongoing', rating: 4.8 },
  { id: 'c2', name: 'Advanced Battery Diagnostics', category: 'Technical', department: 'Engineering', instructor: 'Sarah Connor', duration: '12 Hours', mode: 'Hybrid', enrolled: 89, completionRate: 60, status: 'Ongoing', rating: 4.9 },
  { id: 'c3', name: 'Workplace POSH & Ethics', category: 'Mandatory', department: 'All', instructor: 'HR Compliance Team', duration: '2 Hours', mode: 'Online', enrolled: 450, completionRate: 92, status: 'Completed', rating: 4.5 },
  { id: 'c4', name: 'Customer Escalation Management', category: 'Soft Skills', department: 'Support', instructor: 'Michael Scott', duration: '6 Hours', mode: 'Classroom', enrolled: 34, completionRate: 45, status: 'Upcoming', rating: 4.7 },
  { id: 'c5', name: 'Cyber Security Basics', category: 'Compliance', department: 'All', instructor: 'IT Security', duration: '3 Hours', mode: 'Online', enrolled: 400, completionRate: 98, status: 'Completed', rating: 4.6 }
];

const MOCK_PROGRESS = [
  { id: 'emp_01', name: 'Kiran Gopi', empId: 'INNO-104', department: 'Engineering', course: 'High Voltage EV Safety', progress: 100, score: 95, status: 'Completed', certificate: 'Issued', date: '2026-07-20' },
  { id: 'emp_02', name: 'Priya Sharma', empId: 'INNO-105', department: 'Support', course: 'Customer Escalation Management', progress: 45, score: null, status: 'In Progress', certificate: 'Pending', date: '-' },
  { id: 'emp_03', name: 'Rahul Verma', empId: 'INNO-106', department: 'Sales', course: 'Cyber Security Basics', progress: 0, score: null, status: 'Not Started', certificate: 'Pending', date: '-' },
  { id: 'emp_04', name: 'Anita Patel', empId: 'INNO-107', department: 'Engineering', course: 'Advanced Battery Diagnostics', progress: 100, score: 88, status: 'Completed', certificate: 'Issued', date: '2026-07-22' },
];

const MOCK_CERTIFICATES = [
  { id: 'cert_1', name: 'Certified EV Diagnostics Specialist', employee: 'Kiran Gopi', issueDate: '2025-06-15', expiryDate: '2026-06-15', status: 'Expiring Soon' },
  { id: 'cert_2', name: 'First Aid Level 2', employee: 'Anita Patel', issueDate: '2024-05-10', expiryDate: '2026-05-10', status: 'Expired' },
  { id: 'cert_3', name: 'ISO 27001 Auditor', employee: 'Rahul Verma', issueDate: '2026-01-20', expiryDate: '2028-01-20', status: 'Active' },
];

const MOCK_COMPLIANCE = [
  { name: 'High Voltage EV Safety', completed: 320, pending: 40, overdue: 12 },
  { name: 'Fire Safety', completed: 350, pending: 15, overdue: 7 },
  { name: 'Battery Handling', completed: 280, pending: 65, overdue: 27 },
  { name: 'Cyber Security', completed: 360, pending: 12, overdue: 0 },
  { name: 'POSH', completed: 370, pending: 2, overdue: 0 },
  { name: 'Data Privacy', completed: 340, pending: 30, overdue: 2 },
];

const MOCK_TRAINERS = [
  { id: 'tr_1', name: 'Dr. Alan Grant', expertise: 'EV Drivetrains, High Voltage Systems', courses: 14, rating: 4.9, availability: 'Available' },
  { id: 'tr_2', name: 'Sarah Connor', expertise: 'Battery Chemistry, Diagnostics', courses: 8, rating: 4.8, availability: 'In Session' },
  { id: 'tr_3', name: 'Michael Scott', expertise: 'Soft Skills, Sales, Customer Support', courses: 22, rating: 4.5, availability: 'Available' },
];

const CHART_DATA = [
  { month: 'Jan', hours: 1200 },
  { month: 'Feb', hours: 1500 },
  { month: 'Mar', hours: 1800 },
  { month: 'Apr', hours: 2200 },
  { month: 'May', hours: 2100 },
  { month: 'Jun', hours: 2800 },
  { month: 'Jul', hours: 3200 },
];

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function TrainingLearningView({ showToast }: TrainingLearningViewProps) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Catalog' | 'Progress' | 'Certifications' | 'Compliance' | 'Trainers' | 'Insights'>('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isIssueCertOpen, setIsIssueCertOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            Learning Management System
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Enterprise Training, Certifications, and Skill Development Hub
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => showToast('AI Learning Assistant Activated', 'info')} className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-2 transition-all shadow-sm">
            <Bot className="h-4 w-4" /> Smart Assistant
          </button>
          <button onClick={() => setIsCreateCourseOpen(true)} className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm">
            <Plus className="h-4 w-4" /> Create Course
          </button>
        </div>
      </div>

      {/* TOP NAVIGATION TABS */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-1">
        {['Overview', 'Catalog', 'Progress', 'Certifications', 'Compliance', 'Trainers', 'Insights'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 md:flex-none text-center ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* =========================================
          TAB: OVERVIEW (DASHBOARD)
          ========================================= */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Trainings</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">42</p>
              <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> +5 this month
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance Rate</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">94.5%</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94.5%' }}></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Certifications</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">18</p>
              <p className="text-[11px] font-bold text-amber-600 flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3" /> 5 Expiring Soon
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Learning Hours</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">14.2</p>
              <p className="text-[11px] font-bold text-slate-400 mt-1">per employee / month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Hours Chart */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-slate-800">Platform Engagement (Learning Hours)</h3>
                <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 bg-slate-100 px-2 py-1 rounded">This Year</button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-sm font-black text-white">AI Copilot Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-[11px] font-bold text-indigo-200 mb-1 flex items-center gap-1.5"><AlertTriangle className="h-3 w-3" /> Skill Gap Detected</p>
                    <p className="text-xs text-white leading-relaxed">The <span className="font-bold">Sales Team</span> shows a 30% drop in CRM proficiency scores. Recommend assigning "Advanced CRM Workflows".</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-[11px] font-bold text-emerald-300 mb-1 flex items-center gap-1.5"><CheckCircle className="h-3 w-3" /> Popular Course</p>
                    <p className="text-xs text-white leading-relaxed">"High Voltage Safety" has a 95% satisfaction rate. Consider scaling this to all tier-2 technicians.</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-white text-indigo-900 text-xs font-black rounded-xl hover:bg-slate-100 transition-all">
                View Full AI Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: COURSE CATALOG
          ========================================= */}
      {activeTab === 'Catalog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, instructors, or tags..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {MOCK_COURSES.map(course => (
              <div key={course.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
                <div className="h-32 bg-slate-100 relative p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      course.category === 'Compliance' ? 'bg-rose-100 text-rose-700' :
                      course.category === 'Technical' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {course.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold bg-white/80 px-1.5 py-0.5 rounded backdrop-blur-sm text-slate-700">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 relative z-10 leading-tight">{course.name}</h3>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-2 gap-y-3 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-slate-400"/> {course.instructor}</div>
                    <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-slate-400"/> {course.duration}</div>
                    <div className="flex items-center gap-1.5"><Video className="h-3.5 w-3.5 text-slate-400"/> {course.mode}</div>
                    <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-slate-400"/> {course.enrolled} Enrolled</div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1.5">
                      <span className="text-slate-500">Completion Rate</span>
                      <span className="text-indigo-600">{course.completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${course.completionRate}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex gap-2">
                  <button onClick={() => showToast(`Assigning ${course.name}`, 'info')} className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all">
                    Assign
                  </button>
                  <button onClick={() => showToast('Opening Course Details', 'info')} className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          TAB: PROGRESS & TRACKING
          ========================================= */}
      {activeTab === 'Progress' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900">Employee Learning Progress</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Track individual course completions and scores</p>
              </div>
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" /> Export Report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Employee</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Course</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Progress</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Score</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {MOCK_PROGRESS.map((record, i) => (
                    <tr key={record.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === MOCK_PROGRESS.length - 1 ? 'border-none' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {record.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{record.name}</p>
                            <p className="text-[10px] text-slate-500">{record.empId} • {record.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-xs font-bold text-slate-800">{record.course}</p>
                      </td>
                      <td className="p-4 w-40">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${record.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${record.progress}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-600">{record.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {record.score ? (
                          <span className="text-xs font-bold text-slate-800">{record.score}%</span>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 inline-flex text-[10px] font-bold rounded-md ${
                          record.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          record.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: CERTIFICATIONS
          ========================================= */}
      {activeTab === 'Certifications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">Certificate Repository</h3>
                  <button 
                    onClick={() => setIsIssueCertOpen(true)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" /> Issue Certificate
                  </button>
                </div>
                <div className="p-2">
                  {MOCK_CERTIFICATES.map((cert) => (
                    <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100 group">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-2xl shrink-0 ${
                          cert.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
                          cert.status === 'Expired' ? 'bg-rose-100 text-rose-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          <Award className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{cert.name}</h4>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">Awarded to <span className="font-bold text-slate-700">{cert.employee}</span></p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-slate-400">
                            <span>Issued: {cert.issueDate}</span>
                            <span>Expires: {cert.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
                        <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded ${
                          cert.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                          cert.status === 'Expired' ? 'bg-rose-50 text-rose-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {cert.status}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => showToast('Downloading PDF...', 'success')} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 rounded-md">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          {cert.status !== 'Active' && (
                            <button onClick={() => showToast('Renewal reminder sent!', 'success')} className="px-2 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-md">
                              Remind
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Skill Matrix Snippet */}
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5">
                <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-500" /> Organization Skill Matrix
                </h3>
                <div className="space-y-3">
                  {[
                    { skill: 'EV Diagnostics', level: 78 },
                    { skill: 'Customer Handling', level: 65 },
                    { skill: 'Battery Repair', level: 42 },
                    { skill: 'Safety Protcols', level: 92 },
                  ].map(skill => (
                    <div key={skill.skill}>
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                        <span>{skill.skill}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-all">
                  View Full Matrix
                </button>
              </div>

              {/* Learning Paths */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-sm p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Briefcase className="h-24 w-24" />
                </div>
                <h3 className="text-sm font-black mb-1 relative z-10">Career Learning Paths</h3>
                <p className="text-xs text-slate-400 mb-4 relative z-10">Structured growth maps</p>
                <div className="space-y-2 relative z-10">
                  <button className="w-full flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                    <span className="text-xs font-bold">L1 to L2 Technician</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                    <span className="text-xs font-bold">Sales Leadership</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: COMPLIANCE
          ========================================= */}
      {activeTab === 'Compliance' && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-black text-rose-900">Mandatory Compliance Overview</h4>
              <p className="text-xs text-rose-700/80 font-medium mt-1">
                46 employees have overdue compliance training. Failure to complete safety modules may result in temporary suspension of floor access.
              </p>
              <button onClick={() => showToast('Reminders sent to all overdue employees', 'success')} className="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-lg transition-all">
                Send Mass Reminder
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_COMPLIANCE.map(comp => (
              <div key={comp.name} className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
                <h4 className="text-sm font-black text-slate-800 mb-4">{comp.name}</h4>
                <div className="flex items-end gap-2 h-20 mb-4">
                  <div className="flex-1 flex flex-col justify-end group relative">
                    <div className="w-full bg-emerald-500 rounded-t-sm" style={{ height: `${(comp.completed / 400) * 100}%` }}></div>
                    <span className="text-[10px] font-bold text-center mt-1 text-slate-500">Done</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-end group relative">
                    <div className="w-full bg-amber-400 rounded-t-sm" style={{ height: `${(comp.pending / 400) * 100}%` }}></div>
                    <span className="text-[10px] font-bold text-center mt-1 text-slate-500">Pend</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-end group relative">
                    <div className="w-full bg-rose-500 rounded-t-sm" style={{ height: `${(comp.overdue / 400) * 100}%` }}></div>
                    <span className="text-[10px] font-bold text-center mt-1 text-slate-500">Over</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500">
                    Total: <span className="text-slate-900">{comp.completed + comp.pending + comp.overdue}</span>
                  </div>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">View List</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          TAB: TRAINERS & CALENDAR
          ========================================= */}
      {activeTab === 'Trainers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">Internal & External Trainers</h3>
            <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Add Trainer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_TRAINERS.map(trainer => (
              <div key={trainer.id} className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm text-center relative overflow-hidden group">
                <div className="absolute top-3 right-3">
                  <span className={`w-2 h-2 rounded-full inline-block ${trainer.availability === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </div>
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-xl font-black text-slate-400 mb-3 group-hover:scale-110 transition-transform">
                  {trainer.name.charAt(0)}
                </div>
                <h4 className="text-sm font-black text-slate-900">{trainer.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-1 line-clamp-1">{trainer.expertise}</p>
                
                <div className="flex justify-center gap-4 mt-4 py-3 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-black text-slate-800">{trainer.courses}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Courses</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 flex items-center gap-0.5 justify-center">
                      {trainer.rating} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Rating</p>
                  </div>
                </div>
                <button className="w-full mt-2 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-xs font-bold rounded-xl transition-all">
                  View Profile & Schedule
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-500" /> Upcoming Sessions Calendar
              </h3>
              <div className="flex gap-2">
                <button className="px-2 py-1 text-[10px] font-bold bg-slate-100 rounded text-slate-600">List View</button>
                <button className="px-2 py-1 text-[10px] font-bold bg-slate-900 rounded text-white">Month View</button>
              </div>
            </div>
            {/* Simple list view mockup for calendar */}
            <div className="space-y-3">
              {[
                { date: 'Oct 15', time: '10:00 AM', title: 'High Voltage EV Safety', type: 'Classroom', trainer: 'Dr. Alan Grant' },
                { date: 'Oct 18', time: '02:00 PM', title: 'Leadership Workshop', type: 'Hybrid', trainer: 'External' },
                { date: 'Oct 22', time: '09:00 AM', title: 'Battery Diagnostics Practical', type: 'Workshop', trainer: 'Sarah Connor' },
              ].map((event, idx) => (
                <div key={idx} className="flex items-center p-3 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors">
                  <div className="w-16 shrink-0 text-center border-r border-slate-100 pr-3">
                    <p className="text-xs font-black text-indigo-600">{event.date.split(' ')[0]}</p>
                    <p className="text-lg font-black text-slate-900 leading-none">{event.date.split(' ')[1]}</p>
                  </div>
                  <div className="pl-4 flex-1">
                    <h4 className="text-sm font-bold text-slate-900">{event.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{event.time} • {event.trainer}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: INSIGHTS & AI
          ========================================= */}
      {activeTab === 'Insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Completion by Department */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-4">Training Completion by Department</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Engineering', completed: 85, pending: 15 },
                    { name: 'Sales', completed: 65, pending: 35 },
                    { name: 'Support', completed: 92, pending: 8 },
                    { name: 'HR', completed: 100, pending: 0 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} dx={-10} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    <Bar dataKey="completed" name="Completed (%)" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={30} />
                    <Bar dataKey="pending" name="Pending (%)" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Course Popularity */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex flex-col">
              <h3 className="text-sm font-black text-slate-900 mb-4">Course Categories Distribution</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Technical', value: 45 },
                          { name: 'Compliance', value: 30 },
                          { name: 'Soft Skills', value: 15 },
                          { name: 'Leadership', value: 10 },
                        ]}
                        cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                      >
                        {PIE_COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* AI Reporting Generate */}
          <div className="bg-indigo-600 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-indigo-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <FileSpreadsheet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black">Generate AI-Powered LMS Report</h3>
                <p className="text-indigo-100 text-xs mt-1">Get comprehensive insights, gap analysis, and ROI on training programs.</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2.5 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow-sm hover:scale-105 transition-transform text-center">
                Export PDF
              </button>
              <button className="flex-1 md:flex-none px-4 py-2.5 bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-indigo-900 transition-colors text-center">
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          CREATE COURSE SLIDE-OUT DRAWER
          ========================================= */}
      {isCreateCourseOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCreateCourseOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Create New Course</h3>
                <p className="text-xs text-slate-500 font-medium">Add a training module to the LMS catalog.</p>
              </div>
              <button 
                onClick={() => setIsCreateCourseOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Course Title</label>
                <input type="text" placeholder="e.g. Advanced Battery Diagnostics" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                    <option>Technical</option>
                    <option>Compliance</option>
                    <option>Soft Skills</option>
                    <option>Leadership</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Department</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Sales</option>
                    <option>Support</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Delivery Mode</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                    <option>Online (Self-paced)</option>
                    <option>Classroom</option>
                    <option>Hybrid</option>
                    <option>Workshop</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Duration</label>
                  <input type="text" placeholder="e.g. 4 Hours" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Lead Instructor</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                  <option>Dr. Alan Grant</option>
                  <option>Sarah Connor</option>
                  <option>Michael Scott</option>
                  <option>External Trainer...</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Course Materials (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer group">
                  <div className="mx-auto w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-700">Click to upload PDFs, MP4s, or SCORM</p>
                  <p className="text-[10px] text-slate-400 mt-1">Max file size 500MB</p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button 
                onClick={() => setIsCreateCourseOpen(false)} 
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  showToast('Course "Advanced Battery Diagnostics" created successfully!', 'success');
                  setIsCreateCourseOpen(false);
                }} 
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all"
              >
                Publish Course
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =========================================
          ISSUE CERTIFICATE SLIDE-OUT DRAWER
          ========================================= */}
      {isIssueCertOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsIssueCertOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Issue New Certificate</h3>
                <p className="text-xs text-slate-500 font-medium">Award a certification to an employee.</p>
              </div>
              <button 
                onClick={() => setIsIssueCertOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Employee</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                  <option>Kiran Gopi (INNO-104)</option>
                  <option>Priya Sharma (INNO-105)</option>
                  <option>Rahul Verma (INNO-106)</option>
                  <option>Anita Patel (INNO-107)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Certificate Type / Course</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                  <option>High Voltage EV Safety</option>
                  <option>Advanced Battery Diagnostics</option>
                  <option>Workplace POSH & Ethics</option>
                  <option>ISO 27001 Auditor</option>
                  <option>Custom Certification...</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Issue Date</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Expiry Date (Optional)</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Certificate Signature / Approver</label>
                <input type="text" defaultValue="HR Compliance Team" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 mt-4">
                <Award className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-indigo-900">Digital Badge Generation</p>
                  <p className="text-[10px] text-indigo-700 mt-1">A verified digital badge will be generated and emailed to the employee along with the PDF certificate.</p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button 
                onClick={() => setIsIssueCertOpen(false)} 
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  showToast('Certificate successfully issued and emailed to employee!', 'success');
                  setIsIssueCertOpen(false);
                }} 
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all"
              >
                Issue Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
