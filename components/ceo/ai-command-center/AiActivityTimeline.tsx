'use client';

import React from 'react';
import { AiTimelineLog } from '../../../lib/types';
import { Clock, Activity, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface AiActivityTimelineProps {
  logs: AiTimelineLog[];
}

export function AiActivityTimeline({ logs }: AiActivityTimelineProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
        <Clock className="h-5 w-5 text-sky-600" />
        <h2 className="text-base font-extrabold text-slate-900">AI Background Activity & Audit Log</h2>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white border border-slate-200 shrink-0 shadow-xs">
              <Activity className="h-4 w-4 text-sky-600" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xs text-slate-900">{log.eventTitle}</h3>
                <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{log.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
