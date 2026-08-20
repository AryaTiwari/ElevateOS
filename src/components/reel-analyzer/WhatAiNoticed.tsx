import React from 'react';

interface WhatAiNoticedProps {
  observations: string[];
  confidence?: 'High' | 'Moderate' | 'Limited';
  confidenceReason?: string;
}

export const WhatAiNoticed: React.FC<WhatAiNoticedProps> = ({
  observations,
  confidence = 'High',
  confidenceReason,
}) => {
  if (!observations || observations.length === 0) return null;

  const confidenceBadgeColors = {
    High: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Moderate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Limited: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  };

  return (
    <div id="what-ai-noticed-section" className="bg-[#141416] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xl shadow-inner">
            <span>👁️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white tracking-tight">What Elevate AI Noticed</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                <span>✨</span>
                <span>Video Inspection</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Specific frame, visual, and timing details detected from your uploaded Reel
            </p>
          </div>
        </div>

        {/* Confidence Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${confidenceBadgeColors[confidence] || confidenceBadgeColors.High}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>Analysis confidence: <strong>{confidence}</strong></span>
          </div>
        </div>
      </div>

      {confidenceReason && (
        <div className="mt-3 text-xs text-zinc-400 flex items-center gap-1.5">
          <span>✅</span>
          <span>{confidenceReason}</span>
        </div>
      )}

      {/* Observations List */}
      <div className="mt-5 space-y-3">
        {observations.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-400/10 text-amber-400 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/20">
              {idx + 1}
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
