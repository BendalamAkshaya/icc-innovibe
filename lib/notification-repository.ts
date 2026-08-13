/**
 * Task Management System (TMS) - Notification Repository
 * Manages notification dispatching and browser localStorage persistence for broadcast alerts.
 */

import { AnnouncementRecord } from './announcement-models';

const STORAGE_KEY = 'ICC_TMS_NOTIFICATIONS_PERSISTENCE_V1';

export interface NotificationRecord {
  id: string;
  announcementId?: string;
  employeeId: string;
  employeeName: string;
  title: string;
  messagePreview: string;
  isRead: boolean;
  priority: string;
  createdAt: string;
}

export class NotificationRepository {
  private static loadFromStorage(): NotificationRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '') return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to read notifications from localStorage:', e);
      return [];
    }
  }

  private static saveToStorage(data: NotificationRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save notifications to localStorage:', e);
    }
  }

  static getNotifications(): NotificationRecord[] {
    return this.loadFromStorage();
  }

  static dispatchNotificationsForAnnouncement(announcement: AnnouncementRecord): void {
    const list = this.loadFromStorage();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newNotification: NotificationRecord = {
      id: `NOTIF-${Math.floor(1000 + Math.random() * 9000)}`,
      announcementId: announcement.id,
      employeeId: announcement.targetEmployeeId || 'ALL',
      employeeName: announcement.targetEmployeeName || 'All Personnel',
      title: announcement.title,
      messagePreview: announcement.message.slice(0, 100),
      isRead: false,
      priority: announcement.priority,
      createdAt: currentDate,
    };

    list.unshift(newNotification);
    this.saveToStorage(list);
  }
}
