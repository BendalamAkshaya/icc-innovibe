'use client';

import React from 'react';
import { WorkSession } from '../../../../lib/logout-models';
import { X, FileText, CheckCircle2, Clock, Calendar, AlertCircle, ShieldCheck } from 'lucide-react';

interface ViewReportModalProps {
  session: WorkSession | null;
  onClose: () => void;
}

export function ViewReportModal({ session, onClose }: ViewReportModalProps) {
  if (!session) return null;

  const report = session.workReport;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-slate-100 text-left space-y-6 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <img
              src={session.avatar}
              alt={session.employeeName}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(session.employeeName)}&background=fef3c7&color=92400e`;
              }}
              className="h-12 w-12 rounded-2xl object-cover border border-slate-700 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 font-apfel text-xs">
                <h2 className="font-gotham text-lg font-extrabold text-white">{session.employeeName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold text-[10px]">
                  {session.id}
                </span>
              </div>
              <p className="font-sans text-xs text-slate-400">
                {session.role} • <span className="text-amber-400 font-semibold">{session.departmentName}</span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 text-xs font-sans">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-apfel">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-0.5">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">LOGIN TIME</span>
              <p className="text-xs font-bold text-emerald-400">{session.loginTime}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-0.5">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">LOGOUT TIME</span>
              <p className="text-xs font-bold text-amber-400">{session.logoutTime || '--'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-0.5">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">TOTAL DURATION</span>
              <p className="text-xs font-black text-white">{session.duration}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-0.5">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">SESSION STATUS</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
                {session.status}
              </span>
            </div>
          </div>

          {/* Work Summary */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h3 className="font-gotham text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> End-of-Day Work Summary
            </h3>
            <p className="font-sans text-xs text-slate-300 font-normal leading-relaxed">
              {report ? report.workSummary : 'No detailed work report submitted.'}
            </p>
          </div>

          {/* Tasks Completed & Pending Tasks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2">
              <h3 className="font-gotham text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Tasks Completed
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-xs">
                {report && report.tasksCompleted.length > 0 ? (
                  report.tasksCompleted.map((t, idx) => <li key={idx}>{t}</li>)
                ) : (
                  <li className="text-slate-500 italic">None reported</li>
                )}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2">
              <h3 className="font-gotham text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Pending Tasks & Priorities
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-xs">
                {report && report.pendingTasks.length > 0 ? (
                  report.pendingTasks.map((t, idx) => <li key={idx}>{t}</li>)
                ) : (
                  <li className="text-slate-500 italic">None reported</li>
                )}
              </ul>
            </div>
          </div>

          {/* Time Notes & Challenges */}
          {report && (
            <div className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">CHALLENGES / BLOCKERS</span>
                  <p className="text-slate-300">{report.challengesBlockers}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">TIME SPENT NOTES</span>
                  <p className="text-slate-300">{report.timeNotes}</p>
                </div>
              </div>

              {report.additionalNotes && (
                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">ADDITIONAL NOTES / COMMENTARY</span>
                  <p className="text-slate-300">{report.additionalNotes}</p>
                </div>
              )}

              {report.attachments && report.attachments.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">ATTACHED DELIVERABLES & FILES</span>
                  <div className="flex flex-wrap gap-2">
                    {report.attachments.map((att) => (
                      <a
                        key={att.id}
                        href={att.url || '#'}
                        download={att.filename}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-amber-500/50 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-xs">{att.filename}</span>
                        <span className="text-[10px] text-slate-500">({att.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 font-apfel text-xs">
          <span className="text-slate-500">
            Logout Method: <span className="text-slate-300 font-bold">{report?.logoutMethod || 'MANUAL_LOGOUT'}</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
