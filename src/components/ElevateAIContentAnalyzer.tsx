import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  TrendingUp,
  Target,
  Flame,
  ArrowRight,
  History,
  FileText,
  Lightbulb,
  Layers,
  Bot,
  Brain,
  MessageSquare,
  Bookmark,
  Share2,
  ShieldCheck,
  HelpCircle,
  Wand2,
  Calendar
} from 'lucide-react';
import { ContentAnalysisResult } from '../utils/contentAnalyzer';

interface ElevateAIContentAnalyzerProps {
  onOpenBooking: () => void;
  onOpenFlagship: () => void;
}

interface SavedAnalysis {
  id: string;
  timestamp: number;
  preview: string;
  score: number;
  report: ContentAnalysisResult;
}

const EXAMPLE_SCRIPTS = [
  {
    title: "Viral Myth Hook (Strong)",
    script: `Most creators think posting every day is the secret to growing on Instagram. It's not.\n\nThe real reason your Reels cap at 500 views is you aren't creating a curiosity gap in the first 2 seconds.\n\nHere are 3 exact steps to fix it:\n1. Open with a bold, contrarian statement\n2. Show proof or visual context by second 3\n3. Deliver the payoff before 15 seconds\n\nComment "REEL" below and I'll send you my free 5-minute Hook Vault!`,
    niche: "Business",
    goal: "Grow followers",
    targetAudience: "Aspiring content creators and influencers"
  },
  {
    title: "Finance / Money Tip (High Save)",
    script: `Here is a secret bank setting that saves you ₹15,000 every year automatically.\n\nStep 1: Open your mobile banking app and navigate to auto-sweep.\nStep 2: Set your threshold limit to ₹25,000.\nStep 3: Any extra money gets swept into high-yield liquid FD interest rates while keeping instant liquidity.\n\nSave this Reel for your next salary day or DM me "INVEST" for the step-by-step PDF!`,
    niche: "Finance",
    goal: "Generate leads",
    targetAudience: "Salaried professionals wanting wealth hacks"
  },
  {
    title: "Generic Fitness Tip (Needs Improvement)",
    script: `If you want to lose weight, stop skipping breakfast and drink more water.\n\nWorking out 5 days a week and eating clean is the only way to get fit.\n\nFollow me for more daily fitness tips!`,
    niche: "Fitness",
    goal: "Increase engagement",
    targetAudience: "Beginner gym goers"
  }
];

const LOADING_STATUSES = [
  "Studying your hook...",
  "Checking retention potential...",
  "Analyzing viewer psychology...",
  "Evaluating shareability...",
  "Comparing content patterns...",
  "Building your creator report..."
];

