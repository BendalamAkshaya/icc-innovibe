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

const STORAGE_KEY = 'ICC_TMS_ANNOUNCEMENTS_PERSISTENCE_V3';

const seedAnnouncements: AnnouncementRecord[] = [
  {
    id: 'ANN-201',
    title: 'Collaboration with EV Dealers, EV OEMs & EV Fleet in Vizag',
    message: 'All Marketing team, morning focus on collaboration meetings and evening beach road Activity to generate genuine leads and capture testimonial videos.\n\nFix the meeting, I will join all collaborations.',
    fromBadge: 'Admin',
    postedBy: 'Sri Hari Kolusu',
    timeAgo: 'about 2 months ago',
    senderId: 'EMP-101',
    senderName: 'Sri Hari Kolusu',
    senderRole: 'Founder & CEO (Admin)',
    senderDepartment: 'Executive Office',
    targetAudience: 'EVERYONE',
    priority: 'IMPORTANT',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: true,
    attachments: [],
    readCount: 142,
    totalRecipients: 150,
    createdAt: 'Jun 10, 2026',
    updatedAt: 'Jun 10, 2026',
  },
  {
    id: 'ANN-202',
    title: 'Marketing Activity at Beach Road',
    message: 'All marketing interns must work for 2 hours on the beach road to collect genuine EV Customers Data.\n\nAman, Punyaveer, and Nishant will explain the Execution strategy.',
    fromBadge: 'Admin',
    postedBy: 'Sri Hari Kolusu',
    timeAgo: 'about 2 months ago',
    senderId: 'EMP-101',
    senderName: 'Sri Hari Kolusu',
    senderRole: 'Founder & CEO (Admin)',
    senderDepartment: 'Executive Office',
    targetAudience: 'EVERYONE',
    priority: 'IMPORTANT',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: true,
    attachments: [],
    readCount: 120,
    totalRecipients: 150,
    createdAt: 'Jun 12, 2026',
    updatedAt: 'Jun 12, 2026',
  },
  {
    id: 'ANN-203',
    title: 'Update your Profile to 100%',
    message: 'upload your photo and fill all the details.',
    fromBadge: 'Admin',
    postedBy: 'Sri Hari Kolusu',
    timeAgo: 'about 2 months ago',
    senderId: 'EMP-101',
    senderName: 'Sri Hari Kolusu',
    senderRole: 'Founder & CEO (Admin)',
    senderDepartment: 'Executive Office',
    targetAudience: 'EVERYONE',
    priority: 'NORMAL',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: false,
    attachments: [],
    readCount: 95,
    totalRecipients: 150,
    createdAt: 'Jun 15, 2026',
    updatedAt: 'Jun 15, 2026',
  },
  {
    id: 'ANN-204',
    title: 'dept meeting moved to 3pm',
    message: 'fceffsd',
    fromBadge: 'Information Technology Intern',
    postedBy: 'Srinivas Thalada (Information Technology Intern Head)',
    timeAgo: '2 months ago',
    senderId: 'EMP-100',
    senderName: 'Srinivas Thalada',
    senderRole: 'Information Technology Intern Head',
    senderDepartment: 'Technology',
    targetAudience: 'SPECIFIC_DEPARTMENT',
    priority: 'NORMAL',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: false,
    attachments: [],
    readCount: 42,
    totalRecipients: 45,
    createdAt: 'Jun 18, 2026',
    updatedAt: 'Jun 18, 2026',
  },
  {
    id: 'ANN-205',
    title: 'Test 1',
    message: 'This is varun and i am testing the announcements',
    fromBadge: 'Admin',
    postedBy: 'Admin User',
    timeAgo: '3 months ago',
    senderId: 'EMP-101',
    senderName: 'Admin User',
    senderRole: 'Admin',
    senderDepartment: 'Administration',
    targetAudience: 'EVERYONE',
    priority: 'NORMAL',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: false,
    voiceRecord: {
      id: 'VOICE-1',
      durationSeconds: 15,
      audioDataUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    attachments: [
      {
        id: 'ATT-201',
        filename: 'Gemini_Generated_Image_9ggbzr9ggbzr...',
        size: '4.39 MB',
        mimeType: 'image/png',
        dataUrl: '#',
      },
    ],
    readCount: 88,
    totalRecipients: 150,
    createdAt: 'May 10, 2026',
    updatedAt: 'May 10, 2026',
  },
  {
    id: 'ANN-206',
    title: 'jgfvjg',
    message: 'chgfdc',
    fromBadge: 'Admin',
    postedBy: 'System Administrator',
    timeAgo: '3 months ago',
    senderId: 'EMP-101',
    senderName: 'System Administrator',
    senderRole: 'Admin',
    senderDepartment: 'Administration',
    targetAudience: 'EVERYONE',
    priority: 'NORMAL',
    status: 'ACTIVE',
    isPinned: false,
    notifyImmediately: false,
    attachments: [],
    readCount: 50,
    totalRecipients: 150,
    createdAt: 'May 08, 2026',
    updatedAt: 'May 08, 2026',
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
          (a.fromBadge && a.fromBadge.toLowerCase().includes(q)) ||
          (a.postedBy && a.postedBy.toLowerCase().includes(q)) ||
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
    const generatedId = `ANN-${Math.floor(207 + Math.random() * 800)}`;
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newRecord: AnnouncementRecord = {
      id: generatedId,
      title: payload.title,
      message: payload.message,
      fromBadge: payload.fromBadge || 'Admin',
      postedBy: payload.postedBy || payload.senderName || 'Sri Hari Kolusu',
      timeAgo: payload.timeAgo || 'Just now',
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
      totalRecipients: 150,
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
      announcementsToday: 1,
      pinnedAnnouncements: list.filter((a) => a.isPinned).length,
      criticalAlerts: list.filter((a) => a.priority === 'CRITICAL').length,
    };
  }
}
