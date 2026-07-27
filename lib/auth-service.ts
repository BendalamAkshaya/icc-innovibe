/**
 * Centralized Authentication Service for InnoVibe Command Center (ICC)
 * 
 * Provides a production-ready authentication & authorization interface.
 * Designed so that swapping hardcoded development credentials with Laravel Sanctum/JWT
 * only requires updating this service, without altering components or pages.
 */

import { RoleType, UserRoleProfile } from './types';
import { initialProfiles } from './mock-data';

export const DEV_CREDENTIALS = {
  email: 'ceo@innovibe.ai',
  password: 'Innovibe@CEO2026',
  role: 'CEO' as RoleType,
};

export interface AuthSession {
  isAuthenticated: boolean;
  user: UserRoleProfile | null;
  activeRole: RoleType;
  token?: string;
  expiresAt?: number;
}

const SESSION_COOKIE_NAME = 'icc_session';
const SESSION_TOKEN_NAME = 'icc_auth_token';

// Helper to manage cookies on the client side
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const val = parts.pop()?.split(';').shift();
    return val ? decodeURIComponent(val) : null;
  }
  return null;
}

function eraseCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export const AuthService = {
  /**
   * Primary Login method
   * Validates credentials against development credentials or demo accounts.
   */
  async login(
    emailInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; profile?: UserRoleProfile; error?: string }> {
    // Simulate slight network latency for UI loading states
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    let matchedRole: RoleType | null = null;
    let matchedProfile: UserRoleProfile | null = null;

    // 1. Check Primary Development Credentials (CEO)
    if (cleanEmail === DEV_CREDENTIALS.email.toLowerCase() && cleanPass === DEV_CREDENTIALS.password) {
      matchedRole = DEV_CREDENTIALS.role;
      matchedProfile = {
        ...initialProfiles.CEO,
        email: DEV_CREDENTIALS.email,
      };
    }
    // 2. Allow legacy demo accounts for secondary role testing
    else if (cleanEmail === 'ceo@innovibemobility.com' && cleanPass === 'admin123') {
      matchedRole = 'CEO';
      matchedProfile = initialProfiles.CEO;
    } else if (cleanEmail === 'coo@innovibemobility.com' && cleanPass === 'coo123') {
      matchedRole = 'COO';
      matchedProfile = initialProfiles.COO;
    } else if (cleanEmail === 'cto@innovibemobility.com' && cleanPass === 'cto123') {
      matchedRole = 'CTO';
      matchedProfile = initialProfiles.CTO;
    } else if (cleanEmail === 'sm@innovibemobility.com' && cleanPass === 'sm123') {
      matchedRole = 'SERVICE_MANAGER';
      matchedProfile = initialProfiles.SERVICE_MANAGER;
    } else if (cleanEmail === 'hr@innovibemobility.com' && cleanPass === 'hr123') {
      matchedRole = 'HR';
      matchedProfile = initialProfiles.HR;
    }

    if (!matchedRole || !matchedProfile) {
      return {
        success: false,
        error: 'Invalid email address or password.',
      };
    }

    // Persist Session to Cookie & Storage for Next.js Middleware & Client UI
    const sessionPayload = {
      authenticated: true,
      role: matchedRole,
      email: matchedProfile.email,
      name: matchedProfile.name,
      timestamp: Date.now(),
    };

    setCookie(SESSION_COOKIE_NAME, JSON.stringify(sessionPayload));
    setCookie(SESSION_TOKEN_NAME, `dev_token_${matchedRole.toLowerCase()}_${Date.now()}`);

    if (typeof window !== 'undefined') {
      localStorage.setItem('icc_auth', 'true');
      localStorage.setItem('icc_role', matchedRole);
      localStorage.setItem('icc_profile', JSON.stringify(matchedProfile));
    }

    return {
      success: true,
      profile: matchedProfile,
    };
  },

  /**
   * Logs out the current user and clears session cookies and storage.
   */
  logout(): void {
    eraseCookie(SESSION_COOKIE_NAME);
    eraseCookie(SESSION_TOKEN_NAME);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('icc_auth');
      localStorage.removeItem('icc_role');
      localStorage.removeItem('icc_profile');
    }
  },

  /**
   * Validates and returns current session info.
   */
  getSession(): AuthSession {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false, user: null, activeRole: 'CEO' };
    }

    const rawCookie = getCookie(SESSION_COOKIE_NAME);
    const storedAuth = localStorage.getItem('icc_auth') === 'true';
    const storedRole = (localStorage.getItem('icc_role') as RoleType) || 'CEO';
    const storedProfileRaw = localStorage.getItem('icc_profile');

    let profile: UserRoleProfile | null = null;
    if (storedProfileRaw) {
      try {
        profile = JSON.parse(storedProfileRaw);
      } catch (err) {
        profile = initialProfiles[storedRole] || initialProfiles.CEO;
      }
    } else if (storedAuth) {
      profile = initialProfiles[storedRole] || initialProfiles.CEO;
    }

    const isAuth = storedAuth || Boolean(rawCookie);

    return {
      isAuthenticated: isAuth,
      user: isAuth ? profile : null,
      activeRole: storedRole,
    };
  },

  /**
   * RBAC Helper: Check if active user has a specific role
   */
  hasRole(requiredRole: RoleType): boolean {
    const session = this.getSession();
    return session.isAuthenticated && session.activeRole === requiredRole;
  },

  /**
   * RBAC Helper: Check if active user is Super Admin (CEO)
   */
  isSuperAdmin(): boolean {
    const session = this.getSession();
    return session.isAuthenticated && session.activeRole === 'CEO';
  },
};
