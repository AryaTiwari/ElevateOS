import React, { memo } from 'react';

export const GenZBackground: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none gpu-layer">
      {/* Gen Z Colorful Soft Mesh Ambient Glows - GPU Accelerated CSS Compositing */}
      <div 
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-pink-300/25 via-purple-300/15 to-blue-300/15 rounded-full blur-[60px] animate-smooth-pulse gpu-layer" 
        style={{ animationDuration: '9s', willChange: 'transform, opacity' }} 
      />
      <div 
        className="absolute top-[25%] -right-32 w-[550px] h-[550px] bg-gradient-to-tr from-sky-300/25 via-indigo-200/20 to-pink-200/20 rounded-full blur-[70px] animate-smooth-pulse gpu-layer" 
        style={{ animationDuration: '11s', animationDelay: '1s', willChange: 'transform, opacity' }} 
      />
      <div 
        className="absolute top-[55%] -left-20 w-[450px] h-[450px] bg-gradient-to-br from-purple-200/25 via-pink-300/15 to-amber-200/15 rounded-full blur-[60px] animate-smooth-pulse gpu-layer" 
        style={{ animationDuration: '10s', animationDelay: '2s', willChange: 'transform, opacity' }} 
      />
      <div 
        className="absolute bottom-[-100px] right-10 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/20 via-emerald-200/15 to-purple-200/15 rounded-full blur-[80px] animate-smooth-pulse gpu-layer" 
        style={{ animationDuration: '13s', animationDelay: '0.5s', willChange: 'transform, opacity' }} 
      />

      {/* Subtle Dot Grid Matrix overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] gpu-layer" 
        style={{
          backgroundImage: `radial-gradient(#3B82F6 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
});

GenZBackground.displayName = 'GenZBackground';

