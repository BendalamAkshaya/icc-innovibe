'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, MapPin, Radio, Zap } from 'lucide-react';

export function FleetReplaySimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeIndex, setTimeIndex] = useState(10); // 10:00 AM

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeIndex((prev) => (prev >= 18 ? 8 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formattedTime = `${timeIndex.toString().padStart(2, '0')}:00 IST`;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-sky-600" />
          <h2 className="text-base font-extrabold text-slate-900">Incident Telemetry Fleet Replay Simulator</h2>
        </div>
        <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">
          Scrubber Timeline Replay
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        {/* Controls Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? 'Pause Replay' : 'Play Fleet Replay'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setTimeIndex(8);
              }}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold"
              title="Reset Timeline to 08:00"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-black text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <Radio className="h-3.5 w-3.5 text-sky-600 animate-pulse" />
            <span>Timecode: {formattedTime}</span>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="space-y-1">
          <input
            type="range"
            min={8}
            max={18}
            value={timeIndex}
            onChange={(e) => setTimeIndex(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>08:00 AM</span>
            <span>10:00 AM</span>
            <span>12:00 PM</span>
            <span>02:00 PM</span>
            <span>04:00 PM</span>
            <span>06:00 PM</span>
          </div>
        </div>

        {/* Replay Telemetry Snapshot Box */}
        <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span>Active Position Snapshot at <strong>{formattedTime}</strong>: 144 EVs Moving across Kakinada & Rajahmundry.</span>
          </div>
          <span className="text-[11px] font-bold text-sky-600">No Telemetry Anomalies</span>
        </div>
      </div>
    </div>
  );
}
