/**
 * Task Management System (TMS) - Attendance Models & TypeScript Interfaces
 * Centralized schema definitions for enterprise biometric & workforce time tracking.
 */

export type AttendanceStatus =
  | 'PRESENT'
  | 'ABSENT'
  | 'LATE'
  | 'HALF_DAY'
  | 'LEAVE'
  | 'WORK_FROM_HOME'
  | 'HOLIDAY'
  | 'WEEKEND';

export interface CheckInSession {
  id: string;
  checkInTime: string;
  checkOutTime?: string;
  durationHours: number;
  deviceType: 'BIOMETRIC_TERMINAL' | 'MOBILE_APP_GPS' | 'WEB_PORTAL' | 'FACE_RECOGNITION';
  locationGps?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  role: string;
  department: string;
  status: AttendanceStatus;
  firstCheckIn: string;
  lastCheckOut: string;
  totalWorkingHours: number;
  attendancePercentage: number;
  date: string;
  sessions: CheckInSession[];
  shiftName: string;
}

export interface AttendanceKpis {
  totalStrength: number;
  presentToday: number;
  includesLateCount: number;
  lateCheckIns: number;
  absentToday: number;
  leaveToday: number;
  wfhToday: number;
}

export interface AttendanceFilterParams {
  dateRangeSelection?: 'TODAY' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'CUSTOM' | 'SPECIFIC_DATE';
  specificDate?: string;
  department?: string | 'ALL';
  role?: string | 'ALL';
  status?: AttendanceStatus | 'ALL';
  attendancePctMin?: number;
  searchQuery?: string;
}

export interface AttendanceProfileDetails {
  record: AttendanceRecord;
  monthlyCalendar: { day: number; date: string; status: AttendanceStatus; hours: number }[];
  lateReports: { date: string; delayMinutes: number; reason: string }[];
  leaveHistory: { date: string; type: string; status: 'APPROVED' | 'PENDING' }[];
  gpsCheckIns: { time: string; locationName: string; lat: number; lng: number }[];
  auditLogs: { timestamp: string; action: string; performedBy: string }[];
}

export interface ExportJob {
  format: 'PDF' | 'EXCEL' | 'CSV';
  department: string;
  dateRange: string;
  status: string;
  downloadUrl?: string;
}
