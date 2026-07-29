'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  hrLeaveRequests,
  hrHolidayList,
  LeaveRequest,
} from './hr-mock-data';
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  FileText,
} from 'lucide-react';

interface LeaveViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function LeaveView({ showToast }: LeaveViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [requests, setRequests] = useState<LeaveRequest[]>(hrLeaveRequests);
  const [holidays] = useState(hrHolidayList);

  // Apply Leave Drawer State
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // Leave Form State
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  // Handle URL param to open Apply Leave drawer
  useEffect(() => {
    if (searchParams.get('open_apply') === 'true') {
      setIsApplyOpen(true);
    }
  }, [searchParams]);

  // Leave Balance counts
  const balances = [
    { type: 'Casual Leave', total: 12, consumed: 3, color: 'border-blue-200 bg-blue-50 text-blue-800' },
    { type: 'Sick / Medical Leave', total: 15, consumed: 2, color: 'border-rose-200 bg-rose-50 text-rose-800' },
    { type: 'Earned Leave', total: 18, consumed: 5, color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  ];

  // Request approval handler
  const handleApprovalAction = (id: string, action: 'APPROVED' | 'REJECTED') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    showToast(`Leave request successfully ${action.toLowerCase()}.`, 'success');
  };

  // Submit leave form
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      showToast('Please fill out all leave application fields.', 'error');
      return;
    }
    const daysDiff = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)) + 1;
    if (daysDiff <= 0) {
      showToast('End Date must be after Start Date.', 'error');
      return;
    }

    const newRequest: LeaveRequest = {
      id: `lv_0${requests.length + 1}`,
      name: 'Pooja Reddy', // Default logged-in HR Head
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
      role: 'Head of Human Resources',
      leaveType,
      startDate: new Date(startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      endDate: new Date(endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      days: daysDiff,
      reason,
      status: 'APPROVED', // Auto approved for HR Head!
    };

    setRequests([newRequest, ...requests]);
    setIsApplyOpen(false);
    setReason('');
    setStartDate('');
    setEndDate('');
    router.push('/dashboard/hr?view=leaves');
    showToast(`Leave request of ${daysDiff} days submitted and automatically approved.`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Leave Operations Inbox</h2>
          <p className="text-xs text-slate-500 font-medium">Verify employee entitlement balances and manage request workflows.</p>
        </div>
        <button
          onClick={() => setIsApplyOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 self-start transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Apply Leave</span>
        </button>
      </div>

      {/* Leave Balance Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {balances.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${item.color} shadow-3xs space-y-3`}>
            <p className="text-[10px] font-black uppercase tracking-wider">{item.type}</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black">{item.total - item.consumed} Days</p>
              <span className="text-[10px] font-bold opacity-80">Remaining of {item.total}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-current h-1.5 rounded-full"
                style={{ width: `${((item.total - item.consumed) / item.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Roster Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Workflows inbox */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Approval Workflow Queue</h3>
            
            <div className="space-y-3">
              {requests.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex items-start gap-4">
                  <img src={item.avatar} alt={item.name} className="h-8 w-8 rounded-full object-cover border border-slate-200 mt-1" />
                  
                  <div className="grow text-left space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-800">{item.name}</h4>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded bg-slate-200 border border-slate-300 text-slate-700">
                          {item.leaveType}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold">{item.role}</p>
                    </div>

                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed bg-white border border-slate-100 p-2.5 rounded-lg">
                      {item.reason}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-600 font-mono">
                        {item.startDate} - {item.endDate} ({item.days} days)
                      </span>

                      {item.status.startsWith('PENDING') ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleApprovalAction(item.id, 'REJECTED')}
                            className="p-1 rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 transition-all"
                            title="Reject"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleApprovalAction(item.id, 'APPROVED')}
                            className="p-1 rounded-lg border border-emerald-200 bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
                            title="Approve"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase ${
                          item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holiday Calendar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Holiday Calendar 2026</h3>
          <div className="divide-y divide-slate-100 max-h-[350px] overflow-y-auto pr-1">
            {holidays.map((hol, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs text-left">
                <div>
                  <p className="font-extrabold text-slate-800 leading-tight">{hol.name}</p>
                  <p className="text-[9px] text-slate-400 font-medium font-mono mt-0.5">{hol.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-slate-700">{hol.date.split(' ').slice(0, 2).join(' ')}</p>
                  <p className="text-[9px] text-slate-400 font-medium">{hol.day}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ==========================================
          APPLY LEAVE MODAL (REDESIGNED)
          ========================================== */}
      {isApplyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 flex flex-col text-left overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Apply for Leave</h3>
              </div>
              <button
                onClick={() => {
                  setIsApplyOpen(false);
                  router.push('/dashboard/hr?view=leaves');
                }}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white"
                >
                  <option>Casual Leave</option>
                  <option>Sick / Medical Leave</option>
                  <option>Earned Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-blue-500 outline-none font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-blue-500 outline-none font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Reason description</label>
                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide complete explanation or details for leave coverage."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:border-blue-500 outline-none font-sans"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsApplyOpen(false);
                    router.push('/dashboard/hr?view=leaves');
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
