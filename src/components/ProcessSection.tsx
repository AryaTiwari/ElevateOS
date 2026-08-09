import React, { useState } from 'react';
import { PROCESS_STEPS, FLAGSHIP_PROGRAM_POINTS } from '../data/elevateData';
import { Sparkles, Check, ArrowRight, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessSectionProps {
  onOpenBooking: () => void;
  onOpenFlagship: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking, onOpenFlagship }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="process" className="py-[70px] md:py-[90px] relative border-t border-[#182234]">
      <div className="w-[min(1120px,92%)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[#60A5FA] text-xs font-extrabold tracking-[2px] uppercase mb-2.5">
            THE ELEVATE METHOD
          </div>

          <h2 className="text-[32px] sm:text-[42px] md:text-[55px] font-bold leading-[1.05] tracking-[-2px] max-w-[760px] text-[#F8FAFC]">
            A roadmap built around you.
          </h2>
        </motion.div>

        {/* 5 STEPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-10">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
              className={`p-5 rounded-2xl bg-[#0E1624] border transition-all duration-200 cursor-pointer ${
                activeStep === idx
                  ? 'border-[#3B82F6] bg-[#0E1624]/90 shadow-lg shadow-[#3B82F6]/10'
                  : 'border-t-2 border-t-[#214A8C] border-x border-b border-[#1E293B]'
              }`}
            >
              <div className="text-[#60A5FA] text-xs font-extrabold tracking-wider">
                {step.number}
              </div>

              <h3 className="text-lg font-bold text-white mt-2.5 mb-1.5">
                {step.title}
              </h3>

              <p className="text-[#94A3B8] text-[13px] leading-relaxed">
                {step.description}
              </p>

              {/* EXPANDABLE KEY OUTPUTS */}
              <div className="mt-3 pt-3 border-t border-[#1E293B]/60 text-xs">
                <span className="text-[#BFDBFE] font-medium text-[11px] block mb-1">Key Deliverables:</span>
                <ul className="space-y-1 text-[#94A3B8]">
                  {step.keyOutputs.map((out, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <span className="text-[#60A5FA]">•</span> {out}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CREATOR UPGRADE PROGRAM FLAGSHIP CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 p-8 sm:p-10 border border-[#24416F] rounded-3xl bg-gradient-to-br from-[#3B82F6]/[0.12] via-[#0E1624] to-[#0E1624] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-3">
              <Sprout className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> FLAGSHIP PROGRAM
            </div>

            <h3 className="text-[26px] sm:text-[31px] font-bold text-white tracking-tight leading-tight">
              Creator's Upgrade Program™
            </h3>

            <p className="text-[#94A3B8] text-sm sm:text-base mt-3 leading-relaxed">
              Not a generic checklist. A creator-first strategy experience designed around your specific niche, current stage and ambitions.
            </p>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenFlagship}
                className="btn bg-[#3B82F6] hover:bg-[#4B8CF7] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#3B82F6]/20 inline-flex items-center gap-2 cursor-pointer"
                id="process-apply-now-btn"
              >
                Apply for Creator's Upgrade Program™ <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0B0F19]/60 border border-[#1E293B] p-5 sm:p-6 rounded-xl">
            <div className="text-xs font-bold text-[#BFDBFE] uppercase tracking-wider mb-3">
              Included In The Program:
            </div>
            <ul className="space-y-2.5 text-sm text-[#F8FAFC]">
              {FLAGSHIP_PROGRAM_POINTS.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#60A5FA]" />
                  </div>
                  <span className="text-[#CBD5E1] leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
