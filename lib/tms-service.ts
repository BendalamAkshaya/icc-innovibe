/**
 * Task Management System (TMS) Service Layer
 * Enterprise API abstraction layer connecting UI components with centralized repositories/backend APIs.
 */

import {
  Task,
  TaskKpis,
  TaskFilterParams,
  CreateTaskPayload,
  TaskDiscussionMessage,
  TaskActivityHistory,
  Employee,
  Department,
} from './tms-models';

const mockEmployees: Employee[] = [
  {
    id: 'EMP-101',
    name: 'Sri Hari Kolusu',
    role: 'Founder & CEO (Admin)',
    department: 'Executive Office',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'ceo@innovibe.in',
  },
  {
    id: 'EMP-102',
    name: 'Ananya Sharma',
    role: 'HR Director',
    department: 'Human Resources',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'ananya.s@innovibe.in',
  },
  {
    id: 'EMP-103',
    name: 'Vikram Mehta',
    role: 'Talent Acquisition Lead',
    department: 'Human Resources',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'vikram.m@innovibe.in',
  },
  {
    id: 'EMP-104',
    name: 'Rajesh Kumar',
    role: 'Fleet Operations Lead',
    department: 'Fleet Operations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'rajesh.k@innovibe.in',
  },
  {
    id: 'EMP-105',
    name: 'Srinivas Rao',
    role: 'Tech & Systems Architect',
    department: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    email: 'srinivas.r@innovibe.in',
  },
];

const mockDepartments: Department[] = [
  { id: 'DEP-1', name: 'Executive Office', code: 'EXEC', headcount: 4 },
  { id: 'DEP-2', name: 'Human Resources', code: 'HR', headcount: 14 },
  { id: 'DEP-3', name: 'Fleet Operations', code: 'OPS', headcount: 56 },
  { id: 'DEP-4', name: 'Technology', code: 'TECH', headcount: 42 },
];

let mockTasks: Task[] = [
  {
    id: 'TMS-801',
    title: 'Q3 Executive HR Performance & Compensation Audit',
    description:
      'Perform detailed cross-departmental compensation audit and verify zero back-office performance metrics before Q3 board review.',
    category: 'HR_COMPLIANCE',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    department: 'Human Resources',
    owner: mockEmployees[0],
    assignee: mockEmployees[1],
    collaborators: [
      { id: 'EMP-103', name: 'Vikram Mehta', role: 'Talent Lead', avatar: mockEmployees[2].avatar, status: 'ACTIVE' },
      { id: 'EMP-105', name: 'Srinivas Rao', role: 'Tech Lead', avatar: mockEmployees[4].avatar, status: 'REVIEWING' },
    ],
    subtasks: [
      { id: 'ST-1', title: 'Compile salary benchmarks from HR portal', completed: true },
      { id: 'ST-2', title: 'Verify telemetry technician bonus multipliers', completed: true },
      { id: 'ST-3', title: 'Submit final executive report for CEO signoff', completed: false },
    ],
    progressPercent: 65,
    timeline: {
      createdDate: 'Aug 01, 2026',
      targetDeadline: 'Aug 10, 2026',
    },
    attachments: [
      { id: 'ATT-1', filename: 'HR_Compensation_Audit_Draft.pdf', size: '2.4 MB', url: '#', mimeType: 'application/pdf', uploadedAt: 'Aug 02, 2026' },
    ],
    discussionCount: 5,
    assignedToMe: false,
    assignedByMe: true,
  },
  {
    id: 'TMS-802',
    title: 'Senior EV Telematics Engineer Recruitment & Onboarding',
    description:
      'Accelerate hiring pipeline for 3 Senior Telematics Engineers specializing in real-time BMS diagnostic algorithms.',
    category: 'TECH_INFRA',
    priority: 'HIGH',
    status: 'UNDER_REVIEW',
    department: 'Technology',
    owner: mockEmployees[0],
    assignee: mockEmployees[2],
    collaborators: [
      { id: 'EMP-105', name: 'Srinivas Rao', role: 'Systems Architect', avatar: mockEmployees[4].avatar, status: 'ACTIVE' },
    ],
    subtasks: [
      { id: 'ST-4', title: 'Screen top 10 candidates with technical assessment', completed: true },
      { id: 'ST-5', title: 'Conduct final culture & technical round', completed: true },
      { id: 'ST-6', title: 'Issue formal offer letters and NDA agreements', completed: false },
    ],
    progressPercent: 85,
    timeline: {
      createdDate: 'Jul 28, 2026',
      targetDeadline: 'Aug 12, 2026',
    },
    attachments: [
      { id: 'ATT-2', filename: 'Telematics_Engineer_JD_V2.pdf', size: '1.1 MB', url: '#', mimeType: 'application/pdf', uploadedAt: 'Jul 29, 2026' },
    ],
    discussionCount: 8,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-803',
    title: 'Zero Back-Office Operations Staff Workload Rebalancing',
    description:
      'Rebalance shift allocations across Vijayawada, Guntur, and Vizag hubs to maintain 100% telemetry uptime.',
    category: 'OPERATIONS',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    department: 'Fleet Operations',
    owner: mockEmployees[1],
    assignee: mockEmployees[3],
    collaborators: [
      { id: 'EMP-104', name: 'Rajesh Kumar', role: 'Fleet Lead', avatar: mockEmployees[3].avatar, status: 'ACTIVE' },
    ],
    subtasks: [
      { id: 'ST-7', title: 'Analyze shift density and battery swap loads', completed: true },
      { id: 'ST-8', title: 'Reallocate 8 mobile service technicians', completed: false },
    ],
    progressPercent: 40,
    timeline: {
      createdDate: 'Aug 03, 2026',
      targetDeadline: 'Aug 15, 2026',
    },
    attachments: [],
    discussionCount: 3,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-804',
    title: 'Quarterly Employee Satisfaction & Mobility Safety Survey',
    description:
      'Deploy automated survey via ICC Mobile App to all field technicians and service managers to record feedback.',
    category: 'HR_COMPLIANCE',
    priority: 'LOW',
    status: 'OPEN',
    department: 'Human Resources',
    owner: mockEmployees[0],
    assignee: mockEmployees[1],
    collaborators: [],
    subtasks: [
      { id: 'ST-9', title: 'Draft survey questionnaire with safety committee', completed: false },
    ],
    progressPercent: 10,
    timeline: {
      createdDate: 'Aug 05, 2026',
      targetDeadline: 'Aug 20, 2026',
    },
    attachments: [],
    discussionCount: 1,
    assignedToMe: false,
    assignedByMe: true,
  },
  {
    id: 'TMS-805',
    title: 'Service Manager Attendance & KPI Verification Automated Pipeline',
    description:
      'Build automated script to ingest biometric check-ins directly into HR payroll calculation engine.',
    category: 'TECH_INFRA',
    priority: 'HIGH',
    status: 'COMPLETED',
    department: 'Technology',
    owner: mockEmployees[0],
    assignee: mockEmployees[4],
    collaborators: [
      { id: 'EMP-102', name: 'Ananya Sharma', role: 'HR Director', avatar: mockEmployees[1].avatar, status: 'COMPLETED' },
    ],
    subtasks: [
      { id: 'ST-10', title: 'Test API webhook with biometric terminal', completed: true },
      { id: 'ST-11', title: 'Deploy automated reconciliation microservice', completed: true },
    ],
    progressPercent: 100,
    timeline: {
      createdDate: 'Jul 20, 2026',
      targetDeadline: 'Aug 04, 2026',
      completedDate: 'Aug 04, 2026',
    },
    attachments: [
      { id: 'ATT-3', filename: 'Attendance_API_Documentation.pdf', size: '3.8 MB', url: '#', mimeType: 'application/pdf', uploadedAt: 'Jul 22, 2026' },
    ],
    discussionCount: 12,
    assignedToMe: false,
    assignedByMe: true,
  },
];

