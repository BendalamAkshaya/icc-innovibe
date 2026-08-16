/**
 * InnoVibe Mobility CTO Dashboard - Data Store & API Client Service
 * Startup Growth Scale Data Layer (14 Engineers, 2,850 Connected EVs, 5 Active Projects)
 * Structured for easy swap to real REST/GraphQL endpoints.
 */

window.InnoVibeAPI = {
  // Config & Metadata
  config: {
    portalDomain: 'office.innovibemobility.com',
    environment: 'Staging / Growth Production',
    isSimulated: true,
    lastSyncTimestamp: new Date().toISOString()
  },

  // Role-Based User Profile
  getProfile() {
    return Promise.resolve({
      roleTitle: 'CTO / Head of Engineering',
      permissionLevel: 'Executive Admin',
      avatarInitials: 'CTO',
      squadsLead: ['Core Platform', 'EVcare Mobile', 'Fleet IoT'],
      email: 'cto-office@innovibemobility.com'
    });
  },

  // Executive Overview Cards Data (Startup Scale)
  getExecutiveMetrics() {
    return Promise.resolve({
      activeProjects: { val: 5, sub: '2 In QA, 3 In Active Dev', trend: '+1 vs last month', isPositive: true },
      engineeringTeam: { val: 14, sub: '3 Squads (Core, Mobile, IoT)', trend: '92% Utilization', isPositive: true },
      sprintProgress: { val: '82%', sub: 'Sprint #18 (2 days left)', trend: '48/58 Pts Completed', isPositive: true },
      openBugs: { val: 7, sub: '1 Critical, 2 High, 4 Minor', trend: '-3 resolved today', isPositive: true },
      deploymentSuccess: { val: '98.8%', sub: '38 Deployments this month', trend: '+0.4% MoM', isPositive: true },
      systemUptime: { val: '99.94%', sub: 'AWS us-east-1 + Vercel SLA', trend: 'Target: 99.9%', isPositive: true },
      apiGatewayHealth: { val: '99.92%', sub: '1.2M daily reqs / 24ms latency', trend: 'Sub-30ms SLA', isPositive: true },
      cloudSpend: { val: '$4,250', sub: 'Monthly AWS + Supabase', trend: '-8% optimized', isPositive: true },
      fleetDataSync: { val: '2,850', sub: 'Connected EVs (100% Sync)', trend: 'LIVE MOCK STREAM', isSimulated: true }
    });
  },

  // Technology Ecosystem Services
  getEcosystemHealth() {
    return Promise.resolve([
      { name: 'Office Portal', domain: 'office.innovibemobility.com', status: 'Operational', latency: '18ms', uptime: '99.98%', tech: 'Next.js / Vercel' },
      { name: 'EVcare Consumer Mobile App', domain: 'iOS v2.4.0 & Android v2.4.1', status: 'Operational', latency: '32ms', uptime: '99.91%', tech: 'React Native / Expo (35k MAU)' },
      { name: 'B2B Fleet Hub API', domain: 'fleet-api.innovibemobility.com', status: 'Operational', latency: '24ms', uptime: '99.95%', tech: 'Node.js / Express Gateway' },
      { name: 'PostgreSQL Primary Cluster', domain: 'db-primary.internal', status: 'Operational', latency: '1.2ms', uptime: '99.99%', tech: 'Supabase DB (12/20 pool conns)' },
      { name: 'Telemetry MQTT Ingestion Engine', domain: 'mqtt.innovibemobility.com', status: 'Operational', latency: '4ms', uptime: '99.96%', tech: 'EMQX Broker / Redis Stream' },
      { name: 'OCPP 2.0.1 Charging Station Pipeline', domain: 'ocpp-gateway.internal', status: 'Degraded Sync', latency: '85ms', uptime: '98.50%', tech: 'Go Worker Nodes (140 Stations)' }
    ]);
  },

  // GitHub & Devops Recent Activity
  getRecentDeployments() {
    return Promise.resolve([
      { id: 'DEP-104', repo: 'innovibe/fleet-telemetry-service', env: 'production', status: 'Success', commit: 'a4f912c - Fix battery thermal alert handler', time: '18 mins ago', author: 'Lead DevOps Engineer' },
      { id: 'DEP-103', repo: 'innovibe/evcare-mobile-app', env: 'staging-testflight', status: 'Success', commit: 'e82b71d - Update charging session UI step', time: '1 hour ago', author: 'Mobile Tech Lead' },
      { id: 'DEP-102', repo: 'innovibe/core-platform-api', env: 'production', status: 'Success', commit: 'c1920ef - Add JWT refresh route & rate limit', time: '4 hours ago', author: 'Senior Backend Engineer' },
      { id: 'DEP-101', repo: 'innovibe/ocpp-charging-gateway', env: 'staging', status: 'Building', commit: 'f4019a2 - Retry logic for disconnect pings', time: 'Running (2m 14s)', author: 'IoT Systems Engineer' }
    ]);
  },

  // Code Reviews & High Priority Issues
  getPendingCodeReviews() {
    return Promise.resolve([
      { pr: '#142', title: 'Add battery state degradation forecasting model', repo: 'fleet-telemetry-service', author: 'Data Engineer Lead', status: 'Review Required', comments: 4 },
      { pr: '#139', title: 'Optimize Supabase database connection pooling', repo: 'core-platform-api', author: 'Senior Backend Engineer', status: 'Approved (1/2)', comments: 2 },
      { pr: '#135', title: 'Implement dark theme support for EVcare iOS/Android', repo: 'evcare-mobile-app', author: 'UI/UX Mobile Dev', status: 'Changes Requested', comments: 6 }
    ]);
  },

  // Development Squad Breakdown
  getSquads() {
    return Promise.resolve([
      { name: 'Core Platform & API', size: 5, lead: 'Senior Backend Engineer Lead', focus: 'API Gateway, Auth, Postgres, Billing' },
      { name: 'EVcare Mobile Team', size: 5, lead: 'Mobile Tech Lead', focus: 'iOS/Android App, Charging Payments, Remote Locks' },
      { name: 'Fleet IoT & Telemetry', size: 4, lead: 'IoT Systems Engineer Lead', focus: 'MQTT Ingestion, Telemetry DB, OCPP Station Sync' }
    ]);
  }
};
