export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  openings: number;
  applicants: number;
  status: 'ACTIVE' | 'DRAFT' | 'CLOSED';
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  stage: 'APPLICATIONS' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED';
  experience: string;
  skills: string[];
  hiringScore: number; // Out of 100
  notes: string;
  avatar: string;
  timeline: { date: string; stage: string; note: string }[];
  documents: { name: string; size: string; url: string }[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  reportingManager: string;
  email: string;
  phone: string;
  emergencyContact: { name: string; relation: string; phone: string };
  bankDetails: { bankName: string; accountNo: string; ifsc: string };
  experience: string;
  skills: string[];
  avatar: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'PROBATION' | 'EXITED';
  joinedDate: string;
  location: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Intern';
  timeline: { date: string; event: string; details: string }[];
}

export interface OrgNode {
  id: string;
  name: string;
  role: string;
  avatar: string;
  children?: OrgNode[];
}

export interface OnboardingTask {
  id: string;
  candidateName: string;
  role: string;
  progress: number; // 0 to 100
  tasks: { name: string; status: 'DONE' | 'IN_PROGRESS' | 'PENDING' }[];
  manager: string;
  department: string;
  startDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  avatar: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'REMOTE';
  checkIn: string;
  checkOut: string;
  workingHours: string;
}

export interface LeaveRequest {
  id: string;
  name: string;
  avatar: string;
  role: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'PENDING_MANAGER' | 'PENDING_HR' | 'APPROVED' | 'REJECTED';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  avatar: string;
  basic: number;
  hra: number;
  allowances: number;
  pf: number;
  tax: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'PAID' | 'PROCESSING' | 'HOLD';
  payoutDate: string;
}

export interface PerformanceGoal {
  id: string;
  employeeName: string;
  avatar: string;
  goal: string;
  category: 'INDIVIDUAL' | 'TEAM' | 'COMPANY';
  target: string;
  progress: number;
  rating: number; // 1-5
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  enrolled: number;
  completionRate: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
}

export interface Intern {
  id: string;
  name: string;
  avatar: string;
  mentor: string;
  project: string;
  progress: number;
  review: string;
  startDate: string;
  endDate: string;
  status: 'ONGOING' | 'COMPLETED' | 'CONVERTED';
}

// ----------------------------------------------------
// Mock Data Implementation
// ----------------------------------------------------

export const hrJobOpenings: JobOpening[] = [
  { id: 'job_01', title: 'Senior EV Powertrain Engineer', department: 'Engineering', location: 'Kakinada Hub', type: 'Full-Time', openings: 2, applicants: 45, status: 'ACTIVE' },
  { id: 'job_02', title: 'BMS Diagnostics Lead', department: 'Engineering', location: 'Hyderabad R&D', type: 'Full-Time', openings: 1, applicants: 32, status: 'ACTIVE' },
  { id: 'job_03', title: 'Service Center Manager', department: 'Operations', location: 'Rajahmundry Center', type: 'Full-Time', openings: 1, applicants: 18, status: 'ACTIVE' },
  { id: 'job_04', title: 'IoT Telematics Developer', department: 'Technology', location: 'Kakinada Hub', type: 'Contract', openings: 2, applicants: 28, status: 'ACTIVE' },
  { id: 'job_05', title: 'Junior HR Recruiter', department: 'Human Resources', location: 'Kakinada Hub', type: 'Full-Time', openings: 1, applicants: 65, status: 'DRAFT' },
];

