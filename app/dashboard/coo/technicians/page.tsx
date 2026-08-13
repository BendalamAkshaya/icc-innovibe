'use client';

import React, { useState, useEffect } from 'react';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { Users, Sparkles, Star, Award, CheckCircle, Clock, Check, X, AlertCircle, Wrench, Phone, Plus } from 'lucide-react';

export default function TechniciansPage() {
  const [techs, setTechs] = useState<any[]>([]);
  const [unassignedTickets, setUnassignedTickets] = useState<any[]>([]);
  const [selectedTech, setSelectedTech] = useState<any | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string>('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignedSuccessMsg, setAssignedSuccessMsg] = useState<string | null>(null);

  // 1. Fetch Technicians from API with fallback
  const fetchTechnicians = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/coo/technicians').catch(() => null);
      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.technicians) {
          setTechs(data.technicians);
        }
      }
    } catch (e) {
      // Quiet fallback to initial techs state
    }
  };

  // 2. Fetch Unassigned Service Tickets from API with Operations Fallback Sync
  const fetchUnassignedTickets = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/coo/technicians/unassigned-tickets').catch(() => null);
      let tickets: any[] = [];
      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        tickets = (data?.unassigned_tickets || []).map((t: any) => ({
          id: t.id,
          ticketNumber: t.ticket_number,
          type: t.service_type,
          priority: t.priority,
          customerName: t.customer_name,
          phone: t.customer_phone,
          cost: `₹${t.estimated_cost}`,
        }));
      } else {
        const opsRes = await fetch('http://localhost:8000/api/coo/operations').catch(() => null);
        if (opsRes && opsRes.ok) {
          const opsData = await opsRes.json().catch(() => null);
          const unassigned = (opsData || []).filter((t: any) => t.status === 'QUEUED' || !t.technician_assigned || t.technician_assigned === 'Unassigned');
          tickets = unassigned.map((t: any) => ({
            id: t.id,
            ticketNumber: t.ticket_number,
            type: t.service_type,
            priority: t.priority,
            customerName: t.customer_name,
            phone: t.customer_phone,
            cost: `₹${t.estimated_cost}`,
          }));
        }
      }
      if (tickets.length > 0) {
        setUnassignedTickets(tickets);
      }
    } catch (e) {
      // Quiet fallback
    }
  };

  useEffect(() => {
    fetchTechnicians();
    fetchUnassignedTickets();
  }, []);

  // Open Assignment Modal for a specific Technician
  const handleOpenAssignModal = async (tech: any) => {
    setSelectedTech(tech);
    await fetchUnassignedTickets();
    setShowAssignModal(true);
  };

  // Submit Job Assignment to Backend
  const handleConfirmAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTech || !selectedTicketId) return;

    try {
      const res = await fetch('http://localhost:8000/api/coo/technicians/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          technician_id: selectedTech.id,
          ticket_id: selectedTicketId,
        }),
      });

      if (res.ok) {
        const chosenTicket = unassignedTickets.find((t) => t.id === selectedTicketId);
        const ticketNum = chosenTicket ? chosenTicket.ticket_number : 'Selected Ticket';

        setAssignedSuccessMsg(`Successfully assigned Service Ticket ${ticketNum} to ${selectedTech.name}!`);
        setShowAssignModal(false);
        fetchTechnicians(); // Refresh technicians list
        fetchUnassignedTickets(); // Refresh unassigned queue

        setTimeout(() => setAssignedSuccessMsg(null), 5000);
      }
    } catch (e) {
      console.error('Error assigning job:', e);
    }
  };

  // Auto-assign action
  const handleAutoAssign = () => {
    const availableTech = techs.find((t) => t.status === 'AVAILABLE');
    if (availableTech) {
      handleOpenAssignModal(availableTech);
    }
  };

  return (
    <RouteGuard module="technicians">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Technician Directory & AI Dispatch Engine
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Field Technician Allocation • Proximity Rank • Skill Matrix • Database Synced Queue
            </p>
          </div>
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Dispatch Enabled
          </span>
        </div>

        {/* Success Alert Banner */}
        {assignedSuccessMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-xs text-emerald-900 font-bold shadow-xs animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>{assignedSuccessMsg}</span>
          </div>
        )}

        {/* AI Dispatch Board Banner */}
        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              AI Recommendation Dispatch Engine Active
            </h3>
            <p className="text-xs text-blue-100">
              Unassigned service tickets detected in database. Select an available technician below to assign a service ticket.
            </p>
          </div>
          <button
            onClick={handleAutoAssign}
            className="px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-700 rounded-xl font-black text-xs shadow transition cursor-pointer"
          >
            Dispatch Open Ticket
          </button>
        </div>

        {/* Directory Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Technician Name</th>
                <th className="p-4">Skill Level</th>
                <th className="p-4">CSAT Rating</th>
                <th className="p-4">Active Assignment</th>
                <th className="p-4">Jobs Completed</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {techs.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{t.phone}</div>
                  </td>
                  <td className="p-4 font-semibold text-blue-600">{t.skill}</td>
                  <td className="p-4 font-bold text-amber-600">★ {t.rating}</td>
                  <td className="p-4 font-bold text-slate-800">
                    {t.current_job !== 'Unassigned' ? (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 font-mono">
                        {t.current_job}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-slate-800">{t.jobs_completed}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-extrabold ${
                        t.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenAssignModal(t)}
                      className={`px-3.5 py-1.5 rounded font-bold text-[11px] transition shadow-xs cursor-pointer ${
                        t.status === 'AVAILABLE'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {t.status === 'AVAILABLE' ? 'Assign Job' : 'Re-Assign Job'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Select Unassigned Ticket & Assign */}
        {showAssignModal && selectedTech && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Assign Service Ticket to <span className="text-blue-600">{selectedTech.name}</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Select an unassigned open service ticket from the database queue below:
                  </p>
                </div>
                <button onClick={() => setShowAssignModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmAssignment} className="space-y-4">
                {unassignedTickets.length === 0 ? (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>No unassigned tickets found in queue.</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {unassignedTickets.map((ticket) => (
                      <label
                        key={ticket.id}
                        onClick={() => setSelectedTicketId(ticket.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          selectedTicketId === ticket.id
                            ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="ticket_selection"
                            checked={selectedTicketId === ticket.id}
                            onChange={() => setSelectedTicketId(ticket.id)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-extrabold text-xs text-blue-700 font-mono">{ticket.ticket_number}</span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                                  ticket.priority === 'CRITICAL'
                                    ? 'bg-red-100 text-red-700'
                                    : ticket.priority === 'HIGH'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {ticket.priority}
                              </span>
                            </div>
                            <div className="text-xs text-slate-800 font-semibold mt-0.5">{ticket.customer_name} • {ticket.service_type}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2">
                              <Phone className="w-3 h-3 text-slate-400" /> {ticket.customer_phone}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-600 block">
                            ₹{ticket.service_type === 'GARAGE_REPAIR' || ticket.estimated_cost > 500 ? 499 : ticket.estimated_cost}
                          </span>
                          <span className="text-[10px] text-slate-400">SLA: {ticket.sla_hours} hrs</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedTicketId || unassignedTickets.length === 0}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg text-xs cursor-pointer shadow transition"
                  >
                    Confirm Job Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RouteGuard>
  );
}
