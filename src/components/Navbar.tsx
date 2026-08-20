import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({ currentRoute, onNavigate, onOpenBooking }) => {
  const { user, openAuthModal, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 15;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setToolsDropdownOpen(false);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSignOut = async () => {
    await signOut();
    setUserDropdownOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user?.email) return 'Creator';
    const prefix = user.email.split('@')[0];
    return prefix.length > 12 ? `${prefix.slice(0, 10)}...` : prefix;
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 gpu-layer">
      <div className="w-[min(1120px,92%)] mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`h-[72px] border-b flex items-center justify-between px-4 md:px-6 transition-all duration-200 relative backdrop-blur-xl ${
            isScrolled
              ? 'bg-[#0C111D]/90 rounded-b-2xl border-pink-500/20 shadow-xl shadow-black/50'
              : 'bg-[#0C111D]/75 border-white/10 shadow-sm'
          }`}
        >
          {/* LOGO */}
          <div className="flex items-center">
            <button
              id="navbar-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-xl sm:text-2xl font-display font-black tracking-tight text-white flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span>Elevate</span>
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-black">
                OS
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 hidden sm:inline-block ml-1">
                CREATOR
              </span>
            </button>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-6">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                currentRoute === 'home'
                  ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>

            {/* TOOLS DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-link-tools"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer py-2 ${
                  ['elevate-ai', 'blueprint', 'revenue'].includes(currentRoute)
                    ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Tools</span>
                <span className={`text-[10px] transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-pink-400' : ''}`}>▼</span>
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-76 bg-[#101828]/95 border border-slate-700/80 backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl shadow-black/80 z-50 space-y-1.5"
                  >
                    <button
                      id="nav-tool-reel-analyzer"
                      onClick={() => handleNavClick('elevate-ai')}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentRoute === 'elevate-ai'
                          ? 'bg-pink-500/15 border-pink-500/40 text-pink-200'
                          : 'hover:bg-slate-800/60 border-transparent text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0 font-bold">
                        🧠
                      </div>
                      <div>
                        <span className="font-bold text-xs text-white block">Elevate AI Reel Analyzer</span>
                        <span className="text-[10px] text-slate-400 block">AI Reel breakdown, retention & posting intel.</span>
                      </div>
                    </button>

                    <button
                      id="nav-tool-roadmap"
                      onClick={() => handleNavClick('blueprint')}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentRoute === 'blueprint'
                          ? 'bg-purple-500/15 border-purple-500/40 text-purple-200'
                          : 'hover:bg-slate-800/60 border-transparent text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 font-bold">
                        🎯
                      </div>
                      <div>
                        <span className="font-bold text-xs text-white block">7-Day Creator Roadmap</span>
                        <span className="text-[10px] text-slate-400 block">Quick 7-day AI action direction.</span>
                      </div>
                    </button>

                    <button
                      id="nav-tool-revenue"
                      onClick={() => handleNavClick('revenue')}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentRoute === 'revenue'
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                          : 'hover:bg-slate-800/60 border-transparent text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 font-bold">
                        💰
                      </div>
                      <div>
                        <span className="font-bold text-xs text-white block">Revenue Calculator</span>
                        <span className="text-[10px] text-slate-400 block">Monetization opportunity potential.</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="nav-link-services"
              onClick={() => handleNavClick('services')}
              className={`text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                currentRoute === 'services'
                  ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Services
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                currentRoute === 'about'
                  ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              About
            </button>
          </div>

          {/* DESKTOP RIGHT ACTIONS: AUTH + CTA BUTTON */}
          <div className="hidden md:flex items-center gap-3">
            {/* Supabase Authentication Status Button / Dropdown */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  id="nav-user-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span className="text-sm">👤</span>
                  <span className="text-pink-300 max-w-[100px] truncate">{getUserDisplayName()}</span>
                  <span className="text-[10px] text-slate-400">▼</span>
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-[#101828]/95 border border-slate-700 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-50 space-y-2.5"
                    >
                      <div className="border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Signed In As</span>
                        <span className="text-xs font-bold text-white truncate block">{user.email}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleNavClick('elevate-ai')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <span>🎬</span>
                        <span>My Reel Analyses</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-500/20 text-xs font-bold text-red-400 flex items-center gap-2 transition-all cursor-pointer border border-transparent hover:border-red-500/30"
                      >
                        <span>🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                id="nav-signin-btn"
                type="button"
                onClick={() => openAuthModal('signin')}
                className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>🔑</span>
                <span>Sign In</span>
              </button>
            )}

            <button
              id="nav-strategy-btn"
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white px-4.5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-pink-950/40 cursor-pointer flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <span className="bg-black/30 text-amber-200 text-[10px] px-1.5 py-0.5 rounded font-black tracking-normal border border-white/20">FREE</span>
              <span>📅</span>
              <span>Strategy Session</span>
            </button>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex md:hidden items-center gap-2">
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="px-2.5 py-1.5 text-[10px] font-bold text-slate-200 bg-slate-800/90 rounded-lg border border-slate-700 flex items-center gap-1"
              >
                <span>🔑</span>
                <span>Login</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="px-2.5 py-1.5 text-[10px] font-bold text-pink-300 bg-pink-500/10 rounded-lg border border-pink-500/30 flex items-center gap-1"
              >
                <span>👤</span>
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-[11px] font-black text-white bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 rounded-lg shadow-sm flex items-center gap-1"
            >
              <span>✨ Free</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="text-xl leading-none">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </motion.nav>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#101828]/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl p-5 my-2 shadow-2xl flex flex-col gap-3 text-sm font-bold text-slate-200"
            >
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'home' ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30' : 'text-slate-300'}`}
              >
                <span>🏠</span> Home
              </button>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 px-3 block mb-1">
                  Creator Toolkit
                </span>
                <button
                  onClick={() => handleNavClick('elevate-ai')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'elevate-ai' ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30' : 'text-slate-300'}`}
                >
                  <span>🧠</span> Elevate AI Reel Analyzer
                </button>
                <button
                  onClick={() => handleNavClick('blueprint')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'blueprint' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' : 'text-slate-300'}`}
                >
                  <span>🎯</span> 7-Day Creator Roadmap
                </button>
                <button
                  onClick={() => handleNavClick('revenue')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'revenue' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-300'}`}
                >
                  <span>💰</span> Revenue Calculator
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleNavClick('services')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'services' ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30' : 'text-slate-300'}`}
                >
                  <span>💼</span> Services
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'about' ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30' : 'text-slate-300'}`}
                >
                  <span>ℹ️</span> About Elevate OS
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 px-4 text-xs font-black text-white bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 rounded-xl text-center cursor-pointer shadow-md shadow-pink-950/40 flex items-center justify-center gap-2"
                >
                  <span>📅</span> Book Free Strategy Session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

