/**
 * Task Management System (TMS) - Announcement Repository & Browser Storage Persistence Layer
 * Implements local storage persistence for corporate announcements, attachments, and voice notes.
 */

import {
  AnnouncementRecord,
  CreateAnnouncementPayload,
  AnnouncementFilterParams,
  AnnouncementStatistics,
} from './announcement-models';
import { NotificationRepository } from './notification-repository';

const STORAGE_KEY = 'ICC_TMS_ANNOUNCEMENTS_PERSISTENCE_V1';

const seedAnnouncements: AnnouncementRecord[] = [
  {
    id: 'ANN-101',
    title: 'Quarterly Strategic All-Hands Meeting & EV Mobility Roadmap Release',
    message: 'All executive heads, department managers, and engineering teams are invited to join the Q3 Strategic All-Hands meeting. We will unveil the 2026-2027 EV fleet expansion roadmap and announce key promotions.',
    senderId: 'EMP-101',
    senderName: 'Sri Hari Kolusu',
    senderRole: 'Founder & CEO (Admin)',
    senderDepartment: 'Executive Office',
    targetAudience: 'EVERYONE',
    priority: 'CRITICAL',
    status: 'PINNED',
    isPinned: true,
    notifyImmediately: true,
    attachments: [
      { id: 'ATT-1', filename: 'Q3_EV_Mobility_Roadmap.pdf', size: '2.4 MB', mimeType: 'application/pdf' },
    ],
    readCount: 124,
    totalRecipients: 148,
    createdAt: 'Aug 06, 2026',
    updatedAt: 'Aug 06, 2026',
  },
  {
    id: 'ANN-102',
    title: 'Updated Biometric Check-in Cutoff & Overtime Calculation Guidelines',
    message: 'Effective Aug 10, 2026, standard biometric check-in cutoff is strictly enforced at 09:15 AM across all hub offices. Please review the updated employee policy guidelines attached below.',
    senderId: 'EMP-102',
    senderName: 'Ananya Sharma',
    senderRole: 'HR Director',
    senderDepartment: 'Human Resources',
    targetAudience: 'ALL_EMPLOYEES',
    priority: 'IMPORTANT',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: true,
    attachments: [
      { id: 'ATT-2', filename: 'Biometric_Cutoff_Guidelines_2026.pdf', size: '1.1 MB', mimeType: 'application/pdf' },
    ],
    readCount: 98,
    totalRecipients: 139,
    createdAt: 'Aug 05, 2026',
    updatedAt: 'Aug 05, 2026',
  },
  {
    id: 'ANN-103',
    title: 'IoT Telematics MQTT Cluster Infrastructure Maintenance Window Notice',
    message: 'The IoT engineering infrastructure team will perform scheduled database cluster upgrades on Sunday from 02:00 AM to 04:00 AM. Telematics ping latency may momentarily surge during this window.',
    senderId: 'EMP-105',
    senderName: 'Srinivas Rao',
    senderRole: 'Tech & Systems Architect',
    senderDepartment: 'Internet of Things',
    targetAudience: 'SPECIFIC_DEPARTMENT',
    targetDepartmentId: 'DEP-104',
    targetDepartmentName: 'Internet of Things',
    priority: 'NORMAL',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: false,
    attachments: [],
    readCount: 14,
    totalRecipients: 14,
    createdAt: 'Aug 04, 2026',
    updatedAt: 'Aug 04, 2026',
  },
];

export class AnnouncementRepository {
  private static loadFromStorage(): AnnouncementRecord[] {
    if (typeof window === 'undefined') return seedAnnouncements;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '' || raw === 'undefined' || raw === 'null') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAnnouncements));
        return seedAnnouncements;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAnnouncements));
        return seedAnnouncements;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read announcements from localStorage, re-seeding:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAnnouncements));
      } catch (err) {}
      return seedAnnouncements;
    }
  }

  private static saveToStorage(data: AnnouncementRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save announcements to localStorage:', e);
    }
  }

  static getAnnouncements(filters?: AnnouncementFilterParams): AnnouncementRecord[] {
    let list = this.loadFromStorage();

    if (!filters) return list;

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.message.toLowerCase().includes(q) ||
          a.senderName.toLowerCase().includes(q) ||
          a.senderDepartment.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
      );
    }

    if (filters.priority && filters.priority !== 'ALL') {
      list = list.filter((a) => a.priority === filters.priority);
    }

    if (filters.audience && filters.audience !== 'ALL') {
      list = list.filter((a) => a.targetAudience === filters.audience);
    }

    if (filters.isPinned !== undefined) {
      list = list.filter((a) => a.isPinned === filters.isPinned);
    }

    return list;
  }

  static getAnnouncementById(id: string): AnnouncementRecord | null {
    const list = this.loadFromStorage();
    return list.find((a) => a.id === id) || null;
  }

  static createAnnouncement(payload: CreateAnnouncementPayload): AnnouncementRecord {
    const list = this.loadFromStorage();
    const generatedId = `ANN-${Math.floor(100 + Math.random() * 900)}`;
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newRecord: AnnouncementRecord = {
      id: generatedId,
      title: payload.title,
      message: payload.message,
      senderId: payload.senderId || 'EMP-101',
      senderName: payload.senderName || 'Sri Hari Kolusu',
      senderRole: payload.senderRole || 'Founder & CEO (Admin)',
      senderDepartment: payload.senderDepartment || 'Executive Office',
      targetAudience: payload.targetAudience,
      targetDepartmentId: payload.targetDepartmentId,
      targetDepartmentName: payload.targetDepartmentName,
      targetEmployeeId: payload.targetEmployeeId,
      targetEmployeeName: payload.targetEmployeeName,
      priority: payload.priority,
      status: payload.isPinned ? 'PINNED' : 'ACTIVE',
      isPinned: !!payload.isPinned,
      expiryDate: payload.expiryDate,
      notifyImmediately: !!payload.notifyImmediately,
      attachments: payload.attachments || [],
      voiceRecord: payload.voiceRecord,
      readCount: 0,
      totalRecipients: 148,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    list.unshift(newRecord);
    this.saveToStorage(list);

    if (newRecord.notifyImmediately) {
      NotificationRepository.dispatchNotificationsForAnnouncement(newRecord);
    }

    return newRecord;
  }

  static updateAnnouncement(id: string, patch: Partial<CreateAnnouncementPayload>): AnnouncementRecord | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const updated: AnnouncementRecord = {
      ...list[idx],
      ...patch,
      updatedAt: currentDate,
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static deleteAnnouncement(id: string): boolean {
    const list = this.loadFromStorage();
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length === list.length) return false;

    this.saveToStorage(filtered);
    return true;
  }

  static togglePin(id: string): AnnouncementRecord | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    const currentPin = list[idx].isPinned;
    list[idx].isPinned = !currentPin;
    list[idx].status = !currentPin ? 'PINNED' : 'ACTIVE';

    this.saveToStorage(list);
    return list[idx];
  }

  static getStatistics(): AnnouncementStatistics {
    const list = this.loadFromStorage();
    return {
      totalAnnouncements: list.length,
      announcementsToday: list.filter((a) => a.createdAt.includes('Aug 06')).length || 1,
      pinnedAnnouncements: list.filter((a) => a.isPinned).length,
      criticalAlerts: list.filter((a) => a.priority === 'CRITICAL').length,
    };
  }
}
