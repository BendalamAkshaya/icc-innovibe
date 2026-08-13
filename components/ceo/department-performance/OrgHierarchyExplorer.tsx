'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, ShieldCheck, Cpu, Building2 } from 'lucide-react';

export function OrgHierarchyExplorer() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    ceo: true,
    exec_coo: true,
    exec_cto: true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Interactive Organization Explorer & Hierarchy</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
          8 Business Units • 148 Staff
        </span>
      </div>

      {/* Tree Visualization */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-inner overflow-x-auto">
        {/* Level 1: CEO */}
        <div>
          <button
            onClick={() => toggleNode('ceo')}
            className="flex items-center gap-2 text-amber-400 font-bold text-sm hover:underline"
          >
            {expandedNodes['ceo'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span>👑 Sri Hari Kolusu — Founder & CEO (Super Admin)</span>
          </button>

          {expandedNodes['ceo'] && (
            <div className="pl-6 pt-2 space-y-2 border-l border-slate-800 ml-2">
              {/* Level 2: Executives */}
              <div>
                <button
                  onClick={() => toggleNode('exec_coo')}
                  className="flex items-center gap-2 text-sky-400 font-extrabold hover:underline"
                >
                  {expandedNodes['exec_coo'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  <span>📍 Operations & Service Hub Division (Interim COO)</span>
                </button>

                {expandedNodes['exec_coo'] && (
                  <div className="pl-6 pt-1 space-y-1 border-l border-slate-800 ml-2 text-slate-300">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>• Field & Hub Operations (58 Technicians across 5 Coastal Hubs)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>• Customer Support & Dispatch (18 Specialists)</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleNode('exec_cto')}
                  className="flex items-center gap-2 text-purple-400 font-extrabold hover:underline"
                >
                  {expandedNodes['exec_cto'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  <span>💻 Technology & AI Engineering Division (VP Tech: Ananya Sharma)</span>
                </button>

                {expandedNodes['exec_cto'] && (
                  <div className="pl-6 pt-1 space-y-1 border-l border-slate-800 ml-2 text-slate-300">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>• IoT & Telemetry Platform Team (8 Embedded Engineers)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>• AI & Automation Lab (6 ML Engineers)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
