import React, { memo } from 'react';
import { RefreshCw, Play, Layers, MessageSquare, Sparkles } from 'lucide-react';
import { BetterVersionScript } from '../../types';

interface BetterVersionSectionProps {
  betterVersion?: BetterVersionScript;
}

export const BetterVersionSection: React.FC<BetterVersionSectionProps> = memo(({ betterVersion }) => {
  if (!betterVersion) return null;

  return (
    <div id="section-better-version" className="bg-[#101828]/95 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 inline-flex items-center gap-1.5 mb-2">
            <RefreshCw className="w-3 h-3" />
            <span>SECTION 5 • YOUR BETTER VERSION</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            The Strategist's Script & Flow Rewrite
          </h2>
        </div>
        <span className="text-xs text-purple-300 font-bold bg-purple-950/60 border border-purple-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          Ready to record 🎬
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hook */}
        <div className="bg-[#0C111D] border border-slate-800 hover:border-purple-500/40 p-5 rounded-2xl transition-all space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" />
              1. The New Hook (0:00 - 0:03)
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed bg-[#101828] p-3.5 rounded-xl border border-slate-800/80">
              "{betterVersion.newHook}"
            </p>
          </div>
          <span className="text-[11px] text-slate-400">Captures immediate visual + audio curiosity</span>
        </div>

        {/* Body */}
        <div className="bg-[#0C111D] border border-slate-800 hover:border-purple-500/40 p-5 rounded-2xl transition-all space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              2. Body Structure (No Filler)
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed bg-[#101828] p-3.5 rounded-xl border border-slate-800/80">
              {betterVersion.bodyStructure}
            </p>
          </div>
          <span className="text-[11px] text-slate-400">Eliminates mid-video retention dips</span>
        </div>

        {/* Ending */}
        <div className="bg-[#0C111D] border border-slate-800 hover:border-purple-500/40 p-5 rounded-2xl transition-all space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              3. Better Ending & CTA
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed bg-[#101828] p-3.5 rounded-xl border border-slate-800/80">
              "{betterVersion.betterEnding}"
            </p>
          </div>
          <span className="text-[11px] text-slate-400">Drives comments, shares & seamless looping</span>
        </div>
      </div>

      {/* Strategist Notes */}
      {betterVersion.notes && (
        <div className="bg-gradient-to-r from-purple-950/30 to-[#0C111D] p-4.5 rounded-2xl border border-purple-500/20 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-purple-300 font-bold">Why this version performs better: </strong>
            <span>{betterVersion.notes}</span>
          </div>
        </div>
      )}
    </div>
  );
});
