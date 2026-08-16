'use client';

import React, { useState } from 'react';
import { SubmitWorkReportPayload } from '../../../../lib/logout-models';
import { LogoutService } from '../../../../lib/logout-service';
import { X, LogOut, CheckCircle2, FileText, AlertCircle, Save, Clock } from 'lucide-react';

interface DailyWorkReportModalProps {
  isOpen: boolean;
  sessionId: string;
  onClose: () => void;
  onSubmitted: () => void;
}

export function DailyWorkReportModal({ isOpen, sessionId, onClose, onSubmitted }: DailyWorkReportModalProps) {
  const [workSummary, setWorkSummary] = useState('');
  const [tasksCompletedRaw, setTasksCompletedRaw] = useState('');
  const [pendingTasksRaw, setPendingTasksRaw] = useState('');
  const [challenges, setChallenges] = useState('');
  const [timeNotes, setTimeNotes] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !sessionId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workSummary.trim()) {
      alert('Please enter a brief summary of what you accomplished today.');
      return;
    }

    setIsSubmitting(true);

    const tasksCompleted = tasksCompletedRaw
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const pendingTasks = pendingTasksRaw
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: SubmitWorkReportPayload = {
      sessionId,
      workSummary: workSummary.trim(),
      tasksCompleted: tasksCompleted.length > 0 ? tasksCompleted : ['General daily tasks completed'],
      pendingTasks: pendingTasks.length > 0 ? pendingTasks : ['None reported'],
      challengesBlockers: challenges.trim() || 'No major blockers encountered today.',
      timeNotes: timeNotes.trim() || 'Standard business working hours.',
      additionalNotes: additionalNotes.trim() || undefined,
      logoutMethod: 'MANUAL_LOGOUT',
    };

    await LogoutService.submitReport(payload);
    setIsSubmitting(false);
    onSubmitted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl text-left space-y-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <LogOut className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-gotham text-lg font-extrabold text-white">Daily Work Report & Session Checkout</h2>
              <p className="font-sans text-xs text-slate-400">Summarize your key deliverables before completing logout</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {/* Work Summary */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
              Work Summary * (What did you accomplish today?)
            </label>
            <textarea
              value={workSummary}
              onChange={(e) => setWorkSummary(e.target.value)}
              placeholder="e.g. Conducted executive quarterly review with board members, finalized fleet telemetry roadmap..."
              rows={3}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans text-xs leading-relaxed"
            />
          </div>

          {/* Row 2: Tasks Completed & Pending Tasks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Tasks Completed (One per line)
              </label>
              <textarea
                value={tasksCompletedRaw}
                onChange={(e) => setTasksCompletedRaw(e.target.value)}
                placeholder="Approved hardware budget&#10;Reviewed TMS Employees module&#10;Signed off on expansion"
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans text-xs"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Pending Tasks / Next Day Priorities
              </label>
              <textarea
                value={pendingTasksRaw}
                onChange={(e) => setPendingTasksRaw(e.target.value)}
                placeholder="Finalize COO performance metrics&#10;Approve Q4 investor deck"
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans text-xs"
              />
            </div>
          </div>

          {/* Row 3: Challenges & Time Spent Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Challenges / Blockers
              </label>
              <input
                type="text"
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="e.g. Minor delay in chip supply chain delivery..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans text-xs"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Time Spent Notes
              </label>
              <input
                type="text"
                value={timeNotes}
                onChange={(e) => setTimeNotes(e.target.value)}
                placeholder="e.g. 4 hrs meetings, 3 hrs architecture review..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans text-xs"
              />
            </div>
          </div>

          {/* Row 4: Additional Notes */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
              Additional Commentary / Notes (Optional)
            </label>
            <input
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Great overall team velocity today..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans text-xs"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 font-apfel">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              <span>Save Draft & Stay Signed In</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>{isSubmitting ? 'Submitting & Logging Out...' : 'Submit Report & Complete Logout'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
