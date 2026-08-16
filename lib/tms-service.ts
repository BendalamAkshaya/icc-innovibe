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
    name: 'Srinivas Thalada',
    role: 'DEPARTMENT',
    department: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'srinivas.t@innovibe.in',
  },
  {
    id: 'EMP-102',
    name: 'Sri Varun Tej Chavitina',
    role: 'Information Technology Intern',
    department: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'varuntej@innovibe.in',
  },
  {
    id: 'EMP-103',
    name: 'Geetha Sowmya',
    role: 'Backend Engineer',
    department: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'geetha.s@innovibe.in',
  },
  {
    id: 'EMP-104',
    name: 'Bendalam Akshaya',
    role: 'Automation Engineer',
    department: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'akshaya.b@innovibe.in',
  },
  {
    id: 'EMP-105',
    name: 'Ananya Sharma',
    role: 'HR Director',
    department: 'Human Resources',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'ananya.s@innovibe.in',
  },
  {
    id: 'EMP-106',
    name: 'Rajesh Kumar',
    role: 'Fleet Operations Lead',
    department: 'Fleet Operations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'rajesh.k@innovibe.in',
  },
];

const mockDepartments: Department[] = [
  { id: 'DEP-1', name: 'Technology', code: 'TECH', headcount: 42 },
  { id: 'DEP-2', name: 'Human Resources', code: 'HR', headcount: 14 },
  { id: 'DEP-3', name: 'Fleet Operations', code: 'OPS', headcount: 56 },
  { id: 'DEP-4', name: 'Executive Office', code: 'EXEC', headcount: 4 },
  { id: 'DEP-5', name: 'Administration', code: 'ADMIN', headcount: 12 },
];