export const ElevateAIContentAnalyzer: React.FC<ElevateAIContentAnalyzerProps> = memo(({
  onOpenBooking,
  onOpenFlagship
}) => {
  // Input states
  const [script, setScript] = useState('');
  const [concept, setConcept] = useState('');
  const [hook, setHook] = useState('');
  const [cta, setCta] = useState('');
  const [niche, setNiche] = useState('Business');
  const [targetAudience, setTargetAudience] = useState('');
  const [creatorGoal, setCreatorGoal] = useState('Grow followers');

  // UI state
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ContentAnalysisResult | null>(null);
  const [showImproved, setShowImproved] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedAnalysis[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('elevate_ai_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load analysis history", e);
    }
  }, []);

  // Save analysis to history
  const saveToHistory = useCallback((res: ContentAnalysisResult, scriptText: string) => {
    const newEntry: SavedAnalysis = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      preview: scriptText.slice(0, 50) + (scriptText.length > 50 ? '...' : ''),
      score: res.overallScore,
      report: res
    };
    setHistory(prev => {
      const updated = [newEntry, ...prev.filter(item => item.preview !== newEntry.preview)].slice(0, 10);
      try {
        localStorage.setItem('elevate_ai_history', JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save analysis history", e);
      }
      return updated;
    });
  }, []);

  // Cycle loading status text
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingIndex(prev => (prev + 1) % LOADING_STATUSES.length);
      }, 1600);
    } else {
      setLoadingIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    if (loading) return;
    if (!script.trim() && !concept.trim() && !hook.trim()) {
      setError("Please paste a script, hook, or content concept to analyze.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          script,
          concept,
          hook,
          cta,
          niche,
          targetAudience,
          creatorGoal
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Elevate AI couldn't analyze this content right now. Please try again.");
      }

      setReport(data.report);
      setShowImproved(true);
      saveToHistory(data.report, script || concept || hook);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err?.message || "Elevate AI couldn't analyze this content right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLoadExample = (example: typeof EXAMPLE_SCRIPTS[0]) => {
    setScript(example.script);
    setNiche(example.niche);
    setCreatorGoal(example.goal);
    setTargetAudience(example.targetAudience);
    setError(null);
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
    setShowImproved(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
    if (score >= 65) return 'text-purple-300 bg-purple-500/15 border-purple-500/30';
    return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-500';
    if (score >= 65) return 'from-pink-500 via-purple-500 to-indigo-500';
    return 'from-amber-500 to-orange-500';
  };

  return (
    <div className="w-full relative gpu-layer">
      {/* SECTION CONTAINER */}
      <div className="bg-[#101828]/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-black/40 relative overflow-hidden text-slate-100">
        
        {/* TOP BRAND HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-black uppercase tracking-widest mb-2">
              <Brain className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>ELEVATE AI</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">CONTENT ANALYZER</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Analyze. Improve. <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">Elevate.</span> ⚡
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Your AI-powered Reels content strategist. Get dynamic retention, hook, and virality analysis.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {history.length > 0 && (
              <button
                onClick={() => setShowHistoryModal(!showHistoryModal)}
                className="px-3 py-2 rounded-xl border border-slate-700 hover:border-pink-500/50 bg-slate-800/80 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all hover:bg-slate-800 cursor-pointer"
              >
                <History className="w-3.5 h-3.5 text-pink-400" />
                <span>Recent Analyses ({history.length})</span>
              </button>
            )}
            {report && (
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Analysis</span>
              </button>
            )}
          </div>
        </div>

        {/* RECENT ANALYSES DROPDOWN MODAL */}
        <AnimatePresence>
          {showHistoryModal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-4 bg-[#0C111D] border border-slate-800 rounded-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-black uppercase text-pink-300 tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-pink-400" /> Your Saved Analysis History
                </span>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {history.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setReport(item.report);
                      setShowHistoryModal(false);
                    }}
                    className="p-3 bg-[#121A2D] border border-slate-800 rounded-xl hover:border-pink-500/50 text-left transition-all group flex items-start justify-between gap-2 cursor-pointer shadow-sm"
                  >
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-200 truncate group-hover:text-pink-400 transition-colors">
                        "{item.preview}"
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-lg border shrink-0 ${getScoreColor(item.score)}`}>
                      {item.score}/100
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* INPUT VIEW (EMPTY STATE / FORM) */}
        {/* ========================================================= */}
        {!report && !loading && (
          <div className="space-y-8">
            {/* HERO PROMPT CARD */}
            <div className="p-6 bg-gradient-to-br from-[#121A2D] via-[#16122C] to-[#121A2D] border border-pink-500/20 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-pink-400" />
                  <h4 className="text-lg font-black text-white">
                    Don't guess why your Reel isn't working.
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Paste your Reel script, video concept, or hook below. Elevate AI analyzes your 3-second retention, curiosity gap, shareability, and psychological triggers against current Reels best practices.
                </p>
              </div>

              {/* QUICK EXAMPLE LOAD BUTTONS */}
              <div className="w-full md:w-auto shrink-0 space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
                  ⚡ Try Example Scripts:
                </span>
                <div className="flex flex-wrap md:flex-col gap-1.5">
                  {EXAMPLE_SCRIPTS.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => handleLoadExample(ex)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-300 bg-[#0C111D] border border-slate-700 hover:border-pink-500/60 hover:text-pink-300 rounded-lg transition-all text-left truncate max-w-[220px] cursor-pointer shadow-sm"
                    >
                      ✨ {ex.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM INPUTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* PRIMARY CONTENT INPUT */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-pink-400" />
                      Paste Your Reel Script or Content Idea <span className="text-pink-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {script.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    rows={8}
                    placeholder={`Paste your Reel script here...\n\nExample:\n"Most creators think posting every day is the secret to growing. It's not. The real reason your Reels cap at 500 views is..."`}
                    className="w-full p-4 text-sm font-medium text-slate-100 bg-[#0C111D] border border-slate-800 rounded-2xl focus:border-pink-500 focus:bg-[#0E1526] focus:outline-none transition-all placeholder:text-slate-500 resize-y shadow-inner"
                  />
                </div>

                {/* OPTIONAL CTA & HOOK INPUTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Opening Hook (Optional Override)
                    </label>
                    <input
                      type="text"
                      value={hook}
                      onChange={(e) => setHook(e.target.value)}
                      placeholder="e.g., Stop doing this if you want 100k views..."
                      className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#0C111D] border border-slate-800 text-slate-100 rounded-xl focus:border-pink-500 focus:outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Closing CTA (Optional Override)
                    </label>
                    <input
                      type="text"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                      placeholder="e.g., Comment 'REEL' for my free PDF!"
                      className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#0C111D] border border-slate-800 text-slate-100 rounded-xl focus:border-pink-500 focus:outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* METADATA SIDEBAR */}
              <div className="lg:col-span-4 bg-[#0C111D] border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-xs font-black uppercase text-pink-300 tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-pink-400" /> Target Creator Profile
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Optional details to personalize your analysis criteria.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                    Primary Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-[#121A2D] text-slate-200 border border-slate-700 rounded-xl focus:border-pink-500 focus:outline-none"
                  >
                    <option value="Business">Business & Marketing</option>
                    <option value="Finance">Finance & Investing</option>
                    <option value="Tech">Tech, AI & Software</option>
                    <option value="Fitness">Fitness & Health</option>
                    <option value="Education">Education & Self-Improvement</option>
                    <option value="Lifestyle">Lifestyle & Vlogs</option>
                    <option value="Fashion">Fashion & Beauty</option>
                    <option value="Travel">Travel & Food</option>
                    <option value="Gaming">Gaming & Entertainment</option>
                    <option value="Other">Other / Creative</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                    Primary Creator Goal
                  </label>
                  <select
                    value={creatorGoal}
                    onChange={(e) => setCreatorGoal(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-[#121A2D] text-slate-200 border border-slate-700 rounded-xl focus:border-pink-500 focus:outline-none"
                  >
                    <option value="Grow followers">Grow Followers & Reach</option>
                    <option value="Increase views">Maximize Views & Virality</option>
                    <option value="Generate leads">Generate Leads & Inquiries</option>
                    <option value="Sell products">Sell Products & Courses</option>
                    <option value="Get brand deals">Attract Paid Brand Deals</option>
                    <option value="Build authority">Build High-Ticket Authority</option>
                    <option value="Increase engagement">Boost DMs & Comments</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                    Target Audience (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., Freelancers earning under ₹50k/mo"
                    className="w-full px-3 py-2 text-xs font-medium bg-[#121A2D] text-slate-200 border border-slate-700 rounded-xl focus:border-pink-500 focus:outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl flex items-center justify-between gap-3 text-red-300 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={handleAnalyze}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="text-center pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAnalyze}
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-white transition-all cursor-pointer shadow-lg shadow-pink-950/40 flex items-center justify-center gap-2.5 mx-auto active:translate-y-0.5"
              >
                <Brain className="w-5 h-5 text-white" />
                <span>Analyze My Content →</span>
              </motion.button>
              <p className="text-[11px] text-slate-400 font-semibold mt-2.5">
                ⚡ Powered by Gemini AI • 100% Free Creator Tool
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* LOADING STATE (Silky 120 FPS GPU Accelerated) */}
        {/* ========================================================= */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="py-12 sm:py-16 text-center space-y-8 max-w-lg mx-auto gpu-layer"
          >
            {/* Dual Orbital High-FPS Glow Spinner */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              {/* Outer Ambient Aura */}
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-xl animate-glow-pulse pointer-events-none" />
              
              {/* Outer Track Ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-slate-800" />
              
              {/* Outer High-FPS Gradient Spinning Arc */}
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-pink-500 border-r-purple-500 animate-spin-smooth" />
              
              {/* Inner Counter-Rotating Ring */}
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-amber-400 border-l-purple-400 animate-spin-reverse opacity-75" />
              
              {/* Central Glowing Icon */}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[#0C111D] shadow-md border border-slate-700 flex items-center justify-center">
                <Brain className="w-6 h-6 text-pink-400 animate-smooth-pulse" />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-display font-bold text-white tracking-tight">
                Elevate AI is analyzing your content
              </h4>
              
              {/* High-FPS Staggered Status Badge */}
              <div className="min-h-[32px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={loadingIndex}
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-pink-500/15 border border-pink-500/30 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                    <span className="text-xs font-sans font-semibold text-pink-300 tracking-wide">
                      {LOADING_STATUSES[loadingIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* GPU Hardware-Accelerated Progress Track with High-FPS Shimmer Beam */}
            <div className="space-y-2 max-w-sm mx-auto">
              <div className="relative w-full bg-slate-800/90 h-2.5 rounded-full overflow-hidden border border-slate-700 shadow-inner">
                {/* Expanding Base Bar via GPU Transform */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 rounded-full"
                  initial={{ width: "12%" }}
                  animate={{ width: "94%" }}
                  transition={{ duration: 5.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* High-FPS Shimmer Beam */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-smooth-shimmer" />
                </motion.div>
              </div>
              <div className="flex justify-between text-[10px] font-sans font-medium text-slate-400 px-1">
                <span>Hook & Pacing Audit</span>
                <span>Retention & Conversion Engine</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* REPORT RESULTS VIEW */}
        {/* ========================================================= */}
        {report && !loading && (
          <div className="space-y-10">

            {/* 1. OVERALL SCORE & SUMMARY CARD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* SCORE BADGE GAUGE */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0C111D] via-[#16122C] to-[#0C111D] text-white rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden border border-slate-800 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                <span className="text-[11px] font-black uppercase text-pink-400 tracking-widest bg-pink-500/15 border border-pink-500/30 px-3 py-1 rounded-full mb-4">
                  ELEVATE CONTENT SCORE
                </span>

                {/* Score Number Display */}
                <div className="relative my-2 flex items-baseline justify-center gap-1">
                  <span className="text-6xl sm:text-7xl font-display font-bold tracking-tight text-white">
                    {report.overallScore}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-slate-400">/100</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden my-3 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${report.overallScore}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(report.overallScore)}`}
                  />
                </div>

                <p className="text-xs font-bold text-slate-300 mt-2">
                  {report.overallScore >= 80 ? '🔥 Virality-Ready Script Structure' : report.overallScore >= 65 ? '⚡ High Potential — Minor Fixes Needed' : '⚠️ High Drop-off Risk — Optimization Needed'}
                </p>
              </div>

              {/* PERSONALIZED SUMMARY & VERDICT */}
              <div className="lg:col-span-7 bg-[#0C111D] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-pink-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-wider text-pink-300">
                      ELEVATE AI ANALYSIS
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    "{report.summary}"
                  </h4>
                </div>

                <div className="p-4 bg-[#121A2D] border border-slate-800 rounded-2xl space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-pink-400 tracking-wider block">
                    AI Content Strategist's Verdict:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    {report.verdict}
                  </p>
                </div>

                {report.biggestChange && (
                  <div className="p-4 bg-[#24170E]/80 border border-amber-500/30 rounded-2xl flex items-start gap-3">
                    <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                        THE BIGGEST CHANGE I'D MAKE:
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                        {report.biggestChange}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. PERFORMANCE BREAKDOWN (10 INDIVIDUAL SCORES) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-pink-400" />
                    PERFORMANCE BREAKDOWN
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    10 core psychological & algorithmic dimensions analyzed for your script.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  { key: 'hook', name: 'HOOK STRENGTH', icon: Flame, item: report.scores.hook },
                  { key: 'retention', name: 'RETENTION POTENTIAL', icon: TrendingUp, item: report.scores.retention },
                  { key: 'value', name: 'VALUE DENSITY', icon: Lightbulb, item: report.scores.value },
                  { key: 'shareability', name: 'SHAREABILITY', icon: Share2, item: report.scores.shareability },
                  { key: 'saveability', name: 'SAVEABILITY', icon: Bookmark, item: report.scores.saveability },
                  { key: 'emotionalImpact', name: 'EMOTIONAL IMPACT', icon: Zap, item: report.scores.emotionalImpact },
                  { key: 'originality', name: 'ORIGINALITY', icon: Sparkles, item: report.scores.originality },
                  { key: 'clarity', name: 'CLARITY & PACING', icon: FileText, item: report.scores.clarity },
                  { key: 'cta', name: 'CALL TO ACTION', icon: Target, item: report.scores.cta },
                  { key: 'trendAlignment', name: 'TREND ALIGNMENT', icon: ShieldCheck, item: report.scores.trendAlignment }
                ].map(({ key, name, icon: Icon, item }) => (
                  <div
                    key={key}
                    className="p-4 bg-[#0C111D] border border-slate-800 hover:border-pink-500/50 rounded-2xl transition-all shadow-sm space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-black text-slate-200 tracking-wider uppercase flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-pink-400" />
                          {name}
                        </span>
                        {item.indicator && (
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                            item.indicator.includes('Strong') ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                            item.indicator.includes('Moderate') ? 'bg-purple-500/15 text-purple-300 border-purple-500/30' :
                            'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          }`}>
                            {item.indicator}
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between my-1">
                        <span className="text-xl font-black text-white">
                          {item.score}<span className="text-xs font-bold text-slate-400">/10</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-medium leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full ${item.score >= 8 ? 'bg-emerald-500' : item.score >= 6.5 ? 'bg-pink-500' : 'bg-amber-500'}`}
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. STRENGTHS & WEAKNESSES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* STRENGTHS */}
              <div className="p-6 bg-[#0E1F1A]/80 border border-emerald-500/30 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-black uppercase tracking-wider text-emerald-300">
                    WHAT YOU'RE DOING RIGHT
                  </h4>
                </div>
                <div className="space-y-2">
                  {report.strengths.map((st, idx) => (
                    <div key={idx} className="p-3 bg-[#0C111D] border border-emerald-500/20 rounded-xl text-xs font-bold text-slate-200 flex items-start gap-2 shadow-sm">
                      <span className="shrink-0">{st.startsWith('🔥') ? '' : '🔥'}</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WEAKNESSES */}
              <div className="p-6 bg-[#24170E]/80 border border-amber-500/30 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-500/30">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-black uppercase tracking-wider text-amber-300">
                    WHERE YOU'RE LOSING POTENTIAL
                  </h4>
                </div>
                <div className="space-y-2">
                  {report.weaknesses.map((wk, idx) => (
                    <div key={idx} className="p-3 bg-[#0C111D] border border-amber-500/20 rounded-xl text-xs font-bold text-slate-200 flex items-start gap-2 shadow-sm">
                      <span className="shrink-0">{wk.startsWith('⚠️') ? '' : '⚠️'}</span>
                      <span>{wk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. HOOK IMPROVEMENTS */}
            {report.hookSuggestions && report.hookSuggestions.length > 0 && (
              <div className="p-6 bg-[#121A2D] border border-pink-500/30 rounded-3xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-pink-400" />
                    <h4 className="text-sm font-black uppercase tracking-wider text-pink-300">
                      YOUR STRONGER HOOK OPTIONS
                    </h4>
                  </div>
                  <span className="text-[11px] text-purple-300 font-bold">
                    3 Psychological Angles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {report.hookSuggestions.map((hs, idx) => (
                    <div key={idx} className="p-4 bg-[#0C111D] border border-slate-800 rounded-2xl space-y-2 flex flex-col justify-between shadow-sm">
                      <div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded-md inline-block mb-1.5 border border-pink-500/30">
                          {hs.angle} Angle
                        </span>
                        <p className="text-xs font-bold text-white leading-snug">
                          "{hs.hook}"
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopyText(hs.hook, `hook-${idx}`)}
                        className="mt-3 text-[11px] font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === `hook-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === `hook-${idx}` ? 'Copied!' : 'Copy Hook'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. RETENTION FIX & TREND FIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RETENTION FIX */}
              <div className="p-6 bg-[#0C111D] border border-slate-800 rounded-3xl space-y-3">
                <span className="text-xs font-black uppercase text-pink-300 tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-pink-400" /> RETENTION FIX & PACING
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed bg-[#121A2D] p-4 rounded-2xl border border-slate-800">
                  {report.retentionFix}
                </p>
              </div>

              {/* TREND FIT */}
              <div className="p-6 bg-[#0C111D] border border-slate-800 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-emerald-300 tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> TREND FIT & FORMAT
                  </span>
                  <span className="text-xs font-black px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg">
                    {report.trendAnalysis.score}/10
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed bg-[#121A2D] p-4 rounded-2xl border border-slate-800">
                  {report.trendAnalysis.explanation}
                </p>
              </div>
            </div>

            {/* 6. CONTENT REWRITE / IMPROVED VERSION */}
            {report.improvedVersion && (
              <div className="p-6 bg-[#0C111D] text-white border border-slate-800 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-pink-400" />
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-white">
                        ELEVATE AI IMPROVED REWRITE
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Optimized for retention, curiosity, and high CTA conversion.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowImproved(!showImproved)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    {showImproved ? 'Hide Improved Script' : '✨ View Improved Script'}
                  </button>
                </div>

                {showImproved && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <div className="p-4 bg-[#121A2D] border border-slate-800 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed text-slate-200 whitespace-pre-wrap">
                      {report.improvedVersion}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCopyText(report.improvedVersion, 'improved-script')}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
                      >
                        {copiedKey === 'improved-script' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedKey === 'improved-script' ? 'Copied Improved Script!' : 'Copy Improved Script'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* 7. BOTTOM CTA BRIDGE */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0C111D] via-[#1E1B4B] to-[#18112C] border border-pink-500/30 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-[11px] font-black uppercase tracking-widest bg-pink-500/20 border border-pink-500/30 px-3 py-1 rounded-full text-pink-200 inline-block">
                  NEXT LEVEL CREATOR SYSTEMS
                </span>
                <h4 className="text-xl sm:text-2xl font-black tracking-tight">
                  Want us to build your complete content engine?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
                  Book a free strategy session with Arya Tiwari to unlock custom positioning, content scripts, and high-margin monetization.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-pink-950/30 flex items-center gap-2 justify-center active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Free Strategy Session</span>
                </button>
                <button
                  onClick={onOpenFlagship}
                  className="px-5 py-3.5 bg-[#121A2D] hover:bg-[#18233D] text-slate-200 border border-slate-700 hover:border-pink-500/50 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 justify-center active:scale-[0.98]"
                >
                  <span>Creator Program</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
});

ElevateAIContentAnalyzer.displayName = 'ElevateAIContentAnalyzer';
