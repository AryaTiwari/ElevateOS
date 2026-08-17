import React, { useState } from 'react';
import { Sparkles, Flame, Eye, TrendingUp, DollarSign, Zap, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InfluencerFeaturesProps {
  onOpenBooking: () => void;
}

const HOOK_EXAMPLES = [
  {
    category: 'Curiosity Gap',
    hook: 'Stop making this $1,000 mistake on Instagram reels...',
    niche: 'Business / Tech',
    retentionBoost: '+68% Retention'
  },
  {
    category: 'Pattern Interrupt',
    hook: 'Why 99% of creators will fail on social media in 2026...',
    niche: 'Creator Economy',
    retentionBoost: '+84% Retention'
  },
  {
    category: 'Contrarian View',
    hook: 'Posting daily is actually destroying your growth. Do this instead...',
    niche: 'Growth / Personal Branding',
    retentionBoost: '+75% Retention'
  },
  {
    category: 'High Stakes Story',
    hook: 'I analyzed 500 viral reels, and every single one used this 3-step loop...',
    niche: 'Marketing & Content',
    retentionBoost: '+92% Retention'
  }
];

const INFLUENCER_TOOLKIT = [
  {
    icon: '⚡',
    title: '3-Second Viral Hook Architecture',
    tag: 'HOOK ENGINE',
    desc: 'Never lose a viewer in the first 3 seconds again. Use psychological pattern interrupts and curiosity triggers that force viewers to stop scrolling.'
  },
  {
    icon: '🎓',
    title: 'Courses & Product Modelling',
    tag: 'DIGITAL PRODUCTS',
    desc: 'Design, package, and model high-converting digital courses, ebooks, and scalable products tailored directly to monetize your audience.'
  },
  {
    icon: '🔁',
    title: 'Binge-Loop Retention Framework',
    tag: 'ENGAGEMENT',
    desc: 'Structure your Reels and Shorts with open loops and visual pacing that drive average watch times beyond 100% for algorithm velocity.'
  },
  {
    icon: '🚀',
    title: 'Viewers & Lead Boost',
    tag: 'VIEWERS & LEADS',
    desc: 'Turn casual video viewers into qualified leads, subscribers, and high-value clients with automated DM capture and growth funnels.'
  }
];

export const InfluencerFeatures: React.FC<InfluencerFeaturesProps> = ({ onOpenBooking }) => {
  const [selectedHookIndex, setSelectedHookIndex] = useState(0);

  return (
    <section className="py-[70px] md:py-[90px] relative border-t border-[#182234] bg-gradient-to-b from-[#0B0F19] via-[#0D1525] to-[#0B0F19]">
      <div className="w-[min(1120px,92%)] mx-auto">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 border border-[#60A5FA]/30 bg-[#3B82F6]/[0.08] text-[#BFDBFE] rounded-full px-3.5 py-1 text-xs font-bold mb-3 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            HIGH-IMPACT INFLUENCER FEATURES
          </div>
          <h2 className="text-[32px] sm:text-[42px] font-bold text-white tracking-tight">
            Built Specifically for High-Growth Influencers & Creators
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3 leading-relaxed">
            Everything you need to turn casual video views into high retention, loyal community members, and premium monetization.
          </p>
        </motion.div>

        {/* FEATURE MODULE 1: VIRAL HOOK VAULT & RETENTION INTERACTIVE DEMO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* LEFT: INTERACTIVE HOOK PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-[#0E1624] border border-[#24416F] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#60A5FA]" /> VIRAL HOOK VAULT
                </span>
                <span className="text-[10px] font-extrabold bg-[#3B82F6]/20 text-[#93C5FD] px-2.5 py-0.5 rounded-full border border-[#3B82F6]/30">
                  REEL PSYCHOLOGY
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Click a Hook Strategy to See How It Works:
              </h3>
              <p className="text-xs text-[#94A3B8] mb-5">
                These high-converting hook structures are engineered to trigger curiosity in the first 3 seconds.
              </p>

              {/* HOOK CATEGORY TABS */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {HOOK_EXAMPLES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedHookIndex(idx)}
                    className={`p-3 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedHookIndex === idx
                        ? 'bg-[#3B82F6] border-[#3B82F6] text-white shadow-md'
                        : 'bg-[#0B0F19] border-[#1E293B] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] opacity-80 uppercase tracking-wider mb-0.5">{item.niche}</div>
                    <div>{item.category}</div>
                  </button>
                ))}
              </div>

              {/* ACTIVE HOOK CARD PREVIEW */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedHookIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0B0F19] border border-[#3B82F6]/40 p-4 sm:p-5 rounded-2xl relative"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#60A5FA] mb-2">
                    <span>"{HOOK_EXAMPLES[selectedHookIndex].category}" Frame</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {HOOK_EXAMPLES[selectedHookIndex].retentionBoost}
                    </span>
                  </div>

                  <p className="text-white text-sm sm:text-base font-semibold italic leading-relaxed mb-3">
                    "{HOOK_EXAMPLES[selectedHookIndex].hook}"
                  </p>

                  <div className="pt-3 border-t border-[#1E293B] text-xs text-[#94A3B8] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#3B82F6]" /> High Visual Pacing
                    </span>
                    <span className="flex items-center gap-1 text-[#BFDBFE]">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Algorithm Friendly
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E293B]">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 bg-[#3B82F6]/10 border border-[#3B82F6]/40 text-[#BFDBFE] hover:bg-[#3B82F6]/20 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Custom Hook Frameworks in Your 1-on-1 Session <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: INFLUENCER TOOLKIT GRID */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {INFLUENCER_TOOLKIT.map((tool, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.6)' }}
                className="bg-[#0E1624] border border-[#1E293B] p-5 sm:p-6 rounded-3xl flex flex-col justify-between transition-all group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#BFDBFE] uppercase tracking-wider">
                      {tool.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#60A5FA] transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1E293B]/60 flex items-center gap-1.5 text-[11px] font-bold text-[#60A5FA]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA]" /> Included in Growth Roadmap
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM CTA BAR FOR INFLUENCERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0B0F19] border border-[#24416F] rounded-2xl p-6 sm:p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to Upgrade Your Content & Monetization Strategy?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Book a free 1-on-1 Creator Growth Session with our strategist team to analyze your channel bottlenecks.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onOpenBooking}
            className="px-6 py-3.5 bg-[#3B82F6] hover:bg-[#4B8CF7] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#3B82F6]/25 whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 active:translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-[#BFDBFE]" />
            Book Free Strategy Session
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
