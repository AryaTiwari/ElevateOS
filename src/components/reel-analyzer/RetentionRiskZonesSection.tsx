import React, { memo } from 'react';
import { RetentionRiskZone } from '../../types';

interface RetentionRiskZonesSectionProps {
  riskZones: RetentionRiskZone[];
}

export const RetentionRiskZonesSection: React.FC<RetentionRiskZonesSectionProps> = memo(({ riskZones }) => {
  if (!riskZones || riskZones.length === 0) return null;

  return (
    <div className="bg-[#101828]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>📉</span>
            <span>RETENTION DROP-OFF DANGER ZONES</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Identified Viewer Drop-Off Friction Points
          </h3>
        </div>
        <span className="text-xs font-semibold text-amber-300">
          Targeted micro-cuts to maintain feed momentum
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {riskZones.map((zone, idx) => (
          <div
            key={idx}
            className="bg-[#0C111D]/90 border border-slate-800 hover:border-amber-500/30 p-5 rounded-2xl space-y-3 transition-all"
          >
            {/* Timestamp */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                ⚠️ Risk Zone: {zone.timestamp}
              </span>
            </div>

            {/* What Happens */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Detected Event:
              </span>
              <p className="text-slate-200 font-medium leading-relaxed">
                {zone.whatHappens}
              </p>
            </div>

            {/* Why Attention Drops */}
            <div className="space-y-1 text-xs bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                Why Attention Drops:
              </span>
              <p className="text-rose-200/90 font-medium leading-relaxed">
                {zone.whyAttentionDeclines}
              </p>
            </div>

            {/* Exact Fix */}
            <div className="space-y-1 text-xs bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Specific Edit Solution:
              </span>
              <p className="text-emerald-200 font-bold leading-relaxed">
                {zone.specificEditFix}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
