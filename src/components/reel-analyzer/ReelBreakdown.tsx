import React from 'react';
import { Clock, Film, Zap, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { TimelineBreakdownSegment } from '../../types';

interface ReelBreakdownProps {
  segments: TimelineBreakdownSegment[];
}

export const ReelBreakdown: React.FC<ReelBreakdownProps> = ({ segments }) => {
  if (!segments || segments.length === 0) return null;

  const getLabelBadgeStyle = (label: string) => {
    const l = label.toUpperCase();
    if (l.includes('HOOK')) {
      return 'bg-amber-400/10 text-amber-400 border-amber-400/30';
    }
    if (l.includes('PACING') || l.includes('DIP')) {
      return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    }
    if (l.includes('SHIFT') || l.includes('VISUAL') || l.includes('PROGRESSION')) {
      return 'bg-blue-400/10 text-blue-400 border-blue-400/30';
    }
    if (l.includes('PAYOFF') || l.includes('CTA') || l.includes('CONCLUSION')) {
      return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30';
    }
    return 'bg-white/10 text-zinc-300 border-white/20';
  };

  const getTagStyle = (tag?: string) => {
    if (!tag) return 'bg-white/5 text-zinc-300 border-white/10';
    if (tag.includes('⚠️')) {
      return 'bg-orange-500/10 text-orange-300 border-orange-500/20';
    }
    if (tag.includes('⚡') || tag.includes('🔥')) {
      return 'bg-amber-400/10 text-amber-300 border-amber-400/20';
    }
    if (tag.includes('👀') || tag.includes('🎯')) {
      return 'bg-indigo-400/10 text-indigo-300 border-indigo-400/20';
    }
    return 'bg-white/5 text-zinc-300 border-white/10';
  };

  return (
    <div id="reel-breakdown-section" className="bg-[#141416] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shadow-inner">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white tracking-tight">Reel Breakdown</h3>
              <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                Timeline Arc
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Chronological breakdown of key moments, attention shifts, and payoff timing
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Segments */}
      <div className="mt-6 space-y-4">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-all group"
          >
            {/* Top row: Timestamp & Label & Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-medium text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{seg.timestampRange}</span>
                </div>
                <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${getLabelBadgeStyle(seg.label)}`}>
                  {seg.label}
                </span>
              </div>

              {seg.tag && (
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${getTagStyle(seg.tag)}`}>
                  {seg.tag}
                </span>
              )}
            </div>

            {/* Content: Observation & Strategic Impact */}
            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  What Elevate AI Saw
                </span>
                <p className="text-zinc-200 leading-relaxed">
                  {seg.observation}
                </p>
              </div>

              {seg.strategicImpact && (
                <div className="pt-2 flex items-start gap-2 text-xs text-zinc-400 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-300">Strategist Note: </span>
                    <span>{seg.strategicImpact}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
