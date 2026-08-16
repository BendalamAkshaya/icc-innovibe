/**
 * Task Management System (TMS) - Department Service Layer
 * Enterprise API service abstraction connecting UI components to repository storage / future backend endpoints.
 */

import { DepartmentItem, CreateDepartmentPayload, UpdateDepartmentPayload } from './department-models';
import { DepartmentRepository } from './department-repository';

export class DepartmentService {
  static async getAll(): Promise<DepartmentItem[]> {
    return DepartmentRepository.getDepartments();
  }

  static async getById(id: string): Promise<DepartmentItem | null> {
    return DepartmentRepository.getDepartment(id);
  }

  static async create(payload: CreateDepartmentPayload): Promise<DepartmentItem> {
    return DepartmentRepository.createDepartment(payload);
  }

  static async update(id: string, patch: UpdateDepartmentPayload): Promise<DepartmentItem | null> {
    return DepartmentRepository.updateDepartment(id, patch);
  }

  static async delete(id: string): Promise<boolean> {
    return DepartmentRepository.deleteDepartment(id);
  }

  static onDepartmentsUpdated(callback: (records: DepartmentItem[]) => void): () => void {
    return DepartmentRepository.onDepartmentsUpdated(callback);
  }
}
