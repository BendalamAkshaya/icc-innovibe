'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Wifi, Battery, Navigation, RefreshCw, Zap, AlertTriangle } from 'lucide-react';

// ─── Vizag Land-Only Bike Locations (17 spots, no water) ─────────────────────
const VIZAG_BIKES = [
  { id: 'ICC-VZG-001', lat: 17.7231, lng: 83.3012, area: 'Dwaraka Nagar', status: 'moving',  speed: 28, battery: 82, rider: 'Arun K.' },
  { id: 'ICC-VZG-002', lat: 17.7355, lng: 83.3198, area: 'Jagadamba Jn.',  status: 'moving',  speed: 19, battery: 67, rider: 'Priya R.' },
  { id: 'ICC-VZG-003', lat: 17.7468, lng: 83.3421, area: 'Waltair Uplands', status: 'idle',  speed: 0,  battery: 91, rider: 'Kiran M.' },
  { id: 'ICC-VZG-004', lat: 17.7012, lng: 83.2978, area: 'Gajuwaka',       status: 'moving',  speed: 34, battery: 55, rider: 'Ravi S.' },
  { id: 'ICC-VZG-005', lat: 17.7589, lng: 83.3654, area: 'Siripuram',      status: 'charging',speed: 0,  battery: 23, rider: 'Divya P.' },
  { id: 'ICC-VZG-006', lat: 17.7148, lng: 83.3145, area: 'MVP Colony',     status: 'moving',  speed: 22, battery: 78, rider: 'Suresh T.' },
  { id: 'ICC-VZG-007', lat: 17.6891, lng: 83.2765, area: 'Bheemunipatnam', status: 'idle',    speed: 0,  battery: 44, rider: 'Lakshmi V.' },
  { id: 'ICC-VZG-008', lat: 17.7721, lng: 83.3789, area: 'Rushikonda',     status: 'moving',  speed: 41, battery: 88, rider: 'Naresh B.' },
  { id: 'ICC-VZG-009', lat: 17.7305, lng: 83.2654, area: 'NAD Junction',   status: 'moving',  speed: 17, battery: 62, rider: 'Srinu G.' },
  { id: 'ICC-VZG-010', lat: 17.7432, lng: 83.3567, area: 'Steel Plant Area',status: 'idle',   speed: 0,  battery: 95, rider: 'Venkat R.' },
  { id: 'ICC-VZG-011', lat: 17.6978, lng: 83.3089, area: 'Kommadi',        status: 'moving',  speed: 29, battery: 71, rider: 'Anitha K.' },
  { id: 'ICC-VZG-012', lat: 17.7543, lng: 83.3234, area: 'Old Town',       status: 'charging',speed: 0,  battery: 15, rider: 'Pavan C.' },
  { id: 'ICC-VZG-013', lat: 17.7189, lng: 83.3456, area: 'Lawsons Bay',    status: 'moving',  speed: 25, battery: 58, rider: 'Ramesh D.' },
  { id: 'ICC-VZG-014', lat: 17.7634, lng: 83.2901, area: 'Gopalapatnam',   status: 'moving',  speed: 33, battery: 84, rider: 'Sravani M.' },
  { id: 'ICC-VZG-015', lat: 17.7089, lng: 83.3312, area: 'Seethammadhara', status: 'idle',    speed: 0,  battery: 76, rider: 'Mahesh P.' },
  { id: 'ICC-VZG-016', lat: 17.7856, lng: 83.3523, area: 'Madhurawada',    status: 'moving',  speed: 38, battery: 69, rider: 'Kavitha S.' },
  { id: 'ICC-VZG-017', lat: 17.6812, lng: 83.3198, area: 'Pendurthi',      status: 'moving',  speed: 21, battery: 53, rider: 'Durga R.' },
];

