import React, { memo } from 'react';
import { DiagnosisFinding } from '../../types';

interface ContentDiagnosisProps {
  working: DiagnosisFinding[];
  couldHurt: DiagnosisFinding[];
}

export const ContentDiagnosis: React.FC<ContentDiagnosisProps> = memo(({ working, couldHurt }) => {
  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30 inline-flex items-center gap-1 mb-1.5">
          <span>🔬</span>
          <span>DIAGNOSIS & RETENTION</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Content Diagnosis
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Objective evaluation of what currently elevates your Reel and what friction points to eliminate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WHAT'S WORKING */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
              <span>✅</span>
            </div>
            <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400">
              What's Working
            </h4>
          </div>

          <div className="space-y-3">
            {working.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0C111D]/85 border border-emerald-500/20 hover:border-emerald-500/40 p-4 rounded-2xl space-y-2 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">
                    {item.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.microBadge && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                        {item.microBadge}
                      </span>
                    )}
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                      {item.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT COULD HURT PERFORMANCE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm">
              <span>⚠️</span>
            </div>
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-400">
              What Could Hurt Performance
            </h4>
          </div>

          <div className="space-y-3">
            {couldHurt.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0C111D]/85 border border-amber-500/20 hover:border-amber-500/40 p-4 rounded-2xl space-y-2 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">
                    {item.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.microBadge && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                        {item.microBadge}
                      </span>
                    )}
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      {item.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
