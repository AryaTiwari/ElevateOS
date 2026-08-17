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
      {/* 1. Gen Z Ambient Static Radial Gradient Mesh Glows (Zero CPU/GPU blur thrash) */}
      <div 
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full opacity-40" 
        style={{ 
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.25) 0%, rgba(192, 132, 252, 0.12) 40%, transparent 70%)',
        }} 
      />
      <div 
        className="absolute top-[20%] -right-32 w-[580px] h-[580px] rounded-full opacity-45" 
        style={{ 
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(129, 140, 248, 0.12) 40%, transparent 70%)',
        }} 
      />
      <div 
        className="absolute top-[55%] -left-28 w-[500px] h-[500px] rounded-full opacity-35" 
        style={{ 
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.20) 0%, rgba(251, 146, 60, 0.10) 40%, transparent 70%)',
        }} 
      />
      <div 
        className="absolute bottom-[-100px] right-10 w-[600px] h-[600px] rounded-full opacity-35" 
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.20) 0%, rgba(52, 211, 153, 0.10) 40%, transparent 70%)',
        }} 
      />

      {/* 2. Subtle Dot Grid Matrix overlay */}
      <div 
        className="absolute inset-0 opacity-[0.14]" 
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
      <div className="absolute top-8 right-16 hidden lg:flex items-center gap-3 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-[10px] font-mono tracking-widest text-slate-500 uppercase shadow-xs">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span>REC 4K 60FPS</span>
        <span className="text-slate-300">|</span>
        <span>CREATOR OS</span>
      </div>

      {/* 5. Floating Creator Badges */}
      <div className="absolute top-[15%] left-[4%] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-blue-200/80 text-blue-900/80 text-xs font-semibold shadow-xs">
        <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
        <span>+100K Viral Reach</span>
      </div>

      <div className="absolute top-[38%] right-[3%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200/80 text-amber-900/80 text-xs font-semibold shadow-xs">
        <Flame className="w-3.5 h-3.5 text-amber-500" />
        <span>High Retention Hook</span>
      </div>

      <div className="absolute top-[65%] left-[3%] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-purple-200/80 text-purple-900/80 text-xs font-semibold shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
        <span>Elevate AI Analysis</span>
      </div>

      {/* 6. Floating Creator Media Icons */}
      <div className="absolute top-[10%] left-[22%] text-blue-500/15">
        <Video className="w-10 h-10" />
      </div>

      <div className="absolute top-[28%] right-[15%] text-purple-500/15">
        <Clapperboard className="w-12 h-12" />
      </div>

      <div className="absolute top-[48%] left-[12%] text-pink-500/15">
        <Film className="w-11 h-11" />
      </div>

      <div className="absolute top-[72%] right-[22%] text-sky-500/15">
        <Play className="w-10 h-10" />
      </div>

      <div className="absolute top-[82%] left-[25%] text-indigo-500/15">
        <Mic className="w-9 h-9" />
      </div>

      {/* 7. Equalizer Audio Waveform Visualizer */}
      <div className="absolute bottom-0 left-0 right-0 h-6 flex items-end justify-center gap-1.5 opacity-20 pointer-events-none px-4">
        {[0.6, 1.0, 0.4, 0.9, 0.7, 1.0, 0.5, 0.8, 0.6, 0.4, 0.9, 0.7, 1.0, 0.5, 0.8, 0.4, 0.9, 0.6, 0.9, 0.5].map((scale, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-blue-600 via-indigo-500 to-purple-500 rounded-t-full"
            style={{
              height: `${Math.round(scale * 24)}px`
            }}
          />
        ))}
      </div>
    </div>
  );
});

GenZBackground.displayName = 'GenZBackground';




