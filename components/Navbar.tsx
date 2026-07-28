'use client';

import React from 'react';
import { useRole } from './RoleContext';
import { useRouter } from 'next/navigation';
import { RoleType } from '../lib/types';
import { Zap, Sparkles, LogOut, Search, Activity } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const router = useRouter();
  const { activeRole, currentProfile, logout, isSuperAdmin } = useRole();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const roleLabels: Record<RoleType, { title: string; badgeColor: string }> = {
    CEO: { title: 'CEO Dashboard (Super Admin)', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
    COO: { title: 'COO Dashboard (Operations)', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300' },
    CTO: { title: 'CTO Dashboard (Technology)', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
    SERVICE_MANAGER: { title: 'Service Manager Dashboard', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    HR: { title: 'HR Dashboard (Human Resources)', badgeColor: 'bg-pink-100 text-pink-900 border-pink-300' },
    TECHNICIAN: { title: 'Technician Portal', badgeColor: 'bg-teal-100 text-teal-900 border-teal-300' },
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Left Branding & Role Indicator */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider text-slate-900">INNOVIBE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-200">ICC v1.0</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">office.innovibemobility.com</p>
          </div>
        </Link>

        <div className="h-5 w-px bg-slate-200 mx-1 hidden md:block" />

        {/* Active Designation Badge */}
        <div className="hidden lg:flex items-center gap-2">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-lg border ${roleLabels[activeRole].badgeColor} flex items-center gap-1.5 shadow-xs`}>
            <Sparkles className="h-3.5 w-3.5" />
            {roleLabels[activeRole].title}
          </span>
          {isSuperAdmin && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Activity className="h-3 w-3 text-emerald-600 animate-pulse" /> Live Tracking Active
            </span>
          )}
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-1.5 w-80">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search tickets, vehicles, telematics, staff..."
          className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-medium"
        />
      </div>

      {/* Right User & Logout Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 pl-2">
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            className="h-9 w-9 rounded-full object-cover border-2 border-sky-500 shadow-xs"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">{currentProfile.name}</p>
            <p className="text-[10px] text-sky-700 font-medium mt-0.5">{currentProfile.title}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Log Out"
          className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-all ml-1"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
