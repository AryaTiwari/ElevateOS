import React, { memo } from 'react';
import { Mic, Music, Volume2, Pause, Scissors, AlignCenter } from 'lucide-react';
import { AudioAndEditingNotes } from '../../types';

interface AudioAndEditingSectionProps {
  notes?: AudioAndEditingNotes;
}

export const AudioAndEditingSection: React.FC<AudioAndEditingSectionProps> = memo(({ notes }) => {
  if (!notes) return null;

  const cards = [
    {
      title: 'Voice Delivery',
      icon: <Mic className="w-4 h-4 text-pink-400" />,
      content: notes.voice,
      accent: 'border-pink-500/30'
    },
    {
      title: 'Music & Track Level',
      icon: <Music className="w-4 h-4 text-purple-400" />,
      content: notes.music,
      accent: 'border-purple-500/30'
    },
    {
      title: 'Sound Effects (SFX)',
      icon: <Volume2 className="w-4 h-4 text-amber-400" />,
      content: notes.soundEffects,
      accent: 'border-amber-500/30'
    },
    {
      title: 'Pauses & Dead Air',
      icon: <Pause className="w-4 h-4 text-rose-400" />,
      content: notes.pauses,
      accent: 'border-rose-500/30'
    },
    {
      title: 'Cuts & Transitions',
      icon: <Scissors className="w-4 h-4 text-cyan-400" />,
      content: notes.cutsAndTransitions,
      accent: 'border-cyan-500/30'
    },
    {
      title: 'Captions & Safe Zones',
      icon: <AlignCenter className="w-4 h-4 text-emerald-400" />,
      content: notes.captions,
      accent: 'border-emerald-500/30'
    },
  ];

  return (
    <div id="section-audio-editing" className="bg-[#101828]/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 inline-flex items-center gap-1.5 mb-2">
            <Scissors className="w-3 h-3" />
            <span>SECTION 6 • AUDIO & EDITING NOTES</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Pacing, Sound & Visual Polish
          </h2>
        </div>
        <span className="text-xs text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-xl hidden sm:inline-block">
          Technical Polish 🎚️
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            id={`audio-edit-card-${idx + 1}`}
            className="bg-[#0C111D] border border-slate-800 hover:border-cyan-500/40 p-4.5 rounded-2xl transition-all space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                {card.icon}
              </span>
              <h3 className="font-bold text-white text-sm">
                {card.title}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium pt-1 border-t border-slate-800/60">
              {card.content || 'Standard execution.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});
