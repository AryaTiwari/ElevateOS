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

  // Lock background scroll when detail modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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

      <div className="w-[min(1120px,92%)] mx-auto relative z-10 space-y-10">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black tracking-[2px] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            FLAGSHIP CREATOR PROGRAM
          </div>

          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-black leading-[1.08] tracking-[-1.5px] text-slate-900">
            Not an agency. <span className="text-blue-600">A career engine for creators.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            A well-proven system to become the next popular creator. Get a 1-on-1 session with an expert who will solve all your problems regarding content creation and pave a path for you to success and growth.
          </p>
        </motion.div>

        {/* SINGLE FEATURED PROGRAM: CREATOR'S UPGRADE PROGRAM (FLAGSHIP) - COMPACT & PROMINENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-2 border-amber-400/80 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-indigo-500/20 relative overflow-hidden"
        >
          {/* Top highlight gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 animate-pulse" />
          
          {/* Background Glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
            {/* LEFT COLUMN: PROGRAM INFO */}
            <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-2xl p-2 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-xl shrink-0 shadow-md">
                    🌱
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xs">
                      👑 FLAGSHIP 1-ON-1 PROGRAM
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                      Creator's Upgrade Program™
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                  {upgradeProgram.description}
                </p>
              </div>

              {/* KEY DELIVERABLES LIST */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> What You Get In The Upgrade Program:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 font-semibold">
                  {upgradeProgram.extendedDetails?.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-900/90 border border-indigo-500/30 rounded-xl shadow-xs hover:border-amber-400/50 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BUDGET PROMISE BANNER */}
              <div className="p-3 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border border-emerald-500/40 rounded-xl flex items-center gap-2.5 text-xs text-emerald-200 font-medium shadow-xs">
                <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-[11px]">
                  <strong className="text-white font-bold inline mr-1">100% Creator Budget-Adjusted Rates:</strong>
                  <span>Program pricing is dynamically scaled to your channel stage — zero hidden fees.</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ACTION BOX & APPLY CALLOUT */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-5 sm:p-6 rounded-2xl text-white space-y-4 shadow-xl relative overflow-hidden border-2 border-amber-400/50 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                  LIMITED CREATOR SPOTS AVAILABLE
                </div>
                <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                  Ready to upgrade your creator career?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Apply for the Creator's Upgrade Program. We'll review your channel metrics and structure a customized roadmap for your growth.
                </p>
              </div>

              <div className="space-y-2.5 relative z-10 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectService(upgradeProgram)}
                  className="w-full py-3 px-5 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:opacity-95 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider group transform hover:scale-[1.01]"
                >
                  <span>Apply For Upgrade Program</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/15 text-slate-100 font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer text-center"
                >
                  View Full Program Breakdown →
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300 font-semibold relative z-10">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> 1-on-1 Mentorship
                </span>
                <span className="text-amber-300">Tailored Action Blueprint</span>
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
          className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl"
        >
          {/* PROBLEM HEADER */}
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
              <span>⚠️</span>
              <span>THE CREATOR GROWTH BOTTLENECK</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Creators don't need more random advice. They need a system.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Chasing random viral trends and generic tips leads to burnout. True creator longevity comes from mastering three core pillars:
            </p>
          </div>

          {/* 3 CREATOR-FRIENDLY PILLAR CARDS WITH VIBRANT COLORS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-900 border-2 border-blue-500/40 rounded-2xl shadow-lg space-y-3 hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-xl">
                💎
              </div>
              <h4 className="text-sm font-black text-white">
                1. 1-on-1 Expert Problem Solving
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                A 1-on-1 session with an expert who will solve all your problems regarding content creation and pave a path for you to success and growth.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 border-2 border-emerald-500/40 rounded-2xl shadow-lg space-y-3 hover:border-emerald-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl">
                🔥
              </div>
              <h4 className="text-sm font-black text-white">
                2. Content-Enhancing Secrets & Tricks
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Master hook psychology and secret content hacks to perform significantly better than competing and higher creators.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-900 border-2 border-amber-500/40 rounded-2xl shadow-lg space-y-3 hover:border-amber-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl">
                🚀
              </div>
              <h4 className="text-sm font-black text-white">
                3. Well-Proven Growth System
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
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


