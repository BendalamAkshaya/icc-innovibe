/**
 * Task Management System (TMS) - Employee Models & TypeScript Interfaces
 * Centralized schema definitions for workforce directory, user types, and personnel metrics.
 */

export type UserType =
  | 'DEPARTMENT_HEAD'
  | 'EMPLOYEE'
  | 'HR'
  | 'CEO'
  | 'ADMIN'
  | 'INTERN'
  | 'SERVICE';

export type AccountStatus = 'ONLINE' | 'OFFLINE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';

export type ProductivityStatus = 'EXCELLENT' | 'VERY_GOOD' | 'GOOD' | 'AVERAGE' | 'POOR';

export interface EmployeeRecord {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  role: string;
  userType: UserType;
  joiningDate: string;
  attendance: number;
  productivityScore: number;
  productivityStatus: ProductivityStatus;
  accountStatus: AccountStatus;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CreateEmployeePayload {
  fullName: string;
  email: string;
  phone?: string;
  password?: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  userType: UserType;
  joiningDate?: string;
  employeeId?: string;
  avatar?: string;
}

export interface UpdateEmployeePayload {
  fullName?: string;
  email?: string;
  phone?: string;
  designation?: string;
  departmentId?: string;
  departmentName?: string;
  userType?: UserType;
  accountStatus?: AccountStatus;
  attendance?: number;
  productivityScore?: number;
  productivityStatus?: ProductivityStatus;
}

export interface EmployeeKpis {
  totalWorkforce: number;
  activeWorkforce: number;
  departmentHeads: number;
  onlineMembers: number;
  inactiveMembers: number;
}
