'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Wrench, Truck, Car, Building2, Users,
  UserCheck, Users2, Package, Cpu, DollarSign, FolderKanban, Settings, Lock
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: any;
  readOnly?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function COOSidebar() {
  const pathname = usePathname();

  const sections: NavSection[] = [
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Dashboard', href: '/dashboard/coo', icon: LayoutDashboard },
        { label: 'Service Operations', href: '/dashboard/coo/operations', icon: Wrench },
        { label: 'Fleet Management', href: '/dashboard/coo/fleet', icon: Truck },
        { label: 'Vehicle Management', href: '/dashboard/coo/vehicles', icon: Car },
        { label: 'Workshop Management', href: '/dashboard/coo/workshop', icon: Building2 },
        { label: 'Technician Management', href: '/dashboard/coo/technicians', icon: Users },
      ],
    },
    {
      title: 'BUSINESS',
      items: [
        { label: 'Business Operations', href: '/dashboard/coo/business', icon: UserCheck },
      ],
    },
    {
      title: 'WORKFORCE',
      items: [
        { label: 'Workforce & HR', href: '/dashboard/coo/workforce', icon: Users2 },
      ],
    },
    {
      title: 'PROCUREMENT',
      items: [
        { label: 'Procurement & Inventory', href: '/dashboard/coo/procurement', icon: Package },
      ],
    },
    {
      title: 'EV INTELLIGENCE',
      items: [
        { label: 'EV Health & Telemetry', href: '/dashboard/coo/ev-intelligence', icon: Cpu },
      ],
    },
    {
      title: 'FINANCIALS (READ ONLY)',
      items: [
        { label: 'Financials & Revenue', href: '/dashboard/coo/financials', icon: DollarSign, readOnly: true },
      ],
    },
    {
      title: 'COLLABORATION',
      items: [
        { label: 'Projects & Reports', href: '/dashboard/coo/collaboration', icon: FolderKanban },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { label: 'Limited Settings', href: '/dashboard/coo/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col justify-between overflow-y-auto shadow-sm z-30 shrink-0">
      <div className="p-4">
        {/* Brand Header */}
        <div className="flex items-center space-x-3 px-2 py-3 mb-4 bg-slate-50 border border-slate-200 rounded-xl">
          <img
            src="/coo-logo.jpg"
            alt="C.O.O Dashboard Logo"
            className="w-10 h-10 rounded-xl object-cover border-2 border-blue-500 shadow-md ring-2 ring-blue-100 shrink-0"
          />
          <div>
            <h1 className="text-sm font-black tracking-tight text-slate-900 leading-none">
              C.O.O Dashboard
            </h1>
            <span className="text-[10px] font-bold text-blue-600 block mt-1 uppercase tracking-wider">Executive Suite</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-5">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="flex items-center justify-between px-2 text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">
                <span>{section.title}</span>
                {section.title.includes('READ ONLY') && (
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                    VIEW ONLY
                  </span>
                )}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard/coo' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    prefetch={true}
                    className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.readOnly && (
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded font-bold">
                        RO
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Forbidden Test Link */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/dashboard/coo/forbidden"
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
            >
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-rose-500" />
                <span>Roles & System Config</span>
              </div>
              <span className="text-[9px] bg-rose-100 text-rose-700 px-1 py-0.5 rounded font-bold">403</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* User Badge Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center space-x-3">
          <img
            src="/coo-logo.jpg"
            alt="COO Avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 shadow-sm shrink-0"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">Chief Operating Officer</p>
            <p className="text-[10px] text-emerald-600 font-semibold truncate">coo@innovibemobility.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