const mockDiscussions: Record<string, TaskDiscussionMessage[]> = {
  'TMS-801': [
    {
      id: 'MSG-1',
      taskId: 'TMS-801',
      author: 'Sri Hari Kolusu',
      authorRole: 'Founder & CEO (Admin)',
      avatar: mockEmployees[0].avatar,
      message: 'Ananya, please double check the technician bonus multipliers for Q3 before we finalize compensation.',
      timestamp: 'Yesterday at 4:15 PM',
    },
    {
      id: 'MSG-2',
      taskId: 'TMS-801',
      author: 'Ananya Sharma',
      authorRole: 'HR Director',
      avatar: mockEmployees[1].avatar,
      message: 'Understood, Sri Hari. I have reconciled the Vijayawada hub logs and updated the draft spreadsheet.',
      timestamp: 'Today at 9:30 AM',
    },
  ],
};

const mockHistory: Record<string, TaskActivityHistory[]> = {
  'TMS-801': [
    { id: 'HIST-1', taskId: 'TMS-801', user: 'Sri Hari Kolusu', userRole: 'Founder & CEO', action: 'Created task and assigned to Ananya Sharma', timestamp: 'Aug 01, 2026, 10:00 AM' },
    { id: 'HIST-2', taskId: 'TMS-801', user: 'Ananya Sharma', userRole: 'HR Director', action: 'Updated progress to 65% and uploaded compensation draft', timestamp: 'Aug 02, 2026, 02:45 PM' },
  ],
};

export class TmsTaskService {
  /**
   * Fetch tasks filtered by params
   */
  static async getTasks(filters?: TaskFilterParams): Promise<Task[]> {
    let result = [...mockTasks];

    if (!filters) return result;

    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.assignee.name.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }

    if (filters.status && filters.status !== 'ALL') {
      result = result.filter((t) => t.status === filters.status);
    }

    if (filters.priority && filters.priority !== 'ALL') {
      result = result.filter((t) => t.priority === filters.priority);
    }

