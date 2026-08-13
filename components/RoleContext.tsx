'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RoleType, UserRoleProfile, RolePermissionConfig } from '../lib/types';
import { initialProfiles, defaultRoleConfigs } from '../lib/mock-data';
import { AuthService } from '../lib/auth-service';

interface RoleContextType {
  activeRole: RoleType;
  setActiveRole: (role: RoleType) => void;
  currentProfile: UserRoleProfile;
  roleConfigs: RolePermissionConfig[];
  updateRoleConfig: (role: RoleType, newFeatures: string[]) => void;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; profile?: UserRoleProfile; error?: string }>;
  loginWithRole: (role: RoleType) => void;
  logout: () => void;
  isSuperAdmin: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

function getInitialRole(): RoleType {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.includes('/dashboard/hr')) return 'HR';
    if (path.includes('/dashboard/cto')) return 'CTO';
    if (path.includes('/dashboard/coo')) return 'COO';
    if (path.includes('/dashboard/service-manager')) return 'SERVICE_MANAGER';
    if (path.includes('/dashboard/technician')) return 'TECHNICIAN';
    if (path.includes('/dashboard/ceo')) return 'CEO';

    const storedRole = localStorage.getItem('icc_role') as RoleType;
    if (storedRole && initialProfiles[storedRole]) return storedRole;
  }
  return 'CEO';
}

function getInitialProfile(role: RoleType): UserRoleProfile {
  if (typeof window !== 'undefined') {
    const rawProfile = localStorage.getItem('icc_profile');
    if (rawProfile) {
      try {
        const parsed = JSON.parse(rawProfile);
        if (parsed && parsed.name) return parsed;
      } catch (e) {}
    }
  }
  return initialProfiles[role] || initialProfiles.CEO;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<RoleType>(getInitialRole);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [profiles, setProfiles] = useState(initialProfiles);
  const [roleConfigs, setRoleConfigs] = useState(defaultRoleConfigs);
  const [currentProfileState, setCurrentProfileState] = useState<UserRoleProfile>(() => {
    const role = getInitialRole();
    return getInitialProfile(role);
  });

  // Restore Session on Client Mount
  useEffect(() => {
    const session = AuthService.getSession();
    setIsAuthenticated(session.isAuthenticated);

    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      let detectedRole: RoleType | null = null;
      if (path.includes('/dashboard/hr')) detectedRole = 'HR';
      else if (path.includes('/dashboard/cto')) detectedRole = 'CTO';
      else if (path.includes('/dashboard/coo')) detectedRole = 'COO';
      else if (path.includes('/dashboard/service-manager')) detectedRole = 'SERVICE_MANAGER';
      else if (path.includes('/dashboard/technician')) detectedRole = 'TECHNICIAN';
      else if (path.includes('/dashboard/ceo')) detectedRole = 'CEO';

      const finalRole = detectedRole || session.activeRole || activeRole || 'CEO';
      setActiveRoleState(finalRole);
      if (session.user) {
        setCurrentProfileState(session.user);
      } else {
        setCurrentProfileState(initialProfiles[finalRole] || initialProfiles.CEO);
      }
    }
  }, []);

  const setActiveRole = (role: RoleType) => {
    setActiveRoleState(role);
    setCurrentProfileState(initialProfiles[role] || initialProfiles.CEO);
    if (typeof window !== 'undefined') {
      localStorage.setItem('icc_role', role);
      localStorage.setItem('icc_profile', JSON.stringify(initialProfiles[role] || initialProfiles.CEO));
    }
  };

  const login = async (email: string, pass: string) => {
    const result = await AuthService.login(email, pass);
    if (result.success && result.profile) {
      setIsAuthenticated(true);
      setActiveRoleState(result.profile.role);
      setCurrentProfileState(result.profile);
    }
    return result;
  };

  const loginWithRole = (role: RoleType) => {
    const profile = initialProfiles[role] || initialProfiles.CEO;
    setActiveRoleState(role);
    setCurrentProfileState(profile);
    setIsAuthenticated(true);
    AuthService.login(profile.email, 'dev_bypass_login');
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setActiveRoleState('CEO');
    setCurrentProfileState(initialProfiles.CEO);
  };

  const updateRoleConfig = (role: RoleType, newFeatures: string[]) => {
    setRoleConfigs((prev) =>
      prev.map((item) => (item.role === role ? { ...item, accessibleFeatures: newFeatures } : item))
    );
  };

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        setActiveRole,
        currentProfile: currentProfileState,
        roleConfigs,
        updateRoleConfig,
        isAuthenticated,
        login,
        loginWithRole,
        logout,
        isSuperAdmin: activeRole === 'CEO',
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}


