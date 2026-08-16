'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRole } from '../../../components/RoleContext';
import { GlobalFilterProvider } from '../../../lib/global-filter-context';
import { DrillDownModal } from '../../../components/ceo/common/DrillDownModal';
import {
  Search,
  Bell,
  Sparkles,
  Zap,
  Terminal,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Briefcase,
  Users,
} from 'lucide-react';

// Import Views (to be created next)
import { DashboardView } from '../../../components/hr-portal/DashboardView';
import { RecruitmentView } from '../../../components/hr-portal/RecruitmentView';
import { EmployeeView } from '../../../components/hr-portal/EmployeeView';
import { AttendanceView } from '../../../components/hr-portal/AttendanceView';
import { LeaveView } from '../../../components/hr-portal/LeaveView';
import { PayrollView } from '../../../components/hr-portal/PayrollView';
import { PerformanceView } from '../../../components/hr-portal/PerformanceView';
import { OtherModulesView } from '../../../components/hr-portal/OtherModulesView';
import SettingsView from '../../../components/hr-portal/SettingsView';
import { EmployeeRecordsSystem } from '../../../components/hr-portal/EmployeeRecordsSystem';
import { TrainingLearningView } from '../../../components/hr-portal/TrainingLearningView';
import { InternManagementView } from '../../../components/hr-portal/InternManagementView';
interface Toast {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
}

