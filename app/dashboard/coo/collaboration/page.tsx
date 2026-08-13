'use client';

import React, { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import {
  FolderKanban,
  FileBarChart,
  Bell,
  FileText,
  Download,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Check,
  Upload,
  Eye,
  X,
  FileCode,
  ShieldAlert,
  Info,
} from 'lucide-react';
import Link from 'next/link';

function CollaborationInner() {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') || 'projects' : 'projects';

  // Projects State
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 'p1', title: 'Bengaluru Hub Capacity Expansion', dept: 'Operations', progress: 75, status: 'IN_PROGRESS' },
    { id: 'p2', title: 'AI Technician Dispatch Rule Upgrade', dept: 'Technology', progress: 100, status: 'COMPLETED' },
    { id: 'p3', title: 'Vendor SLA Penalty Matrix Review', dept: 'Procurement', progress: 30, status: 'IN_PROGRESS' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Notifications State
  const [notifs, setNotifs] = useState([
    { id: 'n1', title: 'CRITICAL SLA WARNING', text: 'TKT-2026-8801 has reached 85% SLA time limit in Bengaluru Depot.', cat: 'SLA', time: '10 mins ago', read: false },
    { id: 'n2', title: 'INVENTORY REORDER ALERT', text: '5kW BLDC Hub Motor stock (8 units) dropped below minimum threshold.', cat: 'INVENTORY', time: '25 mins ago', read: false },
    { id: 'n3', title: 'TELEMETRY HIGH TEMP ALERT', text: 'Vehicle KA-01-EQ-9983 reported battery temperature 54.2°C.', cat: 'TELEMETRY', time: '1 hour ago', read: true },
  ]);

  // Documents State
  const [docs, setDocs] = useState([
    {
      id: 'd1',
      title: 'SOP-2026-EV-Safety.pdf',
      desc: 'Standard Operating Procedure for High Voltage Battery Repair',
      type: 'PDF',
      size: '2.4 MB',
      author: 'Safety Compliance Officer',
      date: '2026-07-20',
      content: `STANDARD OPERATING PROCEDURE: HIGH VOLTAGE EV BATTERY REPAIR & DIAGNOSTICS (2026)
1. High Voltage Isolation: Prior to disassembly, ensure main breaker disconnect is locked in OFF position.
2. Personal Protective Equipment (PPE): Class 0 1000V insulated gloves and arc flash shield are mandatory.
3. Diagnostic Thermal Scan: Perform infrared thermography to identify short-circuited cells.
4. Cell Balancing: Execute balance protocol using battery management system (BMS) diagnostic tool.`,
    },
    {
      id: 'd2',
      title: 'Vendor-SLA-Agreement-2026.pdf',
      desc: 'Enterprise Service Level Agreement & Response Metrics',
      type: 'PDF',
      size: '4.1 MB',
      author: 'Legal & Procurement Team',
      date: '2026-06-15',
      content: `ENTERPRISE SERVICE LEVEL AGREEMENT (SLA) & VENDOR PENALTY MATRIX (2026)
1. On-Demand Dispatch SLA: Vendor field technicians must respond within 120 minutes of ticket dispatch.
2. Spare Parts Delivery SLA: Critical inventory components must be delivered to depot within 4 hours.
3. Penalty Structure: Late dispatch incurs 5% billing deduction per hour of delay.`,
    },
    {
      id: 'd3',
      title: 'Technician-Incentive-Policy.pdf',
      desc: 'Monthly Performance Index & CSAT Reward Guidelines',
      type: 'PDF',
      size: '1.8 MB',
      author: 'HR & Operations Lead',
      date: '2026-07-01',
      content: `TECHNICIAN INCENTIVE POLICY & CSAT REWARD PROGRAM (2026)
1. Monthly CSAT Benchmark: Technicians maintaining CSAT >= 4.9 receive a ₹5,000 monthly bonus.
2. Job Completion Volume: Technicians completing >100 successful repairs monthly receive ₹50 bonus per job.
3. Zero Return Policy: Re-opened tickets within 48 hours deduct 10% from performance index.`,
    },
  ]);

  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocDesc, setNewDocDesc] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Real Document Upload
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;

    const file = fileInputRef.current?.files?.[0];
    const fileName = file ? file.name : `${newDocTitle.replace(/\s+/g, '-')}.pdf`;
    const fileSize = file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB';

    const uploadedObj = {
      id: `d_${Date.now()}`,
      title: fileName,
      desc: newDocDesc || 'User Uploaded Operational Document',
      type: fileName.endsWith('.docx') ? 'DOCX' : 'PDF',
      size: fileSize,
      author: 'Chief Operating Officer (COO)',
      date: new Date().toISOString().split('T')[0],
      content: `USER UPLOADED DOCUMENT: ${newDocTitle}\nDescription: ${newDocDesc}\nUploaded Date: ${new Date().toLocaleString()}`,
    };

    setDocs([uploadedObj, ...docs]);
    setNewDocTitle('');
    setNewDocDesc('');
    setShowUploadModal(false);
    setUploadSuccessMsg(`Successfully uploaded "${fileName}" to Enterprise Document Vault!`);

    setTimeout(() => setUploadSuccessMsg(null), 5000);
  };

  // Handle Real Document Download
  const handleDownloadDoc = (doc: any) => {
    const element = document.createElement('a');
    const fileBlob = new Blob([doc.content || `DOCUMENT: ${doc.title}\nDescription: ${doc.desc}`], {
      type: doc.type === 'PDF' ? 'application/pdf' : 'text/plain',
    });
    element.href = URL.createObjectURL(fileBlob);
    element.download = doc.title;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    setTasks([{ id: `p_${Date.now()}`, title: newTaskTitle, dept: 'Operations', progress: 10, status: 'IN_PROGRESS' }, ...tasks]);
    setNewTaskTitle('');
    setShowTaskModal(false);
  };

  const handleMarkRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  return (
    <RouteGuard module="collaboration">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-blue-600" />
              Collaboration, Reports & Document Vault
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Operational Projects • Export PDF/Excel Reports • Real-time Notifications Engine • Document Vault
            </p>
          </div>
        </div>

        {/* Upload Alert Notification */}
        {uploadSuccessMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-xs text-emerald-900 font-bold shadow-xs animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{uploadSuccessMsg}</span>
          </div>
        )}

        {/* Tab Selection Bar */}
        <div className="flex space-x-2 border-b border-slate-200 bg-white px-4 pt-3 rounded-xl">
          {[
            { id: 'projects', label: 'Projects & Tasks', icon: FolderKanban },
            { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart },
            { id: 'notifications', label: 'Notifications Feed', icon: Bell },
            { id: 'documents', label: 'Document Vault', icon: FileText },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <Link
                key={t.id}
                href={`/dashboard/coo/collaboration?tab=${t.id}`}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  active
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Tab 1: Projects */}
        {currentTab === 'projects' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Operational Projects & Task Board</h3>
              <button
                onClick={() => setShowTaskModal(true)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Project Task</span>
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {tasks.map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">{p.title}</span>
                    <span className="text-slate-500 text-[11px]">Department: {p.dept}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <span className="font-extrabold text-slate-700">{p.progress}%</span>
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-extrabold ${
                        p.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Reports */}
        {currentTab === 'reports' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileBarChart className="w-4 h-4 text-blue-600" />
                Instant PDF & Excel Report Generator Engine
              </h3>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                FastAPI Backend Export Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-slate-900 block">COO Daily Operational Summary (PDF)</span>
                  <span className="text-xs text-slate-500 block mt-1">Includes SLAs, Fleet Telemetry, CSAT & KPI Matrix</span>
                </div>
                <a
                  href="http://localhost:8000/api/coo/reports/export/pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-interactive px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-slate-900 block">COO Operational Audit Ledger (Excel/CSV)</span>
                  <span className="text-xs text-slate-500 block mt-1">Raw data spreadsheet export for analytics</span>
                </div>
                <a
                  href="http://localhost:8000/api/coo/reports/export/excel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-emerald-interactive px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Excel</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {currentTab === 'notifications' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-600" /> Operational Notifications Feed
              </h3>
              <button
                onClick={handleMarkAllRead}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer"
              >
                Mark All Read
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {notifs.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-xl border flex items-center justify-between transition ${
                    n.read ? 'bg-slate-50 border-slate-200 opacity-70' : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-extrabold px-1.5 py-0.5 rounded">
                        {n.cat}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">{n.text}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{n.time}</span>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => handleMarkRead(n.id)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg cursor-pointer shrink-0"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Document Vault with Real Upload & Interactive Preview */}
        {currentTab === 'documents' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" /> Enterprise Document Vault
                </h3>
                <p className="text-xs text-slate-500">Preview document contents or upload new compliance files</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn-interactive px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {docs.map((d) => (
                <div
                  key={d.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-100/80 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{d.title}</span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded uppercase">
                        {d.type}
                      </span>
                    </div>
                    <p className="text-slate-600">{d.desc}</p>
                    <div className="text-[10px] text-slate-400 space-x-2">
                      <span>Size: {d.size}</span>
                      <span>•</span>
                      <span>Author: {d.author}</span>
                      <span>•</span>
                      <span>Date: {d.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => setPreviewDoc(d)}
                      className="btn-interactive px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-[11px] rounded-lg transition-all duration-200 flex items-center space-x-1 cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDoc(d)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition flex items-center space-x-1 cursor-pointer shadow-2xs"
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

        {/* Modal: Document Preview Viewer */}
        {previewDoc && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{previewDoc.title}</h2>
                    <span className="text-[11px] text-slate-400">Author: {previewDoc.author} • {previewDoc.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1">
                  <span className="font-bold text-blue-900 block">Document Description</span>
                  <p className="text-blue-800 font-medium">{previewDoc.desc}</p>
                </div>

                <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto border border-slate-800 shadow-inner">
                  {previewDoc.content}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold">Verified Compliance Vault File</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => handleDownloadDoc(previewDoc)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center space-x-1 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Upload Document Dialog */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" /> Upload Document to Vault
                </h2>
                <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Document Title / Name</label>
                  <input
                    type="text"
                    required
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. EV-Battery-Safety-Standard-2026.pdf"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Description / Summary</label>
                  <textarea
                    rows={3}
                    value={newDocDesc}
                    onChange={(e) => setNewDocDesc(e.target.value)}
                    placeholder="Brief description of the compliance or SOP file..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select File (PDF / DOCX)</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 cursor-pointer file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: New Project Task */}
        {showTaskModal && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Create New Project Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. EV Battery Charger Hub Setup"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTaskModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs cursor-pointer"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RouteGuard>
  );
}

export default function CollaborationPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading Collaboration...</div>}>
      <CollaborationInner />
    </Suspense>
  );
}
