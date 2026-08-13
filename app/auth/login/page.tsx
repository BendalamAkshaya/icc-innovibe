'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '../../../components/RoleContext';
import { RoleType } from '../../../lib/types';
import { DEV_CREDENTIALS } from '../../../lib/auth-service';
import { Zap, ShieldCheck, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useRole();
  const [email, setEmail] = useState(DEV_CREDENTIALS.email);
  const [password, setPassword] = useState(DEV_CREDENTIALS.password);
  const [selectedRole, setSelectedRole] = useState<RoleType>('CEO');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const demoAccounts = [
    {
      role: 'CEO' as RoleType,
      label: 'CEO (Super Admin)',
      email: DEV_CREDENTIALS.email,
      pass: DEV_CREDENTIALS.password,
      badge: 'Full Executive Access',
    },
    {
      role: 'COO' as RoleType,
      label: 'COO (Operations)',
      email: 'coo@innovibemobility.com',
      pass: 'coo123',
      badge: 'Operations & Fleet',
    },
    {
      role: 'CTO' as RoleType,
      label: 'CTO (Technology)',
      email: 'cto@innovibemobility.com',
      pass: 'cto123',
      badge: 'AI & Telematics',
    },
    {
      role: 'SERVICE_MANAGER' as RoleType,
      label: 'Service Manager',
      email: 'sm@innovibemobility.com',
      pass: 'sm123',
      badge: 'Ticket Workbench',
    },
    {
      role: 'HR' as RoleType,
      label: 'HR Head',
      email: 'hr@innovibemobility.com',
      pass: 'hr123',
      badge: 'Productivity & Staff',
    },
    {
      role: 'TECHNICIAN' as RoleType,
      label: 'Technician',
      email: 'tech@innovibemobility.com',
      pass: 'tech123',
      badge: 'Diagnostics & Repairs',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      role: 'EMPLOYEE' as RoleType,
      label: 'Employee',
      email: 'employee@innovibemobility.com',
      pass: 'emp123',
      badge: 'Tasks & Timesheets',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    },
  ];

  const handleSelectAccount = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setSelectedRole(acc.role);
    setErrorMsg('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email or username.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success && res.profile) {
        const dest = res.profile.role === 'CEO' ? '/dashboard/ceo' : `/dashboard/${res.profile.role.toLowerCase().replace('_', '-')}`;
        router.push(dest);
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected authentication error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 text-left">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-3xl border border-slate-200 overflow-hidden shadow-2xl bg-white">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6 z-10">
            <div className="flex items-center gap-1.5">
              <img src="/logo.jpeg" alt="InnoVibe Logo" className="h-12 w-auto object-contain drop-shadow-md" />
              <div>
                <h1 className="font-extrabold text-lg tracking-wider text-white">INNOVIBE</h1>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" /> InnoVibe Command Center
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
                India's First Zero Back-Office EV Platform
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log in with your executive credentials to access the InnoVibe Command Center dashboard.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 z-10 space-y-2">
            <p className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Server-Side Edge Middleware Protected
            </p>
            <p className="flex items-center gap-2 text-amber-300 font-semibold">
              <ShieldCheck className="h-4 w-4" /> CEO Role: Super Admin Full Control
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">Office Portal Login</h3>
              <p className="text-xs text-slate-500 mt-1">Enter your credentials or click a pre-set designation profile below.</p>
            </div>

            {/* Quick Dev Selectors */}
            <div className="mb-6 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Designation Selector (1-Click Fill)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectAccount(acc)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${
                      email === acc.email
                        ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500/20'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-800">{acc.label}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{acc.email}</p>
                    </div>
                    {email === acc.email && <CheckCircle2 className="h-4 w-4 text-sky-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleLoginSubmit} className="space-y-4" suppressHydrationWarning>
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-2">
                  <span>⚠️</span> {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">User Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ceo@innovibe.ai"
                    disabled={isSubmitting}
                    required
                    suppressHydrationWarning
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs text-slate-900 font-medium outline-none transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    disabled={isSubmitting}
                    required
                    suppressHydrationWarning
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs text-slate-900 font-medium outline-none transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                suppressHydrationWarning
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-75"
              >

                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-white" />
                    <span>Authenticating Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Log In to {selectedRole} Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Development Credentials: <strong className="text-slate-700 font-semibold">ceo@innovibe.ai</strong> / <strong className="text-slate-700 font-semibold">Innovibe@CEO2026</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

