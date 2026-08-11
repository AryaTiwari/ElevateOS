import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck, Flame } from 'lucide-react';

export function FounderSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#0C1525]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="w-[min(1120px,92%)] mx-auto relative z-10">
        <div className="bg-gradient-to-br from-[#131F35] to-[#0E1624] border border-[#2B3F5E] hover:border-orange-500/30 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden transition-all duration-300">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest mb-6 select-none shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>FOUNDER'S VISION & MISSION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                "Content creators are not just entertainers — they are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">future economy</span> of India."
              </h2>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Elevate OS was founded by <strong className="text-white font-extrabold border-b border-indigo-400/50">Arya Tiwari</strong> with an unwavering belief: that the upcoming generation of Indian creators, builders, and storytellers will redefine how millions learn, buy, and connect.
                </p>
                <p>
                  Too many brilliant creators struggle with inconsistent algorithms, burnt-out schedules, and missed monetization. Elevate OS was built to provide the exact systems, analytics, and scaling infrastructure required to turn passionate creators into enduring digital institutions.
                </p>
              </div>

              {/* Founder Signature & Title Box */}
              <div className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-black text-white tracking-tight">Arya Tiwari</h4>
                  <p className="text-xs text-orange-400 font-extrabold uppercase tracking-widest mt-0.5">Founder & CEO, Elevate OS</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Card Column */}
            <div className="lg:col-span-5">
              <div className="bg-[#090D16] border border-[#24334D] rounded-3xl p-6 sm:p-8 relative shadow-xl space-y-6">
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  VISION 2030
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                      🇮🇳
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Empowering India's Youth</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Equipping the next generation with world-class digital brand infrastructure.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-[#1E293B] pt-4">
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                      🚀
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">From Hobby to Enterprise</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Transforming raw creative talent into sustainable 7-figure digital businesses.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-[#1E293B] pt-4">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      💡
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Systemized Growth</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Eliminating guesswork through data-driven scorecards and expert mentorship.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4 text-center">
                  <p className="text-xs text-orange-300 font-semibold">
                    "The future belongs to those who build communities of trust and value."
                  </p>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 block">— Founder, Elevate OS</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
