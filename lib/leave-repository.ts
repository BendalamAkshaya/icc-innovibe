/**
 * Task Management System (TMS) - Leave Repository & Browser Storage Persistence Layer
 * Implements local persistence using browser localStorage with seed data fallback.
 */

import { LeaveRequest, CreateLeaveRequestPayload, LeaveKpis, LeaveFilterParams } from './leave-models';

const STORAGE_KEY = 'ICC_TMS_LEAVES_PERSISTENCE_V1';

const seedLeaveRequests: LeaveRequest[] = [
  {
    id: 'LV-101',
    employeeId: 'EMP-103',
    employeeName: 'Vikram Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'Talent Acquisition Lead',
    leaveType: 'CASUAL_LEAVE',
    reason: 'Family event and personal travel obligations out of state.',
    startDate: 'Aug 10, 2026',
    endDate: 'Aug 12, 2026',
    totalDays: 3,
    status: 'PENDING',
    appliedDate: 'Aug 04, 2026',
    createdAt: 'Aug 04, 2026',
    updatedAt: 'Aug 04, 2026',
  },
  {
    id: 'LV-102',
    employeeId: 'EMP-106',
    employeeName: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'People Operations Specialist',
    leaveType: 'SICK_LEAVE',
    reason: 'Severe viral fever and physician recommended bed rest.',
    startDate: 'Aug 08, 2026',
    endDate: 'Aug 09, 2026',
    totalDays: 2,
    status: 'PENDING',
    appliedDate: 'Aug 05, 2026',
    createdAt: 'Aug 05, 2026',
    updatedAt: 'Aug 05, 2026',
  },
  {
    id: 'LV-103',
    employeeId: 'EMP-107',
    employeeName: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-104',
    departmentName: 'Internet of Things',
    role: 'EV Telematics Engineer',
    leaveType: 'COMPENSATORY_OFF',
    reason: 'Compensatory day off for weekend battery telemetry maintenance deployment.',
    startDate: 'Aug 15, 2026',
    endDate: 'Aug 15, 2026',
    totalDays: 1,
    status: 'PENDING',
    appliedDate: 'Aug 05, 2026',
    createdAt: 'Aug 05, 2026',
    updatedAt: 'Aug 05, 2026',
  },
  {
    id: 'LV-104',
    employeeId: 'EMP-104',
    employeeName: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-102',
    departmentName: 'Operations',
    role: 'Fleet Operations Lead',
    leaveType: 'CASUAL_LEAVE',
    reason: 'Annual personal vacation leave.',
    startDate: 'Jul 20, 2026',
    endDate: 'Jul 22, 2026',
    totalDays: 3,
    status: 'APPROVED',
    appliedDate: 'Jul 15, 2026',
    approvedBy: 'Sri Hari Kolusu (CEO)',
    approvedDate: 'Jul 18, 2026',
    createdAt: 'Jul 15, 2026',
    updatedAt: 'Jul 18, 2026',
  },
  {
    id: 'LV-105',
    employeeId: 'EMP-102',
    employeeName: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'HR Director',
    leaveType: 'SICK_LEAVE',
    reason: 'Routine dental surgery recovery.',
    startDate: 'Jun 10, 2026',
    endDate: 'Jun 11, 2026',
    totalDays: 2,
    status: 'APPROVED',
    appliedDate: 'Jun 05, 2026',
    approvedBy: 'Sri Hari Kolusu (CEO)',
    approvedDate: 'Jun 08, 2026',
    createdAt: 'Jun 05, 2026',
    updatedAt: 'Jun 08, 2026',
  },
];

export class LeaveRepository {
  private static loadFromStorage(): LeaveRequest[] {
    if (typeof window === 'undefined') return seedLeaveRequests;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '' || raw === 'undefined' || raw === 'null') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLeaveRequests));
        return seedLeaveRequests;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLeaveRequests));
        return seedLeaveRequests;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read leave requests from localStorage, re-seeding:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLeaveRequests));
      } catch (err) {}
      return seedLeaveRequests;
    }
  }

  private static saveToStorage(data: LeaveRequest[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save leave requests to localStorage:', e);
    }
  }

  static getLeaveRequests(filters?: LeaveFilterParams): LeaveRequest[] {
    let list = this.loadFromStorage();

    if (!filters) return list;

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      result: list = list.filter(
        (l) =>
          l.employeeName.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.departmentName.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q)
      );
    }

    if (filters.department && filters.department !== 'ALL') {
      list = list.filter((l) => l.departmentName === filters.department);
    }

    if (filters.status && filters.status !== 'ALL') {
      list = list.filter((l) => l.status === filters.status);
    }

    if (filters.tab === 'PENDING') {
      list = list.filter((l) => l.status === 'PENDING');
    } else if (filters.tab === 'HISTORY') {
      list = list.filter((l) => l.status !== 'PENDING');
    }

    return list;
  }

  static getPendingRequests(): LeaveRequest[] {
    return this.loadFromStorage().filter((l) => l.status === 'PENDING');
  }

  static getLeaveHistory(): LeaveRequest[] {
    return this.loadFromStorage().filter((l) => l.status !== 'PENDING');
  }

  static createLeaveRequest(payload: CreateLeaveRequestPayload): LeaveRequest {
    const list = this.loadFromStorage();
    const newId = `LV-${Math.floor(100 + Math.random() * 900)}`;

    const newReq: LeaveRequest = {
      id: newId,
      employeeId: payload.employeeId,
      employeeName: payload.employeeName,
      avatar: payload.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.employeeName)}&background=fef3c7&color=92400e`,
      departmentId: payload.departmentId,
      departmentName: payload.departmentName,
      role: payload.role,
      leaveType: payload.leaveType,
      reason: payload.reason,
      startDate: payload.startDate,
      endDate: payload.endDate,
      totalDays: payload.totalDays,
      status: 'PENDING',
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    list.unshift(newReq);
    this.saveToStorage(list);
    return newReq;
  }

  static approveLeave(id: string, approvedBy: string = 'Sri Hari Kolusu (CEO)'): LeaveRequest | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((l) => l.id === id);
    if (idx === -1) return null;

    const updated: LeaveRequest = {
      ...list[idx],
      status: 'APPROVED',
      approvedBy,
      approvedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static rejectLeave(id: string, rejectionReason: string = 'Operational workload priority'): LeaveRequest | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((l) => l.id === id);
    if (idx === -1) return null;

    const updated: LeaveRequest = {
      ...list[idx],
      status: 'REJECTED',
      rejectionReason,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static cancelLeave(id: string): LeaveRequest | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((l) => l.id === id);
    if (idx === -1) return null;

    const updated: LeaveRequest = {
      ...list[idx],
      status: 'CANCELLED',
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static getKpis(): LeaveKpis {
    const list = this.loadFromStorage();
    return {
      pendingCount: list.filter((l) => l.status === 'PENDING').length,
      approvedThisMonth: list.filter((l) => l.status === 'APPROVED').length,
      rejectedThisMonth: list.filter((l) => l.status === 'REJECTED').length,
      totalLeavesRequested: list.length,
    };
  }
}
