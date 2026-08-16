/**
 * InnoVibe Mobility CTO Dashboard - EV Telemetry Real-time Simulator
 * Live Telemetry Stream Simulator with explicit DEMO SIMULATION indicators.
 * Vehicles: 2,850 active connected EVs (Startup Growth Stage)
 */

window.EVTelemetryStream = {
  isStreaming: true,
  timerId: null,
  activeVehicles: [
    { vin: 'VIN-EV-2841', model: 'InnoVibe E-Fleet X1', soc: 84, temp: 31, speed: 42, station: 'OCPP-HUB-04', latency: 4 },
    { vin: 'VIN-EV-1904', model: 'InnoVibe Urban Go', soc: 42, temp: 34, speed: 0, station: 'OCPP-STATION-12', latency: 3 },
    { vin: 'VIN-EV-3392', model: 'InnoVibe E-Fleet X1', soc: 96, temp: 28, speed: 65, station: 'DISCONNECTED', latency: 5 },
    { vin: 'VIN-EV-0482', model: 'InnoVibe Delivery Pro', soc: 19, temp: 38, speed: 18, station: 'OCPP-FAST-01', latency: 2 },
    { vin: 'VIN-EV-4119', model: 'InnoVibe Urban Go', soc: 68, temp: 30, speed: 50, station: 'DISCONNECTED', latency: 4 }
  ],

  init() {
    this.startStream();
  },

  startStream() {
    if (this.timerId) clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      if (!this.isStreaming) return;
      this.tick();
    }, 1800);
  },

  toggleStream() {
    this.isStreaming = !this.isStreaming;
    return this.isStreaming;
  },

  tick() {
    // Pick random vehicle to update SOC / Speed / Ping
    const randomIndex = Math.floor(Math.random() * this.activeVehicles.length);
    const v = this.activeVehicles[randomIndex];

    // Slight variance
    v.soc = Math.max(5, Math.min(100, v.soc + (Math.random() > 0.5 ? -1 : 1)));
    v.temp = Math.max(20, Math.min(45, v.temp + (Math.random() > 0.7 ? 1 : -1)));
    v.latency = Math.floor(Math.random() * 4) + 2;

    const timeStr = new Date().toLocaleTimeString();
    const logItem = `
      <div class="log-line">
        <span class="log-time">[${timeStr}]</span>
        <span class="log-vin">${v.vin}</span>
        <span class="log-soc">SOC: ${v.soc}%</span>
        <span>Temp: ${v.temp}°C</span>
        <span class="log-status">${v.speed > 0 ? `Moving (${v.speed} km/h)` : `Charging (${v.station})`}</span>
        <span class="sim-tag" style="margin-left: auto;">[DEMO SIMULATION]</span>
      </div>
    `;

    const consoleEl = document.getElementById('telemetryLogConsole');
    if (consoleEl) {
      consoleEl.insertAdjacentHTML('afterbegin', logItem);

      // Limit log lines to 20
      if (consoleEl.children.length > 20) {
        consoleEl.removeChild(consoleEl.lastChild);
      }
    }
  },

  injectAnomaly() {
    const timeStr = new Date().toLocaleTimeString();
    const anomalyLog = `
      <div class="log-line" style="background: rgba(239, 68, 68, 0.15); padding: 2px 4px; border-radius: 4px;">
        <span class="log-time">[${timeStr}]</span>
        <span class="log-vin" style="color: #EF4444;">VIN-EV-9999 [TEST ANOMALY]</span>
        <span class="log-soc" style="color: #EF4444;">SOC CRITICAL: 4%</span>
        <span>Thermal Warning: 48°C</span>
        <span class="log-status" style="color: #EF4444;">Auto-Rerouted to Charger #09</span>
        <span class="sim-tag" style="margin-left: auto;">[SIMULATED ALERT]</span>
      </div>
    `;

    const consoleEl = document.getElementById('telemetryLogConsole');
    if (consoleEl) {
      consoleEl.insertAdjacentHTML('afterbegin', anomalyLog);
    }
  }
};
