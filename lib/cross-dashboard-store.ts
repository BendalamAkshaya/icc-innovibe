// Central Reactive Cross-Dashboard State Store
// Synchronizes Service Tickets, Spare Parts Requests, Attendance, and Logout Reports across all 6 dashboards in real-time.

import { ServiceTicket, Technician } from './types';
import { mockServiceTickets, mockTechnicians } from './mock-data';

export interface LiveSpareRequest {
  id: string;
  part: string;
  partCode?: string;
  qty: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'APPROVED' | 'ISSUED' | 'REJECTED' | 'COMPLETED';
  date: string;
  technicianName: string;
  jobId: string;
  vehicleModel?: string;
  depotLocation?: string;
  unitCost?: string;
  issuedSerials?: string[];
}

export interface LiveAttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'ACTIVE' | 'PRESENT' | 'LATE' | 'HALF_DAY' | 'ON_LEAVE';
  hours: string;
  location?: string;
}

export interface LiveLogoutReport {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  submittedAt: string;
  tasksCompleted: number;
  totalHours: string;
  summary: string;
  blockers: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
}

const SPARES_STORAGE_KEY = 'innovibe_live_spare_requests';
const TICKETS_STORAGE_KEY = 'innovibe_live_service_tickets';
const ATTENDANCE_STORAGE_KEY = 'innovibe_live_attendance_logs';
const LOGOUT_STORAGE_KEY = 'innovibe_live_logout_reports';

const EVENT_SPARES_UPDATED = 'innovibe:spares_updated';
const EVENT_TICKETS_UPDATED = 'innovibe:tickets_updated';
const EVENT_ATTENDANCE_UPDATED = 'innovibe:attendance_updated';
const EVENT_LOGOUT_UPDATED = 'innovibe:logout_updated';

// Initial Spare Requests
const defaultSpareRequests: LiveSpareRequest[] = [
  {
    id: 'REQ-409',
    part: 'Ather 450X Front Brake Caliper Set',
    partCode: 'CAL-ATH-450-F',
    qty: 1,
    priority: 'HIGH',
    status: 'APPROVED',
    date: 'Today, 10:15 AM',
    technicianName: 'Rahul Sharma',
    jobId: 'BK-2026-0001',
    vehicleModel: 'Ather 450X Apex',
    depotLocation: 'Bengaluru Central Hub',
    unitCost: '₹3,400',
    issuedSerials: ['SN-CAL-450-9921'],
  },
  {
    id: 'REQ-398',
    part: 'Ola S1 Pro Battery BMS Board v2',
    partCode: 'BMS-OLA-S1-V2',
    qty: 1,
    priority: 'CRITICAL',
    status: 'ISSUED',
    date: '22 Jul 2026',
    technicianName: 'Rahul Sharma',
    jobId: 'BK-2026-0003',
    vehicleModel: 'Ola S1 Pro Gen2',
    depotLocation: 'Hyderabad Express Hub',
    unitCost: '₹6,800',
    issuedSerials: ['SN-BMS-S1-4011'],
  },
  {
    id: 'REQ-382',
    part: 'TVS iQube Throttle Position Sensor',
    partCode: 'TPS-TVS-IQ-01',
    qty: 2,
    priority: 'MEDIUM',
    status: 'COMPLETED',
    date: '15 Jul 2026',
    technicianName: 'Amit Verma',
    jobId: 'BK-2026-0002',
    vehicleModel: 'TVS iQube ST',
    depotLocation: 'Delhi NCR Mega Hub',
    unitCost: '₹1,250',
    issuedSerials: ['SN-TPS-091', 'SN-TPS-092'],
  },
];

// Helper to safely access localStorage in Next.js SSR
const isBrowser = typeof window !== 'undefined';

