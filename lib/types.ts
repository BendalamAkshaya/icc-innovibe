export type RoleType = 'CEO' | 'COO' | 'CTO' | 'SERVICE_MANAGER' | 'HR';

export interface UserRoleProfile {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  title: string;
  avatar: string;
  permissions: string[];
}

export interface EVHealthScore {
  overall: number; // 0-100
  batteryHealth: number; // 0-100
  motorEfficiency: number; // 0-100
  controllerTemp: number; // Celsius
  brakeWear: number; // % remaining
  tyreCondition: number; // % remaining
  lastUpdated: string;
  status: 'OPTIMAL' | 'ATTENTION' | 'CRITICAL';
}

export interface Vehicle {
  id: string;
  vin: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  ownerName: string;
  ownerMobile: string;
  healthScore: EVHealthScore;
  lastServiceDate: string;
  nextServiceDue: string;
}

export interface ServiceTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  registrationNumber: string;
  serviceType: 'Service at Home' | 'Service at Center' | 'Roadside Assistance';
  status: 'PENDING' | 'AI_DIAGNOSED' | 'TECHNICIAN_ASSIGNED' | 'IN_PROGRESS' | 'QUOTED' | 'COMPLETED';
  aiSuggestedFault: string;
  aiEstimatedCost: number;
  aiEstimatedTimeMins: number;
  assignedTechnician?: string;
  location: string;
  createdAt: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  serviceCenter: string;
  skills: string[];
  activeJobsCount: number;
  completedJobsMonth: number;
  customerRating: number;
  status: 'AVAILABLE' | 'ON_JOB' | 'OFFLINE';
  distanceKm?: number;
}

export interface VendorFleetVehicle {
  id: string;
  fleetName: string;
  vendorId: string;
  vehicleModel: string;
  regNumber: string;
  driverName: string;
  currentLat: number;
  currentLng: number;
  batteryPercent: number;
  chargingStatus: 'CHARGING' | 'DISCHARGING' | 'IDLE';
  lastPing: string;
}

export interface RolePermissionConfig {
  role: RoleType;
  roleName: string;
  description: string;
  accessibleFeatures: string[];
}

// Module 2: Business Performance Interfaces
export interface FinancialSummaryMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  growthPercent: number;
  isPositive: boolean;
  previousPeriodValue: string;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
}

export interface RevenueAnalyticsPoint {
  period: string;
  revenue: number;
  profit: number;
  expenses: number;
  netProfit: number;
  previousRevenue: number;
}

