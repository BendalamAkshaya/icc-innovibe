'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { DollarSign, Receipt, PieChart as PieChartIcon, Lock, TrendingUp, BarChart3, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

function FinancialsInner() {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') || 'revenue' : 'revenue';

  const [timeframe, setTimeframe] = useState<'monthly' | 'weekly' | 'quarterly'>('monthly');
  const [metric, setMetric] = useState<'revenue' | 'tickets'>('revenue');
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/coo/finance')
      .then((res) => (res && res.ok ? res.json() : null))
      .then((data) => {
        if (data) setLiveData(data);
      })
      .catch(() => {
        // Safe silent fallback to local metrics when backend is offline
      });
  }, []);

  // Premium Datasets for Recharts
  const chartDatasets = {
    weekly: [
      { name: 'Mon', revenue: 180000, tickets: 24, growth: '+12%', display: '₹1.80 L' },
      { name: 'Tue', revenue: 210000, tickets: 31, growth: '+15%', display: '₹2.10 L' },
      { name: 'Wed', revenue: 190000, tickets: 28, growth: '+8%', display: '₹1.90 L' },
      { name: 'Thu', revenue: 240000, tickets: 38, growth: '+22%', display: '₹2.40 L' },
      { name: 'Fri', revenue: 280000, tickets: 45, growth: '+30%', display: '₹2.80 L' },
      { name: 'Sat', revenue: 320000, tickets: 52, growth: '+35%', display: '₹3.20 L' },
      { name: 'Sun', revenue: 290000, tickets: 48, growth: '+28%', display: '₹2.90 L' },
    ],
    monthly: [
      { name: 'Jan', revenue: 4200000, tickets: 520, growth: '+10%', display: '₹42.0 L' },
      { name: 'Feb', revenue: 4850000, tickets: 610, growth: '+15%', display: '₹48.5 L' },
      { name: 'Mar', revenue: 5800000, tickets: 740, growth: '+19%', display: '₹58.0 L' },
      { name: 'Apr', revenue: 6420000, tickets: 810, growth: '+11%', display: '₹64.2 L' },
      { name: 'May', revenue: 7100000, tickets: 920, growth: '+10%', display: '₹71.0 L' },
      { name: 'Jun', revenue: 7840000, tickets: 1040, growth: '+10%', display: '₹78.4 L' },
      { name: 'Jul', revenue: 8450000, tickets: 1150, growth: '+18.4%', display: '₹84.5 L' },
    ],
    quarterly: [
      { name: 'Q1 25', revenue: 12000000, tickets: 1650, growth: '+14%', display: '₹1.20 Cr' },
      { name: 'Q2 25', revenue: 14500000, tickets: 1980, growth: '+20%', display: '₹1.45 Cr' },
      { name: 'Q3 25', revenue: 18000000, tickets: 2420, growth: '+24%', display: '₹1.80 Cr' },
      { name: 'Q4 25', revenue: 21000000, tickets: 2900, growth: '+16%', display: '₹2.10 Cr' },
      { name: 'Q1 26', revenue: 24000000, tickets: 3300, growth: '+14%', display: '₹2.40 Cr' },
    ],
  };

  const activeDataset = chartDatasets[timeframe];

  // Revenue Streams Bar Chart Data
  const streamBarData = [
    { name: 'Garage Repair', value: 898000, display: '₹8.98L', color: '#2563eb', percent: '52%' },
    { name: 'Home Service', value: 348600, display: '₹3.48L', color: '#10b981', percent: '30%' },
    { name: 'Road Service', value: 199000, display: '₹1.99L', color: '#a855f7', percent: '18%' },
  ];

  // P&L Trajectory Data
  const pnlTrendData = [
    { name: 'Jan', income: 42.0, expense: 22.5, profit: 19.5, margin: '46.4%' },
    { name: 'Feb', income: 48.5, expense: 24.2, profit: 24.3, margin: '50.1%' },
    { name: 'Mar', income: 58.0, expense: 26.8, profit: 31.2, margin: '53.7%' },
    { name: 'Apr', income: 64.2, expense: 28.5, profit: 35.7, margin: '55.6%' },
    { name: 'May', income: 71.0, expense: 29.8, profit: 41.2, margin: '58.0%' },
    { name: 'Jun', income: 78.4, expense: 31.0, profit: 47.4, margin: '60.4%' },
    { name: 'Jul', income: 84.5, expense: 32.1, profit: 52.4, margin: '62.0%' },
  ];

  // P&L Expense Structure Donut Data
  const pnlExpenseData = [
    { name: 'Spares & Battery Inventory', value: 14.2, display: '₹14.2L', percent: '44.2%', color: '#ef4444' },
    { name: 'Technician Payroll & Incentives', value: 9.8, display: '₹9.8L', percent: '30.5%', color: '#f59e0b' },
    { name: 'Depot Utilities & Rent', value: 5.1, display: '₹5.1L', percent: '15.9%', color: '#6366f1' },
    { name: 'Logistics & Dispatch Freight', value: 3.0, display: '₹3.0L', percent: '9.4%', color: '#0ea5e9' },
  ];

  // Custom Glassmorphic Recharts Floating Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700/60 space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
            <span className="font-black text-xs text-slate-300">{label} Performance</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold rounded-full border border-emerald-500/30">
              {dataPoint.growth}
            </span>
          </div>
          <div className="pt-1">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Gross Revenue</span>
            <span className="text-lg font-black text-emerald-400 block">{dataPoint.display}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
            <span>Completed Tickets:</span>
            <strong className="text-white font-bold">{dataPoint.tickets} jobs</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <RouteGuard module="financials">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-emerald-600" />
                Financial Performance & Executive Revenue Analytics
              </h1>
              <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> READ ONLY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Executive Financial Oversight • Interactive Recharts Analytics • Real-Time Revenue Trajectory
            </p>
          </div>
          <div className="flex items-center space-x-2 px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-2xs">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>COO Role: Financial Mutability Restricted</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-slate-200 bg-white px-4 pt-3 rounded-xl shadow-xs">
          {[
            { id: 'revenue', label: 'Revenue Analytics & Recharts Trends', icon: TrendingUp },
            { id: 'billing', label: 'Billing & Corporate Invoices', icon: Receipt },
            { id: 'finance', label: 'P&L & Operating Margins', icon: BarChart3 },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <Link
                key={t.id}
                href={`/dashboard/coo/financials?tab=${t.id}`}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  active
                    ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded font-mono">RO</span>
              </Link>
            );
          })}
        </div>

        {/* Tab 1: Recharts Premium Analytics */}
        {currentTab === 'revenue' && (
          <div className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition">
                <span className="text-xs font-bold text-slate-500 uppercase">Revenue Today</span>
                <span className="text-2xl font-black text-slate-900 block mt-2">
                  ₹{liveData ? (liveData.revenue_today / 100000).toFixed(2) + 'L' : '14.45L'}
                </span>
                <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last week
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition">
                <span className="text-xs font-bold text-slate-500 uppercase">Monthly Revenue</span>
                <span className="text-2xl font-black text-slate-900 block mt-2">
                  ₹{liveData ? (liveData.monthly_revenue / 100000).toFixed(2) + 'L' : '84.50L'}
                </span>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Target: ₹80.00L (Exceeded)</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 transition">
                <span className="text-xs font-bold text-slate-500 uppercase">Pending Billing</span>
                <span className="text-2xl font-black text-amber-600 block mt-2">
                  ₹{liveData ? (liveData.pending_billing / 100000).toFixed(2) + 'L' : '1.84L'}
                </span>
                <p className="text-xs text-slate-500 mt-1">4 Corporate Accounts</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition">
                <span className="text-xs font-bold text-slate-500 uppercase">AMC Contracts Stream</span>
                <span className="text-2xl font-black text-purple-700 block mt-2">
                  ₹{liveData ? (liveData.amc_revenue / 100000).toFixed(2) + 'L' : '12.50L'}
                </span>
                <p className="text-xs text-purple-600 font-semibold mt-1">Annual Recurring Stream</p>
              </div>
            </div>

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Premium Recharts Monotone Area Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        Revenue Growth Trajectory & Volume
                      </h3>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md">
                        Y-Axis: {metric === 'revenue' ? 'Gross Revenue (₹ Lakhs)' : 'Total Completed Tickets (Jobs)'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Showing {metric === 'revenue' ? 'Gross Revenue in Lakhs (₹)' : 'Completed Service Ticket Jobs'} across {timeframe} timeframe
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Metric Switcher */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                      <button
                        onClick={() => setMetric('revenue')}
                        className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                          metric === 'revenue' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Revenue (₹)
                      </button>
                      <button
                        onClick={() => setMetric('tickets')}
                        className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                          metric === 'tickets' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Tickets
                      </button>
                    </div>

                    {/* Timeframe Switcher */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                      {(['weekly', 'monthly', 'quarterly'] as const).map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setTimeframe(tf)}
                          className={`px-3 py-1 capitalize rounded-lg transition cursor-pointer ${
                            timeframe === tf ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {tf === 'weekly' ? '7 Days' : tf}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recharts Area Container */}
                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeDataset} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                        tickFormatter={(val) =>
                          metric === 'revenue' ? `₹${(val / 100000).toFixed(0)}L` : `${val} jobs`
                        }
                      />

                      <Tooltip content={<CustomTooltip />} />

                      <Area
                        type="monotone"
                        dataKey={metric}
                        stroke="#10b981"
                        strokeWidth={3.5}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        activeDot={{ r: 8, fill: '#047857', stroke: '#ffffff', strokeWidth: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recharts Revenue Stream Bar Chart */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Revenue Stream Shares
                  </h3>
                  <p className="text-xs text-slate-500">Distribution by operational service category</p>
                </div>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={streamBarData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }} />
                      <Tooltip
                        formatter={(value: any) => [`₹${(Number(value) / 100000).toFixed(2)}L`, 'Revenue']}
                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                      />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                        {streamBarData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {streamBarData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-700">{item.name}</span>
                      </div>
                      <span className="text-slate-900">{item.display} ({item.percent})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Billing & Corporate Invoices */}
        {currentTab === 'billing' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Billing & Corporate Invoicing (Read Only)</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center hover:bg-slate-100 transition">
                <div>
                  <span className="font-bold text-slate-900 block">INV-2026-901 • Blusmart EV Fleet Matrix</span>
                  <span className="text-slate-500">Corporate Fleet Maintenance Billing</span>
                </div>
                <span className="font-black text-emerald-600">₹4,85,000 (PAID)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center hover:bg-slate-100 transition">
                <div>
                  <span className="font-bold text-slate-900 block">INV-2026-902 • Rapido Mobility</span>
                  <span className="text-slate-500">E-Bike Emergency Battery Swap Retainer</span>
                </div>
                <span className="font-black text-amber-600">₹1,84,500 (PENDING)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: P&L & Operating Margins */}
        {currentTab === 'finance' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Gross Operating Income</span>
                <span className="text-2xl font-black text-emerald-600 block mt-1">₹84,50,000</span>
                <span className="text-[11px] font-semibold text-emerald-700 mt-1 inline-flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% YoY Growth
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Operational Expenses</span>
                <span className="text-2xl font-black text-rose-600 block mt-1">₹32,10,000</span>
                <span className="text-[11px] font-semibold text-rose-700 mt-1 inline-flex items-center gap-1">
                  38.0% of Gross Revenue
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Net Operating Profit</span>
                <span className="text-2xl font-black text-blue-600 block mt-1">₹52,40,000</span>
                <span className="text-[11px] font-semibold text-blue-700 mt-1 inline-flex items-center gap-1">
                  62.0% Net Profit Margin
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">EBITDA Contribution</span>
                <span className="text-2xl font-black text-indigo-600 block mt-1">₹48,20,000</span>
                <span className="text-[11px] font-semibold text-indigo-700 mt-1 inline-flex items-center gap-1">
                  57.0% Operating EBITDA
                </span>
              </div>
            </div>

            {/* Charts Row: P&L Trajectory & Expense Structure Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* P&L Trajectory Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Monthly P&L & Operating Margin Trajectory
                    </h3>
                    <p className="text-xs text-slate-500">Gross Income vs Operational Expenses vs Net Profit (₹ Lakhs)</p>
                  </div>
                  <span className="text-[11px] font-extrabold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                    62.0% Margin High
                  </span>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pnlTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `₹${v}L`} />
                      <Tooltip formatter={(val: any, name: any) => [`₹${val}L`, name === 'income' ? 'Gross Income' : name === 'expense' ? 'Expenses' : 'Net Profit']} />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Bar dataKey="income" name="Gross Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="profit" name="Net Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Expense Structure Donut Chart */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-rose-500" />
                    Expense Structure Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">Distribution of ₹32.1L total operational costs</p>
                </div>

                <div className="relative h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pnlExpenseData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {pnlExpenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => [`₹${v}L`, 'Cost']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <span className="text-lg font-black text-slate-900 block leading-none">₹32.1L</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mt-0.5">Opex Total</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {pnlExpenseData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 truncate pr-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-700 font-semibold truncate">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">{item.display} ({item.percent})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* P&L Statement Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">P&L Operating Margin Statement</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50">
                      <th className="p-3">Financial Line Item</th>
                      <th className="p-3 text-right">Jul 2026 Amount</th>
                      <th className="p-3 text-right">% of Revenue</th>
                      <th className="p-3 text-right">YoY Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Gross Operating Income</td>
                      <td className="p-3 text-right font-extrabold text-emerald-600">₹84,50,000</td>
                      <td className="p-3 text-right font-bold text-slate-700">100.0%</td>
                      <td className="p-3 text-right font-bold text-emerald-600">+18.4%</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-700 pl-6">↳ EV Fleet Workshop Repairs</td>
                      <td className="p-3 text-right text-slate-700">₹44,00,000</td>
                      <td className="p-3 text-right text-slate-500">52.1%</td>
                      <td className="p-3 text-right text-emerald-600">+15.2%</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-700 pl-6">↳ Doorstep Fleet Service Retainers</td>
                      <td className="p-3 text-right text-slate-700">₹25,50,000</td>
                      <td className="p-3 text-right text-slate-500">30.2%</td>
                      <td className="p-3 text-right text-emerald-600">+22.0%</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-700 pl-6">↳ Emergency Roadside Assistance</td>
                      <td className="p-3 text-right text-slate-700">₹15,00,000</td>
                      <td className="p-3 text-right text-slate-500">17.7%</td>
                      <td className="p-3 text-right text-emerald-600">+12.8%</td>
                    </tr>
                    <tr className="bg-rose-50/50 hover:bg-rose-50 font-bold text-slate-900">
                      <td className="p-3 font-bold text-rose-900">Total Operational Expenses (COGS & Opex)</td>
                      <td className="p-3 text-right font-extrabold text-rose-600">₹32,10,000</td>
                      <td className="p-3 text-right font-bold text-slate-700">38.0%</td>
                      <td className="p-3 text-right font-bold text-emerald-600">-4.2% (Savings)</td>
                    </tr>
                    <tr className="bg-emerald-50/60 font-black text-slate-900">
                      <td className="p-3 font-black text-emerald-950 text-sm">Net Operating Margin (EBITDA)</td>
                      <td className="p-3 text-right font-black text-blue-600 text-sm">₹52,40,000</td>
                      <td className="p-3 text-right font-black text-blue-600 text-sm">62.0%</td>
                      <td className="p-3 text-right font-black text-emerald-600 text-sm">+24.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </RouteGuard>
  );
}

export default function FinancialsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading...</div>}>
      <FinancialsInner />
    </Suspense>
  );
}


