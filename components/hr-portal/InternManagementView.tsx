'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Eye,
  User,
  GraduationCap,
  Briefcase,
  Star,
  Users,
  Building,
  Target,
  FileText,
  Calendar,
  MessageSquare,
  TrendingUp,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles,
  UserCheck,
  Zap,
  Award
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

interface InternManagementViewProps {
  showToast: Toast;
}

// ---------------------------------------------------------------------------
// MOCK DATA
// ---------------------------------------------------------------------------

const MOCK_INTERNS = [
  { 
    id: 'int_01', 
    name: 'Aisha Patel', 
    internId: 'INN-INT-201', 
    university: 'IIT Bombay', 
    department: 'Engineering', 
    role: 'Battery Systems Intern', 
    mentor: 'Dr. Alan Grant', 
    startDate: '2026-05-15', 
    endDate: '2026-11-15', 
    status: 'Active', 
    location: 'Onsite - Kakinada',
    project: 'Next-Gen Solid State Battery Analysis',
    progress: 45,
    fteEligible: true,
    rating: 4.8
  },
  { 
    id: 'int_02', 
    name: 'Rahul Sharma', 
    internId: 'INN-INT-202', 
    university: 'NIT Warangal', 
    department: 'Marketing', 
    role: 'Digital Marketing Intern', 
    mentor: 'Sarah Connor', 
    startDate: '2026-06-01', 
    endDate: '2026-09-01', 
    status: 'Ending Soon', 
    location: 'Remote',
    project: 'EV Market Penetration Campaign Q3',
    progress: 80,
    fteEligible: false,
    rating: 4.2
  },
  { 
    id: 'int_03', 
    name: 'Priya Desai', 
    internId: 'INN-INT-203', 
    university: 'BITS Pilani', 
    department: 'Data Science', 
    role: 'ML Analytics Intern', 
    mentor: 'Michael Scott', 
    startDate: '2026-01-10', 
    endDate: '2026-07-10', 
    status: 'FTE Converted', 
    location: 'Hybrid',
    project: 'Predictive Maintenance Algorithm v2',
    progress: 100,
    fteEligible: true,
    rating: 4.9
  },
  { 
    id: 'int_04', 
    name: 'Kevin Thomas', 
    internId: 'INN-INT-204', 
    university: 'VIT Vellore', 
    department: 'Design', 
    role: 'UI/UX Intern', 
    mentor: 'John Doe', 
    startDate: '2026-07-01', 
    endDate: '2027-01-01', 
    status: 'New', 
    location: 'Onsite - Hyderabad',
    project: 'CRM Dashboard Redesign Phase 1',
    progress: 15,
    fteEligible: true,
    rating: 0
  }
];

const PERFORMANCE_DATA = [
  { month: 'Week 1', score: 65 },
  { month: 'Week 2', score: 72 },
  { month: 'Week 3', score: 78 },
  { month: 'Week 4', score: 85 },
  { month: 'Week 5', score: 82 },
  { month: 'Week 6', score: 89 },
  { month: 'Week 7', score: 92 },
];

