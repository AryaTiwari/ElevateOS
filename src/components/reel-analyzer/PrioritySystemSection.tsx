import React, { memo } from 'react';
import { PriorityRecommendation } from '../../types';

interface PrioritySystemSectionProps {
  recommendations: PriorityRecommendation[];
}

export const PrioritySystemSection: React.FC<PrioritySystemSectionProps> = memo(({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'P0':
        return {
          label: 'P0 • MUST FIX BEFORE POSTING',
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/40',
          emoji: '🚨'
        };
      case 'P1':
        return {
          label: 'P1 • HIGH IMPACT MULTIPLIER',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/40',
          emoji: '⚡'
        };
      default:
        return {
          label: 'P2 • POLISH & OPTIMIZATION',
          color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/40',
          emoji: '✨'
        };
    }
  };

  return (
    <div className="bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>🎯</span>
            <span>STRATEGIC ACTION PRIORITY</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            P0–P2 Priority Fix Stack
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Ranked by algorithmic retention impact
        </span>
      </div>

      {/* Recommendations Stack */}
      <div className="space-y-4">
        {recommendations.map((item, idx) => {
          const badge = getPriorityBadge(item.priority);
          return (
            <div
              key={idx}
              className="bg-[#0C111D]/90 border border-slate-800 hover:border-slate-700 p-5 sm:p-6 rounded-2xl space-y-4 transition-all"
            >
              {/* Top Row: Priority Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 ${badge.color}`}>
                    <span>{badge.emoji}</span>
                    <span>{badge.label}</span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {item.issue}
                </h4>
              </div>

              {/* Grid: Evidence, Exact Fix, Why It Matters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Evidence From Reel */}
                <div className="bg-[#101828]/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <span>👀</span>
                    <span>Evidence From Reel</span>
                  </span>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    {item.evidenceFromReel}
                  </p>
                </div>

                {/* 2. Exact Step-by-Step Fix */}
                <div className="bg-[#101828]/80 p-3.5 rounded-xl border border-pink-500/20 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 flex items-center gap-1">
                    <span>🛠️</span>
                    <span>Exact Director's Fix</span>
                  </span>
                  <p className="text-pink-200 font-semibold leading-relaxed">
                    {item.exactFix}
                  </p>
                </div>

                {/* 3. Why It Matters */}
                <div className="bg-[#101828]/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <span>📈</span>
                    <span>Why It Matters</span>
                  </span>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    {item.whyItMatters}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
