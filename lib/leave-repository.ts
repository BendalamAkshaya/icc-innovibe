/**
 * Task Management System (TMS) - Leave Repository & Browser Storage Persistence Layer
 * Implements local persistence using browser localStorage with seed data fallback.
 */

import { LeaveRequest, CreateLeaveRequestPayload, LeaveKpis, LeaveFilterParams } from './leave-models';

const STORAGE_KEY = 'ICC_TMS_LEAVES_PERSISTENCE_V3';

const seedLeaveRequests: LeaveRequest[] = [
  {
    id: 'LV-201',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    leaveType: 'CASUAL_LEAVE',
    reason: 'Personal family work & travel.',
    startDate: '2026-07-17',
    endDate: '2026-07-20',
    totalDays: 4,
    status: 'APPROVED',
    appliedDate: '2026-07-15',
    approvedBy: 'Srinivas Thalada (DEPARTMENT)',
    approvedDate: '2026-07-16',
    createdAt: '2026-07-15',
    updatedAt: '2026-07-16',
  },
  {
    id: 'LV-202',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    leaveType: 'CASUAL_LEAVE',
    reason: 'Personal day off.',
    startDate: '2026-07-11',
    endDate: '2026-07-11',
    totalDays: 1,
    status: 'APPROVED',
    appliedDate: '2026-07-09',
    approvedBy: 'Srinivas Thalada (DEPARTMENT)',
    approvedDate: '2026-07-10',
    createdAt: '2026-07-09',
    updatedAt: '2026-07-10',
  },
  {
    id: 'LV-203',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    leaveType: 'SICK_LEAVE',
    reason: 'Doctor appointment and rest.',
    startDate: '2026-06-16',
    endDate: '2026-06-16',
    totalDays: 1,
    status: 'APPROVED',
    appliedDate: '2026-06-15',
    approvedBy: 'Ananya Sharma (HR Director)',
    approvedDate: '2026-06-15',
    createdAt: '2026-06-15',
    updatedAt: '2026-06-15',
  },
  {
    id: 'LV-204',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    leaveType: 'CASUAL_LEAVE',
    reason: 'Urgent personal work.',
    startDate: '2026-06-13',
    endDate: '2026-06-13',
    totalDays: 1,
    status: 'REJECTED',
    rejectionReason: 'Checking',
    appliedDate: '2026-06-12',
    createdAt: '2026-06-12',
    updatedAt: '2026-06-12',
  },
  {
    id: 'LV-205',
    employeeId: 'EMP-102',
    employeeName: 'Sri Varun Tej Chavitina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-1',
    departmentName: 'Technology',
    role: 'Information Technology Intern',
    leaveType: 'SICK_LEAVE',
    reason: 'Fever and viral infection.',
    startDate: '2026-06-10',
    endDate: '2026-06-10',
    totalDays: 1,
    status: 'APPROVED',
    appliedDate: '2026-06-09',
    approvedBy: 'Ananya Sharma (HR Director)',
    approvedDate: '2026-06-09',
    createdAt: '2026-06-09',
    updatedAt: '2026-06-09',
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

    if (filters.employeeId) {
      list = list.filter((l) => l.employeeId === filters.employeeId || l.employeeName.includes('Sri Varun'));
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
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

    if (filters.leaveType && filters.leaveType !== 'ALL') {
      list = list.filter((l) => l.leaveType === filters.leaveType);
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

  static getLeaveHistory(employeeId?: string): LeaveRequest[] {
    const list = this.loadFromStorage();
    if (employeeId) {
      return list.filter((l) => l.employeeId === employeeId || l.employeeName.includes('Sri Varun'));
    }
    return list;
  }

  static createLeaveRequest(payload: CreateLeaveRequestPayload): LeaveRequest {
    const list = this.loadFromStorage();
    const newId = `LV-${Math.floor(206 + Math.random() * 800)}`;

    const newReq: LeaveRequest = {
      id: newId,
      employeeId: payload.employeeId,
      employeeName: payload.employeeName,
      avatar: payload.avatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80`,
      departmentId: payload.departmentId,
      departmentName: payload.departmentName,
      role: payload.role,
      leaveType: payload.leaveType,
      reason: payload.reason,
      startDate: payload.startDate,
      endDate: payload.endDate,
      totalDays: payload.totalDays,
      status: 'APPROVED', // Default to APPROVED or PENDING based on workflow
      appliedDate: new Date().toISOString().split('T')[0],
      approvedBy: 'Srinivas Thalada (DEPARTMENT)',
      approvedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    list.unshift(newReq);
    this.saveToStorage(list);
    return newReq;
  }

  static approveLeave(id: string, approvedBy: string = 'Srinivas Thalada (DEPARTMENT)'): LeaveRequest | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((l) => l.id === id);
    if (idx === -1) return null;

    const updated: LeaveRequest = {
      ...list[idx],
      status: 'APPROVED',
      approvedBy,
      approvedDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static rejectLeave(id: string, rejectionReason: string = 'Checking'): LeaveRequest | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((l) => l.id === id);
    if (idx === -1) return null;

    const updated: LeaveRequest = {
      ...list[idx],
      status: 'REJECTED',
      rejectionReason,
      updatedAt: new Date().toISOString().split('T')[0],
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
      updatedAt: new Date().toISOString().split('T')[0],
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
