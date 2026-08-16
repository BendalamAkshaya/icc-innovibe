'use client';

import React, { useState } from 'react';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { useCOOWebSocket } from '@/hooks/useCOOWebSocket';
import { Car, Plus, Search, Filter, Battery, ShieldCheck, AlertTriangle, Zap, Activity } from 'lucide-react';

export default function VehiclesPage() {
  const { liveData } = useCOOWebSocket();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const [vehicles, setVehicles] = useState([
    {
      id: 'veh_1',
      vin: 'VIN-EV-9821',
      reg: 'KA-01-EQ-9982',
      model: 'InnoVibe Fleet Pro EV',
      batteryCapacity: '42.5 kWh',
      healthScore: 96,
      soc: liveData.vehicle_ka01_soc,
      status: 'OPERATIONAL',
      speed: '38.5 km/h',
      lastService: '15 Jan 2026',
    },
    {
      id: 'veh_2',
      vin: 'VIN-EV-9822',
      reg: 'KA-01-EQ-9983',
      model: 'InnoVibe Cargo Max',
      batteryCapacity: '50.0 kWh',
      healthScore: 72,
      soc: 15,
      status: 'CRITICAL',
      speed: '0.0 km/h',
      lastService: '10 Oct 2025',
    },
    {
      id: 'veh_3',
      vin: 'VIN-EV-4410',
      reg: 'TS-09-EV-1120',
      model: 'InnoVibe Scooter X',
      batteryCapacity: '3.5 kWh',
      healthScore: 91,
      soc: 76,
      status: 'OPERATIONAL',
      speed: '45.0 km/h',
      lastService: '01 Aug 2025',
    },
    {
      id: 'veh_4',
      vin: 'VIN-EV-5542',
      reg: 'DL-01-EV-4433',
      model: 'InnoVibe Express Delivery EV',
      batteryCapacity: '28.0 kWh',
      healthScore: 89,
      soc: 92,
      status: 'OPERATIONAL',
      speed: '22.0 km/h',
      lastService: '20 Feb 2026',
    },
  ]);

  const [newReg, setNewReg] = useState('');
  const [newVin, setNewVin] = useState('');
  const [newModel, setNewModel] = useState('InnoVibe Fleet Pro EV');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReg) return;
    const newVeh = {
      id: `veh_${Date.now()}`,
      vin: newVin || `VIN-EV-${Math.floor(1000 + Math.random() * 9000)}`,
      reg: newReg,
      model: newModel,
      batteryCapacity: '42.5 kWh',
      healthScore: 100,
      soc: 100,
      status: 'OPERATIONAL',
      speed: '0.0 km/h',
      lastService: 'Just Registered',
    };
    setVehicles([newVeh, ...vehicles]);
    setNewReg('');
    setNewVin('');
    setShowModal(false);
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.reg.toLowerCase().includes(search.toLowerCase()) ||
      v.vin.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RouteGuard module="vehicles">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Car className="w-6 h-6 text-blue-600" />
              EV Vehicle Management & Telemetry Hub
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Vehicle Inventory • VIN Registry • Battery Health Index (0-100) • Live SoC Stream
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Register New EV Vehicle</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by VIN or Registration..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500">Total Vehicles:</span>
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {vehicles.length} Active
            </span>
          </div>
        </div>

        {/* Vehicle Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Registration & VIN</th>
                <th className="p-4">EV Model</th>
                <th className="p-4">Battery Capacity</th>
                <th className="p-4">State of Charge (SoC)</th>
                <th className="p-4">EV Health Score</th>
                <th className="p-4">Last Service</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{v.reg}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{v.vin}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{v.model}</td>
                  <td className="p-4 text-slate-600">{v.batteryCapacity}</td>
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${v.soc < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${v.soc}%` }}
                        ></div>
                      </div>
                      <span>{v.soc}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${
                      v.healthScore > 90 ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                    }`}>
                      {v.healthScore} / 100
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{v.lastService}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2 py-1 rounded text-[10px] font-extrabold ${
                      v.status === 'OPERATIONAL' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Registering Vehicle */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Register New EV Vehicle</h2>
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Registration Number</label>
                  <input
                    type="text"
                    required
                    value={newReg}
                    onChange={(e) => setNewReg(e.target.value)}
                    placeholder="e.g. KA-01-EV-9999"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">VIN Number</label>
                  <input
                    type="text"
                    value={newVin}
                    onChange={(e) => setNewVin(e.target.value)}
                    placeholder="VIN-EV-XXXX"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">EV Model</label>
                  <select
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="InnoVibe Fleet Pro EV">InnoVibe Fleet Pro EV (42.5 kWh)</option>
                    <option value="InnoVibe Cargo Max">InnoVibe Cargo Max (50.0 kWh)</option>
                    <option value="InnoVibe Scooter X">InnoVibe Scooter X (3.5 kWh)</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700"
                  >
                    Register Vehicle
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
