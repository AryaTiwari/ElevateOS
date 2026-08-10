import React, { memo } from 'react';
import { Instagram, Sparkles, ArrowUpRight, Flame, Award, ShieldCheck, Heart } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = memo(({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden bg-white border-t border-b border-slate-200 scroll-mt-24">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-pink-500/10 via-orange-500/10 to-amber-500/10 blur-[50px] pointer-events-none rounded-full gpu-layer" />
      
      <div className="w-[min(1120px,92%)] mx-auto relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-50 via-orange-50 to-amber-50 border border-pink-200 text-pink-700 text-xs font-black uppercase tracking-widest select-none shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>ABOUT ELEVATE OS & FOUNDER VISION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Empowering India's Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-orange-600 to-amber-600">Content Creators</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Elevate OS was founded with a singular mission: to transform passionate content creators into enduring digital institutions and economic leaders.
          </p>
        </div>

        {/* 1. FOUNDER VISION SUB-SECTION */}
        <div className="bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-slate-200 hover:border-orange-300 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
                <span className="text-base select-none">🇮🇳</span> <Flame className="w-3.5 h-3.5 text-amber-600" /> Founder & Visionary
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                "Content creators are not just entertainers — they are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-amber-600">future economy</span> of India and upcoming generations."
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                Founded by <strong className="text-slate-900 font-extrabold underline decoration-orange-500 decoration-2 underline-offset-4">Arya Tiwari</strong>, Elevate OS bridges the gap between raw creative talent and sustainable digital enterprise. Arya believes that the young creators of today will build the brands, media houses, and cultural movements of tomorrow.
              </p>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">Arya Tiwari</h4>
                  <p className="text-xs text-orange-600 font-extrabold uppercase tracking-widest mt-0.5">Founder & CEO, Elevate OS</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold">
                    🇮🇳 Nation-First Vision
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold">
                    🚀 Creator Economy
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="text-[11px] font-black text-orange-600 uppercase tracking-widest">Core Pillars</div>
                <div className="space-y-3 text-xs text-slate-700 font-medium">
                  <div className="flex items-start gap-2.5">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span>Systematic audience retention & algorithmic growth</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span>High-ticket brand monetization & sponsorships</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span>Burnout-free scaling infrastructure for creators</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. INSTAGRAM COMMUNITY SUB-SECTION */}
        <div className="bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 border border-slate-200 hover:border-pink-300 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden transition-all duration-300 text-center gpu-layer">
          {/* Static Ambient Emojis */}
          <div className="absolute top-6 left-10 text-3xl opacity-20 select-none pointer-events-none hidden sm:block">📸</div>
          <div className="absolute top-8 right-12 text-3xl opacity-20 select-none pointer-events-none hidden sm:block">▶️</div>
          <div className="absolute bottom-6 right-10 text-3xl opacity-20 select-none pointer-events-none hidden sm:block">🔥</div>
          <div className="absolute bottom-8 left-12 text-3xl opacity-20 select-none pointer-events-none hidden sm:block">❤️</div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-black uppercase tracking-widest mb-4">
            <Instagram className="w-4 h-4 animate-pulse" />
            <span>DAILY UPDATES & COMMUNITY</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight max-w-2xl mx-auto">
            Connect With Us on Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600">@elevate_os_in</span>
          </h3>

          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed font-medium">
            Join thousands of creators getting daily algorithm teardowns, growth blueprints, and direct tips from Arya Tiwari and the Elevate OS team.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-blue-500/25 inline-flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>📅 Book Free Strategy Session</span>
                <span>🚀</span>
              </button>
            )}
            <a
              href="https://instagram.com/elevate_os_in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-orange-500 hover:from-pink-600 hover:via-purple-700 hover:to-orange-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-pink-500/25 inline-flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>📸 Follow @elevate_os_in</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
