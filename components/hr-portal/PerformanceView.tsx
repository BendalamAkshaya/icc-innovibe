'use client';

import React, { useState } from 'react';
import {
  hrPerformanceGoals,
  PerformanceGoal,
} from './hr-mock-data';
import {
  Award,
  CheckCircle,
  Plus,
  Star,
  ChevronRight,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';

interface PerformanceViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function PerformanceView({ showToast }: PerformanceViewProps) {
  const [goals, setGoals] = useState<PerformanceGoal[]>(hrPerformanceGoals);

  // New review form drawer state
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Evaluation form state
  const [targetEmpName, setTargetEmpName] = useState('Kiran Gopi');
  const [goalDesc, setGoalDesc] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Handle goals progress slider changes
  const handleProgressChange = (id: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const isCompleted = progress === 100;
          if (isCompleted && g.progress !== 100) {
            showToast(`Goal Completed: "${g.goal}"`, 'success');
          }
          return { ...g, progress };
        }
        return g;
      })
    );
  };

  // Submit new review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalDesc || !reviewComment) {
      showToast('Please fill out all evaluation fields.', 'error');
      return;
    }

    const newGoal: PerformanceGoal = {
      id: `g_0${goals.length + 1}`,
      employeeName: targetEmpName,
      avatar: targetEmpName === 'Kiran Gopi'
        ? 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150'
        : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      goal: goalDesc,
      category: 'INDIVIDUAL',
      target: 'Completed Assessment',
      progress: 0,
      rating,
    };

    setGoals([...goals, newGoal]);
    setIsReviewOpen(false);
    setGoalDesc('');
    setReviewComment('');
    showToast(`Performance evaluation submitted for ${targetEmpName}.`, 'success');
  };

  // Resolve star symbols
  const renderStars = (ratingVal: number) => {
    const stars = [];
    const floorRating = Math.floor(ratingVal);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 shrink-0 ${
            i <= floorRating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-200'
          }`}
        />
      );
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Performance & Goal Evaluations</h2>
          <p className="text-xs text-slate-500 font-medium">Verify employee target completions and submit quarterly supervisor evaluations.</p>
        </div>
        <button
          onClick={() => setIsReviewOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 self-start transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>New Evaluation Cycle</span>
        </button>
      </div>

      {/* Promotion considerations & evaluation status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: Promotion vetting dashboard */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 text-left">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Promotion Candidates (Vetting)</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">High-performing staff recommended by managers.</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
                  alt="Kiran G"
                  className="h-8 w-8 rounded-full object-cover border border-slate-200 mt-1"
                />
                <div className="grow space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800">Kiran Gopi</h4>
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      4.8★ Rating
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Recommended for level change to <strong className="text-slate-700">Lead EV Diagnostics Architect</strong>. Resolved 100% of Kakinada hub thermal alarms in Q2.
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-extrabold pt-1">
                    <span className="text-slate-400">Current Salary: ₹68.1k/mo</span>
                    <button
                      onClick={() => showToast('Promotion approved. Compensations updated in payroll.', 'success')}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-all uppercase text-[8px]"
                    >
                      Approve & Process
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
                  alt="Srinivas R"
                  className="h-8 w-8 rounded-full object-cover border border-slate-200 mt-1"
                />
                <div className="grow space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800">Srinivas Rao</h4>
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      4.9★ Rating
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Recommended for award recognition: <strong className="text-slate-700">Master EV Mechanic Citation</strong>. Completed 120 customer SLA tickets with zero callbacks.
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-extrabold pt-1">
                    <span className="text-slate-400">Current Salary: ₹44.8k/mo</span>
                    <button
                      onClick={() => showToast('Award citation sent to candidate profile.', 'success')}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-all uppercase text-[8px]"
                    >
                      Approve Citation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side scorecard */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Evaluation Checklist</h3>
          <div className="space-y-3.5 text-xs text-slate-600 font-bold">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-800">Quarterly Target Allocations</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">All engineers assigned with diagnostics SLAs.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-800">Supervisor Reviews Uploaded</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">CTO & Service Manager evaluations are synchronized.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-slate-450">
              <span className="h-4 w-4 border-2 border-dashed border-slate-350 rounded-full shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-500">Salary revisions payouts approval</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Pending CFO review confirmation.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Goal Progress Tracker Workbench */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 text-left space-y-5">
        <div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Goal Progress Tracker Workbench</h3>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Adjust sliders to log progress updates and audit targets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={goal.avatar} alt={goal.employeeName} className="h-6 w-6 rounded-full object-cover border border-slate-200" />
                    <span className="text-xs font-black text-slate-800">{goal.employeeName}</span>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase ${
                    goal.category === 'INDIVIDUAL' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-purple-50 text-purple-800 border-purple-200'
                  }`}>
                    {goal.category}
                  </span>
                </div>

                <p className="text-[11px] font-bold text-slate-700 leading-normal line-clamp-2 h-8">
                  {goal.goal}
                </p>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span>Target: {goal.target}</span>
                  <span className="text-blue-600 font-mono">{goal.progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => handleProgressChange(goal.id, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-650"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] font-bold">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Scorecard:</span>
                  {renderStars(goal.rating)}
                </div>
                <span className="text-slate-400 font-mono">{goal.rating}★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          SUBMIT EVALUATION CYCLE DRAWER (SLIDE OVER)
          ========================================== */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-3xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col text-left animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">Quarterly Evaluation Cycle</h3>
              </div>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Drawer Form */}
            <form onSubmit={handleReviewSubmit} className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Select Candidate Representative</label>
                <select
                  value={targetEmpName}
                  onChange={(e) => setTargetEmpName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 outline-none bg-white font-sans"
                >
                  <option>Kiran Gopi</option>
                  <option>Srinivas Rao</option>
                  <option>Meera Deshmukh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Assigned Target KPI</label>
                <input
                  type="text"
                  value={goalDesc}
                  onChange={(e) => setGoalDesc(e.target.value)}
                  placeholder="e.g. Decrease BMS diagnostics code errors by 15%"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Performance Rating Score</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 outline-none bg-white font-sans"
                >
                  <option value={5}>5.0 ★ Outstanding</option>
                  <option value={4}>4.0 ★ Exceeds Expectations</option>
                  <option value={3}>3.0 ★ Meets Expectations</option>
                  <option value={2}>2.0 ★ Needs Improvement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Evaluation Remarks</label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Provide qualitative feedback about technical competency, client relations, and target milestones."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-950 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all"
                >
                  Submit Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