export const hrCandidates: Candidate[] = [
  {
    id: 'cand_01',
    name: 'Abhishek Jha',
    email: 'abhishek.jha@gmail.com',
    phone: '+91 98765 43210',
    role: 'Senior EV Powertrain Engineer',
    stage: 'INTERVIEW',
    experience: '6 Years (Ex-Ather Energy)',
    skills: ['High Voltage Systems', 'Motor Thermal Control', 'Simulink'],
    hiringScore: 88,
    notes: 'Strong understanding of thermal runaway mitigations. Cleared technical round 1 with 9/10 score.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    timeline: [
      { date: '12 Jul 2026', stage: 'Application Recieved', note: 'Applied via website referral.' },
      { date: '15 Jul 2026', stage: 'Screening Call', note: 'HR screening call completed. Fits budget. Relocation okay.' },
      { date: '20 Jul 2026', stage: 'Technical Round 1', note: 'Taken by CTO. Excellent concepts on regen braking.' },
    ],
    documents: [
      { name: 'Abhishek_Resume_2026.pdf', size: '2.4 MB', url: '#' },
      { name: 'Ather_Relieving_Letter.pdf', size: '1.8 MB', url: '#' },
    ]
  },
  {
    id: 'cand_02',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@yahoo.com',
    phone: '+91 99000 88776',
    role: 'BMS Diagnostics Lead',
    stage: 'OFFER',
    experience: '8 Years (Ex-Ola Electric)',
    skills: ['BMS Firmware', 'Cell Balancing Algorthims', 'CAN Analyzer'],
    hiringScore: 94,
    notes: 'Outstanding technical portfolio. Formulated a cell balancing algorithm that saved 4% battery degradation.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    timeline: [
      { date: '01 Jul 2026', stage: 'Application Received', note: 'Sourced from LinkedIn Recruiter.' },
      { date: '04 Jul 2026', stage: 'Screening Call', note: 'Screened by HR Lead. High interest.' },
      { date: '10 Jul 2026', stage: 'Technical Assessment', note: 'Scored 98/100 in BMS coding round.' },
      { date: '18 Jul 2026', stage: 'CTO Interaction', note: 'Recommended for immediate offer by CTO.' },
    ],
    documents: [
      { name: 'Sneha_CV_Lead_BMS.pdf', size: '1.2 MB', url: '#' },
    ]
  },
  {
    id: 'cand_03',
    name: 'Varun Teja',
    email: 'varun.teja@outlook.com',
    phone: '+91 88990 77665',
    role: 'Service Center Manager',
    stage: 'SCREENING',
    experience: '4 Years (Ex-Hero MotoCorp)',
    skills: ['Dealer Operations', 'Spares Inventory Management', 'CRM Tools'],
    hiringScore: 72,
    notes: 'Good retail experience but needs orientation on EV charging hub logistics.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    timeline: [
      { date: '18 Jul 2026', stage: 'Application Received', note: 'Applied via Career Portal.' },
      { date: '22 Jul 2026', stage: 'Screening Call', note: 'Screening pending manager review.' },
    ],
    documents: [
      { name: 'Varun_Profile.pdf', size: '940 KB', url: '#' },
    ]
  },
  {
    id: 'cand_04',
    name: 'Nikitha Rao',
    email: 'nikitha.rao@gmail.com',
    phone: '+91 77600 55443',
    role: 'IoT Telematics Developer',
    stage: 'HIRED',
    experience: '3 Years (Ex-Bosch)',
    skills: ['MQTT', 'Node.js', 'GPS Hardware Integration', 'AWS IoT Core'],
    hiringScore: 89,
    notes: 'Joined on July 24th, 2026. Allocation to Telematics team in progress.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    timeline: [
      { date: '20 Jun 2026', stage: 'Application Received', note: 'Applied online.' },
      { date: '24 Jun 2026', stage: 'Technical Round 1', note: 'Discussed MQTT protocols and socket keep-alives.' },
      { date: '01 Jul 2026', stage: 'Management Round', note: 'Cleared.' },
      { date: '08 Jul 2026', stage: 'Offer Dispatched', note: 'Offer accepted. Date of Joining: 24 Jul 2026.' },
    ],
    documents: [
      { name: 'Nikitha_Resume.pdf', size: '3.1 MB', url: '#' },
      { name: 'Signed_Offer_Letter.pdf', size: '4.2 MB', url: '#' },
    ]
  }
];

