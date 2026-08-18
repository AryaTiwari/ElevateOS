import React, { memo } from 'react';
import { 
  Video, 
  Sparkles, 
  Film, 
  TrendingUp, 
  Play, 
  Clapperboard, 
  Mic, 
  Flame,
  Zap,
  Radio
} from 'lucide-react';

export const GenZBackground: React.FC = memo(() => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none contain-strict gpu-layer bg-[#0C111D]"
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      {/* 1. Ambient Fluid Radial Gradient Mesh Glows (Optimized Static Atmosphere) */}
      <div 
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.15) 45%, transparent 70%)'
        }} 
      />
      <div 
        className="absolute top-[18%] -right-32 w-[620px] h-[620px] rounded-full opacity-25 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(236, 72, 153, 0.15) 45%, transparent 70%)'
        }} 
      />
      <div 
        className="absolute top-[52%] -left-28 w-[540px] h-[540px] rounded-full opacity-25 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 70%)'
        }} 
      />
      <div 
        className="absolute bottom-[-80px] right-10 w-[640px] h-[640px] rounded-full opacity-20 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(236, 72, 153, 0.12) 45%, transparent 70%)'
        }} 
      />

      {/* 2. Subtle Studio Dot Grid Matrix overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06]" 
        style={{
          backgroundImage: `radial-gradient(#EC4899 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* 3. Studio Camera Viewfinder Corner Ticks */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-pink-500/40 rounded-tl-xs" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-pink-500/40 rounded-tr-xs" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-pink-500/40 rounded-bl-xs" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-pink-500/40 rounded-br-xs" />

      {/* 4. Creator Ambient Recording/HUD Status Overlay */}
      <div className="absolute top-8 right-16 hidden lg:flex items-center gap-3 px-3.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono tracking-widest text-slate-400 uppercase shadow-lg animate-float-a">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-red-400 font-bold">REC</span>
        <span className="text-slate-600">|</span>
        <span className="text-amber-400 font-semibold">4K UHD</span>
        <span className="text-slate-600">|</span>
        <span className="text-pink-400 font-bold">CREATOR OS</span>
      </div>

      {/* 5. Floating Creator Badges with Asynchronous Float Physics */}
      <div 
        className="absolute top-[14%] left-[4%] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121A2D]/85 border border-pink-500/30 text-pink-200 text-xs font-semibold shadow-lg animate-float-a gpu-layer"
      >
        <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
        <span>+100K Viral Reach</span>
      </div>

      <div 
        className="absolute top-[36%] right-[3.5%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121A2D]/85 border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-lg animate-float-b gpu-layer"
      >
        <Flame className="w-3.5 h-3.5 text-amber-400" />
        <span>High Retention Hook</span>
      </div>

      <div 
        className="absolute top-[64%] left-[3.5%] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121A2D]/85 border border-purple-500/30 text-purple-200 text-xs font-semibold shadow-lg animate-float-c gpu-layer"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>Retention Engine 98%</span>
      </div>

      <div 
        className="absolute top-[84%] right-[5%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121A2D]/85 border border-emerald-500/30 text-emerald-200 text-xs font-semibold shadow-lg animate-float-a gpu-layer"
        style={{ animationDelay: '-2.5s' }}
      >
        <Zap className="w-3.5 h-3.5 text-emerald-400" />
        <span>1-Click Monetization</span>
      </div>

      {/* 6. Floating Creator Media Icons (Delicate Floating Motion) */}
      <div 
        className="absolute top-[10%] left-[22%] text-pink-500/15 animate-float-b gpu-layer"
      >
        <Video className="w-10 h-10" />
      </div>

      <div 
        className="absolute top-[26%] right-[14%] text-purple-500/15 animate-float-a gpu-layer"
        style={{ animationDelay: '-1.8s' }}
      >
        <Clapperboard className="w-12 h-12" />
      </div>

      <div 
        className="absolute top-[48%] left-[10%] text-amber-500/15 animate-float-c gpu-layer"
        style={{ animationDelay: '-3.2s' }}
      >
        <Film className="w-11 h-11" />
      </div>

      <div 
        className="absolute top-[72%] right-[20%] text-sky-500/15 animate-float-b gpu-layer"
        style={{ animationDelay: '-4.6s' }}
      >
        <Play className="w-10 h-10" />
      </div>

      <div 
        className="absolute top-[82%] left-[23%] text-indigo-500/15 animate-float-a gpu-layer"
        style={{ animationDelay: '-2.1s' }}
      >
        <Mic className="w-9 h-9" />
      </div>

      {/* 7. Equalizer Audio Waveform Visualizer (High-FPS GPU Oscillating) */}
      <div className="absolute bottom-0 left-0 right-0 h-6 flex items-end justify-center gap-1.5 opacity-30 pointer-events-none px-4">
        {[0.5, 0.9, 0.4, 1.0, 0.6, 0.8, 0.5, 0.9, 0.7, 0.4, 1.0, 0.6, 0.8, 0.5, 0.9, 0.4, 0.8, 0.6, 0.9, 0.5].map((scale, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-pink-600 via-purple-500 to-amber-400 rounded-t-full animate-eq-pulse"
            style={{
              height: `${Math.round(scale * 22)}px`,
              animationDelay: `${(i * 0.07).toFixed(2)}s`
            }}
          />
        ))}
      </div>
    </div>
  );
});

GenZBackground.displayName = 'GenZBackground';




