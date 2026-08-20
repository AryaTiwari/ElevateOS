import React, { memo } from 'react';
import { TrendingUp, BarChart2, Info, Sparkles } from 'lucide-react';
import { PerformanceOutlookInfo } from '../../types';

interface PerformanceOutlookSectionProps {
  outlook?: PerformanceOutlookInfo;
}

export const PerformanceOutlookSection: React.FC<PerformanceOutlookSectionProps> = memo(({ outlook }) => {
  if (!outlook) return null;

  const badgeStyle =
    outlook.potential === 'Above your normal performance'
      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
      : outlook.potential === 'Below your normal performance'
      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
      : 'bg-amber-500/10 border-amber-500/30 text-amber-300';

  return (
    <div id="section-performance-outlook" className="bg-[#101828]/95 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-3 h-3" />
            <span>SECTION 9 • REALISTIC PERFORMANCE OUTLOOK</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Reach & Engagement Forecast
          </h2>
        </div>
        <span className="text-xs text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          Algorithmic Assessment 📊
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#0C111D] border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
            Your Creator Baseline
          </span>
          <p className="text-xl sm:text-2xl font-black text-white">
            {outlook.creatorBaseline}
          </p>
          <span className="text-[11px] text-slate-400">Based on your stated average views</span>
        </div>

        <div className="bg-[#0C111D] border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Expected Trajectory
          </span>
          <div className="pt-0.5">
            <span className={`inline-block px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold border ${badgeStyle}`}>
              {outlook.potential}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">Factoring in hook hold rate & pacing</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-[#0C111D] p-5 rounded-2xl border border-slate-800/80 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Why this trajectory:
        </h4>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          {outlook.explanation}
        </p>
      </div>

      {/* Format Trend Note */}
      {outlook.formatNote && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-[#0C111D] border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-300 font-bold">Format observation: </strong>
            <span>{outlook.formatNote}</span>
          </div>
        </div>
      )}
    </div>
  );
});
