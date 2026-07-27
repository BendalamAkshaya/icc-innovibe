'use client';

import React from 'react';
import { EnterpriseToolbar } from '../common/EnterpriseToolbar';

interface SectionHeaderProps {
  selectedBranch?: string;
  onBranchChange?: (branch: string) => void;
  selectedDateRange?: string;
  onDateRangeChange?: (range: string) => void;
  onExport?: () => void;
  onFullAnalytics?: () => void;
}

export function SectionHeader(props: SectionHeaderProps) {
  return (
    <EnterpriseToolbar
      title="Business Performance"
      subtitle="Monitor revenue, profitability, operating margins, and company growth."
      badge="Financial & Growth Intelligence"
      badgeColor="text-sky-700 bg-sky-50 border-sky-200"
    />
  );
}
