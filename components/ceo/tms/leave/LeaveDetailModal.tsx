'use client';

import React, { useState } from 'react';
import { LeaveRequest } from '../../../../lib/leave-models';
import { LeaveService } from '../../../../lib/leave-service';
import {
  X,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Building2,
  FileText,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface LeaveDetailModalProps {
  leave: LeaveRequest | null;
  onClose: () => void;
  onActionComplete: () => void;
}

export function LeaveDetailModal({ leave, onClose, onActionComplete }: LeaveDetailModalProps) {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!leave) return null;

  const handleApprove = async () => {
    setIsSubmitting(true);
    await LeaveService.approve(leave.id, 'Sri Hari Kolusu (CEO)');
    setIsSubmitting(false);
    onActionComplete();
    onClose();
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    await LeaveService.reject(leave.id, note.trim() || 'Operational workload priority');
    setIsSubmitting(false);
    onActionComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-slate-100 text-left space-y-6 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <img
              src={leave.avatar}
              alt={leave.employeeName}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leave.employeeName)}&background=fef3c7&color=92400e`;
              }}
              className="h-12 w-12 rounded-2xl object-cover border border-slate-700 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 font-apfel text-xs">
                <h2 className="font-gotham text-lg font-extrabold text-white">{leave.employeeName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold text-[10px]">
                  {leave.employeeId}
                </span>
              </div>
              <p className="font-sans text-xs text-slate-400">
                {leave.role} • <span className="text-amber-400 font-semibold">{leave.departmentName}</span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Details Content */}
        <div className="space-y-5 text-xs font-sans">
          {/* Row 1: Leave Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-apfel">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">LEAVE TYPE</span>
              <span className="text-xs font-black text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 inline-block">
                {leave.leaveType.replace('_', ' ')}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">REQUESTED DATES</span>
              <p className="text-xs font-bold text-white">
                {leave.startDate} → {leave.endDate}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">TOTAL DURATION</span>
              <p className="text-xs font-black text-emerald-400">
                {leave.totalDays} {leave.totalDays === 1 ? 'Day' : 'Days'}
              </p>
            </div>
          </div>

          {/* Row 2: Full Reason */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h3 className="font-gotham text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> Application Reason & Context
            </h3>
            <p className="font-sans text-xs text-slate-300 font-normal leading-relaxed">
              {leave.reason}
            </p>
          </div>

          {/* Row 3: Leave Balances */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2">
            <h3 className="font-gotham text-xs font-bold text-slate-400 uppercase tracking-wider">
              Employee Annual Leave Balance Overview
            </h3>
            <div className="grid grid-cols-3 gap-3 font-apfel text-center">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[9px] text-slate-400 font-bold block">Casual Leave</span>
                <span className="text-xs font-black text-emerald-400">8 / 12 Days Remaining</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[9px] text-slate-400 font-bold block">Sick Leave</span>
                <span className="text-xs font-black text-amber-400">5 / 10 Days Remaining</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[9px] text-slate-400 font-bold block">Earned Leave</span>
                <span className="text-xs font-black text-purple-400">15 / 20 Days Remaining</span>
              </div>
            </div>
          </div>

          {/* Row 4: Executive Decision Notes Input */}
          {leave.status === 'PENDING' && (
            <div className="space-y-1.5">
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400">
                Executive Review / Rejection Notes (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add internal review commentary or specify reason for rejection..."
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans text-xs"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 font-apfel">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            Close
          </button>

          {leave.status === 'PENDING' ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleReject}
                className="px-4 py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-extrabold transition-all flex items-center gap-1.5"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject Request</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleApprove}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Approve Leave</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-400">
                Status: <span className="text-emerald-400">{leave.status}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
