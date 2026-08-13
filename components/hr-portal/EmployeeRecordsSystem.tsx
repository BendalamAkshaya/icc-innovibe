'use client';

import React, { useState, useMemo } from 'react';
import { initialEmployees } from './mockEmployees';
import {
  Search,
  Plus,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  Download,
  UploadCloud,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  User,
  Users,
  FileText,
  CreditCard,
  Briefcase,
  ShieldCheck,
  Activity,
  Calendar,
  Building,
  Heart,
  MapPin,
  GraduationCap,
  Check,
  X,
  Phone,
  Mail,
  FileSignature,
  DollarSign,
  ClipboardList,
  AlertCircle,
  TrendingUp,
  FileCheck,
  PlusCircle,
  Info,
  Lock
} from 'lucide-react';

export interface DocumentRecord {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  uploadedBy: string;
  verifiedBy?: string;
  verificationDate?: string;
  status: 'Verified' | 'Pending Verification' | 'Missing' | 'Expired' | 'Rejected';
  expiryDate?: string;
  remarks?: string;
  fileSize: string;
}

export interface Sibling {
  name: string;
  dob: string;
  occupation: string;
  phone: string;
}

export interface Child {
  name: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  school: string;
  bloodGroup: string;
}

export interface EducationRecord {
  degree: string;
  institution: string;
  boardUniversity: string;
  passingYear: string;
  percentageCgpa: string;
  certificateName?: string;
}

export interface PreviousCompany {
  companyName: string;
  employeeId?: string;
  designation: string;
  department?: string;
  manager?: string;
  joiningDate: string;
  relievingDate: string;
  experience: string;
  salary: string;
  reasonForLeaving: string;
  documents: {
    offerLetter?: string;
    experienceLetter?: string;
    relievingLetter?: string;
    appointmentLetter?: string;
    promotionLetter?: string;
  };
}

export interface Reference {
  name: string;
  company: string;
  designation: string;
  phone: string;
  email: string;
  relationship: string;
  referenceNumber: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  details: string;
  type: 'upload' | 'update' | 'verify' | 'status' | 'hr';
}

export interface EmployeeRecord {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  joiningDate: string;
  employmentStatus: 'Active' | 'On Leave' | 'Probation' | 'Suspended';
  manager: string;
  profileCompletion: number;
  avatar: string;
  personalInfo: {
    dob: string;
    gender: 'Male' | 'Female' | 'Other';
    bloodGroup: string;
    nationality: string;
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    marriageDate?: string;
    personalEmail: string;
    officialEmail: string;
    mobile: string;
    alternateNumber: string;
    currentAddress: string;
    permanentAddress: string;
    aadhaar: string;
    pan: string;
    passport: string;
    drivingLicense: string;
    voterId: string;
    pfNumber: string;
    esicNumber: string;
    uanNumber: string;
  };
  familyInfo: {
    father: { name: string; dob: string; occupation: string; phone: string; email?: string; address?: string };
    mother: { name: string; dob: string; occupation: string; phone: string };
    siblings: Sibling[];
    spouse?: { name: string; dob: string; marriageDate: string; occupation: string; phone: string };
    children: Child[];
  };
  education: {
    ssc?: EducationRecord;
    intermediate?: EducationRecord;
    diploma?: EducationRecord;
    ug?: EducationRecord;
    pg?: EducationRecord;
    doctorate?: EducationRecord;
    certifications: EducationRecord[];
  };
  previousEmployment: PreviousCompany[];
  documents: DocumentRecord[];
  payroll: {
    currentSalary: string;
    ctc: string;
    previousSalary?: string;
    salaryHistory: { date: string; amount: string; type: string }[];
    incrementHistory: { date: string; percentage: string; oldSalary: string; newSalary: string }[];
    bonusHistory: { date: string; amount: string; type: string }[];
  };
  references: Reference[];
  bankDetails: {
    accountHolder: string;
    bankName: string;
    branch: string;
    accountNumber: string;
    ifsc: string;
    upi: string;
    cancelledChequeName?: string;
  };
  medicalDetails: {
    bloodGroup: string;
    allergies: string;
    medicalConditions: string;
    insuranceProvider: string;
    insuranceNumber: string;
    policyUrl?: string;
    nomineeName: string;
  };
  emergencyContacts: {
    primary: { name: string; relation: string; phone: string; address: string };
    secondary: { name: string; relation: string; phone: string; address: string };
  };
  timeline: TimelineEvent[];
  hrNotes: {
    internalNotes: string;
    performanceNotes: string;
    warnings: string;
    promotionRecommendations: string;
    salaryDiscussion: string;
    confidentialRemarks: string;
  };
}

interface EmployeeRecordsSystemProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function EmployeeRecordsSystem({ showToast }: EmployeeRecordsSystemProps) {
  const initialEmployees: EmployeeRecord[] = [];

