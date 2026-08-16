/**
 * Task Management System (TMS) - Logout Reports & Work Sessions Models
 * Centralized schema definitions for daily work sessions, end-of-day reports, and session states.
 */

export type SessionStatus = 'ACTIVE' | 'COMPLETED' | 'LOGGED_OUT' | 'INTERRUPTED' | 'AUTO_CLOSED' | 'MISSED_LOGOUT';

export type LogoutMethod = 'MANUAL_LOGOUT' | 'AUTO_CLOSED' | 'FORCE_LOGOUT' | 'SYSTEM_RECONCILED';

export interface ReportAttachment {
  id: string;
  filename: string;
  size: string;
  url: string;
}

export interface DailyWorkReport {
  workSummary: string;
  tasksCompleted: string[];
  pendingTasks: string[];
  challengesBlockers: string;
  timeNotes: string;
  additionalNotes?: string;
  attachments?: ReportAttachment[];
  submittedAt: string;
  logoutMethod: LogoutMethod;
}

export interface WorkSession {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  departmentId: string;
  departmentName: string;
  role: string;
  loginTime: string;
  loginTimestamp?: number;
  logoutTime?: string;
  logoutTimestamp?: number;
  status: SessionStatus;
  duration: string;
  date: string;
  reportSubmitted: boolean;
  workReport?: DailyWorkReport;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitWorkReportPayload {
  sessionId: string;
  workSummary: string;
  tasksCompleted: string[];
  pendingTasks: string[];
  challengesBlockers: string;
  timeNotes: string;
  additionalNotes?: string;
  attachments?: ReportAttachment[];
  logoutMethod?: LogoutMethod;
}

export interface LogoutFilterParams {
  employeeId?: string;
  searchQuery?: string;
  department?: string | 'ALL';
  role?: string | 'ALL';
  status?: SessionStatus | 'ALL';
  startDate?: string;
  endDate?: string;
}

export interface LogoutKpis {
  totalSessionsToday: number;
  activeSessions: number;
  reportsSubmittedToday: number;
  interruptedCount: number;
  autoClosedCount: number;
  averageWorkingHours: number;
}
