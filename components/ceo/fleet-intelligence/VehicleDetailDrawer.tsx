'use client';

import React from 'react';
import { Vehicle } from '../../../lib/types';
import { X, BatteryCharging, Zap, MapPin, Cpu, ShieldCheck, User, Wrench, Clock, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

interface VehicleDetailDrawerProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleDetailDrawer({ vehicle, isOpen, onClose }: VehicleDetailDrawerProps) {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 text-left">
        {/* Drawer Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                IoT Telemetry Stream
              </span>
              <span className="text-[10px] font-mono text-slate-400">{vehicle.registrationNumber}</span>
            </div>
            <h2 className="text-xl font-black mt-1 text-white">{vehicle.model}</h2>
            <p className="text-xs text-slate-400 font-mono">VIN: {vehicle.vin}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Quick Health Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                {vehicle.healthScore.overall}
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-slate-900">Overall Vehicle Health</h3>
                <p className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="h-3 w-3" /> Status: {vehicle.healthScore.status}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              Ping: Just now
            </span>
          </div>

          {/* Battery & BMS Diagnostics */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BatteryCharging className="h-4 w-4 text-emerald-600" /> Battery & BMS Cell Telemetry
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">State of Health (SOH)</span>
                <p className="text-lg font-black text-slate-900 mt-1">{vehicle.healthScore.batteryHealth}%</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${vehicle.healthScore.batteryHealth}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Controller Temp</span>
                <p className="text-lg font-black text-amber-600 mt-1">{vehicle.healthScore.controllerTemp}°C</p>
                <span className="text-[10px] text-emerald-600 font-bold">Optimal Operating Zone</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Motor Efficiency</span>
                <p className="text-lg font-black text-sky-600 mt-1">{vehicle.healthScore.motorEfficiency}%</p>
                <span className="text-[10px] text-slate-500 font-medium">PMSM Stator Normal</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Brake Wear</span>
                <p className="text-lg font-black text-slate-900 mt-1">{vehicle.healthScore.brakeWear}% Rem.</p>
                <span className="text-[10px] text-slate-500 font-medium">Regen Brake Active</span>
              </div>
            </div>
          </div>

          {/* Driver & Trip Info */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <User className="h-4 w-4 text-sky-600" /> Assigned Driver & Active Trip
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Owner / Driver:</span>
                <span className="font-black text-slate-900">{vehicle.ownerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Mobile Contact:</span>
                <span className="font-mono font-bold text-sky-700">{vehicle.ownerMobile}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Current Hub:</span>
                <span className="font-bold text-slate-800">Kakinada Main Hub</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">GPS Coordinates:</span>
                <span className="font-mono text-[11px] text-slate-600">16.9891° N, 82.2475° E</span>
              </div>
            </div>
          </div>

          {/* Firmware & Maintenance Schedule */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Wrench className="h-4 w-4 text-indigo-600" /> Firmware & Service Schedule
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Last Service Date:</span>
                <span className="font-bold text-slate-900">{vehicle.lastServiceDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Next Service Due:</span>
                <span className="font-bold text-emerald-600">{vehicle.nextServiceDue}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-slate-500">MCU Firmware:</span>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono font-bold text-[10px]">v4.2.0 (OTA Ready)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => alert(`Triggered Remote Diagnostics Check for ${vehicle.registrationNumber}`)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5"
          >
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>Run Remote Diag</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
