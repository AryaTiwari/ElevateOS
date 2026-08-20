import React, { memo } from 'react';
import { Compass, Lightbulb, ArrowUpRight } from 'lucide-react';
import { NextReelIdeaItem } from '../../types';

interface NextReelIdeasSectionProps {
  ideas?: NextReelIdeaItem[];
  niche?: string;
}

export const NextReelIdeasSection: React.FC<NextReelIdeasSectionProps> = memo(({ ideas = [], niche }) => {
  if (!ideas || ideas.length === 0) return null;

  return (
    <div id="section-next-reel-ideas" className="bg-[#101828]/95 border border-sky-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 inline-flex items-center gap-1.5 mb-2">
            <Compass className="w-3 h-3" />
            <span>SECTION 8 • IDEAS FOR YOUR NEXT REEL</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            High-Performing Follow-Up Concepts {niche ? `for ${niche}` : ''}
          </h2>
        </div>
        <span className="text-xs text-sky-300 font-bold bg-sky-950/60 border border-sky-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          Content Momentum 🚀
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea, idx) => (
          <div
            key={idx}
            id={`next-idea-${idx + 1}`}
            className="bg-[#0C111D] border border-slate-800/80 hover:border-sky-500/40 p-5 rounded-2xl transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-white text-base">
                  {idea.title}
                </h3>
              </div>

              <div className="bg-[#101828] p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-sky-400" />
                  Concept Outline
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {idea.concept}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-start gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-sky-300 font-bold">Why it works next: </strong>
                {idea.whyItWorksNext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
