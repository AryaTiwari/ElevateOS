import React, { memo } from 'react';
import { Sliders, ArrowRight, Lightbulb, Video } from 'lucide-react';
import { StrategicChangeItem } from '../../types';

interface Top3ChangesSectionProps {
  changes?: StrategicChangeItem[];
}

export const Top3ChangesSection: React.FC<Top3ChangesSectionProps> = memo(({ changes = [] }) => {
  if (!changes || changes.length === 0) return null;

  return (
    <div id="section-top-3-changes" className="bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1.5 mb-2">
            <Sliders className="w-3 h-3" />
            <span>SECTION 4 • THE 3 CHANGES I'D MAKE</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Your Step-by-Step Strategic Action Plan
          </h2>
        </div>
        <span className="text-xs text-pink-300 font-bold bg-pink-950/60 border border-pink-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          Highest Impact Edits 🎯
        </span>
      </div>

      <div className="space-y-4">
        {changes.map((item, idx) => (
          <div
            key={idx}
            id={`action-plan-step-${item.number || idx + 1}`}
            className="bg-[#0C111D] border border-slate-800/80 hover:border-pink-500/40 p-5 sm:p-6 rounded-2xl transition-all space-y-4"
          >
            {/* Header / Step Number & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shrink-0">
                  #{item.number || idx + 1}
                </span>
                <h3 className="font-extrabold text-white text-base sm:text-lg">
                  {item.title}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider self-start sm:self-auto">
                {idx === 0 ? '🔥 Biggest Lift' : idx === 1 ? '⚡ Pacing Fix' : '🎯 Conversion Boost'}
              </span>
            </div>

            {/* What to Change vs Try This */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* What I'd change */}
              <div className="bg-[#101828] p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3" />
                  What I'd change
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {item.whatToChange}
                </p>
              </div>

              {/* Try this instead */}
              <div className="bg-gradient-to-br from-pink-950/30 to-[#101828] p-4 rounded-xl border border-pink-500/30 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3 text-emerald-400" />
                  Try this instead
                </span>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-semibold">
                  "{item.tryThis}"
                </p>
              </div>
            </div>

            {/* Visual & Text Change instruction */}
            {item.visualAndTextChange && (
              <div className="bg-[#0A0E17] p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <Video className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-300 font-bold">Visual & Caption Edit: </strong>
                  <span>{item.visualAndTextChange}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
