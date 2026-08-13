'use client';

import React from 'react';
import {
  Network,
  CheckCircle2,
  Plug,
  Activity,
  Layers,
  ArrowLeftRight,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Brain,
  Sliders,
} from 'lucide-react';

export function IntegrationsModule() {
  return (
    <div className="space-y-6 text-left">
      {/* PAGE HEADER & ACTIONS TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Network className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Integrations Digital Command Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitor and govern all internal and external technology integrations across the InnoVibe Mobility ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => alert('Opening Connect New System Wizard...')} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-purple-700">
            <Plug className="h-4 w-4" /> + Connect New System
          </button>
          <button onClick={() => alert('Exporting Digital Ecosystem Map...')} className="px-3 py-1.5 rounded-xl bg-white text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 hover:bg-slate-50">
            Export Ecosystem Map
          </button>
        </div>
      </div>

      {/* SECTION 1: INTEGRATION ECOSYSTEM MAP */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Integration Ecosystem Map</h2>
              <p className="text-xs text-slate-500">Interactive system relationship map & node topology across connected digital platforms</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">24 Systems Connected</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 hover:border-purple-300 transition-all cursor-pointer" onClick={() => alert('Inspecting InnoVibe Office Portal Integration...')}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-slate-900">InnoVibe Office Portal</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Connected</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between"><span>Connected Node:</span> <strong>B2B Enterprise Admin</strong></div>
              <div className="flex justify-between"><span>Data Flow:</span> <strong className="text-purple-600">Bi-directional ↔</strong></div>
              <div className="flex justify-between"><span>Protocol:</span> <strong className="font-mono text-[11px]">REST / gRPC TLS 1.3</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 hover:border-purple-300 transition-all cursor-pointer" onClick={() => alert('Inspecting EVcare Platform Integration...')}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-slate-900">EVcare Platform</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Healthy</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between"><span>Connected Node:</span> <strong>Payment & Vehicle Data</strong></div>
              <div className="flex justify-between"><span>Data Flow:</span> <strong className="text-purple-600">Bi-directional ↔</strong></div>
              <div className="flex justify-between"><span>Protocol:</span> <strong className="font-mono text-[11px]">PyTorch Kafka Stream</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 hover:border-purple-300 transition-all cursor-pointer" onClick={() => alert('Inspecting Mobile Applications Integration...')}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-slate-900">Mobile Applications</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Healthy</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between"><span>Connected Node:</span> <strong>Auth0 IAM & API Gateway</strong></div>
              <div className="flex justify-between"><span>Data Flow:</span> <strong className="text-purple-600">Bi-directional ↔</strong></div>
              <div className="flex justify-between"><span>Protocol:</span> <strong className="font-mono text-[11px]">OAuth2 PKCE HTTPS</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 hover:border-purple-300 transition-all cursor-pointer" onClick={() => alert('Inspecting IoT Systems Integration...')}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-slate-900">IoT Systems</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Healthy</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between"><span>Connected Node:</span> <strong>Kafka Telematics Bus</strong></div>
              <div className="flex justify-between"><span>Data Flow:</span> <strong className="text-emerald-600">Ingress Stream ➔</strong></div>
              <div className="flex justify-between"><span>Protocol:</span> <strong className="font-mono text-[11px]">mTLS MQTT / Protobuf</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
