import React, { memo } from 'react';
import { CheckSquare, ArrowRight, AlertCircle, Sparkles, Lightbulb } from 'lucide-react';
import { BeforeYouPostAction } from '../../types';

interface BeforeYouPostProps {
  actions: BeforeYouPostAction[];
}

export const BeforeYouPost: React.FC<BeforeYouPostProps> = memo(({ actions }) => {
  return (
    <div className="bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1 mb-1.5">
          <CheckSquare className="w-3 h-3 text-pink-400" />
          <span>PRE-PUBLISH CHECKLIST</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Before You Post
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Make these key adjustments before hitting publish to maximize initial algorithmic velocity and retention.
        </p>
      </div>

      {/* Action List */}
      <div className="space-y-4">
        {actions.map((item) => (
          <div
            key={item.id || item.number}
            className="bg-[#0C111D]/90 border border-slate-800 hover:border-pink-500/40 p-5 rounded-2xl space-y-3 transition-all"
          >
            {/* Header: Number & Title */}
            <div className="flex items-start gap-3">
              <span className="text-sm font-black text-pink-400 font-mono bg-pink-500/10 border border-pink-500/30 px-2.5 py-1 rounded-xl shrink-0">
                {item.number}
              </span>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </div>

            {/* Detected Issue (if present) */}
            {item.detectedIssue && (
              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl text-[11px] text-amber-300 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-black text-amber-200">Detected issue:</strong> {item.detectedIssue}
                </span>
              </div>
            )}

            {/* Suggested Improvement / Try This */}
            <div className="flex items-start gap-2 bg-pink-500/10 border border-pink-500/30 px-3.5 py-2.5 rounded-xl text-xs text-pink-200 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
              <span>
                <strong className="font-black text-white uppercase tracking-wider text-[10px] mr-1.5">TRY THIS:</strong>
                {item.suggestedFix}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
