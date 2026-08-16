/**
 * Task Management System (TMS) - Announcement Engine Models & TypeScript Interfaces
 * Centralized schema definitions for corporate broadcasts, voice notes, target audiences, and attachments.
 */

export type AnnouncementPriority = 'NORMAL' | 'IMPORTANT' | 'CRITICAL';

export type AnnouncementStatus = 'ACTIVE' | 'PINNED' | 'EXPIRED' | 'DRAFT';

export type TargetAudience =
  | 'EVERYONE'
  | 'ALL_EMPLOYEES'
  | 'ALL_DEPARTMENT_HEADS'
  | 'SPECIFIC_DEPARTMENT'
  | 'SPECIFIC_EMPLOYEE';

export interface AnnouncementAttachment {
  id: string;
  filename: string;
  size: string;
  mimeType: string;
  dataUrl?: string;
}

export interface AnnouncementVoice {
  id: string;
  durationSeconds: number;
  audioDataUrl: string;
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  message: string;
  fromBadge?: string; // e.g. "Admin", "Information Technology Intern"
  postedBy?: string;  // e.g. "Sri Hari Kolusu", "Srinivas Thalada (Information Technology Intern Head)"
  timeAgo?: string;   // e.g. "about 2 months ago", "2 months ago", "3 months ago"
  senderId: string;
  senderName: string;
  senderRole: string;
  senderDepartment: string;
  targetAudience: TargetAudience;
  targetDepartmentId?: string;
  targetDepartmentName?: string;
  targetEmployeeId?: string;
  targetEmployeeName?: string;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  isPinned: boolean;
  expiryDate?: string;
  notifyImmediately: boolean;
  attachments: AnnouncementAttachment[];
  voiceRecord?: AnnouncementVoice;
  readCount: number;
  totalRecipients: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementPayload {
  title: string;
  message: string;
  fromBadge?: string;
  postedBy?: string;
  timeAgo?: string;
  senderId?: string;
  senderName?: string;
  senderRole?: string;
  senderDepartment?: string;
  targetAudience: TargetAudience;
  targetDepartmentId?: string;
  targetDepartmentName?: string;
  targetEmployeeId?: string;
  targetEmployeeName?: string;
  priority: AnnouncementPriority;
  expiryDate?: string;
  isPinned?: boolean;
  notifyImmediately?: boolean;
  attachments?: AnnouncementAttachment[];
  voiceRecord?: AnnouncementVoice;
}

export interface AnnouncementFilterParams {
  searchQuery?: string;
  priority?: AnnouncementPriority | 'ALL';
  audience?: TargetAudience | 'ALL';
  isPinned?: boolean;
  status?: AnnouncementStatus | 'ALL';
}

export interface AnnouncementStatistics {
  totalAnnouncements: number;
  announcementsToday: number;
  pinnedAnnouncements: number;
  criticalAlerts: number;
}
