'use client';

import React from 'react';
import { OperationsKpiMetric } from '../../../lib/types';
import {
  Wrench,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Timer,
  ShieldCheck,
  Building2,
  Activity,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface OperationsOverviewCardsProps {
  metrics: OperationsKpiMetric[];
}

export function OperationsOverviewCards({ metrics }: OperationsOverviewCardsProps) {
  const getIcon = (label: string) => {
    switch (label) {
      case 'Active Service Requests':
        return <Wrench className="h-5 w-5 text-sky-600" />;
      case 'Services Completed Today':
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
      case 'Pending Services':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'Overdue Services':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Average Resolution Time':
        return <Timer className="h-5 w-5 text-purple-600" />;
      case 'SLA Compliance Rate':
        return <ShieldCheck className="h-5 w-5 text-indigo-600" />;
      case 'Branches Operating':
        return <Building2 className="h-5 w-5 text-blue-600" />;
      case 'Overall Operational Score':
        return <Activity className="h-5 w-5 text-emerald-600" />;
      default:
        return <Activity className="h-5 w-5 text-sky-600" />;
    }
  };

  const getBgColor = (label: string) => {
    switch (label) {
      case 'Active Service Requests':
        return 'bg-sky-50 border-sky-200';
      case 'Services Completed Today':
        return 'bg-emerald-50 border-emerald-200';
      case 'Pending Services':
        return 'bg-amber-50 border-amber-200';
      case 'Overdue Services':
        return 'bg-red-50 border-red-200';
      case 'Average Resolution Time':
        return 'bg-purple-50 border-purple-200';
      case 'SLA Compliance Rate':
        return 'bg-indigo-50 border-indigo-200';
      case 'Branches Operating':
        return 'bg-blue-50 border-blue-200';
      case 'Overall Operational Score':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item) => (
        <div key={item.id} className="glass-card p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">{item.label}</span>
            <div className={`p-2.5 rounded-xl border ${getBgColor(item.label)}`}>
              {getIcon(item.label)}
            </div>
          </div>

          <div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{item.value}</p>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px]">
              <span className={`font-extrabold flex items-center gap-0.5 ${
                item.isPositive ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {item.trend === 'UP' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {item.trendPercent}
              </span>
              <span className="text-slate-400 font-medium truncate" title={item.comparisonPeriod}>
                {item.comparisonPeriod}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
