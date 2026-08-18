import React, { useState, memo } from 'react';
import { ChevronDown, HelpCircle, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'program' | 'fit';
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'pricing-budget',
    question: 'How are program rates calculated, and is it really budget-adjusted?',
    answer: 'Yes! Unlike traditional agencies with fixed corporate retainers, our rates are dynamically adjusted based on your current channel scale, monetization level, and creator budget. We value creator growth above everything else — our goal is to help you build a sustainable career without financial stress.',
    category: 'pricing'
  },
  {
    id: 'agency-difference',
    question: 'Are you a digital marketing agency?',
    answer: 'No. We are not a digital marketing agency selling generic social media management packages. Elevate OS is a dedicated creator acceleration platform and 1-on-1 mentorship tool built specifically to help creators master content psychology, audience retention, and career independence.',
    category: 'fit'
  },
  {
    id: 'follower-requirements',
    question: 'Do I need a large following or existing income to participate?',
    answer: 'Not at all. We work with ambitious creators at all stages — whether you have 500 followers looking for your first breakthrough or 100k+ followers seeking structured high-margin monetization. What matters most is your dedication to content quality and growth.',
    category: 'fit'
  },
  {
    id: 'time-commitment',
    question: 'How much time do I need to commit each week?',
    answer: 'The program is designed around active creator workflows. Expect about 2-3 hours per week for 1-on-1 strategy sessions, hook script reviews, and channel audits, plus your regular content creation schedule. Everything is structured to save you time by eliminating trial-and-error.',
    category: 'program'
  },
  {
    id: 'program-deliverables',
    question: 'What is included in the 1-on-1 Creator Upgrade Program™?',
    answer: 'You get a full 1-on-1 channel retention audit, personalized hook & storytelling psychology engines, niche positioning blueprints, sponsor pitch decks, and a 30-60-90 day execution roadmap with direct founder-level guidance.',
    category: 'program'
  },
  {
    id: 'next-steps',
    question: 'What happens after I submit a strategy session request?',
    answer: 'Our team conducts a preliminary audit of your Instagram/YouTube channel within 24 hours. We then schedule a free 1-on-1 strategy session to review your retention bottlenecks, discuss personalized growth roadmaps, and share custom budget options.',
    category: 'pricing'
  }
];

interface FaqSectionProps {
  onOpenBooking?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = memo(({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string | null>('pricing-budget');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pricing' | 'program' | 'fit'>('all');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = selectedFilter === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter((item) => item.category === selectedFilter);

  return (
    <section id="faq" className="py-[70px] md:py-[90px] relative border-t border-slate-800">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-pink-500/10 blur-[60px] pointer-events-none rounded-full gpu-layer" />

      <div className="w-[min(1120px,92%)] mx-auto relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-black tracking-[2px] uppercase mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-[32px] sm:text-[42px] font-black text-white tracking-tight leading-tight">
            Got questions? We've got <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">creator-first answers.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed font-medium">
            Everything you need to know about our budget-adjusted mentorship, 1-on-1 growth acceleration, and creator philosophy.
          </p>

          {/* FILTER TABS */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 text-white shadow-md shadow-pink-950/40 font-black'
                  : 'bg-[#101828] text-slate-300 hover:text-white border border-slate-800 shadow-sm'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setSelectedFilter('pricing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'pricing'
                  ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 text-white shadow-md shadow-pink-950/40 font-black'
                  : 'bg-[#101828] text-slate-300 hover:text-white border border-slate-800 shadow-sm'
              }`}
            >
              Pricing & Budget
            </button>
            <button
              onClick={() => setSelectedFilter('program')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'program'
                  ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 text-white shadow-md shadow-pink-950/40 font-black'
                  : 'bg-[#101828] text-slate-300 hover:text-white border border-slate-800 shadow-sm'
              }`}
            >
              Program Details
            </button>
            <button
              onClick={() => setSelectedFilter('fit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'fit'
                  ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 text-white shadow-md shadow-pink-950/40 font-black'
                  : 'bg-[#101828] text-slate-300 hover:text-white border border-slate-800 shadow-sm'
              }`}
            >
              Creator Fit
            </button>
          </div>
        </div>

        {/* ACCORDION LIST */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all overflow-hidden gpu-layer ${
                  isOpen
                    ? 'bg-[#101828]/95 backdrop-blur-2xl border-pink-500/50 shadow-lg shadow-pink-500/10'
                    : 'bg-[#101828]/80 backdrop-blur-xl border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 shadow-sm shadow-pink-500" />
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl bg-[#0C111D] border border-slate-700 text-pink-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-pink-500/20 text-pink-300 border-pink-500/40' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pl-11 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* BOTTOM HELP BANNER */}
        <div className="mt-12 max-w-3xl mx-auto p-6 bg-[#101828]/95 backdrop-blur-2xl border border-slate-800 rounded-2xl text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Have a unique question about your channel?</h4>
              <p className="text-slate-300 text-xs mt-0.5 font-medium">Book a free 1-on-1 strategy call to discuss your budget and goals.</p>
            </div>
          </div>
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-pink-950/40 shrink-0 cursor-pointer active:scale-95"
            >
              Book Free Strategy Call
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

FaqSection.displayName = 'FaqSection';
