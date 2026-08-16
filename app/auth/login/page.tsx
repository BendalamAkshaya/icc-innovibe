'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '../../../components/RoleContext';
import { RoleType } from '../../../lib/types';
import { DEV_CREDENTIALS } from '../../../lib/auth-service';
import { 
  Zap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Globe, 
  Eye, 
  EyeOff, 
  ChevronRight,
  Crown,
  Activity,
  Code,
  Settings,
  Users,
  Wrench,
  User
} from 'lucide-react';

interface PortalConfig {
  role: RoleType;
  title: string;
  subtitle: string;
  email: string;
  pass: string;
  icon: React.ElementType;
  iconBgClass: string;
  gridSpan?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useRole();
  const [email, setEmail] = useState(DEV_CREDENTIALS.email);
  const [password, setPassword] = useState(DEV_CREDENTIALS.password);
  const [selectedRole, setSelectedRole] = useState<RoleType>('CEO');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const portals: PortalConfig[] = [
    {
      role: 'CEO',
      title: 'CEO Portal',
      subtitle: 'Super Admin Access',
      email: DEV_CREDENTIALS.email,
      pass: DEV_CREDENTIALS.password,
      icon: Crown,
      iconBgClass: 'bg-purple-100 text-purple-600',
    },
    {
      role: 'COO',
      title: 'COO Portal',
      subtitle: 'Operations Management',
      email: 'coo@innovibemobility.com',
      pass: 'coo123',
      icon: Activity,
      iconBgClass: 'bg-sky-100 text-sky-600',
    },
    {
      role: 'CTO',
      title: 'CTO Portal',
      subtitle: 'Technology & Systems',
      email: 'cto@innovibemobility.com',
      pass: 'cto123',
      icon: Code,
      iconBgClass: 'bg-emerald-100 text-emerald-600',
    },
    {
      role: 'SERVICE_MANAGER',
      title: 'Service Manager Portal',
      subtitle: 'Service Operations',
      email: 'sm@innovibemobility.com',
      pass: 'sm123',
      icon: Settings,
      iconBgClass: 'bg-amber-100 text-amber-600',
    },
    {
      role: 'HR',
      title: 'HR Portal',
      subtitle: 'People & Culture',
      email: 'hr@innovibemobility.com',
      pass: 'hr123',
      icon: Users,
      iconBgClass: 'bg-indigo-100 text-indigo-600',
    },
    {
      role: 'TECHNICIAN',
      title: 'Technician Portal',
      subtitle: 'Field Operations',
      email: 'tech@innovibemobility.com',
      pass: 'tech123',
      icon: Wrench,
      iconBgClass: 'bg-rose-100 text-rose-600',
    },
    {
      role: 'EMPLOYEE',
      title: 'Employee Portal',
      subtitle: 'Team Member Access',
      email: 'employee@innovibemobility.com',
      pass: 'emp123',
      icon: User,
      iconBgClass: 'bg-blue-100 text-blue-600',
    },
  ];

  const currentPortal = portals.find((p) => p.role === selectedRole) || portals[0];

