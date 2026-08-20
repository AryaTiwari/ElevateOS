import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = memo(() => {
  const {
    authModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    signIn,
    signUp,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Reset form states when modal opens/closes or mode changes
  useEffect(() => {
    if (authModalOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsSubmitting(false);
    }
  }, [authModalOpen, authModalMode]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && authModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (authModalMode === 'signin') {
        const result = await signIn(cleanEmail, password);
        if (!result.success) {
          setErrorMessage(result.error || 'Sign in failed. Please check your credentials.');
        }
      } else {
        const result = await signUp(cleanEmail, password);
        if (!result.success) {
          setErrorMessage(result.error || 'Sign up failed. Please try again.');
        } else if (result.requiresEmailConfirmation) {
          setSuccessMessage('🎉 Account created! Please check your email inbox to confirm your registration.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-[#101828] border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 z-10 space-y-6"
          id="auth-modal-dialog"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeAuthModal}
            id="auth-modal-close-btn"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer border border-slate-700"
            aria-label="Close auth dialog"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-500/40 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-pink-950/40">
              <span>{authModalMode === 'signin' ? '🔐' : '🚀'}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {authModalMode === 'signin' ? 'Welcome Back' : 'Create Creator Account'}
            </h3>

            <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto">
              {authModalMode === 'signin'
                ? 'Sign in to access your saved Reel analyses and cloud creator history.'
                : 'Sign up to sync your 5 free monthly Reel analyses across all your devices.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-[#0C111D] p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              id="auth-tab-signin"
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authModalMode === 'signin'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🔑</span>
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthModalMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              id="auth-tab-signup"
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authModalMode === 'signup'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>✨</span>
              <span>Sign Up</span>
            </button>
          </div>

          {/* Status Notices */}
          {errorMessage && (
            <div
              id="auth-error-banner"
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-start gap-2 animate-fadeIn"
            >
              <span className="text-sm shrink-0">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div
              id="auth-success-banner"
              className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-start gap-2 animate-fadeIn"
            >
              <span className="text-sm shrink-0">✅</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" id="auth-form">
            <div className="space-y-1.5">
              <label
                htmlFor="auth-email-input"
                className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>✉️</span>
                <span>Email Address</span>
              </label>
              <input
                id="auth-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-[#0C111D] border border-slate-800 focus:border-pink-500 text-white placeholder-slate-500 text-xs font-medium outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="auth-password-input"
                  className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>🔒</span>
                  <span>Password</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-slate-400 hover:text-pink-300 transition-colors cursor-pointer"
                >
                  {showPassword ? 'Hide 🙈' : 'Show 👁️'}
                </button>
              </div>
              <input
                id="auth-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-[#0C111D] border border-slate-800 focus:border-pink-500 text-white placeholder-slate-500 text-xs font-medium outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              id="auth-submit-btn"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-950/40 cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin">⏳</span>
                  <span>{authModalMode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <>
                  <span>{authModalMode === 'signin' ? 'Sign In to Elevate OS' : 'Create Free Account'}</span>
                  <span>👉</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-[10px] text-slate-400 text-center font-medium">
            Protected with Supabase Authentication & Row Level Security.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

AuthModal.displayName = 'AuthModal';
