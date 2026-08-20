import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { ReelAnalysisResult, SavedReelAnalysisSummary, MonthlyUsageInfo } from '../types';
import { getUserSessionId } from '../utils/userSession';

// Centralized Supabase credentials (defaults to user's configured project)
const DEFAULT_SUPABASE_URL = 'https://ztvqbqtxvvaxiyefhadg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_E_iPEkoYCyB4fUb7n1zNlg_1WjyYwQN';

export function isValidHttpUrl(stringToTest?: string): boolean {
  if (!stringToTest || typeof stringToTest !== 'string') return false;
  const trimmed = stringToTest.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;
  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function getValidSupabaseConfig(): { url: string; key: string } | null {
  const rawEnvUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const rawEnvKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  let activeUrl = isValidHttpUrl(rawEnvUrl) ? rawEnvUrl : (isValidHttpUrl(DEFAULT_SUPABASE_URL) ? DEFAULT_SUPABASE_URL : '');
  let activeKey = rawEnvKey || DEFAULT_SUPABASE_ANON_KEY;

  if (!activeUrl || !isValidHttpUrl(activeUrl) || !activeKey) {
    return null;
  }
  return { url: activeUrl, key: activeKey };
}

export const isSupabaseConfigured = Boolean(getValidSupabaseConfig());

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const config = getValidSupabaseConfig();
  if (!config) return null;

  try {
    supabaseInstance = createClient(config.url, config.key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return supabaseInstance;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
}

/**
 * Get current authenticated user if one exists
 */
export async function getCurrentUser(): Promise<User | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data: { user }, error } = await sb.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (err) {
    console.warn('Error fetching Supabase user:', err);
    return null;
  }
}

/**
 * Get current auth session if one exists
 */
export async function getCurrentSession(): Promise<Session | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data: { session } } = await sb.auth.getSession();
    return session;
  } catch {
    return null;
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
  const sb = getSupabase();
  if (!sb) {
    return { user: null, error: new Error('Supabase client is not configured.') };
  }
  try {
    const { data, error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      return { user: null, error };
    }
    return { user: data.user, error: null };
  } catch (err: any) {
    return { user: null, error: err || new Error('Sign in failed') };
  }
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string): Promise<{ user: User | null; error: Error | null; requiresEmailConfirmation?: boolean }> {
  const sb = getSupabase();
  if (!sb) {
    return { user: null, error: new Error('Supabase client is not configured.') };
  }
  try {
    const { data, error } = await sb.auth.signUp({
      email: email.trim(),
      password,
    });
    if (error) {
      return { user: null, error };
    }
    const requiresEmailConfirmation = Boolean(data.user && !data.session);
    return { user: data.user, error: null, requiresEmailConfirmation };
  } catch (err: any) {
    return { user: null, error: err || new Error('Sign up failed') };
  }
}

/**
 * Sign out the current user
 */
export async function signOutUser(): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) return { error: null };
  try {
    const { error } = await sb.auth.signOut();
    return { error };
  } catch (err: any) {
    return { error: err };
  }
}

/**
 * Fetch monthly usage for the current user/session from the backend API.
 * The backend verifies against the database and enforces the 5 analyses/month limit.
 */
export async function fetchMonthlyUsage(): Promise<MonthlyUsageInfo> {
  const sessionId = getUserSessionId();
  const user = await getCurrentUser();
  const userId = user?.id || sessionId;

  try {
    const sb = getSupabase();
    let authHeader = '';
    if (sb) {
      const { data: { session } } = await sb.auth.getSession();
      if (session?.access_token) {
        authHeader = `Bearer ${session.access_token}`;
      }
    }

    const res = await fetch(`/api/usage?userId=${encodeURIComponent(userId)}`, {
      headers: {
        'x-user-session-id': sessionId,
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    if (res.ok) {
      const data = await res.json();
      return {
        used: data.used ?? 0,
        limit: data.limit ?? 5,
        remaining: Math.max(0, (data.limit ?? 5) - (data.used ?? 0)),
        monthYear: data.monthYear || new Date().toISOString().slice(0, 7),
        canAnalyze: (data.used ?? 0) < (data.limit ?? 5),
      };
    }
  } catch (err) {
    console.warn('Could not fetch server-side usage, using standard free tier state:', err);
  }

  // Fallback defaults if offline or starting session
  return {
    used: 0,
    limit: 5,
    remaining: 5,
    monthYear: new Date().toISOString().slice(0, 7),
    canAnalyze: true,
  };
}

/**
 * Save an analysis to Supabase database (for authenticated or registered users)
 */
export async function saveAnalysisToSupabase(
  analysis: ReelAnalysisResult
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    const user = await getCurrentUser();
    const sessionId = getUserSessionId();
    const effectiveUserId = user?.id || sessionId;

    const { error } = await sb.from('analyses').upsert({
      id: analysis.id,
      user_id: user?.id ? user.id : null,
      session_id: sessionId,
      video_filename: analysis.videoFileName,
      video_file_size: analysis.videoFileSizeFormatted,
      niche: analysis.creatorContext.niche,
      estimated_range: analysis.performanceInsights.aiEstimatedRange,
      summary: analysis.summary,
      creator_context: analysis.creatorContext,
      result: analysis,
      created_at: new Date(analysis.timestamp).toISOString(),
    });

    if (error) {
      console.warn('Supabase save error (falling back to local storage):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Failed to save to Supabase:', err);
    return false;
  }
}

/**
 * Fetch saved analyses from Supabase database for the current user
 */
export async function getAnalysesFromSupabase(): Promise<SavedReelAnalysisSummary[]> {
  const sb = getSupabase();
  if (!sb) return [];

  try {
    const user = await getCurrentUser();
    const sessionId = getUserSessionId();

    let query = sb
      .from('analyses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (user?.id) {
      query = query.eq('user_id', user.id);
    } else {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error || !data) {
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      timestamp: new Date(row.created_at).getTime(),
      videoFileName: row.video_filename || 'uploaded_reel.mp4',
      niche: row.niche || 'General',
      estimatedRange: row.estimated_range || '',
      summary: row.summary || '',
      followers: row.creator_context?.followers || '',
      averageViews: row.creator_context?.averageViews || '',
      data: row.result as ReelAnalysisResult,
    }));
  } catch (err) {
    console.warn('Failed to load analyses from Supabase:', err);
    return [];
  }
}

/**
 * Clear user analyses from Supabase
 */
export async function clearAnalysesFromSupabase(): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    const user = await getCurrentUser();
    const sessionId = getUserSessionId();

    if (user?.id) {
      await sb.from('analyses').delete().eq('user_id', user.id);
    } else {
      await sb.from('analyses').delete().eq('session_id', sessionId);
    }
    return true;
  } catch {
    return false;
  }
}
