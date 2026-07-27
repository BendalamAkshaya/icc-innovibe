'use client';

import React, { useState } from 'react';
import { TopContributor } from '../../../lib/types';
import { Award, Building2, MapPin, Package, ArrowUpRight } from 'lucide-react';

interface TopRevenueContributorsProps {
  contributors: {
    branches: TopContributor[];
    cities: TopContributor[];
    products: TopContributor[];
  };
}

export function TopRevenueContributors({ contributors }: TopRevenueContributorsProps) {
  const [activeTab, setActiveTab] = useState<'branches' | 'cities' | 'products'>('branches');

  const currentList = contributors[activeTab] || contributors.branches;

  const tabLabels = {
    branches: { title: 'Top 5 Branches', icon: Building2, color: 'text-amber-600' },
    cities: { title: 'Top 5 Cities', icon: MapPin, color: 'text-sky-600' },
    products: { title: 'Top 5 Products / Packages', icon: Package, color: 'text-purple-600' },
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600 fill-amber-500" />
            <h2 className="text-base font-extrabold text-slate-900">Top Revenue Contributors (Top 5)</h2>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl my-4">
          {(['branches', 'cities', 'products'] as const).map((tabKey) => {
            const Icon = tabLabels[tabKey].icon;
            const isActive = activeTab === tabKey;

            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  isActive ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? tabLabels[tabKey].color : 'text-slate-400'}`} />
                <span className="capitalize">{tabKey}</span>
              </button>
            );
          })}
        </div>

        {/* Top 5 Items List */}
        <div className="space-y-2.5">
          {currentList.slice(0, 5).map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between transition-all hover:bg-slate-100/80"
            >
              <div className="flex items-center gap-3">
                <span className={`h-7 w-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                  idx === 0
                    ? 'bg-amber-500 text-white shadow-xs'
                    : idx === 1
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  #{idx + 1}
                </span>

                <div className="truncate">
                  <p className="font-extrabold text-slate-900 text-xs truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium truncate">{item.subtitle}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-black text-slate-900 text-xs">{item.value}</p>
                <p className="text-[10px] font-extrabold text-emerald-600">{item.sharePercent}% Share</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 text-center border-t border-slate-100">
        <span className="text-[11px] text-slate-400 font-medium">
          Showing top 5 contributors only • Filtered by active region
        </span>
      </div>
    </div>
  );
}
