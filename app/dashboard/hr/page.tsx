'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GlobalFilterProvider } from '../../../lib/global-filter-context';
import { DrillDownModal } from '../../../components/ceo/common/DrillDownModal';

// Import all HR views from components/hr-portal
import { DashboardView } from '../../../components/hr-portal/DashboardView';
import { EmployeeView } from '../../../components/hr-portal/EmployeeView';
import { EmployeeRecordsSystem } from '../../../components/hr-portal/EmployeeRecordsSystem';
import { AttendanceView } from '../../../components/hr-portal/AttendanceView';
import { LeaveView } from '../../../components/hr-portal/LeaveView';
import { PayrollView } from '../../../components/hr-portal/PayrollView';
import { PerformanceView } from '../../../components/hr-portal/PerformanceView';
import { RecruitmentView } from '../../../components/hr-portal/RecruitmentView';
import { InternManagementView } from '../../../components/hr-portal/InternManagementView';
import { TrainingLearningView } from '../../../components/hr-portal/TrainingLearningView';
import SettingsView from '../../../components/hr-portal/SettingsView';
import { OtherModulesView } from '../../../components/hr-portal/OtherModulesView';
import { Users, LayoutGrid, FileText, CheckCircle2 } from 'lucide-react';

function HRDashboardContent() {
  const searchParams = useSearchParams();
  const rawView = searchParams ? searchParams.get('view') : null;
  const activeView = rawView || 'dashboard';

  // Sub-view toggle for Employees section (Directory vs Full Records System)
  const [empSubTab, setEmpSubTab] = useState<'RECORDS' | 'DIRECTORY'>('RECORDS');

  // Toast Notification System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView showToast={showToast} />;

      case 'employees':
        return (
          <div className="space-y-4">
            {/* View Switcher Header Bar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Employee Workspace</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setEmpSubTab('RECORDS')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    empSubTab === 'RECORDS'
                      ? 'bg-white text-blue-600 shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" /> Employee Records System (Full Profiles)
                </button>
                <button
                  onClick={() => setEmpSubTab('DIRECTORY')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    empSubTab === 'DIRECTORY'
                      ? 'bg-white text-blue-600 shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" /> Directory & Org Chart
                </button>
              </div>
            </div>

            {empSubTab === 'RECORDS' ? (
              <EmployeeRecordsSystem showToast={showToast} />
            ) : (
              <EmployeeView showToast={showToast} />
            )}
          </div>
        );

      case 'attendance':
        return <AttendanceView showToast={showToast} />;

      case 'leaves':
        return <LeaveView showToast={showToast} />;

      case 'payroll':
        return <PayrollView showToast={showToast} />;

      case 'performance':
        return <PerformanceView showToast={showToast} />;

      case 'recruitment':
        return <RecruitmentView showToast={showToast} />;

      case 'interns':
        return <InternManagementView showToast={showToast} />;

      case 'training':
        return <TrainingLearningView showToast={showToast} />;

      case 'settings':
        return <SettingsView showToast={showToast} />;

      case 'candidates':
      case 'onboarding':
      case 'documents':
      case 'id-cards':
      case 'policies':
      case 'holidays':
      case 'exit':
      case 'reports':
      default:
        return <OtherModulesView activeView={activeView} showToast={showToast} />;
    }
  };

  return (
    <div className="space-y-6 text-left relative">
      {/* Global Toast Banner */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 fade-in">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2.5 ${
            toast.type === 'success' ? 'bg-emerald-950 text-emerald-200 border-emerald-800' :
            toast.type === 'warning' ? 'bg-amber-950 text-amber-200 border-amber-800' :
            toast.type === 'error' ? 'bg-red-950 text-red-200 border-red-800' :
            'bg-slate-900 text-slate-100 border-slate-700'
          }`}>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Render Active View */}
      {renderCurrentView()}

      {/* Executive Insight DrillDown Modal */}
      <DrillDownModal />
    </div>
  );
}

export default function HRDashboard() {
  return (
    <GlobalFilterProvider>
      <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading HR Workspace...</div>}>
        <HRDashboardContent />
      </Suspense>
    </GlobalFilterProvider>
  );
}

