'use client';

import React from 'react';
import { AiDecisionAdvice } from '../../../lib/types';
import { Sparkles, CheckCircle2, AlertTriangle, HelpCircle, X, ThumbsUp } from 'lucide-react';

interface AiDecisionAdvisorModalProps {
  advice: AiDecisionAdvice | null;
  onClose: () => void;
  onApproveWithAi: () => void;
}

export function AiDecisionAdvisorModal({ advice, onClose, onApproveWithAi }: AiDecisionAdvisorModalProps) {
  if (!advice) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-sky-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">AI Decision Advisor Analysis</h2>
              <p className="text-[10px] text-slate-500 font-medium">Synthesized from Q2 Budget, IoT Telemetry & Vendor Ledger</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {advice.confidenceScore}% Confidence Score
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs font-bold text-slate-800 leading-relaxed">
          "{advice.summary}"
        </div>

        {/* Pros & Benefits */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Strategic Pros & Business Benefits
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-xs text-slate-700 font-medium">
            {advice.pros.map((pro, i) => (
              <li key={i}>{pro}</li>
            ))}
          </ul>
        </div>

        {/* Potential Risks */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-600" /> Potential Operational Risks
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-xs text-slate-700 font-medium">
            {advice.risks.map((risk, i) => (
              <li key={i}>{risk}</li>
            ))}
          </ul>
        </div>

        {/* Strategic Alternatives */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-indigo-600" /> Strategic Execution Alternatives
          </h3>
          <ul className="space-y-1 pl-5 list-disc text-xs text-slate-700 font-medium">
            {advice.alternatives.map((alt, i) => (
              <li key={i}>{alt}</li>
            ))}
          </ul>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs"
          >
            Close Analysis
          </button>

          <button
            onClick={onApproveWithAi}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Accept AI Recommendation & Approve</span>
          </button>
        </div>
      </div>
    </div>
  );
}
