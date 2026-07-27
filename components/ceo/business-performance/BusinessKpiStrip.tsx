'use client';

import React from 'react';
import { BusinessKpi } from '../../../lib/types';
import { TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface BusinessKpiStripProps {
  kpis: BusinessKpi[];
}

export function BusinessKpiStrip({ kpis }: BusinessKpiStripProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 mb-3 px-2">
        <Layers className="h-4 w-4 text-sky-600" />
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Executive KPI Summary Strip</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((item) => (
          <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">{item.label}</p>
              <p className="text-lg font-black text-slate-900 mt-1">{item.value}</p>
            </div>
            
            <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <span className="text-slate-500 font-medium truncate">{item.subtext}</span>
              <span className={`font-extrabold flex items-center gap-0.5 ${item.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {item.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
