'use client';

import React, { useState, useEffect } from 'react';
import { useRole } from '../../../components/RoleContext';
import { ApiGateway, CEOMetricsResponse, getStoredApiUrl, setStoredApiUrl } from '../../../lib/api-client';
import { mockVehicles } from '../../../lib/mock-data';
import { Vehicle } from '../../../lib/types';
import {
  Crown,
  IndianRupee,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Server,
  RefreshCw,
  Globe,
  PlusCircle,
  MapPin,
  Activity,
  Navigation,
  Compass,
  FileText,
  Sliders,
  Check,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BusinessPerformanceModule } from '../../../components/ceo/business-performance/BusinessPerformanceModule';
import { CompanyOperationsModule } from '../../../components/ceo/company-operations/CompanyOperationsModule';
import { FleetIntelligenceModule } from '../../../components/ceo/fleet-intelligence/FleetIntelligenceModule';
import { DepartmentPerformanceModule } from '../../../components/ceo/department-performance/DepartmentPerformanceModule';
import { AiCommandCenterModule } from '../../../components/ceo/ai-command-center/AiCommandCenterModule';
import { ActionCenterModule } from '../../../components/ceo/action-center/ActionCenterModule';
import { AlertsRiskModule } from '../../../components/ceo/alerts-risk-center/AlertsRiskModule';
import { CommunicationHubModule } from '../../../components/ceo/communication-hub/CommunicationHubModule';
import { ReportsAnalyticsModule } from '../../../components/ceo/reports-analytics/ReportsAnalyticsModule';
import { RoleAccessGovernanceModule } from '../../../components/ceo/role-access/RoleAccessGovernanceModule';
import { GlobalFilterProvider } from '../../../lib/global-filter-context';
import { ExportModal } from '../../../components/ceo/common/ExportModal';
import { ShareAnalyticsModal } from '../../../components/ceo/common/ShareAnalyticsModal';
import { DrillDownModal } from '../../../components/ceo/common/DrillDownModal';
import { FloatingAiCopilotWidget } from '../../../components/ceo/common/FloatingAiCopilotWidget';

