import React, { memo } from 'react';
import { Sparkles, Film, RotateCcw, ArrowRight, Brain, CheckCircle2 } from 'lucide-react';
import { ReelAnalysisResult } from '../../types';
import { PerformanceInsights } from './PerformanceInsights';
import { WhatAiNoticed } from './WhatAiNoticed';
import { ReelBreakdown } from './ReelBreakdown';
import { ContentDiagnosis } from './ContentDiagnosis';
import { BeforeYouPost } from './BeforeYouPost';
import { PostingIntelligence } from './PostingIntelligence';
import { TrendSignals } from './TrendSignals';

interface AnalysisResultsProps {
  analysis: ReelAnalysisResult;
  onReset: () => void;
  onOpenBooking?: () => void;
  onOpenFlagship?: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = memo(({
  analysis,
  onReset,
  onOpenBooking,
  onOpenFlagship,
}) => {
  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Top Banner / Summary Header */}
      <div className="bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1.5">
              <Brain className="w-3 h-3 text-pink-400" />
              <span>ELEVATE AI REEL REPORT</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Here's What We Found
            </h2>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="self-start sm:self-auto px-4 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
            <span>Analyze Another Reel</span>
          </button>
        </div>

        {/* Video metadata snapshot & summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#0C111D]/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Reel File</span>
            <p className="font-bold text-white truncate">{analysis.videoFileName}</p>
          </div>
          <div className="bg-[#0C111D]/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Niche</span>
            <p className="font-bold text-pink-300">{analysis.creatorContext.niche}</p>
          </div>
          <div className="bg-[#0C111D]/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Followers / Avg Views</span>
            <p className="font-bold text-white">{analysis.creatorContext.followers} • {analysis.creatorContext.averageViews}</p>
          </div>
          <div className="bg-[#0C111D]/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Audience</span>
            <p className="font-bold text-slate-200 truncate">{analysis.creatorContext.targetAudience || 'General Audience'}</p>
          </div>
        </div>

        {/* Short Executive Summary */}
        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed bg-[#0C111D]/60 p-4 rounded-2xl border border-slate-800/80">
          <strong className="text-pink-300 font-bold">Executive Takeaway:</strong> {analysis.summary}
        </p>
      </div>

      {/* 1. PERFORMANCE INSIGHTS */}
      <PerformanceInsights insights={analysis.performanceInsights} />

      {/* 2. WHAT ELEVATE AI NOTICED */}
      {analysis.whatAiNoticed && analysis.whatAiNoticed.length > 0 && (
        <WhatAiNoticed
          observations={analysis.whatAiNoticed}
          confidence={analysis.analysisConfidence || 'High'}
          confidenceReason={analysis.analysisConfidenceReason}
        />
      )}

      {/* 3. REEL BREAKDOWN (TIMELINE-BASED) */}
      {analysis.timelineBreakdown && analysis.timelineBreakdown.length > 0 && (
        <ReelBreakdown segments={analysis.timelineBreakdown} />
      )}

      {/* 4. CONTENT DIAGNOSIS */}
      <ContentDiagnosis
        working={analysis.contentDiagnosis.working}
        couldHurt={analysis.contentDiagnosis.couldHurt}
      />

      {/* 5. BEFORE YOU POST (PRE-PUBLISH CHECKLIST) */}
      <BeforeYouPost actions={analysis.beforeYouPost} />

      {/* 6. POSTING INTELLIGENCE */}
      <PostingIntelligence posting={analysis.postingIntelligence} />

      {/* 7. TREND SIGNALS */}
      <TrendSignals signals={analysis.trendSignals} />

      {/* Bottom CTA / Strategy session connection */}
      <div className="bg-gradient-to-r from-[#0C111D] via-[#1E1B4B] to-[#18112C] border border-pink-500/30 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xl">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Want personalized 1-on-1 feedback on your Reels strategy?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
          Take your content from sporadic views to consistent growth. Book a free 30-minute Strategy Session with our growth specialists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-pink-950/40 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Book Free Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all border border-slate-700 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
            <span>Analyze Another Reel</span>
          </button>
        </div>
      </div>
    </div>
  );
});

