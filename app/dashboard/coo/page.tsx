'use client';

import React, { useState, useEffect } from 'react';
import { useRole } from '../../../components/RoleContext';
import { ApiGateway } from '../../../lib/api-client';
import { ServiceTicket, VendorFleetVehicle } from '../../../lib/types';
import { mockServiceTickets, mockVendorFleetVehicles } from '../../../lib/mock-data';
import { Activity, Truck, MapPin, CheckCircle, Clock, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

export default function COODashboard() {
  const { currentProfile } = useRole();
  const [fleetList, setFleetList] = useState<VendorFleetVehicle[]>(mockVendorFleetVehicles);
  const [tickets, setTickets] = useState<ServiceTicket[]>(mockServiceTickets);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLiveData() {
      setIsLoading(true);
      const liveFleets = await ApiGateway.getVendorFleets();
      const liveTickets = await ApiGateway.getServiceTickets();
      setFleetList(liveFleets);
      setTickets(liveTickets);
      setIsLoading(false);
    }
    loadLiveData();
  }, []);

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-700">Chief Operations Office</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Operations & Vendor Fleet Dispatch</h1>
          <p className="text-xs text-slate-600 max-w-xl font-medium">
            Live management of service ticket logistics, roadside assistance dispatching, and vendor EV fleet telematics sync.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
            <RefreshCw className={`h-3.5 w-3.5 text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Syncing Backend Database...' : 'PostgreSQL API: Live Stream Active'}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Service Tickets</p>
          <p className="text-2xl font-black text-slate-900 mt-2">{tickets.length} Active</p>
          <span className="text-xs text-blue-600 font-bold mt-1 inline-block">Real-time PostgreSQL Feed</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor Fleets Connected</p>
          <p className="text-2xl font-black text-emerald-600 mt-2">{fleetList.length} Partner Fleets</p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">Live Telemetry Webhook Stream</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg RSA Response Time</p>
          <p className="text-2xl font-black text-slate-900 mt-2">14 Mins</p>
          <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">Target &lt; 20 mins achieved</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Technicians</p>
          <p className="text-2xl font-black text-slate-900 mt-2">48 On Duty</p>
          <span className="text-xs text-slate-500 mt-1 inline-block font-medium">92% Utilization Rate</span>
        </div>
      </div>

      {/* Vendor EV Fleet Integration Panel */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">Vendor EV Fleet Live Ingestion Feed</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">Connected to Vendor Team API Endpoint (`/api/v1/vendor-fleets/live`)</p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" /> Live Webhook Stream
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <th className="pb-3 px-3">Fleet Name</th>
                <th className="pb-3 px-3">Reg Number</th>
                <th className="pb-3 px-3">Vehicle Model</th>
                <th className="pb-3 px-3">Driver Name</th>
                <th className="pb-3 px-3">Battery %</th>
                <th className="pb-3 px-3">GPS Location</th>
                <th className="pb-3 px-3">Last Telemetry Ping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fleetList.map((fleet) => (
                <tr key={fleet.id} className="hover:bg-slate-50 transition-all">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{fleet.fleetName}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-sky-700">{fleet.regNumber}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{fleet.vehicleModel}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{fleet.driverName}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${fleet.batteryPercent < 30 ? 'bg-red-500' : 'bg-emerald-500'}`}
                          style={{ width: `${fleet.batteryPercent}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-900">{fleet.batteryPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px]">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-sky-600" /> {fleet.currentLat}, {fleet.currentLng}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono">{fleet.lastPing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational Service Tickets Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200">
        <h2 className="text-base font-extrabold text-slate-900 mb-4">Operations Ticket Dispatch Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <th className="pb-3 px-3">Ticket ID</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Vehicle</th>
                <th className="pb-3 px-3">Service Type</th>
                <th className="pb-3 px-3">AI Suggested Fault</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((tkt) => (
                <tr key={tkt.id} className="hover:bg-slate-50 transition-all">
                  <td className="py-3.5 px-3 font-mono font-bold text-sky-700">{tkt.ticketNumber}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{tkt.customerName}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{tkt.vehicleModel}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700">{tkt.serviceType}</td>
                  <td className="py-3.5 px-3 text-slate-600 max-w-xs truncate font-medium">{tkt.aiSuggestedFault}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                      {tkt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{tkt.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
