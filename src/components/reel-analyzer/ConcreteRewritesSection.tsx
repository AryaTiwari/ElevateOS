import React, { memo } from 'react';
import { ConcreteRewriteItem } from '../../types';

interface ConcreteRewritesSectionProps {
  rewrites: ConcreteRewriteItem[];
}

export const ConcreteRewritesSection: React.FC<ConcreteRewritesSectionProps> = memo(({ rewrites }) => {
  if (!rewrites || rewrites.length === 0) return null;

  return (
    <div className="bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>✍️</span>
            <span>DIRECTOR'S SCRIPT & VISUAL REWRITES</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Concrete Script, Visual & Text Replacements
          </h3>
        </div>
        <span className="text-xs font-semibold text-pink-300">
          Ready-to-use exact rewrites
        </span>
      </div>

      {/* Rewrite Items Cards */}
      <div className="space-y-6">
        {rewrites.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-[#0C111D]/90 border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  {item.priority || 'P0'}
                </span>
                <span className="text-sm font-black text-white">
                  {item.targetSection}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                ⏱️ {item.timestamp}
              </span>
            </div>

            {/* Current vs Rewrite Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* What was detected */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/90 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <span>❌</span>
                  <span className="uppercase text-[10px] tracking-wider">Current Detected</span>
                </div>
                <p className="text-slate-300 font-medium italic">
                  "{item.currentDetected}"
                </p>
                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Problem Identified:</span>
                  <p className="text-slate-400 font-normal mt-0.5">{item.problemIdentified}</p>
                </div>
              </div>

              {/* The Rewrite */}
              <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span>✨</span>
                  <span className="uppercase text-[10px] tracking-wider">Concrete Script Rewrite</span>
                </div>
                <p className="text-emerald-200 font-bold leading-relaxed">
                  "{item.concreteRewrite}"
                </p>
                <div className="pt-2 border-t border-emerald-500/20">
                  <span className="text-[10px] font-bold text-emerald-400 block uppercase">Why It Converts:</span>
                  <p className="text-emerald-300/90 font-normal mt-0.5">{item.whyItMatters}</p>
                </div>
              </div>
            </div>

            {/* Visual & On-Screen Text Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="bg-[#101828]/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
                  <span>🎥</span>
                  <span>Exact Visual Framing & Cut</span>
                </span>
                <p className="text-slate-200 font-medium">
                  {item.visualChange}
                </p>
              </div>

              <div className="bg-[#101828]/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <span>💬</span>
                  <span>Exact On-Screen Text & Placement</span>
                </span>
                <p className="text-slate-200 font-medium">
                  {item.onScreenText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
