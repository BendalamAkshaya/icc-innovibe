import React, { useState, useEffect } from 'react';
import { useRole } from './RoleContext';
import { useRouter, usePathname } from 'next/navigation';
import { RoleType } from '../lib/types';
import { initialProfiles } from '../lib/mock-data';
import { Zap, Sparkles, LogOut, Search, Activity, Bell, CheckSquare, Clock, LayoutGrid, Settings } from 'lucide-react';
import Link from 'next/link';
import {
  getNotificationsForRole,
  markTicketNotificationAsRead,
  markAllTicketNotificationsAsRead,
  CrossRoleNotification,
} from '@/lib/ticketNotifications';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { activeRole, currentProfile, logout, isSuperAdmin } = useRole();
  const [roleNotifications, setRoleNotifications] = useState<CrossRoleNotification[]>([]);

  useEffect(() => {
    const loadNotifs = () => {
      setRoleNotifications(getNotificationsForRole(activeRole));
    };

    loadNotifs();

    const handleUpdate = () => loadNotifs();
    window.addEventListener('icc_ticket_notifications_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('icc_ticket_notifications_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [activeRole]);

  const getEffectiveRole = (): RoleType => {
    if (pathname.startsWith('/dashboard/hr')) return 'HR';
    if (pathname.startsWith('/dashboard/cto')) return 'CTO';
    if (pathname.startsWith('/dashboard/coo')) return 'COO';
    if (pathname.startsWith('/dashboard/service-manager')) return 'SERVICE_MANAGER';
    if (pathname.startsWith('/dashboard/technician')) return 'TECHNICIAN';
    if (pathname.startsWith('/dashboard/ceo')) return 'CEO';
    return activeRole;
  };

  const effectiveRole = getEffectiveRole();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [istTime, setIstTime] = useState('');

  // Live IST clock (UTC+5:30)
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // IST = UTC + 5h30m
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 5.5 * 3600000);
      const hh = ist.getHours().toString().padStart(2, '0');
      const mm = ist.getMinutes().toString().padStart(2, '0');
      const ss = ist.getSeconds().toString().padStart(2, '0');
      const ampm = ist.getHours() >= 12 ? 'PM' : 'AM';
      const h12 = ist.getHours() % 12 || 12;
      setIstTime(`${h12.toString().padStart(2,'0')}:${mm}:${ss} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Delay notification card pop-in until after the sidebar slides in (300ms)
  useEffect(() => {
    if (isNotificationsOpen) {
      const t = setTimeout(() => setNotifVisible(true), 320);
      return () => clearTimeout(t);
    } else {
      setNotifVisible(false);
    }
  }, [isNotificationsOpen]);

  type ModuleResult = { type: 'module'; id: string; label: string; desc: string; url: string };
  type TaskResult = { type: 'task'; id: string; title: string; tag: string; priority: string; status: string; deadline: string; completed: boolean; assignedBy: string };
  type SearchResult = ModuleResult | TaskResult;

  const priorityColors: Record<string, string> = {
    URGENT: 'bg-red-100 text-red-700',
    HIGH: 'bg-orange-100 text-orange-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    NORMAL: 'bg-slate-100 text-slate-600',
  };

  const getSearchResults = (): SearchResult[] => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    const results: SearchResult[] = [];

    // --- Section 1: Modules ---
    let modules: { id: string; label: string; desc: string; url: string; keywords: string[] }[] = [];
    if (activeRole === 'EMPLOYEE') {
      modules = [
        { id: 'leave', label: 'Leave Management', desc: 'Apply for time off', url: '/dashboard/employee?view=leave', keywords: ['leave', 'holiday', 'time off', 'vacation'] },
        { id: 'attendance', label: 'Attendance & Punctuality', desc: 'View clock-ins and shifts', url: '/dashboard/employee?view=attendance', keywords: ['attend', 'time', 'clock', 'punch', 'shift'] },
        { id: 'tasks', label: 'Assigned Tasks', desc: 'View your pending work', url: '/dashboard/employee?view=tasks', keywords: ['task', 'work', 'job', 'todo', 'assign'] },
        { id: 'helpdesk', label: 'Internal Helpdesk', desc: 'Submit IT or HR tickets', url: '/dashboard/employee?view=helpdesk', keywords: ['ticket', 'help', 'support', 'issue', 'it'] },
        { id: 'announcements', label: 'Company Notices', desc: 'Read executive broadcasts', url: '/dashboard/employee?view=announcements', keywords: ['notice', 'announce', 'broadcast', 'news'] },
        { id: 'pay', label: 'Payroll & Compensation', desc: 'View salary slips', url: '/dashboard/employee?view=pay', keywords: ['pay', 'salary', 'slip', 'wage'] },
        { id: 'reports', label: 'Performance & Reports', desc: 'View your KPIs', url: '/dashboard/employee?view=reports', keywords: ['report', 'performance', 'kpi'] },
        { id: 'profile', label: 'My Profile', desc: 'Account settings', url: '/dashboard/employee?view=profile', keywords: ['profile', 'setting', 'account'] },
      ];
    } else if (activeRole === 'COO') {
      modules = [
        { id: 'vehicles', label: 'Fleet & Vehicles', desc: 'Manage EV assets', url: '/dashboard/coo/vehicles', keywords: ['vehicle', 'fleet', 'bike', 'scooter'] },
        { id: 'workforce', label: 'Workforce Hub', desc: 'Manage employees', url: '/dashboard/coo/workforce', keywords: ['workforce', 'staff', 'employee', 'team'] },
        { id: 'operations', label: 'Operations & Dispatch', desc: 'Live operations center', url: '/dashboard/coo/operations', keywords: ['operat', 'dispatch', 'live', 'map'] },
      ];
    }
    modules
      .filter(m => m.label.toLowerCase().includes(query) || m.keywords.some(k => query.includes(k) || k.includes(query)))
      .forEach(m => results.push({ type: 'module', id: m.id, label: m.label, desc: m.desc, url: m.url }));

    // --- Section 2: Individual Tasks (from localStorage) ---
    if (activeRole === 'EMPLOYEE' && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('icc_employee_searchable_tasks');
        if (raw) {
          const tasks: TaskResult[] = JSON.parse(raw).map((t: any) => ({ type: 'task' as const, ...t }));
          tasks
            .filter(t =>
              t.title.toLowerCase().includes(query) ||
              t.id.toLowerCase().includes(query) ||
              (t.tag && t.tag.toLowerCase().includes(query)) ||
              (t.assignedBy && t.assignedBy.toLowerCase().includes(query))
            )
            .slice(0, 4)
            .forEach(t => results.push(t));
        }
      } catch { /* ignore parse errors */ }
    }

    return results;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const results = getSearchResults();
    const first = results[0];
    if (first) {
      if (first.type === 'module') router.push(first.url);
      else router.push('/dashboard/employee?view=tasks');
      setSearchQuery('');
      setIsSearchFocused(false);
    } else {
      alert(`No results found for: "${searchQuery}"`);
      setSearchQuery('');
    }
  };

  const searchResults = getSearchResults();
  const moduleResults = searchResults.filter(r => r.type === 'module') as ModuleResult[];
  const taskResults = searchResults.filter(r => r.type === 'task') as TaskResult[];

  const roleLabels: Record<RoleType, { title: string; badgeColor: string }> = {
    CEO: { title: 'CEO Dashboard (Super Admin)', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
    COO: { title: 'COO Dashboard (Operations)', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300' },
    CTO: { title: 'CTO Dashboard (Technology)', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
    SERVICE_MANAGER: { title: 'Service Manager Dashboard', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    HR: { title: 'HR Dashboard (Human Resources)', badgeColor: 'bg-pink-100 text-pink-900 border-pink-300' },
    TECHNICIAN: { title: 'Technician Portal', badgeColor: 'bg-teal-100 text-teal-900 border-teal-300' },
    EMPLOYEE: { title: 'Employee Portal (Staff Workspace)', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  };

  const displayProfile = (currentProfile && currentProfile.role === effectiveRole)
    ? currentProfile
    : (initialProfiles[effectiveRole] || currentProfile || initialProfiles.CEO);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs font-sans">
      {/* Left Branding & Role Indicator */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-1.5 group">
          <img src="/logo.jpeg" alt="InnoVibe Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-gotham font-black text-lg tracking-tight text-slate-900 leading-none">INNOVIBE</span>
              <span className="font-apfel text-[10px] px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] font-extrabold border border-[#fde68a]">
                ICC v1.0
              </span>
            </div>
            <p className="font-montserrat text-[11px] text-slate-400 font-semibold tracking-tight mt-0.5">Mobility Command Center</p>
          </div>
        </Link>

        <div className="h-5 w-px bg-slate-200 mx-1 hidden md:block" />

        {/* Active Designation Badge */}
        <div className="hidden lg:flex items-center gap-2">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-lg border ${roleLabels[effectiveRole]?.badgeColor || roleLabels.CEO.badgeColor} flex items-center gap-1.5 shadow-xs`}>
            <Sparkles className="h-3.5 w-3.5" />
            {roleLabels[effectiveRole]?.title || roleLabels.CEO.title}
          </span>
          {effectiveRole === 'CEO' && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Activity className="h-3 w-3 text-emerald-600 animate-pulse" /> Live Tracking Active
            </span>
          )}
        </div>
      </div>

      {/* Center Search Bar with Dropdown */}
      {/* Center Search Bar with Dropdown */}
      <div className="relative hidden md:block z-[60]">
        <form 
          onSubmit={handleSearchSubmit}
          className={`flex items-center gap-2 bg-slate-100 border focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 px-3.5 py-1.5 w-80 transition-all duration-300 relative z-10 ${
            isSearchFocused && searchResults.length > 0 && searchQuery.trim() 
              ? 'border-indigo-400 rounded-t-xl rounded-b-none' 
              : 'border-slate-200 rounded-xl'
          }`}
        >
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Search tickets, vehicles, telematics, staff..."
            className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none border-none focus:ring-0 focus:outline-none w-full font-medium p-0"
          />
        </form>

        {/* Dropdown Results */}
        {isSearchFocused && searchQuery.trim() && (
          <>
            <div className="fixed inset-0 bg-slate-900/10 -z-10" />
            <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-indigo-400 rounded-b-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-1 duration-150 max-h-[420px] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div>
                  {/* Module Results */}
                  {moduleResults.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100 flex items-center gap-1.5">
                        <LayoutGrid className="w-3 h-3" /> Sections
                      </div>
                      {moduleResults.map(res => (
                        <div
                          key={res.id}
                          onClick={() => { router.push(res.url); setSearchQuery(''); setIsSearchFocused(false); }}
                          className="px-3 py-2.5 hover:bg-indigo-50/60 cursor-pointer flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                        >
                          <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                            <Search className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 truncate">{res.label}</h4>
                            <p className="text-[10px] text-slate-500 truncate">{res.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Individual Task Results */}
                  {taskResults.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-t border-slate-100 flex items-center gap-1.5">
                        <CheckSquare className="w-3 h-3" /> Tasks
                      </div>
                      {taskResults.map(task => (
                        <div
                          key={task.id}
                          onClick={() => { router.push('/dashboard/employee?view=tasks'); setSearchQuery(''); setIsSearchFocused(false); }}
                          className="px-3 py-2.5 hover:bg-indigo-50/60 cursor-pointer flex items-start gap-3 transition-colors border-b border-slate-50 last:border-0"
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${task.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                            <CheckSquare className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                              <span className="font-mono text-[10px] font-black text-slate-400">{task.id}</span>
                              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${priorityColors[task.priority] || 'bg-slate-100 text-slate-600'}`}>
                                {task.priority}
                              </span>
                              {task.completed && <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">DONE</span>}
                            </div>
                            <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-1">{task.title}</h4>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <p className="text-[10px] text-slate-500">{task.deadline} · By {task.assignedBy}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
                  <Search className="w-5 h-5 text-slate-300" />
                  <p>No results found for <strong className="text-slate-700">&quot;{searchQuery}&quot;</strong></p>
                  <p className="text-[10px] text-slate-400">Try searching for a task name, section, or keyword</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right User & Logout Controls */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Live IST Clock */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl" title="Indian Standard Time (UTC+5:30)">
          <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
          <span className="font-mono text-xs font-bold text-slate-700 tabular-nums">{istTime}</span>
          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-md">IST</span>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className={`relative p-2 rounded-xl transition-all cursor-pointer ${isNotificationsOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'}`}
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {roleNotifications.some((n) => n.unread) && (
            <>
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-1 ring-white"></span>
            </>
          )}
        </button>

        {/* Notification Sidebar (right-to-left slide) */}
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsNotificationsOpen(false)}
            className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isNotificationsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          />

          {/* Sidebar Panel */}
          <aside
            className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[100] flex flex-col transition-transform duration-300 ease-in-out ${isNotificationsOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Sidebar Header — clean white design */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <Bell className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900">Notifications</h2>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {roleNotifications.filter(n => n.unread).length} unread · {roleNotifications.length} total
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    markAllTicketNotificationsAsRead(activeRole);
                    setRoleNotifications(prev => prev.map(n => ({ ...n, unread: false })));
                  }}
                  className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-all"
                >
                  Mark all read
                </button>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  title="Close"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {roleNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Bell className="w-7 h-7 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500">All caught up!</p>
                    <p className="text-xs text-slate-400 mt-1">No notifications for {roleLabels[activeRole]?.title || activeRole}</p>
                  </div>
                </div>
              ) : (
                roleNotifications.map((notif, idx) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markTicketNotificationAsRead(notif.id);
                      setRoleNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                    }}
                    style={{
                      transitionDelay: notifVisible ? `${idx * 60}ms` : '0ms',
                      transform: notifVisible ? 'translateY(0)' : 'translateY(16px)',
                      opacity: notifVisible ? 1 : 0,
                      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
                    }}
                    className={`p-4 cursor-pointer flex flex-col gap-2 group hover:bg-slate-50 border-b border-slate-100 last:border-0 ${
                      notif.unread ? notif.colorScheme.bg : 'bg-white'
                    }`}
                  >
                    {/* Row 1: Priority badge + Ticket ID + Time */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 ${notif.colorScheme.badgeBg} ${notif.colorScheme.badgeText}`}>
                          {notif.priority}
                        </span>
                        <span className="font-mono text-xs font-black text-slate-900 truncate">{notif.ticketId}</span>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">• {notif.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {notif.unread && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></span>
                        )}
                        <span className="text-[9px] text-slate-400 font-medium">{notif.timeAgo}</span>
                      </div>
                    </div>

                    {/* Row 2: Subject */}
                    <p className="text-sm font-bold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors">{notif.subject}</p>

                    {/* Row 3: Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{notif.description}</p>

                    {/* Row 4: Submitted by */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>
                        By: <strong className="text-slate-600 font-semibold">{notif.submittedBy}</strong>
                      </span>
                      {notif.unread && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">NEW</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar Footer */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 shrink-0 flex flex-col gap-1.5">
              <p className="text-[10px] text-slate-400 font-medium text-center">
                Notified to: <strong className="text-slate-600">Admin</strong>, <strong className="text-slate-600">COO</strong>, <strong className="text-slate-600">CTO</strong> & <strong className="text-slate-600">Stakeholders</strong>
              </p>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span className="text-[9px] font-bold text-slate-400">All timestamps in</span>
                <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">🇮🇳 IST (UTC+5:30)</span>
              </div>
            </div>
          </aside>
        </>

        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-3 pl-1" suppressHydrationWarning>
          <img
            src={displayProfile.avatar}
            alt={displayProfile.name}
            className="h-9 w-9 rounded-full object-cover border-2 border-sky-500 shadow-xs"
            suppressHydrationWarning
          />
          <div className="hidden sm:block text-left" suppressHydrationWarning>
            <p className="text-xs font-bold text-slate-900 leading-none" suppressHydrationWarning>{displayProfile.name}</p>
            <p className="text-[10px] text-sky-700 font-medium mt-0.5" suppressHydrationWarning>{displayProfile.title}</p>
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
