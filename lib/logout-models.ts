/**
 * Task Management System (TMS) - Logout Reports & Work Sessions Models
 * Centralized schema definitions for daily work sessions, end-of-day reports, and session states.
 */

export type SessionStatus = 'ACTIVE' | 'LOGGED_OUT' | 'AUTO_CLOSED' | 'MISSED_LOGOUT';

export type LogoutMethod = 'MANUAL_LOGOUT' | 'AUTO_CLOSED' | 'FORCE_LOGOUT';

export interface DailyWorkReport {
  workSummary: string;
  tasksCompleted: string[];
  pendingTasks: string[];
  challengesBlockers: string;
  timeNotes: string;
  additionalNotes?: string;
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
  logoutTime?: string;
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
  autoClosedCount: number;
  averageWorkingHours: number;
}
