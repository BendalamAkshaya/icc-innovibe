'use client';

import React, { useState } from 'react';
import { BoardPresentationSlide } from '../../../lib/types';
import { Presentation, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Play, MessageSquare } from 'lucide-react';

interface BoardPresentationModeCardProps {
  slides: BoardPresentationSlide[];
  onLaunchBoardMode: () => void;
}

export function BoardPresentationModeCard({ slides, onLaunchBoardMode }: BoardPresentationModeCardProps) {
  const currentSlide = slides[0];
  const [showAiTalkingPoints, setShowAiTalkingPoints] = useState(false);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-indigo-200/60">
          <div>
            <div className="flex items-center gap-2">
              <Presentation className="h-5 w-5 text-indigo-600" />
              <h2 className="text-base font-extrabold text-slate-900">Board Meeting Presentation Center</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Auto-compiled presentation slides optimized for Board of Directors and Investor Reviews.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAiTalkingPoints(!showAiTalkingPoints)}
              className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold text-xs border border-purple-300 flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>AI Talking Points</span>
            </button>

            <button
              onClick={onLaunchBoardMode}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all shrink-0"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Launch Fullscreen Board Mode</span>
            </button>
          </div>
        </div>

        {currentSlide && (
          <div className="p-5 rounded-2xl bg-white border border-indigo-100 space-y-3 shadow-xs my-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                Slide 1 / {slides.length} • Executive Summary
              </span>
              <span className="text-xs font-mono font-black text-indigo-600">{currentSlide.headlineMetric}</span>
            </div>

            <h3 className="font-extrabold text-sm text-slate-900">{currentSlide.title}</h3>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">{currentSlide.executiveSummary}</p>

            {/* AI Talking Points & Anticipated Investor Questions Panel */}
            {showAiTalkingPoints && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs animate-in fade-in">
                <span className="text-[10px] font-mono text-sky-400 font-black uppercase">AI PRESENTER TALKING POINTS & OBJECTIONS</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-200 font-medium">
                  <li>Highlight 30.8% net operating margin growth vs Q1 (24.2%).</li>
                  <li>Anticipated Investor Question: "What is the capital recovery period for Vijayawada Hub?" → Answer: 10 Months.</li>
                  <li>Emphasize 99.8% IoT uptime across all 148 connected EVs.</li>
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Key Milestones</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-700 font-medium">
                  {currentSlide.keyPoints.map((kp, idx) => (
                    <li key={idx}>{kp}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-800 block">Board Recommendation</span>
                <p className="text-[11px] text-slate-800 font-bold leading-snug">"{currentSlide.recommendationText}"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
