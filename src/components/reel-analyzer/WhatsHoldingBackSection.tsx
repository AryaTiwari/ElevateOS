import React, { memo } from 'react';
import { AlertTriangle, Clock, Eye } from 'lucide-react';
import { WhatsHoldingItBackItem } from '../../types';

interface WhatsHoldingBackSectionProps {
  items?: WhatsHoldingItBackItem[];
}

export const WhatsHoldingBackSection: React.FC<WhatsHoldingBackSectionProps> = memo(({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div id="section-whats-holding-back" className="bg-[#101828]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 inline-flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3 h-3" />
            <span>SECTION 3 • WHAT'S HOLDING IT BACK</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            The Main Friction Points Lowering Retention
          </h2>
        </div>
        <span className="text-xs text-amber-300 font-bold bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          Key fixes needed ⚡
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            id={`holding-back-item-${idx + 1}`}
            className="bg-[#0C111D] border border-slate-800/80 hover:border-amber-500/40 p-5 rounded-2xl transition-all space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-white text-sm leading-snug">
                  {item.title}
                </h3>
                {item.timestamp && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold shrink-0 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {item.timestamp}
                  </span>
                )}
              </div>

              {/* What I noticed */}
              <div className="bg-[#101828] p-3 rounded-xl border border-slate-800/60 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-amber-400" />
                  What I noticed in the video
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {item.whatAiNoticed}
                </p>
              </div>
            </div>

            {/* Why it matters */}
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block mb-0.5">
                Why it matters
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.whyItMatters}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