const STATUS_CONFIG = {
  moving:   { color: '#10b981', label: 'Moving',   bg: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  idle:     { color: '#f59e0b', label: 'Idle',     bg: 'bg-amber-100 text-amber-700 border-amber-200'     },
  charging: { color: '#0ea5e9', label: 'Charging', bg: 'bg-sky-100 text-sky-700 border-sky-200'           },
};

interface VizagLiveMapProps {
  className?: string;
}

export function VizagLiveMap({ className = '' }: VizagLiveMapProps) {
  const [selectedBike, setSelectedBike] = useState<typeof VIZAG_BIKES[0] | null>(null);
  const [bikes, setBikes] = useState(VIZAG_BIKES);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const movingCount  = bikes.filter(b => b.status === 'moving').length;
  const idleCount    = bikes.filter(b => b.status === 'idle').length;
  const chargingCount= bikes.filter(b => b.status === 'charging').length;

  // Simulated position drift for "live" movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBikes(prev => prev.map(bike => {
        if (bike.status !== 'moving') return bike;
        return {
          ...bike,
          lat: bike.lat + (Math.random() - 0.5) * 0.0008,
          lng: bike.lng + (Math.random() - 0.5) * 0.0008,
          speed: Math.max(10, Math.min(55, bike.speed + (Math.random() - 0.5) * 6)),
          battery: Math.max(5, bike.battery - 0.05),
        };
      }));
      setLastRefresh(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Leaflet map (dynamic import for SSR safety)
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current || mapRef.current) return;

    const initMap = async () => {
      // Inject Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const L = (await import('leaflet')).default;

      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Create map centered on Vizag
      const map = L.map(mapContainerRef.current!, {
        center: [17.7231, 83.3012],
        zoom: 13,
        zoomControl: true,
        attributionControl: false,
      });

      // OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Attribution (small, bottom-right)
      L.control.attribution({ prefix: '© OSM' }).addTo(map);

      mapRef.current = map;

      // Add bike markers
      VIZAG_BIKES.forEach(bike => {
        const cfg = STATUS_CONFIG[bike.status as keyof typeof STATUS_CONFIG];
        const icon = L.divIcon({
          className: '',
          html: `
            <div style="position:relative;width:32px;height:40px;">
              <div style="
                width:28px;height:28px;border-radius:50%;
                background:${cfg.color};
                border:3px solid white;
                box-shadow:0 2px 8px rgba(0,0,0,0.35);
                display:flex;align-items:center;justify-content:center;
                font-size:14px;cursor:pointer;
              ">🛵</div>
              ${bike.status === 'moving' ? `<div style="
                position:absolute;top:-4px;left:-4px;
                width:36px;height:36px;border-radius:50%;
                border:2px solid ${cfg.color};
                animation:ping 1.4s cubic-bezier(0,0,0.2,1) infinite;
                opacity:0.5;
              "></div>` : ''}
            </div>
          `,
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -44],
        });

        const marker = L.marker([bike.lat, bike.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:system-ui;min-width:180px">
              <div style="font-weight:800;font-size:13px;color:#0f172a;margin-bottom:6px">
                🛵 ${bike.id}
              </div>
              <div style="font-size:11px;color:#64748b;margin-bottom:4px">📍 ${bike.area}</div>
              <div style="font-size:11px;color:#64748b;margin-bottom:4px">👤 Rider: <strong>${bike.rider}</strong></div>
              <div style="display:flex;gap:8px;margin-top:6px">
                <span style="background:${cfg.color}20;color:${cfg.color};padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;border:1px solid ${cfg.color}40">
                  ${cfg.label}
                </span>
                <span style="background:#f1f5f9;color:#334155;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700">
                  ${bike.speed} km/h
                </span>
                <span style="background:#f1f5f9;color:#334155;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700">
                  🔋${bike.battery.toFixed(0)}%
                </span>
              </div>
            </div>
          `, { maxWidth: 220 });

        markersRef.current.push({ marker, id: bike.id });
      });

      setMapLoaded(true);
    };

    initMap().catch(console.error);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update marker positions when bikes state changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    bikes.forEach(bike => {
      const entry = markersRef.current.find(m => m.id === bike.id);
      if (entry) {
        entry.marker.setLatLng([bike.lat, bike.lng]);
      }
    });
  }, [bikes, mapLoaded]);

  const refreshData = () => {
    setBikes(prev => prev.map(b => ({
      ...b,
      speed: b.status === 'moving' ? Math.max(10, Math.min(55, b.speed + (Math.random() - 0.5) * 10)) : b.speed,
    })));
    setLastRefresh(new Date());
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* ── Header ── */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-100">
              <Navigation className="h-4 w-4 text-sky-600" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-base">Live Fleet Map — Visakhapatnam</h2>
            <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            Real-time GPS tracking of ICC EV bikes across Vizag city • Updated {lastRefresh.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status pills */}
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {movingCount} Moving
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {idleCount} Idle
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            {chargingCount} Charging
          </span>

          <button
            onClick={refreshData}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            title="Refresh"
          >
            <RefreshCw className="h-3.5 w-3.5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* ── Map + Sidebar ── */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Map */}
        <div className="relative flex-1 min-h-[420px]">
          {/* Ping animation style injected inline */}
          <style>{`
            @keyframes ping {
              75%, 100% { transform: scale(2); opacity: 0; }
            }
          `}</style>

          <div ref={mapContainerRef} className="absolute inset-0 z-0" />

          {/* Loading shimmer */}
          {!mapLoaded && (
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center z-10 gap-3">
              <div className="h-10 w-10 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
              <p className="text-sm font-semibold text-slate-500">Loading Vizag Map…</p>
            </div>
          )}
        </div>

        {/* Sidebar — bike list */}
        <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-100 overflow-y-auto max-h-[420px] lg:max-h-none">
          <div className="p-3 border-b border-slate-100 bg-slate-50">
            <p className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              {bikes.length} Bikes Tracked
            </p>
          </div>
          <div className="divide-y divide-slate-50">
            {bikes.map(bike => {
              const cfg = STATUS_CONFIG[bike.status as keyof typeof STATUS_CONFIG];
              return (
                <button
                  key={bike.id}
                  onClick={() => {
                    setSelectedBike(bike);
                    // Pan map to bike
                    if (mapRef.current) {
                      mapRef.current.setView([bike.lat, bike.lng], 15, { animate: true });
                      const entry = markersRef.current.find(m => m.id === bike.id);
                      if (entry) entry.marker.openPopup();
                    }
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                    selectedBike?.id === bike.id ? 'bg-sky-50 border-l-2 border-sky-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-slate-800">{bike.id}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border ${cfg.bg}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium truncate">📍 {bike.area}</p>
                  <p className="text-[11px] text-slate-400 truncate">👤 {bike.rider}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-slate-600">
                      <Navigation className="h-2.5 w-2.5" />
                      {bike.speed.toFixed(0)} km/h
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-slate-600">
                      <Zap className="h-2.5 w-2.5 text-amber-500" />
                      {bike.battery.toFixed(0)}%
                    </span>
                    {bike.battery < 20 && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-600">
                        <AlertTriangle className="h-2.5 w-2.5" />
                        Low
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer summary bar ── */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1"><Wifi className="h-3 w-3 text-emerald-500" /> OpenStreetMap</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-sky-500" /> Vizag, Andhra Pradesh</span>
          <span className="flex items-center gap-1"><Battery className="h-3 w-3 text-amber-500" />
            Avg Battery: {(bikes.reduce((s, b) => s + b.battery, 0) / bikes.length).toFixed(0)}%
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-400">
          Auto-refresh every 3s • Click any bike to focus
        </span>
      </div>
    </div>
  );
}
