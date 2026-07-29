'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  hrCandidates,
  hrJobOpenings,
  Candidate,
  JobOpening,
} from './hr-mock-data';
import {
  Plus,
  Briefcase,
  UserCheck,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  UserCheck2,
  TrendingUp,
} from 'lucide-react';

interface RecruitmentViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function RecruitmentView({ showToast }: RecruitmentViewProps) {
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>(hrCandidates);
  const [jobs, setJobs] = useState<JobOpening[]>(hrJobOpenings);

  // Modals & Selected items state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Job Opening form state
  const [jobTitle, setJobTitle] = useState('');
  const [jobDept, setJobDept] = useState('Engineering');
  const [jobType, setJobType] = useState('Full-Time');
  const [jobLoc, setJobLoc] = useState('Kakinada Hub');
  const [jobOpenings, setJobOpenings] = useState(1);

  // Interview Schedule form state
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewer, setInterviewer] = useState('Ananya Sharma (CTO)');

  // Quick Action triggers
  useEffect(() => {
    if (searchParams.get('open_add_job') === 'true') {
      setIsAddJobOpen(true);
    }
  }, [searchParams]);

  // Stage Categories
  const stages = [
    { key: 'APPLICATIONS' as const, label: 'Applications', bg: 'bg-blue-50 border-blue-100 text-blue-800' },
    { key: 'SCREENING' as const, label: 'Screening', bg: 'bg-sky-50 border-sky-100 text-sky-800' },
    { key: 'INTERVIEW' as const, label: 'Interview', bg: 'bg-indigo-50 border-indigo-100 text-indigo-800' },
    { key: 'OFFER' as const, label: 'Offer', bg: 'bg-purple-50 border-purple-100 text-purple-800' },
    { key: 'HIRED' as const, label: 'Hired', bg: 'bg-emerald-50 border-emerald-100 text-emerald-800' },
  ];

  // Drag and drop / Status transition simulator
  const moveCandidate = (candidateId: string, nextStage: Candidate['stage']) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const updatedTimeline = [
            ...c.timeline,
            {
              date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
              stage: nextStage.charAt(0).toUpperCase() + nextStage.slice(1).toLowerCase(),
              note: `Moved to ${nextStage} stage by HR.`,
            },
          ];
          showToast(`Advanced ${c.name} to ${nextStage} stage.`, 'success');
          return { ...c, stage: nextStage, timeline: updatedTimeline };
        }
        return c;
      })
    );
    // Sync selected candidate panel
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate((prev) =>
        prev
          ? {
              ...prev,
              stage: nextStage,
              timeline: [
                ...prev.timeline,
                {
                  date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                  stage: nextStage.charAt(0).toUpperCase() + nextStage.slice(1).toLowerCase(),
                  note: `Moved to ${nextStage} stage by HR.`,
                },
              ],
            }
          : null
      );
    }
  };

  // Add job opening submit handler
  const handleAddJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) {
      showToast('Please enter a job title', 'error');
      return;
    }
    const newJob: JobOpening = {
      id: `job_0${jobs.length + 1}`,
      title: jobTitle,
      department: jobDept,
      location: jobLoc,
      type: jobType,
      openings: jobOpenings,
      applicants: 0,
      status: 'ACTIVE',
    };
    setJobs([...jobs, newJob]);
    setIsAddJobOpen(false);
    setJobTitle('');
    setJobOpenings(1);
    showToast(`Successfully created job position: ${jobTitle}`, 'success');
  };

  // Schedule Interview submit handler
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewDate || !interviewTime) {
      showToast('Please specify date and time', 'error');
      return;
    }
    if (selectedCandidate) {
      const updatedTimeline = [
        ...selectedCandidate.timeline,
        {
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          stage: 'Interview Scheduled',
          note: `Interview scheduled on ${interviewDate} at ${interviewTime} with ${interviewer}.`,
        },
      ];
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === selectedCandidate.id
            ? { ...c, timeline: updatedTimeline }
            : c
        )
      );
      setSelectedCandidate({ ...selectedCandidate, timeline: updatedTimeline });
      setIsScheduleOpen(false);
      showToast(`Interview scheduled for ${selectedCandidate.name}`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Upper action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Active Recruitment Boards</h2>
          <p className="text-xs text-slate-500 font-medium">Create job roles and advance applicants through the pipeline.</p>
        </div>
        <button
          onClick={() => setIsAddJobOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 self-start transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>New Job Opening</span>
        </button>
      </div>

      {/* Jobs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-mono">
                {job.department}
              </span>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${
                job.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {job.status}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-800 line-clamp-1">{job.title}</h4>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{job.location} • {job.type}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-bold">
              <span>{job.applicants} Applicants</span>
              <span className="text-blue-600">{job.openings} {job.openings > 1 ? 'Open Positions' : 'Open Position'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter((c) => c.stage === stage.key);
          return (
            <div key={stage.key} className="bg-slate-100/60 border border-slate-200/80 rounded-2xl p-3.5 space-y-3 min-w-[200px] flex flex-col max-h-[500px]">
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider ${stage.bg}`}>
                  {stage.label}
                </span>
                <span className="text-xs font-black text-slate-400 bg-white border border-slate-200 h-5 w-5 rounded-full flex items-center justify-center shadow-2xs">
                  {stageCandidates.length}
                </span>
              </div>

              {/* Cards wrapper */}
              <div className="space-y-2 overflow-y-auto flex-1 pr-0.5">
                {stageCandidates.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCandidate(c)}
                    className="p-3 rounded-xl bg-white border border-slate-200 shadow-3xs hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer text-left space-y-3 group"
                  >
                    <div className="flex items-center gap-2">
                      <img src={c.avatar} alt={c.name} className="h-7 w-7 rounded-full object-cover border border-slate-200" />
                      <div>
                        <h4 className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {c.name}
                        </h4>
                        <p className="text-[9px] text-slate-400 font-medium truncate max-w-[120px]">{c.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold border-t border-slate-50 pt-2">
                      <span className="text-indigo-600 font-mono">Score: {c.hiringScore}</span>
                      <span className="text-slate-400">{c.experience.split(' ')[0]} yrs exp</span>
                    </div>
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="py-8 text-center text-[10px] text-slate-400 font-bold border border-dashed border-slate-200 rounded-xl">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ==========================================
          CANDIDATE SLIDE-OVER DETAIL PANEL
          ========================================== */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-3xs flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col text-left animate-in slide-in-from-right duration-300">
            {/* Panel Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                />
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{selectedCandidate.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsScheduleOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-all"
                >
                  <Calendar className="h-3.5 w-3.5 text-blue-500" />
                  <span>Schedule Interview</span>
                </button>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Quick statistics row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hiring Score</p>
                  <p className="text-lg font-black text-blue-600 mt-1">{selectedCandidate.hiringScore} / 100</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Experience</p>
                  <p className="text-xs font-bold text-slate-800 mt-1.5 truncate">{selectedCandidate.experience}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Stage Position</p>
                  <span className="inline-block mt-2 text-[9px] font-black px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    {selectedCandidate.stage}
                  </span>
                </div>
              </div>

              {/* Skills and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Contact Details</h4>
                  <div className="text-xs space-y-1.5 text-slate-600 font-semibold">
                    <p>Email: <span className="text-slate-900 font-bold">{selectedCandidate.email}</span></p>
                    <p>Phone: <span className="text-slate-900 font-bold">{selectedCandidate.phone}</span></p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Core Skill Sets</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span key={index} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recruitment Progress Actions */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Hiring workflow transition</h4>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCandidate.stage !== 'HIRED' && (
                    <button
                      onClick={() => {
                        const stageMap: Record<Candidate['stage'], Candidate['stage']> = {
                          APPLICATIONS: 'SCREENING',
                          SCREENING: 'INTERVIEW',
                          INTERVIEW: 'OFFER',
                          OFFER: 'HIRED',
                          HIRED: 'HIRED',
                        };
                        moveCandidate(selectedCandidate.id, stageMap[selectedCandidate.stage]);
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition-all"
                    >
                      Advance to Next Stage
                    </button>
                  )}
                  {selectedCandidate.stage !== 'APPLICATIONS' && (
                    <button
                      onClick={() => {
                        const stageMap: Record<Candidate['stage'], Candidate['stage']> = {
                          HIRED: 'OFFER',
                          OFFER: 'INTERVIEW',
                          INTERVIEW: 'SCREENING',
                          SCREENING: 'APPLICATIONS',
                          APPLICATIONS: 'APPLICATIONS',
                        };
                        moveCandidate(selectedCandidate.id, stageMap[selectedCandidate.stage]);
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-bold text-xs transition-all"
                    >
                      Move to Previous Stage
                    </button>
                  )}
                </div>
              </div>

              {/* Resume Previewer */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Resume preview (Verified)</h4>
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-xs font-black text-slate-800">{selectedCandidate.documents[0]?.name || 'Resume_V1.pdf'}</span>
                    </div>
                    <button
                      onClick={() => showToast('Simulating resume download...', 'info')}
                      className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase"
                    >
                      Download
                    </button>
                  </div>
                  {/* Simulated PDF visual elements */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs font-mono text-[10px] space-y-4 text-slate-600 leading-relaxed">
                    <div className="text-center border-b border-slate-100 pb-3 space-y-1">
                      <h5 className="text-sm font-bold text-slate-950 font-sans">{selectedCandidate.name}</h5>
                      <p>{selectedCandidate.email} | {selectedCandidate.phone}</p>
                    </div>
                    <div>
                      <h6 className="font-extrabold text-slate-900 font-sans uppercase text-[9px] tracking-wider mb-1">Professional Experience</h6>
                      <p className="font-bold text-slate-800">{selectedCandidate.role} - {selectedCandidate.experience}</p>
                      <p className="mt-1">Design, calibrate, and deploy advanced battery telemetry profiles. Resolve cell degradation issues by custom BMS tuning firmware.</p>
                    </div>
                    <div>
                      <h6 className="font-extrabold text-slate-900 font-sans uppercase text-[9px] tracking-wider mb-1">Key Technologies</h6>
                      <p>{selectedCandidate.skills.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate Timeline logs */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Hiring Timeline logs</h4>
                <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-4">
                  {selectedCandidate.timeline.map((t, index) => (
                    <div key={index} className="relative text-xs">
                      <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                      <p className="font-extrabold text-slate-800">{t.stage}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{t.note}</p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">{t.date}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          NEW JOB OPENING MODAL
          ========================================== */}
      {isAddJobOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">Create Job Position</h3>
              </div>
              <button
                onClick={() => setIsAddJobOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddJobSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Job Designation Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Lead EV Powertrain Diagnostics"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Department</label>
                  <select
                    value={jobDept}
                    onChange={(e) => setJobDept(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  >
                    <option>Engineering</option>
                    <option>Operations</option>
                    <option>Technology</option>
                    <option>Human Resources</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  >
                    <option>Full-Time</option>
                    <option>Contract</option>
                    <option>Intern</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Location</label>
                  <select
                    value={jobLoc}
                    onChange={(e) => setJobLoc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  >
                    <option>Kakinada Hub</option>
                    <option>Rajahmundry Center</option>
                    <option>Hyderabad R&D</option>
                    <option>Visakhapatnam HQ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Open Positions</label>
                  <input
                    type="number"
                    min={1}
                    value={jobOpenings}
                    onChange={(e) => setJobOpenings(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddJobOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          INTERVIEW SCHEDULER MODAL
          ========================================== */}
      {isScheduleOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">Schedule Interview</h3>
              </div>
              <button
                onClick={() => setIsScheduleOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Schedule technical assessment interview for <strong className="text-slate-800">{selectedCandidate.name}</strong>.
            </p>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Time</label>
                  <input
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Interviewer Representative</label>
                <select
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option>Ananya Sharma (CTO)</option>
                  <option>Rajesh Varma (COO)</option>
                  <option>Pooja Reddy (HR Head)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
