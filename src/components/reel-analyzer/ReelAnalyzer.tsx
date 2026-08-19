import React, { useState, useEffect, useCallback, memo } from 'react';
import { Sparkles, Brain, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import { ReelCreatorContext, ReelAnalysisResult, SavedReelAnalysisSummary } from '../../types';
import { validateReelFile, analyzeReelWithAI } from '../../utils/reelAnalyzer';
import {
  getSavedReelAnalyses,
  saveReelAnalysis,
  clearAllReelAnalyses,
} from '../../utils/reelAnalyzerStorage';
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
  // Input states
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [creatorContext, setCreatorContext] = useState<ReelCreatorContext>({
    followers: '',
    averageViews: '',
    niche: 'Fitness',
    targetAudience: '',
  });

  // Flow states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ReelAnalysisResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedReelAnalysisSummary[]>([]);

  // Load history from localStorage on initial render
  useEffect(() => {
    setHistory(getSavedReelAnalyses());
  }, []);

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

    // 2. Fallback friendly defaults for optional creator fields if left blank
    const normalizedContext: ReelCreatorContext = {
      followers: creatorContext.followers.trim() || '10,000',
      averageViews: creatorContext.averageViews.trim() || '5,000',
      niche: creatorContext.niche.trim() || 'General Creator',
      targetAudience: creatorContext.targetAudience.trim() || 'Target Audience in India',
    };

    setIsAnalyzing(true);

    try {
      // Execute multimodal AI analysis with frame reasoning + fallback intelligence
      const analysis = await analyzeReelWithAI(
        videoFile,
        normalizedContext,
        videoUrl || undefined
      );

      // Save to localStorage history (up to 5 items)
      const updatedHistory = saveReelAnalysis(analysis);
      setHistory(updatedHistory);

      setCurrentAnalysis(analysis);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } catch (err) {
      console.error('Reel analysis error:', err);
      setValidationError('We couldn\'t analyze the Reel right now. Please try again.');
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
      {/* If currently viewing an analysis result */}
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

          {/* Validation Error Banner */}
          {validationError && (
            <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm font-medium animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
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
                <Brain className="w-5 h-5 text-white" />
                <span>Analyze My Reel</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <p className="text-[11px] text-slate-400 font-medium mt-3">
                No credit card or login required • Instant creator intelligence
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
