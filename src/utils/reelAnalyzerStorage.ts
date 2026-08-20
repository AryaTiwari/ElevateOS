import { ReelAnalysisResult, SavedReelAnalysisSummary } from '../types';
import {
  saveAnalysisToSupabase,
  getAnalysesFromSupabase,
  clearAnalysesFromSupabase,
} from '../lib/supabase';

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
 * Save an analysis report to recent history (local + Supabase cloud).
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
      },
    };

    // Filter out duplicates with the same ID
    const filtered = current.filter((item) => item.id !== summaryItem.id);
    const updated = [summaryItem, ...filtered].slice(0, MAX_SAVED_ANALYSES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Asynchronously sync to Supabase database if available
    saveAnalysisToSupabase(analysis).catch((err) => {
      console.warn('Background Supabase save notice:', err);
    });

    return updated;
  } catch (err) {
    console.error('Failed to save Reel analysis:', err);
    return getSavedReelAnalyses();
  }
}

/**
 * Sync analyses from Supabase database to update local list.
 */
export async function syncReelAnalysesFromCloud(): Promise<SavedReelAnalysisSummary[]> {
  try {
    const cloudData = await getAnalysesFromSupabase();
    if (cloudData && cloudData.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData.slice(0, MAX_SAVED_ANALYSES)));
      return cloudData.slice(0, MAX_SAVED_ANALYSES);
    }
  } catch (err) {
    console.warn('Could not sync analyses from Supabase:', err);
  }
  return getSavedReelAnalyses();
}

/**
 * Clear the 5 recent Reel analyses history (both local and Supabase).
 */
export function clearAllReelAnalyses(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    clearAnalysesFromSupabase().catch(() => {});
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
  const match = list.find((item) => item.id === id);
  return match ? match.data : null;
}