function HRDashboardContent() {
  const { currentProfile, activeRole } = useRole();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeView = searchParams.get('view') || 'dashboard';

  // Command Palette State
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');

  // Toast System State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Show a toast helper
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Keyboard shortcut for Command Palette (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Quick Action Handler
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'apply-leave':
        router.push('/dashboard/hr?view=leaves&open_apply=true');
        showToast('Navigating to leave application drawer...', 'info');
        break;
      case 'add-job':
        router.push('/dashboard/hr?view=recruitment&open_add_job=true');
        showToast('Opening new job position form...', 'info');
        break;
      case 'generate-id':
        router.push('/dashboard/hr?view=id-cards');
        showToast('Loading Digital ID Generator...', 'info');
        break;
      case 'run-payroll':
        router.push('/dashboard/hr?view=payroll&process=true');
        showToast('Initiating Monthly Payroll Run...', 'info');
        break;
      default:
        break;
    }
  };

  // List of all views for search
  const navigationShortcuts = [
    { name: 'HR Dashboard Overview', view: 'dashboard', desc: 'Main lifecycle metrics & charts' },
    { name: 'Recruitment & Kanban Board', view: 'recruitment', desc: 'Job postings & hiring pipeline' },
    { name: 'Candidate Profiles & Resumes', view: 'candidates', desc: 'Candidate vetting & evaluations' },
    { name: 'Employee Directory & Org Chart', view: 'employees', desc: 'Staff profiles & reporting tree' },
    { name: 'Employee Onboarding Tracker', view: 'onboarding', desc: 'Checklists & system account setup' },
    { name: 'Attendance Logs & Corrections', view: 'attendance', desc: 'Realtime check-ins & heatmaps' },
    { name: 'Leave Calendar & Approvals', view: 'leaves', desc: 'Leave requests & workflows' },
    { name: 'Payroll Processing & CTC Breakdown', view: 'payroll', desc: 'Salary overview & payslip generator' },
    { name: 'Performance Review Cycles & Goals', view: 'performance', desc: 'KPI cards & manager reviews' },
    { name: 'Training Courses & Learning portal', view: 'training', desc: 'Enrolled tutorials & certifications' },
    { name: 'Intern Mentors & Projects', view: 'interns', desc: 'Intern progress boards & mentors' },
    { name: 'Employee Documents vault', view: 'documents', desc: 'Verification archives & folders' },
    { name: 'Digital Employee ID Card Generator', view: 'id-cards', desc: 'Generate & print QR ID cards' },
    { name: 'Holiday Calendar 2026', view: 'holidays', desc: 'National & regional calendar' },
    { name: 'HR Policies Library', view: 'policies', desc: 'Policy handbook & PDFs' },
    { name: 'Resignation & Exit Clearance', view: 'exit', desc: 'Offboarding & asset recoveries' },
    { name: 'Analytics & Export Reports', view: 'reports', desc: 'Exportable CSV/PDF metrics' },
  ];

  const filteredShortcuts = navigationShortcuts.filter(
    (item) =>
      item.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
      item.desc.toLowerCase().includes(commandSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left relative min-h-screen pb-16">
      
      {/* Sub-Header Portal Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold">HR Head Session</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            HR Portal <span className="text-xs font-normal text-slate-400">({activeView.toUpperCase()})</span>
          </h1>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Quick Command Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-bold flex items-center gap-2 transition-all grow md:grow-0"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">Search Everything...</span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-slate-300 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          {/* Quick Actions Dropdown */}
          <div className="relative group shrink-0">
            <button className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-all">
              <Zap className="h-4 w-4 fill-white" />
              <span>Quick Actions</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 hidden group-hover:block z-30 animate-in fade-in duration-200">
              <button
                onClick={() => handleQuickAction('apply-leave')}
                className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Clock className="h-3.5 w-3.5 text-rose-500" /> Apply Leave
              </button>
              <button
                onClick={() => handleQuickAction('add-job')}
                className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Briefcase className="h-3.5 w-3.5 text-blue-500" /> Add Job Opening
              </button>
              <button
                onClick={() => handleQuickAction('generate-id')}
                className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <UserCheck className="h-3.5 w-3.5 text-emerald-500" /> Generate ID Card
              </button>
              <div className="h-px bg-slate-100 my-1" />
              <button
                onClick={() => handleQuickAction('run-payroll')}
                className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Layers className="h-3.5 w-3.5 text-violet-500" /> Process Payroll
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render Dynamic Views based on URL view param */}
      <div className="space-y-6">
        {activeView === 'dashboard' && <DashboardView showToast={showToast} />}
        {activeView === 'recruitment' && <RecruitmentView showToast={showToast} />}
        {activeView === 'candidates' && <OtherModulesView activeView="candidates" showToast={showToast} />}
        {activeView === 'employees' && <EmployeeView showToast={showToast} />}
        {activeView === 'onboarding' && <OtherModulesView activeView="onboarding" showToast={showToast} />}
        {activeView === 'attendance' && <AttendanceView showToast={showToast} />}
        {activeView === 'leaves' && <LeaveView showToast={showToast} />}
        {activeView === 'payroll' && <PayrollView showToast={showToast} />}
        {activeView === 'performance' && <PerformanceView showToast={showToast} />}
        {activeView === 'documents' && <EmployeeRecordsSystem showToast={showToast} />}
        {activeView === 'training' && <TrainingLearningView showToast={showToast} />}
        {activeView === 'interns' && <InternManagementView showToast={showToast} />}
        {[
          'id-cards',
          'holidays',
          'policies',
          'exit',
          'reports',
          'notifications',
        ].includes(activeView) && activeView !== 'documents' && <OtherModulesView activeView={activeView} showToast={showToast} />}
        {activeView === 'settings' && <SettingsView showToast={showToast} />}
      </div>

      {/* ==========================================
          COMMAND PALETTE DIALOG (MODAL)
          ========================================== */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16">
          <div className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50/50">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                placeholder="Type a module name or keyword (e.g. Leave, Resume, Org Chart)..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none font-medium placeholder-slate-400"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsCommandOpen(false);
                  setCommandSearch('');
                }}
                className="text-[10px] font-black px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-600 transition-all shrink-0"
              >
                ESC
              </button>
            </div>

            {/* Results Roster */}
            <div className="max-h-96 overflow-y-auto p-3 space-y-1">
              <p className="text-[10px] font-black text-slate-400 px-3 py-1 uppercase tracking-wider">
                HR Portal Shortcuts ({filteredShortcuts.length})
              </p>
              {filteredShortcuts.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    router.push(`/dashboard/hr?view=${item.view}`);
                    setIsCommandOpen(false);
                    setCommandSearch('');
                    showToast(`Navigated to ${item.name}`, 'info');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-2xl hover:bg-blue-50/50 flex items-center justify-between group transition-all"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}

              {filteredShortcuts.length === 0 && (
                <div className="py-12 text-center space-y-2">
                  <Terminal className="h-8 w-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-500">No matching shortcuts found.</p>
                  <p className="text-[10px] text-slate-400">Try searching "Leave", "Recruitment", or "Payroll".</p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
              <p>Tip: Use ↑↓ arrows to navigate and Enter to open.</p>
              <p>InnoVibe Mobility HR Engine</p>
            </div>
          </div>
        </div>
      )}

      {/* Executive Insight DrillDown Modal */}
      <DrillDownModal />

      {/* ==========================================
          TOAST FLOATING SYSTEM
          ========================================== */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-start gap-3 pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 text-left"
          >
            {t.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />}
            {t.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />}
            <div className="space-y-0.5">
              <p className="text-xs font-extrabold text-slate-800">
                {t.type.charAt(0).toUpperCase() + t.type.slice(1)} Alert
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HRDashboard() {
  return (
    <GlobalFilterProvider>
      <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-400">Loading HR Portal...</div>}>
        <HRDashboardContent />
      </Suspense>
    </GlobalFilterProvider>
  );
}
