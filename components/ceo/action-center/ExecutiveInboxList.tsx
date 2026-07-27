'use client';

import React, { useState } from 'react';
import { DecisionRequestItem } from '../../../lib/types';
import { CheckCircle2, XCircle, HelpCircle, UserPlus, Sparkles, Clock, AlertTriangle, ArrowUpRight, ChevronDown, ChevronUp, MoreHorizontal, ShieldAlert } from 'lucide-react';

interface ExecutiveInboxListProps {
  requests: DecisionRequestItem[];
  onApprove: (id: string, title: string) => void;
  onReject: (id: string, title: string) => void;
  onRequestInfo: (id: string, title: string) => void;
  onDelegate: (id: string, title: string) => void;
  onOpenAiAdvisor: (requestId: string) => void;
  onOpenDrawer?: (request: DecisionRequestItem) => void;
  onOpenSimulate?: (request: DecisionRequestItem) => void;
}

export function ExecutiveInboxList({
  requests,
  onApprove,
  onReject,
  onRequestInfo,
  onDelegate,
  onOpenAiAdvisor,
  onOpenDrawer,
  onOpenSimulate,
}: ExecutiveInboxListProps) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(requests[0]?.id || null);
  const [focusFilter, setFocusFilter] = useState('ALL');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const focusPills = [
    { id: 'ALL', label: 'All Decisions' },
    { id: 'SIGNATURE', label: 'Requires My Signature' },
    { id: 'TODAY', label: 'Due Today' },
    { id: 'DELEGATE', label: 'Can Delegate' },
    { id: 'HIGH_VALUE', label: 'High Value (> ₹10L)' },
    { id: 'RISKY', label: 'Risky Decisions' },
  ];

  const filteredRequests = requests.filter((r) => {
    if (focusFilter === 'TODAY') return r.dueDate.toLowerCase().includes('today');
    if (focusFilter === 'RISKY') return r.riskLevel === 'CRITICAL' || r.riskLevel === 'HIGH';
    if (focusFilter === 'HIGH_VALUE') return r.financialImpact.includes('L') || r.financialImpact.includes('Cr');
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-5 text-left" suppressHydrationWarning>
      {/* 1. Header & AI Executive Summary Banner */}
      <div className="space-y-4 border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Executive Decision Inbox (Progressive Disclosure)</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Review compact decision summaries. Only one approval card expands at a time to eliminate clutter.
            </p>
          </div>

          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
            {filteredRequests.length} Pending Decision Signoffs
          </span>
        </div>

        {/* AI Top Executive Summary Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-start gap-3">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 shrink-0">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div className="space-y-0.5 text-xs">
            <span className="text-[10px] font-mono font-black uppercase text-sky-400">TODAY'S AI DECISION SUMMARY</span>
            <p className="font-extrabold text-slate-100">
              6 pending approvals worth <strong className="text-emerald-400">₹2.8 Cr total value</strong>. 2 require immediate action today.
            </p>
            <p className="text-slate-400 text-[11px]">AI recommends approving 5 requests and requesting documentation on 1.</p>
          </div>
        </div>

        {/* Executive Focus Mode Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Executive Focus Mode:</span>
          {focusPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFocusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                focusFilter === pill.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Inbox Approval Cards (One Expanded Card Rule) */}
      <div className="space-y-3">
        {filteredRequests.map((req) => {
          const isExpanded = expandedCardId === req.id;
          const isDropdownOpen = openDropdownId === req.id;

          return (
            <div
              key={req.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'bg-white border-indigo-300 shadow-md ring-2 ring-indigo-500/10' : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Compact Card Header (~110-130px height) */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {req.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500">• {req.branch}</span>
                    <span className="text-[9px] font-mono font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Due: {req.dueDate}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">{req.title}</h3>

                  {/* Financial Snapshot Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-600 pt-0.5">
                    <span className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-900 font-mono font-black">
                      {req.financialImpact}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200 font-mono">
                      ROI 22.4%
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-200">
                      AI: Approve (96%)
                    </span>
                    <span className="text-slate-400 font-medium">Owner: {req.submittedBy}</span>
                  </div>
                </div>

                {/* Compact Actions Row */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onApprove(req.id, req.title)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => toggleExpand(req.id)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-extrabold text-xs flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Collapse' : 'Review'}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {/* Secondary Dropdown Trigger (•••) */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdownId(isDropdownOpen ? null : req.id)}
                      className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-30 text-xs font-bold space-y-1 animate-in fade-in">
                        <button
                          onClick={() => {
                            onReject(req.id, req.title);
                            setOpenDropdownId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-red-50 text-red-700"
                        >
                          ✕ Reject Proposal
                        </button>
                        <button
                          onClick={() => {
                            onDelegate(req.id, req.title);
                            setOpenDropdownId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-indigo-50 text-indigo-700"
                        >
                          → Delegate to COO
                        </button>
                        <button
                          onClick={() => {
                            onRequestInfo(req.id, req.title);
                            setOpenDropdownId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700"
                        >
                          ? Request Info
                        </button>
                        {onOpenSimulate && (
                          <button
                            onClick={() => {
                              onOpenSimulate(req);
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-amber-50 text-amber-800"
                          >
                            ⚡ AI Rejection Simulator
                          </button>
                        )}
                        {onOpenDrawer && (
                          <button
                            onClick={() => {
                              onOpenDrawer(req);
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-sky-50 text-sky-700"
                          >
                            ▶ Open Right Drawer
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Accordion Expansion Panel */}
              {isExpanded && (
                <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4 animate-in fade-in slide-in-from-top-2 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Business Case Justification</span>
                    <p className="text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      {req.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-0.5">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">Submitted By</span>
                      <p className="font-extrabold text-slate-900">{req.submittedBy} ({req.submittedByRole})</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-0.5">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">Audit Signoff Trail</span>
                      <p className="font-extrabold text-emerald-700">CFO & Tech Pre-Approved</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-0.5">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">Verification Docs</span>
                      <p className="font-extrabold text-indigo-700">3 Attachments Verified</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <button
                      onClick={() => onOpenAiAdvisor(req.id)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-extrabold border border-indigo-200 flex items-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Open AI Advisor Report</span>
                    </button>

                    {onOpenDrawer && (
                      <button
                        onClick={() => onOpenDrawer(req)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 flex items-center gap-1"
                      >
                        <span>Open Full Right Drawer</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
