'use client';

import React, { useState, useEffect } from 'react';
import {
  Task,
  TaskDiscussionMessage,
  TaskActivityHistory,
  Subtask,
} from '../../../../lib/tms-models';
import { TmsTaskService } from '../../../../lib/tms-service';
import {
  X,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Paperclip,
  Send,
  Plus,
  Calendar,
  User,
  Shield,
  FileText,
  MessageSquare,
  Activity,
  UserCheck,
  ChevronRight,
} from 'lucide-react';

interface TaskWorkspaceModalProps {
  taskId: string | null;
  onClose: () => void;
  onTaskUpdated?: () => void;
}

export function TaskWorkspaceModal({ taskId, onClose, onTaskUpdated }: TaskWorkspaceModalProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<TaskDiscussionMessage[]>([]);
  const [history, setHistory] = useState<TaskActivityHistory[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const loadData = async () => {
      setIsLoading(true);
      const taskData = await TmsTaskService.getTaskById(taskId);
      const commentsData = await TmsTaskService.getTaskComments(taskId);
      const historyData = await TmsTaskService.getTaskHistory(taskId);

      setTask(taskData);
      setComments(commentsData);
      setHistory(historyData);
      setIsLoading(false);
    };

    loadData();
  }, [taskId]);

  if (!taskId) return null;

  const handleToggleSubtask = async (subtaskId: string) => {
    if (!task) return;
    const updatedSubtasks = task.subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    const completedCount = updatedSubtasks.filter((st) => st.completed).length;
    const newProgress = Math.round((completedCount / updatedSubtasks.length) * 100);

    const updatedTask = await TmsTaskService.updateTask(task.id, {
      subtasks: updatedSubtasks,
      progressPercent: newProgress,
    });

    if (updatedTask) {
      setTask({ ...updatedTask });
      if (onTaskUpdated) onTaskUpdated();
    }
  };

  const handleAddSubtask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !newSubtaskTitle.trim()) return;

    const newSubtask: Subtask = {
      id: `ST-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    };

    const updatedSubtasks = [...task.subtasks, newSubtask];
    const completedCount = updatedSubtasks.filter((st) => st.completed).length;
    const newProgress = Math.round((completedCount / updatedSubtasks.length) * 100);

    const updatedTask = await TmsTaskService.updateTask(task.id, {
      subtasks: updatedSubtasks,
      progressPercent: newProgress,
    });

    if (updatedTask) {
      setTask({ ...updatedTask });
      setNewSubtaskTitle('');
      if (onTaskUpdated) onTaskUpdated();
    }
  };

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !newComment.trim()) return;

    const addedMsg = await TmsTaskService.addComment(task.id, newComment.trim());
    setComments((prev) => [...prev, addedMsg]);
    setNewComment('');
    if (onTaskUpdated) onTaskUpdated();
  };

  const handleDeleteTask = async () => {
    if (!task) return;
    if (confirm('Are you sure you want to delete this task?')) {
      await TmsTaskService.deleteTask(task.id);
      if (onTaskUpdated) onTaskUpdated();
      onClose();
    }
  };

  const getPriorityBadgeStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-200 border-amber-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  const getStatusBadgeStyle = (status: Task['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'UNDER_REVIEW':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'IN_PROGRESS':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col lg:flex-row overflow-hidden shadow-2xl text-slate-100">
        {isLoading || !task ? (
          <div className="p-12 text-center text-slate-400 font-apfel text-xs w-full">
            Loading Task Workspace...
          </div>
        ) : (
          <>
            {/* Left Workspace (70%) */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800 text-left">
              {/* Header Bar */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-apfel text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold text-[10px]">
                      {task.category.replace('_', ' ')}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-mono text-[11px]">{task.id}</span>
                  </div>
                  <h2 className="font-gotham text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-snug">
                    {task.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDeleteTask}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Status & Priority Row */}
              <div className="flex flex-wrap items-center gap-3 font-apfel text-xs pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-sans text-xs">Status:</span>
                  <span className={`px-2.5 py-1 rounded-xl font-extrabold border ${getStatusBadgeStyle(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-sans text-xs">Priority:</span>
                  <span className={`px-2.5 py-1 rounded-xl font-extrabold border ${getPriorityBadgeStyle(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-sans text-xs">Department:</span>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 font-semibold">
                    {task.department}
                  </span>
                </div>
              </div>

              {/* Description Panel */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
                <h3 className="font-gotham text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Task Description & Requirements
                </h3>
                <p className="font-sans text-xs text-slate-300 font-normal leading-relaxed whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>

              {/* Team Members */}
              <div className="space-y-3">
                <h3 className="font-gotham text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Team Members & Ownership
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Owner */}
                  <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
                    <img
                      src={task.owner.avatar}
                      alt={task.owner.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(task.owner.name)}&background=fef3c7&color=92400e`;
                      }}
                      className="h-9 w-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <span className="font-apfel text-[9px] font-extrabold text-amber-400 uppercase tracking-wider block">Task Owner / Assignor</span>
                      <p className="font-gotham text-xs font-bold text-white">{task.owner.name}</p>
                      <p className="text-[10px] text-slate-400">{task.owner.role}</p>
                    </div>
                  </div>

                  {/* Assignee */}
                  <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
                    <img
                      src={task.assignee.avatar}
                      alt={task.assignee.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignee.name)}&background=fef3c7&color=92400e`;
                      }}
                      className="h-9 w-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <span className="font-apfel text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider block">Primary Assignee</span>
                      <p className="font-gotham text-xs font-bold text-white">{task.assignee.name}</p>
                      <p className="text-[10px] text-slate-400">{task.assignee.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist Subtasks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-gotham text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Task Deliverables Checklist ({task.subtasks.filter((s) => s.completed).length} / {task.subtasks.length})
                  </h3>
                  <span className="font-apfel text-xs font-bold text-amber-400">{task.progressPercent}% Completed</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all" style={{ width: `${task.progressPercent}%` }} />
                </div>

                {/* Subtask Items */}
                <div className="space-y-2">
                  {task.subtasks.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => handleToggleSubtask(st.id)}
                      className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <div className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-colors ${st.completed ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700 bg-slate-900'}`}>
                        {st.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                      <span className={`text-xs font-medium ${st.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Subtask Input */}
                <form onSubmit={handleAddSubtask} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    placeholder="+ Add subtask deliverable..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
                  />
                  <button type="submit" className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-apfel text-xs font-bold transition-colors">
                    Add
                  </button>
                </form>
              </div>

              {/* Timeline & History */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-apfel text-xs pt-2 border-t border-slate-800">
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Created Date</span>
                  <p className="font-bold text-slate-200">{task.timeline.createdDate}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Target Deadline</span>
                  <p className="font-bold text-amber-300">{task.timeline.targetDeadline}</p>
                </div>
              </div>

              {/* Attachments (Future Ready) */}
              <div className="space-y-2">
                <h3 className="font-gotham text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Attachments & Files
                </h3>
                {task.attachments.length === 0 ? (
                  <div className="p-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/30 text-center text-slate-500 text-xs font-sans">
                    No attachments uploaded. Drag & drop files here to upload.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {task.attachments.map((att) => (
                      <div key={att.id} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <Paperclip className="h-4 w-4 text-amber-400" />
                          <div>
                            <p className="font-bold text-slate-200">{att.filename}</p>
                            <span className="text-[10px] text-slate-500">{att.size} • {att.uploadedAt}</span>
                          </div>
                        </div>
                        <button className="text-amber-400 hover:underline text-[11px] font-bold">Download</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Workspace (30%) - Discussion Workspace */}
            <div className="w-full lg:w-96 p-6 flex flex-col justify-between bg-slate-950/80 space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-amber-400" />
                    <h3 className="font-gotham text-sm font-extrabold text-white">Ecosystem Discussion</h3>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>

                {/* Messages Stream */}
                <div className="space-y-3.5 my-4 max-h-[50vh] lg:max-h-[60vh] overflow-y-auto pr-1">
                  {comments.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs font-sans">
                      No discussions yet. Start the conversation below.
                    </div>
                  ) : (
                    comments.map((msg) => (
                      <div key={msg.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-left">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={msg.avatar}
                              alt={msg.author}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.author)}&background=fef3c7&color=92400e`;
                              }}
                              className="h-6 w-6 rounded-full object-cover border border-slate-700"
                            />
                            <span className="font-gotham text-xs font-bold text-white">{msg.author}</span>
                          </div>
                          <span className="font-apfel text-[9px] text-slate-500">{msg.timestamp}</span>
                        </div>
                        <p className="font-sans text-xs text-slate-300 font-normal leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Input Bar */}
              <form onSubmit={handleSendComment} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button type="button" className="p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800">
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type a message or updates..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
                />
                <button type="submit" className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
