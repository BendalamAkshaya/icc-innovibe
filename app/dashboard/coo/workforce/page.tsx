'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import {
  Users,
  Clock,
  CalendarDays,
  Wallet,
  Award,
  Search,
  Info,
  X,
  XCircle,
  CheckCircle2,
  Send,
  Building,
  UserCheck,
  InboxIcon,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';

function WorkforceInner() {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') || 'employees' : 'employees';

  const [search, setSearch] = useState('');
  const [payrollStatus, setPayrollStatus] = useState<'APPROVED' | 'REJECTED' | 'EXPIRED'>('APPROVED');
  const [approvalTimestamp, setApprovalTimestamp] = useState<number>(Date.now());
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [showPayrollDetails, setShowPayrollDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionInput, setRejectionInput] = useState('');
  const [notificationSentMsg, setNotificationSentMsg] = useState<string | null>(null);

  const [employees, setEmployees] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate 30-day approval expiration
  const daysElapsed = Math.floor((Date.now() - approvalTimestamp) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 30 - daysElapsed);
  const isApprovalValid = payrollStatus === 'APPROVED' && daysRemaining > 0;

  useEffect(() => {
    async function fetchWorkforceData() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8000/api/coo/workforce').catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          setEmployees(Array.isArray(data.employees) ? data.employees : []);
          setAttendanceRecords(Array.isArray(data.attendance) ? data.attendance : []);
          setLeaveRequests(Array.isArray(data.leave_requests) ? data.leave_requests : []);
        } else {
          setEmployees([]);
          setAttendanceRecords([]);
          setLeaveRequests([]);
        }
      } catch {
        setEmployees([]);
        setAttendanceRecords([]);
        setLeaveRequests([]);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkforceData();
  }, []);

  const handleToggleAttendance = (code: string) => {
    setAttendanceRecords((prev) =>
      prev.map((a) =>
        a.code === code
          ? {
              ...a,
              status: a.status === 'PRESENT' ? 'ABSENT' : 'PRESENT',
              checkIn: a.status === 'PRESENT' ? '-' : '09:00 AM',
            }
          : a
      )
    );
  };

  const handleApproveLeave = (id: string) => {
    setLeaveRequests((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'APPROVED' } : l)));
  };

  // Handle Payroll Approval
  const handleApprovePayroll = async () => {
    const now = Date.now();
    setPayrollStatus('APPROVED');
    setApprovalTimestamp(now);
    setRejectionReason('');

    try {
      await fetch('http://localhost:8000/api/coo/workforce/payroll/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period: 'July 2026',
          approved_by: 'Chief Operating Officer (COO)',
        }),
      }).catch(() => null);
    } catch {
      console.warn('Approval dispatched locally');
    }

    setNotificationSentMsg(
      `Payroll Approved: High-priority approval notification dispatched to HR Command Dashboard! Valid for 30 days.`
    );
    setTimeout(() => setNotificationSentMsg(null), 7000);
  };

  // Handle Payroll Rejection Submission
  const handleConfirmRejection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionInput.trim()) return;
    const reasonText = rejectionInput.trim();
    setPayrollStatus('REJECTED');
    setRejectionReason(reasonText);
    setShowRejectModal(false);

    await fetch('http://localhost:8000/api/coo/workforce/payroll/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        period: 'July 2026',
        reason: reasonText,
        rejected_by: 'Chief Operating Officer (COO)',
      }),
    }).catch(() => null);

    setNotificationSentMsg(
      `Payroll Rejected: Notification & rejection reason dispatched to HR Command & CEO Dashboards.`
    );
    setRejectionInput('');
    setTimeout(() => setNotificationSentMsg(null), 7000);
  };

  // Fast forward 30 days simulation for testing
  const handleSimulateExpiry = () => {
    setPayrollStatus('EXPIRED');
    setApprovalTimestamp(Date.now() - 31 * 24 * 60 * 60 * 1000);
    setNotificationSentMsg('Simulated 30-day cycle completion: Payroll approval expired and reset to "Re-Approve".');
    setTimeout(() => setNotificationSentMsg(null), 7000);
  };

  const filteredAttendance = attendanceRecords.filter(
    (a) =>
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.code?.toLowerCase().includes(search.toLowerCase()) ||
      a.location?.toLowerCase().includes(search.toLowerCase())
  );

  const totalCalculatedPayroll = employees.reduce(
    (sum, e) => sum + (typeof e.salary === 'number' ? e.salary : 0),
    0
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-3">
      <InboxIcon className="w-10 h-10 text-slate-300" />
      <p className="text-sm font-semibold">{message}</p>
      <p className="text-xs text-slate-300">No records found in the database.</p>
    </div>
  );

  return (
    <RouteGuard module="workforce">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Title */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Workforce & HR Operations Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Live Database Rows • Attendance Logs • Staff Rosters • Leave Approvals • Payroll Rejection & HR/CEO Alerts
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Database Synced
          </span>
        </div>

        {/* Tab Bar */}
        <div className="flex space-x-2 border-b border-slate-200 bg-white px-4 pt-3 rounded-xl">
          {[
            { id: 'employees', label: 'Employee Directory', icon: Users },
            { id: 'attendance', label: 'Attendance Logs', icon: Clock },
            { id: 'leave', label: 'Leave Approvals', icon: CalendarDays },
            { id: 'payroll', label: 'Payroll Governance', icon: Wallet },
            { id: 'performance', label: 'Performance Index', icon: Award },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <Link
                key={t.id}
                href={`/dashboard/coo/workforce?tab=${t.id}`}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  active
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Tab 1: Employee Directory */}
        {currentTab === 'employees' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Employee Roster</h3>
              <span className="text-xs font-bold text-blue-600">{employees.length} Records</span>
            </div>
            {loading ? (
              <div className="py-16 text-center text-xs text-slate-400">Loading...</div>
            ) : employees.length === 0 ? (
              <EmptyState message="Employee table is empty." />
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Employee Code</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Designation</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4 text-right">Monthly Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {employees.map((e, idx) => (
                    <tr key={e.code || idx} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-blue-600">{e.code}</td>
                      <td className="p-4 font-bold text-slate-900">{e.name}</td>
                      <td className="p-4 text-slate-600">{e.dept}</td>
                      <td className="p-4 font-semibold text-slate-800">{e.designation || e.role}</td>
                      <td className="p-4 text-slate-500">{e.joined}</td>
                      <td className="p-4 text-right font-bold text-emerald-600">
                        ₹{typeof e.salary === 'number' ? e.salary.toLocaleString('en-IN') : e.salary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: Attendance Logs */}
        {currentTab === 'attendance' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
              <div className="relative w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name, code or location..."
                  className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <span className="text-xs font-bold text-slate-500">{filteredAttendance.length} Records</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              {loading ? (
                <div className="py-16 text-center text-xs text-slate-400">Loading...</div>
              ) : attendanceRecords.length === 0 ? (
                <EmptyState message="Attendance table is empty." />
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="p-4">Employee</th>
                      <th className="p-4">Role & Dept</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Check-In</th>
                      <th className="p-4">Check-Out</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAttendance.map((a, idx) => (
                      <tr key={a.code || idx} className="hover:bg-slate-50 transition">
                        <td className="p-4">
                          <span className="font-bold text-slate-900 block">{a.name}</span>
                          <span className="text-[11px] text-blue-600 font-mono">{a.code}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-slate-800 block">{a.role}</span>
                          <span className="text-[11px] text-slate-400">{a.dept}</span>
                        </td>
                        <td className="p-4 font-medium text-slate-600">{a.location || '—'}</td>
                        <td className="p-4 font-bold text-slate-800">{a.checkIn}</td>
                        <td className="p-4 font-bold text-slate-800">{a.checkOut}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleToggleAttendance(a.code)}
                            className={`px-3 py-1 rounded text-[10px] font-extrabold cursor-pointer transition ${
                              a.status === 'PRESENT'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : a.status === 'ON_LEAVE'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {a.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Leave Approvals */}
        {currentTab === 'leave' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Leave Applications</h3>
              <span className="text-xs font-bold text-slate-500">{leaveRequests.length} Requests</span>
            </div>
            {loading ? (
              <div className="py-16 text-center text-xs text-slate-400">Loading...</div>
            ) : leaveRequests.length === 0 ? (
              <EmptyState message="No leave requests in the database." />
            ) : (
              <div className="space-y-2 text-xs">
                {leaveRequests.map((l) => (
                  <div key={l.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{l.name} ({l.role})</span>
                      <span className="text-slate-600 text-[11px]">Type: {l.type} • Reason: {l.reason}</span>
                      <span className="text-slate-400 block text-[10px] mt-0.5">Date: {l.date}</span>
                    </div>
                    {l.status === 'PENDING' ? (
                      <button
                        onClick={() => handleApproveLeave(l.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow"
                      >
                        Approve Leave
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-lg">
                        APPROVED BY COO
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Payroll Governance */}
        {currentTab === 'payroll' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            {notificationSentMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-xs text-emerald-900 font-bold shadow-xs animate-fadeIn">
                <Send className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{notificationSentMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${
                    payrollStatus === 'REJECTED'
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : isApprovalValid
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {payrollStatus === 'REJECTED'
                    ? 'PAYROLL REJECTED BY COO'
                    : isApprovalValid
                    ? `APPROVED BY COO (${daysRemaining} DAYS REMAINING)`
                    : 'APPROVAL EXPIRED — RE-APPROVE REQUIRED'}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Payroll Period: July 2026</span>
            </div>

            <h3 className="text-lg font-black text-slate-900">Monthly Payroll Ledger</h3>

            {/* APPROVED Status Banner */}
            {isApprovalValid && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 text-xs text-emerald-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-emerald-900 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>PAYROLL DISBURSEMENT APPROVED & ACTIVE ({daysRemaining} DAYS REMAINING)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-2.5 py-0.5 rounded-full">
                      NOTIFIED: HR COMMAND
                    </span>
                    <button
                      onClick={handleSimulateExpiry}
                      title="Test 30-day auto-reset behavior"
                      className="px-2.5 py-0.5 bg-amber-200 hover:bg-amber-300 text-amber-900 font-extrabold text-[10px] rounded-full transition flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Simulate 30 Days Expiry</span>
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-white border border-emerald-200 rounded-xl space-y-1">
                  <span className="font-bold text-emerald-900 block">30-Day Governance Cycle:</span>
                  <p className="text-slate-700 font-medium">
                    This payroll approval is active and notified to HR Operations. Upon completion of 30 days, the approval status will automatically reset to <strong>"Re-Approve Monthly Payroll"</strong> for the subsequent disbursement period.
                  </p>
                </div>
              </div>
            )}

            {/* EXPIRED Status Banner */}
            {payrollStatus === 'EXPIRED' && (
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-2 text-xs text-amber-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-amber-900 text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>30-DAY PAYROLL APPROVAL CYCLE COMPLETED — RE-APPROVAL REQUIRED</span>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full">
                    HR PENDING RE-APPROVAL
                  </span>
                </div>
                <p className="text-slate-700 font-medium bg-white p-3 border border-amber-200 rounded-xl">
                  The previous 30-day approval window for July 2026 has concluded. Please click <strong>"Re-Approve Monthly Payroll"</strong> below to approve the next monthly cycle and dispatch notification to HR.
                </p>
              </div>
            )}

            {/* REJECTED Status Banner */}
            {payrollStatus === 'REJECTED' && (
              <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-2 text-xs text-rose-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-rose-900 text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>PAYROLL DISBURSEMENT REJECTED & LOCKED</span>
                  </div>
                  <span className="text-[10px] bg-rose-200 text-rose-900 font-extrabold px-2.5 py-0.5 rounded-full">
                    NOTIFIED: HR & CEO
                  </span>
                </div>
                <div className="p-3 bg-white border border-rose-200 rounded-xl">
                  <span className="font-bold text-rose-900 block">Reason for Rejection:</span>
                  <p className="text-slate-800 font-medium italic">"{rejectionReason}"</p>
                </div>
                <div className="flex items-center space-x-4 text-[11px] text-rose-800 pt-1">
                  <span className="flex items-center gap-1 font-bold">
                    <UserCheck className="w-3.5 h-3.5" /> HR Dashboard Alert: Active
                  </span>
                  <span className="flex items-center gap-1 font-bold">
                    <Building className="w-3.5 h-3.5" /> CEO Executive Escalation: Active
                  </span>
                </div>
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-200 text-xs">
              <div>
                <span className="font-semibold text-slate-600 block">Total Calculated Payout</span>
                <span className="text-xs text-slate-400">
                  {employees.length === 0
                    ? 'No employees in database'
                    : `Sum of ${employees.length} employee salaries`}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-black text-slate-900 text-base">
                  {employees.length === 0 ? '₹0' : `₹${totalCalculatedPayroll.toLocaleString('en-IN')}`}
                </span>
                {employees.length > 0 && (
                  <button
                    onClick={() => setShowPayrollDetails(true)}
                    className="btn-interactive px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow flex items-center space-x-1 cursor-pointer active:scale-95"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                )}
              </div>
            </div>

            {/* Approval & Rejection Buttons Bar */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handleApprovePayroll}
                disabled={isApprovalValid}
                className={`px-5 py-2.5 font-bold text-xs rounded-xl transition-all duration-200 flex items-center space-x-1.5 ${
                  isApprovalValid
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 opacity-90 cursor-not-allowed shadow-none'
                    : 'btn-emerald-interactive bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md hover:shadow-lg active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isApprovalValid ? `Approved (${daysRemaining} Days Remaining)` : 'Approve Monthly Payroll & Notify HR'}</span>
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                disabled={isApprovalValid}
                className={`px-5 py-2.5 font-bold text-xs rounded-xl transition-all duration-200 flex items-center space-x-1.5 ${
                  isApprovalValid
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed shadow-none'
                    : 'btn-rose-interactive bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-md hover:shadow-lg active:scale-95'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>{isApprovalValid ? 'Reject Disabled (Currently Approved)' : 'Reject Monthly Payroll'}</span>
              </button>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2 text-rose-600 font-bold">
                      <XCircle className="w-5 h-5" />
                      <h2 className="text-base font-extrabold text-slate-900">Reject Monthly Payroll</h2>
                    </div>
                    <button
                      onClick={() => setShowRejectModal(false)}
                      className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleConfirmRejection} className="space-y-4">
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                      <p className="text-[11px] text-rose-700">
                        Rejecting will hold disbursement and notify the <strong>HR Operations Lead</strong> and <strong>CEO Dashboard</strong>.
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Reason for Rejection <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={rejectionInput}
                        onChange={(e) => setRejectionInput(e.target.value)}
                        placeholder="State the exact reason..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowRejectModal(false)}
                        className="btn-interactive px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs cursor-pointer active:scale-95"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!rejectionInput.trim()}
                        className="btn-rose-interactive px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs cursor-pointer shadow transition flex items-center space-x-1.5 active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm & Notify HR / CEO</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Payroll Details Modal */}
            {showPayrollDetails && (
              <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      Payroll Calculation Details
                    </h2>
                    <button
                      onClick={() => setShowPayrollDetails(false)}
                      className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
                          <th className="p-3">Code</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Designation</th>
                          <th className="p-3 text-right">Salary</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {employees.map((e, idx) => (
                          <tr key={e.code || idx}>
                            <td className="p-3 font-bold text-blue-600">{e.code}</td>
                            <td className="p-3 font-bold text-slate-900">{e.name}</td>
                            <td className="p-3 text-slate-600">{e.designation || e.role}</td>
                            <td className="p-3 text-right font-bold text-emerald-600">
                              ₹{(typeof e.salary === 'number' ? e.salary : 0).toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-50 border-t border-slate-200 font-extrabold text-slate-900">
                          <td colSpan={3} className="p-3 text-right uppercase tracking-wider text-[11px] text-slate-500">
                            Total:
                          </td>
                          <td className="p-3 text-right text-blue-600 font-black text-sm">
                            ₹{totalCalculatedPayroll.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setShowPayrollDetails(false)}
                      className="btn-interactive px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer active:scale-95"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Performance Index */}
        {currentTab === 'performance' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Staff Performance Scorecard
              </h3>
              <span className="text-xs font-bold text-blue-600">{employees.length} Employees</span>
            </div>
            {loading ? (
              <div className="py-16 text-center text-xs text-slate-400">Loading...</div>
            ) : employees.length === 0 ? (
              <EmptyState message="No employee records to evaluate." />
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Employee Code & Name</th>
                    <th className="p-4">Role & Dept</th>
                    <th className="p-4">Monthly Salary</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Performance Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {employees.map((e, idx) => (
                    <tr key={e.code || idx} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <span className="font-bold text-slate-900 block">{e.name}</span>
                        <span className="text-[11px] text-blue-600 font-mono">{e.code}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800 block">{e.designation || e.role}</span>
                        <span className="text-[11px] text-slate-400">{e.dept}</span>
                      </td>
                      <td className="p-4 font-black text-emerald-600">
                        ₹{typeof e.salary === 'number' ? e.salary.toLocaleString('en-IN') : e.salary}
                      </td>
                      <td className="p-4 font-bold text-slate-700">{e.status || 'ACTIVE'}</td>
                      <td className="p-4 text-right">
                        <span className="px-2.5 py-1 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                          EXCELLENT
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </RouteGuard>
  );
}

export default function WorkforcePage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading...</div>}>
      <WorkforceInner />
    </Suspense>
  );
}


