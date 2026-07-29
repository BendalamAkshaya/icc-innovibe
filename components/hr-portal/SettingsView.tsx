'use client';

import React, { useState } from 'react';
import { useRole } from '../RoleContext';
import {
  User,
  Shield,
  Bell,
  Sliders,
  Globe,
  Clock,
  Info,
  Check,
  Camera,
  Activity,
  Lock,
  RefreshCw,
  Eye,
  EyeOff,
  Terminal,
  Calendar
} from 'lucide-react';

interface SettingsViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export default function SettingsView({ showToast }: SettingsViewProps) {
  const { currentProfile, isSuperAdmin } = useRole();

  // --- Section 1: Profile State ---
  const [profileName, setProfileName] = useState(currentProfile?.name || 'Pooja Reddy');
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [department, setDepartment] = useState('Human Resources');
  const [designation, setDesignation] = useState('Head of Human Resources');
  const [officeLocation, setOfficeLocation] = useState('Bengaluru HQ');
  const [avatarUrl, setAvatarUrl] = useState(currentProfile?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150');

  // --- Section 2: Security State ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // --- Section 3: Notifications State ---
  const [notifs, setNotifs] = useState({
    email: true,
    inApp: true,
    leaveRequests: true,
    recruitment: true,
    payroll: true,
    onboarding: true,
    training: true,
    performance: true,
  });

  // --- Section 4: Appearance State ---
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('IST');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');

  // --- Section 5: HR Preferences State ---
  const [workingHours, setWorkingHours] = useState('09:00 AM - 06:00 PM');
  const [workingDays, setWorkingDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [holidayView, setHolidayView] = useState('List');
  const [employeeListView, setEmployeeListView] = useState('Grid');
  const [refreshFrequency, setRefreshFrequency] = useState('Real-time');

  // --- Section 6: Right Sidebar Activity ---
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Notification preferences updated', time: 'Just now' },
    { id: 2, action: 'Profile updated', time: '2 hours ago' },
    { id: 3, action: 'Password changed', time: '3 days ago' },
  ]);

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('HR Profile updated successfully.', 'success');
    setRecentActivities(prev => [
      { id: Date.now(), action: 'Profile updated', time: 'Just now' },
      ...prev.slice(0, 3)
    ]);
  };

  const handleCancelProfile = () => {
    setProfileName(currentProfile?.name || 'Pooja Reddy');
    setMobileNumber('+91 98765 43210');
    setDepartment('Human Resources');
    setDesignation('Head of Human Resources');
    setOfficeLocation('Bengaluru HQ');
    showToast('Profile modifications canceled.', 'info');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill all password fields.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match confirmation.', 'error');
      return;
    }
    showToast('Account password updated securely.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setRecentActivities(prev => [
      { id: Date.now(), action: 'Password changed', time: 'Just now' },
      ...prev.slice(0, 3)
    ]);
  };

  const handleSaveNotifications = () => {
    showToast('Notification preferences saved successfully.', 'success');
    setRecentActivities(prev => [
      { id: Date.now(), action: 'Notification preferences updated', time: 'Just now' },
      ...prev.slice(0, 3)
    ]);
  };

  const handleSavePreferences = () => {
    showToast(`Preferences updated: Theme: ${theme}, TZ: ${timezone}`, 'success');
  };

  const handleSaveHrPreferences = () => {
    showToast('HR administrative preferences updated.', 'success');
  };

  const toggleDay = (day: string) => {
    setWorkingDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Breadcrumbs & Inner Page Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <span>HR Dashboard</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Settings</span>
          </p>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Settings</h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage your HR account, preferences, notifications, and security.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-center px-3.5 py-1.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          HR Portal Session Secure
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ==========================================
              SECTION 1: MY PROFILE
              ========================================== */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="h-4.5 w-4.5 text-blue-600" />
              <span>My Profile</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Profile Image Row */}
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => showToast('Simulating profile picture upload...', 'info')}>
                  <img
                    src={avatarUrl}
                    alt={profileName}
                    className="h-16 w-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Profile Picture</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Recommended size: Square (JPG, PNG)</p>
                  <button
                    type="button"
                    onClick={() => showToast('Simulating profile image refresh...', 'info')}
                    className="text-[10px] font-black text-blue-650 hover:text-blue-700 uppercase mt-1 flex items-center gap-1"
                  >
                    Change Picture
                  </button>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Employee ID (Read Only)</label>
                  <input
                    type="text"
                    value="EMP-2026-HR01"
                    readOnly
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-150 outline-none text-xs font-semibold text-slate-400 bg-slate-50 cursor-not-allowed font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Official Email (Read Only)</label>
                  <input
                    type="text"
                    value={currentProfile?.email || 'hr@innovibemobility.com'}
                    readOnly
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-150 outline-none text-xs font-semibold text-slate-400 bg-slate-50 cursor-not-allowed font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Mobile Number</label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Office Location</label>
                  <input
                    type="text"
                    value={officeLocation}
                    onChange={(e) => setOfficeLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition-all uppercase"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelProfile}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 bg-slate-50 text-slate-700 text-xs font-extrabold transition-all uppercase"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* ==========================================
              SECTION 2: SECURITY & PASSWORDS
              ========================================== */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Shield className="h-4.5 w-4.5 text-indigo-600" />
              <span>Security & Access Controls</span>
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 relative">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 flex-wrap gap-4">
                {/* 2FA Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="twoFactorToggle"
                    checked={twoFactorAuth}
                    onChange={(e) => {
                      setTwoFactorAuth(e.target.checked);
                      showToast(`Two-Factor Authentication state: ${e.target.checked ? 'ENABLED' : 'DISABLED'}`, 'info');
                    }}
                    className="h-4.5 w-4.5 text-blue-600 rounded-lg border-slate-200 focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="twoFactorToggle" className="block text-xs font-bold text-slate-800 cursor-pointer">
                      Two-Factor Authentication (2FA)
                    </label>
                    <p className="text-[9px] text-slate-400 font-semibold">Verify identity via OTP for critical actions.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-extrabold shadow-xs transition-all uppercase"
                >
                  Update Password
                </button>
              </div>
            </form>

            {/* Active Session info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 mt-4">
              <Shield className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-left grow">
                <p className="font-extrabold text-slate-800">Current Login Session</p>
                <div className="text-[10px] text-slate-500 font-semibold space-y-0.5">
                  <p>Chrome on Windows 11 • Delhi, India (Current Session)</p>
                  <p className="font-mono text-[9px] text-slate-400">Last Login: Today at 09:15 AM • IP: 192.168.1.45</p>
                </div>
              </div>
              <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-250 text-emerald-800">
                SECURE IP
              </span>
            </div>
          </div>

          {/* ==========================================
              SECTION 3: NOTIFICATION PREFERENCES
              ========================================== */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Bell className="h-4.5 w-4.5 text-amber-600" />
              <span>Notification Preferences</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">Email Notifications</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Receive emails for administrative alerts.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.email}
                  onChange={(e) => setNotifs(prev => ({ ...prev, email: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">In-App Notifications</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Show alerts inside the ICC top bar.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.inApp}
                  onChange={(e) => setNotifs(prev => ({ ...prev, inApp: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">Leave Request Alerts</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Notify immediately when staff requests leave.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.leaveRequests}
                  onChange={(e) => setNotifs(prev => ({ ...prev, leaveRequests: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">Recruitment Alerts</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Notify on new job applications.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.recruitment}
                  onChange={(e) => setNotifs(prev => ({ ...prev, recruitment: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">Payroll Notifications</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Send alerts for ledger and payslip cycles.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.payroll}
                  onChange={(e) => setNotifs(prev => ({ ...prev, payroll: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">Employee Onboarding Alerts</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Notify on checklist completion.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.onboarding}
                  onChange={(e) => setNotifs(prev => ({ ...prev, onboarding: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">Training Reminders</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Alert before mandatory certification deadlines.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.training}
                  onChange={(e) => setNotifs(prev => ({ ...prev, training: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 bg-slate-50/50">
                <div>
                  <p className="text-xs font-bold text-slate-800">Performance Reviews</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Notify on appraisal review cycles.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifs.performance}
                  onChange={(e) => setNotifs(prev => ({ ...prev, performance: e.target.checked }))}
                  className="h-4.5 w-4.5 text-blue-600 rounded-lg focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveNotifications}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition-all uppercase"
              >
                Save Notification Preferences
              </button>
            </div>
          </div>

          {/* ==========================================
              SECTION 4: APPEARANCE & LOCALIZATION
              ========================================== */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="h-4.5 w-4.5 text-emerald-600" />
              <span>Appearance & Preferences</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Theme Selector */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Portal Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTheme('light');
                      showToast('Light theme remains selected.', 'info');
                    }}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                      theme === 'light'
                        ? 'border-blue-500 bg-blue-50/55 font-bold text-slate-900'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-350'
                    }`}
                  >
                    <div>
                      <p className="text-xs">Light Theme</p>
                      <p className="text-[9px] font-medium text-slate-400">Optimal contrast and clarity</p>
                    </div>
                    {theme === 'light' && <Check className="h-4 w-4 text-blue-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTheme('dark');
                      showToast('Dark Mode theme is optional and mock enabled.', 'info');
                    }}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-50/55 font-bold text-slate-900'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-350'
                    }`}
                  >
                    <div>
                      <p className="text-xs">Dark Theme (Optional)</p>
                      <p className="text-[9px] font-medium text-slate-400">Reduce late-night eye strain</p>
                    </div>
                    {theme === 'dark' && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">System Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Spanish">Spanish (Español)</option>
                </select>
              </div>

              {/* Time Zone Selection */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Time Zone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all font-mono"
                >
                  <option value="IST">IST (UTC+5:30) - Kolkata</option>
                  <option value="GMT">GMT (UTC+0:00) - London</option>
                  <option value="EST">EST (UTC-5:00) - New York</option>
                </select>
              </div>

              {/* Date Format */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Date Format</label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all font-mono"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 24/07/2026)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 07/24/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-07-24)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition-all uppercase"
              >
                Save Preferences
              </button>
            </div>
          </div>

          {/* ==========================================
              SECTION 5: HR ADMINISTRATIVE PREFERENCES
              ========================================== */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="h-4.5 w-4.5 text-violet-600" />
              <span>HR Preferences</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Working Hours */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Default Working Hours</label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all font-mono"
                />
              </div>

              {/* Holiday Calendar View */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Holiday Calendar View</label>
                <select
                  value={holidayView}
                  onChange={(e) => setHolidayView(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                >
                  <option value="List">Roster List View</option>
                  <option value="Grid">Monthly Calendar Grid</option>
                </select>
              </div>

              {/* Working Days Select */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Office Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                    const isSelected = workingDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-3xs'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Employee View preferences */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Employee List Default Layout</label>
                <select
                  value={employeeListView}
                  onChange={(e) => setEmployeeListView(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                >
                  <option value="Grid">Visual Cards Grid</option>
                  <option value="Table">Compact Ledger Table</option>
                </select>
              </div>

              {/* Refresh frequency */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Dashboard Auto-Refresh</label>
                <select
                  value={refreshFrequency}
                  onChange={(e) => setRefreshFrequency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold text-slate-850 bg-white focus:border-blue-500 transition-all"
                >
                  <option value="Real-time">Real-time WebSocket</option>
                  <option value="Every 5 mins">Every 5 minutes</option>
                  <option value="Hourly">Hourly sync</option>
                  <option value="Manual">Manual refresh only</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveHrPreferences}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs transition-all uppercase"
              >
                Save HR Preferences
              </button>
            </div>
          </div>

        </div>

        {/* Right Sidebar Status & Info */}
        <div className="space-y-6">
          
          {/* Recent Activity Log */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Activity className="h-4 w-4 text-blue-600" />
              <span>Recent Activity</span>
            </h3>

            <div className="space-y-3">
              {recentActivities.map(act => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs text-left">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800 leading-tight">{act.action}</p>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status Panel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <RefreshCw className="h-4 w-4 text-emerald-600 animate-spin-slow" />
              <span>System Status</span>
            </h3>

            <div className="space-y-3.5 text-left text-xs font-semibold text-slate-650">
              <div className="flex items-center justify-between">
                <span>HR Portal Status</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-250 text-emerald-800 text-[9px] font-black uppercase">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Account Status</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-250 text-blue-800 text-[9px] font-black uppercase">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last System Backup</span>
                <span className="font-mono text-[10px] text-slate-500">Today, 06:00 AM</span>
              </div>
            </div>
          </div>

          {/* ==========================================
              SECTION 6: ABOUT HR PORTAL
              ========================================== */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Info className="h-4 w-4 text-slate-500" />
              <span>About HR Portal</span>
            </h3>

            <div className="space-y-3 text-left text-xs">
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold text-slate-650">
                <p>Portal Name: <strong className="text-slate-800 font-sans">HR Portal</strong></p>
                <p>Version: <strong className="text-slate-800 font-mono">v1.0.4-LTS</strong></p>
                <p>Company: <strong className="text-slate-800 font-sans">InnoVibe Mobility</strong></p>
                <p>HR Role: <strong className="text-slate-800 font-sans">Head of Human Resources</strong></p>
              </div>

              <div className="flex flex-col gap-1.5 pt-2 text-[10px] font-bold text-blue-650 uppercase">
                <button
                  onClick={() => showToast('Opening Privacy Policy handbook...', 'info')}
                  className="hover:text-blue-800 text-left"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => showToast('Opening Terms & Conditions agreement...', 'info')}
                  className="hover:text-blue-800 text-left"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => showToast('Redirecting to IT Support ticketing portal...', 'info')}
                  className="hover:text-blue-805 text-left border-t border-slate-100 pt-2 flex items-center gap-1.5 text-slate-500 hover:text-slate-700"
                >
                  <Terminal className="h-3.5 w-3.5 text-slate-400" />
                  <span>Contact IT Support</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
