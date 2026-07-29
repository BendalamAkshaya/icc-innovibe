'use client';

import React, { useState } from 'react';
import {
  hrAttendanceRoster,
  AttendanceRecord,
} from './hr-mock-data';
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Calendar,
  Search,
  Check,
  X,
} from 'lucide-react';

interface AttendanceViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function AttendanceView({ showToast }: AttendanceViewProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>(hrAttendanceRoster);

  // Correction requests mock state
  const [corrections, setCorrections] = useState([
    {
      id: 'cor_01',
      name: 'Kiran Gopi',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
      date: '22 Jul 2026',
      type: 'Forgotten Check-Out',
      details: 'On field visit for Ather battery thermal troubleshooting at Kakinada Substation.',
      suggestedHours: '09:00 AM - 06:15 PM',
      status: 'PENDING',
    },
    {
      id: 'cor_02',
      name: 'Srinivas Rao',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      date: '20 Jul 2026',
      type: 'Late Check-in Override',
      details: 'Heavy rainfall and traffic delay at Rajahmundry toll plaza gate.',
      suggestedHours: '09:00 AM - 06:00 PM',
      status: 'PENDING',
    },
  ]);

  // Heatmap calendar mock data (July 2026)
  const heatmapDays = [
    { day: 1, status: 'ON_TIME' }, { day: 2, status: 'ON_TIME' }, { day: 3, status: 'ON_TIME' }, { day: 4, status: 'HOLIDAY' }, { day: 5, status: 'WEEKEND' },
    { day: 6, status: 'ON_TIME' }, { day: 7, status: 'LATE' }, { day: 8, status: 'ON_TIME' }, { day: 9, status: 'ON_TIME' }, { day: 10, status: 'LEAVE' },
    { day: 11, status: 'WEEKEND' }, { day: 12, status: 'WEEKEND' }, { day: 13, status: 'ON_TIME' }, { day: 14, status: 'ON_TIME' }, { day: 15, status: 'ON_TIME' },
    { day: 16, status: 'LATE' }, { day: 17, status: 'ON_TIME' }, { day: 18, status: 'WEEKEND' }, { day: 19, status: 'WEEKEND' }, { day: 20, status: 'ON_TIME' },
    { day: 21, status: 'ON_TIME' }, { day: 22, status: 'ON_TIME' }, { day: 23, status: 'ABSENT' }, { day: 24, status: 'ON_TIME' }, { day: 25, status: 'WEEKEND' },
    { day: 26, status: 'WEEKEND' }, { day: 27, status: 'ON_TIME' }, { day: 28, status: 'ON_TIME' }, { day: 29, status: 'ON_TIME' }, { day: 30, status: 'ON_TIME' },
    { day: 31, status: 'ON_TIME' }
  ];

  // Resolve status color for heatmap
  const getHeatmapColor = (status: string) => {
    switch (status) {
      case 'ON_TIME':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/20';
      case 'LATE':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-700 hover:bg-amber-500/20';
      case 'ABSENT':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-700 hover:bg-rose-500/20';
      case 'LEAVE':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-700 hover:bg-blue-500/20';
      case 'HOLIDAY':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-700 hover:bg-purple-500/20';
      case 'WEEKEND':
        return 'bg-slate-100 border-slate-200 text-slate-400';
      default:
        return 'bg-slate-50 border-slate-150';
    }
  };

  // Correction Action
  const handleCorrectionAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    setCorrections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' } : c))
    );
    showToast(`Attendance correction request has been ${action === 'APPROVE' ? 'Approved' : 'Rejected'}.`, 'success');
  };

  // KPI Summary
  const presentCount = records.filter((r) => r.status === 'PRESENT' || r.status === 'REMOTE').length;
  const lateCount = records.filter((r) => r.status === 'LATE').length;
  const absentCount = records.filter((r) => r.status === 'ABSENT').length;

  return (
    <div className="space-y-6">
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Headcount Present</p>
            <p className="text-xl font-black text-slate-900 mt-1">{presentCount} Staff</p>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">58 On Duty</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600"><CheckCircle className="h-5 w-5" /></div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Late Check-ins</p>
            <p className="text-xl font-black text-slate-900 mt-1">{lateCount} Staff</p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">SLA penalty warning</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-600"><Clock className="h-5 w-5" /></div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Absent Today</p>
            <p className="text-xl font-black text-rose-600 mt-1">{absentCount} Staff</p>
            <span className="text-[10px] text-rose-500 font-semibold mt-1 inline-block">No reason provided</span>
          </div>
          <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-600"><AlertTriangle className="h-5 w-5" /></div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leave Roster Today</p>
            <p className="text-xl font-black text-blue-600 mt-1">1 Staff</p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">Suresh K. (Medical)</span>
          </div>
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600"><Calendar className="h-5 w-5" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Roster Logs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Daily Attendance Roster Logs</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                REALTIME
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[9px] tracking-wider font-black">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Check-In</th>
                  <th className="py-3 px-4">Check-Out</th>
                  <th className="py-3 px-4">Hours Logged</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={r.avatar} alt={r.name} className="h-7 w-7 rounded-full object-cover border border-slate-200" />
                        <div>
                          <p className="font-extrabold text-slate-800">{r.name}</p>
                          <p className="text-[9px] text-slate-400 font-medium">{r.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-700">{r.checkIn}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-700">{r.checkOut}</td>
                    <td className="py-2.5 px-4 font-mono font-extrabold text-slate-850">{r.workingHours}</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black border ${
                        r.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        r.status === 'REMOTE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        r.status === 'LATE' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance corrections pending */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Attendance Correction Approvals</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Missed check-in override requests from field teams.</p>
            </div>

            <div className="space-y-3.5">
              {corrections.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex items-start gap-4">
                  <img src={item.avatar} alt={item.name} className="h-8 w-8 rounded-full object-cover border border-slate-200 mt-1" />
                  
                  <div className="grow space-y-2 text-left">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-850">{item.name}</h4>
                        <span className="text-[9px] font-mono text-slate-400">{item.date}</span>
                      </div>
                      <p className="text-[9px] font-black text-blue-600 mt-0.5">{item.type}</p>
                    </div>

                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed bg-white p-2 rounded-lg border border-slate-100">
                      {item.details}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black font-mono text-slate-600 bg-slate-200/60 px-2.5 py-1 rounded-md">
                        Suggested Hours: {item.suggestedHours}
                      </span>

                      {item.status === 'PENDING' ? (
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={() => handleCorrectionAction(item.id, 'REJECT')}
                            className="p-1 rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 transition-all"
                            title="Reject"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleCorrectionAction(item.id, 'APPROVE')}
                            className="p-1 rounded-lg border border-emerald-200 bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
                            title="Approve & Sync"
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

        {/* Heatmap Calendar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Attendance Heatmap</h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Vibe index of the Kakinada Hub (July 2026)</p>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider border-b border-slate-100 pb-2">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {/* Empty padding days for calendar alignment (July 2026 starts on Wed) */}
              <span className="h-8 border border-transparent" />
              <span className="h-8 border border-transparent" />
              
              {heatmapDays.map((day) => (
                <div
                  key={day.day}
                  className={`h-8 border rounded-lg flex items-center justify-center text-[10px] font-black transition-all cursor-pointer ${getHeatmapColor(day.status)}`}
                  title={`Day ${day.day} - ${day.status}`}
                  onClick={() => showToast(`July ${day.day} Status: ${day.status}`, 'info')}
                >
                  {day.day}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-[10px]">
              <p className="font-extrabold text-slate-400 uppercase tracking-wider">Heatmap index</p>
              <div className="grid grid-cols-2 gap-1.5 font-bold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-emerald-500/10 border border-emerald-500/30 shrink-0" /> On Time</div>
                <div className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-amber-500/10 border border-amber-500/30 shrink-0" /> Late</div>
                <div className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-rose-500/10 border border-rose-500/30 shrink-0" /> Absent</div>
                <div className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-blue-500/10 border border-blue-500/30 shrink-0" /> Approved Leave</div>
                <div className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-purple-500/10 border border-purple-500/30 shrink-0" /> National Holiday</div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
