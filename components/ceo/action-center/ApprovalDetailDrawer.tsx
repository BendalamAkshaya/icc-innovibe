'use client';

import React from 'react';
import { DecisionRequestItem } from '../../../lib/types';
import { X, CheckCircle2, XCircle, HelpCircle, UserPlus, Sparkles, FileText, TrendingUp, ShieldAlert, ArrowUpRight, MessageSquare } from 'lucide-react';

interface ApprovalDetailDrawerProps {
  request: DecisionRequestItem | null;
  onClose: () => void;
  onApprove: (id: string, title: string) => void;
  onReject: (id: string, title: string) => void;
  onDelegate: (id: string, title: string) => void;
  onOpenSimulate: (request: DecisionRequestItem) => void;
}

export function ApprovalDetailDrawer({
  request,
  onClose,
  onApprove,
  onReject,
  onDelegate,
  onOpenSimulate,
}: ApprovalDetailDrawerProps) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in" suppressHydrationWarning>
      <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between p-6 space-y-6 text-left border-l border-slate-200">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {request.category}
                </span>
                <span className="text-xs font-bold text-slate-500">• {request.branch}</span>
              </div>
              <h2 className="text-lg font-black text-slate-900">{request.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* AI Recommendation Badge & Summary */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase text-sky-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" /> AI EXECUTIVE RECOMMENDATION: APPROVE (96% CONFIDENCE)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">LOW RISK</span>
            </div>
            <p className="text-slate-200 font-semibold leading-relaxed">
              "Proposal delivers an estimated 22.4% ROI within 10 months. Fits within Q2 capital allocation budget. Supported by VP Operations & Finance."
            </p>
          </div>

          {/* Financial Snapshot Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Requested Budget</span>
              <p className="text-sm font-black text-slate-900">{request.financialImpact}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-0.5">
              <span className="text-[9px] font-extrabold uppercase text-emerald-700 block">Projected ROI</span>
              <p className="text-sm font-black text-emerald-900">22.4%</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-0.5">
              <span className="text-[9px] font-extrabold uppercase text-purple-700 block">Payback Period</span>
              <p className="text-xs font-extrabold text-purple-900 mt-1">10 Months</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-0.5">
              <span className="text-[9px] font-extrabold uppercase text-sky-700 block">Due Date</span>
              <p className="text-xs font-extrabold text-slate-900 mt-1">{request.dueDate}</p>
            </div>
          </div>

          {/* Business Case & Description */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Business Case Justification</h3>
            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {request.businessImpact}
            </p>
          </div>

          {/* Submitted By & Approvals Hierarchy */}
          <div className="space-y-2 text-xs">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Signoff Audit Chain</h3>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-slate-700 font-bold">
                <span>Submitted by: {request.submittedBy} ({request.submittedByRole})</span>
                <span className="text-emerald-600 font-mono text-[11px]">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 font-bold">
                <span>Finance CFO Review: Vikram Mehta</span>
                <span className="text-emerald-600 font-mono text-[11px]">✓ Pre-Approved</span>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Attached Verification Documents (3)</h3>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-200 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-indigo-600" />
                <span>Financial_ROI_Model.pdf</span>
              </button>
              <button className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-200 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-indigo-600" />
                <span>Vendor_Quotes.pdf</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onOpenSimulate(request)}
            className="px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs flex items-center gap-1.5"
          >
            <ShieldAlert className="h-4 w-4 text-amber-600" />
            <span>Simulate Rejection</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onReject(request.id, request.title);
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 font-extrabold text-xs"
            >
              Reject
            </button>
            <button
              onClick={() => {
                onApprove(request.id, request.title);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Approve Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
