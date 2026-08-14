'use client';

import React, { useState, useEffect } from 'react';
import { CreateTaskPayload, Employee, Department, TaskCategory, TaskPriority } from '../../../../lib/tms-models';
import { TmsTaskService } from '../../../../lib/tms-service';
import { X, UserPlus, UploadCloud, Calendar, ChevronDown, Check } from 'lucide-react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeRole, setAssigneeRole] = useState('Employee');
  const [assigneeId, setAssigneeId] = useState('EMP-102');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [category, setCategory] = useState<TaskCategory>('OPERATIONS');
  const [deadline, setDeadline] = useState('dd-mm-yyyy');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadRefData = async () => {
      const empList = await TmsTaskService.getEmployees();
      const deptList = await TmsTaskService.getDepartments();
      setEmployees(empList);
      setDepartments(deptList);
      if (empList.length > 0) {
        setAssigneeId(empList[0].id);
      }
    };

    loadRefData();
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('dd-mm-yyyy');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    const payload: CreateTaskPayload = {
      title: title.trim(),
      description: description.trim() || 'Detail the scope of work, technical requirements, or expected deliverables...',
      category,
      priority,
      department: 'Technology',
      assigneeId,
      deadline: deadline !== 'dd-mm-yyyy' && deadline.trim() !== '' ? deadline : '30 Aug',
    };

    await TmsTaskService.createTask(payload);
    setIsSubmitting(false);
    resetForm();
    onTaskCreated();
    onClose();
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-[#0B1329] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-left space-y-6 text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20">
              <UserPlus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">Collaborative Task Creator</h2>
              <p className="text-xs text-slate-400 font-medium">Assign work to any corporate role across departments.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          
          {/* TASK TITLE */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">TASK TITLE</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement real-time notifications framework"
              required
              className="w-full px-4 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white placeholder-slate-600 outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          {/* TASK DESCRIPTION */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">TASK DESCRIPTION</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Detail the scope of work, technical requirements, or expected deliverables..."
              className="w-full px-4 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white placeholder-slate-600 outline-none focus:border-blue-500 font-normal leading-relaxed resize-none"
            />
          </div>

          {/* ASSIGNEE ROLE & SEARCH ASSIGNEES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">ASSIGNEE ROLE</label>
              <select
                value={assigneeRole}
                onChange={(e) => setAssigneeRole(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white outline-none focus:border-blue-500 font-bold cursor-pointer"
              >
                <option value="Employee">Employee</option>
                <option value="Department Manager">Department Manager</option>
                <option value="Admin">Admin</option>
                <option value="Service Manager">Service Manager</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">SEARCH & ADD ASSIGNEES</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white outline-none focus:border-blue-500 font-medium cursor-pointer"
              >
                {filteredEmployees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                ))}
              </select>
            </div>
          </div>

          {/* PRIORITY, CATEGORY, DEADLINE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">PRIORITY LEVEL</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white outline-none focus:border-blue-500 font-bold cursor-pointer"
              >
                <option value="LOW">🟢 Low Priority</option>
                <option value="MEDIUM">🔵 Medium Priority</option>
                <option value="HIGH">🟠 High Priority</option>
                <option value="URGENT">🔴 Critical Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">CATEGORY TAG</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white outline-none focus:border-blue-500 font-bold cursor-pointer"
              >
                <option value="OPERATIONS">Operations</option>
                <option value="TECH_INFRA">IT & Tech</option>
                <option value="HR_COMPLIANCE">HR & Compliance</option>
                <option value="FINANCE">Finance</option>
                <option value="FLEET_SAFETY">Fleet Safety</option>
                <option value="STRATEGIC_GOAL">Strategic Goal</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">DEADLINE TARGET</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="dd-mm-yyyy"
                className="w-full px-3 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white placeholder-slate-600 outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Drag & Drop File Upload Box */}
          <div className="border border-dashed border-slate-800 rounded-2xl p-6 bg-[#030712]/50 text-center space-y-2 cursor-pointer hover:border-blue-500 transition">
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-white">Click or drag files here to upload</p>
            <p className="text-[10px] text-slate-500">Accepts PDF, Image, ZIP, Doc, Excel up to 20MB</p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              {isSubmitting ? 'Creating...' : 'Create & Assign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