    if (filters.category && filters.category !== 'ALL') {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.department && filters.department !== 'ALL') {
      result = result.filter((t) => t.department === filters.department);
    }

    if (filters.segment && filters.segment !== 'ALL') {
      switch (filters.segment) {
        case 'ASSIGNED_TO_ME':
          result = result.filter((t) => t.assignedToMe || t.assignee.id === 'EMP-102');
          break;
        case 'ASSIGNED_BY_ME':
          result = result.filter((t) => t.assignedByMe || t.owner.id === 'EMP-101');
          break;
        case 'PENDING_ACTIONS':
          result = result.filter((t) => t.status === 'UNDER_REVIEW' || t.status === 'OPEN');
          break;
        case 'OVERDUE':
          result = result.filter((t) => t.status === 'OVERDUE');
          break;
        case 'ACHIEVEMENTS':
          result = result.filter((t) => t.status === 'COMPLETED');
          break;
      }
    }

    return result;
  }

  /**
   * Fetch single task details by ID
   */
  static async getTaskById(id: string): Promise<Task | null> {
    return mockTasks.find((t) => t.id === id) || null;
  }

  /**
   * Create new task
   */
  static async createTask(payload: CreateTaskPayload): Promise<Task> {
    const newId = `TMS-${Math.floor(800 + Math.random() * 100)}`;
    const assigneeObj = mockEmployees.find((e) => e.id === payload.assigneeId) || mockEmployees[1];

    const newTask: Task = {
      id: newId,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      priority: payload.priority,
      status: 'OPEN',
      department: payload.department || assigneeObj.department,
      owner: mockEmployees[0], // Logged in CEO
      assignee: assigneeObj,
      collaborators: [],
      subtasks: (payload.subtaskTitles || []).map((t, i) => ({ id: `ST-${newId}-${i}`, title: t, completed: false })),
      progressPercent: 0,
      timeline: {
        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        targetDeadline: payload.deadline || 'Aug 25, 2026',
      },
      attachments: [],
      discussionCount: 0,
      assignedByMe: true,
    };

    mockTasks.unshift(newTask);
    mockDiscussions[newId] = [];
    mockHistory[newId] = [
      {
        id: `HIST-${Date.now()}`,
        taskId: newId,
        user: mockEmployees[0].name,
        userRole: mockEmployees[0].role,
        action: `Created task and assigned to ${assigneeObj.name}`,
        timestamp: new Date().toLocaleString(),
      },
    ];

    return newTask;
  }

  /**
   * Update task fields / status
   */
  static async updateTask(id: string, patch: Partial<Task>): Promise<Task | null> {
    const idx = mockTasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    mockTasks[idx] = { ...mockTasks[idx], ...patch };
    return mockTasks[idx];
  }

  /**
   * Delete task
   */
  static async deleteTask(id: string): Promise<boolean> {
    mockTasks = mockTasks.filter((t) => t.id !== id);
    delete mockDiscussions[id];
    delete mockHistory[id];
    return true;
  }

  /**
   * Get KPI summary
   */
  static async getTaskKpis(): Promise<TaskKpis> {
    return {
      totalTasks: mockTasks.length,
      assignedToMe: mockTasks.filter((t) => t.assignedToMe || t.assignee.id === 'EMP-102').length,
      assignedByMe: mockTasks.filter((t) => t.assignedByMe || t.owner.id === 'EMP-101').length,
      pendingTasks: mockTasks.filter((t) => t.status === 'IN_PROGRESS' || t.status === 'OPEN').length,
      completedTasks: mockTasks.filter((t) => t.status === 'COMPLETED').length,
      overdueTasks: mockTasks.filter((t) => t.status === 'OVERDUE').length,
    };
  }

  /**
   * Fetch employee roster
   */
  static async getEmployees(): Promise<Employee[]> {
    return mockEmployees;
  }

  /**
   * Fetch departments list
   */
  static async getDepartments(): Promise<Department[]> {
    return mockDepartments;
  }

  /**
   * Discussion Messages
   */
  static async getTaskComments(taskId: string): Promise<TaskDiscussionMessage[]> {
    return mockDiscussions[taskId] || [];
  }

  static async addComment(taskId: string, message: string): Promise<TaskDiscussionMessage> {
    const newMsg: TaskDiscussionMessage = {
      id: `MSG-${Date.now()}`,
      taskId,
      author: mockEmployees[0].name,
      authorRole: mockEmployees[0].role,
      avatar: mockEmployees[0].avatar,
      message,
      timestamp: 'Just now',
    };

    if (!mockDiscussions[taskId]) mockDiscussions[taskId] = [];
    mockDiscussions[taskId].push(newMsg);

    // Increment discussion count on task
    const task = mockTasks.find((t) => t.id === taskId);
    if (task) task.discussionCount += 1;

    return newMsg;
  }

  /**
   * Task Activity History
   */
  static async getTaskHistory(taskId: string): Promise<TaskActivityHistory[]> {
    return mockHistory[taskId] || [];
  }
}
