'use client';

import React, { useState, useEffect } from 'react';
import { GovernanceHero } from './GovernanceHero';
import { CollapsibleCategoryTree } from './CollapsibleCategoryTree';
import { PermissionMatrixView } from './PermissionMatrixView';
import { AiPermissionAdvisor } from './AiPermissionAdvisor';
import { RoleDetailDrawer } from './RoleDetailDrawer';
import { CreateRoleModal } from './CreateRoleModal';
import { ShieldCheck, AlertTriangle, Lock, Key } from 'lucide-react';

export function RoleAccessGovernanceModule() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'TREE' | 'MATRIX'>('TREE');
  const [selectedRoleInspector, setSelectedRoleInspector] = useState<string | null>(null);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  if (!isMounted) {
    return (
      <div className="space-y-6 text-left" suppressHydrationWarning>
        <div className="h-12 w-full bg-slate-900 rounded-2xl animate-pulse" />
        <div className="h-40 w-full bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" suppressHydrationWarning>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>⚡ Governance Action: {notification}</span>
          <button onClick={() => setNotification(null)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {/* 1. Governance Hero & View Mode Switcher */}
      <GovernanceHero
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          triggerNotification(`Switched workspace to: ${tab.toUpperCase()}`);
        }}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setViewMode(mode);
          triggerNotification(`Switched view mode to: ${mode}`);
        }}
        onOpenCreateRole={() => setIsCreateRoleOpen(true)}
      />

      {/* 2. Workspace View Rendering (0 White Space Grid) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {viewMode === 'TREE' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2 flex flex-col">
                <CollapsibleCategoryTree />
              </div>
              <div className="lg:col-span-1 flex flex-col">
                <AiPermissionAdvisor
                  onApplyFix={(roleName) => {
                    triggerNotification(`Auto-applied least-privilege fix for ${roleName}`);
                  }}
                />
              </div>
            </div>
          ) : (
            <PermissionMatrixView
              onSelectRole={(r) => setSelectedRoleInspector(r)}
            />
          )}
        </div>
      )}

      {activeTab === 'tree' && (
        <CollapsibleCategoryTree />
      )}

      {activeTab === 'matrix' && (
        <PermissionMatrixView
          onSelectRole={(r) => setSelectedRoleInspector(r)}
        />
      )}

      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col">
            <PermissionMatrixView
              onSelectRole={(r) => setSelectedRoleInspector(r)}
            />
          </div>
          <div className="lg:col-span-1 flex flex-col">
            <AiPermissionAdvisor
              onApplyFix={(roleName) => triggerNotification(`Auto-applied least-privilege fix for ${roleName}`)}
            />
          </div>
        </div>
      )}

      {activeTab === 'emergency' && (
        <div className="glass-panel p-6 rounded-3xl border border-red-200 bg-red-50/50 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-600 text-white shadow-md">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Emergency Access Override Mode</h2>
              <p className="text-xs text-slate-600 font-medium">Time-bound temporary admin permission escalation with 100% audit trail logging.</p>
            </div>
          </div>
          <button
            onClick={() => triggerNotification('Triggered Emergency Access Escalation Mode (2 Hours Auto-Revoke)')}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-500/20"
          >
            Activate 2-Hour Emergency Admin Override
          </button>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="text-base font-extrabold text-slate-900">SOC2 & Quantum-Safe Compliance Dashboard</h2>
            <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">100% COMPLIANT</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">All identity access logs are cryptographically signed and stored in immutable audit vaults.</p>
        </div>
      )}

      {/* Create Custom Role Modal */}
      <CreateRoleModal
        isOpen={isCreateRoleOpen}
        onClose={() => setIsCreateRoleOpen(false)}
        onCreateRole={(name, cat, scope) => {
          triggerNotification(`Deployed custom governance role "${name}" (${cat}) across ${scope}`);
        }}
      />

      {/* Slide-Over Role Detail Drawer */}
      <RoleDetailDrawer
        roleName={selectedRoleInspector}
        onClose={() => setSelectedRoleInspector(null)}
        onRevokeAccess={(r) => triggerNotification(`Revoked sensitive access from ${r}`)}
      />
    </div>
  );
}
