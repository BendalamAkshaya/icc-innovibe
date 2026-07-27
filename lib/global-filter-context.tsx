'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function formatAmount(valInInr: number, currency: 'INR' | 'USD' | 'EUR' = 'INR'): string {
  if (currency === 'USD') {
    const usdVal = Math.round(valInInr / 83.5);
    return `$${usdVal.toLocaleString('en-US')}`;
  }
  if (currency === 'EUR') {
    const eurVal = Math.round(valInInr / 90.5);
    return `€${eurVal.toLocaleString('de-DE')}`;
  }
  return `₹${valInInr.toLocaleString('en-IN')}`;
}

export interface SavedView {
  id: string;
  name: string;
  branches: string[];
  datePreset: string;
  comparison: string;
  createdAt: string;
}

export interface DrillDownState {
  isOpen: boolean;
  title: string;
  subtitle: string;
  metricType: 'REVENUE' | 'PROFIT' | 'EXPENSES' | 'BRANCH' | 'SERVICE' | 'TRANSACTION';
  data?: any;
}

export interface GlobalFilterContextType {
  // Branch Filter
  selectedBranches: string[];
  setSelectedBranches: (branches: string[]) => void;
  toggleBranch: (branch: string) => void;
  selectAllBranches: () => void;
  clearBranches: () => void;
  favoriteBranches: string[];
  toggleFavoriteBranch: (branch: string) => void;
  recentBranches: string[];

  // Date & Comparison Filter
  datePreset: string;
  setDatePreset: (preset: string) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
  comparisonMode: 'NONE' | 'PREVIOUS_PERIOD' | 'LAST_YEAR' | 'CUSTOM';
  setComparisonMode: (mode: 'NONE' | 'PREVIOUS_PERIOD' | 'LAST_YEAR' | 'CUSTOM') => void;

  // Currency & Refresh
  currency: 'INR' | 'USD' | 'EUR';
  setCurrency: (c: 'INR' | 'USD' | 'EUR') => void;
  autoRefreshInterval: number; // in seconds (0 = off)
  setAutoRefreshInterval: (seconds: number) => void;
  lastSyncTime: string;
  refreshStatus: 'Live' | 'Cached' | 'Offline' | 'Syncing';
  triggerRefresh: () => void;

  // Loading State
  isLoadingData: boolean;

  // Saved Views & Favorites
  savedViews: SavedView[];
  saveCurrentView: (name: string) => void;
  applySavedView: (view: SavedView) => void;
  deleteSavedView: (id: string) => void;

  // Modals Control
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  drillDownState: DrillDownState;
  openDrillDown: (title: string, subtitle: string, metricType: DrillDownState['metricType'], data?: any) => void;
  closeDrillDown: () => void;

  // Analytics Navigation Helper
  navigateToAnalyticsStudio: () => void;
}

const GlobalFilterContext = createContext<GlobalFilterContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'icc_global_filters_v2';

function GlobalFilterInnerProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State Definitions
  const [selectedBranches, setSelectedBranchesState] = useState<string[]>(['Entire Company']);
  const [favoriteBranches, setFavoriteBranches] = useState<string[]>(['Kakinada Main Hub', 'Rajahmundry Hub']);
  const [recentBranches, setRecentBranches] = useState<string[]>(['Kakinada Main Hub', 'Vijayawada Hub']);

  const [datePreset, setDatePresetState] = useState<string>('This Month');
  const [customStartDate, setCustomStartDate] = useState<string>('2026-06-01');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-06-30');
  const [comparisonMode, setComparisonModeState] = useState<'NONE' | 'PREVIOUS_PERIOD' | 'LAST_YEAR' | 'CUSTOM'>('PREVIOUS_PERIOD');

  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR'>('INR');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [refreshStatus, setRefreshStatus] = useState<'Live' | 'Cached' | 'Offline' | 'Syncing'>('Live');
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // Saved Views
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: 'sv_1',
      name: 'Quarterly Review (AP Hubs)',
      branches: ['Kakinada Main Hub', 'Rajahmundry Hub', 'Vijayawada Hub'],
      datePreset: 'This Quarter',
      comparison: 'PREVIOUS_PERIOD',
      createdAt: '2026-06-15',
    },
    {
      id: 'sv_2',
      name: 'Board Meeting Snapshot',
      branches: ['Entire Company'],
      datePreset: 'Year To Date (YTD)',
      comparison: 'LAST_YEAR',
      createdAt: '2026-06-01',
    },
  ]);

  // Modals
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [drillDownState, setDrillDownState] = useState<DrillDownState>({
    isOpen: false,
    title: '',
    subtitle: '',
    metricType: 'REVENUE',
  });

  // Trigger Data Refresh simulation with loading state
  const triggerRefresh = useCallback(() => {
    setIsLoadingData(true);
    setRefreshStatus('Syncing');
    setTimeout(() => {
      setIsLoadingData(false);
      setRefreshStatus('Live');
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 500);
  }, []);

  // Update Branch Selection
  const setSelectedBranches = (branches: string[]) => {
    setSelectedBranchesState(branches.length === 0 ? ['Entire Company'] : branches);
    triggerRefresh();
  };

  const toggleBranch = (branch: string) => {
    if (branch === 'Entire Company') {
      setSelectedBranches(['Entire Company']);
      return;
    }
    let updated = selectedBranches.filter((b) => b !== 'Entire Company');
    if (updated.includes(branch)) {
      updated = updated.filter((b) => b !== branch);
    } else {
      updated.push(branch);
    }
    if (updated.length === 0) updated = ['Entire Company'];
    setSelectedBranches(updated);
  };

  const selectAllBranches = () => {
    setSelectedBranches([
      'Entire Company',
      'Kakinada Main Hub',
      'Rajahmundry Hub',
      'Vijayawada Hub',
      'Guntur Hub',
      'Vizag Hub',
    ]);
  };

  const clearBranches = () => {
    setSelectedBranches(['Entire Company']);
  };

  const toggleFavoriteBranch = (branch: string) => {
    setFavoriteBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  // Update Date & Comparison
  const setDatePreset = (preset: string) => {
    setDatePresetState(preset);
    triggerRefresh();
  };

  const setComparisonMode = (mode: 'NONE' | 'PREVIOUS_PERIOD' | 'LAST_YEAR' | 'CUSTOM') => {
    setComparisonModeState(mode);
    triggerRefresh();
  };

  // Saved Views Logic
  const saveCurrentView = (name: string) => {
    const newView: SavedView = {
      id: `sv_${Date.now()}`,
      name,
      branches: selectedBranches,
      datePreset,
      comparison: comparisonMode,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSavedViews((prev) => [newView, ...prev]);
  };

  const applySavedView = (view: SavedView) => {
    setSelectedBranchesState(view.branches);
    setDatePresetState(view.datePreset);
    setComparisonModeState(view.comparison as any);
    triggerRefresh();
  };

  const deleteSavedView = (id: string) => {
    setSavedViews((prev) => prev.filter((v) => v.id !== id));
  };

  // Drill-down Modal Handlers
  const openDrillDown = (title: string, subtitle: string, metricType: DrillDownState['metricType'], data?: any) => {
    setDrillDownState({
      isOpen: true,
      title,
      subtitle,
      metricType,
      data,
    });
  };

  const closeDrillDown = () => {
    setDrillDownState((prev) => ({ ...prev, isOpen: false }));
  };

  // Navigate to Analytics Studio with full query params preserved
  const navigateToAnalyticsStudio = () => {
    const params = new URLSearchParams();
    params.set('module', 'reports-analytics');
    params.set('view', 'ANALYTICS_STUDIO');
    params.set('branches', selectedBranches.join(','));
    params.set('datePreset', datePreset);
    params.set('comparison', comparisonMode);
    params.set('currency', currency);

    router.push(`/dashboard/ceo?${params.toString()}`);
  };

  // Auto-refresh Timer
  useEffect(() => {
    if (autoRefreshInterval <= 0) return;
    const timer = setInterval(() => {
      triggerRefresh();
    }, autoRefreshInterval * 1000);
    return () => clearInterval(timer);
  }, [autoRefreshInterval, triggerRefresh]);

  // Restore & Persist in LocalStorage + URL Sync
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.branches) setSelectedBranchesState(parsed.branches);
        if (parsed.datePreset) setDatePresetState(parsed.datePreset);
        if (parsed.comparisonMode) setComparisonModeState(parsed.comparisonMode);
        if (parsed.currency) setCurrency(parsed.currency);
      }
    } catch (e) {
      console.warn('Failed to load global filters from storage', e);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const payload = {
        branches: selectedBranches,
        datePreset,
        comparisonMode,
        currency,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to persist global filters', e);
    }
  }, [selectedBranches, datePreset, comparisonMode, currency]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        setIsExportModalOpen(false);
        setIsShareModalOpen(false);
        closeDrillDown();
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsExportModalOpen(true);
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        triggerRefresh();
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigateToAnalyticsStudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerRefresh, navigateToAnalyticsStudio]);

  return (
    <GlobalFilterContext.Provider
      value={{
        selectedBranches,
        setSelectedBranches,
        toggleBranch,
        selectAllBranches,
        clearBranches,
        favoriteBranches,
        toggleFavoriteBranch,
        recentBranches,
        datePreset,
        setDatePreset,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        comparisonMode,
        setComparisonMode,
        currency,
        setCurrency,
        autoRefreshInterval,
        setAutoRefreshInterval,
        lastSyncTime,
        refreshStatus,
        triggerRefresh,
        isLoadingData,
        savedViews,
        saveCurrentView,
        applySavedView,
        deleteSavedView,
        isExportModalOpen,
        setIsExportModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        drillDownState,
        openDrillDown,
        closeDrillDown,
        navigateToAnalyticsStudio,
      }}
    >
      {children}
    </GlobalFilterContext.Provider>
  );
}

export function GlobalFilterProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<>{children}</>}>
      <GlobalFilterInnerProvider>{children}</GlobalFilterInnerProvider>
    </React.Suspense>
  );
}

export function useGlobalFilter() {
  const context = useContext(GlobalFilterContext);
  if (!context) {
    throw new Error('useGlobalFilter must be used within a GlobalFilterProvider');
  }
  return context;
}
