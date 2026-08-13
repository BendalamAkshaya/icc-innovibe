'use client';

import React, { useState } from 'react';
import {
  Zap,
  Activity,
  BarChart3,
  Brain,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code,
  Cpu,
  Database,
  Download,
  FileText,
  Filter,
  Flame,
  Globe,
  HardDrive,
  HeartPulse,
  Info,
  Kanban,
  Layers,
  Lock,
  Maximize2,
  Network,
  Radio,
  RefreshCw,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function TechnologyDashboardModule() {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 13 High-Impact Executive Domain Matrix KPIs matching Geetha Sowmya's cto2.mp4 design
  const domainCategories = [
    {
      name: 'Connected Mobility',
      icon: Car,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      kpis: [
        { title: 'IoT Active Telemetry', value: '14,250', status: 'Healthy', trend: 'Live Stream', source: 'Telemetry Platform', route: 'telemetry-platform' },
        { title: 'EV Health Index', value: '89.4 / 100', status: 'Healthy', trend: '+2.1 pts', source: 'AI Diagnostics', route: 'ai-diagnostics' },
        { title: 'CAN-Bus Packet Rate', value: '1.2M / sec', status: 'Healthy', trend: '99.99% OK', source: 'IoT Management', route: 'iot-device-management' },
      ],
    },
    {
      name: 'Artificial Intelligence',
      icon: Brain,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      kpis: [
        { title: 'EVcare.AI Accuracy', value: '96.8%', status: 'Healthy', trend: '+1.2%', source: 'AI Models', route: 'ai-models' },
        { title: 'Ollama LLM Latency', value: '42 ms', status: 'Healthy', trend: 'Optimal', source: 'Machine Learning', route: 'machine-learning' },
        { title: 'Automated AI Tickets', value: '3,410 / mo', status: 'Healthy', trend: '88% Auto', source: 'EVcare.AI', route: 'evcare-ai-dashboard' },
      ],
    },
    {
      name: 'Engineering',
      icon: Code,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      kpis: [
        { title: 'Sprint Milestone Velocity', value: '94.2%', status: 'Healthy', trend: '+4.1%', source: 'Sprint Mgmt', route: 'sprint-management' },
        { title: 'Code Quality Score', value: '92.4 / 100', status: 'Healthy', trend: 'Sonar A+', source: 'Software Dev', route: 'software-development' },
        { title: 'Open Bug Backlog', value: '23 Bugs', status: 'Attention', trend: '-8 resolved', source: 'Bug Tracking', route: 'bug-tracking' },
      ],
    },
    {
      name: 'Platform',
      icon: Server,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      kpis: [
        { title: 'AWS EKS Uptime', value: '99.99%', status: 'Healthy', trend: 'Zero Downtime', source: 'Cloud Infra', route: 'cloud-infrastructure' },
        { title: 'Zero-Trust Gateway', value: 'ACTIVE', status: 'Healthy', trend: 'TLS 1.3', source: 'Cybersecurity', route: 'cybersecurity' },
      ],
    },
    {
      name: 'Business SLA',
      icon: TrendingUp,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      kpis: [
        { title: 'EV Fleet Cost Savings', value: '₹14.2 Lakh', status: 'Healthy', trend: '+18% YoY', source: 'Reports Analytics', route: 'reports-analytics' },
        { title: 'Enterprise SLA Compliance', value: '99.95%', status: 'Healthy', trend: 'Target Met', source: 'System Config', route: 'system-configuration' },
      ],
    },
  ];

  // Upcoming Major Releases
  const upcomingReleases = [
    { name: 'EVcare.AI Platform v3.5', date: 'Aug 18, 2026', stage: 'Staging Validation', owner: 'Backend AI Team', readiness: '96%', confidence: 'High', version: 'v3.5.0-rc1', risk: 'Low' },
    { name: 'Mobile App BLE Sync v2.9', date: 'Aug 24, 2026', stage: 'QA Testing', owner: 'Mobile Squad', readiness: '84%', confidence: 'Medium', version: 'v2.9.0-beta', risk: 'Medium' },
    { name: 'Telemetry Gateway v4.0', date: 'Sep 02, 2026', stage: 'Architecture Review', owner: 'EV Telematics', readiness: '91%', confidence: 'High', version: 'v4.0.0-alpha', risk: 'Low' },
  ];

  // Boardroom Charts Data
  const deliveryData = [
    { month: 'Apr', velocity: 88, deploys: 240 },
    { month: 'May', velocity: 91, deploys: 275 },
    { month: 'Jun', velocity: 89, deploys: 290 },
    { month: 'Jul', velocity: 93, deploys: 305 },
    { month: 'Aug', velocity: 95, deploys: 312 },
  ];

  const qualityData = [
    { month: 'Apr', coverage: 82, quality: 89 },
    { month: 'May', coverage: 84, quality: 90 },
    { month: 'Jun', coverage: 85, quality: 91 },
    { month: 'Jul', coverage: 87, quality: 92 },
    { month: 'Aug', coverage: 88.5, quality: 92.4 },
  ];

  const slaData = [
    { month: 'Apr', sla: 99.95, latency: 48 },
    { month: 'May', sla: 99.98, latency: 45 },
    { month: 'Jun', sla: 99.99, latency: 44 },
    { month: 'Jul', sla: 99.99, latency: 43 },
    { month: 'Aug', sla: 99.99, latency: 42 },
  ];

  const filteredCategories = domainCategories.filter((cat) => {
    if (selectedDomain === 'all') return true;
    return cat.name.toLowerCase().includes(selectedDomain.toLowerCase());
  });

  return (
    <div className="space-y-6 text-left">
      {/* PAGE HEADER TOOLBAR */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => alert('Generating Executive Report PDF...')} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2">
            <FileText className="h-4 w-4" /> Generate Executive Report
          </button>
          <button onClick={() => alert('Exporting CTO Dashboard View...')} className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
            <Download className="h-4 w-4 text-purple-600" /> Export Dashboard
          </button>
          <button onClick={() => alert('AI Assistant: Generating Executive Summary...')} className="px-3.5 py-2 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" /> AI Executive Summary
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => window.location.reload()} className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-slate-500" /> Refresh
          </button>
        </div>
      </div>

      {/* SEARCH AND DOMAIN FILTERS BAR */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Global search across CTO modules, releases, AI models, connected EVs..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold">
          <button onClick={() => setSelectedDomain('all')} className={`px-3 py-1.5 rounded-xl transition-all ${selectedDomain === 'all' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            All Domains (13)
          </button>
          <button onClick={() => setSelectedDomain('mobility')} className={`px-3 py-1.5 rounded-xl transition-all ${selectedDomain === 'mobility' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            Mobility
          </button>
          <button onClick={() => setSelectedDomain('intelligence')} className={`px-3 py-1.5 rounded-xl transition-all ${selectedDomain === 'intelligence' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            AI & ML
          </button>
          <button onClick={() => setSelectedDomain('engineering')} className={`px-3 py-1.5 rounded-xl transition-all ${selectedDomain === 'engineering' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            Engineering
          </button>
          <button onClick={() => setSelectedDomain('platform')} className={`px-3 py-1.5 rounded-xl transition-all ${selectedDomain === 'platform' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            Platform
          </button>
        </div>
      </div>

      {/* SECTION 1: EXECUTIVE TECHNOLOGY DOMAIN MATRIX (13 KPIS) */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" /> Executive Technology Domain Matrix
            </h2>
            <p className="text-xs text-slate-500 font-medium">13 High-impact executive KPIs aggregated directly from source module data layers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {filteredCategories.map((cat, catIdx) => {
            const CatIcon = cat.icon;
            return (
              <div key={catIdx} className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <CatIcon className="h-4 w-4 text-purple-600" /> {cat.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px]">
                    {cat.kpis.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cat.kpis.map((kpi, kpiIdx) => (
                    <div
                      key={kpiIdx}
                      className="bg-white p-3 rounded-xl border border-slate-200 hover:border-purple-300 transition-all cursor-pointer shadow-2xs group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">{kpi.title}</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[9px]">
                          {kpi.trend}
                        </span>
                      </div>
                      <p className="text-lg font-black text-slate-900 mt-1">{kpi.value}</p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <span>← {kpi.source.split(' ')[0]}</span>
                        <span className="text-purple-600 font-bold group-hover:translate-x-0.5 transition-all">Go →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: UPCOMING MAJOR RELEASES BOARD */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-purple-600" /> Upcoming Major Releases Board
            </h2>
            <p className="text-xs text-slate-500 font-medium">Executive release pipeline across products, AI models, and core platform services</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
            3 Upcoming Releases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingReleases.map((rel, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-extrabold text-slate-900">{rel.name}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold">
                    {rel.version}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 font-medium">
                  <p>Target Date: <strong className="text-slate-900">{rel.date}</strong></p>
                  <p>Stage: <strong className="text-purple-600">{rel.stage}</strong></p>
                  <p>Owner Team: <strong className="text-slate-900">{rel.owner}</strong></p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Readiness:</span>
                <span className="font-bold text-emerald-600">{rel.readiness} (Confidence: {rel.confidence})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: EXECUTIVE BOARDROOM ANALYTICS ENGINE (3 CHARTS) */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" /> Executive Boardroom Analytics Engine
            </h2>
            <p className="text-xs text-slate-500 font-medium">Presentation-grade executive intelligence for engineering delivery, code quality & SLA uptime</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
            Live Boardroom View
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Are engineering teams delivering as expected?
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-2">1. Engineering Delivery Performance</h3>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-blue-600">94.2%</span>
                <span className="text-xs font-bold text-emerald-600">+4.1% vs Q2</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1 mb-3">Sprint Completion: 96% | Release Success: 99.4%</p>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deliveryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="velocity" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 font-medium">
              <strong>Summary:</strong> Milestone velocity reached 94.2% with 99.4% release success rate across 312 CI/CD deploys.
            </p>
          </div>

          {/* Chart 2 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  Is our codebase healthy and sustainable?
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-2">2. Code Quality & Excellence</h3>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-purple-600">92.4% Score</span>
                <span className="text-xs font-bold text-emerald-600">88.5% Coverage</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1 mb-3">Tech Debt: 4.2% | Critical Vulnerabilities: 0</p>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={qualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="quality" stroke="#9333ea" fill="#f3e8ff" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 font-medium">
              <strong>Summary:</strong> Code quality remains above enterprise standards (92.4%) with zero open critical vulnerabilities.
            </p>
          </div>

          {/* Chart 3 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  Are cloud infrastructure & IoT streams reliable?
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-2">3. Platform Uptime & SLA</h3>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-emerald-600">99.99%</span>
                <span className="text-xs font-bold text-emerald-600">42ms Latency</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1 mb-3">MQTT Ingestion: 14.2k/s | Zero Outages</p>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={slaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[99.9, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="sla" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 font-medium">
              <strong>Summary:</strong> AWS EKS clusters and IoT telemetry streams sustained 99.99% uptime with 42ms latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
