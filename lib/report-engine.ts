/**
 * Task Management System (TMS) - Report Engine Layer
 * Dynamically aggregates real-time data from all browser storage repositories (Department, Employee, Attendance, Tasks, Leaves).
 */

import { ReportConfig, GeneratedReportData } from './report-models';
import { DepartmentRepository } from './department-repository';
import { EmployeeRepository } from './employee-repository';
import { AttendanceService } from './attendance-service';
import { TmsTaskService } from './tms-service';
import { LeaveRepository } from './leave-repository';

export class ReportEngine {
  static async generateReportData(config: ReportConfig): Promise<GeneratedReportData> {
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    switch (config.reportType) {
      case 'ATTENDANCE':
        return await this.buildAttendanceReport(config, timestamp);
      case 'PRODUCTIVITY':
        return await this.buildProductivityReport(config, timestamp);
      case 'TASKS':
        return await this.buildTasksReport(config, timestamp);
      case 'EMPLOYEES':
        return await this.buildEmployeesReport(config, timestamp);
      case 'DEPARTMENTS':
        return await this.buildDepartmentsReport(config, timestamp);
      case 'LEAVE_REPORTS':
        return await this.buildLeaveReport(config, timestamp);
      default:
        return await this.buildAttendanceReport(config, timestamp);
    }
  }

  private static async buildAttendanceReport(config: ReportConfig, timestamp: string): Promise<GeneratedReportData> {
    const records = await AttendanceService.getAttendanceRecords();
    let filtered = records;

    if (config.selectedDepartment && config.selectedDepartment !== 'ALL') {
      filtered = filtered.filter((r) => r.department === config.selectedDepartment);
    }

    const headers = [
      'Employee ID',
      'Employee Name',
      'Department',
      'Role',
      'Status',
      'Check-in Time',
      'Check-out Time',
      'Total Hours',
      'Attendance %',
      'Shift Name',
    ];

    const rows = filtered.map((r) => [
      r.employeeId,
      r.employeeName,
      r.department,
      r.role,
      r.status,
      r.firstCheckIn || '--',
      r.lastCheckOut || '--',
      r.totalWorkingHours ? `${r.totalWorkingHours} hrs` : '--',
      `${r.attendancePercentage}%`,
      r.shiftName,
    ]);

    return {
      reportTitle: 'Workforce Attendance Report',
      generatedAt: timestamp,
      recordCount: rows.length,
      headers,
      rows,
    };
  }

  private static async buildProductivityReport(config: ReportConfig, timestamp: string): Promise<GeneratedReportData> {
    const employees = EmployeeRepository.getEmployees();
    let filtered = employees;

    if (config.selectedDepartment && config.selectedDepartment !== 'ALL') {
      filtered = filtered.filter((e) => e.departmentName === config.selectedDepartment);
    }

    if (!config.includeInactive) {
      filtered = filtered.filter((e) => e.isActive);
    }

    const headers = [
      'Employee ID',
      'Employee Name',
      'Department',
      'Designation',
      'Productivity Score',
      'Productivity Status',
      'Attendance %',
      'Account Status',
    ];

    const rows = filtered.map((e) => [
      e.employeeId,
      e.fullName,
      e.departmentName,
      e.designation,
      `${e.productivityScore} / 100`,
      e.productivityStatus,
      `${e.attendance}%`,
      e.accountStatus,
    ]);

    return {
      reportTitle: 'Employee Productivity & Performance Report',
      generatedAt: timestamp,
      recordCount: rows.length,
      headers,
      rows,
    };
  }

  private static async buildTasksReport(config: ReportConfig, timestamp: string): Promise<GeneratedReportData> {
    const tasks = await TmsTaskService.getTasks();
    let filtered = tasks;

    if (config.selectedDepartment && config.selectedDepartment !== 'ALL') {
      filtered = filtered.filter((t) => t.category.toLowerCase().includes(config.selectedDepartment!.toLowerCase()));
    }

    const headers = [
      'Task ID',
      'Task Title',
      'Category',
      'Assignee',
      'Assignee Role',
      'Priority',
      'Status',
      'Progress %',
      'Deadline',
      'Created Date',
    ];

    const rows = filtered.map((t) => [
      t.id,
      t.title,
      t.category,
      t.assignee.name,
      t.assignee.role,
      t.priority,
      t.status,
      `${t.progressPercent}%`,
      t.timeline.targetDeadline,
      t.timeline.createdDate,
    ]);

    return {
      reportTitle: 'Corporate Tasks & Assignments Report',
      generatedAt: timestamp,
      recordCount: rows.length,
      headers,
      rows,
    };
  }

  private static buildEmployeesReport(config: ReportConfig, timestamp: string): GeneratedReportData {
    const employees = EmployeeRepository.getEmployees();
    let filtered = employees;

    if (config.selectedDepartment && config.selectedDepartment !== 'ALL') {
      filtered = filtered.filter((e) => e.departmentName === config.selectedDepartment);
    }

    if (!config.includeInactive) {
      filtered = filtered.filter((e) => e.isActive);
    }

    const headers = [
      'Employee ID',
      'Full Name',
      'Work Email',
      'Phone Number',
      'Department',
      'Designation',
      'User Type',
      'Account Status',
      'Joining Date',
    ];

    const rows = filtered.map((e) => [
      e.employeeId,
      e.fullName,
      e.email,
      e.phone,
      e.departmentName,
      e.designation,
      e.userType,
      e.accountStatus,
      e.joiningDate,
    ]);

    return {
      reportTitle: 'Corporate Employee Roster Directory',
      generatedAt: timestamp,
      recordCount: rows.length,
      headers,
      rows,
    };
  }

  private static buildDepartmentsReport(config: ReportConfig, timestamp: string): GeneratedReportData {
    const depts = DepartmentRepository.getDepartments();

    const headers = [
      'Department Code',
      'Department Name',
      'Department Head',
      'Login Email',
      'Staff Count',
      'Check-in Cutoff',
      'Status',
    ];

    const rows = depts.map((d) => [
      d.departmentCode,
      d.departmentName,
      d.departmentHead,
      d.loginEmail,
      d.employeeCount,
      d.checkInCutoffTime,
      d.status,
    ]);

    return {
      reportTitle: 'Organizational Departments Audit Report',
      generatedAt: timestamp,
      recordCount: rows.length,
      headers,
      rows,
    };
  }

  private static buildLeaveReport(config: ReportConfig, timestamp: string): GeneratedReportData {
    const leaves = LeaveRepository.getLeaveRequests();
    let filtered = leaves;

    if (config.selectedDepartment && config.selectedDepartment !== 'ALL') {
      filtered = filtered.filter((l) => l.departmentName === config.selectedDepartment);
    }

    const headers = [
      'Leave ID',
      'Employee Name',
      'Department',
      'Role',
      'Leave Type',
      'Start Date',
      'End Date',
      'Total Days',
      'Status',
      'Approved / Rejected By',
      'Applied Date',
    ];

    const rows = filtered.map((l) => [
      l.id,
      l.employeeName,
      l.departmentName,
      l.role,
      l.leaveType,
      l.startDate,
      l.endDate,
      l.totalDays,
      l.status,
      l.approvedBy || 'Pending',
      l.appliedDate,
    ]);

    return {
      reportTitle: 'Workforce Leave & PTO Approvals Report',
      generatedAt: timestamp,
      recordCount: rows.length,
      headers,
      rows,
    };
  }
}
