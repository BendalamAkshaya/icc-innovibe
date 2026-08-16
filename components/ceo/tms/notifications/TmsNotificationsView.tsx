'use client';

import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
  CalendarCheck,
  CheckSquare,
  Clock,
  Trash2,
  Check,
  ShieldAlert,
  Search,
  Filter,
} from 'lucide-react';

interface MockNotification {
  id: string;
  title: string;
  sender: string;
  senderRole: string;
  avatar: string;
  messagePreview: string;
  category: 'ANNOUNCEMENT' | 'LEAVE' | 'TASK' | 'SYSTEM' | 'POLICY';
  priority: 'CRITICAL' | 'IMPORTANT' | 'NORMAL';
  timestamp: string;
  isRead: boolean;
}

const initialNotifications: MockNotification[] = [
  {
    id: 'NTF-101',
    title: 'Quarterly Strategic All-Hands Meeting & EV Mobility Roadmap',
    sender: 'Sri Hari Kolusu',
    senderRole: 'Founder & CEO (Admin)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    messagePreview: 'All executive heads and department managers are invited to join the Q3 Strategic All-Hands meeting.',
    category: 'ANNOUNCEMENT',
    priority: 'CRITICAL',
    timestamp: '10 mins ago',
    isRead: false,
  },
  {
    id: 'NTF-102',
    title: 'New Leave Request Application: Vikram Mehta (3 Days Casual Leave)',
    sender: 'Vikram Mehta',
    senderRole: 'Talent Acquisition Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    messagePreview: 'Applied for 3 days casual leave from Aug 10 to Aug 12, 2026 for family travel obligations.',
    category: 'LEAVE',
    priority: 'IMPORTANT',
    timestamp: '45 mins ago',
    isRead: false,
  },
  {
    id: 'NTF-103',
    title: 'Updated Biometric Check-in Cutoff Enforced at 09:15 AM',
    sender: 'Ananya Sharma',
    senderRole: 'HR Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    messagePreview: 'Standard biometric check-in cutoff is strictly enforced across all hub offices starting Aug 10.',
    category: 'POLICY',
    priority: 'IMPORTANT',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: 'NTF-104',
    title: 'Task Deliverable Completed: PostgreSQL Database Index Optimization',
    sender: 'Srinivas Rao',
    senderRole: 'Tech & Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    messagePreview: 'Deployed MQTT broker clustering for 100k vehicle pings and optimized PostgreSQL latency by 45%.',
    category: 'TASK',
    priority: 'NORMAL',
    timestamp: '4 hours ago',
    isRead: true,
  },
  {
    id: 'NTF-105',
    title: 'Daily Work Session Auto Closed: Rahul Verma',
    sender: 'TMS System Gatekeeper',
    senderRole: 'Automated Bot',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    messagePreview: 'Work session for Rahul Verma closed automatically due to browser exit without formal checkout.',
    category: 'SYSTEM',
    priority: 'NORMAL',
    timestamp: '6 hours ago',
    isRead: true,
  },
  {
    id: 'NTF-106',
    title: 'New Department Created: Information Technology Intern Unit',
    sender: 'Priya Verma',
    senderRole: 'People Operations Specialist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    messagePreview: 'Created new organizational department entity DEP-105 for summer tech interns.',
    category: 'SYSTEM',
    priority: 'NORMAL',
    timestamp: 'Yesterday',
    isRead: true,
  },
];

import { NotificationRepository } from '../../../../lib/notification-repository';

export function TmsNotificationsView() {
  const [notifications, setNotifications] = useState<MockNotification[]>(initialNotifications);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const loadLiveNotifications = () => {
    const liveRecords = NotificationRepository.getNotifications();
    const mapped: MockNotification[] = liveRecords.map((r) => ({
      id: r.id,
      title: r.title,
      sender: r.employeeName,
      senderRole: 'Team Member',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      messagePreview: r.messagePreview,
      category: r.type === 'LEAVE_SUBMITTED' || r.type === 'LEAVE_APPROVED' ? 'LEAVE' : r.type === 'ANNOUNCEMENT' ? 'ANNOUNCEMENT' : 'TASK',
      priority: r.priority === 'IMPORTANT' ? 'IMPORTANT' : 'NORMAL',
      timestamp: r.timeAgo,
      isRead: r.isRead,
    }));
    setNotifications([...mapped, ...initialNotifications]);
  };

  React.useEffect(() => {
    loadLiveNotifications();
    const unsubscribe = NotificationRepository.onNotificationsChanged(() => {
      loadLiveNotifications();
    });
    return () => unsubscribe();
  }, []);

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const filtered = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.messagePreview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === 'ALL'
        ? true
        : filterCategory === 'UNREAD'
        ? !n.isRead
        : n.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'IMPORTANT':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ANNOUNCEMENT':
        return <Megaphone className="h-4 w-4 text-[#d97706]" />;
      case 'LEAVE':
        return <CalendarCheck className="h-4 w-4 text-emerald-600" />;
      case 'TASK':
        return <CheckSquare className="h-4 w-4 text-sky-600" />;
      default:
        return <Bell className="h-4 w-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Bell className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Notifications & System Alerts
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Real-time Activity Dispatch
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Real-time activity alerts, leave approval requests, broadcast notifications, and system logs.
          </p>
        </div>

        <div className="flex items-center gap-3 font-apfel text-xs">
          <span className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold">
            {unreadCount} Unread Alerts
          </span>

          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Check className="h-4 w-4 text-amber-400" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Category Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 w-full lg:w-96 shadow-2xs">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications, senders, or titles..."
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 font-apfel text-xs">
            {[
              { id: 'ALL', label: 'All Alerts' },
              { id: 'UNREAD', label: `Unread (${unreadCount})` },
              { id: 'ANNOUNCEMENT', label: 'Announcements' },
              { id: 'LEAVE', label: 'Leave Approvals' },
              { id: 'TASK', label: 'Task Updates' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  filterCategory === cat.id
                    ? 'bg-[#d97706] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Notifications List */}
        <div className="space-y-3 pt-2">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-sans text-xs">
              No notifications match active filters.
            </div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                className={`p-4.5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  !n.isRead
                    ? 'bg-amber-500/5 border-amber-200/90 shadow-2xs'
                    : 'bg-white border-slate-100 opacity-80'
                }`}
              >
                {/* Left: Avatar & Details */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={n.avatar}
                    alt={n.sender}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(n.sender)}&background=fef3c7&color=92400e`;
                    }}
                    className="h-10 w-10 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        {getCategoryIcon(n.category)}
                        <h3 className="font-gotham text-xs font-bold text-slate-900">
                          {n.title}
                        </h3>
                      </div>
                      <span className={`px-2 py-0.2 rounded-full text-[9px] font-extrabold border font-apfel ${getPriorityStyle(n.priority)}`}>
                        {n.priority}
                      </span>
                      {!n.isRead && (
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" title="Unread Alert" />
                      )}
                    </div>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                      {n.messagePreview}
                    </p>
                    <span className="font-apfel text-[10px] text-slate-400 block">
                      From <strong className="text-slate-700">{n.sender}</strong> ({n.senderRole}) • {n.timestamp}
                    </span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 font-apfel text-xs shrink-0">
                  <button
                    onClick={() => toggleReadStatus(n.id)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors"
                  >
                    {n.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  </button>

                  <button
                    onClick={() => deleteNotification(n.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Dismiss Notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