function CEODashboardContent() {








  const { currentProfile, roleConfigs } = useRole();
  const searchParams = useSearchParams();
  const activeModule = searchParams ? searchParams.get('module') : null;

  const moduleMeta: Record<string, { title: string; desc: string; badge: string }> = {
    'business-performance': {
      title: 'Business Performance Workspace',
      desc: 'Detailed financial growth, margin analysis, and membership subscription streams.',
      badge: 'Financial Suite',
    },
    'fleet-intelligence': {
      title: 'Fleet Intelligence & Telematics',
      desc: 'Live IoT telemetry stream monitoring battery degradation, controller temps, and active EVs.',
      badge: 'IoT Stream',
    },
    'department-performance': {
      title: 'Department Performance Index',
      desc: 'Comparative execution scores across Operations, Tech, HR, and Service Hubs.',
      badge: 'Performance Index',
    },
    'alerts-risk': {
      title: 'Alerts & Risk Management Center',
      desc: 'Real-time thermal cutoff alerts, SLA breach warnings, and critical system thresholds.',
      badge: 'Active Risk Stream',
    },
    'action-center': {
      title: 'Executive Action Center',
      desc: 'Immediate operational overrides, manual dispatch authorizations, and system commands.',
      badge: 'Command Suite',
    },
    'communication-hub': {
      title: 'Communication & Dispatch Hub',
      desc: 'Multi-channel broadcast logs, automated customer WhatsApp notifications, and alerts.',
      badge: 'Omnichannel Hub',
    },
    'reports-analytics': {
      title: 'Executive Reports & Analytics',
      desc: 'Comprehensive P&L reports, quarterly projections, and compliance audit histories.',
      badge: 'Executive Analytics',
    },
  };

  const currentModuleInfo = activeModule && moduleMeta[activeModule] ? moduleMeta[activeModule] : null;


  // Metrics State
  const [metrics, setMetrics] = useState<CEOMetricsResponse>({
    monthlyRevenue: 84500,
    revenueGrowthPercent: 22.3,
    connectedVehiclesCount: 148,
    zeroBackOfficePercent: 94.2,
    activeAmcCount: 342,
    revenueOverview: [
      { month: 'Jan', revenue: 18400 },
      { month: 'Feb', revenue: 28900 },
      { month: 'Mar', revenue: 41200 },
      { month: 'Apr', revenue: 54800 },
      { month: 'May', revenue: 69100 },
      { month: 'Jun', revenue: 84500 },
    ],
    isLiveServer: true,
    dataSourceName: 'Live Laravel Database Sync',
  });

  // Vehicles Telematics Stream State
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('ALL');

  // Interactive UI Controls
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '6M' | 'YTD'>('6M');
  const [activeChartTab, setActiveChartTab] = useState<'REVENUE' | 'SERVICES' | 'CITIES'>('REVENUE');
  const [liveTransactionFeed, setLiveTransactionFeed] = useState<
    { id: string; user: string; service: string; amount: number; time: string }[]
  >([
    { id: 'tx_01', user: 'Srinivas Rao', service: '3-Year Membership Plan', amount: 499, time: 'Just now' },
    { id: 'tx_02', user: 'Anita Roy', service: 'Service at Doorstep', amount: 249, time: '2 mins ago' },
    { id: 'tx_03', user: 'Kamesh Gupta', service: 'Service at Garage', amount: 499, time: '5 mins ago' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState('http://localhost:8000/api');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  useEffect(() => {
    setServerUrl(getStoredApiUrl());
  }, []);

  // Datasets by Time Range ('7D' | '30D' | '6M' | 'YTD')
  const revenueOverviewData: Record<'7D' | '30D' | '6M' | 'YTD', { month: string; revenue: number }[]> = {
    '7D': [
      { month: 'Mon', revenue: 11200 },
      { month: 'Tue', revenue: 13500 },
      { month: 'Wed', revenue: 12100 },
      { month: 'Thu', revenue: 14800 },
      { month: 'Fri', revenue: 16200 },
      { month: 'Sat', revenue: 18900 },
      { month: 'Sun', revenue: 21400 },
    ],
    '30D': [
      { month: 'Week 1', revenue: 18400 },
      { month: 'Week 2', revenue: 21200 },
      { month: 'Week 3', revenue: 22800 },
      { month: 'Week 4', revenue: 24100 },
    ],
    '6M': metrics.revenueOverview || [
      { month: 'Jan', revenue: 18400 },
      { month: 'Feb', revenue: 28900 },
      { month: 'Mar', revenue: 41200 },
      { month: 'Apr', revenue: 54800 },
      { month: 'May', revenue: 69100 },
      { month: 'Jun', revenue: 84500 },
    ],
    'YTD': [
      { month: 'Q1 2025', revenue: 112000 },
      { month: 'Q2 2025', revenue: 145000 },
      { month: 'Q3 2025', revenue: 188000 },
      { month: 'Q4 2025', revenue: 235000 },
      { month: 'Q1 2026', revenue: 295000 },
      { month: 'Q2 2026', revenue: 348000 },
    ],
  };

  const serviceRevenueBreakdownData: Record<
    '7D' | '30D' | '6M' | 'YTD',
    { name: string; value: number; color: string }[]
  > = {
    '7D': [
      { name: 'Service at Garage (₹499)', value: 5488, color: '#0280d2' },
      { name: 'Service at Home (₹249)', value: 3486, color: '#10b981' },
      { name: 'Roadside Assistance (₹199)', value: 1990, color: '#f59e0b' },
      { name: 'Membership Plans (₹199-999)', value: 1592, color: '#8b5cf6' },
    ],
    '30D': [
      { name: 'Service at Garage (₹499)', value: 21457, color: '#0280d2' },
      { name: 'Service at Home (₹249)', value: 13944, color: '#10b981' },
      { name: 'Roadside Assistance (₹199)', value: 7562, color: '#f59e0b' },
      { name: 'Membership Plans (₹199-999)', value: 5190, color: '#8b5cf6' },
    ],
    '6M': [
      { name: 'Service at Garage (₹499)', value: 38400, color: '#0280d2' },
      { name: 'Service at Home (₹249)', value: 24200, color: '#10b981' },
      { name: 'Roadside Assistance (₹199)', value: 12900, color: '#f59e0b' },
      { name: 'Membership Plans (₹199-999)', value: 9000, color: '#8b5cf6' },
    ],
    'YTD': [
      { name: 'Service at Garage (₹499)', value: 142000, color: '#0280d2' },
      { name: 'Service at Home (₹249)', value: 94500, color: '#10b981' },
      { name: 'Roadside Assistance (₹199)', value: 52000, color: '#f59e0b' },
      { name: 'Membership Plans (₹199-999)', value: 39500, color: '#8b5cf6' },
    ],
  };

  const cityRevenueDataByRange: Record<
    '7D' | '30D' | '6M' | 'YTD',
    { city: string; revenue: number; bookings: number }[]
  > = {
    '7D': [
      { city: 'Kakinada Main Hub', revenue: 4800, bookings: 22 },
      { city: 'Rajahmundry East', revenue: 3200, bookings: 14 },
      { city: 'Vijayawada Central', revenue: 2400, bookings: 10 },
      { city: 'Visakhapatnam Port', revenue: 1600, bookings: 6 },
    ],
    '30D': [
      { city: 'Kakinada Main Hub', revenue: 18600, bookings: 78 },
      { city: 'Rajahmundry East', revenue: 12400, bookings: 52 },
      { city: 'Vijayawada Central', revenue: 9100, bookings: 37 },
      { city: 'Visakhapatnam Port', revenue: 5800, bookings: 20 },
    ],
    '6M': [
      { city: 'Kakinada Main Hub', revenue: 34200, bookings: 142 },
      { city: 'Rajahmundry East', revenue: 22800, bookings: 94 },
      { city: 'Vijayawada Central', revenue: 16500, bookings: 68 },
      { city: 'Visakhapatnam Port', revenue: 11000, bookings: 38 },
    ],
    'YTD': [
      { city: 'Kakinada Main Hub', revenue: 138000, bookings: 580 },
      { city: 'Rajahmundry East', revenue: 91000, bookings: 375 },
      { city: 'Vijayawada Central', revenue: 66000, bookings: 270 },
      { city: 'Visakhapatnam Port', revenue: 44000, bookings: 160 },
    ],
  };

  const currentRevenueOverview = revenueOverviewData[timeRange] || metrics.revenueOverview;
  const currentServiceBreakdown = serviceRevenueBreakdownData[timeRange];
  const currentCityRevenueData = cityRevenueDataByRange[timeRange];

  const fetchMetrics = async () => {
    const data = await ApiGateway.getCEOMetrics();
    const liveVehs = await ApiGateway.getConnectedVehicles();
    setMetrics(data);
    setVehicles(liveVehs);
    setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  // Live Auto-Refresh Polling every 8 seconds
  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(() => {
      fetchMetrics();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Simulate Live Payment Transaction
  const handleSimulatePayment = () => {
    const sampleTx = [
      { service: 'Service at Home', amount: 249 },
      { service: 'Service at Garage', amount: 499 },
      { service: 'Roadside Assistance', amount: 199 },
      { service: 'Lifetime Membership Plan', amount: 999 },
    ];
    const picked = sampleTx[Math.floor(Math.random() * sampleTx.length)];
    const newTx = {
      id: `tx_${Date.now()}`,
      user: `Customer #${Math.floor(100 + Math.random() * 900)}`,
      service: picked.service,
      amount: picked.amount,
      time: 'Just now',
    };

    setLiveTransactionFeed((prev) => [newTx, ...prev.slice(0, 4)]);
    setMetrics((prev) => ({
      ...prev,
      monthlyRevenue: prev.monthlyRevenue + picked.amount,
      activeAmcCount: prev.activeAmcCount + 1,
    }));
  };

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    setStoredApiUrl(serverUrl);
    const res = await ApiGateway.testBackendConnection(serverUrl);
    setTestResult(res);

    if (res.success) {
      await fetchMetrics();
    }
    setIsTesting(false);
  };

  return (
    <div className="space-y-6 text-left" suppressHydrationWarning>
      {/* Dedicated Module Views */}

      {activeModule === 'business-performance' ? (
        <BusinessPerformanceModule />
      ) : activeModule === 'company-operations' ? (
        <CompanyOperationsModule />
      ) : activeModule === 'fleet-intelligence' ? (
        <FleetIntelligenceModule />
      ) : activeModule === 'department-performance' ? (
        <DepartmentPerformanceModule />
      ) : activeModule === 'ai-command' ? (
        <AiCommandCenterModule />
      ) : activeModule === 'action-center' ? (
        <ActionCenterModule />
      ) : activeModule === 'alerts-risk' || activeModule === 'alerts' ? (
        <AlertsRiskModule />
      ) : activeModule === 'communication-hub' || activeModule === 'communication' ? (
        <CommunicationHubModule />
      ) : activeModule === 'reports-analytics' || activeModule === 'reports' ? (
        <ReportsAnalyticsModule />
      ) : activeModule === 'role-access' || activeModule === 'roles' ? (
        <RoleAccessGovernanceModule />
      ) : (
        <>
          {/* CEO Executive Welcome Banner (Only displayed on Executive Overview) */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 z-10">
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-amber-600 fill-amber-500" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-700">Chief Executive Office</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Welcome back, {currentProfile.name}</h1>
              <p className="text-xs text-slate-600 max-w-xl font-medium">
                InnoVibe Mobility Command Center Executive Suite. Overseeing live vehicle tracking, service hub performance, and revenue growth.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 z-10">
              <Link
                href="/dashboard/roles"
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all"
              >
                <ShieldCheck className="h-4 w-4" /> CEO Role & Access Matrix
              </Link>
              <Link
                href="/dashboard/ai-command"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
              >
                <Sparkles className="h-4 w-4 text-sky-600" /> AI Control Suite
              </Link>
            </div>
          </div>








          {/* Active Selected Executive Module Indicator Banner */}
          {currentModuleInfo && (
            <div className="p-4 rounded-2xl bg-sky-50/90 border border-sky-300 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{currentModuleInfo.title}</h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-200 text-sky-900">
                      {currentModuleInfo.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">{currentModuleInfo.desc}</p>
                </div>
              </div>

              <Link
                href="/dashboard/ceo"
                className="text-xs font-bold text-sky-700 hover:text-sky-900 px-3 py-1.5 rounded-xl bg-white border border-sky-200 shadow-xs"
              >
                Reset to Main View
              </Link>
            </div>
          )}



      {/* Metric Cards (Updated without Zero Back-Office card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Monthly Revenue</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200"><IndianRupee className="h-5 w-5" /></div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-3 flex items-center gap-2">
            ₹{metrics.monthlyRevenue.toLocaleString('en-IN')}
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1 font-extrabold">
            <TrendingUp className="h-3.5 w-3.5" /> +{metrics.revenueGrowthPercent}% vs last month
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered EVs / Users</span>
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200"><Zap className="h-5 w-5" /></div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-3">{metrics.connectedVehiclesCount.toLocaleString('en-IN')} Active</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">Mapped to Database `users` Table</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Active Fleets</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200"><Activity className="h-5 w-5" /></div>
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-3 flex items-center gap-2">
            100% Online
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </p>
          <p className="text-xs text-slate-500 mt-1 font-medium">GPS Telemetry Stream Active</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Service Bookings</span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200"><Users className="h-5 w-5" /></div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-3">{metrics.activeAmcCount.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-500 mt-1 font-medium">Mapped to Database `bookings` Table</p>
        </div>
      </div>

      {/* Live Fleet Tracking Telematics Section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-sky-600" />
              <h2 className="text-base font-extrabold text-slate-900">Live Vehicle Tracking & Telematics Stream</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">Real-time GPS coordinates, battery health, and EV status from the live backend</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-sky-600 animate-spin" /> Live Telemetry
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <th className="pb-3 px-3">Reg Number / VIN</th>
                <th className="pb-3 px-3">EV Model</th>
                <th className="pb-3 px-3">Owner</th>
                <th className="pb-3 px-3">Battery %</th>
                <th className="pb-3 px-3">Controller Temp</th>
                <th className="pb-3 px-3">Health Score</th>
                <th className="pb-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((veh) => (
                <tr key={veh.id} className="hover:bg-slate-50 transition-all">
                  <td className="py-3.5 px-3">
                    <p className="font-mono font-bold text-sky-700">{veh.registrationNumber}</p>
                    <p className="text-[10px] font-mono text-slate-400">{veh.vin}</p>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{veh.model}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{veh.ownerName}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${veh.healthScore.batteryHealth < 30 ? 'bg-red-500' : 'bg-emerald-500'}`}
                          style={{ width: `${veh.healthScore.batteryHealth}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-900">{veh.healthScore.batteryHealth}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-700">{veh.healthScore.controllerTemp}°C</td>
                  <td className="py-3.5 px-3 font-mono font-extrabold text-sm text-emerald-700">
                    {veh.healthScore.overall} / 100
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {veh.healthScore.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Main Visualisation Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Multi-Tab Charting Workbench */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
          {/* Controls Bar: Time Filter & Tab Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            {/* Tab Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveChartTab('REVENUE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  activeChartTab === 'REVENUE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Revenue Trend
              </button>
              <button
                onClick={() => setActiveChartTab('SERVICES')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  activeChartTab === 'SERVICES' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Service Breakdown
              </button>
              <button
                onClick={() => setActiveChartTab('CITIES')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  activeChartTab === 'CITIES' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                City Hub Mix
              </button>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-1">
              {(['7D', '30D', '6M', 'YTD'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border transition-all ${
                    timeRange === range
                      ? 'bg-sky-50 border-sky-300 text-sky-800'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1: Live Revenue Area Chart */}
          {activeChartTab === 'REVENUE' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500 font-semibold">
                  {timeRange === '7D'
                    ? 'Daily Gross Revenue Streaming (Last 7 Days)'
                    : timeRange === '30D'
                    ? 'Weekly Gross Revenue Streaming (This Month)'
                    : timeRange === 'YTD'
                    ? 'Quarterly Gross Revenue Streaming (Year-to-Date)'
                    : 'Monthly Gross Revenue Streaming from PostgreSQL Database'}
                </p>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" /> Live Stream
                </span>
              </div>
              <div className="h-72 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentRevenueOverview} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0280d2" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0280d2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickFormatter={(val) => `₹${val.toLocaleString('en-IN')}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#0280d2" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Tab 2: Service Revenue Breakdown Pie Chart */}
          {activeChartTab === 'SERVICES' && (
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-2">
                Revenue Share by Service Package ({timeRange})
              </p>
              <div className="h-72 w-full flex flex-col md:flex-row items-center justify-around">
                <div className="h-64 w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={currentServiceBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                        {currentServiceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 text-xs">
                  {currentServiceBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-bold text-slate-700">{item.name}:</span>
                      <span className="font-extrabold text-slate-900">₹{item.value.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: City Hub Breakdown Bar Chart */}
          {activeChartTab === 'CITIES' && (
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-2">
                Revenue Performance Across Service Hubs ({timeRange})
              </p>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentCityRevenueData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="city" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px' }} />
                    <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Payment Transaction Feed & Quick Tools */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">Live Transaction Ticker</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                REALTIME
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {liveTransactionFeed.map((tx) => (
                <div key={tx.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between transition-all hover:bg-emerald-50/50">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{tx.user}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{tx.service}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{tx.time}</p>
                  </div>
                  <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-200">
                    +₹{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSimulatePayment}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center block transition-all shadow-sm"
          >
            + Trigger Live Webhook Transaction
          </button>
        </div>
      </div>
      </>
      )}

      {/* Backend API Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-sky-600" />
                <h3 className="text-lg font-extrabold text-slate-900">Live Backend API Connection</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Specify your live API Server Base URL. The Next.js server proxy seamlessly connects without browser CORS restrictions.
            </p>

            <form onSubmit={handleTestAndSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">API Server Base URL</label>
                <input
                  type="text"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  placeholder="http://localhost:8000/api"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"
                />
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl text-xs font-bold border ${
                  testResult.success ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  {testResult.message}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  type="submit"
                  disabled={isTesting}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold shadow-md flex items-center gap-2"
                >
                  {isTesting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                  <span>Test & Connect API</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Enterprise Modals & Floating AI Copilot */}
      <ExportModal />
      <ShareAnalyticsModal />
      <DrillDownModal />
      <FloatingAiCopilotWidget />
    </div>
  );
}

export default function CEODashboard() {
  return (
    <GlobalFilterProvider>
      <CEODashboardContent />
    </GlobalFilterProvider>
  );
}
