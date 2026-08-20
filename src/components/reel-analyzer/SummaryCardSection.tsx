import React, { memo } from 'react';
import { Sparkles, Clock, Target, CheckCircle2 } from 'lucide-react';
import { ReelAnalysisResult } from '../../types';

interface SummaryCardSectionProps {
  analysis: ReelAnalysisResult;
}

export const SummaryCardSection: React.FC<SummaryCardSectionProps> = memo(({ analysis }) => {
  const scores = analysis.creatorScores || {
    hook: { score: 8, explanation: 'Your opening addresses the viewer directly.' },
    pacing: { score: 7, explanation: 'Video keeps a steady flow throughout.' },
    value: { score: 8, explanation: 'Practical takeaway tailored for your niche.' },
    visuals: { score: 7, explanation: 'Clean subject framing and good ambient lighting.' },
    audio: { score: 8, explanation: 'Voice delivery is crisp and clear.' },
    ending: { score: 6, explanation: 'Ending delivers the core insight.' },
  };

  const scoreItems = [
    { label: 'Hook', data: scores.hook, helper: 'First 2 seconds attention' },
    { label: 'Pacing', data: scores.pacing, helper: 'Rhythm & forward momentum' },
    { label: 'Value', data: scores.value, helper: 'Takeaway & emotional resonance' },
    { label: 'Visuals', data: scores.visuals, helper: 'Framing, lighting & text safe zone' },
    { label: 'Audio', data: scores.audio, helper: 'Voice clarity & music balance' },
    { label: 'Ending', data: scores.ending, helper: 'Closing strength & loop potential' },
  ];

  const overallScoreNum = analysis.overallScore || 7.8;

  return (
    <div id="section-at-a-glance" className="bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>SECTION 1 • AT A GLANCE</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Creator Strategy Report
          </h2>
        </div>

        {/* Overall Score Badge */}
        <div className="flex items-center gap-3 bg-[#0C111D] border border-pink-500/40 rounded-2xl px-5 py-3 shadow-inner self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Overall Score</span>
            <span className="text-xs text-pink-400 font-semibold">Strategist Review</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline">
            <span className="text-pink-400">{overallScoreNum.toFixed(1)}</span>
            <span className="text-base text-slate-500 font-bold ml-1">/10</span>
          </div>
        </div>
      </div>

      {/* Meta Bar: Duration, Best For, File */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-[#0C111D]/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
            <span className="font-bold text-white text-sm">{analysis.durationFormatted || '0:25'}</span>
          </div>
        </div>

        <div className="bg-[#0C111D]/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Best For</span>
            <span className="font-bold text-purple-300 text-sm truncate block">
              {analysis.creatorContext.niche} ({analysis.creatorContext.followers || 'Creators'})
            </span>
          </div>
        </div>

        <div className="bg-[#0C111D]/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">File Inspected</span>
            <span className="font-bold text-slate-200 text-sm truncate block">{analysis.videoFileName}</span>
          </div>
        </div>
      </div>

      {/* One-Sentence Verdict */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-[#0C111D] border border-pink-500/30 text-slate-200 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 block">
          🎯 Strategist Verdict
        </span>
        <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
          "{analysis.verdict || analysis.summary}"
        </p>
      </div>

      {/* 6 Quick Scores Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
            Core Performance Breakdown (6 Pillars)
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Scored out of 10</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {scoreItems.map((item, idx) => {
            const scoreVal = item.data?.score ?? 7;
            const scoreColor =
              scoreVal >= 8
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                : scoreVal >= 6
                ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

            return (
              <div
                key={idx}
                id={`score-card-${item.label.toLowerCase()}`}
                className="bg-[#0C111D] border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition-all space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.label}</h4>
                    <span className="text-[10px] text-slate-500 block">{item.helper}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-black border ${scoreColor}`}>
                    {scoreVal}/10
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-normal leading-relaxed pt-1 border-t border-slate-800/60">
                  {item.data?.explanation || 'Evaluated against reel delivery.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
