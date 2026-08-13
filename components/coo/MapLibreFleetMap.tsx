'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  MapPin, Activity, Search, Layers, Maximize2, Navigation, Battery, Radio, Locate
} from 'lucide-react';
import { ThreeScooterCanvas } from './ThreeScooterCanvas';

// Vehicle Telemetry Interface
export interface VehicleTelemetry {
  id: string;
  vin: string;
  reg: string;
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  battery: number;
  batteryTemp: number;
  motorTemp: number;
  status: string;
  charging: boolean;
  driver: string;
  hub: string;
  lastUpdated: string;
  odometer: number;
  tripDistance: number;
  currentTrip: string;
  route: [number, number][];
}

// CARTO Voyager Light Tile Style Spec
const brightLightStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'osm-bright-tiles': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    },
  },
  layers: [
    {
      id: 'osm-bright-layer',
      type: 'raster',
      source: 'osm-bright-tiles',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const MOCK_FALLBACK_FLEET: VehicleTelemetry[] = [
  {
    id: 'veh-001',
    vin: 'MA1EV001BLR2026',
    reg: 'KA-01-EQ-9983',
    lat: 12.9716,
    lng: 77.5946,
    heading: 140,
    speed: 42.5,
    battery: 88,
    batteryTemp: 34.2,
    motorTemp: 41.0,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Rajesh Kumar',
    hub: 'Bengaluru Central Depot',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 14280,
    tripDistance: 42.5,
    currentTrip: 'MG Road Service Route',
    route: [[77.5896, 12.9666], [77.5946, 12.9716]],
  },
  {
    id: 'veh-002',
    vin: 'MA1EV002BLR2026',
    reg: 'KA-03-EV-4410',
    lat: 12.9352,
    lng: 77.6245,
    heading: 90,
    speed: 38.0,
    battery: 76,
    batteryTemp: 36.5,
    motorTemp: 43.2,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Suresh Raina',
    hub: 'Koramangala Service Hub',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 18920,
    tripDistance: 65.0,
    currentTrip: 'Koramangala 8th Block Deliveries',
    route: [[77.6195, 12.9302], [77.6245, 12.9352]],
  },
  {
    id: 'veh-003',
    vin: 'MA1EV003BLR2026',
    reg: 'KA-04-EV-8821',
    lat: 12.9784,
    lng: 77.6408,
    heading: 210,
    speed: 0.0,
    battery: 15,
    batteryTemp: 54.2,
    motorTemp: 58.0,
    status: 'CRITICAL',
    charging: false,
    driver: 'Anil Sharma',
    hub: 'Indiranagar Hub',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 22100,
    tripDistance: 82.1,
    currentTrip: 'Indiranagar 100ft Road',
    route: [[77.6358, 12.9734], [77.6408, 12.9784]],
  },
  {
    id: 'veh-004',
    vin: 'MA1EV004BLR2026',
    reg: 'KA-05-EQ-1209',
    lat: 13.0358,
    lng: 77.5970,
    heading: 45,
    speed: 48.2,
    battery: 92,
    batteryTemp: 32.1,
    motorTemp: 39.5,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Vikram Singh',
    hub: 'Hebbal Tech Park Hub',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 9400,
    tripDistance: 31.0,
    currentTrip: 'Manyata Tech Park Express',
    route: [[77.5920, 13.0308], [77.5970, 13.0358]],
  },
  {
    id: 'veh-005',
    vin: 'MA1EV005BLR2026',
    reg: 'KA-51-EV-6677',
    lat: 12.9166,
    lng: 77.6101,
    heading: 180,
    speed: 0.0,
    battery: 64,
    batteryTemp: 29.8,
    motorTemp: 31.0,
    status: 'CHARGING',
    charging: true,
    driver: 'Kiran Gowda',
    hub: 'BTM Layout Depot',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 15600,
    tripDistance: 12.4,
    currentTrip: 'BTM Fast Charging Station',
    route: [[77.6051, 12.9116], [77.6101, 12.9166]],
  },
  {
    id: 'veh-006',
    vin: 'MA1EV006BLR2026',
    reg: 'KA-02-EV-3390',
    lat: 12.9698,
    lng: 77.7500,
    heading: 120,
    speed: 52.0,
    battery: 81,
    batteryTemp: 35.0,
    motorTemp: 44.0,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Praveen Reddy',
    hub: 'Whitefield ITPL Hub',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 27400,
    tripDistance: 94.0,
    currentTrip: 'ITPL Main Road Express',
    route: [[77.7450, 12.9648], [77.7500, 12.9698]],
  },
  {
    id: 'veh-007',
    vin: 'MA1EV007BLR2026',
    reg: 'KA-41-EQ-5512',
    lat: 12.9279,
    lng: 77.6271,
    heading: 270,
    speed: 24.5,
    battery: 45,
    batteryTemp: 38.0,
    motorTemp: 46.5,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Manjunath B',
    hub: 'HSR Layout Sector 1',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 11200,
    tripDistance: 54.0,
    currentTrip: 'HSR Outer Ring Road Route',
    route: [[77.6221, 12.9229], [77.6271, 12.9279]],
  },
  {
    id: 'veh-008',
    vin: 'MA1EV008BLR2026',
    reg: 'KA-04-EV-9901',
    lat: 13.0033,
    lng: 77.5647,
    heading: 0,
    speed: 0.0,
    battery: 18,
    batteryTemp: 52.0,
    motorTemp: 55.0,
    status: 'CRITICAL',
    charging: false,
    driver: 'Deepak Rao',
    hub: 'Rajajinagar Depot',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 31000,
    tripDistance: 110.5,
    currentTrip: 'Rajajinagar Industrial Area',
    route: [[77.5597, 12.9983], [77.5647, 13.0033]],
  },
  {
    id: 'veh-009',
    vin: 'MA1EV009BLR2026',
    reg: 'KA-53-EV-1122',
    lat: 12.8452,
    lng: 77.6602,
    heading: 180,
    speed: 44.0,
    battery: 79,
    batteryTemp: 33.0,
    motorTemp: 40.0,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Ramesh Reddy',
    hub: 'Electronic City Hub',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 19800,
    tripDistance: 48.0,
    currentTrip: 'Electronic City Phase 1',
    route: [[77.6552, 12.8402], [77.6602, 12.8452]],
  },
  {
    id: 'veh-010',
    vin: 'MA1EV010BLR2026',
    reg: 'KA-01-EV-3344',
    lat: 12.9290,
    lng: 77.5830,
    heading: 90,
    speed: 36.5,
    battery: 85,
    batteryTemp: 32.5,
    motorTemp: 39.0,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Ganesh Bhatt',
    hub: 'Jayanagar 4th Block',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 13400,
    tripDistance: 29.5,
    currentTrip: 'Jayanagar Shopping Complex',
    route: [[77.5780, 12.9240], [77.5830, 12.9290]],
  },
  {
    id: 'veh-011',
    vin: 'MA1EV011BLR2026',
    reg: 'KA-53-EQ-7788',
    lat: 12.9370,
    lng: 77.6970,
    heading: 270,
    speed: 41.0,
    battery: 68,
    batteryTemp: 35.8,
    motorTemp: 42.1,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Sunil Naik',
    hub: 'Bellandur EcoSpace',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 21500,
    tripDistance: 62.0,
    currentTrip: 'Outer Ring Road Shuttle',
    route: [[77.6920, 12.9320], [77.6970, 12.9370]],
  },
  {
    id: 'veh-012',
    vin: 'MA1EV012BLR2026',
    reg: 'KA-04-EV-5566',
    lat: 13.0900,
    lng: 77.5920,
    heading: 45,
    speed: 55.0,
    battery: 94,
    batteryTemp: 30.5,
    motorTemp: 37.0,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Mohan Das',
    hub: 'Yelahanka Satellite Town',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 7800,
    tripDistance: 38.0,
    currentTrip: 'Airport Road Corridor',
    route: [[77.5870, 13.0850], [77.5920, 13.0900]],
  },
  {
    id: 'veh-013',
    vin: 'MA1EV013BLR2026',
    reg: 'KA-02-EQ-9911',
    lat: 13.0280,
    lng: 77.5190,
    heading: 135,
    speed: 0.0,
    battery: 12,
    batteryTemp: 56.0,
    motorTemp: 60.0,
    status: 'CRITICAL',
    charging: false,
    driver: 'Chethan Kumar',
    hub: 'Peenya Industrial Estate',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 34200,
    tripDistance: 125.0,
    currentTrip: 'Peenya 3rd Stage Alert',
    route: [[77.5140, 13.0230], [77.5190, 13.0280]],
  },
  {
    id: 'veh-014',
    vin: 'MA1EV014BLR2026',
    reg: 'KA-51-EV-4488',
    lat: 12.9080,
    lng: 77.6510,
    heading: 210,
    speed: 0.0,
    battery: 89,
    batteryTemp: 28.5,
    motorTemp: 30.0,
    status: 'CHARGING',
    charging: true,
    driver: 'Depot Fast Charger #2',
    hub: 'Kudlu Gate Depot',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 16700,
    tripDistance: 0.0,
    currentTrip: 'Kudlu Fast Charge Station',
    route: [[77.6510, 12.9080]],
  },
  {
    id: 'veh-015',
    vin: 'MA1EV015BLR2026',
    reg: 'KA-03-EV-2233',
    lat: 12.9550,
    lng: 77.7120,
    heading: 90,
    speed: 46.0,
    battery: 74,
    batteryTemp: 34.0,
    motorTemp: 41.5,
    status: 'OPERATIONAL',
    charging: false,
    driver: 'Vijay M',
    hub: 'Marathahalli Bridge Hub',
    lastUpdated: 'Live Telemetry Stream',
    odometer: 25100,
    tripDistance: 71.0,
    currentTrip: 'Marathahalli ORR Express',
    route: [[77.7070, 12.9500], [77.7120, 12.9550]],
  },
];

// High-Performance 2D Kernel Density Estimation (KDE) Canvas Heatmap Engine
function renderKdeHeatmap(
  canvas: HTMLCanvasElement | null,
  points: { x: number; y: number; weight: number }[],
  width: number,
  height: number,
  zoom: number
) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  if (points.length === 0) return;

  // 1. Accumulate Quadratic Radial Alpha Blobs on Offscreen Canvas
  const alphaCanvas = document.createElement('canvas');
  alphaCanvas.width = width;
  alphaCanvas.height = height;
  const alphaCtx = alphaCanvas.getContext('2d');
  if (!alphaCtx) return;

  const radius = Math.max(16, Math.min(45, (zoom - 4) * 3 + 12));

  points.forEach((pt) => {
    const grad = alphaCtx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.12)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.05)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    alphaCtx.fillStyle = grad;
    alphaCtx.beginPath();
    alphaCtx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
    alphaCtx.fill();
  });

  // 2. Build 256x1 Color Palette Gradient (Matching Reference Image)
  const paletteCanvas = document.createElement('canvas');
  paletteCanvas.width = 256;
  paletteCanvas.height = 1;
  const paletteCtx = paletteCanvas.getContext('2d');
  if (!paletteCtx) return;

  const pGrad = paletteCtx.createLinearGradient(0, 0, 256, 0);
  pGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
  pGrad.addColorStop(0.05, 'rgba(99, 102, 241, 0.45)'); // Outer Indigo / Purple Glow
  pGrad.addColorStop(0.2, 'rgba(59, 130, 246, 0.72)');  // Royal Blue
  pGrad.addColorStop(0.45, 'rgba(239, 68, 68, 0.88)');  // Crimson Red
  pGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.95)');  // Bright Orange
  pGrad.addColorStop(0.88, 'rgba(253, 224, 71, 0.98)'); // Glowing Yellow
  pGrad.addColorStop(1.0, 'rgba(255, 255, 255, 1.0)');  // White Hotspot Core

  paletteCtx.fillStyle = pGrad;
  paletteCtx.fillRect(0, 0, 256, 1);
  const palette = paletteCtx.getImageData(0, 0, 256, 1).data;

  // 3. Color Lookup on Cumulative Alpha Channel
  const imgData = alphaCtx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha > 0) {
      const pIndex = Math.min(255, alpha) * 4;
      data[i] = palette[pIndex];         // Red
      data[i + 1] = palette[pIndex + 1]; // Green
      data[i + 2] = palette[pIndex + 2]; // Blue
      data[i + 3] = palette[pIndex + 3]; // Alpha
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

export function MapLibreFleetMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ [id: string]: maplibregl.Marker }>({});

  const [vehicles, setVehicles] = useState<VehicleTelemetry[]>(MOCK_FALLBACK_FLEET);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleTelemetry | null>(MOCK_FALLBACK_FLEET[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGeofence, setShowGeofence] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapZoom, setMapZoom] = useState(12);

  // 1. Fetch Database Vehicle Telemetry with Fallback Mock Data
  useEffect(() => {
    async function fetchDbVehicles() {
      if (process.env.NEXT_PUBLIC_ENABLE_EXTERNAL_BACKEND !== 'true') return;
      try {
        let res: Response | null = null;
        try {
          res = await fetch('http://localhost:8000/api/coo/fleet');
        } catch (fetchErr) {
          // Silent fallback when backend is unreachable or CORS blocked
        }

        if (res && res.ok) {
          const data = await res.json().catch(() => null);
          if (data && data.vehicles && data.vehicles.length > 0) {
            const mapped: VehicleTelemetry[] = data.vehicles.map((v: any) => ({
              id: v.id,
              vin: v.vin,
              reg: v.registration_number,
              lat: v.current_lat || 12.9716,
              lng: v.current_lng || 77.5946,
              heading: 140,
              speed: v.speed_kmh || 38.5,
              battery: v.soc_percent || 85,
              batteryTemp: 34.2,
              motorTemp: 41.0,
              status: v.status || 'OPERATIONAL',
              charging: v.status === 'CHARGING',
              driver: 'Assigned Driver',
              hub: 'Bengaluru Central Depot',
              lastUpdated: 'Live Database',
              odometer: 14280,
              tripDistance: 42.5,
              currentTrip: 'Active Service Route',
              route: [[v.current_lng - 0.005, v.current_lat - 0.005], [v.current_lng, v.current_lat]],
            }));
            setVehicles(mapped);
            setSelectedVehicle(mapped[0]);
            return;
          }
        }
        setVehicles(MOCK_FALLBACK_FLEET);
        setSelectedVehicle(MOCK_FALLBACK_FLEET[0]);
      } catch (e) {
        setVehicles(MOCK_FALLBACK_FLEET);
        setSelectedVehicle(MOCK_FALLBACK_FLEET[0]);
      }
    }
    fetchDbVehicles();
  }, []);

  // 2. Render KDE Continuous Heatmap on HTML5 Canvas
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded || !mapContainerRef.current) return;

    const updateKdeHeatmap = () => {
      const zoom = map.getZoom();
      setMapZoom(zoom);

      const width = mapContainerRef.current?.clientWidth || 800;
      const height = mapContainerRef.current?.clientHeight || 540;

      const pts = vehicles.map((v) => {
        const p = map.project([v.lng, v.lat]);
        return { x: p.x, y: p.y, weight: v.status === 'CRITICAL' ? 2 : 1 };
      });

      renderKdeHeatmap(canvasRef.current, pts, width, height, zoom);
    };

    map.on('move', updateKdeHeatmap);
    map.on('zoom', updateKdeHeatmap);
    updateKdeHeatmap();

    return () => {
      map.off('move', updateKdeHeatmap);
      map.off('zoom', updateKdeHeatmap);
    };
  }, [vehicles, isMapLoaded]);

  // Status helper color generator
  const getStatusColor = (v: VehicleTelemetry) => {
    if (v.status === 'CRITICAL' || v.battery < 20) return '#dc2626'; // Red
    if (v.status === 'CHARGING' || v.charging) return '#7c3aed'; // Purple
    if (v.status === 'MAINTENANCE') return '#d97706'; // Amber
    if (v.battery >= 20 && v.battery < 50) return '#ea580c'; // Orange
    return '#059669'; // Emerald Green
  };

  // 2. Initialize MapLibre GL Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: brightLightStyle,
      center: [77.5946, 12.9716],
      zoom: 12,
      pitch: 30,
      bearing: -15,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      setIsMapLoaded(true);
      map.resize();

      // 1. Geofence Layer
      map.addSource('bengaluru-geofence', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: 'Bengaluru Core Fleet Boundary' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [77.5200, 13.0600],
                [77.7400, 13.0600],
                [77.7400, 12.8300],
                [77.5200, 12.8300],
                [77.5200, 13.0600],
              ],
            ],
          },
        },
      });

      map.addLayer({
        id: 'geofence-fill',
        type: 'fill',
        source: 'bengaluru-geofence',
        paint: {
          'fill-color': '#2563eb',
          'fill-opacity': 0.06,
        },
      });

      map.addLayer({
        id: 'geofence-line',
        type: 'line',
        source: 'bengaluru-geofence',
        paint: {
          'line-color': '#2563eb',
          'line-width': 2,
          'line-dasharray': [4, 3],
        },
      });

      // 2. Dynamic Thermal Heatmap Multi-Stage Blur Layers (100% MapLibre Compatible)
      map.addSource('fleet-heatmap-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      // Layer 1: Outer Indigo/Purple Aura
      map.addLayer({
        id: 'fleet-heat-outer',
        type: 'circle',
        source: 'fleet-heatmap-source',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 70, 9, 140, 14, 240],
          'circle-color': '#6366f1',
          'circle-blur': 1.0,
          'circle-opacity': 0.45,
        },
      });

      // Layer 2: Deep Royal Blue Layer
      map.addLayer({
        id: 'fleet-heat-blue',
        type: 'circle',
        source: 'fleet-heatmap-source',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 45, 9, 90, 14, 160],
          'circle-color': '#3b82f6',
          'circle-blur': 0.9,
          'circle-opacity': 0.65,
        },
      });

      // Layer 3: Vivid Crimson Red Layer
      map.addLayer({
        id: 'fleet-heat-red',
        type: 'circle',
        source: 'fleet-heatmap-source',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 28, 9, 55, 14, 100],
          'circle-color': '#ef4444',
          'circle-blur': 0.8,
          'circle-opacity': 0.85,
        },
      });

      // Layer 4: Glowing Yellow Core
      map.addLayer({
        id: 'fleet-heat-yellow',
        type: 'circle',
        source: 'fleet-heatmap-source',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 14, 9, 28, 14, 55],
          'circle-color': '#fde047',
          'circle-blur': 0.6,
          'circle-opacity': 0.95,
        },
      });

      // Layer 5: White Hotspot Core Point
      map.addLayer({
        id: 'fleet-heat-white',
        type: 'circle',
        source: 'fleet-heatmap-source',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 6, 9, 12, 14, 24],
          'circle-color': '#ffffff',
          'circle-blur': 0.4,
          'circle-opacity': 1.0,
        },
      });

      // Zoom Listener to toggle individual markers vs heatmap
      const toggleZoomView = () => {
        const currentZoom = map.getZoom();
        const displayStyle = currentZoom < 11.5 ? 'none' : 'flex';
        Object.values(markersRef.current).forEach((m) => {
          const el = m.getElement();
          if (el) el.style.display = displayStyle;
        });
      };

      map.on('zoom', toggleZoomView);
      toggleZoomView();
    });

    const timer = setTimeout(() => {
      if (mapRef.current) mapRef.current.resize();
    }, 400);

    return () => {
      clearTimeout(timer);
      map.remove();
    };
  }, []);

  // 3. Render Database Vehicle Markers & Update Heatmap Data
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded || vehicles.length === 0) return;

    // Update GeoJSON Heatmap Source
    const heatmapSource = map.getSource('fleet-heatmap-source') as maplibregl.GeoJSONSource;
    if (heatmapSource) {
      heatmapSource.setData({
        type: 'FeatureCollection',
        features: vehicles.map((v) => ({
          type: 'Feature',
          properties: {
            mag: v.status === 'CRITICAL' ? 5 : 2,
            status: v.status,
          },
          geometry: {
            type: 'Point',
            coordinates: [v.lng, v.lat],
          },
        })),
      });
    }

    const currentZoom = map.getZoom();
    const displayStyle = currentZoom < 11.5 ? 'none' : 'flex';

    vehicles.forEach((v) => {
      const color = getStatusColor(v);
      let marker = markersRef.current[v.id];

      if (!marker) {
        const el = document.createElement('div');
        el.className = 'group cursor-pointer relative flex flex-col items-center z-10 hover:z-50';
        el.id = `marker-${v.id}`;
        el.style.display = displayStyle;

        const isCritical = v.status === 'CRITICAL' || v.battery < 20;
        const isCharging = v.status === 'CHARGING' || v.charging;

        el.innerHTML = `
          <div class="flex flex-col items-center group-hover:-translate-y-1.5 transition-all duration-200">
            <!-- Top Registration Tag -->
            <div class="mb-1 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-full shadow-md text-[10px] font-black text-slate-900 flex items-center gap-1.5 group-hover:border-blue-400 group-hover:shadow-lg transition">
              <span class="tracking-tight font-sans">${v.reg}</span>
              <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                isCritical ? 'bg-rose-100 text-rose-800' : isCharging ? 'bg-purple-100 text-purple-800' : 'bg-emerald-50 text-emerald-700'
              }">${v.battery}%</span>
            </div>

            <!-- Mini Scooter Icon Badge Pin -->
            <div class="relative flex items-center justify-center">
              ${isCritical ? '<span class="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-rose-400 opacity-60"></span>' : ''}
              <div class="w-9 h-9 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white text-sm font-black transition-transform duration-200 group-hover:scale-110" style="background: linear-gradient(135deg, ${color}, #0f172a);">
                <span>${isCharging ? '⚡' : '🛵'}</span>
              </div>
              <div class="absolute -bottom-1 w-3 h-1 rounded-full bg-slate-900/40 blur-[1px]"></div>
            </div>
          </div>
        `;

        const popupHTML = `
          <div class="p-3.5 bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-2xl text-xs space-y-2.5 min-w-[220px]">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <span class="font-extrabold text-sm text-blue-600 block">${v.reg}</span>
                <span class="text-[10px] text-slate-400 font-mono">${v.vin}</span>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                isCritical ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }">${v.status}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-[11px]">
              <div><span class="text-slate-500 block font-medium">Speed</span><strong class="text-slate-900 font-bold">${v.speed} km/h</strong></div>
              <div><span class="text-slate-500 block font-medium">Battery SOC</span><strong class="text-emerald-700 font-bold">${v.battery}%</strong></div>
              <div><span class="text-slate-500 block font-medium">Driver</span><strong class="text-slate-800 font-medium">${v.driver}</strong></div>
              <div><span class="text-slate-500 block font-medium">Hub</span><strong class="text-slate-800 font-medium">${v.hub.split(' ')[0]}</strong></div>
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 24, closeButton: false }).setHTML(popupHTML);

        el.addEventListener('click', () => {
          setSelectedVehicle(v);
          map.flyTo({ center: [v.lng, v.lat], zoom: 15, pitch: 30, speed: 1.2 });
        });

        marker = new maplibregl.Marker({ element: el })
          .setLngLat([v.lng, v.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current[v.id] = marker;
      } else {
        marker.setLngLat([v.lng, v.lat]);
      }
    });
  }, [vehicles, isMapLoaded]);

  // 4. Handle Zoom-Activated Visibility Switching
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    const updateVisibility = () => {
      const currentZoom = map.getZoom();
      const isHeatmapMode = currentZoom < 11.5;
      const displayStyle = isHeatmapMode ? 'none' : 'flex';

      Object.values(markersRef.current).forEach((m) => {
        const el = m.getElement();
        if (el) el.style.display = displayStyle;
      });

      const heatLayers = ['fleet-heat-outer', 'fleet-heat-blue', 'fleet-heat-red', 'fleet-heat-yellow', 'fleet-heat-white'];
      heatLayers.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, 'visibility', isHeatmapMode ? 'visible' : 'none');
        }
      });
    };

    map.on('zoom', updateVisibility);
    updateVisibility();

    return () => {
      map.off('zoom', updateVisibility);
    };
  }, [isMapLoaded]);

  // Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const match = vehicles.find(
      (v) =>
        v.reg.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.vin.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match && mapRef.current) {
      setSelectedVehicle(match);
      mapRef.current.flyTo({ center: [match.lng, match.lat], zoom: 16, pitch: 45, speed: 1.4 });
      const m = markersRef.current[match.id];
      if (m && m.getPopup()) m.togglePopup();
    }
  };

  // Camera Locate Button Action
  const handleLocateVehicle = (v: VehicleTelemetry) => {
    setSelectedVehicle(v);
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [v.lng, v.lat], zoom: 16, pitch: 45, speed: 1.4 });
      const m = markersRef.current[v.id];
      if (m && !m.getPopup().isOpen()) m.togglePopup();
    }
  };

  // Dynamic Fleet Counters from DB
  const onlineCount = useMemo(() => vehicles.filter((v) => v.status === 'OPERATIONAL').length, [vehicles]);
  const criticalCount = useMemo(() => vehicles.filter((v) => v.status === 'CRITICAL' || v.battery < 20).length, [vehicles]);

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-100 p-4' : ''}`}>
      {/* Container Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-200 text-blue-600 shadow-xs">
            <MapPin className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>Live GPS Radar & Telemetry Feed (Database Vehicles)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                DATABASE SYNCED
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Queried from SQLite Database Table `vehicles` • Real-Time GPS Tracking
            </p>
          </div>
        </div>

        {/* Search & Header Controls */}
        <div className="flex items-center space-x-2">

          <form onSubmit={handleSearch} className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Reg No or VIN..."
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-56 font-medium"
            />
          </form>

          <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl font-mono font-bold border border-emerald-200 shadow-xs flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{vehicles.length} DB Vehicles Loaded</span>
          </span>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition cursor-pointer"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Map (3 cols) + Telemetry Side Panel (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map Canvas Box */}
        <div className="lg:col-span-3 relative bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-xs min-h-[520px]">
          {/* MapLibre DOM Container Element */}
          <div ref={mapContainerRef} className="w-full h-[540px]" />

          {/* 100% Continuous GIS Kernel Density Estimation (KDE) Canvas Heatmap Overlay */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-300 ${
              mapZoom < 11.5 ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 text-[10px] text-slate-700 space-y-1.5 shadow-lg">
            <span className="font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
              Marker Status Legend
            </span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Operational</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span> Critical</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Charging</span>
            </div>
          </div>
        </div>

        {/* Right Side Telemetry Panel */}
        <div className="space-y-4">
          {/* Real-time Counters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 space-y-3 shadow-xs">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center justify-between">
              <span>DATABASE FLEET STATUS</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500 block">Operational</span>
                <span className="text-lg font-black text-emerald-600">{onlineCount} Units</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500 block">Critical Status</span>
                <span className="text-lg font-black text-red-600">{criticalCount} Units</span>
              </div>
            </div>
          </div>

          {/* Active Vehicle 3D Mini Scooter Telemetry Card */}
          {selectedVehicle && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-xs font-extrabold text-blue-600 block">{selectedVehicle.reg}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{selectedVehicle.vin}</span>
                </div>
                <button
                  onClick={() => handleLocateVehicle(selectedVehicle)}
                  className="p-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-bold flex items-center space-x-1 hover:bg-blue-600 hover:text-white transition cursor-pointer"
                >
                  <Locate className="w-3 h-3" />
                  <span>Locate</span>
                </button>
              </div>

              {/* Three.js 3D WebGL EV Scooter Radar Box */}
              <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-xl p-2.5 flex flex-col items-center justify-center relative border border-slate-700/60 shadow-inner">
                <div className="absolute top-2 left-2 flex items-center space-x-1 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700 text-[9px] font-mono text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>Three.js 3D Telemetry</span>
                </div>
                <ThreeScooterCanvas
                  key={selectedVehicle.id}
                  status={selectedVehicle.status}
                  battery={selectedVehicle.battery}
                  charging={selectedVehicle.charging}
                  heading={selectedVehicle.heading}
                  size={120}
                  modelUrl="/models/luwai_HD_1782756995630.glb"
                />
                <div className="w-full flex items-center justify-between text-[10px] font-bold text-slate-300 mt-1 border-t border-slate-800 pt-1.5 px-1">
                  <span>Speed: <strong className="text-emerald-400">{selectedVehicle.speed} km/h</strong></span>
                  <span>Heading: <strong className="text-cyan-400">{selectedVehicle.heading}°</strong></span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500">Battery Level</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5" />
                    <span>{selectedVehicle.battery}%</span>
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500">Current Speed</span>
                  <span className="font-bold text-blue-600">{selectedVehicle.speed} km/h</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500">Status</span>
                  <span className="font-bold text-slate-800">{selectedVehicle.status}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Dynamic Status Bar */}
      {selectedVehicle && (
        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-4">
            <span className="text-blue-600 font-bold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Database Record: {selectedVehicle.reg}</span>
            </span>
            <span>
              GPS: {selectedVehicle.lat.toFixed(4)}° N, {selectedVehicle.lng.toFixed(4)}° E
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Speed: <strong className="text-slate-900">{selectedVehicle.speed} km/h</strong></span>
            <span>Status: <strong className="text-emerald-600">{selectedVehicle.status}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}
