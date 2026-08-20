import React, { memo } from 'react';
import { HookAnalysisReport } from '../../types';

interface HookAnalysisSectionProps {
  hookAnalysis: HookAnalysisReport;
}

export const HookAnalysisSection: React.FC<HookAnalysisSectionProps> = memo(({ hookAnalysis }) => {
  if (!hookAnalysis) return null;

  const scoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 6) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getEmojiForDim = (dim: string) => {
    switch (dim.toLowerCase()) {
      case 'curiosity': return '🤔';
      case 'specificity': return '🎯';
      case 'clarity': return '💡';
      case 'pattern interrupt': return '⚡';
      case 'immediate value': return '💎';
      case 'visual reinforcement': return '👀';
      case 'audio reinforcement': return '🎙️';
      default: return '✨';
    }
  };

  return (
    <div className="bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>⏱️</span>
            <span>FIRST 3-SECOND FORENSICS</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Hook Diagnostics & 7-Dimension Audit
          </h3>
        </div>

        {/* Overall Hook Score Badge */}
        <div className="flex items-center gap-3 bg-[#0C111D] border border-slate-800 px-4 py-2.5 rounded-2xl">
          <span className="text-xs font-bold text-slate-400">Overall Hook Power:</span>
          <span className={`text-lg font-black px-2.5 py-0.5 rounded-xl border ${scoreColor(hookAnalysis.overallHookScore)}`}>
            {hookAnalysis.overallHookScore}/10
          </span>
        </div>
      </div>

      {/* Detected Opening Hook Quote */}
      {hookAnalysis.detectedOpeningHook && (
        <div className="bg-[#0C111D]/90 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs">🎬</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Detected Opening Hook (00:00–00:03)
            </span>
          </div>
          <p className="text-sm font-semibold text-white bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 italic">
            "{hookAnalysis.detectedOpeningHook}"
          </p>
          {hookAnalysis.hookDiagnosis && (
            <p className="text-xs text-pink-300/90 font-medium pt-1">
              <strong className="text-white">Director's Note:</strong> {hookAnalysis.hookDiagnosis}
            </p>
          )}
        </div>
      )}

      {/* 7 Dimensions Grid */}
      {hookAnalysis.dimensions && hookAnalysis.dimensions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            7-Dimension Hook Breakdown & Evidence
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {hookAnalysis.dimensions.map((dim, idx) => (
              <div
                key={idx}
                className="bg-[#0C111D]/80 border border-slate-800/90 hover:border-slate-700 p-4 rounded-2xl space-y-2 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-sm">{getEmojiForDim(dim.dimension)}</span>
                    <span className="text-xs font-bold text-slate-200 truncate">{dim.dimension}</span>
                  </div>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-lg border shrink-0 ${scoreColor(dim.score)}`}>
                    {dim.score}/10
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {dim.justification}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
