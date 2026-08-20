import React, { useState, useEffect, useCallback, memo } from 'react';
import { ReelCreatorContext, ReelAnalysisResult, SavedReelAnalysisSummary, MonthlyUsageInfo } from '../../types';
import { validateReelFile, analyzeReelWithAI } from '../../utils/reelAnalyzer';
import {
  getSavedReelAnalyses,
  saveReelAnalysis,
  clearAllReelAnalyses,
  syncReelAnalysesFromCloud,
} from '../../utils/reelAnalyzerStorage';
import { fetchMonthlyUsage } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { ReelUploader } from './ReelUploader';
import { CreatorContextForm } from './CreatorContextForm';
import { AnalysisLoadingState } from './AnalysisLoadingState';
import { AnalysisResults } from './AnalysisResults';
import { RecentAnalyses } from './RecentAnalyses';

interface ReelAnalyzerProps {
  onOpenBooking?: () => void;
  onOpenFlagship?: () => void;
}

export const ReelAnalyzer: React.FC<ReelAnalyzerProps> = memo(({
  onOpenBooking,
  onOpenFlagship,
}) => {
  const { user, openAuthModal } = useAuth();

  // Input states
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [creatorContext, setCreatorContext] = useState<ReelCreatorContext>({
    followers: '',
    averageViews: '',
    niche: 'Fitness',
    targetAudience: '',
  });

  // Flow & Usage states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ReelAnalysisResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedReelAnalysisSummary[]>([]);
  const [usageInfo, setUsageInfo] = useState<MonthlyUsageInfo>({
    used: 0,
    limit: 5,
    remaining: 5,
    monthYear: new Date().toISOString().slice(0, 7),
    canAnalyze: true,
  });

  // Load history & usage on initial render and when user auth changes
  useEffect(() => {
    setHistory(getSavedReelAnalyses());

    // Fetch cloud usage quota
    fetchMonthlyUsage().then((info) => {
      setUsageInfo(info);
    });

    // Sync cloud history if available
    syncReelAnalysesFromCloud().then((cloudHistory) => {
      if (cloudHistory && cloudHistory.length > 0) {
        setHistory(cloudHistory);
      }
    });
  }, [user]);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleFileSelect = useCallback((file: File) => {
    setValidationError(null);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    const newUrl = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(newUrl);
  }, [videoUrl]);

  const handleRemoveFile = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoFile(null);
    setVideoUrl(null);
    setValidationError(null);
  }, [videoUrl]);

  const handleContextChange = useCallback((updates: Partial<ReelCreatorContext>) => {
    setCreatorContext((prev) => ({ ...prev, ...updates }));
    setValidationError(null);
  }, []);

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    setValidationError(null);

    // 1. Validate video file
    if (!videoFile) {
      setValidationError('Please upload your Reel video before analyzing.');
      return;
    }

    const fileCheck = validateReelFile(videoFile);
    if (!fileCheck.valid) {
      setValidationError(fileCheck.error || 'Invalid video file.');
      return;
    }

    // 2. Normalize creator context defaults
    const normalizedContext: ReelCreatorContext = {
      followers: creatorContext.followers.trim() || '10,000',
      averageViews: creatorContext.averageViews.trim() || '5,000',
      niche: creatorContext.niche.trim() || 'General Creator',
      targetAudience: creatorContext.targetAudience.trim() || 'Target Audience in India',
    };

    setIsAnalyzing(true);

    try {
      // Execute genuine multimodal video + audio AI analysis
      const analysis = await analyzeReelWithAI(
        videoFile,
        normalizedContext,
        videoUrl || undefined
      );

      // Save to recent history (local + Supabase)
      const updatedHistory = saveReelAnalysis(analysis);
      setHistory(updatedHistory);

      // Update usage state
      setUsageInfo((prev) => ({
        ...prev,
        used: Math.min(prev.limit, prev.used + 1),
        remaining: Math.max(0, prev.remaining - 1),
        canAnalyze: prev.used + 1 < prev.limit,
      }));

      setCurrentAnalysis(analysis);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Reel analysis error:', err);
      const userMessage = err?.message || "We couldn't analyze the Reel right now. Please try again.";
      setValidationError(userMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoFile(null);
    setVideoUrl(null);
    setCurrentAnalysis(null);
    setValidationError(null);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }, [videoUrl]);

  const handleSelectHistoryItem = useCallback((analysis: ReelAnalysisResult) => {
    setCurrentAnalysis(analysis);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  }, []);

  const handleClearHistory = useCallback(() => {
    clearAllReelAnalyses();
    setHistory([]);
  }, []);

  return (
    <div className="w-full space-y-12">
      {/* If currently viewing an analysis report */}
      {currentAnalysis ? (
        <AnalysisResults
          analysis={currentAnalysis}
          onReset={handleReset}
          onOpenBooking={onOpenBooking}
          onOpenFlagship={onOpenFlagship}
        />
      ) : (
        /* ANALYSIS INPUT & UPLOAD WORKFLOW */
        <div className="w-full space-y-8">
          {/* Monthly Usage Quota Bar & Auth Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#101828]/90 border border-slate-800 text-xs shadow-lg backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🎯</span>
              <div>
                <span className="font-bold text-white">Free Monthly Quota: </span>
                <span className="text-pink-300 font-extrabold">{usageInfo.used} / {usageInfo.limit} Reel Audits Used</span>
                <span className="text-slate-400 ml-1.5 font-medium">({usageInfo.remaining} remaining this month)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {Array.from({ length: usageInfo.limit }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold transition-all ${
                      i < usageInfo.used
                        ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/50'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>

              {!user && (
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="text-[10px] font-bold text-pink-300 hover:text-pink-200 border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 rounded-md transition-all cursor-pointer"
                >
                  Sign In to Sync ☁️
                </button>
              )}
            </div>
          </div>

          {/* Monthly Limit Reached Notice Banner */}
          {usageInfo.used >= usageInfo.limit && (
            <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <span className="text-lg">⚠️</span>
                <span>Monthly Free Limit Reached (5/5 Analyses Used)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                You've used all 5 free Reel analyses for this month ({usageInfo.monthYear}). To get unlimited 1-on-1 video audits and full strategy breakdowns, book a session with our growth team.
              </p>
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-4 py-2 bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2 shadow-md"
                >
                  <span>Book Free Strategy Session</span>
                  <span>👉</span>
                </button>
              )}
            </div>
          )}

          {/* UPLOAD SECTION */}
          <ReelUploader
            videoFile={videoFile}
            videoUrl={videoUrl}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            disabled={isAnalyzing}
          />

          {/* 4 CREATOR CONTEXT INPUTS */}
          <CreatorContextForm
            context={creatorContext}
            onChange={handleContextChange}
            disabled={isAnalyzing}
          />

          {/* Validation / Server Error Banner */}
          {validationError && (
            <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm font-medium animate-fadeIn">
              <span className="text-base shrink-0 mt-0.5">⚠️</span>
              <span>{validationError}</span>
            </div>
          )}

          {/* LOADING STATE OR ANALYZE BUTTON */}
          {isAnalyzing ? (
            <AnalysisLoadingState fileName={videoFile?.name} />
          ) : (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full sm:w-auto min-w-[280px] px-8 py-4.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-pink-950/40 cursor-pointer inline-flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>🧠</span>
                <span>Analyze My Reel</span>
                <span>⚡</span>
              </button>
              <p className="text-[11px] text-slate-400 font-medium mt-3">
                No credit card required • Genuine multimodal video & audio intelligence
              </p>
            </div>
          )}

          {/* RECENT ANALYSES (LAST 5) */}
          {!isAnalyzing && (
            <div className="pt-4">
              <RecentAnalyses
                history={history}
                onSelectAnalysis={handleSelectHistoryItem}
                onClearHistory={handleClearHistory}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});
