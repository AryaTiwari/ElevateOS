import React, { memo } from 'react';
import { Sparkles, CheckCircle, ShieldCheck, Sprout, BarChart3, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenFlagship: () => void;
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = memo(({ onOpenBooking, onOpenFlagship, onOpenAudit }) => {
  const handleScrollToCreatorScore = () => {
    const el = document.getElementById('creator-score-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Atmospheric Background Glows */}
      <div
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[580px] h-[580px] bg-pink-500/10 rounded-full blur-[80px] pointer-events-none animate-float-orb gpu-layer"
        style={{ willChange: 'transform' }}
      />
      <div className="absolute bottom-[-100px] right-[-100px] w-[380px] h-[380px] bg-purple-500/10 rounded-full blur-[70px] pointer-events-none gpu-layer" />

      {/* FLOATING BACKGROUND CREATOR BADGES - GPU Accelerated CSS Keyframes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 gpu-layer">
        {/* Floating Item 1: Top-Left Instagram & Followers */}
        <div
          style={{ willChange: 'transform' }}
          className="absolute top-12 left-4 md:left-12 lg:left-20 bg-[#101828]/95 border border-pink-500/30 shadow-2xl shadow-pink-500/10 rounded-2xl p-2.5 px-3.5 hidden sm:flex items-center gap-2.5 select-none animate-float-a gpu-layer"
        >
          <span className="text-xl">📸</span>
          <div className="text-left">
            <div className="text-[10px] font-black text-pink-400 uppercase tracking-wider">Instagram Reel</div>
            <div className="text-xs font-black text-white flex items-center gap-1">
              <span>👥 150K</span>
              <span className="text-slate-400 font-normal">followers</span>
            </div>
          </div>
        </div>

        {/* Floating Item 2: Top-Right YouTube & Likes */}
        <div
          style={{ willChange: 'transform', animationDelay: '-1.5s' }}
          className="absolute top-16 right-4 md:right-12 lg:right-20 bg-[#101828]/95 border border-red-500/30 shadow-2xl shadow-red-500/10 rounded-2xl p-2.5 px-3.5 hidden sm:flex items-center gap-2.5 select-none animate-float-b gpu-layer"
        >
          <span className="text-xl">▶️</span>
          <div className="text-left">
            <div className="text-[10px] font-black text-red-400 uppercase tracking-wider">YouTube Channel</div>
            <div className="text-xs font-black text-white flex items-center gap-1">
              <span>❤️ 85.4K</span>
              <span className="text-slate-400 font-normal">likes</span>
            </div>
          </div>
        </div>

        {/* Floating Item 3: Middle-Left Likes & Engagement */}
        <div
          style={{ willChange: 'transform', animationDelay: '-2.4s' }}
          className="absolute top-1/2 -translate-y-1/2 left-2 md:left-8 lg:left-16 bg-[#101828]/95 border border-rose-500/30 shadow-xl rounded-2xl p-2 px-3 hidden lg:flex items-center gap-2 select-none animate-float-c gpu-layer"
        >
          <span className="text-lg">💖</span>
          <span className="text-xs font-bold text-slate-200">👍 24.8K Likes</span>
          <span className="text-[10px] bg-rose-500/20 text-rose-300 font-black px-1.5 py-0.5 rounded-full border border-rose-500/30">🔥 Viral</span>
        </div>

        {/* Floating Item 4: Middle-Right Followers & Subscribers */}
        <div
          style={{ willChange: 'transform', animationDelay: '-3.8s' }}
          className="absolute top-1/2 -translate-y-1/2 right-2 md:right-8 lg:right-16 bg-[#101828]/95 border border-purple-500/30 shadow-xl rounded-2xl p-2 px-3 hidden lg:flex items-center gap-2 select-none animate-float-a gpu-layer"
        >
          <span className="text-lg">👥</span>
          <span className="text-xs font-bold text-slate-200">🚀 +50K New Followers</span>
        </div>

        {/* Scattered Ambient Floating Emojis */}
        <div
          style={{ willChange: 'transform' }}
          className="absolute top-1/3 left-[15%] text-2xl select-none hidden md:block animate-float-a gpu-layer opacity-60"
        >
          ❤️
        </div>

        <div
          style={{ willChange: 'transform', animationDelay: '-1.2s' }}
          className="absolute top-1/4 right-[16%] text-2xl select-none hidden md:block animate-float-b gpu-layer opacity-60"
        >
          📹
        </div>

        <div
          style={{ willChange: 'transform', animationDelay: '-2.6s' }}
          className="absolute bottom-20 left-[10%] text-2xl select-none hidden md:block animate-float-c gpu-layer opacity-50"
        >
          👍
        </div>

        <div
          style={{ willChange: 'transform', animationDelay: '-0.8s' }}
          className="absolute bottom-24 right-[12%] text-2xl select-none hidden md:block animate-float-b gpu-layer opacity-50"
        >
          💬
        </div>
      </div>


      <div className="w-[min(1120px,92%)] mx-auto relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* TOP PILL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 text-[10px] font-black uppercase tracking-widest mb-6 select-none shadow-lg shadow-pink-500/10 gpu-layer"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400 mr-1.5 animate-pulse" />
            🔥 ATTENTION CREATORS: STOP WASTING 80% OF YOUR VIEWS ✨
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[0.9] font-black tracking-tighter text-white mb-6 max-w-3xl gpu-layer"
          >
            The <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent inline-block">Operating System</span> for Content Creators & Influencers.
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-5 font-medium gpu-layer"
          >
            Stop guessing the algorithm. Get a 1-on-1 session with an expert who solves your content creation problems, unlocks viral retention tricks, and paves your path to success and growth — with rates tailored 100% to your budget.
          </motion.p>

          {/* BUDGET TRUST PILL */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-8 select-none shadow-sm gpu-layer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>⚡ 100% Creator-Budget Friendly • 1-on-1 Expert Guidance to Success & Growth 🚀</span>
          </motion.div>

          {/* TWO MAIN CTA BUTTONS (WITH GRAPHICS) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center gpu-layer"
          >
            {/* BUTTON 1: FREE STRATEGY SESSION (3D SOLID GREEN) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-4 font-black text-xs uppercase tracking-wider text-white bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 border-b-[4px] border-b-emerald-700 rounded-2xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 cursor-pointer relative overflow-hidden group active:translate-y-0.5"
              id="hero-free-session-btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Sprout className="w-4 h-4 text-emerald-100 shrink-0" />
              <span>Free Strategy Session</span>
              <ChevronRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* BUTTON 2: FREE CONTENT DIAGNOSIS (3D SOLID PINK/PURPLE STUDIO) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              onClick={onOpenAudit}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 border-2 border-purple-500 border-b-[4px] border-b-purple-800 px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-3.5 cursor-pointer shadow-lg shadow-purple-500/25 group relative overflow-hidden active:translate-y-0.5"
              id="hero-content-diagnosis-btn"
            >
              {/* Graphical visualizer component with cool graphics */}
              <div className="flex items-end gap-[2px] h-3.5 shrink-0 select-none pb-[1px]">
                <span className="w-[3px] bg-pink-300 rounded-sm animate-pulse" style={{ height: '60%', animationDelay: '0ms', animationDuration: '1.2s' }} />
                <span className="w-[3px] bg-purple-200 rounded-sm animate-pulse" style={{ height: '100%', animationDelay: '200ms', animationDuration: '1.2s' }} />
                <span className="w-[3px] bg-amber-300 rounded-sm animate-pulse" style={{ height: '80%', animationDelay: '400ms', animationDuration: '1.2s' }} />
              </div>
              <span>Free Content Diagnosis 🔍</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-200 group-hover:rotate-12 transition-transform animate-pulse" />
            </motion.button>
          </motion.div>

          {/* THREE HORIZONTAL SLEEK CARDS FOR MODULE DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-16 text-left"
          >
            {/* Module 01 */}
            <div className="bg-[#101828]/90 backdrop-blur-xl border border-slate-800 hover:border-pink-500/60 p-5 rounded-2xl transition-all cursor-default group relative overflow-hidden shadow-xl hover:shadow-pink-500/10 gpu-layer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 text-xs font-black shrink-0 border border-pink-500/30">01</span>
                <h3 className="font-extrabold text-sm text-white group-hover:text-pink-400 transition-colors">1-on-1 Expert Guidance 💎</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Get a dedicated 1-on-1 session with an expert who will solve all your content creation problems and pave a path to success and growth.</p>
            </div>

            {/* Module 02 */}
            <div className="bg-[#101828]/90 backdrop-blur-xl border border-slate-800 hover:border-purple-500/60 p-5 rounded-2xl transition-all cursor-default group relative overflow-hidden shadow-xl hover:shadow-purple-500/10 gpu-layer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-black shrink-0 border border-purple-500/30">02</span>
                <h3 className="font-extrabold text-sm text-white group-hover:text-purple-400 transition-colors">Content Secrets & Hacks 🔥</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Master hook psychology and secret formatting tricks to perform significantly better than competing creators.</p>
            </div>

            {/* Module 03 */}
            <div className="bg-[#101828]/90 backdrop-blur-xl border border-slate-800 hover:border-amber-500/60 p-5 rounded-2xl transition-all cursor-default group relative overflow-hidden shadow-xl hover:shadow-amber-500/10 gpu-layer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-black shrink-0 border border-amber-500/30">03</span>
                <h3 className="font-extrabold text-sm text-white group-hover:text-amber-400 transition-colors">Well-Proven Growth Engine 🚀</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Follow a well-proven growth system to become the next popular creator in today's fiercely competitive field.</p>
            </div>
          </motion.div>

        </div>

        {/* STATUS BAR & FEATURE BADGES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-14 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-center gap-2 text-xs font-extrabold text-pink-400">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span className="uppercase tracking-wider">FOUNDER-LED CREATOR STRATEGY ENGINE</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-pink-400" /> Content Psychology</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> Brand Positioning</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400" /> Monetization Architecture</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
