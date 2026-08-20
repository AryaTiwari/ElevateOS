import React, { memo } from 'react';
import { AudioForensics } from '../../types';

interface AudioForensicsSectionProps {
  audioForensics: AudioForensics;
}

export const AudioForensicsSection: React.FC<AudioForensicsSectionProps> = memo(({ audioForensics }) => {
  if (!audioForensics) return null;

  return (
    <div className="bg-[#101828]/95 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30 inline-flex items-center gap-1 mb-1.5">
            <span>🎙️</span>
            <span>AUDIO & VOCAL STRATEGY</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Audio Forensics & Spoken Delivery
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
          <span>{audioForensics.spokenDialogueDetected ? '🗣️ Speech Detected' : '🎵 Instrumental / Ambience'}</span>
        </div>
      </div>

      {/* Transcript Excerpt (if spoken content detected) */}
      {audioForensics.transcriptExcerpt && (
        <div className="bg-[#0C111D]/90 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs">📜</span>
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
              Detected Spoken Quote / Key Dialogue
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-200 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 italic">
            "{audioForensics.transcriptExcerpt}"
          </p>
        </div>
      )}

      {/* Grid of Audio metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
        {/* 1. Spoken Delivery */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <span className="text-[10px] font-black text-purple-300 uppercase tracking-wider flex items-center gap-1">
            <span>🗣️</span>
            <span>Spoken Delivery & Cadence</span>
          </span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {audioForensics.spokenDelivery}
          </p>
        </div>

        {/* 2. Speed & Pacing */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <span className="text-[10px] font-black text-pink-300 uppercase tracking-wider flex items-center gap-1">
            <span>⚡</span>
            <span>Speech Speed & Pacing</span>
          </span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {audioForensics.speechSpeedAndPacing}
          </p>
        </div>

        {/* 3. Pauses & Breaths */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
            <span>⏸️</span>
            <span>Pauses & Dead Air</span>
          </span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {audioForensics.pausesAndBreaths}
          </p>
        </div>

        {/* 4. Vocal Energy & Tone */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1">
            <span>🔥</span>
            <span>Vocal Energy & Authority</span>
          </span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {audioForensics.vocalEnergyAndTone}
          </p>
        </div>

        {/* 5. Music Track Balance */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <span className="text-[10px] font-black text-cyan-300 uppercase tracking-wider flex items-center gap-1">
            <span>🎶</span>
            <span>Music & Voice Balance</span>
          </span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {audioForensics.musicTrackBalance}
          </p>
        </div>

        {/* 6. Sound Effects & AV Sync */}
        <div className="bg-[#0C111D]/80 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1">
            <span>🔊</span>
            <span>Sound Effects & AV Sync</span>
          </span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {audioForensics.soundEffectsUsage} • {audioForensics.audioVisualSync}
          </p>
        </div>
      </div>
    </div>
  );
});
