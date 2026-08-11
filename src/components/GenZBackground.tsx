import React, { memo } from 'react';
import { 
  Video, 
  Sparkles, 
  Film, 
  TrendingUp, 
  Play, 
  Clapperboard, 
  Mic, 
  Flame
} from 'lucide-react';

export const GenZBackground: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none contain-strict">
      {/* 1. Gen Z Ambient Soft Mesh Glows - Hardware Accelerated CSS Animations */}
      <div 
        className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full blur-3xl gpu-layer opacity-60 animate-orb-1" 
        style={{ 
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.20) 0%, rgba(192, 132, 252, 0.10) 50%, rgba(255, 255, 255, 0) 70%)',
        }} 
      />
      <div 
        className="absolute top-[20%] -right-28 w-[500px] h-[500px] rounded-full blur-3xl gpu-layer opacity-60 animate-orb-2" 
        style={{ 
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(129, 140, 248, 0.12) 50%, rgba(255, 255, 255, 0) 70%)',
        }} 
      />
      <div 
        className="absolute top-[55%] -left-20 w-[420px] h-[420px] rounded-full blur-3xl gpu-layer opacity-50 animate-orb-1" 
        style={{ 
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(251, 146, 60, 0.10) 50%, rgba(255, 255, 255, 0) 70%)',
          animationDelay: '-5s'
        }} 
      />
      <div 
        className="absolute bottom-[-100px] right-10 w-[520px] h-[520px] rounded-full blur-3xl gpu-layer opacity-50 animate-orb-2" 
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(52, 211, 153, 0.10) 50%, rgba(255, 255, 255, 0) 70%)',
          animationDelay: '-7s'
        }} 
      />

      {/* 2. Subtle Dot Grid Matrix overlay */}
      <div 
        className="absolute inset-0 opacity-[0.16] gpu-layer" 
        style={{
          backgroundImage: `radial-gradient(#3B82F6 0.75px, transparent 0.75px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* 3. Subtle Camera Viewfinder Corner Ticks */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-blue-400/20 rounded-tl-sm" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-blue-400/20 rounded-tr-sm" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-blue-400/20 rounded-bl-sm" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-blue-400/20 rounded-br-sm" />

      {/* 4. Creator Ambient Recording/HUD Status Overlay */}
      <div className="absolute top-8 right-16 hidden lg:flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900/[0.03] border border-slate-900/[0.05] text-[10px] font-mono tracking-widest text-slate-400/70 uppercase">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span>REC 4K 60FPS</span>
        <span className="text-slate-300">|</span>
        <span>CREATOR OS</span>
      </div>

      {/* 5. Floating Creator Badges */}
      <div className="absolute top-[15%] left-[4%] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-blue-200/40 text-blue-900/60 text-xs font-semibold shadow-sm animate-smooth-float">
        <TrendingUp className="w-3.5 h-3.5 text-blue-600/70" />
        <span>+100K Viral Reach</span>
      </div>

      <div className="absolute top-[38%] right-[3%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-amber-200/40 text-amber-900/60 text-xs font-semibold shadow-sm animate-smooth-float" style={{ animationDelay: '1.5s' }}>
        <Flame className="w-3.5 h-3.5 text-amber-500/80" />
        <span>High Retention Hook</span>
      </div>

      <div className="absolute top-[65%] left-[3%] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-purple-200/40 text-purple-900/60 text-xs font-semibold shadow-sm animate-smooth-float" style={{ animationDelay: '2.5s' }}>
        <Sparkles className="w-3.5 h-3.5 text-purple-600/70" />
        <span>Elevate AI Analysis</span>
      </div>

      {/* 6. Floating Creator Media Icons */}
      <div className="absolute top-[10%] left-[22%] text-blue-500/15 animate-smooth-float" style={{ animationDelay: '0.8s' }}>
        <Video className="w-10 h-10" />
      </div>

      <div className="absolute top-[28%] right-[15%] text-purple-500/15 animate-smooth-float" style={{ animationDelay: '2.1s' }}>
        <Clapperboard className="w-12 h-12" />
      </div>

      <div className="absolute top-[48%] left-[12%] text-pink-500/15 animate-smooth-float" style={{ animationDelay: '1.2s' }}>
        <Film className="w-11 h-11" />
      </div>

      <div className="absolute top-[72%] right-[22%] text-sky-500/15 animate-smooth-float" style={{ animationDelay: '3s' }}>
        <Play className="w-10 h-10" />
      </div>

      <div className="absolute top-[82%] left-[25%] text-indigo-500/15 animate-smooth-float" style={{ animationDelay: '1.7s' }}>
        <Mic className="w-9 h-9" />
      </div>

      {/* 7. Equalizer Audio Waveform Visualizer - Non-reflow CSS scaleY transform */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end justify-center gap-1.5 opacity-20 pointer-events-none px-4">
        {[0.6, 1.0, 0.4, 0.9, 0.7, 1.0, 0.5, 0.8, 0.6, 0.4, 0.9, 0.7, 1.0, 0.5, 0.8, 0.4, 0.9, 0.6, 0.9, 0.5].map((scale, i) => (
          <div
            key={i}
            className="w-1 h-8 bg-gradient-to-t from-blue-600 via-indigo-500 to-purple-500 rounded-t-full animate-bar-eq"
            style={{
              animationDuration: `${0.8 + (i % 4) * 0.25}s`,
              animationDelay: `${(i % 5) * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
});

GenZBackground.displayName = 'GenZBackground';




