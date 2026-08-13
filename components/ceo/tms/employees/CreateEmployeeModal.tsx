'use client';

import React, { useState, useEffect } from 'react';
import { CreateEmployeePayload, UserType } from '../../../../lib/employee-models';
import { EmployeeService } from '../../../../lib/employee-service';
import { DepartmentItem } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import { X, UserPlus, Building2, User, Mail, Phone, Lock, Calendar, Briefcase, ShieldCheck } from 'lucide-react';

interface CreateEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeCreated: () => void;
}

export function CreateEmployeeModal({ isOpen, onClose, onEmployeeCreated }: CreateEmployeeModalProps) {
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [userType, setUserType] = useState<UserType>('EMPLOYEE');
  const [employeeId, setEmployeeId] = useState('');
  const [joiningDate, setJoiningDate] = useState('Aug 06, 2026');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadDepartments = async () => {
      const list = await DepartmentService.getAll();
      setDepartments(list);
      if (list.length > 0 && !departmentId) {
        setDepartmentId(list[0].id);
      }
    };

    loadDepartments();
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setDesignation('');
    setUserType('EMPLOYEE');
    setEmployeeId('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !designation.trim()) {
      alert('Please fill in all required employee onboarding fields.');
      return;
    }

    setIsSubmitting(true);

    const selectedDept = departments.find((d) => d.id === departmentId) || departments[0];

    const payload: CreateEmployeePayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+91 98765 00000',
      password: password.trim() || 'Emp@2026Secure',
      designation: designation.trim(),
      departmentId: selectedDept ? selectedDept.id : 'DEP-101',
      departmentName: selectedDept ? selectedDept.departmentName : 'Human Resources',
      userType,
      joiningDate,
      employeeId: employeeId.trim() || undefined,
    };

    await EmployeeService.create(payload);
    setIsSubmitting(false);
    resetForm();
    onEmployeeCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl text-left space-y-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-gotham text-lg font-extrabold text-white">Employee Onboarding</h2>
              <p className="font-sans text-xs text-slate-400">Register new corporate personnel and grant portal credentials</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {/* Row 1: Assign Department & User Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Assign to Department * (Dynamic Repository)
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-amber-500 font-semibold"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.departmentName} ({d.departmentCode})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                User Type / Access Role *
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-amber-500 font-apfel font-bold"
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="DEPARTMENT_HEAD">Department Head</option>
                <option value="HR">HR Specialist</option>
                <option value="CEO">CEO / Executive</option>
                <option value="ADMIN">System Admin</option>
                <option value="INTERN">Intern</option>
                <option value="SERVICE">Service Manager</option>
              </select>
            </div>
          </div>

          {/* Row 2: Full Name & Employee ID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Verma"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Employee ID
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Auto (e.g. EMP-108)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-apfel font-bold uppercase"
              />
            </div>
          </div>

          {/* Row 3: Job Title & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Job Title / Designation *
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. Senior Telematics Specialist"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Row 4: Work Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Work Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul.v@innovibe.in"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Initial Account Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Emp@2026Secure"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-amber-500 font-sans"
              />
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
              <UserPlus className="h-4 w-4" />
              <span>{isSubmitting ? 'Onboarding...' : 'Create Employee Account'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
