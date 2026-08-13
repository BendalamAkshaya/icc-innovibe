'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Wrench,
  MapPin,
  Phone,
  Navigation,
  Play,
  CheckSquare,
  Camera,
  Upload,
  Search,
  Bell,
  Sun,
  Clock,
  CreditCard,
  TrendingUp,
  User,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Database,
  Calendar,
  ChevronRight,
  CalendarRange,
  Award,
  GraduationCap,
  Volume2,
  ThumbsUp,
  Sliders,
  DollarSign,
  AlertCircle,
  Plus,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  MessageSquare,
  Zap,
  Info,
  Cloud
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRole } from '../../../components/RoleContext';
import { crossDashboardStore, LiveSpareRequest } from '../../../lib/cross-dashboard-store';

function TechnicianPortalContent() {
  const { currentProfile } = useRole();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTabParam = (searchParams.get('view') || 'dashboard') as any;
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  useEffect(() => {
    setActiveTab(activeTabParam);
  }, [activeTabParam]);

  const handleTabChange = (tabId: string) => {
    router.push(`/dashboard/technician?view=${tabId}`);
    setActiveTab(tabId);
  };
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);

  // Core Technician Portal States
  const [checkedIn, setCheckedIn] = useState(true);
  const [attendanceLog, setAttendanceLog] = useState([
    { date: '25 Jul 2026', checkIn: '08:30 AM', checkOut: '--:--', status: 'ACTIVE', hours: '8.2 hrs' },
    { date: '24 Jul 2026', checkIn: '08:15 AM', checkOut: '05:30 PM', status: 'PRESENT', hours: '9.25 hrs' },
    { date: '23 Jul 2026', checkIn: '08:20 AM', checkOut: '05:45 PM', status: 'PRESENT', hours: '9.4 hrs' },
    { date: '22 Jul 2026', checkIn: '08:30 AM', checkOut: '05:15 PM', status: 'PRESENT', hours: '8.75 hrs' },
    { date: '21 Jul 2026', checkIn: '08:05 AM', checkOut: '05:00 PM', status: 'PRESENT', hours: '8.9 hrs' },
  ]);

  // Active Job Workflow Step
  // 0: Idle/Assigned, 1: Accepted, 2: Navigating, 3: Arrived & Diagnosing, 4: Repairing & Checklist, 5: Uploading Photos, 6: Customer Signature, 7: Completed
  const [jobState, setJobState] = useState(0);
  const [activeJobId, setActiveJobId] = useState('BK-2026-0001');

  // Interactive Checklist
  const [checklist, setChecklist] = useState([
    { id: '1', label: 'Inspect battery casing for physical damage or swelling', checked: false, category: 'Battery' },
    { id: '2', label: 'Check connector pins for corrosion or carbon buildup', checked: false, category: 'Battery' },
    { id: '3', label: 'Measure cell voltage balance & resistance levels', checked: false, category: 'Battery' },
    { id: '4', label: 'Inspect front & rear brake pads wear thickness', checked: false, category: 'Brakes' },
    { id: '5', label: 'Verify brake fluid level & line pressure leak check', checked: false, category: 'Brakes' },
    { id: '6', label: 'Check tire tread depth & set pressure to 33 PSI', checked: false, category: 'Tires' },
    { id: '7', label: 'Verify main controller temperature sensor readings', checked: false, category: 'Controller' },
    { id: '8', label: 'Road test throttle response & regenerative braking', checked: false, category: 'Test' },
  ]);

  // Live Spare Parts Requests connected to CrossDashboardStore
  const [spareRequests, setSpareRequests] = useState<LiveSpareRequest[]>(() => crossDashboardStore.getSpareRequests());

  useEffect(() => {
    setSpareRequests(crossDashboardStore.getSpareRequests());
    const unsubscribe = crossDashboardStore.onSparesUpdated((spares) => {
      setSpareRequests(spares);
    });
    return () => unsubscribe();
  }, []);

  const [newPartName, setNewPartName] = useState('');
  const [newPartQty, setNewPartQty] = useState(1);
  const [newPartPriority, setNewPartPriority] = useState('HIGH');

  // Leave Requests
  const [leaveBalance, setLeaveBalance] = useState({ casual: 2.0, sick: 4.0, earned: 5.0, compOff: 1.0 });
  const [leaveHistory, setLeaveHistory] = useState([
    { type: 'Casual Leave', start: '10 Aug 2026', end: '11 Aug 2026', days: 2, status: 'PENDING', reason: 'Personal work' },
    { type: 'Sick Leave', start: '12 Jun 2026', end: '12 Jun 2026', days: 1, status: 'APPROVED', reason: 'Fever' }
  ]);
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  // Photos & Signature
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [photoUploadHistory, setPhotoUploadHistory] = useState<{ id: string; stage: string; vehicleTag: string; date: string; url: string }[]>([
    { id: 'PH-001', stage: 'Pre-Repair Inspections', vehicleTag: 'TS09 EA 1234 (Ather 450X)', date: '2026-07-25 10:30 AM', url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80' },
    { id: 'PH-002', stage: 'Diagnostics / Harness Cell', vehicleTag: 'AP39 BQ 9911 (Ola S1 Pro)', date: '2026-07-25 11:15 AM', url: 'https://images.unsplash.com/photo-1617886322168-72b88cecebb6?w=500&q=80' }
  ]);
  const [stagedUploads, setStagedUploads] = useState<string[]>([]);
  const [selectedVehicleForUpload, setSelectedVehicleForUpload] = useState<string>('');
  const [customerName, setCustomerName] = useState('Vikramaditya Rathore');
  const [isSigned, setIsSigned] = useState(false);
  const [signatureText, setSignatureText] = useState('');
  const [signatureHistory, setSignatureHistory] = useState<{ id: string; name: string; serviceId: string; timestamp: string; signature: string }[]>([]);

  const [showPayslipStub, setShowPayslipStub] = useState(false);

  // Service Completion Enterprise States
  const [completionData, setCompletionData] = useState({
    rootCause: 'Defective internal BMS sensor',
    workPerformed: 'Replaced BMS unit and recalibrated battery pack.',
    componentsChecked: 'Battery Pack, High Voltage Harness, Contactor',
    partsReplaced: 'INV-BMS-09X (1 Unit)',
    softwareUpdated: true,
    batteryHealth: '98%',
    finalCondition: 'Ready for delivery',
    finalRemarks: '',
    recommendations: 'Avoid deep discharging below 10% for optimal health.',
    nextService: '2027-01-25',
    additionalRepairs: 'None'
  });
  
  const [completionChecks, setCompletionChecks] = useState({
    workDone: false,
    vehicleTested: false,
    photosUploaded: false,
    signatureCollected: false,
    noPendingIssues: false
  });

  // Digital Service Work Order Management States
  const [jobCardsList, setJobCardsList] = useState<any[]>([
    {
      id: 'BK-2026-0001',
      ticketId: 'ST-9021',
      customerName: 'Vikramaditya Rathore',
      customerContact: '+91 90000 00001',
      customerEmail: 'vikram.rathore@outlook.com',
      vehicleModel: 'Ather 450X Apex',
      vehicleReg: 'AP39AB1234',
      vin: 'AT45XAP98239012389',
      odometer: 14204,
      complaintDesc: 'Swelled battery cells in Zone B, thermal warning alerts and slow charging cycles.',
      priority: 'Critical',
      assignedTech: 'Rahul Sharma',
      assignedHub: 'Kakinada Main Hub',
      scheduledTime: '2026-07-25T11:30:00',
      startedTime: '2026-07-25T11:45:00',
      completedTime: '',
      estDuration: '120 mins',
      actDuration: '80 mins',
      status: 'In Progress',
      vehicleBrand: 'Ather',
      complaintHistory: [
        { date: '12-May-2026', issue: 'Minor software glitch in touch dashboard', resolution: 'OTA software flash completed' },
        { date: '04-Feb-2026', issue: 'Side stand sensor intermittent fault', resolution: 'Sensor harness replaced' }
      ],
      aiDiagnosis: 'BMS logs indicate a cell temperature imbalance exceeding 12°C. Thermal sensor fault on Zone B cells. Recommended physical compression casing test.',
      techNotes: 'Confirmed physical casing pressure has elevated due to heat. Inspected zone-B connector pins.',
      repairsPerformed: 'BMS recalibrated. Harness terminal pins polished and tightened.',
      sparesUsed: [
        { name: 'BMS Connector Harness Pin Kit', qty: 1, cost: 450 },
        { name: 'Lithium Cell Thermal Gasket Pad', qty: 2, cost: 680 }
      ],
      consumablesUsed: [
        { name: 'Thermal Silicon Paste (HE-90)', qty: 1 },
        { name: 'Precision Contact Cleaner Spray', qty: 1 }
      ],
      checklist: [
        { task: 'Inspect battery casing for physical damage or swelling', checked: true },
        { task: 'Check connector pins for corrosion or carbon buildup', checked: true },
        { task: 'Perform OBD fault scanning & verify clear codes', checked: false },
        { task: 'Check cooling fan airflow and resistance', checked: false },
        { task: 'Verify cell balancing voltage thresholds', checked: false },
        { task: 'Perform road safety dynamic brake test', checked: false }
      ],
      photosBefore: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300'],
      photosAfter: [],
      customerSignature: 'Vikramaditya R.',
      techSignature: 'Rahul Sharma',
      qaApproval: { approved: false, inspector: 'Amit Kumar (QA)', timestamp: '' },
      warrantyInfo: '1 Year Warranty on Thermal Pads & Connectors',
      finalSummary: 'Pending full assembly and road test.',
      feedback: { rating: 0, review: '' }
    },
    {
      id: 'BK-2026-0002',
      ticketId: 'ST-9022',
      customerName: 'Amit Verma',
      customerContact: '+91 91111 22222',
      customerEmail: 'amit.verma@gmail.com',
      vehicleModel: 'Ola S1 Pro',
      vehicleReg: 'AP39BC4321',
      vin: 'OLAS1P983210382902',
      odometer: 8930,
      complaintDesc: 'BMS connector loose connection and minor display touch lag.',
      priority: 'High',
      assignedTech: 'Rahul Sharma',
      assignedHub: 'Kakinada Main Hub',
      scheduledTime: '2026-07-24T09:00:00',
      startedTime: '2026-07-24T09:10:00',
      completedTime: '2026-07-24T10:15:00',
      estDuration: '60 mins',
      actDuration: '65 mins',
      status: 'Completed',
      vehicleBrand: 'Ola',
      complaintHistory: [],
      aiDiagnosis: 'BMS warning logs resolved. Battery health status excellent.',
      techNotes: 'Loose terminal connection was tightened. Display software re-flashed.',
      repairsPerformed: 'Terminal pin tightening & display firmware OTA flash.',
      sparesUsed: [
        { name: 'BMS Interface Connector Clamp', qty: 1, cost: 250 }
      ],
      consumablesUsed: [
        { name: 'Contact Cleaner Spray', qty: 1 }
      ],
      checklist: [
        { task: 'Inspect battery casing for physical damage', checked: true },
        { task: 'Tighten all terminal pins', checked: true },
        { task: 'Check display touch responsiveness', checked: true }
      ],
      photosBefore: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300'],
      photosAfter: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300'],
      customerSignature: 'Amit Verma',
      techSignature: 'Rahul Sharma',
      qaApproval: { approved: true, inspector: 'Amit Kumar (QA)', timestamp: '24-Jul-2026' },
      warrantyInfo: '6 Months Warranty on Connector Clamp',
      finalSummary: 'Fully repaired. Road tested for 2km.',
      feedback: { rating: 5, review: 'Great fast service, very professional technician!' }
    },
    {
      id: 'BK-2026-0003',
      ticketId: 'ST-9023',
      customerName: 'Rajesh Kumar',
      customerContact: '+91 92222 33333',
      customerEmail: 'rajesh.k@yahoo.com',
      vehicleModel: 'TVS iQube',
      vehicleReg: 'AP39CD5678',
      vin: 'TVSQ98729013829038',
      odometer: 21400,
      complaintDesc: 'Brake cylinder fluid leak, front brake pressure low.',
      priority: 'High',
      assignedTech: 'S. Kumar',
      assignedHub: 'Kakinada Main Hub',
      scheduledTime: '2026-07-23T14:00:00',
      startedTime: '2026-07-23T14:15:00',
      completedTime: '2026-07-23T15:30:00',
      estDuration: '90 mins',
      actDuration: '75 mins',
      status: 'Completed',
      vehicleBrand: 'TVS',
      complaintHistory: [
        { date: '11-Jan-2026', issue: 'Rear brake shoe wear', resolution: 'Rear brake shoes replaced' }
      ],
      aiDiagnosis: 'Brake lever sensor logs show micro pressure drop over 20-day interval.',
      techNotes: 'Replaced front master cylinder piston and refilled fluid.',
      repairsPerformed: 'Master cylinder piston kit replacement & brake bleeding.',
      sparesUsed: [
        { name: 'Front Brake Master Cylinder Kit', qty: 1, cost: 1200 }
      ],
      consumablesUsed: [
        { name: 'DOT 4 Brake Fluid (250ml)', qty: 1 }
      ],
      checklist: [
        { task: 'Check master cylinder leak', checked: true },
        { task: 'Replace piston seals', checked: true },
        { task: 'Bleed brake line', checked: true },
        { task: 'Verify brake lever pressure', checked: true }
      ],
      photosBefore: [],
      photosAfter: [],
      customerSignature: 'R. Kumar',
      techSignature: 'S. Kumar',
      qaApproval: { approved: true, inspector: 'Amit Kumar (QA)', timestamp: '23-Jul-2026' },
      warrantyInfo: '1 Year Warranty on Master Cylinder Seals',
      finalSummary: 'Brakes working perfectly. Safety checks approved.',
      feedback: { rating: 4, review: 'Brakes feel very responsive now. Thanks.' }
    }
  ]);

  const [searchJobQuery, setSearchJobQuery] = useState('');
  const [filterJobStatus, setFilterJobStatus] = useState('All');
  const [filterJobPriority, setFilterJobPriority] = useState('All');
  const [filterJobDateRange, setFilterJobDateRange] = useState('All');
  const [filterJobTech, setFilterJobTech] = useState('All');
  const [filterJobHub, setFilterJobHub] = useState('All');
  const [filterJobBrand, setFilterJobBrand] = useState('All');

  const [selectedJobCard, setSelectedJobCard] = useState<any | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editingNotesText, setEditingNotesText] = useState('');
  const [editingRepairsText, setEditingRepairsText] = useState('');
  const [isInitializeJobCardOpen, setIsInitializeJobCardOpen] = useState(false);

  // Service Checklists SOP States
  const [sopChecklists, setSopChecklists] = useState<any[]>([
    {
      id: 'SOP-2026-BAT-01',
      name: 'High Voltage Battery Diagnostics',
      category: 'Battery System',
      vehicleModel: 'Ather 450X, Ola S1 Pro',
      estTime: '45 mins',
      priority: 'Critical',
      version: 'v2.4',
      assignedBy: 'Hub Manager (Arjun)',
      lastUpdated: '25-Jul-2026',
      status: 'Assigned',
      dueDate: '2026-07-26',
      progress: 0,
      tasks: [
        { id: 't1', desc: 'Verify high voltage isolation (min 500 ohms/volt)', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'Insulation Tester' },
        { id: 't2', desc: 'Inspect cooling fan operation and clear debris', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'Air Blow Gun' },
        { id: 't3', desc: 'Check terminal torque settings (Target: 8 Nm)', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'Torque Wrench' },
        { id: 't4', desc: 'Scan BMS for active cell imbalance codes', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'OBD Scanner' },
        { id: 't5', desc: 'Apply dielectric grease to main connectors', isMandatory: false, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'Dielectric Grease' },
      ],
      aiSuggestions: 'Ensure HV gloves (Class 0) are worn before starting step 1. Previous logs for this VIN show terminal corrosion history.',
      safetyWarnings: 'CRITICAL: Disable HV interlock before opening battery casing.',
      techSignature: '',
      completionTime: null
    },
    {
      id: 'SOP-2026-BRK-02',
      name: 'Hydraulic Brake Bleed & Pad Replacement',
      category: 'Brakes & Suspension',
      vehicleModel: 'All Models',
      estTime: '30 mins',
      priority: 'High',
      version: 'v1.8',
      assignedBy: 'System Auto-Assign',
      lastUpdated: '24-Jul-2026',
      status: 'In Progress',
      dueDate: '2026-07-25',
      progress: 40,
      tasks: [
        { id: 't1', desc: 'Measure front pad thickness (min 2mm)', isMandatory: true, status: 'Pass', remarks: '3.5mm measured', measurement: '3.5', photo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300', requiresTools: 'Vernier Caliper' },
        { id: 't2', desc: 'Check master cylinder fluid level & color', isMandatory: true, status: 'Pass', remarks: 'Fluid is dark, needs bleed.', measurement: '', photo: null, requiresTools: 'Visual' },
        { id: 't3', desc: 'Bleed hydraulic lines until fluid is clear', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'Bleed Kit, DOT 4 Fluid' },
        { id: 't4', desc: 'Torque caliper mounting bolts (Target: 22 Nm)', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'Torque Wrench' },
        { id: 't5', desc: 'Road test: Verify firm lever feel', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'None' },
      ],
      aiSuggestions: 'Use only DOT 4 brake fluid. Do not mix with DOT 3.',
      safetyWarnings: 'Brake fluid is corrosive to paint. Clean spills immediately.',
      techSignature: '',
      completionTime: null
    }
  ]);

  const [searchChecklistQuery, setSearchChecklistQuery] = useState('');
  const [filterChecklistStatus, setFilterChecklistStatus] = useState('All');
  const [filterChecklistPriority, setFilterChecklistPriority] = useState('All');
  const [filterChecklistCategory, setFilterChecklistCategory] = useState('All');
  
  const [selectedSop, setSelectedSop] = useState<any | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handlePrint = () => {
    const printContent = document.getElementById('printable-payslip');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Payslip_EMP-TECH-409_June_2026</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
              body {
                font-family: 'Inter', sans-serif;
                background-color: white;
                color: #1e293b;
                padding: 20px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                border: 1px solid #cbd5e1;
                padding: 4px 6px;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div style="max-width: 800px; margin: 0 auto;">
              \${printContent.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Helper Toast Alert
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleChecklist = (id: string) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddSpareRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartName) {
      showToast('Please specify spare part name', 'warning');
      return;
    }
    const created = crossDashboardStore.addSpareRequest({
      part: newPartName,
      qty: newPartQty,
      priority: newPartPriority as any,
      technicianName: currentProfile?.name || 'Rahul Sharma (Senior EV Tech)',
      jobId: activeJobId || 'BK-2026-0001',
      vehicleModel: 'Ather 450X Apex',
      depotLocation: 'Bengaluru Central Hub',
    });
    setNewPartName('');
    setNewPartQty(1);
    showToast(`Requisition ${created.id} submitted! Synced live to COO Procurement Queue.`, 'success');
  };

  const handleAddLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStartDate || !leaveEndDate || !leaveReason) {
      showToast('Please fill all leave fields', 'warning');
      return;
    }
    const days = Math.max(1, Math.round((new Date(leaveEndDate).getTime() - new Date(leaveStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1);
    const newLeave = {
      type: leaveType,
      start: leaveStartDate,
      end: leaveEndDate,
      days,
      status: 'PENDING',
      reason: leaveReason
    };
    setLeaveHistory([newLeave, ...leaveHistory]);
    setLeaveStartDate('');
    setLeaveEndDate('');
    setLeaveReason('');
    showToast('Leave request submitted to reporting manager.', 'success');
  };

  const handleCheckInToggle = () => {
    if (checkedIn) {
      setCheckedIn(false);
      showToast('Checked-out successfully. Work hours recorded.', 'info');
      setAttendanceLog(
        attendanceLog.map((log, index) =>
          index === 0 ? { ...log, checkOut: '05:45 PM', status: 'PRESENT' } : log
        )
      );
    } else {
      setCheckedIn(true);
      showToast('Checked-in successfully. Live GPS active.', 'success');
      const newLog = {
        date: 'Today',
        checkIn: '08:30 AM',
        checkOut: '--:--',
        status: 'ACTIVE',
        hours: '0.0 hrs'
      };
      setAttendanceLog([newLog, ...attendanceLog]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 text-left font-sans">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border transition-all animate-in slide-in-from-top duration-300 ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          toast.type === 'warning' ? 'bg-amber-50 text-amber-800 border-amber-200' :
          toast.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' :
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          {toast.type === 'error' || toast.type === 'warning' ? <AlertTriangle className="h-4 w-4 shrink-0" /> : toast.type === 'info' ? <Info className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs mb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Wrench className="h-5 w-5" />
            </div>
            <h1 className="font-black text-xl text-slate-900 tracking-tight">Technician Hub</h1>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto">
            {/* Quick GPS Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className={`h-2.5 w-2.5 rounded-full ${checkedIn ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
              <span className="text-[11px] font-bold text-slate-700">
                {checkedIn ? 'GPS Active (Online)' : 'Offline (Checked Out)'}
              </span>
            </div>

            {/* Quick check-in/out */}
            <button
              onClick={handleCheckInToggle}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all shadow-xs shrink-0 ${
                checkedIn
                  ? 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {checkedIn ? 'Check Out' : 'Check In'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Top KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Today's Assigned Jobs", value: '3 Jobs', trend: 'Next: 11:30 AM', color: 'text-blue-600', icon: Wrench },
                { label: 'Pending Jobs', value: '2 Pending', trend: 'In Queue', color: 'text-rose-600', icon: AlertCircle },
                { label: 'Completed Jobs', value: '1 Completed', trend: '66% remaining', color: 'text-emerald-600', icon: CheckCircle2 },
                { label: 'Performance Score', value: '94.8 / 100', trend: 'Top 5% Tier', color: 'text-amber-500', icon: Award },
                { label: 'Shift Attendance', value: checkedIn ? '8.2 hrs' : '0.0 hrs', trend: '98.5% Compliance', color: 'text-purple-600', icon: Clock },
                { label: 'Leave Balance', value: '14.0 Days', trend: 'Available Time-Off', color: 'text-sky-600', icon: CalendarRange },
                { label: 'Monthly Salary (June)', value: '₹48,200', trend: 'Credited on 01-Jul', color: 'text-indigo-600', icon: CreditCard },
                { label: 'Incentives (Month)', value: '₹3,500', trend: 'Rating bonus included', color: 'text-emerald-500', icon: DollarSign },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-2 hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
                      <Icon className={`h-5 w-5 ${kpi.color}`} />
                    </div>
                    <p className="text-xl font-extrabold text-slate-900 tracking-tight">{kpi.value}</p>
                    <p className="text-[10px] text-slate-500 font-semibold">{kpi.trend}</p>
                  </div>
                );
              })}
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Active Job details, map, checklists & diagnostics */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Route Map & Customer Contact Widget */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Active Route Map & Customer Contact</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Live routing from Kakinada Hub to active diagnostics zone</p>
                    </div>
                    <span className="text-[10px] bg-sky-50 text-sky-700 font-bold px-2.5 py-0.5 rounded-full border border-sky-200">
                      Active: 2.4 km from Hub
                    </span>
                  </div>

                  {/* Simulated Google Map Widget */}
                  <div className="h-64 bg-slate-100 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-sky-50 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                    <div className="absolute top-1/3 left-1/4 h-24 w-1 bg-slate-300 transform -rotate-45" />
                    <div className="absolute top-1/2 left-1/3 h-32 w-1.5 bg-blue-100 transform rotate-12" />
                    
                    {/* Hub Marker */}
                    <div className="absolute top-12 left-24 bg-blue-600 text-white rounded-full p-1.5 shadow-md flex items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="absolute top-16 left-28 bg-blue-900 text-white text-[8px] font-bold px-1 py-0.5 rounded">Hub 1</span>

                    {/* Customer Marker */}
                    <div className="absolute bottom-16 right-36 bg-rose-600 text-white rounded-full p-1.5 shadow-md flex items-center justify-center animate-bounce">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="absolute bottom-24 right-20 bg-rose-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Vikramaditya (Active)</span>

                    {/* Navigation overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-left shadow-lg">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Estimated Travel</p>
                        <p className="text-xs font-black text-slate-800">8 mins (1.8 km) via Bypass Rd</p>
                      </div>
                      <button 
                        onClick={() => {
                          handleTabChange('assigned-jobs');
                          if (jobState === 0) setJobState(1);
                          showToast('Navigation routes optimized successfully.', 'info');
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-lg transition-all flex items-center gap-1.5"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        <span>Start Navigation</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Contact Panel */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Customer Name & Contact</p>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">Vikramaditya Rathore</h4>
                      <p className="text-xs text-slate-500 font-medium font-mono">BK-2026-0001 • Srinivasa Nagar, Hub 1</p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="tel:+919000000001"
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-2 text-xs font-bold shadow-xs"
                      >
                        <Phone className="h-4 w-4 text-emerald-600" />
                        <span>Call Customer (+91 90000 00001)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Vehicle Details & EV Diagnosis Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Vehicle Details */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="h-4 w-4 text-sky-600" />
                      <span>Vehicle Details</span>
                    </h3>
                    <div className="space-y-3 font-medium text-xs text-slate-600">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Model:</span>
                        <strong className="text-slate-800">Ather 450X Apex</strong>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Registration No:</span>
                        <strong className="text-slate-800 font-mono">AP39AB1234</strong>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Battery SoH:</span>
                        <span className="text-emerald-700 font-extrabold">96.4% (Nominal)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Odometer:</span>
                        <strong className="text-slate-800 font-mono">14,204 km</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Fault Description:</span>
                        <span className="text-rose-700 font-extrabold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                          Battery Casing Error
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* EV Diagnosis Widget */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Database className="h-4 w-4 text-blue-600" />
                      <span>EV Telematics & Diagnosis</span>
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">OBD Connection</p>
                          <p className="text-xs font-black text-emerald-600 mt-1 flex items-center justify-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            ACTIVE
                          </p>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Pack Temp</p>
                          <p className="text-xs font-black text-slate-800 mt-1">38.2°C</p>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">State of Charge</p>
                          <p className="text-xs font-black text-blue-600 mt-1">82% SoC</p>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Cell Delta</p>
                          <p className="text-xs font-black text-slate-800 mt-1">0.02V Delta</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTabChange('diagnose-reports')}
                        className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Full Diagnostics Workbench</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Service Checklist Preview */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <CheckSquare className="h-4 text-emerald-600" />
                      <span>Active Service Checklist Preview</span>
                    </h3>
                    <span className="text-[10px] font-bold text-slate-500">2 of 6 Checked</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 1, label: 'Inspect battery casing for physical damage or swelling', checked: true },
                      { id: 2, label: 'Check connector pins for corrosion or carbon buildup', checked: true },
                      { id: 3, label: 'Perform OBD fault scanning & verify clear codes', checked: false },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                        <div className={`h-5 w-5 rounded-md flex items-center justify-center ${item.checked ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white'}`}>
                          {item.checked && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>
                        <span className={`text-xs font-semibold ${item.checked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleTabChange('checklists')}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Edit Service Checklist</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

              </div>

              {/* Right Column: Attendance Calendar, Salary & Incentives Breakup */}
              <div className="space-y-6">
                
                {/* Attendance Shift Control & logs */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Attendance & Shifts</h3>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${
                      checkedIn ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {checkedIn ? 'ON-SHIFT' : 'OFF-SHIFT'}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                    <Clock className={`h-10 w-10 mx-auto ${checkedIn ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-900">
                        {checkedIn ? 'Shift Timer Active' : 'Shift Inactive'}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {checkedIn ? 'Time elapsed: 8h 12m' : 'Required shift hours: 8.5 hrs'}
                      </p>
                    </div>
                    <button
                      onClick={handleCheckInToggle}
                      className={`w-full py-2.5 rounded-xl font-extrabold text-xs shadow-xs transition-all ${
                        checkedIn ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {checkedIn ? 'Clock Out (End Shift)' : 'Clock In (Start Shift)'}
                    </button>
                  </div>

                  {/* Calendar Heatmap */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">July Attendance Compliance</p>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 31 }).map((_, idx) => {
                        const present = idx < 25;
                        const today = idx === 24;
                        return (
                          <div
                            key={idx}
                            className={`aspect-square rounded-md flex items-center justify-center text-[8px] font-bold ${
                              today ? 'bg-blue-600 text-white ring-2 ring-blue-500/30' :
                              present ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              'bg-slate-100 text-slate-400'
                            }`}
                            title={`July ${idx + 1}`}
                          >
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Salary, Incentives, and Leave Breakout */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Salary & Leave registry</h3>
                  
                  <div className="space-y-3 font-semibold text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex justify-between text-slate-500 text-[10px] uppercase font-bold">
                        <span>June Payout Summary</span>
                        <span className="text-emerald-700">PAID</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-slate-600 font-medium">Base Salary:</span>
                        <span className="text-slate-900 font-bold">₹24,000</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-slate-600 font-medium">House Rent Allowance:</span>
                        <span className="text-slate-900 font-bold">₹9,600</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-slate-600 font-medium">Performance Incentives:</span>
                        <span className="text-emerald-700 font-bold">+₹3,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-800 font-extrabold">Net Payout:</span>
                        <span className="text-blue-700 font-black font-mono">₹37,100</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowPayslipStub(true)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <FileText className="h-4 w-4" />
                      <span>View & Print Payslip</span>
                    </button>
                  </div>

                  {/* Leave Quick balances */}
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Leave Balance Summary</p>
                      <button 
                        onClick={() => handleTabChange('leaves')}
                        className="text-[10px] font-extrabold text-blue-600 hover:underline"
                      >
                        Apply Leave
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-blue-50/50 border border-blue-100 rounded-lg">
                        <p className="text-[8px] font-bold text-blue-700 uppercase">Casual</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">4.0</p>
                      </div>
                      <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                        <p className="text-[8px] font-bold text-emerald-700 uppercase">Sick</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">2.0</p>
                      </div>
                      <div className="p-2 bg-purple-50/50 border border-purple-100 rounded-lg">
                        <p className="text-[8px] font-bold text-purple-700 uppercase">Earned</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">8.0</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

              {/* TAB 2: MY PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Profile Completion Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Technician Profile Registry</h2>
                <p className="text-xs text-slate-500 font-medium">Verify your official credential records and active field status.</p>
              </div>
              <div className="flex items-center gap-4 min-w-[240px]">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                    <span>Profile Completion</span>
                    <span className="text-blue-600">95% Complete</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center text-blue-700 text-xs font-black">
                  95%
                </div>
              </div>
            </div>

            {/* Profile Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Basic Profile & Quick Actions */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* 1. Basic Profile Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                      alt="Rahul Sharma"
                      className="h-24 w-24 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900">Rahul Sharma</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">Senior EV Diagnostics Technician</p>
                  </div>

                  <div className="w-full border-t border-slate-100 pt-4 space-y-2.5 text-xs text-left font-medium text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Employee ID:</span>
                      <strong className="text-slate-800 font-mono">EMP-TECH-409</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Employee Status:</span>
                      <span className="text-[9px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">
                        ACTIVE
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Technician Level:</span>
                      <span className="text-[9px] font-black bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full uppercase">
                        L3 Specialist
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <strong className="text-slate-800">Operations & Fleet</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hub Name:</span>
                      <strong className="text-slate-800">Kakinada Main Hub</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Station Name:</span>
                      <strong className="text-slate-800">Station #4</strong>
                    </div>
                  </div>
                </div>

                {/* 8. Quick Actions Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Actions</h4>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <button 
                      onClick={() => showToast('Profile editing is disabled in this demo.', 'warning')}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-extrabold transition-all flex items-center justify-center gap-2"
                    >
                      <Sliders className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button 
                      onClick={() => showToast('Password reset link sent to official email.', 'success')}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-extrabold transition-all flex items-center justify-center gap-2"
                    >
                      <Sliders className="h-4 w-4" />
                      <span>Change Password</span>
                    </button>
                    <button 
                      onClick={() => showToast('ID Card PDF download started.', 'info')}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-extrabold transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download Employee ID Card</span>
                    </button>
                    <a 
                      href="mailto:sm@innovibemobility.com"
                      className="w-full py-2.5 bg-blue-550 hover:bg-blue-600 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Supervisor</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Information Cards */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 2. Contact Information */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <span>Contact Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Mobile Number</p>
                      <p className="text-xs font-bold text-slate-800 mt-1 font-mono">+91 98888 88888</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Official Email</p>
                      <p className="text-xs font-bold text-slate-800 mt-1 font-mono">tech@innovibemobility.com</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Personal Email</p>
                      <p className="text-xs font-bold text-slate-800 mt-1 font-mono">rahul.sharma@gmail.com</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl md:col-span-2">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Residential Address</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">D.No: 12-4-5, Subhash Nagar, Bypass Road</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">City</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Kakinada</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">State / PIN Code</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Andhra Pradesh - 533003</p>
                    </div>
                  </div>
                </div>

                {/* 3. Personal Information */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <User className="h-4 w-4 text-indigo-600" />
                    <span>Personal Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Date of Birth</p>
                      <p className="text-xs font-bold text-slate-800 mt-1 font-mono">15-Aug-1994</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Gender / Blood Group</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Male / B+ Positive</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Nationality / Marital Status</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Indian / Married</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Emergency Contact Name</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Priya Sharma</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Emergency Contact Number</p>
                      <p className="text-xs font-bold text-slate-800 mt-1 font-mono">+91 97777 77777</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Relationship</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Spouse</p>
                    </div>
                  </div>
                </div>

                {/* 4. Professional Information */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-emerald-600" />
                    <span>Professional Registry</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Joining Date</p>
                      <p className="text-xs font-bold text-slate-800 mt-1 font-mono">12-Jul-2024</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Reporting Manager</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Vikram Singh (Service Manager)</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Employment Type / Shift</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Full-Time / General Day Shift</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Work Region / Experience</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Kakinada Hub Zone / 5.5 Years</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl md:col-span-2">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Primary Skillsets</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Lithium-ion Pack Diagnostics, CAN Bus Telematics Analysis, HV Inverter Fault Rectification, BMS Calibration</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl md:col-span-2">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Languages Known</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Telugu (Native), English (Professional), Hindi (Conversational)</p>
                    </div>
                  </div>
                </div>

                {/* 5. Certifications Overview */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>Certifications Summary</span>
                    </h3>
                    <button 
                      onClick={() => handleTabChange('training')}
                      className="text-xs font-extrabold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>View All Certifications</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold">
                          <th className="py-2.5 px-4">Certification Name</th>
                          <th className="py-2.5 px-4">Level</th>
                          <th className="py-2.5 px-4">Valid Until</th>
                          <th className="py-2.5 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {[
                          { name: 'HV Safety Operations Protocol', level: 'Level 3', valid: '31-Dec-2027', status: 'ACTIVE', color: 'bg-emerald-50 text-emerald-800 border border-emerald-200' },
                          { name: 'BMS Advanced Calibration Specialist', level: 'Level 2', valid: '15-Aug-2026', status: 'EXPIRING SOON', color: 'bg-amber-50 text-amber-800 border border-amber-200' },
                          { name: 'Lithium Pack Repair Specialist', level: 'Level 1', valid: '30-Jun-2025', status: 'EXPIRED', color: 'bg-rose-50 text-rose-800 border border-rose-200' },
                        ].map((c, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-bold text-slate-800">{c.name}</td>
                            <td className="py-3 px-4">{c.level}</td>
                            <td className="py-3 px-4 font-mono">{c.valid}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${c.color}`}>
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 6. Assigned Service Location */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-600" />
                    <span>Assigned Service Location</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Current Hub Location</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Kakinada Main Hub (Zone 1)</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Current Station Placement</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Station #4 (EV Battery Desk)</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Assigned Service Region</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">East Godavari Fleet District</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">GPS Tracking Status</p>
                      <p className="text-xs font-black text-emerald-600 mt-1 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>ONLINE (Live Feeds Active)</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. Assigned Safety Equipment Summary */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Assigned Safety Equipment (Summary)</span>
                    </h3>
                    <button 
                      onClick={() => handleTabChange('inventory')}
                      className="text-xs font-extrabold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>View Assets</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs font-semibold text-slate-700">
                    {[
                      { item: 'HV Gloves', status: 'Assigned', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
                      { item: 'Safety Helmet', status: 'Assigned', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
                      { item: 'Safety Goggles', status: 'Assigned', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
                      { item: 'OBD Scanner', status: 'Assigned', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
                      { item: 'Digital Multimeter', status: 'Assigned', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
                    ].map((asset, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <p className="text-[10px] font-bold text-slate-800">{asset.item}</p>
                        <span className={`inline-block text-[8px] font-black px-1.5 py-0.5 rounded uppercase border ${asset.badge}`}>
                          {asset.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Timecard & Attendance Tracking</h2>
                <p className="text-xs text-slate-500 mt-1">Live time log tracking and GPS geo-fencing validation.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500">Shift status:</span>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                  checkedIn ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {checkedIn ? 'Active shift' : 'Logged out'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6 text-center bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <Clock className={`h-16 w-16 mx-auto ${checkedIn ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {checkedIn ? 'Shift Timer Active' : 'Start Your Working Shift'}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {checkedIn ? 'Time elapsed: 8h 12m' : 'Required shift hours: 8.5 hrs'}
                  </p>
                </div>
                <button
                  onClick={handleCheckInToggle}
                  className={`w-full py-3 rounded-2xl font-extrabold text-xs shadow-lg transition-all ${
                    checkedIn ? 'bg-rose-600 text-white shadow-rose-500/20' : 'bg-emerald-600 text-white shadow-emerald-500/20 hover:bg-emerald-700'
                  }`}
                >
                  {checkedIn ? 'End Shift (Clock Out)' : 'Start Shift (Clock In)'}
                </button>
              </div>
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Attendance Logs</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold">
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4">Check In</th>
                        <th className="py-2.5 px-4">Check Out</th>
                        <th className="py-2.5 px-4">Shift Hours</th>
                        <th className="py-2.5 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {attendanceLog.map((log, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-bold text-slate-800">{log.date}</td>
                          <td className="py-3 px-4">{log.checkIn}</td>
                          <td className="py-3 px-4">{log.checkOut}</td>
                          <td className="py-3 px-4">{log.hours}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                              log.status === 'ACTIVE' ? 'bg-blue-50 text-blue-800 border border-blue-200 animate-pulse' :
                              log.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEAVE REQUESTS */}
        {activeTab === 'leaves' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Time Off & Leave Balance</h2>
              <p className="text-xs text-slate-500 mt-1">Submit time-off requests and track approval balances.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Casual Leaves', val: leaveBalance.casual, color: 'border-blue-200 text-blue-800 bg-blue-50/50' },
                { label: 'Sick Leaves', val: leaveBalance.sick, color: 'border-emerald-200 text-emerald-800 bg-emerald-50/50' },
                { label: 'Earned Leaves', val: leaveBalance.earned, color: 'border-purple-200 text-purple-800 bg-purple-50/50' },
                { label: 'Comp Off balance', val: leaveBalance.compOff, color: 'border-slate-200 text-slate-800 bg-slate-50/50' },
              ].map((b, idx) => (
                <div key={idx} className={`border p-4 rounded-xl text-center space-y-1 ${b.color}`}>
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-75">{b.label}</p>
                  <p className="text-2xl font-black">{b.val.toFixed(1)}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form onSubmit={handleAddLeave} className="lg:col-span-5 space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Apply Leave</h3>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Leave Category</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500 font-bold"
                  >
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                    <option value="Comp Off Leave">Comp Off Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Start Date</label>
                    <input
                      type="date"
                      required
                      value={leaveStartDate}
                      onChange={(e) => setLeaveStartDate(e.target.value)}
                      className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">End Date</label>
                    <input
                      type="date"
                      required
                      value={leaveEndDate}
                      onChange={(e) => setLeaveEndDate(e.target.value)}
                      className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Reason for Leave</label>
                  <textarea
                    required
                    rows={2}
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium resize-none"
                    placeholder="Provide short explanation..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Submit Time Off Request</span>
                </button>
              </form>
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Leave Status History</h3>
                <div className="space-y-2">
                  {leaveHistory.map((leave, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-semibold">{leave.start} to {leave.end}</span>
                        <h4 className="text-xs font-bold text-slate-800">{leave.type} ({leave.days} days)</h4>
                        <p className="text-[10px] text-slate-500">Reason: {leave.reason}</p>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                        leave.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        leave.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {leave.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ASSIGNED JOBS */}
        {activeTab === 'assigned-jobs' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">Active Work Job Card</h2>
                  <span className="text-[9px] font-black bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full uppercase">
                    Ather 450X Apex
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Customer: <strong className="text-slate-700">{customerName}</strong> • VIN: <span className="font-mono">INNO450X2026001</span>
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
                <span className={jobState >= 1 ? 'text-blue-600' : ''}>Accept</span>
                <ChevronRight className="h-3 w-3" />
                <span className={jobState >= 2 ? 'text-blue-600' : ''}>Navigate</span>
                <ChevronRight className="h-3 w-3" />
                <span className={jobState >= 3 ? 'text-blue-600' : ''}>Diagnose</span>
                <ChevronRight className="h-3 w-3" />
                <span className={jobState >= 4 ? 'text-blue-600' : ''}>Repair</span>
                <ChevronRight className="h-3 w-3" />
                <span className={jobState >= 7 ? 'text-emerald-600' : ''}>Done</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                {jobState === 0 && (
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 text-center">
                    <Wrench className="h-12 w-12 text-slate-300 mx-auto" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-900">Job Card Pending Initialization</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Please review the assigned customer address and accept the job card to initiate travel routes and field service check sheets.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setJobState(1);
                        showToast('Job card accepted. Start navigation.', 'success');
                      }}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all"
                    >
                      Accept Job Assignment
                    </button>
                  </div>
                )}

                {jobState === 1 && (
                  <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 space-y-4 text-left">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                        <Navigation className="h-5 w-5 animate-pulse" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-extrabold text-slate-900">Traveling to Customer Location</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Srinivasa Nagar Road, Kakinada (opposite IT Park Main Gate).
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setJobState(2);
                          showToast('Arrived at customer location. Initializing telemetry EV diagnostics.', 'success');
                        }}
                        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all"
                      >
                        Mark Arrived at Site
                      </button>
                      <a
                        href="tel:+919000000001"
                        className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 text-xs font-bold"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Call Customer</span>
                      </a>
                    </div>
                  </div>
                )}

                {jobState >= 2 && jobState < 7 && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4.5 w-4.5 text-blue-600" />
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">EV Diagnostic Status</h4>
                        </div>
                        <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded">
                          FAULT: ERR_BATT_THERMAL_99
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className="bg-white border border-slate-200 p-3 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Battery Temp</p>
                          <p className="text-sm font-black text-rose-600 font-mono mt-1">54.5°C</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-3 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">State of Charge</p>
                          <p className="text-sm font-black text-slate-800 font-mono mt-1">94%</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-3 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">SOH (Capacity)</p>
                          <p className="text-sm font-black text-emerald-600 font-mono mt-1">96.8%</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-3 rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Controller Status</p>
                          <p className="text-sm font-black text-slate-800 font-mono mt-1">OPTIMAL</p>
                        </div>
                      </div>
                      <div className="bg-rose-50 border border-rose-100 rounded-xl p-3.5 text-xs text-rose-900 leading-relaxed font-semibold">
                        <strong>AI Diagnosis Recommendation:</strong> Swelled battery cells detected in Zone B. Perform physical casing compression inspection, execute cell resistance balancing, and replace the BMS harness connector pin array.
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckSquare className="h-4 w-4 text-blue-600" />
                          <span>Service Execution Checklist</span>
                        </h4>
                        <span className="text-xs text-slate-500 font-semibold">
                          {checklist.filter((c) => c.checked).length} / {checklist.length} Completed
                        </span>
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {checklist.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleToggleChecklist(item.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              item.checked ? 'bg-blue-50/45 border-blue-500 font-bold text-slate-800' : 'bg-slate-50/50 border-slate-200 text-slate-500'
                            }`}
                          >
                            <span className="text-xs">{item.label}</span>
                            <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 ${
                              item.checked ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                            }`}>
                              {item.checked && <CheckCircle2 className="h-4.5 w-4.5 text-white" />}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Need missing spare parts to complete repair?</p>
                        <button
                          onClick={() => handleTabChange('spares')}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all border border-slate-200"
                        >
                          Request Parts
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Camera className="h-4.5 w-4.5 text-blue-600" />
                        <span>Work Order Photo Uploads</span>
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="aspect-square bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all gap-1.5"
                          onClick={() => {
                            setUploadedPhotos(['/mock-photo-1.jpg', ...uploadedPhotos]);
                            showToast('Before-service photo tagged & cached.', 'success');
                          }}
                        >
                          <Camera className="h-5 w-5 text-slate-400" />
                          <span className="text-[9px] font-black text-slate-500 uppercase">Add Before</span>
                        </div>
                        <div className="aspect-square bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all gap-1.5"
                          onClick={() => {
                            setUploadedPhotos(['/mock-photo-2.jpg', ...uploadedPhotos]);
                            showToast('During-service photo tagged & cached.', 'success');
                          }}
                        >
                          <Sliders className="h-5 w-5 text-slate-400" />
                          <span className="text-[9px] font-black text-slate-500 uppercase">Add During</span>
                        </div>
                        <div className="aspect-square bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all gap-1.5"
                          onClick={() => {
                            setUploadedPhotos(['/mock-photo-3.jpg', ...uploadedPhotos]);
                            showToast('After-service photo tagged & cached.', 'success');
                          }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-slate-400" />
                          <span className="text-[9px] font-black text-slate-500 uppercase">Add After</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="h-4.5 w-4.5 text-blue-600" />
                        <span>Customer Digital Signature</span>
                      </h4>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Enter Customer Signatory Name</label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
                        />
                        <div className="h-32 bg-slate-50 border border-slate-200 rounded-xl relative flex items-center justify-center cursor-crosshair">
                          {isSigned ? (
                            <span className="font-serif italic text-lg text-blue-900 select-none font-extrabold">{signatureText}</span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold uppercase select-none">Draw or Type signature below</span>
                          )}
                          <div className="absolute bottom-2 right-2 flex gap-1.5">
                            <button
                              onClick={() => {
                                setIsSigned(true);
                                setSignatureText(customerName);
                                showToast('Digital signature verified.', 'success');
                              }}
                              className="px-3 py-1 bg-blue-600 text-white font-extrabold text-[9px] rounded-lg transition-all"
                            >
                              Sign Now
                            </button>
                            <button
                              onClick={() => {
                                setIsSigned(false);
                                setSignatureText('');
                              }}
                              className="px-3 py-1 bg-white border border-slate-200 text-slate-650 font-extrabold text-[9px] rounded-lg transition-all"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setJobState(7);
                          showToast('Job card completed & telemetry synced.', 'success');
                        }}
                        disabled={!isSigned || checklist.filter(c => c.checked).length < 4}
                        className={`w-full py-3 rounded-2xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 ${
                          isSigned && checklist.filter(c => c.checked).length >= 4
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        <CheckCircle2 className="h-4.5 w-4.5" />
                        <span>Complete Service & Sync to Server</span>
                      </button>
                    </div>
                  </div>
                )}

                {jobState === 7 && (
                  <div className="bg-emerald-50/50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
                    <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-base font-black text-slate-900">Job Card Successfully Closed</h3>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        All check items, photos, and digital signatures have been uploaded and synced to the InnoVibe Command Center.
                      </p>
                    </div>
                    <div className="pt-4 flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setJobState(0);
                          showToast('Next job loaded.', 'info');
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all"
                      >
                        Load Next Assigned Job
                      </button>
                      <button
                        onClick={() => {
                          showToast('Downloading service report PDF...', 'info');
                        }}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1.5"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Download Report</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-left">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Contact & Address</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Customer Name</p>
                      <p className="text-sm font-extrabold text-slate-900">{customerName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Contact</p>
                      <p className="text-xs font-mono font-semibold text-slate-700">+91 9000000001</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Service Address</p>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        Survey No. 12, Block C, Srinivasa IT Nagar, Kakinada, Andhra Pradesh - 533005
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a
                      href="https://wa.me/919000000001"
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center text-xs font-black flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="tel:+919000000001"
                      className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-center text-xs font-black flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call Client</span>
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-left">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Ticket SLA Clock</h3>
                  <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
                      <span className="text-xs font-bold text-slate-700">Time Remaining</span>
                    </div>
                    <span className="text-xs font-mono font-black text-rose-600">32 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SERVICE SCHEDULE */}
        {activeTab === 'service-schedule' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Weekly Service Dispatch Schedule</h2>
              <p className="text-xs text-slate-500 mt-1">Calendar schedule of customer maintenance appointments.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['Mon 20 Jul', 'Tue 21 Jul', 'Wed 22 Jul', 'Thu 23 Jul', 'Fri 24 Jul', 'Sat 25 Jul (Today)', 'Sun 26 Jul'].map((day, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${idx === 5 ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-slate-50/50'} text-left space-y-2`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{day}</p>
                  <div className="space-y-1">
                    {idx === 5 ? (
                      <>
                        <div className="bg-blue-600 text-white p-2 rounded-lg text-[9px] font-bold shadow-xs">
                          11:30 AM - Vikramaditya
                        </div>
                        <div className="bg-slate-200 text-slate-700 p-2 rounded-lg text-[9px] font-bold">
                          03:00 PM - Rajesh K.
                        </div>
                      </>
                    ) : idx < 5 ? (
                      <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 p-2 rounded-lg text-[9px] font-bold">
                        3 Jobs Completed
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-400 font-medium italic">No scheduled dispatches</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: JOB CARDS */}
        {activeTab === 'job-cards' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header Section */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Digital Service Work Orders (Job Cards)</h2>
                <p className="text-xs text-slate-500 mt-1">Create, execute, and inspect vehicle job cards, OBD telematics logs, and parts registry.</p>
              </div>
              <button
                onClick={() => setIsInitializeJobCardOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Initialize Job Card</span>
              </button>
            </div>

            {/* Dashboard Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Total Job Cards', value: jobCardsList.length, sub: 'All registered', color: 'text-slate-800', bg: 'bg-slate-50 border-slate-200' },
                { label: 'Open Jobs', value: jobCardsList.filter(j => j.status !== 'Completed' && j.status !== 'Cancelled').length, sub: 'Active queue', color: 'text-blue-600', bg: 'bg-blue-50/50 border-blue-100' },
                { label: 'Completed Jobs', value: jobCardsList.filter(j => j.status === 'Completed').length, sub: 'Archived work', color: 'text-emerald-600', bg: 'bg-emerald-50/50 border-emerald-100' },
                { label: 'Pending QA Approval', value: jobCardsList.filter(j => !j.qaApproval.approved && j.status === 'Completed').length, sub: 'Inspection required', color: 'text-amber-600', bg: 'bg-amber-50/50 border-amber-100' },
                { label: 'Avg Completion Time', value: '42 mins', sub: 'Hub SLA Target: 50m', color: 'text-purple-600', bg: 'bg-purple-50/50 border-purple-100' }
              ].map((m, idx) => (
                <div key={idx} className={`p-4 border rounded-2xl ${m.bg} space-y-1`}>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</p>
                  <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                  <p className="text-[9px] text-slate-500 font-semibold">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Search & Filters Registry */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Search query */}
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    value={searchJobQuery}
                    onChange={(e) => setSearchJobQuery(e.target.value)}
                    placeholder="Search by Job ID, Customer, Vehicle Model, VIN, Plate..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 bg-white"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={filterJobStatus}
                    onChange={(e) => setFilterJobStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none bg-white text-slate-700"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Accepted">Accepted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting for Parts">Waiting for Parts</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <select
                    value={filterJobPriority}
                    onChange={(e) => setFilterJobPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none bg-white text-slate-700"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

              </div>

              {/* Advanced Collapsible Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-slate-200 pt-4 text-xs font-bold text-slate-600">
                
                {/* Tech Filter */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase">Technician</span>
                  <select
                    value={filterJobTech}
                    onChange={(e) => setFilterJobTech(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="All">All Techs</option>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="S. Kumar">S. Kumar</option>
                  </select>
                </div>

                {/* Hub Filter */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase">Service Hub</span>
                  <select
                    value={filterJobHub}
                    onChange={(e) => setFilterJobHub(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="All">All Hubs</option>
                    <option value="Kakinada Main Hub">Kakinada Main Hub</option>
                  </select>
                </div>

                {/* Brand Filter */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase">Vehicle Brand</span>
                  <select
                    value={filterJobBrand}
                    onChange={(e) => setFilterJobBrand(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="All">All Brands</option>
                    <option value="Ather">Ather</option>
                    <option value="Ola">Ola</option>
                    <option value="TVS">TVS</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchJobQuery('');
                      setFilterJobStatus('All');
                      setFilterJobPriority('All');
                      setFilterJobTech('All');
                      setFilterJobHub('All');
                      setFilterJobBrand('All');
                      showToast('Search filters reset.', 'info');
                    }}
                    className="w-full py-1.5 border border-dashed border-slate-300 hover:border-slate-400 text-slate-500 rounded-lg transition-all text-center"
                  >
                    Clear Filter Registry
                  </button>
                </div>

              </div>
            </div>

            {/* Job Cards Work Order Queue */}
            <div className="space-y-4">
              {jobCardsList
                .filter((job) => {
                  const matchQuery =
                    job.id.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                    job.customerName.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                    job.vehicleModel.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                    job.vin.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                    job.vehicleReg.toLowerCase().includes(searchJobQuery.toLowerCase());
                  const matchStatus = filterJobStatus === 'All' || job.status === filterJobStatus;
                  const matchPriority = filterJobPriority === 'All' || job.priority === filterJobPriority;
                  const matchTech = filterJobTech === 'All' || job.assignedTech === filterJobTech;
                  const matchHub = filterJobHub === 'All' || job.assignedHub === filterJobHub;
                  const matchBrand = filterJobBrand === 'All' || job.vehicleBrand === filterJobBrand;
                  return matchQuery && matchStatus && matchPriority && matchTech && matchHub && matchBrand;
                })
                .map((job) => {
                  let priorityColor = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (job.priority === 'Critical') priorityColor = 'bg-rose-100 text-rose-800 border-rose-200';
                  if (job.priority === 'High') priorityColor = 'bg-amber-100 text-amber-800 border-amber-200';
                  if (job.priority === 'Medium') priorityColor = 'bg-blue-100 text-blue-800 border-blue-200';

                  let statusColor = 'bg-slate-100 text-slate-600 border-slate-200';
                  if (job.status === 'Completed') statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  if (job.status === 'In Progress') statusColor = 'bg-amber-50 text-amber-800 border-amber-200';
                  if (job.status === 'Accepted') statusColor = 'bg-blue-50 text-blue-800 border-blue-200';
                  if (job.status === 'Waiting for Parts') statusColor = 'bg-purple-50 text-purple-800 border-purple-200';

                  return (
                    <div key={job.id} className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-slate-350 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                      
                      {/* Left: Info Blocks */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">{job.id} • Ticket: {job.ticketId}</span>
                          <span className={`text-[8px] font-black px-2.5 py-0.5 rounded border uppercase ${priorityColor}`}>
                            {job.priority} Priority
                          </span>
                          <span className={`text-[8px] font-black px-2.5 py-0.5 rounded border uppercase ${statusColor}`}>
                            {job.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-slate-900">{job.customerName}</h4>
                          <p className="text-xs text-slate-500 font-semibold">{job.vehicleModel} ({job.vehicleReg}) • VIN: <span className="font-mono text-slate-700">{job.vin}</span></p>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium flex-wrap border-t border-slate-100 pt-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span>Sched: {new Date(job.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div>
                            <span>Odometer: <strong className="text-slate-700 font-mono">{job.odometer.toLocaleString()} km</strong></span>
                          </div>
                          <div>
                            <span>Est: <strong className="text-slate-700">{job.estDuration}</strong></span>
                          </div>
                          <div>
                            <span>Tech: <strong className="text-slate-700">{job.assignedTech}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex md:flex-col gap-2 shrink-0 justify-end">
                        <button
                          onClick={() => {
                            setSelectedJobCard(job);
                            setEditingNotesText(job.techNotes || '');
                            setEditingRepairsText(job.repairsPerformed || '');
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <FileText className="h-4 w-4" />
                          <span>View Job Card</span>
                        </button>
                        <button
                          onClick={() => {
                            // Continue job workflow
                            if (job.status === 'Assigned') {
                              job.status = 'Accepted';
                              showToast(`Job ${job.id} Accepted.`, 'info');
                            } else if (job.status === 'Accepted') {
                              job.status = 'In Progress';
                              showToast(`Job ${job.id} is now In Progress.`, 'success');
                            } else {
                              showToast(`Job ${job.id} is already ${job.status}`, 'info');
                            }
                            setJobCardsList([...jobCardsList]);
                          }}
                          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                        >
                          <Play className="h-4 w-4 text-blue-600" />
                          <span>Continue Job</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
            </div>

            {/* JOB CARD DETAIL MODAL OVERLAY */}
            {selectedJobCard && (
              <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white border border-slate-200 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8 animate-in zoom-in-95 duration-200 max-h-[85vh] text-left">
                  
                  {/* Modal Header */}
                  <div className="p-6 bg-blue-600 border-b border-blue-700 flex items-center justify-between text-white">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-white/20 px-2 py-0.5 rounded tracking-widest uppercase">
                          {selectedJobCard.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">
                          Ticket: {selectedJobCard.ticketId}
                        </span>
                      </div>
                      <h3 className="text-base font-black tracking-tight">{selectedJobCard.customerName} • {selectedJobCard.vehicleModel}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedJobCard(null)}
                      className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-all"
                      title="Close Modal"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Modal Body (Scrollable) */}
                  <div className="p-6 overflow-y-auto space-y-6 flex-1">
                    
                    {/* Work Order Timeline Progress */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Service Execution Progress Timeline</p>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-2">
                        {[
                          { step: 'Assigned', active: true },
                          { step: 'Accepted', active: ['Accepted', 'In Progress', 'Waiting for Parts', 'On Hold', 'Completed'].includes(selectedJobCard.status) },
                          { step: 'Diagnosis', active: ['In Progress', 'Waiting for Parts', 'On Hold', 'Completed'].includes(selectedJobCard.status) },
                          { step: 'Repair', active: ['In Progress', 'Waiting for Parts', 'On Hold', 'Completed'].includes(selectedJobCard.status) },
                          { step: 'Testing', active: ['Completed'].includes(selectedJobCard.status) },
                          { step: 'Customer Approval', active: ['Completed'].includes(selectedJobCard.status) },
                          { step: 'Completed', active: selectedJobCard.status === 'Completed' }
                        ].map((node, index) => (
                          <React.Fragment key={index}>
                            <div className="flex items-center gap-2">
                              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                                node.active ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                              }`}>
                                {index + 1}
                              </div>
                              <span className={`text-xs font-bold ${node.active ? 'text-slate-800' : 'text-slate-400'}`}>
                                {node.step}
                              </span>
                            </div>
                            {index < 6 && (
                              <div className={`hidden md:block flex-1 h-0.5 ${node.active ? 'bg-blue-600' : 'bg-slate-200'}`} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left Panel (8/12) */}
                      <div className="lg:col-span-8 space-y-6">
                        
                        {/* Vehicle & Customer Info Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Vehicle Details */}
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 font-semibold text-xs text-slate-600">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Vehicle Information</h4>
                            <div className="flex justify-between border-b border-slate-200 pb-1.5">
                              <span>Brand/Model:</span>
                              <strong className="text-slate-800">{selectedJobCard.vehicleBrand} • {selectedJobCard.vehicleModel}</strong>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1.5">
                              <span>Registration Number:</span>
                              <strong className="text-slate-800 font-mono">{selectedJobCard.vehicleReg}</strong>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1.5">
                              <span>VIN:</span>
                              <strong className="text-slate-800 font-mono text-[10px]">{selectedJobCard.vin}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Odometer Reading:</span>
                              <strong className="text-slate-800 font-mono">{selectedJobCard.odometer.toLocaleString()} km</strong>
                            </div>
                          </div>

                          {/* Customer Details */}
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 font-semibold text-xs text-slate-600">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Customer Contact Profile</h4>
                            <div className="flex justify-between border-b border-slate-200 pb-1.5">
                              <span>Full Name:</span>
                              <strong className="text-slate-800">{selectedJobCard.customerName}</strong>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1.5">
                              <span>Mobile Link:</span>
                              <a href={`tel:${selectedJobCard.customerContact}`} className="text-blue-600 underline font-mono">{selectedJobCard.customerContact}</a>
                            </div>
                            <div className="flex justify-between">
                              <span>Email Address:</span>
                              <strong className="text-slate-800 font-mono">{selectedJobCard.customerEmail}</strong>
                            </div>
                          </div>

                        </div>

                        {/* Complaint History & AI Diagnosis */}
                        <div className="space-y-4">
                          
                          {/* Complaint History */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Complaint Description & History</h4>
                            <div className="p-3 bg-red-50/50 border border-red-200 rounded-xl text-xs text-slate-700 leading-relaxed font-semibold">
                              <p className="text-red-900 font-black uppercase text-[9px] mb-1">Active Ticket Complaint</p>
                              {selectedJobCard.complaintDesc}
                            </div>
                            {selectedJobCard.complaintHistory.length > 0 && (
                              <div className="space-y-2 pt-2">
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Previous Hub Service History</p>
                                {selectedJobCard.complaintHistory.map((hist: any, hidx: number) => (
                                  <div key={hidx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between gap-4">
                                    <div>
                                      <strong className="text-slate-700">{hist.issue}</strong>
                                      <p className="text-[10px] text-slate-400 mt-0.5">Resolution: {hist.resolution}</p>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-500 shrink-0 font-mono">{hist.date}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* AI Diagnostics Summary */}
                          <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 space-y-2">
                            <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">AI Diagnosis Recommendations</h4>
                            <p className="text-xs text-blue-800 font-semibold leading-relaxed">
                              {selectedJobCard.aiDiagnosis}
                            </p>
                          </div>

                        </div>

                        {/* Technician Diagnosis Notes & Repairs */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Technician Diagnosis & Action Notes</h4>
                          
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Diagnosis Notes</label>
                            <textarea
                              value={editingNotesText}
                              onChange={(e) => setEditingNotesText(e.target.value)}
                              placeholder="Describe structural casing anomalies, cell voltage imbalances, connector corrosion details..."
                              className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 bg-slate-50"
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Repair Actions Performed</label>
                            <textarea
                              value={editingRepairsText}
                              onChange={(e) => setEditingRepairsText(e.target.value)}
                              placeholder="Describe exact repairs performed (e.g. rebalanced cell terminals, replaced BMS pins...)"
                              className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 bg-slate-50"
                              rows={3}
                            />
                          </div>

                          <button
                            onClick={() => {
                              selectedJobCard.techNotes = editingNotesText;
                              selectedJobCard.repairsPerformed = editingRepairsText;
                              setJobCardsList([...jobCardsList]);
                              showToast('Diagnosis and repair notes saved successfully.', 'success');
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all"
                          >
                            Save Diagnostic Notes
                          </button>
                        </div>

                        {/* Inspection Checklist */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Inspection Task Checklist</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            {selectedJobCard.checklist.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  item.checked = !item.checked;
                                  setJobCardsList([...jobCardsList]);
                                }}
                                className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                                  item.checked ? 'bg-blue-50/50 border-blue-400 font-bold text-slate-800' : 'bg-slate-50/50 border-slate-200 text-slate-500'
                                }`}
                              >
                                <span>{item.task}</span>
                                <div className={`h-4 w-4 rounded flex items-center justify-center shrink-0 border ${
                                  item.checked ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                                }`}>
                                  {item.checked && <CheckCircle2 className="h-3 w-3" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Spare Parts & Consumables used */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Spare Parts & Consumables Registry</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Spares */}
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Spare Parts Used</p>
                              {selectedJobCard.sparesUsed.length === 0 ? (
                                <p className="text-xs text-slate-500 font-medium italic">No spare parts recorded.</p>
                              ) : (
                                <div className="space-y-1.5 text-xs">
                                  {selectedJobCard.sparesUsed.map((p: any, pidx: number) => (
                                    <div key={pidx} className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex justify-between font-semibold text-slate-700">
                                      <span>{p.name} (x{p.qty})</span>
                                      <span className="font-mono text-slate-800">₹{p.cost * p.qty}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Consumables */}
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Consumables Used</p>
                              {selectedJobCard.consumablesUsed.length === 0 ? (
                                <p className="text-xs text-slate-500 font-medium italic">No consumables recorded.</p>
                              ) : (
                                <div className="space-y-1.5 text-xs">
                                  {selectedJobCard.consumablesUsed.map((c: any, cidx: number) => (
                                    <div key={cidx} className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex justify-between font-semibold text-slate-700">
                                      <span>{c.name}</span>
                                      <span className="text-[10px] text-slate-400 uppercase">Qty: {c.qty}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                          </div>
                        </div>

                      </div>

                      {/* Right Panel (4/12) */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* Service Photo Upload (Before / After) */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Before / After Service Photos</h4>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center space-y-2 bg-slate-50/50">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Before Service</p>
                              {selectedJobCard.photosBefore.length > 0 ? (
                                <img src={selectedJobCard.photosBefore[0]} alt="Before" className="h-20 w-full object-cover rounded-lg border border-slate-200" />
                              ) : (
                                <div className="h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">No Image</div>
                              )}
                              <button
                                onClick={() => {
                                  selectedJobCard.photosBefore = ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300'];
                                  setJobCardsList([...jobCardsList]);
                                  showToast('Before photo uploaded.', 'info');
                                }}
                                className="w-full py-1 bg-white border border-slate-200 text-[10px] font-bold rounded hover:bg-slate-50"
                              >
                                Upload Photo
                              </button>
                            </div>

                            <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center space-y-2 bg-slate-50/50">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">After Service</p>
                              {selectedJobCard.photosAfter.length > 0 ? (
                                <img src={selectedJobCard.photosAfter[0]} alt="After" className="h-20 w-full object-cover rounded-lg border border-slate-200" />
                              ) : (
                                <div className="h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">No Image</div>
                              )}
                              <button
                                onClick={() => {
                                  selectedJobCard.photosAfter = ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300'];
                                  setJobCardsList([...jobCardsList]);
                                  showToast('After photo uploaded.', 'info');
                                }}
                                className="w-full py-1 bg-white border border-slate-200 text-[10px] font-bold rounded hover:bg-slate-50"
                              >
                                Upload Photo
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Signatures & QA Details */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Signatures & Quality Assurance</h4>
                          
                          <div className="space-y-3 font-semibold text-xs text-slate-600">
                            
                            {/* Customer Sign */}
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Customer E-Signature</p>
                              {selectedJobCard.customerSignature ? (
                                <p className="font-serif italic text-slate-800 text-sm font-bold border-b border-dashed border-slate-400 pb-1">{selectedJobCard.customerSignature}</p>
                              ) : (
                                <button
                                  onClick={() => {
                                    selectedJobCard.customerSignature = selectedJobCard.customerName;
                                    setJobCardsList([...jobCardsList]);
                                    showToast('Customer signature recorded.', 'success');
                                  }}
                                  className="w-full py-1.5 bg-blue-600 text-white font-extrabold text-[10px] rounded"
                                >
                                  Capture Signature
                                </button>
                              )}
                            </div>

                            {/* Tech Sign */}
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Technician E-Signature</p>
                              <p className="font-serif italic text-slate-800 text-sm font-bold border-b border-dashed border-slate-400 pb-1">{selectedJobCard.techSignature}</p>
                            </div>

                            {/* QA Approval */}
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">QA Inspection Approval</p>
                              <div className="flex justify-between items-center mt-1">
                                <span>Inspector: <strong className="text-slate-800">{selectedJobCard.qaApproval.inspector}</strong></span>
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                                  selectedJobCard.qaApproval.approved ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                                }`}>
                                  {selectedJobCard.qaApproval.approved ? 'APPROVED' : 'PENDING'}
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Warranty & Final Summary */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Warranty & final summary</h4>
                          
                          <div className="space-y-2 text-xs font-semibold text-slate-600">
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Warranty Coverage</p>
                              <p className="text-xs font-bold text-slate-800 mt-1">{selectedJobCard.warrantyInfo}</p>
                            </div>
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Final Service Summary</p>
                              <p className="text-xs font-bold text-slate-800 mt-1">{selectedJobCard.finalSummary || 'Not finalized yet.'}</p>
                            </div>
                            {selectedJobCard.feedback.rating > 0 && (
                              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl">
                                <p className="text-[9px] font-bold text-emerald-800 uppercase">Customer Feedback</p>
                                <p className="text-xs font-black text-amber-500 mt-1">{'★'.repeat(selectedJobCard.feedback.rating)}</p>
                                <p className="text-[11px] text-slate-600 mt-0.5 italic">"{selectedJobCard.feedback.review}"</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quick Actions Panel */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Job Card Quick Actions</p>
                          <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
                            <button
                              onClick={() => {
                                const printable = window.open('', '_blank');
                                if (printable) {
                                  printable.document.write(`
                                    <html>
                                      <head>
                                        <title>Job_Card_${selectedJobCard.id}</title>
                                        <script src="https://cdn.tailwindcss.com"></script>
                                      </head>
                                      <body class="p-8 bg-white text-slate-800 font-sans" onload="window.print(); window.close();">
                                        <div class="max-w-3xl mx-auto border p-6 rounded-2xl">
                                          <h2 class="text-xl font-bold border-b pb-2 mb-4">${selectedJobCard.id} Service Report</h2>
                                          <p>Customer: ${selectedJobCard.customerName}</p>
                                          <p>Vehicle: ${selectedJobCard.vehicleModel} (${selectedJobCard.vehicleReg})</p>
                                          <p>Odometer: ${selectedJobCard.odometer} km</p>
                                          <p class="mt-4 font-semibold">Complaint: ${selectedJobCard.complaintDesc}</p>
                                          <p class="mt-2 font-semibold">Diagnosis: ${selectedJobCard.techNotes}</p>
                                          <p class="mt-2 font-semibold">Repairs: ${selectedJobCard.repairsPerformed}</p>
                                        </div>
                                      </body>
                                    </html>
                                  `);
                                  printable.document.close();
                                }
                              }}
                              className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl"
                            >
                              Print Job Card
                            </button>
                            <button
                              onClick={() => {
                                showToast(`PDF copy of ${selectedJobCard.id} generated.`, 'success');
                              }}
                              className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl"
                            >
                              Generate PDF
                            </button>
                            <button
                              onClick={() => {
                                showToast(`Report link shared to ${selectedJobCard.customerEmail}`, 'success');
                              }}
                              className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl"
                            >
                              Share Report
                            </button>
                            <button
                              onClick={() => {
                                if (selectedJobCard.status !== 'Completed') {
                                  selectedJobCard.status = 'Completed';
                                  selectedJobCard.completedTime = new Date().toISOString();
                                  selectedJobCard.finalSummary = 'All repairs complete. Checklist items verified, OBD fault codes successfully cleared.';
                                  selectedJobCard.qaApproval.approved = true;
                                  selectedJobCard.feedback = { rating: 5, review: 'Excellent repair job!' };
                                  setJobCardsList([...jobCardsList]);
                                  showToast(`Job ${selectedJobCard.id} marked as COMPLETED.`, 'success');
                                } else {
                                  showToast(`Job is already completed.`, 'info');
                                }
                              }}
                              className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                            >
                              Complete Work
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 8: VEHICLE INSPECTION */}
        {activeTab === 'inspection' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Vehicle Physical & Casing Inspection</h2>
              <p className="text-xs text-slate-500 mt-1">Execute physical checks for chassis damage, tire indicators, and frame alignments.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 border-r border-slate-200 pr-0 md:pr-6">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Physical Structural Parameters</h3>
                {[
                  { label: 'Check chassis frame misalignment', desc: 'Verify main chassis tubes structure alignment.' },
                  { label: 'Inspect tire tread wear & sidewalls', desc: 'Ensure tread depth is higher than 1.6 mm.' },
                  { label: 'Brake cylinder fluid levels test', desc: 'Confirm master cylinder is free of leakage.' },
                  { label: 'Verify OBD telemetry communication link', desc: 'Ensure diagnostic link connector functions properly.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" defaultChecked={idx < 2} />
                    </div>
                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Inspection Photo Upload</h3>
                <div className="h-48 border-2 border-dashed border-slate-350 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer gap-2"
                  onClick={() => showToast('Camera triggered. Photo captured.', 'success')}
                >
                  <Camera className="h-8 w-8 text-slate-400" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-800">Add physical inspection photos</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Pre-repair casing details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: EV DIAGNOSIS REPORTS */}
        {activeTab === 'diagnosis' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">EV Diagnostics & BMS Telemetry Analyzer</h2>
              <p className="text-xs text-slate-500 mt-1">Real-time telematics parameters, battery thermal status, and error logs.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">Thermal Zone Monitoring</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                  {['Zone A: 38.5°C', 'Zone B: 54.5°C', 'Zone C: 37.0°C', 'Zone D: 39.2°C'].map((zone, idx) => (
                    <div key={idx} className={`p-3 border rounded-xl ${idx === 1 ? 'bg-rose-50 border-rose-200 text-rose-800 font-extrabold animate-pulse' : 'bg-white border-slate-200 text-slate-600'}`}>
                      {zone}
                    </div>
                  ))}
                </div>
                <div className="h-32 bg-slate-100 border border-slate-250 rounded-xl relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-rose-50 to-emerald-100 opacity-60" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider relative z-10">BMS Thermal Heatmap Live Feed</span>
                </div>
              </div>
              <div className="space-y-4 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">Error Codes Registry</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-rose-50 border border-rose-100 text-rose-900 rounded-xl text-xs font-medium space-y-1">
                    <p className="font-extrabold text-[10px] uppercase font-mono">ERR_BATT_THERMAL_99</p>
                    <p className="text-[10px] text-rose-700">Zone B cells temp exceeded threshold of 50°C. BMS safety trip protocol activated.</p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-xl text-xs font-medium space-y-1">
                    <p className="font-extrabold text-[10px] uppercase font-mono">OBD_COMM_OK</p>
                    <p className="text-[10px] text-emerald-700">CAN Bus telematics communication link online.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: SERVICE CHECKLISTS (SOP Execution System) */}
        {activeTab === 'checklists' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header Section */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Standard Operating Procedures (SOP)</h2>
                <p className="text-xs text-slate-500 mt-1">Execute, monitor, and submit structured service checklists and diagnostic guidelines.</p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>Assign New Checklist</span>
              </button>
            </div>

            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Assigned Checklists', value: sopChecklists.length, sub: 'Total active', color: 'text-slate-800', bg: 'bg-slate-50 border-slate-200' },
                { label: 'In Progress', value: sopChecklists.filter(c => c.status === 'In Progress').length, sub: 'Currently executing', color: 'text-blue-600', bg: 'bg-blue-50/50 border-blue-100' },
                { label: 'Completed Today', value: sopChecklists.filter(c => c.status === 'Submitted').length, sub: 'Fully submitted', color: 'text-emerald-600', bg: 'bg-emerald-50/50 border-emerald-100' },
                { label: 'Pending Submission', value: sopChecklists.filter(c => c.progress === 100 && c.status !== 'Submitted').length, sub: 'Needs signature', color: 'text-amber-600', bg: 'bg-amber-50/50 border-amber-100' },
                { label: 'Overdue', value: 0, sub: 'Past due date', color: 'text-rose-600', bg: 'bg-rose-50/50 border-rose-100' }
              ].map((m, idx) => (
                <div key={idx} className={`p-4 border rounded-2xl ${m.bg} space-y-1 text-left`}>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</p>
                  <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                  <p className="text-[9px] text-slate-500 font-semibold">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Search & Filters Registry */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Search */}
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    value={searchChecklistQuery}
                    onChange={(e) => setSearchChecklistQuery(e.target.value)}
                    placeholder="Search checklists by Name, ID, or Vehicle..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 bg-white"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={filterChecklistStatus}
                    onChange={(e) => setFilterChecklistStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none bg-white text-slate-700"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Submitted">Submitted</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <select
                    value={filterChecklistPriority}
                    onChange={(e) => setFilterChecklistPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none bg-white text-slate-700"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

              </div>
            </div>

            {/* SOP Checklist List Queue */}
            <div className="space-y-4">
              {sopChecklists
                .filter(c => {
                  const q = searchChecklistQuery.toLowerCase();
                  const matchQ = c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.vehicleModel.toLowerCase().includes(q);
                  const matchS = filterChecklistStatus === 'All' || c.status === filterChecklistStatus;
                  const matchP = filterChecklistPriority === 'All' || c.priority === filterChecklistPriority;
                  return matchQ && matchS && matchP;
                })
                .map((sop) => {
                  let priorityColor = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (sop.priority === 'Critical') priorityColor = 'bg-rose-100 text-rose-800 border-rose-200';
                  if (sop.priority === 'High') priorityColor = 'bg-amber-100 text-amber-800 border-amber-200';
                  
                  let statusColor = 'bg-slate-100 text-slate-600 border-slate-200';
                  if (sop.status === 'Submitted') statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  if (sop.status === 'In Progress') statusColor = 'bg-blue-50 text-blue-800 border-blue-200';
                  if (sop.status === 'Completed') statusColor = 'bg-amber-50 text-amber-800 border-amber-200';

                  return (
                    <div key={sop.id} className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-slate-350 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">{sop.id}</span>
                          <span className={`text-[8px] font-black px-2.5 py-0.5 rounded border uppercase ${priorityColor}`}>{sop.priority} Priority</span>
                          <span className={`text-[8px] font-black px-2.5 py-0.5 rounded border uppercase ${statusColor}`}>{sop.status}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900">{sop.name}</h4>
                          <p className="text-xs text-slate-500 font-semibold">{sop.category} • {sop.vehicleModel}</p>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="pt-2 max-w-sm">
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                            <span>SOP Progress</span>
                            <span>{sop.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${sop.progress}%` }} />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium flex-wrap pt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span>Est: {sop.estTime}</span>
                          </div>
                          <div>
                            <span>Updated: <strong className="text-slate-700">{sop.lastUpdated}</strong></span>
                          </div>
                          <div>
                            <span>Version: <strong className="text-slate-700 font-mono">{sop.version}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedSop(sop)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <Play className="h-4 w-4" />
                          <span>{sop.status === 'Assigned' ? 'Start SOP' : 'Resume SOP'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* SOP EXECUTION MODAL OVERLAY */}
            {selectedSop && (
              <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white border border-slate-200 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8 animate-in zoom-in-95 duration-200 max-h-[85vh] text-left">
                  
                  {/* Modal Header */}
                  <div className="p-6 bg-blue-600 border-b border-blue-700 flex items-center justify-between text-white">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-white/20 px-2 py-0.5 rounded tracking-widest uppercase">
                          {selectedSop.id}
                        </span>
                        <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded">
                          Version {selectedSop.version}
                        </span>
                      </div>
                      <h3 className="text-base font-black tracking-tight">{selectedSop.name}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedSop(null)}
                      className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-all"
                      title="Close Modal"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6 overflow-y-auto space-y-6 flex-1">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left side: Metadata & Warnings */}
                      <div className="lg:col-span-4 space-y-4">
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 font-semibold text-xs text-slate-600">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">SOP Overview</h4>
                          <div className="flex justify-between border-b border-slate-200 pb-1.5">
                            <span>Service Category:</span>
                            <strong className="text-slate-800">{selectedSop.category}</strong>
                          </div>
                          <div className="flex justify-between border-b border-slate-200 pb-1.5">
                            <span>Compatibility:</span>
                            <strong className="text-slate-800">{selectedSop.vehicleModel}</strong>
                          </div>
                          <div className="flex justify-between border-b border-slate-200 pb-1.5">
                            <span>Priority:</span>
                            <strong className="text-slate-800">{selectedSop.priority}</strong>
                          </div>
                          <div className="flex justify-between border-b border-slate-200 pb-1.5">
                            <span>Assigned By:</span>
                            <strong className="text-slate-800">{selectedSop.assignedBy}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Est. Completion:</span>
                            <strong className="text-slate-800">{selectedSop.estTime}</strong>
                          </div>
                        </div>

                        {selectedSop.safetyWarnings && (
                          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
                            <div className="flex items-center gap-1.5 text-rose-800">
                              <AlertTriangle className="h-4 w-4" />
                              <h4 className="text-xs font-black uppercase tracking-wider">Safety Warning</h4>
                            </div>
                            <p className="text-xs text-rose-700 font-semibold leading-relaxed">
                              {selectedSop.safetyWarnings}
                            </p>
                          </div>
                        )}

                        {selectedSop.aiSuggestions && (
                          <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 space-y-2">
                            <div className="flex items-center gap-1.5 text-blue-800">
                              <ShieldCheck className="h-4 w-4" />
                              <h4 className="text-xs font-black uppercase tracking-wider">AI Validation Note</h4>
                            </div>
                            <p className="text-xs text-blue-800 font-semibold leading-relaxed">
                              {selectedSop.aiSuggestions}
                            </p>
                          </div>
                        )}

                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Execution Controls</h4>
                          <button onClick={() => showToast('Auto-saving progress...', 'info')} className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl transition-all">Save Draft Progress</button>
                          <button onClick={() => showToast('Printing SOP Checksheet...', 'info')} className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl transition-all">Print Checksheet</button>
                        </div>
                      </div>

                      {/* Right side: Interactive Checklist */}
                      <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Step-by-step Inspection Tasks</h4>
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded">Auto-saving enabled</span>
                        </div>

                        <div className="space-y-4">
                          {selectedSop.tasks.map((task: any, tidx: number) => {
                            const isPass = task.status === 'Pass';
                            const isFail = task.status === 'Fail';
                            const isNA = task.status === 'N/A';
                            
                            return (
                              <div key={tidx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4 transition-all">
                                
                                {/* Task Header */}
                                <div className="flex items-start justify-between gap-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <div className="h-6 w-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-[10px] font-black">{tidx + 1}</div>
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${task.isMandatory ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                        {task.isMandatory ? 'Mandatory Step' : 'Optional Step'}
                                      </span>
                                    </div>
                                    <h5 className="text-sm font-bold text-slate-800 pt-1 leading-snug">{task.desc}</h5>
                                    {task.requiresTools && <p className="text-[10px] text-slate-500 font-semibold pt-1">Required: <span className="text-slate-700">{task.requiresTools}</span></p>}
                                  </div>
                                </div>

                                {/* Task Inputs & Selectors */}
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  
                                  {/* Left col: Status Select & Measurement */}
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => {
                                          task.status = 'Pass'; 
                                          setSopChecklists([...sopChecklists]);
                                        }}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${isPass ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}>Pass</button>
                                      <button 
                                        onClick={() => {
                                          task.status = 'Fail'; 
                                          setSopChecklists([...sopChecklists]);
                                        }}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${isFail ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}>Fail</button>
                                      <button 
                                        onClick={() => {
                                          task.status = 'N/A'; 
                                          setSopChecklists([...sopChecklists]);
                                        }}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${isNA ? 'bg-slate-600 text-white border-slate-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}>N/A</button>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <input 
                                        type="text" 
                                        placeholder="Add value (e.g. 12.4V, 35 PSI)..." 
                                        value={task.measurement}
                                        onChange={(e) => {
                                          task.measurement = e.target.value;
                                          setSopChecklists([...sopChecklists]);
                                        }}
                                        className="w-full px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg outline-none bg-white focus:border-blue-500" 
                                      />
                                    </div>
                                  </div>

                                  {/* Right col: Remarks & Media */}
                                  <div className="space-y-3">
                                    <input 
                                      type="text" 
                                      placeholder="Technician remarks or notes..." 
                                      value={task.remarks}
                                      onChange={(e) => {
                                        task.remarks = e.target.value;
                                        setSopChecklists([...sopChecklists]);
                                      }}
                                      className="w-full px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg outline-none bg-white focus:border-blue-500" 
                                    />
                                    <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => {
                                          task.photo = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300';
                                          setSopChecklists([...sopChecklists]);
                                          showToast('Proof photo attached successfully.', 'success');
                                        }}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${task.photo ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                      >
                                        <Camera className="h-3.5 w-3.5" />
                                        <span>{task.photo ? 'Photo Attached' : 'Attach Proof'}</span>
                                      </button>
                                      <button 
                                        onClick={() => showToast('Voice note recording started...', 'info')}
                                        className="w-8 h-8 flex items-center justify-center shrink-0 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 transition-all"
                                      >
                                        <Volume2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                </div>

                              </div>
                            );
                          })}
                        </div>

                        {/* Submission & E-Signature */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 mt-6">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Final Verification & Submission</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Technician E-Signature</p>
                              {selectedSop.techSignature ? (
                                <p className="font-serif italic text-slate-800 text-sm font-bold border-b border-dashed border-slate-400 pb-1">{selectedSop.techSignature}</p>
                              ) : (
                                <button
                                  onClick={() => {
                                    selectedSop.techSignature = currentProfile?.name || 'Rahul Sharma';
                                    setSopChecklists([...sopChecklists]);
                                    showToast('Technician digital signature securely recorded.', 'success');
                                  }}
                                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
                                >
                                  Click to Sign Digitally
                                </button>
                              )}
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Supervisor Approval</p>
                              <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-semibold">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span>Supervisor sign-off will be requested upon submission.</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex justify-end">
                            <button
                              onClick={() => {
                                if (selectedSop.techSignature) {
                                  selectedSop.status = 'Submitted';
                                  selectedSop.progress = 100;
                                  selectedSop.completionTime = new Date().toISOString();
                                  setSopChecklists([...sopChecklists]);
                                  showToast('SOP Checklist submitted successfully to supervisor.', 'success');
                                  setSelectedSop(null); // Close modal
                                } else {
                                  showToast('Please sign the SOP before submitting.', 'warning');
                                }
                              }}
                              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                            >
                              <CheckSquare className="h-4 w-4" />
                              <span>Submit Final SOP Checklist</span>
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            )}
            {/* ASSIGN NEW CHECKLIST MODAL */}
            {isAssignModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">Assign New Checklist</h3>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Select a template to assign to your queue</p>
                    </div>
                    <button onClick={() => setIsAssignModalOpen(false)} className="h-8 w-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm transition-all">✕</button>
                  </div>
                  <div className="p-6 space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Service Category</label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none bg-white focus:border-blue-500 text-slate-700">
                        <option>General Service</option>
                        <option>Battery System</option>
                        <option>Brakes & Suspension</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Vehicle Model</label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none bg-white focus:border-blue-500 text-slate-700">
                        <option>Ather 450X</option>
                        <option>Ola S1 Pro</option>
                        <option>TVS iQube</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Template</label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none bg-white focus:border-blue-500 text-slate-700">
                        <option>Scheduled Maintenance Sweep (v1.0)</option>
                        <option>Deep Battery Diagnostic (v2.1)</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          const newSopId = `SOP-2026-N-${Math.floor(Math.random() * 900) + 100}`;
                          const newChecklist = {
                            id: newSopId,
                            name: 'Scheduled Maintenance Sweep',
                            category: 'General Service',
                            vehicleModel: 'Ather 450X',
                            estTime: '20 mins',
                            priority: 'Medium',
                            version: 'v1.0',
                            assignedBy: 'System Auto-Assign',
                            lastUpdated: 'Just now',
                            status: 'Assigned',
                            dueDate: '2026-07-26',
                            progress: 0,
                            tasks: [
                              { id: 't1', desc: 'Perform visual inspection', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'None' },
                              { id: 't2', desc: 'Check tire pressures and treads', isMandatory: true, status: 'Pending', remarks: '', measurement: '', photo: null, requiresTools: 'Pressure Gauge' },
                            ],
                            aiSuggestions: 'Routine sweep assigned manually.',
                            safetyWarnings: '',
                            techSignature: '',
                            completionTime: null
                          };
                          setSopChecklists([newChecklist, ...sopChecklists]);
                          showToast(`Assigned checklist ${newSopId} to your queue.`, 'success');
                          setIsAssignModalOpen(false);
                        }}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all"
                      >
                        Confirm Assignment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 11: SPARE PARTS REQUESTS */}
        {activeTab === 'spares' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Spare Parts & Inventory Request Hub</h2>
              <p className="text-xs text-slate-500 mt-1">Submit spare request sheets to the store inventory manager for instant approval.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form onSubmit={handleAddSpareRequest} className="lg:col-span-5 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">New Spare Requisition</h3>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Search spare part name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brake Caliper, Throttle cable"
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Quantity</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newPartQty}
                      onChange={(e) => setNewPartQty(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Urgency</label>
                    <select
                      value={newPartPriority}
                      onChange={(e) => setNewPartPriority(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-white outline-none focus:border-blue-500 font-bold"
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                      <option value="CRITICAL">CRITICAL</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Submit Spare Request</span>
                </button>
              </form>
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Requisition History</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {spareRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-left">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-mono">{req.id}</span>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                            req.priority === 'CRITICAL' ? 'bg-red-50 text-red-800' :
                            req.priority === 'HIGH' ? 'bg-orange-50 text-orange-800' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {req.priority}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">{req.part}</h4>
                        <p className="text-[10px] text-slate-500">Requested: {req.date} • Qty: {req.qty}</p>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                        req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        req.status === 'ISSUED' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                        req.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: INVENTORY REQUESTS */}
        {activeTab === 'inventory' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Technician Tool Bag & Hub Inventory</h2>
              <p className="text-xs text-slate-500 mt-1">Review tools assigned to your bag and submit replenishment request sheets.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Tool Bag Registry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-600">
                  {['HV Insulated Safety Gloves (500V)', 'Calibrated Digital Multimeter', 'OBD-II Diagnostic CAN Link', 'Insulated Hex Key Torque Kit', 'Chassis Casing Tensioner'].map((tool, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-left">
                      <span>{tool}</span>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">ASSIGNED</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Request Replacements</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Item to Replenish</label>
                  <input type="text" placeholder="e.g. HV Insulated Gloves replacement" className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium" />
                  <button onClick={() => showToast('Tool replenishment request logged.', 'success')} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all">
                    Request Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: CUSTOMER SIGNATURE */}
        {activeTab === 'signature' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Customer Digital Signature</h2>
              <p className="text-xs text-slate-500 mt-1">Obtain signature authorization to verify service completion.</p>
            </div>
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Customer Signatory Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
                />
                <div className="h-36 bg-slate-55 border border-slate-200 rounded-xl relative flex items-center justify-center cursor-crosshair">
                  {isSigned ? (
                    <span className="font-serif italic text-lg text-blue-900 font-extrabold">{signatureText}</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Draw or Type signature below</span>
                  )}
                  <div className="absolute bottom-2 right-2 flex gap-1.5">
                    <button
                      onClick={() => {
                        if (!customerName.trim()) {
                          showToast('Please enter a Customer Name first.', 'warning');
                          return;
                        }
                        
                        setIsSigned(true);
                        setSignatureText(customerName);
                        
                        // Add to history
                        const now = new Date();
                        const dateStr = now.toISOString().split('T')[0] + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                        setSignatureHistory([{
                          id: `SIG-${Date.now()}`,
                          name: customerName,
                          serviceId: 'SR-00891-XL',
                          timestamp: dateStr,
                          signature: customerName
                        }, ...signatureHistory]);
                        
                        showToast('Digital signature verified & saved to history.', 'success');
                      }}
                      className="px-3 py-1 bg-blue-600 text-white font-extrabold text-[9px] rounded-lg transition-all"
                    >
                      Sign Now
                    </button>
                    <button
                      onClick={() => {
                        setIsSigned(false);
                        setSignatureText('');
                      }}
                      className="px-3 py-1 bg-white border border-slate-200 text-slate-650 font-extrabold text-[9px] rounded-lg transition-all"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Signature History Table */}
              {signatureHistory.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">Signature History</h3>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-500">
                        <tr>
                          <th className="px-4 py-3">Service ID</th>
                          <th className="px-4 py-3">Customer Name</th>
                          <th className="px-4 py-3">Timestamp</th>
                          <th className="px-4 py-3 text-right">Signature</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {signatureHistory.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3 font-mono font-bold text-slate-800">{item.serviceId}</td>
                            <td className="px-4 py-3 font-bold text-blue-700">{item.name}</td>
                            <td className="px-4 py-3 text-slate-500">{item.timestamp}</td>
                            <td className="px-4 py-3 text-right">
                              <span className="font-serif italic text-base text-blue-900 font-extrabold">{item.signature}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 14: PHOTO UPLOADS */}
        {activeTab === 'photos' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Work Order Photo Uploads</h2>
                <p className="text-xs text-slate-500 mt-1">Upload and store pre-repair and post-repair photos for compliance audits.</p>
              </div>
              
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Enter Vehicle Tag / VIN</label>
                <input 
                  type="text"
                  placeholder="e.g. TS09 EA 1234 or VIN..."
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none w-64 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 placeholder:font-medium"
                  value={selectedVehicleForUpload}
                  onChange={(e) => setSelectedVehicleForUpload(e.target.value)}
                />
              </div>
            </div>

            {/* Upload Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {['Pre-Repair Inspections', 'Diagnostics / Harness Cell', 'Post-Repair Handover'].map((stage, idx) => (
                <div key={idx} className={`p-5 border ${stagedUploads.includes(stage) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'} rounded-2xl text-left space-y-4 shadow-sm hover:shadow-md transition-all`}>
                  <h3 className={`text-xs font-black uppercase tracking-wider ${stagedUploads.includes(stage) ? 'text-blue-800' : 'text-slate-800'}`}>{stage}</h3>
                  <div className={`h-32 border-2 border-dashed ${stagedUploads.includes(stage) ? 'border-blue-400 bg-white' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100 bg-white'} rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all gap-1.5 group`}
                    onClick={() => {
                      if (stagedUploads.includes(stage)) {
                        setStagedUploads(stagedUploads.filter(s => s !== stage));
                      } else {
                        setStagedUploads([...stagedUploads, stage]);
                      }
                    }}
                  >
                    {stagedUploads.includes(stage) ? (
                      <>
                        <CheckCircle2 className="h-6 w-6 text-blue-500" />
                        <span className="text-[9px] font-black text-blue-600 uppercase">Photo Selected</span>
                      </>
                    ) : (
                      <>
                        <Camera className="h-6 w-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[9px] font-black text-slate-500 group-hover:text-blue-600 uppercase">Select photo</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex justify-end border-b border-slate-100 pb-4">
              <button
                onClick={() => {
                  if (stagedUploads.length === 0) {
                    showToast('Please select at least one photo stage to upload.', 'warning');
                    return;
                  }
                  if (!selectedVehicleForUpload.trim()) {
                    showToast('Please enter a Vehicle Tag or VIN first.', 'warning');
                    return;
                  }
                  
                  const now = new Date();
                  const dateStr = now.toISOString().split('T')[0] + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                  
                  const newEntries = stagedUploads.map((stg, i) => ({
                    id: `PH-${Date.now() + i}`,
                    stage: stg,
                    vehicleTag: selectedVehicleForUpload,
                    date: dateStr,
                    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80'
                  }));
                  
                  setPhotoUploadHistory([...newEntries, ...photoUploadHistory]);
                  setStagedUploads([]);
                  showToast(`${stagedUploads.length} photo(s) submitted to history.`, 'success');
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 uppercase tracking-wider"
              >
                <Camera className="h-4 w-4" />
                Submit Photo
              </button>
            </div>

            {/* Upload History Table */}
            <div className="pt-2">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><CheckSquare className="h-4 w-4 text-emerald-500" /> Photo Upload History</h3>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Photo ID</th>
                      <th className="px-4 py-3">Vehicle Tag</th>
                      <th className="px-4 py-3">Stage</th>
                      <th className="px-4 py-3">Timestamp</th>
                      <th className="px-4 py-3 text-right">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {photoUploadHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-800">{item.id}</td>
                        <td className="px-4 py-3 font-bold text-blue-700">{item.vehicleTag}</td>
                        <td className="px-4 py-3 text-slate-600 font-medium">{item.stage}</td>
                        <td className="px-4 py-3 text-slate-500">{item.date}</td>
                        <td className="px-4 py-3 text-right">
                          <img src={item.url} alt="Uploaded" className="h-8 w-12 object-cover rounded border border-slate-200 ml-auto shadow-sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 15: SERVICE COMPLETION */}
        {activeTab === 'completion' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2"><CheckCircle2 className="h-6 w-6 text-emerald-600"/> Final Service Completion</h2>
              <p className="text-sm text-slate-500 mt-1">Review job details, record final metrics, and officially close the work order.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* LEFT PANEL */}
              <div className="space-y-6">
                
                {/* 1. Job Information (Read-Only) */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2"><Info className="h-4 w-4 text-blue-600"/> Job Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Job Card ID</span>
                      <span className="text-xs font-black text-slate-800 font-mono">JC-INV-2026-9042</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Request ID</span>
                      <span className="text-xs font-black text-slate-800 font-mono">SR-00891-XL</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Customer Name</span>
                      <span className="text-xs font-bold text-slate-800">Vikramaditya Rathore</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Customer Mobile</span>
                      <span className="text-xs font-bold text-slate-800">+91 98765 43210</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vehicle Reg No</span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">TS09 EA 1234</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vehicle Model</span>
                      <span className="text-xs font-bold text-slate-800">Ather 450X Gen 3</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Odometer Reading</span>
                      <span className="text-xs font-bold text-slate-800">12,450 km</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Assigned Tech</span>
                      <span className="text-xs font-bold text-slate-800">Rahul Sharma (TECH-409)</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-slate-100">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Date & Location</span>
                      <span className="text-[11px] font-semibold text-slate-600">25 Jul 2026, 09:00 IST • InnoVibe Hub, Kakinada</span>
                    </div>
                  </div>
                </div>

                {/* 2. Customer Complaint */}
                <div className="bg-red-50/30 border border-red-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-red-100 pb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500"/> Customer Complaint</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Category</span>
                      <span className="text-xs font-bold text-slate-800">Battery & Charging</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Priority</span>
                      <span className="text-[10px] font-black text-red-700 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wider">High</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reported Problem</span>
                      <p className="text-xs font-medium text-slate-700 bg-white p-3 rounded-xl border border-red-50 leading-relaxed">
                        Vehicle abruptly shuts down when battery drops below 15%. Charging is slower than usual.
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initial Diagnosis</span>
                      <p className="text-xs font-medium text-slate-700 bg-white p-3 rounded-xl border border-red-50 leading-relaxed">
                        Suspected faulty cell block or BMS synchronization issue. Needs deep diagnostic scan.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 4. Progress Summary */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                   <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Job Progress Summary</h3>
                   <div className="space-y-3">
                     {[
                       'Vehicle Inspection Completed',
                       'EV Diagnosis Completed',
                       'Service Checklist Completed',
                       'Spare Parts Updated',
                       'Photos Uploaded',
                       'Customer Signature Collected'
                     ].map((step, idx) => (
                       <div key={idx} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                         <span className="text-[11px] font-bold text-slate-700">{step}</span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-2 py-1 rounded border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> Done</span>
                       </div>
                     ))}
                   </div>
                </div>

              </div>
              
              {/* RIGHT PANEL */}
              <div className="space-y-6 flex flex-col h-full">
                
                {/* 3. Service Performed */}
                <div className="bg-blue-50/30 border border-blue-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest border-b border-blue-100 pb-2 flex items-center gap-2"><Wrench className="h-4 w-4 text-blue-600"/> Service Performed</h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Root Cause Identified</label>
                        <input type="text" value={completionData.rootCause} onChange={e => setCompletionData({...completionData, rootCause: e.target.value})} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Battery Health (%)</label>
                        <input type="text" value={completionData.batteryHealth} onChange={e => setCompletionData({...completionData, batteryHealth: e.target.value})} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Work Performed (Summary)</label>
                      <textarea value={completionData.workPerformed} onChange={e => setCompletionData({...completionData, workPerformed: e.target.value})} className="w-full h-16 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium resize-none" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Parts Replaced</label>
                        <input type="text" value={completionData.partsReplaced} onChange={e => setCompletionData({...completionData, partsReplaced: e.target.value})} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Final Vehicle Condition</label>
                        <select value={completionData.finalCondition} onChange={e => setCompletionData({...completionData, finalCondition: e.target.value})} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium bg-white">
                          <option>Ready for delivery</option>
                          <option>Requires further testing</option>
                          <option>Waiting on customer approval</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2">
                       <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Software/Firmware Updated?</label>
                       <div className="flex items-center gap-2">
                         <button onClick={() => setCompletionData({...completionData, softwareUpdated: true})} className={`px-3 py-1 text-[10px] font-black uppercase rounded ${completionData.softwareUpdated ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>Yes</button>
                         <button onClick={() => setCompletionData({...completionData, softwareUpdated: false})} className={`px-3 py-1 text-[10px] font-black uppercase rounded ${!completionData.softwareUpdated ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-500'}`}>No</button>
                       </div>
                    </div>
                  </div>
                </div>

                {/* 5. Final Technician Report */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Final Technician Report</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Final Remarks <span className="text-red-500">*</span></label>
                        <span className="text-[9px] font-bold text-slate-400">{completionData.finalRemarks.length}/500</span>
                      </div>
                      <textarea 
                        value={completionData.finalRemarks} 
                        onChange={e => setCompletionData({...completionData, finalRemarks: e.target.value.substring(0,500)})} 
                        placeholder="Enter comprehensive final remarks..."
                        className="w-full h-20 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium resize-none bg-slate-50" 
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Recommendations for Customer</label>
                        <input type="text" value={completionData.recommendations} onChange={e => setCompletionData({...completionData, recommendations: e.target.value})} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium bg-slate-50" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Next Service Due (Est.)</label>
                        <input type="date" value={completionData.nextService} onChange={e => setCompletionData({...completionData, nextService: e.target.value})} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-medium bg-slate-50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. Completion Checklist */}
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 shadow-sm space-y-3">
                  <h3 className="text-xs font-black text-emerald-800 uppercase tracking-widest border-b border-emerald-200 pb-2 mb-3">Mandatory Completion Checklist</h3>
                  {[
                    { key: 'workDone', label: "All assigned work has been completed." },
                    { key: 'vehicleTested', label: "Vehicle tested after service." },
                    { key: 'photosUploaded', label: "Required photos uploaded." },
                    { key: 'signatureCollected', label: "Customer signature collected." },
                    { key: 'noPendingIssues', label: "No pending issues remain." }
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                      <div className={`mt-0.5 shrink-0 flex items-center justify-center h-4 w-4 rounded border-2 ${completionChecks[item.key as keyof typeof completionChecks] ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300 group-hover:border-emerald-400'} transition-all`}>
                        {completionChecks[item.key as keyof typeof completionChecks] && <CheckSquare className="h-3 w-3 text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={completionChecks[item.key as keyof typeof completionChecks]} 
                        onChange={(e) => setCompletionChecks({...completionChecks, [item.key]: e.target.checked})} 
                      />
                      <span className={`text-xs font-semibold ${completionChecks[item.key as keyof typeof completionChecks] ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-800'}`}>{item.label}</span>
                    </label>
                  ))}
                </div>

                {/* 7. Auto-Captured Information */}
                <div className="bg-slate-50 p-4 rounded-xl grid grid-cols-2 gap-3 border border-slate-200">
                  <div>
                     <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Service Duration</span>
                     <span className="text-[10px] font-mono font-bold text-slate-700">3 hrs 45 mins</span>
                  </div>
                  <div>
                     <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">GPS Location</span>
                     <span className="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-1"><MapPin className="h-3 w-3"/> Verified</span>
                  </div>
                  <div>
                     <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Completion Time</span>
                     <span className="text-[10px] font-mono font-bold text-slate-700">{new Date().toLocaleString()}</span>
                  </div>
                  <div>
                     <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Sync Status</span>
                     <span className="text-[10px] font-mono font-bold text-blue-600 flex items-center gap-1"><Cloud className="h-3 w-3"/> Online</span>
                  </div>
                </div>

                {/* 8. Final Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button className="col-span-2 sm:col-span-1 px-4 py-3 bg-white border border-slate-300 text-slate-700 font-extrabold text-xs rounded-xl shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider">
                    Save Draft
                  </button>
                  <button className="col-span-2 sm:col-span-1 px-4 py-3 bg-white border border-slate-300 text-slate-700 font-extrabold text-xs rounded-xl shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4 text-rose-500" />
                    Generate PDF
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!completionData.finalRemarks.trim()) {
                        showToast('Final Remarks are mandatory to close the job.', 'error');
                        return;
                      }
                      
                      const allChecked = Object.values(completionChecks).every(v => v === true);
                      if (!allChecked) {
                        showToast('Please check all mandatory completion checklist items.', 'error');
                        return;
                      }
                      
                      setJobState(7);
                      showToast('Job Successfully Completed & Work Order Closed!', 'success');
                    }}
                    className="col-span-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Mark Job as Completed
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 16: PERFORMANCE DASHBOARD */}
        {activeTab === 'performance' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Quality Performance Indicators</h2>
              <p className="text-xs text-slate-500 mt-1">Track customer ratings, SLAs, and first-time fix accuracy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Quality KPIs</h3>
                {[
                  { label: 'Customer rating satisfaction', value: '4.9★', progress: 98, color: 'bg-emerald-500' },
                  { label: 'SLA response dispatch speed', value: '95%', progress: 95, color: 'bg-blue-500' },
                  { label: 'First-time fix efficiency', value: '92%', progress: 92, color: 'bg-purple-500' },
                  { label: 'Attendance roster compliance', value: '98.5%', progress: 98, color: 'bg-amber-500' },
                ].map((kpi, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-650">{kpi.label}</span>
                      <span className="text-slate-800">{kpi.value}</span>
                    </div>
                    <div className="h-2 bg-slate-105 rounded-full overflow-hidden">
                      <div className={`h-full ${kpi.color}`} style={{ width: `${kpi.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto" />
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Leaderboard Position</h4>
                  <p className="text-xl font-extrabold text-slate-900 mt-1">#2 in Hub (Kakinada)</p>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">Maintain CSAT rating above 4.8 to qualify for monthly cash incentive.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 17: PAYROLL */}
        {activeTab === 'payroll' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Compensation & Salary Registry</h2>
              <p className="text-xs text-slate-500 mt-1">View monthly base pay structure, allowances, deductions, and payslips.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Salary Snapshot (Current Month)</h3>
                <div className="space-y-3 font-medium text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Basic Salary</span>
                    <span className="font-mono font-bold text-slate-800">₹24,000</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">HRA Allowance</span>
                    <span className="font-mono font-bold text-slate-800">₹9,600</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Performance Bonus</span>
                    <span className="font-mono font-bold text-emerald-700">+₹3,500</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 text-rose-700">
                    <span>Statutory Deductions (PF/Tax)</span>
                    <span className="font-mono font-bold">-₹2,880</span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-black text-slate-900">
                    <span>Net take-home payout</span>
                    <span className="font-mono text-blue-600 font-black">₹34,220</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowPayslipStub(true);
                    showToast('Payslip loaded for Rahul Sharma', 'info');
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <FileText className="h-4 w-4" />
                  <span>View / Print Payslip Document</span>
                </button>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Salary Payout History</h3>
                <div className="space-y-2">
                  {[
                    { month: 'June 2026', amount: '₹33,100', status: 'PAID', date: '01 Jul 2026' },
                    { month: 'May 2026', amount: '₹34,500', status: 'PAID', date: '01 Jun 2026' },
                    { month: 'April 2026', amount: '₹32,400', status: 'PAID', date: '02 May 2026' },
                  ].map((p, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-left">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{p.month}</h4>
                        <p className="text-[10px] text-slate-500">Credited on: {p.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-xs text-slate-800">{p.amount}</span>
                        <span className="text-[10px] font-black px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full uppercase">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 18: INCENTIVES */}
        {activeTab === 'incentives' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Technician Payout & Incentives Tracker</h2>
              <p className="text-xs text-slate-500 mt-1">Monitor real-time job-level incentives, points ledger, and bonus payouts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-gradient-to-tr from-amber-500 to-yellow-500 text-white rounded-2xl space-y-3 shadow-md shadow-amber-500/10">
                <Zap className="h-8 w-8 text-white animate-pulse" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-90">Cumulative Incentives (July)</p>
                  <p className="text-2xl font-black font-mono">₹3,500</p>
                </div>
                <p className="text-[10px] font-bold opacity-75">Bonus payout linked with CSAT and SLA scores.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Incentive Logs</h3>
                <div className="space-y-2">
                  {[
                    { id: 'BK-2026-0002', name: 'Ola S1 BMS repair', amount: '₹1,500', date: 'Yesterday', rating: '5.0★' },
                    { id: 'BK-2026-0003', name: 'TVS iQube brake bleed', amount: '₹1,000', date: '23 Jul 2026', rating: '4.8★' },
                    { id: 'BK-2026-0004', name: 'Ather 450X battery diagnosis', amount: '₹1,000', date: '20 Jul 2026', rating: '5.0★' },
                  ].map((log, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <div>
                        <h4 className="font-bold text-slate-800">{log.name}</h4>
                        <p className="text-[9px] text-slate-450 mt-0.5">Ticket: {log.id} • {log.date} • Rating CSAT: {log.rating}</p>
                      </div>
                      <span className="font-mono text-emerald-700 font-extrabold">{log.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 19: TRAINING & CERTIFICATIONS */}
        {activeTab === 'training' && (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            {/* 15. Advanced Filters & Header */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-indigo-600" /> Enterprise LMS Hub
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Manage your certifications, mandatory compliances, and skill progression.</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 w-64">
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                  <input type="text" placeholder="Search courses, certs..." className="bg-transparent text-[11px] text-slate-800 placeholder-slate-400 outline-none w-full font-bold" />
                </div>
                <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 outline-none hover:bg-slate-50 cursor-pointer">
                  <option>All Categories</option>
                  <option>Battery Systems</option>
                  <option>Safety Compliance</option>
                </select>
                <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 outline-none hover:bg-slate-50 cursor-pointer">
                  <option>All Statuses</option>
                  <option>In Progress</option>
                  <option>Pending Mandatory</option>
                </select>
              </div>
            </div>

            {/* 12. Notifications & Alerts */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[280px] bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start gap-3 shadow-xs">
                <div className="p-1.5 bg-red-100 rounded-lg shrink-0"><AlertTriangle className="h-4 w-4 text-red-600" /></div>
                <div>
                  <h4 className="text-[11px] font-bold text-red-900">High Voltage PPE Renewal</h4>
                  <p className="text-[10px] text-red-700 mt-0.5">Mandatory safety cert expires in 3 days. Complete assessment ASAP.</p>
                </div>
              </div>
              <div className="min-w-[280px] bg-indigo-50 border border-indigo-200 rounded-2xl p-3 flex items-start gap-3 shadow-xs">
                <div className="p-1.5 bg-indigo-100 rounded-lg shrink-0"><Award className="h-4 w-4 text-indigo-600" /></div>
                <div>
                  <h4 className="text-[11px] font-bold text-indigo-900">New Badge Unlocked!</h4>
                  <p className="text-[10px] text-indigo-700 mt-0.5">You achieved "Thermal Management Specialist" last week.</p>
                </div>
              </div>
              <div className="min-w-[280px] bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-3 shadow-xs">
                <div className="p-1.5 bg-emerald-100 rounded-lg shrink-0"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
                <div>
                  <h4 className="text-[11px] font-bold text-emerald-900">Course Graded</h4>
                  <p className="text-[10px] text-emerald-700 mt-0.5">Trainer Rahul gave you 98% on BMS practicals.</p>
                </div>
              </div>
            </div>

            {/* 1. Dashboard Summary Cards & 14. Training Analytics (Metrics) */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'Assigned', val: '12', icon: FileText, color: 'text-slate-700' },
                { label: 'Completed', val: '45', icon: CheckSquare, color: 'text-emerald-600' },
                { label: 'In Progress', val: '3', icon: Activity, color: 'text-blue-600' },
                { label: 'Mandatory', val: '1', icon: AlertTriangle, color: 'text-red-600' },
                { label: 'Certs', val: '8', icon: Award, color: 'text-amber-600' },
                { label: 'Hrs', val: '124', icon: Clock, color: 'text-purple-600' },
                { label: 'Avg Score', val: '92%', icon: TrendingUp, color: 'text-teal-600' },
                { label: 'Renewals', val: '1', icon: Calendar, color: 'text-orange-600' },
              ].map((kpi, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-xs hover:border-slate-300 transition-colors cursor-pointer">
                  <kpi.icon className={`h-4 w-4 mb-1.5 ${kpi.color}`} />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{kpi.label}</span>
                  <span className="text-lg font-black text-slate-800">{kpi.val}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT COLUMN: ACTIVE LEARNING */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 4. Mandatory Compliance Training */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-red-500" /> Mandatory Compliance</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">85% Compliant</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-red-200 bg-red-50/50">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">High Voltage Safety PPE v3</h4>
                        <p className="text-[10px] text-slate-500">Required annually by OSHA. Overdue by 2 days.</p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-[10px] font-bold text-red-600 uppercase">OVERDUE</span>
                        <button className="px-3 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-lg shadow-xs hover:bg-red-700">Start Assessment</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Lockout/Tagout Procedures</h4>
                        <p className="text-[10px] text-slate-500">Completed 3 months ago. Valid for 1 year.</p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> COMPLETED</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Enhanced Course Cards */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Play className="h-4 w-4 text-blue-500" /> My Learning Path</h3>
                    <span className="text-[10px] font-bold text-blue-600">3 Courses Active</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Course 1 */}
                    <div className="border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 uppercase">Advanced</span>
                        <span className="text-[9px] font-bold text-slate-400"><Clock className="inline h-3 w-3 mr-0.5" /> 5 hrs</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">Advanced CAN Protocol Analysis</h4>
                      <p className="text-[10px] text-slate-500 mt-1 mb-4 h-8 overflow-hidden">Master CAN bus diagnostics, packet sniffing, and identifying ECM communication faults.</p>
                      
                      <div className="space-y-1.5 mb-4">
                        <div className="flex justify-between text-[9px] font-bold">
                          <span className="text-slate-600">In Progress (65%)</span>
                          <span className="text-slate-400">Est. 1h 45m left</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-[65%]" />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-xs hover:bg-slate-800 transition-colors">Continue</button>
                        <button className="p-1.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50" title="Download Materials"><FileText className="h-4 w-4" /></button>
                      </div>
                    </div>

                    {/* Course 2 */}
                    <div className="border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">Beginner</span>
                        <span className="text-[9px] font-bold text-slate-400"><Clock className="inline h-3 w-3 mr-0.5" /> 2 hrs</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">Ather 450X Suspension Tuning</h4>
                      <p className="text-[10px] text-slate-500 mt-1 mb-4 h-8 overflow-hidden">Basic maintenance and tuning guidelines for EV mono-shocks.</p>
                      
                      <div className="space-y-1.5 mb-4">
                        <div className="flex justify-between text-[9px] font-bold">
                          <span className="text-slate-600">Not Started</span>
                          <span className="text-slate-400">Due: Aug 15</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-300 w-0" />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-lg shadow-xs hover:bg-blue-100 transition-colors">Start Learning</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. Learning History & 5. Assessments */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><FileText className="h-4 w-4 text-slate-500" /> Learning & Assessment History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="px-3 py-2 rounded-tl-lg">Course Name</th>
                          <th className="px-3 py-2">Completed On</th>
                          <th className="px-3 py-2">Exam Score</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2 rounded-tr-lg">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-3 py-3 font-bold text-slate-800">L2 Thermal Dynamics</td>
                          <td className="px-3 py-3 text-slate-500">12 Jul 2026</td>
                          <td className="px-3 py-3 font-mono font-bold text-emerald-600">92%</td>
                          <td className="px-3 py-3"><span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded">PASS</span></td>
                          <td className="px-3 py-3"><button className="text-[10px] font-bold text-blue-600 hover:underline">View Cert</button></td>
                        </tr>
                        <tr>
                          <td className="px-3 py-3 font-bold text-slate-800">Advanced Li-Ion Soldering</td>
                          <td className="px-3 py-3 text-slate-500">05 Jun 2026</td>
                          <td className="px-3 py-3 font-mono font-bold text-red-600">68%</td>
                          <td className="px-3 py-3"><span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded">FAIL</span></td>
                          <td className="px-3 py-3"><button className="text-[10px] font-bold text-blue-600 hover:underline">Retake Exam</button></td>
                        </tr>
                        <tr>
                          <td className="px-3 py-3 font-bold text-slate-800">EV Workplace Safety v2</td>
                          <td className="px-3 py-3 text-slate-500">20 May 2026</td>
                          <td className="px-3 py-3 font-mono font-bold text-slate-400">N/A</td>
                          <td className="px-3 py-3"><span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded">COMPLETED</span></td>
                          <td className="px-3 py-3">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* 13. Trainer Feedback inline */}
                  <div className="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-3">
                    <User className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-700">Latest Trainer Feedback: <span className="text-blue-700">Rahul (L2 Thermal Dynamics)</span></h4>
                      <p className="text-[10px] text-slate-600 italic mt-0.5">"Excellent practical execution during the cooling jacket replacement module. Ready for L3 certification."</p>
                    </div>
                  </div>
                </div>

                {/* 7. Upcoming Training Sessions */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-purple-500" /> Upcoming Live Sessions</h3>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="min-w-[260px] border border-slate-200 rounded-2xl p-3 shrink-0 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] font-black px-2 py-1 rounded-bl-lg uppercase">Tomorrow</div>
                      <h4 className="text-xs font-bold text-slate-900 mt-2">New Ola Battery Pack Overview</h4>
                      <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><Clock className="h-3 w-3" /> 10:00 AM - 11:30 AM (Online)</p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5"><User className="h-3 w-3" /> Trainer: Amit Patel</p>
                      <div className="flex justify-between items-end mt-3">
                        <span className="text-[9px] font-bold text-emerald-600">12 Seats left</span>
                        <button className="px-3 py-1 bg-slate-900 text-white text-[9px] font-bold rounded-md hover:bg-slate-800 transition-colors">Join Session</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SKILLS, CERTS, AI */}
              <div className="space-y-6">
                
                {/* 8. Technician Skill Matrix */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Activity className="h-4 w-4 text-teal-500" /> Skill Proficiency Matrix</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { skill: 'Battery Diagnostics', val: 95, color: 'bg-emerald-500' },
                      { skill: 'Charging Systems', val: 91, color: 'bg-emerald-500' },
                      { skill: 'Motor Diagnostics', val: 82, color: 'bg-blue-500' },
                      { skill: 'BMS Troubleshooting', val: 78, color: 'bg-blue-500' },
                      { skill: 'Controller Repair', val: 65, color: 'bg-amber-500' },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                          <span className="text-slate-700">{s.skill}</span>
                          <span className="text-slate-500">{s.val}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${s.color} transition-all duration-1000`} style={{ width: `${s.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Certification Management */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Award className="h-4 w-4 text-amber-500" /> Active Certifications</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 border border-slate-200 rounded-xl relative overflow-hidden group">
                      <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity"><Award className="h-12 w-12 text-emerald-600" /></div>
                      <h4 className="text-xs font-black text-slate-900">Master EV Diagnostician</h4>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">ID: CERT-2025-9921</p>
                      <p className="text-[9px] text-emerald-700 font-bold mt-2">Valid till Dec 2028</p>
                      <div className="flex gap-2 mt-3">
                        <button className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 flex items-center gap-1"><FileText className="h-3 w-3" /> View PDF</button>
                        <button className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 flex items-center gap-1"><Smartphone className="h-3 w-3" /> QR Auth</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 10. Achievements & Badges */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><ThumbsUp className="h-4 w-4 text-pink-500" /> Badges & Honors</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-12 w-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center group relative cursor-pointer">
                      <Award className="h-6 w-6 text-amber-600" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-slate-900 text-white text-[9px] px-2 py-1 rounded">Gold Technician</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center group relative cursor-pointer">
                      <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-slate-900 text-white text-[9px] px-2 py-1 rounded">Safety Champion</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center group relative cursor-pointer opacity-40 grayscale">
                      <Award className="h-6 w-6 text-slate-400" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-slate-900 text-white text-[9px] px-2 py-1 rounded">Platinum Tech (Locked)</div>
                    </div>
                  </div>
                </div>

                {/* 9. AI Recommended Learning */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-5 shadow-xs relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10"><Zap className="h-24 w-24 text-indigo-600" /></div>
                  <div className="flex items-center justify-between border-b border-indigo-200/50 pb-3 mb-4 relative z-10">
                    <h3 className="text-sm font-black text-indigo-900 flex items-center gap-1.5"><Zap className="h-4 w-4 text-indigo-600" /> AI Recommended Next</h3>
                  </div>
                  <div className="relative z-10 space-y-3">
                    <div className="bg-white/60 p-3 rounded-xl border border-white">
                      <h4 className="text-[11px] font-bold text-indigo-900">Predictive Maintenance Algos</h4>
                      <p className="text-[9px] text-indigo-700/80 mt-0.5 leading-tight">Recommended based on your 95% proficiency in Battery Diagnostics.</p>
                      <button className="mt-2 text-[10px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1">Add to Queue <ArrowRight className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>

                {/* 11. Learning Resources */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Database className="h-4 w-4 text-slate-500" /> Technical Library</h3>
                  </div>
                  <ul className="space-y-2">
                    <li><button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1.5"><FileText className="h-3 w-3" /> Ather Service Manual 2026.pdf</button></li>
                    <li><button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1.5"><FileText className="h-3 w-3" /> L1 First Aid Guidelines.pdf</button></li>
                    <li><button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1.5"><Play className="h-3 w-3" /> Thermal Runaway Protocol Video</button></li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 20: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Company Bulletins & Safety SOPs</h2>
              <p className="text-xs text-slate-500 mt-1">Authorized technical announcements and regulatory compliance guidelines.</p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'New Safety Regulation: High Voltage Protection Gloves Requirement', date: 'Today, 09:00 AM', text: 'All field service technicians are required to wear HV-certified protective gear when servicing battery packs with charge level higher than 50%. Defaulters will be flagged in safety audits.' },
                { title: 'Kakinada Service Hub Expansion Notice', date: '21 Jul 2026', text: 'The Kakinada Main service center is adding two new service bays next month to handle rising Ola and Ather volume. Training logs will be updated for the new diagnostic modules.' },
                { title: 'Quarterly Incentive Leaderboard Announcement', date: '15 Jul 2026', text: 'The top 3 technicians with rating scores higher than 4.8 will receive an additional cash award of ₹10,000 next month. Maintain high CSAT to lock your spot.' },
              ].map((post, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400">{post.date}</span>
                    <span className="font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase">Safety</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-800">{post.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{post.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 21: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-left animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Real-Time Dispatch Notifications</h2>
              <p className="text-xs text-slate-500 mt-1">Receive system alerts, dispatcher messages, and parts availability notices.</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'New Job Dispatched', desc: 'Job BK-2026-0001 (Vikramaditya Rathore) is assigned to you by Kakinada Dispatcher.', date: 'Today, 11:30 AM', icon: Bell, color: 'bg-blue-50 border-blue-250 text-blue-800' },
                { title: 'Spare Parts Requisition Approved', desc: 'BMS Board replacement request (REQ-409) has been approved by the Store Manager.', date: 'Today, 10:15 AM', icon: CheckCircle2, color: 'bg-emerald-50 border-emerald-250 text-emerald-800' },
                { title: 'Urgent SOP Update', desc: 'New high voltage safety check lists are now active. Check training module for certification.', date: 'Yesterday', icon: AlertCircle, color: 'bg-amber-50 border-amber-250 text-amber-800' }
              ].map((notif, idx) => {
                const Icon = notif.icon;
                return (
                  <div key={idx} className={`p-4 rounded-2xl border ${notif.color} flex items-start gap-3.5 text-left`}>
                    <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-xs font-black uppercase tracking-wider">{notif.title}</h4>
                        <span className="text-[10px] opacity-75 font-semibold shrink-0">{notif.date}</span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed font-semibold">{notif.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ==========================================
          PAYSLIP DOCUMENT DRAWER MODAL
          ========================================== */}
      {showPayslipStub && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full h-[90vh] border border-slate-200 shadow-2xl flex flex-col text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">Generated Pay Stub - Rahul Sharma</h3>
              </div>
              <button
                onClick={() => setShowPayslipStub(false)}
                className="text-slate-400 hover:text-slate-650 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Print area container */}
            <div className="flex-1 overflow-y-auto my-4 pr-2">
              <div id="printable-payslip" className="bg-white p-6 border border-slate-350 shadow-xs mx-auto text-slate-800 font-sans" style={{ maxWidth: '800px' }}>
                
                {/* Header Branding */}
                <div className="border border-slate-400 p-4 grid grid-cols-4 gap-4 mb-4">
                  <div className="col-span-3 flex flex-col gap-3">
                    {/* Brand Logo & Typography */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <img src="/innovibe-logo.jpeg" alt="InnoVibe Logo" className="h-16 w-auto object-contain" />
                    </div>

                    {/* Company Details */}
                    <div className="text-left">
                      <h4 className="text-[#2b4c7e] font-extrabold text-xs tracking-tight uppercase">InnoVibe Mobility India Pvt Ltd</h4>
                      <p className="text-[9px] text-slate-500 font-semibold mt-0.5">Registered Office: Survey No. 45, Kakinada IT Park, Kakinada, Andhra Pradesh - 533005</p>
                      <p className="text-[9px] text-slate-500 font-semibold">Corporate Office: Survey No. 45, Kakinada IT Park, Kakinada, Andhra Pradesh - 533005</p>
                      <p className="text-[8px] text-slate-400 mt-1 font-mono">CIN: U34100AP2023PTC123456 | GSTIN: 36AAAAA0000A1Z5</p>
                      <p className="text-[8px] text-slate-400 font-mono">Phone: +91 891 230 0000 | Email: hr@innovibemobility.com | Web: www.innovibemobility.com</p>
                    </div>
                  </div>
                  <div className="col-span-1 border-l border-slate-300 flex items-center justify-center pl-4">
                    <h2 className="text-[#2b4c7e] text-xl font-black tracking-widest uppercase font-serif">PAYSLIP</h2>
                  </div>
                </div>

                {/* Section 1: EMPLOYEE INFORMATION */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    EMPLOYEE INFORMATION (auto-populated from HRMS Employee Profile)
                  </div>
                  <div className="border border-t-0 border-slate-300 p-2 grid grid-cols-2 text-[9px] gap-x-6 gap-y-1.5 bg-slate-50/50">
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Full Name:</span>
                      <span className="col-span-2 font-semibold text-slate-900">Rahul Sharma</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Employee ID:</span>
                      <span className="col-span-2 font-mono font-bold text-slate-900">EMP-TECH-409</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Department:</span>
                      <span className="col-span-2 font-semibold text-slate-900">Operations</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Designation:</span>
                      <span className="col-span-2 font-semibold text-slate-900">Senior EV Diagnostics Technician</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Reporting Manager:</span>
                      <span className="col-span-2 font-semibold text-slate-900">Vikram Singh (Service Manager)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Employment Type:</span>
                      <span className="col-span-2 font-semibold text-slate-900">Full-Time</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Date of Joining:</span>
                      <span className="col-span-2 font-semibold text-slate-900">12-Jul-2024</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Location:</span>
                      <span className="col-span-2 font-semibold text-slate-900">Kakinada Hub 1, Station #4</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Bank Name:</span>
                      <span className="col-span-2 font-semibold text-slate-900">State Bank of India</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Bank A/c No. (last 4):</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">XXXX XXXX 4930</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">IFSC Code:</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">SBIN0003456</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">UAN:</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">100874928501</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">ESIC Number:</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">00-00-000000-000-0000</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Aadhaar (last 4):</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">XXXX XXXX 8847</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Pay Period:</span>
                      <span className="col-span-2 font-semibold text-slate-900">June 2026</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Pay Date:</span>
                      <span className="col-span-2 font-semibold text-slate-900">01-Jul-2026</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: ATTENDANCE SUMMARY */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    ATTENDANCE SUMMARY
                  </div>
                  <div className="border border-t-0 border-slate-355">
                    <table className="w-full text-left text-[9px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                          <th className="py-1 px-2.5 border-r border-slate-300 w-1/2">Item</th>
                          <th className="py-1 px-2.5">Days / Hours</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Working Days</td>
                          <td className="py-1 px-2.5 font-semibold">30</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Present Days</td>
                          <td className="py-1 px-2.5 font-semibold">26</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Paid Leave</td>
                          <td className="py-1 px-2.5 font-semibold">2</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Weekly Off</td>
                          <td className="py-1 px-2.5 font-semibold">4</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Holidays</td>
                          <td className="py-1 px-2.5 font-semibold">2</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Loss of Pay (LOP)</td>
                          <td className="py-1 px-2.5 font-semibold">0</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Overtime Hours</td>
                          <td className="py-1 px-2.5 font-semibold">12.0 hrs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 3: SALARY STRUCTURE */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    SALARY STRUCTURE
                  </div>
                  
                  <div className="border border-t-0 border-slate-300 grid grid-cols-2 divide-x divide-slate-300">
                    {/* Earnings */}
                    <div>
                      <table className="w-full text-[8.5px] text-left">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                            <th className="py-1 px-2 border-r border-slate-300">EARNINGS</th>
                            <th className="py-1 px-2 border-r border-slate-300 text-right">CURRENT</th>
                            <th className="py-1 px-2 text-right">YTD</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">Basic Salary</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono">₹24,000</td>
                            <td className="py-1 px-2 text-right font-mono text-slate-500">₹1,44,000</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">House Rent Allowance (HRA)</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono">₹9,600</td>
                            <td className="py-1 px-2 text-right font-mono text-slate-500">₹57,600</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">Special Allowance</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono">₹0</td>
                            <td className="py-1 px-2 text-right font-mono text-slate-500">₹0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">Conveyance Allowance</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono">₹0</td>
                            <td className="py-1 px-2 text-right font-mono text-slate-500">₹0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">Performance Bonus</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-emerald-700">₹3,500</td>
                            <td className="py-1 px-2 text-right font-mono text-slate-500">₹21,000</td>
                          </tr>
                          <tr className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                            <td className="py-1 px-2 border-r border-slate-300">GROSS PAY (A)</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono">₹37,100</td>
                            <td className="py-1 px-2 text-right font-mono">₹2,22,600</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Deductions */}
                    <div className="flex flex-col justify-between">
                      <table className="w-full text-[8.5px] text-left">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                            <th className="py-1 px-2 border-r border-slate-300">DEDUCTIONS</th>
                            <th className="py-1 px-2 border-r border-slate-300 text-right">CURRENT</th>
                            <th className="py-1 px-2 text-right">YTD</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">Employee PF</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-rose-700">₹2,880</td>
                            <td className="py-1 px-2 text-right font-mono text-rose-600">₹17,280</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">Professional Tax</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-rose-700">₹0</td>
                            <td className="py-1 px-2 text-right font-mono text-rose-600">₹0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">TDS</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-rose-700">₹0</td>
                            <td className="py-1 px-2 text-right font-mono text-rose-600">₹0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-1 px-2 border-r border-slate-300 font-medium">Other Deductions</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-rose-700">₹0</td>
                            <td className="py-1 px-2 text-right font-mono text-rose-600">₹0</td>
                          </tr>
                          <tr className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                            <td className="py-1 px-2 border-r border-slate-300">TOTAL DEDUCTIONS (B)</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-rose-700">₹2,880</td>
                            <td className="py-1 px-2 text-right font-mono text-rose-700">₹17,280</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Net Pay */}
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1.5 px-3 flex justify-between uppercase tracking-wider mt-0.5">
                    <span>NET PAY (A - B)</span>
                    <div className="flex gap-12 font-mono">
                      <span>CURRENT: ₹34,220</span>
                      <span>YTD: ₹2,05,320</span>
                    </div>
                  </div>
                </div>

                {/* Section 4: EMPLOYER CONTRIBUTIONS */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    EMPLOYER CONTRIBUTIONS
                  </div>
                  <div className="border border-t-0 border-slate-300">
                    <table className="w-full text-left text-[8.5px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                          <th className="py-1 px-3 border-r border-slate-300 w-2/3">EMPLOYER CONTRIBUTIONS (Not part of take home pay)</th>
                          <th className="py-1 px-3 text-right">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-3 border-r border-slate-300 font-medium">Employer PF Contribution</td>
                          <td className="py-1 px-3 text-right font-mono font-semibold">₹2,880</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-3 border-r border-slate-300 font-medium">Employer ESI Contribution</td>
                          <td className="py-1 px-3 text-right font-mono font-semibold">₹1,200</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-3 border-r border-slate-300 font-medium">Gratuity (accrued)</td>
                          <td className="py-1 px-3 text-right font-mono font-semibold">₹1,154</td>
                        </tr>
                        <tr className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                          <td className="py-1.5 px-3 border-r border-slate-300">TOTAL CTC (Cost to Company)</td>
                          <td className="py-1.5 px-3 text-right font-mono text-[#2b4c7e]">₹42,334</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 5: LEAVE BALANCE */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    LEAVE BALANCE
                  </div>
                  <div className="border border-t-0 border-slate-300 grid grid-cols-4 divide-x divide-slate-300 text-center py-1.5 bg-slate-50/50">
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Casual Leave</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">2.0</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Sick Leave</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">4.0</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Earned Leave</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">5.0</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Comp Off</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">1.0</p>
                    </div>
                  </div>
                </div>

                {/* Section 6: INCENTIVE & PERFORMANCE DETAILS */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    INCENTIVE & PERFORMANCE DETAILS
                  </div>
                  <div className="border border-t-0 border-slate-300 p-2.5 bg-slate-50/50">
                    <div>
                      <h4 className="text-[8px] font-bold text-[#2b4c7e] border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Technician Metrics</h4>
                      <div className="grid grid-cols-4 gap-3 text-center">
                        <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                          <p className="text-[7px] font-bold text-slate-400 uppercase">Jobs Completed</p>
                          <p className="text-[10px] font-black text-slate-800 mt-0.5">32</p>
                        </div>
                        <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                          <p className="text-[7px] font-bold text-slate-400 uppercase">Customer Rating</p>
                          <p className="text-[10px] font-black text-slate-800 mt-0.5">4.9★</p>
                        </div>
                        <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                          <p className="text-[7px] font-bold text-slate-400 uppercase">Revenue Generated</p>
                          <p className="text-[10px] font-black text-slate-800 mt-0.5 font-mono">₹1,45,000</p>
                        </div>
                        <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                          <p className="text-[7px] font-bold text-slate-400 uppercase">Incentive Earned</p>
                          <p className="text-[10px] font-black text-emerald-700 mt-0.5 font-mono">₹3,500</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 7: PERFORMANCE SNAPSHOT */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    PERFORMANCE SNAPSHOT
                  </div>
                  <div className="border border-t-0 border-slate-355">
                    <table className="w-full text-left text-[9px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                          <th className="py-1 px-2.5 border-r border-slate-300 w-1/2">Monthly KPI</th>
                          <th className="py-1 px-2.5">Result</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Attendance</td>
                          <td className="py-1 px-2.5 font-semibold">98%</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Customer Rating</td>
                          <td className="py-1 px-2.5 font-semibold">4.9 / 5</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Productivity</td>
                          <td className="py-1 px-2.5 font-semibold">95%</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Performance Grade</td>
                          <td className="py-1 px-2.5 font-bold text-blue-700">A+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Box & Disclaimer */}
                <div className="border border-slate-400 p-4 grid grid-cols-2 gap-4 mt-6">
                  <div className="text-left flex items-end">
                  </div>
                  <div className="text-right flex flex-col justify-end items-end space-y-1">
                    <span className="text-[8px] text-slate-400 block font-mono">Generated by InnoVibe HRMS</span>
                    <div className="border-t border-slate-400 pt-1 w-48 text-center mt-6">
                      <span className="text-[10px] font-extrabold text-slate-800 tracking-tight block">Authorized Digital Signature</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6 text-[8px] text-slate-400 space-y-1 leading-relaxed">
                  <p className="font-bold text-slate-500">This is a computer-generated payslip and does not require a physical signature.</p>
                  <p>If you have any questions about this payslip, please contact:</p>
                  <p className="font-semibold text-slate-500">HR Department | hr@innovibemobility.com | Web: www.innovibemobility.com</p>
                  <p className="font-semibold text-[#2b4c7e] mt-1 tracking-wider uppercase">Confidential — InnoVibe Mobility India Pvt Ltd</p>
                </div>

              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 flex-shrink-0">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <span>Print / Download PDF</span>
              </button>
              <button
                onClick={() => setShowPayslipStub(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          INITIALIZE JOB CARD SLIDE-OUT DRAWER
          ========================================= */}
      {isInitializeJobCardOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsInitializeJobCardOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Initialize Job Card</h3>
                <p className="text-xs text-slate-500 font-medium">Create a new service work order.</p>
              </div>
              <button onClick={() => setIsInitializeJobCardOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Customer Name</label>
                <input type="text" placeholder="e.g. Vikramaditya Rathore" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Customer Contact</label>
                <input type="text" placeholder="+91 90000 00000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Vehicle Model</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none">
                    <option>Ather 450X Apex</option>
                    <option>Ola S1 Pro</option>
                    <option>TVS iQube</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Vehicle Reg No</label>
                  <input type="text" placeholder="e.g. AP39AB1234" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Odometer Reading</label>
                  <input type="number" placeholder="km" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Priority Level</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Initial Complaint Details</label>
                <textarea rows={4} placeholder="Describe the issue reported by the customer..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button onClick={() => setIsInitializeJobCardOpen(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button onClick={() => { showToast('Job Card Initialized Successfully!', 'success'); setIsInitializeJobCardOpen(false); }} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">Create Work Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TechnicianPortalPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading Technician Portal...</div>}>
      <TechnicianPortalContent />
    </Suspense>
  );
}

