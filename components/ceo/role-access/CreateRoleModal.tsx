'use client';

import React, { useState } from 'react';
import { X, Key, ShieldCheck, MapPin, Check } from 'lucide-react';

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRole: (roleName: string, category: string, scope: string) => void;
}

export function CreateRoleModal({ isOpen, onClose, onCreateRole }: CreateRoleModalProps) {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('CUSTOM');
  const [category, setCategory] = useState('OPERATIONS');
  const [branchScope, setBranchScope] = useState('COASTAL_REGION');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    'Executive Overview',
    'Live Dispatch Map',
    'Service Center Queue Management',
  ]);

  if (!isOpen) return null;

  const handleTemplateSelect = (tmpl: string) => {
    setTemplate(tmpl);
    if (tmpl === 'EXECUTIVE') {
      setRoleName('Executive Vice President');
      setCategory('EXECUTIVE');
      setSelectedPermissions(['Executive Overview', 'Business Performance', 'Fleet Intelligence', 'Action Center']);
    } else if (tmpl === 'OPERATIONS') {
      setRoleName('Regional Operations Lead');
      setCategory('OPERATIONS');
      setSelectedPermissions(['Live Dispatch Map', 'Service Center Queue Management', 'SLA Analytics']);
    } else if (tmpl === 'AUDITOR') {
      setRoleName('SOC2 External Auditor');
      setCategory('FINANCE');
      setSelectedPermissions(['Executive Overview', 'P&L Statements', 'API Latency']);
    }
  };

  const togglePermission = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSave = () => {
    if (!roleName) return;
    onCreateRole(roleName, category, branchScope);
    setRoleName('');
    setDescription('');
    onClose();
  };

  const allModules = [
    'Executive Overview',
    'Business Performance & P&L Margins',
    'Fleet Intelligence IoT Control',
    'Department Performance Digital Twin',
    'Live Dispatch Map',
    'Service Center Queue Management',
    'SLA Compliance Analytics',
    'P&L Statements & Ledger',
    'Quote Workbench & Invoicing',
    'EV Health Telematics Stream',
    'Battery Degradation Audit',
    'AI Agent Pipeline Engine',
    'API Latency Monitoring',
    'Quantum-Safe Security Policy',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" suppressHydrationWarning>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden space-y-0 relative text-left">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
              <Key className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Create Custom Governance Role</h2>
              <p className="text-xs text-slate-400 font-medium">Define role designation, branch scope, permissions, and data inheritance.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          {/* Preset Templates */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-800 uppercase tracking-wider block">Role Template Preset</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'CUSTOM', label: 'Custom' },
                { id: 'EXECUTIVE', label: 'Executive' },
                { id: 'OPERATIONS', label: 'Ops Lead' },
                { id: 'AUDITOR', label: 'Auditor' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTemplateSelect(t.id)}
                  className={`p-2 rounded-xl border font-extrabold text-center transition-all ${
                    template === t.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-slate-800 block mb-1">Role Title / Designation</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g. Coastal Regional Lead"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="font-extrabold text-slate-800 block mb-1">Governance Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 outline-none"
              >
                <option value="EXECUTIVE">Executive Suite</option>
                <option value="OPERATIONS">Operations & Service</option>
                <option value="FINANCE">Finance & Accounts</option>
                <option value="FLEET">Fleet & Telematics</option>
                <option value="TECHNOLOGY">Technology & AI</option>
              </select>
            </div>
          </div>

          {/* Branch Access Scope */}
          <div>
            <label className="font-extrabold text-slate-800 block mb-1">Branch Access Scope</label>
            <select
              value={branchScope}
              onChange={(e) => setBranchScope(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 outline-none"
            >
              <option value="ENTIRE_COMPANY">Entire Company (All Hubs)</option>
              <option value="COASTAL_REGION">Coastal Region (Vizag, Kakinada, Guntur)</option>
              <option value="VIZAG_HUB">Vizag Service Hub Only</option>
              <option value="GUNTUR_HUB">Guntur Service Hub Only</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-extrabold text-slate-800 block mb-1">Role Justification / Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Provide role description and access rationale..."
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 outline-none"
            />
          </div>

          {/* Granted Permissions Selector */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-slate-800 uppercase tracking-wider block">
              Grant Module Permissions ({selectedPermissions.length} Selected)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/50">
              {allModules.map((mod) => {
                const isSelected = selectedPermissions.includes(mod);
                return (
                  <div
                    key={mod}
                    onClick={() => togglePermission(mod)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected ? 'bg-indigo-50 border-indigo-300 font-extrabold text-slate-900' : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    <span className="text-[11px] truncate">{mod}</span>
                    <div className={`h-4 w-4 rounded flex items-center justify-center border ${
                      isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 border-slate-200'
                    }`}>
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 font-bold text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!roleName}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-md shadow-indigo-500/20 disabled:opacity-50"
          >
            Create Role & Deploy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
