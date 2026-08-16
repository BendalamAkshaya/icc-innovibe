/**
 * Task Management System (TMS) - Attendance Service Layer
 * Enterprise service & repository abstraction layer for biometric time-tracking data.
 */

import {
  AttendanceRecord,
  AttendanceKpis,
  AttendanceFilterParams,
  AttendanceProfileDetails,
  ExportJob,
} from './attendance-models';

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'ATT-101',
    employeeId: 'EMP-101',
    employeeName: 'Sri Hari Kolusu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Founder & CEO',
    department: 'Executive Office',
    status: 'PRESENT',
    firstCheckIn: '08:45 AM',
    lastCheckOut: '07:30 PM',
    totalWorkingHours: 10.75,
    attendancePercentage: 98,
    date: 'Aug 06, 2026',
    shiftName: 'Executive Shift (09:00 AM - 06:00 PM)',
    sessions: [
      {
        id: 'SES-1',
        checkInTime: '08:45 AM',
        checkOutTime: '07:30 PM',
        durationHours: 10.75,
        deviceType: 'BIOMETRIC_TERMINAL',
        locationGps: 'Vijayawada HQ Executive Suite',
      },
    ],
  },
  {
    id: 'ATT-102',
    employeeId: 'EMP-102',
    employeeName: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'HR Director',
    department: 'Human Resources',
    status: 'PRESENT',
    firstCheckIn: '08:55 AM',
    lastCheckOut: '06:45 PM',
    totalWorkingHours: 9.8,
    attendancePercentage: 96,
    date: 'Aug 06, 2026',
    shiftName: 'General Shift (09:00 AM - 06:00 PM)',
    sessions: [
      {
        id: 'SES-2',
        checkInTime: '08:55 AM',
        checkOutTime: '06:45 PM',
        durationHours: 9.8,
        deviceType: 'BIOMETRIC_TERMINAL',
        locationGps: 'HQ HR Floor 2',
      },
    ],
  },
  {
    id: 'ATT-103',
    employeeId: 'EMP-103',
    employeeName: 'Vikram Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Talent Acquisition Lead',
    department: 'Human Resources',
    status: 'LATE',
    firstCheckIn: '09:22 AM',
    lastCheckOut: '06:15 PM',
    totalWorkingHours: 8.8,
    attendancePercentage: 88,
    date: 'Aug 06, 2026',
    shiftName: 'General Shift (09:00 AM - 06:00 PM)',
    sessions: [
      {
        id: 'SES-3',
        checkInTime: '09:22 AM',
        checkOutTime: '06:15 PM',
        durationHours: 8.8,
        deviceType: 'MOBILE_APP_GPS',
        locationGps: 'Guntur Recruiting Hub',
      },
    ],
  },
  {
    id: 'ATT-104',
    employeeId: 'EMP-104',
    employeeName: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Fleet Operations Lead',
    department: 'Fleet Operations',
    status: 'PRESENT',
    firstCheckIn: '08:30 AM',
    lastCheckOut: '07:00 PM',
    totalWorkingHours: 10.5,
    attendancePercentage: 94,
    date: 'Aug 06, 2026',
    shiftName: 'Operations Shift (08:30 AM - 05:30 PM)',
    sessions: [
      {
        id: 'SES-4',
        checkInTime: '08:30 AM',
        checkOutTime: '07:00 PM',
        durationHours: 10.5,
        deviceType: 'FACE_RECOGNITION',
        locationGps: 'Vijayawada EV Hub Terminal',
      },
    ],
  },
  {
    id: 'ATT-105',
    employeeId: 'EMP-105',
    employeeName: 'Srinivas Rao',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'Tech & Systems Architect',
    department: 'Technology',
    status: 'WORK_FROM_HOME',
    firstCheckIn: '09:00 AM',
    lastCheckOut: '06:30 PM',
    totalWorkingHours: 9.5,
    attendancePercentage: 97,
    date: 'Aug 06, 2026',
    shiftName: 'Tech Flex Shift (09:00 AM - 06:00 PM)',
    sessions: [
      {
        id: 'SES-5',
        checkInTime: '09:00 AM',
        checkOutTime: '06:30 PM',
        durationHours: 9.5,
        deviceType: 'WEB_PORTAL',
        locationGps: 'Remote Workstation (Authorized)',
      },
    ],
  },
  {
    id: 'ATT-106',
    employeeId: 'EMP-106',
    employeeName: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'People Operations Specialist',
    department: 'Human Resources',
    status: 'ABSENT',
    firstCheckIn: '--:--',
    lastCheckOut: '--:--',
    totalWorkingHours: 0,
    attendancePercentage: 79,
    date: 'Aug 06, 2026',
    shiftName: 'General Shift (09:00 AM - 06:00 PM)',
    sessions: [],
  },
  {
    id: 'ATT-107',
    employeeId: 'EMP-107',
    employeeName: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'EV Telematics Engineer',
    department: 'Technology',
    status: 'LATE',
    firstCheckIn: '09:40 AM',
    lastCheckOut: '06:50 PM',
    totalWorkingHours: 9.1,
    attendancePercentage: 84,
    date: 'Aug 06, 2026',
    shiftName: 'Engineering Shift (09:00 AM - 06:00 PM)',
    sessions: [
      {
        id: 'SES-6',
        checkInTime: '09:40 AM',
        checkOutTime: '06:50 PM',
        durationHours: 9.1,
        deviceType: 'BIOMETRIC_TERMINAL',
        locationGps: 'R&D Battery Lab Terminal',
      },
    ],
  },
  {
    id: 'ATT-108',
    employeeId: 'EMP-108',
    employeeName: 'Divya Teja',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    role: 'Battery Systems Tech Lead',
    department: 'Fleet Operations',
    status: 'LEAVE',
    firstCheckIn: '--:--',
    lastCheckOut: '--:--',
    totalWorkingHours: 0,
    attendancePercentage: 92,
    date: 'Aug 06, 2026',
    shiftName: 'Operations Shift (08:30 AM - 05:30 PM)',
    sessions: [],
  },
];

