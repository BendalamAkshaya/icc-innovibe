'use client';

import React from 'react';
import { X, Building2, TrendingUp, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { mockBranchPerformance } from '../../../lib/mock-data';

interface BranchComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BranchComparisonModal({ isOpen, onClose }: BranchComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-indigo-200 shadow-2xl max-w-4xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Multi-Branch Executive Benchmarking</h2>
              <p className="text-[10px] text-slate-500 font-medium">Side-by-side comparative analysis across all 5 Andhra Pradesh Hubs</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Benchmarking Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold bg-slate-50">
                <th className="py-3 px-3">Branch Hub Name</th>
                <th className="py-3 px-3">City Location</th>
                <th className="py-3 px-3">Gross Revenue</th>
                <th className="py-3 px-3">YoY Growth</th>
                <th className="py-3 px-3">Services Completed</th>
                <th className="py-3 px-3 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockBranchPerformance.map((b) => (
                <tr key={b.id} className="transition-all hover:bg-indigo-50/50">
                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{b.name}</span>
                    </div>
                    {b.isBestPerformer && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Top Performer
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 font-bold text-slate-700">
                    {b.city}
                  </td>

                  <td className="py-3.5 px-3 font-mono font-black text-slate-900">
                    ₹{b.revenue.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-700">
                    +{b.growthPercent}%
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-sky-700">
                    {b.servicesCompleted} Jobs
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-extrabold text-amber-600">
                    {b.customerRating} ★
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">Top Performer: <strong className="text-emerald-700">Kakinada Main Hub (98% SLA)</strong></span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
