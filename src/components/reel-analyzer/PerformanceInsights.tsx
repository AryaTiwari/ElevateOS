import React, { memo } from 'react';
import { ReelAnalysisResult, PerformanceCategoryAssessment } from '../../types';

interface PerformanceInsightsProps {
  insights: ReelAnalysisResult['performanceInsights'];
  assessment?: PerformanceCategoryAssessment;
}

export const PerformanceInsights: React.FC<PerformanceInsightsProps> = memo(({ insights, assessment }) => {
  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>📊</span>
            <span>METRIC OUTLOOK & BENCHMARK</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Performance Insights & Reach Estimation
          </h3>
        </div>
        {assessment?.potentialPerformanceCategory && (
          <div className="bg-[#0C111D] border border-pink-500/30 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trajectory:</span>
            <span className="text-xs font-black text-pink-300">
              🚀 {assessment.potentialPerformanceCategory}
            </span>
          </div>
        )}
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Your Average */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Your Average
          </span>
          <p className="text-2xl sm:text-3xl font-black text-white">
            {insights.creatorAverage}
          </p>
          <span className="text-[11px] text-slate-400 font-medium block">
            Baseline benchmark
          </span>
        </div>

        {/* Card 2: AI-Estimated Performance */}
        <div className="bg-gradient-to-b from-pink-500/10 to-[#0C111D]/90 border border-pink-500/30 p-4 sm:p-5 rounded-2xl space-y-1.5 shadow-lg shadow-pink-500/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-pink-300 uppercase tracking-wider block">
              AI-Estimated Performance
            </span>
            <span>✨</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-white bg-clip-text text-transparent">
            {insights.aiEstimatedRange}
          </p>
          <span className="text-[11px] text-pink-300/80 font-semibold block">
            Projected standard range
          </span>
        </div>

        {/* Card 3: Potential Upside */}
        <div className="bg-gradient-to-b from-purple-500/10 to-[#0C111D]/90 border border-purple-500/30 p-4 sm:p-5 rounded-2xl space-y-1.5 shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-purple-300 uppercase tracking-wider block">
              Potential Upside
            </span>
            <span>⚡</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-300 via-amber-300 to-white bg-clip-text text-transparent">
            {insights.potentialUpside}
          </p>
          <span className="text-[11px] text-purple-300/80 font-semibold block">
            With key fixes applied
          </span>
        </div>
      </div>

      {/* Explanation Text */}
      {insights.explanation && (
        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed bg-[#0C111D]/60 p-4 rounded-2xl border border-slate-800/80">
          {insights.explanation}
        </p>
      )}

      {/* Performance Factors (if available) */}
      {assessment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {assessment.factorsIncreasingPerformance && assessment.factorsIncreasingPerformance.length > 0 && (
            <div className="bg-[#0C111D]/80 border border-emerald-500/20 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span>📈</span>
                <span>Factors Increasing Reach</span>
              </span>
              <ul className="space-y-1 text-slate-300 font-medium">
                {assessment.factorsIncreasingPerformance.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {assessment.factorsDecreasingPerformance && assessment.factorsDecreasingPerformance.length > 0 && (
            <div className="bg-[#0C111D]/80 border border-rose-500/20 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <span>📉</span>
                <span>Factors Limiting Reach</span>
              </span>
              <ul className="space-y-1 text-slate-300 font-medium">
                {assessment.factorsDecreasingPerformance.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400 mt-0.5">⚠️</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-400 leading-relaxed">
        <span className="shrink-0 mt-0.5">ℹ️</span>
        <span>
          These are AI-based estimates, not guaranteed view counts. Actual performance depends on distribution, viewer behavior, engagement, audience response and platform conditions.
        </span>
      </div>
    </div>
  );
});

