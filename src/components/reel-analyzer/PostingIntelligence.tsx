import React, { memo } from 'react';
import { Calendar, Clock, Globe, Sparkles } from 'lucide-react';
import { ReelAnalysisResult } from '../../types';

interface PostingIntelligenceProps {
  posting: ReelAnalysisResult['postingIntelligence'];
}

export const PostingIntelligence: React.FC<PostingIntelligenceProps> = memo(({ posting }) => {
  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 inline-flex items-center gap-1 mb-1.5">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>TIMING INTELLIGENCE</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Posting Intelligence
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
          <Globe className="w-3.5 h-3.5 text-pink-400" />
          <span>Optimized for Indian Standard Time (IST)</span>
        </div>
      </div>

      {/* Grid of timing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Best Day */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            <span>Recommended Days</span>
          </div>
          <p className="text-base sm:text-lg font-black text-white">
            {posting.bestDay}
          </p>
          <span className="text-[11px] text-slate-400 font-medium block">
            Highest category engagement
          </span>
        </div>

        {/* Best Time Window */}
        <div className="bg-gradient-to-b from-amber-500/10 to-[#0C111D]/90 border border-amber-500/30 p-4 sm:p-5 rounded-2xl space-y-1.5 shadow-lg shadow-amber-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Prime Window (IST)</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-base sm:text-lg font-black text-amber-200">
            {posting.bestTimeIST}
          </p>
          <span className="text-[11px] text-amber-300/80 font-semibold block">
            Peak viewer density
          </span>
        </div>

        {/* Secondary Window */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Secondary Window (IST)</span>
          </div>
          <p className="text-base sm:text-lg font-black text-white">
            {posting.secondaryWindowIST}
          </p>
          <span className="text-[11px] text-slate-400 font-medium block">
            Alternative afternoon push
          </span>
        </div>
      </div>

      {/* Reasoning context */}
      {posting.reasoning && (
        <p className="text-xs text-slate-300 font-medium leading-relaxed bg-[#0C111D]/60 p-4 rounded-2xl border border-slate-800/80">
          {posting.reasoning}
        </p>
      )}
    </div>
  );
});