export function InternManagementView({ showToast }: InternManagementViewProps) {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Directory' | 'Projects' | 'Reviews' | 'FTE'>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddInternOpen, setIsAddInternOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<typeof MOCK_INTERNS[0] | null>(null);

  // Quick Action States
  const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);
  const [isAssignMentorOpen, setIsAssignMentorOpen] = useState(false);
  const [isScheduleReviewOpen, setIsScheduleReviewOpen] = useState(false);
  const [isFteConversionOpen, setIsFteConversionOpen] = useState(false);

  // Quick Action Handler
  const handleQuickAction = (action: string) => {
    if (action === 'Assign Project') setIsAssignProjectOpen(true);
    else if (action === 'Assign Mentor') setIsAssignMentorOpen(true);
    else if (action === 'Schedule Review') setIsScheduleReviewOpen(true);
    else if (action === 'FTE Conversion') setIsFteConversionOpen(true);
    else showToast(`${action} action triggered.`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-500" />
            Intern Management Hub
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            End-to-end lifecycle management from onboarding to FTE conversion
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => handleQuickAction('Export Intern List')} className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold flex items-center gap-2 transition-all hover:bg-slate-50 shadow-sm">
            <Download className="h-4 w-4" /> Export Data
          </button>
          <button onClick={() => setIsAddInternOpen(true)} className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm">
            <Plus className="h-4 w-4" /> Add Intern
          </button>
        </div>
      </div>

      {/* TOP NAVIGATION TABS */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-1">
        {['Dashboard', 'Directory', 'Projects', 'Reviews', 'FTE'].map((tab) => (
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
          TAB: DASHBOARD
          ========================================= */}
      {activeTab === 'Dashboard' && (
        <div className="space-y-6">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-pink-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-pink-100 text-pink-700 rounded-xl">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Interns</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">42</p>
              <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> 8 New this month
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ending Soon</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">12</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">FTE Converted</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">18</p>
              <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                60% Conversion Rate
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Reviews</h3>
              </div>
              <p className="text-3xl font-black text-slate-900">7</p>
              <p className="text-[11px] font-bold text-slate-400 mt-1">Mid-Term & Final evals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Internship Progress Overview */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-slate-800">Average Intern Performance Trajectory</h3>
                <button className="text-[10px] font-bold text-slate-500 hover:text-pink-600 bg-slate-100 px-2 py-1 rounded">This Cohort</button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" /> Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { icon: Target, label: 'Assign Project', color: 'text-blue-600', bg: 'bg-blue-50' },
                  { icon: UserCheck, label: 'Assign Mentor', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: Calendar, label: 'Schedule Review', color: 'text-amber-600', bg: 'bg-amber-50' },
                  { icon: Award, label: 'FTE Conversion', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((action, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleQuickAction(action.label)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${action.bg} ${action.color}`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{action.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: DIRECTORY
          ========================================= */}
      {activeTab === 'Directory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search interns by name, college, or role..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {MOCK_INTERNS.map(intern => (
              <div key={intern.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all group flex flex-col relative overflow-hidden cursor-pointer" onClick={() => { setSelectedIntern(intern); showToast('Opening intern profile...', 'info'); }}>
                {intern.status === 'FTE Converted' && <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-[100px] -z-10"></div>}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-black text-lg border-2 border-white shadow-sm">
                    {intern.name.charAt(0)}
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${
                    intern.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                    intern.status === 'Ending Soon' ? 'bg-amber-100 text-amber-700' :
                    intern.status === 'FTE Converted' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {intern.status}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-black text-slate-900 leading-tight">{intern.name}</h3>
                  <p className="text-[11px] text-slate-500 font-medium mb-3">{intern.internId} • {intern.department}</p>
                  
                  <div className="space-y-2 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-slate-400"/> {intern.role}</div>
                    <div className="flex items-center gap-1.5"><Building className="h-3.5 w-3.5 text-slate-400"/> {intern.university}</div>
                    <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-slate-400"/> Mentor: {intern.mentor}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-[10px] font-bold mb-1.5">
                    <span className="text-slate-500">Project Progress</span>
                    <span className="text-pink-600">{intern.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: `${intern.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          TAB: PROJECTS & TIMELINE
          ========================================= */}
      {activeTab === 'Projects' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-sm font-black text-slate-900">Project Management & Milestones</h3>
              <p className="text-xs text-slate-500 mt-1">Track intern deliverables, deadlines, and technologies used.</p>
            </div>
            <div className="p-2">
              {MOCK_INTERNS.map((intern, i) => (
                <div key={intern.id} className={`p-4 ${i !== MOCK_INTERNS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-blue-500" />
                        <h4 className="text-sm font-bold text-slate-900">{intern.project}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">Assigned to: <span className="font-bold text-slate-700">{intern.name}</span> • Mentor: {intern.mentor}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">React</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">Python</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">Data Analysis</span>
                      </div>
                    </div>
                    <div className="w-full md:w-64">
                      <div className="flex justify-between text-[10px] font-bold mb-1.5">
                        <span className="text-slate-500">Deliverable Status</span>
                        <span className="text-indigo-600">{intern.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${intern.progress}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                        <span>Due: {intern.endDate}</span>
                        <button className="text-indigo-600 font-bold hover:underline">Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: REVIEWS & FTE
          ========================================= */}
      {activeTab === 'Reviews' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" /> Evaluation Pipeline
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Mid-Term Reviews', count: 4, type: 'Pending' },
                  { name: 'Final Evaluations', count: 3, type: 'Upcoming' },
                  { name: 'Mentor Feedback Forms', count: 12, type: 'Completed' },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-900">{item.count}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        item.type === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        item.type === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all">
                Schedule New Review
              </button>
            </div>

            {/* FTE Conversion Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="h-24 w-24" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-sm font-black text-white">FTE Conversion Pipeline</h3>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-[11px] font-bold text-emerald-300">Highly Recommended</p>
                      <p className="text-xs text-white font-black mt-0.5">Aisha Patel • Eng</p>
                    </div>
                    <button className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors">Generate Offer</button>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-[11px] font-bold text-blue-300">Evaluation Needed</p>
                      <p className="text-xs text-white font-black mt-0.5">Kevin Thomas • Design</p>
                    </div>
                    <button className="px-3 py-1 bg-white/20 text-white text-[10px] font-bold rounded-lg hover:bg-white/30 transition-colors">View Feedback</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FTE Tab */}
      {activeTab === 'FTE' && (
         <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 flex flex-col items-center justify-center text-center h-64">
           <Award className="h-12 w-12 text-emerald-500 mb-4" />
           <h3 className="text-base font-black text-slate-900">Full-Time Conversion Portal</h3>
           <p className="text-xs text-slate-500 mt-2 max-w-sm">Manage offer rollouts, compensation details, and final manager approvals for interns eligible for permanent roles.</p>
           <button className="mt-6 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-700 transition-all">
             View Eligible Candidates
           </button>
         </div>
      )}

      {/* =========================================
          ADD INTERN SLIDE-OUT DRAWER
          ========================================= */}
      {isAddInternOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsAddInternOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Onboard New Intern</h3>
                <p className="text-xs text-slate-500 font-medium">Add intern details and assign projects.</p>
              </div>
              <button 
                onClick={() => setIsAddInternOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <input type="text" placeholder="e.g. Aditi Sharma" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">University/College</label>
                  <input type="text" placeholder="e.g. IIT Delhi" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Department</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm appearance-none">
                    <option>Engineering</option>
                    <option>Marketing</option>
                    <option>Data Science</option>
                    <option>Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Start Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">End Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Assigned Mentor</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm appearance-none">
                  <option>Dr. Alan Grant</option>
                  <option>Sarah Connor</option>
                  <option>Michael Scott</option>
                </select>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button 
                onClick={() => setIsAddInternOpen(false)} 
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  showToast('Intern Onboarded successfully!', 'success');
                  setIsAddInternOpen(false);
                }} 
                className="flex-1 px-4 py-2.5 bg-pink-600 text-white rounded-xl font-bold text-sm hover:bg-pink-700 transition-all"
              >
                Onboard Intern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          QUICK ACTION: ASSIGN PROJECT DRAWER
          ========================================= */}
      {isAssignProjectOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsAssignProjectOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Assign Project</h3>
                <p className="text-xs text-slate-500 font-medium">Allocate a new project to an intern.</p>
              </div>
              <button onClick={() => setIsAssignProjectOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Intern</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none">
                  {MOCK_INTERNS.map(i => <option key={i.id}>{i.name} - {i.department}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Project Title</label>
                <input type="text" placeholder="e.g. Battery Heat Analysis" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Project Description</label>
                <textarea rows={4} placeholder="Describe the deliverables..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Due Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button onClick={() => setIsAssignProjectOpen(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button onClick={() => { showToast('Project Assigned Successfully!', 'success'); setIsAssignProjectOpen(false); }} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">Assign Project</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          QUICK ACTION: ASSIGN MENTOR DRAWER
          ========================================= */}
      {isAssignMentorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsAssignMentorOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Assign Mentor</h3>
                <p className="text-xs text-slate-500 font-medium">Link an intern with a senior team member.</p>
              </div>
              <button onClick={() => setIsAssignMentorOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Intern</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none">
                  {MOCK_INTERNS.map(i => <option key={i.id}>{i.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Mentor</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none">
                  <option>Dr. Alan Grant (Engineering)</option>
                  <option>Sarah Connor (Marketing)</option>
                  <option>Michael Scott (Sales)</option>
                  <option>John Doe (Design)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Meeting Frequency</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm appearance-none">
                  <option>Weekly (1 hr)</option>
                  <option>Bi-Weekly (1 hr)</option>
                  <option>Monthly (2 hrs)</option>
                </select>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button onClick={() => setIsAssignMentorOpen(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button onClick={() => { showToast('Mentor Assigned Successfully!', 'success'); setIsAssignMentorOpen(false); }} className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-all">Assign Mentor</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          QUICK ACTION: SCHEDULE REVIEW DRAWER
          ========================================= */}
      {isScheduleReviewOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsScheduleReviewOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Schedule Review</h3>
                <p className="text-xs text-slate-500 font-medium">Set up an evaluation meeting.</p>
              </div>
              <button onClick={() => setIsScheduleReviewOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Intern</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm appearance-none">
                  {MOCK_INTERNS.map(i => <option key={i.id}>{i.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Review Type</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm appearance-none">
                  <option>Mid-Term Review</option>
                  <option>Final Evaluation</option>
                  <option>Mentor Sync-up</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Time</label>
                  <input type="time" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button onClick={() => setIsScheduleReviewOpen(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button onClick={() => { showToast('Review Scheduled and invites sent!', 'success'); setIsScheduleReviewOpen(false); }} className="flex-1 px-4 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-all">Schedule</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          QUICK ACTION: FTE CONVERSION DRAWER
          ========================================= */}
      {isFteConversionOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsFteConversionOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Initiate FTE Conversion</h3>
                <p className="text-xs text-slate-500 font-medium">Rollout a Full-Time Offer to a top intern.</p>
              </div>
              <button onClick={() => setIsFteConversionOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Eligible Intern</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm appearance-none">
                  {MOCK_INTERNS.filter(i => i.fteEligible).map(i => <option key={i.id}>{i.name} (Rating: {i.rating})</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full-Time Role Designation</label>
                <input type="text" placeholder="e.g. Junior Battery Engineer" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Starting CTC (LPA)</label>
                  <input type="number" placeholder="e.g. 8.5" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Joining Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">HR Remarks</label>
                <textarea rows={3} placeholder="Add offer details or manager approvals..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button onClick={() => setIsFteConversionOpen(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button onClick={() => { showToast('FTE Offer generated and sent for signature!', 'success'); setIsFteConversionOpen(false); }} className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all">Generate Offer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
