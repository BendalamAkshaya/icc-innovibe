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

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<RoleType>('CEO');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profiles, setProfiles] = useState(initialProfiles);
  const [roleConfigs, setRoleConfigs] = useState(defaultRoleConfigs);
  const [currentProfileState, setCurrentProfileState] = useState<UserRoleProfile>(initialProfiles.CEO);

  // Restore Session on Client Mount
  useEffect(() => {
    const session = AuthService.getSession();
    setIsAuthenticated(session.isAuthenticated);
    if (session.isAuthenticated && session.activeRole) {
      setActiveRoleState(session.activeRole);
      if (session.user) {
        setCurrentProfileState(session.user);
      } else {
        setCurrentProfileState(initialProfiles[session.activeRole] || initialProfiles.CEO);
      }
    }
  }, []);

  const setActiveRole = (role: RoleType) => {
    setActiveRoleState(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('icc_role', role);
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

