/**
 * Task Management System (TMS) - Leave Approvals Models & TypeScript Interfaces
 * Centralized schema definitions for workforce PTO, sick leave, and approval workflows.
 */

export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export type LeaveType =
  | 'CASUAL_LEAVE'
  | 'SICK_LEAVE'
  | 'MATERNITY_LEAVE'
  | 'PATERNITY_LEAVE'
  | 'COMPENSATORY_OFF'
  | 'UNPAID_LEAVE'
  | 'EMERGENCY_LEAVE';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  departmentId: string;
  departmentName: string;
  role: string;
  leaveType: LeaveType;
  reason: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  status: LeaveStatus;
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeaveRequestPayload {
  employeeId: string;
  employeeName: string;
  avatar?: string;
  departmentId: string;
  departmentName: string;
  role: string;
  leaveType: LeaveType;
  reason: string;
  startDate: string;
  endDate: string;
  totalDays: number;
}

export interface LeaveFilterParams {
  searchQuery?: string;
  department?: string | 'ALL';
  role?: string | 'ALL';
  leaveType?: LeaveType | 'ALL';
  status?: LeaveStatus | 'ALL';
  tab?: 'PENDING' | 'HISTORY';
}

export interface LeaveKpis {
  pendingCount: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
  totalLeavesRequested: number;
}
