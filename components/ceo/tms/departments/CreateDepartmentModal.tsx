'use client';

import React, { useState } from 'react';
import { CreateDepartmentPayload } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import { X, Building2, Shield, Lock, Mail, User, Clock, Users, Check } from 'lucide-react';

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepartmentCreated: () => void;
}

export function CreateDepartmentModal({ isOpen, onClose, onDepartmentCreated }: CreateDepartmentModalProps) {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [checkInCutoffTime, setCheckInCutoffTime] = useState('09:15 AM');
  const [employeeCount, setEmployeeCount] = useState<number>(14);
  const [departmentColor, setDepartmentColor] = useState('bg-amber-500');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setDepartmentName('');
    setDepartmentCode('');
    setDepartmentHead('');
    setLoginEmail('');
    setLoginPassword('');
    setCheckInCutoffTime('09:15 AM');
    setEmployeeCount(14);
    setDepartmentColor('bg-amber-500');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentName.trim() || !departmentCode.trim() || !departmentHead.trim() || !loginEmail.trim()) {
      alert('Please fill in all required department fields.');
      return;
    }

    setIsSubmitting(true);

    const payload: CreateDepartmentPayload = {
      departmentName: departmentName.trim(),
      departmentCode: departmentCode.trim().toUpperCase(),
      departmentHead: departmentHead.trim(),
      loginEmail: loginEmail.trim(),
      loginPassword: loginPassword.trim() || 'Pass@2026Secure',
      checkInCutoffTime: checkInCutoffTime.trim() || '09:15 AM',
      employeeCount: Number(employeeCount) || 10,
      departmentColor,
    };

    await DepartmentService.create(payload);
    setIsSubmitting(false);
    resetForm();
    onDepartmentCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-xl w-full shadow-2xl text-left space-y-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-gotham text-lg font-extrabold text-white">Create New Department</h2>
              <p className="font-sans text-xs text-slate-400">Enterprise organizational unit and portal credentials</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {/* Department Name & Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Department Name *
              </label>
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="e.g. Telematics Engineering"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Code *
              </label>
              <input
                type="text"
                value={departmentCode}
                onChange={(e) => setDepartmentCode(e.target.value)}
                placeholder="e.g. TEL"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-apfel font-bold uppercase"
              />
            </div>
          </div>

          {/* Department Head */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
              Department Head *
            </label>
            <input
              type="text"
              value={departmentHead}
              onChange={(e) => setDepartmentHead(e.target.value)}
              placeholder="e.g. Srinivas Rao"
              required
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-semibold"
            />
          </div>

          {/* Credentials: Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Login Email *
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="telematics@innovibe.in"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Portal Password *
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Pass@2026Secure"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Cutoff Time & Initial Staff Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Check-in Cutoff Time
              </label>
              <input
                type="text"
                value={checkInCutoffTime}
                onChange={(e) => setCheckInCutoffTime(e.target.value)}
                placeholder="09:15 AM"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-apfel font-medium"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Staff Count
              </label>
              <input
                type="number"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                min={1}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-amber-500 font-apfel font-bold"
              />
            </div>
          </div>

          {/* Color Theme Selector */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-2">
              Color Theme Accent
            </label>
            <div className="flex items-center gap-3">
              {[
                { class: 'bg-amber-500', name: 'Amber Gold' },
                { class: 'bg-emerald-500', name: 'Emerald' },
                { class: 'bg-sky-500', name: 'Sky Blue' },
                { class: 'bg-purple-500', name: 'Purple' },
                { class: 'bg-rose-500', name: 'Rose' },
              ].map((c) => (
                <button
                  key={c.class}
                  type="button"
                  onClick={() => setDepartmentColor(c.class)}
                  className={`h-7 w-7 rounded-full ${c.class} flex items-center justify-center transition-transform ${
                    departmentColor === c.class ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={c.name}
                >
                  {departmentColor === c.class && <Check className="h-3.5 w-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 font-apfel">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save & Register Department'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
