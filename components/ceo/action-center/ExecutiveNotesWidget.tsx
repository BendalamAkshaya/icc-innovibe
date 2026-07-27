'use client';

import React, { useState } from 'react';
import { ExecutiveNoteItem } from '../../../lib/types';
import { FileText, Pin, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface ExecutiveNotesWidgetProps {
  notes: ExecutiveNoteItem[];
  onAddNote?: (note: ExecutiveNoteItem) => void;
}

export function ExecutiveNotesWidget({ notes: initialNotes, onAddNote }: ExecutiveNotesWidgetProps) {
  const [notes, setNotes] = useState<ExecutiveNoteItem[]>(initialNotes);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const item: ExecutiveNoteItem = {
      id: `note_${Date.now()}`,
      title: newTitle,
      category: 'STRATEGY',
      content: newContent,
      pinned: true,
      timestamp: 'Just now',
    };

    setNotes([item, ...notes]);
    setNewTitle('');
    setNewContent('');
    setShowAddForm(false);
    if (onAddNote) onAddNote(item);
  };

  const togglePin = (id: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-extrabold text-slate-900">Private CEO Strategic Scratchpad & Notes</h2>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1 shadow-xs transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{showAddForm ? 'Cancel' : 'New Note'}</span>
        </button>
      </div>

      {showAddForm && (
        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Note title (e.g. Board Pitch Key Point)..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Private strategic thoughts, board points, observations..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 h-20"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs"
          >
            Save Executive Note
          </button>
        </div>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {notes.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
              n.pinned ? 'bg-amber-50/40 border-amber-200' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {n.category}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900">{n.title}</h3>
              </div>

              <button
                onClick={() => togglePin(n.id)}
                className={`p-1 rounded transition-all ${
                  n.pinned ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Pin className="h-3.5 w-3.5 fill-current" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed">{n.content}</p>
            <span className="text-[10px] font-mono text-slate-400 block text-right">{n.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
