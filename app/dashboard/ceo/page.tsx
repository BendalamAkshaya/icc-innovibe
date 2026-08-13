'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRole } from '../../../components/RoleContext';
import { ApiGateway, CEOMetricsResponse, getStoredApiUrl, setStoredApiUrl } from '../../../lib/api-client';
import { mockVehicles } from '../../../lib/mock-data';
import { Vehicle } from '../../../lib/types';
import {
  Shield,
  Sparkles,
  TrendingUp,
  Radio,
  Users,
  Zap,
  ChevronRight,
  MoreHorizontal,
  Bot,
  AlertTriangle,
  FileText,
  MessageSquare,
  Activity,
  Server,
  RefreshCw,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { TmsModule } from '../../../components/ceo/tms/TmsModule';
import { BusinessPerformanceModule } from '../../../components/ceo/business-performance/BusinessPerformanceModule';
import { CompanyOperationsModule } from '../../../components/ceo/company-operations/CompanyOperationsModule';
import { FleetIntelligenceModule } from '../../../components/ceo/fleet-intelligence/FleetIntelligenceModule';
import { DepartmentPerformanceModule } from '../../../components/ceo/department-performance/DepartmentPerformanceModule';
import { ActionCenterModule } from '../../../components/ceo/action-center/ActionCenterModule';
import { AlertsRiskModule } from '../../../components/ceo/alerts-risk-center/AlertsRiskModule';
import { CommunicationHubModule } from '../../../components/ceo/communication-hub/CommunicationHubModule';
import { ReportsAnalyticsModule } from '../../../components/ceo/reports-analytics/ReportsAnalyticsModule';
import { RoleAccessGovernanceModule } from '../../../components/ceo/role-access/RoleAccessGovernanceModule';
import { GlobalFilterProvider } from '../../../lib/global-filter-context';

function CEODashboardContent() {
  const { currentProfile } = useRole();
  const searchParams = useSearchParams();
  const activeModule = searchParams ? searchParams.get('module') : null;

  // Metrics State
  const [metrics, setMetrics] = useState<CEOMetricsResponse>({
    monthlyRevenue: 84500,
    revenueGrowthPercent: 22.3,
    connectedVehiclesCount: 148,
    zeroBackOfficePercent: 94.2,
    activeAmcCount: 342,
    revenueOverview: [],
    isLiveServer: true,
    dataSourceName: 'Live Database Sync',
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState('http://localhost:8000/api');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    setServerUrl(getStoredApiUrl());
  }, []);

  const fetchMetrics = async () => {
    const data = await ApiGateway.getCEOMetrics();
    const liveVehs = await ApiGateway.getConnectedVehicles();
    setMetrics(data);
    setVehicles(liveVehs);
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(() => {
      fetchMetrics();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="space-y-6 text-left font-sans">
      {/* Sub-module Routing Views */}
      {activeModule && (activeModule === 'tms' || activeModule.startsWith('tms-')) ? (
        <TmsModule subModule={activeModule} />
      ) : activeModule === 'business-performance' ? (
        <BusinessPerformanceModule />
      ) : activeModule === 'company-operations' ? (
        <CompanyOperationsModule />
      ) : activeModule === 'fleet-intelligence' ? (
        <FleetIntelligenceModule />
      ) : activeModule === 'department-performance' ? (
        <DepartmentPerformanceModule />
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
          {/* Top Hero Banner */}
          <div className="rounded-3xl border border-[#fde68a]/70 bg-gradient-to-r from-[#fffbeb] via-[#fef3c7]/50 to-[#fffdf5] p-6 lg:p-7 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-3 relative z-10 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-widest text-[#b45309] block">
                  CHIEF EXECUTIVE OFFICE
                </span>
              </div>

              <h1 className="font-gotham text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                Welcome back, {currentProfile.name} 👋
              </h1>

              <p className="font-sans text-xs text-slate-600 font-medium leading-relaxed">
                Real-time oversight of Innovibe Mobility operations.<br />
                Tracking performance, intelligence and growth — all in one place.
              </p>

              <div className="flex items-center gap-3 pt-1 font-apfel">
                <Link
                  href="/dashboard/roles"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2 transition-all"
                >
                  <Shield className="h-4 w-4 text-amber-100" />
                  <span>CEO Role & Access Matrix</span>
                </Link>

                <Link
                  href="/dashboard/ai-command"
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-xs shadow-2xs flex items-center gap-2 transition-all"
                >
                  <Sparkles className="h-4 w-4 text-[#d97706]" />
                  <span>AI Control Suite</span>
                </Link>
              </div>
            </div>

            {/* Floating System Status Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-emerald-200 text-emerald-800 font-apfel text-[10px] font-extrabold shadow-2xs absolute top-5 right-[430px] z-20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEM STATUS: All Systems Operational</span>
            </div>

            {/* EV Sedan Hero Illustration */}
            <div className="relative shrink-0 flex items-center justify-end h-[165px] lg:h-[190px] w-full md:w-[320px] lg:w-[430px] overflow-hidden rounded-2xl border border-amber-100/60 shadow-2xs">
              <img
                src="/ceo_hero_ev_car_gold.png"
                alt="Luxury Gold EV Sedan"
                className="h-full w-full object-cover object-center pointer-events-none rounded-2xl"
              />
            </div>
          </div>

          {/* 4 Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: LIVE MONTHLY REVENUE */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    LIVE MONTHLY REVENUE
                  </span>
                  <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                    ₹{metrics.monthlyRevenue.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center font-bold text-sm shrink-0 font-apfel">
                  ₹
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel">
                <span className="text-emerald-600 text-xs font-extrabold flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> +{metrics.revenueGrowthPercent}% vs last month
                </span>
                {/* Gold Sparkline Wave */}
                <svg className="w-16 h-6 text-[#d97706]" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 15 Q15 18 25 10 T45 8 T60 3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 2: REGISTERED EVS / USERS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    REGISTERED EVS / USERS
                  </span>
                  <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                    {metrics.connectedVehiclesCount}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Users className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-extrabold text-emerald-600">Active</span>
                  <span className="font-sans text-slate-400 font-medium">Mapped to 'users' table</span>
                </div>
                {/* Green Sparkline Wave */}
                <svg className="w-16 h-6 text-emerald-500" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 16 Q15 14 30 15 T45 7 T60 4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 3: LIVE ACTIVE FLEETS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    LIVE ACTIVE FLEETS
                  </span>
                  <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                    100%
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
                  <Zap className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel">
                <div className="flex items-center gap-1 text-xs">
                  <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                    Online <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-sans text-slate-400 font-medium ml-1">GPS Telemetry Stream Active</span>
                </div>
                {/* Blue Sparkline Wave */}
                <svg className="w-16 h-6 text-sky-500" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 14 Q15 17 30 11 T45 13 T60 5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 4: TOTAL SERVICE BOOKINGS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    TOTAL SERVICE BOOKINGS
                  </span>
                  <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                    {metrics.activeAmcCount}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
                  <Activity className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-extrabold text-[#b45309]">Bookings</span>
                  <span className="font-sans text-slate-400 font-medium">Mapped to 'bookings' table</span>
                </div>
                {/* Gold Sparkline Wave */}
                <svg className="w-16 h-6 text-[#d97706]" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 16 Q15 12 30 16 T45 8 T60 3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Grid: Left Column (2 Cols) + Right Column (1 Col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Telematics Table Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Radio className="h-4 w-4 text-[#d97706]" />
                      <h2 className="font-gotham text-base font-extrabold text-slate-900 tracking-tight">
                        Live Vehicle Tracking & Telematics Stream
                      </h2>
                    </div>
                    <p className="font-sans text-xs text-slate-500 font-medium">
                      Real-time GPS coordinates, battery health, and EV status from the live backend
                    </p>
                  </div>

                  <button className="font-apfel px-3.5 py-1.5 rounded-xl border border-[#fde68a] text-[#92400e] bg-[#fef3c7]/60 hover:bg-[#fef3c7] font-extrabold text-xs flex items-center gap-1.5 transition-all shrink-0">
                    <Radio className="h-3.5 w-3.5 text-[#d97706] animate-pulse" />
                    <span>View Live Telemetry</span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] font-montserrat tracking-wider font-extrabold">
                        <th className="pb-3 px-2">VEHICLE / VIN</th>
                        <th className="pb-3 px-2">EV MODEL</th>
                        <th className="pb-3 px-2">OWNER</th>
                        <th className="pb-3 px-2">BATTERY</th>
                        <th className="pb-3 px-2">CONTROLLER TEMP</th>
                        <th className="pb-3 px-2">HEALTH SCORE</th>
                        <th className="pb-3 px-2">STATUS</th>
                        <th className="pb-3 px-2 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-sans">
                      {/* Row 1 */}
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-2">
                          <p className="font-apfel font-extrabold text-[#b45309]">AP39AB1234</p>
                          <p className="font-apfel text-[9px] text-slate-400">INV0450X2026001</p>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                            <span className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-[10px]">🛵</span>
                            <span>Ather 450X Apex</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-600">User 1</td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }} />
                            </div>
                            <span className="font-apfel font-bold text-slate-800 text-[11px]">96%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-apfel font-semibold text-slate-700">42°C</td>
                        <td className="py-3.5 px-2 font-apfel font-black text-emerald-700 text-xs">94 / 100</td>
                        <td className="py-3.5 px-2">
                          <span className="font-apfel px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            Optimal
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal className="h-4 w-4" /></button>
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-2">
                          <p className="font-apfel font-extrabold text-[#b45309]">AP39CD5678</p>
                          <p className="font-apfel text-[9px] text-slate-400">INV00LA2026002</p>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                            <span className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-[10px]">🛴</span>
                            <span>Ola S1 Pro Gen2</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-600">User 2</td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }} />
                            </div>
                            <span className="font-apfel font-bold text-slate-800 text-[11px]">82%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-apfel font-semibold text-slate-700">56°C</td>
                        <td className="py-3.5 px-2 font-apfel font-black text-emerald-700 text-xs">78 / 100</td>
                        <td className="py-3.5 px-2">
                          <span className="font-apfel px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
                            Attention
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal className="h-4 w-4" /></button>
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-2">
                          <p className="font-apfel font-extrabold text-[#b45309]">AP39EF9012</p>
                          <p className="font-apfel text-[9px] text-slate-400">INV0TVS2026003</p>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                            <span className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-[10px]">🛵</span>
                            <span>iQube ST</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-600">User 3</td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }} />
                            </div>
                            <span className="font-apfel font-bold text-slate-800 text-[11px]">60%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-apfel font-semibold text-slate-700">68°C</td>
                        <td className="py-3.5 px-2 font-apfel font-black text-rose-600 text-xs">52 / 100</td>
                        <td className="py-3.5 px-2">
                          <span className="font-apfel px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80">
                            Warning
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal className="h-4 w-4" /></button>
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-2">
                          <p className="font-apfel font-extrabold text-[#b45309]">AP39GH3456</p>
                          <p className="font-apfel text-[9px] text-slate-400">INV0HERO2026004</p>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                            <span className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-[10px]">🛴</span>
                            <span>Hero Electric Nyx</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-600">User 4</td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91%' }} />
                            </div>
                            <span className="font-apfel font-bold text-slate-800 text-[11px]">91%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-apfel font-semibold text-slate-700">44°C</td>
                        <td className="py-3.5 px-2 font-apfel font-black text-emerald-700 text-xs">89 / 100</td>
                        <td className="py-3.5 px-2">
                          <span className="font-apfel px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            Optimal
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-medium">
                  <span className="font-sans">Showing 1 to 4 of 48 vehicles</span>
                  <button className="font-apfel px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-1 transition-all">
                    <span>View All Vehicles</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="space-y-2">
                <p className="font-montserrat text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">
                  ⚡ Quick Actions
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {/* Action 1 */}
                  <Link
                    href="/dashboard/ai-command"
                    className="p-3 rounded-2xl bg-[#fef3c7]/50 hover:bg-[#fef3c7] border border-[#fde68a] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-gotham text-xs font-extrabold text-slate-900 leading-tight">AI Command Center</p>
                        <p className="font-sans text-[9px] text-[#b45309] font-medium">Open AI Suite</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Action 2 */}
                  <Link
                    href="/dashboard/ceo?module=alerts-risk"
                    className="p-3 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-100 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-rose-500 text-white shadow-2xs">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-gotham text-xs font-extrabold text-slate-900 leading-tight">Alerts & Risk Center</p>
                        <p className="font-sans text-[9px] text-rose-700 font-medium">View Live Alerts</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Action 3 */}
                  <Link
                    href="/dashboard/ceo?module=action-center"
                    className="p-3 rounded-2xl bg-[#fef3c7]/50 hover:bg-[#fef3c7] border border-[#fde68a] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-gotham text-xs font-extrabold text-slate-900 leading-tight">Action Center</p>
                        <p className="font-sans text-[9px] text-[#b45309] font-medium">Take Action</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Action 4 */}
                  <Link
                    href="/dashboard/ceo?module=reports-analytics"
                    className="p-3 rounded-2xl bg-[#fef3c7]/50 hover:bg-[#fef3c7] border border-[#fde68a] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-gotham text-xs font-extrabold text-slate-900 leading-tight">Reports & Analytics</p>
                        <p className="font-sans text-[9px] text-[#b45309] font-medium">View Insights</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Action 5 */}
                  <Link
                    href="/dashboard/ceo?module=communication-hub"
                    className="p-3 rounded-2xl bg-[#fef3c7]/50 hover:bg-[#fef3c7] border border-[#fde68a] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-gotham text-xs font-extrabold text-slate-900 leading-tight">Communication Hub</p>
                        <p className="font-sans text-[9px] text-[#b45309] font-medium">Send Message</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 1 Column Widgets */}
            <div className="space-y-6">
              {/* Widget 1: Live Activity Feed */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#d97706]" />
                    <h3 className="font-gotham text-sm font-extrabold text-slate-900">Live Activity Feed</h3>
                  </div>
                  <button className="font-apfel text-[10px] font-bold text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
                    View all
                  </button>
                </div>

                <div className="space-y-3.5 text-xs text-left">
                  {/* Feed Item 1 */}
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div className="space-y-0.5 flex-1 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="font-apfel text-[10px] font-semibold text-slate-400">10:24 AM</span>
                      </div>
                      <p className="font-bold text-slate-800 leading-tight">
                        Vehicle AP39AB1234 telemetry synced
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">Battery: 96% • Temp: 42°C</p>
                    </div>
                  </div>

                  {/* Feed Item 2 */}
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div className="space-y-0.5 flex-1 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="font-apfel text-[10px] font-semibold text-slate-400">10:18 AM</span>
                      </div>
                      <p className="font-bold text-slate-800 leading-tight">
                        New service booking created
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">Booking ID #BK3421 • Customer: User 5</p>
                    </div>
                  </div>

                  {/* Feed Item 3 */}
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div className="space-y-0.5 flex-1 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="font-apfel text-[10px] font-semibold text-slate-400">10:12 AM</span>
                      </div>
                      <p className="font-bold text-slate-800 leading-tight">
                        Battery temperature warning
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">Vehicle AP39EF9012 • 68°C detected</p>
                    </div>
                  </div>

                  {/* Feed Item 4 */}
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <div className="space-y-0.5 flex-1 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="font-apfel text-[10px] font-semibold text-slate-400">10:05 AM</span>
                      </div>
                      <p className="font-bold text-slate-800 leading-tight">
                        AI anomaly detection resolved
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">Vehicle AP39CD5678 • System normal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 2: Business Performance (This Month) */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d97706] font-extrabold text-sm">❖</span>
                    <h3 className="font-gotham text-sm font-extrabold text-slate-900">Business Performance <span className="font-sans text-slate-400 font-normal text-xs">(This Month)</span></h3>
                  </div>
                  <button className="font-apfel text-[10px] font-bold text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
                    View Report
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  {/* Left Stats & Gauge */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-sans text-[10px] font-semibold text-slate-400 block">Revenue Growth</span>
                      <p className="font-apfel text-lg font-black text-emerald-600 leading-none mt-0.5">22.3%</p>
                      <span className="font-sans text-[9px] text-slate-400 font-medium">vs last month</span>
                    </div>

                    <div>
                      <span className="font-sans text-[10px] font-semibold text-slate-400 block">Target Achievement</span>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-apfel text-lg font-black text-slate-900 leading-none">87%</p>
                        {/* Circular Donut Gauge - Warm Gold */}
                        <div className="relative h-10 w-10 flex items-center justify-center">
                          <svg className="h-10 w-10 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-slate-100"
                              strokeWidth="4"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-[#d97706]"
                              strokeDasharray="87, 100"
                              strokeWidth="4"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <span className="absolute font-apfel text-[9px] font-black text-slate-800">87%</span>
                        </div>
                      </div>
                      <span className="font-sans text-[9px] text-slate-400 font-medium">of monthly target</span>
                    </div>
                  </div>

                  {/* Right Bar Chart - Warm Gold Bars */}
                  <div className="h-40 flex items-end justify-between gap-1.5 pt-4 font-apfel">
                    {/* Week 1 */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end flex-1">
                      <span className="text-[8px] text-slate-400 font-mono">100K</span>
                      <div className="w-full bg-[#fde68a] rounded-lg h-[45%]" />
                      <span className="text-[8px] font-semibold text-slate-400">Week 1</span>
                    </div>

                    {/* Week 2 */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end flex-1">
                      <span className="text-[8px] text-slate-400 font-mono">75K</span>
                      <div className="w-full bg-[#f59e0b] rounded-lg h-[65%]" />
                      <span className="text-[8px] font-semibold text-slate-400">Week 2</span>
                    </div>

                    {/* Week 3 */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end flex-1">
                      <span className="text-[8px] text-slate-400 font-mono">50K</span>
                      <div className="w-full bg-[#d97706] rounded-lg h-[75%]" />
                      <span className="text-[8px] font-semibold text-slate-400">Week 3</span>
                    </div>

                    {/* Week 4 */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end flex-1">
                      <span className="text-[8px] text-slate-400 font-mono">25K</span>
                      <div className="w-full bg-[#b45309] rounded-lg h-[90%]" />
                      <span className="text-[8px] font-semibold text-slate-400">Week 4</span>
                    </div>

                    {/* This Week (Dashed Gold) */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end flex-1">
                      <span className="text-[8px] text-slate-400 font-mono">0</span>
                      <div className="w-full bg-[#fde68a]/80 rounded-lg h-[80%] border border-dashed border-[#b45309]" />
                      <span className="text-[8px] font-semibold text-[#b45309]">This Week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Connection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-[#d97706]" />
                <h3 className="font-gotham text-lg font-extrabold text-slate-900">Live Backend Connection</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleTestAndSave} className="space-y-4">
              <div>
                <label className="font-montserrat block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">API Server Base URL</label>
                <input
                  type="text"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  placeholder="http://localhost:8000/api"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:border-amber-500 outline-none"
                />
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl text-xs font-bold font-apfel border ${testResult.success ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
                  {testResult.message}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 font-apfel">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50">Close</button>
                <button type="submit" disabled={isTesting} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white text-xs font-extrabold shadow-md flex items-center gap-2">
                  {isTesting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                  <span>Test & Connect API</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CEODashboard() {
  return (
    <GlobalFilterProvider>
      <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading Executive Workspace...</div>}>
        <CEODashboardContent />
      </Suspense>
    </GlobalFilterProvider>
  );
}
