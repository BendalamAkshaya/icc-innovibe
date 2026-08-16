'use client';

import React, { useState, useEffect } from 'react';
import { DepartmentItem } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import { CreateDepartmentModal } from './CreateDepartmentModal';
import {
  Building2,
  Plus,
  Search,
  Users,
  Clock,
  Shield,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Key,
  Lock as LockIcon,
  Mail,
  UserCheck,
  Sparkles,
} from 'lucide-react';

export function TmsDepartmentsView() {
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load departments from local persistence repository
  const loadDepartments = async () => {
    setIsLoading(true);
    const list = await DepartmentService.getAll();
    setDepartments(list);
    setIsLoading(false);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleDeleteDepartment = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete department "${name}"? This action persists across sessions.`)) {
      await DepartmentService.delete(id);
      loadDepartments();
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredDepartments = departments.filter((d) => {
    const matchesSearch =
      d.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.departmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.departmentHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.loginEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ? true : statusFilter === 'ACTIVE' ? d.isActive : !d.isActive;

    return matchesSearch && matchesStatus;
  });

  const totalPersonnel = departments.reduce((acc, curr) => acc + curr.employeeCount, 0);

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Departments & Hierarchy
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Org Matrix
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Organizational structure, department credentials, check-in cutoff times, and personnel allocation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Department</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Departments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                TOTAL DEPARTMENTS
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {departments.length}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
              <Building2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-amber-700">Persisted in Repository</span>
            <span className="text-slate-400">Live Sync</span>
          </div>
        </div>

        {/* KPI 2: Active Units */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                ACTIVE UNITS
              </span>
              <p className="font-apfel text-2xl font-black text-emerald-600 tracking-tight leading-none mt-1">
                {departments.filter((d) => d.isActive).length}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <UserCheck className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-emerald-600">100% Operational</span>
            <span className="text-slate-400">Zero Downtime</span>
          </div>
        </div>

        {/* KPI 3: Total Personnel */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                TOTAL PERSONNEL
              </span>
              <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {totalPersonnel}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-sky-700">Enrolled Workforce</span>
            <span className="text-slate-400">Across Units</span>
          </div>
        </div>

        {/* KPI 4: Avg Cutoff Time */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                AVG CUTOFF TIME
              </span>
              <p className="font-apfel text-2xl font-black text-[#b45309] tracking-tight leading-none mt-1">
                09:15 AM
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 font-apfel text-xs">
            <span className="font-bold text-amber-700">Biometric Gatekeeper</span>
            <span className="text-slate-400">Enforced</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 w-full sm:w-96 shadow-2xs">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search department name, code, head, email..."
            className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
          />
        </div>

        <div className="flex items-center gap-2 font-apfel text-xs w-full sm:w-auto">
          <span className="text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Units</option>
            <option value="INACTIVE">Inactive Units</option>
          </select>
        </div>
      </div>

      {/* 4. Departments Grid / Cards List */}
      {isLoading ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-100 text-center text-slate-400 font-apfel text-xs">
          Loading Department Repository...
        </div>
      ) : filteredDepartments.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-100 text-center space-y-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Building2 className="h-5 w-5" />
          </div>
          <h3 className="font-gotham text-sm font-bold text-slate-800">No Departments Found</h3>
          <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
            No department records match your search filter or repository storage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDepartments.map((dept) => {
            const isPasswordShown = visiblePasswords[dept.id] || false;

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all hover:-translate-y-1 flex flex-col justify-between space-y-5 text-left group"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${dept.departmentColor || 'bg-amber-500'}`} />
                      <span className="font-apfel text-[11px] font-extrabold text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-full border border-[#fde68a]">
                        {dept.departmentCode}
                      </span>
                    </div>
                    <h3 className="font-gotham text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#b45309] transition-colors">
                      {dept.departmentName}
                    </h3>
                  </div>

                  <span className="font-apfel text-[9px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ACTIVE
                  </span>
                </div>

                {/* Department Head & Staff Count */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 font-apfel text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-sans block">Department Head</span>
                    <p className="font-bold text-slate-900">{dept.departmentHead}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-sans block">Personnel</span>
                    <p className="font-bold text-[#b45309]">{dept.employeeCount} Staff</p>
                  </div>
                </div>

                {/* Portal Credentials Box */}
                <div className="p-3.5 rounded-2xl bg-slate-950 text-white space-y-2 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-apfel">
                    <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Key className="h-3 w-3" /> Portal Credentials
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(dept.id)}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title={isPasswordShown ? 'Hide Password' : 'Show Password'}
                    >
                      {isPasswordShown ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="h-3 w-3 text-slate-500 shrink-0" />
                      <span className="truncate">{dept.loginEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <LockIcon className="h-3 w-3 text-slate-500 shrink-0" />
                      <span>{isPasswordShown ? dept.loginPassword : '••••••••••••'}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Info & Delete Action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 font-apfel text-xs">
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Cutoff: <strong className="text-slate-800">{dept.checkInCutoffTime}</strong></span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDeleteDepartment(dept.id, dept.departmentName)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Department from Storage"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Department Modal Dialog */}
      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onDepartmentCreated={loadDepartments}
      />
    </div>
  );
}
