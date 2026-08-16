/**
 * Task Management System (TMS) - Logout Reports & Session Service Layer
 * Enterprise API service abstraction connecting UI components to repository storage / future backend endpoints.
 */

import { WorkSession, SubmitWorkReportPayload, LogoutFilterParams, LogoutKpis } from './logout-models';
import { LogoutRepository } from './logout-repository';

export class LogoutService {
  static async getAll(filters?: LogoutFilterParams): Promise<WorkSession[]> {
    return LogoutRepository.getWorkSessions(filters);
  }

  static async getById(id: string): Promise<WorkSession | null> {
    return LogoutRepository.getSessionById(id);
  }

  static async startSession(
    employeeId: string,
    employeeName: string,
    avatar: string,
    departmentId: string,
    departmentName: string,
    role: string
  ): Promise<WorkSession> {
    return LogoutRepository.startWorkSession(employeeId, employeeName, avatar, departmentId, departmentName, role);
  }

  static async submitReport(payload: SubmitWorkReportPayload): Promise<WorkSession | null> {
    return LogoutRepository.endWorkSession(payload);
  }

  static async autoClose(id: string): Promise<WorkSession | null> {
    return LogoutRepository.autoCloseSession(id);
  }

  static onLogoutUpdated(callback: (sessions: WorkSession[]) => void): () => void {
    return LogoutRepository.onLogoutUpdated(callback);
  }

  static async getKpis(): Promise<LogoutKpis> {
    return LogoutRepository.getKpis();
  }
}