class CrossDashboardStore {
  // -------------------------------------------------------------
  // SPARE PARTS REQUESTS (Technician ↔ COO Procurement)
  // -------------------------------------------------------------
  public getSpareRequests(): LiveSpareRequest[] {
    if (!isBrowser) return defaultSpareRequests;
    try {
      const stored = localStorage.getItem(SPARES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(SPARES_STORAGE_KEY, JSON.stringify(defaultSpareRequests));
      return defaultSpareRequests;
    } catch {
      return defaultSpareRequests;
    }
  }

  public addSpareRequest(req: Omit<LiveSpareRequest, 'id' | 'date' | 'status'> & { id?: string }): LiveSpareRequest {
    const list = this.getSpareRequests();
    const newReq: LiveSpareRequest = {
      id: req.id || `REQ-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Just now',
      status: 'PENDING',
      ...req,
    };
    const updated = [newReq, ...list];
    if (isBrowser) {
      localStorage.setItem(SPARES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_SPARES_UPDATED, { detail: newReq }));
    }
    return newReq;
  }

  public updateSpareRequestStatus(
    id: string,
    status: LiveSpareRequest['status'],
    issuedSerials?: string[]
  ): LiveSpareRequest | null {
    const list = this.getSpareRequests();
    let updatedItem: LiveSpareRequest | null = null;
    const updated = list.map((item) => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          status,
          issuedSerials: issuedSerials || item.issuedSerials,
        };
        return updatedItem;
      }
      return item;
    });

    if (isBrowser && updatedItem) {
      localStorage.setItem(SPARES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_SPARES_UPDATED, { detail: updatedItem }));
    }
    return updatedItem;
  }

  public onSparesUpdated(callback: (requests: LiveSpareRequest[]) => void): () => void {
    if (!isBrowser) return () => {};
    const handler = () => callback(this.getSpareRequests());
    window.addEventListener(EVENT_SPARES_UPDATED, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_SPARES_UPDATED, handler);
      window.removeEventListener('storage', handler);
    };
  }

  // -------------------------------------------------------------
  // SERVICE TICKETS (Service Manager ↔ Technician ↔ COO ↔ CEO)
  // -------------------------------------------------------------
  public getServiceTickets(): ServiceTicket[] {
    if (!isBrowser) return mockServiceTickets;
    try {
      const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(mockServiceTickets));
      return mockServiceTickets;
    } catch {
      return mockServiceTickets;
    }
  }

  public createServiceTicket(tkt: Omit<ServiceTicket, 'id' | 'ticketNumber' | 'createdAt'>): ServiceTicket {
    const list = this.getServiceTickets();
    const newTkt: ServiceTicket = {
      ...tkt,
      id: `tkt_${Date.now()}`,
      ticketNumber: `BK-2026-${String(list.length + 1).padStart(4, '0')}`,
      createdAt: 'Just now',
    };
    const updated = [newTkt, ...list];
    if (isBrowser) {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_TICKETS_UPDATED, { detail: newTkt }));
    }
    return newTkt;
  }

  public updateTicketStatus(
    ticketId: string,
    status: ServiceTicket['status'],
    assignedTechnician?: string,
    extra?: Partial<ServiceTicket>
  ): ServiceTicket | null {
    const list = this.getServiceTickets();
    let updatedItem: ServiceTicket | null = null;
    const updated = list.map((t) => {
      if (t.id === ticketId || t.ticketNumber === ticketId) {
        updatedItem = {
          ...t,
          status,
          ...(assignedTechnician ? { assignedTechnician } : {}),
          ...extra,
        };
        return updatedItem;
      }
      return t;
    });

    if (isBrowser && updatedItem) {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_TICKETS_UPDATED, { detail: updatedItem }));
    }
    return updatedItem;
  }

  public onTicketsUpdated(callback: (tickets: ServiceTicket[]) => void): () => void {
    if (!isBrowser) return () => {};
    const handler = () => callback(this.getServiceTickets());
    window.addEventListener(EVENT_TICKETS_UPDATED, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_TICKETS_UPDATED, handler);
      window.removeEventListener('storage', handler);
    };
  }

  // -------------------------------------------------------------
  // ATTENDANCE LOGS (Employee / Tech ↔ HR Attendance ↔ CEO TMS)
  // -------------------------------------------------------------
  public getAttendanceLogs(): LiveAttendanceRecord[] {
    const defaultLogs: LiveAttendanceRecord[] = [
      { id: 'att_1', employeeId: 'EMP-006', name: 'Rahul Sharma', role: 'Senior EV Technician', date: 'Today', checkIn: '08:30 AM', checkOut: '--:--', status: 'ACTIVE', hours: '8.2 hrs', location: 'Kakinada Hub' },
      { id: 'att_2', employeeId: 'EMP-007', name: 'Sneha Patel', role: 'Operations Specialist', date: 'Today', checkIn: '08:45 AM', checkOut: '--:--', status: 'ACTIVE', hours: '8.0 hrs', location: 'Headquarters' },
      { id: 'att_3', employeeId: 'EMP-004', name: 'Vikram Singh', role: 'Service Manager', date: 'Today', checkIn: '08:15 AM', checkOut: '--:--', status: 'ACTIVE', hours: '8.5 hrs', location: 'Kakinada Hub' },
      { id: 'att_4', employeeId: 'EMP-002', name: 'Rajesh Varma', role: 'Chief Operating Officer', date: 'Today', checkIn: '08:00 AM', checkOut: '--:--', status: 'ACTIVE', hours: '8.8 hrs', location: 'Executive Suite' },
    ];
    if (!isBrowser) return defaultLogs;
    try {
      const stored = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(defaultLogs));
      return defaultLogs;
    } catch {
      return defaultLogs;
    }
  }

  public recordPunchIn(record: Omit<LiveAttendanceRecord, 'id' | 'date' | 'status'>): LiveAttendanceRecord {
    const list = this.getAttendanceLogs();
    const newRecord: LiveAttendanceRecord = {
      id: `att_${Date.now()}`,
      date: 'Today',
      status: 'ACTIVE',
      ...record,
    };
    const updated = [newRecord, ...list.filter((l) => l.employeeId !== record.employeeId)];
    if (isBrowser) {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_ATTENDANCE_UPDATED, { detail: newRecord }));
    }
    return newRecord;
  }

  public onAttendanceUpdated(callback: (logs: LiveAttendanceRecord[]) => void): () => void {
    if (!isBrowser) return () => {};
    const handler = () => callback(this.getAttendanceLogs());
    window.addEventListener(EVENT_ATTENDANCE_UPDATED, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_ATTENDANCE_UPDATED, handler);
      window.removeEventListener('storage', handler);
    };
  }

  // -------------------------------------------------------------
  // DAILY LOGOUT REPORTS (Employee / Tech ↔ CEO TMS ↔ HR)
  // -------------------------------------------------------------
  public getLogoutReports(): LiveLogoutReport[] {
    const defaultReports: LiveLogoutReport[] = [
      {
        id: 'rep_001',
        employeeId: 'EMP-006',
        name: 'Rahul Sharma',
        role: 'Senior EV Technician',
        department: 'Service Operations',
        submittedAt: 'Today, 05:30 PM',
        tasksCompleted: 4,
        totalHours: '9.0 hrs',
        summary: 'Completed periodic service on Ather 450X (BK-2026-0001) and replaced BMS on Ola S1 (BK-2026-0003). Both road-tested successfully.',
        blockers: 'None. Spare parts issued on time by depot.',
        status: 'PENDING_REVIEW',
      },
      {
        id: 'rep_002',
        employeeId: 'EMP-007',
        name: 'Sneha Patel',
        role: 'Operations Specialist',
        department: 'Fleet Logistics',
        submittedAt: 'Today, 05:45 PM',
        tasksCompleted: 6,
        totalHours: '8.5 hrs',
        summary: 'Audited 148 connected fleet units telemetry logs. Flagged 3 units in Koramangala with low SOC (<15%) for charging hub swap.',
        blockers: 'Minor GPS packet delay on 2 Ather vehicles.',
        status: 'APPROVED',
      },
    ];
    if (!isBrowser) return defaultReports;
    try {
      const stored = localStorage.getItem(LOGOUT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(LOGOUT_STORAGE_KEY, JSON.stringify(defaultReports));
      return defaultReports;
    } catch {
      return defaultReports;
    }
  }

  public submitLogoutReport(report: Omit<LiveLogoutReport, 'id' | 'submittedAt' | 'status'>): LiveLogoutReport {
    const list = this.getLogoutReports();
    const newReport: LiveLogoutReport = {
      id: `rep_${Date.now()}`,
      submittedAt: 'Just now',
      status: 'PENDING_REVIEW',
      ...report,
    };
    const updated = [newReport, ...list];
    if (isBrowser) {
      localStorage.setItem(LOGOUT_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_LOGOUT_UPDATED, { detail: newReport }));
    }
    return newReport;
  }

  public approveLogoutReport(id: string): LiveLogoutReport | null {
    const list = this.getLogoutReports();
    let updatedItem: LiveLogoutReport | null = null;
    const updated = list.map((r) => {
      if (r.id === id) {
        updatedItem = { ...r, status: 'APPROVED' as const };
        return updatedItem;
      }
      return r;
    });
    if (isBrowser && updatedItem) {
      localStorage.setItem(LOGOUT_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_LOGOUT_UPDATED, { detail: updatedItem }));
    }
    return updatedItem;
  }

  public onLogoutReportsUpdated(callback: (reports: LiveLogoutReport[]) => void): () => void {
    if (!isBrowser) return () => {};
    const handler = () => callback(this.getLogoutReports());
    window.addEventListener(EVENT_LOGOUT_UPDATED, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_LOGOUT_UPDATED, handler);
      window.removeEventListener('storage', handler);
    };
  }
}

export const crossDashboardStore = new CrossDashboardStore();
