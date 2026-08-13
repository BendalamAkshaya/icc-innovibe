/**
 * Task Management System (TMS) - Logout Reports Repository & Browser Storage Persistence Layer
 * Implements local persistence using browser localStorage with work session seed data.
 */

import { WorkSession, SubmitWorkReportPayload, LogoutFilterParams, LogoutKpis } from './logout-models';

const STORAGE_KEY = 'ICC_TMS_LOGOUT_REPORTS_PERSISTENCE_V1';

const seedWorkSessions: WorkSession[] = [
  {
    id: 'SES-901',
    employeeId: 'EMP-101',
    employeeName: 'Sri Hari Kolusu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-100',
    departmentName: 'Executive Office',
    role: 'Founder & CEO (Admin)',
    loginTime: '08:45 AM',
    logoutTime: '07:30 PM',
    status: 'LOGGED_OUT',
    duration: '10.75 hrs',
    date: 'Aug 06, 2026',
    reportSubmitted: true,
    workReport: {
      workSummary: 'Conducted executive quarterly review with board members, finalized fleet telemetry roadmap, and signed off on HR department expansion budgets.',
      tasksCompleted: [
        'Approved Q3 EV telematics hardware budget',
        'Reviewed TMS Employees and Attendance module architectures',
        'Signed off on Vijayawada Hub expansion agreement',
      ],
      pendingTasks: ['Finalize COO performance metrics', 'Approve Q4 investor deck'],
      challengesBlockers: 'Minor delay in chip supply chain delivery from overseas vendor.',
      timeNotes: 'Spent 4 hrs in strategic meetings, 3 hrs reviewing code architecture, 3.75 hrs in executive desk work.',
      additionalNotes: 'Great overall velocity across engineering and operations teams today.',
      submittedAt: '07:30 PM',
      logoutMethod: 'MANUAL_LOGOUT',
    },
    createdAt: 'Aug 06, 2026',
    updatedAt: 'Aug 06, 2026',
  },
  {
    id: 'SES-902',
    employeeId: 'EMP-102',
    employeeName: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'HR Director',
    loginTime: '08:55 AM',
    logoutTime: '06:45 PM',
    status: 'LOGGED_OUT',
    duration: '9.8 hrs',
    date: 'Aug 06, 2026',
    reportSubmitted: true,
    workReport: {
      workSummary: 'Completed full HR onboarding interviews for 4 senior candidates, updated employee benefits policy draft, and reviewed leave requests.',
      tasksCompleted: [
        'Conducted 4 technical HR interviews',
        'Processed 3 employee leave approval applications',
        'Finalized HR payroll compliance documentation',
      ],
      pendingTasks: ['Schedule quarterly performance reviews', 'Update intern stipend guidelines'],
      challengesBlockers: 'None experienced today.',
      timeNotes: '5 hrs candidate interviews, 3 hrs compliance audit, 1.8 hrs administrative documentation.',
      additionalNotes: 'All pending leave requests processed smoothly.',
      submittedAt: '06:45 PM',
      logoutMethod: 'MANUAL_LOGOUT',
    },
    createdAt: 'Aug 06, 2026',
    updatedAt: 'Aug 06, 2026',
  },
  {
    id: 'SES-903',
    employeeId: 'EMP-104',
    employeeName: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-102',
    departmentName: 'Operations',
    role: 'Fleet Operations Lead',
    loginTime: '08:30 AM',
    logoutTime: '06:15 PM',
    status: 'LOGGED_OUT',
    duration: '9.75 hrs',
    date: 'Aug 06, 2026',
    reportSubmitted: true,
    workReport: {
      workSummary: 'Inspected 24 EV fleet vehicles at central depot, resolved charging terminal firmware glitch, and supervised field drivers.',
      tasksCompleted: [
        'Fleet inspection report filed for 24 EV units',
        'Resolved Hub #3 fast-charger communication error',
        'Updated shift rosters for night-duty technicians',
      ],
      pendingTasks: ['Procure replacement battery packs for Fleet Unit #12'],
      challengesBlockers: 'Temporary power surge at Charging Station #2.',
      timeNotes: '6 hrs physical depot inspection, 3.75 hrs driver coordination.',
      additionalNotes: 'Zero vehicle breakdowns reported today.',
      submittedAt: '06:15 PM',
      logoutMethod: 'MANUAL_LOGOUT',
    },
    createdAt: 'Aug 06, 2026',
    updatedAt: 'Aug 06, 2026',
  },
  {
    id: 'SES-904',
    employeeId: 'EMP-105',
    employeeName: 'Srinivas Rao',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-104',
    departmentName: 'Internet of Things',
    role: 'Tech & Systems Architect',
    loginTime: '09:00 AM',
    logoutTime: '07:15 PM',
    status: 'LOGGED_OUT',
    duration: '10.25 hrs',
    date: 'Aug 06, 2026',
    reportSubmitted: true,
    workReport: {
      workSummary: 'Architected high-throughput MQTT telematics ingestion engine, benchmarked database latency, and performed code reviews.',
      tasksCompleted: [
        'Deployed MQTT broker clustering for 100k vehicle pings',
        'Optimized PostgreSQL query index latency by 45%',
        'Reviewed 8 pull requests for IoT microservices',
      ],
      pendingTasks: ['Integrate CAN-bus CANopen parser library'],
      challengesBlockers: 'High memory consumption during peak load test.',
      timeNotes: '7 hrs backend architecture & coding, 3.25 hrs team code reviews.',
      additionalNotes: 'Telemetry pipeline stability verified at 99.99%.',
      submittedAt: '07:15 PM',
      logoutMethod: 'MANUAL_LOGOUT',
    },
    createdAt: 'Aug 06, 2026',
    updatedAt: 'Aug 06, 2026',
  },
  {
    id: 'SES-905',
    employeeId: 'EMP-107',
    employeeName: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-104',
    departmentName: 'Internet of Things',
    role: 'EV Telematics Engineer',
    loginTime: '09:15 AM',
    logoutTime: undefined,
    status: 'AUTO_CLOSED',
    duration: '8.0 hrs',
    date: 'Aug 06, 2026',
    reportSubmitted: false,
    workReport: {
      workSummary: 'No detailed work report was submitted. System-generated report due to automatic session closure.',
      tasksCompleted: ['None reported'],
      pendingTasks: ['None reported'],
      challengesBlockers: 'None reported',
      timeNotes: 'None reported',
      additionalNotes: 'This session was closed automatically because the browser was closed or logout was not completed.',
      submittedAt: '05:15 PM',
      logoutMethod: 'AUTO_CLOSED',
    },
    createdAt: 'Aug 06, 2026',
    updatedAt: 'Aug 06, 2026',
  },
  {
    id: 'SES-906',
    employeeId: 'EMP-103',
    employeeName: 'Vikram Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'DEP-101',
    departmentName: 'Human Resources',
    role: 'Talent Acquisition Lead',
    loginTime: '09:10 AM',
    logoutTime: undefined,
    status: 'ACTIVE',
    duration: 'Active Now',
    date: 'Aug 06, 2026',
    reportSubmitted: false,
    createdAt: 'Aug 06, 2026',
    updatedAt: 'Aug 06, 2026',
  },
];

