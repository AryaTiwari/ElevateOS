import React, { memo, useState } from 'react';
import { ReelCreatorContext } from '../../types';

interface CreatorContextFormProps {
  context: ReelCreatorContext;
  onChange: (updates: Partial<ReelCreatorContext>) => void;
  disabled?: boolean;
}

const PRESET_NICHES = [
  'Fitness',
  'Fashion',
  'Gaming',
  'Education',
  'Finance',
  'Beauty',
  'Lifestyle',
  'Comedy',
  'Business',
  'Technology',
];

export const CreatorContextForm: React.FC<CreatorContextFormProps> = memo(({
  context,
  onChange,
  disabled = false,
}) => {
  const [isCustomNiche, setIsCustomNiche] = useState(
    !PRESET_NICHES.includes(context.niche) && Boolean(context.niche)
  );

  const handleNicheSelect = (niche: string) => {
    setIsCustomNiche(false);
    onChange({ niche });
  };

  const handleCustomNicheClick = () => {
    setIsCustomNiche(true);
    if (PRESET_NICHES.includes(context.niche)) {
      onChange({ niche: '' });
    }
  };

  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <span>✨</span>
          <span>Creator Context</span>
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Provide four quick data points so Elevate AI can tailor its findings to your exact stage and audience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* INPUT 1: Current Followers */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>👥</span>
            <span>Current Followers</span>
          </label>
          <input
            type="text"
            value={context.followers}
            onChange={(e) => onChange({ followers: e.target.value })}
            placeholder="e.g. 25,000"
            disabled={disabled}
            className="w-full px-4 py-3 rounded-2xl bg-[#0C111D]/90 border border-slate-700/80 focus:border-pink-500 focus:outline-hidden text-sm font-semibold text-white placeholder-slate-500 transition-all disabled:opacity-50"
          />
        </div>

        {/* INPUT 2: Average Reel Views */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>👁️</span>
            <span>Average Reel Views</span>
          </label>
          <input
            type="text"
            value={context.averageViews}
            onChange={(e) => onChange({ averageViews: e.target.value })}
            placeholder="e.g. 8,000"
            disabled={disabled}
            className="w-full px-4 py-3 rounded-2xl bg-[#0C111D]/90 border border-slate-700/80 focus:border-purple-500 focus:outline-hidden text-sm font-semibold text-white placeholder-slate-500 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* INPUT 3: Niche Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span>🎯</span>
          <span>Niche</span>
        </label>
        
        {/* Preset Badges */}
        <div className="flex flex-wrap gap-2">
          {PRESET_NICHES.map((preset) => {
            const isSelected = !isCustomNiche && context.niche === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => handleNicheSelect(preset)}
                disabled={disabled}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500 text-white shadow-md shadow-pink-500/20'
                    : 'bg-[#0C111D]/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                } disabled:opacity-50`}
              >
                {preset}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleCustomNicheClick}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              isCustomNiche
                ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500 text-white shadow-md shadow-pink-500/20'
                : 'bg-[#0C111D]/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
            } disabled:opacity-50`}
          >
            <span>✏️</span>
            <span>Custom Niche</span>
          </button>
        </div>

        {/* Custom Niche Text Input if Custom selected */}
        {isCustomNiche && (
          <div className="pt-2">
            <input
              type="text"
              value={context.niche}
              onChange={(e) => onChange({ niche: e.target.value })}
              placeholder="Enter your specific niche (e.g. AI Prompt Engineering)"
              disabled={disabled}
              className="w-full px-4 py-3 rounded-2xl bg-[#0C111D]/90 border border-pink-500/50 focus:border-pink-500 focus:outline-hidden text-sm font-semibold text-white placeholder-slate-500 transition-all disabled:opacity-50"
            />
          </div>
        )}
      </div>

      {/* INPUT 4: Target Audience */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span>📍</span>
          <span>Target Audience</span>
        </label>
        <input
          type="text"
          value={context.targetAudience}
          onChange={(e) => onChange({ targetAudience: e.target.value })}
          placeholder="e.g. Founders, early-stage developers & tech hobbyists in India"
          disabled={disabled}
          className="w-full px-4 py-3 rounded-2xl bg-[#0C111D]/90 border border-slate-700/80 focus:border-pink-500 focus:outline-hidden text-sm font-semibold text-white placeholder-slate-500 transition-all disabled:opacity-50"
        />
        <p className="text-[11px] text-slate-400 font-medium">
          Optional but recommended. Helps AI judge tone, delivery pacing, and hook angles for your specific viewer demographic.
        </p>
      </div>
    </div>
  );
});
