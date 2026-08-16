'use client';

import React, { useState, useEffect } from 'react';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { Wrench, Plus, Clock, AlertTriangle, CheckCircle2, User, Filter, Search, X, CheckCircle } from 'lucide-react';

export default function OperationsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [tickets, setTickets] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [newCust, setNewCust] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newType, setNewType] = useState('ROAD_SERVICE');

  // Fetch live service operations from backend DB API with offline fallback
  const fetchOperationsData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/coo/operations').catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        const mapped = data.map((t: any) => ({
          id: t.id,
          ticket: t.ticket_number,
          customer: t.customer_name,
          phone: t.customer_phone,
          type: t.service_type,
          priority: t.priority,
          status: t.status,
          sla: `${t.sla_hours}h`,
          slaStatus: t.sla_status,
          tech: t.technician_assigned,
          cost: `₹${t.estimated_cost}`,
          fault: 'Diagnostic Inspection & Calibration',
          address: 'Customer Address On File',
        }));
        setTickets(mapped);
        return;
      }
    } catch (e) {
      // Fallback below
    }

    // Default Fallback Operations Data
    setTickets([
      { id: '1', ticket: 'EV-TKT-1001', customer: 'Rahul Sharma', phone: '+91 98765 43210', type: 'ROAD_SERVICE', priority: 'CRITICAL', status: 'IN_PROGRESS', sla: '2h', slaStatus: 'WITHIN_SLA', tech: 'Deepak Varma', cost: '₹199', fault: 'Brake Sensor Calibration', address: 'MG Road, Indiranagar' },
      { id: '2', ticket: 'EV-TKT-1002', customer: 'Pooja Hegde', phone: '+91 98123 45678', type: 'HOME_SERVICE', priority: 'HIGH', status: 'ASSIGNED', sla: '4h', slaStatus: 'WITHIN_SLA', tech: 'Manoj Kumar', cost: '₹249', fault: 'Battery Firmware Flashing', address: 'HSR Layout Sector 1' },
      { id: '3', ticket: 'EV-TKT-1003', customer: 'Vikram Seth', phone: '+91 97654 32109', type: 'GARAGE_REPAIR', priority: 'MEDIUM', status: 'QUEUED', sla: '6h', slaStatus: 'WITHIN_SLA', tech: 'Unassigned', cost: '₹499', fault: 'Hub Motor Diagnostics', address: 'Koramangala 5th Block' },
    ]);
  };

  useEffect(() => {
    fetchOperationsData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCust) return;

    const estCostVal = newType === 'ROAD_SERVICE' ? 199 : newType === 'HOME_SERVICE' ? 249 : 499;

    try {
      const res = await fetch('http://localhost:8000/api/coo/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: newCust,
          customer_phone: newPhone || '+91 9800000000',
          service_type: newType,
          priority: 'MEDIUM',
          estimated_cost: estCostVal,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const createdTkt = data.ticket;

        if (createdTkt) {
          const newTicketObj = {
            id: createdTkt.id,
            ticket: createdTkt.ticket_number,
            customer: createdTkt.customer_name,
            phone: createdTkt.customer_phone,
            type: createdTkt.service_type,
            priority: createdTkt.priority || 'MEDIUM',
            status: createdTkt.status || 'QUEUED',
            sla: '4h',
            slaStatus: 'WITHIN_SLA',
            tech: 'Unassigned',
            cost: `₹${createdTkt.estimated_cost}`,
            fault: 'Diagnostic Inspection & Calibration',
            address: 'Customer Address On File',
          };

          // Prepend new ticket directly into state array
          setTickets((prev) => [newTicketObj, ...prev.filter((t) => t.id !== newTicketObj.id)]);
          setSuccessMsg(`Service Ticket ${createdTkt.ticket_number} created & saved to database!`);
        }

        setNewCust('');
        setNewPhone('');
        setShowModal(false);

        setTimeout(() => setSuccessMsg(null), 5000);
      }
    } catch (e) {
      console.error('Error creating service ticket:', e);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticket.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <RouteGuard module="operations">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Wrench className="w-6 h-6 text-blue-600" />
              Service Operations & Dispatch Hub
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Active Services • Service Queue • Job Cards • Database Synced
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Service Request</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-xs text-emerald-900 font-bold shadow-xs animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticket or customer..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600">Filter Status:</span>
            {['ALL', 'QUEUED', 'ASSIGNED', 'IN_PROGRESS'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                  filterStatus === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Ticket Number</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Service Type</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Technician</th>
                <th className="p-4">Est Cost</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-blue-600">{t.ticket}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{t.customer}</span>
                    <span className="text-[11px] text-slate-400">{t.phone}</span>
                  </td>
                  <td className="p-4 font-bold text-slate-800">{t.type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      t.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                      t.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800' :
                      t.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{t.tech}</td>
                  <td className="p-4 font-bold text-emerald-600">{t.cost}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(t)}
                      className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded font-bold text-[11px] transition cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: View Ticket Details */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-blue-600">{selectedTicket.ticket}</span>
                  <h2 className="text-lg font-black text-slate-900">{selectedTicket.customer}</h2>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-1 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block font-semibold">Service Type & Priority</span>
                  <p className="font-bold text-slate-800">{selectedTicket.type} • {selectedTicket.priority}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block font-semibold">AI Diagnostic Fault Summary</span>
                  <p className="font-bold text-slate-900">{selectedTicket.fault}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block font-semibold">Dispatch Address</span>
                  <p className="font-semibold text-slate-800">{selectedTicket.address}</p>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 cursor-pointer"
                >
                  Close Workbench
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create Service Request */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Create New Service Request</h2>
              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={newCust}
                    onChange={(e) => setNewCust(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Service Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="ROAD_SERVICE">Road Service (₹199)</option>
                    <option value="HOME_SERVICE">Home Service (₹249)</option>
                    <option value="GARAGE_REPAIR">Garage Repair (₹499)</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700 cursor-pointer shadow"
                  >
                    Submit Ticket
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
