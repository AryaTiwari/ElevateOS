import React from 'react';
import { Sparkles, Brain, Target, DollarSign, ArrowRight, ShieldCheck, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <div className="w-full space-y-16 md:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-black uppercase tracking-widest shadow-lg shadow-pink-500/10 gpu-layer"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>ELEVATE YOURSELF • CREATOR STUDIO</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] gpu-layer"
        >
          The Operating System <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">of Content Creators.</span> ⚡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto gpu-layer"
        >
          Elevate OS helps creators understand their content, build a smarter growth strategy, and turn attention into income.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 gpu-layer"
        >
          <button
            onClick={() => onNavigate('elevate-ai')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all duration-150 shadow-lg shadow-pink-950/40 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] touch-manipulation"
          >
            <Brain className="w-4 h-4 text-white" />
            <span>Analyze My Content →</span>
          </button>

          <button
            onClick={() => onNavigate('blueprint')}
            className="w-full sm:w-auto px-8 py-4 bg-[#121A2D] hover:bg-[#18233D] text-white border border-slate-700 hover:border-purple-500/60 font-black text-sm uppercase tracking-wider rounded-2xl transition-all duration-150 shadow-lg shadow-black/40 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] touch-manipulation"
          >
            <Target className="w-4 h-4 text-purple-400" />
            <span>Get 7-Day Creator Roadmap →</span>
          </button>
        </motion.div>
      </section>

      {/* 2. QUICK VALUE PROPOSITION (3 CARDS) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-8 bg-[#101828]/95 border border-slate-800 hover:border-pink-500/60 rounded-3xl space-y-3 shadow-xl slippy-touch group">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/15 text-pink-400 border border-pink-500/30 flex items-center justify-center text-2xl font-black">
            🧠
          </div>
          <h3 className="text-xl font-black text-white group-hover:text-pink-400 transition-colors">Understand</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Know exactly what's holding your content back with AI-powered hook, retention, and virality analysis.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-[#101828]/95 border border-slate-800 hover:border-purple-500/60 rounded-3xl space-y-3 shadow-xl slippy-touch group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center text-2xl font-black">
            🚀
          </div>
          <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors">Elevate</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Get personalized strategies built around your creator goals, audience scale, and primary bottleneck.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-[#101828]/95 border border-slate-800 hover:border-emerald-500/60 rounded-3xl space-y-3 shadow-xl slippy-touch group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl font-black">
            💰
          </div>
          <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">Monetize</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Turn your audience into real revenue opportunities through high-converting digital offers and brand deals.
          </p>
        </div>
      </section>

      {/* 3. FEATURED TOOLS ("Your Creator Toolkit") */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-black uppercase text-pink-300 tracking-widest bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
            SUITE OF CREATOR TOOLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
            Your Creator Toolkit 🛠️
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Dedicated AI intelligence tools designed specifically for short-form video creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: ELEVATE AI */}
          <div className="bg-[#101828]/95 border border-slate-800 hover:border-pink-500/60 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between shadow-xl slippy-touch group">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-black uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 text-pink-400" /> Elevate AI
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-pink-400 transition-colors">
                AI Reels Content Analyzer
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Paste your Reel script or video concept. Get instant 10-point retention analysis, curiosity gap scoring, and improved script rewrites.
              </p>
            </div>

            <button
              onClick={() => onNavigate('elevate-ai')}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 mt-4 shadow-md shadow-pink-950/30 slippy-btn"
            >
              <span>Analyze Content</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 2: GROWTH BLUEPRINT */}
          <div className="bg-[#101828]/95 border border-slate-800 hover:border-purple-500/60 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between shadow-xl slippy-touch group">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-purple-400" /> Growth Blueprint
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors">
                7-Day Creator Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Diagnose your main growth bottleneck and generate a tailored 7-day action checklist customized for your niche and audience size.
              </p>
            </div>

            <button
              onClick={() => onNavigate('blueprint')}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 mt-4 shadow-md shadow-purple-950/30 slippy-btn"
            >
              <span>Build My Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 3: REVENUE CALCULATOR */}
          <div className="bg-[#101828]/95 border border-slate-800 hover:border-emerald-500/60 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between shadow-xl slippy-touch group">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Revenue Calculator
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                Creator Revenue Potential
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Calculate estimated monthly opportunity range across brand deals, digital products, services, and affiliate streams for your audience.
              </p>
            </div>

            <button
              onClick={() => onNavigate('revenue')}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 mt-4 shadow-md shadow-emerald-950/30 slippy-btn"
            >
              <span>Calculate Revenue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY ELEVATE OS */}
      <section className="bg-[#101828]/98 border border-slate-800/80 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
            BUILT FOR CREATORS • BUILT WITH PASSION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Your creative journey deserves clarity, peace of mind & real impact.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Stop stressing over algorithm changes or feeling stuck in endless burnout. Elevate OS gives you the tools and confidence to grow your audience and live your creative dream.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Hooks That Stop the Scroll', desc: 'Never stare at a blank screen again. Craft opening lines that grab attention instantly and make people care.' },
            { title: 'A Community That Cares', desc: 'Turn casual scrollers into loyal, passionate followers who truly resonate with your message and story.' },
            { title: 'Monetize Your Passion', desc: 'Turn your creativity into sustainable income without feeling salesy or compromising your true self.' },
            { title: 'Create With Zero Burnout', desc: 'Enjoy a smooth, stress-free workflow that gives you back your energy, time, and joy for creating.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0C111D]/80 border border-slate-800/90 p-5 rounded-2xl space-y-2 hover:border-pink-500/40 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-pink-400" />
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STRATEGY SESSION SPOTLIGHT & CTA */}
      <section className="p-8 sm:p-12 bg-gradient-to-r from-[#0C111D] via-[#1E1B4B] to-[#18112C] text-white rounded-3xl text-center space-y-6 shadow-2xl border border-pink-500/30 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>100% FREE STRATEGY SESSION • NO OBLIGATION</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Get a Personalized 1-on-1 Growth Strategy Session
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Book a complimentary 1-on-1 strategy call with founder Arya Tiwari and the Elevate OS team. We'll diagnose your channel retention, review your hooks, and map out your path to audience growth and monetization.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-300 relative z-10">
          <span className="flex items-center gap-1.5 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free (Zero Sales Pressure)
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live Hook & Retention Audit
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom 7-Day Action Plan
          </span>
        </div>

        <div className="pt-2 relative z-10">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-pink-950/40 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98] touch-manipulation"
          >
            <span>Book Free 1-on-1 Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
