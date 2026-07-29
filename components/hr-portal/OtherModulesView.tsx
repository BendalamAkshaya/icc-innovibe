'use client';

import React, { useState } from 'react';
import {
  hrCandidates,
  hrOnboarding,
  hrCourses,
  hrInterns,
  hrPoliciesList,
  hrHolidayList,
  hrExitList,
  hrEmployees,
  Candidate,
  OnboardingTask,
  Course,
  Intern,
} from './hr-mock-data';
import {
  UserCheck,
  ClipboardList,
  GraduationCap,
  Sparkles,
  FolderOpen,
  Contact,
  Calendar,
  FileText,
  DoorOpen,
  Bell,
  Settings,
  Plus,
  ArrowRight,
  CheckCircle,
  FileCheck,
  ShieldAlert,
  Download,
  UploadCloud,
  Check,
  X,
  CreditCard,
  QrCode,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Search,
  Trash2,
  Edit3,
} from 'lucide-react';

interface OtherModulesViewProps {
  activeView: string;
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function OtherModulesView({ activeView, showToast }: OtherModulesViewProps) {
  // State variables for dynamic interactivity
  const [candidates, setCandidates] = useState<Candidate[]>(hrCandidates);
  const [onboardings, setOnboardings] = useState<OnboardingTask[]>(hrOnboarding);
  const [courses] = useState<Course[]>(hrCourses);
  const [interns, setInterns] = useState<Intern[]>(hrInterns);
  const [policies] = useState(hrPoliciesList);
  
  // Custom CompanyHoliday Interface and interactive state list
  interface CompanyHoliday {
    id: string;
    name: string;
    date: string; // ISO format: YYYY-MM-DD
    type: 'National' | 'Regional' | 'Corporate';
    description: string;
    locations: string;
    status: 'Active' | 'Draft';
  }

  const [holidays, setHolidays] = useState<CompanyHoliday[]>([
    { id: 'hol_01', name: 'Republic Day', date: '2026-01-26', type: 'National', description: 'Celebrates the enactment of the Constitution of India.', locations: 'All Offices', status: 'Active' },
    { id: 'hol_02', name: 'Maha Shivaratri', date: '2026-02-17', type: 'Regional', description: 'Regional holiday for Maha Shivaratri festival.', locations: 'Kakinada Hub, Hyderabad R&D', status: 'Active' },
    { id: 'hol_03', name: 'Holi Festival', date: '2026-03-03', type: 'Regional', description: 'Regional spring festival of colors.', locations: 'Hyderabad R&D, Rajahmundry Center', status: 'Active' },
    { id: 'hol_04', name: 'Good Friday', date: '2026-04-03', type: 'National', description: 'Official government holiday observing Good Friday.', locations: 'All Offices', status: 'Active' },
    { id: 'hol_05', name: 'Ambedkar Jayanti', date: '2026-04-14', type: 'National', description: 'Birth anniversary of Dr. B. R. Ambedkar.', locations: 'All Offices', status: 'Active' },
    { id: 'hol_06', name: 'Ram Navami', date: '2026-03-28', type: 'Regional', description: 'Regional holiday celebrating the birth of Lord Rama.', locations: 'Kakinada Hub, Rajahmundry Center', status: 'Active' },
    { id: 'hol_07', name: 'Independence Day', date: '2026-08-15', type: 'National', description: 'Commemorates the nation\'s independence from the United Kingdom.', locations: 'All Offices', status: 'Active' },
    { id: 'hol_08', name: 'Ganesh Chaturthi', date: '2026-09-15', type: 'Regional', description: 'Regional festival celebrating Lord Ganesha.', locations: 'Kakinada Hub, Rajahmundry Center', status: 'Active' },
    { id: 'hol_09', name: 'Gandhi Jayanti', date: '2026-10-02', type: 'National', description: 'Birth anniversary of Mahatma Gandhi.', locations: 'All Offices', status: 'Active' },
    { id: 'hol_10', name: 'Vijayadashami (Dussehra)', date: '2026-10-20', type: 'Regional', description: 'Victory of good over evil festival.', locations: 'Kakinada Hub, Rajahmundry Center', status: 'Active' },
    { id: 'hol_11', name: 'Diwali (Deepavali)', date: '2026-11-08', type: 'National', description: 'Festival of lights celebrated nationwide.', locations: 'All Offices', status: 'Active' },
    { id: 'hol_12', name: 'Christmas Day', date: '2026-12-25', type: 'Corporate', description: 'Year-end company corporate holiday observing Christmas.', locations: 'All Offices', status: 'Active' },
  ]);

  const [exits, setExits] = useState(hrExitList);
  const [employees] = useState(hrEmployees);

  // Calendar states
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // July (0-indexed)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'National' | 'Regional' | 'Corporate'>('All');
  const [selectedHoliday, setSelectedHoliday] = useState<CompanyHoliday | null>(null);

  // HR Add/Edit Holiday form states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHolidayId, setEditingHolidayId] = useState<string | null>(null);
  
  const [formName, setFormName] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formType, setFormType] = useState('National');
  const [formDesc, setFormDesc] = useState('');
  const [formLoc, setFormLoc] = useState('All Offices');
  const [formStatus, setFormStatus] = useState('Active');

