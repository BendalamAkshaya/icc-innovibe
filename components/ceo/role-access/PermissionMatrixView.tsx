'use client';

import React from 'react';
import { Grid, ShieldCheck, Check, X, Eye, Edit3 } from 'lucide-react';

interface PermissionMatrixViewProps {
  onSelectRole: (roleName: string) => void;
}

export function PermissionMatrixView({ onSelectRole }: PermissionMatrixViewProps) {
  const roles = ['CEO (Super Admin)', 'COO Office', 'CTO Tech Lead', 'HR Director', 'Service Manager'];

  const matrixRows = [
    { module: 'Executive Overview & Command Center', ceo: 'ADMIN', coo: 'READ_WRITE', cto: 'READ_WRITE', hr: 'READ_ONLY', sm: 'RESTRICTED' },
    { module: 'Business Performance & P&L Margins', ceo: 'ADMIN', coo: 'READ_WRITE', cto: 'READ_ONLY', hr: 'RESTRICTED', sm: 'RESTRICTED' },
    { module: 'Fleet Intelligence & Telemetry Control', ceo: 'ADMIN', coo: 'READ_WRITE', cto: 'ADMIN', hr: 'RESTRICTED', sm: 'READ_ONLY' },
    { module: 'Operations & Service Hub Dispatcher', ceo: 'ADMIN', coo: 'ADMIN', cto: 'READ_ONLY', hr: 'RESTRICTED', sm: 'READ_WRITE' },
    { module: 'AI Command Center & Agent Pipeline', ceo: 'ADMIN', coo: 'READ_ONLY', cto: 'ADMIN', hr: 'RESTRICTED', sm: 'RESTRICTED' },
    { module: 'Action Center & Executive Inbox', ceo: 'ADMIN', coo: 'READ_WRITE', cto: 'READ_WRITE', hr: 'READ_ONLY', sm: 'RESTRICTED' },
    { module: 'Role & Access Control (RBAC Manager)', ceo: 'ADMIN', coo: 'RESTRICTED', cto: 'RESTRICTED', hr: 'RESTRICTED', sm: 'RESTRICTED' },
  ];

  const getBadge = (level: string) => {
    switch (level) {
      case 'ADMIN':
        return <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-[10px]">✓ Full Admin</span>;
      case 'READ_WRITE':
        return <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900 border border-sky-300 font-extrabold text-[10px]">Read / Write</span>;
      case 'READ_ONLY':
        return <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-300 font-extrabold text-[10px]">Read Only</span>;
      default:
        return <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 font-extrabold text-[10px]">✕ Restricted</span>;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left h-full flex flex-col justify-between" suppressHydrationWarning>
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Grid className="h-5 w-5 text-sky-600" />
              <h2 className="text-base font-extrabold text-slate-900">Organization-Wide Permission Matrix View</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Comprehensive role vs module permission mapping inspired by Microsoft Entra ID & Azure AD.
            </p>
          </div>
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
            5 Core Roles Mapped
          </span>
        </div>

        <div className="overflow-x-auto my-3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-black text-slate-500">
                <th className="p-3">Platform Module</th>
                {roles.map((r) => (
                  <th key={r} className="p-3 text-center cursor-pointer hover:text-slate-900" onClick={() => onSelectRole(r)}>
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs font-bold text-slate-800">
              {matrixRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-all">
                  <td className="p-3 font-extrabold text-slate-900">{row.module}</td>
                  <td className="p-3 text-center">{getBadge(row.ceo)}</td>
                  <td className="p-3 text-center">{getBadge(row.coo)}</td>
                  <td className="p-3 text-center">{getBadge(row.cto)}</td>
                  <td className="p-3 text-center">{getBadge(row.hr)}</td>
                  <td className="p-3 text-center">{getBadge(row.sm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
