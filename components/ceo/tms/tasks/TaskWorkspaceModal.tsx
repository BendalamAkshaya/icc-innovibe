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
  Paperclip,
  Send,
  Plus,
  Calendar,
  MessageSquare,
  ChevronRight,
  Flame,
  ArrowUpRight,
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-[#0B1329] border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col lg:flex-row overflow-hidden shadow-2xl text-slate-100">
        
        {isLoading || !task ? (
          <div className="p-12 text-center text-slate-400 font-bold text-xs w-full">
            Loading Task Workspace...
          </div>
        ) : (
          <>
            {/* Left Main Workspace (70%) */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 text-left">
              
              {/* Top Header Breadcrumb & Title */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-3 py-1 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 text-[10px] font-black uppercase tracking-wider">
                    {task.assignee.role || task.category.replace('_', ' ')} TASK
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">{task.title}</h2>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Priority Line */}
              <div className="p-3 bg-[#030712] rounded-2xl border border-slate-800/80 flex items-center gap-6 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{task.status.replace('_', ' ')}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Priority:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-black flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    <span>{task.priority}</span>
                  </span>
                </div>
              </div>

              {/* Description / Deliverables */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">DESCRIPTION / DELIVERABLES</label>
                <div className="p-4 bg-[#030712] rounded-2xl border border-slate-800 text-xs text-slate-300 font-medium leading-relaxed">
                  {task.description}
                </div>
              </div>

              {/* Team Members Section */}
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">TEAM MEMBERS</label>
                
                {/* Created By (Owner) */}
                <div className="p-4 bg-[#030712] rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">CREATED BY (OWNER)</span>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center border border-blue-400">
                      {task.owner.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">{task.owner.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Role: {task.owner.role}</p>
                    </div>
                  </div>
                </div>

                {/* Collaborators & Individual Progress Grid */}
                <div className="space-y-2 pt-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">COLLABORATORS & INDIVIDUAL PROGRESS</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Collaborator Card 1 */}
                    <div className="p-3 rounded-2xl bg-[#030712] border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                          G
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">Geetha Sowmya...</h5>
                          <p className="text-[9px] text-slate-400 truncate">Backend Engineer • Inf...</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black shrink-0">
                        COMPLETED
                      </span>
                    </div>

                    {/* Collaborator Card 2 (Current User) */}
                    <div className="p-3 rounded-2xl bg-[#030712] border border-blue-500/50 flex items-center justify-between gap-3 relative">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          S
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">Sri Varun Tej Ch...</h5>
                          <p className="text-[9px] text-slate-400 truncate">IT Intern • Information ...</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black">
                          COMPLETED
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[8px] font-black uppercase">
                          CURRENT USER
                        </span>
                      </div>
                    </div>

                    {/* Collaborator Card 3 */}
                    <div className="p-3 rounded-2xl bg-[#030712] border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                          B
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">Bendalam Aksha...</h5>
                          <p className="text-[9px] text-slate-400 truncate">Automation Engineer • ...</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black shrink-0">
                        COMPLETED
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtasks Checklist */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    SUBTASKS CHECKLIST ({task.subtasks.filter((s) => s.completed).length} / {task.subtasks.length})
                  </label>
                  <span className="text-xs font-extrabold text-blue-400">{task.progressPercent}%</span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${task.progressPercent}%` }} />
                </div>

                <div className="space-y-2">
                  {task.subtasks.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => handleToggleSubtask(st.id)}
                      className="p-3 rounded-2xl bg-[#030712] border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center gap-3 transition"
                    >
                      <input
                        type="checkbox"
                        checked={st.completed}
                        onChange={() => {}}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                      />
                      <span className={`text-xs font-medium ${st.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddSubtask} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    placeholder="+ Add deliverable..."
                    className="flex-1 bg-[#030712] border border-slate-800 rounded-2xl px-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                  <button type="submit" className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer">
                    Add
                  </button>
                </form>
              </div>

              {/* Task Dates & Delete */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-4 text-slate-400 font-medium">
                  <span>Created: <strong className="text-white">{task.timeline.createdDate}</strong></span>
                  <span>Target: <strong className="text-amber-400">{task.timeline.targetDeadline}</strong></span>
                </div>

                <button
                  onClick={handleDeleteTask}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Task</span>
                </button>
              </div>
            </div>

            {/* Right Pane (30%) - Ecosystem Discussion Workspace */}
            <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between bg-[#070D1F] space-y-4">
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-black text-white">Ecosystem Discussion</h3>
                </div>

                {/* Messages Stream */}
                <div className="space-y-3 my-4 max-h-[55vh] overflow-y-auto pr-1">
                  {comments.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs font-medium space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-600">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <p>No workspace discussion yet.</p>
                    </div>
                  ) : (
                    comments.map((msg) => (
                      <div key={msg.id} className="p-3.5 rounded-2xl bg-[#030712] border border-slate-800 space-y-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{msg.author}</span>
                          <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-normal leading-relaxed">{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Comment Input */}
              <form onSubmit={handleSendComment} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button type="button" className="p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask a question or type comment..."
                  className="flex-1 bg-[#030712] border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
                <button type="submit" className="p-2.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition cursor-pointer shrink-0">
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
