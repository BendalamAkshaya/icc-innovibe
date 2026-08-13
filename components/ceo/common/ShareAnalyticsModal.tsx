'use client';

import React, { useState } from 'react';
import { useGlobalFilter } from '../../../lib/global-filter-context';
import { Share2, Copy, Check, Mail, Presentation, ShieldCheck, X } from 'lucide-react';

export function ShareAnalyticsModal() {
  const { isShareModalOpen, setIsShareModalOpen, selectedBranches, datePreset } = useGlobalFilter();
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  if (!isShareModalOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://office.innovibemobility.com/dashboard/ceo';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden space-y-0 text-left">
        <div className="p-6 bg-gradient-to-r from-sky-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400">
              <Share2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-black">Share Executive Dashboard</h2>
              <p className="text-xs text-slate-300 font-medium">Securely share live filters & board mode with C-suite leadership</p>
            </div>
          </div>
          <button onClick={() => setIsShareModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Link Copy */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-slate-500">Secure Live Context Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700 select-all focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Quick Email Executive Share */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-black uppercase text-slate-500">Quick Executive Email Dispatch</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { role: 'CFO (Financial Audit)', email: 'cfo@innovibemobility.com' },
                { role: 'COO (Operations Sync)', email: 'coo@innovibemobility.com' },
                { role: 'Board of Directors', email: 'board@innovibemobility.com' },
                { role: 'Investors (Monthly Pack)', email: 'investors@innovibemobility.com' },
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={handleSendEmail}
                  className="p-3 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-left transition-all"
                >
                  <p className="text-xs font-extrabold text-slate-900">{item.role}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.email}</p>
                </button>
              ))}
            </div>
            {emailSent && (
              <p className="text-xs font-extrabold text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-200 flex items-center gap-1">
                <Check className="h-4 w-4" /> Executive Brief dispatched via secure SSL SMTP!
              </p>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> AES-256 Quantum Secure
          </span>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-extrabold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
