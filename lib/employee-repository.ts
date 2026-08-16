/**
 * Task Management System (TMS) - Employee Repository & Browser Storage Persistence Layer
 * Implements local persistence using browser localStorage with workforce seed data.
 */

import { EmployeeRecord, CreateEmployeePayload, UpdateEmployeePayload, EmployeeKpis } from './employee-models';

const STORAGE_KEY = 'ICC_TMS_EMPLOYEES_PERSISTENCE_V1';

const seedEmployees: EmployeeRecord[] = [
  {
    id: 'EMP-101',
    employeeId: 'EMP-101',
    fullName: 'Sri Hari Kolusu',
    email: 'ceo@innovibe.in',
    phone: '+91 98765 43210',
    designation: 'Founder & CEO',
    departmentId: 'DEP-100',
    departmentName: 'Executive Office',
    role: 'Founder & CEO',
    userType: 'CEO',
    joiningDate: 'Jan 01, 2024',
    attendance: 98,
    productivityScore: 98,
    productivityStatus: 'EXCELLENT',
    accountStatus: 'ONLINE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
  },
  {
    id: 'EMP-102',
    employeeId: 'EMP-102',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@innovibe.in',
    phone: '+91 98765 43211',
    designation: 'HR Director',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'HR Director',
    userType: 'DEPARTMENT_HEAD',
    joiningDate: 'Mar 15, 2024',
    attendance: 96,
    productivityScore: 95,
    productivityStatus: 'EXCELLENT',
    accountStatus: 'ONLINE',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
  },
  {
    id: 'EMP-103',
    employeeId: 'EMP-103',
    fullName: 'Vikram Mehta',
    email: 'vikram.m@innovibe.in',
    phone: '+91 98765 43212',
    designation: 'Talent Acquisition Lead',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'Talent Lead',
    userType: 'EMPLOYEE',
    joiningDate: 'Jun 10, 2025',
    attendance: 88,
    productivityScore: 91,
    productivityStatus: 'VERY_GOOD',
    accountStatus: 'OFFLINE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
  },
  {
    id: 'EMP-104',
    employeeId: 'EMP-104',
    fullName: 'Rajesh Kumar',
    email: 'rajesh.k@innovibe.in',
    phone: '+91 98765 43213',
    designation: 'Fleet Operations Lead',
    departmentId: 'DEP-102',
    departmentName: 'Operations',
    role: 'Operations Lead',
    userType: 'DEPARTMENT_HEAD',
    joiningDate: 'Nov 01, 2024',
    attendance: 94,
    productivityScore: 89,
    productivityStatus: 'VERY_GOOD',
    accountStatus: 'ONLINE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
  },
  {
    id: 'EMP-105',
    employeeId: 'EMP-105',
    fullName: 'Srinivas Rao',
    email: 'srinivas.r@innovibe.in',
    phone: '+91 98765 43214',
    designation: 'Tech & Systems Architect',
    departmentId: 'DEP-104',
    departmentName: 'Internet of Things',
    role: 'Systems Architect',
    userType: 'DEPARTMENT_HEAD',
    joiningDate: 'Feb 01, 2024',
    attendance: 97,
    productivityScore: 96,
    productivityStatus: 'EXCELLENT',
    accountStatus: 'ONLINE',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
  },
  {
    id: 'EMP-106',
    employeeId: 'EMP-106',
    fullName: 'Priya Verma',
    email: 'priya.v@innovibe.in',
    phone: '+91 98765 43215',
    designation: 'People Operations Specialist',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'People Ops',
    userType: 'EMPLOYEE',
    joiningDate: 'Apr 18, 2025',
    attendance: 79,
    productivityScore: 82,
    productivityStatus: 'GOOD',
    accountStatus: 'OFFLINE',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
  },
  {
    id: 'EMP-107',
    employeeId: 'EMP-107',
    fullName: 'Rahul Verma',
    email: 'rahul.v@innovibe.in',
    phone: '+91 98765 43216',
    designation: 'EV Telematics Engineer',
    departmentId: 'DEP-104',
    departmentName: 'Internet of Things',
    role: 'Telematics Engineer',
    userType: 'EMPLOYEE',
    joiningDate: 'May 05, 2025',
    attendance: 84,
    productivityScore: 88,
    productivityStatus: 'VERY_GOOD',
    accountStatus: 'ONLINE',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    createdAt: 'Aug 01, 2026',
    updatedAt: 'Aug 01, 2026',
    isActive: true,
  },
];

