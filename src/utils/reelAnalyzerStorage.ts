import { ReelAnalysisResult, SavedReelAnalysisSummary } from '../types';

const STORAGE_KEY = 'elevate_reel_analyses_history_v1';
const MAX_SAVED_ANALYSES = 5;

/**
 * Retrieve the list of up to 5 stored Reel analyses from localStorage.
 */
export function getSavedReelAnalyses(): SavedReelAnalysisSummary[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, MAX_SAVED_ANALYSES);
    }
    return [];
  } catch (err) {
    console.error('Failed to load saved Reel analyses from localStorage:', err);
    return [];
  }
}

/**
 * Save an analysis report to the recent history list (capped at 5 items).
 */
export function saveReelAnalysis(analysis: ReelAnalysisResult): SavedReelAnalysisSummary[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedReelAnalyses();
    
    const summaryItem: SavedReelAnalysisSummary = {
      id: analysis.id,
      timestamp: analysis.timestamp,
      videoFileName: analysis.videoFileName,
      niche: analysis.creatorContext.niche,
      estimatedRange: analysis.performanceInsights.aiEstimatedRange,
      summary: analysis.summary,
      followers: analysis.creatorContext.followers,
      averageViews: analysis.creatorContext.averageViews,
      data: {
        ...analysis,
        // Do not store large ephemeral video blob URLs in persistent storage
        videoUrl: undefined,
      }
    };

    // Filter out duplicates with the same ID or same timestamp
    const filtered = current.filter(item => item.id !== summaryItem.id);
    const updated = [summaryItem, ...filtered].slice(0, MAX_SAVED_ANALYSES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save Reel analysis to localStorage:', err);
    return getSavedReelAnalyses();
  }
}

/**
 * Clear ONLY the 5 recent Reel analyses history.
 * Never touches other keys (auth, sessions, calculators, blueprints, etc.)
 */
export function clearAllReelAnalyses(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear Reel analyses history:', err);
    return false;
  }
}

/**
 * Retrieve a specific stored analysis by its ID.
 */
export function getReelAnalysisById(id: string): ReelAnalysisResult | null {
  const list = getSavedReelAnalyses();
  const match = list.find(item => item.id === id);
  return match ? match.data : null;
}
