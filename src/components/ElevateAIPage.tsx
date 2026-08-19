import React from 'react';
import { ReelAnalyzer } from './reel-analyzer/ReelAnalyzer';
import { Sparkles, Brain, Flame, TrendingUp, Lightbulb, Bookmark, Share2, Target, ShieldCheck, ArrowRight, BookOpen, Film } from 'lucide-react';
import { motion } from 'motion/react';

interface ElevateAIPageProps {
  onOpenBooking: () => void;
  onOpenFlagship: () => void;
  onNavigateToBlueprint: () => void;
}

export const ElevateAIPage: React.FC<ElevateAIPageProps> = ({
  onOpenBooking,
  onOpenFlagship,
  onNavigateToBlueprint,
}) => {
  return (
    <div className="w-full space-y-16">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-pink-300 tracking-widest uppercase bg-pink-500/10 border border-pink-500/30 px-3.5 py-1.5 rounded-full shadow-sm">
          <Brain className="w-3.5 h-3.5 text-pink-400" /> ELEVATE AI
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
          Reel <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">Analyzer.</span> 🎬⚡
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
          Understand what your Reel is doing well, what could hold it back, and what to change before you post.
        </p>
      </div>

      {/* PRIMARY REEL ANALYZER COMPONENT */}
      <ReelAnalyzer
        onOpenBooking={onOpenBooking}
        onOpenFlagship={onOpenFlagship}
      />

      {/* EDUCATIONAL SECTION: "How Elevate AI thinks" */}
      <div className="bg-[#101828]/95 backdrop-blur-2xl text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl border border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-pink-400" /> TRANSPARENT CREATOR INTELLIGENCE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            How Elevate AI Evaluates Your Reels
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Elevate AI doesn't give random scores. It evaluates your short-form video against core viral retention, visual structure, and engagement factors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: '1. Hook Architecture', icon: Flame, desc: 'Evaluates the 0–3 second pattern interrupt, visual momentum, and curiosity trigger.' },
            { name: '2. Retention Pacing', icon: TrendingUp, desc: 'Scans for mid-video drop-off risks, open loops, and visual re-engagement.' },
            { name: '3. Value Density', icon: Lightbulb, desc: 'Measures actionable insight per second vs fluff or dead air in the delivery.' },
            { name: '4. Shareability Factor', icon: Share2, desc: 'Checks if the topic triggers viewers to tag a friend, share in DMs, or repost.' },
            { name: '5. Saveability Potential', icon: Bookmark, desc: 'Identifies high-utility reference value that makes viewers bookmark for later.' },
            { name: '6. Visual & Text Safe Zones', icon: Film, desc: 'Verifies subtitle legibility and ensures text is not blocked by Instagram UI.' },
            { name: '7. Script & Audio Clarity', icon: BookOpen, desc: 'Ensures clear voice delivery, crisp articulation, and zero cognitive friction.' },
            { name: '8. Interaction Trigger (CTA)', icon: Target, desc: 'Evaluates comment triggers, DM keyword prompts, or community actions.' },
            { name: '9. Niche & Trend Fit', icon: ShieldCheck, desc: 'Analyzes compatibility with current short-form video algorithms and audience expectations.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0C111D]/90 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-pink-500/50 transition-all">
              <item.icon className="w-5 h-5 text-pink-400" />
              <h4 className="text-sm font-black text-white">{item.name}</h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA: BUILD MY GROWTH BLUEPRINT */}
      <div className="p-8 sm:p-12 bg-gradient-to-r from-[#0C111D] via-[#1E1B4B] to-[#18112C] text-white rounded-3xl text-center space-y-4 shadow-2xl border border-pink-500/30">
        <h3 className="text-2xl sm:text-3xl font-black">
          Want a complete creator growth roadmap?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
          Reel analysis is step one. Combine AI content feedback with a personalized 7-day creator growth roadmap.
        </p>
        <div className="pt-2">
          <button
            onClick={onNavigateToBlueprint}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-pink-950/40 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <span>Get 7-Day Creator Roadmap</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

