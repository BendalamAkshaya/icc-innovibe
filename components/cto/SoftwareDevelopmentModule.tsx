'use client';

import React, { useState } from 'react';
import {
  Code,
  Users,
  Kanban,
  Rocket,
  HeartPulse,
  Search,
  Filter,
  Layers,
  Server,
  Database,
  Cloud,
  Radio,
  Plug,
  Smartphone,
  ArrowRight,
  FolderOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  X,
  Zap,
  Activity,
} from 'lucide-react';

interface ProjectDetail {
  name: string;
  status: string;
  lead: string;
  teams: string;
  teamSize: string;
  arch: {
    frontend: string;
    backend: string;
    database: string;
    cloud: string;
    integrations: string;
  };
  devHealth: {
    delivery: string;
    quality: string;
    stability: string;
    reliability: string;
  };
  risks: {
    risk: string;
    impact: string;
    recommendation: string;
  };
  activity: {
    deploy: string;
    code: string;
    system: string;
  };
}

const projectDetailsMap: Record<string, ProjectDetail> = {
  'dev-1': {
    name: 'EVcare.AI Platform',
    status: 'Healthy',
    lead: 'Dr. Sarah Jenkins (Principal AI Architect)',
    teams: 'Backend AI Team / ML Squad',
    teamSize: '15 Engineers (8 Backend, 4 ML, 2 DevOps, 1 QA Engineer)',
    arch: {
      frontend: 'React 18 / Flutter Mobile SDK',
      backend: 'Python 3.12 (PyTorch Inference Engine & FastAPI)',
      database: 'PostgreSQL & TimescaleDB',
      cloud: 'AWS EKS (East Cluster) / 1000 GPU Pods',
      integrations: 'ChargePoint API, EVcare Mobile App, OpenADR 2.0',
    },
    devHealth: {
      delivery: 'On Track',
      quality: '92/100',
      stability: '99.8%',
      reliability: '99.9%',
    },
    risks: {
      risk: 'CPU/Memory Allocation Spike during peak tariff hours.',
      impact: 'Medium (Potential 200ms latency increase on inference queries).',
      recommendation: 'Enable dynamic PyTorch HPA auto-scale policy on AWS EKS.',
    },
    activity: {
      deploy: 'Canary build v3.4 deployed to US-East (42 mins ago)',
      code: 'PyTorch inference model weight coefficients v3.4 updated (2 days ago)',
      system: 'Added gRPC streaming buffer pool compression (5 days ago)',
    },
  },
  'dev-2': {
    name: 'Mobile Application (iOS/Android)',
    status: 'Needs Attention',
    lead: 'Marcus Chen (Mobile Squad Lead)',
    teams: 'Mobile Core Squad',
    teamSize: '10 Engineers (6 iOS/Android, 2 QA, 2 Integrations)',
    arch: {
      frontend: 'Flutter Mobile SDK',
      backend: 'REST API, Node Gateway',
      database: 'SQLite local cache',
      cloud: 'AWS API Gateway',
      integrations: 'Mapbox Navigation, Zero-Trust Auth Proxies',
    },
    devHealth: {
      delivery: 'Slowing down',
      quality: '80/100',
      stability: '98.5%',
      reliability: '97.2%',
    },
    risks: {
      risk: 'BLE pairing latency increased by 240ms on modern iOS builds.',
      impact: 'Medium (Potential handshake loop timeouts).',
      recommendation: 'Reallocate 2 QA engineers to Mobile squad to assist pairing stress-tests.',
    },
    activity: {
      deploy: 'Staging build v2.8-beta deployed (2 hours ago)',
      code: 'BLE handshake response wrapper patched (1 day ago)',
      system: 'Automatic rollbacks testing enabled (4 days ago)',
    },
  },
  'dev-3': {
    name: 'Web Portal',
    status: 'Healthy',
    lead: 'Priya Sharma (Frontend Lead)',
    teams: 'Frontend UX Team',
    teamSize: '8 Engineers (5 Frontend, 2 Designer, 1 QA)',
    arch: {
      frontend: 'React 18 / Next.js Framework',
      backend: 'Node.js Express microservices',
      database: 'Redis caching layer',
      cloud: 'Vercel Edge Network',
      integrations: 'Stripe API payments',
    },
    devHealth: {
      delivery: 'On Track',
      quality: '96/100',
      stability: '99.99%',
      reliability: '100%',
    },
    risks: {
      risk: 'Static site generation caching delay on large coordinate logs.',
      impact: 'Low (Minor layout rendering speed impact).',
      recommendation: 'Migrate static pages framework to Edge Networks caching.',
    },
    activity: {
      deploy: 'Release build v3.3.8 promoted to production (Yesterday)',
      code: 'Stripe webhooks DNS check configuration updated (2 days ago)',
      system: 'Edge routing rules updated successfully (5 days ago)',
    },
  },
};

