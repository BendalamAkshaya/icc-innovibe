'use client';

import React from 'react';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { useCOOWebSocket } from '@/hooks/useCOOWebSocket';
import { MapLibreFleetMap } from '@/components/coo/MapLibreFleetMap';
import { Truck } from 'lucide-react';

export default function FleetPage() {
  const { isConnected, liveData } = useCOOWebSocket();

  const vehicles = [
    {
      id: 'veh_1',
      vin: 'VIN-EV-9821',
      reg: 'KA-01-EQ-9982',
      model: 'InnoVibe Fleet Pro EV',
      fleet: 'Blusmart EV Matrix',
      soc: liveData.vehicle_ka01_soc,
      health: 96,
      status: 'OPERATIONAL',
      lat: liveData.vehicle_ka01_lat.toFixed(4),
      lng: liveData.vehicle_ka01_lng.toFixed(4),
      speed: '38.5 km/h',
    },
    {
      id: 'veh_2',
      vin: 'VIN-EV-9822',
      reg: 'KA-01-EQ-9983',
      model: 'InnoVibe Cargo Max',
      fleet: 'Blusmart EV Matrix',
      soc: 15,
      health: 72,
      status: 'CRITICAL',
      lat: '12.9352',
      lng: '77.6245',
      speed: '0.0 km/h',
    },
    {
      id: 'veh_3',
      vin: 'VIN-EV-4410',
      reg: 'TS-09-EV-1120',
      model: 'InnoVibe Scooter X',
      fleet: 'Rapido E-Bike Express',
      soc: 76,
      health: 91,
      status: 'OPERATIONAL',
      lat: '17.3850',
      lng: '78.4867',
      speed: '45.0 km/h',
    },
  ];

  return (
    <RouteGuard module="fleet">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Truck className="w-6 h-6 text-emerald-600" />
              Connected EV Fleet & Live Telemetry Map
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Live MapLibre GL Vector Map • Glowing EV Markers • Battery Health & GPS Telemetry Feed
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500">Live GPS WebSocket:</span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isConnected ? 'LIVE FEED ACTIVE' : 'POLLING MODE'}
            </span>
          </div>
        </div>

        {/* Real Interactive MapLibre GL Live Tracking Map */}
        <MapLibreFleetMap />

        {/* Vehicle Telemetry Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Monitored EV Fleet Matrix</h3>
            <span className="text-xs font-bold text-slate-500">3 Priority Units</span>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="p-4">VIN & Reg No</th>
                <th className="p-4">Model</th>
                <th className="p-4">Fleet Vendor</th>
                <th className="p-4">Battery SOC</th>
                <th className="p-4">Health Score</th>
                <th className="p-4">GPS Location</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{v.reg}</span>
                    <span className="text-[11px] text-slate-400">{v.vin}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{v.model}</td>
                  <td className="p-4 text-slate-600">{v.fleet}</td>
                  <td className="p-4 font-black text-slate-900">
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
                  <td className="p-4 font-bold text-purple-700">{v.health} / 100</td>
                  <td className="p-4 text-slate-500 font-mono text-[11px]">
                    {v.lat}, {v.lng}
                  </td>
                  <td className="p-4 text-right">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold ${
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
      </div>
    </RouteGuard>
  );
}
