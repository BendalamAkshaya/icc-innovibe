/**
 * Task Management System (TMS) Data Models & TypeScript Interfaces
 * Centralized schema definitions for enterprise cross-role task engines.
 */

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED' | 'OVERDUE';
export type TaskPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskCategory =
  | 'STRATEGIC_GOAL'
  | 'OPERATIONS'
  | 'HR_COMPLIANCE'
  | 'TECH_INFRA'
  | 'FLEET_SAFETY'
  | 'FINANCE';

export interface Department {
  id: string;
  name: string;
  code: string;
  headcount: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'ACTIVE' | 'COMPLETED' | 'REVIEWING';
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
}

export interface TaskAttachment {
  id: string;
  filename: string;
  size: string;
  url: string;
  mimeType: string;
  uploadedAt: string;
}

export interface TaskActivityHistory {
  id: string;
  taskId: string;
  user: string;
  userRole: string;
  avatar?: string;
  action: string;
  timestamp: string;
}

export interface TaskDiscussionMessage {
  id: string;
  taskId: string;
  author: string;
  authorRole: string;
  avatar: string;
  message: string;
  timestamp: string;
  attachments?: TaskAttachment[];
}

export interface TaskTimeline {
  createdDate: string;
  targetDeadline: string;
  completedDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  department: string;
  owner: Employee;
  assignee: Employee;
  collaborators: Collaborator[];
  subtasks: Subtask[];
  progressPercent: number;
  timeline: TaskTimeline;
  attachments: TaskAttachment[];
  discussionCount: number;
  assignedToMe?: boolean;
  assignedByMe?: boolean;
}

export interface TaskKpis {
  totalTasks: number;
  assignedToMe: number;
  assignedByMe: number;
  pendingTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export interface TaskFilterParams {
  query?: string;
  status?: TaskStatus | 'ALL';
  priority?: TaskPriority | 'ALL';
  category?: TaskCategory | 'ALL';
  department?: string | 'ALL';
  assigneeId?: string;
  segment?: 'ASSIGNED_TO_ME' | 'ASSIGNED_BY_ME' | 'PENDING_ACTIONS' | 'OVERDUE' | 'ACHIEVEMENTS' | 'ALL';
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  department: string;
  assigneeId: string;
  deadline: string;
  collaboratorIds?: string[];
  subtaskTitles?: string[];
}
