'use client';

import React from 'react';
import { CreateAnnouncementPayload } from '../../../../lib/announcement-models';
import { X, Megaphone, Send, ShieldAlert, Paperclip, Mic, Eye, Users, Building2 } from 'lucide-react';

interface AnnouncementPreviewModalProps {
  isOpen: boolean;
  payload: CreateAnnouncementPayload | null;
  onClose: () => void;
  onConfirmPublish: () => void;
  isPublishing: boolean;
}

export function AnnouncementPreviewModal({
  isOpen,
  payload,
  onClose,
  onConfirmPublish,
  isPublishing,
}: AnnouncementPreviewModalProps) {
  if (!isOpen || !payload) return null;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'IMPORTANT':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-slate-100 text-left space-y-6 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-gotham text-lg font-extrabold text-white">Broadcast Live Preview</h2>
              <p className="font-sans text-xs text-slate-400">Review exact announcement appearance before employee dispatch</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Card Preview Container */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-inner">
          {/* Priority & Target Badges */}
          <div className="flex items-center justify-between font-apfel text-xs">
            <span className={`px-2.5 py-0.5 rounded-full font-extrabold border ${getPriorityStyle(payload.priority)}`}>
              {payload.priority} PRIORITY
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[10px]">
              Target: {payload.targetAudience.replace(/_/g, ' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-gotham text-lg font-extrabold text-white leading-snug">
            {payload.title}
          </h3>

          {/* Sender Metadata */}
          <div className="flex items-center gap-3 pt-1 border-t border-slate-900">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Sender"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=Sri+Hari+Kolusu&background=fef3c7&color=92400e`;
              }}
              className="h-9 w-9 rounded-full object-cover border border-amber-500/40"
            />
            <div className="text-xs">
              <p className="font-gotham font-bold text-white">{payload.senderName || 'Sri Hari Kolusu'}</p>
              <span className="text-[10px] text-slate-400">
                {payload.senderRole || 'Founder & CEO'} • <span className="text-amber-400">{payload.senderDepartment || 'Executive Office'}</span>
              </span>
            </div>
          </div>

          {/* Message Body */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
            {payload.message}
          </div>

          {/* Attachments */}
          {payload.attachments && payload.attachments.length > 0 && (
            <div className="space-y-1.5 font-apfel text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ATTACHMENTS</span>
              <div className="flex flex-wrap gap-2">
                {payload.attachments.map((att) => (
                  <div key={att.id} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-semibold flex items-center gap-2">
                    <Paperclip className="h-3.5 w-3.5" />
                    <span>{att.filename} ({att.size})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voice Memo */}
          {payload.voiceRecord && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 font-apfel text-xs">
              <Mic className="h-5 w-5 text-amber-400 shrink-0" />
              <div className="flex-1">
                <span className="font-bold text-amber-300 block">Voice Note Memo Attached</span>
                <audio controls src={payload.voiceRecord.audioDataUrl} className="w-full h-8 mt-1 rounded-lg" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 font-apfel">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPublishing}
            onClick={onConfirmPublish}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>{isPublishing ? 'Publishing Broadcast...' : 'Publish Announcement Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
