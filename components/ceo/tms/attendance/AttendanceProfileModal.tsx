'use client';

import React, { useState, useEffect } from 'react';
import { AttendanceProfileDetails } from '../../../../lib/attendance-models';
import { AttendanceService } from '../../../../lib/attendance-service';
import {
  X,
  User,
  Clock,
  Calendar,
  MapPin,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  TrendingUp,
  Activity,
  Smartphone,
  Cpu,
} from 'lucide-react';

interface AttendanceProfileModalProps {
  employeeId: string | null;
  onClose: () => void;
}

export function AttendanceProfileModal({ employeeId, onClose }: AttendanceProfileModalProps) {
  const [profile, setProfile] = useState<AttendanceProfileDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'CALENDAR' | 'LATE_REPORTS' | 'AUDIT'>('TIMELINE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!employeeId) return;

    const loadProfile = async () => {
      setIsLoading(true);
      const data = await AttendanceService.getAttendanceProfile(employeeId);
      setProfile(data);
      setIsLoading(false);
    };

    loadProfile();
  }, [employeeId]);

  if (!employeeId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">
        {isLoading || !profile ? (
          <div className="p-12 text-center text-slate-400 font-apfel text-xs">
            Loading Attendance Profile...
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 bg-slate-950/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={profile.record.avatar}
                  alt={profile.record.employeeName}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.record.employeeName)}&background=fef3c7&color=92400e`;
                  }}
                  className="h-14 w-14 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md"
                />
                <div className="space-y-0.5 text-left">
                  <div className="flex items-center gap-2">
                    <h2 className="font-gotham text-lg font-extrabold text-white">{profile.record.employeeName}</h2>
                    <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {profile.record.employeeId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{profile.record.role} • {profile.record.department}</p>
                  <p className="text-[11px] text-amber-400 font-apfel font-semibold">{profile.record.shiftName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right font-apfel">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Attendance Rate</span>
                  <p className="text-lg font-black text-emerald-400">{profile.record.attendancePercentage}%</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick KPI Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-950/40 border-b border-slate-800/80 font-apfel text-xs text-left">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">First Check-in</span>
                <p className="font-bold text-emerald-400">{profile.record.firstCheckIn}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Last Check-out</span>
                <p className="font-bold text-sky-400">{profile.record.lastCheckOut}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Hours Today</span>
                <p className="font-bold text-amber-400">{profile.record.totalWorkingHours} hrs</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Today Status</span>
                <p className="font-bold text-emerald-400">{profile.record.status}</p>
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 font-apfel text-xs">
              <button
                onClick={() => setActiveTab('TIMELINE')}
                className={`pb-3 px-3 font-bold transition-all border-b-2 ${
                  activeTab === 'TIMELINE' ? 'border-amber-400 text-amber-300 font-extrabold' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Check-in Sessions & Timeline
              </button>
              <button
                onClick={() => setActiveTab('CALENDAR')}
                className={`pb-3 px-3 font-bold transition-all border-b-2 ${
                  activeTab === 'CALENDAR' ? 'border-amber-400 text-amber-300 font-extrabold' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Monthly Calendar (30 Days)
              </button>
              <button
                onClick={() => setActiveTab('LATE_REPORTS')}
                className={`pb-3 px-3 font-bold transition-all border-b-2 ${
                  activeTab === 'LATE_REPORTS' ? 'border-amber-400 text-amber-300 font-extrabold' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Late Reports & Leave History
              </button>
              <button
                onClick={() => setActiveTab('AUDIT')}
                className={`pb-3 px-3 font-bold transition-all border-b-2 ${
                  activeTab === 'AUDIT' ? 'border-amber-400 text-amber-300 font-extrabold' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Biometric Audit Log
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto max-h-[55vh] text-left space-y-4">
              {activeTab === 'TIMELINE' && (
                <div className="space-y-4">
                  <h3 className="font-gotham text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Today&apos;s Gatekeeper Check-In Sessions
                  </h3>
                  {profile.record.sessions.map((session) => (
                    <div key={session.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Cpu className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-gotham text-xs font-bold text-white">
                            {session.checkInTime} — {session.checkOutTime || 'Active Shift'}
                          </p>
                          <p className="text-[11px] text-slate-400 font-sans flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 text-amber-400" />
                            <span>{session.locationGps}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-apfel text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                          {session.deviceType.replace('_', ' ')}
                        </span>
                        <span className="font-extrabold text-emerald-400">{session.durationHours} Hours</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'CALENDAR' && (
                <div className="space-y-4">
                  <h3 className="font-gotham text-xs font-bold text-slate-400 uppercase tracking-wider">
                    30-Day Monthly Attendance Grid
                  </h3>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 font-apfel text-xs">
                    {profile.monthlyCalendar.map((day) => (
                      <div
                        key={day.day}
                        className={`p-2.5 rounded-xl border text-center font-bold flex flex-col justify-between h-14 ${
                          day.status === 'PRESENT'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : day.status === 'LATE'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : day.status === 'LEAVE'
                            ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                            : 'bg-slate-950 text-slate-600 border-slate-800'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400">{day.day}</span>
                        <span className="text-[9px] font-extrabold">{day.status.substring(0, 3)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'LATE_REPORTS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Late Reports */}
                  <div className="space-y-3">
                    <h3 className="font-gotham text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Late Arrival Logs & Reasons
                    </h3>
                    {profile.lateReports.map((late, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                        <div className="flex items-center justify-between font-apfel text-xs">
                          <span className="font-bold text-amber-300">{late.date}</span>
                          <span className="font-extrabold text-rose-400">+{late.delayMinutes} mins</span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans">{late.reason}</p>
                      </div>
                    ))}
                  </div>

                  {/* Leave History */}
                  <div className="space-y-3">
                    <h3 className="font-gotham text-xs font-bold text-sky-400 uppercase tracking-wider">
                      Approved Leave Requests
                    </h3>
                    {profile.leaveHistory.map((leave, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                        <div className="flex items-center justify-between font-apfel text-xs">
                          <span className="font-bold text-sky-300">{leave.date}</span>
                          <span className="font-extrabold text-emerald-400">{leave.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans">{leave.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'AUDIT' && (
                <div className="space-y-3">
                  <h3 className="font-gotham text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Biometric & System Verification Audit Log
                  </h3>
                  {profile.auditLogs.map((log, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between font-apfel text-xs">
                      <div>
                        <p className="font-bold text-slate-200">{log.action}</p>
                        <span className="text-[10px] text-slate-500">Performed by: {log.performedBy}</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
