'use client';

import React, { useState } from 'react';
import { ChatMessage } from '../../../lib/types';
import { Bot, Send, Sparkles, User, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AskAiExecutiveChatProps {
  initialMessages: ChatMessage[];
}

export function AskAiExecutiveChat({ initialMessages }: AskAiExecutiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const presetQuestions = [
    'Why did revenue increase this month?',
    'Compare Kakinada vs Vijayawada hub performance',
    'Which department needs executive attention?',
    "Predict next month's total company revenue",
    "Summarize today's business telemetry",
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'USER',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI synthesis response
    setTimeout(() => {
      let aiReplyText = '';
      let metrics: { label: string; value: string }[] | undefined;

      const lower = textToSend.toLowerCase();

      if (lower.includes('revenue')) {
        aiReplyText = 'Company revenue increased by 18.4% month-over-month to ₹12.45 Lakhs. This growth was driven primarily by a 31% surge in AMC annual subscriptions and a 14.5% increase in field service completions across Kakinada and Rajahmundry.';
        metrics = [
          { label: 'Gross Revenue', value: '₹12.45L' },
          { label: 'AMC Growth', value: '+31.0%' },
          { label: 'Net Profit Margin', value: '30.8%' },
        ];
      } else if (lower.includes('kakinada') || lower.includes('vijayawada') || lower.includes('compare')) {
        aiReplyText = 'Kakinada Main Hub generated ₹4.25L revenue with 96% SLA compliance and 4.9★ CSAT score (Rank #1). Vijayawada Hub generated ₹2.90L revenue with 94% SLA compliance. Kakinada excels in commercial fleet AMC contracts, while Vijayawada has higher retail service volume.';
        metrics = [
          { label: 'Kakinada Revenue', value: '₹4.25L' },
          { label: 'Vijayawada Revenue', value: '₹2.90L' },
          { label: 'SLA Variance', value: '+2.0% Kakinada' },
        ];
      } else if (lower.includes('department') || lower.includes('attention')) {
        aiReplyText = 'The Inventory & Procurement department (SCM) requires your executive review. Performance score is currently at 82/100 PTS due to spare parts lead times in Guntur Bay (38 hours vs <24h target). All other 7 departments are performing on track or exceeding targets.';
        metrics = [
          { label: 'SCM Score', value: '82/100' },
          { label: 'Guntur Parts Lag', value: '38 Hours' },
          { label: 'Target SLA', value: '<24 Hours' },
        ];
      } else if (lower.includes('predict') || lower.includes('next month')) {
        aiReplyText = 'Based on our statistical forecasting model (94% confidence), gross revenue for July 2026 is predicted to reach ₹14.80 Lakhs, supported by 180 connected EVs in operation and 175 daily service bookings.';
        metrics = [
          { label: 'July Forecast', value: '₹14.80L' },
          { label: 'Confidence Score', value: '94%' },
          { label: 'Expected Fleet', value: '180 EVs' },
        ];
      } else {
        aiReplyText = `Analyzed real-time enterprise telemetry for your query: "${textToSend}". Operations across all 5 coastline Andhra Pradesh hubs remain operational at 91.8% fleet availability with zero roadside breakdown incidents today.`;
        metrics = [
          { label: 'Live Status', value: 'Optimal' },
          { label: 'Active Hubs', value: '5 / 5' },
          { label: 'System SLA', value: '96.2%' },
        ];
      }

      const aiMsg: ChatMessage = {
        id: `msg_a_${Date.now()}`,
        sender: 'AI',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metrics,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between min-h-[440px]">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-xs">
              <Bot className="h-4 w-4" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900">Ask Executive AI Assistant</h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            Natural Language Query Mode
          </span>
        </div>

        {/* Preset Prompt Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-[10px] font-bold text-slate-400 shrink-0">Preset CEO Queries:</span>
          {presetQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-900 border border-slate-200 text-[11px] font-extrabold text-slate-700 whitespace-nowrap transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Feed Messages */}
        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'AI' && (
                <div className="h-6 w-6 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] space-y-2 ${
                  msg.sender === 'USER'
                    ? 'bg-slate-900 text-white rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-70 mb-0.5">
                  <span className="font-extrabold uppercase">{msg.sender === 'USER' ? 'Sri Hari (CEO)' : 'Enterprise AI'}</span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                <p className="font-bold leading-relaxed">{msg.text}</p>

                {/* Optional Metric Chips */}
                {msg.metrics && msg.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.metrics.map((m) => (
                      <span key={m.label} className="text-[9px] font-black px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-900 shadow-xs">
                        {m.label}: <strong className="text-sky-600">{m.value}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'USER' && (
                <div className="h-6 w-6 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 font-black text-[10px]">
                  CEO
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-600 bg-sky-50 px-3 py-2 rounded-xl border border-sky-200 w-fit animate-pulse">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              <span>AI Engine synthesizing answer from ledgers & IoT telemetry...</span>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input Field */}
      <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
          placeholder="Ask AI anything about revenue, fleet health, or branch performance..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-sky-500 placeholder:text-slate-400"
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1 transition-all"
        >
          <span>Send</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
