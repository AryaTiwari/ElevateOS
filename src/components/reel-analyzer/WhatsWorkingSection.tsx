import React, { memo } from 'react';
import { ThumbsUp, Check, Eye } from 'lucide-react';
import { WhatsWorkingItem } from '../../types';

interface WhatsWorkingSectionProps {
  items?: WhatsWorkingItem[];
}

export const WhatsWorkingSection: React.FC<WhatsWorkingSectionProps> = memo(({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div id="section-whats-working" className="bg-[#101828]/95 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1.5 mb-2">
            <ThumbsUp className="w-3 h-3" />
            <span>SECTION 2 • WHAT'S WORKING</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            The Strongest Elements in Your Reel
          </h2>
        </div>
        <span className="text-xs text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          Keep doing these ✨
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            id={`working-item-${idx + 1}`}
            className="bg-[#0C111D] border border-slate-800/80 hover:border-emerald-500/40 p-5 rounded-2xl transition-all space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <h3 className="font-bold text-white text-sm leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* What the AI noticed */}
              <div className="bg-[#101828] p-3 rounded-xl border border-slate-800/60 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  What the AI noticed
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {item.whatAiNoticed}
                </p>
              </div>
            </div>

            {/* Why it helps */}
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block mb-0.5">
                Why it helps
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.whyItHelps}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
