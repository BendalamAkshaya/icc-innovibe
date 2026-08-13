'use client';

import React, { useState, useEffect } from 'react';
import { CreateTaskPayload, Employee, Department, TaskCategory, TaskPriority } from '../../../../lib/tms-models';
import { TmsTaskService } from '../../../../lib/tms-service';
import { X, Plus, CheckSquare, Calendar, User, Building2, Save } from 'lucide-react';

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
  const [category, setCategory] = useState<TaskCategory>('HR_COMPLIANCE');
  const [priority, setPriority] = useState<TaskPriority>('HIGH');
  const [department, setDepartment] = useState('Human Resources');
  const [assigneeId, setAssigneeId] = useState('EMP-102');
  const [deadline, setDeadline] = useState('Aug 20, 2026');
  const [subtasks, setSubtasks] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadRefData = async () => {
      const empList = await TmsTaskService.getEmployees();
      const deptList = await TmsTaskService.getDepartments();
      setEmployees(empList);
      setDepartments(deptList);
      if (empList.length > 0 && !assigneeId) {
        setAssigneeId(empList[0].id);
      }
    };

    loadRefData();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddSubtaskField = () => {
    setSubtasks((prev) => [...prev, '']);
  };

  const handleSubtaskChange = (index: number, val: string) => {
    const updated = [...subtasks];
    updated[index] = val;
    setSubtasks(updated);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSubtasks(['']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    const payload: CreateTaskPayload = {
      title: title.trim(),
      description: description.trim() || 'No description provided.',
      category,
      priority,
      department,
      assigneeId,
      deadline,
      subtaskTitles: subtasks.filter((s) => s.trim() !== ''),
    };

    await TmsTaskService.createTask(payload);
    setIsSubmitting(false);
    resetForm();
    onTaskCreated();
    onClose();
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      alert('Please enter a Task Title to save draft.');
      return;
    }
    setIsSubmitting(true);
    await TmsTaskService.createTask({
      title: `[DRAFT] ${title.trim()}`,
      description: description.trim() || 'Draft task saved by CEO.',
      category,
      priority: 'LOW',
      department,
      assigneeId,
      deadline,
      subtaskTitles: subtasks.filter((s) => s.trim() !== ''),
    });
    setIsSubmitting(false);
    resetForm();
    onTaskCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl text-left space-y-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-gotham text-lg font-extrabold text-white">Create & Assign New Task</h2>
              <p className="font-sans text-xs text-slate-400">Enterprise deliverable assignment and workflow creation</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {/* Task Title */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">Task Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q3 HR Performance Audit & Telematics Verification"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-semibold"
            />
          </div>

          {/* Row 1: Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-amber-500 font-apfel font-bold"
              >
                <option value="HR_COMPLIANCE">HR Compliance & Payroll</option>
                <option value="STRATEGIC_GOAL">Strategic Goal</option>
                <option value="OPERATIONS">Fleet Operations</option>
                <option value="TECH_INFRA">Technology & Infra</option>
                <option value="FLEET_SAFETY">Fleet Safety</option>
                <option value="FINANCE">Financial Audit</option>
              </select>
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-amber-500 font-apfel font-bold"
              >
                <option value="URGENT">Urgent (CEO Priority)</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Row 2: Department & Assignee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">Department *</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-amber-500 font-semibold"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">Primary Assignee *</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-amber-500 font-semibold"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">Target Deadline</label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Aug 20, 2026"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-apfel font-medium"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">Task Description & Instructions</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Detail specific deliverables, compliance requirements, and expectations..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-normal leading-relaxed resize-none"
            />
          </div>

          {/* Subtask Checklist Inputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400">Subtask Deliverables</label>
              <button
                type="button"
                onClick={handleAddSubtaskField}
                className="text-amber-400 hover:underline text-[10px] font-apfel font-bold flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Add Deliverable
              </button>
            </div>

            {subtasks.map((st, idx) => (
              <input
                key={idx}
                type="text"
                value={st}
                onChange={(e) => handleSubtaskChange(idx, e.target.value)}
                placeholder={`Deliverable #${idx + 1}`}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 outline-none focus:border-amber-500 text-xs"
              />
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 font-apfel">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Save className="h-3.5 w-3.5 text-amber-400" />
              <span>Save Draft</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
              >
                <CheckSquare className="h-4 w-4" />
                <span>{isSubmitting ? 'Creating...' : 'Create & Assign Task'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