const initialTasksDataset: Task[] = [
  {
    id: 'TMS-901',
    title: 'ICC implementation from 0 level',
    description: 'crash the present icc and develop a new icc based on user based credentials',
    category: 'TECH_INFRA',
    priority: 'URGENT',
    status: 'OPEN',
    department: 'Technology',
    owner: mockEmployees[0],
    assignee: mockEmployees[1],
    collaborators: [
      { id: 'EMP-102', name: 'Sri Varun Tej Chavitina', role: 'IT Intern', avatar: mockEmployees[1].avatar, status: 'ACTIVE' },
    ],
    subtasks: [
      { id: 'ST-1', title: 'Setup Next.js 15 App Router architecture', completed: true },
      { id: 'ST-2', title: 'Implement Role-based Auth context & portal switcher', completed: true },
      { id: 'ST-3', title: 'Complete Employee Dashboard visual alignment', completed: true },
      { id: 'ST-4', title: 'Migrate TMS Tasks module seamlessly into ICC', completed: false },
    ],
    progressPercent: 75,
    timeline: {
      createdDate: 'Jul 20, 2026',
      targetDeadline: '26 Jul',
    },
    attachments: [
      { id: 'ATT-1', filename: 'ICC_Architecture_Blueprint.pdf', size: '3.2 MB', url: '#', mimeType: 'application/pdf', uploadedAt: 'Jul 21, 2026' },
    ],
    discussionCount: 4,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-902',
    title: 'update the screens',
    description: 'update the app screens',
    category: 'TECH_INFRA',
    priority: 'HIGH',
    status: 'COMPLETED',
    department: 'Technology',
    owner: mockEmployees[0],
    assignee: mockEmployees[1],
    collaborators: [
      { id: 'EMP-103', name: 'Geetha Sowmya', role: 'Backend Engineer', avatar: mockEmployees[2].avatar, status: 'COMPLETED' },
      { id: 'EMP-102', name: 'Sri Varun Tej Chavitina', role: 'IT Intern', avatar: mockEmployees[1].avatar, status: 'COMPLETED' },
      { id: 'EMP-104', name: 'Bendalam Akshaya', role: 'Automation Engineer', avatar: mockEmployees[3].avatar, status: 'COMPLETED' },
    ],
    subtasks: [
      { id: 'ST-5', title: 'Audit login screen layout scale', completed: true },
      { id: 'ST-6', title: 'Refine Employee Portal sidebar navigation', completed: true },
      { id: 'ST-7', title: 'Verify responsive grid layout on desktop', completed: true },
    ],
    progressPercent: 100,
    timeline: {
      createdDate: 'Jul 01, 2026',
      targetDeadline: '8 Jul',
      completedDate: '8 Jul',
    },
    attachments: [],
    discussionCount: 0,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-903',
    title: 'app redesign',
    description: 'redesigning the screens of the app',
    category: 'TECH_INFRA',
    priority: 'HIGH',
    status: 'COMPLETED',
    department: 'Technology',
    owner: mockEmployees[0],
    assignee: mockEmployees[1],
    collaborators: [],
    subtasks: [
      { id: 'ST-8', title: 'Redesign UI components to match enterprise design system', completed: true },
    ],
    progressPercent: 100,
    timeline: {
      createdDate: 'Jun 28, 2026',
      targetDeadline: '4 Jul',
      completedDate: '4 Jul',
    },
    attachments: [],
    discussionCount: 2,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-904',
    title: 'fleet dashboard',
    description: 'mention the add-ons for fleet dashboard',
    category: 'OPERATIONS',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    department: 'Fleet Operations',
    owner: mockEmployees[0],
    assignee: mockEmployees[1],
    collaborators: [
      { id: 'EMP-106', name: 'Rajesh Kumar', role: 'Fleet Operations Lead', avatar: mockEmployees[5].avatar, status: 'COMPLETED' },
    ],
    subtasks: [
      { id: 'ST-9', title: 'Define fleet telematics KPIs', completed: true },
    ],
    progressPercent: 100,
    timeline: {
      createdDate: 'Jun 25, 2026',
      targetDeadline: '30 Jun',
      completedDate: '30 Jun',
    },
    attachments: [],
    discussionCount: 1,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-905',
    title: 'Employee status - Inactive / Active',
    description: '15 marketing interns are completing their internship on 30th June 2026, instead of deleting their profile, give the option of making inactive',
    category: 'HR_COMPLIANCE',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    department: 'Administration',
    owner: mockEmployees[4],
    assignee: mockEmployees[1],
    collaborators: [],
    subtasks: [
      { id: 'ST-10', title: 'Add active/inactive status toggle to HR employee directory', completed: true },
    ],
    progressPercent: 100,
    timeline: {
      createdDate: 'Jun 20, 2026',
      targetDeadline: '30 Jun',
      completedDate: '30 Jun',
    },
    attachments: [],
    discussionCount: 3,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-906',
    title: 'Pending tasks',
    description: 'Complete Your pending tasks',
    category: 'TECH_INFRA',
    priority: 'HIGH',
    status: 'COMPLETED',
    department: 'Technology',
    owner: mockEmployees[0],
    assignee: mockEmployees[1],
    collaborators: [],
    subtasks: [
      { id: 'ST-11', title: 'Review open pull requests', completed: true },
    ],
    progressPercent: 100,
    timeline: {
      createdDate: 'Jun 15, 2026',
      targetDeadline: '29 Jun',
      completedDate: '29 Jun',
    },
    attachments: [],
    discussionCount: 0,
    assignedToMe: true,
    assignedByMe: false,
  },
  {
    id: 'TMS-907',
    title: 'Q3 Executive HR Performance & Compensation Audit',
    description: 'Perform detailed cross-departmental compensation audit and verify zero back-office performance metrics before Q3 board review.',
    category: 'HR_COMPLIANCE',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    department: 'Human Resources',
    owner: mockEmployees[4],
    assignee: mockEmployees[1],
    collaborators: [
      { id: 'EMP-105', name: 'Ananya Sharma', role: 'HR Director', avatar: mockEmployees[4].avatar, status: 'ACTIVE' },
    ],
    subtasks: [
      { id: 'ST-12', title: 'Compile salary benchmarks from HR portal', completed: true },
      { id: 'ST-13', title: 'Verify telemetry technician bonus multipliers', completed: true },
      { id: 'ST-14', title: 'Submit final report for executive signoff', completed: false },
    ],
    progressPercent: 65,
    timeline: {
      createdDate: 'Aug 01, 2026',
      targetDeadline: 'Aug 10, 2026',
    },
    attachments: [
      { id: 'ATT-2', filename: 'HR_Compensation_Audit_Draft.pdf', size: '2.4 MB', url: '#', mimeType: 'application/pdf', uploadedAt: 'Aug 02, 2026' },
    ],
    discussionCount: 5,
    assignedToMe: false,
    assignedByMe: true,
  },
];

// Helper to manage localStorage persistence
function getStoredTasks(): Task[] {
  if (typeof window === 'undefined') return initialTasksDataset;
  try {
    const data = localStorage.getItem('icc_tms_tasks_v3');
    if (data) return JSON.parse(data);
    localStorage.setItem('icc_tms_tasks_v3', JSON.stringify(initialTasksDataset));
    return initialTasksDataset;
  } catch (e) {
    return initialTasksDataset;
  }
}

function saveStoredTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('icc_tms_tasks_v3', JSON.stringify(tasks));
  } catch (e) {}
}

function getStoredDiscussions(): Record<string, TaskDiscussionMessage[]> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem('icc_tms_discussions_v3');
    if (data) return JSON.parse(data);
    const initialDiscussions: Record<string, TaskDiscussionMessage[]> = {
      'TMS-901': [
        {
          id: 'MSG-1',
          taskId: 'TMS-901',
          author: 'Srinivas Thalada',
          authorRole: 'DEPARTMENT',
          avatar: mockEmployees[0].avatar,
          message: 'Sri Varun, please ensure all task sub-views are migrated without dropping existing business logic.',
          timestamp: 'Yesterday at 4:15 PM',
        },
      ],
    };
    localStorage.setItem('icc_tms_discussions_v3', JSON.stringify(initialDiscussions));
    return initialDiscussions;
  } catch (e) {
    return {};
  }
}

function saveStoredDiscussions(discussions: Record<string, TaskDiscussionMessage[]>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('icc_tms_discussions_v3', JSON.stringify(discussions));
  } catch (e) {}
}

