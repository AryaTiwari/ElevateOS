import React from 'react';
import { Instagram, Sparkles, ArrowUpRight, Flame, Heart, Users } from 'lucide-react';

export function InstagramPromoSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#0C1525] via-[#131F35] to-[#0C1525] border-t border-b border-[#1E293B]">
      {/* Glow Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 blur-[140px] pointer-events-none rounded-full" />
      
      <div className="w-[min(1120px,92%)] mx-auto relative z-10">
        <div className="bg-gradient-to-br from-[#131F35] to-[#0E1624] border border-[#2B3F5E] hover:border-pink-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden transition-all duration-300 text-center">
          
          {/* Floating Emojis */}
          <div className="absolute top-6 left-10 opacity-25 text-3xl select-none animate-bounce pointer-events-none hidden sm:block" style={{ animationDuration: '3s' }}>📸</div>
          <div className="absolute bottom-6 right-10 opacity-25 text-3xl select-none animate-bounce pointer-events-none hidden sm:block" style={{ animationDuration: '4s', animationDelay: '1s' }}>🔥</div>
          <div className="absolute top-1/3 right-8 opacity-25 text-2xl select-none animate-bounce pointer-events-none" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>💬</div>
          <div className="absolute bottom-1/3 left-8 opacity-25 text-2xl select-none animate-bounce pointer-events-none" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>❤️</div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 border border-pink-500/30 text-pink-400 text-xs font-black uppercase tracking-widest mb-6 select-none shadow-lg">
            <Instagram className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>DAILY COMMUNITY UPDATES & GROWTH BLUEPRINTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Join 50,000+ Creators Growing Daily on Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400">@elevate_os_in</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Get daily algorithm teardowns, monetization frameworks, hooks swipe files, and direct founder insights delivered straight to your feed. Stop guessing your content strategy.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 max-w-3xl mx-auto text-left">
            <div className="bg-[#090D16]/60 border border-[#1E293B] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 font-bold">
                ⚡
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Daily Growth Blueprints</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Actionable carousels & video breakdowns</p>
              </div>
            </div>

            <div className="bg-[#090D16]/60 border border-[#1E293B] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 font-bold">
                🎯
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Viral Hook Templates</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Tested hooks that stop the scroll</p>
              </div>
            </div>

            <div className="bg-[#090D16]/60 border border-[#1E293B] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 font-bold">
                💎
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Brand Deal Secrets</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Sponsorship pricing & email scripts</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://instagram.com/elevate_os_in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-orange-500 hover:from-pink-600 hover:via-purple-700 hover:to-orange-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-pink-500/25 inline-flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Follow @elevate_os_in on Instagram</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
