'use client';

import React, { useState } from 'react';
import { useRole } from '../../../components/RoleContext';
import { mockServiceTickets, mockTechnicians } from '../../../lib/mock-data';
import { Wrench, Sparkles, CheckCircle2, UserPlus, Clock, IndianRupee, MapPin, Check, AlertCircle } from 'lucide-react';

export default function ServiceManagerDashboard() {
  const { currentProfile } = useRole();
  const [tickets, setTickets] = useState(mockServiceTickets);
  const [techs] = useState(mockTechnicians);
  const [selectedTicketId, setSelectedTicketId] = useState<string>('tkt_101');

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleAssignTech = (techName: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === selectedTicketId ? { ...t, assignedTechnician: techName, status: 'TECHNICIAN_ASSIGNED' } : t))
    );
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-emerald-600" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700">Service Center Management</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">AI Service Advisor & Dispatcher Workbench</h1>
          <p className="text-xs text-slate-600 max-w-xl font-medium">
            Augmenting service managers with AI-powered fault diagnostics, repair cost estimates, and technician dispatch recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
            <Sparkles className="h-4 w-4 text-emerald-600" /> AI Advisor Status: ONLINE
          </div>
        </div>
      </div>

      {/* Main Grid Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List Queue */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
          <h2 className="text-base font-extrabold text-slate-900">Service Ticket Queue</h2>
          <div className="space-y-3">
            {tickets.map((tkt) => (
              <div
                key={tkt.id}
                onClick={() => setSelectedTicketId(tkt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedTicketId === tkt.id
                    ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-sky-700">{tkt.ticketNumber}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    tkt.urgency === 'EMERGENCY' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {tkt.serviceType}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 mt-2">{tkt.customerName}</p>
                <p className="text-xs text-slate-500 font-medium">{tkt.vehicleModel} • {tkt.registrationNumber}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                  <span className="text-slate-500">{tkt.createdAt}</span>
                  <span className="font-bold text-emerald-700">{tkt.assignedTechnician || 'AI Recommended'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Ticket AI Diagnosis & Dispatcher Center */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Service Advisor Component */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">AI Service Advisor Diagnosis</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">{selectedTicket.ticketNumber}</span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-white border border-emerald-200 space-y-3">
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">AI Suggested Fault Diagnosis</p>
                <p className="text-sm font-extrabold text-slate-900 mt-1">{selectedTicket.aiSuggestedFault}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">AI Estimated Cost</p>
                  <p className="text-lg font-black text-slate-900 flex items-center gap-1 mt-0.5">
                    <IndianRupee className="h-4 w-4 text-emerald-600" /> ₹{selectedTicket.aiEstimatedCost}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">AI Estimated Repair Time</p>
                  <p className="text-lg font-black text-slate-900 flex items-center gap-1 mt-0.5">
                    <Clock className="h-4 w-4 text-sky-600" /> {selectedTicket.aiEstimatedTimeMins} Minutes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Dispatcher Technician Assignment */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-sky-600" />
                <h3 className="text-base font-extrabold text-slate-900">AI Dispatcher Technician Recommendation</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Ranked by Proximity & Skill Match</span>
            </div>

            <div className="space-y-3">
              {techs.map((tech, idx) => (
                <div key={tech.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{tech.name}</span>
                      {idx === 0 && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          AI Top Pick (98% Match)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{tech.skills.join(' • ')}</p>
                    <p className="text-[11px] text-slate-500">
                      Distance: <strong className="text-sky-700 font-bold">{tech.distanceKm} km</strong> | Active Jobs: {tech.activeJobsCount}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAssignTech(tech.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
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
                      'Assign Job'
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
