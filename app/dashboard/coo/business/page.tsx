'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import {
  UserCheck, Target, Shield, Store, TrendingUp,
  Search, PhoneCall, ThumbsUp, FileText, CheckCircle2, ArrowDown, Award
} from 'lucide-react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

/* ─── REVERSE PYRAMID (PROFESSIONAL EXECUTIVE DESIGN) ─── */
const stages = [
  { name: 'IDENTIFIED LEADS',          sub: 'Target Enterprise Accounts',         value: 320, color: '#4f46e5', Icon: Search },
  { name: 'OUTREACH ENGAGED',         sub: 'Direct Calls & Email Dispatch',       value: 240, color: '#7c3aed', Icon: PhoneCall },
  { name: 'EVALUATING & INTERESTED', sub: 'Technical & Service Intent Verified', value: 165, color: '#9333ea', Icon: ThumbsUp },
  { name: 'PROPOSAL & QUOTE ISSUED', sub: 'Commercial Terms Provided',           value: 98,  color: '#c026d3', Icon: FileText },
  { name: 'CONTRACT SIGNED',          sub: 'Active Onboarded Customer',           value: 62,  color: '#db2777', Icon: CheckCircle2 },
];

function ReversePyramid() {
  const total = stages[0].value;

  return (
    <div className="space-y-2.5 py-4">
      <div className="flex flex-col items-center w-full">
        {stages.map((s, i) => {
          const Icon = s.Icon;
          const widthPct = 100 - i * 14;
          const dropOff = i < stages.length - 1 ? s.value - stages[i + 1].value : 0;
          const dropPct = i < stages.length - 1 ? Math.round((dropOff / s.value) * 100) : 0;

          return (
            <div key={s.name} className="w-full flex flex-col items-center">
              {/* Inverted Pyramid Layer Card */}
              <div
                className="h-14 rounded-xl flex items-center justify-between px-5 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md cursor-pointer border border-white/20"
                style={{
                  width: `${widthPct}%`,
                  minWidth: '280px',
                  background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}dd 100%)`,
                }}
              >
                {/* Left: SVG Icon & Title */}
                <div className="flex items-center gap-3 text-white min-w-0 pr-2">
                  <div className="p-2 bg-white/15 rounded-lg backdrop-blur-xs shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="truncate">
                    <span className="font-extrabold text-xs block leading-tight tracking-wider uppercase text-white">{s.name}</span>
                    <span className="text-[10px] text-white/80 font-medium truncate block">{s.sub}</span>
                  </div>
                </div>

                {/* Right: Stage Count */}
                <div className="text-right shrink-0">
                  <span className="text-base font-black text-white font-mono tracking-tight">{s.value.toLocaleString()}</span>
                </div>
              </div>

              {/* Drop-off Indicator between Pyramid Layers */}
              {i < stages.length - 1 && (
                <div className="my-1 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-[10px] font-bold text-rose-700 flex items-center gap-1.5 shadow-2xs">
                  <ArrowDown className="w-3 h-3 text-rose-600" />
                  <span>{dropOff} drop-off ({dropPct}%)</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 mx-auto max-w-lg px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-bold text-center flex items-center justify-center gap-2 shadow-2xs">
        <Award className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          Funnel Performance: <strong>{total}</strong> Identified Leads → <strong>{stages.at(-1)!.value}</strong> Signed Accounts (<strong>{Math.round((stages.at(-1)!.value / total) * 100)}%</strong> conversion rate)
        </span>
      </div>
    </div>
  );
}


/* ─── SAMPLE DATA (for review — will be removed after approval) ─── */

const customerGrowthData = [
  { month: 'Feb', active: 38, churned: 3 },
  { month: 'Mar', active: 52, churned: 4 },
  { month: 'Apr', active: 67, churned: 5 },
  { month: 'May', active: 84, churned: 6 },
  { month: 'Jun', active: 102, churned: 4 },
  { month: 'Jul', active: 124, churned: 7 },
];

const planDistribution = [
  { name: 'EV_PRO', value: 54, color: '#6366f1' },
  { name: 'PLATINUM', value: 38, color: '#0ea5e9' },
  { name: 'STANDARD', value: 32, color: '#10b981' },
];

const customerList = [
  { name: 'Ankit Verma', phone: '+91 9988776655', city: 'Bengaluru', plan: 'EV_PRO', status: 'ACTIVE' },
  { name: 'Priya Nair', phone: '+91 9988776656', city: 'Hyderabad', plan: 'PLATINUM', status: 'ACTIVE' },
  { name: 'Rohit Sharma', phone: '+91 9988776657', city: 'Chennai', plan: 'STANDARD', status: 'ACTIVE' },
  { name: 'Deepa Mehta', phone: '+91 9988776658', city: 'Pune', plan: 'EV_PRO', status: 'ACTIVE' },
  { name: 'Suresh Kumar', phone: '+91 9988776659', city: 'Delhi', plan: 'STANDARD', status: 'CHURNED' },
];

const leadFunnelData = [
  { name: 'Prospects', value: 320, fill: '#6366f1' },
  { name: 'Contacted', value: 240, fill: '#8b5cf6' },
  { name: 'Qualified', value: 165, fill: '#a855f7' },
  { name: 'Proposal', value: 98, fill: '#d946ef' },
  { name: 'Closed Won', value: 62, fill: '#ec4899' },
];

const leadSourceData = [
  { source: 'Referral', leads: 88 },
  { source: 'Direct', leads: 72 },
  { source: 'LinkedIn', leads: 61 },
  { source: 'Events', leads: 49 },
  { source: 'Website', leads: 40 },
];

const leadList = [
  { company: 'Zomato Quick Logistics', contact: 'Sunil Rao', fleet: 120, stage: 'QUALIFIED' },
  { company: 'Porter Hyperlocal EV', contact: 'Meera Patel', fleet: 250, stage: 'CONTACTED' },
  { company: 'Dunzo Delivery Fleet', contact: 'Arjun Das', fleet: 80, stage: 'PROPOSAL' },
  { company: 'Swiggy EV Expansion', contact: 'Kavita Reddy', fleet: 350, stage: 'NEGOTIATION' },
];

const oemContractData = [
  { oem: 'Ather', contracts: 4, revenue: 28.5 },
  { oem: 'Ola Electric', contracts: 2, revenue: 16.2 },
  { oem: 'Hero Electric', contracts: 3, revenue: 12.8 },
  { oem: 'Bounce Infinity', contracts: 1, revenue: 6.4 },
];

const dealerPerformanceData = [
  { dealer: 'Kakinada', sales: 184, target: 200, revenue: 36.8 },
  { dealer: 'Hyderabad', sales: 157, target: 180, revenue: 31.4 },
  { dealer: 'Bengaluru', sales: 212, target: 200, revenue: 42.4 },
  { dealer: 'Chennai', sales: 98, target: 150, revenue: 19.6 },
];

const salesPipelineMonthly = [
  { month: 'Feb', negotiation: 28.5, closed: 42.0, lost: 8.2 },
  { month: 'Mar', negotiation: 34.2, closed: 58.5, lost: 6.4 },
  { month: 'Apr', negotiation: 41.0, closed: 64.2, lost: 9.1 },
  { month: 'May', negotiation: 38.8, closed: 72.6, lost: 7.8 },
  { month: 'Jun', negotiation: 43.5, closed: 80.1, lost: 5.9 },
  { month: 'Jul', negotiation: 45.0, closed: 84.5, lost: 6.7 },
];

const salesStageData = [
  { stage: 'Prospecting', value: 45, color: '#6366f1' },
  { stage: 'Negotiation', value: 45, color: '#f59e0b' },
  { stage: 'Closed Won', value: 84.5, color: '#10b981' },
  { stage: 'Closed Lost', value: 6.7, color: '#ef4444' },
];

const planColors: Record<string, string> = {
  EV_PRO: 'bg-indigo-100 text-indigo-800',
  PLATINUM: 'bg-blue-100 text-blue-800',
  STANDARD: 'bg-emerald-100 text-emerald-800',
};

const stageColors: Record<string, string> = {
  QUALIFIED: 'bg-emerald-100 text-emerald-800',
  CONTACTED: 'bg-blue-100 text-blue-800',
  PROPOSAL: 'bg-purple-100 text-purple-800',
  NEGOTIATION: 'bg-amber-100 text-amber-800',
};

/* ─── TOOLTIP ─── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-xl border border-slate-700">
      {label && <p className="font-bold text-slate-300 mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill || '#fff' }} className="font-semibold">
          {p.name}: {typeof p.value === 'number' && p.value % 1 !== 0 ? `₹${p.value}L` : p.value}
        </p>
      ))}
    </div>
  );
};

/* ─── CARD ─── */
const Card = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden ${className}`}>
    <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
      <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">{title}</h3>
      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">SAMPLE DATA</span>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

function BusinessInner() {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') || 'customers' : 'customers';
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <RouteGuard module="business">
      <div className="space-y-6 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-blue-600" />
              Business & CRM Operations Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Customer Accounts • Enterprise Leads • OEM Contracts • Dealer Network • Sales Pipeline
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            ⚠ Sample Data — Under Review
          </span>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 bg-white px-4 pt-3 rounded-xl">
          {[
            { id: 'customers', label: 'Customer Management', icon: UserCheck },
            { id: 'leads', label: 'Lead Management', icon: Target },
            { id: 'oems', label: 'OEM Management', icon: Shield },
            { id: 'dealers', label: 'Dealer Management', icon: Store },
            { id: 'sales', label: 'Sales Pipeline', icon: TrendingUp },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <Link
                key={t.id}
                href={`/dashboard/coo/business?tab=${t.id}`}
                className={`tab-interactive flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all duration-200 active:scale-95 ${
                  active ? 'border-blue-600 text-blue-600 bg-blue-50/70 shadow-2xs' : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </Link>
            );
          })}
        </div>

        {/* ── CUSTOMERS ── */}
        {currentTab === 'customers' && (
          <div className="grid grid-cols-2 gap-5">
            <Card title="Customer Growth — Monthly" className="col-span-2">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={customerGrowthData} margin={{ top: 5, right: 20, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradChurn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                  <Area type="monotone" dataKey="active" name="Active Customers" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradActive)" dot={{ r: 4, fill: '#6366f1' }} />
                  <Area type="monotone" dataKey="churned" name="Churned" stroke="#ef4444" strokeWidth={2} fill="url(#gradChurn)" dot={{ r: 3, fill: '#ef4444' }} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Subscription Plan Distribution">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={entry.color} opacity={activeIndex === null || activeIndex === index ? 1 : 0.5} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="KPI Summary">
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: 'Total Customers', value: planDistribution.reduce((s, d) => s + d.value, 0), color: 'text-blue-600' },
                  { label: 'Active This Month', value: customerGrowthData.at(-1)?.active ?? 0, color: 'text-indigo-600' },
                  { label: 'Churned (Jul)', value: customerGrowthData.at(-1)?.churned ?? 0, color: 'text-rose-600' },
                  { label: 'Net Growth', value: `+${(customerGrowthData.at(-1)?.active ?? 0) - (customerGrowthData.at(-2)?.active ?? 0)}`, color: 'text-emerald-600' },
                ].map((m) => (
                  <div key={m.label} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">{m.label}</span>
                    <span className={`text-2xl font-black ${m.color} block mt-1`}>{m.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Customer Directory" className="col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Name</th>
                      <th className="pb-3 pr-4">Phone</th>
                      <th className="pb-3 pr-4">City</th>
                      <th className="pb-3 pr-4">Plan</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {customerList.map((c) => (
                      <tr key={c.name} className="hover:bg-slate-50 transition">
                        <td className="py-3 pr-4 font-bold text-slate-900">{c.name}</td>
                        <td className="py-3 pr-4 text-slate-500">{c.phone}</td>
                        <td className="py-3 pr-4 text-slate-600">{c.city}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2.5 py-1 rounded font-extrabold text-[10px] ${planColors[c.plan] || 'bg-slate-100 text-slate-700'}`}>{c.plan}</span>
                        </td>
                        <td className="py-3 text-right">
                          <span className={`px-2.5 py-1 rounded font-extrabold text-[10px] ${c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ── LEADS ── */}
        {currentTab === 'leads' && (
          <div className="grid grid-cols-2 gap-5">
            <Card title="Lead Conversion Funnel — How many become customers?">
              <ReversePyramid />
            </Card>

            <Card title="Leads by Source">
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={leadSourceData} layout="vertical" margin={{ left: 10, right: 20, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={65} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="leads" name="Leads" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={18} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider block">Acquisition Channel Distribution</span>
                  <div className="grid grid-cols-2 gap-2">
                    {leadSourceData.map((s) => {
                      const totalLeads = leadSourceData.reduce((acc, curr) => acc + curr.leads, 0);
                      const pct = ((s.leads / totalLeads) * 100).toFixed(1);
                      return (
                        <div key={s.source} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between shadow-2xs">
                          <span className="font-bold text-slate-700">{s.source}</span>
                          <div className="text-right">
                            <span className="font-black text-slate-900 block">{s.leads}</span>
                            <span className="text-[10px] text-slate-500 font-semibold">{pct}% share</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Pipeline Stage Summary" className="col-span-2">
              <div className="grid grid-cols-5 gap-3 text-xs mb-6">
                {leadFunnelData.map((stage) => (
                  <div key={stage.name} className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-center">
                    <span className="text-slate-500 block text-[11px]">{stage.name}</span>
                    <span className="text-2xl font-black mt-1 block" style={{ color: stage.fill }}>{stage.value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Enterprise Leads</h4>
                <div className="space-y-2">
                  {leadList.map((l) => (
                    <div key={l.company} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">{l.company}</span>
                        <span className="text-slate-500 text-[11px]">Contact: {l.contact} • Fleet: {l.fleet} EVs</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded font-extrabold text-[10px] ${stageColors[l.stage] || 'bg-slate-100 text-slate-600'}`}>{l.stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── OEM ── */}
        {currentTab === 'oems' && (
          <div className="grid grid-cols-2 gap-5">
            <Card title="Contracts per OEM Partner">
              <div className="relative">
                <ResponsiveContainer width="100%" height={340}>
                  <PieChart>
                    <Pie
                      data={oemContractData}
                      dataKey="contracts"
                      nameKey="oem"
                      cx="50%"
                      cy="46%"
                      innerRadius={90}
                      outerRadius={130}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {oemContractData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#6366f1', '#8b5cf6', '#0ea5e9', '#10b981'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-[41%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className="text-3xl font-black text-slate-900 block leading-none">
                    {oemContractData.reduce((s, c) => s + c.contracts, 0)}
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block mt-1">
                    Contracts
                  </span>
                </div>
              </div>
            </Card>

            <Card title="OEM Revenue Contribution (₹L)">
              <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                  <Pie
                    data={oemContractData}
                    dataKey="revenue"
                    nameKey="oem"
                    cx="50%" cy="46%"
                    outerRadius={130}
                    paddingAngle={3}
                    label={({ oem, percent }) => `${oem} ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >
                    {oemContractData.map((_, i) => (
                      <Cell key={i} fill={['#8b5cf6', '#6366f1', '#0ea5e9', '#10b981'][i % 4]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="OEM Partner Summary" className="col-span-2">
              <div className="grid grid-cols-4 gap-4 text-xs">
                {oemContractData.map((o, i) => (
                  <div key={o.oem} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 block text-sm">{o.oem}</span>
                    <span className="text-slate-500 text-[11px]">{o.contracts} Contracts</span>
                    <span className="text-2xl font-black mt-2 block" style={{ color: ['#8b5cf6','#6366f1','#0ea5e9','#10b981'][i % 4] }}>
                      ₹{o.revenue}L
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ── DEALERS ── */}
        {currentTab === 'dealers' && (
          <div className="grid grid-cols-2 gap-5">
            <Card title="Sales vs Target by Dealer" className="col-span-2">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dealerPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="dealer" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                  <Bar dataKey="sales" name="Units Sold" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Dealer Revenue Split (₹L)">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={dealerPerformanceData}
                    dataKey="revenue"
                    nameKey="dealer"
                    cx="50%" cy="50%"
                    innerRadius={50} outerRadius={90}
                    paddingAngle={4}
                  >
                    {dealerPerformanceData.map((_, i) => (
                      <Cell key={i} fill={['#10b981', '#6366f1', '#f59e0b', '#ef4444'][i % 4]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Target Achievement Progress">
              <div className="space-y-4 text-xs">
                {dealerPerformanceData.map((d, i) => {
                  const pct = Math.round((d.sales / d.target) * 100);
                  const colors = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];
                  return (
                    <div key={d.dealer}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-bold text-slate-700">{d.dealer}</span>
                        <span className="font-bold text-slate-500">{d.sales} / {d.target} units ({pct}%)</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: colors[i % 4] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ── SALES PIPELINE ── */}
        {currentTab === 'sales' && (
          <div className="grid grid-cols-2 gap-5">
            {/* KPI Cards */}
            <div className="col-span-2 grid grid-cols-4 gap-4">
              {[
                { label: 'Negotiation Phase', value: '₹45.0L', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Closed Won (Jul)', value: '₹84.5L', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Closed Lost (Jul)', value: '₹6.7L', color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: 'Conversion Rate', value: '68.4%', color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((m) => (
                <div key={m.label} className={`${m.bg} p-5 rounded-2xl border border-slate-100`}>
                  <span className="text-xs text-slate-500 block">{m.label}</span>
                  <span className={`text-2xl font-black ${m.color} block mt-1`}>{m.value}</span>
                </div>
              ))}
            </div>

            <Card title="Monthly Pipeline Trend (₹L)" className="col-span-2">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={salesPipelineMonthly} margin={{ top: 5, right: 20, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                  <Line type="monotone" dataKey="negotiation" name="In Negotiation" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="closed" name="Closed Won" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="lost" name="Closed Lost" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Deal Stage Distribution">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={salesStageData}
                    dataKey="value"
                    nameKey="stage"
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={90}
                    paddingAngle={4}
                  >
                    {salesStageData.map((entry) => (
                      <Cell key={entry.stage} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Stage Breakdown">
              <div className="space-y-4 text-xs">
                {salesStageData.map((s) => {
                  const total = salesStageData.reduce((sum, d) => sum + d.value, 0);
                  const pct = Math.round((s.value / total) * 100);
                  return (
                    <div key={s.stage}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-bold text-slate-700">{s.stage}</span>
                        <span className="font-bold text-slate-500">₹{s.value}L ({pct}%)</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: s.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

      </div>
    </RouteGuard>
  );
}

export default function BusinessPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading...</div>}>
      <BusinessInner />
    </Suspense>
  );
}


