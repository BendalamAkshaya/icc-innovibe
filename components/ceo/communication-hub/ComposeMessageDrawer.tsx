'use client';

import React, { useState } from 'react';
import { X, Send, Sparkles, Paperclip, Check, Radio, Globe, ShieldCheck, FileText } from 'lucide-react';

interface ComposeMessageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (channel: string, target: string, title: string, text: string) => void;
}

export function ComposeMessageDrawer({ isOpen, onClose, onSend }: ComposeMessageDrawerProps) {
  const [channel, setChannel] = useState('BROADCAST');
  const [targetAudience, setTargetAudience] = useState('ALL_EMPLOYEES');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateAi = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setTitle('Executive Quarterly Performance Update & Coastal Expansion');
      setContent('Dear InnoVibe Team,\n\nI am thrilled to announce that our Q2 operational results have exceeded performance benchmarks across all 5 coastal hubs. Operating margin reached 30.8% and customer satisfaction score sits at 4.8/5.0.\n\nThank you for your tireless dedication!\n\nBest regards,\nSri Hari Kolusu (CEO)');
      setIsAiGenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in" suppressHydrationWarning>
      <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between p-6 space-y-6 text-left border-l border-slate-200">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200">
                <Send className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Executive Communication Composer</h2>
                <p className="text-xs text-slate-400 font-medium">Multi-channel broadcast, press release & board note engine.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Channel Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">Communication Channel</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'BROADCAST', label: 'Company Broadcast' },
                { id: 'PRESS_RELEASE', label: 'Press Release' },
                { id: 'BOARD_NOTE', label: 'Board Note' },
                { id: 'INVESTOR_UPDATE', label: 'Investor Update' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChannel(c.id)}
                  className={`p-2.5 rounded-xl border text-xs font-black text-center transition-all ${
                    channel === c.id
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Audience Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">Target Audience</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 outline-none"
            >
              <option value="ALL_EMPLOYEES">All Company Employees (148 Staff)</option>
              <option value="EXECUTIVE_SUITE">Executive Suite & Department Heads</option>
              <option value="BOARD_MEMBERS">Board of Directors & Investors</option>
              <option value="MEDIA_OUTLETS">Media Outlets & Press Partners</option>
              <option value="TECH_ENGINEERING">Technology & AI Department Only</option>
            </select>
          </div>

          {/* AI Drafting Toolbar */}
          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
              <span className="text-xs font-extrabold text-purple-900">AI Speech & Announcement Writer</span>
            </div>
            <button
              onClick={handleGenerateAi}
              disabled={isAiGenerating}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs"
            >
              {isAiGenerating ? 'Drafting...' : 'Auto-Draft Message'}
            </button>
          </div>

          {/* Title & Body Inputs */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-extrabold text-slate-800 block mb-1">Headline / Subject Line</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter executive announcement title..."
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 block mb-1">Message Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="Write message content or use AI Auto-Draft..."
                className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-purple-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 font-extrabold text-xs text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => {
              if (title && content) {
                onSend(channel, targetAudience, title, content);
                onClose();
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>Publish Announcement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
