'use client';

import { useEffect, useState } from 'react';

export interface TelemetryPayload {
  active_dispatches: number;
  completed_today: number;
  sla_compliance_percent: number;
  vehicle_ka01_soc: number;
  vehicle_ka01_lat: number;
  vehicle_ka01_lng: number;
}

export function useCOOWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [liveData, setLiveData] = useState<TelemetryPayload>({
    active_dispatches: 24,
    completed_today: 118,
    sla_compliance_percent: 98.4,
    vehicle_ka01_soc: 88,
    vehicle_ka01_lat: 12.9716,
    vehicle_ka01_lng: 77.5946,
  });

  useEffect(() => {
    // Only attempt WebSocket connection if an external backend service is explicitly enabled
    if (process.env.NEXT_PUBLIC_ENABLE_EXTERNAL_BACKEND !== 'true') {
      setIsConnected(false);
      return;
    }

    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket('ws://localhost:8000/ws/coo');

      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onerror = () => {
        // Graceful silent fallback when backend server is offline
        setIsConnected(false);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'LIVE_TELEMETRY_UPDATE') {
            setLiveData((prev) => ({
              ...prev,
              active_dispatches: data.active_dispatches ?? prev.active_dispatches,
              completed_today: data.completed_today ?? prev.completed_today,
              sla_compliance_percent: data.sla_compliance_percent ?? prev.sla_compliance_percent,
              vehicle_ka01_soc: data.vehicle_ka01_soc ?? prev.vehicle_ka01_soc,
              vehicle_ka01_lat: data.vehicle_ka01_lat ?? prev.vehicle_ka01_lat,
              vehicle_ka01_lng: data.vehicle_ka01_lng ?? prev.vehicle_ka01_lng,
            }));
          }
        } catch (e) {
          // ignore invalid json
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
      };
    } catch (e) {
      setIsConnected(false);
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  return { isConnected, liveData };
}
