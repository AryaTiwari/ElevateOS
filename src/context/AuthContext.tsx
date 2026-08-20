import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import {
  getSupabase,
  getCurrentUser,
  getCurrentSession,
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  isSupabaseConfigured,
} from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  authModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string; requiresEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Initialize auth state
  useEffect(() => {
    let isMounted = true;
    const sb = getSupabase();

    async function initAuth() {
      try {
        if (!sb) {
          if (isMounted) setLoading(false);
          return;
        }

        const [initialSession, initialUser] = await Promise.all([
          getCurrentSession(),
          getCurrentUser(),
        ]);

        if (isMounted) {
          setSession(initialSession);
          setUser(initialUser || initialSession?.user || null);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Error initializing Supabase auth:', err);
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    // Subscribe to auth state updates
    if (sb) {
      const { data: { subscription } } = sb.auth.onAuthStateChange(
        async (_event, newSession) => {
          if (!isMounted) return;
          setSession(newSession);
          setUser(newSession?.user || null);
          setLoading(false);
        }
      );

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const openAuthModal = useCallback((mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await signInWithEmail(email, password);
    if (res.error) {
      let friendlyMessage = res.error.message;
      if (friendlyMessage.includes('Invalid login credentials')) {
        friendlyMessage = 'Invalid email or password. Please double check and try again.';
      } else if (friendlyMessage.includes('Email not confirmed')) {
        friendlyMessage = 'Please verify your email address before signing in.';
      }
      return { success: false, error: friendlyMessage };
    }
    setUser(res.user);
    setAuthModalOpen(false);
    return { success: true };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const res = await signUpWithEmail(email, password);
    if (res.error) {
      let friendlyMessage = res.error.message;
      if (friendlyMessage.includes('User already registered')) {
        friendlyMessage = 'An account with this email already exists. Try signing in instead.';
      } else if (friendlyMessage.includes('Password should be at least 6 characters')) {
        friendlyMessage = 'Password must be at least 6 characters long.';
      }
      return { success: false, error: friendlyMessage };
    }
    if (res.user && !res.requiresEmailConfirmation) {
      setUser(res.user);
      setAuthModalOpen(false);
    }
    return {
      success: true,
      requiresEmailConfirmation: res.requiresEmailConfirmation,
    };
  }, []);

  const signOut = useCallback(async () => {
    await signOutUser();
    setUser(null);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isConfigured: isSupabaseConfigured,
      authModalOpen,
      authModalMode,
      setAuthModalOpen,
      setAuthModalMode,
      openAuthModal,
      closeAuthModal,
      signIn,
      signUp,
      signOut,
    }),
    [
      user,
      session,
      loading,
      authModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal,
      signIn,
      signUp,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
