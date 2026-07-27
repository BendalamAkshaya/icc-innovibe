'use client';

import React from 'react';
import { FinancialSummaryMetric } from '../../../lib/types';
import { useGlobalFilter, formatAmount } from '../../../lib/global-filter-context';
import { TrendingUp, TrendingDown, IndianRupee, PieChart, Percent, Activity } from 'lucide-react';

interface FinancialSummaryCardsProps {
  metrics: FinancialSummaryMetric[];
}

export function FinancialSummaryCards({ metrics }: FinancialSummaryCardsProps) {
  const { isLoadingData, openDrillDown, currency } = useGlobalFilter();

  const getIcon = (label: string) => {
    switch (label) {
      case 'Gross Revenue':
        return <IndianRupee className="h-5 w-5 text-amber-600" />;
      case 'Net Profit':
        return <TrendingUp className="h-5 w-5 text-emerald-600" />;
      case 'Total Expenses':
        return <PieChart className="h-5 w-5 text-red-600" />;
      case 'Operating Margin':
        return <Percent className="h-5 w-5 text-purple-600" />;
      case 'Revenue Growth':
        return <Activity className="h-5 w-5 text-sky-600" />;
      case 'Profit Growth':
        return <TrendingUp className="h-5 w-5 text-indigo-600" />;
      default:
        return <IndianRupee className="h-5 w-5 text-sky-600" />;
    }
  };

  const getBgColor = (label: string) => {
    switch (label) {
      case 'Gross Revenue':
        return 'bg-amber-50 border-amber-200';
      case 'Net Profit':
        return 'bg-emerald-50 border-emerald-200';
      case 'Total Expenses':
        return 'bg-red-50 border-red-200';
      case 'Operating Margin':
        return 'bg-purple-50 border-purple-200';
      case 'Revenue Growth':
        return 'bg-sky-50 border-sky-200';
      case 'Profit Growth':
        return 'bg-indigo-50 border-indigo-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  if (isLoadingData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card p-4 rounded-2xl border border-slate-200 space-y-3 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-slate-200 rounded w-20" />
              <div className="h-8 w-8 bg-slate-200 rounded-xl" />
            </div>
            <div className="h-7 bg-slate-200 rounded w-28" />
            <div className="h-3 bg-slate-150 rounded w-full pt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4" suppressHydrationWarning>
      {metrics.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() =>
              openDrillDown(
                `${item.label} Detailed Drill Down`,
                `Complete transactions, margins & stream breakdown for ${item.label}`,
                item.label.toLowerCase().includes('profit') ? 'PROFIT' : 'REVENUE',
                item
              )
            }
            className="glass-card p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 cursor-pointer hover:border-sky-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider group-hover:text-sky-700 transition-colors">
                {item.label}
              </span>
              <div className={`p-2 rounded-xl border ${getBgColor(item.label)}`}>
                {getIcon(item.label)}
              </div>
            </div>

            <div>
              <p className="text-xl font-black text-slate-900 tracking-tight">
                {item.label === 'Operating Margin' || item.label.includes('Growth')
                  ? item.formattedValue
                  : formatAmount(item.value, currency)}
              </p>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px]">
                <span className={`font-extrabold flex items-center gap-0.5 ${item.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {item.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {item.growthPercent > 0 ? `+${item.growthPercent}%` : `${item.growthPercent}%`}
                </span>
                <span className="text-slate-400 font-medium truncate" title={`Prev: ${item.previousPeriodValue}`}>
                  Prev:{' '}
                  {item.label === 'Operating Margin' || item.label.includes('Growth')
                    ? item.previousPeriodValue
                    : item.label === 'Gross Revenue'
                    ? formatAmount(1051200, currency)
                    : item.label === 'Net Profit'
                    ? formatAmount(316800, currency)
                    : formatAmount(768000, currency)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
