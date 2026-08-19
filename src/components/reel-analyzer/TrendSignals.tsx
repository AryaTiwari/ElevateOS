import React, { memo } from 'react';
import { Compass, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { ReelAnalysisResult } from '../../types';

interface TrendSignalsProps {
  signals: ReelAnalysisResult['trendSignals'];
}

export const TrendSignals: React.FC<TrendSignalsProps> = memo(({ signals }) => {
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
          <Compass className="w-3 h-3 text-pink-400" />
          <span>ALGORITHM & PATTERNS</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Trend Signals
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Algorithmic compatibility and search intent signals based on recent audience behavior.
        </p>
      </div>

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
              <CheckCircle2 className="w-3.5 h-3.5" />
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
