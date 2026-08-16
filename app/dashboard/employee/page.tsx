'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRole } from '@/components/RoleContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { createCrossRoleTicketNotification, TicketPriority } from '@/lib/ticketNotifications';
import { TmsTasksView } from '@/components/ceo/tms/tasks/TmsTasksView';
import { TmsEmployeeLeaveView } from '@/components/ceo/tms/leave/TmsEmployeeLeaveView';
import { TmsEmployeeSessionHistoryView } from '@/components/ceo/tms/logout/TmsEmployeeSessionHistoryView';
import { TmsEmployeeAnnouncementsView } from '@/components/ceo/tms/announcements/TmsEmployeeAnnouncementsView';
import { TmsEmployeeReportsView } from '@/components/ceo/tms/reports/TmsEmployeeReportsView';
import { TmsEmployeeNotificationsView } from '@/components/ceo/tms/notifications/TmsEmployeeNotificationsView';
import { NotificationRepository } from '@/lib/notification-repository';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  FileText,
  Award,
  ChevronRight,
  TrendingUp,
  HelpCircle,
  Bell,
  Sparkles,
  Search,
  CheckSquare,
  Send,
  Plus,
  Filter,
  Check,
  UserCheck,
  Building,
  Zap,
  Coffee,
  X,
  Download,
  Share2,
  MoreVertical,
  CalendarRange,
  ClipboardCheck,
  Inbox,
  User,
  MapPin,
  Mail,
  Phone,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Gift,
  Heart,
  Smile,
  ShieldCheck,
  RefreshCw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronDown,
  BarChart3,
  Flame,
  CheckCheck,
  Settings,
  Eye,
  Pencil,
  Camera,
  Upload,
  Activity,
  Fingerprint
} from 'lucide-react';

export interface AssignedTask {
  id: string;
  title: string;
  description: string;
  assignedBy: {
    name: string;
    role: string;
    department: string;
    avatar: string;
  };
  deadline: string;
  due: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'NORMAL';
  tag: string;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';
  completed: boolean;
  isOverdue?: boolean;
  attachedDocuments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  acceptedAt?: string | null;
  completionProof?: {
    submittedAt: string;
    description: string;
    uploadedDocuments?: Array<{ name: string; size: string; type: string }>;
    hoursSpent?: string;
  } | null;
}

