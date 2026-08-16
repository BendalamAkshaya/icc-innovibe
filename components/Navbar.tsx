'use client';

import React, { useState } from 'react';
import { useRole } from './RoleContext';
import { useRouter } from 'next/navigation';
import { RoleType } from '../lib/types';
import { Zap, Sparkles, LogOut, Search, Activity, Bell } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
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
        <Link href="/dashboard" className="flex items-center gap-1.5 group">
          <img src="/logo.jpeg" alt="InnoVibe Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider text-slate-900">INNOVIBE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-200">ICC v1.0</span>
            </div>
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
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative p-2 rounded-xl transition-all ${isNotificationsOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border border-white"></span>
          </button>
          
          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="text-sm font-black text-slate-900">Notifications</h3>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">2 New</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">System Update</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">InnoVibe Command Center v1.0 has been successfully deployed.</p>
                      <p className="text-[9px] font-medium text-slate-400 mt-1">10 mins ago</p>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">New Task Assigned</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">You have a new high-voltage EV diagnostic task pending in your queue.</p>
                      <p className="text-[9px] font-medium text-slate-400 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-2.5 border-t border-slate-100 text-center bg-slate-50">
                  <button onClick={() => setIsNotificationsOpen(false)} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-1">
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
