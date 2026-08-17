import React, { useState, useEffect, useRef, memo } from 'react';
import { Menu, X, Sparkles, ChevronDown, Brain, Target, DollarSign, Calendar, Briefcase, Info, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({ currentRoute, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close tools dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 gpu-layer">
      <div className="w-[min(1120px,92%)] mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`h-[72px] border-b flex items-center justify-between px-4 md:px-6 transition-all duration-200 relative ${
            isScrolled
              ? 'bg-white rounded-b-2xl border-slate-200 shadow-md shadow-slate-200/50'
              : 'bg-white/98 border-slate-200/80 shadow-xs'
          }`}
        >
          {/* LOGO */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-900 flex items-center gap-1 cursor-pointer hover:opacity-90 transition-opacity"
            >
              Elevate <span className="text-blue-600">OS</span>
            </button>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                currentRoute === 'home' ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>

            {/* TOOLS DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${
                  ['elevate-ai', 'blueprint', 'revenue'].includes(currentRoute)
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xl shadow-slate-200/60 z-50 space-y-1"
                  >
                    <button
                      onClick={() => handleNavClick('elevate-ai')}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentRoute === 'elevate-ai'
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-slate-50 border-transparent'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                        🧠
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Elevate AI</span>
                        <span className="text-[10px] text-slate-500 block">AI Reels content analysis & rewrites.</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('blueprint')}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentRoute === 'blueprint'
                          ? 'bg-indigo-50 border-indigo-200'
                          : 'hover:bg-slate-50 border-transparent'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold">
                        🎯
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">7-Day Creator Roadmap</span>
                        <span className="text-[10px] text-slate-500 block">Quick 7-day AI action direction.</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('revenue')}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentRoute === 'revenue'
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'hover:bg-slate-50 border-transparent'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                        💰
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Revenue Calculator</span>
                        <span className="text-[10px] text-slate-500 block">Monetization opportunity potential.</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNavClick('services')}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                currentRoute === 'services' ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                currentRoute === 'about' ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              About
            </button>
          </div>

          {/* DESKTOP CTA BUTTON */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-2 transform hover:scale-105"
            >
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded font-black tracking-normal">FREE</span>
              <Calendar className="w-3.5 h-3.5 text-blue-200" />
              <span>Strategy Session</span>
            </button>
          </div>

          {/* MOBILE HAMBURGER MENU BUTTON */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-[11px] font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-sm flex items-center gap-1"
            >
              <span>✨ Free Session</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="md:hidden bg-white border border-slate-200 rounded-2xl p-5 my-2 shadow-xl flex flex-col gap-3 text-sm font-bold text-slate-800"
            >
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'home' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                <Home className="w-4 h-4 text-blue-600" /> Home
              </button>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-1">
                  Creator Toolkit
                </span>
                <button
                  onClick={() => handleNavClick('elevate-ai')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'elevate-ai' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <span>🧠</span> Elevate AI Content Analyzer
                </button>
                <button
                  onClick={() => handleNavClick('blueprint')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'blueprint' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                >
                  <span>🎯</span> 7-Day Creator Roadmap
                </button>
                <button
                  onClick={() => handleNavClick('revenue')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'revenue' ? 'bg-emerald-50 text-emerald-600' : ''}`}
                >
                  <span>💰</span> Revenue Calculator
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleNavClick('services')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'services' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Briefcase className="w-4 h-4 text-purple-600" /> Services
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center gap-2.5 ${currentRoute === 'about' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Info className="w-4 h-4 text-pink-600" /> About Elevate OS
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 px-4 text-xs font-black text-white bg-blue-600 rounded-xl text-center cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-blue-200" /> Book Free Strategy Session
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
