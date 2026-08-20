import React, { memo } from 'react';
import { ArrowRight, Sparkles, Video, Users } from 'lucide-react';

interface ElevateCTASectionProps {
  onOpenBooking?: () => void;
  onOpenFlagship?: () => void;
}

export const ElevateCTASection: React.FC<ElevateCTASectionProps> = memo(({
  onOpenBooking,
  onOpenFlagship,
}) => {
  return (
    <div id="section-elevate-cta" className="bg-gradient-to-br from-[#0C111D] via-[#1E1B4B] to-[#18112C] border border-pink-500/40 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>SECTION 11 • ELEVATE OS STRATEGY</span>
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          Want to turn these improvements into a full content strategy?
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          Get direct, 1-on-1 feedback on your script ideas, video hooks, and profile positioning with an experienced content strategist.
        </p>
      </div>

      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
        {onOpenBooking && (
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-pink-950/50 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <Users className="w-4 h-4" />
            <span>Book Free 1-on-1 Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {onOpenFlagship && (
          <button
            type="button"
            onClick={onOpenFlagship}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-bold border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span>Explore Flagship Program</span>
          </button>
        )}
      </div>

      <p className="relative text-[11px] text-slate-400 font-medium">
        Free 30-minute growth roadmap session • No sales pressure • High-value creator coaching
      </p>
    </div>
  );
});
