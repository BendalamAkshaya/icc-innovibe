/**
 * InnoVibe Mobility CTO Portal - Shared Mock Data Layer (Phase 1 & cto2.mp4 Software Development Module)
 */

window.portalData = {
  // Navigation Module Definitions for routing & command search index
  modules: [
    { id: 'dashboard', name: 'Technology Dashboard', group: 'Core Platform', icon: 'fa-chart-line', desc: 'Enterprise technology governance, architectural oversight & decision intelligence' },
    { id: 'software-development', name: 'Software Development', group: 'Core Platform', icon: 'fa-code', desc: 'Software project portfolio governance, architectural risk analysis, and tech debt' },
    { id: 'product-roadmap', name: 'Product Roadmap', group: 'Core Platform', icon: 'fa-map', desc: 'Strategic roadmap execution timeline, resource allocation, and milestone tracking' },
    { id: 'sprint-management', name: 'Sprint Management', group: 'Core Platform', icon: 'fa-clock', desc: 'Active sprint execution, team velocity, capacity allocation, and timelines' },
    { id: 'bug-tracking', name: 'Bug Tracking', group: 'Core Platform', icon: 'fa-bug', desc: 'SLA resolution, critical issues tracking, and software quality metrics' },
    { id: 'feature-requests', name: 'Feature Requests', group: 'Core Platform', icon: 'fa-lightbulb', desc: 'Feature requests prioritizing roadmap alignment, impact, and engineering cost' },
    
    { id: 'api-management', name: 'API Management', group: 'Engineering & APIs', icon: 'fa-network-wired', desc: 'API gateway performance, endpoints, operational operations, and authentication' },
    { id: 'database-management', name: 'Database Management', group: 'Engineering & APIs', icon: 'fa-database', desc: 'Database health, data storage size, replication status, query performance, and clusters' },
    { id: 'cloud-infrastructure', name: 'Cloud Infrastructure', group: 'Engineering & APIs', icon: 'fa-cloud', desc: 'AWS/Cloud resources, EKS nodes cluster, auto-scaling, and cloud spend audit' },
    { id: 'devops-pipelines', name: 'DevOps & Pipelines', group: 'Engineering & APIs', icon: 'fa-infinity', desc: 'CI/CD pipeline builds, deployment pipeline stages, and releases validation' },
    { id: 'system-logs', name: 'System Logs', group: 'Engineering & APIs', icon: 'fa-scroll', desc: 'Monitor system events, operational activity, and application health signals across InnoVibe Mobility platforms' },
    { id: 'iot-device-management', name: 'IoT Device Management', group: 'Mobility & IoT Platforms', icon: 'fa-car-battery', desc: 'EV fleet telematics hardware, signal strength, vehicle state, and network' },
    { id: 'telemetry-platform', name: 'Telemetry Platform', group: 'Mobility & IoT Platforms', icon: 'fa-tower-broadcast', desc: 'Real-time vehicle data ingestion streams, queues, and TimescaleDB ingestion pipeline' },
    { id: 'evcare-ai-dashboard', name: 'EVcare.AI Dashboard', group: 'Mobility & IoT Platforms', icon: 'fa-wand-magic-sparkles', desc: 'EVcare AI fleet intelligence, health assessment, anomaly detection model' },
    { id: 'ai-diagnostics', name: 'AI Diagnostics', group: 'Mobility & IoT Platforms', icon: 'fa-heart-pulse', desc: 'Predictive battery thermal failure diagnostic ML models run simulations' },
    { id: 'mobile-app-management', name: 'Mobile App Management', group: 'Mobility & IoT Platforms', icon: 'fa-mobile-screen-button', desc: 'EVcare mobile driver app, active users (MAU), crash rate, App Store ratings' },
    { id: 'web-portal-management', name: 'Web Portal Management', group: 'Mobility & IoT Platforms', icon: 'fa-globe', desc: 'Web portal framework, content caching, CDN latency, domain SSL check' },
    
    { id: 'ai-models', name: 'AI Models', group: 'AI & ML Intelligence', icon: 'fa-brain', desc: 'AI perception and battery degradation models registry, training metrics' },
    { id: 'machine-learning', name: 'Machine Learning', group: 'AI & ML Intelligence', icon: 'fa-gears', desc: 'ML engineering pipelines, SageMaker GPU cluster training operations' },
    
    { id: 'cybersecurity', name: 'Cybersecurity', group: 'Security & Governance', icon: 'fa-user-shield', desc: 'Zero-trust security posture, ISO 26262 compliance, threat detection log' },
    { id: 'integrations', name: 'Integrations', group: 'Security & Governance', icon: 'fa-plug', desc: 'External integrations status, Stripe API, ChargePoint OpenADR, Mapbox routing' },
    { id: 'reports-analytics', name: 'Reports & Analytics', group: 'Security & Governance', icon: 'fa-file-invoice-dollar', desc: 'Financial technology dashboards, cost metrics, cost optimization briefs' },
    { id: 'document-repository', name: 'Document Repository', group: 'Security & Governance', icon: 'fa-folder-open', desc: 'Engineering documentation, architectural specifications, runbooks vault' },
    
    { id: 'notifications', name: 'Notifications', group: 'Administration', icon: 'fa-bell', desc: 'CTO communications alert logs, approval requests queue, and dispatch configurations' },
    { id: 'user-management', name: 'User Management', group: 'Administration', icon: 'fa-users-gear', desc: 'Identity access management, role permissions matrix, audit logs approval' },
    { id: 'system-configuration', name: 'System Configuration', group: 'Administration', icon: 'fa-sliders', desc: 'CTO workspace settings, integration keys, feature flags toggling' }
  ],

  // Mock Notifications for dropdown & dashboard list
  notifications: [
    { id: 'notif-1', title: 'Production API Gateway Latency Spike', type: 'critical', desc: 'API gateway latency spiked to 240ms under peak ingestion. gRPC migration review recommended.', time: '10 mins ago', read: false },
    { id: 'notif-2', title: 'AI Diagnostics Predictive Model Approved', type: 'success', desc: 'EVcare.AI battery thermal model v3.4 rollout approved for staging cluster by Dr. Elena Rostova.', time: '1 hour ago', read: false },
    { id: 'notif-3', title: 'SOC 2 Type II Compliance Audit Scheduled', type: 'warning', desc: 'Internal security scan flag: 3 Microservices using deprecated runtime. Security patch due before audit.', time: '4 hours ago', read: false },
    { id: 'notif-4', title: 'Stripe B2B Integration Connection Restored', type: 'success', desc: 'Dynamic webhook connection state back to 100% SLA uptime after DNS sync update.', time: '1 day ago', read: false }
  ],

  // Core Dashboard KPI Data (matching the reference video at 04:30)
  dashboardKPIs: {
    primary: [
      { id: 'health-score', title: 'Technology Health Score', value: '98.6%', trend: '+0.4%', icon: 'fa-heart-pulse', color: 'green', desc: '48/48 active microservices' },
      { id: 'system-status', title: 'System Status', value: '99.99%', trend: 'Optimal', icon: 'fa-shield-halved', color: 'blue', desc: '45 Days Incident-Free' },
      { id: 'production-env', title: 'Production Env', value: 'v3.4.0 Active', trend: 'Release Track', icon: 'fa-rocket', color: 'purple', desc: 'Latest baseline deployment' },
      { id: 'data-sync', title: 'Data Synchronization', value: 'Synced 2s ago', trend: 'Real-time Ingress', icon: 'fa-arrows-rotate', color: 'grey', desc: 'Telemetry stream operational' }
    ],
    secondary: [
      { id: 'active-projects', title: 'Active Projects', value: '8', trend: '8 Active Initiatives', icon: 'fa-diagram-project', color: 'blue' },
      { id: 'sprint-progress', title: 'Sprint Progress', value: '87%', trend: 'Sprint 42 (Active)', icon: 'fa-clock', color: 'purple' },
      { id: 'open-bugs', title: 'Open Bugs', value: '18', trend: '12 Critical, 6 Low', icon: 'fa-bug', color: 'orange' },
      { id: 'deployment-success', title: 'Deployment Success', value: '99.4%', trend: '98 Releases Passed', icon: 'fa-circle-check', color: 'green' },
      { id: 'team-productivity', title: 'Team Productivity', value: '94.2', trend: 'All Squads Engaged', icon: 'fa-chart-simple', color: 'blue' },
      { id: 'system-uptime', title: 'System Uptime', value: '99.99%', trend: 'SLA Compliant', icon: 'fa-server', color: 'green' },
      { id: 'api-latency', title: 'API Health & Latency', value: '42ms', trend: '14.2M Daily Requests', icon: 'fa-network-wired', color: 'blue' },
      { id: 'cloud-usage', title: 'Cloud Resource Usage', value: '$42.8K', trend: '-4% Budget Opt', icon: 'fa-cloud', color: 'purple' }
    ]
  },

  // ==========================================================
  // SOFTWARE DEVELOPMENT MODULE SPECIFIC DATA (cto2.mp4 EXACT DETAILS)
  // ==========================================================
  
  // Section 1: 5 Premium KPI Cards matching cto2.mp4 exactly
  softDevKPIs: [
    { id: 'active-projects', title: 'Active Projects', value: '8', support: '8 Active Projects', trend: 'On Track', trendClass: 'positive', change: '+1', icon: 'fa-diagram-project', color: 'blue' },
    { id: 'dev-teams', title: 'Development Teams', value: '6', support: '6 Engineering Teams', trend: 'Allocated', trendClass: 'neutral', change: '0', icon: 'fa-users', color: 'purple' },
    { id: 'developers-count', title: 'Developers', value: '42', support: '42 developers', trend: 'Max Load', trendClass: 'negative', change: '+3', icon: 'fa-code', color: 'green' },
    { id: 'current-releases', title: 'Current Releases', value: '5', support: '5 Upcoming Releases', trend: 'On Track', trendClass: 'positive', change: 'v3.4.0', icon: 'fa-rocket', color: 'blue' },
    { id: 'health-score', title: 'Health Score', value: '94%', support: '94% Healthy', trend: 'Optimal', trendClass: 'positive', change: '+1.5%', icon: 'fa-heart-pulse', color: 'green' }
  ],

  // Section 2: Product Portfolio Table Rows in cto2.mp4
  projectsList: [
    { id: 'dev-1', name: 'EVcare.AI Platform', owner: 'Backend & AI', tech: 'React, Flutter, Python, AWS', status: 'Healthy', progress: 82, version: 'v3.4' },
    { id: 'dev-2', name: 'Mobile Application (iOS/Android)', owner: 'Mobile Squad', tech: 'Flutter, Swift, Kotlin, BLE, REST', status: 'Needs Attention', progress: 74, version: 'v2.8' },
    { id: 'dev-3', name: 'Web Portal (office.innovibemobility.com)', owner: 'Frontend Team', tech: 'React, Node.js, HTML5, CSS3, REST', status: 'Healthy', progress: 96, version: 'v3.4' },
    { id: 'dev-4', name: 'Fleet Management Platform', owner: 'EV Telematics Team', tech: 'Go, Kafka, TimescaleDB, gRPC', status: 'Healthy', progress: 88, version: 'v2.4' },
    { id: 'dev-5', name: 'Internal Enterprise Systems', owner: 'Cloud Infra Team', tech: 'Rust, PostgreSQL, Docker', status: 'Critical', progress: 65, version: 'v1.9' }
  ],

  // Section 2 Dynamic Drawer data matching Slide 00:08 exactly
  projectDrawerData: {
    'dev-1': {
      name: 'EVcare.AI Platform',
      status: 'Healthy',
      lead: 'Dr. Sarah Jenkins (Principal AI Architect)',
      teams: 'Backend AI Team / ML Squad',
      teamSize: '15 Engineers (8 Backend, 4 ML, 2 DevOps, 1 QA Engineer)',
      arch: {
        frontend: 'React 18 / Flutter Mobile SDK',
        backend: 'Python 3.12 (PyTorch Inference Engine & FastAPI)',
        database: 'PostgreSQL & TimescaleDB',
        cloud: 'AWS EKS (East Cluster) / 1000 GPU Pods',
        integrations: 'ChargePoint API, EVcare Mobile App, OpenADR 2.0'
      },
      devHealth: {
        delivery: 'On Track',
        quality: '92/100',
        stability: '99.8%',
        reliability: '99.9%'
      },
      risks: {
        risk: 'CPU/Memory Allocation Spike during peak tariff hours.',
        impact: 'Medium (Potential 200ms latency increase on inference queries).',
        recommendation: 'Enable dynamic PyTorch HPA auto-scale policy on AWS EKS.'
      },
      activity: {
        deploy: 'Canary build v3.4 deployed to US-East (42 mins ago)',
        code: 'PyTorch inference model weight coefficients v3.4 updated (2 days ago)',
        system: 'Added gRPC streaming buffer pool compression (5 days ago)'
      }
    },
    'dev-2': {
      name: 'Mobile Application (iOS/Android)',
      status: 'Needs Attention',
      lead: 'Marcus Chen (Mobile Squad Lead)',
      teams: 'Mobile Core Squad',
      teamSize: '10 Engineers (6 iOS/Android, 2 QA, 2 Integrations)',
      arch: {
        frontend: 'Flutter Mobile SDK',
        backend: 'REST API, Node Gateway',
        database: 'SQLite local cache',
        cloud: 'AWS API Gateway',
        integrations: 'Mapbox Navigation, Zero-Trust Auth Proxies'
      },
      devHealth: {
        delivery: 'Slowing down',
        quality: '80/100',
        stability: '98.5%',
        reliability: '97.2%'
      },
      risks: {
        risk: 'BLE pairing latency increased by 240ms on modern iOS builds.',
        impact: 'Medium (Potential handshake loop timeouts).',
        recommendation: 'Reallocate 2 QA engineers to Mobile squad to assist pairing stress-tests.'
      },
      activity: {
        deploy: 'Staging build v2.8-beta deployed (2 hours ago)',
        code: 'BLE handshake response wrapper patched (1 day ago)',
        system: 'Automatic rollbacks testing enabled (4 days ago)'
      }
    },
    'dev-3': {
      name: 'Web Portal',
      status: 'Healthy',
      lead: 'Priya Sharma (Frontend Lead)',
      teams: 'Frontend UX Team',
      teamSize: '8 Engineers (5 Frontend, 2 Designer, 1 QA)',
      arch: {
        frontend: 'React 18 / Next.js Framework',
        backend: 'Node.js Express microservices',
        database: 'Redis caching layer',
        cloud: 'Vercel Edge Network',
        integrations: 'Stripe API payments'
      },
      devHealth: {
        delivery: 'On Track',
        quality: '96/100',
        stability: '99.99%',
        reliability: '100%'
      },
      risks: {
        risk: 'Static site generation caching delay on large coordinate logs.',
        impact: 'Low (Minor layout rendering speed impact).',
        recommendation: 'Migrate static pages framework to Edge Networks caching.'
      },
      activity: {
        deploy: 'Release build v3.3.8 promoted to production (Yesterday)',
        code: 'Stripe webhooks DNS check configuration updated (2 days ago)',
        system: 'Edge routing rules updated successfully (5 days ago)'
      }
    }
  },

  // Section 3: Technology Stack Overview Cards data in cto2.mp4
  techStackOverview: [
    { title: 'FRONTEND', main: 'React <span class="badge badge-info" style="font-size:0.68rem;">v18.3</span>', sub: 'Used by 6 Applications', items: ['Flutter v3.22 (Used by 2 Mobile Apps)', 'HTML5 / CSS3 (Used by 4 Services)', 'Tailwind CSS (Used by 3 Portals)'] },
    { title: 'BACKEND', main: 'Python <span class="badge badge-info" style="font-size:0.68rem;">v3.12</span>', sub: 'Used by 5 Services', items: ['Go v1.22 (Used by 5 Services)', 'Node.js Express (Used by 4 microservices)', 'Rust v1.8 (Used by 1 Core Service)'] },
    { title: 'DATABASE', main: 'PostgreSQL <span class="badge badge-info" style="font-size:0.68rem;">v16.2</span>', sub: 'Used by 4 Instances', items: ['TimescaleDB v2.15 (Used by 2 Clusters)', 'Redis v7.2 (Used by 3 Clusters)', 'MongoDB (Used by 1 Logs Instance)'] },
    { title: 'CLOUD & AI/ML', main: 'AWS EKS <span class="badge badge-info" style="font-size:0.68rem;">v1.30</span>', sub: 'Used by 12 Workloads', items: ['PyTorch v2.3 (Used by 3 AI Models)', 'TensorFlow v2.16 (Used by 1 AI Model)', 'Vercel Edge Networks (Used by 2 Portals)'] }
  ],

  // Section 4: Application Environment Status & Engineering Activity Summary in cto2.mp4
  environments: [
    { name: 'Production Environment', status: 'Healthy', statusClass: 'success', availability: '99.99%', version: 'v3.4.0', desc: '38 Services Live &bull; Last Deploy 2 hours ago' },
    { name: 'Testing / Staging Environment', status: 'Healthy', statusClass: 'success', availability: '99.8%', version: 'v3.5.0-rc2', desc: '32 Services Live &bull; Last Deploy 45 mins ago' },
    { name: 'Development Environment', status: 'Healthy', statusClass: 'success', availability: '99.5%', version: 'v3.6.0-dev', desc: 'Sandbox Active &bull; Zero downtime' }
  ],

  engineeringActivity: [
    { title: 'Technology / Upgrade', desc: 'EVcare AI backend upgraded to Python 3.12', time: '2 hours ago' },
    { title: 'Latest Deployment', desc: 'New mobile version v2.8.1 deployed successfully', time: '4 hours ago' },
    { title: 'Major System Update', desc: 'Kafka partition auto-rebalancing enabled', time: '6 hours ago' },
    { title: 'Architecture Change', desc: 'mTLS RS256 token validation implemented', time: '8 hours ago' }
  ],

  // Section 5: Engineering Health Insights & CTO Attention Center in cto2.mp4
  healthInsights: [
    { label: 'Code Quality', score: '92 / 100', desc: 'SonarQube Rated A' },
    { label: 'Deployment Stability', score: '99.8%', desc: '0 Rollback Events' },
    { label: 'System Reliability', score: '99.9%', desc: 'SLA Compliant' },
    { label: 'Technical Debt', score: 'Low', desc: '20 Hours Debt' }
  ],

  attentionCenter: [
    { title: 'Backend service scaling requires release before next peak.', priority: 'Critical', action: 'Scale Backend Service' },
    { title: 'Mobile application performance decreased on iOS.', priority: 'Warning', action: 'Reallocate Mobile QA' },
    { title: 'Cloud migration completed successfully.', priority: 'Positive', action: 'View Cloud Metrics' }
  ],

  // Section 6: AI Engineering Intelligence & Recommendations
  aiRecommendations: [
    { title: 'Performance Insight', desc: 'Backend response time increased by 10% on core API endpoints during peak tariff hours.', recommendation: 'Review REST API query caching and database index optimization.', priority: 'Medium Impact' },
    { title: 'Technical Risk Alert', desc: 'Mobile application BLE pairing handshake latency spiked by 240ms on iOS 18.', recommendation: 'Reallocate 2 QA engineers to Mobile team.', priority: 'High Impact' },
    { title: 'Cost Optimization Opportunity', desc: 'Idle AWS EKS cluster pods represent $3,200/month excess cloud spend.', recommendation: 'Enable dynamic pod auto-scaling policies on AWS.', priority: 'Cost Savings' }
  ],

  // ==========================================================
  // SYSTEM CONFIGURATION MODULE SPECIFIC DATA (cto2.mp4 EXACT DETAILS)
  // ==========================================================
  systemConfig: {
    landscape: [
      { id: 'sys-1', title: 'ENTERPRISE APPLICATIONS', name: 'Microservices & OAuth SSO', status: 'Synchronized', statusClass: 'success', env: 'Production', time: '2 hours ago', health: 'Optimal', healthClass: 'success', owner: 'Identity & Access Team', deps: 'Stripe API, Database, Telemetry', params: 'SSO enabled, Node.js 20, 14 Gateway rules active' },
      { id: 'sys-2', title: 'CLOUD PLATFORMS', name: 'AWS EKS & Transit Gateway', status: 'Pending Change', statusClass: 'warning', env: 'Production', time: '12 mins ago', health: 'Warning (Capacity)', healthClass: 'warning', owner: 'CloudOps Squad (Alex Rivera)', deps: 'Docker Hub, VPC Gateways', params: 'Kubernetes v1.30, 32 Max Nodes limit, VPC Peering active' },
      { id: 'sys-3', title: 'DATABASES', name: 'CockroachDB & TimescaleDB', status: 'Synchronized', statusClass: 'success', env: 'Production', time: '1 day ago', health: 'Optimal', healthClass: 'success', owner: 'Database Admins', deps: 'AWS EKS Core Cluster', params: 'TimescaleDB v2.15, Postgres v16, multi-region replication ok' },
      { id: 'sys-4', title: 'AI SYSTEMS', name: 'SageMaker & PyTorch Models', status: 'Synchronized', statusClass: 'success', env: 'Production', time: '1 day ago', health: 'Optimal', healthClass: 'success', owner: 'ML Engineering Squad', deps: 'AWS S3, PyTorch, SageMaker', params: 'PyTorch v2.3 model weight caching, spot GPU instance config' },
      { id: 'sys-5', title: 'MOBILE PLATFORMS', name: 'iOS & Android Fleet Apps', status: 'Synchronized', statusClass: 'success', env: 'Production', time: '1 day ago', health: 'Optimal', healthClass: 'success', owner: 'Mobile Core Squad', deps: 'REST API, Mapbox, Telemetry MQTT', params: 'Flutter v3.22 SDK, local SQL cache enabled' },
      { id: 'sys-6', title: 'WEB PLATFORMS', name: 'CTO Dashboard & Portals', status: 'Synchronized', statusClass: 'success', env: 'Production', time: '3 days ago', health: 'Optimal', healthClass: 'success', owner: 'Frontend UX Team', deps: 'Next.js Express core services', params: 'React 18.3, edge caching, Node.js runtime environment' }
    ],
    workspace: [
      { category: 'Application Configuration', badge: 'App Level', badgeClass: 'info', line1: 'Feature Flags: Passkey WebAuthn MFA, OTA Firmware Gating', line2: 'Parameters: API Rate Limits (10k req/min), Log Level (INFO)' },
      { category: 'Infrastructure Configuration', badge: 'Platform Level', badgeClass: 'warning', line1: 'Resource Settings: AWS EKS Node Pool (Max 32 Nodes), VPC Peering', line2: 'Platform Parameters: Kubernetes v1.30, Pod Auto-Healing Rules' },
      { category: 'Integration Configuration', badge: 'Gateway Level', badgeClass: 'grey', line1: 'Connection Settings: Stripe Webhook Callback, ChargePoint OpenADR 2.0', line2: 'Service Rules: Webhook Retry Queue Backoff (Exponential, Max 5 Retries)' },
      { category: 'Security Configuration', badge: 'Zero Trust', badgeClass: 'success', line1: 'Access Policies: Passkey WebAuthn MFA Mandatory, JIT 4-Hour Expiry', line2: 'Security Parameters: TLS 1.3 Strict Enforce, KMS Envelope Keys' }
    ],
    environments: [
      { name: 'Production', version: 'v3.4', rateLimit: '10,000 req/min', readiness: '100% Operational', readinessClass: 'success', diff: 'API Rate Limit: 10,000 req/min', hasDiff: false, actionLabel: 'Rollback' },
      { name: 'Testing', version: 'v3.5', rateLimit: '15,000 req/min', readiness: '95% Deploy Ready', readinessClass: 'success', diff: 'Difference: New API rate-limiting buffer & autoscale parameters pending review.', hasDiff: true, actionLabel: 'Approve Migration' },
      { name: 'Development', version: 'v3.6-dev', rateLimit: '25,000 req/min', readiness: 'Active Sandbox', readinessClass: 'grey', diff: 'Pending Changes: OpenADR 2.0 XML parser upgrade in active sprint testing.', hasDiff: true, actionLabel: 'Promote to Test' }
    ],
    governance: [
      { id: 'gov-1', title: 'AWS EKS AUTOSCALE EXPANSION (+8 NODES)', risk: 'Medium Risk', riskClass: 'warning', system: 'Cloud Infrastructure (AWS EKS Kubernetes)', owner: 'CloudOps Squad (Alex Rivera)', status: 'Pending CTO Approval', statusClass: 'warning' },
      { id: 'gov-2', title: 'STRIPE WEBHOOK RETRY WORKER CAPACITY', risk: 'Low Risk', riskClass: 'success', system: 'Partner Integration Gateway', owner: 'Partner Integrations Squad', status: 'In Technical Review', statusClass: 'info' },
      { id: 'gov-3', title: 'PASSKEY WEBAUTHN MFA MANDATORY POLICY', risk: 'Low Risk', riskClass: 'success', system: 'Identity & Security Access Provider', owner: 'SecOps Squad (Lead CISO)', status: 'Pending CTO Sign-off', statusClass: 'warning' }
    ],
    policies: [
      { title: 'System Standards', text: 'Standardized Docker runtime, Kubernetes 1.30 manifests & Protobuf gRPC schemas.', action: 'Update Standards' },
      { title: 'Configuration Policies', text: 'Zero-Trust mTLS enforcement & mandatory 90-day B2B API key auto-rotation.', action: 'Review Compliance' },
      { title: 'Default Settings', text: 'Fallback API rate limits (10k req/min) & multi-region DB failover timeouts.', action: 'Update Settings' },
      { title: 'Technology Guidelines', text: 'Cloud architecture guidelines & microservice production release checklists.', action: 'Review Guidelines' }
    ],
    insights: [
      { title: 'ENVIRONMENT MISMATCH', obs: 'Configuration mismatch detected between testing and production.', impact: 'Deployment risk increased.', rec: 'Synchronize environment settings.', action: 'Review' },
      { title: 'UNUSED CONFIGURATIONS', obs: 'Unused configurations identified across legacy REST API gateway.', impact: 'System complexity increased.', rec: 'Remove outdated settings.', action: 'Optimize' },
      { title: 'CLUSTER AUTO-HEALING', obs: 'EKS node pool auto-healing parameters synchronized across all regions.', impact: 'Zero drift detected.', rec: 'Maintain current configuration policy.', action: 'Acknowledge' },
      { title: 'MTLS SECURITY ENFORCEMENT', obs: 'TLS 1.3 encryption policy enforced on 100% of internal microservices.', impact: 'Zero unencrypted internal traffic.', rec: 'Lock security configuration.', action: 'Lock Config' }
    ]
  },

  // ==========================================================
  // IDENTITY & ACCESS GOVERNANCE CENTER DATA (cto2.mp4 DETAILS)
  // ==========================================================
  identityAccess: {
    summary: {
      activeUsers: '142 Users',
      activeUsersSub: '100% Passkey SSO Active',
      squads: '8 Squads',
      squadsSub: 'CloudOps, Mobile, AI, SecOps',
      definedRoles: '7 Defined Roles',
      definedRolesSub: 'CEO → Employee Hierarchy',
      tiers: '4 Tiers',
      tiersSub: 'Super Admin to Standard',
      activeSystems: '18 Services',
      activeSystemsSub: 'RBAC & mTLS Gated'
    },
    roles: [
      {
        id: 'role-cto',
        title: 'CTO Role',
        badge: 'Super Admin',
        badgeClass: 'success',
        users: '1 User (Dr. Geetha)',
        permissions: [
          'Technology Dashboard & Executive Command Center',
          'Cloud Infrastructure & EKS Cluster Autoscale',
          'API Management & Gateway Rate Limiting',
          'System Configuration & Identity Access Control'
        ]
      },
      {
        id: 'role-ceo',
        title: 'CEO / Executive Role',
        badge: 'Executive Suite',
        badgeClass: 'info',
        users: '3 Users (Executive Board)',
        permissions: [
          'Executive Reports & Technology Intelligence Summary',
          'Financial Cost Optimization & Strategy Dashboards',
          'Governance & Compliance Audit Summaries',
          'Restricted: Microservice CLI & Root Cluster Access'
        ]
      },
      {
        id: 'role-engineering',
        title: 'Engineering Teams Role',
        badge: 'Developer Privileged',
        badgeClass: 'warning',
        users: '58 Squad Engineers',
        permissions: [
          'CI/CD Release Pipelines & GitHub Repository Controls',
          'Staging Kubernetes Pods & PyTorch SageMaker Endpoints',
          'Telemetry Stream Monitoring & Prometheus Alerts',
          'Time-bound Production DB Read Access'
        ]
      }
    ],
    users: [
      {
        id: 'u-1',
        name: 'Dr. Sarah Jenkins',
        email: 's.jenkins@innovibemobility.com',
        department: 'Software Engineering',
        designation: 'Lead Architect',
        badgeClass: 'info',
        systems: 'EKS, CI/CD, Microservices API, Web Portal',
        status: 'Active Passkey',
        statusClass: 'success',
        lastLogin: '10 mins ago',
        actions: ['Update Role', 'Modify Access'],
        history: [
          { time: '10 mins ago', action: 'Login via Passkey (Windows Hello)' },
          { time: '2 hours ago', action: 'Approved CI/CD deployment pipeline configuration' },
          { time: '1 day ago', action: 'Modified OAuth SSO redirection parameters' }
        ]
      },
      {
        id: 'u-2',
        name: 'Alex Rivera',
        email: 'a.rivera@innovibemobility.com',
        department: 'Cloud Infrastructure',
        designation: 'CloudOps Admin',
        badgeClass: 'success',
        systems: 'AWS VPC, EKS Cluster Root, CockroachDB, Transit Gateway',
        status: 'Privileged Active',
        statusClass: 'success',
        lastLogin: '45 mins ago',
        actions: ['Update Role', 'Modify Access'],
        history: [
          { time: '45 mins ago', action: 'Elevated session to EKS Cluster Root' },
          { time: '3 hours ago', action: 'Configured VPC Peering between Dev and Staging' },
          { time: '2 days ago', action: 'Rotated AWS root IAM keys (authorized by CTO)' }
        ]
      },
      {
        id: 'u-3',
        name: 'Dr. Elena Rostova',
        email: 'e.rostova@innovibemobility.com',
        department: 'AI & ML Engineering',
        designation: 'AI Research Lead',
        badgeClass: 'info',
        systems: 'SageMaker GPU Pods, PyTorch ML Pipeline, TimescaleDB',
        status: 'Active Passkey',
        statusClass: 'success',
        lastLogin: '1 hour ago',
        actions: ['Update Role', 'Modify Access'],
        history: [
          { time: '1 hour ago', action: 'Login via Passkey (TouchID)' },
          { time: '5 hours ago', action: 'Deactivated PyTorch v2.1 legacy SageMaker endpoint' },
          { time: '3 days ago', action: 'Approved access request for AI diagnostics training sets' }
        ]
      },
      {
        id: 'u-4',
        name: 'Marcus Vance',
        email: 'm.vance@contractor.innovibemobility.com',
        department: 'DevOps Contracting',
        designation: 'DevOps Specialist',
        badgeClass: 'warning',
        systems: 'Jenkins CI/CD, Prometheus Monitoring, Staging Pods',
        status: 'Audit Review Due',
        statusClass: 'warning',
        lastLogin: '1 day ago',
        actions: ['Update Role', 'Disable'],
        history: [
          { time: '1 day ago', action: 'Triggered Jenkins build pipeline' },
          { time: '4 days ago', action: 'Requested permanent admin privilege expansion' },
          { time: '7 days ago', action: 'Created staging pods autoscale configs' }
        ]
      }
    ],
    requests: [
      {
        id: 'req-1',
        title: 'PRODUCTION DATABASE ACCESS',
        impact: 'High Impact',
        impactClass: 'warning',
        requester: 'Senior Backend Developer (Data Squad)',
        scope: 'CockroachDB Multi-Region Read-Replica SQL access.',
        reason: 'Troubleshoot transient replication lag during Q3 sprint.',
        status: 'Pending CTO Approval',
        statusClass: 'warning'
      },
      {
        id: 'req-2',
        title: 'EKS CLUSTER ROOT ACCESS',
        impact: 'Critical Impact',
        impactClass: 'warning',
        requester: 'CloudOps Specialist (Contractor)',
        scope: 'AWS EKS Root kubectl administrative cluster context.',
        reason: 'Perform node pool autoscale policy upgrade.',
        status: 'Pending CTO Approval',
        statusClass: 'warning'
      },
      {
        id: 'req-3',
        title: 'STRIPE API WEBHOOK KEY ROTATION',
        impact: 'Medium Impact',
        impactClass: 'info',
        requester: 'Partner Integration Lead',
        scope: 'Production Stripe B2B payment webhook secret rotation.',
        reason: 'Scheduled 90-day security key rotation cycle.',
        status: 'Pending CTO Approval',
        statusClass: 'warning'
      }
    ],
    controlCenter: [
      {
        category: 'User Management',
        badge: 'Identity Governance',
        badgeClass: 'success',
        text: 'Provision user identities, assign organizational roles, revoke access credentials, and manage active user status.',
        actions: ['Create Users', 'Assign Roles', 'Remove Access']
      },
      {
        category: 'Permission Management',
        badge: 'Feature Control',
        badgeClass: 'info',
        text: 'Approve granular feature permissions, modify system access scopes, and conduct privileged access reviews.',
        actions: ['Approve Permissions', 'Modify Feature Access', 'Review Privileged Access']
      },
      {
        category: 'Governance & Compliance',
        badge: 'SOC2 Certified',
        badgeClass: 'grey',
        text: 'Conduct periodic access reviews, manage access governance policies, and ensure Zero-Trust least-privilege access standards.',
        actions: ['Conduct Access Review', 'Manage Policies', 'Ensure Least Privilege']
      }
    ],
    risks: [
      {
        title: 'UNNECESSARY ADMIN PRIVILEGES',
        level: 'High Risk',
        levelClass: 'warning',
        risk: 'User Marcus Vance has unreviewed root EKS administrative privileges.',
        impact: 'Potential access control vulnerability and compliance audit flag.',
        rec: 'Enforce time-bound Just-In-Time (JIT) access scope.'
      },
      {
        title: 'DORMANT ACCOUNTS DETECTED',
        level: '12 Accounts',
        levelClass: 'warning',
        risk: '12 contractor identity profiles have been inactive for over 90 days.',
        impact: 'Unnecessary attack surface exposure and orphan credentials.',
        rec: 'Revoke dormant credentials and enforce auto-expiry.'
      },
      {
        title: 'EXCESSIVE PARTNER PERMISSIONS',
        level: 'Medium Risk',
        levelClass: 'warning',
        risk: 'External partner B2B API service account has unrestricted DB read scope.',
        impact: 'Over-privileged third-party integration access.',
        rec: 'Enforce strict least privilege API endpoint scoping.'
      }
    ],
    insights: [
      {
        title: 'ROLE OVERLAP',
        obs: 'Multiple users have overlapping permissions.',
        impact: 'Access complexity increased.',
        rec: 'Review role structure.',
        action: 'Optimize Roles'
      },
      {
        title: 'DORMANT ACCOUNTS',
        obs: 'Inactive accounts detected.',
        impact: 'Unnecessary access exposure.',
        rec: 'Review account status.',
        action: 'Take Action'
      },
      {
        title: 'PRIVILEGED SURGE',
        obs: 'Privileged access tokens requested outside standard hours.',
        impact: 'Increased baseline risk metrics.',
        rec: 'Verify anomalous activity report.',
        action: 'Verify Access'
      },
      {
        title: 'PASSKEY MFA ADOPTION',
        obs: 'Passkey multi-factor authentication not enforced on 6 legacy service integrations.',
        impact: 'Potential credential theft risk.',
        rec: 'Enforce passkey mTLS constraints.',
        action: 'Enforce MFA'
      }
    ]
  },

  // ==========================================================
  // DOCUMENT REPOSITORY MODULE SPECIFIC DATA (cto2.mp4 STYLE)
  // ==========================================================
  docRepository: {
    categories: [
      { id: 'cat-1', type: 'ARCHITECTURE DOCUMENTS', title: 'System, DB & Cloud Schemas', scope: '14 Active Specifications', status: '2 Pending Review', statusClass: 'warning', lead: 'CloudOps Squad' },
      { id: 'cat-2', type: 'ENGINEERING DOCUMENTATION', title: 'Dev Guidelines & API Specs', scope: '28 Active Specifications', status: '1 Pending Review', statusClass: 'warning', lead: 'Platform Squad' },
      { id: 'cat-3', type: 'OPERATIONS DOCUMENTATION', title: 'Deploy Procedures & Runbooks', scope: '22 Active Runbooks', status: 'All Up to Date', statusClass: 'success', lead: 'DevOps Squad' },
      { id: 'cat-4', type: 'SECURITY DOCUMENTATION', title: 'Compliance & Audit Records', scope: '18 Certified Documents', status: '1 CTO Review Due', statusClass: 'warning', lead: 'SecOps/CISO' },
      { id: 'cat-5', type: 'BUSINESS TECH DOCUMENTS', title: 'Tech Decisions (ADRs) & Vendors', scope: '12 Strategy Records', status: '1 Pending Sign-off', statusClass: 'info', lead: 'CTO Board' }
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'EVcare Real-Time Fleet Telemetry Architecture Spec',
        category: 'Architecture',
        categoryClass: 'info',
        owner: 'CloudOps Squad (Alex Rivera)',
        version: 'v3.4',
        updated: '2 hours ago',
        status: 'Approved',
        statusClass: 'success',
        purpose: 'Defines the sub-second IoT ingestion parameters and Kafka partition auto-rebalancing schema for vehicle telemetry stream.',
        deps: 'EVcare.AI backend, Telemetry MQTT broker, CockroachDB telemetry logs instance',
        created: '2026-01-10',
        lastReview: '2026-08-01',
        nextReview: '2026-11-01',
        history: [
          { version: 'v3.4', date: '2 hours ago', desc: 'Updated Kafka cluster connection strings', author: 'Alex Rivera' },
          { version: 'v3.3', date: '1 month ago', desc: 'Scaled partitions from 12 to 24 for peak load support', author: 'Alex Rivera' }
        ]
      },
      {
        id: 'doc-2',
        name: 'Passkey WebAuthn MFA Integration Security Standard',
        category: 'Security',
        categoryClass: 'grey',
        owner: 'SecOps Squad (Lead CISO)',
        version: 'v2.1',
        updated: '1 day ago',
        status: 'Pending CTO Review',
        statusClass: 'warning',
        purpose: 'Implements mandatory biometric credentials and FIDO2 authentication standards across all internal portals.',
        deps: 'Identity & Security Access Provider, OAuth SSO gateways',
        created: '2026-03-15',
        lastReview: '2026-03-15',
        nextReview: '2026-09-15',
        history: [
          { version: 'v2.1', date: '1 day ago', desc: 'Enforced hardware security key fallback options', author: 'Lead CISO' },
          { version: 'v2.0', date: '2 months ago', desc: 'Initial baseline release of biometric auth protocols', author: 'Lead CISO' }
        ]
      },
      {
        id: 'doc-3',
        name: 'PyTorch Battery Thermal Anomaly ML Model',
        category: 'Engineering',
        categoryClass: 'info',
        owner: 'AI Research Squad',
        version: 'v1.8',
        updated: '3 days ago',
        status: 'Approved',
        statusClass: 'success',
        purpose: 'Describes PyTorch neural network layer weights, thermal anomaly diagnostic parameters, and GPU execution pipelines.',
        deps: 'AI Diagnostics core, SageMaker inference cluster, AWS S3 storage buckets',
        created: '2026-02-20',
        lastReview: '2026-07-20',
        nextReview: '2026-10-20',
        history: [
          { version: 'v1.8', date: '3 days ago', desc: 'Fine-tuned convolution layers weights caching configs', author: 'Dr. Sarah Jenkins' }
        ]
      },
      {
        id: 'doc-4',
        name: 'Staging Kubernetes Pod Auto-Healing Operations Runbook',
        category: 'Operations',
        categoryClass: 'warning',
        owner: 'DevOps Squad',
        version: 'v4.0',
        updated: '5 days ago',
        status: 'Approved',
        statusClass: 'success',
        purpose: 'Step-by-step procedure to manage EKS autoscale failures, node reboots, and self-healing daemon status logs.',
        deps: 'AWS EKS cluster core, Prometheus alertmanager rules',
        created: '2025-11-05',
        lastReview: '2026-07-28',
        nextReview: '2026-10-28',
        history: [
          { version: 'v4.0', date: '5 days ago', desc: 'Rewrote recovery verification commands for k8s 1.30', author: 'DevOps Lead' }
        ]
      }
    ],
    governance: [
      {
        category: 'Documentation Control',
        badge: 'Standards & Guidelines',
        badgeClass: 'success',
        text: 'Approve important technology documents, review architecture decisions, approve standards and guidelines, and request updates.',
        actions: ['Approve Standards', 'Review Decisions', 'Request Updates']
      },
      {
        category: 'Knowledge Management',
        badge: 'Ecosystem Ownership',
        badgeClass: 'info',
        text: 'Assign document owners, set review schedules, track outdated documents, and maintain technology standards.',
        actions: ['Assign Owners', 'Set Review Schedule', 'Track Outdated']
      },
      {
        category: 'Architecture Governance',
        badge: 'Proposals Review',
        badgeClass: 'grey',
        text: 'Review architecture proposals, approve technical decisions (ADRs), and maintain system documentation baselines.',
        actions: ['Review Proposals', 'Approve ADRs', 'Verify Baselines']
      }
    ],
    workflow: [
      { id: 'wf-1', name: 'API Gateway mTLS Architecture Draft', status: 'Pending Review', priority: 'High Priority', priorityClass: 'warning', time: 'CTO Review Due' },
      { id: 'wf-2', name: 'EV Telemetry Mapping Runbook', status: 'Upcoming Review', priority: 'Standard', priorityClass: 'info', time: 'Expires in 12 days' },
      { id: 'wf-3', name: 'Vendor API Specification v1.2', status: 'Expired Document', priority: 'High Priority', priorityClass: 'warning', time: 'Expired 5 days ago' }
    ],
    insights: [
      {
        title: 'ARCHITECTURE REVIEW',
        obs: '15 architecture documents have not been reviewed recently.',
        impact: 'Technical knowledge may become outdated.',
        rec: 'Schedule documentation reviews.',
        action: 'Create Review Plan'
      },
      {
        title: 'OUTDATED API REFERENCES',
        obs: 'Multiple documents contain outdated API references.',
        impact: 'Development teams may face integration issues.',
        rec: 'Update technical documentation.',
        action: 'Assign Team'
      },
      {
        title: 'COMPLIANCE AUDIT EXPOSURE',
        obs: '3 ISO 26262 compliance records are expiring within 30 days.',
        impact: 'Compliance risk exposure.',
        rec: 'Re-audit safety documentation standards.',
        action: 'Initiate Audit'
      },
      {
        title: 'ORPHANED OWNERS',
        obs: '2 documents have owner teams that no longer exist.',
        impact: 'Orphaned documentation governance.',
        rec: 'Reassign owners.',
        action: 'Reassign Owners'
      }
    ]
  },

  // ==========================================================
  // REPORTS & ANALYTICS MODULE SPECIFIC DATA (cto2.mp4 STYLE)
  // ==========================================================
  reportsAnalytics: {
    healthView: [
      { domain: 'Software Engineering', health: 'Excellent', healthClass: 'success', trend: 'Improving ↗', trendClass: 'success', attention: 'Nominal', maturity: 'Level 4 - High' },
      { domain: 'Cloud Infrastructure', health: 'Stable', healthClass: 'info', trend: 'Usage Growth ↗', trendClass: 'warning', attention: 'Monitor Capacity', maturity: 'Level 5 - Enterprise' },
      { domain: 'AI Platforms', health: 'Optimal', healthClass: 'success', trend: 'Improving ↗', trendClass: 'success', attention: 'Monitor Model Drift', maturity: 'Level 4 - Advanced' },
      { domain: 'Mobile Applications', health: 'Optimal', healthClass: 'success', trend: 'Stable →', trendClass: 'info', attention: 'Low', maturity: 'Level 4 - Advanced' },
      { domain: 'Web Platforms', health: 'Excellent', healthClass: 'success', trend: 'Improving ↗', trendClass: 'success', attention: 'Nominal', maturity: 'Level 5 - Enterprise' },
      { domain: 'Cybersecurity', health: 'Protected', healthClass: 'success', trend: 'Zero Breaches →', trendClass: 'info', attention: 'Nominal', maturity: 'Level 5 - Enterprise' }
    ],
    performanceReview: [
      {
        area: 'Software Engineering',
        badge: 'Optimal',
        badgeClass: 'success',
        metrics: 'Release efficiency (+20%), Dev improvement, Tech health (94.2%)',
        status: 'Optimal Sprint Velocity',
        statusClass: 'success',
        trend: 'Improving ↗',
        trendClass: 'success',
        improvement: 'Canary release automation for AI services',
        risk: 'Low',
        riskClass: 'success',
        improvementDetails: 'We are automating target EKS canary routes using custom AWS App Mesh policies to lower developer overhead.'
      },
      {
        area: 'Cloud Infrastructure',
        badge: 'Capacity Action',
        badgeClass: 'warning',
        metrics: 'Reliability (99.99%), Performance (18ms), Optimization',
        status: 'Stable High Load',
        statusClass: 'info',
        trend: 'Usage Growth ↗',
        trendClass: 'warning',
        improvement: 'Kafka partition autoscale & EKS node pool',
        risk: 'Medium Capacity Surge',
        riskClass: 'warning',
        improvementDetails: 'Telemetry surge has driven CPU utilization up. We are scaling Kafka clusters to 24 partitions.'
      },
      {
        area: 'AI Systems',
        badge: 'Optimal',
        badgeClass: 'success',
        metrics: 'Model performance, Accuracy trend (99.4%), AI adoption',
        status: 'High Precision Nominal',
        statusClass: 'success',
        trend: 'Improving ↗',
        trendClass: 'success',
        improvement: 'OTA thermal model prediction gating',
        risk: 'Low',
        riskClass: 'success',
        improvementDetails: 'Thermal anomaly detection parameters are stable. Expanding shadow models in staging cluster.'
      },
      {
        area: 'Application Platforms',
        badge: 'Optimal',
        badgeClass: 'success',
        metrics: 'Stability (99.98% crash-free), User experience, Speed',
        status: 'High Satisfaction',
        statusClass: 'success',
        trend: 'Stable →',
        trendClass: 'info',
        improvement: 'Passkey biometric sync & BLE vehicle pairing',
        risk: 'Low',
        riskClass: 'success',
        improvementDetails: 'SSO login success rates are high. Focusing on improving Bluetooth Low Energy telemetry pairing times.'
      },
      {
        area: 'Cybersecurity',
        badge: 'Protected',
        badgeClass: 'success',
        metrics: 'Security posture, Risk level',
        status: 'Zero Threat Breaches',
        statusClass: 'success',
        trend: 'Stable →',
        trendClass: 'info',
        improvement: 'SSO access matrix re-alignment',
        risk: 'Low',
        riskClass: 'success',
        improvementDetails: 'No active data leaks or vulnerabilities. Reviewing dormant database credentials to tighten compliance.'
      }
    ],
    intelligenceLibrary: [
      {
        id: 'rep-1',
        title: 'Development Performance & Sprint Velocity Q3',
        pillar: 'Engineering Intelligence',
        pillarClass: 'info',
        updated: '2 hours ago',
        owner: 'Dr. Sarah Jenkins',
        status: 'Published',
        statusClass: 'success',
        summary: 'Detailed evaluation of release timelines, commit counts, code quality coverage score, and technical debt paydowns.',
        history: [
          { version: 'v1.4', date: '2 hours ago', desc: 'Added Sprint 42 velocity updates', author: 'Dr. Sarah Jenkins' }
        ]
      },
      {
        id: 'rep-2',
        title: 'Cloud Infrastructure Usage & Utilization Summary',
        pillar: 'Infrastructure Intelligence',
        pillarClass: 'warning',
        updated: '4 hours ago',
        owner: 'Alex Rivera',
        status: 'Under Review',
        statusClass: 'warning',
        summary: 'Cloud telemetry cost models, EKS cluster partition optimization options, and Kafka storage capacity assessments.',
        history: [
          { version: 'v2.1', date: '4 hours ago', desc: 'Updated AWS telemetry surge stats', author: 'Alex Rivera' }
        ]
      },
      {
        id: 'rep-3',
        title: 'AI Diagnostic Model Accuracy & Inference Latency',
        pillar: 'AI Intelligence',
        pillarClass: 'grey',
        updated: 'Yesterday',
        owner: 'AI Research Squad',
        status: 'Optimal',
        statusClass: 'success',
        summary: 'Evaluates PyTorch battery diagnostic precision, convolution layer weights, and GPU thermal anomalies latency logs.',
        history: [
          { version: 'v1.8', date: 'Yesterday', desc: 'Initial baseline verification of thermal diagnostic weights', author: 'AI Research Squad' }
        ]
      },
      {
        id: 'rep-4',
        title: 'Enterprise Security Risk Assessment & Vulnerability Audit',
        pillar: 'Security Intelligence',
        pillarClass: 'success',
        updated: '6 hours ago',
        owner: 'CISO / SecOps Squad',
        status: 'Certified',
        statusClass: 'success',
        summary: 'SOC2 & ISO 26262 compliance certifications overview, biometric SSO passkey adoption, and credential rotation logs.',
        history: [
          { version: 'v3.2', date: '6 hours ago', desc: 'SOC2 compliant certified seal', author: 'CISO / SecOps Squad' }
        ]
      }
    ],
    decisions: [
      {
        id: 'dec-1',
        area: 'Cloud Infrastructure',
        badge: 'Capacity Action',
        badgeClass: 'warning',
        situation: 'Resource usage increasing due to +18% active EV fleet telemetry growth.',
        impact: 'Future scaling requirement for Q4 peak load.',
        recommendation: 'Review capacity expansion and enable AWS EKS node autoscale policies.',
        status: 'Pending'
      },
      {
        id: 'dec-2',
        area: 'Software Engineering',
        badge: 'Efficiency Boost',
        badgeClass: 'success',
        situation: 'Release frequency improved by 20% following CI/CD pipeline optimization.',
        impact: 'Accelerated feature delivery efficiency across mobile & web squads.',
        recommendation: 'Maintain current strategy and expand automated canary deployment window.',
        status: 'Pending'
      },
      {
        id: 'dec-3',
        area: 'AI Systems',
        badge: 'Model Upgrade',
        badgeClass: 'info',
        situation: 'AI Battery Diagnostic inference model precision reached 99.4%.',
        impact: 'Reduced false positive thermal alerts by 34%.',
        recommendation: 'Authorize automated firmware dispatch for OTA battery management.',
        status: 'Pending'
      }
    ],
    initiatives: {
      completed: [
        { name: 'Cloud Multi-Region Peering', progress: 100, status: '100% Completed', statusClass: 'success', impact: 'Reduced multi-region DB replication lag to < 5ms.' },
        { name: 'Passkey WebAuthn Rollout', progress: 100, status: '100% Completed', statusClass: 'success', impact: 'Zero compromised admin authentication tokens.' }
      ],
      ongoing: [
        { name: 'AI Model Optimization', progress: 74, status: '74% Progress', statusClass: 'info', impact: 'Reduced battery thermal false alerts by 34%.' },
        { name: 'OTA Firmware Auto-Gating', progress: 58, status: '58% Progress', statusClass: 'info', impact: 'Automated vehicle health maintenance across fleet.' }
      ],
      upcoming: [
        { name: 'Q4 Infrastructure Scaling', progress: 0, status: 'Scheduled Q4', statusClass: 'grey', impact: 'Prepares EKS cluster for +50,000 EV expansion.' },
        { name: 'OpenADR 2.0 V2X Integration', progress: 0, status: 'Planning', statusClass: 'grey', impact: 'Enables dynamic grid charging cost optimization.' }
      ]
    },
    insights: [
      {
        title: 'INFRASTRUCTURE COST',
        obs: 'Cloud infrastructure cost increased due to higher usage.',
        impact: 'Future operational expenses may increase.',
        rec: 'Review optimization opportunities.',
        action: 'Analyse'
      },
      {
        title: 'RELEASE EFFICIENCY',
        obs: 'Release frequency improved by 20%.',
        impact: 'Engineering delivery efficiency increased.',
        rec: 'Continue current strategy.',
        action: 'Monitor'
      },
      {
        title: 'AI PRECISION',
        obs: 'AI Diagnostic model inference accuracy reached 99.4%.',
        impact: 'Reduced false positive thermal alerts.',
        rec: 'Expand automated deployment.',
        action: 'Approve'
      },
      {
        title: 'MOBILE STABILITY',
        obs: 'Mobile app crash-free rate sustained at 99.98%.',
        impact: 'High user satisfaction and low support ticket volume.',
        rec: 'Maintain current QA gate.',
        action: 'Acknowledge'
      }
    ]
  },

  // ==========================================================
  // INTEGRATIONS MODULE SPECIFIC DATA (cto2.mp4 STYLE)
  // ==========================================================
  integrations: {
    ecosystemMap: [
      { id: 'eco-1', type: 'InnoVibe Office Portal', typeBadge: 'Core Hub', typeClass: 'success', node: 'EVcare & Cloud Hub', flow: 'Bi-directional ↔', proto: 'gRPC / REST', status: 'Connected (Healthy)', statusClass: 'success' },
      { id: 'eco-2', type: 'EVcare Platform', typeBadge: 'AI Diagnostics', typeClass: 'info', node: 'Vehicle Data Platform', flow: 'Bi-directional ↔', proto: 'PyTorch Kafka Stream', status: 'Connected (Healthy)', statusClass: 'success' },
      { id: 'eco-3', type: 'Mobile Applications', typeBadge: 'iOS / Android', typeClass: 'info', node: 'Auth0 IAM & API Gateway', flow: 'Bi-directional ↔', proto: 'OAuth2 PKCE HTTPS', status: 'Connected (Healthy)', statusClass: 'success' },
      { id: 'eco-4', type: 'IoT Systems', typeBadge: 'EV Edge Telematics', typeClass: 'info', node: 'Kafka Telematics Bus', flow: 'Ingress Stream →', proto: 'mTLS MQTT / Protobuf', status: 'Connected (Healthy)', statusClass: 'success' },
      { id: 'eco-5', type: 'Cloud Services', typeBadge: 'AWS EKS Cluster', typeClass: 'info', node: 'PostgreSQL & TimescaleDB', flow: 'Bi-directional ↔', proto: 'VPC Peering / IAM', status: 'Connected (Healthy)', statusClass: 'success' },
      { id: 'eco-6', type: 'External Partners', typeBadge: 'B2B Gateways', typeClass: 'warning', node: 'Payment & Grid Tariff', flow: 'Bi-directional ↔', proto: 'REST Webhook / mTLS', status: 'Review Required', statusClass: 'warning' }
    ],
    healthFlow: [
      {
        id: 'flow-1',
        name: 'Fleet Data Integration',
        badge: 'Healthy',
        badgeClass: 'success',
        status: 'Synchronized (100%)',
        sync: '10 seconds ago',
        latency: '18ms Latency',
        latencyClass: 'blue',
        type: 'Protobuf / Kafka Bus',
        purpose: 'Ingests sub-second vehicle telematics, partition logs, and diagnostics alerts.',
        owner: 'EV Telematics Team',
        auth: 'mTLS Client Certificate',
        rate: '0.001%'
      },
      {
        id: 'flow-2',
        name: 'Payment Gateway Sync',
        badge: 'Delayed',
        badgeClass: 'warning',
        status: 'Sync Queue Pending',
        sync: '42 seconds ago',
        latency: '240ms Latency',
        latencyClass: 'warning',
        type: 'Stripe Webhook REST',
        purpose: 'Processes driver charge billing, subscriptions, and partner checkout webhooks.',
        owner: 'Billing & Integration Squad',
        auth: 'HTTPS HMAC Signatures',
        rate: '1.8%'
      },
      {
        id: 'flow-3',
        name: 'Partner B2B Webhook',
        badge: 'Active',
        badgeClass: 'success',
        status: 'Synchronized (100%)',
        sync: '2 seconds ago',
        latency: '45ms Latency',
        latencyClass: 'neutral',
        type: 'HTTPS HMAC Signatures',
        purpose: 'Dispatches real-time booking events to partner utility providers.',
        owner: 'Partner Integrations Team',
        auth: 'OAuth2 Client Credentials',
        rate: '0.02%'
      },
      {
        id: 'flow-4',
        name: 'Telemetry Stream Ingress',
        badge: 'Healthy',
        badgeClass: 'success',
        status: 'Real-time Stream',
        sync: 'Real-time (1s ago)',
        latency: '12ms Latency',
        latencyClass: 'blue',
        type: 'mTLS MQTT / TLS 1.3',
        purpose: 'High-throughput ingress broker processing vehicle state changes.',
        owner: 'CloudOps Squad (Alex Rivera)',
        auth: 'TLS 1.3 Client Certs',
        rate: '0.000%'
      }
    ],
    risks: [
      {
        id: 'risk-1',
        title: 'Payment integration response time increasing',
        badge: 'PERFORMANCE RISK',
        badgeClass: 'warning',
        impact: 'Transaction processing delay possible',
        recommendation: 'Review integration performance',
        status: 'Unresolved'
      },
      {
        id: 'risk-2',
        title: 'Unencrypted Partner B2B webhook payload',
        badge: 'SECURITY RISK',
        badgeClass: 'warning',
        impact: 'Security compliance risk on external link',
        recommendation: 'Enforce mTLS and payload signature verification',
        status: 'Unresolved'
      },
      {
        id: 'risk-3',
        title: 'Legacy Telemetry v1 broker high memory utilization',
        badge: 'CAPACITY RISK',
        badgeClass: 'warning',
        impact: 'Risk of buffer overflow during peak hours',
        recommendation: 'Migrate remaining 8% traffic to Telemetry v2 Kafka bus',
        status: 'Unresolved'
      }
    ],
    insights: [
      {
        title: 'LATENCY WARNING',
        obs: 'Vehicle data integration latency increased by 12%.',
        impact: 'Real-time analytics may be affected.',
        rec: 'Review connected services.',
        action: 'Create Investigation'
      },
      {
        title: 'LIFECYCLE OPTIMIZATION',
        obs: 'Unused integrations detected.',
        impact: 'Additional maintenance overhead.',
        rec: 'Review integration lifecycle.',
        action: 'Schedule Review'
      },
      {
        title: 'WEBHOOK RETRY RATE',
        obs: 'Partner payment webhook retry rate spiked to 4.2%.',
        impact: 'Temporary retry queue delay.',
        rec: 'Approve webhook buffer capacity expansion.',
        action: 'Approve Expansion'
      },
      {
        title: 'API STABILITY',
        obs: 'Zero contract breaking changes in recent API deployments.',
        impact: 'Stable overall API gateway telemetry.',
        rec: 'Approve Q4 API expansion roadmap.',
        action: 'Approve Roadmap'
      }
    ]
  },

  // ==========================================================
  // CYBERSECURITY MODULE SPECIFIC DATA (cto2.mp4 STYLE)
  // ==========================================================
  cybersecurity: {
    postureView: [
      { id: 'sec-area-1', name: 'Cloud Security', badge: 'Optimal', badgeClass: 'success', status: 'Optimal (AWS EKS)', risk: 'Low Risk', riskClass: 'success', time: '2 hours ago', purpose: 'Protects EKS orchestrations, AWS VPC, nodes, and secrets.', owner: 'CloudOps Squad (Alex Rivera)' },
      { id: 'sec-area-2', name: 'Application Security', badge: 'Optimal', badgeClass: 'success', status: 'Optimal (Web & App)', risk: 'Low Risk', riskClass: 'success', time: '1 day ago', purpose: 'Protects Next.js edge caching, React portals, and Flutter apps.', owner: 'Frontend UX Team' },
      { id: 'sec-area-3', name: 'API Security', badge: 'Review', badgeClass: 'warning', status: 'Review Required', risk: 'Medium Risk', riskClass: 'warning', time: '4 hours ago', purpose: 'Protects partner integration APIs, gateway mTLS, and endpoints.', owner: 'Partner Integrations Team' },
      { id: 'sec-area-4', name: 'Data Security', badge: 'Protected', badgeClass: 'success', status: 'Protected (AES-256)', risk: 'Low Risk', riskClass: 'success', time: '30 mins ago', purpose: 'Protects TimescaleDB, CockroachDB clusters, and telemetry logs.', owner: 'Database Admins' },
      { id: 'sec-area-5', name: 'Device Security', badge: 'Protected', badgeClass: 'success', status: 'Protected (mTLS EV Edge)', risk: 'Low Risk', riskClass: 'success', time: '6 hours ago', purpose: 'Protects vehicle telematics modems and telemetry ingress.', owner: 'EV Telematics Team' }
    ],
    threats: [
      { id: 'threat-1', zone: 'CRITICAL ZONE', zoneClass: 'danger', badge: 'Active Threat', title: 'Unauthorized access attempt detected', desc: 'Origin: Suspicious IP Pool 185.220.101.x targeting Admin Portal authentication.', action1: 'Block IP Pool', action2: 'Isolate Subnet' },
      { id: 'threat-2', zone: 'WARNING ZONE', zoneClass: 'warning', badge: 'Security Warning', title: 'Multiple failed authentication attempts', desc: 'Partner B2B Portal Auth Gateway logged 42 failed password attempts in 5 minutes.', action1: 'Enforce MFA', action2: 'Reset Session' },
      { id: 'threat-3', zone: 'SUSPICIOUS ZONE', zoneClass: 'info', badge: 'Suspicious Activity', title: 'Unusual API call frequency anomaly', desc: 'EVcare Telematics Ingress rate spiked +48% from single client API key.', action1: 'Enable Rate Limit', action2: 'View Trace' },
      { id: 'threat-4', zone: 'RESOLVED ZONE', zoneClass: 'success', badge: 'Resolved Issue', title: 'CVE-2026-8812 SSL library patch verified', desc: 'OpenSSL vulnerability patched across all 14 AWS EKS production nodes.', action1: 'View Audit Log', action2: 'Archive Event' }
    ],
    risks: [
      {
        id: 'sec-risk-1',
        title: 'API authentication weakness',
        badge: 'HIGH PRIORITY RISK',
        impact: 'High',
        impactClass: 'danger',
        system: 'Partner Integration',
        recommendation: 'Update security policy & force OAuth2 PKCE token rotation',
        status: 'Open'
      },
      {
        id: 'sec-risk-2',
        title: 'Unencrypted internal telemetry stream',
        badge: 'HIGH PRIORITY RISK',
        impact: 'High',
        impactClass: 'danger',
        system: 'IoT Fleet Edge',
        recommendation: 'Enforce TLS 1.3 mTLS mutual authentication across all EV modems',
        status: 'Open'
      },
      {
        id: 'sec-risk-3',
        title: 'Stale OAuth2 refresh tokens in cloud cache',
        badge: 'MEDIUM PRIORITY RISK',
        impact: 'Medium',
        impactClass: 'warning',
        system: 'Mobile App Gateway',
        recommendation: 'Rotate signing keys & enforce 15-min token expiration',
        status: 'Open'
      }
    ],
    incidents: [
      {
        id: 'inc-1',
        name: 'B2B Partner API Rate Limit Anomaly',
        num: '#SEC-9021',
        system: 'Partner Gateway API',
        severity: 'P1 - High',
        severityClass: 'danger',
        owner: 'SecOps Lead (Marcus Chen)',
        stage: 'Investigating',
        stageClass: 'warning'
      },
      {
        id: 'inc-2',
        name: 'Unusual Outbound Telemetry Payload Volume',
        num: '#SEC-8942',
        system: 'IoT Communication Hub',
        severity: 'P2 - Medium',
        severityClass: 'warning',
        owner: 'Cloud Security Team',
        stage: 'Mitigation Active',
        stageClass: 'info'
      }
    ],
    insights: [
      {
        title: 'LATENCY WARNING',
        obs: 'Multiple failed authentication attempts detected.',
        impact: 'Potential access risk.',
        rec: 'Review affected accounts.',
        action: 'Investigate'
      },
      {
        title: 'LIFECYCLE OPTIMIZATION',
        obs: 'Security posture improved after recent updates.',
        impact: 'Reduced technology risk.',
        rec: 'Continue monitoring.',
        action: 'Review'
      },
      {
        title: 'API STABILITY',
        obs: 'SSL session resumption cached on Edge Gateway.',
        impact: 'Uptime overhead optimization.',
        rec: 'Enforce global cache expiry.',
        action: 'Approve Settings'
      },
      {
        title: 'COMPLIANCE AUDIT',
        obs: 'SOC2 readiness scan completed with zero non-conformity.',
        impact: 'Ready for final external auditor baseline.',
        rec: 'Schedule final certification board signoff.',
        action: 'Schedule Review'
      }
    ]
  },

  // ==========================================================
  // DEVOPS & PIPELINES MODULE SPECIFIC DATA (cto2.mp4 STYLE)
  // ==========================================================
  devopsPipelines: {
    operationsCenter: {
      health: { value: '98%', label: 'SLA Verified', statusClass: 'success' },
      activePipelines: { value: '24', label: '18 Prod / 6 Staging', statusClass: 'muted' },
      frequency: { value: '42 / Week', label: '+14% vs Last Sprint', statusClass: 'blue' },
      successRate: { value: '99.2%', label: '0 Rollbacks', statusClass: 'success' },
      duration: { value: '18 Min', label: '-4 min Faster', statusClass: 'muted' },
      automation: { value: '96%', label: 'Fully Automated', statusClass: 'blue' }
    },
    pipelineFlow: [
      { id: 'stage-1', name: 'Code Commit', status: 'Completed', statusClass: 'success', time: 'Duration: 30 sec', subtext: '100% Success', progressPct: '100%', icon: 'fa-code-branch', desc: 'GitHub webhook commit triggers and repository checkout stages.' },
      { id: 'stage-2', name: 'Build', status: 'Completed', statusClass: 'success', time: 'Duration: 4 min', subtext: '99.8% Success', progressPct: '100%', icon: 'fa-gears', desc: 'Node.js/Docker compile image configurations and caching checks.' },
      { id: 'stage-3', name: 'Automated Testing', status: 'Running', statusClass: 'warning', time: 'Duration: 8 min', subtext: '98.4% Success', progressPct: '75%', icon: 'fa-flask', desc: 'Playwright E2E and Jest Unit test matrix suite runner execution.' },
      { id: 'stage-4', name: 'Security Validation', status: 'Passed', statusClass: 'success', time: 'Duration: 3 min', subtext: '100% Audit Pass', progressPct: '100%', icon: 'fa-shield-halved', desc: 'SonarQube SAST, Trivy container security scans, and secrets audits.' },
      { id: 'stage-5', name: 'Deployment', status: 'In Progress', statusClass: 'info', time: 'Duration: 2 min', subtext: '99.5% Success', progressPct: '40%', icon: 'fa-rocket', desc: 'ArgoCD cluster state synchronization and canary deployment validation.' },
      { id: 'stage-6', name: 'Production', status: 'Verified', statusClass: 'success', time: 'Live Monitor', subtext: '99.99% SLA', progressPct: '100%', icon: 'fa-network-wired', desc: 'Canary progressive traffic promotion and baseline SLA telemetry checks.' }
    ],
    deploymentLandscape: [
      { id: 'pipe-1', name: 'EVcare Mobile App Backend', version: 'v4.2.1', env: 'Production', status: 'Successful', statusClass: 'success', lastSync: '2 hours ago', duration: '14 minutes', owner: 'EV Telematics Squad', riskText: '✓ Low Risk Release', riskClass: 'success', type: 'Canary Rollout', purpose: 'Deploys customer facing iOS/Android backend APIs.' },
      { id: 'pipe-2', name: 'Telemetry Ingress Stream Service', version: 'v3.8.0-rc2', env: 'Testing / Staging', status: 'Running', statusClass: 'warning', lastSync: '15 min ago', duration: '22 minutes', owner: 'Data Platform Team', riskText: '⚡ Medium Risk Release', riskClass: 'warning', type: 'Blue-Green', purpose: 'Deploys high-throughput telemetry ingestion services.' },
      { id: 'pipe-3', name: 'Fleet Routing AI Core', version: 'v2.9.4', env: 'Production', status: 'Successful', statusClass: 'success', lastSync: 'Yesterday 18:30', duration: '16 minutes', owner: 'AI Core Squad', riskText: '✓ Low Risk Release', riskClass: 'success', type: 'Rolling Update', purpose: 'Deploys office administration portal AI routing algorithms.' },
      { id: 'pipe-4', name: 'Core API Gateway & Auth', version: 'v5.1.0', env: 'Production', status: 'Successful', statusClass: 'success', lastSync: '3 days ago', duration: '11 minutes', owner: 'Platform Security Team', riskText: '✓ Low Risk Release', riskClass: 'success', type: 'Rolling Update', purpose: 'Deploys core API authentication gateway proxy.' }
    ],
    insights: [
      {
        title: 'Stability & Velocity Trend',
        badge: 'High Stability',
        badgeClass: 'success',
        desc: 'Deployment frequency increased by +24% while maintaining 99.2% release stability with zero production rollbacks over the past 30 days.',
        ctoInsight: 'Engineering delivery throughput is optimal - team readiness for Q3 major feature release is green.'
      },
      {
        title: 'Testing Stage Bottleneck Alert',
        badge: 'Bottleneck Alert',
        badgeClass: 'warning',
        desc: 'Automated E2E testing stage is becoming a release bottleneck (+6 min latency surge). Parallelizing mobile regression tests can reduce overall deployment duration.',
        ctoInsight: 'Split Cypress E2E suite into 4 parallel worker pods to cut test stage duration from 8 min to 2.5 min.'
      },
      {
        title: 'Docker Layer Caching Optimization',
        badge: 'Optimization',
        badgeClass: 'info',
        desc: 'Docker multi-stage build cache utilization dropped by 18%. Re-enabling BuildKit layer caching on AWS EKS runners will save ~5.5 minutes per deployment build.',
        ctoInsight: 'Enable s3 cache backend on GitHub Actions runner image builds.'
      }
    ]
  },

  // ==========================================================
  // SYSTEM LOGS MODULE SPECIFIC DATA (SYSTEM OBSERVABILITY CENTER)
  // ==========================================================
  systemLogs: {
    healthMonitor: {
      status: 'All Systems Operational',
      statusClass: 'success',
      activeAlerts: '3 Active',
      activeAlertsClass: 'warning',
      coverage: '98% Monitored',
      coverageClass: 'success',
      recentActivity: 'Normal Patterns',
      recentActivityClass: 'success'
    },
    liveEvents: [
      {
        id: 'log-1',
        time: '10:42 AM',
        source: 'Authentication Service',
        desc: 'Security update completed successfully',
        severity: 'Info',
        severityClass: 'success',
        app: 'User Core API',
        env: 'Production',
        impact: 'Zero customer disruption. Patching successfully resolved critical OAuth boundary vulnerabilities.',
        recommendation: 'Monitor token authentication logs for subsequent 4-hour cycle. No active remediation required.'
      },
      {
        id: 'log-2',
        time: '10:38 AM',
        source: 'Database Service',
        desc: 'Backup completed',
        severity: 'Info',
        severityClass: 'success',
        app: 'Fleet Core Replica',
        env: 'Production',
        impact: 'Full snapshot archive synchronized to AWS S3 glacier vault storage container.',
        recommendation: 'Verify weekly integrity hash audit checks next Sunday.'
      },
      {
        id: 'log-3',
        time: '10:31 AM',
        source: 'API Gateway',
        desc: 'Latency warning detected',
        severity: 'Warning',
        severityClass: 'warning',
        app: 'EVcare Mobile gateway',
        env: 'Production',
        impact: 'Response times spiked to 850ms (average threshold limit: 250ms). Minor telemetry delay.',
        recommendation: 'Scale API routing cluster capacity and flush Redis query caching pools.'
      },
      {
        id: 'log-4',
        time: '10:20 AM',
        source: 'Cloud Load Balancer',
        desc: 'High outbound traffic volume',
        severity: 'Warning',
        severityClass: 'warning',
        app: 'CDN Assets Handler',
        env: 'Production',
        impact: 'Egress traffic surged by +35% over baseline. Transit provider bandwidth threshold warned.',
        recommendation: 'Verify if telemetry assets caching rules are active on cloudfront edge nodes.'
      },
      {
        id: 'log-5',
        time: '10:15 AM',
        source: 'Telemetry Streamer',
        desc: 'Connected clients sync success',
        severity: 'Info',
        severityClass: 'success',
        app: 'Vehicle Data Receiver',
        env: 'Staging',
        impact: 'Staging clients successfully promoted and synchronized core telemetry frames.',
        recommendation: 'Approve telemetry baseline configuration version promotions.'
      },
      {
        id: 'log-6',
        time: '10:02 AM',
        source: 'Fleet Core DB',
        desc: 'Read-replica lag warning',
        severity: 'Critical',
        severityClass: 'danger',
        app: 'Real-time Telemetry DB',
        env: 'Production',
        impact: 'Replica data lag exceeded 45 seconds due to transaction lock conditions.',
        recommendation: 'Force query optimizer updates on long-running analytical tables.'
      }
    ],
    serviceObservability: [
      { category: 'Application Services', name: 'EVcare Web & Mobile Backend APIs', health: 'Nominal', healthClass: 'success', activity: 'API routes served: 14.2M/sec', alerts: 'No active alerts' },
      { category: 'Backend Services', name: 'Telemetry Processing & Streaming engine', health: 'Nominal', healthClass: 'success', activity: 'Job scheduler executed 422 triggers', alerts: 'No active alerts' },
      { category: 'Database Services', name: 'Fleet Core databases & replication clusters', health: 'Warning', healthClass: 'warning', activity: 'Write transaction load elevated', alerts: '1 Replica lag alert' },
      { category: 'Cloud Services', name: 'AWS EKS cluster and CDN edge routing nodes', health: 'Nominal', healthClass: 'success', activity: 'AWS EKS cluster autoscaled successfully', alerts: 'No active alerts' }
    ],
    incidents: [
      { id: 'inc-1', title: 'Repeated authentication failures detected.', type: 'Critical', typeClass: 'danger', time: '10:18 AM', count: '142 Failures' },
      { id: 'inc-2', title: 'API latency increased in production.', type: 'Warning', typeClass: 'warning', time: '10:31 AM', latency: '850ms average' },
      { id: 'inc-3', title: 'Database maintenance completed.', type: 'Resolved', typeClass: 'success', time: '09:45 AM', duration: '12 minutes' }
    ],
    insights: [
      {
        title: 'BASELINE ALIGNMENT',
        obs: 'System behaviour is normal compared to previous patterns.',
        impact: 'Operational metrics and execution latency conform to nominal baselines.',
        rec: 'Maintain active telemetry rulesets.',
        action: 'Acknowledge'
      },
      {
        title: 'ANOMALOUS ACTIVITY',
        obs: 'Unusual traffic pattern detected.',
        impact: 'Outbound telemetry stream volume from B2B partners spiked by +22%.',
        rec: 'Monitor egress gateway and rate limiter capacity settings.',
        action: 'Investigate Traffic'
      },
      {
        title: 'STABILITY MITIGATION',
        obs: 'Potential service degradation predicted.',
        impact: 'Elevated replica lag on Fleet Core DB could cause slow analytical reads.',
        rec: 'Promote backup read replica or distribute analytical queries.',
        action: 'Approve Migration'
      }
    ]
  },

  // ==========================================================
  // CLOUD INFRASTRUCTURE MODULE SPECIFIC DATA (CLOUD COMMAND CENTER)
  // ==========================================================
  cloudInfrastructure: {
    operationsOverview: {
      health: '99.95%',
      healthClass: 'success',
      activeServices: '42 Active',
      activeServicesClass: 'blue',
      utilization: '68%',
      utilizationClass: 'success',
      availabilityStatus: 'All Systems Operational',
      availabilityStatusClass: 'success',
      securityStatus: 'Healthy (Compliant)',
      securityStatusClass: 'success'
    },
    architectureMap: {
      nodes: [
        { id: 'arch-users', name: 'Users', type: 'clients', status: 'Healthy', icon: 'fa-users', desc: 'End-users, vehicles, and B2B streaming API partners.' },
        { id: 'arch-lb', name: 'Load Balancer', type: 'gateway', status: 'Healthy', icon: 'fa-network-wired', desc: 'AWS ALB distributing incoming traffic across availability zones.' },
        { id: 'arch-apps', name: 'Application Services', type: 'compute', status: 'Healthy', icon: 'fa-cubes', desc: 'Docker microservices running on AWS EKS Kubernetes clusters.' },
        { id: 'arch-db', name: 'Database', type: 'database', status: 'Warning', icon: 'fa-database', desc: 'TimescaleDB and PostgreSQL replication clusters.' },
        { id: 'arch-storage', name: 'Storage', type: 'storage', status: 'Healthy', icon: 'fa-hard-drive', desc: 'AWS S3 telemetry archives and persistent EBS blocks.' },
        { id: 'arch-ai', name: 'AI Services', type: 'ai', status: 'Healthy', icon: 'fa-brain', desc: 'EVcare AI Diagnostics and battery thermal prediction ML runtimes.' }
      ]
    },
    resourceHealth: [
      { id: 'res-1', name: 'Application Server Cluster', type: 'Compute (AWS EKS)', cpu: '42%', cpuVal: 42, memory: '58%', memoryVal: 58, storage: '22%', storageVal: 22, network: '145 Mb/s', status: 'Healthy', statusClass: 'success', provider: 'AWS', env: 'Production', region: 'us-east-1', purpose: 'Runs core vehicle APIs and gateway microservices.', capacity: '12 Active Nodes / Max 32', accessStatus: 'Private VPC Security Group', scalingRec: 'Cluster is stable. No active scaling rules triggered.' },
      { id: 'res-2', name: 'Ingress Load Balancer', type: 'Networking (AWS ALB)', cpu: '18%', cpuVal: 18, memory: '32%', memoryVal: 32, storage: '10%', storageVal: 10, network: '420 Mb/s', status: 'Healthy', statusClass: 'success', provider: 'AWS', env: 'Production', region: 'us-east-1', purpose: 'Distributes edge driver telemetry traffic into private clusters.', capacity: '2 active instances / Auto-scales to 6', accessStatus: 'Public facing ALB / HTTPS bound', scalingRec: 'Scales out if average load exceeds 250 requests/sec.' },
      { id: 'res-3', name: 'Redis Caching Cluster', type: 'Caching (ElastiCache)', cpu: '72%', cpuVal: 72, memory: '85%', memoryVal: 85, storage: '45%', storageVal: 45, network: '89 Mb/s', status: 'Warning', statusClass: 'warning', provider: 'AWS', env: 'Production', region: 'us-east-1', purpose: 'Handles real-time session caching and query response caching.', capacity: '3 Node Replica cluster', accessStatus: 'Internal Cache Security Group', scalingRec: 'Memory usage elevated. Recommendation: Upsize node cache type from t3.medium to r6g.large.' },
      { id: 'res-4', name: 'Telemetry Ingest Pods', type: 'Ingress Stream (AWS EKS)', cpu: '54%', cpuVal: 54, memory: '62%', memoryVal: 62, storage: '30%', storageVal: 30, network: '512 Mb/s', status: 'Healthy', statusClass: 'success', provider: 'AWS', env: 'Production', region: 'us-east-1', purpose: 'Receives and validates high-volume live telematics packet streams.', capacity: '18 Kubernetes Pods', accessStatus: 'VPC private subnet, IAM restricted keys', scalingRec: 'Dynamic HPA enabled. Scales based on request count.' }
    ],
    environments: [
      { id: 'env-prod', name: 'Production', availability: '99.99%', version: 'v4.2.1', deployStatus: 'Idle (Synced)', deployClass: 'success', health: 'Nominal', healthClass: 'success', desc: 'Live customer-facing environment.' },
      { id: 'env-test', name: 'Testing', availability: '99.85%', version: 'v4.3.0-rc1', deployStatus: 'Deploying (40%)', deployClass: 'info', health: 'Nominal', healthClass: 'success', desc: 'Pre-production staging cluster.' },
      { id: 'env-dev', name: 'Development', availability: '99.50%', version: 'v4.3.0-alpha', deployStatus: 'Failed Rollout', deployClass: 'danger', health: 'Warning (Errors)', healthClass: 'warning', desc: 'Staging sandboxes for engineering squads.' }
    ],
    risks: [
      { id: 'risk-1', title: 'Production workload capacity warning.', risk: 'Capacity Warning', impact: 'Potential latency spikes under peak ingestion load.', recommendation: 'Approve EKS cluster auto-scale node expansion (+8 nodes).', statusClass: 'warning' },
      { id: 'risk-2', title: 'Unused cloud resources detected.', risk: 'Cost Optimization', impact: 'Wasted cloud spend estimated at $3,200/month.', recommendation: 'Schedule automatic cleanup rules for orphan EBS volumes and developer staging pods.', statusClass: 'info' },
      { id: 'risk-3', title: 'Storage cost increased by 12% in US-East.', risk: 'Budget Spike', impact: 'Budget overshoot on AWS S3 standard tier backup retention.', recommendation: 'Configure lifecycle migration policies to shift backups older than 14 days to AWS Glacier Deep Archive.', statusClass: 'warning' }
    ],
    insights: [
      { title: 'Auto-scaling recommendation generated for backend services.', badge: 'Scaling recommendation', badgeClass: 'info', desc: 'Predictive scale analytics suggest scaling up EVcare Ingest clusters tomorrow between 08:00 AM and 10:00 AM to handle high peak commuter traffic.', action: 'Approve Scaling Policy' },
      { title: 'Cloud resource utilization is stable.', badge: 'Utilization stable', badgeClass: 'success', desc: 'Average cluster utilization remained at 68% over the past 7 days, maintaining a balanced ratio between operational velocity and baseline cost.', action: 'View Metrics' },
      { title: 'Potential cost optimization opportunity identified.', badge: 'Cost optimization', badgeClass: 'warning', desc: 'Downsizing underutilized staging database instances can save up to $1,850/month with zero impact on release velocity.', action: 'Acknowledge Savings' }
    ]
  },

  // ==========================================================
  // DATABASE MANAGEMENT MODULE SPECIFIC DATA (DATA RELIABILITY CENTER)
  // ==========================================================
  databaseManagement: {
    healthCenter: {
      availability: { value: '99.99%', label: 'SLA Compliant', icon: 'fa-network-wired', statusClass: 'success' },
      activeDbs: { value: '18', label: '14 Prod / 4 Staging', icon: 'fa-database', statusClass: 'muted' },
      storageUsage: { value: '64%', label: '5.2 TB / 8.0 TB', icon: 'fa-hard-drive', statusClass: 'muted' },
      backupHealth: { value: 'Healthy', label: '100% SLA Verified', icon: 'fa-cloud-arrow-up', statusClass: 'success' },
      performance: { value: '94%', label: '4.2ms Avg Query', icon: 'fa-bolt', statusClass: 'muted' },
      security: { value: '100%', label: 'mTLS & AES-256', icon: 'fa-lock', statusClass: 'blue' }
    },
    infrastructureMap: {
      nodes: [
        { id: 'db-app-client', name: 'Client Applications', type: 'app', status: 'Ingress Active', statusClass: 'success', icon: 'fa-mobile-screen-button', desc: 'EVcare App & Web Portal' },
        { id: 'db-app-main', name: 'Application Database', type: 'database', status: 'OLTP Healthy (64%)', statusClass: 'success', icon: 'fa-database', desc: 'PostgreSQL 16 & Redis' },
        { id: 'db-app-analytics', name: 'Analytics Database', type: 'database', status: 'Needs Attention (82%)', statusClass: 'warning', icon: 'fa-chart-pie', desc: 'TimescaleDB Stream' },
        { id: 'db-app-aiwh', name: 'AI Data Warehouse', type: 'warehouse', status: '12TB ML Warehouse', statusClass: 'success', icon: 'fa-snowflake', desc: 'Snowflake & Feature Store' }
      ]
    },
    landscape: [
      {
        id: 'db-1',
        name: 'EVcare Production Database',
        type: 'PostgreSQL',
        app: 'EVcare Backend APIs',
        env: 'Production',
        health: 'Excellent',
        healthClass: 'success',
        storage: '64%',
        storageVal: 64,
        nodes: '3 Nodes Cluster',
        version: 'PostgreSQL 16.2',
        owner: 'Platform DB Squad',
        backupStatus: 'Verified (Daily)',
        lastBackup: 'Today 04:00 AM',
        latency: '4ms',
        load: 'Low',
        queryRec: 'Run pg_repack to reclaim 14GB disk bloat on tables.'
      },
      {
        id: 'db-2',
        name: 'Telemetry Ingress Database',
        type: 'TimescaleDB',
        app: 'Telemetry Ingress Stream',
        env: 'Production',
        health: 'Excellent',
        healthClass: 'success',
        storage: '72%',
        storageVal: 72,
        nodes: 'Single Master / 2 Replicas',
        version: 'TimescaleDB 2.14',
        owner: 'Telemetry Squad',
        backupStatus: 'Verified (Daily)',
        lastBackup: 'Today 05:30 AM',
        latency: '12ms',
        load: 'Medium',
        queryRec: 'Compression policy active. Optimize chunk time duration to 3 days.'
      },
      {
        id: 'db-3',
        name: 'User Auth & Session Store',
        type: 'Redis',
        app: 'User Core API',
        env: 'Production',
        health: 'Excellent',
        healthClass: 'success',
        storage: '45%',
        storageVal: 45,
        nodes: 'Cluster Mode / 6 Shards',
        version: 'Redis 7.2',
        owner: 'Platform Security Team',
        backupStatus: 'Verified (Daily)',
        lastBackup: 'Today 06:00 AM',
        latency: '0.8ms',
        load: 'Low',
        queryRec: 'Memory cache hit ratio is 99.8%. No active scaling needed.'
      },
      {
        id: 'db-4',
        name: 'Fleet Routing Data Warehouse',
        type: 'ClickHouse',
        app: 'Fleet Routing AI Core',
        env: 'Production',
        health: 'Warning',
        healthClass: 'warning',
        storage: '88%',
        storageVal: 88,
        nodes: '2 ClickHouse Pods',
        version: 'ClickHouse 24.2',
        owner: 'Data Platform Team',
        backupStatus: 'Warning (Slow)',
        lastBackup: 'Yesterday 11:30 PM',
        latency: '45ms',
        load: 'High',
        queryRec: 'Storage is reaching 90%. Recommendation: Enable AWS EBS gp3 volume auto-expansion.'
      }
    ],
    insights: [
      {
        issue: 'Production database storage may reach capacity within three months.',
        impact: 'Risk of database write lockouts on ClickHouse analytics pods.',
        recommendation: 'Schedule AWS storage tier upgrade or purge old logging records.',
        statusClass: 'warning'
      },
      {
        issue: 'Backup verification completed successfully.',
        impact: 'Zero recovery point objective (RPO) drift detected on Redis auth shards.',
        recommendation: 'Maintain daily automated snapshot integrity audits.',
        statusClass: 'success'
      },
      {
        issue: 'Analytics database optimization recommended.',
        impact: 'Average response query latency surged from 45ms to 125ms.',
        recommendation: 'Configure materialized views on telemetry summary tables to optimize dashboard load times.',
        statusClass: 'info'
      }
    ]
  },

  // ==========================================================
  // API MANAGEMENT MODULE SPECIFIC DATA (cto2.mp4 STYLE)
  // ==========================================================
  apiManagement: {
    operationsOverview: {
      availability: { value: '99.99%', label: 'SLA Compliant', icon: 'fa-shield-halved', statusClass: 'success' },
      activeApis: { value: '42 APIs', label: '3 In Staging', icon: 'fa-network-wired', statusClass: 'muted' },
      dailyVolume: { value: '14.2M', label: '+12% MoM', icon: 'fa-chart-line', statusClass: 'blue' },
      avgLatency: { value: '42ms', label: '-6ms Faster', icon: 'fa-bolt', statusClass: 'muted' },
      errorRate: { value: '0.01%', label: 'Optimal', icon: 'fa-bug', statusClass: 'success' },
      gatewayAuth: { value: '100%', label: 'OAuth2 + mTLS', icon: 'fa-key', statusClass: 'blue' }
    },
    ecosystemMap: {
      nodes: [
        { id: 'api-app-client', name: 'Client Tier (iOS / Android)', type: 'app', status: 'Healthy', icon: 'fa-mobile-screen-button', desc: 'Mobile & Web Ingress' },
        { id: 'api-app-gateway', name: 'Envoy Ingress & Rate Limiter', type: 'gateway', status: 'Healthy', icon: 'fa-server', desc: 'KrakenD Edge Proxy' },
        { id: 'api-app-services', name: 'FastAPI / Go / gRPC Mesh', type: 'services', status: 'Healthy', icon: 'fa-cubes', desc: 'EKS Kubernetes Mesh' },
        { id: 'api-app-db', name: 'TimescaleDB & PostgreSQL', type: 'database', status: 'Healthy', icon: 'fa-database', desc: 'Relational & Metric Stores' },
        { id: 'api-app-external', name: 'ChargePoint & OpenADR Grid', type: 'external', status: 'Healthy', icon: 'fa-circle-nodes', desc: 'Smart Grid Handshakes' }
      ]
    },
    landscape: [
      {
        id: 'api-1',
        name: 'Vehicle Telemetry API',
        purpose: 'Real-time EV battery & socket stream',
        owner: 'IoT Team',
        version: 'v2.4',
        env: 'Production',
        status: 'Healthy',
        statusClass: 'success',
        response: '38ms',
        avgLatency: '38ms',
        requestVolume: '4.8M requests/day',
        errorRate: '0.005%',
        authMethod: 'mTLS & API Key',
        accessControl: 'Telemetry ingress group restrictions',
        certStatus: 'Valid (Expires in 280 days)',
        connectedApps: 'EVcare Mobile, Fleet Dispatch portal',
        history: 'v2.4 published 3 days ago. Optimised websocket polling loops.',
        activity: 'API config updated. Scaling Kafka target endpoints.'
      },
      {
        id: 'api-2',
        name: 'Payment & Tariff Gateway API',
        purpose: 'Dynamic grid billing & V2X tariff handshake',
        owner: 'Billing Team',
        version: 'v3.1',
        env: 'Production',
        status: 'Needs Attention',
        statusClass: 'warning',
        response: '62ms',
        avgLatency: '62ms',
        requestVolume: '1.2M requests/day',
        errorRate: '0.08%',
        authMethod: 'OAuth2 (JWT)',
        accessControl: 'Role-based billing scope token verification',
        certStatus: 'Valid (Expires in 45 days)',
        connectedApps: 'EVcare Mobile billing, Partner Grid Ingress',
        history: 'v3.1 deployed yesterday. Patched gateway timeout parameters.',
        activity: 'Stripe gateway latency increased. Reviewing thread allocations.'
      },
      {
        id: 'api-3',
        name: 'Fleet Control & Dispatch API',
        purpose: 'Commercial fleet routing & dispatch telemetry',
        owner: 'Fleet Squad',
        version: 'v2.8',
        env: 'Staging',
        status: 'Healthy',
        statusClass: 'success',
        response: '28ms',
        avgLatency: '28ms',
        requestVolume: '850K requests/day',
        errorRate: '0.012%',
        authMethod: 'OAuth2 Client Credentials',
        accessControl: 'Fleet dispatch partner whitelist (VPC private)',
        certStatus: 'Valid (Expires in 180 days)',
        connectedApps: 'B2B Partner dispatch systems, internal routing dashboards',
        history: 'v2.8 published 1 week ago. Synchronised route clustering logs.',
        activity: 'Performance benchmark passed with nominal memory limits.'
      },
      {
        id: 'api-4',
        name: 'Auth & mTLS Security API',
        purpose: 'Zero-trust token validation & BLE key pairing',
        owner: 'Security Team',
        version: 'v4.0',
        env: 'Production',
        status: 'Healthy',
        statusClass: 'success',
        response: '18ms',
        avgLatency: '18ms',
        requestVolume: '6.5M requests/day',
        errorRate: '0.001%',
        authMethod: 'mTLS + Key Rotation',
        accessControl: 'Global user identity service restrictions',
        certStatus: 'Valid (Expires in 320 days)',
        connectedApps: 'All public endpoints, EVcare mobile app security layers',
        history: 'v4.0 published 4 days ago. Upgraded crypto algorithms to SHA-256.',
        activity: 'Keys validation rate checked. 100% verified.'
      }
    ],
    insights: [
      {
        category: 'Performance Alert',
        impact: 'Payment API response time increased by 15%.',
        recommendation: 'Review service capacity and Stripe gateway connection pool.',
        impactLevel: 'Medium'
      },
      {
        category: 'Traffic Surge',
        impact: 'Vehicle telemetry API traffic increased significantly.',
        recommendation: 'Evaluate scaling requirements for Kafka ingress pods.',
        impactLevel: 'High'
      },
      {
        category: 'Maintenance Scope',
        impact: 'Unused API versions detected (v1.8 legacy).',
        recommendation: 'Consider API cleanup and deprecation timeline.',
        impactLevel: 'Low'
      }
    ]
  },

  // ==========================================================
  // BUG TRACKING MODULE - EXECUTIVE QUALITY INTELLIGENCE CENTER
  // ==========================================================
  bugTracking: {
    overviewKpis: [
      {
        id: 'kpi-stability',
        title: 'Product Stability Score',
        value: '96%',
        trend: 'Improving ↗',
        trendClass: 'success',
        change: '+4% MoM',
        status: 'High',
        statusClass: 'success',
        icon: 'fa-percent',
        insight: {
          situation: 'Stability across core mobile application and backend sockets reached 96%.',
          impact: 'Significant reduction in app crashes (less user churn).',
          trendAnalysis: 'Steadily increasing over 4 consecutive weekly releases.',
          aiInsight: 'Recent release improved overall stability by 4%, however Mobile Authentication continues to show elevated crash probability.',
          action: 'Approve SSO indexing optimizations next deployment.',
          shortcutView: 'Mobile Application'
        }
      },
      {
        id: 'kpi-critical',
        title: 'Critical Issues',
        value: '3',
        trend: 'Increasing ↗',
        trendClass: 'danger',
        change: '+1 new',
        status: 'Warning',
        statusClass: 'warning',
        icon: 'fa-exclamation-triangle',
        insight: {
          situation: '3 active P0 issues blocking release workflows.',
          impact: 'Potential delay in rolling out fleet routing updates to staging.',
          trendAnalysis: 'Remained steady at 2-3 issues for the past week.',
          aiInsight: 'Clickhouse cluster volume expansion warning is triggering slow writes, which could trigger a telemetry database lock.',
          action: 'Initiate Root Cause Analysis on Clickhouse ingestion pipelines.',
          shortcutView: 'Fleet Dashboard'
        }
      },
      {
        id: 'kpi-open',
        title: 'Open Issues',
        value: '14',
        trend: 'Stable →',
        trendClass: 'info',
        change: '-2 resolved',
        status: 'Nominal',
        statusClass: 'info',
        icon: 'fa-folder-open',
        insight: {
          situation: '14 total open issues across development backlogs.',
          impact: 'Minor developer overhead, backlog velocity is healthy.',
          trendAnalysis: 'Down from 18 open issues two weeks ago.',
          aiInsight: 'Bug velocity is decreasing, signifying higher testing efficiency on unit tests.',
          action: 'Continue code reviews and daily automated check suites.',
          shortcutView: 'Web Portal'
        }
      },
      {
        id: 'kpi-resolution',
        title: 'Resolution Rate',
        value: '92%',
        trend: 'Improving ↗',
        trendClass: 'success',
        change: '+2.5%',
        status: 'Excellent',
        statusClass: 'success',
        icon: 'fa-check-circle',
        insight: {
          situation: '92% of critical bugs resolved within SLA limits.',
          impact: 'Ensures compliance with partner telemetry uptime SLAs.',
          trendAnalysis: 'Consistent improvement from 85% rate last quarter.',
          aiInsight: 'Autoscale pipeline deployment has minimized downtime and deployment regression.',
          action: 'Audit automated regression suites to maintain resolution speed.',
          shortcutView: 'Office Portal'
        }
      },
      {
        id: 'kpi-mttr',
        title: 'Mean Time To Resolution',
        value: '4.2h',
        trend: 'Decreasing ↘',
        trendClass: 'success',
        change: '-1.2h',
        status: 'Optimal',
        statusClass: 'success',
        icon: 'fa-clock',
        insight: {
          situation: 'MTTR reduced to 4.2 hours for critical telemetry services.',
          impact: 'Faster recovery from service outages and minor thread lockouts.',
          trendAnalysis: 'Reduced by 1.2 hours MoM due to auto-rollback logic.',
          aiInsight: 'Auto-rollback rules implemented on DevOps pipelines have bypassed manual incident triage.',
          action: 'Deploy automatic rollback triggers to all microservices.',
          shortcutView: 'EVcare.AI'
        }
      },
      {
        id: 'kpi-regression',
        title: 'Regression Risk',
        value: 'Low',
        trend: 'Stable →',
        trendClass: 'success',
        change: 'No Change',
        status: 'Secure',
        statusClass: 'success',
        icon: 'fa-shield-halved',
        insight: {
          situation: 'Regression risk stands at low based on code integration analytics.',
          impact: 'High confidence for upcoming v4.3.0 feature rollouts.',
          trendAnalysis: 'Stable low risk index maintained for 3 weeks.',
          aiInsight: 'SonarQube static scanning has achieved 86% coverage, mitigating regression factors.',
          action: 'Review regression testing on route models.',
          shortcutView: 'Fleet Dashboard'
        }
      },
      {
        id: 'kpi-customer-impact',
        title: 'Customer Impact Score',
        value: '2.4/10',
        trend: 'Improving ↗',
        trendClass: 'success',
        change: '-0.8 pts',
        status: 'Very Low',
        statusClass: 'success',
        icon: 'fa-face-smile',
        insight: {
          situation: 'Incident impact score reduced to a minimal 2.4/10.',
          impact: 'Less than 1% of charging sessions impacted by API disconnects.',
          trendAnalysis: 'Steady downward trend from 4.8 peak score in June.',
          aiInsight: 'Database caching layers have insulated users from transient backend outages.',
          action: 'Optimize billing summary cache schemas.',
          shortcutView: 'Web Portal'
        }
      },
      {
        id: 'kpi-quality-health',
        title: 'Overall Quality Score',
        value: '94%',
        trend: 'Improving ↗',
        trendClass: 'success',
        change: '+1.8%',
        status: 'Nominal',
        statusClass: 'success',
        icon: 'fa-heart-pulse',
        insight: {
          situation: 'Overall software quality health stands at 94%.',
          impact: 'Nominal reliability across mobility portals and AI diagnostic runtimes.',
          trendAnalysis: 'Gradual incremental growth due to regression test expansion.',
          aiInsight: 'AI telemetry scanning indicates battery models predictions are functioning with zero drift.',
          action: 'Maintain automated sanity check schedules.',
          shortcutView: 'EVcare.AI'
        }
      }
    ],
    products: [
      {
        id: 'prod-evcare',
        name: 'EVcare.AI',
        quality: '94%',
        stability: '95%',
        critical: 1,
        open: 3,
        release: 'v2.4.1',
        crashRate: '0.02%',
        customerImpact: 'Low',
        trend: 'Stable',
        risk: 'Low',
        riskClass: 'success',
        workspace: {
          components: ['Inference Engine', 'Charging Scheduler'],
          recentReleases: ['v2.4.1 (Active)', 'v2.4.0 (Rollback)', 'v2.3.9'],
          recentIssues: ['Model inference thread leakage in socket loop'],
          apis: ['Vehicle Telemetry API'],
          infrastructure: 'AWS EKS Inference cluster nominal',
          aiSummary: 'Model inference is stable; slight thread leakage in sockets loop.',
          improvements: 'Refactor web sockets pool.'
        }
      },
      {
        id: 'prod-mobile',
        name: 'Mobile Application',
        quality: '91%',
        stability: '92%',
        critical: 1,
        open: 5,
        release: 'v4.2.0',
        crashRate: '0.08%',
        customerImpact: 'Medium',
        trend: 'Stable',
        risk: 'Medium',
        riskClass: 'warning',
        workspace: {
          components: ['Auth SSO', 'Push Telematics'],
          recentReleases: ['v4.2.0 (Active)', 'v4.1.8', 'v4.1.5'],
          recentIssues: ['SSO token verification occasionally times out'],
          apis: ['Auth & mTLS Security API'],
          infrastructure: 'Gateway edge nodes nominal',
          aiSummary: 'SSO token verification occasionally times out.',
          improvements: 'Optimize JWT lookup indexing.'
        }
      },
      {
        id: 'prod-fleet',
        name: 'Fleet Dashboard',
        quality: '86%',
        stability: '88%',
        critical: 1,
        open: 4,
        release: 'v3.1.2',
        crashRate: '0.15%',
        customerImpact: 'High',
        trend: 'Increasing',
        risk: 'High',
        riskClass: 'danger',
        workspace: {
          components: ['Realtime Routing Map', 'Dispatch Matrix'],
          recentReleases: ['v3.1.2 (Active)', 'v3.1.0', 'v3.0.8'],
          recentIssues: ['Routing calculations drop connections under peak loads'],
          apis: ['Fleet Control & Dispatch API'],
          infrastructure: 'Map tiling service nominal',
          aiSummary: 'Routing calculations under peak loads drop connections.',
          improvements: 'Add Kafka ingress auto-scalers.'
        }
      },
      {
        id: 'prod-web',
        name: 'Web Portal',
        quality: '96%',
        stability: '98%',
        critical: 0,
        open: 2,
        release: 'v2.1.0',
        crashRate: '0.005%',
        customerImpact: 'Low',
        trend: 'Improving',
        risk: 'Low',
        riskClass: 'success',
        workspace: {
          components: ['Billing Summary', 'Charging Grid Map'],
          recentReleases: ['v2.1.0 (Active)', 'v2.0.8', 'v2.0.5'],
          recentIssues: ['Visual overflow on legacy invoices'],
          apis: ['Payment & Tariff Gateway API'],
          infrastructure: 'Static CDN servers nominal',
          aiSummary: 'Billing page loads instantly; zero security issues detected.',
          improvements: 'Maintain static asset cache headers.'
        }
      },
      {
        id: 'prod-office',
        name: 'Office Portal',
        quality: '98%',
        stability: '99%',
        critical: 0,
        open: 0,
        release: 'v1.2.0',
        crashRate: '0.001%',
        customerImpact: 'Low',
        trend: 'Stable',
        risk: 'Low',
        riskClass: 'success',
        workspace: {
          components: ['CTO Dashboard subpages'],
          recentReleases: ['v1.2.0 (Active)', 'v1.1.0'],
          recentIssues: ['None'],
          apis: ['Internal Admin APIs'],
          infrastructure: 'Local portal servers nominal',
          aiSummary: 'Dashboard rendering passes all automated testing with high performance score.',
          improvements: 'No action needed.'
        }
      }
    ],
    issueRisks: [
      { severity: 'Critical', openCount: 3, resolvedToday: 2, resolutionTime: '2.5h', impact: 'High (Blocks Customer Trips)', products: 'Fleet Dashboard, Mobile App', trend: 'Stable ↗', trendClass: 'warning', rec: 'Approve hotfix for Map routing.' },
      { severity: 'High', openCount: 5, resolvedToday: 4, resolutionTime: '6.2h', impact: 'Medium (Latency in Payment Ingest)', products: 'Web Portal, EVcare.AI', trend: 'Decreasing ↘', trendClass: 'success', rec: 'Optimize Stripe thread pool allocations.' },
      { severity: 'Medium', openCount: 4, resolvedToday: 8, resolutionTime: '14.5h', impact: 'Low (Visual spacing alignment)', products: 'Office Portal', trend: 'Stable →', trendClass: 'info', rec: 'Clean up dead SCSS class mappings.' },
      { severity: 'Low', openCount: 2, resolvedToday: 12, resolutionTime: '24.0h', impact: 'None (Documentation links)', products: 'Document Repository', trend: 'Decreasing ↘', trendClass: 'success', rec: 'Synchronize technical manuals next release.' }
    ],
    landscape: [
      {
        id: 'bug-1',
        title: 'Model inference socket thread leak',
        desc: 'Memory footprint grows during high-frequency real-time telematics packet streams.',
        product: 'EVcare.AI',
        category: 'Performance Leak',
        impact: 'High (Can crash inference engine pods)',
        usersAffected: '520 Vehicles',
        severity: 'Critical',
        priority: 'P0',
        env: 'Production',
        component: 'Inference Engine',
        service: 'Telemetry API',
        release: 'v2.4.1',
        status: 'Open (Fixing)',
        team: 'IoT Team',
        estResolution: 'Tomorrow 12:00 PM',
        sprint: 'Sprint 43',
        relRelease: 'v2.4.2-rc1',
        api: 'Vehicle Telemetry API',
        infra: 'AWS EKS Inference cluster',
        db: 'TimescaleDB metric store',
        rootCause: 'Websockets polling loops do not close dormant sockets, leaking socket file descriptors.',
        prevention: 'Enforce connection timeout heartbeat cycles and automatic garbage collection GCs.'
      },
      {
        id: 'bug-2',
        title: 'SSO Auth token exchange timeouts',
        desc: 'SSO verification occasionally stalls under concurrent commuter user login flows.',
        product: 'Mobile Application',
        category: 'SSO Authentication',
        impact: 'Medium (Delays login by 4s)',
        usersAffected: '1,400 Users',
        severity: 'High',
        priority: 'P1',
        env: 'Production',
        component: 'Auth SSO',
        service: 'Auth Service',
        release: 'v4.2.0',
        status: 'Under Review',
        team: 'Security Team',
        estResolution: 'Within 2 days',
        sprint: 'Sprint 43',
        relRelease: 'v4.2.1-rc3',
        api: 'Auth & mTLS Security API',
        infra: 'KrakenD API Gateway',
        db: 'Redis Auth Store',
        rootCause: 'Database query execution stalls during heavy cache lookup indexing.',
        prevention: 'Configure read replicas and optimize lookup caches indexes.'
      }
    ],
    analytics: {
      healthScore: '94.2%',
      qualityRisks: 'Fleet routing calculation drops during peak traffic hours.',
      forecast: 'Nominal (96.5% success rate for v4.3.0)',
      recommendations: 'Increase testing coverage on IoT telemetry sockets pool.'
    },
    decisions: [
      {
        id: 'dec-1',
        issue: 'Production Instability: Map routing calculation timeout under peak load',
        impact: 'Blocked driver trips, high dispatcher friction.',
        priority: 'P0 Critical',
        priorityClass: 'danger',
        recommendation: 'Approve Emergency Hotfix and scale Kafka cluster partitions to 24.',
        primaryAction: 'Approve Hotfix',
        secondaryAction: 'Request Investigation'
      },
      {
        id: 'dec-2',
        issue: 'Growing Technical Debt: SSO Auth token lookup database query stalls',
        impact: 'Delays user app login response times by ~4 seconds.',
        priority: 'P1 Warning',
        priorityClass: 'warning',
        recommendation: 'Assign Lead to Auth team to configure Redis read replica cluster.',
        primaryAction: 'Assign Lead',
        secondaryAction: 'Generate AI Report'
      },
      {
        id: 'dec-3',
        issue: 'Increase Test Coverage: IoT Telemetry sockets regression scanning',
        impact: 'Reduces post-release regression probability of the Fleet Dashboard.',
        priority: 'P2 Opportunity',
        priorityClass: 'info',
        recommendation: 'Schedule regression testing suite inside DevOps release pipelines.',
        primaryAction: 'Schedule QA',
        secondaryAction: 'Open Sprint'
      }
    ],
    copilotInsights: [
      {
        prediction: 'The Fleet Dashboard has a 74% probability of post-release regression due to unresolved backend validation issues.',
        confidence: '74%',
        impact: 'High',
        recommendation: 'Review regression testing on route models.',
        action: 'Review Regression Testing'
      },
      {
        prediction: 'Auth mTLS certificates will expire in 45 days.',
        confidence: '95%',
        impact: 'Medium',
        recommendation: 'Automate certificate renewal sequence using AWS ACM.',
        action: 'Configure Certificate'
      }
    ]
  },

  // ==========================================================
  // FEATURE REQUESTS MODULE - EXECUTIVE PRODUCT INNOVATION CENTER
  // ==========================================================
  featureRequests: {
    overviewKpis: [
      {
        id: 'kpi-total-reqs',
        title: 'Total Feature Requests',
        value: '148',
        trend: 'Stable →',
        trendClass: 'info',
        change: '+12 this month',
        status: 'Nominal',
        statusClass: 'info',
        icon: 'fa-lightbulb',
        insight: {
          situation: '148 features requested across customer portals and fleet groups.',
          impact: 'Reflects high engagement with the platform, requiring evaluation.',
          trendAnalysis: 'Stable request velocity (10-15 requests/month).',
          aiInsight: 'Merging redundant battery diagnostic tickets could reduce backlogs by 18%.',
          action: 'Approve Feature Consolidation.',
          shortcutView: 'Software Development'
        }
      },
      {
        id: 'kpi-pending-eval',
        title: 'Pending Evaluation',
        value: '18',
        trend: 'Decreasing ↘',
        trendClass: 'success',
        change: '-4 reviewed',
        status: 'Healthy',
        statusClass: 'success',
        icon: 'fa-clipboard-question',
        insight: {
          situation: '18 requests currently in collect/evaluate stage.',
          impact: 'Minimizes analysis latency; roadmap planning is unblocked.',
          trendAnalysis: 'Decreased by 25% MoM due to fast-track triaging.',
          aiInsight: 'High-value battery modeling requires urgent EKS cluster resource allocation verification.',
          action: 'Initiate Technical Assessment.',
          shortcutView: 'Cloud Infrastructure'
        }
      },
      {
        id: 'kpi-high-val',
        title: 'High Business Value',
        value: '32',
        trend: 'Improving ↗',
        trendClass: 'success',
        change: '+6 identified',
        status: 'Excellent',
        statusClass: 'success',
        icon: 'fa-hand-holding-dollar',
        insight: {
          situation: '32 requests identified with high strategic alignment and ROI.',
          impact: 'Unlocks significant potential revenue from fleet operators.',
          trendAnalysis: 'Increasing trend as B2B customers request billing automations.',
          aiInsight: 'Stripe smart billing split features hold a projected ROI of $140K/year.',
          action: 'Approve Payment Gateway Split Features.',
          shortcutView: 'API Management'
        }
      },
      {
        id: 'kpi-approved-reqs',
        title: 'Approved Requests',
        value: '24',
        trend: 'Stable →',
        trendClass: 'info',
        change: 'No Change',
        status: 'Nominal',
        statusClass: 'info',
        icon: 'fa-circle-check',
        insight: {
          situation: '24 approved requests scheduled for release planning.',
          impact: 'Aligned with InnoVibe Q3/Q4 release target roadmaps.',
          trendAnalysis: 'Capacity velocity is stable at 6-8 features per sprint cycles.',
          aiInsight: 'Developer availability in Sprint 44 is sufficient to take on 2 extra high-priority features.',
          action: 'Open Sprint Management.',
          shortcutView: 'Sprint Management'
        }
      },
      {
        id: 'kpi-adoption-score',
        title: 'Feature Adoption Score',
        value: '84%',
        trend: 'Improving ↗',
        trendClass: 'success',
        change: '+3.2% MoM',
        status: 'High',
        statusClass: 'success',
        icon: 'fa-chart-line',
        insight: {
          situation: '84% of recently launched features are actively adopted by clients.',
          impact: 'Validates quality of product planning and customer alignment.',
          trendAnalysis: 'Steady growth from 78% score in Q1.',
          aiInsight: 'Recently deployed EV diagnostics telemetry has seen 92% adoption among fleet managers.',
          action: 'Increase capacity on telemetry backend sockets.',
          shortcutView: 'Database Management'
        }
      },
      {
        id: 'kpi-demand-index',
        title: 'Customer Demand Index',
        value: '9.1/10',
        trend: 'Improving ↗',
        trendClass: 'success',
        change: '+0.4 pts',
        status: 'Very High',
        statusClass: 'success',
        icon: 'fa-star',
        insight: {
          situation: 'Demand score indicates strong urgency for new smart-charging integrations.',
          impact: 'Potential competitive risk if charging automations are delayed.',
          trendAnalysis: 'Spiked by 1.2 pts following competitor release announcements.',
          aiInsight: 'Predictive battery health forecasting represents the single highest customer search query.',
          action: 'Approve Predictive Battery feature review.',
          shortcutView: 'EVcare.AI'
        }
      }
    ],
    priorityCategories: {
      strategic: [
        {
          id: 'feat-1',
          name: 'Predictive Battery Degradation Forecasting',
          product: 'EVcare.AI',
          requestedBy: 'B2B Fleet Operator Group',
          businessValue: 'High ($180K/year value)',
          demand: 'Critical (9.5/10 index)',
          alignment: 'Strategic Core Feature',
          complexity: 'High (requires AI models)',
          priority: 'P0 Critical',
          priorityClass: 'danger',
          status: 'Evaluating',
          workspace: {
            problem: 'Fleet managers cannot estimate state-of-health decay rates of EV batteries.',
            outcome: 'Extend average battery cell lifetimes by 18% via preventative charging.',
            source: 'Fleet Owner Survey',
            impact: 'Revenue retention and decreased battery replacements.',
            customerValue: 'Avoid sudden roadside breakdown risks.',
            benefits: 'Optimized energy dispatching profiles.',
            techComplexity: 'High (needs telemetry streaming neural nets)',
            systems: 'AWS EKS GPU compute cluster',
            dependencies: 'Vehicle Sockets Ingress API',
            relatedApis: 'Vehicle Telemetry API',
            relatedAi: 'Battery Degradation Forecast Model v2.4',
            effort: '3 Sprints',
            recPriority: 'Critical (P0)',
            recRelease: 'v2.5.0-rc1'
          }
        }
      ],
      growth: [
        {
          id: 'feat-2',
          name: 'Stripe Smart Tariff Billing Splits',
          product: 'Web Portal',
          requestedBy: 'Finance & Account Manager',
          businessValue: 'Medium ($95K/year ROI)',
          demand: 'High (8.2/10 index)',
          alignment: 'Growth Accelerator',
          complexity: 'Medium (payment gateways)',
          priority: 'P1 High',
          priorityClass: 'warning',
          status: 'Under Review',
          workspace: {
            problem: 'B2B billing splits must be performed manually after charging sessions.',
            outcome: 'Instant, automated corporate split billing at charging stations.',
            source: 'Internal Finance Team',
            impact: 'Saves 32h/month accounting manual reconciliation overhead.',
            customerValue: 'Clean, instantly exportable tax invoicing logs.',
            benefits: 'Improves transaction speeds by 90%.',
            techComplexity: 'Medium (mTLS webhooks + Stripe SDK)',
            systems: 'Billing gateway proxy instances',
            dependencies: 'Payment Gateway APIs',
            relatedApis: 'Payment & Tariff Gateway API',
            relatedAi: 'None',
            effort: '2 Sprints',
            recPriority: 'High (P1)',
            recRelease: 'v2.2.0'
          }
        }
      ],
      operational: [
        {
          id: 'feat-3',
          name: 'Real-time Telemetry Geo-Ingress Router',
          product: 'Fleet Dashboard',
          requestedBy: 'DevOps & Infrastructure Team',
          businessValue: 'High (Saves $45K/year compute)',
          demand: 'Medium (6.8/10 index)',
          alignment: 'Operational Efficiency',
          complexity: 'High (Kafka ingress mesh)',
          priority: 'P2 Medium',
          priorityClass: 'info',
          status: 'Plan Approved',
          workspace: {
            problem: 'Cross-region telemetry traffic triggers heavy cloud network costs.',
            outcome: 'Route data points locally to nearest regional cluster node.',
            source: 'Cloud Ingress Audit',
            impact: 'Reduces cloud data transit latency by 35%.',
            customerValue: 'Faster UI state syncs in mapping dashboards.',
            benefits: 'Lowers ingress computing stress.',
            techComplexity: 'High (Envoy proxies + Geo-DNS rules)',
            systems: 'Envoy Ingress Mesh',
            dependencies: 'Regional DNS mapping services',
            relatedApis: 'Fleet Control & Dispatch API',
            relatedAi: 'None',
            effort: '3 Sprints',
            recPriority: 'Medium (P2)',
            recRelease: 'v3.2.0'
          }
        }
      ],
      innovation: [
        {
          id: 'feat-4',
          name: 'Autopilot EV Dispatching Simulator',
          product: 'Fleet Dashboard',
          requestedBy: 'Strategic Partnerships Division',
          businessValue: 'Low ($20K/year research)',
          demand: 'Low (4.2/10 index)',
          alignment: 'Future Innovation',
          complexity: 'Very High (Simulation physics)',
          priority: 'P3 Low',
          priorityClass: 'info',
          status: 'Evaluating',
          workspace: {
            problem: 'No environment exists to test routing heuristics under massive scale.',
            outcome: 'Simulate 10,000 active automated EVs under virtual grid stresses.',
            source: 'Heuristics Division',
            impact: 'Provides benchmark data for strategic partner proposals.',
            customerValue: 'Proof-of-concept modeling for autonomous contracts.',
            benefits: 'Validation sandbox for dispatching dispatch rules.',
            techComplexity: 'Very High (Unity Server/C++ models integration)',
            systems: 'AWS Batch High Performance Computing',
            dependencies: 'Geo-Routing Engine databases',
            relatedApis: 'Fleet Control & Dispatch API',
            relatedAi: 'Grid Load Balance Heuristics Model',
            effort: '5 Sprints',
            recPriority: 'Low (P3)',
            recRelease: 'Research Sandbox Q4'
          }
        }
      ]
    },
    analytics: {
      innovationTrend: '+14% Strategic Alignment Increase',
      emergingNeeds: 'Corporate fleet charging splits, predictive cell battery state-of-health tracking.',
      recommendedInvestments: 'Focus 60% of Q3 engineering capacity on EVcare.AI predictive battery features.',
      aiSummary: 'B2B customers show a strong demand surge for smart tariff integrations. Transitioning current telemetry features to locally-routed ingress will support the additional load.'
    },
    crossModuleImpact: {
      development: {
        capacity: '84% (Adequate)',
        readiness: 'High (Dockerized codebases)',
        shortcut: 'software-development'
      },
      roadmap: {
        status: 'v4.3 Release Candidate Locked',
        window: 'Q3 2026 Release Window',
        shortcut: 'product-roadmap'
      },
      sprints: {
        status: 'Sprint 44 Backlog Grooming',
        nextSprint: 'Sprint 44 starting next week',
        shortcut: 'sprint-management'
      },
      bugs: {
        concerns: 'Auth SSO token timeout warning',
        similar: '1 active P1 bug on SSO Auth',
        shortcut: 'bug-tracking'
      },
      aiModels: {
        opportunity: 'Integrate battery state-of-health forecast models',
        shortcut: 'ai-diagnostics'
      }
    },
    decisions: [
      {
        id: 'feat-dec-1',
        category: 'Immediate Opportunities',
        issue: 'Approve Predictive Battery Degradation Forecasting (EVcare.AI)',
        value: 'High Strategic',
        impact: 'High (Blocks fleet purchases)',
        effort: '3 Sprints',
        rec: 'Approve feature and schedule resource allocation for Sprint 44.',
        priority: 'P0 Critical',
        priorityClass: 'danger',
        primaryAction: 'Approve',
        secondaryAction: 'Request Analysis'
      },
      {
        id: 'feat-dec-2',
        category: 'Requires Review',
        issue: 'Autopilot EV Dispatching Simulator Complexity Override',
        value: 'Low ROI',
        impact: 'Low Customer Value',
        effort: '5 Sprints',
        rec: 'Defer implementation until core telemetry route calculations stabilize.',
        priority: 'P2 Warning',
        priorityClass: 'warning',
        primaryAction: 'Defer',
        secondaryAction: 'Generate AI Assessment'
      },
      {
        id: 'feat-dec-3',
        category: 'Future Consideration',
        issue: 'Smart Tariff Billing splits multi-region integration checks',
        value: 'Medium Growth',
        impact: 'Medium',
        effort: '2 Sprints',
        rec: 'Assign Product Team lead to verify compliance on European tax rules.',
        priority: 'P1 Opportunity',
        priorityClass: 'info',
        primaryAction: 'Assign Product Team',
        secondaryAction: 'Open Roadmap'
      }
    ],
    copilotInsights: [
      {
        prediction: 'Five similar customer requests for predictive battery analytics can be merged into one high-value initiative.',
        confidence: '92%',
        impact: 'High',
        recommendation: 'Merge telemetry tickets into the core Predictive Battery Forecasting feature.',
        action: 'Approve Feature Review'
      },
      {
        prediction: 'Corporate charging splits feature splits will boost Stripe checkout volumes by 15%.',
        confidence: '86%',
        impact: 'Medium',
        recommendation: 'Prioritize Stripe Smart splits for Q3 release path.',
        action: 'Configure Roadmap'
      }
    ]
  },

  // ==========================================================
  // SPRINT MANAGEMENT MODULE - EXECUTIVE ENGINEERING DELIVERY
  // ==========================================================
  sprintManagement: {
    commandCenter: {
      sprintNumber: 'Sprint 43',
      goal: 'Upgrade core telematics sockets telemetry and secure token caches splits',
      duration: '14 Days (10 Days Elapsed)',
      day: 10,
      completion: 82,
      blockedWork: '1 Critical Blocker',
      burndown: 'On Track',
      metrics: [
        {
          id: 'kpi-confidence',
          name: 'Delivery Confidence',
          value: '89%',
          icon: 'fa-chart-line',
          insight: {
            situation: 'Velocity stats indicate an 89% probability of completing all committed sprint items.',
            impact: 'Highly likely to deliver v2.5.0-rc1 telemetry features on schedule.',
            prediction: 'Minor risk if new auth bugs emerge during final regression QA.',
            aiInsight: 'Current velocity indicates an 89% probability of completing the sprint before release.',
            action: 'Review Backend Capacity',
            shortcutView: 'software-development'
          }
        },
        {
          id: 'kpi-health',
          name: 'Sprint Health',
          value: 'Nominal',
          icon: 'fa-heart-pulse',
          insight: {
            situation: 'Active sprint health index stands at 92% based on low churn and blockages.',
            impact: 'Nominal coding velocity across EKS microservices.',
            prediction: 'Will close Sprint 43 with less than 2 carry-forward features.',
            aiInsight: 'Resource utilization is balanced across Frontend and IoT teams.',
            action: 'Continue Current Sprint Strategy',
            shortcutView: 'sprint-management'
          }
        },
        {
          id: 'kpi-ready',
          name: 'Release Readiness',
          value: '94%',
          icon: 'fa-truck-ramp-box',
          insight: {
            situation: 'Release candidate build has successfully passed 94% of automated testing gates.',
            impact: 'Secure deployment sequence to production grid is unblocked.',
            prediction: 'Will reach 100% readiness once auth certificate renews.',
            aiInsight: 'Static analysis verifies zero security regression items in this build.',
            action: 'Schedule Production Deployments',
            shortcutView: 'devops-pipelines'
          }
        }
      ]
    },
    timeline: [
      { id: 'time-planning', name: 'Planning', completion: '100%', duration: '1 Day', teams: 'All Teams', status: 'Passed', statusClass: 'success', bottlenecks: 'None', notes: 'Groomed Sprint 43 backlog, locked goals.' },
      { id: 'time-dev', name: 'Development', completion: '92%', duration: '7 Days', teams: 'IoT, Security, Billing', status: 'Active', statusClass: 'info', bottlenecks: 'Backend socket thread leak (IoT)', notes: 'Core telematics code complete; final socket optimizations.' },
      { id: 'time-review', name: 'Code Review', completion: '78%', duration: '2 Days', teams: 'All Tech Leads', status: 'Active', statusClass: 'info', bottlenecks: 'Lead availability (Holiday)', notes: 'mTLS security review complete; Billing PRs pending review.' },
      { id: 'time-testing', name: 'Testing', completion: '64%', duration: '2 Days', teams: 'QA, Automation', status: 'Pending', statusClass: 'grey', bottlenecks: 'Database replica locks', notes: 'Automated integration suites started. DB scaling locks investigated.' },
      { id: 'time-qa', name: 'QA Validation', completion: '0%', duration: '1 Day', teams: 'QA Team', status: 'Pending', statusClass: 'grey', bottlenecks: 'None', notes: 'Manual verify checkouts slated for Day 12.' },
      { id: 'time-ready', name: 'Release Ready', completion: '0%', duration: '1 Day', teams: 'Release Ops', status: 'Pending', statusClass: 'grey', bottlenecks: 'None', notes: 'Slated for Day 13 RC branch builds.' },
      { id: 'time-completed', name: 'Completed', completion: '0%', duration: 'Day 14', teams: 'CTO Office', status: 'Pending', statusClass: 'grey', bottlenecks: 'None', notes: 'Retro scheduling and sprint closure.' }
    ],
    deliveryIntelligence: [
      { team: 'Backend', velocity: '48 pts', capacity: '90%', utilization: '86%', consistency: '94%', blocked: '0 pts', quality: '95%', contribution: 'Telemetry APIs', trend: 'Stable ↗', trendClass: 'success' },
      { team: 'Frontend', velocity: '36 pts', capacity: '85%', utilization: '80%', consistency: '92%', blocked: '2 pts', quality: '96%', contribution: 'Fleet UI', trend: 'Stable →', trendClass: 'info' },
      { team: 'Mobile', velocity: '32 pts', capacity: '80%', utilization: '82%', consistency: '88%', blocked: '4 pts', quality: '91%', contribution: 'EVcare App', trend: 'Decreasing ↘', trendClass: 'warning' },
      { team: 'AI/ML', velocity: '28 pts', capacity: '95%', utilization: '92%', consistency: '95%', blocked: '0 pts', quality: '94%', contribution: 'Battery Model', trend: 'Stable ↗', trendClass: 'success' },
      { team: 'Cloud', velocity: '20 pts', capacity: '90%', utilization: '88%', consistency: '96%', blocked: '0 pts', quality: '98%', contribution: 'EKS Clusters', trend: 'Stable ↗', trendClass: 'success' },
      { team: 'Platform', velocity: '18 pts', capacity: '85%', utilization: '84%', consistency: '90%', blocked: '0 pts', quality: '95%', contribution: 'mTLS Keys', trend: 'Stable →', trendClass: 'info' }
    ],
    teamWorkspaces: {
      'Backend': {
        sprintContribution: 'Telemetry ingestion APIs, Kafka brokers re-balancing, Redis read replicas.',
        recentPerformance: 'Average velocity of 48 pts over past 3 sprints. SLA resolution rate 92%.',
        capacityHistory: 'Sprint 43 (90%), Sprint 42 (85%), Sprint 41 (88%).',
        risks: 'Database locks on replica node synchronization.',
        upcomingDeliverables: 'Ingress routing local local geo-router integration.',
        aiRecommendations: 'Schedule auto-scaling partition limits on Kafka pods before telemetry ingress surge.'
      },
      'Mobile': {
        sprintContribution: 'EVcare application SSO token cache upgrade, battery degradation UI charts.',
        recentPerformance: 'Average velocity of 30 pts. Minor bottlenecks in Apple App Store submission.',
        capacityHistory: 'Sprint 43 (80%), Sprint 42 (80%), Sprint 41 (85%).',
        risks: 'SSO authentication JWT lookup timeouts.',
        upcomingDeliverables: 'Stripe Corporate splitting checkout views.',
        aiRecommendations: 'Refactor Auth API JWT index loops to avoid blocking client UI thread.'
      }
    },
    flowIntelligence: [
      { stage: 'Backlog', items: 45, cycleTime: 'N/A', blocked: 0, efficiency: '100%', trend: 'Stable →', trendClass: 'info' },
      { stage: 'Ready', items: 12, cycleTime: '0.5d', blocked: 0, efficiency: '98%', trend: 'Improving ↗', trendClass: 'success' },
      { stage: 'Development', items: 8, cycleTime: '4.2d', blocked: 1, efficiency: '85%', trend: 'Stable →', trendClass: 'info' },
      { stage: 'Code Review', items: 4, cycleTime: '1.2d', blocked: 0, efficiency: '92%', trend: 'Improving ↗', trendClass: 'success' },
      { stage: 'Testing', items: 6, cycleTime: '2.1d', blocked: 2, efficiency: '78%', trend: 'Decreasing ↘', trendClass: 'warning' },
      { stage: 'QA', items: 2, cycleTime: '1.0d', blocked: 0, efficiency: '95%', trend: 'Stable →', trendClass: 'info' },
      { stage: 'Ready for Release', items: 4, cycleTime: '0.8d', blocked: 0, efficiency: '99%', trend: 'Improving ↗', trendClass: 'success' },
      { stage: 'Completed', items: 32, cycleTime: 'N/A', blocked: 0, efficiency: '100%', trend: 'Stable →', trendClass: 'info' }
    ],
    sprintsList: [
      {
        id: 'sprint-43',
        name: 'Sprint 43 (Active)',
        goal: 'Upgrade core telematics sockets telemetry and secure token caches splits',
        objective: 'Improve platform stability and transition to secure corporate billing models',
        release: 'v2.5.0-rc1 release candidate integration',
        teams: 'Backend, Mobile, Security Teams',
        plannedWork: '12 Stories / 48 points committed',
        completedWork: '8 Stories / 32 points resolved',
        carryForward: '2 Stories / 8 points projected',
        velocity: '42 pts current',
        completionRate: '82%',
        utilization: '86%',
        blockers: 'Redis auth replica synchronization locks',
        impact: 'Delays SSO verification testing by 1.5 days',
        delay: '36 Hours projected delay',
        affectedProducts: 'Mobile Application, EVcare.AI',
        recommendations: 'Provision Redis replicas and configure auto-failover certificates.',
        prevSprint: 'Sprint 42',
        prevVelocityChange: '+4 points increase',
        prevQualityChange: '+1.5% SLA improvement',
        prevCompletionChange: '+2.8% completion rate',
        lessons: 'Enforce stricter code review gate guidelines earlier in sprint cycles.'
      }
    ],
    releaseConfidence: {
      probability: '92%',
      readiness: '94%',
      testing: '88%',
      deployment: '96%',
      quality: '95%',
      overall: '93%',
      aiSummary: 'Confidence increased due to 96% static coverage scores on billing routes; decreased due to Redis synchronization lags. Risks are low. Outcome is high success deployment.'
    },
    bottlenecks: [
      { severity: 'Critical', issue: 'Backend Capacity Saturation', impact: 'Limits telemetry Kafka ingestion throughput rates.', sprint: 'Sprint 43', delay: '18 hours delay', rec: 'Scale Kafka brokers cluster partitions from 12 to 24.', action: 'Scale Kafka Brokers' },
      { severity: 'High', issue: 'Testing Lags on SSO Auth', impact: 'Stalls QA verification of corporate split billing.', sprint: 'Sprint 43', delay: '24 hours delay', rec: 'Assign QA Lead to auth manual smoke runs.', action: 'Assign QA Lead' }
    ],
    decisions: [
      {
        id: 'spr-dec-1',
        category: 'Critical Opportunities',
        issue: 'Sprint Delay Risk: Redis replica sync locks auth verification',
        impact: 'Delays v2.5.0-rc1 testing and mobile SSO deployment.',
        engImpact: 'Auth team blocked from merging final split checkout PRs.',
        priority: 'P0 Critical',
        priorityClass: 'danger',
        recommendation: 'Configure auto-failover certificates and allocate 2 Cloud platform engineers.',
        primaryAction: 'Approve Resource Allocation',
        secondaryAction: 'Review Sprint'
      },
      {
        id: 'spr-dec-2',
        category: 'Requires Review',
        issue: 'Testing Lags: Database locking on replica tests',
        impact: 'Increases average test cycle times by 1.2 days.',
        engImpact: 'Slowing down final QA validation gate approvals.',
        priority: 'P1 Warning',
        priorityClass: 'warning',
        recommendation: 'Open team performance dashboard to adjust database resource locks.',
        primaryAction: 'Open Team Performance',
        secondaryAction: 'Generate AI Analysis'
      }
    ],
    copilotInsights: [
      {
        prediction: 'Current backend velocity suggests a 78% probability of completing all committed work before sprint closure.',
        confidence: '78%',
        impact: 'Medium',
        recommendation: 'Allocate one additional backend engineer for the authentication services.',
        action: 'Allocate Engineer'
      },
      {
        prediction: 'Database replica locks will delay regression validation of the fleet dispatch simulator.',
        confidence: '84%',
        impact: 'High',
        recommendation: 'Provision staging replica databases with high compute scaling parameters.',
        action: 'Review DB Resources'
      }
    ]
  },

  // ==========================================================
  // PRODUCT ROADMAP MODULE - STRATEGY & ROADMAP CENTER
  // ==========================================================
  productRoadmap: {
    overviewKpis: [
      { title: 'Active Initiatives', value: '12', trend: 'Stable →', trendClass: 'info', change: '+2 this quarter', icon: 'fa-chess-knight' },
      { title: 'Upcoming Releases', value: '4', trend: 'Improving ↗', trendClass: 'success', change: 'On Track', icon: 'fa-truck-ramp-box' },
      { title: 'Roadmap Progress', value: '76%', trend: 'Stable →', trendClass: 'info', change: '+4.5% MoM', icon: 'fa-bars-progress' },
      { title: 'Portfolio Coverage', value: '94%', trend: 'Stable →', trendClass: 'info', change: 'Nominal', icon: 'fa-cubes' },
      {
        title: 'Roadmap Confidence',
        value: '92%',
        trend: 'Stable →',
        trendClass: 'info',
        change: 'High',
        icon: 'fa-shield-halved',
        insight: {
          situation: 'Active initiatives remain on track; minor lag identified in the Fleet Telemetry ingestion APIs.',
          impact: 'Potential delay in real-time alert updates if dependency isn\'t resolved by Q3-end.',
          engImpact: 'Platform engineers are currently allocated to Kafka stream broker configurations.',
          aiInsight: 'Three initiatives remain on schedule, however Fleet Analytics depends on Telemetry Platform completion.',
          action: 'Review Dependencies',
          shortcutView: 'sprint-management'
        }
      },
      { title: 'At-Risk Initiatives', value: '1', trend: 'Decreasing ↘', trendClass: 'success', change: '-1 resolved', icon: 'fa-circle-exclamation' }
    ],
    timelineCategories: {
      current: [
        { id: 'init-1', name: 'Predictive Battery Analytics', product: 'EVcare.AI', objective: 'Deploy ML-driven state-of-health forecast models', priority: 'High', phase: 'Development', release: 'v2.5.0-rc1', readiness: '92%', risk: 'Low', status: 'On Track', statusClass: 'success' },
        { id: 'init-2', name: 'Stripe Multi-Region Billing', product: 'Fleet Management', objective: 'Enable corporate split checkout checkout options', priority: 'Critical', phase: 'Code Review', release: 'v2.5.0-rc1', readiness: '88%', risk: 'Medium', status: 'Needs Attention', statusClass: 'warning' }
      ],
      next: [
        { id: 'init-3', name: 'Autopilot EV Simulator v2', product: 'Office Portal', objective: 'Physics simulation sandbox sandbox overrides', priority: 'Medium', phase: 'Planning', release: 'v2.6.0', readiness: '45%', risk: 'Low', status: 'On Track', statusClass: 'success' },
        { id: 'init-4', name: 'mTLS Client Certificates', product: 'Mobile Application', objective: 'Secure device credentials split storage', priority: 'High', phase: 'Design', release: 'v2.6.0', readiness: '60%', risk: 'Medium', status: 'On Track', statusClass: 'success' }
      ],
      future: [
        { id: 'init-5', name: 'ChargePoint OpenADR Grid', product: 'Website', objective: 'V2G smart charging splits telemetry integrations', priority: 'Low', phase: 'Vision', release: 'v3.0.0', readiness: '10%', risk: 'High', status: 'Evaluating', statusClass: 'grey' }
      ]
    },
    initiativesList: [
      {
        id: 'init-1',
        name: 'Predictive Battery Analytics',
        vision: 'Provide real-time battery state-of-health diagnostics and degradation forecasting models.',
        objective: 'Reduce customer range anxiety and increase B2B commercial operator trust.',
        businessOwner: 'Sarah Jenkins (VP Product)',
        productOwner: 'David K. (EVcare.AI Product Lead)',
        value: '$240K/yr projected subscription volumes; 15% user retention gain.',
        startDate: 'June 1, 2026',
        release: 'v2.5.0-rc1 (Q3 2026)',
        phase: 'Development',
        progress: '78% milestone completion rate',
        teams: 'AI/ML Team, Backend API Squad',
        stack: 'Python, PyTorch, FastAPI, TimescaleDB',
        platformReadiness: 'High (EKS GPU nodes allocated)',
        capacity: '92% current utilization rates',
        dependencies: {
          apis: 'Telemetry Ingress APIs',
          apps: 'EVcare Mobile client apps',
          infra: 'TimescaleDB cluster partition splits',
          cloud: 'AWS S3 bucket datasets',
          ai: 'LSTM degradation models',
          vendor: 'None'
        },
        risks: {
          business: 'Minor client churn if initial predictions drift above 5% margin of error.',
          engineering: 'High compute latency during concurrent telematics connection syncs.',
          dependency: 'Depends on Telemetry Platform API integration completing by Day 15.',
          market: 'Competitor EV platforms launching similar state-of-health scoring modules.'
        },
        aiRecommendations: 'Accelerate Telemetry Platform deployment to avoid delaying Fleet Analytics.'
      },
      {
        id: 'init-2',
        name: 'Stripe Multi-Region Billing',
        vision: 'Consolidate global payment profiles, taxes, and automatic corporate split invoices.',
        objective: 'Support multi-tenant corporate accounts billing splits in EU/APAC.',
        businessOwner: 'Markus Vance (VP Finance)',
        productOwner: 'Alice Cho (Billing Team Lead)',
        value: 'Unlocks $450K corporate pilot pipeline in Germany and France.',
        startDate: 'July 15, 2026',
        release: 'v2.5.0-rc1 (Q3 2026)',
        phase: 'Code Review',
        progress: '85% milestones locked',
        teams: 'Billing Squad, Security Team',
        stack: 'Go, Stripe API, PostgreSQL, Redis',
        platformReadiness: 'Medium (Stripe sandbox webhooks configured)',
        capacity: '88% resource allocation',
        dependencies: {
          apis: 'Stripe Corporate Billing Webhooks',
          apps: 'Fleet Dashboard billing consoles',
          infra: 'PostgreSQL read replicas',
          cloud: 'AWS KMS key splits storage',
          ai: 'None',
          vendor: 'Stripe Billing API compliance'
        },
        risks: {
          business: 'Compliance lags on local European VAT tax rules.',
          engineering: 'Latency spikes in transaction ledger sync loops.',
          dependency: 'Redis transaction cache sync locks in active sprints.',
          market: 'None'
        },
        aiRecommendations: 'Review local billing replica caches to prevent transaction synchronization locks.'
      }
    ],
    healthCenter: {
      metrics: [
        { name: 'Roadmap Confidence', value: '92%', status: 'Nominal', score: 92 },
        { name: 'Release Readiness', value: '94%', status: 'Nominal', score: 94 },
        { name: 'Engineering Alignment', value: '91%', status: 'Nominal', score: 91 },
        { name: 'Dependency Health', value: '88%', status: 'Warning', score: 88 },
        { name: 'Resource Readiness', value: '89%', status: 'Nominal', score: 89 },
        { name: 'Portfolio Progress', value: '76%', status: 'Nominal', score: 76 }
      ],
      aiSummary: 'Roadmap health stands at a high nominal 92%. Active strategic initiatives remain aligned with v2.5.0 release timelines.',
      risks: 'Telemetry Platform dependency delays Fleet Analytics. Stripe token sync needs review.',
      milestones: 'Q3 Telematics integration lock scheduled for Day 15. EU Billing Pilot launch for Q4.',
      aiRecommendations: 'Accelerate Telemetry Platform deployment to avoid delaying Fleet Analytics.'
    },
    portfolioProducts: [
      { name: 'EVcare.AI', initiatives: 'Predictive Battery Analytics, Battery degradation forecasting', nextRelease: 'v2.5.0-rc1', status: 'Active Development', alignment: 'Core Customer Strategy', priority: 'High', contribution: 'State-of-Health Diagnostic scoring' },
      { name: 'Fleet Management', initiatives: 'Stripe Multi-Region Billing, Kafka event telemetry brokers', nextRelease: 'v2.5.0-rc1', status: 'Active Development', alignment: 'B2B Revenue Growth', priority: 'Critical', contribution: 'Corporate split billings' },
      { name: 'Office Portal', initiatives: 'Autopilot EV Simulator v2, DevOps deployment automation', nextRelease: 'v2.6.0', status: 'Planning', alignment: 'Operational Savings', priority: 'Medium', contribution: 'CTO dashboard modules' },
      { name: 'Mobile Application', initiatives: 'mTLS Client Credentials, SSO JWT authentication token caches', nextRelease: 'v2.6.0', status: 'Design', alignment: 'Security & Trust', priority: 'High', contribution: 'Local credential splits vaults' },
      { name: 'Website', initiatives: 'ChargePoint OpenADR Grid, V2G smart charging splits', nextRelease: 'v3.0.0', status: 'Vision', alignment: 'Future Innovation', priority: 'Low', contribution: 'Grid integration models' }
    ],
    dependencyIntelligence: [
      { name: 'Telemetry Platform', status: 'Critical Dependency', affected: 'Fleet Analytics, Predictive Maintenance', impact: 'High (Blocks real-time status feeds)', risk: 'High', rec: 'Accelerate Telemetry Platform Completion', action: 'Scale Telemetry Team' },
      { name: 'SSO Auth Cache', status: 'Active Dependency', affected: 'Mobile App Credentials, Checkout views', impact: 'Medium (Delays billing verification)', risk: 'Medium', rec: 'Refactor Auth API JWT token index loops', action: 'Refactor Auth Loop' }
    ],
    decisions: [
      {
        id: 'rdm-dec-1',
        category: 'Critical Opportunities',
        issue: 'Dependency Delay: Telemetry Platform blocks Fleet Analytics',
        impact: 'Delays Q3 release of predictive battery diagnostic scoring.',
        engImpact: 'AI/ML team blocked from receiving live telemetry stream inputs.',
        priority: 'P0 Critical',
        priorityClass: 'danger',
        recommendation: 'Temporarily allocate 2 senior backend API engineers to Telemetry Platform integrations.',
        primaryAction: 'Allocate Resources',
        secondaryAction: 'Review Architecture'
      },
      {
        id: 'rdm-dec-2',
        category: 'Warnings',
        issue: 'Resource Constraints: Billing Team capacity saturated',
        impact: 'Slowing down Stripe multi-region vat configurations.',
        engImpact: 'Sprints carrying forward 2 critical payment invoice stories.',
        priority: 'P1 Warning',
        priorityClass: 'warning',
        recommendation: 'Open team performance workspace to adjust developer allocations.',
        primaryAction: 'Open Related Module',
        secondaryAction: 'Adjust Timeline'
      }
    ],
    copilotInsights: [
      {
        prediction: 'The AI Diagnostics initiative has an 84% probability of meeting the planned release date, provided Telemetry Platform milestones remain on schedule.',
        confidence: '84%',
        impact: 'High',
        recommendation: 'Review Telemetry Platform progress and allocate resource fallback paths.',
        action: 'Review Progress'
      },
      {
        prediction: 'Deploying mTLS client certificate vaults in Q4 will reduce API authentication breaches to zero.',
        confidence: '95%',
        impact: 'Medium',
        recommendation: 'Expedite mTLS client cert splits design locks in current sprint schedules.',
        action: 'Approve Design'
      }
    ]
  },
  iotDeviceManagement: {
    kpis: [
      { id: 'total-devices', title: 'Total Registered Devices', value: '3,240', trend: '+142 this month', status: 'Healthy', color: 'blue', icon: 'fa-microchip', impact: '100% telemetry ingest capacity baseline.', fleets: 'All Active Squads', aiRecommendation: 'Establish redundant SIM fallback channels for winter expansion.', related: 'telemetry-platform', action: 'Inspect Fleet Telemetry' },
      { id: 'online-devices', title: 'Online Devices', value: '3,124', trend: '96.4% Active Ping', status: 'Healthy', color: 'green', icon: 'fa-signal', impact: 'Real-time routing and thermal model predictions fully operational.', fleets: 'EVcare Fleet 1 & 2', aiRecommendation: 'None.', related: 'evcare-ai-dashboard', action: 'Verify Model Performance' },
      { id: 'offline-devices', title: 'Offline Devices', value: '116', trend: '3.6% Packet Lag', status: 'Warning', color: 'orange', icon: 'fa-ban', impact: 'Loss of battery diagnostic telemetry for 116 vehicles.', fleets: 'Fleet Alpha (West India)', aiRecommendation: 'Poor signal detected in West India; investigate local Jio network outages.', related: 'system-logs', action: 'View Connectivity Logs' },
      { id: 'ota-compliance', title: 'OTA Compliance', value: '98.2%', trend: 'Target: 95%', status: 'Healthy', color: 'purple', icon: 'fa-circle-check', impact: 'Zero active vulnerabilities in production firmware tracks.', fleets: 'All Active Squads', aiRecommendation: 'Approve pending v5.4-rc2 rollout to pilot group.', related: 'devops-pipelines', action: 'Approve OTA Release' },
      { id: 'avg-signal', title: 'Avg Signal Strength', value: '-68 dBm', trend: 'Excellent Signal', status: 'Healthy', color: 'green', icon: 'fa-wifi', impact: 'Nominal telemetry transmission latency under 120ms.', fleets: 'Urban Transit Hubs', aiRecommendation: 'None.', related: 'telemetry-platform', action: 'Inspect Signal Logs' },
      { id: 'avg-health', title: 'Average Device Health', value: '96.8%', trend: 'AI Reliability Index', status: 'Healthy', color: 'green', icon: 'fa-heart-pulse', impact: 'High predicted hardware reliability across model generations.', fleets: 'All Active Squads', aiRecommendation: 'Monitor 3 devices flagged with early thermal diagnostics warning.', related: 'ai-diagnostics', action: 'Inspect Warnings' },
      { id: 'attention-required', title: 'Devices Requiring Attention', value: '15', trend: 'Needs Inspection', status: 'Critical', color: 'red', icon: 'fa-triangle-exclamation', impact: 'High failure probability within 7 days for 3 vehicles.', fleets: 'Fleet Alpha (West India)', aiRecommendation: 'Schedule battery controller diagnostic sweep.', related: 'ai-diagnostics', action: 'Open Diagnostics Workspace' },
      { id: 'telemetry-availability', title: 'Telemetry Availability', value: '99.98%', trend: 'SLA Compliant', status: 'Healthy', color: 'blue', icon: 'fa-tower-broadcast', impact: 'Ingestion pipeline processing 14.2M daily data packets.', fleets: 'All Connected Vehicles', aiRecommendation: 'Scale ingestion queue brokers in South India.', related: 'telemetry-platform', action: 'Open Telemetry Platform' }
    ],
    lifecycle: [
      { id: 'manufactured', name: 'Manufactured', count: 4200, success: '100%', duration: '2 days', bottlenecks: 'None', status: 'Healthy', color: 'blue' },
      { id: 'registered', name: 'Registered', count: 3240, success: '98.5%', duration: '1 day', bottlenecks: 'OAuth Token Synclocks', status: 'Healthy', color: 'purple' },
      { id: 'installed', name: 'Installed', count: 3124, success: '96.2%', duration: '5 days', bottlenecks: 'SIM Provider Activation Delay', status: 'Warning', color: 'orange' },
      { id: 'activated', name: 'Activated', count: 3124, success: '100%', duration: '2 hours', bottlenecks: 'None', status: 'Healthy', color: 'green' },
      { id: 'connected', name: 'Connected', count: 3124, success: '99.4%', duration: 'Real-time', bottlenecks: 'None', status: 'Healthy', color: 'green' },
      { id: 'monitoring', name: 'Monitoring', count: 3109, success: '99.9%', duration: 'Continuous', bottlenecks: 'None', status: 'Healthy', color: 'blue' },
      { id: 'maintenance', name: 'Maintenance', count: 15, success: '92.4%', duration: '3 days', bottlenecks: 'Firmware Upgrades Pending', status: 'Critical', color: 'red' },
      { id: 'retired', name: 'Retired', count: 116, success: '100%', duration: 'N/A', bottlenecks: 'None', status: 'Neutral', color: 'grey' }
    ],
    ecosystem: [
      { id: 'fleet-alpha', type: 'Fleet', name: 'Fleet Alpha (West India)', total: 1200, healthy: 1120, warning: 65, critical: 15, lastSync: '10s ago', openIssues: 8, color: 'orange' },
      { id: 'fleet-beta', type: 'Fleet', name: 'Fleet Beta (South India)', total: 1400, healthy: 1380, warning: 20, critical: 0, lastSync: '2s ago', openIssues: 0, color: 'green' },
      { id: 'fleet-gamma', type: 'Fleet', name: 'Fleet Gamma (North India)', total: 640, healthy: 624, warning: 16, critical: 0, lastSync: '5s ago', openIssues: 2, color: 'green' },
      { id: 'oem-inv', type: 'OEM', name: 'InnoVibe Systems', total: 2000, healthy: 1980, warning: 20, critical: 0, lastSync: '2s ago', openIssues: 0, color: 'green' },
      { id: 'oem-third', type: 'OEM', name: 'Third-Party OEM', total: 1240, healthy: 1144, warning: 81, critical: 15, lastSync: '10s ago', openIssues: 10, color: 'orange' },
      { id: 'model-x1', type: 'Vehicle Model', name: 'E-Fleet X1', total: 1800, healthy: 1785, warning: 15, critical: 0, lastSync: '2s ago', openIssues: 0, color: 'green' },
      { id: 'model-urban', type: 'Vehicle Model', name: 'Urban Go', total: 1440, healthy: 1339, warning: 86, critical: 15, lastSync: '10s ago', openIssues: 10, color: 'orange' }
    ],
    inventory: [
      { id: 'DEV-EV-2841', vehicle: 'VIN-EV-2841', fleet: 'Fleet Beta (South India)', oem: 'InnoVibe Systems', model: 'E-Fleet X1', firmware: 'v5.3.2', status: 'Online', signal: '-64 dBm', battery: '100% (AC)', gps: 'Lock', sim: 'Airtel IoT', lastComms: '2s ago', health: 'Healthy', healthScore: 98, location: 'Bengaluru, IN' },
      { id: 'DEV-EV-1904', vehicle: 'VIN-EV-1904', fleet: 'Fleet Alpha (West India)', oem: 'Third-Party OEM', model: 'Urban Go', firmware: 'v5.2.1', status: 'Online', signal: '-72 dBm', battery: '82%', gps: 'Lock', sim: 'Jio Connect', lastComms: '10s ago', health: 'Warning', healthScore: 78, location: 'Mumbai, IN' },
      { id: 'DEV-EV-3392', vehicle: 'VIN-EV-3392', fleet: 'Fleet Beta (South India)', oem: 'InnoVibe Systems', model: 'E-Fleet X1', firmware: 'v5.3.2', status: 'Offline', signal: '-110 dBm', battery: '45%', gps: 'No Lock', sim: 'Airtel IoT', lastComms: '2 hours ago', health: 'Critical', healthScore: 42, location: 'Chennai, IN' },
      { id: 'DEV-EV-0482', vehicle: 'VIN-EV-0482', fleet: 'Fleet Gamma (North India)', oem: 'InnoVibe Systems', model: 'E-Fleet X1', firmware: 'v5.3.2', status: 'Online', signal: '-60 dBm', battery: '95%', gps: 'Lock', sim: 'Jio Connect', lastComms: '5s ago', health: 'Healthy', healthScore: 96, location: 'Delhi, IN' },
      { id: 'DEV-EV-4119', vehicle: 'VIN-EV-4119', fleet: 'Fleet Alpha (West India)', oem: 'Third-Party OEM', model: 'Urban Go', firmware: 'v5.2.1', status: 'Online', signal: '-84 dBm', battery: '68%', gps: 'Lock', sim: 'Jio Connect', lastComms: '15s ago', health: 'Warning', healthScore: 81, location: 'Pune, IN' },
      { id: 'DEV-EV-9999', vehicle: 'VIN-EV-9999', fleet: 'Fleet Alpha (West India)', oem: 'Third-Party OEM', model: 'Urban Go', firmware: 'v5.1.0', status: 'Online', signal: '-92 dBm', battery: '12%', gps: 'No Lock', sim: 'Jio Connect', lastComms: '45s ago', health: 'Critical', healthScore: 35, location: 'Ahmedabad, IN' }
    ],
    firmware: {
      current: 'v5.3.2',
      latest: 'v5.4.0',
      pending: 116,
      successful: 3008,
      failed: 15,
      rollback: 1,
      adoption: '92.8%',
      risk: 'Low',
      rollouts: [
        { version: 'v5.4.0-rc1', stage: 'Controlled Rollout', progress: 45, status: 'Active', target: 'Fleet Beta (South India)' },
        { version: 'v5.3.2', stage: 'Full Deployment', progress: 100, status: 'Completed', target: 'All Fleets' },
        { version: 'v5.2.1', stage: 'Deprecated', progress: 100, status: 'Rollback', target: 'Third-Party OEM' }
      ]
    },
    connectivity: {
      successRate: '99.4%',
      avgLatency: '115ms',
      packetLoss: '0.12%',
      mqttAvailability: '99.99%',
      throughput: '14.2M daily packets',
      offlineTrend: [5, 7, 12, 10, 8, 4, 3],
      regions: [
        { name: 'West India (Mumbai)', status: 'Healthy', latency: '94ms', devices: 1200 },
        { name: 'South India (Bengaluru)', status: 'Healthy', latency: '124ms', devices: 1400 },
        { name: 'North India (Delhi)', status: 'Healthy', latency: '110ms', devices: 640 },
        { name: 'East India (Kolkata)', status: 'Neutral', latency: 'N/A', devices: 0 }
      ]
    },
    security: {
      secureBoot: '99.8%',
      signedFirmware: '100%',
      encryption: '99.4%',
      vulnerable: 3
    },
    insights: [
      { obs: 'Battery gateway temperature reading anomalies are rising in Fleet Alpha.', impact: 'Increased risk of predicted battery thermal runway diagnostic failures.', rec: 'Deploy custom firmware patch v5.3.3 restricting peak ingestion ping rates.', confidence: '94%', action: 'Deploy OTA patch v5.3.3' },
      { obs: 'Firmware v5.3.2 update successfully resolved packet lag across 2,000 systems.', impact: 'Communication errors reduced by 21% MoM; cloud ingestion queues fully stabilized.', rec: 'Standardize v5.3.2 track as the mandatory baseline release for all squads.', confidence: '98%', action: 'Set v5.3.2 as Baseline' },
      { obs: 'North India Region devices using Jio SIM profiles report -98 dBm packet degradation.', impact: 'Frequent connection reconnect loops causing local telemetry buffer overflow.', rec: 'Provision fallback Airtel SIM profiles for all West India vehicles.', confidence: '89%', action: 'Provision SIM Fallback' },
      { obs: 'Three third-party OEM device hardware sensors flagged with obsolete firmware v5.1.0.', impact: 'Secure boot compliance bypass vulnerability risk on active vehicular CAN bus.', rec: 'Trigger forced OTA firmware push upgrading target devices to v5.2.1-rc1.', confidence: '96%', action: 'Forced Upgrade v5.2.1-rc1' }
    ],
    integrations: [
      { module: 'Telemetry Platform', consumes: 'Device Network State, Port Ping', produces: 'Real-time JSON streams, Ingestion Log', status: 'Healthy', sync: '2s ago', path: 'telemetry-platform' },
      { module: 'AI Diagnostics', consumes: 'CAN telemetry variables, ping stability metrics', produces: 'State-of-Health failure calculations, Warning indicators', status: 'Healthy', sync: '1m ago', path: 'ai-diagnostics' },
      { module: 'Fleet Management', consumes: 'Vehicle telemetry states, Fleet metadata mapping', produces: 'Asset identifiers, dispatch directives, maintenance schedulers', status: 'Healthy', sync: '5s ago', path: 'software-development' },
      { module: 'EVcare.AI Dashboard', consumes: 'Overall device active states, signal indicators', produces: 'Platform Health Scoring summary indicators', status: 'Healthy', sync: '10s ago', path: 'evcare-ai-dashboard' },
      { module: 'Technology Dashboard', consumes: 'Summary device KPIs, active rollouts count, alert logs', produces: 'Oversight governance cards sync alerts status', status: 'Healthy', sync: '1m ago', path: 'dashboard' }
    ],
    decisionCenter: [
      { id: 'iot-dec-1', issue: 'Vulnerability Risk: Obsolescence in 3 OEM firmware controllers', impact: 'CAN bus access vector exposed during SOC 2 Type II governance checks.', risk: 'Critical', rec: 'Execute forced OTA firmware push upgrading target device controllers to signed v5.2.1 track.', module: 'Cybersecurity', action: 'Approve OTA Rollout' },
      { id: 'iot-dec-2', issue: 'Cellular Connection Degradation: Fleet Alpha West India Jio provider', impact: 'Temporary packet loss causing telemetry diagnostic data processing lags.', risk: 'Warning', rec: 'Request Jio SIM logs diagnostics investigation and route fallback cellular carriers.', module: 'System Logs', action: 'Assign Owner' },
      { id: 'iot-dec-3', issue: 'Data Ingestion Latency: EVcare.AI predictive runway model ingestion queues', impact: 'Delayed vehicle thermal runaway detection signals by up to 240ms.', risk: 'Optimization Opportunities', rec: 'Approve partition scaling of telemetry queue brokers inside Kubernetes cluster.', module: 'Telemetry Platform', action: 'Investigate' }
    ]
  },
  telemetryPlatform: {
    kpis: [
      { id: 'connected-vehicles', title: 'Connected Vehicles', value: '25,000', trend: 'SLA Compliant', status: 'Healthy', color: 'blue', icon: 'fa-car', impact: '100% vehicle connectivity across fleets.', insight: 'Predictive batteries diagnostics are receiving active telemetry tracks.', risk: 'None.', action: 'Inspect Fleet Status', related: 'evcare-ai-dashboard' },
      { id: 'active-streams', title: 'Active Data Streams', value: '120,500', trend: 'Nominal Ingress', status: 'Healthy', color: 'green', icon: 'fa-signal', impact: 'Real-time routing and thermal model predictions fully operational.', insight: 'Avg stream latency stands at a nominal 115ms.', risk: 'None.', action: 'Monitor Data Pipeline', related: 'telemetry-platform' },
      { id: 'ingestion-rate', title: 'Data Ingestion Rate', value: '14.2M msgs/sec', trend: '+1.2M/s peak', status: 'Healthy', color: 'blue', icon: 'fa-arrow-down-up-lock', impact: '100% telemetry ingest capacity baseline.', insight: 'Telemetry queue throughput healthy with zero packet drop warnings.', risk: 'Queue partition scaling recommended for West India expansion.', action: 'Scale Queue Brokers', related: 'telemetry-platform' },
      { id: 'telemetry-availability', title: 'Telemetry Availability', value: '99.98%', trend: 'Target: 99.9%', status: 'Healthy', color: 'green', icon: 'fa-clock', impact: 'High nominal availability maintained across regions.', insight: 'Zero ingress server interruptions for the past 45 days.', risk: 'None.', action: 'Inspect Availability Logs', related: 'telemetry-platform' },
      { id: 'data-quality-score', title: 'Data Quality Score', value: '96%', trend: 'AI Ready', status: 'Healthy', color: 'purple', icon: 'fa-circle-check', impact: '96% telemetry signals validated for machine learning operations.', insight: 'Observed minor invalid signals due to Twilio roaming drops in North India.', insight2: 'North India Twilio roaming drops corrected using Jio fallback.', risk: 'Low.', action: 'Run Quality Audits', related: 'reports-analytics' },
      { id: 'critical-vehicle-events', title: 'Critical Vehicle Events', value: '38', trend: 'Requires Attention', status: 'Critical', color: 'red', icon: 'fa-triangle-exclamation', impact: '38 anomalies detected; potential battery failure risk.', insight: 'Jio SIM roaming timeouts flagged across 15 devices in West India.', risk: 'Possible battery hardware thermal runtime degradation.', action: 'Open Diagnostics Workspace', related: 'ai-diagnostics' }
    ],
    regions: [
      { id: 'west-india', name: 'West India (Mumbai)', connected: 12000, offline: 25, alerts: 8, status: 'Healthy', color: 'green' },
      { id: 'south-india', name: 'South India (Bengaluru)', connected: 14000, healthy: 1380, offline: 20, alerts: 0, status: 'Healthy', color: 'green' },
      { id: 'north-india', name: 'North India (Delhi)', connected: 640, offline: 16, alerts: 2, status: 'Warning', color: 'orange' },
      { id: 'east-india', name: 'East India (Kolkata)', connected: 0, offline: 0, alerts: 0, status: 'Neutral', color: 'grey' }
    ],
    vehicles: [
      { id: 'VIN-EV-2841', fleet: 'Fleet Beta (South India)', location: 'Bengaluru, IN', status: 'Online', battery: '100% (AC)', health: 'Healthy', healthScore: 98, deviceId: 'DEV-EV-2841' },
      { id: 'VIN-EV-1904', fleet: 'Fleet Alpha (West India)', location: 'Mumbai, IN', status: 'Online', battery: '82%', health: 'Warning', healthScore: 78, deviceId: 'DEV-EV-1904' },
      { id: 'VIN-EV-3392', fleet: 'Fleet Beta (South India)', location: 'Chennai, IN', status: 'Offline', battery: '45%', health: 'Critical', healthScore: 42, deviceId: 'DEV-EV-3392' },
      { id: 'VIN-EV-0482', fleet: 'Fleet Gamma (North India)', location: 'Delhi, IN', status: 'Online', battery: '95%', health: 'Healthy', healthScore: 96, deviceId: 'DEV-EV-0482' },
      { id: 'VIN-EV-4119', fleet: 'Fleet Alpha (West India)', location: 'Pune, IN', status: 'Online', battery: '68%', health: 'Warning', healthScore: 81, deviceId: 'DEV-EV-4119' },
      { id: 'VIN-EV-9999', fleet: 'Fleet Alpha (West India)', location: 'Ahmedabad, IN', status: 'Online', battery: '12%', health: 'Critical', healthScore: 35, deviceId: 'DEV-EV-9999' }
    ],
    timelines: {
      'VIN-EV-2841': [
        { time: '10:30 AM', event: 'Vehicle Started', detail: 'Ignition ON signal. GPS Lock verified.', icon: 'fa-play', color: 'blue' },
        { time: '10:45 AM', event: 'Battery Temperature Normal', detail: 'Temp stabilized at 32°C. Ingestion nominal.', icon: 'fa-temperature-half', color: 'green' },
        { time: '11:00 AM', event: 'Charging Started', detail: 'AC Fast Charger connected. Current: 32A.', icon: 'fa-bolt', color: 'green' },
        { time: '11:20 AM', event: 'AI Diagnostic Completed', detail: 'Reliability Index: 98%. SOH: 94%.', icon: 'fa-heart-pulse', color: 'purple' }
      ],
      'VIN-EV-1904': [
        { time: '09:15 AM', event: 'Vehicle Started', detail: 'Ignition ON signal. GPS Lock verified.', icon: 'fa-play', color: 'blue' },
        { time: '09:30 AM', event: 'Battery Temperature Increased', detail: 'Temp spiked to 43°C. Diagnostic warning triggered.', icon: 'fa-temperature-high', color: 'orange' },
        { time: '10:00 AM', event: 'Connectivity Reconnect Loop', detail: 'Jio SIM roaming dropout detected in Mumbai highway track.', icon: 'fa-wifi', color: 'orange' },
        { time: '10:30 AM', event: 'AI Prediction Generated', detail: 'Predicted cell degradation risk: Medium. Confidence: 84%.', icon: 'fa-robot', color: 'purple' }
      ],
      'VIN-EV-3392': [
        { time: '08:00 AM', event: 'Vehicle Stopped', detail: 'Ignition OFF signal.', icon: 'fa-stop', color: 'grey' },
        { time: '08:05 AM', event: 'Telemetry Ping Offline', detail: 'No packets received for 2 hours. Ingress watchdog active.', icon: 'fa-ban', color: 'red' },
        { time: '08:10 AM', event: 'Critical Fault Code Logged', detail: 'Fault ID: CAN-BUS-TIMEOUT-291.', icon: 'fa-circle-exclamation', color: 'red' }
      ]
    },
    performance: {
      messageRate: '14.2M/s',
      latency: '115ms',
      packetLoss: '0.12%',
      successRate: '99.4%',
      mqttStatus: 'Online',
      cloudProcessing: 'Online',
      pipelineStatus: 'Online',
      aiAvailability: 'Online'
    },
    alerts: [
      { id: 'tel-alert-1', severity: 'Critical', text: '500 vehicles stopped sending telemetry signals.', time: '10s ago', impact: 'AI prediction engines lack real-time inputs.', rec: 'Investigate Jio SIM regional routing gateways.', action: 'Investigate', color: 'red' },
      { id: 'tel-alert-2', severity: 'Warning', text: 'Battery gateway temperature sensor spikes on Fleet Alpha.', time: '2m ago', impact: 'Early thermal runaway risk for affected packs.', rec: 'Trigger immediate diagnostic sweep.', action: 'Trigger Diagnostics', color: 'orange' },
      { id: 'tel-alert-3', severity: 'Information', text: 'Telemetry ingest pipeline partition scaling completed.', time: '1 hour ago', impact: 'Ingestion throughput capacity scaled by +35%.', rec: 'None required.', action: 'Create Action Plan', color: 'blue' }
    ],
    events: [
      { time: '15:20:10', source: 'DEV-EV-2841', event: 'Vehicle Connected', impact: 'Telemetry ingress started', status: 'Healthy', color: 'green' },
      { time: '15:19:45', source: 'DEV-EV-3392', event: 'Vehicle Disconnected', impact: 'Ingress watchdog warning', status: 'Critical', color: 'red' },
      { time: '15:15:00', source: 'OTA Operator', event: 'Firmware Updated', impact: 'Upgrade to v5.3.2 track success', status: 'Healthy', color: 'green' },
      { time: '15:10:20', source: 'DEV-EV-1904', event: 'Fault Code Detected', impact: 'Temp sensor warning triggered', status: 'Warning', color: 'orange' }
    ],
    aiIntelligence: [
      { obs: 'Telemetry processing latency in North India region spiked to 240ms.', impact: 'EVcare.AI thermal runaway models report delayed predictions.', risk: 'Medium', rec: 'Adjust partition scaling inside telemetry ingress cluster.', action: 'Scale Queue Brokers' },
      { obs: 'Jio cellular connection drop loops logged on 15 vehicles in West India.', impact: 'Temporary gaps in battery diagnostic logs; local buffer caching.', risk: 'Low', rec: 'Request Airtel SIM diagnostics investigation.', action: 'Request Airtel Sync' }
    ]
  },
  evcareAIDashboard: {
    kpis: [
      { id: 'total-vehicles', title: 'Total Registered Vehicles', value: '25,000', trend: 'Global Active Fleet', status: 'Healthy', color: 'blue', icon: 'fa-car', impact: 'Ingestion pipeline supports IPO-scale operations.', insight: 'Fleet growth stands at +8.4% MoM.', risk: 'None.', action: 'Track Product KPIs', related: 'telemetry-platform' },
      { id: 'connected-vehicles', title: 'Connected Vehicles', value: '25,000', trend: '100% Online Ingress', status: 'Healthy', color: 'green', icon: 'fa-signal', impact: 'Nominal telemetry transmission latency maintained.', insight: 'Active streams matching Telemetry platform metrics.', risk: 'None.', action: 'Monitor Platform', related: 'telemetry-platform' },
      { id: 'active-iot-devices', title: 'Active IoT Devices', value: '3,240', trend: '+142 this month', status: 'Healthy', color: 'blue', icon: 'fa-microchip', impact: '100% firmware compliance track verified.', insight: 'Compliance verified against IoT Device Management center.', risk: 'None.', action: 'Open IoT Device Management', related: 'iot-device-management' },
      { id: 'dau', title: 'Daily Active Users (DAU)', value: '1,420', trend: '+12% vs last week', status: 'Healthy', color: 'purple', icon: 'fa-users', impact: 'Highest customer adoption rates across urban fleets.', insight: 'Session durations increased by an average of 4m.', risk: 'None.', action: 'View Analytics', related: 'evcare-ai-dashboard' },
      { id: 'fleet-health-score', title: 'Fleet Health Score', value: '96.8%', trend: 'Nominal Baseline', status: 'Healthy', color: 'green', icon: 'fa-heart-pulse', impact: 'High predicted hardware reliability across model stacks.', insight: 'Calculated dynamically based on real-time cell pings.', risk: '15 devices require battery controllers inspections.', action: 'Open AI Diagnostics', related: 'ai-diagnostics' },
      { id: 'ai-accuracy', title: 'AI Diagnostic Accuracy', value: '98.2%', trend: 'SLA Compliant', status: 'Healthy', color: 'purple', icon: 'fa-brain', impact: 'Diagnostic failure risk models highly accurate.', insight: 'Battery prediction accuracy stands at 99.1%.', risk: 'Obsolete firmware v5.1.0 flagged on 3 controllers.', action: 'Open AI Models', related: 'ai-diagnostics' },
      { id: 'active-subscriptions', title: 'Active Subscriptions', value: '1,250', trend: '98% Renewal Rate', status: 'Healthy', color: 'blue', icon: 'fa-file-invoice-dollar', impact: 'Strong contract renewal retention profiles.', insight: 'Top fleets subscription growth stands at +15% QoQ.', risk: 'None.', action: 'View Subscription Details', related: 'subscription-billing' },
      { id: 'monthly-revenue', title: 'Monthly Recurring Revenue', value: '₹42.8M', trend: '+18% MoM Growth', status: 'Healthy', color: 'green', icon: 'fa-indian-rupee-sign', impact: 'Surpassed Q3 recurring revenue milestones.', insight: 'India corporate fleet subscription renewals fully captured.', risk: 'None.', action: 'Export Revenue Report', related: 'subscription-billing' }
    ],
    systemHealth: [
      { name: 'Platform Ingestion API', status: 'Healthy', details: 'All servers active. Ingesting 14.2M msgs/sec.', related: 'api-management' },
      { name: 'Cloud Infrastructure Ingress', status: 'Healthy', details: 'Optimal capacity track. Kubernetes cluster scaling OK.', related: 'cloud-infrastructure' },
      { name: 'Database Clusters Commit', status: 'Healthy', details: 'Database replication sync latency nominal (115ms).', related: 'database-management' },
      { name: 'Telemetry Streams Connection', status: 'Healthy', details: '100% cellular ping response rates across regions.', related: 'telemetry-platform' },
      { name: 'AI Diagnostics Inference', status: 'Healthy', details: 'Thermal anomaly predictive sweeps operational.', related: 'ai-diagnostics' },
      { name: 'Notification Broker Services', status: 'Healthy', details: 'MQTT queue dispatcher synced; zero packet lag.', related: 'notification-center' }
    ],
    productMetrics: {
      mau: '5,800',
      sessions: '14,200',
      sessionDuration: '18m 45s',
      customerGrowth: '+12.4%',
      subGrowth: '+15.2%',
      featureAdoption: '94.2%',
      retention: '98.4%',
      topFeatures: ['Predictive Thermal Sweeps', 'Cellular Ping Tracking', 'OTA Firmware rollouts'],
      stability: '99.98%',
      responseTime: '115ms'
    },
    aiPerformance: {
      diagnoses: '45,200',
      confidence: '96.2%',
      batteryAccuracy: '99.1%',
      motorAccuracy: '97.8%',
      controllerAccuracy: '98.0%',
      failedRequests: '2',
      responseTime: '240ms',
      modelHealth: 'Optimal'
    },
    deviceStatus: {
      offline: 116,
      firmwareCompliance: '98.2%',
      otaSuccess: '99.8%',
      telemetryAvailability: '99.98%',
      healthScore: '96.8%',
      signalQuality: '-68 dBm'
    },
    revenue: {
      mrr: '₹42.8M',
      renewals: '98.4%',
      pendingRenewals: '12',
      topFleetCustomers: ['Fleet Alpha (West India)', 'Fleet Beta (South India)', 'Fleet Gamma (North India)'],
      subscriptionPlans: {
        premium: 850,
        enterprise: 320,
        basic: 80
      }
    },
    notifications: [
      { priority: 'Critical', source: 'Telemetry Ingress', time: '10s ago', text: '500 vehicles stopped sending signals in West India.', rec: 'Investigate Jio cellular provider regional gateways.', action: 'Investigate', color: 'red' },
      { priority: 'Warning', source: 'AI Diagnostics', time: '2m ago', text: 'Battery gateway temperature sensor spikes on Fleet Alpha.', rec: 'Trigger diagnostics sweep on battery controller.', action: 'Trigger Diagnostics', color: 'orange' },
      { priority: 'Information', source: 'Subscription Management', time: '1 hour ago', text: 'Fleet Beta renewal contract successfully signed.', rec: 'Update database profiles tracks.', action: 'View Details', color: 'blue' }
    ],
    security: {
      score: '96/100',
      authHealth: 'Optimal',
      apiSecurity: '98%',
      failedLogins: 0,
      activeThreats: 0,
      compliance: 'SOC 2 Type II Compliant'
    },
    timeline: [
      { time: '10:00 AM', event: 'Fleet Alpha Onboarded', detail: '1,200 connected vehicle nodes registered and synced.', icon: 'fa-truck-field', color: 'blue' },
      { time: '10:15 AM', event: 'AI Model v4.2 Deployed', detail: 'Ingestion models loaded into ML prediction pipelines.', icon: 'fa-robot', color: 'purple' },
      { time: '10:40 AM', event: 'OTA Firmware Rollout Completed', detail: 'v5.3.2 release pushed to pilot tracking groups.', icon: 'fa-circle-check', color: 'green' },
      { time: '11:10 AM', event: 'Battery Anomaly Detected', detail: 'AI Diagnostics flagged cell temperature warnings.', icon: 'fa-triangle-exclamation', color: 'red' }
    ],
    insights: [
      { obs: 'Fleet Health improved by 4% after the latest firmware rollout.', impact: 'Decreased warranty replacement risk profile across model generations.', risk: 'None', rec: 'Mark firmware v5.3.2 as the mandatory baseline track.', action: 'Approve Deployment' },
      { obs: 'Battery anomaly predictions increased in South India region.', impact: 'Loss of battery diagnostic telemetry for warning vehicles.', risk: 'Medium', rec: 'Trigger AI diagnostics sweep on South India active nodes.', action: 'Trigger Diagnostics' },
      { obs: 'Daily active users increased by 12% compared to last week.', impact: 'Surpassed customer adoption targets; pipeline ingest remains stable.', risk: 'None', rec: 'Scale API gateways cluster capacities.', action: 'Track Product KPIs' },
      { obs: 'Cloud utilization is approaching optimal capacity tracks.', impact: 'Virtual node memory utilization stands at 82%.', risk: 'Low', rec: 'Approve partition scaling of telemetry queue brokers.', action: 'Scale Queue Brokers' }
    ],
    architecture: [
      { name: 'IoT Device Management', health: 'Healthy', sync: '2s ago', status: 'Optimal', route: 'iot-device-management' },
      { name: 'Telemetry Platform', health: 'Healthy', sync: 'Real-time', status: 'Optimal', route: 'telemetry-platform' },
      { name: 'AI Diagnostics', health: 'Healthy', sync: '1m ago', status: 'Optimal', route: 'ai-diagnostics' },
      { name: 'AI Models', health: 'Healthy', sync: '5m ago', status: 'Optimal', route: 'ai-diagnostics' },
      { name: 'Machine Learning Platform', health: 'Healthy', sync: '5m ago', status: 'Optimal', route: 'ai-diagnostics' },
      { name: 'Fleet Management', health: 'Healthy', sync: '5s ago', status: 'Optimal', route: 'software-development' },
      { name: 'Service Operations', health: 'Healthy', sync: '10s ago', status: 'Optimal', route: 'software-development' },
      { name: 'Customer Management', health: 'Healthy', sync: '10s ago', status: 'Optimal', route: 'software-development' },
      { name: 'EVcare.AI Dashboard', health: 'Healthy', sync: 'Real-time', status: 'Optimal', route: 'evcare-ai-dashboard' }
    ]
  },
  aiDiagnostics: {
    workflow: [
      { stage: 'Telemetry Ingress', status: 'Optimal', rate: '14.2M msgs/sec', time: '12ms', color: 'green' },
      { stage: 'AI Data Validation', status: 'Healthy', rate: '99.98% valid', time: '22ms', color: 'green' },
      { stage: 'Prediction Engine', status: 'Active', rate: '98.2% Accuracy', time: '85ms', color: 'purple' },
      { stage: 'Vehicle Diagnosis', status: 'Optimal', rate: '45,200 scanned', time: '115ms', color: 'blue' },
      { stage: 'Confidence Scoring', status: 'Synced', rate: '96.2% confidence', time: '40ms', color: 'blue' },
      { stage: 'Maintenance Recommendation', status: 'Ready', rate: '18 alerts', time: '65ms', color: 'purple' }
    ],
    kpis: [
      { id: 'ai-health-score', title: 'AI Health Score', value: '98.6%', trend: '+0.4% vs last week', status: 'Healthy', color: 'purple', icon: 'fa-brain', impact: 'Highly reliable failure predictions across all platforms.', confidence: '99.2%', risk: 'None', action: 'Trigger Diagnostics', related: 'ai-diagnostics' },
      { id: 'battery-accuracy', title: 'Battery Accuracy', value: '99.1%', trend: 'Nominal baseline', status: 'Healthy', color: 'green', icon: 'fa-car-battery', impact: 'Prevents thermal anomalies with 4-hour lead times.', confidence: '99.5%', risk: 'None', action: 'Approve New AI Model', related: 'ai-diagnostics' },
      { id: 'motor-accuracy', title: 'Motor Accuracy', value: '97.8%', trend: 'SLA Compliant', status: 'Healthy', color: 'blue', icon: 'fa-gauge-high', impact: 'Ensures optimal power delivery cycles on Fleet Alpha.', confidence: '98.4%', risk: 'Low efficiency in 3 vehicles.', action: 'Review AI Results', related: 'ai-diagnostics' },
      { id: 'controller-accuracy', title: 'Controller Accuracy', value: '98.0%', trend: 'Nominal', status: 'Healthy', color: 'blue', icon: 'fa-microchip', impact: 'Reduces voltage anomaly false positive triggers.', confidence: '98.1%', risk: 'High temperature predicted on 2 nodes.', action: 'Send Feedback to ML Team', related: 'ai-diagnostics' },
      { id: 'diagnoses-today', title: 'Diagnostics Completed', value: '45,200', trend: '100% telemetry coverage', status: 'Healthy', color: 'purple', icon: 'fa-circle-check', impact: 'Total active connected vehicles monitored.', confidence: '96.2%', risk: 'None', action: 'Generate AI Report', related: 'ai-diagnostics' },
      { id: 'critical-predictions', title: 'Critical Predictions', value: '18', trend: 'Requires attention', status: 'Warning', color: 'red', icon: 'fa-triangle-exclamation', impact: 'Immediate battery inspections required.', confidence: '98.9%', risk: 'High cell temperature warnings.', action: 'Export Diagnostic Report', related: 'ai-diagnostics' }
    ],
    fleets: [
      { id: 'fleet-alpha', name: 'Fleet Alpha (West India)', healthy: 1180, warning: 16, critical: 4, avgHealth: '97.2%', confidence: '98.4%', recommendations: 5, route: 'software-development' },
      { id: 'fleet-beta', name: 'Fleet Beta (South India)', healthy: 1240, warning: 8, critical: 2, avgHealth: '98.6%', confidence: '99.1%', recommendations: 3, route: 'software-development' },
      { id: 'fleet-gamma', name: 'Fleet Gamma (North India)', healthy: 780, warning: 12, critical: 4, avgHealth: '95.8%', confidence: '97.8%', recommendations: 6, route: 'software-development' }
    ],
    predictions: {
      battery: { health: '97.8%', rul: '4.2 years', tempRisk: 'Normal', charging: 'Nominal', failureProb: '1.2%', probability: '1.2%', confidence: '99.1%', etf: '14 days', impact: 'No immediate vehicle operations risk.', action: 'Trigger Inspection' },
      motor: { health: '96.2%', efficiency: '92.4%', temp: '68°C', vibration: 'Nominal', wear: 'Low', probability: '8.4%', confidence: '97.8%', etf: '45 days', impact: 'Efficiency degradation monitored.', action: 'Review Diagnosis' },
      controller: { stability: '99.1%', voltage: 'Nominal', temp: '42°C', failureProb: '0.4%', probability: '0.4%', confidence: '98.0%', etf: '90 days', impact: 'Stable voltage regulator.', action: 'Trigger Inspection' },
      charging: { health: '98.4%', cycles: '320', behaviour: 'Nominal', risk: 'Low', probability: '2.1%', confidence: '98.6%', etf: '60 days', impact: 'No charge cycle anomalies.', action: 'Create Service Request' }
    },
    faults: [
      { type: 'Battery Cell Temperature Delta Spikes', affected: 14, severity: 'Critical', cause: 'Cell impedance delta mismatch.', impact: 'Accelerated state-of-health degradation.', time: '10m ago', trend: 'Increasing' },
      { type: 'Phase Overcurrent Anomaly', affected: 3, severity: 'Warning', cause: 'Phase coil thermal stress.', impact: 'Reduced torque efficiency on highway tracks.', time: '1 hour ago', trend: 'Stable' },
      { type: 'Voltage Regulator Out of Range', affected: 1, severity: 'Critical', cause: 'Controller capacitors overload.', impact: 'Controller fail-safe disconnect hazard.', time: '2 hours ago', trend: 'Decreasing' }
    ],
    recommendations: {
      immediate: [
        { priority: 'Critical', fleet: 'Fleet Alpha (West India)', cost: '₹14,500', improvement: '+4% cell efficiency', impact: 'Preventive thermal runaway risk mitigation.', timeline: 'Immediate (24 hours)' }
      ],
      scheduled: [
        { priority: 'High', fleet: 'Fleet Gamma (North India)', cost: '₹8,200', improvement: '+8% phase alignment', impact: 'Ensures controller thermal health indices.', timeline: 'Next 72 hours' }
      ],
      preventive: [
        { priority: 'Medium', fleet: 'Fleet Beta (South India)', cost: '₹4,500', improvement: 'Calibrated SoC tracking', impact: 'Maintains telemetry state validation consistency.', timeline: 'Next service interval' }
      ],
      software: [
        { priority: 'Low', fleet: 'All Fleets', cost: '₹0 (OTA)', improvement: '+2.1% regen tracking', impact: 'Firmware upgrade calibration sweep.', timeline: 'Controlled rollout v5.3.4' }
      ]
    },
    insights: [
      { obs: 'Battery degradation predicted in 18 fleet vehicles.', impact: 'Accelerated thermal anomalies and cell failures.', fleet: 'Fleet Alpha', confidence: '98.9%', risk: 'Critical', rec: 'Trigger remote diagnostic scans and dispatch battery inspect requests.', action: 'Approve Recommendation' },
      { obs: 'Motor efficiency reduced by 9% in Fleet Alpha.', impact: 'Highway range deficits on model generations.', fleet: 'Fleet Alpha', confidence: '97.8%', risk: 'Medium', rec: 'Approve phase calibration software upgrade.', action: 'Assign Service Team' },
      { obs: 'Controller failures are increasing after Firmware v5.2.', impact: 'Transient voltage spikes risk controller safety blocks.', fleet: 'Fleet Gamma', confidence: '98.1%', risk: 'High', rec: 'Rollback firmware to stable baseline track v5.1.0.', action: 'Create Service Request' },
      { obs: 'Preventive maintenance can reduce failures by 21%.', impact: 'Reduces operational warranty claims overheads.', fleet: 'All Fleets', confidence: '99.4%', risk: 'Low', rec: 'Mark battery calibration calibrations as priority workflow.', action: 'Approve Recommendation' }
    ],
    architecture: [
      { name: 'Telemetry Platform', consumes: 'Raw cellular packets', produces: 'Validated data packets streams', health: 'Healthy', sync: 'Real-time', route: 'telemetry-platform' },
      { name: 'AI Diagnostics', consumes: 'Parsed vehicle streams', produces: 'Predictive health evaluations', health: 'Healthy', sync: '1m ago', route: 'ai-diagnostics' },
      { name: 'AI Models', consumes: 'Inference data schemas', produces: 'Failure probability scores', health: 'Healthy', sync: '5m ago', route: 'ai-diagnostics' },
      { name: 'Machine Learning Platform', consumes: 'Failure flags logs', produces: 'Re-trained models baseline', health: 'Healthy', sync: '15m ago', route: 'ai-diagnostics' },
      { name: 'Fleet Management', consumes: 'Diagnostic risk metrics', produces: 'Operations schedules', health: 'Healthy', sync: '5s ago', route: 'software-development' },
      { name: 'Service Operations', consumes: 'Calibration directives', produces: 'Technician service tickets', health: 'Healthy', sync: '10s ago', route: 'software-development' },
      { name: 'EVcare.AI Dashboard', consumes: 'Fleet accuracy aggregates', produces: 'CTO decisions timeline', health: 'Healthy', sync: 'Real-time', route: 'evcare-ai-dashboard' }
    ]
  },
  mobileAppManagement: {
    workflow: [
      { stage: 'Developer Commit', status: 'Optimal', successRate: '100% build pass', health: 'Healthy', owner: 'Dev Team' },
      { stage: 'QA Validation', status: 'Healthy', successRate: '98.6% tests passed', health: 'Healthy', owner: 'QA Team' },
      { stage: 'Release Approval', status: 'Approved', successRate: 'Signed & verified', health: 'Healthy', owner: 'CTO / Release Lead' },
      { stage: 'Production Deployment', status: 'Active', successRate: '99.8% rollout status', health: 'Healthy', owner: 'DevOps / Release' },
      { stage: 'User Adoption', status: 'Active', successRate: '91% adoption', health: 'Healthy', owner: 'Growth Team' },
      { stage: 'Analytics monitoring', status: 'Nominal', successRate: '14,200 sessions scanned', health: 'Healthy', owner: 'Product Ops' }
    ],
    kpis: [
      { id: 'app-version', title: 'Current App Version', value: 'v5.2.4', trend: 'Production baseline', status: 'Healthy', color: 'blue', icon: 'fa-code-branch', impact: 'Includes battery thermal prediction UI integrations.', userImpact: 'Zero latency refresh updates.', risk: 'None', action: 'Configure App Settings', related: 'software-development' },
      { id: 'dau', title: 'Daily Active Users (DAU)', value: '1,420', trend: '+12% vs last week', status: 'Healthy', color: 'purple', icon: 'fa-users', impact: 'Highly adopted urban fleet customer mobile bases.', userImpact: 'User sessions average 18m 45s.', risk: 'None', action: 'Generate AI Summary', related: 'evcare-ai-dashboard' },
      { id: 'crash-free', title: 'Crash-Free Sessions', value: '99.92%', trend: '+0.15% vs v5.1.0', status: 'Healthy', color: 'green', icon: 'fa-shield-halved', impact: 'Excellent customer runtime application stability.', userImpact: 'Reduced runtime crashes by 24%.', risk: 'None', action: 'Publish Update', related: 'bug-tracking' },
      { id: 'downloads', title: 'Total Downloads', value: '45,200', trend: 'Global installation base', status: 'Healthy', color: 'blue', icon: 'fa-circle-down', impact: 'Strong user activation metrics.', userImpact: 'Adoption score remains high.', risk: 'None', action: 'Export Mobile Report', related: 'mobile-app-management' },
      { id: 'rating', title: 'Average App Rating', value: '4.8 / 5', trend: 'Excellent feedback', status: 'Healthy', color: 'green', icon: 'fa-star', impact: 'Strong market reputation and reviews sentiment.', userImpact: 'Highly rated UX layout.', risk: 'None', action: 'Configure App Settings', related: 'mobile-app-management' },
      { id: 'session-duration', title: 'Avg Session Duration', value: '18m 45s', trend: '+4m vs previous track', status: 'Healthy', color: 'purple', icon: 'fa-clock', impact: 'Deep engagement with AI diagnostics and battery states.', userImpact: 'Users interact longer with thermal charts.', risk: 'None', action: 'Generate AI Summary', related: 'evcare-ai-dashboard' },
      { id: 'adoption-rate', title: 'Update Adoption Rate', value: '91.0%', trend: 'Fastest rollout sync', status: 'Healthy', color: 'blue', icon: 'fa-circle-check', impact: '91% Android adoption reached in 3 days.', userImpact: 'Low legacy version fragmentation.', risk: 'None', action: 'Publish Update', related: 'mobile-app-management' },
      { id: 'login-success', title: 'Login Success Rate', value: '99.4%', trend: 'Nominal baseline', status: 'Healthy', color: 'green', icon: 'fa-key', impact: 'Optimal authentication API gateway response latency.', userImpact: 'Minor cellular timeouts in South Region.', risk: 'None', action: 'Configure App Settings', related: 'mobile-app-management' }
    ],
    versions: [
      { num: 'v5.2.4', date: '2026-08-01', platform: 'Android / iOS', status: 'Production', adoption: '91.0%', users: '1,420', issues: 'None reported', rollback: 'Available (1-Click)', route: 'mobile-app-management' },
      { num: 'v5.2.0', date: '2026-07-15', platform: 'Android / iOS', status: 'Archived', adoption: '8.4%', users: '120', issues: 'Temporary capacitor sensor display glitch', rollback: 'Not active', route: 'mobile-app-management' },
      { num: 'v5.1.0', date: '2026-06-01', platform: 'Android / iOS', status: 'Archived', adoption: '0.6%', users: '8', issues: 'Bluetooth disconnect loop in Tata fleet', rollback: 'Not active', route: 'mobile-app-management' }
    ],
    releases: [
      { version: 'v5.2.4', highlights: 'Battery thermal runaways warning gauges and local cellular buffer logging.', bugfixes: 'Fixed Jio connection drop loops cache memory leaks.', features: 'Real-time SoC dials and diagnostics detail sweeps overlay.', performance: 'API payload weight reduced by 18%; memory footprint optimized.', security: 'WPA3 handshakes and TLS 1.3 telemetry encryption enforced.', status: 'Deployed (100% Rollout)', adoption: '91.0%' },
      { version: 'v5.2.0', highlights: 'Mobile SIM cell tower ping tracking panels.', bugfixes: 'Fixed Bluetooth connection timeout exceptions.', features: 'OTA rollout progress track panel.', performance: 'Asset compression; load latency reduced.', security: 'Secure boot hardware validation triggers.', status: 'Deployed (Archived)', adoption: '8.4%' }
    ],
    featureFlags: [
      { name: 'Thermal Anomaly Notifications In-App', status: 'Enabled', users: '1,420', rollout: '100%', impact: 'Urgent cell diagnostics reminders.', version: 'v5.2.4', owner: 'AI Integration Team' },
      { name: 'Real-Time Telemetry Map Widget', status: 'Enabled', users: '1,420', rollout: '100%', impact: 'Live route signal quality diagnostics.', version: 'v5.2.4', owner: 'Operations Team' },
      { name: 'OTA Firmware Flash Pilot', status: 'Disabled', users: '142', rollout: '10%', impact: 'Controlled firmware calibration updates.', version: 'v5.2.4', owner: 'Firmware Dev Team' }
    ],
    analytics: {
      dau: '1,420',
      mau: '5,800',
      duration: '18m 45s',
      retention: '98.4%',
      usage: ['Thermal Diagnostics Panel (74%)', 'Active Vehicles Map (18%)', 'SIM Diagnostics status (8%)'],
      distribution: { android: '62%', ios: '38%' },
      regions: { west: '38%', south: '42%', north: '15%', east: '5%' }
    },
    crashes: {
      reports: '4',
      sessions: '99.92%',
      categories: ['Jio Cellular Connection Timeout (42%)', 'Bluetooth Handshake Disconnected Exception (38%)', 'Map Canvas Thread Crash (20%)'],
      devices: ['Samsung S24 (50%)', 'OnePlus 12 (32%)', 'iPhone 15 Pro (18%)'],
      versions: ['v5.2.0 (82%)', 'v5.2.4 (18%)'],
      anr: '0.04%',
      performanceScore: '98/100',
      severity: 'Low'
    },
    notifications: {
      campaigns: 'Battery Diagnostics Sweeps Promo',
      sent: '45,200',
      delivery: '99.8%',
      open: '42.4%',
      failed: '90',
      scheduled: 'Weekly Health Summary Digest'
    },
    feedback: {
      rating: '4.8 / 5',
      sentiment: 'Highly positive (92%)',
      recent: [
        { user: 'Fleet Alpha Operator', rating: 5, text: 'The battery thermal predictions in v5.2.4 have saved us two service failure instances this week!' },
        { user: 'Fleet Beta Driver', rating: 4, text: 'Very neat UI, but charging cycles list could load slightly faster.' }
      ],
      complaints: ['Cellular timeouts in South Region', 'Tata Bluetooth syncing lags'],
      suggestions: ['Add a dark mode widget', 'Integrate service cost approximations']
    },
    insights: [
      { obs: 'Crash rate reduced by 24% after Version 5.2.', impact: 'Reduced customer support tickets by 15% this month.', users: 'All Mobile Users', risk: 'None', rec: 'Lock current stable baseline build and commence next feature track.', action: 'Configure App Settings' },
      { obs: 'Android adoption reached 91% within three days.', impact: 'Fastest update rollout sequence in product history.', users: 'Android Users', risk: 'None', rec: 'Mark legacy builds v5.2.0 as retired.', action: 'Publish Update' },
      { obs: 'Login failures increased in South India region.', impact: 'South region active users report authentication latency spikes (240ms).', users: 'South India Users', risk: 'Medium', rec: 'Initiate API gateways cluster partition capacity checks.', action: 'Configure App Settings' },
      { obs: 'Users spend 18% more time using the AI Diagnostics feature.', impact: 'Deep customer trust in predictive health recommendations.', users: 'All Mobile Users', risk: 'None', rec: 'Prioritize mobile dashboard integration improvements.', action: 'Generate AI Summary' }
    ],
    architecture: [
      { name: 'Software Development', consumes: 'Feature specs & QA scripts', produces: 'Stable mobile builds', health: 'Healthy', sync: '2h ago', route: 'software-development' },
      { name: 'QA & Testing', consumes: 'Stable mobile builds', produces: 'Signed release candidates', health: 'Healthy', sync: '1h ago', route: 'software-development' },
      { name: 'Mobile App Management', consumes: 'Signed release candidates', produces: 'Production rollout channels', health: 'Healthy', sync: 'Real-time', route: 'mobile-app-management' },
      { name: 'Customer Management', consumes: 'Active users logs', produces: 'Usage analytics indices', health: 'Healthy', sync: '5s ago', route: 'software-development' },
      { name: 'Notification Center', consumes: 'Campaign triggers', produces: 'Push dispatcher payloads', health: 'Healthy', sync: '10s ago', route: 'software-development' },
      { name: 'EVcare.AI Dashboard', consumes: 'Rollout adoption ratios', produces: 'CTO decisions timeline', health: 'Healthy', sync: 'Real-time', route: 'evcare-ai-dashboard' }
    ]
  },
  webPortalManagement: {
    workflow: [
      { stage: 'User Login', status: 'Optimal', usage: '1,420 active logins', health: 'Healthy', successRate: '99.4%' },
      { stage: 'Customer Dashboard', status: 'Healthy', usage: '3,240 dashboards active', health: 'Healthy', successRate: '99.9%' },
      { stage: 'Service Booking', status: 'Active', usage: '12,500 active schedules', health: 'Healthy', successRate: '98.8%' },
      { stage: 'Portal Activity', status: 'Nominal', usage: '14.2M msgs/sec synced', health: 'Healthy', successRate: '99.98%' },
      { stage: 'Analytics monitoring', status: 'Synced', usage: '45,200 sessions logged', health: 'Healthy', successRate: '100%' }
    ],
    kpis: [
      { id: 'traffic', title: 'Website Traffic', value: '452K views', trend: '+18% post-redesign', status: 'Healthy', color: 'blue', icon: 'fa-globe', impact: 'Substantial customer growth MoM.', customerImpact: 'Sleek, modern navigation layouts.', risk: 'None', action: 'Manage CMS', related: 'web-portal-management' },
      { id: 'logins', title: 'Customer Logins', value: '1,420', trend: 'Nominal session profiles', status: 'Healthy', color: 'purple', icon: 'fa-user-check', impact: 'Zero active authentication bottlenecks.', customerImpact: 'Seamless secure WPA3 sync.', risk: 'None', action: 'Generate AI Summary', related: 'evcare-ai-dashboard' },
      { id: 'fleet-dashboards', title: 'Fleet Dashboards Accessed', value: '3,240', trend: '100% active nodes monitor', status: 'Healthy', color: 'blue', icon: 'fa-table-columns', impact: 'Complete fleet analytics dashboard accessibility.', customerImpact: 'Highly functional widget loading.', risk: 'None', action: 'Update Portal UI', related: 'iot-device-management' },
      { id: 'bookings', title: 'Service Bookings', value: '45,200', trend: '+12% completion rate', status: 'Healthy', color: 'green', icon: 'fa-calendar-check', impact: 'Predictive diagnostic tickets scheduled successfully.', customerImpact: 'Reduced booking processing delays.', risk: 'None', action: 'Export Portal Report', related: 'software-development' },
      { id: 'tickets', title: 'Support Tickets', value: '18', trend: 'Low volume', status: 'Healthy', color: 'green', icon: 'fa-ticket', impact: 'Fast turnaround on customer queries.', customerImpact: 'Diagnostic advice dispatching operational.', risk: 'None', action: 'Export Portal Report', related: 'customer-support' },
      { id: 'session-duration', title: 'Avg Session Duration', value: '18m 45s', trend: '+4m vs previous period', status: 'Healthy', color: 'purple', icon: 'fa-clock', impact: 'Customers remain engaged with telemetry stats.', customerImpact: 'Valuable in-app telemetry dashboard views.', risk: 'None', action: 'Generate AI Summary', related: 'evcare-ai-dashboard' },
      { id: 'availability', title: 'Portal Availability', value: '99.98%', trend: 'SLA Compliant', status: 'Healthy', color: 'green', icon: 'fa-shield-halved', impact: 'Guaranteed platform uptime tracks.', customerImpact: 'Zero platform downtime sessions reported.', risk: 'None', action: 'Configure APIs', related: 'cloud-infrastructure' },
      { id: 'load-time', title: 'Page Load Performance', value: '1.2s', trend: 'Fast response times', status: 'Healthy', color: 'blue', icon: 'fa-gauge-high', impact: 'Highly optimized virtual DOM performance.', customerImpact: 'Fast initial rendering times.', risk: 'None', action: 'Update Portal UI', related: 'web-portal-management' }
    ],
    health: {
      server: 'Optimal',
      database: 'Connected',
      responseTime: '115ms',
      loadSpeed: '1.2s',
      apiAvailability: '100%',
      errorRate: '0.02%',
      sslStatus: 'Valid (Expires in 280 days)'
    },
    users: {
      dau: '1,420',
      mau: '5,800',
      newRegistrations: '142',
      returning: '92%',
      successRate: '99.4%',
      regions: ['West India (Mumbai)', 'South India (Bengaluru)', 'North India (Delhi)', 'East India (Kolkata)'],
      pages: ['Vehicle Analytics Map', 'Diagnostics Panel', 'Service Booking Center']
    },
    bookings: {
      total: '45,200',
      pending: '12',
      completed: '45,088',
      cancelled: '100',
      avgTime: '4m 30s',
      types: ['Battery Swap', 'Coil Recalibration', 'SoC Calibration'],
      conversion: '94.2%'
    },
    cms: {
      published: '24',
      draft: '2',
      announcements: 'Weekly Health Summary v5.2.4 released.',
      banner: 'Active',
      contentHealth: '100% compliant',
      recentUpdate: 'Updated battery diagnostic layout charts'
    },
    apiGateway: {
      health: 'Optimal',
      responseTime: '115ms',
      success: '1.42M',
      failed: '10',
      availability: '99.98%',
      authSuccess: '99.4%',
      rateLimit: 'Disabled (Nominal)',
      connected: 8
    },
    insights: [
      { obs: 'Website traffic increased by 18% after the latest portal redesign.', impact: 'Highest customer acquisition rates in current quarter.', users: 'All Portal Visitors', risk: 'None', rec: 'Adopt current header layout styles as the mandatory corporate guidelines.', action: 'Manage CMS' },
      { obs: 'Service booking completion improved by 12%.', impact: 'Accelerated warranty diagnostic calibrations processing speed.', users: 'Fleet Clients', risk: 'None', rec: 'Prioritize automated diagnostic ticket pipelines.', action: 'Export Portal Report' },
      { obs: 'Customer login failures increased in the South Region.', impact: 'South region cellular carrier drops logged on Jio gateways.', users: 'South India Clients', risk: 'Medium', rec: 'Dispatch Airtel SIM diagnostics synchronization directive.', action: 'Configure APIs' },
      { obs: 'API response time has increased during peak hours.', impact: 'Latency spiked to 240ms in North India cluster during peak ingestion.', users: 'API Clients', risk: 'Low', rec: 'Scale telemetry queue brokers partition counts.', action: 'Configure APIs' }
    ],
    architecture: [
      { name: 'Customer Management', consumes: 'Active registrations & logins', produces: 'Usage analytics indexes', health: 'Healthy', sync: '5s ago', route: 'software-development' },
      { name: 'Web Portal Management', consumes: 'Signed release packages', produces: 'Customer dashboard systems', health: 'Healthy', sync: 'Real-time', route: 'web-portal-management' },
      { name: 'Service Operations', consumes: 'Customer bookings inputs', produces: 'Technician service instructions', health: 'Healthy', sync: '10s ago', route: 'software-development' },
      { name: 'API Management', consumes: 'Telemetry ingestion streams', produces: 'API gateway endpoints profiles', health: 'Healthy', sync: '5m ago', route: 'api-management' },
      { name: 'Analytics & Reports', consumes: 'Traffic logs traces', produces: 'Marketing metrics trend lines', health: 'Healthy', sync: '15m ago', route: 'software-development' },
      { name: 'EVcare.AI Dashboard', consumes: 'Portal conversion metrics', produces: 'CTO decisions timeline', health: 'Healthy', sync: 'Real-time', route: 'evcare-ai-dashboard' }
    ]
  },
  aiModels: {
    workflow: [
      { stage: 'Training Data Prep', status: 'Optimal', successRate: '100% data scan', health: 'Healthy', owner: 'Data Ops Team' },
      { stage: 'Model Training', status: 'Healthy', successRate: '98.6% convergent', health: 'Healthy', owner: 'ML Dev Team' },
      { stage: 'Validation & Tests', status: 'Valid', successRate: 'Passes performance baseline', health: 'Healthy', owner: 'QA / Validation Lead' },
      { stage: 'Release Approval', status: 'Approved', successRate: 'Signed & verified', health: 'Healthy', owner: 'CTO / ML Lead' },
      { stage: 'Production Deployment', status: 'Active', successRate: '100% rollout', health: 'Healthy', owner: 'MLOps Team' },
      { stage: 'Production Monitoring', status: 'Optimal', successRate: '12.5M inferences scanned', health: 'Healthy', owner: 'MLOps Team' },
      { stage: 'Retraining Checks', status: 'Nominal', successRate: 'Concept drift checks pass', health: 'Healthy', owner: 'MLOps Team' }
    ],
    kpis: [
      { id: 'total-models', title: 'Total AI Models', value: '18', trend: 'Global registry count', status: 'Healthy', color: 'blue', icon: 'fa-cube', impact: 'Comprehensive analytics coverage.', inferenceImpact: 'Minimal model catalog memory footprint.', risk: 'None', action: 'Validate Model', related: 'ai-models' },
      { id: 'production-models', title: 'Production Models', value: '4 active', trend: '100% operational', status: 'Healthy', color: 'green', icon: 'fa-circle-check', impact: 'Real-time battery, motor, and controller predictions.', inferenceImpact: 'Zero latency degradation.', risk: 'None', action: 'Deploy Model', related: 'ai-diagnostics' },
      { id: 'avg-accuracy', title: 'Average Accuracy', value: '98.2%', trend: '+2.4% vs last version', status: 'Healthy', color: 'purple', icon: 'fa-bullseye', impact: 'Highly reliable preventive maintenance schedules.', inferenceImpact: 'High precision and recall metrics.', risk: 'None', action: 'Validate Model', related: 'ai-diagnostics' },
      { id: 'inference-latency', title: 'Inference Latency', value: '12ms', trend: 'Sub-millisecond latency', status: 'Healthy', color: 'blue', icon: 'fa-gauge-high', impact: 'Minimal cellular gateway transfer delay.', inferenceImpact: 'Extremely fast real-time diagnostics.', risk: 'None', action: 'Deploy Model', related: 'ai-models' },
      { id: 'deployment-success', title: 'Deployment Success Rate', value: '99.8%', trend: 'Rollout baseline', status: 'Healthy', color: 'green', icon: 'fa-cloud-arrow-up', impact: 'Flawless model deployment tracks.', inferenceImpact: 'Zero deployment rollbacks.', risk: 'None', action: 'Deploy Model', related: 'ai-models' },
      { id: 'retraining-required', title: 'Models Requiring Retraining', value: '1 model', trend: 'Motor concept drift', status: 'Warning', color: 'orange', icon: 'fa-rotate-right', impact: 'Minor prediction accuracy drops on Motor components.', inferenceImpact: 'Concept drift threshold triggered.', risk: 'Low', action: 'Train Model', related: 'software-development' }
    ],
    registry: [
      { name: 'Battery Prediction Model', version: 'v5.2.4', type: 'LSTM Neural Network', status: 'Production', accuracy: '99.1%', precision: '98.9%', recall: '99.2%', f1: '99.0%', env: 'Production', updated: '2026-08-01', route: 'ai-models' },
      { name: 'Controller Failure Model', version: 'v4.1.0', type: 'XGBoost Classifier', status: 'Production', accuracy: '98.0%', precision: '97.8%', recall: '98.2%', f1: '98.0%', env: 'Production', updated: '2026-07-15', route: 'ai-models' },
      { name: 'Motor Prediction Model', version: 'v3.2.0', type: 'CNN Classifier', status: 'Retraining Required', accuracy: '97.8%', precision: '97.2%', recall: '98.0%', f1: '97.6%', env: 'Production', updated: '2026-06-01', route: 'ai-models' },
      { name: 'Charging Health Model', version: 'v2.0.1', type: 'Random Forest Regressor', status: 'Production', accuracy: '98.5%', precision: '98.1%', recall: '98.7%', f1: '98.4%', env: 'Production', updated: '2026-05-10', route: 'ai-models' }
    ],
    experiments: [
      { name: 'Battery Temp Prediction Experiment', dataset: 'Airtel Telemetry Aug-05', date: '2026-08-05', accuracy: '99.4%', validation: '99.2%', status: 'Promoted', owner: 'ML Dev Team', comparison: '+0.3% vs Production' },
      { name: 'Motor Torque Drift Experiment', dataset: 'Jio Motor Stress Test', date: '2026-08-04', accuracy: '98.9%', validation: '98.6%', status: 'Validating', owner: 'ML Dev Team', comparison: '+1.1% vs Production' }
    ],
    deployment: [
      { stage: 'Development', models: 'Battery Temp Exp v5.3', status: 'Compiled', time: '10m ago', rollback: 'N/A', health: 'Healthy' },
      { stage: 'Validation', models: 'Motor Torque Exp v3.3', status: 'Validating', time: '1h ago', rollback: 'N/A', health: 'Healthy' },
      { stage: 'Staging', models: 'Battery Temp Exp v5.2.4', status: 'Approved', time: '1d ago', rollback: 'N/A', health: 'Healthy' },
      { stage: 'Production', models: 'Battery Prediction Model v5.2.4', status: 'Active (100% Rollout)', time: '4d ago', rollback: 'Available', health: 'Healthy' }
    ],
    evaluation: {
      accuracy: '98.2%',
      precision: '97.9%',
      recall: '98.4%',
      f1: '98.1%',
      rocAuc: '99.2%',
      drift: 'Motor prediction drift triggered (1.8% threshold exceeded)',
      quality: 'Optimal'
    },
    monitoring: {
      requests: '12.5M',
      avgTime: '12ms',
      gpu: '64%',
      cpu: '42%',
      memory: '58%',
      volume: '12.5M pings today',
      availability: '99.98%',
      errorRate: '0.02%'
    },
    insights: [
      { obs: 'Battery Prediction Model v5.2 improved accuracy by 2.4%.', impact: 'Fewer thermal runaways false alerts reported globally.', risk: 'None', rec: 'Mark v5.1 builds as retired.', action: 'Deploy Model' },
      { obs: 'Controller Failure Model latency increased by 14%.', impact: 'Response time spiked to 14ms during peak ingestion loads.', risk: 'Low', rec: 'Scale inferences container instances count.', action: 'Deploy Model' },
      { obs: 'Motor Prediction Model requires retraining due to concept drift.', impact: 'Prediction accuracy fell by 1.8% in South Region.', risk: 'Medium', rec: 'Approve new Motor training pipeline using Jio telemetry.', action: 'Train Model' },
      { obs: 'Battery Health Model handled 12.5 million inferences today.', impact: 'Excellent throughput performance on production clusters.', risk: 'None', rec: 'Maintain current compute baseline.', action: 'Export Model Report' }
    ],
    architecture: [
      { name: 'Machine Learning Platform', consumes: 'Clean telemetry logs', produces: 'Trained model weights packages', health: 'Healthy', sync: '15m ago', route: 'software-development' },
      { name: 'AI Models', consumes: 'Trained model weights packages', produces: 'Model execution registry profiles', health: 'Healthy', sync: 'Real-time', route: 'ai-models' },
      { name: 'AI Diagnostics', consumes: 'Model execution registry profiles', produces: 'Predictive diagnostics evaluations', health: 'Healthy', sync: '1m ago', route: 'ai-diagnostics' },
      { name: 'EVcare.AI Dashboard', consumes: 'Fleet reliability forecasts', produces: 'CTO decisions timeline', health: 'Healthy', sync: 'Real-time', route: 'evcare-ai-dashboard' }
    ]
  },
  machineLearningPlatform: {
    workflow: [
      { stage: 'Data Collection', status: 'Optimal', successRate: '14.2M msgs/sec', time: 'Real-time', health: 'Healthy' },
      { stage: 'Dataset Validation', status: 'Healthy', successRate: '99.9% clean', time: '5m avg', health: 'Healthy' },
      { stage: 'Feature Engineering', status: 'Optimal', successRate: '240 features active', time: '12m avg', health: 'Healthy' },
      { stage: 'Model Training', status: 'Active', successRate: '98.6% convergent', time: '45m avg', health: 'Healthy' },
      { stage: 'Model Validation', status: 'Valid', successRate: '98.2% accuracy', time: '10m avg', health: 'Healthy' },
      { stage: 'Model Registration', status: 'Approved', successRate: '100% verified', time: '2m avg', health: 'Healthy' },
      { stage: 'Production Deployment', status: 'Active', successRate: '4 models live', time: 'Real-time', health: 'Healthy' },
      { stage: 'Drift Monitoring', status: 'Monitoring', successRate: '1.8% Motor drift detected', time: 'Continuous', health: 'Warning' },
      { stage: 'Retraining Loop', status: 'Scheduled', successRate: '1 job queued', time: 'Scheduled 18:00', health: 'Healthy' }
    ],
    kpis: [
      { id: 'total-datasets', title: 'Total Datasets', value: '14 datasets', trend: '45.2 GB telemetry data', status: 'Healthy', color: 'blue', icon: 'fa-database', impact: 'Comprehensive training data corpus.', pipelineImpact: 'High coverage across India fleets.', risk: 'None', action: 'Import Dataset', related: 'machine-learning' },
      { id: 'training-jobs', title: 'Training Jobs Running', value: '3 active', trend: 'GPU Cluster #1 & #2', status: 'Healthy', color: 'purple', icon: 'fa-gears', impact: 'Accelerated model iteration cycles.', pipelineImpact: 'Optimal GPU resource allocation.', risk: 'None', action: 'Schedule Training', related: 'machine-learning' },
      { id: 'training-success', title: 'Avg Training Success', value: '98.6%', trend: '+1.2% optimization', status: 'Healthy', color: 'green', icon: 'fa-circle-check', impact: 'High convergence reliability.', pipelineImpact: 'Minimal training job retries.', risk: 'None', action: 'Retrain Models', related: 'machine-learning' },
      { id: 'feature-store', title: 'Feature Store Size', value: '240 features', trend: '1.2 TB feature cache', status: 'Healthy', color: 'blue', icon: 'fa-cubes', impact: 'Reusable features across all models.', pipelineImpact: 'Zero feature computation redundancy.', risk: 'None', action: 'Clean Data', related: 'machine-learning' },
      { id: 'gpu-utilization', title: 'GPU Utilization', value: '64%', trend: 'Nominal workload load', status: 'Healthy', color: 'green', icon: 'fa-microchip', impact: 'Balanced compute consumption.', pipelineImpact: 'No GPU throttling or bottlenecks.', risk: 'None', action: 'Monitor Drift', related: 'cloud-infrastructure' },
      { id: 'retraining-needed', title: 'Models Awaiting Retraining', value: '1 model', trend: 'Motor concept drift (1.8%)', status: 'Warning', color: 'orange', icon: 'fa-rotate-right', impact: 'Motor prediction accuracy minor decline.', pipelineImpact: 'Concept drift threshold reached.', risk: 'Low', action: 'Retrain Models', related: 'ai-models' }
    ],
    datasets: [
      { name: 'Battery Telemetry Master Dataset', source: 'Telemetry Ingress Pipeline', size: '18.4 GB', records: '14.2M rows', updated: '10m ago', quality: '99.8%', missing: '0.02%', status: 'Production', owner: 'Data Ops Team' },
      { name: 'Motor Vibration & Stress Dataset', source: 'Jio Cellular Fleet Stream', size: '12.1 GB', records: '8.6M rows', updated: '25m ago', quality: '98.4%', missing: '0.15%', status: 'Retraining', owner: 'ML Engineering Team' },
      { name: 'Controller Diagnostic Telemetry', source: 'Airtel Telemetry Stream', size: '9.5 GB', records: '6.4M rows', updated: '1h ago', quality: '99.5%', missing: '0.05%', status: 'Production', owner: 'Data Ops Team' },
      { name: 'EV Charging Behavior Dataset', source: 'Customer Portal & IoT Grid', size: '5.2 GB', records: '3.8M rows', updated: '2h ago', quality: '99.1%', missing: '0.08%', status: 'Production', owner: 'Product Ops Team' }
    ],
    featureStore: {
      groups: ['Battery Health Features', 'Thermal Drift Vector', 'Motor Vibration Frequency', 'Controller Duty Cycle', 'SoC Charge Rate'],
      topFeatures: ['cell_temp_delta_avg', 'motor_rpm_vibration_ratio', 'controller_current_peak', 'soc_decay_rate'],
      importance: [
        { name: 'cell_temp_delta_avg', score: 0.38 },
        { name: 'motor_rpm_vibration_ratio', score: 0.29 },
        { name: 'controller_current_peak', score: 0.18 },
        { name: 'soc_decay_rate', score: 0.15 }
      ],
      freshness: 'Real-time (5s sync)',
      qualityScore: '99.6%',
      activeUsage: '4 production models'
    },
    trainingJobs: [
      { name: 'Battery LSTM Retraining #842', dataset: 'Battery Telemetry Master Dataset', progress: '78%', duration: '34m 12s', gpu: '88%', accuracy: '99.3%', estCompletion: '8m remaining', status: 'Running' },
      { name: 'Motor Drift Alignment XGBoost #109', dataset: 'Motor Vibration & Stress Dataset', progress: '45%', duration: '18m 05s', gpu: '72%', accuracy: '98.7%', estCompletion: '22m remaining', status: 'Running' },
      { name: 'Charging Regressor Optimization #54', dataset: 'EV Charging Behavior Dataset', progress: '92%', duration: '52m 40s', gpu: '42%', accuracy: '98.8%', estCompletion: '4m remaining', status: 'Running' }
    ],
    validation: {
      accuracy: '98.2%',
      precision: '97.9%',
      recall: '98.4%',
      f1: '98.1%',
      rocAuc: '99.2%',
      crossVal: '98.0%',
      stability: 'High (0.003 variance)',
      status: 'Passed Baseline'
    },
    monitoring: {
      predictionDrift: '0.4% Avg',
      dataDrift: '0.2% Low',
      featureDrift: '0.6% Low',
      conceptDrift: '1.8% Triggered (Motor)',
      gpuUtil: '64%',
      cpuUsage: '42%',
      trainingQueue: '1 job queued',
      pipelineHealth: 'Optimal',
      recommendation: 'Initiate Motor Prediction Model retraining using Jio fleet dataset.'
    },
    insights: [
      { obs: 'Battery prediction dataset increased by 18% this week.', impact: 'Expanded training volume led to +0.3% accuracy gain.', models: 'Battery Prediction Model', confidence: '99.4%', riskLevel: 'None', rec: 'Keep automatic daily dataset ingest enabled.', action: 'Import Dataset' },
      { obs: 'Feature drift detected in charging behavior data.', impact: 'Slight deviation in fast-charging frequency profiles.', models: 'Charging Health Model', confidence: '96.2%', riskLevel: 'Low', rec: 'Update feature scaling parameters in Feature Store.', action: 'Clean Data' },
      { obs: 'GPU Cluster 2 utilization exceeded 90%.', impact: 'Heavy concurrent training jobs on Motor & Battery models.', models: 'All Training Jobs', confidence: '99.8%', riskLevel: 'Medium', rec: 'Scale GPU compute pool or queue job #110.', action: 'Schedule Training' },
      { obs: 'Controller failure model should be retrained.', impact: 'Concept drift detected on high-duty-cycle vehicles.', models: 'Controller Failure Model', confidence: '97.8%', riskLevel: 'Low', rec: 'Approve scheduled retraining job.', action: 'Retrain Models' }
    ],
    architecture: [
      { name: 'Telemetry Platform', consumes: 'Raw IoT CAN bus telemetry', produces: 'Clean telemetry ingress stream', health: 'Healthy', sync: 'Real-time', route: 'telemetry-platform' },
      { name: 'Dataset Management', consumes: 'Clean telemetry ingress stream', produces: 'Validated training datasets', health: 'Healthy', sync: '5m ago', route: 'machine-learning' },
      { name: 'Feature Store', consumes: 'Validated training datasets', produces: 'Calculated feature vectors', health: 'Healthy', sync: 'Real-time', route: 'machine-learning' },
      { name: 'Training Jobs', consumes: 'Calculated feature vectors', produces: 'Trained model checkpoints', health: 'Healthy', sync: '10m ago', route: 'machine-learning' },
      { name: 'Validation', consumes: 'Trained model checkpoints', produces: 'Validated model weights package', health: 'Healthy', sync: '15m ago', route: 'machine-learning' },
      { name: 'AI Models', consumes: 'Validated model weights package', produces: 'Production MLOps model registry', health: 'Healthy', sync: 'Real-time', route: 'ai-models' },
      { name: 'AI Diagnostics', consumes: 'Production MLOps model registry', produces: 'Vehicle health prediction results', health: 'Healthy', sync: '1m ago', route: 'ai-diagnostics' },
      { name: 'EVcare.AI Dashboard', consumes: 'Vehicle health prediction results', produces: 'CTO decisions timeline', health: 'Healthy', sync: 'Real-time', route: 'evcare-ai-dashboard' }
    ]
  },
  notificationsCenter: {
    workflow: [
      { stage: 'Technology Event', status: 'Detected', successRate: '14.2M msgs/sec', time: 'Real-time', health: 'Healthy' },
      { stage: 'Priority Classification', status: 'Automated', successRate: '100% categorized', time: '<1s', health: 'Healthy' },
      { stage: 'Executive Review', status: 'Active', successRate: '6 pending items', time: '5m avg', health: 'Healthy' },
      { stage: 'Decision / Approval', status: 'In Review', successRate: '98.4% approved', time: '12m avg', health: 'Healthy' },
      { stage: 'Communication', status: 'Broadcasting', successRate: '100% delivered', time: 'Real-time', health: 'Healthy' },
      { stage: 'Resolution', status: 'Verified', successRate: '99.8% resolved', time: '25m avg', health: 'Healthy' }
    ],
    kpis: [
      { id: 'total-events', title: 'Total Notifications', value: '28 alerts', trend: 'Global technology events', status: 'Healthy', color: 'blue', icon: 'fa-bell', impact: 'Real-time situational awareness across all 16 platform modules.', action: 'Create Executive Alert', related: 'notifications' },
      { id: 'critical-attention', title: 'Critical Attention', value: '3 items', trend: 'Immediate CTO review required', status: 'Warning', color: 'orange', icon: 'fa-triangle-exclamation', impact: 'Requires swift executive intervention to mitigate system risk.', action: 'Create Executive Alert', related: 'notifications' },
      { id: 'requires-decision', title: 'Requires Decision', value: '4 pending', trend: 'High business impact', status: 'Healthy', color: 'purple', icon: 'fa-gavel', impact: 'Architecture & infrastructure scale approvals.', action: 'Send Broadcast', related: 'notifications' },
      { id: 'pending-approvals', title: 'Pending Approvals', value: '6 requests', trend: 'Deployments & Releases', status: 'Healthy', color: 'blue', icon: 'fa-clipboard-check', impact: 'Production software and AI model releases waiting for signoff.', action: 'Create Announcement', related: 'notifications' },
      { id: 'active-announcements', title: 'Active Announcements', value: '2 broadcasts', trend: '100% delivery reach', status: 'Healthy', color: 'green', icon: 'fa-bullhorn', impact: 'Organization-wide engineering & maintenance updates.', action: 'Create Announcement', related: 'notifications' },
      { id: 'open-escalations', title: 'Open Escalations', value: '2 teams', trend: 'Motor & Ingestion teams', status: 'Healthy', color: 'green', icon: 'fa-user-shield', impact: 'Fast resolution workflow with active lead assignments.', action: 'Send Broadcast', related: 'notifications' }
    ],
    priorityCenter: [
      { id: 'item-1', title: 'Production API Gateway Latency Spike', category: 'Critical Attention', module: 'API Management', impact: 'API response times spiked to 240ms under heavy ingestion.', priority: 'Critical', time: '10m ago', owner: 'API Lead', route: 'api-management' },
      { id: 'item-2', title: 'Motor Prediction Model Concept Drift', category: 'Critical Attention', module: 'AI Models', impact: 'Prediction accuracy fell by 1.8% in South Region fleet.', priority: 'High', time: '25m ago', owner: 'MLOps Lead', route: 'ai-models' },
      { id: 'item-3', title: 'IoT Cellular Authentication Cert Renewal', category: 'Critical Attention', module: 'IoT Device Management', impact: 'Security certificates for Airtel SIM nodes expiring in 48 hours.', priority: 'High', time: '1h ago', owner: 'IoT SecOps', route: 'iot-device-management' },
      { id: 'item-4', title: 'Cloud Kubernetes Compute Cluster Expansion', category: 'Requires Decision', module: 'Cloud Infrastructure', impact: 'Approve $4,200/mo allocation for 12 extra worker nodes.', priority: 'High', time: '2h ago', owner: 'Cloud Arch', route: 'cloud-infrastructure' }
    ],
    timelineEvents: [
      { time: '09:20', title: 'Mobile Application Release Approved', module: 'Mobile App Management', desc: 'EVcare.AI iOS & Android build v4.2.0 approved for public store rollout.', type: 'release' },
      { time: '10:10', title: 'New AI Model Deployed to Staging', module: 'AI Models', desc: 'Battery Temperature LSTM v5.2.4 promoted to staging validation cluster.', type: 'ai' },
      { time: '11:45', title: 'Cloud Infrastructure Auto-Scaling Completed', module: 'Cloud Infrastructure', desc: 'AWS Kinesis Ingestion Shards expanded from 8 to 16 to handle Mumbai peak.', type: 'cloud' },
      { time: '12:30', title: 'Cybersecurity Zero-Trust Policy Updated', module: 'Cybersecurity', desc: 'ISO 26262 compliant API key rotation rules enabled globally.', type: 'security' },
      { time: '14:15', title: 'CAN Bus Telemetry Gateway Sync', module: 'Telemetry Platform', desc: '45,200 connected vehicle streams synced with zero packet loss.', type: 'telemetry' },
      { time: '15:00', title: 'Web Portal CMS Policy Update Published', module: 'Web Portal Management', desc: 'Executive dashboard CMS news banner updated for upcoming maintenance.', type: 'web' }
    ],
    approvalQueue: [
      { id: 'app-1', title: 'Production Mobile App Release v4.2.0', module: 'Mobile App Management', impact: 'High (1,420 DAU active users)', risk: 'Low', owner: 'Mobile Dev Team', requested: '30m ago' },
      { id: 'app-2', title: 'Battery LSTM Prediction Model v5.2.4', module: 'AI Models', impact: 'High (+2.4% accuracy improvement)', risk: 'Low', owner: 'MLOps Engineering', requested: '1h ago' },
      { id: 'app-3', title: 'AWS Kinesis Ingestion Shards Expansion', module: 'Cloud Infrastructure', impact: 'High (Prevents throughput bottleneck)', risk: 'Low', owner: 'Cloud Ops Team', requested: '2h ago' },
      { id: 'app-4', title: 'gRPC Telemetry Ingestion Gateway Migration', module: 'API Management', impact: 'High (-40% latency reduction)', risk: 'Medium', owner: 'API Gateway Team', requested: '3h ago' },
      { id: 'app-5', title: 'Zero-Trust Key Rotation Policy Enforcement', module: 'Cybersecurity', impact: 'Medium (Compliance requirement)', risk: 'Low', owner: 'SecOps Team', requested: '4h ago' },
      { id: 'app-6', title: 'PostgreSQL Database Engine Cluster Upgrade', module: 'DevOps & Pipelines', impact: 'High (Performance optimization)', risk: 'Medium', owner: 'Database Admins', requested: '5h ago' }
    ],
    announcements: [
      { id: 'anc-1', title: 'Scheduled Platform Maintenance Window', category: 'System Maintenance', audience: 'Engineering & Ops Teams', status: 'Scheduled', scheduled: 'Aug 8, 02:00 IST', priority: 'Medium' },
      { id: 'anc-2', title: 'EVcare.AI Fleet OS v4.2 Public Release', category: 'New Release', audience: 'All Enterprise Customers', status: 'Published', scheduled: 'Aug 5, 12:00 IST', priority: 'High' },
      { id: 'anc-3', title: 'Jio & Airtel Cellular Ingestion Sync', category: 'Infrastructure Upgrade', audience: 'Telemetry Operations', status: 'Active', scheduled: 'Aug 4, 18:00 IST', priority: 'Medium' }
    ],
    escalations: [
      { id: 'esc-1', issue: 'Motor Prediction Model Concept Drift', assignedTeam: 'MLOps Team', severity: 'High', status: 'In Progress', impact: 'Minor prediction accuracy drop on Motor components', timeOpen: '4h open' },
      { id: 'esc-2', issue: 'Cellular Ingestion Throttle on Jio Network', assignedTeam: 'DevOps Team', severity: 'Medium', status: 'Investigating', impact: '12ms latency delay during peak telemetry pings', timeOpen: '1h open' }
    ],
    scheduledComms: [
      { schedule: 'Aug 8, 02:00 IST', audience: 'Platform Engineering', channel: 'Email + Push', status: 'Confirmed', title: 'Core Gateway Scheduled Maintenance' },
      { schedule: 'Aug 10, 04:00 IST', audience: 'Telemetry Fleet Nodes', channel: 'In-App Broadcast', status: 'Scheduled', title: 'OTA Firmware v3.4.1 Fleet Rollout' },
      { schedule: 'Aug 12, 00:00 IST', audience: 'Database Admin Team', channel: 'Slack + Email', status: 'Scheduled', title: 'PostgreSQL DB Engine Minor Patch' },
      { schedule: 'Aug 15, 09:00 IST', audience: 'Partners & Developers', channel: 'Portal Advisory', status: 'Draft', title: 'Public Telemetry API v2 Availability' }
    ],
    preferences: [
      { name: 'Critical Alerts', priority: 'High / Instant', channel: 'Push + SMS + Email', recipients: 'CTO + SecOps Lead', status: 'Enabled' },
      { name: 'Deployment Notifications', priority: 'Medium / Real-time', channel: 'Slack + In-App', recipients: 'MLOps + DevOps Teams', status: 'Enabled' },
      { name: 'AI Recommendations', priority: 'Medium / Daily Digest', channel: 'In-App + Email', recipients: 'AI Lead', status: 'Enabled' },
      { name: 'Security Events', priority: 'Critical / Instant', channel: 'PagerDuty + SMS', recipients: 'SecOps Team', status: 'Enabled' },
      { name: 'Infrastructure Alerts', priority: 'Medium / Real-time', channel: 'In-App', recipients: 'Cloud Ops Lead', status: 'Enabled' },
      { name: 'Approval Requests', priority: 'High / Instant', channel: 'In-App + Mobile', recipients: 'CTO Executive', status: 'Enabled' },
      { name: 'Enterprise Announcements', priority: 'Low / Scheduled', channel: 'Broadcast', recipients: 'All Teams', status: 'Enabled' }
    ],
    insights: [
      { obs: 'Cloud Infrastructure generated the highest number of executive alerts this week.', impact: 'Resource utilization spikes during peak telemetry hours.', riskLevel: 'Medium', rec: 'Approve AWS Kinesis Shards expansion proposal.', action: 'Approve' },
      { obs: 'Approval requests are increasing due to multiple production deployments.', impact: '6 pending releases waiting for CTO sign-off.', riskLevel: 'Low', rec: 'Review and batch approve staging release candidates.', action: 'Review' },
      { obs: 'Most communications are related to infrastructure upgrades.', impact: 'High maintenance activity preparing for Q3 scaling.', riskLevel: 'None', rec: 'Maintain current scheduled maintenance windows.', action: 'Send Broadcast' },
      { obs: 'System stability improved after recent optimization.', impact: '99.98% overall platform availability maintained.', riskLevel: 'None', rec: 'Keep standard notification rules active.', action: 'Create Announcement' }
    ],
    architecture: [
      { name: 'Software Development', consumes: 'Release notification triggers', produces: 'Deployment approval events', health: 'Healthy', sync: '5s ago', route: 'software-development' },
      { name: 'DevOps & Pipelines', consumes: 'Build pipeline completion logs', produces: 'CI/CD status broadcasts', health: 'Healthy', sync: 'Real-time', route: 'devops-pipelines' },
      { name: 'Cloud Infrastructure', consumes: 'Resource capacity warnings', produces: 'Auto-scaling alert events', health: 'Healthy', sync: '1m ago', route: 'cloud-infrastructure' },
      { name: 'AI Models', consumes: 'Model validation results', produces: 'Concept drift escalation alerts', health: 'Healthy', sync: 'Real-time', route: 'ai-models' },
      { name: 'Cybersecurity', consumes: 'Threat detection telemetry', produces: 'Security policy compliance alerts', health: 'Healthy', sync: '10m ago', route: 'cybersecurity' },
    ]
  },
  technologyDashboard: {
    kpis: [
      // Connected Mobility
      { id: 'total-evs', category: 'Connected Mobility', title: 'Connected EVs', value: '45,200', trend: '+12.4% MoM', status: 'Healthy', color: 'blue', icon: 'fa-car-side', impact: 'Active fleet operating across India regions.', source: 'EVcare.AI Dashboard', route: 'evcare-ai-dashboard' },
      { id: 'daily-active-evs', category: 'Connected Mobility', title: 'Daily Active Vehicles', value: '38,400', trend: '85% active ratio', status: 'Healthy', color: 'green', icon: 'fa-charging-station', impact: 'High daily vehicle utilization rate.', source: 'EVcare.AI Dashboard', route: 'evcare-ai-dashboard' },
      { id: 'fleet-health', category: 'Connected Mobility', title: 'Fleet Health Score', value: '99.2%', trend: '+0.4% baseline', status: 'Healthy', color: 'green', icon: 'fa-heart-pulse', impact: 'Optimal hardware & battery reliability.', source: 'EVcare.AI Dashboard', route: 'evcare-ai-dashboard' },

      // Artificial Intelligence
      { id: 'ai-diag-today', category: 'Artificial Intelligence', title: 'AI Diagnostics Today', value: '45,200', trend: '12.5M inferences today', status: 'Healthy', color: 'purple', icon: 'fa-brain', impact: 'Real-time battery & motor predictions.', source: 'AI Diagnostics', route: 'ai-diagnostics' },
      { id: 'model-accuracy', category: 'Artificial Intelligence', title: 'Model Accuracy', value: '98.2%', trend: '+2.4% vs last version', status: 'Healthy', color: 'purple', icon: 'fa-bullseye', impact: 'High precision preventive maintenance.', source: 'AI Models', route: 'ai-models' },

      // Engineering
      { id: 'eng-velocity', category: 'Engineering', title: 'Engineering Velocity', value: '94.2%', trend: '+4.1% completion rate', status: 'Healthy', color: 'blue', icon: 'fa-gauge-high', impact: 'Sprint 42 milestone delivery track.', source: 'Sprint Management', route: 'sprint-management' },
      { id: 'open-bugs', category: 'Engineering', title: 'Open Critical Bugs', value: '0 Critical', trend: '8 Non-Critical', status: 'Healthy', color: 'green', icon: 'fa-bug', impact: 'Stable production software builds.', source: 'Bug Tracking', route: 'bug-tracking' },
      { id: 'system-uptime', category: 'Engineering', title: 'System Uptime', value: '99.98%', trend: 'SLA compliant', status: 'Healthy', color: 'green', icon: 'fa-server', impact: '45 days continuous run with zero downtime.', source: 'Cloud Infrastructure', route: 'cloud-infrastructure' },

      // Platform
      { id: 'api-latency', category: 'Platform', title: 'API Response Time', value: '12ms', trend: '-4ms speedup', status: 'Healthy', color: 'blue', icon: 'fa-bolt', impact: 'Sub-millisecond gRPC gateway transfer.', source: 'API Management', route: 'api-management' },
      { id: 'cloud-costs', category: 'Platform', title: 'Cloud Cost', value: '$42.8K/mo', trend: '-3.2% optimization', status: 'Healthy', color: 'green', icon: 'fa-cloud', impact: 'AWS & Azure compute cost efficiency.', source: 'Cloud Infrastructure', route: 'cloud-infrastructure' },

      // Business
      { id: 'fleet-customers', category: 'Business', title: 'Active Fleet Customers', value: '142 Enterprise', trend: '+12 new fleets', status: 'Healthy', color: 'blue', icon: 'fa-building', impact: 'Expanding B2B mobility client base.', source: 'Customer Management', route: 'customer-management' },
      { id: 'mrr-rev', category: 'Business', title: 'Monthly Recurring Revenue', value: '$1.42M MRR', trend: '+14.2% YoY', status: 'Healthy', color: 'green', icon: 'fa-chart-line', impact: 'Strong enterprise ARR expansion.', source: 'Reports & Analytics', route: 'reports-analytics' }
    ],
    upcomingReleases: [
      { name: 'EVcare.AI Fleet OS v4.2.0', version: 'v4.2.0', date: 'Aug 6, 2026', confidence: '98.4%', owner: 'AI Engineering Squad', stage: 'Staging QA Passed', readiness: '98%', risk: 'Low', dependencies: 'PyTorch v2.3 & Telemetry Mesh v3', sprint: 'Sprint 42', route: 'evcare-ai-dashboard' },
      { name: 'EVcare Driver Mobile App Build', version: 'v4.2.0', date: 'Aug 6, 2026', confidence: '99.0%', owner: 'Mobile App Team', stage: 'App Store Review', readiness: '99%', risk: 'Low', dependencies: 'REST Ingestion Gateway v4.2', sprint: 'Sprint 42', route: 'mobile-app-management' },
      { name: 'Executive Web Portal CMS Patch', version: 'v3.8.1', date: 'Aug 7, 2026', confidence: '99.8%', owner: 'Web Engineering Squad', stage: 'Production Ready', readiness: '100%', risk: 'Low', dependencies: 'Next.js Edge Cache Engine', sprint: 'Sprint 42', route: 'web-portal-management' },
      { name: 'Enterprise Fleet Platform v2.5', version: 'v2.5.0', date: 'Aug 10, 2026', confidence: '96.2%', owner: 'Enterprise Products Squad', stage: 'Integration Testing', readiness: '95%', risk: 'Low', dependencies: 'Multi-Tenant OAuth2 Protocol', sprint: 'Sprint 43', route: 'customer-management' },
      { name: 'Internal CTO Office Portal v2.1', version: 'v2.1.0', date: 'Aug 11, 2026', confidence: '100%', owner: 'Platform Ops Squad', stage: 'Production Ready', readiness: '100%', risk: 'Low', dependencies: 'Executive Reporting API', sprint: 'Sprint 42', route: 'dashboard' },
      { name: 'Motor Prediction XGBoost Model', version: 'v109.2', date: 'Aug 12, 2026', confidence: '94.5%', owner: 'MLOps Pipeline Team', stage: 'Retraining Validation', readiness: '92%', risk: 'Medium', dependencies: 'Jio Cellular Telemetry Dataset', sprint: 'Sprint 43', route: 'ai-models' }
    ],
    engineeringTeams: [
      { name: 'Backend Engineering', icon: 'fa-server', lead: 'Dr. Marcus Vance', capacity: '92%', util: '88%', delivery: '96', quality: '94', sprintHealth: 'Optimal', activeProjects: 4, openRisks: 0, focus: 'gRPC Gateway Ingestion Migration', route: 'software-development' },
      { name: 'Frontend Web Engineering', icon: 'fa-laptop-code', lead: 'Priya Sharma', capacity: '95%', util: '90%', delivery: '95', quality: '96', sprintHealth: 'Optimal', activeProjects: 3, openRisks: 0, focus: 'CTO Operating System UI Portal', route: 'web-portal-management' },
      { name: 'Mobile App Engineering', icon: 'fa-mobile-screen-button', lead: 'Marcus Chen', capacity: '88%', util: '85%', delivery: '92', quality: '91', sprintHealth: 'Optimal', activeProjects: 2, openRisks: 1, focus: 'iOS & Android App v4.2.0 Store Launch', route: 'mobile-app-management' },
      { name: 'AI / MLOps Engineering', icon: 'fa-brain', lead: 'Dr. Sarah Jenkins', capacity: '90%', util: '88%', delivery: '98', quality: '98', sprintHealth: 'Optimal', activeProjects: 3, openRisks: 0, focus: 'Battery LSTM Thermal Model v5.2.4', route: 'ai-models' },
      { name: 'Cloud & Infrastructure', icon: 'fa-cloud', lead: 'David Miller', capacity: '85%', util: '88%', delivery: '94', quality: '95', sprintHealth: 'Needs Attention', activeProjects: 2, openRisks: 1, focus: 'AWS Kinesis Ingestion Shard Expansion', route: 'cloud-infrastructure' },
      { name: 'IoT & Telemetry Team', icon: 'fa-microchip', lead: 'Rajesh Kumar', capacity: '94%', util: '92%', delivery: '95', quality: '96', sprintHealth: 'Optimal', activeProjects: 2, openRisks: 1, focus: 'Airtel SIM Key Zero-Trust Rotation', route: 'iot-device-management' },
      { name: 'Quality Assurance (QA)', icon: 'fa-vial', lead: 'Elena Rostova', capacity: '90%', util: '86%', delivery: '96', quality: '97', sprintHealth: 'Optimal', activeProjects: 5, openRisks: 0, focus: 'Automated E2E System Test Suite', route: 'bug-tracking' },
      { name: 'DevOps & SRE Pipeline', icon: 'fa-network-wired', lead: 'Alex Mercer', capacity: '92%', util: '89%', delivery: '98', quality: '98', sprintHealth: 'Optimal', activeProjects: 3, openRisks: 0, focus: 'Multi-Region Kubernetes Scaling', route: 'devops-pipelines' }
    ],
    decisions: [
      { id: 'dec-1', observation: 'AWS Kinesis Telemetry Gateway Ingestion Expansion', impact: 'Prevents throughput bottleneck for 45,200 connected EVs in Mumbai.', risk: 'Low', rec: 'Approve $4,200/mo allocation for 8 additional Kinesis shards.', owner: 'Cloud Architect', route: 'cloud-infrastructure' },
      { id: 'dec-2', observation: 'Battery LSTM AI Prediction Model v5.2.4 Deployment', impact: 'Improves thermal runaway prediction accuracy by +2.4% globally.', risk: 'Low', rec: 'Approve production deployment rollout to all fleet nodes.', owner: 'MLOps Lead', route: 'ai-models' },
      { id: 'dec-3', observation: 'Airtel IoT SIM Security Certificate Renewal Warning', impact: 'Prevents hardware authentication failover on 3,240 IoT devices.', risk: 'Medium', rec: 'Authorize automated zero-trust security cert re-issuance.', owner: 'SecOps Lead', route: 'iot-device-management' },
      { id: 'dec-4', observation: 'EVcare.AI Mobile App Build v4.2.0 Public Rollout', impact: 'Delivers real-time diagnostic alerts to 1,420 daily active drivers.', risk: 'Low', rec: 'Approve iOS App Store and Google Play Store rollout.', owner: 'Mobile Lead', route: 'mobile-app-management' }
    ],
    aiCopilot: [
      { obs: 'Engineering velocity declined slightly due to critical defect triage.', impact: 'Sprint 42 completion rate remained high at 94.2%.', confidence: '98.2%', rec: 'Prioritize bug triage in Sprint 43 to clear defect queue.', action: 'Review Bug Queue', route: 'bug-tracking' },
      { obs: 'Cloud infrastructure GPU utilization increased after recent ML retraining.', impact: 'GPU Cluster #2 utilization reached 88% during peak hours.', confidence: '99.4%', rec: 'Authorize 8 extra worker nodes to prevent compute bottlenecks.', action: 'Approve Scaling', route: 'cloud-infrastructure' },
      { obs: 'Battery failure predictions increased by 4% in South Region fleet.', impact: 'Preventive thermal diagnostics caught 14 battery cells prior to failure.', confidence: '99.1%', rec: 'Dispatch thermal inspection advisory to South Region maintenance team.', action: 'Inspect Fleet', route: 'ai-diagnostics' },
      { obs: 'API response latency improved by 4ms following gRPC gateway protocol migration.', impact: 'Sub-millisecond data transfer achieved across 45,200 connected EVs.', confidence: '99.8%', rec: 'Expand gRPC protocol to secondary telemetry API endpoints.', action: 'Expand Protocol', route: 'api-management' }
    ],
    businessInsights: [
      { category: 'Revenue Growth', title: 'Monthly Recurring Revenue Increased +14.2% YoY', impact: 'ARR reached $1.42M driven by 142 enterprise fleets.', rec: 'Accelerate B2B enterprise client pipeline.', trend: '+14.2% YoY', route: 'reports-analytics' },
      { category: 'Fleet Adoption', title: 'Fleet Adoption Expanded in Mumbai & Bengaluru', impact: '+12 new enterprise fleets onboarded across key hubs.', rec: 'Increase regional telematics support coverage.', trend: '+12 Fleets', route: 'evcare-ai-dashboard' },
      { category: 'Customer Satisfaction', title: 'Net Promoter Score Maintained at +68 NPS', impact: 'High customer sentiment rating across enterprise users.', rec: 'Preserve zero-downtime SLA maintenance windows.', trend: '+68 Benchmark', route: 'service-operations' },
      { category: 'AI Adoption', title: 'AI Diagnostics Utilization Grew Rapidly (+28%)', impact: '12.5M daily inferences preventing 14 battery failures.', rec: 'Promote automated predictive dispatch workflow.', trend: '+28% Growth', route: 'ai-diagnostics' },
      { category: 'FinOps Optimization', title: 'Cloud Spend Optimized with -$4.2K/mo Spot Savings', impact: 'Compute cost efficiency target achieved for Q3.', rec: 'Extend spot instance pool to batch training workloads.', trend: '-$4.2K/mo', route: 'cloud-infrastructure' },
      { category: 'Subscription Retention', title: 'Subscription Renewals Reached 98.4% Baseline', impact: 'Enterprise account churn reduced to less than 1.0%.', rec: 'Finalize multi-year contract renewal proposals.', trend: '98.4% Renewal', route: 'subscription-management' }
    ],
    activityTimeline: [
      { time: '09:20', title: 'Mobile Application Release v4.2.0 Approved', module: 'Mobile App Management', desc: 'iOS & Android release approved by CTO for public store rollout.', impact: 'Reaches 1,420 daily active drivers' },
      { time: '10:10', title: 'Battery LSTM AI Model v5.2.4 Deployed', module: 'AI Models', desc: 'Model weights package promoted to staging validation cluster.', impact: '+2.4% accuracy improvement' },
      { time: '11:45', title: 'AWS Kinesis Telemetry Gateway Auto-Scaled', module: 'Cloud Infrastructure', desc: 'Ingestion shards expanded from 8 to 16 to handle Mumbai peak.', impact: 'Handled 14.2M msgs/sec stream' },
      { time: '12:30', title: 'Zero-Trust Cybersecurity Key Rotation Policy Updated', module: 'Cybersecurity', desc: 'ISO 26262 compliant API key rotation rules enabled globally.', impact: '100% compliance SLA verified' },
      { time: '14:15', title: 'CAN Bus Telemetry Mesh Synchronized', module: 'Telemetry Platform', desc: '45,200 connected vehicle streams synced with zero packet drop.', impact: 'Zero telemetry data loss' },
      { time: '15:00', title: 'Enterprise Maintenance Window Announced', module: 'Notifications', desc: 'Scheduled platform maintenance broadcast dispatches for Aug 8.', impact: '100% team reach confirmed' }
    ],
    architecture: [
      { name: 'Software Development', status: 'Healthy', updated: '5s ago', route: 'software-development' },
      { name: 'Sprint Management', status: 'Healthy', updated: '10m ago', route: 'sprint-management' },
      { name: 'DevOps & Pipelines', status: 'Healthy', updated: '1m ago', route: 'devops-pipelines' },
      { name: 'Cloud Infrastructure', status: 'Healthy', updated: 'Real-time', route: 'cloud-infrastructure' },
      { name: 'Database Management', status: 'Healthy', updated: 'Real-time', route: 'database-management' },
      { name: 'API Management', status: 'Healthy', updated: 'Real-time', route: 'api-management' },
      { name: 'IoT Device Management', status: 'Healthy', updated: 'Real-time', route: 'iot-device-management' },
      { name: 'Telemetry Platform', status: 'Healthy', updated: 'Real-time', route: 'telemetry-platform' },
      { name: 'AI Diagnostics', status: 'Healthy', updated: '1m ago', route: 'ai-diagnostics' },
      { name: 'AI Models', status: 'Healthy', updated: 'Real-time', route: 'ai-models' },
      { name: 'Machine Learning Platform', status: 'Healthy', updated: '5m ago', route: 'machine-learning' },
      { name: 'EVcare.AI Dashboard', status: 'Healthy', updated: 'Real-time', route: 'evcare-ai-dashboard' },
      { name: 'Technology Dashboard', status: 'Healthy', updated: 'Real-time', route: 'dashboard' }
    ]
  }
};