export const EVENT_EMPLOYEES_UPDATED = 'innovibe:employees_updated';

export class EmployeeRepository {
  private static loadFromStorage(): EmployeeRecord[] {
    if (typeof window === 'undefined') return seedEmployees;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '' || raw === 'undefined' || raw === 'null') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEmployees));
        return seedEmployees;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEmployees));
        return seedEmployees;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read employees from localStorage, re-seeding:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEmployees));
      } catch (err) {}
      return seedEmployees;
    }
  }

  private static saveToStorage(data: EmployeeRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent(EVENT_EMPLOYEES_UPDATED, { detail: data }));
    } catch (e) {
      console.error('Failed to save employees to localStorage:', e);
    }
  }

  static onEmployeesUpdated(callback: (records: EmployeeRecord[]) => void): () => void {
    if (typeof window === 'undefined') return () => {};
    const handler = () => {
      callback(EmployeeRepository.getEmployees());
    };
    window.addEventListener(EVENT_EMPLOYEES_UPDATED, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_EMPLOYEES_UPDATED, handler);
      window.removeEventListener('storage', handler);
    };
  }

  static getEmployees(): EmployeeRecord[] {
    return this.loadFromStorage();
  }

  static getEmployee(id: string): EmployeeRecord | null {
    const list = this.loadFromStorage();
    return list.find((e) => e.id === id || e.employeeId === id) || null;
  }

  static createEmployee(payload: CreateEmployeePayload): EmployeeRecord {
    const list = this.loadFromStorage();
    const generatedEmpId = payload.employeeId || `EMP-${Math.floor(100 + Math.random() * 900)}`;

    const newEmp: EmployeeRecord = {
      id: generatedEmpId,
      employeeId: generatedEmpId,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone || '+91 98765 00000',
      password: payload.password || 'Emp@2026Secure',
      designation: payload.designation,
      departmentId: payload.departmentId,
      departmentName: payload.departmentName,
      role: payload.designation,
      userType: payload.userType,
      joiningDate: payload.joiningDate || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      attendance: 95,
      productivityScore: 92,
      productivityStatus: 'EXCELLENT',
      accountStatus: 'ONLINE',
      avatar: payload.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isActive: true,
    };

    list.unshift(newEmp);
    this.saveToStorage(list);
    return newEmp;
  }

  static updateEmployee(id: string, patch: UpdateEmployeePayload): EmployeeRecord | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((e) => e.id === id || e.employeeId === id);
    if (idx === -1) return null;

    const updated: EmployeeRecord = {
      ...list[idx],
      ...patch,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static deleteEmployee(id: string): boolean {
    const list = this.loadFromStorage();
    const filtered = list.filter((e) => e.id !== id && e.employeeId !== id);
    if (filtered.length === list.length) return false;

    this.saveToStorage(filtered);
    return true;
  }

  static getKpis(): EmployeeKpis {
    const list = this.loadFromStorage();
    return {
      totalWorkforce: list.length,
      activeWorkforce: list.filter((e) => e.isActive).length,
      departmentHeads: list.filter((e) => e.userType === 'DEPARTMENT_HEAD' || e.userType === 'CEO').length,
      onlineMembers: list.filter((e) => e.accountStatus === 'ONLINE').length,
      inactiveMembers: list.filter((e) => e.accountStatus === 'OFFLINE' || e.accountStatus === 'INACTIVE').length,
    };
  }
}