  const handleSelectRole = (portal: PortalConfig) => {
    setSelectedRole(portal.role);
    setEmail(portal.email);
    setPassword(portal.pass);
    setErrorMsg('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
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
        const dest = res.profile.role === 'CEO' 
          ? '/dashboard/ceo' 
          : `/dashboard/${res.profile.role.toLowerCase().replace('_', '-')}`;
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
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-2 sm:p-4 lg:p-5 font-sans overflow-x-hidden selection:bg-[#6D35F5] selection:text-white">
      
      {/* Blurred Wallpaper Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/bg_pattern.jpg" 
          alt="Sparkling Geometry Background" 
          className="w-full h-full object-cover blur-[6px] scale-105 opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-purple-50/20 to-sky-50/30 backdrop-blur-[2px]" />
      </div>

      {/* Subtle Atmospheric Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/40 via-indigo-100/20 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-sky-200/40 via-blue-100/20 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Single Large Rounded Application Container */}
      <div className="w-full max-w-[1120px] bg-white/95 backdrop-blur-2xl rounded-[22px] sm:rounded-[28px] border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(16,26,54,0.12)] p-4 sm:p-6 lg:p-7 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch my-auto">
        
        {/* ================= LEFT SIDE: MARKETING / EV VISUAL ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between relative pt-1 pb-1">
          
          {/* Top Brand Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.jpeg" alt="INNOVIBE" className="h-8 sm:h-9 w-auto object-contain" />
              <div className="leading-tight">
                <h1 className="font-extrabold text-sm sm:text-base tracking-wider text-[#101A36]">INNOVIBE</h1>
                <p className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-400 uppercase">MOBILITY INDIA PVT LTD</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6D35F5]" />
                <span className="tracking-wider text-[9px] sm:text-[10px] font-bold uppercase">INNOVIBE COMMAND CENTER</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101A36] tracking-tight leading-[1.12]">
                India’s First<br />
                Zero Back-Office<br />
                <span className="bg-gradient-to-r from-[#6D35F5] via-[#8B4DFF] to-[#35BDF6] bg-clip-text text-transparent">EV Platform</span>
                <span className="text-[#35BDF6] ml-1.5 inline-block">⚡</span>
              </h2>

              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                AI-powered. Data-driven. Future-ready.<br />
                Command your operations. Accelerate<br />
                India’s electric mobility revolution.
              </p>
            </div>
          </div>

          {/* Center EV Scooter Visual with Circular Platform */}
          <div className="relative my-2 py-1 flex items-center justify-center">
            {/* Atmospheric Arc & Glow Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[230px] h-[230px] rounded-full border border-purple-200/40 bg-gradient-to-b from-purple-100/20 via-sky-50/10 to-transparent blur-md" />
              <div className="absolute w-[170px] h-[170px] rounded-full border border-sky-200/30" />
            </div>

            {/* Scooter Asset */}
            <img 
              src="/scooter_hero_platform.png" 
              alt="InnoVibe EV Scooter Platform" 
              className="w-full max-w-[270px] sm:max-w-[310px] h-auto object-contain relative z-10 transition-transform duration-500 hover:scale-[1.02] drop-shadow-xl" 
            />
          </div>

          {/* Bottom Left Feature Strip (3 Column Pill) */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/80 p-2.5 shadow-xs grid grid-cols-3 gap-1.5 divide-x divide-slate-100">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-1.5 pr-1">
              <div className="p-1 rounded-md bg-purple-50 text-[#6D35F5] shrink-0 mt-0.5">
                <ShieldCheck className="w-3 h-3" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-[#101A36] leading-tight">Enterprise Grade<br />Security</h4>
                <p className="text-[8px] text-slate-400 font-medium mt-0.5 leading-tight">ISO 27001 • SOC 2<br />GDPR Compliant</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-1.5 pl-1.5 pr-1">
              <div className="p-1 rounded-md bg-purple-50 text-[#6D35F5] shrink-0 mt-0.5">
                <Zap className="w-3 h-3" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-[#101A36] leading-tight">Real-time<br />Intelligence</h4>
                <p className="text-[8px] text-slate-400 font-medium mt-0.5 leading-tight">Live insights for<br />smarter decisions</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-1.5 pl-1.5">
              <div className="p-1 rounded-md bg-blue-50 text-[#35BDF6] shrink-0 mt-0.5">
                <Globe className="w-3 h-3" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-[#101A36] leading-tight">Scalable<br />& Secure</h4>
                <p className="text-[8px] text-slate-400 font-medium mt-0.5 leading-tight">Built for tomorrow.<br />Ready for scale.</p>
              </div>
            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE: AUTHENTICATION CARD ================= */}
        <div className="lg:col-span-7 bg-white rounded-[18px] sm:rounded-[22px] border border-slate-100 shadow-[0_10px_30px_-8px_rgba(109,53,245,0.07)] p-4 sm:p-6 flex flex-col justify-between relative">
          
          {/* Top Right Security Badge */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-[#6D35F5]" />
            <div className="text-left">
              <p className="text-[9px] font-bold text-[#101A36] leading-tight">Secure Access</p>
              <p className="text-[8px] text-slate-400 font-medium leading-tight">256-bit Encryption</p>
            </div>
          </div>

          <div>
            {/* Header Title Section */}
            <div className="mb-3">
              <p className="text-[9px] font-bold text-[#6D35F5] uppercase tracking-[0.2em]">WELCOME BACK</p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#101A36] tracking-tight mt-0.5">
                Command Center <span className="bg-gradient-to-r from-[#6D35F5] via-[#8B4DFF] to-[#35BDF6] bg-clip-text text-transparent">Login</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Select your portal and sign in to continue</p>
            </div>

            {/* Portal Selection Label */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-3 h-[2px] bg-[#6D35F5] rounded-full" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.16em]">SELECT YOUR PORTAL</span>
            </div>

            {/* 7 Portal Cards arranged in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {portals.map((portal) => {
                const isSelected = selectedRole === portal.role;
                const Icon = portal.icon;
                return (
                  <button
                    key={portal.role}
                    type="button"
                    onClick={() => handleSelectRole(portal)}
                    className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all duration-200 flex items-center justify-between relative cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#6D35F5] bg-purple-50/20 ring-2 ring-[#6D35F5]/10 shadow-2xs'
                        : 'border-slate-200/80 bg-white hover:border-purple-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? 'bg-[#6D35F5] text-white shadow-xs shadow-[#6D35F5]/30' 
                          : portal.iconBgClass
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-[11px] sm:text-xs font-bold text-[#101A36] leading-tight">{portal.title}</h4>
                        <p className="text-[9px] text-slate-500 font-medium leading-tight">{portal.subtitle}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#6D35F5] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Form Inputs (Email & Password) */}
            <form onSubmit={handleLoginSubmit} className="space-y-3" suppressHydrationWarning>
              
              {errorMsg && (
                <div className="p-2 rounded-lg bg-red-50 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-2">
                  <span>⚠️</span> {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                {/* Email Input */}
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ceo@innovibe.ai"
                      disabled={isSubmitting}
                      required
                      suppressHydrationWarning
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-xs font-semibold text-[#101A36] focus:bg-white focus:border-[#6D35F5] focus:ring-2 focus:ring-[#6D35F5]/20 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      disabled={isSubmitting}
                      required
                      suppressHydrationWarning
                      className="w-full pl-9 pr-9 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-xs font-semibold text-[#101A36] focus:bg-white focus:border-[#6D35F5] focus:ring-2 focus:ring-[#6D35F5]/20 outline-none transition-all disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Checkbox and Forgot Password */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#6D35F5] focus:ring-[#6D35F5] accent-[#6D35F5]"
                  />
                  <span className="text-slate-600 font-medium text-[11px]">Remember this device</span>
                </label>

                <button
                  type="button"
                  className="text-[#6D35F5] hover:text-[#5B29E0] font-semibold text-[11px] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Prominent Primary CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                suppressHydrationWarning
                className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-[#6D35F5] via-[#7F40FF] to-[#3D8DFF] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#6D35F5]/25 flex items-center justify-between transition-all duration-200 hover:shadow-lg hover:shadow-[#6D35F5]/30 active:scale-[0.99] disabled:opacity-75 cursor-pointer mt-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 mx-auto">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Authenticating Credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>Access {currentPortal.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Development Credentials Container */}
          <div 
            onClick={() => {
              setEmail(currentPortal.email);
              setPassword(currentPortal.pass);
            }}
            className="mt-2.5 p-2 sm:p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/70 hover:bg-slate-100/80 cursor-pointer transition-all flex items-center justify-between text-[11px]"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <p className="text-[10px] text-slate-500 font-medium">
                Development Credentials: <span className="font-bold text-slate-800">{currentPortal.email}</span> / <span className="font-bold text-slate-800">{currentPortal.pass}</span>
              </p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>

          {/* Bottom Copyright Footer */}
          <div className="mt-2.5 text-center border-t border-slate-100 pt-2">
            <p className="text-[9px] text-slate-400 font-medium">
              © 2025 Innovibe Mobility India Pvt Ltd. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}


