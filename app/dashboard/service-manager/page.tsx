'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRole } from '../../../components/RoleContext';
import { mockServiceTickets, mockTechnicians } from '../../../lib/mock-data';
import { ServiceTicket } from '../../../lib/types';
import { crossDashboardStore, LiveSpareRequest } from '../../../lib/cross-dashboard-store';
import {
  Wrench,
  Sparkles,
  CheckCircle2,
  UserPlus,
  Clock,
  IndianRupee,
  MapPin,
  Check,
  AlertCircle,
  FileText,
  Printer,
  ShieldCheck,
  Package,
  Activity,
  Phone,
  Car,
  Search,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  AlertTriangle,
  RotateCcw,
  Zap,
  TrendingUp,
  Star,
  Users,
  Building2,
  X,
  Radio,
} from 'lucide-react';

export default function ServiceManagerDashboard() {
  const { currentProfile } = useRole();
  const [activeTab, setActiveTab] = useState<'tickets' | 'job-cards' | 'dispatcher' | 'spares' | 'warranty-rsa' | 'analytics'>('tickets');
  
  // Real-time Service Tickets from CrossDashboardStore
  const [tickets, setTickets] = useState<ServiceTicket[]>(() => crossDashboardStore.getServiceTickets());
  const [techs, setTechs] = useState(mockTechnicians);
  const [selectedTicketId, setSelectedTicketId] = useState<string>('tkt_101');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUrgency, setFilterUrgency] = useState<string>('ALL');

  // Job Card Modal State
  const [selectedJobCard, setSelectedJobCard] = useState<ServiceTicket | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Ticket Form State
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newVehModel, setNewVehModel] = useState('Ather 450X Apex');
  const [newRegNum, setNewRegNum] = useState('');
  const [newServiceType, setNewServiceType] = useState<'Service at Home' | 'Service at Center' | 'Roadside Assistance'>('Service at Home');
  const [newFault, setNewFault] = useState('');
  const [newUrgency, setNewUrgency] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY'>('MEDIUM');

  // Live Spares from Store
  const [spares, setSpares] = useState<LiveSpareRequest[]>(() => crossDashboardStore.getSpareRequests());

  useEffect(() => {
    setTickets(crossDashboardStore.getServiceTickets());
    setSpares(crossDashboardStore.getSpareRequests());

    const unsubTickets = crossDashboardStore.onTicketsUpdated((t) => setTickets(t));
    const unsubSpares = crossDashboardStore.onSparesUpdated((s) => setSpares(s));

    return () => {
      unsubTickets();
      unsubSpares();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0] || {
    id: 'tkt_101',
    ticketNumber: 'BK-2026-0001',
    customerName: 'User 1',
    customerPhone: '+91 9000000001',
    vehicleModel: 'Ather 450X Apex',
    registrationNumber: 'AP39AB1234',
    serviceType: 'Service at Home',
    status: 'IN_PROGRESS',
    aiSuggestedFault: 'Doorstep Periodic Service & Brake Caliper Adjustment',
    aiEstimatedCost: 249,
    aiEstimatedTimeMins: 45,
    location: 'Srinivasa Nagar, Hub 1',
    createdAt: '10 mins ago',
    urgency: 'MEDIUM',
  };

  const handleAssignTech = (ticketId: string, techName: string) => {
    crossDashboardStore.updateTicketStatus(ticketId, 'TECHNICIAN_ASSIGNED', techName);
    showToast(`Assigned ${techName} to Ticket ${ticketId}. Dispatched live to Technician workbench!`);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newRegNum) {
      showToast('Please fill in customer name and registration number');
      return;
    }
    const created = crossDashboardStore.createServiceTicket({
      customerName: newCustName,
      customerPhone: newCustPhone || '+91 98888 77777',
      vehicleModel: newVehModel,
      registrationNumber: newRegNum.toUpperCase(),
      serviceType: newServiceType,
      status: 'PENDING',
      aiSuggestedFault: newFault || 'Periodic EV health inspection and diagnostic scan',
      aiEstimatedCost: newServiceType === 'Roadside Assistance' ? 199 : newServiceType === 'Service at Center' ? 499 : 249,
      aiEstimatedTimeMins: 45,
      location: 'Central Depot Hub',
      urgency: newUrgency,
    });
    setShowCreateModal(false);
    setNewCustName('');
    setNewCustPhone('');
    setNewRegNum('');
    setNewFault('');
    showToast(`Created Ticket ${created.ticketNumber} successfully!`);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = filterUrgency === 'ALL' || t.urgency === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  const handlePrintJobCard = () => {
    const el = document.getElementById('printable-jobcard-content');
    if (!el) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Job_Card_${selectedJobCard?.ticketNumber || 'EV_WORK_ORDER'}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
              body { font-family: 'Inter', sans-serif; padding: 24px; color: #0f172a; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #e2e8f0; padding: 6px 10px; font-size: 11px; }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div style="max-width: 800px; margin: 0 auto;">
              \${el.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden shadow-xs">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-emerald-600" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
              Service Center Operations & Workshop Hub
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Service Manager Command Workbench
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl font-medium leading-relaxed">
            AI-augmented diagnostics, digital job card orchestration, smart technician dispatching, warranty validations, and depot throughput tracking.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Service Booking</span>
          </button>
          <div className="px-4 py-2 rounded-2xl bg-white border border-emerald-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>AI Advisor: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center space-x-3 text-xs text-emerald-900 font-bold shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 4 Quick Executive KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Active Jobs</span>
            <Activity className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{tickets.length} Tickets</div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">4 Doorstep • 2 Hub Workshop</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Average Turnaround (TAT)</span>
            <Clock className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">42.5 Mins</div>
            <p className="text-[11px] text-sky-600 font-bold mt-1">15% faster than SLA benchmark</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Repeat Repair Rate</span>
            <RotateCcw className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">1.2%</div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">Industry leading quality standard</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Customer CSAT Rating</span>
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">4.92 / 5.0</div>
            <p className="text-[11px] text-slate-500 font-bold mt-1">Based on 1,420 completed jobs</p>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex space-x-1.5 border-b border-slate-200 bg-white p-2 rounded-2xl shadow-xs overflow-x-auto">
        {[
          { id: 'tickets', label: 'Service Queue & AI Advisor', icon: Wrench },
          { id: 'job-cards', label: 'Digital Job Cards', icon: FileText },
          { id: 'dispatcher', label: 'Technician Allocation Matrix', icon: UserPlus },
          { id: 'spares', label: 'Spare Parts Lookup', icon: Package },
          { id: 'warranty-rsa', label: 'Warranty, AMC & RSA Desk', icon: ShieldCheck },
          { id: 'analytics', label: 'Service Performance Analytics', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SERVICE QUEUE & AI ADVISOR */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Filterable Ticket Queue */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <span>Incoming Ticket Queue</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono">
                  {filteredTickets.length}
                </span>
              </h2>
            </div>

            {/* Search & Filter */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search ticket, customer, vehicle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-emerald-500"
                />
              </div>
              <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-bold text-slate-500">
                {['ALL', 'EMERGENCY', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilterUrgency(lvl)}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      filterUrgency === lvl ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Cards */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredTickets.map((tkt) => {
                const isSelected = selectedTicketId === tkt.id;
                return (
                  <div
                    key={tkt.id}
                    onClick={() => setSelectedTicketId(tkt.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-emerald-800">{tkt.ticketNumber}</span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          tkt.urgency === 'EMERGENCY'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                            : tkt.urgency === 'HIGH'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {tkt.serviceType}
                      </span>
                    </div>

                    <p className="text-xs font-extrabold text-slate-900 mt-2">{tkt.customerName}</p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {tkt.vehicleModel} • <strong className="text-slate-700">{tkt.registrationNumber}</strong>
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] pt-2 border-t border-slate-100">
                      <span className="text-slate-400">{tkt.createdAt}</span>
                      <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                        {tkt.assignedTechnician || 'AI Dispatch Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Diagnostics, Estimate & Dispatch */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Service Advisor Diagnosis */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">AI Service Advisor Diagnosis</h3>
                    <p className="text-xs text-slate-500 font-medium">Automated DTC Fault Classification & Cost Estimator</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                    {selectedTicket.ticketNumber}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-white border border-emerald-200 space-y-3">
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">AI Suggested Fault Diagnosis</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-1">{selectedTicket.aiSuggestedFault}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-emerald-200/60">
                  <div>
                    <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Estimated Repair Cost</p>
                    <p className="text-lg font-black text-slate-900 flex items-center gap-0.5 mt-0.5">
                      <IndianRupee className="h-4 w-4 text-emerald-600" /> ₹{selectedTicket.aiEstimatedCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Estimated Labor Time</p>
                    <p className="text-lg font-black text-slate-900 flex items-center gap-1 mt-0.5">
                      <Clock className="h-4 w-4 text-sky-600" /> {selectedTicket.aiEstimatedTimeMins} Mins
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Service Location</p>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-rose-500" /> {selectedTicket.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedJobCard(selectedTicket)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Digital Job Card</span>
                </button>
                <button
                  onClick={() => setActiveTab('spares')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Package className="w-4 h-4 text-amber-600" />
                  <span>Check Spare Parts Stock</span>
                </button>
              </div>
            </div>

            {/* AI Dispatcher Technician Assignment */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                    <UserPlus className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">AI Technician Dispatcher Recommendation</h3>
                    <p className="text-xs text-slate-500 font-medium">Ranked by Proximity (GPS), Skill Tag Match & Workload</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {techs.map((tech, idx) => (
                  <div
                    key={tech.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{tech.name}</span>
                        {idx === 0 && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            AI Top Pick (98% Match)
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-amber-600 flex items-center">
                          ★ {tech.customerRating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">{tech.skills.join(' • ')}</p>
                      <p className="text-[11px] text-slate-500">
                        Distance: <strong className="text-sky-700 font-bold">{tech.distanceKm || 2.5} km</strong> | Active Jobs:{' '}
                        {tech.activeJobsCount}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAssignTech(selectedTicket.id, tech.name)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        selectedTicket.assignedTechnician === tech.name
                          ? 'bg-emerald-600 text-white shadow-md flex items-center gap-1'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {selectedTicket.assignedTechnician === tech.name ? (
                        <>
                          <Check className="h-4 w-4" /> Assigned
                        </>
                      ) : (
                        'Assign & Dispatch'
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL JOB CARDS */}
      {activeTab === 'job-cards' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Digital Job Cards & Work Orders</h2>
              <p className="text-xs text-slate-500">
                Official EV service records with customer fault logs, repair checklists, parts allocation, and digital sign-off.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Job Order #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Vehicle Details</th>
                  <th className="p-4">Service Type</th>
                  <th className="p-4">Assigned Technician</th>
                  <th className="p-4">Estimated Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Job Card</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-mono font-bold text-emerald-800">{t.ticketNumber}</td>
                    <td className="p-4">
                      <span className="font-extrabold text-slate-900 block">{t.customerName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{t.customerPhone}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-800 block">{t.vehicleModel}</span>
                      <span className="text-[11px] text-blue-600 font-mono">{t.registrationNumber}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-extrabold text-slate-700">
                        {t.serviceType}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-800">{t.assignedTechnician || 'Unassigned'}</td>
                    <td className="p-4 font-black text-emerald-600 text-sm">₹{t.aiEstimatedCost}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          t.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.status === 'IN_PROGRESS'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedJobCard(t)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-lg text-xs transition flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        <span>View Job Card</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TECHNICIAN ALLOCATION MATRIX */}
      {activeTab === 'dispatcher' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Live Technician Dispatch & Fleet Allocation Matrix</h2>
            <p className="text-xs text-slate-500">Real-time availability, GPS distance from hub, and ongoing repair job loads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {techs.map((tech) => (
              <div key={tech.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-900">{tech.name}</span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {tech.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Hub: {tech.serviceCenter}</p>
                <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-200">
                  <p>Skills: <strong className="text-slate-700">{tech.skills.join(', ')}</strong></p>
                  <p>Active Workload: <strong className="text-blue-700">{tech.activeJobsCount} Active Jobs</strong></p>
                  <p>Completed This Month: <strong className="text-emerald-700">{tech.completedJobsMonth} Jobs</strong></p>
                  <p>Customer Rating: <strong className="text-amber-600 font-bold">★ {tech.customerRating} / 5.0</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SPARE PARTS LOOKUP */}
      {activeTab === 'spares' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Depot Spare Parts & Requisition Lookup</h2>
              <p className="text-xs text-slate-500">Live synchronization with COO Procurement and field technician requests.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Req #</th>
                  <th className="p-4">Spare Part Name</th>
                  <th className="p-4">Technician</th>
                  <th className="p-4">Assigned Job</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {spares.map((sp) => (
                  <tr key={sp.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-mono font-bold text-amber-700">{sp.id}</td>
                    <td className="p-4 font-extrabold text-slate-900">{sp.part}</td>
                    <td className="p-4 text-slate-700 font-bold">{sp.technicianName}</td>
                    <td className="p-4 text-blue-700 font-mono">{sp.jobId}</td>
                    <td className="p-4 font-black">{sp.qty}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {sp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: WARRANTY, AMC & RSA DESK */}
      {activeTab === 'warranty-rsa' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-extrabold text-slate-900">Warranty & AMC Validation Desk</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1">
                <span className="font-extrabold text-slate-900 block">Ather Energy Comprehensive Battery Warranty</span>
                <p className="text-slate-600">Covered Components: 3.7kWh LFP Cell Pack, BMS Board, HV Wiring Harness.</p>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Active till 2028</span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-1">
                <span className="font-extrabold text-slate-900 block">Annual Maintenance Contract (AMC Premium Pro)</span>
                <p className="text-slate-600">Includes 4 free periodic doorstep visits, unlimited roadside breakdown towing.</p>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">342 Active Subscriptions</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
              <h3 className="text-base font-extrabold text-slate-900">Roadside Assistance (RSA) Emergency Dispatch</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-1">
                <span className="font-extrabold text-rose-900 block">🚨 Active Breakdown Alert: TVS iQube (AP39EF9012)</span>
                <p className="text-slate-600">Location: NH-216 Bypass (Distance: 3.8 km) • Thermal Cutoff Check</p>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                  Nearest Tech Rahul Sharma en route (ETA 12 mins)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SERVICE PERFORMANCE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Service Performance & Quality Analytics</h2>
            <p className="text-xs text-slate-500">Depot efficiency metrics, repeat repairs, and technician CSAT leaderboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 block">SLA Compliance Rate</span>
              <span className="text-3xl font-black text-emerald-600">98.4%</span>
              <p className="text-[11px] text-slate-500">1,397 of 1,420 tickets resolved within estimated TAT</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 block">First-Time Fix Rate (FTFR)</span>
              <span className="text-3xl font-black text-blue-600">98.8%</span>
              <p className="text-[11px] text-slate-500">Repeat repair rate contained to 1.2%</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 block">Monthly Service Labor Revenue</span>
              <span className="text-3xl font-black text-slate-900">₹84,500</span>
              <p className="text-[11px] text-emerald-600 font-bold">+22.3% MoM growth</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE DIGITAL JOB CARD */}
      {selectedJobCard && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-extrabold text-slate-900">Digital Job Card & Work Order</h2>
              </div>
              <button
                onClick={() => setSelectedJobCard(null)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Content Section */}
            <div id="printable-jobcard-content" className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">
                    INNOVIBE MOBILITY • WORK ORDER
                  </span>
                  <h3 className="text-sm font-black text-slate-900 mt-1">{selectedJobCard.ticketNumber}</h3>
                  <p className="text-slate-500">Created: {selectedJobCard.createdAt} • Type: {selectedJobCard.serviceType}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-mono font-bold rounded-lg text-xs">
                  {selectedJobCard.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Details</span>
                  <p className="font-extrabold text-slate-900">{selectedJobCard.customerName}</p>
                  <p className="text-slate-500 font-mono">{selectedJobCard.customerPhone}</p>
                  <p className="text-slate-500">{selectedJobCard.location}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Vehicle Details</span>
                  <p className="font-extrabold text-slate-900">{selectedJobCard.vehicleModel}</p>
                  <p className="text-blue-700 font-mono font-bold">{selectedJobCard.registrationNumber}</p>
                  <p className="text-slate-500">Tech: {selectedJobCard.assignedTechnician || 'Pending Assignment'}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Reported Fault & AI Diagnosis</span>
                <p className="font-bold text-slate-800">{selectedJobCard.aiSuggestedFault}</p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-600">
                    <tr>
                      <th className="p-2.5">Service Description</th>
                      <th className="p-2.5">Estimated Time</th>
                      <th className="p-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5">{selectedJobCard.serviceType} Labor & Inspection</td>
                      <td className="p-2.5">{selectedJobCard.aiEstimatedTimeMins} Mins</td>
                      <td className="p-2.5 text-right font-bold text-emerald-600">₹{selectedJobCard.aiEstimatedCost}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-2 text-[11px] text-slate-500">
                <span>Authorized Service Hub Signature: <strong>InnoVibe Kakinada Hub</strong></span>
                <span>Customer Acknowledgment: <strong>Signed Digitally ✔</strong></span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={handlePrintJobCard}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Job Card</span>
              </button>
              <button
                onClick={() => setSelectedJobCard(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW SERVICE BOOKING */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900">New Service Ticket & Booking</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 90000 00000"
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Reg Number</label>
                  <input
                    type="text"
                    required
                    placeholder="AP39AB1234"
                    value={newRegNum}
                    onChange={(e) => setNewRegNum(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Model</label>
                  <select
                    value={newVehModel}
                    onChange={(e) => setNewVehModel(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-emerald-500 font-bold"
                  >
                    <option value="Ather 450X Apex">Ather 450X Apex</option>
                    <option value="Ola S1 Pro Gen2">Ola S1 Pro Gen2</option>
                    <option value="TVS iQube ST">TVS iQube ST</option>
                    <option value="Hero Vida V1 Pro">Hero Vida V1 Pro</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Type</label>
                  <select
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-emerald-500 font-bold"
                  >
                    <option value="Service at Home">Service at Home (₹249)</option>
                    <option value="Service at Center">Service at Center (₹499)</option>
                    <option value="Roadside Assistance">Roadside Assistance (₹199)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reported Fault / Symptoms</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Brake lever hard, battery drain warning on dashboard..."
                  value={newFault}
                  onChange={(e) => setNewFault(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Urgency Level</label>
                <select
                  value={newUrgency}
                  onChange={(e) => setNewUrgency(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-emerald-500 font-bold"
                >
                  <option value="LOW">Low - Routine periodic check</option>
                  <option value="MEDIUM">Medium - Normal service queue</option>
                  <option value="HIGH">High - Customer waiting</option>
                  <option value="EMERGENCY">Emergency - Breakdown / Roadside SOS</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Create & Run AI Diagnostics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
