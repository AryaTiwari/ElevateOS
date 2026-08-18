import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TermsConsentModalProps {
  onOpenLegal: (tab: 'privacy' | 'terms') => void;
}

export const TermsConsentModal: React.FC<TermsConsentModalProps> = ({ onOpenLegal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('elevate_terms_accepted');
    if (!accepted) {
      // Show modal on first load with a slight delay for smooth visual entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('elevate_terms_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C111D]/80 backdrop-blur-md gpu-layer" style={{ willChange: 'opacity' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-[#101828]/95 backdrop-blur-2xl border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full relative text-left gpu-layer text-white"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* HEADER ICON */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-2xl text-pink-400">
              <ShieldCheck className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-pink-400 uppercase block">
                WELCOME TO ELEVATE OS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Privacy & Terms Agreement
              </h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-5 font-medium">
            To provide you with personalized growth roadmaps, interactive creator tools, and strategy session intake, Elevate OS requires your consent to our Privacy Policy and Terms & Conditions.
          </p>

          {/* BULLET HIGHLIGHTS */}
          <div className="bg-[#0C111D] border border-slate-800 rounded-2xl p-4 mb-6 space-y-2.5 text-xs text-slate-300 font-medium">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>We respect your data privacy and never sell creator metrics to third parties.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Diagnostic tools and calculators use local session data to save your progress.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>You retain 100% ownership of your content, brand identity, and accounts.</span>
            </div>
          </div>

          {/* DIRECT DOCUMENT LINKS */}
          <div className="flex items-center justify-between gap-3 text-xs mb-6 px-1 font-semibold">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="text-pink-400 hover:text-pink-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              View Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="text-pink-400 hover:text-pink-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              View Terms & Conditions
            </button>
          </div>

          {/* ACCEPT BUTTON */}
          <button
            type="button"
            onClick={handleAccept}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-black text-sm rounded-xl transition-all shadow-md shadow-pink-950/40 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            I Accept & Continue to Elevate OS
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
