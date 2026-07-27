'use client';

import React, { useState } from 'react';
import { AiCommDraft } from '../../../lib/types';
import { Sparkles, Copy, CheckCircle2, X, RefreshCw } from 'lucide-react';

interface AiCommAssistantModalProps {
  drafts: AiCommDraft[];
  onClose: () => void;
  onUseDraft: (text: string) => void;
}

export function AiCommAssistantModal({ drafts, onClose, onUseDraft }: AiCommAssistantModalProps) {
  const [selectedTone, setSelectedTone] = useState<'INSPIRATIONAL' | 'FORMAL_EXECUTIVE' | 'REASSURING'>('INSPIRATIONAL');
  const [copied, setCopied] = useState(false);

  const activeDraft = drafts.find((d) => d.tone === selectedTone) || drafts[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeDraft.generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-purple-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">AI Executive Speech & Announcement Generator</h2>
              <p className="text-[10px] text-slate-500 font-medium">Refines tone, grammar, and executive brand voice</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tone Selector Pills */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span>Executive Tone:</span>
          {(['INSPIRATIONAL', 'FORMAL_EXECUTIVE', 'REASSURING'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTone(t)}
              className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition-all ${
                selectedTone === t ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Draft Text Output Box */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
              {activeDraft.type} • {activeDraft.tone}
            </span>
            <button
              onClick={handleCopy}
              className="text-[10px] font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              <Copy className="h-3 w-3" />
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>

          <h3 className="font-extrabold text-xs text-slate-900">{activeDraft.title}</h3>
          <p className="text-xs text-slate-800 font-bold leading-relaxed bg-white p-3.5 rounded-xl border border-purple-100">
            "{activeDraft.generatedText}"
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs">
            Cancel
          </button>

          <button
            onClick={() => {
              onUseDraft(activeDraft.generatedText);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Insert Draft into Announcement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
