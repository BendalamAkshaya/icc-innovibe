'use client';

import React, { useState } from 'react';
import {
  hrEmployees,
  hrOrgChart,
  Employee,
  OrgNode,
} from './hr-mock-data';
import {
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  ArrowRight,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface EmployeeViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function EmployeeView({ showToast }: EmployeeViewProps) {
  const [employees] = useState<Employee[]>(hrEmployees);
  const [activeTab, setActiveTab] = useState<'DIRECTORY' | 'ORG_CHART'>('DIRECTORY');

  // Directory Layout State
  const [layoutMode, setLayoutMode] = useState<'GRID' | 'LIST'>('GRID');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Selected Employee Profile Slide-over State
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);

  // Filters application
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'ALL' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Org Chart Node Renderer
  const renderOrgNode = (node: OrgNode) => {
    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Card */}
        <div
          onClick={() => {
            const employeeProfile = employees.find((e) => e.id === node.id);
            if (employeeProfile) {
              setSelectedEmp(employeeProfile);
            } else {
              showToast(`Viewing node: ${node.name} (${node.role})`, 'info');
            }
          }}
          className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all text-center cursor-pointer w-44 space-y-1.5 z-10"
        >
          <img
            src={node.avatar}
            alt={node.name}
            className="h-10 w-10 rounded-full object-cover border border-slate-200 mx-auto"
          />
          <div>
            <h5 className="text-[11px] font-black text-slate-800 line-clamp-1">{node.name}</h5>
            <p className="text-[9px] text-slate-400 font-bold leading-normal truncate">{node.role}</p>
          </div>
        </div>

        {/* Children Render */}
        {node.children && node.children.length > 0 && (
          <div className="relative pt-6 flex flex-col items-center">
            {/* Vertical connector line */}
            <div className="absolute top-0 w-px h-6 bg-slate-200" />
            
            {/* Horizontal bridge line connecting children */}
            {node.children.length > 1 && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[80%] h-px bg-slate-200" />
            )}

            <div className="flex gap-8 relative">
              {node.children.map((child, index) => (
                <div key={child.id} className="relative flex flex-col items-center pt-2">
                  {/* Small connection stub for each child */}
                  <div className="absolute top-0 w-px h-2 bg-slate-200" />
                  {renderOrgNode(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Subnav & View toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
          <button
            onClick={() => setActiveTab('DIRECTORY')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'DIRECTORY' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Employee Directory
          </button>
          <button
            onClick={() => setActiveTab('ORG_CHART')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'ORG_CHART' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Organization Chart
          </button>
        </div>

        {activeTab === 'DIRECTORY' && (
          <div className="flex items-center gap-1.5 self-end">
            <button
              onClick={() => setLayoutMode('GRID')}
              className={`p-1.5 rounded-lg border transition-all ${
                layoutMode === 'GRID' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
              title="Grid Layout"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLayoutMode('LIST')}
              className={`p-1.5 rounded-lg border transition-all ${
                layoutMode === 'LIST' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
              title="List Layout"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Directory Tab View */}
      {activeTab === 'DIRECTORY' && (
        <div className="space-y-6">
          
          {/* Filters controls bar */}
          <div className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff names, designations, skills..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-semibold text-slate-900 outline-none transition-all"
              />
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-xs font-bold text-slate-700 outline-none bg-white transition-all"
              >
                <option value="ALL">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
                <option value="Technology">Technology</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-xs font-bold text-slate-700 outline-none bg-white transition-all"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="ON_LEAVE">On Leave</option>
              <option value="PROBATION">Probation</option>
            </select>
          </div>

          {/* Grid Layout Mode */}
          {layoutMode === 'GRID' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmp(emp)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-sm hover:-translate-y-0.5 transition-all text-center space-y-4 cursor-pointer group"
                >
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="h-16 w-16 rounded-full object-cover border border-slate-200 mx-auto"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                      {emp.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">{emp.role}</p>
                    <p className="text-[9px] text-slate-500 font-medium mt-1">{emp.department} • {emp.location}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center pt-2">
                    {emp.skills.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="text-[8px] font-extrabold px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                        {s}
                      </span>
                    ))}
                    {emp.skills.length > 2 && (
                      <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-200">
                        +{emp.skills.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold border-t border-slate-100 pt-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                      emp.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {emp.status}
                    </span>
                    <span className="text-slate-400 font-mono">{emp.joinedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List Layout Mode */}
          {layoutMode === 'LIST' && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] text-slate-500 uppercase tracking-wider font-black">
                    <th className="py-3.5 px-4">Employee</th>
                    <th className="py-3.5 px-4">Department / Role</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Joined Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      onClick={() => setSelectedEmp(emp)}
                      className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={emp.avatar} alt={emp.name} className="h-8 w-8 rounded-full object-cover border border-slate-200" />
                          <div>
                            <p className="font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">{emp.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium font-mono">{emp.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-700">{emp.role}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{emp.department}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-semibold">{emp.location}</td>
                      <td className="py-3 px-4 text-slate-500 font-semibold font-mono">{emp.joinedDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                          emp.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase">Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredEmployees.length === 0 && (
            <div className="py-16 text-center space-y-2 border border-dashed border-slate-200 rounded-3xl">
              <User className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-500">No employees match filters.</p>
            </div>
          )}
        </div>
      )}

      {/* Org Chart Tab View */}
      {activeTab === 'ORG_CHART' && (
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 overflow-x-auto min-h-[500px] flex justify-center">
          <div className="pt-4 pb-12 flex justify-center">
            {renderOrgNode(hrOrgChart)}
          </div>
        </div>
      )}

      {/* ==========================================
          EMPLOYEE DETAILS SLIDE-OVER DRAWER
          ========================================== */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col text-left animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <img
                  src={selectedEmp.avatar}
                  alt={selectedEmp.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                />
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedEmp.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{selectedEmp.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black border uppercase ${
                  selectedEmp.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {selectedEmp.status}
                </span>
                <button
                  onClick={() => setSelectedEmp(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Drawer Body Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Placement & Reporting lines */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Building className="h-4 w-4 text-blue-500" />
                  <span>Deployment Details</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                  <p>Department: <span className="text-slate-900 font-bold">{selectedEmp.department}</span></p>
                  <p>Reporting Manager: <span className="text-slate-950 font-bold">{selectedEmp.reportingManager}</span></p>
                  <p>Job Location: <span className="text-slate-900 font-bold">{selectedEmp.location}</span></p>
                  <p>Employment Type: <span className="text-slate-900 font-bold">{selectedEmp.employmentType}</span></p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Contacts */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="h-4 w-4 text-indigo-500" />
                    <span>Primary Contact</span>
                  </h4>
                  <div className="text-xs space-y-2 text-slate-600 font-semibold">
                    <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-slate-400" /> {selectedEmp.email}</p>
                    <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-400" /> {selectedEmp.phone}</p>
                    <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {selectedEmp.location} Office</p>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                    <Phone className="h-4 w-4 text-rose-500" />
                    <span>Emergency Contact</span>
                  </h4>
                  <div className="text-xs space-y-1.5 text-slate-600 font-semibold">
                    <p>Name: <span className="text-slate-900 font-bold">{selectedEmp.emergencyContact.name}</span></p>
                    <p>Relation: <span className="text-slate-900 font-bold">{selectedEmp.emergencyContact.relation}</span></p>
                    <p>Phone: <span className="text-slate-900 font-bold">{selectedEmp.emergencyContact.phone}</span></p>
                  </div>
                </div>
              </div>

              {/* Skills and Certs */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span>Skills & Qualifications</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEmp.skills.map((skill, index) => (
                    <span key={index} className="text-[10px] font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bank details & salary */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3.5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-emerald-600" />
                  <span>Salary Account & Bank Details</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                  <p>Bank: <span className="text-slate-900 font-bold">{selectedEmp.bankDetails.bankName}</span></p>
                  <p>Account No: <span className="text-slate-900 font-bold font-mono">{selectedEmp.bankDetails.accountNo}</span></p>
                  <p>IFSC Code: <span className="text-slate-950 font-bold font-mono">{selectedEmp.bankDetails.ifsc}</span></p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Employment History Timeline</h4>
                <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-4">
                  {selectedEmp.timeline.map((item, idx) => (
                    <div key={idx} className="relative text-xs">
                      <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                      <p className="font-extrabold text-slate-800">{item.event}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.details}</p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
