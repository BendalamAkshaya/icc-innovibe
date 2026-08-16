'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  AnnouncementRecord,
  AnnouncementPriority,
  TargetAudience,
  CreateAnnouncementPayload,
  AnnouncementAttachment,
  AnnouncementVoice,
  AnnouncementStatistics,
} from '../../../../lib/announcement-models';
import { AnnouncementService } from '../../../../lib/announcement-service';
import { DepartmentItem } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import { EmployeeRecord } from '../../../../lib/employee-models';
import { EmployeeService } from '../../../../lib/employee-service';
import { AnnouncementPreviewModal } from './AnnouncementPreviewModal';
import {
  Megaphone,
  Pin,
  Trash2,
  Paperclip,
  Mic,
  Square,
  Play,
  Pause,
  Send,
  Eye,
  Search,
  CheckCircle2,
  Users,
  Building2,
  AlertTriangle,
  Radio,
  FileText,
  Volume2,
} from 'lucide-react';

export function TmsAnnouncementsView() {
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [stats, setStats] = useState<AnnouncementStatistics>({
    totalAnnouncements: 3,
    announcementsToday: 1,
    pinnedAnnouncements: 1,
    criticalAlerts: 1,
  });

  // Form State
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('EVERYONE');
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [priority, setPriority] = useState<AnnouncementPriority>('IMPORTANT');
  const [isPinned, setIsPinned] = useState(false);
  const [notifyImmediately, setNotifyImmediately] = useState(true);
  const [attachments, setAttachments] = useState<AnnouncementAttachment[]>([]);

  // Audio Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceRecord, setVoiceRecord] = useState<AnnouncementVoice | undefined>(undefined);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<AnnouncementPriority | 'ALL'>('ALL');
  const [selectedAudienceFilter, setSelectedAudienceFilter] = useState<TargetAudience | 'ALL'>('ALL');

  // Preview Modal State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPayload, setPreviewPayload] = useState<CreateAnnouncementPayload | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const annList = await AnnouncementService.getAll();
    const deptList = await DepartmentService.getAll();
    const empList = await EmployeeService.getAll();
    const statData = await AnnouncementService.getStatistics();

    setAnnouncements(annList);
    setDepartments(deptList);
    setEmployees(empList);
    setStats(statData);

    if (deptList.length > 0 && !selectedDeptId) setSelectedDeptId(deptList[0].id);
    if (empList.length > 0 && !selectedEmpId) setSelectedEmpId(empList[0].id);

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Voice Recording Handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setVoiceRecord({
            id: `VOICE-${Date.now()}`,
            durationSeconds: recordingSeconds,
            audioDataUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(blob);

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (e) {
      alert('Microphone access denied or audio recording not supported on this browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const deleteVoiceRecord = () => {
    setVoiceRecord(undefined);
    setRecordingSeconds(0);
  };

  // Attachment Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const newAtt: AnnouncementAttachment = {
      id: `ATT-${Date.now()}`,
      filename: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      mimeType: file.type || 'application/octet-stream',
    };

    setAttachments((prev) => [...prev, newAtt]);
  };

  const buildPayloadFromForm = (): CreateAnnouncementPayload => {
    const selectedDept = departments.find((d) => d.id === selectedDeptId);
    const selectedEmp = employees.find((e) => e.id === selectedEmpId);

    return {
      title: title.trim(),
      message: message.trim(),
      senderId: 'EMP-101',
      senderName: 'Sri Hari Kolusu',
      senderRole: 'Founder & CEO (Admin)',
      senderDepartment: 'Executive Office',
      targetAudience,
      targetDepartmentId: targetAudience === 'SPECIFIC_DEPARTMENT' ? selectedDept?.id : undefined,
      targetDepartmentName: targetAudience === 'SPECIFIC_DEPARTMENT' ? selectedDept?.departmentName : undefined,
      targetEmployeeId: targetAudience === 'SPECIFIC_EMPLOYEE' ? selectedEmp?.id : undefined,
      targetEmployeeName: targetAudience === 'SPECIFIC_EMPLOYEE' ? selectedEmp?.fullName : undefined,
      priority,
      isPinned,
      notifyImmediately,
      attachments,
      voiceRecord,
    };
  };

  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      alert('Please fill in both Announcement Title and Message body.');
      return;
    }
    const payload = buildPayloadFromForm();
    setPreviewPayload(payload);
    setIsPreviewOpen(true);
  };

  const handleConfirmPublish = async () => {
    if (!previewPayload) return;
    setIsPublishing(true);

    await AnnouncementService.create(previewPayload);

    // Reset Form
    setTitle('');
    setMessage('');
    setAttachments([]);
    setVoiceRecord(undefined);
    setIsPinned(false);

    setIsPublishing(false);
    setIsPreviewOpen(false);
    loadData();
  };

  const handleDeleteAnnouncement = async (id: string, annTitle: string) => {
    if (confirm(`Are you sure you want to delete broadcast "${annTitle}"? This will persist across sessions.`)) {
      await AnnouncementService.delete(id);
      loadData();
    }
  };

  const handleTogglePin = async (id: string) => {
    await AnnouncementService.togglePin(id);
    loadData();
  };

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.senderDepartment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = selectedPriority === 'ALL' ? true : a.priority === selectedPriority;
    const matchesAudience = selectedAudienceFilter === 'ALL' ? true : a.targetAudience === selectedAudienceFilter;

    return matchesSearch && matchesPriority && matchesAudience;
  });

  const getPriorityStyle = (p: AnnouncementPriority) => {
    switch (p) {
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'IMPORTANT':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Megaphone className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Corporate Announcements
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Broadcast Center
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Broadcast organizational news, critical policy alerts, audio memos, and departmental directives.
          </p>
        </div>
      </div>

      {/* 2. KPI Statistics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-apfel">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">TOTAL BROADCASTS</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalAnnouncements}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Megaphone className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">PINNED TO TOP</span>
            <p className="text-2xl font-black text-purple-600 mt-1">{stats.pinnedAnnouncements}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Pin className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">CRITICAL ALERTS</span>
            <p className="text-2xl font-black text-rose-600 mt-1">{stats.criticalAlerts}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">RECIPIENTS REACHED</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">148 Employees</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 3. Broadcast Announcement Creation Form */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Radio className="h-5 w-5 text-[#d97706]" />
          <h2 className="font-gotham text-base font-extrabold text-slate-900">Broadcast New Announcement</h2>
        </div>

        <form onSubmit={handleOpenPreview} className="space-y-4 text-xs font-sans">
          {/* Title & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Announcement Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Quarterly Strategic All-Hands Meeting & EV Mobility Roadmap Release"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Priority Level *
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-apfel font-extrabold"
              >
                <option value="NORMAL">Normal Priority</option>
                <option value="IMPORTANT">Important Priority</option>
                <option value="CRITICAL">Critical Alert</option>
              </select>
            </div>
          </div>

          {/* Target Audience Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Target Audience *
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-apfel font-bold"
              >
                <option value="EVERYONE">Everyone (Entire Organization)</option>
                <option value="ALL_EMPLOYEES">All Employees</option>
                <option value="ALL_DEPARTMENT_HEADS">All Department Heads</option>
                <option value="SPECIFIC_DEPARTMENT">Specific Department</option>
                <option value="SPECIFIC_EMPLOYEE">Specific Employee</option>
              </select>
            </div>

            {targetAudience === 'SPECIFIC_DEPARTMENT' && (
              <div>
                <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                  Select Department (Repository)
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => setSelectedDeptId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-semibold"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.departmentName} ({d.departmentCode})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {targetAudience === 'SPECIFIC_EMPLOYEE' && (
              <div>
                <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                  Select Recipient Employee (Repository)
                </label>
                <select
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-semibold"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.fullName} ({e.designation})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Message Body */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
              Broadcast Message Content *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write broadcast announcement message body..."
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 font-sans text-xs leading-relaxed"
            />
          </div>

          {/* Attachments & Voice Note Recorder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* File Attachments */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-montserrat text-[10px] font-extrabold uppercase text-slate-500 block">
                Attach Documents (PDF, Word, Excel, Images, ZIP)
              </span>
              <input
                type="file"
                id="ann-file-upload"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="ann-file-upload"
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-amber-400 font-apfel font-bold text-xs cursor-pointer inline-flex items-center gap-2 transition-all shadow-2xs"
              >
                <Paperclip className="h-4 w-4 text-amber-600" />
                <span>Choose Attachment File</span>
              </label>

              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 font-apfel text-[11px]">
                  {attachments.map((att) => (
                    <span key={att.id} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                      {att.filename} ({att.size})
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Recorder */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-montserrat text-[10px] font-extrabold uppercase text-slate-500 block">
                Record Audio Voice Memo
              </span>
              <div className="flex items-center gap-3 font-apfel text-xs">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-bold hover:bg-rose-100 flex items-center gap-2 transition-colors"
                  >
                    <Mic className="h-4 w-4 text-rose-600" />
                    <span>Start Voice Recording</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white font-extrabold flex items-center gap-2 animate-pulse"
                  >
                    <Square className="h-4 w-4" />
                    <span>Stop Recording ({recordingSeconds}s)</span>
                  </button>
                )}

                {voiceRecord && (
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      Audio Attached ({voiceRecord.durationSeconds}s)
                    </span>
                    <button
                      type="button"
                      onClick={deleteVoiceRecord}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkboxes & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 font-apfel">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <span>Pin Announcement to Top</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyImmediately}
                  onChange={(e) => setNotifyImmediately(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <span>Notify Immediately (Dispatch Alert)</span>
              </label>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-extrabold transition-colors flex items-center gap-2"
              >
                <Eye className="h-4 w-4 text-amber-600" />
                <span>Preview Broadcast</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmPublish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Publish Announcement</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 4. Announcement History Roster */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 w-full lg:w-96 shadow-2xs">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcement title, message, sender..."
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto font-apfel text-xs">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as AnnouncementPriority | 'ALL')}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical Alerts</option>
              <option value="IMPORTANT">Important</option>
              <option value="NORMAL">Normal</option>
            </select>

            <select
              value={selectedAudienceFilter}
              onChange={(e) => setSelectedAudienceFilter(e.target.value as TargetAudience | 'ALL')}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Audiences</option>
              <option value="EVERYONE">Everyone</option>
              <option value="ALL_EMPLOYEES">All Employees</option>
              <option value="SPECIFIC_DEPARTMENT">Specific Department</option>
            </select>
          </div>
        </div>

        {/* History Cards */}
        <div className="space-y-3.5 pt-2">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-apfel text-xs">
              Loading Announcements Repository...
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-sans text-xs">
              No corporate broadcasts match active filters.
            </div>
          ) : (
            filteredAnnouncements.map((a) => (
              <div
                key={a.id}
                className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-amber-300 shadow-2xs hover:shadow-md transition-all space-y-3 text-left group"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-[#d97706] border border-amber-200 shrink-0">
                      <Megaphone className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 font-apfel text-xs">
                        {a.isPinned && (
                          <span className="px-2 py-0.2 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-extrabold text-[10px] flex items-center gap-1">
                            <Pin className="h-3 w-3" /> Pinned
                          </span>
                        )}
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getPriorityStyle(a.priority)}`}>
                          {a.priority}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                          Target: {a.targetAudience.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h3 className="font-gotham text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {a.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePin(a.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        a.isPinned ? 'text-purple-600 bg-purple-50' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title={a.isPinned ? 'Unpin Announcement' : 'Pin Announcement'}
                    >
                      <Pin className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteAnnouncement(a.id, a.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Broadcast"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Message */}
                <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                  {a.message}
                </p>

                {/* Voice Note & Attachments */}
                {(a.attachments.length > 0 || a.voiceRecord) && (
                  <div className="flex flex-wrap items-center gap-3 pt-1 font-apfel text-xs">
                    {a.attachments.map((att) => (
                      <span key={att.id} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold flex items-center gap-1.5">
                        <Paperclip className="h-3.5 w-3.5 text-amber-600" />
                        <span>{att.filename}</span>
                      </span>
                    ))}

                    {a.voiceRecord && (
                      <div className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-amber-600" />
                        <span>Voice Note ({a.voiceRecord.durationSeconds}s)</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Metadata */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 font-apfel text-xs text-slate-400">
                  <span>
                    Posted by <strong className="text-slate-800">{a.senderName}</strong> ({a.senderDepartment}) • {a.createdAt}
                  </span>

                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                    {a.readCount} / {a.totalRecipients} Employees Read
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Announcement Live Preview Modal */}
      <AnnouncementPreviewModal
        isOpen={isPreviewOpen}
        payload={previewPayload}
        onClose={() => setIsPreviewOpen(false)}
        onConfirmPublish={handleConfirmPublish}
        isPublishing={isPublishing}
      />
    </div>
  );
}