export const hrEmployees: Employee[] = [
  {
    id: 'emp_01',
    name: 'Kiran Gopi',
    role: 'Senior EV Diagnostics Engineer',
    department: 'Engineering',
    reportingManager: 'Ananya Sharma (CTO)',
    email: 'kiran.g@innovibemobility.com',
    phone: '+91 91234 56789',
    emergencyContact: { name: 'Saraswathi Gopi', relation: 'Mother', phone: '+91 91234 56780' },
    bankDetails: { bankName: 'HDFC Bank', accountNo: '50100234567890', ifsc: 'HDFC0000123' },
    experience: '5 Years',
    skills: ['BMS Tuning', 'CAN Bus Decoding', 'Thermal Profiling'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    joinedDate: '12 Jan 2023',
    location: 'Kakinada Main Hub',
    employmentType: 'Full-Time',
    timeline: [
      { date: '12 Jan 2023', event: 'Joined Company', details: 'Hired as EV Diagnostics Specialist' },
      { date: '01 Apr 2025', event: 'Promotion', details: 'Promoted to Senior Engineer for resolving Kakinada fleet SLA bottleneck.' },
    ]
  },
  {
    id: 'emp_02',
    name: 'Srinivas Rao',
    role: 'Senior EV Field Technician',
    department: 'Operations',
    reportingManager: 'Vikram Singh (Service Manager)',
    email: 'srinivas.r@innovibemobility.com',
    phone: '+91 98111 22334',
    emergencyContact: { name: 'Laxmi Rao', relation: 'Spouse', phone: '+91 98111 22335' },
    bankDetails: { bankName: 'State Bank of India', accountNo: '30495867493', ifsc: 'SBIN0003456' },
    experience: '6 Years',
    skills: ['Ather Master Certified', 'Motor Overhauling', 'Wiring Harness'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    joinedDate: '01 Jun 2022',
    location: 'Kakinada Main Hub',
    employmentType: 'Full-Time',
    timeline: [
      { date: '01 Jun 2022', event: 'Joined Company', details: 'Hired as Junior Field Technician.' },
      { date: '01 Jun 2024', event: 'Award Recieved', details: 'Awarded Best Customer Rating CSAT (4.9/5).' },
    ]
  },
  {
    id: 'emp_03',
    name: 'Meera Deshmukh',
    role: 'HR Talent Partner',
    department: 'Human Resources',
    reportingManager: 'Pooja Reddy (HR Head)',
    email: 'meera.d@innovibemobility.com',
    phone: '+91 88776 65544',
    emergencyContact: { name: 'Dilip Deshmukh', relation: 'Father', phone: '+91 88776 65540' },
    bankDetails: { bankName: 'ICICI Bank', accountNo: '001201948576', ifsc: 'ICIC0000012' },
    experience: '3 Years',
    skills: ['Talent Sourcing', 'Onboarding Workflows', 'Employee Engagement'],
    avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    joinedDate: '15 Aug 2024',
    location: 'Kakinada Hub',
    employmentType: 'Full-Time',
    timeline: [
      { date: '15 Aug 2024', event: 'Joined Company', details: 'Hired to streamline technician recruitment pipeline.' },
    ]
  },
  {
    id: 'emp_04',
    name: 'Amit Patel',
    role: 'Telematics Intern',
    department: 'Technology',
    reportingManager: 'Ananya Sharma (CTO)',
    email: 'amit.p@innovibemobility.com',
    phone: '+91 76543 21098',
    emergencyContact: { name: 'Harish Patel', relation: 'Father', phone: '+91 76543 21090' },
    bankDetails: { bankName: 'Bank of Baroda', accountNo: '1234010000987', ifsc: 'BARB0KAKINA' },
    experience: 'Fresher',
    skills: ['Python', 'Embedded C', 'IoT Node telemetry'],
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    joinedDate: '01 Jun 2026',
    location: 'Kakinada Hub',
    employmentType: 'Intern',
    timeline: [
      { date: '01 Jun 2026', event: 'Internship Commenced', details: 'Assigned to IoT telematics gateway dashboard project.' },
    ]
  },
  {
    id: 'emp_05',
    name: 'Suresh Kumar',
    role: 'EV Field Mechanic',
    department: 'Operations',
    reportingManager: 'Vikram Singh (Service Manager)',
    email: 'suresh.k@innovibemobility.com',
    phone: '+91 99887 76655',
    emergencyContact: { name: 'Ganga Devi', relation: 'Sister', phone: '+91 99887 76650' },
    bankDetails: { bankName: 'Axis Bank', accountNo: '915010020304050', ifsc: 'UTIB0000045' },
    experience: '2 Years',
    skills: ['Suspension Calibration', 'Brake Servicing'],
    avatar: 'https://images.unsplash.com/photo-1542343633-ce7a6826af14?auto=format&fit=crop&q=80&w=150',
    status: 'ON_LEAVE',
    joinedDate: '10 Feb 2025',
    location: 'Rajahmundry Center',
    employmentType: 'Full-Time',
    timeline: [
      { date: '10 Feb 2025', event: 'Joined Company', details: 'Hired as Assistant Field Mechanic.' },
    ]
  }
];

export const hrOrgChart: OrgNode = {
  id: 'usr_ceo_001',
  name: 'Sri Hari Kolusu',
  role: 'Founder & CEO (Super Admin)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  children: [
    {
      id: 'usr_cto_003',
      name: 'Ananya Sharma',
      role: 'Chief Technology Officer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      children: [
        { id: 'emp_01', name: 'Kiran Gopi', role: 'Senior EV Diagnostics Eng', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150' },
        { id: 'emp_04', name: 'Amit Patel', role: 'Telematics Intern', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150' }
      ]
    },
    {
      id: 'usr_coo_002',
      name: 'Rajesh Varma',
      role: 'Chief Operating Officer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      children: [
        {
          id: 'usr_sm_004',
          name: 'Vikram Singh',
          role: 'Service Hub Manager',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
          children: [
            { id: 'emp_02', name: 'Srinivas Rao', role: 'Senior EV Technician', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
            { id: 'emp_05', name: 'Suresh Kumar', role: 'EV Field Mechanic', avatar: 'https://images.unsplash.com/photo-1542343633-ce7a6826af14?auto=format&fit=crop&q=80&w=150' }
          ]
        }
      ]
    },
    {
      id: 'usr_hr_005',
      name: 'Pooja Reddy',
      role: 'Head of Human Resources',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
      children: [
        { id: 'emp_03', name: 'Meera Deshmukh', role: 'HR Talent Partner', avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=150' }
      ]
    }
  ]
};

export const hrOnboarding: OnboardingTask[] = [
  {
    id: 'onb_01',
    candidateName: 'Sneha Reddy',
    role: 'BMS Diagnostics Lead',
    progress: 70,
    startDate: '01 Aug 2026',
    manager: 'Ananya Sharma (CTO)',
    department: 'Engineering',
    tasks: [
      { name: 'Offer Acceptance', status: 'DONE' },
      { name: 'Document Upload & Verification', status: 'DONE' },
      { name: 'ID Verification', status: 'DONE' },
      { name: 'Laptop Allocation', status: 'IN_PROGRESS' },
      { name: 'Email Creation', status: 'PENDING' },
      { name: 'Manager Assignment', status: 'DONE' },
      { name: 'Orientation Session', status: 'PENDING' }
    ]
  },
  {
    id: 'onb_02',
    candidateName: 'Nikitha Rao',
    role: 'IoT Telematics Developer',
    progress: 100,
    startDate: '24 Jul 2026',
    manager: 'Ananya Sharma (CTO)',
    department: 'Technology',
    tasks: [
      { name: 'Offer Acceptance', status: 'DONE' },
      { name: 'Document Upload & Verification', status: 'DONE' },
      { name: 'ID Verification', status: 'DONE' },
      { name: 'Laptop Allocation', status: 'DONE' },
      { name: 'Email Creation', status: 'DONE' },
      { name: 'Manager Assignment', status: 'DONE' },
      { name: 'Orientation Session', status: 'DONE' }
    ]
  },
  {
    id: 'onb_03',
    candidateName: 'Pranav Shah',
    role: 'EV Charging Infrastructure Intern',
    progress: 15,
    startDate: '10 Aug 2026',
    manager: 'Vikram Singh (Service Manager)',
    department: 'Operations',
    tasks: [
      { name: 'Offer Acceptance', status: 'DONE' },
      { name: 'Document Upload & Verification', status: 'IN_PROGRESS' },
      { name: 'ID Verification', status: 'PENDING' },
      { name: 'Laptop Allocation', status: 'PENDING' },
      { name: 'Email Creation', status: 'PENDING' },
      { name: 'Manager Assignment', status: 'DONE' },
      { name: 'Orientation Session', status: 'PENDING' }
    ]
  }
];

export const hrAttendanceRoster: AttendanceRecord[] = [
  { id: 'att_01', employeeId: 'emp_01', name: 'Kiran Gopi', role: 'Senior EV Diagnostics Eng', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', status: 'PRESENT', checkIn: '08:52 AM', checkOut: '05:45 PM', workingHours: '8h 53m' },
  { id: 'att_02', employeeId: 'emp_02', name: 'Srinivas Rao', role: 'Senior EV Technician', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', status: 'LATE', checkIn: '09:22 AM', checkOut: '06:10 PM', workingHours: '8h 48m' },
  { id: 'att_03', employeeId: 'emp_03', name: 'Meera Deshmukh', role: 'HR Talent Partner', avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=150', status: 'REMOTE', checkIn: '09:00 AM', checkOut: '05:30 PM', workingHours: '8h 30m' },
  { id: 'att_04', employeeId: 'emp_04', name: 'Amit Patel', role: 'Telematics Intern', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', status: 'PRESENT', checkIn: '08:45 AM', checkOut: '05:15 PM', workingHours: '8h 30m' },
  { id: 'att_05', employeeId: 'emp_05', name: 'Suresh Kumar', role: 'EV Field Mechanic', avatar: 'https://images.unsplash.com/photo-1542343633-ce7a6826af14?auto=format&fit=crop&q=80&w=150', status: 'ABSENT', checkIn: '--', checkOut: '--', workingHours: '--' }
];

export const hrLeaveRequests: LeaveRequest[] = [
  {
    id: 'lv_01',
    name: 'Suresh Kumar',
    avatar: 'https://images.unsplash.com/photo-1542343633-ce7a6826af14?auto=format&fit=crop&q=80&w=150',
    role: 'EV Field Mechanic',
    leaveType: 'Medical Leave',
    startDate: '23 Jul 2026',
    endDate: '25 Jul 2026',
    days: 3,
    reason: 'Dental wisdom tooth extraction. Under doctor recovery guidance.',
    status: 'PENDING_HR'
  },
  {
    id: 'lv_02',
    name: 'Kiran Gopi',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    role: 'Senior EV Diagnostics Eng',
    leaveType: 'Casual Leave',
    startDate: '10 Aug 2026',
    endDate: '12 Aug 2026',
    days: 3,
    reason: 'Family shifting accommodation in Kakinada central.',
    status: 'PENDING_MANAGER'
  },
  {
    id: 'lv_03',
    name: 'Meera Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=150',
    role: 'HR Talent Partner',
    leaveType: 'Earned Leave',
    startDate: '04 Jun 2026',
    endDate: '08 Jun 2026',
    days: 5,
    reason: 'Attending cousin sister wedding.',
    status: 'APPROVED'
  }
];

export const hrPayrollRecords: PayrollRecord[] = [
  { id: 'pr_01', employeeId: 'emp_01', name: 'Kiran Gopi', role: 'Senior EV Diagnostics Eng', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', basic: 45000, hra: 18000, allowances: 12000, pf: 5400, tax: 6500, bonus: 5000, deductions: 0, netPay: 68100, status: 'PAID', payoutDate: '30 Jun 2026' },
  { id: 'pr_02', employeeId: 'emp_02', name: 'Srinivas Rao', role: 'Senior EV Technician', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', basic: 28000, hra: 11200, allowances: 8800, pf: 3360, tax: 2800, bonus: 3500, deductions: 500, netPay: 44840, status: 'PAID', payoutDate: '30 Jun 2026' },
  { id: 'pr_03', employeeId: 'emp_03', name: 'Meera Deshmukh', role: 'HR Talent Partner', avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=150', basic: 32000, hra: 12800, allowances: 9200, pf: 3840, tax: 3500, bonus: 0, deductions: 0, netPay: 46660, status: 'PAID', payoutDate: '30 Jun 2026' },
  { id: 'pr_04', employeeId: 'emp_04', name: 'Amit Patel', role: 'Telematics Intern', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', basic: 15000, hra: 0, allowances: 2000, pf: 0, tax: 0, bonus: 0, deductions: 0, netPay: 17000, status: 'PROCESSING', payoutDate: '31 Jul 2026' }
];

export const hrPerformanceGoals: PerformanceGoal[] = [
  { id: 'g_01', employeeName: 'Kiran Gopi', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', goal: 'Decrease battery diagnostics SLA from 45 min to 30 min', category: 'INDIVIDUAL', target: '30 Minutes', progress: 85, rating: 4.8 },
  { id: 'g_02', employeeName: 'Srinivas Rao', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', goal: 'Maintain customer CSAT rating above 4.8★', category: 'INDIVIDUAL', target: '4.8 Rating', progress: 100, rating: 4.9 },
  { id: 'g_03', employeeName: 'Meera Deshmukh', avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=150', goal: 'Source 15 certified EV mechanics for Godavari East expansion', category: 'TEAM', target: '15 Mechanics Sourced', progress: 60, rating: 4.2 }
];

export const hrCourses: Course[] = [
  { id: 'crs_01', title: 'High-Voltage Safety Regulations for EV Garages', instructor: 'Ananya Sharma (CTO)', duration: '6 hours', enrolled: 24, completionRate: 92, status: 'COMPLETED' },
  { id: 'crs_02', title: 'Advanced CAN-bus Telemetry Protocol Tuning', instructor: 'CTO Office Diagnostics Team', duration: '12 hours', enrolled: 12, completionRate: 65, status: 'ONGOING' },
  { id: 'crs_03', title: 'EV Battery Management Cell Balancing & Thermal Safety', instructor: 'IIT Madras EV Research Panel', duration: '15 hours', enrolled: 45, completionRate: 0, status: 'UPCOMING' }
];

export const hrInterns: Intern[] = [
  {
    id: 'int_01',
    name: 'Amit Patel',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    mentor: 'Ananya Sharma (CTO)',
    project: 'IoT Telematics Gateway dashboard & OTA updates testing.',
    progress: 80,
    review: 'Amit displays deep focus in C programming and RTOS. Outstanding progress.',
    startDate: '01 Jun 2026',
    endDate: '31 Aug 2026',
    status: 'ONGOING'
  },
  {
    id: 'int_02',
    name: 'Karan Malhotra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    mentor: 'Vikram Singh (Service Manager)',
    project: 'Service hub spare parts locator system based on RFID scanning.',
    progress: 100,
    review: 'Completed spares inventory pilot project. Approved for Full-Time Conversion as Junior Service Engineer.',
    startDate: '01 Jan 2026',
    endDate: '30 Jun 2026',
    status: 'CONVERTED'
  }
];

export const hrPoliciesList = [
  { id: 'pol_01', title: 'EV Hub Safety Standards & High Voltage Isolation', category: 'Safety & Isolation', date: '01 Jan 2026', downloadUrl: '#' },
  { id: 'pol_02', title: 'Field Technician SLA & Commute Policy', category: 'Operations Rules', date: '15 Mar 2026', downloadUrl: '#' },
  { id: 'pol_03', title: 'InnoVibe Ethical Code & Fair Customer Practices', category: 'Compliance', date: '10 Feb 2026', downloadUrl: '#' },
  { id: 'pol_04', title: 'Hub Rotation and Shift Break Policy', category: 'Human Resources', date: '01 Jul 2026', downloadUrl: '#' }
];

export const hrHolidayList = [
  { name: 'Independence Day', date: '15 Aug 2026', day: 'Saturday', type: 'National Holiday' },
  { name: 'Ganesh Chaturthi', date: '15 Sep 2026', day: 'Tuesday', type: 'Regional Holiday' },
  { name: 'Gandhi Jayanti', date: '02 Oct 2026', day: 'Friday', type: 'National Holiday' },
  { name: 'Vijayadashami (Dussehra)', date: '20 Oct 2026', day: 'Tuesday', type: 'Regional Holiday' },
  { name: 'Diwali (Deepavali)', date: '08 Nov 2026', day: 'Sunday', type: 'National Holiday' },
  { name: 'Christmas Day', date: '25 Dec 2026', day: 'Friday', type: 'National Holiday' }
];

export const hrExitList = [
  { id: 'ex_01', name: 'Nikhil Kumar', role: 'Junior EV Tech', resignationDate: '01 Jul 2026', exitDate: '31 Jul 2026', assetsReturned: 4, assetsPending: 0, status: 'CLEARANCE_IN_PROGRESS', managerApproval: true, settleStatus: 'CALCULATING' },
  { id: 'ex_02', name: 'Sandhya Rao', role: 'Support Coordinator', resignationDate: '10 Jun 2026', exitDate: '10 Jul 2026', assetsReturned: 2, assetsPending: 0, status: 'SETTLED', managerApproval: true, settleStatus: 'PAID' }
];

export const hrRecentActivityList = [
  { id: 'act_01', type: 'JOINED', title: 'Nikitha Rao (IoT Telematics)', desc: 'Joined Kakinada office as full-time Developer.', time: 'Just now' },
  { id: 'act_02', type: 'LEAVE', title: 'Suresh Kumar (Mechanic)', desc: 'Applied for 3 days of Medical Leave.', time: '10 mins ago' },
  { id: 'act_03', type: 'INTERVIEW', title: 'Abhishek Jha (Powertrain)', desc: 'Technical assessment round 2 scheduled for tomorrow.', time: '1 hour ago' },
  { id: 'act_04', type: 'DOCS', title: 'Sneha Reddy (BMS)', desc: 'Verification pending for Aadhaar & Ex-Employer Certs.', time: '3 hours ago' },
  { id: 'act_05', type: 'TRAINING', title: 'Safety Training', desc: '14 technicians completed High-Voltage Safety Course.', time: '1 day ago' }
];
