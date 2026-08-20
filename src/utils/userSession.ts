/**
 * Utility to generate and retrieve a stable anonymous user/session identifier.
 * This is sent in request headers so the server can track and enforce monthly free usage (5 analyses/month).
 */
const SESSION_STORAGE_KEY = 'elevate_user_session_id_v1';

export function getUserSessionId(): string {
  if (typeof window === 'undefined') return 'anon_' + Date.now();
  try {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
  } catch {
    return 'sess_' + Date.now();
  }
}