  // Selected sub-items
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
  // Interactive ID Card Generator State
  const [idCardEmpId, setIdCardEmpId] = useState('emp_01');

  // Calendar and Holiday management helpers
  const resetForm = () => {
    setFormName('');
    setFormDate('');
    setFormType('National');
    setFormDesc('');
    setFormLoc('All Offices');
    setFormStatus('Active');
  };

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formDate) {
      showToast('Please fill out Name and Date.', 'error');
      return;
    }
    const newHol: CompanyHoliday = {
      id: `hol_${Date.now()}`,
      name: formName,
      date: formDate,
      type: formType as any,
      description: formDesc,
      locations: formLoc,
      status: formStatus as any,
    };
    setHolidays([...holidays, newHol]);
    setIsAddModalOpen(false);
    resetForm();
    showToast(`Successfully added holiday: ${formName}`, 'success');
  };

  const openEditModal = (h: CompanyHoliday) => {
    setEditingHolidayId(h.id);
    setFormName(h.name);
    setFormDate(h.date);
    setFormType(h.type);
    setFormDesc(h.description);
    setFormLoc(h.locations);
    setFormStatus(h.status);
    setIsEditModalOpen(true);
  };

  const handleEditHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formDate) {
      showToast('Please fill out Name and Date.', 'error');
      return;
    }
    setHolidays(holidays.map(h => h.id === editingHolidayId ? {
      ...h,
      name: formName,
      date: formDate,
      type: formType as any,
      description: formDesc,
      locations: formLoc,
      status: formStatus as any,
    } : h));
    setIsEditModalOpen(false);
    setSelectedHoliday(null);
    resetForm();
    showToast(`Successfully updated holiday: ${formName}`, 'success');
  };

  const handleDeleteHoliday = (id: string) => {
    setHolidays(holidays.filter(h => h.id !== id));
    setSelectedHoliday(null);
    showToast('Holiday deleted successfully.', 'success');
  };

  const handleImportHolidays = () => {
    const imported: CompanyHoliday[] = [
      { id: `hol_imp_${Date.now()}_1`, name: 'Ugadi / Telugu New Year', date: `${currentYear}-03-20`, type: 'Regional', description: 'Telugu New Year celebrated in Andhra Pradesh.', locations: 'Kakinada Hub, Rajahmundry Center', status: 'Active' },
      { id: `hol_imp_${Date.now()}_2`, name: 'May Day', date: `${currentYear}-05-01`, type: 'Corporate', description: 'International Workers Day observed by InnoVibe.', locations: 'All Offices', status: 'Active' }
    ];
    setHolidays([...holidays, ...imported]);
    showToast('Imported 2 national/regional holidays successfully.', 'success');
  };

  const handleExportHolidays = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(holidays, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `InnoVibe_Holidays_${currentYear}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Holiday calendar exported successfully.', 'success');
  };

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Previous month padding
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevMonthNum = month === 0 ? 12 : month;
      const prevYearNum = month === 0 ? year - 1 : year;
      days.push({
        dateStr: `${prevYearNum}-${String(prevMonthNum).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`,
        dayNum: prevMonthDays - i,
        isCurrentMonth: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        dayNum: i,
        isCurrentMonth: true,
      });
    }
    
    // Next month padding to complete 42 cell grid
    const totalCells = 42;
    const nextMonthPadding = totalCells - days.length;
    for (let i = 1; i <= nextMonthPadding; i++) {
      const nextMonthNum = month === 11 ? 1 : month + 2;
      const nextYearNum = month === 11 ? year + 1 : year;
      days.push({
        dateStr: `${nextYearNum}-${String(nextMonthNum).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        dayNum: i,
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleGoToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(6); // July (0-indexed)
  };


  // Toggle onboarding checklist status
  const handleOnboardingTaskToggle = (onbId: string, taskName: string) => {
    setOnboardings((prev) =>
      prev.map((item) => {
        if (item.id === onbId) {
          const updatedTasks = item.tasks.map((t) => {
            if (t.name === taskName) {
              const nextStatus: 'DONE' | 'IN_PROGRESS' | 'PENDING' =
                t.status === 'PENDING' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'DONE' : 'PENDING';
              return { ...t, status: nextStatus };
            }
            return t;
          });

          // Compute new progress %
          const doneCount = updatedTasks.filter((t) => t.status === 'DONE').length;
          const newProgress = Math.round((doneCount / updatedTasks.length) * 100);

          if (newProgress === 100 && item.progress !== 100) {
            showToast(`Onboarding Checklist completed for ${item.candidateName}!`, 'success');
          }

          return { ...item, tasks: updatedTasks, progress: newProgress };
        }
        return item;
      })
    );
  };

  // Convert Intern action
  const handleConvertIntern = (id: string) => {
    setInterns((prev) =>
      prev.map((intern) => {
        if (intern.id === id) {
          showToast(`Initiating Full-Time employment contract for Intern ${intern.name}.`, 'success');
          return { ...intern, status: 'CONVERTED' as const };
        }
        return intern;
      })
    );
  };

  // Process Exit final settlement
  const handleExitSettlement = (id: string) => {
    setExits((prev) =>
      prev.map((ex) => {
        if (ex.id === id) {
          showToast(`Full and Final Settlement (FNF) computed & processed for ${ex.name}.`, 'success');
          return { ...ex, status: 'SETTLED' as const, settleStatus: 'PAID' as const };
        }
        return ex;
      })
    );
  };

  // Holiday filtering and helper calculations
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDayName = (dateStr: string) => {
    const d = new Date(dateStr);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[d.getDay()];
  };

  const formatDateLong = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const filteredHolidays = holidays.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedFilter === 'All' || h.type === selectedFilter;
    return matchesSearch && matchesType;
  });

  // Dynamic stats
  const totalHolidaysThisYear = holidays.filter(h => h.date.startsWith(`${currentYear}`)).length;
  
  const currentMonthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const thisMonthHolidaysList = holidays.filter(h => h.date.startsWith(currentMonthStr));

  const referenceToday = '2026-07-24';
  const upcomingHolidaysList = holidays
    .filter(h => h.date >= referenceToday)
    .sort((a, b) => a.date.localeCompare(b.date));

  const nextHoliday = upcomingHolidaysList[0];
  
  const getDaysDiff = (dateStr1: string, dateStr2: string) => {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    const diff = d2.getTime() - d1.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const currentIdEmployee = employees.find((e) => e.id === idCardEmpId) || employees[0];

  return (
    <div className="space-y-6 text-left">
      
      {/* ==========================================
          CANDIDATES MODULE
          ========================================== */}
      {activeView === 'candidates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Candidate Registry</h3>
              <p className="text-xs text-slate-500 font-medium">Verify credentials, resume files, and stage positions.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-start gap-4">
                <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover border border-slate-200 mt-1 shrink-0" />
                <div className="grow space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-800">{c.name}</h4>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-md">
                        Score: {c.hiringScore}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold">{c.role}</p>
                  </div>
                  
                  <div className="text-[10px] text-slate-600 space-y-1 font-semibold">
                    <p>Exp: <strong className="text-slate-900">{c.experience}</strong></p>
                    <p>Skills: <strong className="text-slate-800">{c.skills.slice(0, 3).join(', ')}</strong></p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 uppercase">
                      {c.stage}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCandidate(c);
                        showToast(`Loading timeline details for ${c.name}`, 'info');
                      }}
                      className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase"
                    >
                      Audit Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline details modal overlay */}
          {selectedCandidate && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Candidate Audit Log</h4>
                  <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
                </div>
                <p className="text-xs text-slate-500 font-medium">Hiring journey logs for <strong className="text-slate-850">{selectedCandidate.name}</strong>.</p>
                
                <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-4 max-h-60 overflow-y-auto">
                  {selectedCandidate.timeline.map((t, idx) => (
                    <div key={idx} className="relative text-xs text-left">
                      <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-blue-650 ring-4 ring-white" />
                      <p className="font-extrabold text-slate-800">{t.stage}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{t.note}</p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">{t.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          ONBOARDING MODULE
          ========================================== */}
      {activeView === 'onboarding' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Employee Onboarding Checklist</h3>
            <p className="text-xs text-slate-500 font-medium">Verify system account configurations and provision laptop hardware assets.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {onboardings.map((item) => (
              <div key={item.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-3xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{item.candidateName}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{item.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-blue-650 font-mono">{item.progress}%</span>
                    <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Progress</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Checklist Tasks (Click status to toggle)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {item.tasks.map((task, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleOnboardingTaskToggle(item.id, task.name)}
                        className="p-2 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-all"
                      >
                        <span className="font-semibold text-slate-700 truncate max-w-[130px]">{task.name}</span>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                          task.status === 'DONE' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                          task.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-250' :
                          'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TRAINING & LEARNING MODULE
          ========================================== */}
      {activeView === 'training' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Safety & Technical Certifications</h3>
            <p className="text-xs text-slate-500 font-medium">Verify employee safety credentials and workshop training compliance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((crs) => (
              <div key={crs.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-mono">
                      {crs.duration}
                    </span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                      crs.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      crs.status === 'ONGOING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {crs.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-800 line-clamp-2 leading-normal h-8">{crs.title}</h4>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span>Instructor: {crs.instructor.split(' ')[0]}</span>
                    <span>{crs.enrolled} Enrolled</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                      <span>Completion Rate</span>
                      <span>{crs.completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                      <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${crs.completionRate}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          INTERN MANAGEMENT MODULE
          ========================================== */}
      {activeView === 'interns' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Intern Progress Board</h3>
            <p className="text-xs text-slate-500 font-medium">Monitor active intern projects and approve Full-Time Conversions (FTE).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interns.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-4 flex items-start gap-4">
                <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover border border-slate-200 mt-1 shrink-0" />
                <div className="grow space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-800">{item.name}</h4>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                        item.status === 'CONVERTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold font-mono">Mentor: {item.mentor}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Assigned Project</p>
                    <p className="text-[10px] font-bold text-slate-700 leading-normal">{item.project}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                      <span>Project Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                      <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>

                  {item.status === 'ONGOING' ? (
                    <button
                      onClick={() => handleConvertIntern(item.id)}
                      className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-extrabold shadow-sm transition-all uppercase"
                    >
                      Convert to Full-Time
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-extrabold bg-emerald-50 border border-emerald-250 p-2 rounded-xl justify-center">
                      <Check className="h-4 w-4" />
                      <span>FTE Conversion Confirmed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          EMPLOYEE DOCUMENTS MODULE
          ========================================== */}
      {activeView === 'documents' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Document Vault</h3>
            <p className="text-xs text-slate-500 font-medium">Verify employee identity certificates and legal contracts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Folder structures */}
            {['Identity Verification', 'Tax Declarations', 'Relieving Letters', 'Contracts & NDAs'].map((folder, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center gap-3 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer">
                <FolderOpen className="h-6 w-6 text-blue-600 shrink-0" />
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-800 line-clamp-1">{folder}</h4>
                  <p className="text-[9px] text-slate-400 font-medium">4 PDF Files</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dropzone mock */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Document Upload</h4>
              
              <div
                onClick={() => showToast('Simulating secure file upload...', 'info')}
                className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 bg-slate-50 hover:bg-white text-center cursor-pointer space-y-2 transition-all"
              >
                <UploadCloud className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700">Drag files here, or browse</p>
                <p className="text-[9px] text-slate-400 font-medium">Supports PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Document logs */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Document Submissions</h4>
              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Aadhaar_Card_Sneha.pdf', size: '1.2 MB', uploader: 'Sneha Reddy', date: 'Today' },
                  { name: 'Tax_Declaration_Kiran.pdf', size: '2.4 MB', uploader: 'Kiran Gopi', date: '2 days ago' },
                  { name: 'Signed_NDA_Nikitha.pdf', size: '4.5 MB', uploader: 'Nikitha Rao', date: '4 days ago' },
                ].map((doc, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs text-left">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500 shrink-0" />
                      <div>
                        <p className="font-extrabold text-slate-800">{doc.name}</p>
                        <p className="text-[9px] text-slate-400 font-semibold font-mono">Uploader: {doc.uploader} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => showToast(`Audit complete. Document marked as Verified.`, 'success')}
                        className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase"
                      >
                        Verify Doc
                      </button>
                      <p className="text-[8px] text-slate-400 font-mono mt-0.5">{doc.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          EMPLOYEE ID CARDS GENERATOR MODULE
          ========================================== */}
      {activeView === 'id-cards' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Digital ID Badge Generator</h3>
            <p className="text-xs text-slate-500 font-medium">Verify employee identity certificates and print secure NFC ID Badges.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel Select */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Badge Parameters</h4>
              
              <div className="text-xs font-bold text-slate-600 text-left space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Select Employee</label>
                <select
                  value={idCardEmpId}
                  onChange={(e) => setIdCardEmpId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-slate-850 bg-white font-sans"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-normal">
                Generates a secure NFC digital badge with dynamic QR linking directly to the staff profile database.
              </div>

              <button
                onClick={() => showToast('ID Badge print spooler initiated.', 'success')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all uppercase"
              >
                Print NFC Badge Card
              </button>
            </div>

            {/* Visual Badge Card Render */}
            <div className="lg:col-span-2 flex justify-center py-6 bg-slate-50 rounded-3xl border border-slate-200">
              {/* Premium Vertical CSS ID Card */}
              <div className="w-[280px] h-[420px] rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between items-center text-center text-slate-800 shadow-xl relative overflow-hidden">
                
                {/* Background layout watermarks */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 -mr-10 -mt-10 pointer-events-none z-0" />
                <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-blue-600/5 -ml-16 -mb-16 pointer-events-none z-0" />

                {/* Card Header */}
                <div className="w-full border-b border-slate-100 pb-3 flex items-center justify-between relative z-10">
                  <div className="text-left">
                    <p className="text-[10px] font-black tracking-widest text-blue-600 uppercase font-sans">InnoVibe</p>
                    <p className="text-[7px] text-slate-400 tracking-wider font-semibold">MOBILITY CO.</p>
                  </div>
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">SECURE</span>
                </div>

                {/* Card Body */}
                <div className="space-y-4 my-auto relative z-10 flex flex-col items-center">
                  <img
                    src={currentIdEmployee.avatar}
                    alt={currentIdEmployee.name}
                    className="h-24 w-24 rounded-full object-cover border-4 border-slate-100 shadow-md"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold tracking-tight font-sans text-slate-900">{currentIdEmployee.name}</h4>
                    <p className="text-[9px] text-black font-black uppercase tracking-wider mt-0.5">{currentIdEmployee.role}</p>
                    <p className="text-[8px] text-slate-500 font-bold mt-1 font-mono">{currentIdEmployee.department} • {currentIdEmployee.location}</p>
                  </div>
                </div>

                {/* Card Footer Barcode/QR */}
                <div className="w-full flex items-center justify-between border-t border-slate-100 pt-4 bg-slate-50 border border-slate-200/60 px-3 py-2.5 rounded-2xl relative z-10">
                  <div className="text-left font-mono text-[8px] space-y-0.5">
                    <p><span className="font-black text-black">ID:</span> <span className="font-bold text-slate-700">{currentIdEmployee.id.toUpperCase()}</span></p>
                    <p><span className="font-black text-black">EXP:</span> <span className="font-bold text-slate-700">12/2028</span></p>
                  </div>
                  
                  {/* Mock QR Icon */}
                  <div className="bg-white border border-slate-250 p-1 rounded-md shrink-0">
                    <QrCode className="h-6 w-6 text-slate-950" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          HOLIDAY CALENDAR MODULE (REDESIGNED)
          ========================================== */}
      {activeView === 'holidays' && (
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Holiday Calendar</h2>
              <p className="text-xs text-slate-500 font-medium">View official company holidays for the selected year.</p>
            </div>
            
            {/* HR Actions Panel */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  resetForm();
                  setIsAddModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Holiday</span>
              </button>
              <button
                onClick={handleImportHolidays}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-3xs flex items-center gap-1.5 transition-all"
              >
                <UploadCloud className="h-3.5 w-3.5 text-slate-500" />
                <span>Import List</span>
              </button>
              <button
                onClick={handleExportHolidays}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-3xs flex items-center gap-1.5 transition-all"
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span>Export Calendar</span>
              </button>
            </div>
          </div>

          {/* Filters, Controls & Legend Bar */}
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            {/* Holiday Type Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'National', 'Regional', 'Corporate'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    selectedFilter === filter
                      ? 'bg-slate-900 text-white shadow-3xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {filter} Holidays
                </button>
              ))}
            </div>

            {/* Calendar View Controls & Search */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search holidays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-48 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans"
                />
              </div>

              {/* Year Selector */}
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
              </select>

              {/* Navigation Group */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-white p-0.5 animate-in fade-in duration-200">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-all"
                  title="Previous Month"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleGoToday}
                  className="px-2.5 py-1 text-[10px] font-black text-slate-700 hover:bg-slate-50 rounded-lg border-x border-slate-100 uppercase tracking-wider"
                >
                  Today
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-all"
                  title="Next Month"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid & Sidebar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Calendar Grid Side */}
            <div className="lg:col-span-3 space-y-4 text-left">
              {/* Calendar Grid Container */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs">
                
                {/* Month Name & Legend Panel */}
                <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>National Holiday</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>Regional Holiday</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Corporate Holiday</span>
                    </span>
                  </div>
                </div>

                {/* Day Columns Header */}
                <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/20">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-center font-black text-slate-450 uppercase text-[9px] py-2 tracking-wider">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar Days Matrix */}
                <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 bg-slate-100/10">
                  {getDaysInMonth(currentYear, currentMonth).map((cell, idx) => {
                    const dayHolidays = filteredHolidays.filter((h) => h.date === cell.dateStr);
                    const isToday = cell.dateStr === referenceToday;
                    
                    return (
                      <div
                        key={idx}
                        className={`min-h-[75px] p-2 flex flex-col justify-between transition-all bg-white group hover:bg-slate-50/30 ${
                          !cell.isCurrentMonth ? 'opacity-40 bg-slate-50/10' : ''
                        } ${isToday ? 'ring-2 ring-blue-500 ring-inset bg-blue-50/5' : ''}`}
                      >
                        {/* Day Number Header */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold ${
                            isToday
                              ? 'bg-blue-600 text-white h-5 w-5 rounded-full flex items-center justify-center font-mono shadow-xs'
                              : cell.isCurrentMonth ? 'text-slate-800' : 'text-slate-400'
                          }`}>
                            {cell.dayNum}
                          </span>
                          {isToday && (
                            <span className="text-[7px] font-black text-blue-600 bg-blue-50 border border-blue-200 px-1 py-0.2 rounded font-sans tracking-wide">
                              TODAY
                            </span>
                          )}
                        </div>

                        {/* Holiday Badges container */}
                        <div className="grow mt-1.5 space-y-1 overflow-hidden flex flex-col justify-start">
                          {dayHolidays.map((h) => (
                            <div
                              key={h.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedHoliday(h);
                              }}
                              className={`flex items-center gap-1.5 px-1.5 py-0.8 rounded-md text-[9px] font-black border cursor-pointer hover:scale-102 hover:shadow-3xs transition-all ${
                                h.type === 'National'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : h.type === 'Regional'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                              title={h.name}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                h.type === 'National' ? 'bg-blue-600' :
                                h.type === 'Regional' ? 'bg-amber-500' :
                                'bg-emerald-500'
                              }`} />
                              <span className="truncate">{h.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Summary Side */}
            <div className="space-y-6 text-left">
              
              {/* Stat Total Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-wider">Total Holidays</span>
                  <Calendar className="h-4 w-4 text-slate-405" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">{totalHolidaysThisYear}</span>
                  <span className="text-xs text-slate-450 font-bold">days in {currentYear}</span>
                </div>
              </div>

              {/* Next Holiday Countdown Card */}
              {nextHoliday && (
                <div className="p-5 rounded-3xl bg-blue-50 border border-blue-200 text-blue-900 shadow-3xs space-y-3 relative overflow-hidden">
                  {/* Decorative background circle */}
                  <div className="absolute right-0 bottom-0 w-24 h-24 rounded-full bg-blue-100/40 -mr-5 -mb-5" />
                  
                  <div className="space-y-1 relative z-10">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-100 uppercase tracking-widest text-blue-805 border border-blue-200/50">
                      Next Holiday
                    </span>
                    <h4 className="text-xs font-black text-blue-950 line-clamp-1 mt-1.5">{nextHoliday.name}</h4>
                    <p className="text-[9px] text-blue-750 font-black font-mono">
                      {formatDateLong(nextHoliday.date)}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-blue-200 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-bold text-blue-600">Countdown</span>
                    <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-md font-mono shadow-xs">
                      {getDaysDiff(referenceToday, nextHoliday.date) === 0 
                        ? 'TODAY' 
                        : `${getDaysDiff(referenceToday, nextHoliday.date)} Days Left`}
                    </span>
                  </div>
                </div>
              )}

              {/* This Month's Holidays List */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  In {monthNames[currentMonth]}
                </h4>
                
                {thisMonthHolidaysList.length === 0 ? (
                  <p className="text-[10px] text-slate-400 font-bold py-2">No official holidays this month.</p>
                ) : (
                  <div className="space-y-2.5">
                    {thisMonthHolidaysList.map((h) => (
                      <div
                        key={h.id}
                        onClick={() => setSelectedHoliday(h)}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-150 hover:border-slate-250 transition-all cursor-pointer text-left"
                      >
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-black text-slate-800 line-clamp-1">{h.name}</p>
                          <span className={`inline-block text-[7px] font-black px-1.5 py-0.2 rounded border ${
                            h.type === 'National'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : h.type === 'Regional'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {h.type}
                          </span>
                        </div>
                        <div className="text-right font-mono text-[9px] font-black text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                          {h.date.split('-')[2]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming Holidays List (Next 3) */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Upcoming Holidays
                </h4>
                
                {upcomingHolidaysList.length === 0 ? (
                  <p className="text-[10px] text-slate-400 font-bold py-2">No upcoming holidays scheduled.</p>
                ) : (
                  <div className="space-y-2.5">
                    {upcomingHolidaysList.slice(0, 3).map((h) => (
                      <div
                        key={h.id}
                        onClick={() => setSelectedHoliday(h)}
                        className="flex items-start justify-between p-2 rounded-xl bg-slate-50 border border-slate-150 hover:border-slate-250 transition-all cursor-pointer text-left"
                      >
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-black text-slate-850 line-clamp-1">{h.name}</p>
                          <p className="text-[8px] text-slate-405 font-bold font-mono">{formatDateLong(h.date)}</p>
                        </div>
                        <span className={`text-[7px] font-black px-1.5 py-0.5 rounded shrink-0 border ${
                          h.type === 'National'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : h.type === 'Regional'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {h.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* ==========================================
              HOLIDAY DETAIL SIDE PANEL / MODAL
              ========================================== */}
          {selectedHoliday && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="text-sm font-black text-slate-900">Holiday Information</h3>
                  </div>
                  <button
                    onClick={() => setSelectedHoliday(null)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-full border mb-1.5 ${
                      selectedHoliday.type === 'National'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : selectedHoliday.type === 'Regional'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {selectedHoliday.type} Holiday
                    </span>
                    <h4 className="text-base font-black text-slate-950">{selectedHoliday.name}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl text-[10px] font-bold text-slate-550 leading-relaxed">
                    <div className="space-y-1">
                      <p className="text-[8px] text-slate-400 uppercase font-black">Date</p>
                      <p className="text-slate-800 font-extrabold">{formatDateLong(selectedHoliday.date)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] text-slate-400 uppercase font-black">Day of Week</p>
                      <p className="text-slate-800 font-extrabold">{getDayName(selectedHoliday.date)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] text-slate-400 uppercase font-black">Applicable Office(s)</p>
                      <p className="text-slate-800 font-extrabold font-sans">{selectedHoliday.locations}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] text-slate-400 uppercase font-black">Status</p>
                      <p className="text-slate-800 font-extrabold">{selectedHoliday.status}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <h5 className="text-[9px] font-black text-slate-400 uppercase">Description</h5>
                    <p className="text-[11px] font-medium text-slate-700 leading-normal bg-slate-50/50 p-3 rounded-xl border border-slate-100 font-sans">
                      {selectedHoliday.description}
                    </p>
                  </div>
                </div>

                {/* Actions Panel inside Details */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(selectedHoliday)}
                      className="p-2 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all flex items-center gap-1 text-[10px] font-black uppercase"
                      title="Edit Holiday"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteHoliday(selectedHoliday.id)}
                      className="p-2 hover:bg-rose-50 border border-rose-100 rounded-xl text-rose-600 transition-all flex items-center gap-1 text-[10px] font-black uppercase"
                      title="Delete Holiday"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedHoliday(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-extrabold shadow-sm transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              HR ADD HOLIDAY MODAL
              ========================================== */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="text-sm font-black text-slate-900">Add Company Holiday</h3>
                  </div>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddHoliday} className="space-y-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Holiday Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Republic Day"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Holiday Date</label>
                      <input
                        type="date"
                        required
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Holiday Type</label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none bg-white text-slate-805 focus:border-blue-500"
                      >
                        <option value="National">National Holiday</option>
                        <option value="Regional">Regional Holiday</option>
                        <option value="Corporate">Corporate Holiday</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Applicable Office Locations</label>
                      <input
                        type="text"
                        placeholder="e.g. All Offices or Rajahmundry"
                        value={formLoc}
                        onChange={(e) => setFormLoc(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none bg-white text-slate-805 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Description</label>
                    <textarea
                      placeholder="Enter a brief holiday description..."
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans font-medium"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm transition-all"
                    >
                      Publish Holiday
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==========================================
              HR EDIT HOLIDAY MODAL
              ========================================== */}
          {isEditModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="text-sm font-black text-slate-900">Edit Company Holiday</h3>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleEditHoliday} className="space-y-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Holiday Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Holiday Date</label>
                      <input
                        type="date"
                        required
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Holiday Type</label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none bg-white text-slate-805 focus:border-blue-500"
                      >
                        <option value="National">National Holiday</option>
                        <option value="Regional">Regional Holiday</option>
                        <option value="Corporate">Corporate Holiday</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Applicable Office Locations</label>
                      <input
                        type="text"
                        value={formLoc}
                        onChange={(e) => setFormLoc(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none bg-white text-slate-805 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans font-medium"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          HR POLICIES LIBRARY MODULE
          ========================================== */}
      {activeView === 'policies' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Corporate Policy Handbook</h3>
            <p className="text-xs text-slate-500 font-medium">Verify employee safety credentials and isolated high-voltage safety standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((pol) => (
              <div key={pol.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-start gap-4 hover:border-slate-350 transition-all">
                <FileCheck className="h-6 w-6 text-blue-600 mt-0.5 shrink-0" />
                <div className="grow space-y-2 text-left">
                  <div>
                    <h4 className="text-xs font-black text-slate-850">{pol.title}</h4>
                    <p className="text-[9px] text-slate-400 font-bold">Category: {pol.category} • {pol.date}</p>
                  </div>
                  <button
                    onClick={() => showToast(`Downloading PDF for "${pol.title}"`, 'info')}
                    className="text-[9px] font-black text-blue-650 hover:text-blue-700 uppercase flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" /> Download Handbook PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          EXIT MANAGEMENT MODULE
          ========================================== */}
      {activeView === 'exit' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Resignations & Clearances</h3>
            <p className="text-xs text-slate-500 font-medium">Verify employee asset recoveries, bank payouts, and FNF clearances.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {exits.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{item.role}</p>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${
                    item.status === 'SETTLED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-650 space-y-1">
                  <p>Resigned Date: <strong className="text-slate-800">{item.resignationDate}</strong></p>
                  <p>Tentative Exit: <strong className="text-slate-800">{item.exitDate}</strong></p>
                  <p>Settle Status: <strong className="text-slate-900 uppercase font-mono">{item.settleStatus}</strong></p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[10px] text-slate-400 font-bold">Assets Cleared: {item.assetsReturned} / {item.assetsReturned + item.assetsPending}</span>

                  {item.status === 'CLEARANCE_IN_PROGRESS' ? (
                    <button
                      onClick={() => handleExitSettlement(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-extrabold shadow-sm transition-all uppercase"
                    >
                      Process Final Settlement
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      <Check className="h-3 w-3" /> FNF COMPLETE
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          REPORTS & ANALYTICS MODULE
          ========================================== */}
      {activeView === 'reports' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Exportable Reports workbench</h3>
            <p className="text-xs text-slate-500 font-medium">Download CSV and PDF audit listings for compliance inspections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Monthly Attendance Logs', format: 'CSV / Excel', desc: 'Roster check-ins, late logs, overtime calculations.' },
              { title: 'Tax & PF Declarations', format: 'PDF Archive', desc: 'Provident fund deductions, TDS, tax declarations summary.' },
              { title: 'Hiring funnel & CSAT Index', format: 'CSV', desc: 'Recruitment applicant analytics and CSAT scores.' },
              { title: 'Safety Training Audits', format: 'PDF Certificate Book', desc: 'Certifications and courses verification list.' },
            ].map((report, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-3xs flex items-center justify-between hover:border-slate-350 transition-all">
                <div className="text-left space-y-1">
                  <h4 className="text-xs font-black text-slate-800 leading-tight">{report.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{report.desc}</p>
                  <span className="inline-block text-[8px] font-black px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500">
                    Format: {report.format}
                  </span>
                </div>
                <button
                  onClick={() => showToast(`Generating export for ${report.title}...`, 'info')}
                  className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-650 hover:bg-blue-100 transition-all"
                  title="Export"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          PORTAL NOTIFICATIONS MODULE
          ========================================== */}
      {activeView === 'notifications' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Notification Alert Logs</h3>
            <p className="text-xs text-slate-500 font-medium">Realtime alerts from system agents and cron-jobs.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3">
            {[
              { title: 'Suresh Kumar - Leave request pending approval', time: '10 mins ago', type: 'LEAVE', desc: 'Applied for Medical Leave from July 23 to July 25.' },
              { title: 'Kiran Gopi checked in late today', time: '1 hour ago', type: 'ATTENDANCE', desc: 'Check-in time: 09:22 AM. (SLA Alert)' },
              { title: 'Verification pending: Sneha Reddy documents', time: '3 hours ago', type: 'DOCS', desc: 'Please verify Aadhaar card and Relieving letter.' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                  <span className="text-[8px] font-mono text-slate-400">{item.time}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}



    </div>
  );
}
