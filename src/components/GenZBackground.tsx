import React, { memo } from 'react';
import { motion } from 'motion/react';

export const GenZBackground: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Gen Z Colorful Soft Mesh Ambient Glows with GPU composite layers */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-300/30 via-purple-300/20 to-blue-300/20 rounded-full blur-[140px] animate-pulse transform-gpu" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[25%] -right-32 w-[650px] h-[650px] bg-gradient-to-tr from-sky-300/30 via-indigo-200/25 to-pink-200/25 rounded-full blur-[150px] animate-pulse transform-gpu" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[55%] -left-20 w-[550px] h-[550px] bg-gradient-to-br from-purple-200/30 via-pink-300/20 to-amber-200/20 rounded-full blur-[130px] animate-pulse transform-gpu" style={{ animationDuration: '9s' }} />
      <div className="absolute bottom-[-100px] right-10 w-[700px] h-[700px] bg-gradient-to-tr from-blue-300/25 via-emerald-200/20 to-purple-200/20 rounded-full blur-[160px] animate-pulse transform-gpu" style={{ animationDuration: '12s' }} />

      {/* Subtle Dot Grid Matrix overlay */}
      <div 
        className="absolute inset-0 opacity-[0.35]" 
        style={{
          backgroundImage: `radial-gradient(#3B82F6 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating Gen Z Social Media Graphics & Badges scattered across background */}
      
      {/* 1. Top Left - Viral Reel Component */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-[3%] hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/80 border border-pink-200/80 shadow-lg shadow-pink-500/10 backdrop-blur-md text-xs font-black text-slate-800 transform-gpu"
      >
        <span className="text-base">🔥</span>
        <div>
          <div className="text-[10px] text-pink-600 font-bold uppercase tracking-wider">Social Trend</div>
          <div className="text-slate-900 font-extrabold">Viral Reel • 142.8K</div>
        </div>
      </motion.div>

      {/* 2. Top Right - Like Counter Pill */}
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [1, -2, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-36 right-[4%] hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-red-200/80 shadow-lg shadow-red-500/10 backdrop-blur-md text-xs font-black text-slate-800 transform-gpu"
      >
        <span className="text-base animate-bounce" style={{ animationDuration: '2s' }}>❤️</span>
        <span className="text-slate-900 font-extrabold">12.4k Likes</span>
        <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full">+18%</span>
      </motion.div>

      {/* 3. Mid Top Left - 10x Reach Badge */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[22%] left-[1.5%] hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 border border-amber-200 shadow-md shadow-amber-500/10 backdrop-blur-md text-xs font-bold text-slate-800 transform-gpu"
      >
        <span className="text-base">⚡</span>
        <span className="text-amber-800 font-extrabold">10x Reach Flywheel</span>
      </motion.div>

      {/* 4. Mid Right - Comments Bubble */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-1, 2, -1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[28%] right-[2%] hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 border border-blue-200 shadow-lg shadow-blue-500/10 backdrop-blur-md text-xs font-black text-slate-800 transform-gpu"
      >
        <span className="text-base">💬</span>
        <div>
          <div className="text-[10px] text-blue-600 font-bold uppercase">Community</div>
          <div className="text-slate-900 font-bold">1,420 Comments</div>
        </div>
      </motion.div>

      {/* 5. Center Left - 100k Club Badge */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [-2, 1, -2] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[48%] left-[2%] hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 border border-indigo-200 shadow-lg shadow-indigo-500/10 backdrop-blur-md text-xs font-black text-slate-800 transform-gpu"
      >
        <span className="text-base">🚀</span>
        <div>
          <div className="text-[10px] text-indigo-600 font-bold uppercase">Creator Scale</div>
          <div className="text-slate-900 font-extrabold">100k Followers</div>
        </div>
      </motion.div>

      {/* 6. Center Right - Monetization Pill */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [1, -2, 1] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-[52%] right-[1.5%] hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 border border-emerald-200 shadow-lg shadow-emerald-500/10 backdrop-blur-md text-xs font-black text-slate-800 transform-gpu"
      >
        <span className="text-base">💸</span>
        <div>
          <div className="text-[10px] text-emerald-600 font-bold uppercase">Revenue Goal</div>
          <div className="text-emerald-900 font-extrabold">$10k/mo MRR</div>
        </div>
      </motion.div>

      {/* 7. Lower Left - Grid Aesthetic */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute top-[72%] left-[2.5%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-purple-200 shadow-md shadow-purple-500/10 backdrop-blur-md text-xs font-bold text-slate-800 transform-gpu"
      >
        <span className="text-base">📸</span>
        <span className="text-purple-900 font-extrabold">Grid Aesthetic ✨</span>
      </motion.div>

      {/* 8. Lower Right - Growth Stats Badge */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [-1, 2, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute top-[75%] right-[3%] hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/80 border border-sky-200 shadow-lg shadow-sky-500/10 backdrop-blur-md text-xs font-black text-slate-800 transform-gpu"
      >
        <span className="text-base">📈</span>
        <div>
          <div className="text-[10px] text-sky-600 font-bold uppercase">Monthly Growth</div>
          <div className="text-slate-900 font-extrabold">+340% Impressions</div>
        </div>
      </motion.div>

      {/* Floating Emojis scattered subtly */}
      <div className="absolute top-[12%] left-[18%] text-2xl opacity-40 animate-bounce transform-gpu" style={{ animationDuration: '4.5s' }}>📱</div>
      <div className="absolute top-[18%] right-[22%] text-2xl opacity-40 animate-bounce transform-gpu" style={{ animationDuration: '3.8s', animationDelay: '1s' }}>✨</div>
      <div className="absolute top-[38%] left-[12%] text-2xl opacity-35 animate-bounce transform-gpu" style={{ animationDuration: '5.2s', animationDelay: '0.4s' }}>👑</div>
      <div className="absolute top-[42%] right-[14%] text-2xl opacity-35 animate-bounce transform-gpu" style={{ animationDuration: '4.8s', animationDelay: '1.8s' }}>🎯</div>
      <div className="absolute top-[62%] left-[16%] text-2xl opacity-35 animate-bounce transform-gpu" style={{ animationDuration: '5.5s', animationDelay: '2.2s' }}>💎</div>
      <div className="absolute top-[68%] right-[18%] text-2xl opacity-40 animate-bounce transform-gpu" style={{ animationDuration: '4.2s', animationDelay: '0.9s' }}>🤩</div>
      <div className="absolute top-[85%] left-[20%] text-2xl opacity-35 animate-bounce transform-gpu" style={{ animationDuration: '6s', animationDelay: '1.4s' }}>📊</div>
      <div className="absolute top-[88%] right-[25%] text-2xl opacity-35 animate-bounce transform-gpu" style={{ animationDuration: '5s', animationDelay: '0.6s' }}>🏆</div>
    </div>
  );
});

GenZBackground.displayName = 'GenZBackground';