  const [employees, setEmployees] = useState<EmployeeRecord[]>(initialEmployees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  
  // Search & Filter State
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [locFilter, setLocFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [compFilter, setCompFilter] = useState('All'); 
  const [docFilter, setDocFilter] = useState('All'); 

  // Detail View State
  const [activeTab, setActiveTab] = useState<'Overview' | 'Personal' | 'Family' | 'Education' | 'PreviousEmployment' | 'Documents' | 'Payroll' | 'References' | 'Bank' | 'Medical' | 'Emergency' | 'Timeline' | 'HRNotes'>('Overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Employee Form State
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('Engineering');
  const [newEmpLocation, setNewEmpLocation] = useState('Kakinada Main Hub');
  const [newEmpJoiningDate, setNewEmpJoiningDate] = useState('2026-07-25');
  const [newEmpStatus, setNewEmpStatus] = useState<'Active' | 'On Leave' | 'Probation'>('Probation');
  const [newEmpManager, setNewEmpManager] = useState('');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');

  // Selected Employee object
  const currentEmployee = useMemo(() => {
    return employees.find(e => e.id === selectedEmployeeId) || null;
  }, [employees, selectedEmployeeId]);

  // Derived Statistics (Top Dashboard Cards)
  const dashboardStats = useMemo(() => {
    const total = employees.length;
    let pendingVerification = 0;
    let missingDocs = 0;
    let expiringDocs = 0;
    let birthdaysThisMonth = 0;
    let anniversariesThisMonth = 0;
    let totalCompletion = 0;

    const currentMonth = new Date().getMonth() + 1; // 1-12

    employees.forEach(emp => {
      totalCompletion += emp.profileCompletion;
      
      const uniqueCategories = new Set(emp.documents.map(d => d.category));
      const coreCategories = ['Identity Verification', 'Tax Documents', 'Contracts & Legal', 'Education Documents', 'Banking Documents'];
      coreCategories.forEach(cat => {
        if (!uniqueCategories.has(cat)) {
          missingDocs++;
        }
      });

      emp.documents.forEach(doc => {
        if (doc.status === 'Pending Verification') pendingVerification++;
        if (doc.status === 'Missing') missingDocs++;
        if (doc.status === 'Expired') expiringDocs++;
      });

      if (emp.personalInfo.dob) {
        const dobMonth = parseInt(emp.personalInfo.dob.split('-')[1]);
        if (dobMonth === currentMonth) birthdaysThisMonth++;
      }

      if (emp.personalInfo.marriageDate) {
        const marMonth = parseInt(emp.personalInfo.marriageDate.split('-')[1]);
        if (marMonth === currentMonth) anniversariesThisMonth++;
      }
    });

    const averageCompletion = total > 0 ? Math.round(totalCompletion / total) : 0;

    return {
      total,
      pendingVerification,
      missingDocs,
      expiringDocs,
      birthdaysThisMonth,
      anniversariesThisMonth,
      averageCompletion
    };
  }, [employees]);

  // Filtered Employees List for Directory Table
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                            emp.id.toLowerCase().includes(search.toLowerCase()) ||
                            emp.role.toLowerCase().includes(search.toLowerCase());
      
      const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
      const matchesRole = roleFilter === 'All' || emp.role === roleFilter;
      const matchesLoc = locFilter === 'All' || emp.location === locFilter;
      const matchesStatus = statusFilter === 'All' || emp.employmentStatus === statusFilter;
      
      let matchesComp = true;
      if (compFilter !== 'All') {
        if (compFilter === '100') matchesComp = emp.profileCompletion === 100;
        else if (compFilter === '90+') matchesComp = emp.profileCompletion >= 90;
        else if (compFilter === '80-90') matchesComp = emp.profileCompletion >= 80 && emp.profileCompletion < 90;
        else if (compFilter === '<80') matchesComp = emp.profileCompletion < 80;
      }

      let matchesDoc = true;
      if (docFilter !== 'All') {
        const statuses = emp.documents.map(d => d.status);
        if (docFilter === 'Verified') matchesDoc = statuses.every(s => s === 'Verified' || s === 'Missing' === false) && statuses.length > 0;
        else if (docFilter === 'Pending') matchesDoc = statuses.includes('Pending Verification');
        else if (docFilter === 'Action Required') matchesDoc = statuses.includes('Rejected') || statuses.includes('Expired');
      }

      return matchesSearch && matchesDept && matchesRole && matchesLoc && matchesStatus && matchesComp && matchesDoc;
    });
  }, [employees, search, deptFilter, roleFilter, locFilter, statusFilter, compFilter, docFilter]);

  const calculateMarriageAnniversary = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const marriage = new Date(dateStr);
    const today = new Date();
    let years = today.getFullYear() - marriage.getFullYear();
    const m = today.getMonth() - marriage.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < marriage.getDate())) {
      years--;
    }
    return `${years} Years`;
  };

  const getDepartmentBadgeColor = (dept: string) => {
    switch (dept) {
      case 'Engineering': return 'bg-indigo-55 text-indigo-700 border-indigo-200';
      case 'Operations': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Human Resources': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Technology': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-250';
      case 'On Leave': return 'bg-amber-50 text-amber-700 border-amber-250';
      case 'Probation': return 'bg-blue-50 text-blue-700 border-blue-250';
      default: return 'bg-rose-50 text-rose-700 border-rose-250';
    }
  };

  const getDocStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Pending Verification': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Rejected': return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Expired': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-350';
    }
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName || !newEmpRole || !newEmpEmail || !newEmpPhone) {
      showToast('Please fill out all mandatory fields.', 'error');
      return;
    }

    const newId = `emp_0${employees.length + 1}`;
    const newRecord: EmployeeRecord = {
      id: newId,
      name: newEmpName,
      role: newEmpRole,
      department: newEmpDept,
      location: newEmpLocation,
      joiningDate: newEmpJoiningDate,
      employmentStatus: newEmpStatus,
      manager: newEmpManager || 'Pooja Reddy (HR Head)',
      profileCompletion: 45,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      personalInfo: {
        dob: '1998-01-01',
        gender: 'Male',
        bloodGroup: 'B+',
        nationality: 'Indian',
        maritalStatus: 'Single',
        personalEmail: newEmpEmail,
        officialEmail: `${newEmpName.toLowerCase().replace(/\s+/g, '.')}@innovibemobility.com`,
        mobile: newEmpPhone,
        alternateNumber: '',
        currentAddress: '',
        permanentAddress: '',
        aadhaar: '',
        pan: '',
        passport: '',
        drivingLicense: '',
        voterId: '',
        pfNumber: '',
        esicNumber: '',
        uanNumber: ''
      },
      familyInfo: {
        father: { name: '', dob: '', occupation: '', phone: '' },
        mother: { name: '', dob: '', occupation: '', phone: '' },
        siblings: [],
        children: []
      },
      education: {
        certifications: []
      },
      previousEmployment: [],
      documents: [],
      payroll: {
        currentSalary: '₹25,000 / Month',
        ctc: '₹3.0 LPA',
        salaryHistory: [],
        incrementHistory: [],
        bonusHistory: []
      },
      references: [],
      bankDetails: {
        accountHolder: newEmpName,
        bankName: '',
        branch: '',
        accountNumber: '',
        ifsc: '',
        upi: ''
      },
      medicalDetails: {
        bloodGroup: 'B+',
        allergies: '',
        medicalConditions: '',
        insuranceProvider: '',
        insuranceNumber: '',
        nomineeName: ''
      },
      emergencyContacts: {
        primary: { name: '', relation: '', phone: '', address: '' },
        secondary: { name: '', relation: '', phone: '', address: '' }
      },
      timeline: [
        { date: newEmpJoiningDate, event: 'Record Initialized', details: 'Employee profile shell created by HR.', type: 'status' }
      ],
      hrNotes: {
        internalNotes: 'New joiner. Documentation pending.',
        performanceNotes: '',
        warnings: '',
        promotionRecommendations: '',
        salaryDiscussion: '',
        confidentialRemarks: ''
      }
    };

    setEmployees([...employees, newRecord]);
    setIsAddModalOpen(false);
    showToast(`Successfully created employee record for ${newEmpName}!`, 'success');
    
    setNewEmpName('');
    setNewEmpRole('');
    setNewEmpManager('');
    setNewEmpEmail('');
    setNewEmpPhone('');
  };

  const handleVerifyDocument = (empId: string, docId: string) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === empId) {
        const updatedDocs = emp.documents.map(doc => {
          if (doc.id === docId) {
            showToast(`Document "${doc.name}" marked as Verified.`, 'success');
            return {
              ...doc,
              status: 'Verified' as const,
              verifiedBy: 'Pooja Reddy',
              verificationDate: new Date().toISOString().split('T')[0]
            };
          }
          return doc;
        });

        const verifiedCount = updatedDocs.filter(d => d.status === 'Verified').length;
        const totalDocsCount = updatedDocs.length;
        const docPercent = totalDocsCount > 0 ? (verifiedCount / totalDocsCount) * 20 : 0;
        const newCompletion = Math.min(100, Math.round(75 + docPercent));

        return {
          ...emp,
          documents: updatedDocs,
          profileCompletion: newCompletion,
          timeline: [
            {
              date: new Date().toISOString().split('T')[0],
              event: 'Document Verified',
              details: `Verified document ID: ${docId}`,
              type: 'verify'
            },
            ...emp.timeline
          ]
        };
      }
      return emp;
    }));
  };

  const handleRejectDocument = (empId: string, docId: string) => {
    const remarks = prompt("Please enter the reason for rejection:") || "Documents details fuzzy or mismatch.";
    setEmployees(prev => prev.map(emp => {
      if (emp.id === empId) {
        const updatedDocs = emp.documents.map(doc => {
          if (doc.id === docId) {
            showToast(`Document "${doc.name}" rejected.`, 'warning');
            return {
              ...doc,
              status: 'Rejected' as const,
              remarks
            };
          }
          return doc;
        });

        return {
          ...emp,
          documents: updatedDocs,
          timeline: [
            {
              date: new Date().toISOString().split('T')[0],
              event: 'Document Rejected',
              details: `Rejected document ID: ${docId}. Reason: ${remarks}`,
              type: 'verify'
            },
            ...emp.timeline
          ]
        };
      }
      return emp;
    }));
  };

  const handleSimulatedUpload = (empId: string, category: string) => {
    const docName = prompt("Enter file name to upload:", `Verification_${category.replace(/\s+/g, '_')}.pdf`);
    if (!docName) return;

    setEmployees(prev => prev.map(emp => {
      if (emp.id === empId) {
        const newDoc: DocumentRecord = {
          id: `doc_${Date.now()}`,
          name: docName,
          category,
          uploadDate: new Date().toISOString().split('T')[0],
          uploadedBy: 'Pooja Reddy',
          status: 'Pending Verification',
          fileSize: '1.8 MB'
        };

        showToast(`Document "${docName}" uploaded successfully. Verification pending.`, 'success');

        return {
          ...emp,
          documents: [...emp.documents, newDoc],
          timeline: [
            {
              date: new Date().toISOString().split('T')[0],
              event: 'Document Uploaded',
              details: `Uploaded: ${docName} under ${category}`,
              type: 'upload'
            },
            ...emp.timeline
          ]
        };
      }
      return emp;
    }));
  };

  return (
    <div className="space-y-6 text-left">
      
      {!selectedEmployeeId ? (
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Headcount</span>
                <p className="text-2xl font-black text-slate-900 leading-none">{dashboardStats.total}</p>
                <span className="text-[9px] text-slate-450 font-bold block mt-1">Active staff records</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-150 flex items-center justify-center text-blue-600">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Pending Verification</span>
                <p className="text-2xl font-black text-amber-600 leading-none">{dashboardStats.pendingVerification}</p>
                <span className="text-[9px] text-amber-600 font-bold block mt-1">Awaiting review</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-150 flex items-center justify-center text-amber-600">
                <Clock className="h-5 w-5 animate-pulse" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Missing Documents</span>
                <p className="text-2xl font-black text-red-600 leading-none">{dashboardStats.missingDocs}</p>
                <span className="text-[9px] text-red-500 font-bold block mt-1">Action required</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-red-50 border border-red-150 flex items-center justify-center text-red-650">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Avg Profile Completion</span>
                <p className="text-2xl font-black text-blue-650 leading-none">{dashboardStats.averageCompletion}%</p>
                <div className="w-20 bg-slate-150 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${dashboardStats.averageCompletion}%` }} />
                </div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-150 flex items-center justify-center text-blue-600">
                <Activity className="h-5 w-5" />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
            
            <div className="xl:col-span-3 space-y-6">
              
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-3xs space-y-4">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative grow max-w-md">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, employee ID, or role..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 font-sans transition-all"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-blue-650 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Employee Record</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs font-bold text-slate-650">
                  
                  <div className="space-y-1">
                    <label className="block text-[8px] uppercase tracking-wider text-slate-400">Department</label>
                    <select
                      value={deptFilter}
                      onChange={(e) => setDeptFilter(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-white font-sans text-[11px] outline-none focus:border-blue-500"
                    >
                      <option value="All">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Operations">Operations</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[8px] uppercase tracking-wider text-slate-400">Location</label>
                    <select
                      value={locFilter}
                      onChange={(e) => setLocFilter(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-white font-sans text-[11px] outline-none focus:border-blue-500"
                    >
                      <option value="All">All Locations</option>
                      <option value="Kakinada Main Hub">Kakinada Hub</option>
                      <option value="Rajahmundry Center">Rajahmundry</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[8px] uppercase tracking-wider text-slate-400">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-white font-sans text-[11px] outline-none focus:border-blue-500"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Probation">Probation</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[8px] uppercase tracking-wider text-slate-400">Profile Completion</label>
                    <select
                      value={compFilter}
                      onChange={(e) => setCompFilter(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-white font-sans text-[11px] outline-none focus:border-blue-500"
                    >
                      <option value="All">All Levels</option>
                      <option value="100">100% Complete</option>
                      <option value="90+">90% +</option>
                      <option value="80-90">80% - 90%</option>
                      <option value="<80">&lt; 80%</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[8px] uppercase tracking-wider text-slate-400">Document Status</label>
                    <select
                      value={docFilter}
                      onChange={(e) => setDocFilter(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-white font-sans text-[11px] outline-none focus:border-blue-500"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Verified">Fully Verified</option>
                      <option value="Pending">Pending Audit</option>
                      <option value="Action Required">Action Required</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearch('');
                        setDeptFilter('All');
                        setLocFilter('All');
                        setStatusFilter('All');
                        setCompFilter('All');
                        setDocFilter('All');
                        showToast('Filters cleared successfully.', 'info');
                      }}
                      className="w-full py-2.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 text-[10px] font-black uppercase text-center"
                    >
                      Reset Filters
                    </button>
                  </div>

                </div>

              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-3xs">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Employee Directory</h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800">
                    {filteredEmployees.length} Records Found
                  </span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-455 tracking-wider">
                        <th className="py-3.5 px-6">Employee Info</th>
                        <th className="py-3.5 px-4">Department & Role</th>
                        <th className="py-3.5 px-4">Joining Date</th>
                        <th className="py-3.5 px-4">Completion</th>
                        <th className="py-3.5 px-4">Document Status</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEmployees.map((emp) => {
                        const docStatuses = emp.documents.map(d => d.status);
                        const hasPending = docStatuses.includes('Pending Verification');
                        const hasRejected = docStatuses.includes('Rejected');
                        const hasMissing = docStatuses.length < 5 || docStatuses.includes('Missing');

                        let summaryDocStatus: 'Verified' | 'Pending Verification' | 'Action Required' = 'Verified';
                        if (hasRejected || hasMissing) summaryDocStatus = 'Action Required';
                        else if (hasPending) summaryDocStatus = 'Pending Verification';

                        return (
                          <tr key={emp.id} className="hover:bg-slate-50/50 transition-all font-sans group">
                            
                            <td className="py-4 px-6 flex items-center gap-3">
                              <img
                                src={emp.avatar}
                                alt={emp.name}
                                className="h-10 w-10 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <h4 className="font-extrabold text-slate-800 group-hover:text-blue-650 transition-colors leading-none">
                                  {emp.name}
                                </h4>
                                <span className="text-[10px] font-bold font-mono text-slate-400 mt-1 block">
                                  {emp.id.toUpperCase()}
                                </span>
                              </div>
                            </td>

                            <td className="py-4 px-4 font-semibold text-slate-655">
                              <p className="font-extrabold text-slate-850">{emp.role}</p>
                              <span className={`inline-block text-[8px] font-black px-1.5 py-0.2 rounded border uppercase tracking-wider mt-1 ${getDepartmentBadgeColor(emp.department)}`}>
                                {emp.department}
                              </span>
                            </td>

                            <td className="py-4 px-4 font-mono font-bold text-slate-500">
                              {emp.joiningDate}
                            </td>

                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-extrabold text-slate-805">{emp.profileCompletion}%</span>
                                <div className="w-16 bg-slate-100 rounded-full h-1 overflow-hidden">
                                  <div
                                    className={`h-1 rounded-full ${emp.profileCompletion === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                                    style={{ width: `${emp.profileCompletion}%` }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-full border ${getDocStatusBadgeColor(summaryDocStatus)}`}>
                                {summaryDocStatus}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-md border ${getStatusBadgeColor(emp.employmentStatus)}`}>
                                {emp.employmentStatus}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedEmployeeId(emp.id);
                                    setActiveTab('Overview');
                                  }}
                                  className="p-1.5 hover:bg-blue-50 text-blue-650 rounded-lg transition-all"
                                  title="View Profile"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedEmployeeId(emp.id);
                                    setActiveTab('Personal');
                                  }}
                                  className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-all"
                                  title="Edit Record"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedEmployeeId(emp.id);
                                    setActiveTab('Documents');
                                  }}
                                  className="p-1.5 hover:bg-emerald-50 text-emerald-650 rounded-lg transition-all"
                                  title="Upload Documents"
                                >
                                  <UploadCloud className="h-4 w-4" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        );
                      })}

                      {filteredEmployees.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400 font-bold text-xs space-y-2">
                            <Users className="h-8 w-8 mx-auto text-slate-300" />
                            <p>No matching employee records found.</p>
                            <p className="text-[10px] text-slate-400 font-normal">Try altering your advanced filters or search phrase.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  <span>Upcoming Birthdays</span>
                </h4>
                <div className="divide-y divide-slate-100">
                  {employees
                    .filter(emp => emp.personalInfo.dob)
                    .map(emp => {
                      const [, month, day] = emp.personalInfo.dob.split('-');
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      return (
                        <div key={emp.id} className="py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={emp.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                            <div>
                              <p className="font-extrabold text-slate-800 text-[11px]">{emp.name}</p>
                              <p className="text-[9px] text-slate-400 font-bold">{emp.role}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                            {day} {months[parseInt(month) - 1]}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Marriage Anniversaries</span>
                </h4>
                <div className="divide-y divide-slate-100">
                  {employees
                    .filter(emp => emp.personalInfo.marriageDate)
                    .map(emp => {
                      const [, month, day] = emp.personalInfo.marriageDate!.split('-');
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      return (
                        <div key={emp.id} className="py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={emp.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                            <div>
                              <p className="font-extrabold text-slate-800 text-[11px]">{emp.name}</p>
                              <p className="text-[9px] text-slate-400 font-bold">Anniversary Milestone</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                            {day} {months[parseInt(month) - 1]}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <span>Pending Documents Audit</span>
                </h4>
                <div className="divide-y divide-slate-100">
                  {employees
                    .flatMap(emp => emp.documents.filter(d => d.status === 'Pending Verification').map(d => ({ emp, doc: d })))
                    .slice(0, 4)
                    .map(({ emp, doc }) => (
                      <div key={doc.id} className="py-2.5 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-extrabold text-slate-850 text-[11px]">{emp.name}</p>
                          <span className="text-[8px] font-black font-mono text-slate-400">{doc.uploadDate}</span>
                        </div>
                        <p className="text-[10px] text-slate-650 font-bold truncate">{doc.name}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[8px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            {doc.category}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedEmployeeId(emp.id);
                              setActiveTab('Documents');
                            }}
                            className="text-[9px] text-blue-600 hover:text-blue-700 font-black uppercase"
                          >
                            Verify Now
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-red-500" />
                  <span>Expiring Documents</span>
                </h4>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 text-center leading-normal">
                  All active driving licenses & visa records are currently within validity limits. No immediate expiries detected.
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        
        <div className="space-y-6">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            
            <button
              onClick={() => setSelectedEmployeeId(null)}
              className="absolute top-4 left-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4 text-left">
              
              <div className="flex items-center gap-4">
                <img
                  src={currentEmployee?.avatar}
                  alt={currentEmployee?.name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-slate-50 shadow-md"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{currentEmployee?.name}</h2>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${getStatusBadgeColor(currentEmployee!.employmentStatus)}`}>
                      {currentEmployee?.employmentStatus}
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800">{currentEmployee?.role}</p>
                  <p className="text-[10px] text-slate-450 font-bold">
                    {currentEmployee?.id.toUpperCase()} • {currentEmployee?.department} • {currentEmployee?.location}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-64 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
                  <span>Profile Completion</span>
                  <span>{currentEmployee?.profileCompletion}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${currentEmployee?.profileCompletion}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-450">
                  <span>Manager: {currentEmployee?.manager.split(' ')[0]}</span>
                  <span>Joined: {currentEmployee?.joiningDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActiveTab('Personal');
                    showToast('Opening Personal Details to edit...', 'info');
                  }}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-3xs flex items-center gap-1.5 transition-all"
                >
                  <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => handleSimulatedUpload(currentEmployee!.id, 'Identity Verification')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>Upload Documents</span>
                </button>
                <button
                  onClick={() => {
                    showToast(`Downloading unified ZIP record for ${currentEmployee?.name}...`, 'success');
                  }}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-3xs flex items-center gap-1.5 transition-all"
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  <span>Download File</span>
                </button>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-3 space-y-1">
              {[
                { label: 'Overview', value: 'Overview', icon: Activity },
                { label: 'Personal Information', value: 'Personal', icon: User },
                { label: 'Family Information', value: 'Family', icon: Users },
                { label: 'Education', value: 'Education', icon: GraduationCap },
                { label: 'Previous Employment', value: 'PreviousEmployment', icon: Briefcase },
                { label: 'Documents', value: 'Documents', icon: FileSignature },
                { label: 'Payroll', value: 'Payroll', icon: DollarSign },
                { label: 'References', value: 'References', icon: ClipboardList },
                { label: 'Bank Details', value: 'Bank', icon: CreditCard },
                { label: 'Medical Details', value: 'Medical', icon: Heart },
                { label: 'Emergency Contacts', value: 'Emergency', icon: Phone },
                { label: 'Timeline', value: 'Timeline', icon: Clock },
                { label: 'HR Notes', value: 'HRNotes', icon: Lock }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value as any)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 min-h-[500px]">
              
              {activeTab === 'Overview' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Overview Profile Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase">Key Indicators</h4>
                        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Birthday</p>
                            <p className="font-extrabold text-slate-805">{currentEmployee?.personalInfo.dob}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Anniversary</p>
                            <p className="font-extrabold text-slate-850">
                              {currentEmployee?.personalInfo.marriageDate 
                                ? currentEmployee?.personalInfo.marriageDate 
                                : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Blood Group</p>
                            <p className="font-extrabold text-rose-600">{currentEmployee?.medicalDetails.bloodGroup}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Primary Contact</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee?.emergencyContacts.primary.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase">Document Breakdown</h4>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2 bg-white border border-slate-150 rounded-xl">
                            <p className="font-mono font-black text-slate-800">
                              {currentEmployee?.documents.filter(d => d.status === 'Verified').length}
                            </p>
                            <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">Verified</p>
                          </div>
                          <div className="p-2 bg-white border border-slate-150 rounded-xl">
                            <p className="font-mono font-black text-amber-600">
                              {currentEmployee?.documents.filter(d => d.status === 'Pending Verification').length}
                            </p>
                            <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">Pending</p>
                          </div>
                          <div className="p-2 bg-white border border-slate-150 rounded-xl">
                            <p className="font-mono font-black text-red-500">
                              {currentEmployee?.documents.filter(d => d.status === 'Missing' || d.status === 'Rejected').length}
                            </p>
                            <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">Issues</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase">Recent Activities</h4>
                        <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-4 max-h-60 overflow-y-auto">
                          {currentEmployee?.timeline.slice(0, 3).map((event, idx) => (
                            <div key={idx} className="relative text-xs text-left">
                              <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-blue-600 ring-4 ring-white" />
                              <p className="font-extrabold text-slate-855">{event.event}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{event.details}</p>
                              <span className="text-[8px] text-slate-400 font-mono mt-0.5 block">{event.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'Personal' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Personal Information & Key Identifiers
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Official Name</p>
                        <p className="font-extrabold text-slate-800 mt-0.5 text-sm">{currentEmployee?.name}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">DOB (Date of Birth)</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.personalInfo.dob}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Gender</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.personalInfo.gender}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Blood Group</p>
                        <p className="font-extrabold text-rose-600 mt-0.5">{currentEmployee?.personalInfo.bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Nationality</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.personalInfo.nationality}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Marital Status</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.personalInfo.maritalStatus}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Official Email</p>
                        <p className="font-extrabold text-slate-800 mt-0.5 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <span>{currentEmployee?.personalInfo.officialEmail}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Personal Email</p>
                        <p className="font-extrabold text-slate-800 mt-0.5 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <span>{currentEmployee?.personalInfo.personalEmail}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Mobile</p>
                        <p className="font-extrabold text-slate-800 mt-0.5 flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          <span>{currentEmployee?.personalInfo.mobile}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Alternate Contact</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">
                          {currentEmployee?.personalInfo.alternateNumber || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Current Address</p>
                        <p className="font-extrabold text-slate-800 mt-0.5 leading-normal">
                          {currentEmployee?.personalInfo.currentAddress || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Permanent Address</p>
                        <p className="font-extrabold text-slate-800 mt-0.5 leading-normal">
                          {currentEmployee?.personalInfo.permanentAddress || 'N/A'}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase mb-3">Govt Registrations & PF Schemes</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="text-[9px] text-slate-450 uppercase block mb-1">Aadhaar Card</span>
                        <span className="font-mono font-extrabold text-slate-850">{currentEmployee?.personalInfo.aadhaar || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="text-[9px] text-slate-455 uppercase block mb-1">PAN Card</span>
                        <span className="font-mono font-extrabold text-slate-855">{currentEmployee?.personalInfo.pan || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="text-[9px] text-slate-450 uppercase block mb-1">Passport</span>
                        <span className="font-mono font-extrabold text-slate-850">{currentEmployee?.personalInfo.passport || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="text-[9px] text-slate-450 uppercase block mb-1">Driving License</span>
                        <span className="font-mono font-extrabold text-slate-850">{currentEmployee?.personalInfo.drivingLicense || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="text-[9px] text-slate-450 uppercase block mb-1">PF Number</span>
                        <span className="font-mono font-extrabold text-slate-850">{currentEmployee?.personalInfo.pfNumber || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="text-[9px] text-slate-450 uppercase block mb-1">ESIC Number</span>
                        <span className="font-mono font-extrabold text-slate-850">{currentEmployee?.personalInfo.esicNumber || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="text-[9px] text-slate-450 uppercase block mb-1">UAN Number</span>
                        <span className="font-mono font-extrabold text-slate-850">{currentEmployee?.personalInfo.uanNumber || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'Family' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Family Information Details
                    </h3>
                  </div>

                  <div className="space-y-6 text-xs">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-150 pb-1.5">
                          <h4 className="font-extrabold text-slate-800">Father</h4>
                        </div>
                        <div className="space-y-1.5 font-semibold text-slate-655">
                          <p>Name: <strong className="text-slate-950">{currentEmployee?.familyInfo.father.name || 'N/A'}</strong></p>
                          <p>DOB: <strong className="text-slate-850">{currentEmployee?.familyInfo.father.dob || 'N/A'}</strong></p>
                          <p>Occupation: <strong className="text-slate-800">{currentEmployee?.familyInfo.father.occupation || 'N/A'}</strong></p>
                          <p>Phone: <strong className="text-slate-800">{currentEmployee?.familyInfo.father.phone || 'N/A'}</strong></p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-155 pb-1.5">
                          <h4 className="font-extrabold text-slate-800">Mother</h4>
                        </div>
                        <div className="space-y-1.5 font-semibold text-slate-650">
                          <p>Name: <strong className="text-slate-950">{currentEmployee?.familyInfo.mother.name || 'N/A'}</strong></p>
                          <p>DOB: <strong className="text-slate-850">{currentEmployee?.familyInfo.mother.dob || 'N/A'}</strong></p>
                          <p>Occupation: <strong className="text-slate-800">{currentEmployee?.familyInfo.mother.occupation || 'N/A'}</strong></p>
                          <p>Phone: <strong className="text-slate-800">{currentEmployee?.familyInfo.mother.phone || 'N/A'}</strong></p>
                        </div>
                      </div>

                    </div>

                    {currentEmployee?.personalInfo.maritalStatus === 'Married' && currentEmployee?.familyInfo.spouse && (
                      <div className="p-4 border border-blue-200 bg-blue-50/20 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-blue-200/55 pb-1.5">
                          <h4 className="font-extrabold text-blue-900">Spouse</h4>
                          <span className="text-[10px] font-black text-blue-800 bg-blue-100 border border-blue-250 px-2 py-0.5 rounded">
                            Anniversary: {calculateMarriageAnniversary(currentEmployee.familyInfo.spouse.marriageDate)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-semibold text-slate-650">
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Spouse Name</p>
                            <p className="font-extrabold text-slate-850">{currentEmployee.familyInfo.spouse.name}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Date of Birth</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.familyInfo.spouse.dob}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Occupation</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.familyInfo.spouse.occupation}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Phone Number</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.familyInfo.spouse.phone}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-800">Siblings</h4>
                        <button
                          onClick={() => showToast('Simulating: Sibling record added.', 'success')}
                          className="text-[10px] text-blue-600 hover:text-blue-750 font-black uppercase flex items-center gap-1"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span>Add Sibling</span>
                        </button>
                      </div>
                      
                      {currentEmployee?.familyInfo.siblings.length === 0 ? (
                        <p className="text-slate-450 italic py-2">No sibling records declared.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentEmployee?.familyInfo.siblings.map((sib, index) => (
                            <div key={index} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                              <p className="font-extrabold text-slate-850">{sib.name}</p>
                              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-550 font-semibold mt-1.5">
                                <p>Relation: <strong>Brother</strong></p>
                                <p>DOB: <strong>{sib.dob}</strong></p>
                                <p>Occupation: <strong>{sib.occupation}</strong></p>
                                <p>Phone: <strong>{sib.phone}</strong></p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-800">Children</h4>
                        <button
                          onClick={() => showToast('Simulating: Child record added.', 'success')}
                          className="text-[10px] text-blue-600 hover:text-blue-755 font-black uppercase flex items-center gap-1"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span>Add Child</span>
                        </button>
                      </div>
                      
                      {currentEmployee?.familyInfo.children.length === 0 ? (
                        <p className="text-slate-450 italic py-2">No children records declared.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentEmployee?.familyInfo.children.map((child, index) => (
                            <div key={index} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                              <div className="flex items-center justify-between">
                                <p className="font-extrabold text-slate-855">{child.name}</p>
                                <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200">
                                  Birthday Reminders Active
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-550 font-semibold">
                                <p>Gender: <strong>{child.gender}</strong></p>
                                <p>DOB: <strong>{child.dob}</strong></p>
                                <p>School: <strong>{child.school}</strong></p>
                                <p>Blood Group: <strong className="text-rose-600">{child.bloodGroup}</strong></p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              )}

              {activeTab === 'Education' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Educational Qualifications
                  </h3>

                  <div className="space-y-4 text-xs font-semibold text-slate-650">
                    
                    {currentEmployee?.education.ssc && (
                      <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-850">Secondary School Certificate (SSC)</h4>
                          <p className="text-[10px] text-slate-450">{currentEmployee.education.ssc.institution} ({currentEmployee.education.ssc.boardUniversity})</p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold">
                          <div>
                            <p className="text-[8px] text-slate-400 uppercase">Passing Year</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.education.ssc.passingYear}</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-slate-400 uppercase">Score</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.education.ssc.percentageCgpa}</p>
                          </div>
                          {currentEmployee.education.ssc.certificateName && (
                            <button
                              onClick={() => showToast(`Downloading: ${currentEmployee.education.ssc?.certificateName}`, 'info')}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                            >
                              <Download className="h-3 w-3" />
                              <span>Certificate</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {currentEmployee?.education.intermediate && (
                      <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-850">Intermediate (10+2)</h4>
                          <p className="text-[10px] text-slate-450">{currentEmployee.education.intermediate.institution} ({currentEmployee.education.intermediate.boardUniversity})</p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold">
                          <div>
                            <p className="text-[8px] text-slate-400 uppercase">Passing Year</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.education.intermediate.passingYear}</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-slate-400 uppercase">Score</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.education.intermediate.percentageCgpa}</p>
                          </div>
                          {currentEmployee.education.intermediate.certificateName && (
                            <button
                              onClick={() => showToast(`Downloading: ${currentEmployee.education.intermediate?.certificateName}`, 'info')}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                            >
                              <Download className="h-3 w-3" />
                              <span>Certificate</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {currentEmployee?.education.ug && (
                      <div className="p-4 border border-blue-200 bg-blue-50/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-blue-900">Undergraduate Degree (UG)</h4>
                          <p className="text-[10px] text-slate-500 font-bold">{currentEmployee.education.ug.institution} ({currentEmployee.education.ug.boardUniversity})</p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold">
                          <div>
                            <p className="text-[8px] text-slate-400 uppercase">Passing Year</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.education.ug.passingYear}</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-slate-400 uppercase">Score</p>
                            <p className="font-extrabold text-slate-800">{currentEmployee.education.ug.percentageCgpa}</p>
                          </div>
                          {currentEmployee.education.ug.certificateName && (
                            <button
                              onClick={() => showToast(`Downloading: ${currentEmployee.education.ug?.certificateName}`, 'info')}
                              className="px-2.5 py-1.5 rounded-lg border border-blue-200 bg-white hover:bg-slate-50 text-blue-800 flex items-center gap-1"
                            >
                              <Download className="h-3 w-3" />
                              <span>Certificate</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-800">Professional Certifications</h4>
                        <button
                          onClick={() => showToast('Simulating: Certification upload drawer.', 'info')}
                          className="text-[10px] text-blue-600 hover:text-blue-755 font-black uppercase flex items-center gap-1"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span>Add Certification</span>
                        </button>
                      </div>

                      {currentEmployee?.education.certifications.length === 0 ? (
                        <p className="text-slate-400 italic">No certifications recorded.</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-2">
                          {currentEmployee?.education.certifications.map((cert, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
                              <div>
                                <p className="font-extrabold text-slate-805">{cert.degree}</p>
                                <p className="text-[9px] text-slate-450">{cert.institution} • Passed {cert.passingYear}</p>
                              </div>
                              <button
                                onClick={() => showToast(`Downloading cert file...`, 'info')}
                                className="p-1 text-slate-400 hover:text-blue-650"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              )}

              {activeTab === 'PreviousEmployment' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Work Experience History
                    </h3>
                  </div>

                  {currentEmployee?.previousEmployment.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 font-bold text-xs space-y-2">
                      <Briefcase className="h-8 w-8 mx-auto text-slate-300" />
                      <p>No previous company records found.</p>
                      <p className="text-[10px] text-slate-400 font-normal">This employee might be a fresher or first-job joiner.</p>
                    </div>
                  ) : (
                    <div className="space-y-6 text-xs">
                      {currentEmployee?.previousEmployment.map((comp, idx) => (
                        <div key={idx} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4">
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/50 pb-2">
                            <div>
                              <h4 className="font-black text-slate-900 text-sm">{comp.companyName}</h4>
                              <p className="text-[10px] text-slate-500 font-bold">
                                {comp.designation} • {comp.joiningDate} to {comp.relievingDate} ({comp.experience})
                              </p>
                            </div>
                            <span className="text-[10px] font-black text-slate-805 bg-slate-100 border border-slate-250 px-2.5 py-1 rounded-lg">
                              Salary: {comp.salary}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-semibold text-slate-600">
                            <div>
                              <p className="text-[9px] text-slate-400 uppercase">Employee ID</p>
                              <p className="font-extrabold text-slate-800">{comp.employeeId || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 uppercase">Manager Name</p>
                              <p className="font-extrabold text-slate-800">{comp.manager || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 uppercase">Reason For Leaving</p>
                              <p className="font-extrabold text-slate-800 leading-normal">{comp.reasonForLeaving}</p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-150/60">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Uploaded Experience Documents</p>
                            <div className="flex flex-wrap gap-2">
                              {comp.documents.offerLetter && (
                                <button
                                  onClick={() => showToast('Downloading Offer Letter...', 'info')}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-700 flex items-center gap-1.5"
                                >
                                  <FileText className="h-3.5 w-3.5 text-blue-500" />
                                  <span>Offer Letter</span>
                                </button>
                              )}
                              {comp.documents.experienceLetter && (
                                <button
                                  onClick={() => showToast('Downloading Experience Letter...', 'info')}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-700 flex items-center gap-1.5"
                                >
                                  <FileText className="h-3.5 w-3.5 text-emerald-500" />
                                  <span>Experience Letter</span>
                                </button>
                              )}
                              {comp.documents.relievingLetter && (
                                <button
                                  onClick={() => showToast('Downloading Relieving Letter...', 'info')}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-700 flex items-center gap-1.5"
                                >
                                  <FileText className="h-3.5 w-3.5 text-rose-500" />
                                  <span>Relieving Letter</span>
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'Documents' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Document Verification Archives
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Identity Verification',
                      'Tax Documents',
                      'Contracts & Legal',
                      'NDA & Confidentiality',
                      'Education Documents',
                      'Employment Documents',
                      'Payroll Documents',
                      'Banking Documents',
                      'Medical & Insurance',
                      'Other Documents'
                    ].map((category, index) => {
                      const catDocs = currentEmployee?.documents.filter(d => d.category === category) || [];
                      return (
                        <div key={index} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 transition-all space-y-3 shadow-3xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileCheck className="h-5 w-5 text-blue-650" />
                              <h4 className="text-xs font-black text-slate-805">{category}</h4>
                            </div>
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                              {catDocs.length} Docs
                            </span>
                          </div>

                          <div className="divide-y divide-slate-100">
                            {catDocs.map(doc => (
                              <div key={doc.id} className="py-2.5 text-[11px] font-semibold text-slate-655 space-y-1.5">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="truncate">
                                    <p className="font-extrabold text-slate-850 truncate">{doc.name}</p>
                                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">Size: {doc.fileSize} • Uploaded: {doc.uploadDate}</p>
                                  </div>
                                  <span className={`text-[8px] font-black px-2 py-0.5 rounded shrink-0 border ${getDocStatusBadgeColor(doc.status)}`}>
                                    {doc.status}
                                  </span>
                                </div>

                                {doc.remarks && (
                                  <div className="p-2 bg-rose-50 border border-rose-100 rounded-lg text-[9px] text-rose-700 font-bold leading-normal">
                                    Rejection Remarks: {doc.remarks}
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-1 text-[9px] font-black uppercase">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => showToast(`Previewing ${doc.name}...`, 'info')}
                                      className="text-slate-500 hover:text-slate-800 flex items-center gap-0.5"
                                    >
                                      <Eye className="h-3 w-3" />
                                      <span>Preview</span>
                                    </button>
                                    <button
                                      onClick={() => showToast(`Downloading ${doc.name}...`, 'success')}
                                      className="text-slate-500 hover:text-slate-850 flex items-center gap-0.5"
                                    >
                                      <Download className="h-3 w-3" />
                                      <span>Download</span>
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-2 text-right">
                                    {doc.status !== 'Verified' && (
                                      <button
                                        onClick={() => handleVerifyDocument(currentEmployee!.id, doc.id)}
                                        className="text-emerald-600 hover:text-emerald-750 flex items-center gap-0.5"
                                      >
                                        <Check className="h-3.5 w-3.5" />
                                        <span>Verify</span>
                                      </button>
                                    )}
                                    {doc.status === 'Pending Verification' && (
                                      <button
                                        onClick={() => handleRejectDocument(currentEmployee!.id, doc.id)}
                                        className="text-rose-600 hover:text-rose-750 flex items-center gap-0.5"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                        <span>Reject</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}

                            {catDocs.length === 0 && (
                              <div className="py-4 text-center text-slate-400 italic text-[10px] flex items-center justify-between">
                                <span>No files uploaded under this category.</span>
                                <button
                                  onClick={() => handleSimulatedUpload(currentEmployee!.id, category)}
                                  className="text-[9px] text-blue-600 font-black uppercase hover:text-blue-750 flex items-center gap-1"
                                >
                                  <UploadCloud className="h-3.5 w-3.5" />
                                  <span>Upload</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {activeTab === 'Payroll' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Compensation & CTC Structure
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <p className="text-[9px] text-slate-400 uppercase">Monthly Salary</p>
                      <p className="text-lg font-black text-slate-900 mt-1">{currentEmployee?.payroll.currentSalary}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <p className="text-[9px] text-slate-400 uppercase">Current CTC</p>
                      <p className="text-lg font-black text-blue-600 mt-1">{currentEmployee?.payroll.ctc}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <p className="text-[9px] text-slate-400 uppercase">Previous Gross Salary</p>
                      <p className="text-lg font-black text-slate-500 mt-1">
                        {currentEmployee?.payroll.previousSalary || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-extrabold text-slate-800 text-xs">Increment & Adjustment History</h4>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-450 border-b border-slate-200">
                            <th className="py-2.5 px-4">Effective Date</th>
                            <th className="py-2.5 px-4">Adjustment Rate</th>
                            <th className="py-2.5 px-4">Old Salary</th>
                            <th className="py-2.5 px-4">New Salary</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans font-semibold text-slate-650">
                          {currentEmployee?.payroll.incrementHistory.map((inc, i) => (
                            <tr key={i} className="hover:bg-slate-50/20">
                              <td className="py-2.5 px-4 font-mono">{inc.date}</td>
                              <td className="py-2.5 px-4 text-emerald-600 font-extrabold">+{inc.percentage}</td>
                              <td className="py-2.5 px-4">{inc.oldSalary}</td>
                              <td className="py-2.5 px-4 font-black">{inc.newSalary}</td>
                            </tr>
                          ))}
                          {currentEmployee?.payroll.incrementHistory.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-4 text-center text-slate-400 italic">No increment logs active.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-extrabold text-slate-800 text-xs">Bonus & Festival Allowances</h4>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-450 border-b border-slate-200">
                            <th className="py-2.5 px-4">Date Dispatched</th>
                            <th className="py-2.5 px-4">Payout Amount</th>
                            <th className="py-2.5 px-4">Bonus Category</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans font-semibold text-slate-650">
                          {currentEmployee?.payroll.bonusHistory.map((bonus, i) => (
                            <tr key={i} className="hover:bg-slate-50/20">
                              <td className="py-2.5 px-4 font-mono">{bonus.date}</td>
                              <td className="py-2.5 px-4 font-extrabold text-slate-800">{bonus.amount}</td>
                              <td className="py-2.5 px-4 text-slate-500">{bonus.type}</td>
                            </tr>
                          ))}
                          {currentEmployee?.payroll.bonusHistory.length === 0 && (
                            <tr>
                              <td colSpan={3} className="py-4 text-center text-slate-400 italic">No historical payouts.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'References' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Professional References
                    </h3>
                  </div>

                  {currentEmployee?.references.length === 0 ? (
                    <p className="text-slate-400 italic text-xs">No reference logs registered.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                      {currentEmployee?.references.map((ref, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <h4 className="font-extrabold text-slate-855">{ref.name}</h4>
                          <div className="space-y-1 text-[11px] text-slate-550 leading-normal">
                            <p>Designation: <strong>{ref.designation} at {ref.company}</strong></p>
                            <p>Relationship: <strong>{ref.relationship}</strong></p>
                            <p>Mobile: <strong>{ref.phone}</strong></p>
                            <p>Email: <strong>{ref.email}</strong></p>
                            <p className="text-[9px] text-slate-400 font-mono">Ref Hash: {ref.referenceNumber}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'Bank' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Salary Payout Bank Account Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-655">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Account Holder Name</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.bankDetails.accountHolder}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Bank Name</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.bankDetails.bankName || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Branch Location</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.bankDetails.branch || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Account Number</p>
                        <p className="font-mono font-extrabold text-slate-800 mt-0.5">{currentEmployee?.bankDetails.accountNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">IFSC Code</p>
                        <p className="font-mono font-extrabold text-slate-800 mt-0.5">{currentEmployee?.bankDetails.ifsc || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">UPI ID Handler</p>
                        <p className="font-mono font-extrabold text-slate-800 mt-0.5">{currentEmployee?.bankDetails.upi || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {currentEmployee?.bankDetails.cancelledChequeName && (
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Cancelled Cheque Verification</p>
                      <button
                        onClick={() => showToast('Downloading Cancelled Cheque image...', 'info')}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 shadow-3xs"
                      >
                        <FileText className="h-4 w-4 text-rose-500" />
                        <span>{currentEmployee.bankDetails.cancelledChequeName}</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'Medical' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Medical Diagnostic Records & Insurance Policies
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-650">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Blood Group</p>
                        <p className="font-extrabold text-rose-600 mt-0.5">{currentEmployee?.medicalDetails.bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Declared Allergies</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.medicalDetails.allergies || 'No allergies declared.'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Chronic Medical Conditions</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.medicalDetails.medicalConditions || 'No conditions declared.'}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Insurance Provider</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.medicalDetails.insuranceProvider || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Group Policy Number</p>
                        <p className="font-mono font-extrabold text-slate-800 mt-0.5">{currentEmployee?.medicalDetails.insuranceNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Declared Policy Nominee</p>
                        <p className="font-extrabold text-slate-800 mt-0.5">{currentEmployee?.medicalDetails.nomineeName || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'Emergency' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Emergency Relational Contacts
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-650">
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-200/50 pb-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        <h4 className="font-extrabold text-slate-800">Primary Contact</h4>
                      </div>
                      <div className="space-y-1.5 text-slate-650">
                        <p>Name: <strong className="text-slate-900">{currentEmployee?.emergencyContacts.primary.name || 'N/A'}</strong></p>
                        <p>Relation: <strong className="text-slate-850">{currentEmployee?.emergencyContacts.primary.relation || 'N/A'}</strong></p>
                        <p>Phone: <strong className="text-slate-800">{currentEmployee?.emergencyContacts.primary.phone || 'N/A'}</strong></p>
                        <p>Address: <strong className="text-slate-700 leading-relaxed font-sans block mt-1">{currentEmployee?.emergencyContacts.primary.address || 'N/A'}</strong></p>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-200/50 pb-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                        <h4 className="font-extrabold text-slate-800">Secondary Contact</h4>
                      </div>
                      <div className="space-y-1.5 text-slate-650">
                        <p>Name: <strong className="text-slate-900">{currentEmployee?.emergencyContacts.secondary.name || 'N/A'}</strong></p>
                        <p>Relation: <strong className="text-slate-855">{currentEmployee?.emergencyContacts.secondary.relation || 'N/A'}</strong></p>
                        <p>Phone: <strong className="text-slate-800">{currentEmployee?.emergencyContacts.secondary.phone || 'N/A'}</strong></p>
                        <p>Address: <strong className="text-slate-700 leading-relaxed font-sans block mt-1">{currentEmployee?.emergencyContacts.secondary.address || 'N/A'}</strong></p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'Timeline' && (
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Employee Activity History Audit Trail
                  </h3>

                  <div className="relative border-l border-slate-200 pl-6 ml-4 space-y-6 text-xs text-slate-650">
                    {currentEmployee?.timeline.map((event, idx) => (
                      <div key={idx} className="relative text-left">
                        <span className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-blue-600 ring-4 ring-white flex items-center justify-center">
                          <Check className="h-2 w-2 text-white" />
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-black text-slate-850 text-sm leading-none">{event.event}</h4>
                            <span className="text-[9px] font-mono text-slate-400">{event.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-normal bg-slate-50 border border-slate-100 p-3 rounded-xl mt-1">
                            {event.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {activeTab === 'HRNotes' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-amber-600" />
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Authorized HR Internal Notes
                      </h3>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Restricted Access
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 text-xs font-semibold text-slate-650">
                    
                    <div className="space-y-2">
                      <label className="text-[9px] text-slate-400 uppercase font-black">Performance Review Insights</label>
                      <p className="p-3 bg-slate-50 border border-slate-150 rounded-xl leading-normal text-slate-800">
                        {currentEmployee?.hrNotes.performanceNotes || 'No performance logs entered.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] text-slate-400 uppercase font-black">Internal Operations Notes</label>
                      <p className="p-3 bg-slate-50 border border-slate-150 rounded-xl leading-normal text-slate-800">
                        {currentEmployee?.hrNotes.internalNotes || 'No internal logs entered.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] text-slate-400 uppercase font-black">Warnings & Disciplinary Action</label>
                        <p className="p-3 bg-slate-50 border border-slate-150 rounded-xl leading-normal text-slate-800">
                          {currentEmployee?.hrNotes.warnings || 'Clean record. No warnings logged.'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] text-slate-400 uppercase font-black">Promotion Recommendations</label>
                        <p className="p-3 bg-slate-50 border border-slate-150 rounded-xl leading-normal text-slate-800">
                          {currentEmployee?.hrNotes.promotionRecommendations || 'No recommendations logged.'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] text-slate-400 uppercase font-black">Confidential Remarks</label>
                      <p className="p-3 bg-rose-50/20 border border-rose-100 rounded-xl leading-normal text-slate-800">
                        {currentEmployee?.hrNotes.confidentialRemarks || 'No confidential remarks logged.'}
                      </p>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase">Initialize Employee Profile</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-650 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs font-bold text-slate-705">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Employee Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Sharma"
                    value={newEmpName}
                    onChange={(e) => setNewEmpName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Designation Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Firmware Engineer"
                    value={newEmpRole}
                    onChange={(e) => setNewEmpRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Department</label>
                  <select
                    value={newEmpDept}
                    onChange={(e) => setNewEmpDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white text-slate-800 focus:border-blue-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Location</label>
                  <select
                    value={newEmpLocation}
                    onChange={(e) => setNewEmpLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white text-slate-800 focus:border-blue-500"
                  >
                    <option value="Kakinada Main Hub">Kakinada Main Hub</option>
                    <option value="Rajahmundry Center">Rajahmundry Center</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Joining Date</label>
                  <input
                    type="date"
                    required
                    value={newEmpJoiningDate}
                    onChange={(e) => setNewEmpJoiningDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Employment Status</label>
                  <select
                    value={newEmpStatus}
                    onChange={(e) => setNewEmpStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white text-slate-800 focus:border-blue-500"
                  >
                    <option value="Probation">Probation</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Personal Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. anand@gmail.com"
                    value={newEmpEmail}
                    onChange={(e) => setNewEmpEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Mobile *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={newEmpPhone}
                    onChange={(e) => setNewEmpPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1">Reporting Manager</label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sharma (CTO)"
                  value={newEmpManager}
                  onChange={(e) => setNewEmpManager(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm transition-all"
                >
                  Create Record
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
