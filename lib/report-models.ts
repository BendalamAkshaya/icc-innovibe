/**
 * Task Management System (TMS) - Report Engine Models & TypeScript Interfaces
 * Centralized schema definitions for enterprise reporting, export formats, and dynamic query filters.
 */

export type ReportType =
  | 'ATTENDANCE'
  | 'PRODUCTIVITY'
  | 'TASKS'
  | 'EMPLOYEES'
  | 'DEPARTMENTS'
  | 'LEAVE_REPORTS';

export type ExportFormat = 'PDF' | 'EXCEL' | 'CSV';

export type DateRangeOption = 'TODAY' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'SPECIFIC_DATE' | 'CUSTOM_RANGE';

export type EmployeeSelectionOption =
  | 'ENTIRE_ORG'
  | 'DEPARTMENT'
  | 'DEPARTMENT_HEADS'
  | 'ACTIVE_MEMBERS'
  | 'INACTIVE_MEMBERS';

export interface ReportConfig {
  reportType: ReportType;
  dateRangeOption: DateRangeOption;
  specificDate?: string;
  startDate?: string;
  endDate?: string;
  exportFormat: ExportFormat;
  employeeSelection: EmployeeSelectionOption;
  selectedDepartment?: string;
  selectedStatus?: string;
  selectedPriority?: string;
  includeInactive: boolean;
  includeArchived: boolean;
}

export interface GeneratedReportData {
  reportTitle: string;
  generatedAt: string;
  recordCount: number;
  headers: string[];
  rows: (string | number)[][];
}
