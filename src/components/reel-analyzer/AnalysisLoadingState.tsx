import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STATUS_MESSAGES = [
  'Watching your Reel...',
  'Inspecting audio dialogue and music balance...',
  'Analyzing opening 2-second hook and framing...',
  'Checking visual pacing and retention arc...',
  'Evaluating subject composition & text safe zones...',
  'Benchmarking against creator niche & views...',
  'Pinpointing highest-impact fixes before posting...',
  'Building strategic IST posting intelligence...',
];

interface AnalysisLoadingStateProps {
  fileName?: string;
}

export const AnalysisLoadingState: React.FC<AnalysisLoadingStateProps> = memo(({ fileName }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#101828]/95 border border-pink-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-2xl text-center space-y-6 animate-fadeIn">
      {/* Visual Scanning Animation */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 animate-ping opacity-60" />
        <div className="relative w-16 h-16 rounded-2xl bg-[#0C111D] border border-pink-500/50 flex items-center justify-center text-3xl shadow-xl shadow-pink-500/20">
          <span>🧠</span>
        </div>
      </div>

      {/* Dynamic Status Text */}
      <div className="space-y-2 max-w-md mx-auto min-h-[56px] flex flex-col items-center justify-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 inline-flex items-center gap-1.5">
          <span>✨</span>
          <span>ELEVATE AI MULTIMODAL ENGINE</span>
        </span>
        
        <AnimatePresence mode="wait">
          <motion.h4
            key={STATUS_MESSAGES[index]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-base sm:text-lg font-bold text-white tracking-tight"
          >
            {STATUS_MESSAGES[index]}
          </motion.h4>
        </AnimatePresence>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full max-w-xs mx-auto h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400"
          initial={{ width: '10%' }}
          animate={{ width: '92%' }}
          transition={{ duration: 12, ease: 'easeInOut' }}
        />
      </div>

      {fileName && (
        <p className="text-xs text-slate-400 font-medium">
          Analyzing: <span className="text-slate-300 font-bold">🎬 {fileName}</span>
        </p>
      )}
    </div>
  );
});
