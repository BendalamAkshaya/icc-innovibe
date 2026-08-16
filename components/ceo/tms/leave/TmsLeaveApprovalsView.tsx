'use client';

import React, { useState, useEffect } from 'react';
import { LeaveRequest, LeaveKpis, LeaveType, LeaveStatus } from '../../../../lib/leave-models';
import { LeaveService } from '../../../../lib/leave-service';
import { DepartmentItem } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import { LeaveDetailModal } from './LeaveDetailModal';
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Calendar,
  Filter,
  User,
  Check,
  X,
  Eye,
  FileCheck,
} from 'lucide-react';

export function TmsLeaveApprovalsView() {
  const [activeTab, setActiveTab] = useState<'PENDING' | 'HISTORY'>('PENDING');
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [kpis, setKpis] = useState<LeaveKpis>({
    pendingCount: 3,
    approvedThisMonth: 2,
    rejectedThisMonth: 0,
    totalLeavesRequested: 5,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<LeaveStatus | 'ALL'>('ALL');

  const [selectedLeaveForModal, setSelectedLeaveForModal] = useState<LeaveRequest | null>(null);
  const [rejectionModalTarget, setRejectionModalTarget] = useState<LeaveRequest | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const list = await LeaveService.getAll();
    const depts = await DepartmentService.getAll();
    const summary = await LeaveService.getKpis();

    setLeaves(list);
    setDepartments(depts);
    setKpis(summary);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = LeaveService.onLeaveUpdated(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  const handleQuickApprove = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await LeaveService.approve(id, 'Sri Hari Kolusu (CEO)');
    loadData();
  };

  const handleOpenRejectModal = (leave: LeaveRequest, e: React.MouseEvent) => {
    e.stopPropagation();
    setRejectionModalTarget(leave);
    setRejectionReasonInput('');
  };

  // Filtered lists
  const filteredLeaves = leaves.filter((l) => {
    const matchesSearch =
      l.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'ALL' ? true : l.departmentName === selectedDepartment;
    const matchesType = selectedLeaveType === 'ALL' ? true : l.leaveType === selectedLeaveType;
    const matchesStatus = selectedStatus === 'ALL' ? true : l.status === selectedStatus;

    const matchesTab = activeTab === 'PENDING' ? l.status === 'PENDING' : l.status !== 'PENDING';

    return matchesSearch && matchesDept && matchesType && matchesStatus && matchesTab;
  });

  const getLeaveTypeBadgeStyle = (type: LeaveType) => {
    switch (type) {
      case 'CASUAL_LEAVE':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SICK_LEAVE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'COMPENSATORY_OFF':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'MATERNITY_LEAVE':
      case 'PATERNITY_LEAVE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadgeStyle = (status: LeaveStatus) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Organization Leave Approvals
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Workforce PTO Engine
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Manage, review, and approve leave requests for all employees and department heads.
          </p>
        </div>

        <div className="flex items-center gap-2 font-apfel text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 font-bold flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-600" />
            <span>{kpis.pendingCount} Pending Requests</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{kpis.approvedThisMonth} Approved</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Multi-Filters Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 w-full lg:w-96 shadow-2xs">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by employee name..."
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto font-apfel text-xs">
            {/* Department Filter (Dynamic from Department Repository) */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.departmentName}>
                  {d.departmentName}
                </option>
              ))}
            </select>

            {/* Leave Type */}
            <select
              value={selectedLeaveType}
              onChange={(e) => setSelectedLeaveType(e.target.value as LeaveType | 'ALL')}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Leave Types</option>
              <option value="CASUAL_LEAVE">Casual Leave</option>
              <option value="SICK_LEAVE">Sick Leave</option>
              <option value="COMPENSATORY_OFF">Compensatory Off</option>
              <option value="MATERNITY_LEAVE">Maternity Leave</option>
            </select>

            {/* Status (when in History tab) */}
            {activeTab === 'HISTORY' && (
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as LeaveStatus | 'ALL')}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 pt-1 font-apfel text-xs">
          <button
            onClick={() => setActiveTab('PENDING')}
            className={`px-4 py-2 rounded-xl font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'PENDING'
                ? 'bg-[#d97706] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <span>Pending Approvals</span>
            <span className="px-2 py-0.2 rounded-full bg-white/20 text-white text-[10px]">
              {kpis.pendingCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-2 rounded-xl font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'HISTORY'
                ? 'bg-[#d97706] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <span>Leave History</span>
            <span className="px-2 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
              {kpis.totalLeavesRequested - kpis.pendingCount}
            </span>
          </button>
        </div>

        {/* 3. Tab Content */}
        {activeTab === 'PENDING' ? (
          /* Pending Approvals List */
          <div className="space-y-3 pt-2">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 font-apfel text-xs">
                Loading Leave Approvals Repository...
              </div>
            ) : filteredLeaves.length === 0 ? (
              /* Reference Empty State */
              <div className="py-16 text-center space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <div className="h-14 w-14 rounded-full bg-amber-50 text-[#d97706] border border-[#fde68a] flex items-center justify-center mx-auto shadow-2xs">
                  <Calendar className="h-7 w-7" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="font-gotham text-base font-bold text-slate-900">No Pending Leave Requests</h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    All submitted employee leave requests have been reviewed and processed.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredLeaves.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => setSelectedLeaveForModal(l)}
                    className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-amber-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left: Employee Info */}
                    <div className="flex items-start gap-4">
                      <img
                        src={l.avatar}
                        alt={l.employeeName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(l.employeeName)}&background=fef3c7&color=92400e`;
                        }}
                        className="h-11 w-11 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-gotham text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                            {l.employeeName}
                          </h3>
                          <span className="font-apfel text-[10px] text-slate-400 font-semibold">
                            ({l.employeeId})
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border font-apfel ${getLeaveTypeBadgeStyle(l.leaveType)}`}>
                            {l.leaveType.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-slate-500">
                          {l.role} • <span className="font-semibold text-slate-700">{l.departmentName}</span>
                        </p>
                        <p className="font-sans text-xs text-slate-600 italic line-clamp-1">
                          "{l.reason}"
                        </p>
                      </div>
                    </div>

                    {/* Middle: Duration & Dates */}
                    <div className="flex items-center gap-6 font-apfel text-xs shrink-0">
                      <div className="space-y-0.5 text-left md:text-right">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                          REQUESTED DATES
                        </span>
                        <p className="font-bold text-slate-800">
                          {l.startDate} → {l.endDate}
                        </p>
                        <span className="text-[10px] text-amber-700 font-black px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 inline-block">
                          {l.totalDays} {l.totalDays === 1 ? 'Day' : 'Days'}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 font-apfel text-xs shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleOpenRejectModal(l, e)}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 font-extrabold transition-colors flex items-center gap-1"
                        title="Reject Leave Request"
                      >
                        <X className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={(e) => handleQuickApprove(l.id, e)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold shadow-2xs transition-all flex items-center gap-1.5"
                      >
                        <Check className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => setSelectedLeaveForModal(l)}
                        className="p-2 rounded-xl text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        title="View Complete Application Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Leave History Table */
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] font-montserrat tracking-wider font-extrabold">
                  <th className="pb-3 px-2">EMPLOYEE</th>
                  <th className="pb-3 px-2">DEPARTMENT</th>
                  <th className="pb-3 px-2">LEAVE TYPE</th>
                  <th className="pb-3 px-2">DECISION BY</th>
                  <th className="pb-3 px-2">DECISION DATE</th>
                  <th className="pb-3 px-2">DURATION</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2">REASON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 font-apfel text-xs">
                      Loading Leave History...
                    </td>
                  </tr>
                ) : filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 font-sans text-xs">
                      No leave history records match active filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeaves.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-3.5 px-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={l.avatar}
                            alt={l.employeeName}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(l.employeeName)}&background=fef3c7&color=92400e`;
                            }}
                            className="h-8 w-8 rounded-full object-cover border border-slate-200 shadow-2xs"
                          />
                          <div>
                            <p className="font-gotham text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                              {l.employeeName}
                            </p>
                            <span className="font-apfel text-[10px] text-slate-400 font-medium">
                              {l.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-2 font-apfel">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[10px]">
                          {l.departmentName}
                        </span>
                      </td>

                      <td className="py-3.5 px-2 font-apfel">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getLeaveTypeBadgeStyle(l.leaveType)}`}>
                          {l.leaveType.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-2 font-medium text-slate-800">
                        {l.approvedBy || 'System Admin'}
                      </td>

                      <td className="py-3.5 px-2 font-apfel text-slate-600">
                        {l.approvedDate || l.updatedAt}
                      </td>

                      <td className="py-3.5 px-2 font-apfel">
                        <span className="font-extrabold text-slate-900">
                          {l.totalDays} {l.totalDays === 1 ? 'Day' : 'Days'}
                        </span>
                      </td>

                      <td className="py-3.5 px-2 font-apfel">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusBadgeStyle(l.status)}`}>
                          {l.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-2 text-slate-500 max-w-xs truncate">
                        {l.rejectionReason || l.reason}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Leave Detail Modal */}
      <LeaveDetailModal
        leave={selectedLeaveForModal}
        onClose={() => setSelectedLeaveForModal(null)}
        onActionComplete={loadData}
      />

      {/* CEO Rejection Confirmation Modal */}
      {rejectionModalTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
          <div className="bg-[#0B1329] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-left space-y-5 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Reject Leave Request</h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {rejectionModalTarget.employeeName} ({rejectionModalTarget.employeeId})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRejectionModalTarget(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">REQUEST DETAILS</span>
                <p className="font-bold text-white">
                  {rejectionModalTarget.leaveType.replace('_', ' ')} • {rejectionModalTarget.startDate} → {rejectionModalTarget.endDate} ({rejectionModalTarget.totalDays} Days)
                </p>
                <p className="text-slate-400 italic">"{rejectionModalTarget.reason}"</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-rose-400 tracking-wider">
                  REASON FOR REJECTION (REQUIRED)
                </label>
                <textarea
                  value={rejectionReasonInput}
                  onChange={(e) => setRejectionReasonInput(e.target.value)}
                  rows={3}
                  placeholder="e.g. Leave dates overlap with an important project deployment."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-rose-500 font-normal leading-relaxed resize-none text-xs"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 font-apfel text-xs">
              <button
                onClick={() => setRejectionModalTarget(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={!rejectionReasonInput.trim()}
                onClick={async () => {
                  if (!rejectionReasonInput.trim()) return;
                  await LeaveService.reject(rejectionModalTarget.id, rejectionReasonInput.trim());
                  setRejectionModalTarget(null);
                  setRejectionReasonInput('');
                  loadData();
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-extrabold shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Confirm Rejection</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
