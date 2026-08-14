'use client';

import React, { useState, useEffect } from 'react';
import { NotificationRecord, NotificationRepository, NotificationType } from '../../../../lib/notification-repository';
import { Bell, Check, CheckCircle2, ClipboardList, Info, MessageSquare, Megaphone } from 'lucide-react';

interface TmsEmployeeNotificationsViewProps {
  onTabNavigate?: (tab: string) => void;
}

export function TmsEmployeeNotificationsView({ onTabNavigate }: TmsEmployeeNotificationsViewProps) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);

  const loadNotifications = () => {
    const list = NotificationRepository.getNotifications('EMP-102');
    setNotifications(list);
  };

  useEffect(() => {
    loadNotifications();

    const handleUpdate = () => {
      loadNotifications();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('ICC_TMS_NOTIFICATIONS_CHANGED', handleUpdate);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('ICC_TMS_NOTIFICATIONS_CHANGED', handleUpdate);
      }
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    NotificationRepository.markAllAsRead('EMP-102');
    loadNotifications();
  };

  const handleNotificationClick = (notif: NotificationRecord) => {
    if (!notif.isRead) {
      NotificationRepository.markAsRead(notif.id);
      loadNotifications();
    }
    if (notif.linkTab && onTabNavigate) {
      onTabNavigate(notif.linkTab);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'TASK_ACCEPTED':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <CheckCircle2 className="w-5 h-5 text-blue-600 stroke-[2.5]" />
          </div>
        );
      case 'TASK_ASSIGNED':
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200">
            <ClipboardList className="w-4 h-4 text-slate-500" />
          </div>
        );
      case 'LEAVE_APPROVED':
      case 'LEAVE_SUBMITTED':
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200">
            <Info className="w-4 h-4 text-slate-500" />
          </div>
        );
      case 'COMMENT_ADDED':
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200">
            <MessageSquare className="w-4 h-4 text-slate-500" />
          </div>
        );
      case 'ANNOUNCEMENT':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Megaphone className="w-4 h-4 text-blue-600" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 text-left font-sans animate-in fade-in duration-300">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Bell className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              Notifications
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              You have {unreadCount} unread message{unreadCount === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200/90 shadow-2xs hover:border-slate-300 transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Check className="w-4 h-4 text-slate-600" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="p-12 text-center text-slate-400 font-bold text-xs space-y-2">
          <Bell className="w-8 h-8 text-slate-300 mx-auto" />
          <p>No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                !n.isRead
                  ? 'bg-blue-50/30 border-blue-200/80 shadow-2xs hover:bg-blue-50/60'
                  : 'bg-white border-slate-100 hover:bg-slate-50/60'
              }`}
            >
              {/* Left: Icon & Details */}
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {getNotificationIcon(n.type)}

                <div className="min-w-0 space-y-1">
                  <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {n.messagePreview}
                  </p>
                </div>
              </div>

              {/* Right: Timestamp & Unread Dot */}
              <div className="flex items-center gap-2 shrink-0 self-start pt-0.5">
                <span className="text-xs font-semibold text-slate-400">
                  {n.timeAgo}
                </span>

                {!n.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 ml-2 inline-block" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
