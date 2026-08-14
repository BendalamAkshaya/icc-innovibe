'use client';

import React, { useState, useEffect } from 'react';
import { WorkSession } from '../../../../lib/logout-models';
import { LogoutService } from '../../../../lib/logout-service';
import { Calendar, FileText, X, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function TmsEmployeeSessionHistoryView() {
  const [sessions, setSessions] = useState<WorkSession[]>([]);
  const [kpis, setKpis] = useState({ totalShifts: 62, reportsSubmitted: 61 });
  const [selectedReportSession, setSelectedReportSession] = useState<WorkSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load Session History via Service Layer
  const loadData = async () => {
    setIsLoading(true);
    const sessionList = await LogoutService.getAll({ employeeId: 'EMP-102' });
    const kpiSummary = await LogoutService.getKpis();

    setSessions(sessionList);
    setKpis({
      totalShifts: sessionList.length > 0 ? sessionList.length : kpiSummary.totalSessionsToday,
      reportsSubmitted: sessionList.filter((s) => s.reportSubmitted).length,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      
      {/* 1. Header */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-black text-[#0F172A] tracking-tight">
          My Session History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Review your past checked in shifts, working hours, and submitted daily work session reports.
        </p>
      </div>

      {/* 2. Summary Cards (2 Cards: TOTAL SHIFTS & REPORTS SUBMITTED) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* TOTAL SHIFTS */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              TOTAL SHIFTS
            </span>
            <span className="text-3xl font-black text-[#0F172A] leading-tight block">
              {kpis.totalShifts}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Calendar className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        {/* REPORTS SUBMITTED */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              REPORTS SUBMITTED
            </span>
            <span className="text-3xl font-black text-[#0F172A] leading-tight block">
              {kpis.reportsSubmitted}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <FileText className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

      </div>

      {/* 3. Shift Session Logs Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-black text-[#0F172A] tracking-tight">Shift Session Logs</h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-600 border border-blue-200">
            {kpis.totalShifts}
          </span>
        </div>

        {isLoading ? (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 font-bold text-xs">
            Loading session logs...
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 font-bold text-xs">
            No session logs found.
          </div>
        ) : (
          <div className="space-y-3.5">
            {sessions.map((sess) => {
              const isActive = sess.status === 'ACTIVE';

              return (
                <div
                  key={sess.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition"
                >
                  {/* Left Side: Dot, Date, Active Pill, IN/OUT times */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">{sess.date}</h3>
                      
                      {isActive && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[9px] font-black uppercase tracking-wider">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-xs text-slate-500 font-bold pt-0.5">
                      <span>
                        <strong className="text-slate-400 font-bold mr-1">IN:</strong>
                        <span className="text-slate-700">{sess.loginTime}</span>
                      </span>
                      <span>
                        <strong className="text-slate-400 font-bold mr-1">OUT:</strong>
                        <span className={isActive ? 'text-slate-700 font-bold' : 'text-slate-700'}>
                          {sess.logoutTime || 'Active Shift'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Right Side: View Report Button or No report submitted badge */}
                  <div className="flex items-center self-end sm:self-auto shrink-0">
                    {sess.reportSubmitted && sess.workReport ? (
                      <button
                        onClick={() => setSelectedReportSession(sess)}
                        className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200/90 shadow-2xs hover:border-slate-300 transition cursor-pointer flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span>View Report</span>
                      </button>
                    ) : (
                      <span className="text-xs font-semibold italic text-slate-400 border border-slate-100 bg-slate-50/50 px-3.5 py-1.5 rounded-xl">
                        No report submitted
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Work Session Report Detail Lightbox Modal */}
      {selectedReportSession && selectedReportSession.workReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Work Session Report Detail</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  Reported on {selectedReportSession.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedReportSession(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Login & Logout Times Banner */}
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">LOGIN TIME</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{selectedReportSession.loginTime}</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">LOGOUT TIME</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{selectedReportSession.logoutTime || 'Active Shift'}</span>
              </div>
            </div>

            {/* Field 1: WORK SUMMARY */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">WORK SUMMARY</label>
              <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 text-xs text-slate-800 font-medium leading-relaxed">
                {selectedReportSession.workReport.workSummary}
              </div>
            </div>

            {/* Field 2 & 3: TASKS COMPLETED & PENDING TASKS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">TASKS COMPLETED</label>
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 text-xs text-slate-800 font-medium leading-relaxed min-h-[70px]">
                  {selectedReportSession.workReport.tasksCompleted && selectedReportSession.workReport.tasksCompleted.length > 0 ? (
                    <ul className="space-y-1 italic text-slate-600">
                      {selectedReportSession.workReport.tasksCompleted.map((t, idx) => (
                        <li key={idx}><em>{t}</em></li>
                      ))}
                    </ul>
                  ) : (
                    <em className="text-slate-500">None reported</em>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">PENDING TASKS</label>
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 text-xs text-slate-800 font-medium leading-relaxed min-h-[70px]">
                  {selectedReportSession.workReport.pendingTasks && selectedReportSession.workReport.pendingTasks.length > 0 ? (
                    <ul className="space-y-1 italic text-slate-600">
                      {selectedReportSession.workReport.pendingTasks.map((t, idx) => (
                        <li key={idx}><em>{t}</em></li>
                      ))}
                    </ul>
                  ) : (
                    <em className="text-slate-500">None reported</em>
                  )}
                </div>
              </div>
            </div>

            {/* Field 4 & 5: CHALLENGES / BLOCKERS & TIME SPENT NOTES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">CHALLENGES / BLOCKERS</label>
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 text-xs text-slate-800 font-medium leading-relaxed min-h-[70px]">
                  <em className="text-slate-600">{selectedReportSession.workReport.challengesBlockers || 'None reported'}</em>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">TIME SPENT NOTES</label>
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 text-xs text-slate-800 font-medium leading-relaxed min-h-[70px]">
                  <em className="text-slate-600">{selectedReportSession.workReport.timeNotes || 'None reported'}</em>
                </div>
              </div>
            </div>

            {/* Field 6: ADDITIONAL NOTES */}
            {selectedReportSession.workReport.additionalNotes && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">ADDITIONAL NOTES</label>
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/80 text-xs text-slate-800 font-medium leading-relaxed">
                  {selectedReportSession.workReport.additionalNotes}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