const STORAGE_KEY = 'icc_tms_attendance_records_v3';
export const EVENT_ATTENDANCE_UPDATED = 'innovibe:attendance_updated';

function getStoredAttendanceRecords(): AttendanceRecord[] {
  if (typeof window === 'undefined') return mockAttendanceRecords;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAttendanceRecords));
    return mockAttendanceRecords;
  } catch (e) {
    return mockAttendanceRecords;
  }
}

function saveStoredAttendanceRecords(records: AttendanceRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent(EVENT_ATTENDANCE_UPDATED, { detail: records }));
  } catch (e) {}
}

export class AttendanceService {
  /**
   * Subscribe to live attendance changes across components and windows
   */
  static onAttendanceUpdated(callback: (records: AttendanceRecord[]) => void): () => void {
    if (typeof window === 'undefined') return () => {};
    const handler = () => {
      AttendanceService.getAttendanceRecords().then(callback);
    };
    window.addEventListener(EVENT_ATTENDANCE_UPDATED, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_ATTENDANCE_UPDATED, handler);
      window.removeEventListener('storage', handler);
    };
  }

  /**
   * Record punch in/out from employee dashboard
   */
  static async recordPunch(record: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    const list = getStoredAttendanceRecords();
    const idx = list.findIndex((r) => r.employeeId === record.employeeId || r.employeeName.includes('Sri Varun'));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...record };
    } else {
      const newRec: AttendanceRecord = {
        id: `ATT-${Date.now()}`,
        employeeId: record.employeeId || 'EMP-102',
        employeeName: record.employeeName || 'Sri Varun Tej Chavitina',
        avatar: record.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: record.role || 'Information Technology Intern',
        department: record.department || 'Technology',
        status: record.status || 'PRESENT',
        firstCheckIn: record.firstCheckIn || '09:00 AM',
        lastCheckOut: record.lastCheckOut || '--:--',
        totalWorkingHours: record.totalWorkingHours || 8.0,
        attendancePercentage: 100,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        shiftName: 'General Shift (09:00 AM - 06:00 PM)',
        sessions: [],
        ...record,
      };
      list.unshift(newRec);
    }
    saveStoredAttendanceRecords(list);
    return list[idx >= 0 ? idx : 0];
  }

  /**
   * Fetch attendance records with multi-dimensional filtering
   */
  static async getAttendanceRecords(filters?: AttendanceFilterParams): Promise<AttendanceRecord[]> {
    let result = getStoredAttendanceRecords();

    if (!filters) return result;

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(q) ||
          r.role.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q) ||
          r.employeeId.toLowerCase().includes(q)
      );
    }

    if (filters.department && filters.department !== 'ALL') {
      result = result.filter((r) => r.department === filters.department);
    }

    if (filters.role && filters.role !== 'ALL') {
      result = result.filter((r) => r.role === filters.role);
    }

    if (filters.status && filters.status !== 'ALL') {
      result = result.filter((r) => r.status === filters.status);
    }

    return result;
  }

  /**
   * Fetch attendance KPIs
   */
  static async getAttendanceKpis(): Promise<AttendanceKpis> {
    const list = getStoredAttendanceRecords();
    const present = list.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length;
    const late = list.filter((r) => r.status === 'LATE').length;
    const absent = list.filter((r) => r.status === 'ABSENT').length;
    const leave = list.filter((r) => r.status === 'LEAVE').length;
    const wfh = list.filter((r) => r.status === 'WORK_FROM_HOME').length;

    return {
      totalStrength: 148,
      presentToday: 139 + present,
      includesLateCount: late + 5,
      lateCheckIns: 8 + late,
      absentToday: Math.max(0, 9 - present),
      leaveToday: leave + 3,
      wfhToday: wfh + 4,
    };
  }

  /**
   * Fetch full attendance profile details for modal
   */
  static async getAttendanceProfile(employeeId: string): Promise<AttendanceProfileDetails | null> {
    const record = mockAttendanceRecords.find((r) => r.employeeId === employeeId) || mockAttendanceRecords[0];

    return {
      record,
      monthlyCalendar: Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        date: `Aug ${String(i + 1).padStart(2, '0')}, 2026`,
        status: i % 7 === 0 ? 'WEEKEND' : i === 5 ? 'LATE' : i === 12 ? 'LEAVE' : 'PRESENT',
        hours: i % 7 === 0 ? 0 : 9.5,
      })),
      lateReports: [
        { date: 'Aug 06, 2026', delayMinutes: 22, reason: 'Traffic delay on Vijayawada Express Highway' },
        { date: 'Jul 24, 2026', delayMinutes: 15, reason: 'Weather delay' },
      ],
      leaveHistory: [
        { date: 'Jul 12, 2026', type: 'Casual Leave (PTO)', status: 'APPROVED' },
        { date: 'Jun 05, 2026', type: 'Sick Leave', status: 'APPROVED' },
      ],
      gpsCheckIns: [
        { time: '08:45 AM', locationName: 'Vijayawada HQ Executive Entrance', lat: 16.5062, lng: 80.648 },
        { time: '01:15 PM', locationName: 'HQ Cafeteria Terminal', lat: 16.5065, lng: 80.6482 },
      ],
      auditLogs: [
        { timestamp: 'Aug 06, 2026, 08:45:12 AM', action: 'Biometric fingerprint verified at Terminal #01', performedBy: 'System Gatekeeper' },
        { timestamp: 'Aug 06, 2026, 07:30:45 PM', action: 'Exit checkout verified via Face ID', performedBy: 'System Gatekeeper' },
      ],
    };
  }

  /**
   * Export Attendance Report (PDF, Excel, CSV)
   */
  static async exportAttendanceReport(format: 'PDF' | 'EXCEL' | 'CSV', params: AttendanceFilterParams): Promise<ExportJob> {
    return {
      format,
      department: params.department || 'ALL',
      dateRange: params.dateRangeSelection || 'TODAY',
      status: params.status || 'ALL',
      downloadUrl: '#export-download',
    };
  }
}
