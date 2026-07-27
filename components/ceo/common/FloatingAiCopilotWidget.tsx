'use client';

import React, { useState, useEffect } from 'react';
import { Bot, X, Send, Mic, Sparkles, ChevronUp, ChevronDown, BarChart2, Presentation, ShieldAlert, Zap, FileText } from 'lucide-react';

export function FloatingAiCopilotWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeModule, setActiveModule] = useState('business-performance');
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Good morning Sri Hari! I'm your Executive AI Copilot. How can I assist your decision-making today?`,
      time: '10:45 AM',
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mod = params.get('module');
      if (mod) setActiveModule(mod);
    }
  }, []);

  if (!isMounted) return null;

  const moduleContextNames: Record<string, string> = {
    'business-performance': 'Business Performance & Revenue',
    'fleet-intelligence': 'Fleet Intelligence & IoT Telemetry',
    'department-performance': 'Department Performance & Org Digital Twin',
    'ai-command-center': 'Executive AI Command Center',
    'reports-analytics': 'Reports & Enterprise Analytics',
    'role-access': 'RBAC Governance & System Audit',
  };

  const currentModuleName = moduleContextNames[activeModule] || 'CEO Executive Suite';

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    setTimeout(() => {
      let aiResponse = `Synthesizing intelligence for query "${query}" under ${currentModuleName}... Revenue trends remain at +18.4% with 94% AI confidence. Zero critical anomalies detected.`;
      if (query.toLowerCase().includes('fleet')) {
        aiResponse = `Fleet Status: 148 Registered EVs (144 Online, 2 Connecting, 2 Offline). Battery SOH score is 94.2%. Next scheduled battery module replacement is in 18 days for AP39EF9012.`;
      } else if (query.toLowerCase().includes('risk')) {
        aiResponse = `Top Active Risk: Customer Support SLA resolution time increased by 14% due to Q3 expansion surge. Recommendation: Dispatch 2 additional support engineers.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse, time: 'Just now' }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-left font-sans" suppressHydrationWarning>
      {/* Floating Button (Collapsed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-full bg-slate-900 text-white border-2 border-sky-400 shadow-2xl flex items-center gap-2.5 hover:scale-105 transition-all group animate-bounce"
        >
          <div className="p-2 rounded-full bg-sky-500 text-white shadow-md">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div className="text-left pr-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 leading-none">Ask Copilot</p>
            <p className="text-xs font-black text-white mt-0.5">{currentModuleName.split('&')[0]}</p>
          </div>
        </button>
      )}

      {/* Expanded Floating AI Copilot Drawer */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col justify-between max-h-[80vh] h-[520px] animate-in fade-in zoom-in-95">
          {/* Copilot Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-white">Executive AI Copilot</h3>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Context: {currentModuleName}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Context Action Pills */}
          <div className="p-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[10px] font-extrabold">
            <button
              onClick={() => handleSendMessage(`Explain ${currentModuleName}`)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 whitespace-nowrap"
            >
              ▶ Explain Screen
            </button>
            <button
              onClick={() => handleSendMessage(`Show active risks in ${currentModuleName}`)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-red-700 hover:bg-red-50 whitespace-nowrap"
            >
              ▶ Show Risks
            </button>
            <button
              onClick={() => handleSendMessage(`Generate board summary for ${currentModuleName}`)}
              className="px-2.5 py-1 rounded-lg bg-sky-600 text-white hover:bg-sky-700 whitespace-nowrap"
            >
              ▶ Board Deck
            </button>
          </div>

          {/* Messages Thread */}
          <div className="p-4 space-y-3 flex-1 overflow-y-auto text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white font-semibold rounded-br-xs'
                      : 'bg-slate-100 text-slate-900 font-medium border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask Copilot about ${activeModule}...`}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setIsVoiceActive(!isVoiceActive)}
                className={`p-2 rounded-xl border ${
                  isVoiceActive ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'bg-white text-slate-600 border-slate-200'
                }`}
                title="Voice Input"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-xs"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
