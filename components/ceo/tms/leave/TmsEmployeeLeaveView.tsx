'use client';

import React, { useState, useEffect } from 'react';
import { LeaveRequest, LeaveType, LEAVE_TYPE_LABELS } from '../../../../lib/leave-models';
import { LeaveService } from '../../../../lib/leave-service';
import { Calendar, Clock, CheckCircle2, AlertCircle, ChevronDown, FileText, Info } from 'lucide-react';

export function TmsEmployeeLeaveView() {
  const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([]);
  const [leaveType, setLeaveType] = useState<LeaveType | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedLeaveDetail, setSelectedLeaveDetail] = useState<LeaveRequest | null>(null);

  // Load Leave History via Service Layer
  const loadLeaveData = async () => {
    setIsLoading(true);
    const history = await LeaveService.getAll({ employeeId: 'EMP-102' });
    setLeaveHistory(history);
    setIsLoading(false);
  };

  useEffect(() => {
    loadLeaveData();
  }, []);

  // Handle Submit New Leave Request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(null);

    // 1. Validation
    if (!leaveType) {
      setToastMessage({ type: 'error', text: 'Please select a valid leave type.' });
      return;
    }
    if (!startDate || !endDate) {
      setToastMessage({ type: 'error', text: 'Please select both start and end dates.' });
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setToastMessage({ type: 'error', text: 'End date cannot be earlier than start date.' });
      return;
    }
    if (!reason.trim()) {
      setToastMessage({ type: 'error', text: 'Please provide a brief reason for your leave request.' });
      return;
    }

    // 2. Calculate Days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    setIsSubmitting(true);

    try {
      await LeaveService.create({
        employeeId: 'EMP-102',
        employeeName: 'Sri Varun Tej Chavitina',
        departmentId: 'DEP-1',
        departmentName: 'Technology',
        role: 'Information Technology Intern',
        leaveType: leaveType as LeaveType,
        startDate,
        endDate,
        totalDays,
        reason: reason.trim(),
      });

      setToastMessage({ type: 'success', text: 'Leave request submitted successfully!' });
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');

      // Refresh list
      await loadLeaveData();
    } catch (err) {
      setToastMessage({ type: 'error', text: 'Failed to submit leave request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for displaying badge status
  const getStatusBadge = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-700 text-[10px] font-black tracking-wider uppercase border border-emerald-200/80">
            APPROVED
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-3 py-1 rounded-full bg-rose-100/90 text-rose-700 text-[10px] font-black tracking-wider uppercase border border-rose-200/80">
            REJECTED
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100/90 text-amber-700 text-[10px] font-black tracking-wider uppercase border border-amber-200/80">
            PENDING
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-black text-[#0F172A] tracking-tight">
          Leave Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Apply for leave and view your request history.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between border shadow-xs animate-in fade-in duration-200 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{toastMessage.text}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
            ×
          </button>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: New Request Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-[#0F172A] tracking-tight">New Request</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            
            {/* Leave Type Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Leave Type</label>
              <div className="relative">
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-medium focus:border-blue-600 outline-none appearance-none cursor-pointer pr-10"
                >
                  <option value="">Select type...</option>
                  <option value="SICK_LEAVE">Sick Leave</option>
                  <option value="CASUAL_LEAVE">Casual Leave</option>
                  <option value="PAID_TIME_OFF">Paid Time Off (PTO)</option>
                  <option value="UNPAID_LEAVE">Unpaid Leave</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Start Date & End Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-medium focus:border-blue-600 outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-medium focus:border-blue-600 outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Provide a brief reason..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50/50 border border-slate-200 text-slate-700 text-xs font-medium placeholder-slate-400 focus:border-blue-600 outline-none leading-relaxed resize-none"
              />
            </div>

            {/* Submit Request Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer mt-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>

          </form>
        </div>

        {/* Right Column: Leave History Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-[#0F172A] tracking-tight mb-4">Leave History</h2>

          {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-bold text-xs">
              Loading leave history...
            </div>
          ) : leaveHistory.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-600">No leave requests yet.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {leaveHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLeaveDetail(item)}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC]/90 border border-slate-200/70 hover:border-blue-300 transition cursor-pointer flex items-center justify-between gap-4 group"
                >
                  {/* Left Side: Icon + Details */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80 group-hover:bg-blue-600 group-hover:text-white transition">
                      <Calendar className="w-5 h-5 stroke-[2.5]" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider group-hover:text-blue-600 transition truncate">
                        {LEAVE_TYPE_LABELS[item.leaveType] || item.leaveType.replace('_', ' ')}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.startDate} to {item.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Status Badge & Rejection Reason */}
                  <div className="flex flex-col items-end justify-center shrink-0">
                    {getStatusBadge(item.status)}
                    
                    {item.status === 'REJECTED' && item.rejectionReason && (
                      <span className="text-[11px] font-bold text-rose-600 mt-1.5 text-right">
                        Rejection Reason: {item.rejectionReason}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Leave Details Modal Drawer */}
      {selectedLeaveDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {LEAVE_TYPE_LABELS[selectedLeaveDetail.leaveType] || selectedLeaveDetail.leaveType}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    REF: {selectedLeaveDetail.id}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedLeaveDetail(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">DATE RANGE ({selectedLeaveDetail.totalDays} Days)</span>
                <p className="font-extrabold text-slate-900">{selectedLeaveDetail.startDate} to {selectedLeaveDetail.endDate}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">REASON / JUSTIFICATION</span>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-slate-700 leading-relaxed font-medium">
                  {selectedLeaveDetail.reason}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">STATUS</span>
                <div>{getStatusBadge(selectedLeaveDetail.status)}</div>
              </div>

              {selectedLeaveDetail.status === 'REJECTED' && selectedLeaveDetail.rejectionReason && (
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 space-y-0.5">
                  <span className="text-[10px] font-black text-rose-700 uppercase block">REJECTION REASON</span>
                  <p className="font-bold">{selectedLeaveDetail.rejectionReason}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedLeaveDetail(null)}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
