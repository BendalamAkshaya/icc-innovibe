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
  Shield,
  Layers,
  Flame,
  ArrowUpRight,
  Check,
} from 'lucide-react';

export function TmsTasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [kpis, setKpis] = useState<TaskKpis>({
    totalTasks: 22,
    assignedToMe: 21,
    assignedByMe: 1,
    pendingTasks: 1,
    completedTasks: 21,
    overdueTasks: 1,
  });

  // Filter States
  const [activeSegment, setActiveSegment] = useState<
    'ASSIGNED_TO_ME' | 'ASSIGNED_BY_ME' | 'PENDING_ACTIONS' | 'OVERDUE' | 'ACHIEVEMENTS' | 'ALL'
  >('ALL');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'ALL'>('ALL');

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
    const unsubscribe = TmsTaskService.onTasksUpdated(() => {
      loadTasksData();
    });
    return () => unsubscribe();
  }, [activeSegment, searchQuery, selectedPriority, selectedStatus, selectedCategory]);

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'URGENT':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1">
            <Flame className="w-3 h-3 fill-rose-500 text-rose-500" />
            <span>CRITICAL</span>
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-amber-600 stroke-[2.5]" />
            <span>HIGH</span>
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1">
            <span>→</span>
            <span>MEDIUM</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
            <span>🟢</span>
            <span>LOW</span>
          </span>
        );
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>COMPLETED</span>
          </span>
        );
      case 'OPEN':
      case 'IN_PROGRESS':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>ACCEPTED</span>
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>UNDER REVIEW</span>
          </span>
        );
      case 'OVERDUE':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>OVERDUE</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
            <span>PENDING</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <CheckSquare className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-[#0F172A] tracking-tight">
              Workforce Task Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Collaborative enterprise work distribution and discussion portal.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition cursor-pointer self-start md:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Create & Assign</span>
        </button>
      </div>

      {/* 2. 5 KPI Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Total Tasks */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">TOTAL TASKS</span>
            <span className="text-2xl font-black text-[#0F172A] leading-tight mt-0.5 block">{kpis.totalTasks}</span>
          </div>
        </div>

        {/* KPI 2: Assigned To Me */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">ASSIGNED TO ME</span>
            <span className="text-2xl font-black text-[#0F172A] leading-tight mt-0.5 block">{kpis.assignedToMe}</span>
          </div>
        </div>

        {/* KPI 3: Assigned By Me */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Send className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">ASSIGNED BY ME</span>
            <span className="text-2xl font-black text-[#0F172A] leading-tight mt-0.5 block">{kpis.assignedByMe}</span>
          </div>
        </div>

        {/* KPI 4: Pending Tasks */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">PENDING TASKS</span>
            <span className="text-2xl font-black text-[#0F172A] leading-tight mt-0.5 block">{kpis.pendingTasks}</span>
          </div>
        </div>

        {/* KPI 5: Completed Tasks */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">COMPLETED TASKS</span>
            <span className="text-2xl font-black text-[#0F172A] leading-tight mt-0.5 block">{kpis.completedTasks}</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title, category, department..."
            className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-medium"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />

          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as TaskPriority | 'ALL')}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="ALL">Priority (All)</option>
            <option value="URGENT">Critical Priority</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as TaskStatus | 'ALL')}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="ALL">Status (All)</option>
            <option value="OPEN">Accepted / Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="COMPLETED">Completed</option>
            <option value="OVERDUE">Overdue</option>
          </select>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TaskCategory | 'ALL')}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="ALL">Category (All)</option>
            <option value="TECH_INFRA">Technology & Infra</option>
            <option value="HR_COMPLIANCE">HR & Compliance</option>
            <option value="OPERATIONS">Operations</option>
            <option value="STRATEGIC_GOAL">Strategic Goal</option>
            <option value="FLEET_SAFETY">Fleet Safety</option>
          </select>
        </div>
      </div>

      {/* 4. Horizontal Category Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 pb-1 overflow-x-auto text-xs font-bold scrollbar-none">
        {[
          { key: 'ASSIGNED_TO_ME', label: 'Assigned To Me', count: kpis.assignedToMe },
          { key: 'ASSIGNED_BY_ME', label: 'Assigned By Me', count: kpis.assignedByMe },
          { key: 'PENDING_ACTIONS', label: 'Pending Actions', count: kpis.pendingTasks },
          { key: 'OVERDUE', label: 'Overdue Timeline', count: kpis.overdueTasks, hasRedDot: true },
          { key: 'ACHIEVEMENTS', label: 'Achievements', count: kpis.completedTasks },
          { key: 'ALL', label: 'Global Scope', count: kpis.totalTasks },
        ].map((tab) => {
          const active = activeSegment === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveSegment(tab.key as any)}
              className={`py-2.5 flex items-center gap-2 cursor-pointer transition border-b-2 whitespace-nowrap ${
                active
                  ? 'border-blue-600 text-blue-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[11px] font-black ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                {tab.count}
              </span>
              {tab.hasRedDot && <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>}
            </button>
          );
        })}
      </div>

      {/* 5. Main Content Layout: Task Cards Grid (8 cols) + Right Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Section: Task Cards Grid */}
        <div className="lg:col-span-8">
          {isLoading ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 font-bold text-xs border border-slate-200">
              Loading Task Workspace...
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 font-medium text-xs border border-slate-200">
              No tasks found in this view category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tasks.map((taskItem) => (
                <div
                  key={taskItem.id}
                  onClick={() => setSelectedTaskId(taskItem.id)}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  {/* Card Header: Tag + Priority */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-wider">
                      {taskItem.assignee.role || taskItem.category.replace('_', ' ')}
                    </span>
                    {getPriorityBadge(taskItem.priority)}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-blue-600 transition">
                      {taskItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                      {taskItem.description}
                    </p>
                  </div>

                  {/* Card Footer: Due Date + Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-rose-600 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{taskItem.timeline.targetDeadline}</span>
                    </div>

                    {getStatusBadge(taskItem.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Widget 1: Task Timeline Due */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Task Timeline due</h3>
            </div>

            <div className="space-y-3">
              {tasks.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedTaskId(item.id)}
                  className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-slate-100 transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">
                      ASSIGNEE ROLE: {item.assignee.role.split(' ')[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 shrink-0">
                    {item.timeline.targetDeadline}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Cross-Role Guidelines */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Cross-Role Guidelines</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              TMS Collaborative Hub supports fluid hierarchy delegation. Employees can assign tasks to Department managers or Admins, who in turn can accept or discuss deliverables in real-time.
            </p>
          </div>
        </div>

      </div>

      {/* Task Details Workspace Modal */}
      <TaskWorkspaceModal
        taskId={selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
        onTaskUpdated={loadTasksData}
      />

      {/* Create & Assign Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={() => {
          setActiveSegment('ALL');
          loadTasksData();
        }}
      />
    </div>
  );
}
