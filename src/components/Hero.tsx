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
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[60px] pointer-events-none animate-smooth-pulse gpu-layer"
        style={{ animationDuration: '8s', willChange: 'transform, opacity' }}
      />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[50px] pointer-events-none gpu-layer"></div>

      {/* FLOATING BACKGROUND CREATOR BADGES - GPU Accelerated CSS Keyframes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 gpu-layer">
        {/* Floating Item 1: Top-Left Instagram & Followers */}
        <div
          style={{ animationDuration: '6s', willChange: 'transform' }}
          className="absolute top-12 left-4 md:left-12 lg:left-20 bg-white/95 border border-pink-200/90 shadow-lg shadow-pink-500/5 rounded-2xl p-2.5 px-3.5 hidden sm:flex items-center gap-2.5 select-none animate-smooth-float gpu-layer"
        >
          <span className="text-xl">📸</span>
          <div className="text-left">
            <div className="text-[10px] font-black text-pink-600 uppercase tracking-wider">Instagram Reel</div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-1">
              <span>👥 150K</span>
              <span className="text-slate-500 font-normal">followers</span>
            </div>
          </div>
        </div>

        {/* Floating Item 2: Top-Right YouTube & Likes */}
        <div
          style={{ animationDuration: '7s', animationDelay: '0.8s', willChange: 'transform' }}
          className="absolute top-16 right-4 md:right-12 lg:right-20 bg-white/95 border border-red-200/90 shadow-lg shadow-red-500/5 rounded-2xl p-2.5 px-3.5 hidden sm:flex items-center gap-2.5 select-none animate-smooth-float gpu-layer"
        >
          <span className="text-xl">▶️</span>
          <div className="text-left">
            <div className="text-[10px] font-black text-red-600 uppercase tracking-wider">YouTube Channel</div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-1">
              <span>❤️ 85.4K</span>
              <span className="text-slate-500 font-normal">likes</span>
            </div>
          </div>
        </div>

        {/* Floating Item 3: Middle-Left Likes & Engagement */}
        <div
          style={{ animationDuration: '6.5s', animationDelay: '1.2s', willChange: 'transform' }}
          className="absolute top-1/2 -translate-y-1/2 left-2 md:left-8 lg:left-16 bg-white/95 border border-rose-200/90 shadow-md rounded-2xl p-2 px-3 hidden lg:flex items-center gap-2 select-none animate-smooth-float gpu-layer"
        >
          <span className="text-lg">💖</span>
          <span className="text-xs font-bold text-slate-800">👍 24.8K Likes</span>
          <span className="text-[10px] bg-rose-100 text-rose-700 font-black px-1.5 py-0.5 rounded-full">🔥 Viral</span>
        </div>

        {/* Floating Item 4: Middle-Right Followers & Subscribers */}
        <div
          style={{ animationDuration: '7.5s', animationDelay: '1.8s', willChange: 'transform' }}
          className="absolute top-1/2 -translate-y-1/2 right-2 md:right-8 lg:right-16 bg-white/95 border border-blue-200/90 shadow-md rounded-2xl p-2 px-3 hidden lg:flex items-center gap-2 select-none animate-smooth-float gpu-layer"
        >
          <span className="text-lg">👥</span>
          <span className="text-xs font-bold text-slate-800">🚀 +50K New Followers</span>
        </div>

        {/* Scattered Ambient Floating Emojis */}
        <div
          style={{ animationDuration: '5s', willChange: 'transform' }}
          className="absolute top-1/3 left-[15%] text-2xl select-none hidden md:block animate-smooth-float gpu-layer opacity-70"
        >
          ❤️
        </div>

        <div
          style={{ animationDuration: '6.2s', animationDelay: '0.8s', willChange: 'transform' }}
          className="absolute top-1/4 right-[16%] text-2xl select-none hidden md:block animate-smooth-float gpu-layer opacity-70"
        >
          📹
        </div>

        <div
          style={{ animationDuration: '5.8s', animationDelay: '1.2s', willChange: 'transform' }}
          className="absolute bottom-20 left-[10%] text-2xl select-none hidden md:block animate-smooth-float gpu-layer opacity-60"
        >
          👍
        </div>

        <div
          style={{ animationDuration: '6.8s', animationDelay: '0.4s', willChange: 'transform' }}
          className="absolute bottom-24 right-[12%] text-2xl select-none hidden md:block animate-smooth-float gpu-layer opacity-60"
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
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6 select-none shadow-sm gpu-layer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 mr-1.5 animate-pulse" />
            🔥 ATTENTION CREATORS: STOP WASTING 80% OF YOUR VIEWS ✨
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[0.9] font-black tracking-tighter text-slate-900 mb-6 max-w-3xl gpu-layer"
          >
            The <span className="text-blue-600 inline-block">Operating System</span> for Content Creators & Influencers.
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-5 font-medium gpu-layer"
          >
            Stop guessing the algorithm. Get a 1-on-1 session with an expert who solves your content creation problems, unlocks viral retention tricks, and paves your path to success and growth — with rates tailored 100% to your budget.
          </motion.p>

          {/* BUDGET TRUST PILL */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-8 select-none shadow-sm gpu-layer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97, y: 2 }}
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-4 font-black text-xs uppercase tracking-wider text-white bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 border-b-[5px] border-b-emerald-700 rounded-2xl transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2.5 cursor-pointer relative overflow-hidden group active:border-b-2"
              id="hero-free-session-btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Sprout className="w-4 h-4 text-emerald-100 shrink-0" />
              <span>Free Strategy Session</span>
              <ChevronRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* BUTTON 2: FREE CONTENT DIAGNOSIS (3D SOLID BLUE) */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97, y: 2 }}
              onClick={onOpenAudit}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 border-b-[5px] border-b-blue-800 px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-3.5 cursor-pointer shadow-xl shadow-blue-500/30 group relative overflow-hidden active:border-b-2"
              id="hero-content-diagnosis-btn"
            >
              {/* Graphical visualizer component with cool graphics */}
              <div className="flex items-end gap-[2px] h-3.5 shrink-0 select-none pb-[1px]">
                <span className="w-[3px] bg-white rounded-sm animate-pulse" style={{ height: '60%', animationDelay: '0ms', animationDuration: '1.2s' }} />
                <span className="w-[3px] bg-blue-200 rounded-sm animate-pulse" style={{ height: '100%', animationDelay: '200ms', animationDuration: '1.2s' }} />
                <span className="w-[3px] bg-sky-200 rounded-sm animate-pulse" style={{ height: '80%', animationDelay: '400ms', animationDuration: '1.2s' }} />
              </div>
              <span>Free Content Diagnosis 🔍</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-200 group-hover:rotate-12 transition-transform animate-pulse" />
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
            <div className="bg-white border-2 border-slate-200/90 hover:border-blue-500/80 p-5 rounded-2xl transition-all cursor-default group relative overflow-hidden shadow-md hover:shadow-xl gpu-layer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-black shrink-0">01</span>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">1-on-1 Expert Guidance 💎</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">Get a dedicated 1-on-1 session with an expert who will solve all your content creation problems and pave a path to success and growth.</p>
            </div>

            {/* Module 02 */}
            <div className="bg-white border-2 border-slate-200/90 hover:border-blue-500/80 p-5 rounded-2xl transition-all cursor-default group relative overflow-hidden shadow-md hover:shadow-xl gpu-layer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-black shrink-0">02</span>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Content Secrets & Hacks 🔥</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">Master hook psychology and secret formatting tricks to perform significantly better than competing creators.</p>
            </div>

            {/* Module 03 */}
            <div className="bg-white border-2 border-slate-200/90 hover:border-blue-500/80 p-5 rounded-2xl transition-all cursor-default group relative overflow-hidden shadow-md hover:shadow-xl gpu-layer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-black shrink-0">03</span>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Well-Proven Growth Engine 🚀</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">Follow a well-proven growth system to become the next popular creator in today's fiercely competitive field.</p>
            </div>
          </motion.div>

        </div>

        {/* STATUS BAR & FEATURE BADGES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="uppercase tracking-wider">FOUNDER-LED CREATOR STRATEGY ENGINE</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-600 font-semibold">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Content Psychology</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Brand Positioning</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Monetization Architecture</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
