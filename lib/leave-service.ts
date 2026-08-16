/**
 * Task Management System (TMS) - Leave Approvals Service Layer
 * Enterprise API service abstraction connecting UI components to repository storage / future backend endpoints.
 */

import { LeaveRequest, CreateLeaveRequestPayload, LeaveKpis, LeaveFilterParams } from './leave-models';
import { LeaveRepository } from './leave-repository';

export class LeaveService {
  static async getAll(filters?: LeaveFilterParams): Promise<LeaveRequest[]> {
    return LeaveRepository.getLeaveRequests(filters);
  }

  static async getPending(): Promise<LeaveRequest[]> {
    return LeaveRepository.getPendingRequests();
  }

  static async getHistory(): Promise<LeaveRequest[]> {
    return LeaveRepository.getLeaveHistory();
  }

  static async create(payload: CreateLeaveRequestPayload): Promise<LeaveRequest> {
    return LeaveRepository.createLeaveRequest(payload);
  }

  static async approve(id: string, approvedBy?: string): Promise<LeaveRequest | null> {
    return LeaveRepository.approveLeave(id, approvedBy);
  }

  static async reject(id: string, reason?: string): Promise<LeaveRequest | null> {
    return LeaveRepository.rejectLeave(id, reason);
  }

  static async cancel(id: string): Promise<LeaveRequest | null> {
    return LeaveRepository.cancelLeave(id);
  }

  static onLeaveUpdated(callback: (requests: LeaveRequest[]) => void): () => void {
    return LeaveRepository.onLeaveUpdated(callback);
  }

  static async getKpis(): Promise<LeaveKpis> {
    return LeaveRepository.getKpis();
  }
}
