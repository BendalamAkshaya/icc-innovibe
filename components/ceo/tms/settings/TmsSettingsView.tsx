'use client';

import React, { useState } from 'react';
import {
  Settings,
  Lock,
  User,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  Bell,
  Sliders,
  Sparkles,
} from 'lucide-react';

export function TmsSettingsView() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Preference Toggles
  const [biometricSync, setBiometricSync] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [voicePlayback, setVoicePlayback] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      alert('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirmation password do not match.');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    setIsUpdating(true);

    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => setUpdateSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-2xs">
              <Settings className="h-5 w-5" />
            </div>
            <h1 className="font-gotham text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
              Executive Settings & Credentials
            </h1>
            <span className="font-apfel text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
              Founder Portal Control
            </span>
          </div>
          <p className="font-sans text-xs text-slate-500 font-medium">
            Manage executive account profile credentials, security settings, and TMS system preferences.
          </p>
        </div>

        {updateSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-apfel text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Password Updated Successfully!</span>
          </div>
        )}
      </div>

      {/* 2. Founder Profile Header Card */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Sri Hari Kolusu"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=Sri+Hari+Kolusu&background=fef3c7&color=92400e`;
            }}
            className="h-16 w-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-apfel text-xs">
              <h2 className="font-gotham text-lg font-extrabold text-slate-900">Sri Hari Kolusu</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-extrabold text-[10px]">
                Founder & CEO (Admin)
              </span>
            </div>
            <p className="font-sans text-xs text-slate-500">
              Executive Office • <span className="font-semibold text-slate-700">EMP-101</span>
            </p>
            <div className="flex items-center gap-4 text-[11px] font-sans text-slate-500 pt-0.5">
              <span>ceo@innovibe.in</span>
              <span>•</span>
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 font-apfel text-xs font-extrabold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#d97706]" />
          <span>Full Executive Administrator Privileges Active</span>
        </div>
      </div>

      {/* 3. Change Password Form Card */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <KeyRound className="h-5 w-5 text-[#d97706]" />
          <div>
            <h2 className="font-gotham text-base font-extrabold text-slate-900">Change Account Security Password</h2>
            <p className="font-sans text-xs text-slate-500">Update your founder login credentials for portal security</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl text-xs font-sans">
          {/* Current Password */}
          <div>
            <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                New Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="font-montserrat block text-[10px] font-extrabold uppercase text-slate-400 mb-1.5">
                Confirm New Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#78350f] text-white font-apfel font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>{isUpdating ? 'Updating Credentials...' : 'Update Founder Password'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 4. TMS System & Notification Preferences */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-2xs space-y-4 font-sans text-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sliders className="h-5 w-5 text-[#d97706]" />
          <h2 className="font-gotham text-base font-extrabold text-slate-900">TMS Executive Preferences</h2>
        </div>

        <div className="space-y-3 font-apfel">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Automatic Biometric & Attendance Sync</span>
              <p className="font-sans text-xs text-slate-500">Real-time check-in updates from Vijayawada HQ hardware terminals</p>
            </div>
            <input
              type="checkbox"
              checked={biometricSync}
              onChange={(e) => setBiometricSync(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Email Digest & Critical Broadcast Alerts</span>
              <p className="font-sans text-xs text-slate-500">Receive instant email notifications for critical announcements & leave requests</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Voice Note Audio Player Auto-Playback</span>
              <p className="font-sans text-xs text-slate-500">Enable high-definition audio playback for recorded voice memos</p>
            </div>
            <input
              type="checkbox"
              checked={voicePlayback}
              onChange={(e) => setVoicePlayback(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-5 w-5"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
