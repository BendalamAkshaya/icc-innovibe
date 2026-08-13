'use client';

import React from 'react';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { Settings, Shield, Bell, Lock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <RouteGuard module="settings">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-slate-700" />
              COO Profile & Personal Preferences
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Limited COO Settings • Notification Channels • Interface Theme
            </p>
          </div>
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
            Limited Access Scope
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Notification & Alert Preferences</h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="font-semibold text-slate-800">SLA Breach Warning Push Alerts</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="font-semibold text-slate-800">Inventory Low-Stock Threshold Alerts</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="font-semibold text-slate-800">EV Battery Thermal Overheat Emergency Telemetry</span>
            </label>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
