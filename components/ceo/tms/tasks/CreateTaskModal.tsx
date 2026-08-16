'use client';

import React, { useState, useEffect } from 'react';
import { CreateTaskPayload, Employee, Department, TaskCategory, TaskPriority, TaskAttachment } from '../../../../lib/tms-models';
import { TmsTaskService } from '../../../../lib/tms-service';
import { X, UserPlus, UploadCloud, Calendar, ChevronDown, Check, Search, Trash2, Paperclip } from 'lucide-react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
  creatorProfile?: any;
}

export function CreateTaskModal({ isOpen, onClose, onTaskCreated, creatorProfile }: CreateTaskModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeRole, setAssigneeRole] = useState('All Workforce');
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([]);
  const [priority, setPriority] = useState<TaskPriority>('HIGH');
  const [category, setCategory] = useState<TaskCategory>('OPERATIONS');
  const [deadline, setDeadline] = useState('25 Aug 2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const loadRefData = async () => {
      const empList = await TmsTaskService.getEmployees();
      const deptList = await TmsTaskService.getDepartments();
      setEmployees(empList);
      setDepartments(deptList);
      
      // Default auto-select first employee if none selected
      if (empList.length > 0 && selectedAssigneeIds.length === 0) {
        setSelectedAssigneeIds([empList[0].id]);
      }
    };

    loadRefData();
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('25 Aug 2026');
    setSelectedAssigneeIds([]);
    setAttachments([]);
    setSearchQuery('');
  };

  const handleToggleAssignee = (empId: string) => {
    setSelectedAssigneeIds((prev) =>
      prev.includes(empId) ? prev.filter((id) => id !== empId) : [...prev, empId]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newAttachments: TaskAttachment[] = files.map((file, idx) => ({
      id: `ATT-${Date.now()}-${idx}`,
      filename: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: '#',
      mimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (selectedAssigneeIds.length === 0) {
      alert('Please select at least one assignee for this task.');
      return;
    }

    setIsSubmitting(true);

    const ownerObj = creatorProfile ? {
      id: creatorProfile.employeeId || creatorProfile.id || 'EMP-102',
      name: creatorProfile.fullName || creatorProfile.name || 'Sri Varun Tej',
      role: creatorProfile.professionalDesignation || creatorProfile.role || 'Employee',
      department: creatorProfile.department || 'Technology',
      avatar: creatorProfile.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: creatorProfile.email || 'varuntej@innovibe.in',
    } : undefined;

    const payload: CreateTaskPayload = {
      title: title.trim(),
      description: description.trim() || 'Detail the scope of work, technical requirements, or expected deliverables...',
      category,
      priority,
      department: 'Technology',
      owner: ownerObj,
      assigneeIds: selectedAssigneeIds,
      assigneeRole,
      deadline: deadline && deadline.trim() !== '' ? deadline : '25 Aug 2026',
      attachments,
    };

    await TmsTaskService.createTask(payload);
    setIsSubmitting(false);
    resetForm();
    onTaskCreated();
    onClose();
  };

  // Filter employees based on selected Role & Search Query
  const roleFilteredEmployees = employees.filter((emp) => {
    if (assigneeRole === 'Employee') {
      const lowerRole = emp.role.toLowerCase();
      return !lowerRole.includes('ceo') && !lowerRole.includes('founder');
    }
    if (assigneeRole === 'CEO / Executive') {
      const lowerRole = emp.role.toLowerCase();
      return lowerRole.includes('ceo') || lowerRole.includes('founder') || lowerRole.includes('coo') || lowerRole.includes('cto') || lowerRole.includes('head');
    }
    if (assigneeRole === 'Department Manager') {
      return emp.role.toLowerCase().includes('lead') || emp.role.toLowerCase().includes('director') || emp.role.toLowerCase().includes('head');
    }
    return true;
  });

  const searchFilteredEmployees = roleFilteredEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedEmployeesList = employees.filter((e) => selectedAssigneeIds.includes(e.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-[#0B1329] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-left space-y-6 text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20">
              <UserPlus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">Cross-Platform Task Creator</h2>
              <p className="text-xs text-slate-400 font-medium">Assign work to colleagues, team leads, or executives.</p>
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
              placeholder="e.g. Update Fleet Dashboard - Add new telemetry widgets"
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

          {/* ASSIGNEE ROLE SELECTOR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">ASSIGNEE ROLE</label>
              <select
                value={assigneeRole}
                onChange={(e) => setAssigneeRole(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white outline-none focus:border-blue-500 font-bold cursor-pointer"
              >
                <option value="All Workforce">All Workforce (Everyone)</option>
                <option value="Employee">Staff & Employees</option>
                <option value="CEO / Executive">CEO & Executive Suite</option>
                <option value="Department Manager">Department Managers</option>
                <option value="Admin">Admin & Service Managers</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">SEARCH EMPLOYEES</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by employee name or role..."
                  className="w-full pl-9 pr-4 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white placeholder-slate-600 outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* MULTI-ASSIGNEES SELECTOR & TAG PILLS */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                SELECTED ASSIGNEES ({selectedAssigneeIds.length})
              </label>
              <span className="text-[10px] text-blue-400 font-bold">Select multiple team members</span>
            </div>

            {/* Selected Assignee Pills */}
            <div className="flex flex-wrap gap-2 p-3 bg-[#030712] border border-slate-800 rounded-2xl min-h-[46px] mb-2">
              {selectedEmployeesList.length === 0 ? (
                <span className="text-slate-600 text-xs italic py-1">No assignees selected yet. Click employees below to add.</span>
              ) : (
                selectedEmployeesList.map((emp) => (
                  <span
                    key={emp.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-xl text-xs font-bold animate-in fade-in"
                  >
                    <img src={emp.avatar} alt={emp.name} className="w-4 h-4 rounded-full object-cover" />
                    <span>{emp.name}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleAssignee(emp.id)}
                      className="hover:text-red-400 transition cursor-pointer ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Multi-Select Employee List Options */}
            <div className="max-h-36 overflow-y-auto bg-[#030712]/90 border border-slate-800 rounded-2xl p-2 space-y-1 divide-y divide-slate-800/40">
              {searchFilteredEmployees.length === 0 ? (
                <p className="p-3 text-center text-slate-500 text-xs">No matching employees found.</p>
              ) : (
                searchFilteredEmployees.map((emp) => {
                  const isSelected = selectedAssigneeIds.includes(emp.id);
                  return (
                    <div
                      key={emp.id}
                      onClick={() => handleToggleAssignee(emp.id)}
                      className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition ${
                        isSelected ? 'bg-blue-600/20 text-white border border-blue-500/30' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={emp.avatar} alt={emp.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-xs leading-none">{emp.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{emp.role} • {emp.department}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                        isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })
              )}
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
                placeholder="25 Aug 2026"
                className="w-full px-3 py-3 rounded-2xl bg-[#030712] border border-slate-800 text-white placeholder-slate-600 outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* ATTACHMENTS SECTION */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">ATTACHMENTS & DOCUMENTS</label>
            <div className="relative border border-dashed border-slate-800 rounded-2xl p-4 bg-[#030712]/50 text-center space-y-2 hover:border-blue-500 transition">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-7 h-7 text-blue-400 mx-auto" />
              <p className="text-xs font-bold text-white">Click or drag files here to upload attachments</p>
              <p className="text-[10px] text-slate-500">Supports PDF, Documents, Specs, Screenshots</p>
            </div>

            {/* Uploaded Files List */}
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {attachments.map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-semibold text-slate-200 truncate max-w-[200px]">{att.filename}</span>
                      <span className="text-[10px] text-slate-500">({att.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(att.id)}
                      className="text-slate-400 hover:text-red-400 transition cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              className="px-6 py-2.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? 'Creating...' : `Create & Assign Task (${selectedAssigneeIds.length})`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

