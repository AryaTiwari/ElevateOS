import React, { useEffect, useState, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Cpu, Compass, TrendingUp } from 'lucide-react';

interface ElevateLoadingScreenProps {
  onComplete: () => void;
}

const CREATOR_STEPS = [
  { label: 'Content', icon: Layers, color: 'text-pink-300', borderColor: 'border-pink-500/40', glow: 'shadow-pink-500/20' },
  { label: 'Analysis', icon: Cpu, color: 'text-purple-300', borderColor: 'border-purple-500/40', glow: 'shadow-purple-500/20' },
  { label: 'Strategy', icon: Compass, color: 'text-indigo-300', borderColor: 'border-indigo-500/40', glow: 'shadow-indigo-500/20' },
  { label: 'Growth', icon: TrendingUp, color: 'text-amber-300', borderColor: 'border-amber-500/40', glow: 'shadow-amber-500/20' },
];

export const ElevateLoadingScreen: React.FC<ElevateLoadingScreenProps> = memo(({ onComplete }) => {
  const [stage, setStage] = useState<'bg' | 'logo' | 'tagline' | 'signal' | 'exit'>('bg');

  const handleFinish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Perfectly orchestrated 4.0-second timeline with hardware-accelerated transitions
    // 0.0s – 0.4s: Ambient backdrop & radial glow bloom
    const timerLogo = setTimeout(() => {
      setStage((prev) => (prev === 'exit' ? 'exit' : 'logo'));
    }, 400);

    // 1.2s – 2.1s: Tagline glides in softly with pure opacity dissolve
    const timerTagline = setTimeout(() => {
      setStage((prev) => (prev === 'exit' ? 'exit' : 'tagline'));
    }, 1200);

    // 1.9s – 3.3s: Creator growth nodes & light beam stream in (+0.2s extra viewing time)
    const timerSignal = setTimeout(() => {
      setStage((prev) => (prev === 'exit' ? 'exit' : 'signal'));
    }, 1900);

    // 3.3s – 4.1s: Silky smooth cross-fade veil lift into main website
    const timerExit = setTimeout(() => {
      setStage('exit');
    }, 3300);

    // 4.1s: Complete intro and unmount cleanly
    const timerComplete = setTimeout(() => {
      handleFinish();
    }, 4100);

    return () => {
      clearTimeout(timerLogo);
      clearTimeout(timerTagline);
      clearTimeout(timerSignal);
      clearTimeout(timerExit);
      clearTimeout(timerComplete);
    };
  }, [handleFinish]);

  const isLogoActive = stage === 'logo' || stage === 'tagline' || stage === 'signal' || stage === 'exit';
  const isTaglineActive = stage === 'tagline' || stage === 'signal' || stage === 'exit';
  const isSignalActive = stage === 'signal' || stage === 'exit';
  const isExiting = stage === 'exit';

  // Ultra-smooth cubic bezier easing for SaaS brand motion
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      key="elevate-brand-intro"
      initial={{ opacity: 0 }}
      animate={
        isExiting
          ? { opacity: 0 }
          : { opacity: 1 }
      }
      transition={{
        duration: 0.85,
        ease: smoothEase,
      }}
      style={{ willChange: 'opacity' }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C111D] text-white overflow-hidden select-none cursor-pointer ${
        isExiting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      onClick={() => {
        if (!isExiting) {
          setStage('exit');
          setTimeout(handleFinish, 400);
        }
      }}
    >
      {/* Keyframe Styles for Ambient Light & Beam Flow */}
      <style>{`
        @keyframes ambientGlowBreathe {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.08); }
        }
        @keyframes beamPulseFlow {
          0% { left: -35%; opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { left: 115%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-glow, .beam-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Ambient Multi-Layered Radial Backdrop Glow */}
      <div
        className="absolute inset-0 pointer-events-none ambient-glow"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.18) 0%, rgba(168,85,247,0.12) 32%, rgba(245,158,11,0.02) 62%, transparent 82%)',
          animation: 'ambientGlowBreathe 5s ease-in-out infinite',
        }}
      />

      {/* Soft Background Center Blur Highlight */}
      <div className="absolute w-[540px] h-[540px] rounded-full bg-gradient-to-r from-pink-500/12 via-purple-500/10 to-amber-400/5 blur-3xl pointer-events-none" />

      {/* Subtle Ambient Micro Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Central Content Box - Pre-mounted for butter-smooth GPU transitions */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-xl px-6 my-auto pointer-events-none">
        
        {/* 1. Top Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={
            isLogoActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -10 }
          }
          transition={{
            duration: 0.85,
            ease: smoothEase,
          }}
          style={{ willChange: 'opacity, transform' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-lg shadow-pink-500/10 backdrop-blur-md mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>ELEVATE CREATOR OS</span>
        </motion.div>

        {/* 2. Main Brand Title ELEVATE OS - Silky smooth hardware-accelerated glide */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={
            isLogoActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{
            duration: 0.95,
            delay: 0.08,
            ease: smoothEase,
          }}
          style={{ willChange: 'opacity, transform' }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none pt-1 drop-shadow-[0_0_25px_rgba(236,72,153,0.25)]"
        >
          ELEVATE{' '}
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
            OS
          </span>
        </motion.h1>

        {/* 3. Tagline - Silky hardware-accelerated opacity & vertical slide */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={
            isTaglineActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{
            duration: 0.9,
            ease: smoothEase,
          }}
          style={{ willChange: 'opacity, transform' }}
          className="text-base sm:text-xl font-semibold text-slate-200/95 mt-4 max-w-md mx-auto tracking-wide"
        >
          "The Operating System for Content Creators"
        </motion.p>

        {/* 4. Minimal Creator Growth Signal Track - Hardware accelerated entrance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            isSignalActive
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{
            duration: 0.9,
            ease: smoothEase,
          }}
          style={{ willChange: 'opacity, transform' }}
          className="mt-8 pt-2 w-full max-w-md flex flex-col items-center"
        >
          {/* Hair-line track with connected nodes */}
          <div className="relative w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/12 backdrop-blur-md shadow-xl">
            
            {/* Connecting background hairline */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] bg-gradient-to-r from-pink-500/30 via-purple-500/40 to-amber-400/30 pointer-events-none" />
            
            {/* Animated beam pulse flowing across smoothly */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[2px] w-28 bg-gradient-to-r from-transparent via-pink-400 to-transparent pointer-events-none beam-pulse"
              style={{ animation: 'beamPulseFlow 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
            />

            {/* 4 Connected Creator Nodes */}
            {CREATOR_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.85, y: 6 }}
                  animate={
                    isSignalActive
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.85, y: 6 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: smoothEase,
                  }}
                  style={{ willChange: 'opacity, transform' }}
                  className="relative z-10 flex flex-col items-center gap-1.5"
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#161F30] border ${step.borderColor} flex items-center justify-center ${step.color} shadow-lg ${step.glow} transition-transform hover:scale-110`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-300 tracking-wider uppercase">
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* Minimal skip hint at very bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="absolute bottom-5 inset-x-0 text-center pointer-events-none text-[10px] font-sans text-slate-400 uppercase tracking-widest"
      >
        Tap anywhere to continue
      </motion.div>
    </motion.div>
  );
});