export function SoftwareDevelopmentModule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const softDevKPIs = [
    { title: 'Active Projects', value: '8', support: '8 Active Projects', change: '+1 On Track', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { title: 'Development Teams', value: '6', support: '6 Engineering Teams', change: 'Fully Allocated', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { title: 'Developers', value: '42', support: '42 Engineers', change: '+3 Max Load', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { title: 'Current Releases', value: '5', support: '5 Upcoming Releases', change: 'v3.4.0 Ready', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { title: 'Codebase Health', value: '94%', support: '94% Healthy Score', change: '+1.5% Optimal', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  const projectsList = [
    { id: 'dev-1', name: 'EVcare.AI Platform', owner: 'Backend & AI', tech: 'React, Flutter, Python, AWS', status: 'Healthy', progress: 82, version: 'v3.4' },
    { id: 'dev-2', name: 'Mobile Application (iOS/Android)', owner: 'Mobile Squad', tech: 'Flutter, Swift, Kotlin, BLE, REST', status: 'Needs Attention', progress: 74, version: 'v2.8' },
    { id: 'dev-3', name: 'Web Portal (office.innovibemobility.com)', owner: 'Frontend Team', tech: 'React, Node.js, HTML5, CSS3, REST', status: 'Healthy', progress: 96, version: 'v3.4' },
    { id: 'dev-4', name: 'Fleet Management Platform', owner: 'EV Telematics Team', tech: 'Go, Kafka, TimescaleDB, gRPC', status: 'Healthy', progress: 88, version: 'v2.4' },
    { id: 'dev-5', name: 'Internal Enterprise Systems', owner: 'Cloud Infra Team', tech: 'Rust, PostgreSQL, Docker', status: 'Critical', progress: 65, version: 'v1.9' },
  ];

  const filteredProjects = projectsList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      {/* SECTION 1: 5 EXECUTIVE KPI CARDS (Geetha Sowmya's cto2.mp4 Style) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {softDevKPIs.map((kpi, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</span>
              <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full border ${kpi.color}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-slate-500 font-medium mt-1">{kpi.support}</p>
          </div>
        ))}
      </div>

      {/* SECTION 2: MULTI-DIMENSIONAL FILTERS TOOLBAR */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project name, owner, tech..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">Status: All</option>
            <option value="Healthy">Healthy</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert('Wizard: Create New Engineering Project')} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
            + Create Project
          </button>
          <button onClick={() => alert('Exporting Engineering Health Report PDF...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all">
            Export Report
          </button>
        </div>
      </div>

      {/* SECTION 3: APPLICATION ECOSYSTEM ARCHITECTURE VIEW */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-600" /> Application Ecosystem Architecture View
            </h2>
            <p className="text-xs text-slate-500 font-medium">Executive visualization of system connections from mobile clients to cloud IoT infrastructure</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 overflow-x-auto py-2">
          <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-2xl text-center min-w-[140px]">
            <p className="text-xs font-bold text-purple-900">Mobile Apps</p>
            <span className="text-[10px] text-purple-700 font-medium">EVcare iOS & Android</span>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-2xl text-center min-w-[140px]">
            <p className="text-xs font-bold text-blue-900">Backend Services</p>
            <span className="text-[10px] text-blue-700 font-medium">FastAPI & Go Gateway</span>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl text-center min-w-[140px]">
            <p className="text-xs font-bold text-emerald-900">Database Layer</p>
            <span className="text-[10px] text-emerald-700 font-medium">PostgreSQL & Timescale</span>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl text-center min-w-[140px]">
            <p className="text-xs font-bold text-amber-900">Cloud Infra</p>
            <span className="text-[10px] text-amber-700 font-medium">AWS EKS & Azure MS</span>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
          <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-2xl text-center min-w-[140px]">
            <p className="text-xs font-bold text-purple-900">IoT / Telemetry</p>
            <span className="text-[10px] text-purple-700 font-medium">CAN-bus & MQTT/Kafka</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: SOFTWARE PROJECT PORTFOLIO TABLE */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Software Project Portfolio</h2>
            <p className="text-xs text-slate-500 font-medium">Executive overview of projects, owners, tech stack, progress, and versions</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{filteredProjects.length} Projects Listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <th className="pb-3 px-3">Project Name</th>
                <th className="pb-3 px-3">Owner Squad</th>
                <th className="pb-3 px-3">Technology Stack</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Development Progress</th>
                <th className="pb-3 px-3">Version</th>
                <th className="pb-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProjects.map((proj) => (
                <tr
                  key={proj.id}
                  onClick={() => setSelectedProject(projectDetailsMap[proj.id] || null)}
                  className="hover:bg-purple-50/50 transition-all cursor-pointer"
                >
                  <td className="py-3.5 px-3 font-bold text-slate-900">{proj.name}</td>
                  <td className="py-3.5 px-3 text-slate-700">{proj.owner}</td>
                  <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px]">{proj.tech}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      proj.status === 'Healthy'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : proj.status === 'Needs Attention'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${proj.progress}%` }} />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-700">{proj.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-purple-700">{proj.version}</td>
                  <td className="py-3.5 px-3">
                    <button className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white font-bold text-[11px] transition-all">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 5: TECHNOLOGY STACK OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">FRONTEND STACK</span>
          <p className="text-base font-extrabold text-slate-900 mt-1">React 18.3 & Next.js</p>
          <p className="text-xs text-slate-500 mt-0.5">Used by 6 Applications</p>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1 font-medium">
            <p>• Flutter v3.22 (2 Mobile Apps)</p>
            <p>• HTML5 / CSS3 (4 Services)</p>
            <p>• Tailwind CSS (3 Portals)</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">BACKEND STACK</span>
          <p className="text-base font-extrabold text-slate-900 mt-1">Python 3.12 & Go 1.22</p>
          <p className="text-xs text-slate-500 mt-0.5">Used by 10 Microservices</p>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1 font-medium">
            <p>• FastAPI & PyTorch Inference</p>
            <p>• Node.js Express Gateways</p>
            <p>• Rust v1.8 (1 Core Engine)</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">DATABASE LAYER</span>
          <p className="text-base font-extrabold text-slate-900 mt-1">PostgreSQL 16 & Timescale</p>
          <p className="text-xs text-slate-500 mt-0.5">Used by 4 Instances</p>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1 font-medium">
            <p>• TimescaleDB (Telemetry Stream)</p>
            <p>• Redis v7.2 (Cache Clusters)</p>
            <p>• MongoDB (Audit Logs)</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">CLOUD & DEVOPS</span>
          <p className="text-base font-extrabold text-slate-900 mt-1">AWS EKS & Vercel</p>
          <p className="text-xs text-slate-500 mt-0.5">Used by 12 Workloads</p>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1 font-medium">
            <p>• PyTorch GPU Pod Clusters</p>
            <p>• Docker & Terraform CI/CD</p>
            <p>• Vercel Edge Networks</p>
          </div>
        </div>
      </div>

      {/* PROJECT IN-DEPTH DETAIL DRAWER MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">{selectedProject.name}</h2>
                <p className="text-xs text-slate-500 font-medium">Engineering Project Architectural Overview</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                <p className="text-xs font-bold text-purple-900">Lead Architect: {selectedProject.lead}</p>
                <p className="text-xs text-purple-700 mt-1 font-medium">Team: {selectedProject.teams} ({selectedProject.teamSize})</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Architecture Stack</h3>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 font-medium">
                  <p><strong className="text-slate-900">Frontend:</strong> {selectedProject.arch.frontend}</p>
                  <p><strong className="text-slate-900">Backend:</strong> {selectedProject.arch.backend}</p>
                  <p><strong className="text-slate-900">Database:</strong> {selectedProject.arch.database}</p>
                  <p><strong className="text-slate-900">Cloud:</strong> {selectedProject.arch.cloud}</p>
                  <p><strong className="text-slate-900">Integrations:</strong> {selectedProject.arch.integrations}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Risk Analysis</h3>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1 font-medium">
                  <p><strong>Risk:</strong> {selectedProject.risks.risk}</p>
                  <p><strong>Impact:</strong> {selectedProject.risks.impact}</p>
                  <p><strong>Recommendation:</strong> {selectedProject.risks.recommendation}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Recent Activity</h3>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-[11px] space-y-1">
                  <p className="text-emerald-400">{selectedProject.activity.deploy}</p>
                  <p className="text-cyan-300">{selectedProject.activity.code}</p>
                  <p className="text-purple-300">{selectedProject.activity.system}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
