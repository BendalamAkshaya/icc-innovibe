'use client';

import React, { useState } from 'react';
import { useGlobalFilter } from '../../../lib/global-filter-context';
import { Building2, Search, Check, Star, ChevronRight, ChevronDown, RotateCcw } from 'lucide-react';

interface BranchNode {
  id: string;
  name: string;
  type: 'company' | 'region' | 'state' | 'hub';
  children?: BranchNode[];
}

const branchHierarchy: BranchNode = {
  id: 'Entire Company',
  name: 'Entire Company',
  type: 'company',
  children: [
    {
      id: 'South India',
      name: 'South India Region',
      type: 'region',
      children: [
        {
          id: 'Andhra Pradesh',
          name: 'Andhra Pradesh State',
          type: 'state',
          children: [
            { id: 'Kakinada Main Hub', name: 'Kakinada Main Hub', type: 'hub' },
            { id: 'Rajahmundry Hub', name: 'Rajahmundry East Hub', type: 'hub' },
            { id: 'Vijayawada Hub', name: 'Vijayawada Central Hub', type: 'hub' },
            { id: 'Guntur Hub', name: 'Guntur South Hub', type: 'hub' },
            { id: 'Vizag Hub', name: 'Visakhapatnam Port Hub', type: 'hub' },
          ],
        },
      ],
    },
  ],
};

export function BranchSelectorDropdown() {
  const {
    selectedBranches,
    toggleBranch,
    selectAllBranches,
    clearBranches,
    favoriteBranches,
    toggleFavoriteBranch,
    recentBranches,
  } = useGlobalFilter();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'South India': true,
    'Andhra Pradesh': true,
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isSelected = (name: string) => selectedBranches.includes(name);

  // Render tree node recursively
  const renderNode = (node: BranchNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.id] ?? false;
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery && !matchesSearch && !hasChildren) return null;

    return (
      <div key={node.id} className="space-y-1">
        <div
          onClick={() => toggleBranch(node.name)}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
            isSelected(node.name)
              ? 'bg-sky-50 text-sky-900 border border-sky-200'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button
                onClick={(e) => toggleExpand(node.id, e)}
                className="p-0.5 rounded hover:bg-slate-200 text-slate-500"
              >
                {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            ) : (
              <span className="w-3.5" />
            )}

            {/* Selection Checkbox */}
            <div
              className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                isSelected(node.name) ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {isSelected(node.name) && <Check className="h-3 w-3 stroke-[3]" />}
            </div>

            <span className={node.type === 'company' || node.type === 'region' ? 'font-extrabold' : ''}>
              {node.name}
            </span>
          </div>

          {/* Favorite Button */}
          {node.type === 'hub' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavoriteBranch(node.name);
              }}
              className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
            >
              <Star
                className={`h-3.5 w-3.5 ${
                  favoriteBranches.includes(node.name) ? 'fill-amber-400 text-amber-500' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Render Children if Expanded */}
        {hasChildren && (isExpanded || searchQuery) && (
          <div className="space-y-1">{node.children!.map((child) => renderNode(child, level + 1))}</div>
        )}
      </div>
    );
  };

  const displayText =
    selectedBranches.length === 1
      ? selectedBranches[0]
      : `${selectedBranches.length} Branches Selected`;

  return (
    <div className="relative" suppressHydrationWarning>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-extrabold shadow-xs flex items-center gap-2 transition-all"
      >
        <Building2 className="h-3.5 w-3.5 text-sky-600" />
        <span className="max-w-[150px] truncate">{displayText}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 space-y-3 animate-in fade-in zoom-in-95">
            {/* Header Actions */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Select Scope / Hub
              </span>
              <div className="flex items-center gap-2 text-[11px] font-bold">
                <button
                  onClick={selectAllBranches}
                  className="text-sky-700 hover:underline"
                >
                  Select All
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={clearBranches}
                  className="text-slate-500 hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search branch, region or hub..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Favorites Quick Pills */}
            {favoriteBranches.length > 0 && !searchQuery && (
              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  ⭐ Favorites
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {favoriteBranches.map((fav) => (
                    <button
                      key={fav}
                      onClick={() => toggleBranch(fav)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                        isSelected(fav)
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {fav}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tree Container */}
            <div className="max-h-64 overflow-y-auto space-y-1 pr-1 border-t border-slate-100 pt-2">
              {renderNode(branchHierarchy)}
            </div>

            {/* Footer Summary */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>{selectedBranches.length} selected</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700"
              >
                Apply Selection
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
