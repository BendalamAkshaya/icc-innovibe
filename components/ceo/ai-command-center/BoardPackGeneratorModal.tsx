'use client';

import React, { useState } from 'react';
import { Presentation, Download, Check, X, ShieldCheck, Sparkles, FileText } from 'lucide-react';

interface BoardPackGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BoardPackGeneratorModal({ isOpen, onClose }: BoardPackGeneratorModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setSuccess(false);

    setTimeout(() => {
      // Generate Printable Board Presentation Window
      const slideWindow = window.open('', '_blank');
      if (slideWindow) {
        slideWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>InnoVibe Board Presentation Pack - Q2 2026</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #0f172a; background: #0f172a; }
              .slide { background: #1e293b; border-radius: 24px; padding: 40px; margin-bottom: 30px; border: 1px solid #334155; color: #fff; }
              .slide-title { font-size: 28px; font-weight: 900; color: #38bdf8; margin: 0 0 10px 0; }
              .slide-subtitle { font-size: 14px; color: #94a3b8; margin-bottom: 30px; }
              .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
              .card { background: #0f172a; border-radius: 16px; padding: 20px; border: 1px solid #334155; }
              .card-val { font-size: 24px; font-weight: 900; color: #10b981; margin-top: 8px; }
            </style>
          </head>
          <body>
            <!-- Slide 1: Title Slide -->
            <div class="slide">
              <h1 class="slide-title">INNOVIBE MOBILITY ENTERPRISE</h1>
              <p class="slide-subtitle">Q2 2026 Executive Board Presentation Pack • Prepared by Executive AI Copilot</p>
              <div class="grid">
                <div class="card"><small style="color: #94a3b8;">GROSS REVENUE</small><div class="card-val">₹12,45,000</div></div>
                <div class="card"><small style="color: #94a3b8;">NET PROFIT MARGIN</small><div class="card-val">30.8%</div></div>
                <div class="card"><small style="color: #94a3b8;">CONNECTED EV FLEET</small><div class="card-val">148 EVs</div></div>
              </div>
            </div>

            <!-- Slide 2: Strategic Initiatives -->
            <div class="slide">
              <h2 class="slide-title">Strategic Growth & Fleet Expansion</h2>
              <p class="slide-subtitle">South India Coastal Andhra Pradesh Coverage & n8n Automation Status</p>
              <div class="grid">
                <div class="card"><small style="color: #94a3b8;">COASTAL HUBS</small><div class="card-val">5 Active Hubs</div></div>
                <div class="card"><small style="color: #94a3b8;">AUTOMATION LEVEL</small><div class="card-val">95% Zero Back-Office</div></div>
                <div class="card"><small style="color: #94a3b8;">AI CONFIDENCE</small><div class="card-val">94.0% Score</div></div>
              </div>
            </div>
            
            <script>window.onload = function() { window.print(); }</script>
          </body>
          </html>
        `);
        slideWindow.document.close();
      }

      setIsGenerating(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden space-y-0 relative text-left">
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <Presentation className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">AI Board Presentation Deck Generator</h2>
              <p className="text-xs text-slate-400 font-medium">Generate board-ready PowerPoint slides & summary graphics.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="font-extrabold text-slate-900">Presentation Deck Includes:</p>
            <p className="text-slate-600 font-medium leading-relaxed">
              • Executive Financial Summary & Operating Margins<br />
              • Fleet IoT Telemetry & Battery SOH Health<br />
              • Department Performance & Workforce Intelligence<br />
              • Strategic Risk Mitigation & AI Recommendations
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs text-white flex items-center gap-2 transition-all shadow-md ${
              success ? 'bg-emerald-600' : isGenerating ? 'bg-sky-400 cursor-wait' : 'bg-sky-600 hover:bg-sky-700 shadow-sky-500/20'
            }`}
          >
            {success ? <Check className="h-4 w-4" /> : <Presentation className="h-4 w-4" />}
            <span>{success ? 'Deck Generated!' : isGenerating ? 'Generating Deck...' : 'Generate Board Presentation'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
