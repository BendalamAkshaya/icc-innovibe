'use client';

import React, { useState } from 'react';
import { ExecutiveAnnouncement } from '../../../lib/types';
import { Megaphone, Eye, CheckCircle2, MessageSquare, Clock, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ExecutiveAnnouncementsListProps {
  announcements: ExecutiveAnnouncement[];
  onSelectAnnouncement?: (title: string) => void;
}

export function ExecutiveAnnouncementsList({ announcements, onSelectAnnouncement }: ExecutiveAnnouncementsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(announcements[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left" suppressHydrationWarning>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-purple-600" />
            <h2 className="text-base font-extrabold text-slate-900">Executive Announcements (Progressive Disclosure)</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Compact broadcast cards. Only one announcement expands at a time to maximize screen space.
          </p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
          {announcements.length} Published Broadcasts
        </span>
      </div>

      <div className="space-y-3">
        {announcements.map((ann) => {
          const isExpanded = expandedId === ann.id;

          return (
            <div
              key={ann.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'bg-white border-purple-300 shadow-md ring-2 ring-purple-500/10' : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Compact Header (~90-110px height) */}
              <div
                onClick={() => toggleExpand(ann.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded border border-purple-300">
                      {ann.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-500">• Audience: {ann.targetAudience}</span>
                    <span className="text-xs text-slate-400 font-medium font-mono">• {ann.publishedAt}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">{ann.title}</h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-emerald-700">{ann.readPercent}% Read</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-purple-700">{ann.acknowledgedPercent}% Ack</span>
                  </div>

                  <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 animate-in fade-in slide-in-from-top-2 text-xs">
                  <p className="text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    "{ann.richTextSnippet}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 font-bold text-slate-600">
                    <div className="flex items-center gap-4">
                      <span>Author: <strong className="text-slate-900">{ann.author}</strong></span>
                      <span>Views: <strong className="text-sky-700">{ann.viewsCount}</strong></span>
                      <span>Feedback Comments: <strong className="text-slate-900">{ann.commentsCount}</strong></span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectAnnouncement) onSelectAnnouncement(ann.title);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs"
                    >
                      View Full Engagement Breakdown
                    </button>
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
