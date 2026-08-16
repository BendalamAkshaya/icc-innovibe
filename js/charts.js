/**
 * InnoVibe Mobility CTO Portal - Apple-Inspired Interactive Chart Engine
 * Configures dynamic hover tooltips with executive insights across all charts.
 */

window.portalCharts = {
  instances: {},
  destroyAll() {
    if (this.instances) {
      Object.keys(this.instances).forEach(key => {
        if (this.instances[key] && typeof this.instances[key].destroy === 'function') {
          try {
            this.instances[key].destroy();
          } catch(e) {}
        }
      });
      this.instances = {};
    }
  },


  getAppleTooltipOptions(insightsMap = {}) {
    return {
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(29, 29, 31, 0.94)',
      titleColor: '#FFFFFF',
      bodyColor: '#E5E5EA',
      borderColor: 'rgba(255, 255, 255, 0.12)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 10,
      boxPadding: 6,
      usePointStyle: true,
      titleFont: {
        family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        size: 12,
        weight: '700'
      },
      bodyFont: {
        family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        size: 11,
        weight: '500'
      },
      callbacks: {
        label: function(context) {
          const label = context.dataset.label || '';
          const val = context.raw;
          return ` ${label}: ${val}`;
        },
        afterBody: function(context) {
          if (!context || !context.length) return '';
          const label = context[0].label;
          if (insightsMap[label]) {
            return `\n💡 Executive Insight: ${insightsMap[label]}`;
          }
          return '\n💡 Executive Baseline: Operating within optimal 99.9% SLA parameters.';
        }
      }
    };
  },

    initTelemetryCharts() {
    // Safe fallback handler
  },
  initMobileAppCharts() {
    // Safe fallback handler
  },
  initIoTCharts() {
    // Safe fallback handler
  },
  initReportsCharts() {
    // Safe fallback handler
  },
  initWebPortalCharts() {
    // Safe fallback handler
  },
  initAIDiagnosticsCharts() {
    // Safe fallback handler
  },
  initAIModelCharts() {
    // Safe fallback handler
  },
  initMLPlatformCharts() {
    // Safe fallback handler
  },
initDashboardCharts() {
    this.initExecutiveDashboardCharts();
  },

  initExecutiveDashboardCharts() {
    const palette = {
      blue: '#0071E3',
      indigo: '#5E5CE6',
      emerald: '#34C759',
      amber: '#FF9500',
      rose: '#FF3B30',
      teal: '#5AC8FA',
      purple: '#AF52DE',
      slate: '#8E8E93',
      grid: 'rgba(0, 0, 0, 0.05)'
    };

    // 1. Engineering Delivery Performance (Bar/Line Combo)
    const ctx1 = document.getElementById('techEngChart');
    if (ctx1) {
      if (this.instances.techEng) this.instances.techEng.destroy();
      const chartCtx = ctx1.getContext('2d');
      const gradBlue = chartCtx.createLinearGradient(0, 0, 0, 150);
      gradBlue.addColorStop(0, 'rgba(0, 113, 227, 0.85)');
      gradBlue.addColorStop(1, 'rgba(0, 113, 227, 0.12)');

      const engInsights = {
        'Sprint 38': 'Initial refactoring sprint. 88% velocity achieved.',
        'Sprint 39': 'Added 3 mobile backend microservices. 90% velocity.',
        'Sprint 40': 'Kafka event stream throughput scaled to 14.2M msgs/sec.',
        'Sprint 41': 'Zero critical regressions reported across core gateways.',
        'Sprint 42': 'Peak performance! 94.2% milestone velocity & 99.4% release success.'
      };

      this.instances.techEng = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['Sprint 38', 'Sprint 39', 'Sprint 40', 'Sprint 41', 'Sprint 42'],
          datasets: [
            { type: 'bar', label: 'Velocity %', data: [88, 90, 92, 93, 94.2], backgroundColor: gradBlue, borderRadius: 6 },
            { type: 'line', label: 'Release Success %', data: [98, 98.5, 99.1, 99.2, 99.4], borderColor: palette.emerald, borderWidth: 2, tension: 0.35, fill: false, pointRadius: 3 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 8, font: { family: '-apple-system, BlinkMacSystemFont, "SF Pro Text"', size: 9 } } },
            tooltip: this.getAppleTooltipOptions(engInsights)
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { grid: { color: palette.grid }, ticks: { font: { size: 9 } } }
          }
        }
      });
    }

    // 2. Code Quality & Engineering Excellence (Horizontal Bar)
    const ctx2 = document.getElementById('techQualityChart');
    if (ctx2) {
      if (this.instances.techQuality) this.instances.techQuality.destroy();
      const qualityInsights = {
        'Code Quality': '92.4/100 SonarQube Rating A. Zero blocking debt.',
        'Coverage %': '88.5% automated unit & E2E test coverage.',
        'Maintainability': '95.0% modular clean architecture score.',
        'Tech Debt %': 'Only 4.2% backlog debt ratio (under 5% CTO threshold).'
      };

      this.instances.techQuality = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Code Quality', 'Coverage %', 'Maintainability', 'Tech Debt %'],
          datasets: [
            { label: 'Score %', data: [92.4, 88.5, 95.0, 4.2], backgroundColor: [palette.indigo, palette.blue, palette.emerald, palette.amber], borderRadius: 5 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: this.getAppleTooltipOptions(qualityInsights)
          },
          scales: {
            x: { grid: { color: palette.grid }, ticks: { font: { size: 8 } } },
            y: { grid: { display: false }, ticks: { font: { size: 9 } } }
          }
        }
      });
    }

    // 3. Connected Vehicle Health (Line Gradient)
    const ctx3 = document.getElementById('techMobilityChart');
    if (ctx3) {
      if (this.instances.techMobility) this.instances.techMobility.destroy();
      const chartCtx = ctx3.getContext('2d');
      const gradEmerald = chartCtx.createLinearGradient(0, 0, 0, 150);
      gradEmerald.addColorStop(0, 'rgba(52, 199, 89, 0.35)');
      gradEmerald.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

      const mobilityInsights = {
        'May': '32,000 active connected EVs telematics fleet onboarded.',
        'Jun': '36,000 active EVs. CAN-bus telemetry socket latency < 15ms.',
        'Jul': '39,500 connected EVs. Zero packet drops during tariff peak.',
        'Aug': '42,000 connected EVs with live predictive battery analytics.',
        'Sep': '44,100 connected EVs. Telemetry ingestion rate 14.2M msgs/sec.',
        'Oct': '45,200 connected EVs milestone reached across 12 enterprise fleets.'
      };

      this.instances.techMobility = new Chart(ctx3, {
        type: 'line',
        data: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          datasets: [
            { label: 'Connected EVs', data: [32000, 36000, 39500, 42000, 44100, 45200], borderColor: palette.emerald, backgroundColor: gradEmerald, fill: true, tension: 0.35, pointRadius: 3 },
            { label: 'Daily Active', data: [27000, 30500, 33200, 35400, 37200, 38400], borderColor: palette.blue, tension: 0.35, fill: false, pointRadius: 2 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 8, font: { family: '-apple-system, BlinkMacSystemFont, "SF Pro Text"', size: 9 } } },
            tooltip: this.getAppleTooltipOptions(mobilityInsights)
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { grid: { color: palette.grid }, ticks: { font: { size: 9 } } }
          }
        }
      });
    }

    // 4. AI Intelligence & Model Performance (Multi-Line Gradient)
    const ctx4 = document.getElementById('techAIChart');
    if (ctx4) {
      if (this.instances.techAI) this.instances.techAI.destroy();
      const chartCtx = ctx4.getContext('2d');
      const gradPurple = chartCtx.createLinearGradient(0, 0, 0, 150);
      gradPurple.addColorStop(0, 'rgba(175, 82, 222, 0.30)');
      gradPurple.addColorStop(1, 'rgba(175, 82, 222, 0.0)');

      const aiInsights = {
        'W1': '96.2% PyTorch EV battery degradation model accuracy.',
        'W2': '97.1% accuracy. 10.5M real-time inferences processed.',
        'W3': '97.8% accuracy with sub-25ms inference latency.',
        'W4': '98.2% peak accuracy! 12.5M inferences with zero false positives.'
      };

      this.instances.techAI = new Chart(ctx4, {
        type: 'line',
        data: {
          labels: ['W1', 'W2', 'W3', 'W4'],
          datasets: [
            { label: 'Accuracy %', data: [96.2, 97.1, 97.8, 98.2], borderColor: palette.purple, backgroundColor: gradPurple, fill: true, tension: 0.3, pointRadius: 3 },
            { label: 'Inferences (M)', data: [9.8, 10.5, 11.8, 12.5], borderColor: palette.teal, tension: 0.3, fill: false, pointRadius: 2 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 8, font: { family: '-apple-system, BlinkMacSystemFont, "SF Pro Text"', size: 9 } } },
            tooltip: this.getAppleTooltipOptions(aiInsights)
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { grid: { color: palette.grid }, ticks: { font: { size: 9 } } }
          }
        }
      });
    }

    // 5. Platform Reliability & Infrastructure (Bar)
    const ctx5 = document.getElementById('techReliabilityChart');
    if (ctx5) {
      if (this.instances.techRel) this.instances.techRel.destroy();
      const relInsights = {
        'Uptime SLA %': '99.98% overall platform SLA uptime across AWS EKS & CockroachDB.',
        'API Latency (ms)': '12ms average API gateway response latency (sub-millisecond target).',
        'DB Health %': '99.99% CockroachDB & TimescaleDB cluster operational index.',
        'Cloud Util %': '64% AWS cluster capacity utilization (optimal cost efficiency).'
      };

      this.instances.techRel = new Chart(ctx5, {
        type: 'bar',
        data: {
          labels: ['Uptime SLA %', 'API Latency (ms)', 'DB Health %', 'Cloud Util %'],
          datasets: [{ data: [99.98, 12, 99.99, 64], backgroundColor: [palette.teal, palette.blue, palette.emerald, palette.purple], borderRadius: 5 }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: this.getAppleTooltipOptions(relInsights)
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 8 } } },
            y: { grid: { color: palette.grid }, ticks: { font: { size: 9 } } }
          }
        }
      });
    }

    // 6. Business Growth & Customer Experience (Line Gradient)
    const ctx6 = document.getElementById('techBusinessChart');
    if (ctx6) {
      if (this.instances.techBus) this.instances.techBus.destroy();
      const chartCtx = ctx6.getContext('2d');
      const gradGreen = chartCtx.createLinearGradient(0, 0, 0, 150);
      gradGreen.addColorStop(0, 'rgba(52, 199, 89, 0.30)');
      gradGreen.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

      const busInsights = {
        'Q1': '$1.10M Monthly Recurring Revenue & 110 Enterprise Fleet clients.',
        'Q2': '$1.22M MRR & 122 Enterprise Fleet clients.',
        'Q3': '$1.35M MRR & 134 Enterprise Fleet clients.',
        'Q4': '$1.42M MRR milestone & 142 Enterprise Fleet clients.'
      };

      this.instances.techBus = new Chart(ctx6, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            { label: 'MRR ($M)', data: [1.1, 1.22, 1.35, 1.42], borderColor: palette.emerald, backgroundColor: gradGreen, fill: true, tension: 0.3, pointRadius: 3 },
            { label: 'Enterprise Fleets', data: [110, 122, 134, 142], borderColor: palette.indigo, tension: 0.3, fill: false, pointRadius: 2 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 8, font: { family: '-apple-system, BlinkMacSystemFont, "SF Pro Text"', size: 9 } } },
            tooltip: this.getAppleTooltipOptions(busInsights)
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { grid: { color: palette.grid }, ticks: { font: { size: 9 } } }
          }
        }
      });
    }
  }
};
