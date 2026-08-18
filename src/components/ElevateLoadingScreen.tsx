import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ElevateLoadingScreenProps {
  onComplete: () => void;
}

const LOADING_MESSAGES = [
  "Building your personalized creator roadmap...",
  "Analyzing your current content...",
  "Understanding your content style...",
  "Researching your niche and audience...",
  "Studying your competitive landscape...",
  "Identifying your biggest growth opportunities...",
  "Finding ways to strengthen your hooks...",
  "Mapping your next content moves...",
  "Preparing your creator strategy...",
  "Putting everything together..."
];

interface DoodleFigureProps {
  emojiHead: string;
  positionClass: string;
  clapSpeed?: string;
  clapDelay?: string;
  bounceDelay?: string;
  mobileHidden?: boolean;
}

const DoodleFigure: React.FC<DoodleFigureProps> = ({
  emojiHead,
  positionClass,
  clapSpeed = '0.22s',
  clapDelay = '0s',
  bounceDelay = '0s',
  mobileHidden = false,
}) => {
  return (
    <div
      className={`absolute z-10 flex flex-col items-center pointer-events-none select-none ${positionClass} ${
        mobileHidden ? 'hidden lg:flex' : 'flex'
      }`}
    >
      {/* Doodle Character Container with Bouncing */}
      <div
        className="relative flex flex-col items-center"
        style={{ animation: `doodleBounce 2s ease-in-out infinite`, animationDelay: bounceDelay }}
      >
        {/* Emoji / Doodle Head */}
        <div className="text-2xl sm:text-3xl filter drop-shadow-md transform -rotate-3">
          {emojiHead}
        </div>

        {/* Doodle SVG Body with Single Clapping Hand */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          {/* Simple Doodle Stick Figure */}
          <svg viewBox="0 0 40 40" className="w-full h-full text-white/70 stroke-current fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
            <line x1="20" y1="10" x2="20" y2="28" />
            <line x1="20" y1="28" x2="12" y2="38" />
            <line x1="20" y1="28" x2="28" y2="38" />
          </svg>

          {/* High-Energy Single Clapping Hand 👏 */}
          <div className="absolute top-1 inset-x-0 flex items-center justify-center">
            <span
              className="text-base sm:text-lg inline-block rapid-clap-single"
              style={{
                animation: `rapidClapSingle ${clapSpeed} ease-in-out infinite`,
                animationDelay: clapDelay,
              }}
            >
              👏
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ElevateLoadingScreen: React.FC<ElevateLoadingScreenProps> = memo(({ onComplete }) => {
  const [progress, setProgress] = useState(10);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = useCallback(() => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  }, [onComplete]);

  // Smooth loading progression over ~3.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.max(2, Math.floor((100 - prev) * 0.18));
        return Math.min(100, prev + step);
      });
    }, 120);

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 850);

    const finishTimer = setTimeout(() => {
      handleFinish();
    }, 3400);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
      clearTimeout(finishTimer);
    };
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="elevate-creator-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C111D] text-white overflow-hidden select-none cursor-pointer"
          onClick={handleFinish}
        >
          {/* Inject lightweight keyframes for single hand clapping animation */}
          <style>{`
            @keyframes rapidClapSingle {
              0%, 100% { transform: scale(1) rotate(0deg) translateY(0px); }
              50% { transform: scale(1.3) rotate(-15deg) translateY(-3px); }
            }
            @keyframes doodleBounce {
              0%, 100% { transform: translateY(0) scaleY(1); }
              50% { transform: translateY(-8px) scaleY(1.04); }
            }
            @keyframes floatBadge {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-4px) scale(1.04); }
            }

            @media (prefers-reduced-motion: reduce) {
              .rapid-clap-single, .doodle-bounce {
                animation: none !important;
              }
            }
          `}</style>

          {/* Ambient Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* ========================================================= */}
          {/* FLOATING CREATOR METRIC BUTTON BADGES AROUND THE PAGE */}
          {/* ========================================================= */}
          
          {/* Badge 1: 50K Likes (Top-Left Area) */}
          <div
            className="absolute top-[18%] left-[4%] sm:left-[10%] z-15 pointer-events-auto cursor-pointer"
            style={{ animation: 'floatBadge 3.4s ease-in-out infinite', animationDelay: '0s' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#161F30]/90 border border-pink-500/40 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/15 backdrop-blur-md hover:scale-105 transition-transform">
              <span className="text-pink-400">💖</span>
              <span>50K Likes</span>
            </div>
          </div>

          {/* Badge 2: 80% Retention (Top-Right Area) */}
          <div
            className="absolute top-[18%] right-[4%] sm:right-[10%] z-15 pointer-events-auto cursor-pointer"
            style={{ animation: 'floatBadge 3.8s ease-in-out infinite', animationDelay: '0.4s' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#161F30]/90 border border-purple-500/40 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-500/15 backdrop-blur-md hover:scale-105 transition-transform">
              <span className="text-amber-400">📈</span>
              <span>80% Retention</span>
            </div>
          </div>

          {/* Badge 3: Monetized (Bottom-Left Area) */}
          <div
            className="absolute bottom-[18%] left-[4%] sm:left-[10%] z-15 pointer-events-auto cursor-pointer"
            style={{ animation: 'floatBadge 3.2s ease-in-out infinite', animationDelay: '0.8s' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#161F30]/90 border border-emerald-500/40 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/15 backdrop-blur-md hover:scale-105 transition-transform">
              <span className="text-emerald-400">💰</span>
              <span>Monetized</span>
            </div>
          </div>

          {/* Badge 4: Audience Based (Bottom-Right Area) */}
          <div
            className="absolute bottom-[18%] right-[4%] sm:right-[10%] z-15 pointer-events-auto cursor-pointer"
            style={{ animation: 'floatBadge 3.6s ease-in-out infinite', animationDelay: '1.2s' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#161F30]/90 border border-sky-500/40 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/15 backdrop-blur-md hover:scale-105 transition-transform">
              <span className="text-sky-400">👥</span>
              <span>Audience Based</span>
            </div>
          </div>

          {/* Badge 5: Viral Hooks (Top-Center Area, Desktop) */}
          <div
            className="absolute top-[12%] left-1/2 -translate-x-1/2 z-15 hidden md:inline-flex pointer-events-auto cursor-pointer"
            style={{ animation: 'floatBadge 4.0s ease-in-out infinite', animationDelay: '0.6s' }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161F30]/90 border border-amber-500/40 text-white text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/15 backdrop-blur-md hover:scale-105 transition-transform">
              <span className="text-amber-400">🔥</span>
              <span>Viral Hooks</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DOODLE CROWD CELEBRATING ALONG THE EDGES */}
          {/* ========================================================= */}
          
          {/* 1. Top-Left Crowd */}
          <DoodleFigure
            emojiHead="🥳"
            positionClass="top-6 left-6 sm:top-10 sm:left-12"
            clapSpeed="0.18s"
            clapDelay="0s"
            bounceDelay="0s"
          />

          {/* 2. Top-Right Crowd */}
          <DoodleFigure
            emojiHead="🤩"
            positionClass="top-6 right-6 sm:top-10 sm:right-12"
            clapSpeed="0.22s"
            clapDelay="0.06s"
            bounceDelay="0.3s"
          />

          {/* 3. Middle-Left Crowd */}
          <DoodleFigure
            emojiHead="😎"
            positionClass="top-[25%] left-3 sm:left-6 lg:left-10"
            clapSpeed="0.20s"
            clapDelay="0.03s"
            bounceDelay="0.5s"
            mobileHidden
          />

          {/* 4. Middle-Right Crowd */}
          <DoodleFigure
            emojiHead="😃"
            positionClass="top-[25%] right-3 sm:right-6 lg:right-10"
            clapSpeed="0.24s"
            clapDelay="0.09s"
            bounceDelay="0.2s"
            mobileHidden
          />

          {/* 5. Bottom-Left Crowd */}
          <DoodleFigure
            emojiHead="🤯"
            positionClass="bottom-6 left-6 sm:bottom-10 sm:left-12"
            clapSpeed="0.21s"
            clapDelay="0.05s"
            bounceDelay="0.4s"
          />

          {/* 6. Bottom-Right Crowd */}
          <DoodleFigure
            emojiHead="😳"
            positionClass="bottom-6 right-6 sm:bottom-10 sm:right-12"
            clapSpeed="0.19s"
            clapDelay="0.08s"
            bounceDelay="0.1s"
          />

          {/* 7. Top-Center-Left Crowd (Desktop Only) */}
          <DoodleFigure
            emojiHead="🙋‍♂️"
            positionClass="top-8 left-[28%]"
            clapSpeed="0.25s"
            clapDelay="0.12s"
            bounceDelay="0.6s"
            mobileHidden
          />

          {/* 8. Top-Center-Right Crowd (Desktop Only) */}
          <DoodleFigure
            emojiHead="🙋‍♀️"
            positionClass="top-8 right-[28%]"
            clapSpeed="0.23s"
            clapDelay="0.02s"
            bounceDelay="0.25s"
            mobileHidden
          />

          {/* ========================================================= */}
          {/* CENTER CONTENT (CLEAN FOCAL POINT) */}
          {/* ========================================================= */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-xl px-6 space-y-6 my-auto pointer-events-auto">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] font-black uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span>ELEVATE CREATOR OS</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none">
                ELEVATE <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">OS</span>
              </h1>

              <p className="text-sm sm:text-xl font-semibold text-slate-200 tracking-wide max-w-md mx-auto">
                "The Operating System for Content Creators"
              </p>
            </div>

            {/* Loading Bar */}
            <div className="w-full max-w-md space-y-3 pt-2">
              <div className="relative w-full bg-white/10 h-2.5 rounded-full overflow-hidden border border-white/15 shadow-inner">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Rotating Messages */}
              <div className="min-h-[28px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="text-xs sm:text-sm font-medium text-pink-300/90 text-center"
                  >
                    {LOADING_MESSAGES[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Quick Start Prompt at Bottom Center */}
          <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none text-[11px] font-sans text-slate-400">
            Click anywhere to enter Elevate OS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
