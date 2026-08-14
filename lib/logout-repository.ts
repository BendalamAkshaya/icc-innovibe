/**
 * Task Management System (TMS) - Logout Reports Repository & Browser Storage Persistence Layer
 * Implements local persistence using browser localStorage with work session seed data.
 */

import { WorkSession, SubmitWorkReportPayload, LogoutFilterParams, LogoutKpis } from './logout-models';

const STORAGE_KEY = 'ICC_TMS_LOGOUT_REPORTS_PERSISTENCE_V2';

const seedWorkSessions: WorkSession[] = [
  {
    id: 'SES-1001',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    loginTime: '10:39 pm',
    logoutTime: undefined,
    status: 'ACTIVE',
    duration: 'Active Shift',
    date: '13 Aug 2026',
    reportSubmitted: false,
    createdAt: '13 Aug 2026',
    updatedAt: '13 Aug 2026',
  },
  {
    id: 'SES-1002',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    loginTime: '10:03 am',
    logoutTime: '11:06 am',
    status: 'LOGGED_OUT',
    duration: '1.05 hrs',
    date: '23 Jul 2026',
    reportSubmitted: true,
    workReport: {
      workSummary: 'No report was sent due to forced logout.',
      tasksCompleted: ['None reported'],
      pendingTasks: ['None reported'],
      challengesBlockers: 'None reported',
      timeNotes: 'None reported',
      additionalNotes: 'System-generated report due to user closing browser without logging out.',
      submittedAt: '11:06 am',
      logoutMethod: 'FORCE_LOGOUT',
    },
    createdAt: '23 Jul 2026',
    updatedAt: '23 Jul 2026',
  },
  {
    id: 'SES-1003',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    loginTime: '09:56 am',
    logoutTime: '09:57 am',
    status: 'LOGGED_OUT',
    duration: '0.02 hrs',
    date: '23 Jul 2026',
    reportSubmitted: true,
    workReport: {
      workSummary: 'Tested app screens and verified responsive layout for internal tools.',
      tasksCompleted: ['Updated screens for ICC app', 'Verified login card scaling'],
      pendingTasks: ['Complete task hub integration'],
      challengesBlockers: 'None experienced.',
      timeNotes: 'Logged 1 min shift check.',
      additionalNotes: 'Session completed cleanly.',
      submittedAt: '09:57 am',
      logoutMethod: 'MANUAL_LOGOUT',
    },
    createdAt: '23 Jul 2026',
    updatedAt: '23 Jul 2026',
  },
  {
    id: 'SES-1004',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    loginTime: '04:59 pm',
    logoutTime: '08:51 pm',
    status: 'LOGGED_OUT',
    duration: '3.87 hrs',
    date: '22 Jul 2026',
    reportSubmitted: true,
    workReport: {
      workSummary: 'Refined employee dashboard UI and updated attendance logs.',
      tasksCompleted: ['Employee dashboard visual alignment', 'Verified Next.js build server compilation'],
      pendingTasks: ['TMS module migration'],
      challengesBlockers: 'None.',
      timeNotes: '3.87 hrs focused coding.',
      additionalNotes: 'All components updated to enterprise design tokens.',
      submittedAt: '08:51 pm',
      logoutMethod: 'MANUAL_LOGOUT',
    },
    createdAt: '22 Jul 2026',
    updatedAt: '22 Jul 2026',
  },
];

export class LogoutRepository {
  private static loadFromStorage(): WorkSession[] {
    if (typeof window === 'undefined') return seedWorkSessions;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '' || raw === 'undefined' || raw === 'null') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWorkSessions));
        return seedWorkSessions;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWorkSessions));
        return seedWorkSessions;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read work sessions from localStorage, re-seeding:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWorkSessions));
      } catch (err) {}
      return seedWorkSessions;
    }
  }

  private static saveToStorage(data: WorkSession[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save work sessions to localStorage:', e);
    }
  }

  static getWorkSessions(filters?: LogoutFilterParams): WorkSession[] {
    let list = this.loadFromStorage();

    if (!filters) return list;

    if (filters.employeeId) {
      list = list.filter((s) => s.employeeId === filters.employeeId || s.employeeName.includes('Sri Varun'));
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.employeeName.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.departmentName.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    if (filters.department && filters.department !== 'ALL') {
      list = list.filter((s) => s.departmentName === filters.department);
    }

    if (filters.status && filters.status !== 'ALL') {
      list = list.filter((s) => s.status === filters.status);
    }

    return list;
  }

  static getSessionById(id: string): WorkSession | null {
    const list = this.loadFromStorage();
    return list.find((s) => s.id === id) || null;
  }

  static startWorkSession(
    employeeId: string,
    employeeName: string,
    avatar: string,
    departmentId: string,
    departmentName: string,
    role: string
  ): WorkSession {
    const list = this.loadFromStorage();
    const newId = `SES-${Math.floor(1005 + Math.random() * 800)}`;
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    const newSession: WorkSession = {
      id: newId,
      employeeId,
      employeeName,
      avatar,
      departmentId,
      departmentName,
      role,
      loginTime: currentTime,
      status: 'ACTIVE',
      duration: 'Active Shift',
      date: currentDate,
      reportSubmitted: false,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    list.unshift(newSession);
    this.saveToStorage(list);
    return newSession;
  }

  static endWorkSession(payload: SubmitWorkReportPayload): WorkSession | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((s) => s.id === payload.sessionId);
    if (idx === -1) return null;

    const logoutTimeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    const updated: WorkSession = {
      ...list[idx],
      logoutTime: logoutTimeStr,
      status: 'LOGGED_OUT',
      duration: '8.0 hrs',
      reportSubmitted: true,
      workReport: {
        workSummary: payload.workSummary,
        tasksCompleted: payload.tasksCompleted,
        pendingTasks: payload.pendingTasks,
        challengesBlockers: payload.challengesBlockers,
        timeNotes: payload.timeNotes,
        additionalNotes: payload.additionalNotes,
        submittedAt: logoutTimeStr,
        logoutMethod: payload.logoutMethod || 'MANUAL_LOGOUT',
      },
      updatedAt: currentDate,
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static autoCloseSession(id: string): WorkSession | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    const currentDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    const updated: WorkSession = {
      ...list[idx],
      status: 'AUTO_CLOSED',
      duration: '8.0 hrs',
      reportSubmitted: true,
      workReport: {
        workSummary: 'No report was sent due to forced logout.',
        tasksCompleted: ['None reported'],
        pendingTasks: ['None reported'],
        challengesBlockers: 'None reported',
        timeNotes: 'None reported',
        additionalNotes: 'System-generated report due to user closing browser without logging out.',
        submittedAt: '06:00 PM',
        logoutMethod: 'FORCE_LOGOUT',
      },
      updatedAt: currentDate,
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static getKpis(employeeId?: string): LogoutKpis {
    let list = this.loadFromStorage();
    if (employeeId) {
      list = list.filter((s) => s.employeeId === employeeId || s.employeeName.includes('Sri Varun'));
    }
    return {
      totalSessionsToday: list.length,
      activeSessions: list.filter((s) => s.status === 'ACTIVE').length,
      reportsSubmittedToday: list.filter((s) => s.reportSubmitted).length,
      autoClosedCount: list.filter((s) => s.status === 'AUTO_CLOSED').length,
      averageWorkingHours: 8.5,
    };
  }
}
