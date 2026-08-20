import React, { memo } from 'react';
import { ReelAnalysisResult, TrendIntelligenceReport } from '../../types';

interface TrendSignalsProps {
  signals: ReelAnalysisResult['trendSignals'];
  trendIntelligence?: TrendIntelligenceReport;
}

export const TrendSignals: React.FC<TrendSignalsProps> = memo(({ signals, trendIntelligence }) => {
  const signalList = [
    { key: 'niche', ...signals.nicheAlignment },
    { key: 'topic', ...signals.topicRelevance },
    { key: 'signals', ...signals.contentSignals },
  ];

  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1 mb-1.5">
          <span>📈</span>
          <span>ALGORITHM & FORMAT MECHANICS</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Trend Intelligence & Format Signals
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Algorithmic compatibility and evergreen short-form format mechanics.
        </p>
      </div>

      {/* Deep Trend Intelligence Box (if available) */}
      {trendIntelligence && (
        <div className="bg-[#0C111D]/90 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs">🔥</span>
              <span className="text-xs font-black uppercase tracking-wider text-pink-300">
                Recommended Format Archetype: {trendIntelligence.relevantFormatTrend}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-lg">
              {trendIntelligence.usedInThisReel ? '✅ Incorporated in Reel' : '💡 Format Opportunity'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Why It Resonates:</span>
              <p className="text-slate-300 font-medium">{trendIntelligence.whyItIsRelevant}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">How To Adapt Your Reel:</span>
              <p className="text-pink-200/90 font-medium">{trendIntelligence.howToAdapt}</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 border-t border-slate-800/60 pt-2 flex items-center gap-1.5">
            <span>ℹ️</span>
            <span>{trendIntelligence.trendContextStatus}</span>
          </p>
        </div>
      )}

      {/* 3 Trend Signals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {signalList.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0C111D]/80 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                {item.label}
              </span>
              <span className="text-xs font-mono font-black text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-lg">
                {item.score}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
              <span>✅</span>
              <span className="capitalize">{item.status} resonance</span>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed pt-1">
              {item.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

