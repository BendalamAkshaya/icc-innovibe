'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/components/RoleContext';
import { useCOOWebSocket } from '@/hooks/useCOOWebSocket';
import { Bell, Search, ShieldCheck, Wifi, FileText, Download, X, Database, LogOut } from 'lucide-react';
import Link from 'next/link';
import {
  getNotificationsForRole,
  markTicketNotificationAsRead,
  markAllTicketNotificationsAsRead,
  CrossRoleNotification,
} from '@/lib/ticketNotifications';

export function COONavbar() {
  const router = useRouter();
  const { logout } = useRole();
  const { isConnected } = useCOOWebSocket();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [ticketNotifs, setTicketNotifs] = useState<CrossRoleNotification[]>([]);

  useEffect(() => {
    const loadTickets = () => {
      setTicketNotifs(getNotificationsForRole('COO'));
    };
    loadTickets();

    const handleUpdate = () => loadTickets();
    window.addEventListener('icc_ticket_notifications_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('icc_ticket_notifications_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'EV Battery Thermal Anomaly Warning',
      desc: 'KA-01-EQ-9983 cell temp reached 54.2°C (threshold: 50°C). Cell balancing active.',
      time: '2 mins ago',
      type: 'ALERT',
      unread: true,
    },
    {
      id: 2,
      title: '30-Day Payroll Approved & Locked',
      desc: 'Operations payroll for 142 employees approved by COO suite and dispatched to HR portal.',
      time: '15 mins ago',
      type: 'SUCCESS',
      unread: true,
    },
    {
      id: 3,
      title: 'OEM Partner Contract Finalized',
      desc: 'Ather Energy signed 4-fleet maintenance retainer for 400 commercial EVs in Bengaluru hub.',
      time: '45 mins ago',
      type: 'INFO',
      unread: true,
    },
    {
      id: 4,
      title: 'Low Stock Purchase Order Pending',
      desc: '5kW BLDC Hub Motor stock below threshold (2 units left). Reorder PO pending COO sign-off.',
      time: '1 hour ago',
      type: 'WARNING',
      unread: true,
    },
    {
      id: 5,
      title: 'SLA Target Achieved (98.4%)',
      desc: '1,420 Service tickets completed today across Bengaluru, Hyderabad, and Pune depots.',
      time: '2 hours ago',
      type: 'SUCCESS',
      unread: false,
    },
  ]);

  // Available Modules State
  const moduleOptions = [
    { id: 'operations', label: 'Service Operations & Dispatch Queue', desc: 'Active tickets, SLA compliance & job throughput' },
    { id: 'fleet', label: 'Fleet Management & EV Telemetry', desc: 'Connected vehicle health, battery SOC & speed alerts' },
    { id: 'workshop', label: 'Workshop Capacity & Service Bays', desc: 'Service bay occupancy rate & daily repair volume' },
    { id: 'technicians', label: 'Technician Roster & CSAT Ratings', desc: 'Technician performance index, bonus & dispatch status' },
    { id: 'procurement', label: 'Procurement & Serialized Inventory', desc: 'Stock SKU levels, serial barcode logs & low-stock alerts' },
    { id: 'workforce', label: 'Workforce & HR Roster', desc: 'Department headcounts, daily attendance & leave logs' },
    { id: 'financials', label: 'Financial Oversight & Revenue (Read Only)', desc: 'Daily revenue, monthly gross totals & cost breakdown' },
  ];

  const [selectedModules, setSelectedModules] = useState<string[]>([
    'operations', 'fleet', 'workshop', 'technicians', 'procurement', 'workforce', 'financials'
  ]);
  const [selectAllCOOData, setSelectAllCOOData] = useState(true);

  // Toggle Entire COO Data Checkbox
  const handleToggleAllCOOData = () => {
    if (selectAllCOOData) {
      setSelectAllCOOData(false);
      setSelectedModules([]);
    } else {
      setSelectAllCOOData(true);
      setSelectedModules(moduleOptions.map((m) => m.id));
    }
  };

  // Toggle Individual Module Checkbox
  const handleToggleModule = (id: string) => {
    let updated: string[];
    if (selectedModules.includes(id)) {
      updated = selectedModules.filter((item) => item !== id);
    } else {
      updated = [...selectedModules, id];
    }
    setSelectedModules(updated);
    if (updated.length === moduleOptions.length) {
      setSelectAllCOOData(true);
    } else {
      setSelectAllCOOData(false);
    }
  };

  // Trigger Download
  const handleDownloadPDF = () => {
    let exportUrl = 'http://localhost:8000/api/coo/reports/export/pdf';
    if (selectAllCOOData || selectedModules.length === moduleOptions.length) {
      exportUrl += '?sections=all';
    } else {
      exportUrl += `?sections=${selectedModules.join(',')}`;
    }
    window.open(exportUrl, '_blank');
    setShowExportModal(false);
  };

  return (
    <header className={`h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 shadow-xs ${showNotificationsDrawer || showExportModal ? 'z-50' : 'z-20'}`}>
      {/* Search & Breadcrumb */}
      <div className="flex items-center space-x-4">
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets, VIN, parts, technicians..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Live System Indicators & Actions */}
      <div className="flex items-center space-x-4">
        {/* Real-time WebSocket Stream Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
          <Wifi className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
          <span>{isConnected ? 'Telemetry Stream Live' : 'Connecting Engine...'}</span>
        </div>

        {/* RBAC Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>COO RBAC Matrix</span>
        </div>

        {/* Export Summary PDF Button */}
        <button
          onClick={() => setShowExportModal(true)}
          className="btn-interactive flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold transition cursor-pointer shadow-sm hover:shadow-md active:scale-95"
        >
          <FileText className="w-3.5 h-3.5 text-white" />
          <span>Export Summary PDF</span>
        </button>

        {/* Notification Bell Button */}
        <button
          onClick={() => setShowNotificationsDrawer(true)}
          className="btn-interactive relative p-2 text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-full border border-slate-200 transition active:scale-95 cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {notifications.some((n) => n.unread) && (
            <>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </>
          )}
        </button>

        {/* Log Out Button (Beside Notifications) */}
        <button
          onClick={handleLogout}
          className="btn-interactive flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 rounded-full text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs"
          title="Log Out of System"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-600" />
          <span>Log Out</span>
        </button>
      </div>

      {/* DRAWER: Notification Drawer (Right to Left Slide In with Full Viewport Blur Backdrop) */}
      {showNotificationsDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Blurred Background Overlay covering entire screen & left sidebar */}
          <div
            onClick={() => setShowNotificationsDrawer(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md animate-backdrop-blur transition-all duration-300 cursor-pointer z-40"
          />

          {/* Right-to-Left Sliding Sidebar Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50 pointer-events-auto">
            <div className="w-96 max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-drawer-slide">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-blue-50 border border-blue-100 rounded-xl">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Notifications</h2>
                    <span className="text-[10px] text-slate-500 font-semibold">Real-time COO Audit Stream</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setNotifications(notifications.map((n) => ({ ...n, unread: false })))}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60 transition cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowNotificationsDrawer(false)}
                    className="p-1 hover:bg-slate-200/60 rounded-full text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notification List Container (Pop up one by one) */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1">
                {/* Employee Submitted Ticket Alerts with Priority Colors */}
                {ticketNotifs.map((tktNotif, index) => (
                  <div
                    key={tktNotif.id}
                    onClick={() => {
                      markTicketNotificationAsRead(tktNotif.id);
                      setTicketNotifs((prev) => prev.map((n) => (n.id === tktNotif.id ? { ...n, unread: false } : n)));
                    }}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 shadow-2xs hover:shadow-sm cursor-pointer ${
                      tktNotif.unread ? tktNotif.colorScheme.bg + ' ' + tktNotif.colorScheme.border : 'bg-slate-50 border-slate-200 opacity-85'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${tktNotif.colorScheme.badgeBg} ${tktNotif.colorScheme.badgeText}`}>
                          {tktNotif.priority}
                        </span>
                        <span className="font-mono text-[11px] font-black text-slate-900">{tktNotif.ticketId}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{tktNotif.timeAgo}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{tktNotif.subject}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{tktNotif.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 mt-1.5 border-t border-slate-200/60">
                      <span>By: <strong className="text-slate-700">{tktNotif.submittedBy}</strong></span>
                      <span className="font-semibold text-slate-500">{tktNotif.category}</span>
                    </div>
                  </div>
                ))}
                {notifications.map((n, index) => (
                  <div
                    key={n.id}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 shadow-2xs hover:shadow-sm cursor-pointer ${
                      n.unread
                        ? n.type === 'ALERT'
                          ? 'bg-rose-50/70 border-rose-200'
                          : n.type === 'WARNING'
                          ? 'bg-amber-50/70 border-amber-200'
                          : n.type === 'SUCCESS'
                          ? 'bg-emerald-50/70 border-emerald-200'
                          : 'bg-blue-50/70 border-blue-200'
                        : 'bg-slate-50 border-slate-200 opacity-80'
                    }`}
                    style={{
                      animation: 'slideUpPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      animationDelay: `${index * 90 + 150}ms`,
                      opacity: 0,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          n.type === 'ALERT'
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : n.type === 'WARNING'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : n.type === 'SUCCESS'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-blue-100 text-blue-800 border-blue-300'
                        }`}
                      >
                        {n.type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{n.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                <Link
                  href="/dashboard/coo/collaboration#notifications"
                  onClick={() => setShowNotificationsDrawer(false)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  View All Operational Logs & Alerts →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Custom Executive PDF Export Options */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5 border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Custom Executive PDF Export</h2>
                  <p className="text-[11px] text-slate-500">Select which module summaries to include in your executive PDF report</p>
                </div>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selectable Modules Checklist */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Available Operational Modules:</span>
              <div className="space-y-2">
                {moduleOptions.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <label
                      key={mod.id}
                      onClick={() => handleToggleModule(mod.id)}
                      className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition ${
                        isChecked ? 'bg-blue-50/50 border-blue-300' : 'bg-slate-50 border-slate-200 opacity-70'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                      />
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-xs text-slate-900 block">{mod.label}</span>
                        <span className="text-[11px] text-slate-500 block">{mod.desc}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Select Entire COO Data Option */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <label
                onClick={handleToggleAllCOOData}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectAllCOOData}
                  onChange={() => {}}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer accent-emerald-600"
                />
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-xs font-black text-emerald-950 block">
                      Summary of the entire data accessed by the COO
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      Includes complete operational ledger across all 7 hub modules
                    </span>
                  </div>
                </div>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-semibold">
                {selectedModules.length} Modules Selected
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="btn-interactive px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer transition active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={selectedModules.length === 0}
                  onClick={handleDownloadPDF}
                  className="btn-interactive px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md hover:shadow-lg transition cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate & Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
