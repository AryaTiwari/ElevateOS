import React, { memo } from 'react';
import { Calendar, Clock, Sun, Moon, Sparkles } from 'lucide-react';
import { PostingIntelligence as PostingIntelligenceType } from '../../types';

interface BestTimeToPostSectionProps {
  posting?: PostingIntelligenceType;
  targetAudience?: string;
}

export const BestTimeToPostSection: React.FC<BestTimeToPostSectionProps> = memo(({ posting, targetAudience }) => {
  if (!posting) return null;

  return (
    <div id="section-best-time-to-post" className="bg-[#101828]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 inline-flex items-center gap-1.5 mb-2">
            <Calendar className="w-3 h-3" />
            <span>SECTION 10 • BEST TIME TO POST</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Publishing Schedule & Peak Windows (IST)
          </h2>
        </div>
        <span className="text-xs text-amber-300 font-bold bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          India Peak Hours 🇮🇳
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Best Day */}
        <div className="bg-[#0C111D] border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Top Recommended Days
          </span>
          <p className="text-base sm:text-lg font-black text-white">
            {posting.bestDay}
          </p>
          <span className="text-[11px] text-slate-400 block">High algorithmic initial push</span>
        </div>

        {/* Primary Window */}
        <div className="bg-[#0C111D] border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-pink-400" />
            Primary Evening Window (IST)
          </span>
          <p className="text-base sm:text-lg font-black text-pink-300">
            {posting.bestTimeIST}
          </p>
          <span className="text-[11px] text-slate-400 block">Peak leisure scrolling & engagement</span>
        </div>

        {/* Secondary Window */}
        <div className="bg-[#0C111D] border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            Secondary Afternoon Window (IST)
          </span>
          <p className="text-base sm:text-lg font-black text-amber-300">
            {posting.secondaryWindowIST || '12:45 PM – 2:00 PM IST'}
          </p>
          <span className="text-[11px] text-slate-400 block">Lunchtime casual browse boost</span>
        </div>
      </div>

      {/* Reasoning */}
      <div className="bg-gradient-to-r from-amber-950/20 to-[#0C111D] p-5 rounded-2xl border border-amber-500/20 text-xs sm:text-sm text-slate-200 space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Target Audience Behavioral Rationale {targetAudience ? `(${targetAudience})` : ''}
        </span>
        <p className="leading-relaxed font-medium">
          {posting.reasoning}
        </p>
      </div>
    </div>
  );
});
