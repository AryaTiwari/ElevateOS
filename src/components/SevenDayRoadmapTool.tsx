import React, { useState, useEffect, memo } from 'react';
import { SevenDayRoadmapInput, SevenDayRoadmapResult } from '../types';
import { Target, Sparkles, Loader2, ArrowRight, RefreshCw, Calendar, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SevenDayRoadmapToolProps {
  onOpenBooking: () => void;
}

const NICHES = [
  'Business',
  'Fitness',
  'Finance',
  'Education',
  'Lifestyle',
  'Tech',
  'Gaming',
  'Fashion',
  'Other'
];

const STAGES = [
  'Just Starting',
  'Growing',
  'Established'
];

const GOALS = [
  'Grow Followers',
  'Increase Views',
  'Build Authority',
  'Get Brand Deals',
  'Monetize',
  'Improve Content'
];

const LOADING_MESSAGES = [
  'Understanding your goal...',
  'Identifying your biggest bottleneck...',
  'Mapping your first priorities...',
  'Building your 7-day roadmap...'
];

export const SevenDayRoadmapTool: React.FC<SevenDayRoadmapToolProps> = memo(({ onOpenBooking }) => {
  const [formData, setFormData] = useState<SevenDayRoadmapInput>({
    creatorName: '',
    niche: 'Business',
    audienceStage: 'Growing',
    mainGoal: 'Increase Views',
    currentBottleneck: 'Low views'
  });

  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [result, setResult] = useState<SevenDayRoadmapResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cycle loading messages while generating
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingMsgIdx(0);
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      if (data && data.success && data.roadmap && Array.isArray(data.roadmap.days)) {
        setResult(data.roadmap);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error("Roadmap generation error:", err);
      setErrorMessage("Elevate AI couldn't build your roadmap right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* FORM CARD */}
      {!result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm">
              🚀
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                ELEVATE AI — 7-DAY CREATOR ROADMAP
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Get a quick, surface-level 7-day action plan tailored to your goal and current bottleneck.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-xs font-bold text-red-700">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={handleSubmit}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-[11px] uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* CREATOR NAME */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  1. Creator Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.creatorName}
                  onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs font-bold text-slate-900 focus:outline-none transition-all"
                />
              </div>

              {/* MAIN NICHE */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  2. Main Niche
                </label>
                <select
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs font-bold text-slate-900 focus:outline-none transition-all cursor-pointer"
                >
                  {NICHES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* AUDIENCE STAGE */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                3. Audience Stage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, audienceStage: s })}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      formData.audienceStage === s
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN GOAL */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                4. Main Goal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, mainGoal: g })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      formData.mainGoal === g
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* BIGGEST CURRENT PROBLEM */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                5. Biggest Current Problem
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Low views, low retention, don't know what to post"
                value={formData.currentBottleneck}
                onChange={(e) => setFormData({ ...formData, currentBottleneck: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs font-bold text-slate-900 focus:outline-none transition-all"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Generate 7-Day Roadmap →</span>
            </button>
          </form>
        </motion.div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-indigo-200 rounded-3xl p-12 text-center space-y-6 shadow-xl"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Elevate AI is building your first 7 days...
            </h3>
            <p className="text-xs sm:text-sm font-bold text-indigo-600 min-h-[20px] transition-all">
              {LOADING_MESSAGES[loadingMsgIdx]}
            </p>
          </div>
          <p className="text-[11px] text-slate-400 font-medium max-w-sm mx-auto">
            Analyzing your niche ({formData.niche}), goal ({formData.mainGoal}), and primary bottleneck...
          </p>
        </motion.div>
      )}

      {/* RESULT STATE: YOUR 7-DAY CREATOR ROADMAP */}
      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* INTRO CARD */}
          <div className="bg-white border-2 border-indigo-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full inline-block mb-1">
                  ELEVATE AI DIREXION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  YOUR 7-DAY CREATOR ROADMAP
                </h2>
              </div>
              <button
                onClick={handleReset}
                className="self-start sm:self-auto px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Input</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-indigo-50/60 border border-indigo-100 p-4 rounded-2xl">
              {result.intro}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 pt-1">
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">👤 {result.creatorName}</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">🎯 Niche: {result.niche}</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">📈 Stage: {result.audienceStage}</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">⚡ Goal: {result.mainGoal}</span>
            </div>
          </div>

          {/* 7-DAY TIMELINE CARDS */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 px-1">
              7-Day Execution Timeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.days.map((d, idx) => (
                <motion.div
                  key={d.day || idx + 1}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border-2 border-slate-200 hover:border-indigo-400 rounded-2xl p-5 space-y-2 shadow-md transition-all relative flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black tracking-wider uppercase text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                        DAY {d.day}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      {d.focus}
                    </h4>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Action Step
                      </span>
                      <p className="text-xs font-bold text-slate-800 leading-snug">
                        {d.action}
                      </p>
                    </div>
                  </div>

                  {d.shortExplanation && (
                    <p className="text-[11px] text-slate-500 font-medium italic pt-1 border-t border-slate-100">
                      💡 {d.shortExplanation}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* CONVERSION SECTION */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-indigo-300 uppercase tracking-widest bg-indigo-950/80 border border-indigo-800/80 px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5 text-indigo-400" /> WANT THE FULL ROADMAP?
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready for the complete personalized execution plan?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                This is a surface-level roadmap designed to give you direction for your first 7 days. For a detailed roadmap built specifically around your content, audience, positioning, growth opportunities and monetization potential, book a free strategy session with the Elevate OS team.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg cursor-pointer shrink-0 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>Book Free Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* AI DISCLAIMER */}
          <p className="text-[10px] text-slate-400 text-center font-medium">
            Elevate AI provides a surface-level strategic direction based on the information provided. It is not a guarantee of growth, reach, or revenue.
          </p>
        </motion.div>
      )}
    </div>
  );
});

SevenDayRoadmapTool.displayName = 'SevenDayRoadmapTool';
