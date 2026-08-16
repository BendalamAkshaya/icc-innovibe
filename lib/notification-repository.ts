/**
 * Task Management System (TMS) - Notification Repository & Real-time Persistence Layer
 * Manages notification dispatching, browser localStorage persistence, and real-time state listeners.
 */

import { AnnouncementRecord } from './announcement-models';

const STORAGE_KEY = 'ICC_TMS_NOTIFICATIONS_PERSISTENCE_V2';
const NOTIFICATION_EVENT = 'ICC_TMS_NOTIFICATIONS_CHANGED';

export type NotificationType =
  | 'TASK_ACCEPTED'
  | 'TASK_ASSIGNED'
  | 'LEAVE_APPROVED'
  | 'LEAVE_SUBMITTED'
  | 'COMMENT_ADDED'
  | 'ANNOUNCEMENT';

export interface NotificationRecord {
  id: string;
  announcementId?: string;
  employeeId: string;
  employeeName: string;
  title: string;
  messagePreview: string;
  type: NotificationType;
  isRead: boolean;
  priority: string;
  timeAgo: string;
  createdAt: string;
  linkTab?: string;
}

const seedNotifications: NotificationRecord[] = [
  {
    id: 'NOTIF-201',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    title: 'Task Accepted',
    messagePreview: 'Bhimavarapu Hemanth updated status on "ICC implementation from 0 level ": Task accepted by Bhimavarapu Hemanth.',
    type: 'TASK_ACCEPTED',
    isRead: false,
    priority: 'NORMAL',
    timeAgo: '4 days ago',
    createdAt: 'Aug 09, 2026',
    linkTab: 'tasks',
  },
  {
    id: 'NOTIF-202',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    title: 'Task Accepted',
    messagePreview: 'Geetha Sowmya Akula updated status on "ICC implementation from 0 level ": Task accepted by Geetha Sowmya Akula.',
    type: 'TASK_ACCEPTED',
    isRead: false,
    priority: 'NORMAL',
    timeAgo: '17 days ago',
    createdAt: 'Jul 27, 2026',
    linkTab: 'tasks',
  },
  {
    id: 'NOTIF-203',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    title: 'New Task Assigned',
    messagePreview: 'You have been added to Task: "ICC implementation from 0 level " by Srinivas Thalada (DEPARTMENT)',
    type: 'TASK_ASSIGNED',
    isRead: true,
    priority: 'IMPORTANT',
    timeAgo: '22 days ago',
    createdAt: 'Jul 22, 2026',
    linkTab: 'tasks',
  },
  {
    id: 'NOTIF-204',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    title: 'Leave Request Approved',
    messagePreview: 'Your leave request for CASUAL LEAVE starting on 2026-07-17 has been approved.',
    type: 'LEAVE_APPROVED',
    isRead: true,
    priority: 'IMPORTANT',
    timeAgo: '27 days ago',
    createdAt: 'Jul 17, 2026',
    linkTab: 'leave',
  },
  {
    id: 'NOTIF-205',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    title: 'Leave Request Submitted',
    messagePreview: 'Your leave request for CASUAL LEAVE starting on 2026-07-17 was submitted successfully.',
    type: 'LEAVE_SUBMITTED',
    isRead: true,
    priority: 'NORMAL',
    timeAgo: '28 days ago',
    createdAt: 'Jul 16, 2026',
    linkTab: 'leave',
  },
  {
    id: 'NOTIF-206',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    title: 'New Comment Added',
    messagePreview: 'Sri Hari Kolusu commented on "Tasks Dashboard": "Varun, this task is still pending"',
    type: 'COMMENT_ADDED',
    isRead: true,
    priority: 'NORMAL',
    timeAgo: 'about 1 month ago',
    createdAt: 'Jul 13, 2026',
    linkTab: 'tasks',
  },
];

export class NotificationRepository {
  private static notifyListeners(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(NOTIFICATION_EVENT));
    }
  }

  private static loadFromStorage(): NotificationRecord[] {
    if (typeof window === 'undefined') return seedNotifications;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '' || raw === 'undefined' || raw === 'null') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNotifications));
        return seedNotifications;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNotifications));
        return seedNotifications;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read notifications from localStorage, re-seeding:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNotifications));
      } catch (err) {}
      return seedNotifications;
    }
  }

  private static saveToStorage(data: NotificationRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.notifyListeners();
    } catch (e) {
      console.error('Failed to save notifications to localStorage:', e);
    }
  }

  static getNotifications(employeeId?: string): NotificationRecord[] {
    let list = this.loadFromStorage();
    if (employeeId) {
      list = list.filter((n) => n.employeeId === employeeId || n.employeeName.includes('Sri Varun'));
    }
    return list;
  }

  static getUnreadCount(employeeId?: string): number {
    const list = this.getNotifications(employeeId);
    return list.filter((n) => !n.isRead).length;
  }

  static markAsRead(id: string): void {
    const list = this.loadFromStorage();
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx].isRead = true;
      this.saveToStorage(list);
    }
  }

  static markAllAsRead(employeeId?: string): void {
    const list = this.loadFromStorage();
    const updated = list.map((n) => {
      if (!employeeId || n.employeeId === employeeId || n.employeeName.includes('Sri Varun')) {
        return { ...n, isRead: true };
      }
      return n;
    });
    this.saveToStorage(updated);
  }

  static addNotification(notif: Omit<NotificationRecord, 'id' | 'createdAt' | 'timeAgo' | 'isRead'>): NotificationRecord {
    const list = this.loadFromStorage();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const record: NotificationRecord = {
      id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      isRead: false,
      timeAgo: 'Just now',
      createdAt: currentDate,
      ...notif,
    };
    list.unshift(record);
    this.saveToStorage(list);
    return record;
  }

  static onNotificationsChanged(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    const handler = () => callback();
    window.addEventListener(NOTIFICATION_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(NOTIFICATION_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }

  static dispatchNotificationsForAnnouncement(announcement: AnnouncementRecord): void {
    const list = this.loadFromStorage();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    let targetEmpId = 'EMP-102';
    let targetEmpName = 'Sri Varun Tej Chavitina';

    if (announcement.targetAudience === 'SPECIFIC_EMPLOYEE' && announcement.targetEmployeeId) {
      targetEmpId = announcement.targetEmployeeId;
      targetEmpName = announcement.targetEmployeeName || 'Employee Recipient';
    }

    const newNotification: NotificationRecord = {
      id: `NOTIF-${Math.floor(207 + Math.random() * 800)}`,
      announcementId: announcement.id,
      employeeId: targetEmpId,
      employeeName: targetEmpName,
      title: `Announcement: ${announcement.title}`,
      messagePreview: announcement.message.slice(0, 120),
      type: 'ANNOUNCEMENT',
      isRead: false,
      priority: announcement.priority === 'CRITICAL' || announcement.priority === 'IMPORTANT' ? 'IMPORTANT' : 'NORMAL',
      timeAgo: 'Just now',
      createdAt: currentDate,
      linkTab: 'announcements',
    };

    list.unshift(newNotification);
    this.saveToStorage(list);
  }
}
