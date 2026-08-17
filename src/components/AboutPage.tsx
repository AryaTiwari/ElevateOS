import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Target, Heart, Flame, Users, Lightbulb, Compass, Award, Instagram, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { FaqSection } from './FaqSection';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigateToBlueprint: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenBooking,
  onNavigateToBlueprint,
}) => {
  return (
    <div className="w-full space-y-16">
      {/* HEADER HERO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-700 tracking-widest uppercase bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> OUR MISSION & VISION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
          Built for Creators Who <span className="text-blue-600">Want More.</span> 🚀
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Elevate OS was founded to bridge the gap between creative passion and sustainable digital enterprise. We build systemic strategy, positioning, and monetization for creators.
        </p>
      </div>

      {/* WHY ELEVATE OS EXISTS & THE PROBLEM WITH GENERIC ADVICE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
          <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
            ⚠️
          </div>
          <h3 className="text-xl font-black text-slate-900">
            The Problem with Generic Creator Advice
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Most creators are told to "just post more" or "follow the latest trend". But vanity views don't pay bills. Generic advice ignores your unique niche authority, target audience economics, and specific offer structure. This leads to burnout and plateaued growth.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
            🎯
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Why Personalized Strategy Wins
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Top 1% creators don't rely on luck. They run an operating system: strategic 3-second hooks, intentional audience qualification, friction-free DM lead capture, and high-margin monetization. Elevate OS builds that custom engine for you.
          </p>
        </div>
      </div>

      {/* MISSION, VISION & PHILOSOPHY */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-10 shadow-2xl border border-slate-700">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
            THE ELEVATE OS PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Creators Are The Future Digital Economy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3">
            <Compass className="w-6 h-6 text-blue-400" />
            <h4 className="text-base font-black text-white">Our Mission</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              To empower creators to build high-trust personal brands and scalable revenue systems without risking creative burnout.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            <h4 className="text-base font-black text-white">Our Vision</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              To raise a generation of creator-entrepreneurs who own their media channels, community data, and digital products.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3">
            <Award className="w-6 h-6 text-emerald-400" />
            <h4 className="text-base font-black text-white">What Makes Us Different</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              We combine AI-driven content analysis, deep behavioral psychology, and direct 1-on-1 strategic execution.
            </p>
          </div>
        </div>
      </div>

      {/* FOUNDER VISION, LEADERSHIP & MANIFESTO (ARYA TIWARI) */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-indigo-500/40 relative overflow-hidden space-y-10">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-between relative z-10">
          
          {/* Main Founder Column */}
          <div className="space-y-6 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-orange-300 text-xs font-black uppercase tracking-widest shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                FOUNDER'S VISION & LEADERSHIP
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
                <span>🇮🇳</span> Empowering Indian Creators
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Meet <span className="text-slate-100 font-black border-b-2 border-indigo-400/50 pb-0.5">Arya Tiwari</span>
              </h2>
              <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-orange-400 flex items-center gap-2">
                <span>FOUNDER & CEO, ELEVATE OS</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300 font-bold">CONTENT STRATEGIST & SYSTEM BUILDER</span>
              </p>
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-slate-100 leading-snug">
              "Content creators are not just entertainers — they are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-amber-200">future economy</span> of India."
            </h3>

            <div className="p-6 sm:p-8 bg-slate-900/95 border border-indigo-500/30 rounded-3xl space-y-4 relative shadow-xl">
              <span className="text-6xl text-indigo-400/20 font-serif absolute top-2 right-4 select-none">“</span>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic relative z-10">
                "Content creators are shaping how an entire generation thinks, learns, and buys. Every video, story, and hook shifts society. Elevate OS was built to give independent creators an elite operating system — providing the exact hook psychology, retention modeling, and monetization systems needed to build a lasting digital brand."
              </p>
              
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-black text-slate-950 text-base shadow-lg">
                    AT
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white tracking-tight">Arya Tiwari</h4>
                    <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">Founder & Visionary Lead</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://instagram.com/elevate.os.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-pink-500 via-purple-600 to-orange-500 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2.5 shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Connect on Instagram (@elevate.os.in)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-black text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-orange-400" />
                <span>Book 1-on-1 Strategy Session</span>
              </button>
            </div>
          </div>

          {/* Right Card Column: Core Principles */}
          <div className="w-full lg:w-96 bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shrink-0 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-black text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  FOUNDER'S CREATOR MANIFESTO
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2.5 py-0.5 rounded-full border border-orange-500/30">
                  CORE VALUES
                </span>
              </div>

              <ul className="text-xs font-medium text-slate-200 space-y-4">
                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">01</span>
                  <div>
                    <strong className="text-white font-bold block text-sm mb-0.5">Empathetic Mentorship</strong>
                    <span className="text-slate-300">Direct 1-on-1 strategy built with genuine care for creator longevity.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">02</span>
                  <div>
                    <strong className="text-white font-bold block text-sm mb-0.5">Zero-Burnout Workflows</strong>
                    <span className="text-slate-300">Repeatable content systems that protect creative energy and mental health.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">03</span>
                  <div>
                    <strong className="text-white font-bold block text-sm mb-0.5">Creator Sovereignty</strong>
                    <span className="text-slate-300">You own your media assets, community data, and revenue channels.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">04</span>
                  <div>
                    <strong className="text-white font-bold block text-sm mb-0.5">True Cultural Impact</strong>
                    <span className="text-slate-300">Transform raw passion into meaningful, high-trust digital institutions.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4">
              <p className="text-xs text-orange-200 font-semibold italic">
                "We don't build viral flukes. We build enduring digital legacies for creators."
              </p>
              <span className="text-[11px] text-amber-300 font-black uppercase tracking-widest mt-1 block">— Founder, Elevate OS</span>
            </div>
          </div>

        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FaqSection onOpenBooking={onOpenBooking} />

      {/* CALL TO ACTION */}
      <div className="p-8 sm:p-12 bg-blue-600 text-white rounded-3xl text-center space-y-6 shadow-xl">
        <h3 className="text-2xl sm:text-4xl font-black">
          Ready to Elevate Your Creator Journey?
        </h3>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto font-medium">
          Start by calculating your revenue potential or generating your custom 3-Step Growth Blueprint today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            Book Free Strategy Session
          </button>
          <button
            onClick={onNavigateToBlueprint}
            className="w-full sm:w-auto px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white border border-blue-400 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Build Growth Blueprint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
