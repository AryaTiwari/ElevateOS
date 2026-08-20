import React, { memo } from 'react';
import { RotateCcw } from 'lucide-react';
import { ReelAnalysisResult } from '../../types';
import { SummaryCardSection } from './SummaryCardSection';
import { WhatsWorkingSection } from './WhatsWorkingSection';
import { WhatsHoldingBackSection } from './WhatsHoldingBackSection';
import { Top3ChangesSection } from './Top3ChangesSection';
import { BetterVersionSection } from './BetterVersionSection';
import { AudioAndEditingSection } from './AudioAndEditingSection';
import { BeforeYouPostChecklistSection } from './BeforeYouPostChecklistSection';
import { NextReelIdeasSection } from './NextReelIdeasSection';
import { PerformanceOutlookSection } from './PerformanceOutlookSection';
import { BestTimeToPostSection } from './BestTimeToPostSection';
import { ElevateCTASection } from './ElevateCTASection';

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
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#101828]/90 border border-slate-800 text-xs shadow-lg backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">Full Video & Audio Inspection Completed</span>
          <span className="text-slate-400 hidden sm:inline">• {analysis.videoFileName}</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Analyze Another Reel</span>
        </button>
      </div>

      {/* 1. AT A GLANCE (SUMMARY CARD & 6 QUICK SCORES) */}
      <SummaryCardSection analysis={analysis} />

      {/* 2. WHAT'S WORKING (THE GOOD STUFF) */}
      <WhatsWorkingSection items={analysis.whatsWorking} />

      {/* 3. WHAT'S HOLDING IT BACK (THE REAL ISSUES) */}
      <WhatsHoldingBackSection items={analysis.whatsHoldingItBack} />

      {/* 4. THE 3 CHANGES I'D MAKE (ACTION PLAN) */}
      <Top3ChangesSection changes={analysis.top3Changes} />

      {/* 5. YOUR BETTER VERSION (THE REWRITE) */}
      <BetterVersionSection betterVersion={analysis.betterVersion} />

      {/* 6. AUDIO & EDITING NOTES */}
      <AudioAndEditingSection notes={analysis.audioAndEditing} />

      {/* 7. BEFORE YOU POST (QUICK CHECKLIST) */}
      <BeforeYouPostChecklistSection checklist={analysis.beforeYouPostChecklist} />

      {/* 8. IDEAS FOR YOUR NEXT REEL */}
      <NextReelIdeasSection ideas={analysis.nextReelIdeas} niche={analysis.creatorContext.niche} />

      {/* 9. REALISTIC PERFORMANCE OUTLOOK */}
      <PerformanceOutlookSection outlook={analysis.performanceOutlook} />

      {/* 10. BEST TIME TO POST (IST) */}
      <BestTimeToPostSection
        posting={analysis.postingIntelligence}
        targetAudience={analysis.creatorContext.targetAudience}
      />

      {/* 11. ELEVATE OS CTA */}
      <ElevateCTASection
        onOpenBooking={onOpenBooking}
        onOpenFlagship={onOpenFlagship}
      />
    </div>
  );
});
