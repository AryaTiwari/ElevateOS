import React, { memo } from 'react';
import { CONTACT_INFO } from '../data/elevateData';
import { Rocket, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CtaSectionProps {
  onOpenBooking: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = memo(({ onOpenBooking }) => {
  return (
    <section className="py-[70px] md:py-[90px] relative border-t border-slate-200">
      <div className="w-[min(1120px,92%)] mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 px-6 sm:px-10 border border-slate-200 rounded-3xl bg-gradient-to-b from-blue-50/80 via-white to-white relative overflow-hidden shadow-xl shadow-slate-200/50"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 text-blue-600 mr-1.5" /> READY TO UPGRADE?
          </div>

          <h2 className="text-[34px] sm:text-[48px] md:text-[55px] font-bold leading-[1.05] tracking-[-2px] max-w-[760px] mx-auto text-slate-900">
            Your next level needs a system.
          </h2>

          <p className="max-w-[650px] mx-auto mt-4 mb-8 text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            Tell us where you are, where you want to go, and what's getting in the way. We'll start from there.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              onClick={onOpenBooking}
              className="w-full sm:w-auto btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5"
              id="cta-start-conversation-btn"
            >
              <Rocket className="w-4 h-4" /> Book a Free Strategy Session
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

CtaSection.displayName = 'CtaSection';

