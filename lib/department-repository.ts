/**
 * Task Management System (TMS) - Department Repository & Browser Storage Persistence Layer
 * Implements local persistence using browser localStorage with seed data fallback.
 */

import { DepartmentItem, CreateDepartmentPayload, UpdateDepartmentPayload } from './department-models';

const STORAGE_KEY = 'ICC_TMS_DEPARTMENTS_PERSISTENCE_V1';

const seedDepartments: DepartmentItem[] = [
  {
    id: 'DEP-101',
    departmentName: 'Marketing',
    departmentCode: 'MKT',
    departmentHead: 'Ananya Sharma',
    loginEmail: 'marketing@innovibe.in',
    loginPassword: 'Mkt@Password2026',
    checkInCutoffTime: '09:15 AM',
    status: 'ACTIVE',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
    employeeCount: 14,
    departmentColor: 'bg-amber-500',
  },
  {
    id: 'DEP-102',
    departmentName: 'Operations',
    departmentCode: 'OPS',
    departmentHead: 'Rajesh Kumar',
    loginEmail: 'operations@innovibe.in',
    loginPassword: 'Ops@Password2026',
    checkInCutoffTime: '08:45 AM',
    status: 'ACTIVE',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
    employeeCount: 56,
    departmentColor: 'bg-emerald-500',
  },
  {
    id: 'DEP-103',
    departmentName: 'Service',
    departmentCode: 'SVC',
    departmentHead: 'Vikram Mehta',
    loginEmail: 'service@innovibe.in',
    loginPassword: 'Svc@Password2026',
    checkInCutoffTime: '09:00 AM',
    status: 'ACTIVE',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
    employeeCount: 36,
    departmentColor: 'bg-sky-500',
  },
  {
    id: 'DEP-104',
    departmentName: 'Internet of Things',
    departmentCode: 'IOT',
    departmentHead: 'Srinivas Rao',
    loginEmail: 'iot@innovibe.in',
    loginPassword: 'Iot@Password2026',
    checkInCutoffTime: '09:30 AM',
    status: 'ACTIVE',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
    employeeCount: 42,
    departmentColor: 'bg-purple-500',
  },
  {
    id: 'DEP-105',
    departmentName: 'Information Technology Intern',
    departmentCode: 'ITI',
    departmentHead: 'Priya Verma',
    loginEmail: 'it.interns@innovibe.in',
    loginPassword: 'Iti@Password2026',
    checkInCutoffTime: '09:30 AM',
    status: 'ACTIVE',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
    employeeCount: 12,
    departmentColor: 'bg-rose-500',
  },
];

export class DepartmentRepository {
  /**
   * Helper: Read from localStorage
   */
  private static loadFromStorage(): DepartmentItem[] {
    if (typeof window === 'undefined') return seedDepartments;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '' || raw === 'undefined' || raw === 'null') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDepartments));
        return seedDepartments;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDepartments));
        return seedDepartments;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read departments from localStorage, re-seeding:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDepartments));
      } catch (err) {}
      return seedDepartments;
    }
  }

  /**
   * Helper: Write to localStorage
   */
  private static saveToStorage(data: DepartmentItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save departments to localStorage:', e);
    }
  }

  /**
   * Get all stored departments
   */
  static getDepartments(): DepartmentItem[] {
    return this.loadFromStorage();
  }

  /**
   * Get department by ID
   */
  static getDepartment(id: string): DepartmentItem | null {
    const list = this.loadFromStorage();
    return list.find((d) => d.id === id) || null;
  }

  /**
   * Create & persist new department
   */
  static createDepartment(payload: CreateDepartmentPayload): DepartmentItem {
    const list = this.loadFromStorage();
    const newId = `DEP-${Math.floor(100 + Math.random() * 900)}`;

    const newDept: DepartmentItem = {
      id: newId,
      departmentName: payload.departmentName,
      departmentCode: payload.departmentCode.toUpperCase(),
      departmentHead: payload.departmentHead,
      loginEmail: payload.loginEmail,
      loginPassword: payload.loginPassword || 'Pass@2026Secure',
      checkInCutoffTime: payload.checkInCutoffTime || '09:15 AM',
      status: 'ACTIVE',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isActive: true,
      employeeCount: payload.employeeCount || 10,
      departmentColor: payload.departmentColor || 'bg-amber-500',
    };

    list.unshift(newDept);
    this.saveToStorage(list);
    return newDept;
  }

  /**
   * Update department fields
   */
  static updateDepartment(id: string, patch: UpdateDepartmentPayload): DepartmentItem | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((d) => d.id === id);
    if (idx === -1) return null;

    const updated: DepartmentItem = {
      ...list[idx],
      ...patch,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  /**
   * Delete department
   */
  static deleteDepartment(id: string): boolean {
    const list = this.loadFromStorage();
    const filtered = list.filter((d) => d.id !== id);
    if (filtered.length === list.length) return false;

    this.saveToStorage(filtered);
    return true;
  }
}
