/**
 * Task Management System (TMS) - Leave Approvals Models & TypeScript Interfaces
 * Centralized schema definitions for workforce PTO, sick leave, and approval workflows.
 */

export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export type LeaveType =
  | 'CASUAL_LEAVE'
  | 'SICK_LEAVE'
  | 'PAID_TIME_OFF'
  | 'UNPAID_LEAVE'
  | 'MATERNITY_LEAVE'
  | 'PATERNITY_LEAVE'
  | 'COMPENSATORY_OFF'
  | 'EMERGENCY_LEAVE';

export const LEAVE_TYPE_LABELS: Record<LeaveType, string> = {
  SICK_LEAVE: 'Sick Leave',
  CASUAL_LEAVE: 'Casual Leave',
  PAID_TIME_OFF: 'Paid Time Off (PTO)',
  UNPAID_LEAVE: 'Unpaid Leave',
  MATERNITY_LEAVE: 'Maternity Leave',
  PATERNITY_LEAVE: 'Paternity Leave',
  COMPENSATORY_OFF: 'Compensatory Off',
  EMERGENCY_LEAVE: 'Emergency Leave',
};

export interface LeaveBalance {
  casualLeave: { used: number; total: number };
  sickLeave: { used: number; total: number };
  paidTimeOff: { used: number; total: number };
  unpaidLeave: { used: number; total: number };
}

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
  employeeId?: string;
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
