/**
 * Task Management System (TMS) - Employee Service Layer
 * Enterprise API service abstraction connecting UI components to repository storage / future backend endpoints.
 */

import { EmployeeRecord, CreateEmployeePayload, UpdateEmployeePayload, EmployeeKpis } from './employee-models';
import { EmployeeRepository } from './employee-repository';

export class EmployeeService {
  static async getAll(): Promise<EmployeeRecord[]> {
    return EmployeeRepository.getEmployees();
  }

  static async getById(id: string): Promise<EmployeeRecord | null> {
    return EmployeeRepository.getEmployee(id);
  }

  static async create(payload: CreateEmployeePayload): Promise<EmployeeRecord> {
    return EmployeeRepository.createEmployee(payload);
  }

  static async update(id: string, patch: UpdateEmployeePayload): Promise<EmployeeRecord | null> {
    return EmployeeRepository.updateEmployee(id, patch);
  }

  static async delete(id: string): Promise<boolean> {
    return EmployeeRepository.deleteEmployee(id);
  }

  static async getKpis(): Promise<EmployeeKpis> {
    return EmployeeRepository.getKpis();
  }
}
