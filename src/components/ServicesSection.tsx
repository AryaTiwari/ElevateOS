import React, { useState, memo } from 'react';
import { SERVICES, WHY_CARDS } from '../data/elevateData';
import { ServiceItem } from '../types';
import { CheckCircle2, Sparkles, ArrowRight, X, HeartHandshake, ShieldCheck, Zap, Target, Brain, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = memo(({ onSelectService }) => {
  const upgradeProgram = SERVICES.find(s => s.id === 'upgrade-program') || SERVICES[0];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="services" className="py-[70px] md:py-[100px] relative border-t border-slate-200 overflow-hidden">
      {/* BACKGROUND ACCENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-400/10 blur-[120px] pointer-events-none rounded-full" />

      {/* FLOATING BACKGROUND EMOJIS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-6 text-2xl select-none animate-pulse pointer-events-none hidden md:block">📸</div>
        <div className="absolute top-20 right-8 text-2xl select-none animate-pulse pointer-events-none hidden md:block">▶️</div>
        <div className="absolute bottom-16 left-12 text-2xl select-none animate-pulse pointer-events-none hidden md:block">❤️</div>
        <div className="absolute bottom-20 right-10 text-2xl select-none animate-pulse pointer-events-none hidden md:block">👥</div>
        <div className="absolute top-1/2 left-4 text-xl select-none animate-pulse pointer-events-none hidden lg:block">👍</div>
        <div className="absolute top-1/2 right-4 text-xl select-none animate-pulse pointer-events-none hidden lg:block">🔥</div>
      </div>

      <div className="w-[min(1120px,92%)] mx-auto relative z-10 space-y-16">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black tracking-[2px] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            FLAGSHIP CREATOR PROGRAM
          </div>

          <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-black leading-[1.05] tracking-[-2px] text-slate-900">
            Not an agency. <span className="text-blue-600">A career engine for creators.</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed font-medium">
            A well-proven system to become the next popular creator. Get a 1-on-1 session with an expert who will solve all your problems regarding content creation and pave a path for you to success and growth.
          </p>
        </motion.div>

        {/* SINGLE FEATURED PROGRAM: CREATOR'S UPGRADE PROGRAM */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border-2 border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-blue-500/10 relative overflow-hidden"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT COLUMN: PROGRAM INFO */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-3xl p-2.5 bg-blue-50 border border-blue-200 rounded-2xl shrink-0">
                  🌱
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-md border border-blue-200">
                    FLAGSHIP 1-ON-1 PROGRAM
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                    Creator's Upgrade Program™
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {upgradeProgram.description}
              </p>

              {/* KEY DELIVERABLES LIST */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                  ✨ What You Get In The Upgrade Program:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-semibold">
                  {upgradeProgram.extendedDetails?.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BUDGET PROMISE BANNER */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 font-medium">
                <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-bold">100% Creator Budget-Adjusted Rates:</strong>
                  <span>Program pricing is dynamically scaled to your current channel stage — zero agency overhead or hidden fees.</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ACTION BOX & APPLY CALLOUT */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 rounded-2xl text-white space-y-6 shadow-xl relative overflow-hidden border border-blue-500/20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-amber-400" />
                  LIMITED CREATOR SPOTS AVAILABLE
                </div>
                <h4 className="text-xl font-black text-white">
                  Ready to upgrade your creator career?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Apply for the Creator's Upgrade Program. We'll review your channel metrics and structure a customized roadmap for your growth.
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <button
                  type="button"
                  onClick={() => onSelectService(upgradeProgram)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:via-indigo-700 hover:to-sky-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider group"
                >
                  <span>Apply For Upgrade Program</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs rounded-xl border border-white/15 transition-all cursor-pointer text-center"
                >
                  View Full Program Breakdown →
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300 font-semibold relative z-10">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> 1-on-1 Mentorship
                </span>
                <span>Tailored Action Blueprint</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* INTEGRATED "THE PROBLEM & SYSTEM SOLUTION" SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 space-y-8"
        >
          {/* PROBLEM HEADER */}
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider">
              <span>⚠️</span>
              <span>THE CREATOR GROWTH BOTTLENECK</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Creators don't need more random advice. They need a system.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Chasing random viral trends and generic tips leads to burnout. True creator longevity comes from mastering three core pillars:
            </p>
          </div>

          {/* 3 CREATOR-FRIENDLY PILLAR CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xl">
                💎
              </div>
              <h4 className="text-sm font-black text-slate-900">
                1. 1-on-1 Expert Problem Solving
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                A 1-on-1 session with an expert who will solve all your problems regarding content creation and pave a path for you to success and growth.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl">
                🔥
              </div>
              <h4 className="text-sm font-black text-slate-900">
                2. Content-Enhancing Secrets & Tricks
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Master hook psychology and secret content hacks to perform significantly better than competing and higher creators.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl">
                🚀
              </div>
              <h4 className="text-sm font-black text-slate-900">
                3. Well-Proven Growth System
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Follow a well-proven system to become the next popular creator and grow higher in today's fierce competitive field.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PROGRAM DETAIL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl p-2 bg-blue-50 border border-blue-200 rounded-2xl">🌱</span>
                <div>
                  <div className="text-[11px] font-black text-blue-600 uppercase tracking-wider">FLAGSHIP PROGRAM</div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Creator's Upgrade Program™</h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                {upgradeProgram.description}
              </p>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-6 text-xs text-emerald-800 flex items-center gap-2 font-medium">
                <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Budget-Friendly: Investment is customized to fit your current channel scale and budget.</span>
              </div>

              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Program Deliverables & Blueprint:</div>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {upgradeProgram.extendedDetails?.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  onSelectService(upgradeProgram);
                }}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all text-center cursor-pointer shadow-lg shadow-blue-500/25"
              >
                Apply Now for Creator's Upgrade Program
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';


