'use client';

import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Radio,
  FileCheck,
  CheckCircle2,
  Brain,
  Sliders,
} from 'lucide-react';

export function CybersecurityModule() {
  return (
    <div className="space-y-6 text-left">
      {/* PAGE HEADER & ACTIONS TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cybersecurity Command Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enable the CTO to monitor cybersecurity posture, identify technology risks, manage security incidents, and control security improvements across InnoVibe Mobility systems.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => alert('Initiating Vulnerability Scan...')} className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-red-700">
            <ShieldCheck className="h-4 w-4" /> Run Vulnerability Scan
          </button>
          <button onClick={() => alert('Opening Emergency Incident Response Center...')} className="px-3 py-1.5 rounded-xl bg-white text-red-600 text-xs font-bold border border-red-200 flex items-center gap-1.5 hover:bg-red-50">
            <AlertTriangle className="h-4 w-4" /> Incident Response
          </button>
        </div>
      </div>

      {/* SECTION 1: SECURITY POSTURE VIEW */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Security Posture View</h2>
              <p className="text-xs text-slate-500">Central security health indicator & connected ecosystem protection status</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Ecosystem 96% Protected</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Central Radial Indicator */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center space-y-3">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                <circle cx="56" cy="56" r="48" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray="301" strokeDashoffset="12" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900">96%</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Protected</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">SECURITY POSTURE</div>
              <div className="text-[11px] text-slate-500">ISO 27001 & SOC2 Type II Verified</div>
            </div>
          </div>

          {/* Connected Areas Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Cloud Security</span>
                <span className="text-emerald-600 font-bold">Protected</span>
              </div>
              <p className="text-[11px] text-slate-500">Risk Level: <strong>Low</strong></p>
              <p className="text-[10px] text-slate-400">Last: 10 mins ago</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Application Security</span>
                <span className="text-emerald-600 font-bold">Protected</span>
              </div>
              <p className="text-[11px] text-slate-500">Risk Level: <strong>Low</strong></p>
              <p className="text-[10px] text-slate-400">Last: Automated CI/CD</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>API Security</span>
                <span className="text-amber-600 font-bold">Medium Risk</span>
              </div>
              <p className="text-[11px] text-slate-500">Risk Level: <strong>Medium</strong></p>
              <p className="text-[10px] text-slate-400">Last: 2 mins ago</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Data Security</span>
                <span className="text-emerald-600 font-bold">Protected</span>
              </div>
              <p className="text-[11px] text-slate-500">Risk Level: <strong>Zero-Trust</strong></p>
              <p className="text-[10px] text-slate-400">Last: AES-256 Validated</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Device Security</span>
                <span className="text-emerald-600 font-bold">Protected</span>
              </div>
              <p className="text-[11px] text-slate-500">Risk Level: <strong>Low</strong></p>
              <p className="text-[10px] text-slate-400">Last: EV Gateway Sync</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: THREAT LANDSCAPE MAP */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Threat Landscape Map</h2>
              <p className="text-xs text-slate-500">Visual threat monitoring area across risk zones, active signals, and severity levels</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Live SIEM Feed Active</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-slate-200 border-l-4 border-l-red-600 bg-white flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase">CRITICAL ZONE</span>
                <strong className="text-sm font-bold text-slate-900">"Unauthorized access attempt detected"</strong>
              </div>
              <p className="text-xs text-slate-500 mt-1">Source IP <code>185.220.101.42</code> (Frankfurt Node) • 420 req/min REST API probe</p>
            </div>
            <button onClick={() => alert('Enforced IP Ban on 185.220.101.42')} className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700">
              Enforce Immediate IP Block
            </button>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500 bg-white flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">WARNING ZONE</span>
                <strong className="text-sm font-bold text-slate-900">"Multiple failed authentication attempts"</strong>
              </div>
              <p className="text-xs text-slate-500 mt-1">Target Account: <code>dev-lead@innovibe.io</code> • 5 Retries • Automated MFA Lockout</p>
            </div>
            <button onClick={() => alert('Resetting MFA Session...')} className="px-3 py-1.5 rounded-xl bg-white text-blue-600 border border-slate-200 text-xs font-bold hover:bg-slate-50">
              Review & Challenge MFA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
