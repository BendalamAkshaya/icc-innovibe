'use client';

import React, { useState } from 'react';
import { GeographicRegionCoverage, Vehicle } from '../../../lib/types';
import { MapPin, Navigation, Building2, Zap, ArrowUpRight, Activity, CloudRain, Sun, ShieldAlert, Layers } from 'lucide-react';

interface GeographicFleetMapProps {
  regions: GeographicRegionCoverage[];
  onSelectRegion?: (cityName: string) => void;
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export function GeographicFleetMap({ regions, onSelectRegion, onSelectVehicle }: GeographicFleetMapProps) {
  const [activeRegionId, setActiveRegionId] = useState<string>('geo_01');
  const [showWeatherOverlay, setShowWeatherOverlay] = useState<boolean>(true);

  const activeRegion = regions.find((r) => r.id === activeRegionId) || regions[0];

  const getHeatColor = (density: string) => {
    switch (density) {
      case 'HIGH':
        return 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
      case 'MODERATE':
        return 'bg-amber-500/20 border-amber-400 text-amber-300';
      default:
        return 'bg-sky-500/20 border-sky-400 text-sky-300';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-sky-600 animate-bounce" />
            <h2 className="text-base font-extrabold text-slate-900">Live IoT Fleet Telemetry & Geographic Map</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time GPS cluster density across coastal Andhra Pradesh EV hubs & telemetry streams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Weather Layer Toggle */}
          <button
            onClick={() => setShowWeatherOverlay(!showWeatherOverlay)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              showWeatherOverlay
                ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <CloudRain className="h-3.5 w-3.5" />
            <span>Weather Layer {showWeatherOverlay ? 'ON' : 'OFF'}</span>
          </button>

          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-300">
            5 Active Regional Clusters
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Hero Interactive Map (65%) */}
        <div className="lg:col-span-2 relative bg-slate-900 rounded-2xl p-6 overflow-hidden min-h-[360px] flex-1 flex flex-col justify-between text-white border border-slate-800 shadow-inner">
          {/* Grid & Radar Background Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Weather Overlay Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>IoT Telemetry GPS Stream</span>
            </div>

            {showWeatherOverlay && (
              <div className="flex items-center gap-2 bg-sky-900/60 px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-sky-200 border border-sky-700">
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span>32°C Coastal AP • 68% Humidity • No Rain Warning</span>
              </div>
            )}
          </div>

          {/* Interactive Regional Hotspot Clusters */}
          <div className="relative z-10 my-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {regions.map((reg) => {
              const isSelected = reg.id === activeRegionId;

              return (
                <button
                  key={reg.id}
                  onClick={() => {
                    setActiveRegionId(reg.id);
                    if (onSelectRegion) onSelectRegion(reg.city);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-sky-500/25 border-sky-400 text-white shadow-xl ring-2 ring-sky-400/50 scale-105'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-xs text-white flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-sky-400" /> {reg.city}
                    </span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${getHeatColor(reg.density)}`}>
                      {reg.density}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-black text-sky-400">{reg.activeVehicles} Active EVs</p>
                  <p className="text-[10px] text-slate-400 font-medium">{reg.utilizationPercent}% Utilization</p>
                </button>
              );
            })}
          </div>

          {/* Active Region Footer Detail */}
          <div className="relative z-10 bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">
              Active Focus: <strong className="text-white font-extrabold">{activeRegion.city} Regional Hub</strong>
            </span>
            <span className="text-emerald-400 font-mono font-bold">
              Health Score: {activeRegion.healthScore}/100
            </span>
          </div>
        </div>

        {/* Selected Region Breakdown Panel (35%) */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">{activeRegion.city} Cluster Breakdown</h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-200">
                {activeRegion.density} DENSITY
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Active EV Fleet:</span>
                <span className="font-mono font-extrabold text-slate-900">{activeRegion.activeVehicles} Vehicles</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Fleet Utilization:</span>
                <span className="font-mono font-extrabold text-emerald-600">{activeRegion.utilizationPercent}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Fleet SOH Score:</span>
                <span className="font-mono font-extrabold text-sky-600">{activeRegion.healthScore} / 100</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">GPS Coordinates:</span>
                <span className="font-mono font-extrabold text-slate-700">{activeRegion.lat}° N, {activeRegion.lng}° E</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectRegion && onSelectRegion(activeRegion.city)}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <span>Drill-down into {activeRegion.city} City Hub</span>
            <ArrowUpRight className="h-4 w-4 text-sky-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
