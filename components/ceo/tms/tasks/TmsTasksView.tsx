'use client';

import React, { useState, useEffect } from 'react';
import {
  Task,
  TaskKpis,
  TaskFilterParams,
  TaskStatus,
  TaskPriority,
  TaskCategory,
} from '../../../../lib/tms-models';
import { TmsTaskService } from '../../../../lib/tms-service';
import { TaskWorkspaceModal } from './TaskWorkspaceModal';
import { CreateTaskModal } from './CreateTaskModal';
import {
  CheckSquare,
  Plus,
  Filter,
  Search,
  Briefcase,
  UserCheck,
  Send,
  Clock,
  CheckCircle2,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Users,
  AlertTriangle,
  FileText,
  Shield,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export function TmsTasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [kpis, setKpis] = useState<TaskKpis>({
    totalTasks: 48,
    assignedToMe: 14,
    assignedByMe: 22,
    pendingTasks: 18,
    completedTasks: 112,
    overdueTasks: 3,
  });

  // Filter States
  const [activeSegment, setActiveSegment] = useState<
    'ALL' | 'ASSIGNED_TO_ME' | 'ASSIGNED_BY_ME' | 'PENDING_ACTIONS' | 'OVERDUE' | 'ACHIEVEMENTS'
  >('ALL');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'ALL'>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');

  // Modal States
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load Data via Service Layer
  const loadTasksData = async () => {
    setIsLoading(true);
    const filterParams: TaskFilterParams = {
      query: searchQuery,
      priority: selectedPriority,
      status: selectedStatus,
      category: selectedCategory,
      department: selectedDepartment,
      segment: activeSegment,
    };

    const taskList = await TmsTaskService.getTasks(filterParams);
    const kpiSummary = await TmsTaskService.getTaskKpis();

    setTasks(taskList);
    setKpis(kpiSummary);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTasksData();
  }, [activeSegment, searchQuery, selectedPriority, selectedStatus, selectedCategory, selectedDepartment]);

  const getPriorityStyle = (priority: TaskPriority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'HIGH':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'MEDIUM':
        return 'bg-amber-50/60 text-[#b45309] border-[#fde68a]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'UNDER_REVIEW':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'IN_PROGRESS':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'OVERDUE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Workforce Task Hub
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Task Engine
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Collaborative enterprise work distribution and discussion portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>+ Create & Assign</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* KPI 1: Total Tasks */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              TOTAL TASKS
            </span>
            <div className="h-8 w-8 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight mt-2">
            {kpis.totalTasks}
          </p>
        </div>

        {/* KPI 2: Assigned To Me */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              ASSIGNED TO ME
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight mt-2">
            {kpis.assignedToMe}
          </p>
        </div>

        {/* KPI 3: Assigned By Me */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              ASSIGNED BY ME
            </span>
            <div className="h-8 w-8 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
              <Send className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight mt-2">
            {kpis.assignedByMe}
          </p>
        </div>

        {/* KPI 4: Pending Tasks */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              PENDING TASKS
            </span>
            <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight mt-2">
            {kpis.pendingTasks}
          </p>
        </div>

        {/* KPI 5: Completed Tasks */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              COMPLETED TASKS
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-emerald-600 tracking-tight mt-2">
            {kpis.completedTasks}
          </p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Box */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 w-full lg:w-96 shadow-2xs focus-within:border-amber-400">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title, category, department..."
            className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto font-apfel text-xs">
          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as TaskPriority | 'ALL')}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as TaskStatus | 'ALL')}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="COMPLETED">Completed</option>
            <option value="OVERDUE">Overdue</option>
          </select>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TaskCategory | 'ALL')}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="HR_COMPLIANCE">HR Compliance</option>
            <option value="STRATEGIC_GOAL">Strategic Goal</option>
            <option value="OPERATIONS">Operations</option>
            <option value="TECH_INFRA">Tech Infra</option>
            <option value="FLEET_SAFETY">Fleet Safety</option>
            <option value="FINANCE">Finance</option>
          </select>

          {/* Department */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
          >
            <option value="ALL">All Departments</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Technology">Technology</option>
            <option value="Fleet Operations">Fleet Operations</option>
            <option value="Executive Office">Executive Office</option>
          </select>
        </div>
      </div>

      {/* 4. Task Segments (Horizontal Tabs) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto font-apfel text-xs">
        {[
          { key: 'ALL', label: 'All Tasks', count: kpis.totalTasks },
          { key: 'ASSIGNED_TO_ME', label: 'Assigned To Me', count: kpis.assignedToMe },
          { key: 'ASSIGNED_BY_ME', label: 'Assigned By Me', count: kpis.assignedByMe },
          { key: 'PENDING_ACTIONS', label: 'Pending Actions', count: kpis.pendingTasks },
          { key: 'OVERDUE', label: 'Overdue Timeline', count: kpis.overdueTasks },
          { key: 'ACHIEVEMENTS', label: 'Achievements', count: kpis.completedTasks },
        ].map((tab) => {
          const active = activeSegment === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveSegment(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all relative shrink-0 ${
                active
                  ? 'text-[#92400e] bg-[#fef3c7] border border-[#fde68a] font-extrabold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  active ? 'bg-[#b45309] text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 5. Main Content Grid: Left Cards (2 Cols) + Right Sidebar (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Responsive Task Cards Grid */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="p-12 bg-white rounded-3xl border border-slate-100 text-center text-slate-400 text-xs font-apfel">
              Loading Task Cards...
            </div>
          ) : tasks.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-slate-100 text-center space-y-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="font-gotham text-sm font-bold text-slate-800">No Tasks Match Filter</h3>
              <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search query or dropdown filter selections to view workspace tasks.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tasks.map((taskItem) => (
                <div
                  key={taskItem.id}
                  onClick={() => setSelectedTaskId(taskItem.id)}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between font-apfel text-[10px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold border border-slate-200">
                      {taskItem.category.replace('_', ' ')}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold border ${getPriorityStyle(taskItem.priority)}`}>
                      {taskItem.priority}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 text-left">
                    <span className="font-apfel text-[9px] font-mono text-slate-400 block">{taskItem.id}</span>
                    <h3 className="font-gotham text-xs font-bold text-slate-900 group-hover:text-[#b45309] transition-colors leading-snug line-clamp-2">
                      {taskItem.title}
                    </h3>
                    <p className="font-sans text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-2">
                      {taskItem.description}
                    </p>
                  </div>

                  {/* Progress & Due Date */}
                  <div className="space-y-2 pt-2 border-t border-slate-50 font-apfel text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>Due: {taskItem.timeline.targetDeadline}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${getStatusStyle(taskItem.status)}`}>
                        {taskItem.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Progress Bar & Avatars */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 flex-1 max-w-[120px]">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" style={{ width: `${taskItem.progressPercent}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">{taskItem.progressPercent}%</span>
                      </div>

                      {/* Assignee Avatar */}
                      <div className="flex items-center gap-1">
                        <img
                          src={taskItem.assignee.avatar}
                          alt={taskItem.assignee.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(taskItem.assignee.name)}&background=fef3c7&color=92400e`;
                          }}
                          className="h-6 w-6 rounded-full object-cover border border-white shadow-2xs"
                          title={`Assigned to ${taskItem.assignee.name}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* Widget 1: Timeline (Upcoming Deadlines) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-[#d97706]" />
                <h3 className="font-gotham text-sm font-extrabold text-slate-900">Upcoming Deadlines</h3>
              </div>
              <span className="font-apfel text-[10px] font-bold text-amber-800 bg-[#fef3c7] px-2 py-0.5 rounded-full border border-[#fde68a]">
                Timeline
              </span>
            </div>

            <div className="space-y-3.5 font-sans text-xs">
              {[
                { title: 'Q3 HR Compensation Audit', role: 'Ananya Sharma (HR Dir)', due: 'Aug 10', priority: 'URGENT' },
                { title: 'Senior EV Telematics Hiring', role: 'Vikram Mehta (Talent)', due: 'Aug 12', priority: 'HIGH' },
                { title: 'Fleet Operations Workload Balancing', role: 'Rajesh Kumar (Ops)', due: 'Aug 15', priority: 'MEDIUM' },
                { title: 'Employee Safety Survey', role: 'Priya Verma (People)', due: 'Aug 20', priority: 'LOW' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="space-y-0.5">
                    <p className="font-gotham font-bold text-slate-900 text-xs leading-tight">{item.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{item.role}</p>
                  </div>
                  <span className="font-apfel text-[10px] font-extrabold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded-lg border border-[#fde68a] shrink-0">
                    {item.due}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Cross Role Guidelines */}
          <div className="bg-gradient-to-br from-[#fffbeb] via-[#fef3c7]/60 to-white rounded-3xl p-5 border border-[#fde68a] shadow-2xs space-y-3 text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-[#d97706]" />
              <h3 className="font-gotham text-xs font-bold text-[#92400e] uppercase tracking-wider">
                Cross-Role Policy Guidelines
              </h3>
            </div>
            <p className="font-sans text-xs text-[#b45309] font-medium leading-relaxed">
              All executive task assignments automatically log audit histories into the ICC Zero Back-Office Compliance Engine.
            </p>
            <div className="pt-2 border-t border-[#fde68a]/70 flex items-center justify-between font-apfel text-[10px]">
              <span className="font-bold text-[#92400e]">Governance Verified</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#d97706]" />
            </div>
          </div>
        </div>
      </div>

      {/* Task Workspace Modal */}
      <TaskWorkspaceModal
        taskId={selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
        onTaskUpdated={loadTasksData}
      />

      {/* Create & Assign Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={loadTasksData}
      />
    </div>
  );
}
