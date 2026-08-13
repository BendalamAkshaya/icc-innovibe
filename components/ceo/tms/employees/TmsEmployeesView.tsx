'use client';

import React, { useState, useEffect } from 'react';
import { EmployeeRecord, EmployeeKpis, UserType, AccountStatus } from '../../../../lib/employee-models';
import { EmployeeService } from '../../../../lib/employee-service';
import { DepartmentItem } from '../../../../lib/department-models';
import { DepartmentService } from '../../../../lib/department-service';
import { CreateEmployeeModal } from './CreateEmployeeModal';
import {
  Users,
  UserPlus,
  Search,
  UserCheck,
  Building2,
  Trash2,
  Crown,
  Shield,
  Activity,
  CheckCircle2,
  Clock,
  Circle,
  Filter,
} from 'lucide-react';

export function TmsEmployeesView() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [kpis, setKpis] = useState<EmployeeKpis>({
    totalWorkforce: 7,
    activeWorkforce: 7,
    departmentHeads: 4,
    onlineMembers: 5,
    inactiveMembers: 2,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<UserType | 'ALL'>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedAccountStatus, setSelectedAccountStatus] = useState<AccountStatus | 'ALL'>('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const empList = await EmployeeService.getAll();
    const deptList = await DepartmentService.getAll();
    const kpiSummary = await EmployeeService.getKpis();

    setEmployees(empList);
    setDepartments(deptList);
    setKpis(kpiSummary);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteEmployee = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete employee "${name}"? This action persists across sessions.`)) {
      await EmployeeService.delete(id);
      loadData();
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUserType = selectedUserType === 'ALL' ? true : emp.userType === selectedUserType;
    const matchesDepartment = selectedDepartment === 'ALL' ? true : emp.departmentName === selectedDepartment;
    const matchesStatus = selectedAccountStatus === 'ALL' ? true : emp.accountStatus === selectedAccountStatus;

    return matchesSearch && matchesUserType && matchesDepartment && matchesStatus;
  });

  const getUserTypeBadgeStyle = (userType: UserType) => {
    switch (userType) {
      case 'CEO':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'DEPARTMENT_HEAD':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'HR':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'ADMIN':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getAccountStatusBadgeStyle = (status: AccountStatus) => {
    switch (status) {
      case 'ONLINE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'OFFLINE':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'SUSPENDED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Workforce Directory
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Personnel Engine
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Monitor and manage all corporate workforce employees and department heads in one unified directory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md shadow-amber-900/10 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <UserPlus className="h-4 w-4" />
            <span>+ Add Employee</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* KPI 1: Total Workforce */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              TOTAL WORKFORCE
            </span>
            <div className="h-8 w-8 rounded-full bg-[#fef3c7] text-[#d97706] border border-[#fde68a] flex items-center justify-center shrink-0">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight mt-2">
            {kpis.totalWorkforce}
          </p>
        </div>

        {/* KPI 2: Active Workforce */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              ACTIVE WORKFORCE
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-slate-900 tracking-tight mt-2">
            {kpis.activeWorkforce}
          </p>
        </div>

        {/* KPI 3: Department Heads */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              DEPARTMENT HEADS
            </span>
            <div className="h-8 w-8 rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
              <Crown className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-purple-700 tracking-tight mt-2">
            {kpis.departmentHeads}
          </p>
        </div>

        {/* KPI 4: Online Members */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              ONLINE MEMBERS
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-emerald-600 tracking-tight mt-2">
            {kpis.onlineMembers}
          </p>
        </div>

        {/* KPI 5: Inactive Members */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              INACTIVE MEMBERS
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center shrink-0">
              <Circle className="h-4 w-4" />
            </div>
          </div>
          <p className="font-apfel text-2xl font-black text-slate-500 tracking-tight mt-2">
            {kpis.inactiveMembers}
          </p>
        </div>
      </div>

      {/* 3. Search & Multi-Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 w-full lg:w-96 shadow-2xs">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employee name, ID, email, designation..."
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-sans"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto font-apfel text-xs">
            {/* User Type */}
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value as UserType | 'ALL')}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All User Types</option>
              <option value="DEPARTMENT_HEAD">Department Head</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="HR">HR Specialist</option>
              <option value="CEO">CEO</option>
              <option value="ADMIN">Admin</option>
            </select>

            {/* Department (Dynamic from Department Service) */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.departmentName}>
                  {d.departmentName}
                </option>
              ))}
            </select>

            {/* Account Status */}
            <select
              value={selectedAccountStatus}
              onChange={(e) => setSelectedAccountStatus(e.target.value as AccountStatus | 'ALL')}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="ALL">All Account Statuses</option>
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        {/* 4. Employee Data Table */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] font-montserrat tracking-wider font-extrabold">
                <th className="pb-3 px-2">EMPLOYEE</th>
                <th className="pb-3 px-2">USER TYPE</th>
                <th className="pb-3 px-2">DEPARTMENT</th>
                <th className="pb-3 px-2">ROLE / DESIGNATION</th>
                <th className="pb-3 px-2">ACCOUNT STATUS</th>
                <th className="pb-3 px-2">PRODUCTIVITY</th>
                <th className="pb-3 px-2">ATTENDANCE</th>
                <th className="pb-3 px-2 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-apfel text-xs">
                    Loading Employee Repository...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-sans text-xs">
                    No employee records match active filters.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Employee Avatar & Name */}
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.fullName}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.fullName)}&background=fef3c7&color=92400e`;
                          }}
                          className="h-8 w-8 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <p className="font-gotham text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                            {emp.fullName}
                          </p>
                          <span className="font-apfel text-[10px] text-slate-400 font-medium">
                            {emp.email} • {emp.employeeId}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* User Type Badge */}
                    <td className="py-3.5 px-2 font-apfel">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getUserTypeBadgeStyle(
                          emp.userType
                        )}`}
                      >
                        {emp.userType.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-2">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[10px] font-apfel">
                        {emp.departmentName}
                      </span>
                    </td>

                    {/* Designation */}
                    <td className="py-3.5 px-2 font-medium text-slate-800">
                      {emp.designation}
                    </td>

                    {/* Account Status */}
                    <td className="py-3.5 px-2 font-apfel">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getAccountStatusBadgeStyle(
                          emp.accountStatus
                        )}`}
                      >
                        {emp.accountStatus}
                      </span>
                    </td>

                    {/* Productivity Score & Status */}
                    <td className="py-3.5 px-2 font-apfel">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-slate-900">{emp.productivityScore}</span>
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                          {emp.productivityStatus}
                        </span>
                      </div>
                    </td>

                    {/* Attendance % Badge */}
                    <td className="py-3.5 px-2 font-apfel">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200 text-[10px]">
                        {emp.attendance}% Attended
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => handleDeleteEmployee(emp.id, emp.fullName)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Employee Record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Employee Onboarding Modal */}
      <CreateEmployeeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEmployeeCreated={loadData}
      />
    </div>
  );
}
