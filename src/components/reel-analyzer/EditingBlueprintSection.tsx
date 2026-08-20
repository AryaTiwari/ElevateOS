import React, { memo } from 'react';
import { EditingBlueprintEntry } from '../../types';

interface EditingBlueprintSectionProps {
  blueprint: EditingBlueprintEntry[];
}

export const EditingBlueprintSection: React.FC<EditingBlueprintSectionProps> = memo(({ blueprint }) => {
  if (!blueprint || blueprint.length === 0) return null;

  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>✂️</span>
            <span>TIMELINE EDITING BLUEPRINT</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Second-by-Second Video Edit Plan
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Actionable cuts tailored to your Reel duration
        </span>
      </div>

      {/* Blueprint timeline list */}
      <div className="space-y-3.5">
        {blueprint.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#0C111D]/80 border border-slate-800 hover:border-slate-700 p-4 sm:p-5 rounded-2xl transition-all space-y-3"
          >
            {/* Timestamp Badge */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-xl border border-indigo-500/40">
                ⏱️ {step.timestampRange}
              </span>
            </div>

            {/* Current vs Friction vs Recommended Change */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Current Content
                </span>
                <p className="text-slate-300 font-medium">
                  {step.currentContent}
                </p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                  Identified Friction
                </span>
                <p className="text-slate-300 font-medium">
                  {step.identifiedFriction}
                </p>
              </div>

              <div className="bg-indigo-950/30 p-3 rounded-xl border border-indigo-500/30 space-y-1">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                  Recommended Edit
                </span>
                <p className="text-indigo-200 font-bold">
                  {step.recommendedChange}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
