'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRole } from './RoleContext';
import { RoleType } from '../lib/types';
import {
  Crown,
  TrendingUp,
  Activity,
  BarChart3,
  Bot,
  AlertTriangle,
  Zap,
  MessageSquare,
  FileText,
  ShieldCheck,
  Wrench,
  Users,
  Truck,
  Compass,
  Sparkles,
  ChevronRight,
  Lock,
  Layers,
  LayoutDashboard,
  Briefcase,
  UserCheck,
  ClipboardList,
  Clock,
  CalendarRange,
  IndianRupee,
  Award,
  GraduationCap,
  FolderOpen,
  Contact,
  Calendar,
  DoorOpen,
  Bell,
  Settings,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: any;
  badge?: string;
  color?: string;
  exactQuery?: string;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

const roleNavigationMap: Record<RoleType, { workspaceTitle: string; categories: NavCategory[] }> = {
  CEO: {
    workspaceTitle: 'CEO Executive Workspace',
    categories: [
      {
        title: 'Executive Suite',
        items: [
          { name: 'Executive Overview', path: '/dashboard/ceo', icon: Crown, color: 'text-amber-600' },
          { name: 'Business Performance', path: '/dashboard/ceo?module=business-performance', exactQuery: 'business-performance', icon: TrendingUp, color: 'text-emerald-600' },
          { name: 'Fleet Intelligence', path: '/dashboard/ceo?module=fleet-intelligence', exactQuery: 'fleet-intelligence', icon: Activity, color: 'text-sky-600' },
          { name: 'Department Performance', path: '/dashboard/ceo?module=department-performance', exactQuery: 'department-performance', icon: BarChart3, color: 'text-purple-600' },
        ],
      },
      {
        title: 'Operations & Intelligence',
        items: [
          { name: 'AI Command Center', path: '/dashboard/ai-command', icon: Bot, badge: 'n8n AI', color: 'text-sky-600' },
          { name: 'Alerts & Risk Center', path: '/dashboard/ceo?module=alerts-risk', exactQuery: 'alerts-risk', icon: AlertTriangle, badge: 'Live', color: 'text-red-500' },
          { name: 'Action Center', path: '/dashboard/ceo?module=action-center', exactQuery: 'action-center', icon: Zap, color: 'text-amber-500' },
          { name: 'Communication Hub', path: '/dashboard/ceo?module=communication-hub', exactQuery: 'communication-hub', icon: MessageSquare, color: 'text-indigo-600' },
        ],
      },
      {
        title: 'Governance & Controls',
        items: [
          { name: 'Reports & Analytics', path: '/dashboard/ceo?module=reports-analytics', exactQuery: 'reports-analytics', icon: FileText, color: 'text-blue-600' },
          { name: 'Role Access & Settings', path: '/dashboard/roles', icon: ShieldCheck, badge: 'RBAC', color: 'text-amber-600' },
        ],
      },
    ],
  },
  COO: {
    workspaceTitle: 'COO Operations Workspace',
    categories: [
      {
        title: 'Operations & Logistics',
        items: [
          { name: 'Operations Overview', path: '/dashboard/coo', icon: Activity, color: 'text-blue-600' },
          { name: 'Vendor Fleet Live Sync', path: '/dashboard/coo?module=fleet', exactQuery: 'fleet', icon: Truck, color: 'text-emerald-600' },
          { name: 'Dispatch Matrix', path: '/dashboard/coo?module=dispatch', exactQuery: 'dispatch', icon: Compass, color: 'text-purple-600' },
        ],
      },
      {
        title: 'Automation',
        items: [
          { name: 'AI Command Suite', path: '/dashboard/ai-command', icon: Bot, badge: 'n8n', color: 'text-sky-600' },
        ],
      },
    ],
  },
  CTO: {
    workspaceTitle: 'CTO Technology Workspace',
    categories: [
      {
        title: 'Telematics & Engineering',
        items: [
          { name: 'Telematics Overview', path: '/dashboard/cto', icon: Zap, color: 'text-purple-600' },
          { name: 'EV Health Score Engine', path: '/dashboard/cto?module=health', exactQuery: 'health', icon: Activity, color: 'text-emerald-600' },
          { name: 'AI Pipeline Logs', path: '/dashboard/cto?module=pipeline', exactQuery: 'pipeline', icon: BarChart3, color: 'text-sky-600' },
        ],
      },
      {
        title: 'Automation',
        items: [
          { name: 'AI Command Suite', path: '/dashboard/ai-command', icon: Bot, badge: 'n8n', color: 'text-sky-600' },
        ],
      },
    ],
  },
  SERVICE_MANAGER: {
    workspaceTitle: 'Service Hub Workspace',
    categories: [
      {
        title: 'Service Operations',
        items: [
          { name: 'Ticket Management Queue', path: '/dashboard/service-manager', icon: Wrench, color: 'text-emerald-600' },
          { name: 'AI Service Advisor', path: '/dashboard/service-manager?module=advisor', exactQuery: 'advisor', icon: Sparkles, color: 'text-sky-600' },
          { name: 'Technician Dispatcher', path: '/dashboard/service-manager?module=dispatcher', exactQuery: 'dispatcher', icon: Users, color: 'text-purple-600' },
        ],
      },
      {
        title: 'Automation',
        items: [
          { name: 'AI Command Suite', path: '/dashboard/ai-command', icon: Bot, badge: 'n8n', color: 'text-sky-600' },
        ],
      },
    ],
  },
  HR: {
    workspaceTitle: 'HR Staff Workspace',
    categories: [
      {
        title: 'Core HR',
        items: [
          { name: 'Dashboard', path: '/dashboard/hr?view=dashboard', exactQuery: 'dashboard', icon: LayoutDashboard, color: 'text-sky-600' },
          { name: 'Employee Management', path: '/dashboard/hr?view=employees', exactQuery: 'employees', icon: Users, color: 'text-blue-600' },
          { name: 'Attendance', path: '/dashboard/hr?view=attendance', exactQuery: 'attendance', icon: Clock, color: 'text-amber-600' },
          { name: 'Leave Management', path: '/dashboard/hr?view=leaves', exactQuery: 'leaves', icon: CalendarRange, color: 'text-rose-600' },
          { name: 'Payroll', path: '/dashboard/hr?view=payroll', exactQuery: 'payroll', icon: IndianRupee, color: 'text-emerald-600' },
          { name: 'Performance', path: '/dashboard/hr?view=performance', exactQuery: 'performance', icon: Award, color: 'text-amber-500' },
        ],
      },
      {
        title: 'Recruitment & Growth',
        items: [
          { name: 'Recruitment', path: '/dashboard/hr?view=recruitment', exactQuery: 'recruitment', icon: Briefcase, color: 'text-indigo-600' },
          { name: 'Candidate Management', path: '/dashboard/hr?view=candidates', exactQuery: 'candidates', icon: UserCheck, color: 'text-emerald-600' },
          { name: 'Onboarding', path: '/dashboard/hr?view=onboarding', exactQuery: 'onboarding', icon: ClipboardList, color: 'text-violet-600' },
          { name: 'Training & Learning', path: '/dashboard/hr?view=training', exactQuery: 'training', icon: GraduationCap, color: 'text-purple-600' },
          { name: 'Intern Management', path: '/dashboard/hr?view=interns', exactQuery: 'interns', icon: Sparkles, color: 'text-pink-500' },
        ],
      },
      {
        title: 'Administration',
        items: [
          { name: 'Employee Documents', path: '/dashboard/hr?view=documents', exactQuery: 'documents', icon: FolderOpen, color: 'text-teal-600' },
          { name: 'Employee ID Cards', path: '/dashboard/hr?view=id-cards', exactQuery: 'id-cards', icon: Contact, color: 'text-cyan-600' },
          { name: 'HR Policies', path: '/dashboard/hr?view=policies', exactQuery: 'policies', icon: FileText, color: 'text-slate-600' },
          { name: 'Holiday Calendar', path: '/dashboard/hr?view=holidays', exactQuery: 'holidays', icon: Calendar, color: 'text-orange-500' },
          { name: 'Exit Management', path: '/dashboard/hr?view=exit', exactQuery: 'exit', icon: DoorOpen, color: 'text-red-500' },
          { name: 'Reports', path: '/dashboard/hr?view=reports', exactQuery: 'reports', icon: BarChart3, color: 'text-indigo-600' },
          { name: 'Settings', path: '/dashboard/hr?view=settings', exactQuery: 'settings', icon: Settings, color: 'text-slate-600' },
        ],
      },
    ],
  },
  TECHNICIAN: {
    workspaceTitle: 'Technician Hub',
    categories: [
      {
        title: 'Field Operations',
        items: [
          { name: 'My Dashboard', path: '/dashboard/technician', icon: LayoutDashboard, color: 'text-teal-600' },
          { name: 'SOP Checklists', path: '/dashboard/technician?module=sop', exactQuery: 'sop', icon: ClipboardList, color: 'text-amber-600' },
          { name: 'Service Queue', path: '/dashboard/technician?module=service', exactQuery: 'service', icon: Wrench, color: 'text-emerald-600' },
        ],
      },
    ],
  },
};

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeRole, isSuperAdmin } = useRole();

  const currentModuleParam = searchParams ? (searchParams.get('module') || searchParams.get('view')) : null;

  const currentWorkspace = roleNavigationMap[activeRole] || roleNavigationMap.CEO;

  const isItemActive = (itemPath: string, exactQuery?: string) => {
    const [basePath] = itemPath.split('?');
    if (pathname !== basePath) return false;
    if (exactQuery) {
      return currentModuleParam === exactQuery;
    }
    return !currentModuleParam;
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between hidden md:flex text-left shrink-0">
      <div className="space-y-6">
        {/* Workspace Header */}
        <div>
          <div className="flex items-center justify-between px-3 mb-3">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-sky-600" /> {currentWorkspace.workspaceTitle}
            </p>
            {isSuperAdmin ? (
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                CEO SUPER ADMIN
              </span>
            ) : (
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300 uppercase">
                {activeRole}
              </span>
            )}
          </div>

          {/* Navigation Categories */}
          <div className="space-y-5">
            {currentWorkspace.categories.map((category) => (
              <div key={category.title} className="space-y-1">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3.5 mb-1">
                  {category.title}
                </p>
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.path, item.exactQuery);

                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : item.color || 'text-slate-500'}`} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge ? (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                          active
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${active ? 'text-white' : 'text-slate-300'}`} />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Designation Privilege Status Card */}
      {isSuperAdmin ? (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left mt-4">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="h-4 w-4 text-amber-600 fill-amber-600" />
            <span className="text-xs font-black text-amber-900">Executive Workspace Active</span>
          </div>
          <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
            Dedicated CEO module navigation active. Dedicated workspaces assigned for all executive roles.
          </p>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-left mt-4">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="h-4 w-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-900">{activeRole} Dedicated Workspace</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Dedicated module navigation active for your {activeRole} session.
          </p>
        </div>
      )}
    </aside>
  );
}