export class LogoutRepository {
  private static loadFromStorage(): WorkSession[] {
    if (typeof window === 'undefined') return seedWorkSessions;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw || raw.trim() === '' || raw === 'undefined' || raw === 'null') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWorkSessions));
        return seedWorkSessions;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWorkSessions));
        return seedWorkSessions;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read work sessions from localStorage, re-seeding:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWorkSessions));
      } catch (err) {}
      return seedWorkSessions;
    }
  }

  private static saveToStorage(data: WorkSession[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save work sessions to localStorage:', e);
    }
  }

  static getWorkSessions(filters?: LogoutFilterParams): WorkSession[] {
    let list = this.loadFromStorage();

    if (!filters) return list;

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.employeeName.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.departmentName.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    if (filters.department && filters.department !== 'ALL') {
      list = list.filter((s) => s.departmentName === filters.department);
    }

    if (filters.status && filters.status !== 'ALL') {
      list = list.filter((s) => s.status === filters.status);
    }

    return list;
  }

  static getSessionById(id: string): WorkSession | null {
    const list = this.loadFromStorage();
    return list.find((s) => s.id === id) || null;
  }

  static startWorkSession(
    employeeId: string,
    employeeName: string,
    avatar: string,
    departmentId: string,
    departmentName: string,
    role: string
  ): WorkSession {
    const list = this.loadFromStorage();
    const newId = `SES-${Math.floor(900 + Math.random() * 100)}`;
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newSession: WorkSession = {
      id: newId,
      employeeId,
      employeeName,
      avatar,
      departmentId,
      departmentName,
      role,
      loginTime: currentTime,
      status: 'ACTIVE',
      duration: 'Active Now',
      date: currentDate,
      reportSubmitted: false,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    list.unshift(newSession);
    this.saveToStorage(list);
    return newSession;
  }

  static endWorkSession(payload: SubmitWorkReportPayload): WorkSession | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((s) => s.id === payload.sessionId);
    if (idx === -1) return null;

    const logoutTimeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const updated: WorkSession = {
      ...list[idx],
      logoutTime: logoutTimeStr,
      status: 'LOGGED_OUT',
      duration: '9.2 hrs',
      reportSubmitted: true,
      workReport: {
        workSummary: payload.workSummary,
        tasksCompleted: payload.tasksCompleted,
        pendingTasks: payload.pendingTasks,
        challengesBlockers: payload.challengesBlockers,
        timeNotes: payload.timeNotes,
        additionalNotes: payload.additionalNotes,
        submittedAt: logoutTimeStr,
        logoutMethod: payload.logoutMethod || 'MANUAL_LOGOUT',
      },
      updatedAt: currentDate,
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static autoCloseSession(id: string): WorkSession | null {
    const list = this.loadFromStorage();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const updated: WorkSession = {
      ...list[idx],
      status: 'AUTO_CLOSED',
      duration: '8.0 hrs',
      reportSubmitted: false,
      workReport: {
        workSummary: 'No detailed work report was submitted. System-generated report due to automatic session closure.',
        tasksCompleted: ['None reported'],
        pendingTasks: ['None reported'],
        challengesBlockers: 'None reported',
        timeNotes: 'None reported',
        additionalNotes: 'This session was closed automatically because the browser was closed or logout was not completed.',
        submittedAt: '06:00 PM',
        logoutMethod: 'AUTO_CLOSED',
      },
      updatedAt: currentDate,
    };

    list[idx] = updated;
    this.saveToStorage(list);
    return updated;
  }

  static getKpis(): LogoutKpis {
    const list = this.loadFromStorage();
    return {
      totalSessionsToday: list.length,
      activeSessions: list.filter((s) => s.status === 'ACTIVE').length,
      reportsSubmittedToday: list.filter((s) => s.reportSubmitted).length,
      autoClosedCount: list.filter((s) => s.status === 'AUTO_CLOSED').length,
      averageWorkingHours: 9.6,
    };
  }
}