export default function EmployeeDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentProfile } = useRole();

  // Active view from URL query param (?view=...)
  const viewParam = searchParams.get('view') || searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState<string>(viewParam);

  useEffect(() => {
    if (viewParam) {
      setActiveTab(viewParam);
    }
  }, [viewParam]);

  const setView = (viewName: string) => {
    setActiveTab(viewName);
    router.push(`/dashboard/employee?view=${viewName}`);
  };

  // Live Timer & Working Duration
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTimestamp, setClockInTimestamp] = useState<number>(Date.now() - 5 * 3600 * 1000 - 48 * 60 * 1000); // 5h 48m ago
  const [workingDuration, setWorkingDuration] = useState<string>('05h 48m 12s');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Always compute IST (UTC+5:30) regardless of browser locale
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 5.5 * 3600000);
      const hh = ist.getHours();
      const mm = ist.getMinutes();
      const ss = ist.getSeconds();
      const ampm = hh >= 12 ? 'PM' : 'AM';
      const h12 = (hh % 12 || 12).toString().padStart(2, '0');
      setCurrentTime(`${h12}:${mm.toString().padStart(2,'0')}:${ss.toString().padStart(2,'0')} ${ampm} IST`);

      if (isClockedIn) {
        const diffMs = now.getTime() - clockInTimestamp;
        const hrs = Math.floor(diffMs / 3600000);
        const mins = Math.floor((diffMs % 3600000) / 60000);
        const secs = Math.floor((diffMs % 60000) / 1000);
        setWorkingDuration(`${String(hrs).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isClockedIn, clockInTimestamp]);

  // Assigned Tasks State (Assigned centrally by CEO, COO, CTO, HR)
  const [taskFilter, setTaskFilter] = useState<'ALL' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'HIGH' | 'OVERDUE'>('ALL');
  
  const initialAssignedTasks: AssignedTask[] = [
    {
      id: 'TSK-4092',
      title: 'Verify Telemetry Calibration for Bengaluru Central EV Fleet',
      description: 'Calibrate all 24 IoT telemetry gateways across Ather 450X fleet at Central Hub. Check battery temperature sensor streams, speed packet frequency, and GPS sync.',
      assignedBy: {
        name: 'Rajesh Varma',
        role: 'COO (Chief Operating Officer)',
        department: 'Operations & Logistics',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      },
      deadline: 'Today, 11:30 AM',
      due: '11:30 AM',
      priority: 'HIGH' as const,
      tag: 'Operations',
      status: 'COMPLETED' as const,
      completed: true,
      isOverdue: false,
      attachedDocuments: [
        { name: 'IoT_Gateway_Calibration_SOP_v3.pdf', size: '1.8 MB', type: 'PDF' },
        { name: 'Telemetry_Validation_Checklist.xlsx', size: '420 KB', type: 'Spreadsheet' },
      ],
      acceptedAt: 'Today, 09:30 AM',
      completionProof: {
        submittedAt: 'Today, 11:20 AM',
        description: 'All 24 gateways calibrated with 0 latency drift. Verified telemetry stream with Central Hub cloud server.',
        uploadedDocuments: [
          { name: 'depot_telemetry_calibration_verified.pdf', size: '2.1 MB', type: 'PDF' },
        ],
        hoursSpent: '1.8 hrs',
      },
    },
    {
      id: 'TSK-4093',
      title: 'Review SOP Checklist for 5kW BLDC Hub Motor Assembly',
      description: 'Audit motor torque tolerances, waterproof cable grommet sealing, and hall-sensor pin integrity for the incoming batch of 5kW hub motors before deployment.',
      assignedBy: {
        name: 'Vikram Roy',
        role: 'CTO (Chief Technology Officer)',
        department: 'Technology & Engineering',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      },
      deadline: 'Today, 02:00 PM',
      due: '02:00 PM',
      priority: 'HIGH' as const,
      tag: 'Quality',
      status: 'IN_PROGRESS' as const,
      completed: false,
      isOverdue: true,
      attachedDocuments: [
        { name: '5kW_BLDC_Motor_Assembly_Spec.pdf', size: '3.2 MB', type: 'PDF' },
        { name: 'Quality_Torque_Inspection_Sheet.pdf', size: '640 KB', type: 'PDF' },
      ],
      acceptedAt: 'Today, 10:15 AM',
      completionProof: null,
    },
    {
      id: 'TSK-4094',
      title: 'Submit Daily Battery Cell Balancing Verification Report',
      description: 'Execute BMS cell delta analysis across 40 depot charging docks. Flag any pack with >0.08V variance.',
      assignedBy: {
        name: 'Rajesh Varma',
        role: 'COO (Chief Operating Officer)',
        department: 'Operations & Logistics',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      },
      deadline: 'Today, 04:30 PM',
      due: '04:30 PM',
      priority: 'MEDIUM' as const,
      tag: 'Reports',
      status: 'IN_PROGRESS' as const,
      completed: false,
      isOverdue: false,
      attachedDocuments: [
        { name: 'BMS_Cell_Variance_Matrix.pdf', size: '1.4 MB', type: 'PDF' },
      ],
      acceptedAt: 'Today, 11:00 AM',
      completionProof: null,
    },
    {
      id: 'TSK-4095',
      title: 'Attend Operations Strategy & Resource Townhall',
      description: 'Participate in executive operations review for Bengaluru Hub Q3 expansion and review employee safety guidelines.',
      assignedBy: {
        name: 'Sri Hari Kolusu',
        role: 'CEO (Super Admin)',
        department: 'Executive Leadership',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      },
      deadline: 'Today, 05:00 PM',
      due: '05:00 PM',
      priority: 'NORMAL' as const,
      tag: 'Meeting',
      status: 'ASSIGNED' as const,
      completed: false,
      isOverdue: false,
      attachedDocuments: [
        { name: 'Q3_Operations_Strategic_Deck.pdf', size: '5.1 MB', type: 'PDF' },
      ],
      acceptedAt: null,
      completionProof: null,
    },
    {
      id: 'TSK-4096',
      title: 'Audit Fast-Charger Station 4 Depot Diagnostics & Firmware',
      description: 'Perform firmware check on 60kW DC fast-charger stations 4A & 4B. Verify OCPP 2.0.1 transaction handshake.',
      assignedBy: {
        name: 'Vikram Roy',
        role: 'CTO (Chief Technology Officer)',
        department: 'Technology & Engineering',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      },
      deadline: 'Today, 06:00 PM',
      due: '06:00 PM',
      priority: 'MEDIUM' as const,
      tag: 'Diagnostics',
      status: 'ASSIGNED' as const,
      completed: false,
      isOverdue: false,
      attachedDocuments: [
        { name: 'OCPP_FastCharger_Diagnostic_Guide.pdf', size: '2.7 MB', type: 'PDF' },
      ],
      acceptedAt: null,
      completionProof: null,
    },
    {
      id: 'TSK-4097',
      title: 'Submit Employee Mandatory Compliance & Workplace Safety Audit',
      description: 'Complete the annual electrical safety and workplace POSH compliance acknowledgment module.',
      assignedBy: {
        name: 'Pooja Reddy',
        role: 'Head of HR (Human Resources)',
        department: 'Human Resources & People Ops',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      },
      deadline: 'Tomorrow, 06:00 PM',
      due: 'Tomorrow',
      priority: 'NORMAL' as const,
      tag: 'Compliance',
      status: 'ASSIGNED' as const,
      completed: false,
      isOverdue: false,
      attachedDocuments: [
        { name: 'Workplace_Safety_Manual_2026.pdf', size: '1.9 MB', type: 'PDF' },
      ],
      acceptedAt: null,
      completionProof: null,
    },
  ];

  const [tasks, setTasks] = useState<AssignedTask[]>(initialAssignedTasks);
  const [selectedTaskForReview, setSelectedTaskForReview] = useState<any | null>(null);
  const [selectedTaskForProof, setSelectedTaskForProof] = useState<any | null>(null);
  const [proofDescription, setProofDescription] = useState('');
  const [proofHoursSpent, setProofHoursSpent] = useState('2.0 hrs');
  const [proofUploadedFiles, setProofUploadedFiles] = useState<Array<{ name: string; size: string; type: string }>>([]);
  const [selectedDocumentForView, setSelectedDocumentForView] = useState<any | null>(null);
  const [docViewerZoom, setDocViewerZoom] = useState<number>(100);
  const [taskActionToast, setTaskActionToast] = useState<string>('');
  const [productivityTimeframe, setProductivityTimeframe] = useState<'TODAY' | 'WEEK' | 'MONTH'>('WEEK');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [selectedVelocityPoint, setSelectedVelocityPoint] = useState<number | null>(null);
  const [showVelocityCurve, setShowVelocityCurve] = useState<boolean>(true);
  const [showBaselineLine, setShowBaselineLine] = useState<boolean>(true);
  const [hoveredDonutSlice, setHoveredDonutSlice] = useState<string | null>(null);
  const [activeReportMetric, setActiveReportMetric] = useState<'PRODUCTIVITY' | 'QUALITY' | 'ATTENDANCE' | 'SLA'>('PRODUCTIVITY');
  const [chartHoverIdx, setChartHoverIdx] = useState<number | null>(null);

  // Interactive Task Card Expanded States & Live Checklists
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [copiedTaskId, setCopiedTaskId] = useState<string | null>(null);
  const [taskChecklistState, setTaskChecklistState] = useState<Record<string, boolean[]>>({
    'TSK-4092': [true, true, true],
    'TSK-4093': [true, true, false],
    'TSK-4094': [true, false, false],
    'TSK-4095': [false, false, false],
  });

  const handleCopyTaskId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(id);
    setCopiedTaskId(id);
    setTimeout(() => setCopiedTaskId(null), 2000);
  };

  const toggleTaskChecklist = (e: React.MouseEvent, taskId: string, stepIdx: number) => {
    e.stopPropagation();
    setTaskChecklistState((prev) => {
      const current = prev[taskId] || [false, false, false];
      const updated = [...current];
      updated[stepIdx] = !updated[stepIdx];
      return { ...prev, [taskId]: updated };
    });
  };

  // Attendance Graph Range & Mode Filters & Interactive Inspection
  const [attendanceTimeRange, setAttendanceTimeRange] = useState<'1W' | '1M' | '6M' | 'CUSTOM'>('1W');
  const [attendanceGraphMode, setAttendanceGraphMode] = useState<'BOTH' | 'LOGIN' | 'LOGOUT'>('BOTH');
  const [customStartDate, setCustomStartDate] = useState<string>('2026-08-01');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-08-10');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [selectedAttendanceDay, setSelectedAttendanceDay] = useState<any | null>(null);
  const [activeAttendanceMetricCard, setActiveAttendanceMetricCard] = useState<string | null>(null);
  const [showLoginTarget, setShowLoginTarget] = useState<boolean>(true);
  const [showLoginCutoff, setShowLoginCutoff] = useState<boolean>(true);
  const [showLogoutEnd, setShowLogoutEnd] = useState<boolean>(true);
  const [showLogoutOvertime, setShowLogoutOvertime] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync tasks to localStorage so Navbar global search can discover individual tasks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchableTasks = tasks.map(t => ({
        id: t.id,
        title: t.title,
        tag: t.tag,
        priority: t.priority,
        status: t.status,
        deadline: t.deadline,
        completed: t.completed,
        assignedBy: t.assignedBy?.name,
      }));
      localStorage.setItem('icc_employee_searchable_tasks', JSON.stringify(searchableTasks));
    }
  }, [tasks]);

  // Dynamic Attendance & Logout Data based on selected Range
  const attendanceChartData = useMemo(() => {
    if (attendanceTimeRange === '1W') {
      return [
        { date: 'Mon 04', fullDate: 'Monday, Aug 04', loginTime: '09:02 AM', logoutTime: '06:14 PM', loginMinutes: 2, logoutMinutes: 14, hours: '8h 12m', status: 'On-Time', departureStatus: '+14m Normal' },
        { date: 'Tue 05', fullDate: 'Tuesday, Aug 05', loginTime: '08:58 AM', logoutTime: '06:18 PM', loginMinutes: -2, logoutMinutes: 18, hours: '8h 20m', status: 'Early (08:58)', departureStatus: '+18m Overtime' },
        { date: 'Wed 06', fullDate: 'Wednesday, Aug 06', loginTime: '09:12 AM', logoutTime: '06:12 PM', loginMinutes: 12, logoutMinutes: 12, hours: '8h 00m', status: 'On-Time', departureStatus: '+12m Normal' },
        { date: 'Thu 07', fullDate: 'Thursday, Aug 07', loginTime: '08:58 AM', logoutTime: '06:05 PM', loginMinutes: -2, logoutMinutes: 5, hours: '8h 07m', status: 'Early (08:58)', departureStatus: '+05m Normal' },
        { date: 'Fri 08', fullDate: 'Friday, Aug 08', loginTime: '09:10 AM', logoutTime: '06:20 PM', loginMinutes: 10, logoutMinutes: 20, hours: '8h 10m', status: 'On-Time', departureStatus: '+20m Overtime' },
        { date: 'Sat 09', fullDate: 'Saturday, Aug 09', loginTime: '09:05 AM', logoutTime: '06:15 PM', loginMinutes: 5, logoutMinutes: 15, hours: '8h 10m', status: 'On-Time', departureStatus: '+15m Normal' },
        { date: 'Today 10', fullDate: 'Today (Aug 10)', loginTime: '09:15 AM', logoutTime: '06:00 PM (Est)', loginMinutes: 15, logoutMinutes: 0, hours: workingDuration, status: 'On-Time (Active)', departureStatus: 'Shift In Progress' },
      ];
    }
    if (attendanceTimeRange === '6M') {
      return [
        { date: 'Mar 26', fullDate: 'March 2026', loginTime: '09:03 AM (Avg)', logoutTime: '06:12 PM (Avg)', loginMinutes: 3, logoutMinutes: 12, hours: '8h 09m', status: '100% On-Time', departureStatus: 'Standard' },
        { date: 'Apr 26', fullDate: 'April 2026', loginTime: '09:06 AM (Avg)', logoutTime: '06:15 PM (Avg)', loginMinutes: 6, logoutMinutes: 15, hours: '8h 09m', status: '100% On-Time', departureStatus: 'Standard' },
        { date: 'May 26', fullDate: 'May 2026', loginTime: '09:01 AM (Avg)', logoutTime: '06:16 PM (Avg)', loginMinutes: 1, logoutMinutes: 16, hours: '8h 15m', status: '100% On-Time', departureStatus: 'Standard' },
        { date: 'Jun 26', fullDate: 'June 2026', loginTime: '09:08 AM (Avg)', logoutTime: '06:18 PM (Avg)', loginMinutes: 8, logoutMinutes: 18, hours: '8h 10m', status: '100% On-Time', departureStatus: 'Standard' },
        { date: 'Jul 26', fullDate: 'July 2026', loginTime: '09:04 AM (Avg)', logoutTime: '06:14 PM (Avg)', loginMinutes: 4, logoutMinutes: 14, hours: '8h 10m', status: '100% On-Time', departureStatus: 'Standard' },
        { date: 'Aug 26', fullDate: 'August 2026', loginTime: '09:05 AM (Avg)', logoutTime: '06:15 PM (Avg)', loginMinutes: 5, logoutMinutes: 15, hours: '8h 12m', status: '100% On-Time (Active)', departureStatus: 'Standard' },
      ];
    }
    if (attendanceTimeRange === 'CUSTOM') {
      return [
        { date: `${customStartDate.slice(5)}`, fullDate: `Start Date: ${customStartDate}`, loginTime: '09:04 AM', logoutTime: '06:12 PM', loginMinutes: 4, logoutMinutes: 12, hours: '8h 08m', status: 'On-Time', departureStatus: '+12m Normal' },
        { date: 'Int 1', fullDate: 'Interval Checkpoint 1', loginTime: '08:57 AM', logoutTime: '06:15 PM', loginMinutes: -3, logoutMinutes: 15, hours: '8h 18m', status: 'Early', departureStatus: '+15m Normal' },
        { date: 'Int 2', fullDate: 'Interval Checkpoint 2', loginTime: '09:10 AM', logoutTime: '06:22 PM', loginMinutes: 10, logoutMinutes: 22, hours: '8h 12m', status: 'On-Time', departureStatus: '+22m Overtime' },
        { date: 'Int 3', fullDate: 'Interval Checkpoint 3', loginTime: '09:02 AM', logoutTime: '06:08 PM', loginMinutes: 2, logoutMinutes: 8, hours: '8h 06m', status: 'On-Time', departureStatus: '+08m Normal' },
        { date: `${customEndDate.slice(5)}`, fullDate: `End Date: ${customEndDate}`, loginTime: '09:15 AM', logoutTime: '06:00 PM', loginMinutes: 15, logoutMinutes: 0, hours: workingDuration, status: 'Active Shift', departureStatus: 'Active' },
      ];
    }
    // Default: '1M'
    return [
      { date: 'Aug 01', fullDate: 'Aug 01, 2026', loginTime: '09:05 AM', logoutTime: '06:15 PM', loginMinutes: 5, logoutMinutes: 15, hours: '8h 10m', status: 'On-Time', departureStatus: '+15m Normal' },
      { date: 'Aug 02', fullDate: 'Aug 02, 2026', loginTime: '08:55 AM', logoutTime: '06:10 PM', loginMinutes: -5, logoutMinutes: 10, hours: '8h 15m', status: 'Early (08:55)', departureStatus: '+10m Normal' },
      { date: 'Aug 03', fullDate: 'Aug 03, 2026', loginTime: '09:08 AM', logoutTime: '06:13 PM', loginMinutes: 8, logoutMinutes: 13, hours: '8h 05m', status: 'On-Time', departureStatus: '+13m Normal' },
      { date: 'Aug 04', fullDate: 'Aug 04, 2026', loginTime: '09:02 AM', logoutTime: '06:14 PM', loginMinutes: 2, logoutMinutes: 14, hours: '8h 12m', status: 'On-Time', departureStatus: '+14m Normal' },
      { date: 'Aug 05', fullDate: 'Aug 05, 2026', loginTime: '08:58 AM', logoutTime: '06:18 PM', loginMinutes: -2, logoutMinutes: 18, hours: '8h 20m', status: 'Early (08:58)', departureStatus: '+18m Overtime' },
      { date: 'Aug 06', fullDate: 'Aug 06, 2026', loginTime: '09:12 AM', logoutTime: '06:12 PM', loginMinutes: 12, logoutMinutes: 12, hours: '8h 00m', status: 'On-Time', departureStatus: '+12m Normal' },
      { date: 'Aug 07', fullDate: 'Aug 07, 2026', loginTime: '08:58 AM', logoutTime: '06:05 PM', loginMinutes: -2, logoutMinutes: 5, hours: '8h 07m', status: 'Early (08:58)', departureStatus: '+05m Normal' },
      { date: 'Aug 08', fullDate: 'Aug 08, 2026', loginTime: '09:10 AM', logoutTime: '06:20 PM', loginMinutes: 10, logoutMinutes: 20, hours: '8h 10m', status: 'On-Time', departureStatus: '+20m Overtime' },
      { date: 'Aug 09', fullDate: 'Aug 09, 2026', loginTime: '09:05 AM', logoutTime: '06:15 PM', loginMinutes: 5, logoutMinutes: 15, hours: '8h 10m', status: 'On-Time', departureStatus: '+15m Normal' },
      { date: 'Today 10', fullDate: 'Today (Aug 10)', loginTime: '09:15 AM', logoutTime: '06:00 PM (Est)', loginMinutes: 15, logoutMinutes: 0, hours: 'Active Shift', status: 'On-Time (Active)', departureStatus: 'Shift In Progress' },
    ];
  }, [attendanceTimeRange, customStartDate, customEndDate, workingDuration]);

  // Modals State
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isLogoutReportModalOpen, setIsLogoutReportModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any | null>(null);
  const [birthdayWished, setBirthdayWished] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [profileSuccessToast, setProfileSuccessToast] = useState(false);

  // Profile Avatar State & Modals
  const [isPhotoPreviewModalOpen, setIsPhotoPreviewModalOpen] = useState(false);
  const [isPhotoEditModalOpen, setIsPhotoEditModalOpen] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [profileAvatar, setProfileAvatar] = useState<string>(
    currentProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
  );

  // Document Vault State & Modal
  const defaultDocs = {
    aadhaar: { title: 'Aadhaar Card Attachment', fileName: 'aadhaar_card_verified.pdf', size: '1.2 MB', date: 'Jan 15, 2024', status: 'Uploaded & Verified' },
    pan: { title: 'PAN Card Attachment', fileName: 'pan_card_verified.pdf', size: '840 KB', date: 'Jan 15, 2024', status: 'Uploaded & Verified' },
    resume: { title: 'Resume PDF Copy', fileName: 'sneha_patel_operations_resume.pdf', size: '2.1 MB', date: 'Jan 15, 2024', status: 'Uploaded & Verified' },
    degree: { title: 'Degree Certificate', fileName: 'degree_certificate_btech.pdf', size: '3.4 MB', date: 'Jan 15, 2024', status: 'Uploaded & Verified' },
  };

  const [employeeDocs, setEmployeeDocs] = useState(defaultDocs);
  const [selectedDocPreview, setSelectedDocPreview] = useState<{ title: string; fileName: string; size: string; status: string; date: string } | null>(null);
  const [docUploadSuccessMsg, setDocUploadSuccessMsg] = useState<string>('');

  // Dynamic Logged-in Employee Profile State
  const defaultProfileData = useMemo(() => ({
    fullName: currentProfile?.name || 'Sneha Patel',
    email: currentProfile?.email || 'employee@innovibemobility.com',
    primaryPhone: '+91 98450 12345',
    dob: '1996-08-14',
    gender: 'Female',
    streetAddress: '42, 12th Main Road, 4th Block, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    emergencyContactName: 'Ananya Patel',
    emergencyContactPhone: '+91 98450 67890',
    fatherName: 'Ramesh Patel',
    motherName: 'Sunita Patel',
    aadhaarNumber: 'XXXX-XXXX-4829',
    panNumber: 'ABCDE1234F',
    professionalDesignation: 'Operations Specialist',
    role: currentProfile?.role === 'EMPLOYEE' ? 'Operations Specialist' : (currentProfile?.role || 'Operations Specialist'),
    department: 'EV Fleet Operations & Logistics',
    employeeId: 'INV-OPS-2024-042',
    joinedDate: 'January 15, 2024',
    reportingManager: 'Rajesh Varma (Chief Operating Officer)',
    workLocation: 'Bengaluru Central Hub (Koramangala)',
    maritalStatus: 'Single',
    bloodGroup: 'O+',
    employmentType: 'Full-Time Regular',
    workMode: 'Hybrid Model',
    aadhaarAttachment: 'Uploaded & Verified',
    panAttachment: 'Uploaded & Verified',
    resumePdf: 'Uploaded & Verified',
    degreeCertificate: 'Uploaded & Verified',
    languagesKnown: 'English, Hindi, Kannada',
    linkedinUrl: 'https://linkedin.com/in/snehapatel-ops',
    priorWorkExperience: '3.5 Years in EV Fleet Logistics',
    highestEducation: 'B.Tech / B.E. in Electrical & Electronics',
    professionalBio: 'Operations specialist focused on fleet telemetry, battery cell analytics, and depot EV charging logistics.',
    alternatePhone: '+91 98765 43210',
    coreTechnicalSkills: 'EV Telemetry, Fleet Logistics, Battery Analytics, SOP Audit',
  }), [currentProfile]);

  const [profileData, setProfileData] = useState(defaultProfileData);
  const [tempProfileData, setTempProfileData] = useState(defaultProfileData);
  const [editProfileCategory, setEditProfileCategory] = useState<'PERSONAL' | 'CONTACT' | 'ORG_KYC' | 'SKILLS_EXP' | 'DOCS'>('PERSONAL');

  // Load saved profile data, avatar, and documents from localStorage if customized
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`icc_employee_profile_${currentProfile?.email || 'default'}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfileData(parsed);
          setTempProfileData(parsed);
        } catch (e) {}
      } else {
        setProfileData(defaultProfileData);
        setTempProfileData(defaultProfileData);
      }

      const savedAvatar = localStorage.getItem(`icc_employee_avatar_${currentProfile?.email || 'default'}`);
      if (savedAvatar) {
        setProfileAvatar(savedAvatar);
      }

      const savedDocs = localStorage.getItem(`icc_employee_docs_${currentProfile?.email || 'default'}`);
      if (savedDocs) {
        try {
          setEmployeeDocs(JSON.parse(savedDocs));
        } catch (e) {}
      }

      const savedTickets = localStorage.getItem(`icc_employee_tickets_${currentProfile?.email || 'default'}`);
      if (savedTickets) {
        try {
          setSubmittedTickets(JSON.parse(savedTickets));
        } catch (e) {}
      }

      const savedTasks = localStorage.getItem(`icc_employee_tasks_${currentProfile?.email || 'default'}`);
      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks));
        } catch (e) {}
      }
    }
  }, [defaultProfileData, currentProfile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(tempProfileData);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`icc_employee_profile_${currentProfile?.email || 'default'}`, JSON.stringify(tempProfileData));
    }
    setProfileSuccessToast(true);
    setIsEditProfileModalOpen(false);
    setTimeout(() => {
      setProfileSuccessToast(false);
    }, 3000);
  };

  const openProfileEditorForField = (category: 'PERSONAL' | 'CONTACT' | 'ORG_KYC' | 'SKILLS_EXP' | 'DOCS') => {
    setTempProfileData(profileData);
    setEditProfileCategory(category);
    setIsEditProfileModalOpen(true);
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileAvatar(reader.result);
          if (typeof window !== 'undefined') {
            localStorage.setItem(`icc_employee_avatar_${currentProfile?.email || 'default'}`, reader.result);
          }
          setIsPhotoEditModalOpen(false);
          setProfileSuccessToast(true);
          setTimeout(() => setProfileSuccessToast(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCustomAvatarUrl = (url: string) => {
    if (url.trim()) {
      setProfileAvatar(url.trim());
      if (typeof window !== 'undefined') {
        localStorage.setItem(`icc_employee_avatar_${currentProfile?.email || 'default'}`, url.trim());
      }
      setIsPhotoEditModalOpen(false);
      setProfileSuccessToast(true);
      setTimeout(() => setProfileSuccessToast(false), 3000);
    }
  };

  const handleUploadDocument = (docKey: 'aadhaar' | 'pan' | 'resume' | 'degree', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeFormatted = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      const updated = {
        ...employeeDocs,
        [docKey]: {
          ...employeeDocs[docKey],
          fileName: file.name,
          size: fileSizeFormatted,
          date: 'Today',
          status: 'Uploaded & Verified',
        },
      };
      setEmployeeDocs(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`icc_employee_docs_${currentProfile?.email || 'default'}`, JSON.stringify(updated));
      }
      setDocUploadSuccessMsg(`${updated[docKey].title} uploaded successfully!`);
      setTimeout(() => setDocUploadSuccessMsg(''), 3500);
    }
  };

  // Leave Form State
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [leaveStartDate, setLeaveStartDate] = useState('2026-08-18');
  const [leaveEndDate, setLeaveEndDate] = useState('2026-08-19');
  const [leaveDurationType, setLeaveDurationType] = useState<'FULL_DAY' | 'HALF_DAY'>('FULL_DAY');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSuccessMsg, setLeaveSuccessMsg] = useState(false);

  // Leave Balances & Interactive Leave State
  const [leaveBalances, setLeaveBalances] = useState({
    casual: { available: 6, used: 2, total: 8 },
    sick: { available: 8, used: 1, total: 9 },
    earned: { available: 12, used: 3, total: 15 },
  });
  const [expandedLeaveId, setExpandedLeaveId] = useState<string | null>(null);
  const [selectedLeaveCategory, setSelectedLeaveCategory] = useState<string | null>(null);
  const [leaveFilterTab, setLeaveFilterTab] = useState<'ALL' | 'APPROVED' | 'PENDING' | 'CASUAL' | 'SICK' | 'EARNED'>('ALL');

  const [recentLeaveRequestsList, setRecentLeaveRequestsList] = useState([
    {
      id: 'LEV-2026-081',
      title: 'Casual Leave (Personal Work)',
      category: 'CASUAL',
      dates: 'Aug 22, 2026 • 1 Day',
      fullDateRange: 'Friday, August 22, 2026',
      duration: '1.0 Day (Full Day)',
      reason: 'Attending family property registration and administrative banking work in Mysuru.',
      status: 'APPROVED',
      appliedOn: 'Aug 10, 2026',
      approvedBy: {
        name: 'Pooja Reddy',
        role: 'Head of HR (People Ops)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        approvedAt: 'Aug 10, 02:45 PM',
        comment: 'Approved. Operations handover confirmed with Rajesh Varma (COO).'
      },
      attachedDoc: { name: 'Leave_Application_Form_Signed.pdf', size: '320 KB', type: 'PDF' },
      timeline: [
        { label: 'Application Submitted by You', time: 'Aug 10, 11:30 AM', done: true },
        { label: 'Executive Review by Head of HR', time: 'Aug 10, 02:45 PM', done: true },
        { label: 'Roster Schedule Updated', time: 'Aug 10, 03:00 PM', done: true }
      ]
    },
    {
      id: 'LEV-2026-064',
      title: 'Sick Leave (Fever & Medical Rest)',
      category: 'SICK',
      dates: 'Jul 14, 2026 • 1 Day',
      fullDateRange: 'Tuesday, July 14, 2026',
      duration: '1.0 Day (Full Day)',
      reason: 'Acute viral fever and fatigue. Advised 24-hour hydration and bed rest by Dr. Mehta Clinic.',
      status: 'APPROVED',
      appliedOn: 'Jul 13, 2026',
      approvedBy: {
        name: 'Pooja Reddy',
        role: 'Head of HR (People Ops)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        approvedAt: 'Jul 13, 05:15 PM',
        comment: 'Approved under standard annual medical leave entitlement.'
      },
      attachedDoc: { name: 'Medical_Prescription_DrMehta_Signed.pdf', size: '1.2 MB', type: 'PDF' },
      timeline: [
        { label: 'Application Submitted by You', time: 'Jul 13, 04:15 PM', done: true },
        { label: 'Medical Slip Verified by HR', time: 'Jul 13, 05:15 PM', done: true },
        { label: 'Leave Approved & Logged', time: 'Jul 13, 05:20 PM', done: true }
      ]
    },
    {
      id: 'LEV-2026-052',
      title: 'Earned Leave (Annual Family Vacation)',
      category: 'EARNED',
      dates: 'Jun 18 - Jun 20, 2026 • 3 Days',
      fullDateRange: 'Thursday, June 18 to Saturday, June 20, 2026',
      duration: '3.0 Days',
      reason: 'Annual pre-scheduled family trip to Ooty. Telemetry tasks reassigned to Rajesh Varma (COO) depot team.',
      status: 'APPROVED',
      appliedOn: 'Jun 05, 2026',
      approvedBy: {
        name: 'Rajesh Varma',
        role: 'COO (Chief Operating Officer)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        approvedAt: 'Jun 06, 10:00 AM',
        comment: 'Approved. Advance operational coverage planned.'
      },
      attachedDoc: { name: 'Vacation_Handover_Plan.pdf', size: '850 KB', type: 'PDF' },
      timeline: [
        { label: 'Application Submitted by You', time: 'Jun 05, 09:30 AM', done: true },
        { label: 'COO Operations Approval', time: 'Jun 06, 10:00 AM', done: true },
        { label: 'HR Final Sign-Off', time: 'Jun 06, 11:15 AM', done: true }
      ]
    }
  ]);

  // Logout Report Form State
  const [logoutWorkDone, setLogoutWorkDone] = useState('');
  const [logoutBlockers, setLogoutBlockers] = useState('');
  const [logoutPending, setLogoutPending] = useState('');
  const [logoutTomorrowPlan, setLogoutTomorrowPlan] = useState('');
  const [logoutReportSuccess, setLogoutReportSuccess] = useState(false);
  const [expandedLogoutReportId, setExpandedLogoutReportId] = useState<string | null>(null);
  const [logoutReportsList, setLogoutReportsList] = useState([
    {
      id: 'REP-0809',
      date: 'Yesterday (Aug 09)',
      completed: 'Calibrated 24 EV telematics nodes; verified depot BMS firmware.',
      blockers: 'None',
      pending: 'None - all depot gateways in sync with Central Hub cloud server.',
      tomorrowPlan: 'Execute SOP checklist on incoming 5kW BLDC hub motor batch.',
      hours: '8h 10m',
      status: 'APPROVED',
      reviewedBy: 'Rajesh Varma (COO)',
      verifiedAt: 'Yesterday, 06:45 PM'
    },
    {
      id: 'REP-0808',
      date: 'Friday (Aug 08)',
      completed: 'Conducted battery health checks on Ather 450X fleet.',
      blockers: 'Slow WiFi at Depot 2 (Reported to IT Desk #TKT-8842)',
      pending: 'Diagnostic log parsing for Charger Station 4B.',
      tomorrowPlan: 'Coordinate with CTO team for firmware upgrade.',
      hours: '8h 10m',
      status: 'APPROVED',
      reviewedBy: 'Vikram Roy (CTO)',
      verifiedAt: 'Friday, 07:10 PM'
    },
  ]);

  // Helpdesk State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('IT & Access Permissions');
  const [ticketPriority, setTicketPriority] = useState('NORMAL');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [selectedTicketDetail, setSelectedTicketDetail] = useState<any | null>(null);
  const [submittedTickets, setSubmittedTickets] = useState([
    { id: 'TKT-8842', subject: 'Request Dual Monitor Setup for CAD & Telemetry Workspace', description: 'Requesting an additional 27-inch 4K monitor for depot fleet dispatch telemetry analysis and monitoring vehicle status.', category: 'Hardware & Equipment', status: 'IN_REVIEW', priority: 'NORMAL', date: 'Today, 10:15 AM' },
    { id: 'TKT-7910', subject: 'VPN Certificate Renewal for Field Fleet Telemetry', description: 'Annual SSL VPN security client credentials need to be re-keyed for depot telemetry gateway access.', category: 'IT & Access Permissions', status: 'RESOLVED', priority: 'HIGH', date: 'Yesterday, 04:30 PM' },
    { id: 'TKT-6520', subject: 'Reimbursement Query for Tool Calibration Kit', description: 'Claim submission for torque wrench calibration kit purchased for battery terminal servicing.', category: 'HR & Payroll Queries', status: 'RESOLVED', priority: 'LOW', date: 'Aug 04, 2026' },
  ]);

  // Announcements State
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'InnoVibe Fleet Expansion - 400 New EVs Inducted',
      category: 'EXECUTIVE',
      time: '2 hours ago',
      author: 'Rajesh Varma (COO)',
      priority: 'HIGH',
      isUnread: true,
      summary: 'The COO suite has approved the deployment of 400 Ather 450X Apex commercial delivery vehicles across Bengaluru depots.',
      fullText: 'We are thrilled to announce the official rollout of 400 brand-new Ather 450X Apex electric delivery vehicles across Bengaluru Central and Whitefield hubs. All operations staff are requested to review the updated charging schedule and pre-departure inspection checklist.'
    },
    {
      id: 2,
      title: 'Independence Day Holiday Schedule (August 15)',
      category: 'HR BULLETIN',
      time: 'Yesterday',
      author: 'Pooja Reddy (Head of HR)',
      priority: 'NORMAL',
      isUnread: false,
      summary: 'All offices and tech facilities will observe national holiday hours on August 15th. Emergency RSA dispatch teams will follow assigned rotations.',
      fullText: 'All company corporate offices and technical facilities will remain closed on Friday, August 15, 2026, in observance of Independence Day. Dedicated emergency roadside assistance (RSA) personnel on roster duty will receive compensatory time-off.'
    },
    {
      id: 3,
      title: 'Q3 Operations Excellence Awards Announced',
      category: 'COMPANY UPDATE',
      time: '3 days ago',
      author: 'Sri Hari Kolusu (CEO)',
      priority: 'NORMAL',
      isUnread: false,
      summary: 'Nominations are now open for Q3 Star Performer in EV Fleet Reliability & Dispatch Speed.',
      fullText: 'The executive committee invites department leads to nominate outstanding team members for the Q3 Operations Excellence Award. Winners will be recognized during the upcoming all-hands townhall.'
    },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Task Assigned', category: 'Tasks', time: '15 mins ago', read: false, desc: 'Review SOP Checklist for 5kW BLDC Hub Motor Assembly assigned by Rajesh Varma.' },
    { id: 2, title: 'Leave Approved', category: 'Leave', time: '2 hours ago', read: false, desc: 'Your Casual Leave request for Aug 22 has been approved by HR.' },
    { id: 3, title: 'Shift Clock-In Verified', category: 'Attendance', time: '5 hours ago', read: true, desc: 'Biometric on-time clock-in logged at 09:15 AM.' },
    { id: 4, title: 'Helpdesk Ticket Updated', category: 'Helpdesk', time: 'Yesterday', read: true, desc: 'Ticket #TKT-8842 has been assigned to Hardware Support Engineer.' },
    { id: 5, title: 'Executive Notice Published', category: 'Announcements', time: 'Yesterday', read: true, desc: 'New fleet expansion protocol is now live on the notice board.' },
  ]);

  // Assigned Task Handlers (Review -> Accept -> Execute -> Submit Proof -> Complete)
  const handleAcceptTask = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'IN_PROGRESS' as const,
          completed: false,
          acceptedAt: `Today, ${(() => { const u=new Date(); const i=new Date(u.getTime()+u.getTimezoneOffset()*60000+5.5*3600000); const h=i.getHours()%12||12; const m=i.getMinutes().toString().padStart(2,'0'); const ap=i.getHours()>=12?'PM':'AM'; return `${h}:${m} ${ap} IST`; })()}`,
        };
      }
      return t;
    });
    setTasks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`icc_employee_tasks_${currentProfile?.email || 'default'}`, JSON.stringify(updated));
    }
    if (selectedTaskForReview?.id === taskId) {
      setSelectedTaskForReview((prev: any) => ({
        ...prev,
        status: 'IN_PROGRESS',
        acceptedAt: `Today, ${(() => { const u=new Date(); const i=new Date(u.getTime()+u.getTimezoneOffset()*60000+5.5*3600000); const h=i.getHours()%12||12; const m=i.getMinutes().toString().padStart(2,'0'); const ap=i.getHours()>=12?'PM':'AM'; return `${h}:${m} ${ap} IST`; })()}`,
      }));
    }
    setTaskActionToast('Task accepted! Moved to your In Progress operational queue.');
    setTimeout(() => setTaskActionToast(''), 3500);
  };

  const handleOpenProofModal = (task: any) => {
    setSelectedTaskForProof(task);
    setProofDescription('');
    setProofHoursSpent('2.0 hrs');
    setProofUploadedFiles([]);
  };

  const handleProofFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((f) => ({
        name: f.name,
        size: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(f.size / 1024)} KB`,
        type: f.name.endsWith('.pdf') ? 'PDF' : f.name.endsWith('.xlsx') ? 'Spreadsheet' : 'Document',
      }));
      setProofUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleSubmitTaskProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForProof) return;
    if (!proofDescription.trim()) return;

    const proofData = {
      submittedAt: `Today, ${(() => { const u=new Date(); const i=new Date(u.getTime()+u.getTimezoneOffset()*60000+5.5*3600000); const h=i.getHours()%12||12; const m=i.getMinutes().toString().padStart(2,'0'); const ap=i.getHours()>=12?'PM':'AM'; return `${h}:${m} ${ap} IST`; })()}`,
      description: proofDescription.trim(),
      uploadedDocuments: proofUploadedFiles.length > 0 ? proofUploadedFiles : [{ name: 'task_completion_report.pdf', size: '1.4 MB', type: 'PDF' }],
      hoursSpent: proofHoursSpent,
    };

    const updated = tasks.map((t) => {
      if (t.id === selectedTaskForProof.id) {
        return {
          ...t,
          status: 'COMPLETED' as const,
          completed: true,
          completionProof: proofData,
        };
      }
      return t;
    });

    setTasks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`icc_employee_tasks_${currentProfile?.email || 'default'}`, JSON.stringify(updated));
    }

    if (selectedTaskForReview?.id === selectedTaskForProof.id) {
      setSelectedTaskForReview((prev: any) => ({
        ...prev,
        status: 'COMPLETED',
        completed: true,
        completionProof: proofData,
      }));
    }

    setSelectedTaskForProof(null);
    setTaskActionToast('Completion proof submitted! Task verified and marked as complete.');
    setTimeout(() => setTaskActionToast(''), 3500);
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    const newLeave = {
      id: `LEV-2026-${Math.floor(100 + Math.random() * 899)}`,
      title: `${leaveType} (${leaveReason.slice(0, 24)}...)`,
      category: leaveType.toUpperCase().includes('CASUAL') ? 'CASUAL' : leaveType.toUpperCase().includes('SICK') ? 'SICK' : 'EARNED',
      dates: `${leaveStartDate} to ${leaveEndDate} • ${leaveDurationType === 'HALF_DAY' ? '0.5 Day' : '1.0 Day'}`,
      fullDateRange: `${leaveStartDate} to ${leaveEndDate}`,
      duration: leaveDurationType === 'HALF_DAY' ? 'Half Day' : 'Full Day',
      reason: leaveReason.trim(),
      status: 'PENDING_REVIEW',
      appliedOn: 'Today',
      approvedBy: {
        name: 'Pooja Reddy',
        role: 'Head of HR (People Ops)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        approvedAt: 'Pending Operations Authorization',
        comment: 'Application routed to Head of HR and Operations Desk for review.'
      },
      attachedDoc: { name: 'Leave_Application_Form.pdf', size: '280 KB', type: 'PDF' },
      timeline: [
        { label: 'Application Submitted by You', time: 'Just Now', done: true },
        { label: 'Dispatched to Head of HR', time: 'In Queue', done: false },
        { label: 'Roster Schedule Update', time: 'Pending', done: false }
      ]
    };

    setRecentLeaveRequestsList((prev) => [newLeave, ...prev]);
    setLeaveSuccessMsg(true);
    setTimeout(() => {
      setLeaveSuccessMsg(false);
      setIsLeaveModalOpen(false);
      setLeaveReason('');
    }, 2000);
  };

  const handleSubmitLogoutReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoutWorkDone.trim()) return;
    const newReport = {
      id: `REP-08${Math.floor(10 + Math.random() * 89)}`,
      date: 'Today (Aug 10)',
      completed: logoutWorkDone.trim(),
      blockers: logoutBlockers.trim() || 'None',
      pending: logoutPending.trim() || 'None',
      tomorrowPlan: logoutTomorrowPlan.trim() || 'Follow operations queue',
      hours: workingDuration,
      status: 'SUBMITTED',
      reviewedBy: 'Rajesh Varma (COO)',
      verifiedAt: 'Just Now',
    };
    setLogoutReportsList((prev) => [newReport, ...prev]);
    setLogoutReportSuccess(true);
    // Auto clock-out the employee after EOD report is submitted
    setIsClockedIn(false);
    setTimeout(() => {
      setLogoutReportSuccess(false);
      setIsLogoutReportModalOpen(false);
      setLogoutWorkDone('');
      setLogoutBlockers('');
      setLogoutPending('');
      setLogoutTomorrowPlan('');
    }, 2000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    const newTkt = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject.trim(),
      description: ticketMsg.trim() || 'No additional details provided.',
      category: ticketCategory,
      status: 'OPEN',
      priority: ticketPriority as TicketPriority,
      date: 'Just now',
    };
    const updated = [newTkt, ...submittedTickets];
    setSubmittedTickets(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`icc_employee_tickets_${currentProfile?.email || 'default'}`, JSON.stringify(updated));
    }

    // Broadcast Cross-Role Notification to Admin, COO, CTO, and Category desk with Priority Color
    createCrossRoleTicketNotification({
      ticketId: newTkt.id,
      subject: newTkt.subject,
      description: newTkt.description,
      category: newTkt.category,
      priority: newTkt.priority as TicketPriority,
      submittedBy: profileData.fullName || currentProfile?.name || 'Sneha Patel',
      department: profileData.department || 'EV Fleet Operations & Logistics',
    });

    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketMsg('');
      setTicketSuccess(false);
      setIsTicketModalOpen(false);
    }, 2000);
  };

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (taskFilter === 'ASSIGNED') return t.status === 'ASSIGNED';
      if (taskFilter === 'IN_PROGRESS') return t.status === 'IN_PROGRESS';
      if (taskFilter === 'COMPLETED') return t.status === 'COMPLETED';
      if (taskFilter === 'HIGH') return t.priority === 'HIGH' || t.priority === 'URGENT';
      if (taskFilter === 'OVERDUE') return t.isOverdue && t.status !== 'COMPLETED';
      return true;
    });
  }, [tasks, taskFilter]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const taskProgressPercent = Math.round((completedCount / tasks.length) * 100) || 0;
  const productivityScore = 94; // Dynamic Score calculation

  return (
    <div className="space-y-6 text-[#0F172A] max-w-[1400px] mx-auto pb-12 font-sans">
      {/* ========================================================================= */}
      {/* VIEW 1: MY DASHBOARD (EXACT TARGET REFERENCE LAYOUT) */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* TOP HEADER */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView('notifications')}
                className="relative p-2 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
                  2
                </span>
              </button>

              <button
                type="button"
                onClick={() => setView('profile')}
                className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center border border-blue-200 hover:opacity-90 transition cursor-pointer shadow-2xs"
                title="View Profile"
              >
                {(profileData.fullName || currentProfile?.name || 'Sri Varun Tej Chavitina').charAt(0)}
              </button>
            </div>
          </div>

          {/* GREETING SECTION */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-2">
              <span>
                {(() => {
                  const hr = new Date().getHours();
                  return hr < 12 ? 'Good Morning' : hr < 17 ? 'Good Afternoon' : 'Good Evening';
                })()}, {(profileData.fullName || currentProfile?.name || 'Sri Varun Tej Chavitina').split(' ')[0]}
              </span>
              <span>👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Here's your productivity snapshot today.
            </p>
          </div>

          {/* MAIN DASHBOARD CONTAINER: LEFT CONTENT + RIGHT SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ================= LEFT MAIN SECTION (8 COLS) ================= */}
            <div className="lg:col-span-8 space-y-6">

              {/* LARGE EMPLOYEE SUMMARY CARD */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-stretch justify-between gap-6">
                
                {/* Left Side Info */}
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#6D35F5] uppercase tracking-[0.2em]">WELCOME BACK!</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#101A36] tracking-tight mt-0.5">
                      {profileData.fullName || currentProfile?.name || 'Sri Varun Tej Chavitina'}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profileData.professionalDesignation || 'Information Technology Intern'}</span>
                    </p>
                  </div>

                  {/* Bottom Left Pills */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    {/* Shift Pill */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">TODAY'S SHIFT</span>
                        <span className="text-[11px] font-bold text-slate-800 leading-tight mt-0.5">09:30 AM - 06:30 PM</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-600">
                      <span className="relative flex h-2.5 w-2.5">
                        {isClockedIn && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isClockedIn ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">CURRENT STATUS</span>
                        <span className="text-[11px] font-bold text-slate-800 leading-tight mt-0.5">{isClockedIn ? 'Active' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Productivity Score Ring */}
                <div className="flex flex-col items-center justify-center px-4 py-2 border-y md:border-y-0 md:border-x border-slate-100 shrink-0">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform overflow-visible">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="8"
                        strokeDasharray="251"
                        strokeDashoffset="98"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-[#101A36] leading-none">61</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">SCORE</span>
                    </div>
                  </div>

                  <div className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-extrabold">
                    <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                    <span>GOOD</span>
                  </div>
                </div>

                {/* Right Side Quick Actions */}
                <div className="space-y-2.5 flex flex-col justify-center shrink-0 min-w-[200px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">QUICK ACTIONS</span>
                  
                  {/* Button 1: Check Out / Check In */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isClockedIn) {
                        setIsLogoutReportModalOpen(true);
                      } else {
                        setIsClockedIn(true);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-between transition cursor-pointer"
                  >
                    <span>{isClockedIn ? 'Check Out Shift' : 'Check In Shift'}</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Button 2: Submit Logout Report */}
                  <button
                    type="button"
                    onClick={() => setIsLogoutReportModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-between transition cursor-pointer"
                  >
                    <span>Submit Logout Report</span>
                    <FileText className="w-4 h-4" />
                  </button>

                  {/* Button 3: Apply for Leave */}
                  <button
                    type="button"
                    onClick={() => setIsLeaveModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center justify-between transition cursor-pointer"
                  >
                    <span>Apply for Leave</span>
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* ROW 1: ATTENDANCE OVERVIEW | PRODUCTIVITY INSIGHTS | TODAY'S TASKS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* CARD 1: ATTENDANCE OVERVIEW */}
                <div
                  onClick={() => setView('attendance')}
                  className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 hover:shadow-md hover:border-blue-200 transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Attendance Overview</h3>
                    
                    <div className="space-y-3 pt-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>First Login</span>
                        </div>
                        <span className="font-bold text-slate-900 font-mono">10:39 PM</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span>Last Logout</span>
                        </div>
                        <span className="font-bold text-slate-400 font-mono">—</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          <span>Working Hours</span>
                        </div>
                        <span className="font-bold text-slate-900 font-mono">0h 0m</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Status</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200/80">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 2: PRODUCTIVITY INSIGHTS */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Productivity Insights</h3>
                      <span className="text-[10px] text-slate-400 font-medium">This Week</span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PROD SCORE</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-black text-[#101A36]">61</span>
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                          ▲ 12% <span className="text-slate-400 font-normal ml-1">vs last week</span>
                        </span>
                      </div>
                    </div>

                    {/* Smooth Blue Spline Area Chart */}
                    <div className="relative h-14 w-full my-2">
                      <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="prodTrendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0,45 C 40,45 50,35 90,38 C 130,41 140,15 200,15 L 200,60 L 0,60 Z" fill="url(#prodTrendGrad)" />
                        <path d="M 0,45 C 40,45 50,35 90,38 C 130,41 140,15 200,15" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="200" cy="15" r="3.5" fill="#2563EB" className="animate-pulse" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-2 bg-emerald-50/80 rounded-xl border border-emerald-100 text-[10px] font-bold text-emerald-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Performing better than 76% of peers</span>
                  </div>
                </div>

                {/* CARD 3: TODAY'S TASKS */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Today's Tasks</h3>
                      <button
                        type="button"
                        onClick={() => setView('tasks')}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        View all
                      </button>
                    </div>

                    <div className="flex items-center gap-4 pt-3">
                      {/* Circular Gauge */}
                      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="10"
                            strokeDasharray="251"
                            strokeDashoffset="12"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-xs font-black text-[#101A36]">95%</span>
                      </div>

                      {/* Dots Legend */}
                      <div className="space-y-1 text-[11px] font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Done: <strong className="text-slate-900">20</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span>Active: <strong className="text-slate-900">0</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span>Pending: <strong className="text-slate-900">1</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    <span>TOTAL ASSIGNED TASKS</span>
                    <span className="text-xs text-slate-900 font-black">21</span>
                  </div>
                </div>

              </div>

              {/* ROW 2: LEAVE BALANCE | ANNOUNCEMENTS | RECENT ACTIVITY */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* CARD 1: LEAVE BALANCE */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Leave Balance</h3>
                      <button
                        type="button"
                        onClick={() => setView('leave')}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        View all
                      </button>
                    </div>

                    <div className="space-y-3 pt-3 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-700 font-medium mb-1">
                          <span>Casual Leave</span>
                          <span className="text-slate-400 font-semibold">0 days taken</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full w-0"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-700 font-medium mb-1">
                          <span>Sick Leave</span>
                          <span className="text-slate-400 font-semibold">0 days taken</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-0"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-700 font-medium mb-1">
                          <span>Other Leaves</span>
                          <span className="text-slate-400 font-semibold">0 days taken</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full w-0"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 2: ANNOUNCEMENTS */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Announcements</h3>
                      <button
                        type="button"
                        onClick={() => setView('announcements')}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        View all
                      </button>
                    </div>

                    <div className="space-y-2.5 pt-2 max-h-[160px] overflow-y-auto pr-1">
                      {announcements.map((anc) => (
                        <div
                          key={anc.id}
                          onClick={() => setSelectedAnnouncement(anc)}
                          className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition cursor-pointer flex items-start gap-2.5"
                        >
                          <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Zap className="w-3.5 h-3.5 fill-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-[11px] font-bold text-slate-900 truncate leading-snug">{anc.title}</h4>
                            <p className="text-[9px] text-slate-400 font-medium mt-0.5">{anc.author.split('(')[0].trim()} • {anc.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CARD 3: RECENT ACTIVITY */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Activity</h3>
                      <span className="text-[10px] text-slate-400 font-medium">Today</span>
                    </div>

                    <div className="space-y-3 pt-2 max-h-[160px] overflow-y-auto pr-1 text-xs">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-3 h-3 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-snug">Logged in at 10:39 PM</p>
                          <p className="text-[9px] text-slate-400 font-medium mt-0.5">10:39 PM</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-3 h-3 text-sky-500" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-snug">Forced logout due to browser close.</p>
                          <p className="text-[9px] text-slate-400 font-medium mt-0.5">11:06 AM</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-3 h-3 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-snug">Logged in at 10:03 AM</p>
                          <p className="text-[9px] text-slate-400 font-medium mt-0.5">10:03 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ================= RIGHT SIDEBAR / SECONDARY COLUMN (4 COLS) ================= */}
            <div className="lg:col-span-4 space-y-6">

              {/* WIDGET 1: TODAY'S SCHEDULE */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Today's Schedule</h3>
                  <button
                    type="button"
                    onClick={() => setView('tasks')}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                </div>

                {/* Weekly Date Selector */}
                <div className="grid grid-cols-7 gap-1 text-center py-2 border-y border-slate-100">
                  {[
                    { day: 'S', date: 9 },
                    { day: 'M', date: 10 },
                    { day: 'T', date: 11 },
                    { day: 'W', date: 12 },
                    { day: 'T', date: 13 },
                    { day: 'F', date: 14 },
                    { day: 'S', date: 15 },
                  ].map((w) => {
                    const isSelected = w.date === 13;
                    return (
                      <button
                        key={w.date}
                        type="button"
                        className="flex flex-col items-center py-1 cursor-pointer"
                      >
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{w.day}</span>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold mt-1 transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}>
                          {w.date}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Scheduled Tasks List */}
                <div className="space-y-2.5 pt-1">
                  <div
                    onClick={() => setView('tasks')}
                    className="p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">work on Fleet dashboard</h4>
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">TASK DUE</span>
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80 shrink-0">
                      24 Jun
                    </span>
                  </div>

                  <div
                    onClick={() => setView('tasks')}
                    className="p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">tms and hrms training</h4>
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">TASK DUE</span>
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80 shrink-0">
                      17 Jun
                    </span>
                  </div>
                </div>
              </div>

              {/* WIDGET 2: QUICK SHORTCUTS */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quick Shortcuts</h3>

                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {/* Row 1, Col 1: Check In */}
                  <button
                    type="button"
                    onClick={() => setIsClockedIn(true)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200/80 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Check In</span>
                  </button>

                  {/* Row 1, Col 2: Check Out */}
                  <button
                    type="button"
                    onClick={() => setIsLogoutReportModalOpen(true)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 border border-slate-200/80 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Check Out</span>
                  </button>

                  {/* Row 1, Col 3: Logout Report */}
                  <button
                    type="button"
                    onClick={() => setIsLogoutReportModalOpen(true)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200/80 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Logout Report</span>
                  </button>

                  {/* Row 2, Col 1: Request Leave */}
                  <button
                    type="button"
                    onClick={() => setIsLeaveModalOpen(true)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200/80 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <CalendarRange className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Request Leave</span>
                  </button>

                  {/* Row 2, Col 2: View Tasks */}
                  <button
                    type="button"
                    onClick={() => setView('tasks')}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200/80 transition flex flex-col items-center justify-center text-center group cursor-pointer col-span-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">View Tasks</span>
                  </button>
                </div>
              </div>

              {/* WIDGET 3: TODAY'S BIRTHDAY */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎂</span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Today's Birthday</h3>
                </div>

                <div className="p-4 text-center">
                  <p className="text-xs text-slate-400 font-medium italic">No birthdays today.</p>
                </div>
              </div>

              {/* WIDGET 4: PRODUCTIVITY STREAK / PERFORMANCE CARD */}
              <div className="bg-gradient-to-br from-blue-50/80 via-sky-50/50 to-indigo-50/60 p-5 sm:p-6 rounded-3xl border border-blue-100 shadow-xs space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <h4 className="text-xs font-black text-slate-900">Keep up the great work!</h4>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  You're on a 5-day productivity streak.
                </p>

                <button
                  type="button"
                  onClick={() => setView('reports')}
                  className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer text-center"
                >
                  View Performance
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Sub-view Breadcrumb Header when NOT on Dashboard */}
      {activeTab !== 'dashboard' && (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('dashboard')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">
              {activeTab.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1 rounded-xl border border-[#E2E8F0] text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-mono font-bold text-[#0F172A]">{workingDuration}</span>
            </div>
            <button
              onClick={() => setIsLogoutReportModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
            >
              Logout Report
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: TASKS MODULE (NATIVE TMS TASK HUB) */}
      {/* ========================================================================= */}
      {activeTab === 'tasks' && (
        <TmsTasksView />
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: ATTENDANCE & ROSTER */}
      {/* ========================================================================= */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A]">Attendance & Working Hours Log</h2>
              <p className="text-xs text-[#475569] mt-0.5">Biometric shift punch records and monthly roster history</p>
            </div>
            <button className="px-4 py-2 bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] border border-[#E2E8F0] rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Export Timesheet (.PDF)</span>
            </button>
          </div>

          {/* Top Metric Cards (Interactive) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveAttendanceMetricCard(activeAttendanceMetricCard === 'PRESENT' ? null : 'PRESENT')}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md ${
                activeAttendanceMetricCard === 'PRESENT'
                  ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-200'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Monthly Present</span>
                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Calendar className="w-3.5 h-3.5" /></span>
              </div>
              <p className="text-2xl font-black text-[#0F172A] mt-1.5">22 / 22 Days</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[11px] text-emerald-600 font-bold">100% Attendance Rate</span>
                <span className="text-[10px] text-slate-400 font-bold">{activeAttendanceMetricCard === 'PRESENT' ? '▲ Less' : '▼ More'}</span>
              </div>
            </div>

            <div
              onClick={() => setActiveAttendanceMetricCard(activeAttendanceMetricCard === 'ON_TIME' ? null : 'ON_TIME')}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md ${
                activeAttendanceMetricCard === 'ON_TIME'
                  ? 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-200'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">On-Time Ratio</span>
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp className="w-3.5 h-3.5" /></span>
              </div>
              <p className="text-2xl font-black text-emerald-600 mt-1.5">100%</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[11px] text-slate-500 font-medium">0 Late Logins</span>
                <span className="text-[10px] text-slate-400 font-bold">{activeAttendanceMetricCard === 'ON_TIME' ? '▲ Less' : '▼ More'}</span>
              </div>
            </div>

            <div
              onClick={() => setActiveAttendanceMetricCard(activeAttendanceMetricCard === 'AVG_SHIFT' ? null : 'AVG_SHIFT')}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md ${
                activeAttendanceMetricCard === 'AVG_SHIFT'
                  ? 'bg-indigo-50/50 border-indigo-300 ring-2 ring-indigo-200'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Average Shift</span>
                <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Clock className="w-3.5 h-3.5" /></span>
              </div>
              <p className="text-2xl font-black text-[#0F172A] mt-1.5">8h 12m</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[11px] text-slate-500 font-medium">Standard 8.0 hr Baseline</span>
                <span className="text-[10px] text-slate-400 font-bold">{activeAttendanceMetricCard === 'AVG_SHIFT' ? '▲ Less' : '▼ More'}</span>
              </div>
            </div>

            <div
              onClick={() => setActiveAttendanceMetricCard(activeAttendanceMetricCard === 'CURRENT_SHIFT' ? null : 'CURRENT_SHIFT')}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md ${
                activeAttendanceMetricCard === 'CURRENT_SHIFT'
                  ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-200'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Current Shift</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-2xl font-black text-blue-600 mt-1.5">{workingDuration}</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[11px] text-emerald-600 font-bold">Active Biometric Punch</span>
                <span className="text-[10px] text-slate-400 font-bold">{activeAttendanceMetricCard === 'CURRENT_SHIFT' ? '▲ Less' : '▼ More'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Metric Breakdown Drawer */}
          {activeAttendanceMetricCard && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    {activeAttendanceMetricCard === 'PRESENT' && 'Monthly Attendance Performance Audit'}
                    {activeAttendanceMetricCard === 'ON_TIME' && 'Punctuality SLA & Grace Period Statistics'}
                    {activeAttendanceMetricCard === 'AVG_SHIFT' && 'Shift Working Hours Distribution & Overtime'}
                    {activeAttendanceMetricCard === 'CURRENT_SHIFT' && 'Live Biometric Session Telemetry'}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAttendanceMetricCard(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                {activeAttendanceMetricCard === 'PRESENT' && (
                  <>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Total Work Days</p><p className="font-bold text-slate-900 text-sm">22 Scheduled</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Attended Days</p><p className="font-bold text-emerald-600 text-sm">22 Verified (100%)</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Unexcused Absences</p><p className="font-bold text-slate-900 text-sm">0 Days</p></div>
                  </>
                )}
                {activeAttendanceMetricCard === 'ON_TIME' && (
                  <>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Early Logins (&lt; 09:00 AM)</p><p className="font-bold text-blue-600 text-sm">2 Days (08:58 AM)</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Standard On-Time</p><p className="font-bold text-emerald-600 text-sm">20 Days (09:00 - 09:15 AM)</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Cutoff Violations (&gt; 09:30 AM)</p><p className="font-bold text-slate-900 text-sm">0 Violations (Clean)</p></div>
                  </>
                )}
                {activeAttendanceMetricCard === 'AVG_SHIFT' && (
                  <>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Daily Average Shift</p><p className="font-bold text-slate-900 text-sm">8h 12m Net</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Weekly Total Net Hours</p><p className="font-bold text-indigo-600 text-sm">41h 00m Logged</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Net Overtime Banked</p><p className="font-bold text-emerald-600 text-sm">+1h 00m Approved</p></div>
                  </>
                )}
                {activeAttendanceMetricCard === 'CURRENT_SHIFT' && (
                  <>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">First Login Today</p><p className="font-bold text-emerald-600 text-sm">09:15 AM Verified</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Biometric Gate ID</p><p className="font-bold text-slate-900 text-sm">BIO-BLR-04 Central</p></div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200"><p className="text-slate-500 text-[10px]">Live Session Duration</p><p className="font-mono font-bold text-blue-600 text-sm">{workingDuration}</p></div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Dedicated Biometric Arrival (Punch-In) & Departure (Punch-Out) Separate Graphs */}
          <div className="space-y-6">
            {/* Top Control Bar: Range Filters */}
            <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">Biometric Shift Punctuality & Departure Analytics</h3>
                <p className="text-xs text-[#475569]">Click on graph points or legend toggles to inspect biometric records</p>
              </div>

              {/* Range Filter Pills */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs self-start sm:self-auto">
                {(
                  [
                    { id: '1W', label: '1 Week' },
                    { id: '1M', label: '1 Month' },
                    { id: '6M', label: '6 Months' },
                    { id: 'CUSTOM', label: 'Custom Range' },
                  ] as const
                ).map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setAttendanceTimeRange(range.id)}
                    className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                      attendanceTimeRange === range.id
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date Range Picker Bar (visible when CUSTOM is active) */}
            {attendanceTimeRange === 'CUSTOM' && (
              <div className="p-4 bg-white rounded-2xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-1 duration-150 shadow-2xs">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-700">From:</span>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                  <span className="text-slate-400">→</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-700">To:</span>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Quick Range:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomStartDate('2026-07-27');
                      setCustomEndDate('2026-08-10');
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Last 14 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomStartDate('2026-07-10');
                      setCustomEndDate('2026-08-10');
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Last 30 Days
                  </button>
                </div>
              </div>
            )}

            {/* Separate 2-Column Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* GRAPH 1: Morning Biometric Arrival & Punch-In Graph */}
              <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-4 hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-[#0F172A]">Morning Punch-In (Arrival Punctuality)</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition">
                        100% On-Time
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#475569]">Click any node or toggle references to inspect morning check-in telemetry</p>
                </div>

                {/* Interactive Legend Badges */}
                <div className="flex items-center flex-wrap gap-2 text-xs min-h-[32px]">
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-emerald-800 text-[11px]">Punch-In (08:55 - 09:15 AM)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLoginTarget(!showLoginTarget)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer text-[11px] font-bold shadow-2xs select-none ${
                      showLoginTarget ? 'bg-white border-slate-300 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <span className="w-3 h-0.5 bg-slate-400"></span>
                    <span>09:00 AM Start {showLoginTarget ? '✓' : 'off'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLoginCutoff(!showLoginCutoff)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer text-[11px] font-bold shadow-2xs select-none ${
                      showLoginCutoff ? 'bg-white border-rose-200 text-rose-700' : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <span className="w-3 h-0.5 bg-rose-500"></span>
                    <span>09:30 AM Cutoff {showLoginCutoff ? '✓' : 'off'}</span>
                  </button>
                </div>

                {/* Recharts Punch-In Chart */}
                <div className="w-full pt-1" style={{ width: '100%', height: 280, minHeight: 280 }}>
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={attendanceChartData}
                        margin={{ top: 22, right: 28, left: 10, bottom: 12 }}
                        onClick={(e: any) => {
                          if (e && e.activePayload && e.activePayload.length) {
                            setSelectedAttendanceDay(e.activePayload[0].payload);
                          }
                        }}
                      >
                        <defs>
                          <linearGradient id="loginOnlyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.32} />
                            <stop offset="60%" stopColor="#10B981" stopOpacity={0.08} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />

                        <XAxis
                          dataKey="date"
                          interval={0}
                          padding={{ left: 16, right: 16 }}
                          tickLine={false}
                          axisLine={{ stroke: '#CBD5E1' }}
                          tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                          dy={8}
                        />

                        <YAxis
                          width={72}
                          domain={[-20, 38]}
                          ticks={[-15, 0, 15, 30]}
                          tickLine={false}
                          axisLine={{ stroke: '#CBD5E1' }}
                          tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                          dx={-4}
                          tickFormatter={(val: number) => {
                            if (val === -15) return '08:45 AM';
                            if (val === 0) return '09:00 AM';
                            if (val === 15) return '09:15 AM';
                            if (val === 30) return '09:30 AM';
                            return '';
                          }}
                        />

                        <RechartsTooltip
                          content={({ active, payload }: any) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload;
                              return (
                                <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[185px] animate-in fade-in zoom-in-95 duration-100">
                                  <div className="flex items-center justify-between pb-1 border-b border-slate-700/80">
                                    <span className="font-extrabold text-slate-200">{d.fullDate || d.date}</span>
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                      {d.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between pt-0.5">
                                    <span className="text-slate-400">Punch-In (Arrival):</span>
                                    <span className="font-mono font-bold text-emerald-400">{d.loginTime}</span>
                                  </div>
                                  <div className="text-[10px] text-emerald-400/90 font-medium pt-0.5 flex items-center gap-1">
                                    <span>✓ Click to inspect shift details</span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />

                        {showLoginCutoff && (
                          <ReferenceLine
                            y={30}
                            stroke="#F43F5E"
                            strokeDasharray="4 4"
                            strokeWidth={1.5}
                            label={{
                              value: '09:30 AM Cutoff',
                              position: 'insideTopRight',
                              fill: '#E11D48',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          />
                        )}

                        {showLoginTarget && (
                          <ReferenceLine
                            y={0}
                            stroke="#94A3B8"
                            strokeDasharray="3 3"
                            strokeWidth={1.2}
                            label={{
                              value: '09:00 AM Start Target',
                              position: 'insideBottomRight',
                              fill: '#64748B',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          />
                        )}

                        <Area
                          type="monotone"
                          dataKey="loginMinutes"
                          stroke="#10B981"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#loginOnlyGrad)"
                          dot={{ r: 4.5, fill: '#FFFFFF', stroke: '#10B981', strokeWidth: 2.5 }}
                          activeDot={{ r: 7, fill: '#10B981', stroke: '#FFFFFF', strokeWidth: 3 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">
                      Loading punch-in chart...
                    </div>
                  )}
                </div>
              </div>

              {/* GRAPH 2: Evening Biometric Departure & Punch-Out (Logout) Graph */}
              <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-4 hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-[#0F172A]">Evening Punch-Out (Departure & Logout)</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition">
                        Avg 8h 12m Net
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#475569]">Click any node or toggle references to inspect shift logout telemetry</p>
                </div>

                {/* Interactive Legend Badges */}
                <div className="flex items-center flex-wrap gap-2 text-xs min-h-[32px]">
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <span className="font-bold text-indigo-800 text-[11px]">Punch-Out (06:00 - 06:22 PM)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLogoutEnd(!showLogoutEnd)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer text-[11px] font-bold shadow-2xs select-none ${
                      showLogoutEnd ? 'bg-white border-slate-300 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <span className="w-3 h-0.5 bg-slate-400"></span>
                    <span>06:00 PM End {showLogoutEnd ? '✓' : 'off'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogoutOvertime(!showLogoutOvertime)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer text-[11px] font-bold shadow-2xs select-none ${
                      showLogoutOvertime ? 'bg-white border-indigo-200 text-indigo-700' : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <span className="w-3 h-0.5 bg-indigo-400"></span>
                    <span>06:30 PM (+30m) {showLogoutOvertime ? '✓' : 'off'}</span>
                  </button>
                </div>

                {/* Recharts Punch-Out Chart */}
                <div className="w-full pt-1" style={{ width: '100%', height: 280, minHeight: 280 }}>
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={attendanceChartData}
                        margin={{ top: 22, right: 28, left: 10, bottom: 12 }}
                        onClick={(e: any) => {
                          if (e && e.activePayload && e.activePayload.length) {
                            setSelectedAttendanceDay(e.activePayload[0].payload);
                          }
                        }}
                      >
                        <defs>
                          <linearGradient id="logoutOnlyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.30} />
                            <stop offset="60%" stopColor="#6366F1" stopOpacity={0.08} />
                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />

                        <XAxis
                          dataKey="date"
                          interval={0}
                          padding={{ left: 16, right: 16 }}
                          tickLine={false}
                          axisLine={{ stroke: '#CBD5E1' }}
                          tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                          dy={8}
                        />

                        <YAxis
                          width={72}
                          domain={[-20, 38]}
                          ticks={[-15, 0, 15, 30]}
                          tickLine={false}
                          axisLine={{ stroke: '#CBD5E1' }}
                          tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                          dx={-4}
                          tickFormatter={(val: number) => {
                            if (val === -15) return '05:45 PM';
                            if (val === 0) return '06:00 PM';
                            if (val === 15) return '06:15 PM';
                            if (val === 30) return '06:30 PM';
                            return '';
                          }}
                        />

                        <RechartsTooltip
                          content={({ active, payload }: any) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload;
                              return (
                                <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[195px] animate-in fade-in zoom-in-95 duration-100">
                                  <div className="flex items-center justify-between pb-1 border-b border-slate-700/80">
                                    <span className="font-extrabold text-slate-200">{d.fullDate || d.date}</span>
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                                      {d.departureStatus}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between pt-0.5">
                                    <span className="text-slate-400">Punch-Out (Logout):</span>
                                    <span className="font-mono font-bold text-indigo-300">{d.logoutTime}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Shift Total Net:</span>
                                    <span className="font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">{d.hours}</span>
                                  </div>
                                  <div className="text-[10px] text-indigo-300/90 font-medium pt-0.5 flex items-center gap-1">
                                    <span>✓ Click to inspect shift details</span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />

                        {showLogoutOvertime && (
                          <ReferenceLine
                            y={30}
                            stroke="#6366F1"
                            strokeDasharray="4 4"
                            strokeWidth={1.5}
                            label={{
                              value: '06:30 PM (+30m)',
                              position: 'insideTopRight',
                              fill: '#4F46E5',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          />
                        )}

                        {showLogoutEnd && (
                          <ReferenceLine
                            y={0}
                            stroke="#94A3B8"
                            strokeDasharray="3 3"
                            strokeWidth={1.2}
                            label={{
                              value: '06:00 PM Shift End',
                              position: 'insideBottomRight',
                              fill: '#64748B',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          />
                        )}

                        <Area
                          type="monotone"
                          dataKey="logoutMinutes"
                          stroke="#6366F1"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#logoutOnlyGrad)"
                          dot={{ r: 4.5, fill: '#FFFFFF', stroke: '#6366F1', strokeWidth: 2.5 }}
                          activeDot={{ r: 7, fill: '#6366F1', stroke: '#FFFFFF', strokeWidth: 3 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">
                      Loading punch-out chart...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Selected Day Biometric Shift Inspection Drawer */}
            {selectedAttendanceDay && (
              <div className="p-5 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 rounded-2xl border border-blue-200 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        Biometric Shift Telemetry Inspector: <span className="text-blue-700">{selectedAttendanceDay.fullDate || selectedAttendanceDay.date}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">Biometric terminal ID, IP geofencing, and break duration records</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedAttendanceDay(null)}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-700 text-xs font-bold transition cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">First Login</span>
                    <p className="text-sm font-black text-emerald-600 mt-0.5">{selectedAttendanceDay.loginTime}</p>
                    <span className="text-[10px] text-slate-500">Terminal: BIO-BLR-04</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Last Logout</span>
                    <p className="text-sm font-black text-indigo-600 mt-0.5">{selectedAttendanceDay.logoutTime}</p>
                    <span className="text-[10px] text-slate-500">Geofence: Central Hub IP</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Net Shift Hours</span>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{selectedAttendanceDay.hours}</p>
                    <span className="text-[10px] text-emerald-600 font-bold">100% Target Met</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Punctuality SLA</span>
                    <p className="text-sm font-black text-emerald-700 mt-0.5">Verified On-Time</p>
                    <span className="text-[10px] text-slate-500">0 Grace Violations</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Biometric Log Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] font-bold text-[#94A3B8] uppercase bg-slate-50 border-b border-[#E2E8F0]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">First Login</th>
                  <th className="py-3 px-4">Last Logout</th>
                  <th className="py-3 px-4">Net Hours</th>
                  <th className="py-3 px-4">Shift Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { date: 'Today (Aug 10)', fullDate: 'Today (Aug 10)', loginTime: '09:15 AM', logoutTime: 'Active Shift', hours: workingDuration, shift: 'Regular (09:00 - 18:00)', status: 'ON TIME', isLive: true },
                  { date: 'Yesterday (Aug 09)', fullDate: 'Saturday, Aug 09', loginTime: '09:05 AM', logoutTime: '06:15 PM', hours: '8h 10m', shift: 'Regular', status: 'COMPLETED', isLive: false },
                  { date: 'Friday (Aug 08)', fullDate: 'Friday, Aug 08', loginTime: '09:10 AM', logoutTime: '06:20 PM', hours: '8h 10m', shift: 'Regular', status: 'COMPLETED', isLive: false },
                  { date: 'Thursday (Aug 07)', fullDate: 'Thursday, Aug 07', loginTime: '08:58 AM', logoutTime: '06:05 PM', hours: '8h 07m', shift: 'Regular', status: 'COMPLETED', isLive: false },
                  { date: 'Wednesday (Aug 06)', fullDate: 'Wednesday, Aug 06', loginTime: '09:12 AM', logoutTime: '06:12 PM', hours: '8h 00m', shift: 'Regular', status: 'COMPLETED', isLive: false },
                  { date: 'Tuesday (Aug 05)', fullDate: 'Tuesday, Aug 05', loginTime: '08:58 AM', logoutTime: '06:18 PM', hours: '8h 20m', shift: 'Regular', status: 'COMPLETED', isLive: false },
                  { date: 'Monday (Aug 04)', fullDate: 'Monday, Aug 04', loginTime: '09:02 AM', logoutTime: '06:14 PM', hours: '8h 12m', shift: 'Regular', status: 'COMPLETED', isLive: false },
                ].map((row, rIdx) => {
                  const isSelected = selectedAttendanceDay && (selectedAttendanceDay.date === row.date || selectedAttendanceDay.fullDate === row.fullDate);
                  return (
                    <tr
                      key={rIdx}
                      onClick={() => setSelectedAttendanceDay(row)}
                      className={`transition cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 font-semibold text-blue-900 border-l-4 border-l-blue-600'
                          : 'hover:bg-slate-50/80 text-slate-700'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-[#0F172A]">{row.date}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">{row.loginTime}</td>
                      <td className="py-3.5 px-4">
                        {row.isLive ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            {row.logoutTime}
                          </span>
                        ) : (
                          <span className="font-mono text-slate-600">{row.logoutTime}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{row.hours}</td>
                      <td className="py-3.5 px-4 text-slate-500">{row.shift}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAttendanceDay(row);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 font-bold text-[11px] transition cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-blue-600" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* VIEW 5: LEAVE MANAGEMENT (NATIVE TMS LEAVE MODULE) */}
      {/* ========================================================================= */}
      {activeTab === 'leave' && (
        <TmsEmployeeLeaveView />
      )}

      {/* ========================================================================= */}
      {/* VIEW 6: LOGOUT REPORTS & SESSION HISTORY (NATIVE TMS MODULE) */}
      {/* ========================================================================= */}
      {activeTab === 'logout-reports' && (
        <TmsEmployeeSessionHistoryView />
      )}

      {/* ========================================================================= */}
      {/* VIEW 7: ANNOUNCEMENTS (NATIVE TMS MODULE) */}
      {/* ========================================================================= */}
      {activeTab === 'announcements' && (
        <TmsEmployeeAnnouncementsView />
      )}

      {/* ========================================================================= */}
      {/* VIEW 8: EXPORT REPORTS (NATIVE TMS MODULE) */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <TmsEmployeeReportsView />
      )}

      {/* ========================================================================= */}
      {/* VIEW 8: INTERNAL HELPDESK */}
      {/* ========================================================================= */}
      {activeTab === 'helpdesk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Submission Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A]">Create Internal Helpdesk Request</h2>
              <p className="text-xs text-[#475569]">Submit issues to IT Support, Facilities, or HR Operations</p>
            </div>

            {ticketSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ticket submitted successfully! Assigned reference #TKT-{Math.floor(1000 + Math.random() * 9000)}.</span>
              </div>
            )}

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Subject / Summary</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Request secondary display or VPN access"
                  required
                  className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                  >
                    <option>IT & Access Permissions</option>
                    <option>Hardware & Equipment</option>
                    <option>HR & Payroll Queries</option>
                    <option>Admin & Facilities</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                  >
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={ticketMsg}
                  onChange={(e) => setTicketMsg(e.target.value)}
                  placeholder="Describe your issue or request in detail..."
                  className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>

          {/* Ticket History (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0F172A]">Your Recent Tickets</h3>
              <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                {submittedTickets.length} Total
              </span>
            </div>
            
            <div className="space-y-3">
              {submittedTickets.map((tkt) => (
                <div 
                  key={tkt.id} 
                  onClick={() => setSelectedTicketDetail(tkt)}
                  className="p-4 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition border border-slate-200 rounded-xl space-y-1.5 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#2563EB] text-xs group-hover:underline">{tkt.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tkt.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      tkt.status === 'IN_REVIEW' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {tkt.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] transition">{tkt.subject}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                    <span>{tkt.category}</span>
                    <span>{tkt.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 9: EMPLOYEE REPORTS & PERFORMANCE */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A]">Employee Performance Analytics & Reports</h2>
              <p className="text-xs text-[#475569] mt-0.5">Historical overview of tasks, velocity, and operations SLA metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3.5 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]">
                August 2026
              </button>
              <button 
                onClick={() => alert('Exporting comprehensive Employee Performance Dossier (.PDF)...')}
                className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] interactive-stat-card animate-fade-in-up stagger-1">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Monthly Tasks Completed</span>
              <p className="text-2xl font-black text-[#0F172A] mt-1">84 Tasks</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">98.2% Quality Pass Rate</p>
            </div>
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] interactive-stat-card animate-fade-in-up stagger-2">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Total Hours Worked</span>
              <p className="text-2xl font-black text-[#0F172A] mt-1">178.5 Hours</p>
              <p className="text-xs text-blue-600 font-semibold mt-1">Average 8.1 hrs / Day</p>
            </div>
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] interactive-stat-card animate-fade-in-up stagger-3">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Performance Index</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">4.9 / 5.0</p>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Top 3% Operational Ranking</p>
            </div>
          </div>

          {/* Interactive Bar Chart — Weekly Performance */}
          {(() => {
            const metricAccent: Record<string, { color: string; bg: string; border: string; shadow: string }> = {
              PRODUCTIVITY: { color: '#6366F1', bg: '#EEF2FF', border: '#C7D2FE', shadow: '0 8px 40px rgba(99,102,241,0.13)' },
              QUALITY:      { color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0', shadow: '0 8px 40px rgba(16,185,129,0.13)' },
              ATTENDANCE:   { color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', shadow: '0 8px 40px rgba(245,158,11,0.13)' },
              SLA:          { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', shadow: '0 8px 40px rgba(239,68,68,0.13)' },
            };
            const accent = metricAccent[activeReportMetric] ?? metricAccent['PRODUCTIVITY'];

            const barConfig: Record<string, {
              color: string; gradId: string; metricName: string;
              target: number; targetLabel: string;
              yLabels: string[];
              bars: { label: string; sub: string; value: number; display: string; trend: string; sla: string }[];
            }> = {
              PRODUCTIVITY: {
                color: '#6366F1', gradId: 'barGradPROD', metricName: 'Productivity',
                target: 95, targetLabel: '95% Target',
                yLabels: ['100%', '80%', '60%', '40%', '20%'],
                bars: [
                  { label: 'Week 1', sub: 'Aug 01–07', value: 78,  display: '78%',  trend: '+6%', sla: '71%' },
                  { label: 'Week 2', sub: 'Aug 08–14', value: 84,  display: '84%',  trend: '+6%', sla: '79%' },
                  { label: 'Week 3', sub: 'Aug 15–21', value: 90,  display: '90%',  trend: '+6%', sla: '86%' },
                  { label: 'Week 4', sub: 'Aug 22–28', value: 96,  display: '96%',  trend: '+6%', sla: '93%' },
                  { label: 'Current', sub: 'Trajectory', value: 99, display: '99%', trend: '🏆 Peak', sla: '98%' },
                ],
              },
              QUALITY: {
                color: '#10B981', gradId: 'barGradQUAL', metricName: 'Quality Score',
                target: 94, targetLabel: '94% Threshold',
                yLabels: ['100%', '80%', '60%', '40%', '20%'],
                bars: [
                  { label: 'Week 1', sub: 'Aug 01–07', value: 92,  display: '92%',  trend: '+3%', sla: '74%' },
                  { label: 'Week 2', sub: 'Aug 08–14', value: 95,  display: '95%',  trend: '+3%', sla: '82%' },
                  { label: 'Week 3', sub: 'Aug 15–21', value: 97,  display: '97%',  trend: '+2%', sla: '88%' },
                  { label: 'Week 4', sub: 'Aug 22–28', value: 98,  display: '98%',  trend: '+1%', sla: '94%' },
                  { label: 'Current', sub: 'Trajectory', value: 99, display: '99%', trend: '🏆 Peak', sla: '99%' },
                ],
              },
              ATTENDANCE: {
                color: '#F59E0B', gradId: 'barGradATT', metricName: 'Attendance',
                target: 90, targetLabel: '90% SLA',
                yLabels: ['100%', '80%', '60%', '40%', '20%'],
                bars: [
                  { label: 'Week 1', sub: 'Aug 01–07', value: 100, display: '100%', trend: '✓ Perfect', sla: '100%' },
                  { label: 'Week 2', sub: 'Aug 08–14', value: 100, display: '100%', trend: '✓ Perfect', sla: '100%' },
                  { label: 'Week 3', sub: 'Aug 15–21', value: 100, display: '100%', trend: '✓ Perfect', sla: '100%' },
                  { label: 'Week 4', sub: 'Aug 22–28', value: 100, display: '100%', trend: '✓ Perfect', sla: '100%' },
                  { label: 'Current', sub: 'Trajectory', value: 100, display: '100%', trend: '🏆 Flawless', sla: '100%' },
                ],
              },
              SLA: {
                color: '#EF4444', gradId: 'barGradSLA', metricName: 'SLA Resolution',
                target: 95, targetLabel: '95% SLA Benchmark',
                yLabels: ['100%', '80%', '60%', '40%', '20%'],
                bars: [
                  { label: 'Week 1', sub: 'Aug 01–07', value: 88,  display: '88%',  trend: '+3%', sla: '65%' },
                  { label: 'Week 2', sub: 'Aug 08–14', value: 91,  display: '91%',  trend: '+3%', sla: '75%' },
                  { label: 'Week 3', sub: 'Aug 15–21', value: 94,  display: '94%',  trend: '+3%', sla: '85%' },
                  { label: 'Week 4', sub: 'Aug 22–28', value: 97,  display: '97%',  trend: '+3%', sla: '93%' },
                  { label: 'Current', sub: 'Trajectory', value: 99, display: '99%', trend: '🏆 Mastery', sla: '99%' },
                ],
              },
            };

            // SVG layout constants
            const SVG_W = 530, SVG_H = 170;
            const PAD_L = 36, PAD_R = 14, PAD_T = 12, PAD_B = 36;
            const chartW = SVG_W - PAD_L - PAD_R;
            const chartH = SVG_H - PAD_T - PAD_B;
            const cfg = barConfig[activeReportMetric] ?? barConfig['PRODUCTIVITY'];
            const n = cfg.bars.length;
            const groupW = chartW / n;
            const barW = Math.min(groupW * 0.52, 54);

            // y helpers: value 0–100 → SVG y
            const yPos = (v: number) => PAD_T + chartH - (v / 100) * chartH;
            const targetY = yPos(cfg.target);

            return (
              <div
                className="group p-6 rounded-2xl border space-y-4 transition-all duration-300 cursor-default"
                style={{ background: '#FAFBFF', borderColor: accent.border, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = accent.shadow; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-10 rounded-full mt-0.5 shrink-0 transition-colors duration-300"
                      style={{ background: `linear-gradient(to bottom, ${accent.color}, ${accent.color}44)` }} />
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Weekly Performance Overview
                      </h3>
                      <p className="text-xs mt-0.5 transition-colors duration-300" style={{ color: accent.color, fontFamily: 'Inter, sans-serif', opacity: 0.7 }}>
                        Hover a bar to inspect · click a metric tab to switch
                      </p>
                    </div>
                  </div>
                  {/* Metric Selector */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-xs">
                    {([
                      { id: 'PRODUCTIVITY', label: 'Productivity',   color: '#6366F1', activeBg: '#EEF2FF' },
                      { id: 'QUALITY',      label: 'Quality Score',  color: '#10B981', activeBg: '#ECFDF5' },
                      { id: 'ATTENDANCE',   label: 'Attendance',     color: '#F59E0B', activeBg: '#FFFBEB' },
                      { id: 'SLA',          label: 'SLA Resolution', color: '#EF4444', activeBg: '#FEF2F2' },
                    ] as const).map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => { setActiveReportMetric(m.id); setChartHoverIdx(null); }}
                        style={activeReportMetric === m.id
                          ? { background: m.activeBg, color: m.color, fontFamily: 'Inter, sans-serif' }
                          : { fontFamily: 'Inter, sans-serif' }}
                        className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                          activeReportMetric === m.id ? 'shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar Chart SVG */}
                <div className="w-full relative select-none" onMouseLeave={() => setChartHoverIdx(null)}>
                  <svg
                    key={activeReportMetric}
                    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                    className="w-full overflow-visible"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <defs>
                      {/* Bar gradient — top solid, bottom fades */}
                      <linearGradient id={cfg.gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor={cfg.color} stopOpacity="1" />
                        <stop offset="100%" stopColor={cfg.color} stopOpacity="0.55" />
                      </linearGradient>
                      {/* Hover gradient — brighter */}
                      <linearGradient id={`${cfg.gradId}_hov`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor={cfg.color} stopOpacity="1" />
                        <stop offset="100%" stopColor={cfg.color} stopOpacity="0.75" />
                      </linearGradient>
                      {/* Glow filter */}
                      <filter id={`barGlow_${activeReportMetric}`} x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                      <clipPath id="barChartClip">
                        <rect x={PAD_L} y={PAD_T} width={chartW} height={chartH} />
                      </clipPath>
                    </defs>

                    {/* Horizontal grid lines */}
                    {[0, 25, 50, 75, 100].map((v, i) => {
                      const gy = yPos(v);
                      return (
                        <g key={i}>
                          <line x1={PAD_L} y1={gy} x2={SVG_W - PAD_R} y2={gy}
                            stroke={v === 0 ? '#E2E8F0' : '#F1F5F9'} strokeWidth={v === 0 ? 0.75 : 0.75} />
                          <text x={PAD_L - 4} y={gy + 3.5}
                            fill="#CBD5E1" fontSize="7.5" fontWeight="400" textAnchor="end">
                            {v}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Target benchmark line */}
                    <line
                      x1={PAD_L} y1={targetY} x2={SVG_W - PAD_R} y2={targetY}
                      stroke={cfg.color} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.4"
                    />
                    <text x={SVG_W - PAD_R} y={targetY - 3}
                      fill={cfg.color} fontSize="7" fontWeight="600" opacity="0.65" textAnchor="end">
                      {cfg.targetLabel}
                    </text>

                    {/* Bars */}
                    {cfg.bars.map((bar, idx) => {
                      const isHovered = chartHoverIdx === idx;
                      const isLast = idx === cfg.bars.length - 1;
                      const barH = (bar.value / 100) * chartH;
                      const bx = PAD_L + idx * groupW + (groupW - barW) / 2;
                      const by = yPos(bar.value);
                      const aboveTarget = bar.value >= cfg.target;
                      const radius = 5;

                      return (
                        <g key={idx}
                          onMouseEnter={() => setChartHoverIdx(idx)}
                          onClick={() => setChartHoverIdx(isHovered ? null : idx)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Hover glow shadow behind bar */}
                          {isHovered && (
                            <rect
                              x={bx - 3} y={by - 3}
                              width={barW + 6} height={barH + 3}
                              rx={radius + 2}
                              fill={cfg.color} opacity="0.12"
                              style={{ filter: `blur(6px)` }}
                            />
                          )}

                          {/* Bar body with rounded top */}
                          <rect
                            x={bx} y={by}
                            width={barW} height={barH}
                            rx={radius} ry={radius}
                            fill={isHovered ? `url(#${cfg.gradId}_hov)` : `url(#${cfg.gradId})`}
                            opacity={isHovered ? 1 : isLast ? 0.95 : 0.78}
                            style={{
                              transition: 'opacity 0.15s ease, y 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                              animation: `barGrow 0.5s cubic-bezier(0.34,1.56,0.64,1) ${idx * 80}ms both`,
                              transformOrigin: `${bx + barW / 2}px ${PAD_T + chartH}px`,
                            }}
                          />

                          {/* Top cap — square on top to join with rounded rect cleanly */}
                          <rect
                            x={bx} y={by}
                            width={barW} height={Math.min(barH, radius)}
                            rx={radius} ry={radius}
                            fill={isHovered ? `url(#${cfg.gradId}_hov)` : `url(#${cfg.gradId})`}
                            opacity={isHovered ? 1 : isLast ? 0.95 : 0.78}
                            style={{ transition: 'opacity 0.15s ease' }}
                          />

                          {/* Score label above bar */}
                          <text
                            x={bx + barW / 2} y={by - 5}
                            textAnchor="middle"
                            fill={isHovered ? cfg.color : isLast ? cfg.color : '#64748B'}
                            fontSize={isHovered ? '9' : '8'}
                            fontWeight={isHovered || isLast ? '800' : '600'}
                            style={{ transition: 'all 0.15s ease', pointerEvents: 'none' }}
                          >
                            {bar.display}
                          </text>

                          {/* Above-target check mark on bar top */}
                          {aboveTarget && isHovered && (
                            <text x={bx + barW / 2} y={by - 14}
                              textAnchor="middle" fontSize="9"
                              style={{ pointerEvents: 'none' }}>
                              ✓
                            </text>
                          )}

                          {/* Invisible hit zone */}
                          <rect
                            x={bx - 4} y={PAD_T}
                            width={barW + 8} height={chartH}
                            fill="transparent"
                          />
                        </g>
                      );
                    })}

                    {/* X-axis baseline */}
                    <line x1={PAD_L} y1={PAD_T + chartH} x2={SVG_W - PAD_R} y2={PAD_T + chartH}
                      stroke="#E2E8F0" strokeWidth="0.75" />

                    {/* X-axis labels */}
                    {cfg.bars.map((bar, idx) => {
                      const isHovered = chartHoverIdx === idx;
                      const isLast = idx === cfg.bars.length - 1;
                      const cx = PAD_L + idx * groupW + groupW / 2;
                      return (
                        <g key={`xl-${idx}`}>
                          <line x1={cx} y1={PAD_T + chartH} x2={cx} y2={PAD_T + chartH + 3}
                            stroke={isHovered ? cfg.color : '#E2E8F0'} strokeWidth="1" />
                          <text x={cx} y={PAD_T + chartH + 11} textAnchor="middle"
                            fill={isLast ? cfg.color : isHovered ? cfg.color : '#94A3B8'}
                            fontSize="8" fontWeight={isLast || isHovered ? '700' : '400'}>
                            {bar.label}
                          </text>
                          <text x={cx} y={PAD_T + chartH + 20} textAnchor="middle"
                            fill="#CBD5E1" fontSize="6.5" fontWeight="400">
                            {bar.sub}
                          </text>
                        </g>
                      );
                    })}

                    {/* Keyframe animations via style tag */}
                    <style>{`
                      @keyframes barGrow {
                        from { transform: scaleY(0); opacity: 0; }
                        to   { transform: scaleY(1); opacity: 1; }
                      }
                      @keyframes barTooltipPop {
                        from { transform: translate(-50%, calc(-100% - 12px)) scale(0.88); opacity: 0; }
                        to   { transform: translate(-50%, calc(-100% - 12px)) scale(1);    opacity: 1; }
                      }
                    `}</style>
                  </svg>

                  {/* Floating Tooltip */}
                  {chartHoverIdx !== null && (() => {
                    const bar = cfg.bars[chartHoverIdx];
                    const bx = PAD_L + chartHoverIdx * groupW + groupW / 2;
                    const by = yPos(bar.value);
                    const pctX = (bx / SVG_W) * 100;
                    const pctY = (by / SVG_H) * 100;
                    const aboveTarget = bar.value >= cfg.target;
                    return (
                      <div
                        className="absolute pointer-events-none z-20 px-3.5 py-2.5 rounded-2xl border text-xs"
                        style={{
                          left: `${pctX}%`,
                          top: `${pctY}%`,
                          transform: 'translate(-50%, calc(-100% - 12px))',
                          background: '#fff',
                          borderColor: `${cfg.color}28`,
                          boxShadow: `0 12px 40px ${cfg.color}22`,
                          fontFamily: 'Inter, sans-serif',
                          minWidth: '140px',
                          animation: 'barTooltipPop 0.18s cubic-bezier(0.34,1.56,0.64,1) both',
                        }}
                      >
                        {/* Metric pill */}
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color }} />
                          <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: cfg.color }}>
                            {cfg.metricName}
                          </span>
                        </div>
                        {/* Big score */}
                        <div className="text-3xl font-black leading-none mb-1" style={{ color: cfg.color }}>
                          {bar.display}
                        </div>
                        {/* Week sub-label */}
                        <div className="text-[10px] text-slate-500 font-semibold mb-2">
                          {bar.label} · {bar.sub}
                        </div>
                        {/* Badges row */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1.5 border-t border-slate-100">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${cfg.color}15`, color: cfg.color }}>
                            SLA {bar.sla}
                          </span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${aboveTarget ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                            {aboveTarget ? `✓ Above Target` : `⚠ Below Target`}
                          </span>
                          <span className="text-[9px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                            {bar.trend}
                          </span>
                        </div>
                        {/* Arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3.5 h-3.5 rotate-45 border-b border-r bg-white"
                          style={{ borderColor: `${cfg.color}18` }} />
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 10: NOTIFICATIONS CENTER (NATIVE TMS MODULE) */}
      {/* ========================================================================= */}
      {activeTab === 'notifications' && (
        <TmsEmployeeNotificationsView onTabNavigate={(tab) => setActiveTab(tab)} />
      )}

      {/* ========================================================================= */}
      {/* VIEW 11: EMPLOYEE PROFILE (PREMIUM CLEAN UI) */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#0F172A]">My Profile</h1>
              <p className="text-xs text-[#475569] mt-0.5">View and manage your personal, organizational, and background details.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTempProfileData(profileData);
                  setIsEditProfileModalOpen(true);
                }}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Edit Profile Details</span>
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {profileSuccessToast && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile details successfully updated and saved!</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Saved</span>
            </div>
          )}

          {/* Top Profile Summary Hero Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
              {/* Profile Avatar with Hover Actions (Eye & Pencil) */}
              <div className="relative group/avatar cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-blue-500 relative bg-slate-100">
                  <img
                    src={profileAvatar}
                    alt="Employee Avatar"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-105"
                  />
                  
                  {/* Hover Overlay with 2 buttons */}
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover/avatar:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
                    {/* 1. View Large (Eye Icon) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPhotoPreviewModalOpen(true);
                      }}
                      title="View Profile Photo"
                      className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center transition-transform hover:scale-110 shadow-sm cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#0F172A]" />
                    </button>

                    {/* 2. Edit Photo (Pencil Icon) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPhotoEditModalOpen(true);
                      }}
                      title="Edit Profile Photo"
                      className="w-8 h-8 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white pointer-events-none"></span>
              </div>

              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-2xl font-black text-[#0F172A]">{profileData.fullName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-bold inline-flex items-center gap-1 self-center sm:self-auto">
                    <UserCheck className="w-3 h-3" />
                    <span>{profileData.role}</span>
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#475569]">{profileData.department}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-[#94A3B8]">
                  <span>ID: <strong className="font-mono text-[#0F172A]">{profileData.employeeId}</strong></span>
                  <span>•</span>
                  <span>Location: <strong className="text-[#0F172A]">{profileData.workLocation}</strong></span>
                  <span>•</span>
                  <span>Joined: <strong className="text-[#0F172A]">{profileData.joinedDate}</strong></span>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end justify-center shrink-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Profile Status</span>
                <span className="mt-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Verified</span>
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Shift Schedule</span>
                <p className="font-bold text-[#0F172A] mt-0.5">General (09:00 - 18:00)</p>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Work Mode</span>
                <p className="font-bold text-[#0F172A] mt-0.5">{profileData.workMode}</p>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Employment Type</span>
                <p className="font-bold text-[#0F172A] mt-0.5">{profileData.employmentType}</p>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Reporting Manager</span>
                <p className="font-bold text-[#0F172A] mt-0.5 truncate">{profileData.reportingManager}</p>
              </div>
            </div>
          </div>

          {/* Categorized Detailed Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Personal Information */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">Personal Information</h3>
                </div>
                <button
                  onClick={() => openProfileEditorForField('PERSONAL')}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Full Legal Name</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.fullName}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Date of Birth</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.dob}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Gender</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.gender}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Marital Status</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.maritalStatus}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Blood Group</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.bloodGroup}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Father's Name</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.fatherName}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Mother's Name</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.motherName}</p>
                </div>
              </div>
            </div>

            {/* 2. Contact & Address */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">Contact & Location</h3>
                </div>
                <button
                  onClick={() => openProfileEditorForField('CONTACT')}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Official Email</span>
                  <p className="font-bold text-[#0F172A] font-mono truncate mt-0.5">{profileData.email}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Primary Phone</span>
                  <p className="font-bold text-[#0F172A] font-mono mt-0.5">{profileData.primaryPhone}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Alternate Phone</span>
                  <p className="font-bold text-[#0F172A] font-mono mt-0.5">{profileData.alternatePhone || '—'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Residential Address</span>
                  <p className="font-bold text-[#0F172A] mt-0.5 leading-snug">{profileData.streetAddress}</p>
                  <p className="text-[11px] text-[#475569] mt-1">{profileData.city}, {profileData.state} - {profileData.pincode}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Emergency Contact</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.emergencyContactName}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Emergency Phone</span>
                  <p className="font-bold text-[#0F172A] font-mono mt-0.5">{profileData.emergencyContactPhone}</p>
                </div>
              </div>
            </div>

            {/* 3. KYC & Organization Directory */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">KYC & Identification</h3>
                </div>
                <button
                  onClick={() => openProfileEditorForField('ORG_KYC')}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Aadhaar Card Number</span>
                  <p className="font-bold text-[#0F172A] font-mono mt-0.5">{profileData.aadhaarNumber}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">PAN Card Number</span>
                  <p className="font-bold text-[#0F172A] font-mono mt-0.5">{profileData.panNumber}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Employee ID</span>
                  <p className="font-bold text-[#0F172A] font-mono mt-0.5">{profileData.employeeId}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Designation</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.professionalDesignation}</p>
                </div>
              </div>
            </div>

            {/* 4. Education, Skills & Background */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">Skills & Background</h3>
                </div>
                <button
                  onClick={() => openProfileEditorForField('SKILLS_EXP')}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Highest Qualification</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.highestEducation}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Prior Experience</span>
                    <p className="font-bold text-[#0F172A] mt-0.5">{profileData.priorWorkExperience}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Languages Known</span>
                    <p className="font-bold text-[#0F172A] mt-0.5">{profileData.languagesKnown}</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Core Skills</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{profileData.coreTechnicalSkills}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Professional Bio</span>
                  <p className="font-medium text-[#475569] mt-0.5 leading-relaxed">{profileData.professionalBio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Uploaded Document Vault */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">Document Vault & Compliance Records</h3>
                  <p className="text-[11px] text-[#475569]">Upload, view, and update your verified identity and qualification records</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4 / 4 Documents Active</span>
                </span>
                <button
                  type="button"
                  onClick={() => openProfileEditorForField('DOCS')}
                  className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-[#2563EB] border border-blue-200 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Manage All</span>
                </button>
              </div>
            </div>

            {/* Document Upload Success Banner */}
            {docUploadSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{docUploadSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {(
                [
                  { key: 'aadhaar' as const, title: 'Aadhaar Card Attachment', doc: employeeDocs.aadhaar, color: 'blue' },
                  { key: 'pan' as const, title: 'PAN Card Attachment', doc: employeeDocs.pan, color: 'indigo' },
                  { key: 'resume' as const, title: 'Resume PDF Copy', doc: employeeDocs.resume, color: 'purple' },
                  { key: 'degree' as const, title: 'Degree Certificate', doc: employeeDocs.degree, color: 'emerald' },
                ]
              ).map(({ key, title, doc }) => (
                <div 
                  key={key} 
                  className="p-4 bg-[#F8FAFC] hover:bg-slate-50 transition rounded-2xl border border-[#E2E8F0] flex flex-col justify-between gap-3 group relative"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-slate-700">
                        <FileText className="w-4 h-4 text-[#2563EB]" />
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/80 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Verified
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-[#0F172A] leading-tight pt-1">{title}</h4>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{doc.fileName}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{doc.size} • {doc.date}</p>
                  </div>

                  {/* Actions (View, Upload/Replace, Download) */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/70">
                    {/* 1. Upload/Replace File Button */}
                    <label 
                      title="Upload or Replace File"
                      className="flex-1 py-1.5 px-2 bg-white hover:bg-blue-50 text-[#2563EB] border border-slate-200 hover:border-blue-300 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                        onChange={(e) => handleUploadDocument(key, e)}
                        className="hidden"
                      />
                    </label>

                    {/* 2. View Preview Button */}
                    <button
                      type="button"
                      title="View Document"
                      onClick={() => setSelectedDocPreview(doc)}
                      className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* 3. Download Button */}
                    <button
                      type="button"
                      title="Download Document"
                      onClick={() => {
                        setDocUploadSuccessMsg(`Downloading ${doc.fileName}...`);
                        setTimeout(() => setDocUploadSuccessMsg(''), 2500);
                      }}
                      className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / UPDATE PROFILE MODAL */}
      {/* ========================================================================= */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#2563EB]" />
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">Edit Employee Profile</h3>
                  <p className="text-[11px] text-[#475569]">Update your personal, organizational, and background details</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditProfileModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100 text-xs font-bold">
              {[
                { key: 'PERSONAL', label: 'Personal Details' },
                { key: 'CONTACT', label: 'Contact & Location' },
                { key: 'ORG_KYC', label: 'Org & KYC' },
                { key: 'SKILLS_EXP', label: 'Skills & Bio' },
                { key: 'DOCS', label: 'Document Vault' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setEditProfileCategory(tab.key as any)}
                  className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
                    editProfileCategory === tab.key
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-slate-100 text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              {/* Category: Personal */}
              {editProfileCategory === 'PERSONAL' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={tempProfileData.fullName}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, fullName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={tempProfileData.dob}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, dob: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Gender</label>
                      <select
                        value={tempProfileData.gender}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, gender: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      >
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Marital Status</label>
                      <select
                        value={tempProfileData.maritalStatus}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, maritalStatus: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      >
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Blood Group</label>
                      <input
                        type="text"
                        value={tempProfileData.bloodGroup}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, bloodGroup: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Father's Name</label>
                      <input
                        type="text"
                        value={tempProfileData.fatherName}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, fatherName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Mother's Name</label>
                      <input
                        type="text"
                        value={tempProfileData.motherName}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, motherName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Category: Contact & Address */}
              {editProfileCategory === 'CONTACT' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Official Email</label>
                      <input
                        type="email"
                        value={tempProfileData.email}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, email: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Primary Phone</label>
                      <input
                        type="text"
                        value={tempProfileData.primaryPhone}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, primaryPhone: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#0F172A] block mb-1">Alternate Phone</label>
                    <input
                      type="text"
                      value={tempProfileData.alternatePhone}
                      onChange={(e) => setTempProfileData({ ...tempProfileData, alternatePhone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#0F172A] block mb-1">Street Address</label>
                    <textarea
                      rows={2}
                      value={tempProfileData.streetAddress}
                      onChange={(e) => setTempProfileData({ ...tempProfileData, streetAddress: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">City</label>
                      <input
                        type="text"
                        value={tempProfileData.city}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, city: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">State</label>
                      <input
                        type="text"
                        value={tempProfileData.state}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, state: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Pincode</label>
                      <input
                        type="text"
                        value={tempProfileData.pincode}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, pincode: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Emergency Contact Name</label>
                      <input
                        type="text"
                        value={tempProfileData.emergencyContactName}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, emergencyContactName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Emergency Contact Phone</label>
                      <input
                        type="text"
                        value={tempProfileData.emergencyContactPhone}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, emergencyContactPhone: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Category: Organization & KYC */}
              {editProfileCategory === 'ORG_KYC' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Aadhaar Number</label>
                      <input
                        type="text"
                        value={tempProfileData.aadhaarNumber}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, aadhaarNumber: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">PAN Card Number</label>
                      <input
                        type="text"
                        value={tempProfileData.panNumber}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, panNumber: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Professional Designation</label>
                      <input
                        type="text"
                        value={tempProfileData.professionalDesignation}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, professionalDesignation: e.target.value, role: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Department</label>
                      <input
                        type="text"
                        value={tempProfileData.department}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, department: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Work Location</label>
                      <input
                        type="text"
                        value={tempProfileData.workLocation}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, workLocation: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Reporting Manager</label>
                      <input
                        type="text"
                        value={tempProfileData.reportingManager}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, reportingManager: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Category: Skills & Bio */}
              {editProfileCategory === 'SKILLS_EXP' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Highest Qualification</label>
                      <input
                        type="text"
                        value={tempProfileData.highestEducation}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, highestEducation: e.target.value })}
                        placeholder="e.g. B.Tech Electrical & Electronics"
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Prior Experience</label>
                      <input
                        type="text"
                        value={tempProfileData.priorWorkExperience}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, priorWorkExperience: e.target.value })}
                        placeholder="e.g. 3.5 Years"
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Languages Known</label>
                      <input
                        type="text"
                        value={tempProfileData.languagesKnown}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, languagesKnown: e.target.value })}
                        placeholder="e.g. English, Hindi, Kannada"
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#0F172A] block mb-1">Core Technical Skills</label>
                      <input
                        type="text"
                        value={tempProfileData.coreTechnicalSkills}
                        onChange={(e) => setTempProfileData({ ...tempProfileData, coreTechnicalSkills: e.target.value })}
                        placeholder="e.g. Fleet Telemetry, Battery Analytics"
                        className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#0F172A] block mb-1">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={tempProfileData.linkedinUrl}
                      onChange={(e) => setTempProfileData({ ...tempProfileData, linkedinUrl: e.target.value })}
                      placeholder="e.g. https://linkedin.com/in/username"
                      className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#0F172A] block mb-1">Professional Biography</label>
                    <textarea
                      rows={3}
                      value={tempProfileData.professionalBio}
                      onChange={(e) => setTempProfileData({ ...tempProfileData, professionalBio: e.target.value })}
                      placeholder="Write a brief professional summary..."
                      className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A] resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Category: Document Vault */}
              {editProfileCategory === 'DOCS' && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-[#2563EB] font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-[#2563EB]" />
                    <span>Upload your verified compliance certificates and documents (PDF, JPG, PNG up to 10MB each).</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(
                      [
                        { key: 'aadhaar' as const, title: 'Aadhaar Card Attachment', doc: employeeDocs.aadhaar },
                        { key: 'pan' as const, title: 'PAN Card Attachment', doc: employeeDocs.pan },
                        { key: 'resume' as const, title: 'Resume PDF Copy', doc: employeeDocs.resume },
                        { key: 'degree' as const, title: 'Degree Certificate', doc: employeeDocs.degree },
                      ]
                    ).map(({ key, title, doc }) => (
                      <div key={key} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0F172A] text-xs">{title}</span>
                          <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono truncate">{doc.fileName}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <label className="flex-1 py-2 px-3 bg-white hover:bg-blue-50 text-[#2563EB] border border-blue-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload / Replace File</span>
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                              onChange={(e) => handleUploadDocument(key, e)}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setSelectedDocPreview(doc)}
                            className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer shadow-xs"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProfileModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#475569] rounded-xl font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: APPLY FOR LEAVE */}
      {/* ========================================================================= */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-base font-extrabold text-[#0F172A]">Apply for Leave</h3>
              </div>
              <button onClick={() => setIsLeaveModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {leaveSuccessMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Leave application submitted successfully! Notified manager.</span>
              </div>
            ) : (
              <form onSubmit={handleApplyLeave} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Leave Category</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full p-2.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] bg-white font-medium"
                  >
                    <option>Casual Leave (6 Days Available)</option>
                    <option>Sick / Medical Leave (8 Days Available)</option>
                    <option>Earned / Privilege Leave (12 Days Available)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#0F172A] block mb-1">Start Date</label>
                    <input
                      type="date"
                      value={leaveStartDate}
                      onChange={(e) => setLeaveStartDate(e.target.value)}
                      required
                      className="w-full p-2.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#0F172A] block mb-1">End Date</label>
                    <input
                      type="date"
                      value={leaveEndDate}
                      onChange={(e) => setLeaveEndDate(e.target.value)}
                      required
                      className="w-full p-2.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Duration Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLeaveDurationType('FULL_DAY')}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        leaveDurationType === 'FULL_DAY' ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-slate-50 text-[#475569] border-[#E2E8F0]'
                      }`}
                    >
                      Full Day
                    </button>
                    <button
                      type="button"
                      onClick={() => setLeaveDurationType('HALF_DAY')}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        leaveDurationType === 'HALF_DAY' ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-slate-50 text-[#475569] border-[#E2E8F0]'
                      }`}
                    >
                      Half Day
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Reason for Leave</label>
                  <textarea
                    rows={3}
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="Briefly describe the reason for your time off..."
                    required
                    className="w-full p-2.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLeaveModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#475569] rounded-xl font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold transition cursor-pointer shadow-xs"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SUBMIT LOGOUT REPORT */}
      {/* ========================================================================= */}
      {isLogoutReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">End-of-Day Logout Report</h3>
                  <p className="text-[11px] text-slate-500">Auto-collected on shift checkout — fill & submit to clock out</p>
                </div>
              </div>
              <button onClick={() => setIsLogoutReportModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {logoutReportSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Logout report submitted! Shift closed and recorded.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitLogoutReport} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Today's Completed Work *</label>
                  <textarea
                    rows={3}
                    value={logoutWorkDone}
                    onChange={(e) => setLogoutWorkDone(e.target.value)}
                    placeholder="List all key deliverables and tasks completed today..."
                    required
                    className="w-full p-2.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] resize-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Issues / Blockers Encountered</label>
                  <input
                    type="text"
                    value={logoutBlockers}
                    onChange={(e) => setLogoutBlockers(e.target.value)}
                    placeholder="e.g. Awaiting spare parts from supplier (or None)"
                    className="w-full p-2.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Tomorrow's Priorities</label>
                  <input
                    type="text"
                    value={logoutTomorrowPlan}
                    onChange={(e) => setLogoutTomorrowPlan(e.target.value)}
                    placeholder="Key items planned for next shift..."
                    className="w-full p-2.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLogoutReportModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#475569] rounded-xl font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Submit EOD & Clock Out</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ANNOUNCEMENT DETAIL VIEW */}
      {/* ========================================================================= */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                {selectedAnnouncement.category}
              </span>
              <button onClick={() => setSelectedAnnouncement(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-[#0F172A]">{selectedAnnouncement.title}</h3>
              <p className="text-[11px] text-slate-400 font-medium">Issued by: {selectedAnnouncement.author} • {selectedAnnouncement.time}</p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-[#475569] leading-relaxed">
                {selectedAnnouncement.fullText}
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: LARGE PROFILE PHOTO PREVIEW (LIGHTBOX) */}
      {/* ========================================================================= */}
      {isPhotoPreviewModalOpen && (
        <div 
          onClick={() => setIsPhotoPreviewModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 cursor-default relative overflow-hidden animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-sm font-extrabold text-[#0F172A]">Profile Photo</h3>
              </div>
              <button 
                onClick={() => setIsPhotoPreviewModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High Res Image Display */}
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
              <img
                src={profileAvatar}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption & Quick Actions */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-xs font-black text-[#0F172A]">{profileData.fullName}</p>
                <p className="text-[11px] text-[#475569] font-medium">{profileData.role}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsPhotoPreviewModalOpen(false);
                    setIsPhotoEditModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#2563EB] border border-blue-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>
                <button
                  onClick={() => setIsPhotoPreviewModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: EDIT & UPLOAD PROFILE PHOTO */}
      {/* ========================================================================= */}
      {isPhotoEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#2563EB]" />
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">Update Profile Photo</h3>
                  <p className="text-[11px] text-[#475569]">Upload a new photo or select from curated enterprise avatars</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPhotoEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Avatar & File Upload Box */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <img
                src={profileAvatar}
                alt="Current Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-blue-500 shrink-0"
              />
              <div className="space-y-2 flex-1 text-center sm:text-left">
                <p className="text-xs font-bold text-[#0F172A]">Upload from your device</p>
                <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Image File...</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-slate-400">Supports PNG, JPG, JPEG, WEBP (Max 5MB)</p>
              </div>
            </div>

            {/* Enter Custom Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0F172A] block">Or Enter Direct Image URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 p-2.5 bg-white border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-xs text-[#0F172A]"
                />
                <button
                  type="button"
                  onClick={() => handleSaveCustomAvatarUrl(customAvatarUrl)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsPhotoEditModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#475569] rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: DOCUMENT PREVIEW MODAL */}
      {/* ========================================================================= */}
      {selectedDocPreview && (
        <div 
          onClick={() => setSelectedDocPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2563EB]" />
                <div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">{selectedDocPreview.title}</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{selectedDocPreview.fileName}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDocPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Canvas */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center shadow-xs">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">{selectedDocPreview.fileName}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{selectedDocPreview.size} • 256-bit Encrypted PDF/Scan</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Compliance Record</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400 font-medium">Uploaded to InnoVibe HR Vault</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDocUploadSuccessMsg(`Downloading ${selectedDocPreview.fileName}...`);
                    setSelectedDocPreview(null);
                    setTimeout(() => setDocUploadSuccessMsg(''), 2500);
                  }}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDocPreview(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#475569] rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: TICKET DETAIL VIEW MODAL */}
      {/* ========================================================================= */}
      {selectedTicketDetail && (
        <div 
          onClick={() => setSelectedTicketDetail(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-sm text-[#2563EB] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xl">
                  {selectedTicketDetail.id}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  selectedTicketDetail.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  selectedTicketDetail.status === 'IN_REVIEW' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {selectedTicketDetail.status}
                </span>
              </div>
              <button 
                onClick={() => setSelectedTicketDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject</span>
                <h4 className="text-base font-extrabold text-[#0F172A] mt-0.5">{selectedTicketDetail.subject}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Category</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{selectedTicketDetail.category}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Priority</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{selectedTicketDetail.priority || 'NORMAL'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Created</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{selectedTicketDetail.date}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Assigned Team</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">Internal IT & Ops Helpdesk</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Issue Description</span>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[#475569] leading-relaxed">
                  {selectedTicketDetail.description || 'No additional details provided.'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedTicketDetail(null)}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close Ticket View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 8: ASSIGNED TASK REVIEW & SPECIFICATION MODAL */}
      {/* ========================================================================= */}
      {selectedTaskForReview && (
        <div 
          onClick={() => setSelectedTaskForReview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-black text-xs text-[#2563EB] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xl">
                  {selectedTaskForReview.id}
                </span>
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                  selectedTaskForReview.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  selectedTaskForReview.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {selectedTaskForReview.status === 'ASSIGNED' ? 'Pending Review & Acceptance' : selectedTaskForReview.status.replace('_', ' ')}
                </span>
              </div>
              <button 
                onClick={() => setSelectedTaskForReview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Assigner Profile Card */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTaskForReview.assignedBy.avatar}
                  alt={selectedTaskForReview.assignedBy.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
                />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned By Leadership</span>
                  <strong className="text-xs font-black text-slate-900 block">{selectedTaskForReview.assignedBy.name}</strong>
                  <span className="text-[11px] text-slate-500 font-medium">{selectedTaskForReview.assignedBy.role}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600">
                {selectedTaskForReview.assignedBy.department}
              </span>
            </div>

            {/* Task Details */}
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Task Title</span>
                <h3 className="text-base font-extrabold text-[#0F172A] mt-0.5">{selectedTaskForReview.title}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Category</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{selectedTaskForReview.tag}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Priority</span>
                  <p className="font-bold text-[#0F172A] mt-0.5">{selectedTaskForReview.priority}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Deadline</span>
                  <p className="font-bold text-rose-600 mt-0.5">{selectedTaskForReview.deadline}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Description & Operating Specifications
                </span>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-[#334155] leading-relaxed font-medium">
                  {selectedTaskForReview.description}
                </div>
              </div>

              {/* Attached Reference Documents */}
              {selectedTaskForReview.attachedDocuments && selectedTaskForReview.attachedDocuments.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Attached Reference Documents & SOPs ({selectedTaskForReview.attachedDocuments.length})
                  </span>
                  <div className="space-y-2">
                    {selectedTaskForReview.attachedDocuments.map((doc: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs hover:border-blue-300 transition"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-slate-900 truncate">{doc.name}</p>
                            <span className="text-[10px] text-slate-400">{doc.size} • {doc.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedDocumentForView({ ...doc, taskTitle: selectedTaskForReview.title, author: selectedTaskForReview.assignedBy.name })}
                            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => alert(`Downloading reference document: ${doc.name}`)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If COMPLETED: Display Submitted Completion Proof */}
              {selectedTaskForReview.status === 'COMPLETED' && selectedTaskForReview.completionProof && (
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified Completion Proof</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700">
                      Submitted {selectedTaskForReview.completionProof.submittedAt}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-900 uppercase block mb-1">Work Done Summary</span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-emerald-100">
                      {selectedTaskForReview.completionProof.description}
                    </p>
                  </div>

                  {selectedTaskForReview.completionProof.uploadedDocuments && (
                    <div>
                      <span className="text-[10px] font-bold text-emerald-900 uppercase block mb-1">Proof Documents & Logs</span>
                      <div className="space-y-1.5">
                        {selectedTaskForReview.completionProof.uploadedDocuments.map((f: any, idx: number) => (
                          <div key={idx} className="p-2.5 bg-white/80 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                            <span className="font-bold text-emerald-950 truncate">📄 {f.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] text-emerald-700">{f.size}</span>
                              <button
                                type="button"
                                onClick={() => setSelectedDocumentForView({ ...f, taskTitle: selectedTaskForReview.title, isProof: true })}
                                className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                <span>View</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedTaskForReview(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>

              {/* Action based on status */}
              {selectedTaskForReview.status === 'ASSIGNED' && (
                <button
                  type="button"
                  onClick={() => {
                    handleAcceptTask(selectedTaskForReview.id);
                  }}
                  className="px-5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Task & Start Working</span>
                </button>
              )}

              {selectedTaskForReview.status === 'IN_PROGRESS' && (
                <button
                  type="button"
                  onClick={() => {
                    handleOpenProofModal(selectedTaskForReview);
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>Proceed to Submit Proof</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 9: TASK COMPLETION & PROOF SUBMISSION MODAL */}
      {/* ========================================================================= */}
      {selectedTaskForProof && (
        <div 
          onClick={() => setSelectedTaskForProof(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Submit Task Completion Proof</h3>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Task ID: {selectedTaskForProof.id} • Assigned by {selectedTaskForProof.assignedBy.name}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTaskForProof(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Task Info Pill */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Completing Task:</span>
              <p className="font-bold text-slate-900 mt-0.5">{selectedTaskForProof.title}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitTaskProof} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  Work Done Description & Summary <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={proofDescription}
                  onChange={(e) => setProofDescription(e.target.value)}
                  placeholder="Detail the work completed, diagnostics performed, test values obtained, or operations finished..."
                  className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-blue-500 text-slate-800 leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  Working Hours Spent
                </label>
                <input
                  type="text"
                  value={proofHoursSpent}
                  onChange={(e) => setProofHoursSpent(e.target.value)}
                  placeholder="e.g. 2.5 hrs"
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  Upload Proof Documents, Test Logs & Photos (PDF, Images, Excel)
                </label>
                <div className="p-4 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl text-center bg-slate-50/50 transition cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.xlsx,.csv,.doc,.docx,.log"
                    onChange={handleProofFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Click or drag files to upload proof</span>
                    <span className="text-[10px] text-slate-400">Supported: PDF, Images (PNG/JPG), Excel, Logs up to 25MB</span>
                  </div>
                </div>

                {/* Uploaded Files List */}
                {proofUploadedFiles.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Attached Proof Files ({proofUploadedFiles.length})</span>
                    {proofUploadedFiles.map((file, idx) => (
                      <div key={idx} className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-800 truncate">{file.name}</span>
                          <span className="text-[10px] text-slate-500">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setProofUploadedFiles((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600 text-[10px] font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForProof(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Proof & Complete Task</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 10: IN-BROWSER DOCUMENT VIEWER & READER LIGHTBOX */}
      {/* ========================================================================= */}
      {selectedDocumentForView && (
        <div 
          onClick={() => setSelectedDocumentForView(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-100 rounded-3xl max-w-4xl w-full h-[92vh] flex flex-col border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Top Reader Header & Toolbar */}
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-slate-900 truncate">
                      {selectedDocumentForView.name}
                    </h3>
                    <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded uppercase">
                      {selectedDocumentForView.type || 'PDF Document'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {selectedDocumentForView.size || '2.4 MB'} • InnoVibe Enterprise Document Vault • Read-Only Mode
                  </span>
                </div>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setDocViewerZoom((prev) => Math.max(75, prev - 15))}
                    className="px-2 py-1 hover:bg-white rounded-lg transition text-slate-700 cursor-pointer"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <span className="px-2 text-[11px] text-slate-600 font-mono">{docViewerZoom}%</span>
                  <button
                    onClick={() => setDocViewerZoom((prev) => Math.min(150, prev + 15))}
                    className="px-2 py-1 hover:bg-white rounded-lg transition text-slate-700 cursor-pointer"
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => alert(`Downloading verified copy of ${selectedDocumentForView.name}...`)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download Copy</span>
                </button>

                <button 
                  onClick={() => setSelectedDocumentForView(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                  title="Close Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Content Paper Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-200/70">
              <div 
                className="bg-white rounded-2xl shadow-xl border border-slate-300 w-full max-w-3xl p-8 sm:p-12 space-y-8 text-slate-800 transition-transform duration-200 font-sans"
                style={{ transform: `scale(${docViewerZoom / 100})`, transformOrigin: 'top center' }}
              >
                {/* Document Letterhead */}
                <div className="border-b-2 border-slate-900 pb-6 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                        IV
                      </div>
                      <span className="text-base font-black text-slate-900 tracking-tight">INNOVIBE MOBILITY PVT. LTD.</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-bold block mt-1">
                      EV Fleet Operations & Technology Command Center • Depot Hub Systems
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ref: IVM-DOC-{selectedDocumentForView.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toUpperCase()} • Rev 2026.4
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md block">
                      CONFIDENTIAL // INTERNAL
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium block mt-1">
                      Date: August 10, 2026
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Authorized by: {selectedDocumentForView.author || 'Executive Leadership Suite'}
                    </span>
                  </div>
                </div>

                {/* DYNAMIC DOCUMENT CONTENT BODY */}

                {/* 1. Q3 Operations Strategic Deck */}
                {selectedDocumentForView.name.includes('Strategic_Deck') && (
                  <div className="space-y-6 text-xs leading-relaxed text-slate-700">
                    <div>
                      <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block">EXECUTIVE STRATEGY BRIEF</span>
                      <h1 className="text-xl font-black text-slate-900 mt-1">
                        Q3 EV Fleet Operations & Depot Infrastructure Expansion Plan
                      </h1>
                      <p className="text-xs text-slate-500 mt-0.5">Author: Sri Hari Kolusu (CEO) & Rajesh Varma (COO)</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">1. Executive Summary & Objective</h4>
                      <p>
                        In Q3 2026, InnoVibe Mobility is expanding commercial connected fleet operations by deploying 400 new high-efficiency electric two-wheelers and three-wheelers across Bengaluru Central, Hyderabad, and Pune distribution hubs.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 text-sm">2. Core Operational Pillars</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                          <strong className="text-blue-900 block font-bold">A. Depot Fast-Charging Grid</strong>
                          <p className="text-[11px] text-slate-600 mt-1">
                            Installation of 12 dual-gun 60kW DC fast chargers with OCPP 2.0.1 compliance and active dynamic load balancing.
                          </p>
                        </div>
                        <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                          <strong className="text-emerald-900 block font-bold">B. 98.5% Fleet Uptime Target</strong>
                          <p className="text-[11px] text-slate-600 mt-1">
                            Enforcement of 4.2-hour maximum turnaround time on all scheduled battery cell balancing and hub-motor servicing.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">3. Action Items for Operations Specialists</h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                        <li>Verify CAN-bus telemetry packet frequency for each newly registered chassis prior to depot dispatch.</li>
                        <li>Maintain strict daily logging of spare parts consumption and fast-charger socket thermal readings.</li>
                        <li>Attend scheduled weekly synchronization sessions with the COO Operations Suite.</li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>InnoVibe Strategic Document • Page 1 of 3</span>
                      <span className="font-bold text-slate-900">Signed: Sri Hari Kolusu (CEO)</span>
                    </div>
                  </div>
                )}

                {/* 2. IoT Gateway Calibration SOP */}
                {selectedDocumentForView.name.includes('IoT_Gateway_Calibration') && (
                  <div className="space-y-6 text-xs leading-relaxed text-slate-700">
                    <div>
                      <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block">STANDARD OPERATING PROCEDURE</span>
                      <h1 className="text-xl font-black text-slate-900 mt-1">
                        SOP-OPS-042: IoT Telemetry Gateway Calibration & Verification
                      </h1>
                      <p className="text-xs text-slate-500 mt-0.5">Author: Vikram Roy (CTO) & Rajesh Varma (COO)</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">1. Purpose & Scope</h4>
                      <p>
                        This standard operating procedure mandates the calibration parameters, baud rate checks, and cloud verification protocols for all IoT telemetry hardware fitted to Ather and commercial EV units.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 text-sm">2. Step-by-Step Procedure</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-white border border-slate-200 rounded-xl">
                          <strong className="text-slate-900 font-bold block">Step 1: Physical Port & Wiring Inspection</strong>
                          <p className="text-slate-600 mt-0.5">Verify OBD-II harness locking pins and inspect the waterproof silicone boot for zero moisture ingress.</p>
                        </div>
                        <div className="p-3 bg-white border border-slate-200 rounded-xl">
                          <strong className="text-slate-900 font-bold block">Step 2: CAN-Bus 2.0B Baud Rate Sync</strong>
                          <p className="text-slate-600 mt-0.5">Connect diagnostic tablet and set CAN-bus transceiver to 500 kbps. Verify zero packet loss on node ID 0x18FF50E5.</p>
                        </div>
                        <div className="p-3 bg-white border border-slate-200 rounded-xl">
                          <strong className="text-slate-900 font-bold block">Step 3: BMS & GPS Telemetry Polling Verification</strong>
                          <p className="text-slate-600 mt-0.5">Confirm cellular MQTT ping delay is under 80ms and GPS coordinate resolution achieves 3D fix within 12 seconds.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>InnoVibe Technical SOP • Page 1 of 2</span>
                      <span className="font-bold text-slate-900">Signed: Quality Engineering Dept</span>
                    </div>
                  </div>
                )}

                {/* 3. 5kW BLDC Hub Motor Assembly Spec */}
                {selectedDocumentForView.name.includes('BLDC_Motor') && (
                  <div className="space-y-6 text-xs leading-relaxed text-slate-700">
                    <div>
                      <span className="text-[11px] font-black text-purple-600 uppercase tracking-widest block">ENGINEERING SPECIFICATION SHEET</span>
                      <h1 className="text-xl font-black text-slate-900 mt-1">
                        SPEC-ENG-5KW: 5kW BLDC Hub Motor Assembly & Torque Tolerances
                      </h1>
                      <p className="text-xs text-slate-500 mt-0.5">Author: Vikram Roy (CTO)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Rated Voltage</span>
                        <p className="font-bold text-slate-900 text-sm">72V DC (Nominal)</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Peak Torque</span>
                        <p className="font-bold text-slate-900 text-sm">140 Nm @ 450 RPM</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Continuous Power</span>
                        <p className="font-bold text-slate-900 text-sm">5,200 Watts</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Thermal Cutoff</span>
                        <p className="font-bold text-rose-600 text-sm">115°C (Sensor Cut)</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">Assembly Inspection Criteria</h4>
                      <p>
                        All stator coils must maintain insulation resistance &gt; 20 MΩ at 500V DC test. Axle nut tightening torque must be calibrated precisely to 95 Nm ± 2 Nm using a digital torque wrench.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>InnoVibe Engineering Spec • Page 1 of 4</span>
                      <span className="font-bold text-slate-900">Approved: Chief Technology Officer</span>
                    </div>
                  </div>
                )}

                {/* 4. Telemetry Validation Checklist (Spreadsheet View) */}
                {selectedDocumentForView.name.includes('Checklist') && (
                  <div className="space-y-6 text-xs leading-relaxed text-slate-700">
                    <div>
                      <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest block">OPERATIONAL VALIDATION SHEET</span>
                      <h1 className="text-xl font-black text-slate-900 mt-1">
                        Fleet Telemetry & BMS Quality Validation Checklist
                      </h1>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 font-bold text-slate-800 border-b border-slate-200">
                          <tr>
                            <th className="p-2.5">Test Item</th>
                            <th className="p-2.5">Parameter</th>
                            <th className="p-2.5">Target Spec</th>
                            <th className="p-2.5">Observed Value</th>
                            <th className="p-2.5 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="p-2.5 font-bold">BMS Delta</td>
                            <td className="p-2.5">Cell Voltage Spread</td>
                            <td className="p-2.5">&lt; 0.05 V</td>
                            <td className="p-2.5 font-mono">0.024 V</td>
                            <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">PASS</span></td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold">MQTT Latency</td>
                            <td className="p-2.5">Telemetry Cloud Push</td>
                            <td className="p-2.5">&lt; 150 ms</td>
                            <td className="p-2.5 font-mono">68 ms</td>
                            <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">PASS</span></td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold">Thermal Sensor</td>
                            <td className="p-2.5">Pack Temp Sensor 1-4</td>
                            <td className="p-2.5">25°C - 45°C</td>
                            <td className="p-2.5 font-mono">31.4°C</td>
                            <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">PASS</span></td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold">CAN Bus</td>
                            <td className="p-2.5">Error Frame Rate</td>
                            <td className="p-2.5">0.00%</td>
                            <td className="p-2.5 font-mono">0.00%</td>
                            <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">PASS</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>InnoVibe Quality Log • Page 1 of 1</span>
                      <span className="font-bold text-slate-900">Verified by Depot Lead</span>
                    </div>
                  </div>
                )}

                {/* 5. Generic Document Fallback */}
                {!selectedDocumentForView.name.includes('Strategic_Deck') &&
                 !selectedDocumentForView.name.includes('IoT_Gateway_Calibration') &&
                 !selectedDocumentForView.name.includes('BLDC_Motor') &&
                 !selectedDocumentForView.name.includes('Checklist') && (
                  <div className="space-y-6 text-xs leading-relaxed text-slate-700">
                    <div>
                      <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block">OFFICIAL ENTERPRISE DOCUMENT</span>
                      <h1 className="text-xl font-black text-slate-900 mt-1">
                        {selectedDocumentForView.name}
                      </h1>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Attached to: <strong>{selectedDocumentForView.taskTitle || 'Employee Operations Workspace'}</strong>
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">Document Overview & Verified Scope</h4>
                      <p>
                        This document is a certified compliance and operating asset stored within the InnoVibe Enterprise Cloud Vault. All instructions and technical guidelines contained herein are effective immediately.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 text-sm">Verified Metadata & Integrity</h4>
                      <div className="grid grid-cols-2 gap-3 p-3.5 bg-white border border-slate-200 rounded-xl font-mono text-[11px]">
                        <div>
                          <span className="text-slate-400 block font-sans">Document Checksum:</span>
                          <span className="text-slate-800 font-bold">SHA256: 8f94a2c0...e3b8</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans">Access Permission:</span>
                          <span className="text-emerald-600 font-bold font-sans">Granted (Employee Roster)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>InnoVibe Document Vault • Verified Copy</span>
                      <span className="font-bold text-slate-900">Electronic Verification Stamp</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-500 font-medium hidden sm:inline">
                Viewing <strong>{selectedDocumentForView.name}</strong> • Press Esc or Close to return
              </span>
              <button
                onClick={() => setSelectedDocumentForView(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition cursor-pointer ml-auto"
              >
                Close Document Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