export class TmsTaskService {
  /**
   * Fetch tasks filtered by params
   */
  static async getTasks(filters?: TaskFilterParams): Promise<Task[]> {
    let result = getStoredTasks();

    if (!filters) return result;

    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.assignee.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.department.toLowerCase().includes(q) ||
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
          result = result.filter((t) => t.assignedToMe || t.assignee.id === 'EMP-102' || t.assignee.name.includes('Sri Varun'));
          break;
        case 'ASSIGNED_BY_ME':
          result = result.filter((t) => t.assignedByMe || t.owner.id === 'EMP-101' || t.owner.name.includes('Srinivas'));
          break;
        case 'PENDING_ACTIONS':
          result = result.filter((t) => t.status === 'UNDER_REVIEW' || t.status === 'OPEN' || t.status === 'IN_PROGRESS');
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
    const tasks = getStoredTasks();
    return tasks.find((t) => t.id === id) || null;
  }

  /**
   * Create new task
   */
  static async createTask(payload: CreateTaskPayload): Promise<Task> {
    const tasks = getStoredTasks();
    const newId = `TMS-${Math.floor(910 + Math.random() * 100)}`;
    const assigneeObj = mockEmployees.find((e) => e.id === payload.assigneeId) || mockEmployees[1];

    const newTask: Task = {
      id: newId,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      priority: payload.priority,
      status: 'OPEN',
      department: payload.department || assigneeObj.department,
      owner: mockEmployees[0],
      assignee: assigneeObj,
      collaborators: (payload.collaboratorIds || []).map((cid) => {
        const emp = mockEmployees.find((e) => e.id === cid) || mockEmployees[1];
        return { id: emp.id, name: emp.name, role: emp.role, avatar: emp.avatar, status: 'ACTIVE' };
      }),
      subtasks: (payload.subtaskTitles || []).map((t, i) => ({ id: `ST-${newId}-${i}`, title: t, completed: false })),
      progressPercent: 0,
      timeline: {
        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        targetDeadline: payload.deadline || '30 Aug',
      },
      attachments: [],
      discussionCount: 0,
      assignedByMe: true,
    };

    tasks.unshift(newTask);
    saveStoredTasks(tasks);

    return newTask;
  }

  /**
   * Update task fields / status
   */
  static async updateTask(id: string, patch: Partial<Task>): Promise<Task | null> {
    const tasks = getStoredTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    tasks[idx] = { ...tasks[idx], ...patch };
    saveStoredTasks(tasks);
    return tasks[idx];
  }

  /**
   * Delete task
   */
  static async deleteTask(id: string): Promise<boolean> {
    let tasks = getStoredTasks();
    tasks = tasks.filter((t) => t.id !== id);
    saveStoredTasks(tasks);
    return true;
  }

  /**
   * Get KPI summary
   */
  static async getTaskKpis(): Promise<TaskKpis> {
    const tasks = getStoredTasks();
    return {
      totalTasks: tasks.length,
      assignedToMe: tasks.filter((t) => t.assignedToMe || t.assignee.id === 'EMP-102' || t.assignee.name.includes('Sri Varun')).length,
      assignedByMe: tasks.filter((t) => t.assignedByMe || t.owner.id === 'EMP-101' || t.owner.name.includes('Srinivas')).length,
      pendingTasks: tasks.filter((t) => t.status === 'IN_PROGRESS' || t.status === 'OPEN' || t.status === 'UNDER_REVIEW').length,
      completedTasks: tasks.filter((t) => t.status === 'COMPLETED').length,
      overdueTasks: tasks.filter((t) => t.status === 'OVERDUE').length,
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
    const discussions = getStoredDiscussions();
    return discussions[taskId] || [];
  }

  static async addComment(taskId: string, message: string): Promise<TaskDiscussionMessage> {
    const discussions = getStoredDiscussions();
    const newMsg: TaskDiscussionMessage = {
      id: `MSG-${Date.now()}`,
      taskId,
      author: 'Sri Varun Tej Chavitina',
      authorRole: 'Information Technology Intern',
      avatar: mockEmployees[1].avatar,
      message,
      timestamp: 'Just now',
    };

    if (!discussions[taskId]) discussions[taskId] = [];
    discussions[taskId].push(newMsg);
    saveStoredDiscussions(discussions);

    // Increment discussion count on task
    const tasks = getStoredTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.discussionCount += 1;
      saveStoredTasks(tasks);
    }

    return newMsg;
  }

  /**
   * Task Activity History
   */
  static async getTaskHistory(taskId: string): Promise<TaskActivityHistory[]> {
    return [
      { id: 'HIST-1', taskId, user: 'Srinivas Thalada', userRole: 'DEPARTMENT', action: 'Created task and assigned deliverables', timestamp: 'Jul 01, 2026, 10:00 AM' },
      { id: 'HIST-2', taskId, user: 'Sri Varun Tej Chavitina', userRole: 'IT Intern', action: 'Accepted task and updated progress', timestamp: 'Jul 02, 2026, 02:30 PM' },
    ];
  }
}
