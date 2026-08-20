import React, { memo } from 'react';
import { ContentArchitecture } from '../../types';

interface ContentArchitectureSectionProps {
  architecture: ContentArchitecture;
}

export const ContentArchitectureSection: React.FC<ContentArchitectureSectionProps> = memo(({ architecture }) => {
  if (!architecture) return null;

  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>🏛️</span>
            <span>NARRATIVE & CONVERSION STRATEGY</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Content Architecture & Virality Potential
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Story structure & psychological triggers
        </span>
      </div>

      {/* 4 Pillars: Comment, Share, Save, Loop Potential */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Saves */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
            <span>🔖</span>
            <span className="uppercase text-[10px] tracking-wider">Save Potential</span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {architecture.savePotential}
          </p>
        </div>

        {/* Shares */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 text-pink-300 font-bold text-xs">
            <span>✈️</span>
            <span className="uppercase text-[10px] tracking-wider">Share Potential</span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {architecture.sharePotential}
          </p>
        </div>

        {/* Comments */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs">
            <span>💬</span>
            <span className="uppercase text-[10px] tracking-wider">Comment Potential</span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {architecture.commentPotential}
          </p>
        </div>

        {/* Loop */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs">
            <span>🔄</span>
            <span className="uppercase text-[10px] tracking-wider">Loop Potential</span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {architecture.loopPotential}
          </p>
        </div>
      </div>

      {/* Deep Story & Value Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Core Promise:</span>
            <p className="text-slate-200 font-semibold mt-0.5">{architecture.corePromise}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Viewer Persona:</span>
            <p className="text-slate-300 font-medium mt-0.5">{architecture.targetViewerPersona}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Curiosity Gap:</span>
            <p className="text-slate-300 font-medium mt-0.5">{architecture.curiosityGap}</p>
          </div>
        </div>

        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Storytelling Structure:</span>
            <p className="text-slate-200 font-semibold mt-0.5">{architecture.storytellingStructure}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Payoff Execution:</span>
            <p className="text-slate-300 font-medium mt-0.5">{architecture.payoffExecution}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Call To Action (CTA) Analysis:</span>
            <p className="text-slate-300 font-medium mt-0.5">{architecture.callToActionAnalysis}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