export interface RevenueSourceBreakdown {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BranchPerformance {
  id: string;
  name: string;
  city: string;
  revenue: number;
  growthPercent: number;
  servicesCompleted: number;
  customerRating: number;
  isBestPerformer?: boolean;
  isLowestPerformer?: boolean;
}

export interface BusinessKpi {
  id: string;
  label: string;
  value: string;
  subtext: string;
  change: string;
  isPositive: boolean;
}

export interface TopContributor {
  id: string;
  name: string;
  subtitle: string;
  value: string;
  sharePercent: number;
}

export interface FinancialInsight {
  id: string;
  type: 'POSITIVE' | 'WARNING' | 'NEUTRAL' | 'HIGHLIGHT';
  text: string;
  impact: string;
}

// Module 3: Company Operations Interfaces
export interface OperationsKpiMetric {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  trendPercent: string;
  isPositive: boolean;
  comparisonPeriod: string;
}

export interface OperationsProgress {
  totalJobsToday: number;
  completedJobs: number;
  inProgressJobs: number;
  waitingJobs: number;
  delayedJobs: number;
  completionRatePercent: number;
}

export interface BranchEfficiency {
  id: string;
  branchName: string;
  city: string;
  servicesCompleted: number;
  pendingJobs: number;
  slaCompliancePercent: number;
  customerRating: number;
  operationalScore: number; // 0-100
  isBestPerformer?: boolean;
  requiresAttention?: boolean;
}

export interface ServiceCenterHealth {
  id: string;
  centerName: string;
  location: string;
  capacityUtilizationPercent: number; // 0-100
  activeTechnicians: number;
  waitingVehicles: number;
  avgServiceTimeMins: number;
  currentQueueLength: number;
  status: 'OPTIMAL' | 'MODERATE' | 'OVERLOADED';
}

export interface OperationalTimelineEvent {
  id: string;
  time: string;
  title: string;
  category: 'SERVICE_STARTED' | 'SERVICE_COMPLETED' | 'PEAK_HOURS' | 'EMERGENCY' | 'RSA_CALL';
  description: string;
  impactCount?: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ALERT';
}

export interface OperationsAiInsight {
  id: string;
  title: string;
  category: 'EFFICIENCY' | 'TARGET' | 'WORKLOAD' | 'SLA_RISK';
  summary: string;
  actionableSuggestion: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Module 4: Fleet Intelligence Interfaces
export interface FleetKpiMetric {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  trendPercent: string;
  isPositive: boolean;
  comparisonPeriod: string;
}

export interface FleetHealthSummary {
  overallScore: number; // 0-100
  batteryHealthScore: number;
  motorHealthScore: number;
  controllerHealthScore: number;
  chargingPerformanceScore: number;
  avgRangeKm: number;
  status: 'OPTIMAL' | 'ATTENTION' | 'CRITICAL';
}

export interface VehicleStatusBreakdown {
  id: string;
  status: 'ONLINE' | 'OFFLINE' | 'CHARGING' | 'IN_SERVICE' | 'IDLE' | 'CRITICAL';
  count: number;
  percentage: number;
  color: string;
}

export interface BatteryAnalyticsData {
  avgBatteryHealthSoh: number; // % State of Health
  vehiclesBelow80PercentCount: number;
  predictedReplacements30Days: number;
  fastChargingUsagePercent: number;
  avgDegradationRatePer10kKm: number; // %
  batteryTemperatureOptimalPercent: number;
}

export interface PredictiveMaintenanceItem {
  id: string;
  vehicleModel: string;
  vin: string;
  issueType: 'BATTERY_DEGRADATION' | 'MOTOR_THERMAL' | 'BRAKE_PAD_WEAR' | 'AMC_EXPIRY' | 'WARRANTY_EXPIRY';
  riskLevel: 'HIGH' | 'MEDIUM' | 'CRITICAL';
  dueDate: string;
  aiPrediction: string;
}

export interface FleetPerformanceStat {
  totalDistanceCoveredKm: number;
  fleetEfficiencyKmPerKwh: number;
  avgEnergyConsumptionWhPerKm: number;
  avgDailyUsageKm: number;
  fleetUtilizationPercent: number;
  downtimePercent: number;
}

export interface GeographicRegionCoverage {
  id: string;
  city: string;
  activeVehicles: number;
  utilizationPercent: number;
  healthScore: number;
  density: 'HIGH' | 'MODERATE' | 'EXPANDING';
  lat: number;
  lng: number;
}

export interface FleetAiInsight {
  id: string;
  title: string;
  category: 'BATTERY' | 'UTILIZATION' | 'HEALTH' | 'SAVINGS';
  summary: string;
  actionableSuggestion: string;
  impact: string;
}

// Module 5: Department Performance Interfaces
export interface DepartmentMetric {
  id: string;
  departmentName: string;
  code: 'OPS' | 'TECH' | 'HR' | 'FIN' | 'SALES' | 'MKT' | 'SVC' | 'SCM';
  headOfDepartment: string;
  performanceScore: number; // 0-100
  kpiAchievementPercent: number;
  targetCompletionPercent: number;
  growthPercent: number;
  status: 'EXCEEDING' | 'ON_TRACK' | 'ATTENTION_NEEDED' | 'BEHIND';
}

export interface OrganizationHealthData {
  overallHealthScore: number; // 0-100
  departmentEfficiency: number;
  goalAchievementPercent: number;
  productivityIndex: number;
  operationalStabilityScore: number;
  status: 'OPTIMAL' | 'MODERATE' | 'CRITICAL';
}

export interface DepartmentComparisonPoint {
  metric: string;
  Operations: number;
  Technology: number;
  HR: number;
  Finance: number;
  Sales: number;
  Service: number;
}

export interface DepartmentLeaderboardItem {
  id: string;
  rank: number;
  departmentName: string;
  performanceScore: number;
  growthPercent: number;
  kpiAchievementPercent: number;
  efficiencyPercent: number;
  badge?: 'BEST_PERFORMER' | 'MOST_IMPROVED' | 'REQUIRES_ATTENTION';
}

export interface CollaborationPair {
  id: string;
  deptA: string;
  deptB: string;
  collaborationEfficiencyPercent: number;
  dependenciesCount: number;
  status: 'OPTIMAL' | 'MODERATE' | 'BOTTLENECK';
  primaryWorkflow: string;
}

export interface GoalOkrTracker {
  id: string;
  title: string;
  department: string;
  quarter: string;
  progressPercent: number;
  targetValue: string;
  currentValue: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DELAYED';
}

export interface ResourceUtilizationData {
  employeeUtilizationPercent: number;
  budgetUtilizationPercent: number;
  technologyUtilizationPercent: number;
  infrastructureUsagePercent: number;
  departmentCapacityPercent: number;
}

export interface DepartmentAiInsight {
  id: string;
  title: string;
  category: 'PRODUCTIVITY' | 'MILESTONE' | 'STAFFING' | 'CSAT';
  summary: string;
  actionableSuggestion: string;
  impact: string;
}

// Module 6: AI Command Center Interfaces
export interface PredictiveForecastItem {
  id: string;
  metricName: string;
  category: 'REVENUE' | 'DEMAND' | 'FLEET' | 'CUSTOMERS' | 'MAINTENANCE' | 'INVENTORY';
  currentValue: string;
  forecastedValue: string;
  forecastPeriod: string;
  confidencePercent: number; // e.g. 94%
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export interface RiskDetectionItem {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'REVENUE' | 'BATTERY' | 'STAFFING' | 'INVENTORY' | 'OPERATIONS';
  description: string;
  impactPotential: string;
  recommendedMitigation: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  category: 'EXPANSION' | 'STAFFING' | 'MARKETING' | 'SERVICE';
  description: string;
  estimatedRevenueGain: string;
  difficulty: 'EASY' | 'MODERATE' | 'COMPLEX';
}

export interface AiRecommendationItem {
  id: string;
  actionTitle: string;
  category: 'Revenue' | 'Operations' | 'Fleet' | 'HR' | 'Technology';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  impactSummary: string;
}

export interface AiTimelineLog {
  id: string;
  timestamp: string;
  eventTitle: string;
  type: 'ANALYSIS_COMPLETE' | 'RISK_DETECTED' | 'FORECAST_UPDATED' | 'INSIGHT_SYNTHESIZED';
  summary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
  metrics?: { label: string; value: string }[];
}

export interface CategoryInsightItem {
  id: string;
  category: 'Revenue' | 'Operations' | 'Fleet' | 'Customers' | 'Employees' | 'Departments' | 'Service Centers';
  insightText: string;
  trend: 'POSITIVE' | 'NEUTRAL' | 'ATTENTION';
  metricHighlight: string;
}

// Module 8: CEO Action Center Interfaces
export interface DecisionRequestItem {
  id: string;
  title: string;
  category: 'Finance' | 'HR' | 'Operations' | 'Fleet' | 'Technology';
  branch: string;
  submittedBy: string;
  submittedByRole: string;
  businessImpact: string;
  financialImpact: string;
  dueDate: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  aiRecommendation: string;
  aiConfidencePercent: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELEGATED' | 'INFO_REQUESTED';
  workflowStage: 'SUBMITTED' | 'DEPT_HEAD' | 'COO_REVIEW' | 'CEO_APPROVAL' | 'COMPLETED';
}

export interface DecisionSummaryMetric {
  id: string;
  label: string;
  count: number;
  trend: string;
  avgDecisionTime: string;
  badgeColor: string;
}

export interface StrategicInitiativeItem {
  id: string;
  title: string;
  category: string;
  progressPercent: number;
  budgetUsed: string;
  totalBudget: string;
  timeline: string;
  sponsor: string;
  currentRisk: string;
  nextMilestone: string;
}

export interface ExecutiveCalendarItem {
  id: string;
  title: string;
  category: 'BOARD' | 'INVESTOR' | 'REVIEW' | 'VISIT' | 'LAUNCH' | 'COMPLIANCE';
  dateTime: string;
  location: string;
  attendeesCount: number;
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL';
}

export interface DelegatedTaskItem {
  id: string;
  taskTitle: string;
  assignedTo: string;
  department: string;
  deadline: string;
  progressPercent: number;
  lastUpdate: string;
  status: 'ON_TRACK' | 'DELAYED' | 'COMPLETED';
}

export interface ExecutiveNoteItem {
  id: string;
  title: string;
  category: 'MEETING' | 'STRATEGY' | 'BOARD' | 'REMINDER';
  content: string;
  pinned: boolean;
  timestamp: string;
}

export interface AiDecisionAdvice {
  requestId: string;
  summary: string;
  pros: string[];
  risks: string[];
  alternatives: string[];
  confidenceScore: number;
}

// Module 9: Communication Hub Interfaces
export interface ExecutiveAnnouncement {
  id: string;
  title: string;
  category: 'COMPANY_UPDATE' | 'POLICY' | 'BRANCH_LAUNCH' | 'PRODUCT_LAUNCH' | 'EMERGENCY' | 'PERFORMANCE';
  publishedAt: string;
  author: string;
  targetAudience: string; // e.g. "All Employees (148 staff)"
  priority: 'HIGH' | 'NORMAL' | 'URGENT';
  richTextSnippet: string;
  viewsCount: number;
  readPercent: number;
  acknowledgedPercent: number;
  commentsCount: number;
}

export interface LeadershipThread {
  id: string;
  topicTitle: string;
  leadParticipant: string; // e.g. "Sri Hari (CEO) & Vikram Mehta (CFO)"
  departmentFocus: string;
  lastActivity: string;
  messagesCount: number;
  actionItemsCount: number;
  status: 'ACTIVE_DISCUSSION' | 'DECISION_LOGGED' | 'RESOLVED';
  summarySnippet: string;
}

export interface ExecutiveMeetingItem {
  id: string;
  title: string;
  meetingType: 'BOARD' | 'LEADERSHIP' | 'INVESTOR' | 'GOVT' | 'REVIEW';
  dateTime: string;
  location: string;
  participants: string[];
  aiMeetingSummary?: string;
  actionItems: string[];
  status: 'UPCOMING' | 'COMPLETED' | 'IN_PROGRESS';
}

export interface EmployeePulseData {
  pulseScore: number; // 0-100 (e.g. 91)
  organizationSentiment: 'VERY_POSITIVE' | 'POSITIVE' | 'NEUTRAL';
  surveyParticipationPercent: number;
  feedbackSubmittedCount: number;
  suggestionsCount: number;
  recognitionEventsCount: number;
}

export interface BoardInvestorReport {
  id: string;
  documentTitle: string;
  type: 'BOARD_REPORT' | 'INVESTOR_UPDATE' | 'FINANCIAL_DECK' | 'AGM_DOC' | 'COMPLIANCE';
  fileSize: string;
  uploadedAt: string;
  accessLevel: 'RESTRICTED_BOARD' | 'INVESTORS_ONLY' | 'PUBLIC_AGM';
  downloadCount: number;
}

export interface MediaPrItem {
  id: string;
  headline: string;
  outletName: string;
  mediaType: 'PRESS_RELEASE' | 'NEWS_COVERAGE' | 'INTERVIEW' | 'PUBLIC_STATEMENT';
  publishedDate: string;
  sentiment: 'POSITIVE' | 'NEUTRAL';
  reachCount: string;
}

export interface CommSummaryMetric {
  id: string;
  label: string;
  value: string | number;
  trend: string;
  comparison: string;
  badgeColor: string;
}

export interface AiCommDraft {
  id: string;
  type: 'ANNOUNCEMENT' | 'SPEECH' | 'EMAIL' | 'PRESS_RELEASE';
  title: string;
  generatedText: string;
  tone: 'INSPIRATIONAL' | 'FORMAL_EXECUTIVE' | 'REASSURING' | 'URGENT';
}

// Module 10: Reports & Analytics Interfaces
export interface ReportCardItem {
  id: string;
  reportTitle: string;
  category: 'BUSINESS' | 'FLEET' | 'OPERATIONS' | 'HR' | 'CUSTOMER' | 'FINANCE';
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'BOARD_PACK';
  lastGenerated: string;
  fileFormat: 'PDF' | 'EXCEL' | 'POWERPOINT' | 'DASHBOARD_LINK';
  summarySnippet: string;
  size: string;
  isPopular?: boolean;
}

export interface KpiVarianceItem {
  id: string;
  kpiName: string;
  category: string;
  quarterlyGoal: string;
  actualAchievement: string;
  forecastValue: string;
  variancePercent: number; // e.g. +4.2%
  status: 'EXCEEDING' | 'TARGET_MET' | 'ATTENTION';
}

export interface ScheduledReportItem {
  id: string;
  title: string;
  recipients: string; // e.g. "CEO, CFO, Board Members"
  scheduleCron: string; // e.g. "Every Monday 8:00 AM"
  deliveryChannels: ('EMAIL' | 'PDF' | 'EXCEL' | 'DASHBOARD_LINK')[];
  status: 'ACTIVE' | 'PAUSED';
}

export interface PredictiveAnalyticsModel {
  id: string;
  modelName: string;
  targetMetric: 'REVENUE' | 'EXPENSES' | 'FLEET_GROWTH' | 'CUSTOMER_RETENTION' | 'SERVICE_DEMAND' | 'HIRING_NEEDS';
  currentValue: string;
  predictedValue: string;
  timeframe: string;
  confidencePercent: number;
  keyDriver: string;
}

export interface CustomReportConfig {
  dataSource: string;
  departments: string[];
  branches: string[];
  kpis: string[];
  timeRange: string;
  chartType: 'BAR' | 'AREA' | 'LINE' | 'DONUT' | 'PIE';
}

export interface BoardPresentationSlide {
  id: string;
  slideNumber: number;
  title: string;
  headlineMetric: string;
  executiveSummary: string;
  keyPoints: string[];
  riskHighlights: string[];
  recommendationText: string;
}

export interface AiGeneratedReport {
  id: string;
  title: string;
  reportType: 'QUARTERLY_CEO' | 'INVESTOR_SUMMARY' | 'BOARD_MEETING_PACK' | 'FLEET_HEALTH_AUDIT' | 'BUSINESS_HEALTH';
  executiveSummary: string;
  keyInsights: string[];
  recommendedActions: string[];
  generatedAt: string;
}








