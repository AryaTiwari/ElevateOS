import React, { useState, useEffect, useRef, memo } from 'react';
import { Menu, X, Sparkles, Mail, Instagram, Sprout, ChevronDown, AlertOctagon, Activity, Compass, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_INFO } from '../data/elevateData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenFlagship: () => void;
  onOpenAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({ onOpenBooking, onOpenAudit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <div className={`w-[min(1120px,92%)] mx-auto`}>
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-[76px] border-b flex items-center justify-between px-4 md:px-6 transition-all duration-300 relative ${
            isScrolled
              ? 'bg-white/85 backdrop-blur-md rounded-b-xl border-slate-200/80 shadow-md shadow-slate-200/50'
              : 'bg-white/60 backdrop-blur-sm border-slate-200/60'
          }`}
        >
          {/* LEFT CORNER: EXPLORE OS DROPDOWN */}
          <div className="relative flex items-center justify-start z-10" ref={dropdownRef}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
              className="hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all cursor-pointer select-none shadow-sm"
              id="desktop-menu-trigger"
            >
              {/* Three horizontal lines */}
              <div className="flex flex-col gap-1 w-4">
                <span className={`h-0.5 w-full bg-blue-600 rounded-full transition-all duration-200 ${desktopDropdownOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-3/4 bg-blue-600 rounded-full transition-all duration-200 ${desktopDropdownOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-blue-600 rounded-full transition-all duration-200 ${desktopDropdownOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
              <span>Explore OS</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${desktopDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {desktopDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-[calc(100%+8px)] left-0 w-80 bg-white border border-slate-200 rounded-2xl p-3 shadow-2xl shadow-slate-300/60 z-50 grid grid-cols-1 gap-1"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase">System Index</span>
                  </div>

                  <a
                    href="#creator-score-section"
                    onClick={() => setDesktopDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 transition-all font-bold text-sm">
                      📊
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors block">Creator Score</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">Audit brand readiness & growth bottlenecks.</span>
                    </div>
                  </a>

                  <a
                    href="#revenue-calculator"
                    onClick={() => setDesktopDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 transition-all font-bold text-sm">
                      💸
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 transition-colors block">Revenue Calculator</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">Calculate Indian market creator earning potential.</span>
                    </div>
                  </a>

                  <a
                    href="#audit"
                    onClick={() => {
                      setDesktopDropdownOpen(false);
                      onOpenAudit();
                    }}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 transition-all font-bold text-sm">
                      🔍
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 group-hover:text-amber-700 transition-colors block">Creator Diagnosis Tool</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">AI strategic roadmap & retention audit.</span>
                    </div>
                  </a>

                  <a
                    href="#services"
                    onClick={() => setDesktopDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-50 border border-transparent hover:border-purple-100 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 transition-all font-bold text-sm">
                      🎯
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 group-hover:text-purple-700 transition-colors block">Services</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">Tailored, budget-adjusted design & strategy.</span>
                    </div>
                  </a>

                  <a
                    href="#about"
                    onClick={() => setDesktopDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-pink-50 border border-transparent hover:border-pink-100 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 shrink-0 transition-all font-bold text-sm">
                      👥
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 group-hover:text-pink-600 transition-colors block">About Us</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">Founder vision & @elevate_os_in.</span>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MIDDLE: LOGO */}
          <div className="hidden md:flex justify-center z-10 px-2 absolute left-1/2 -translate-x-1/2">
            <a
              href="#"
              className="text-[22px] font-black tracking-tight text-slate-900 flex items-center gap-1 hover:opacity-90 transition-opacity whitespace-nowrap"
              id="nav-logo"
            >
              Elevate <span className="text-blue-600">OS</span>
            </a>
          </div>

          {/* MOBILE LOGO (LEFT) */}
          <div className="flex md:hidden items-center justify-start z-10">
            <a
              href="#"
              className="text-[20px] font-black tracking-tight text-slate-900 flex items-center gap-1"
            >
              Elevate <span className="text-blue-600">OS</span>
            </a>
          </div>

          {/* RIGHT ACTION BUTTONS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-3 z-10">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97, y: 2 }}
              onClick={onOpenAudit}
              className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 border-b-[5px] border-b-blue-800 px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 active:border-b-2"
              id="nav-content-diagnosis-btn"
            >
              <div className="flex items-end gap-[2px] h-3 shrink-0 select-none pb-[1px]">
                <span className="w-[2px] bg-white rounded-sm animate-pulse" style={{ height: '60%', animationDelay: '0ms', animationDuration: '1.2s' }} />
                <span className="w-[2px] bg-blue-200 rounded-sm animate-pulse" style={{ height: '100%', animationDelay: '200ms', animationDuration: '1.2s' }} />
                <span className="w-[2px] bg-sky-200 rounded-sm animate-pulse" style={{ height: '80%', animationDelay: '400ms', animationDuration: '1.2s' }} />
              </div>
              <span>Free Content Diagnosis 🔍</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97, y: 2 }}
              onClick={onOpenBooking}
              className="bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 border-b-[5px] border-b-emerald-700 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/25 active:border-b-2 whitespace-nowrap"
              id="nav-strategy-btn"
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-100" />
              <span>Free Strategy Session</span>
            </motion.button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-black text-white bg-emerald-500 rounded-lg shadow-md"
              id="mobile-quick-strategy-btn"
            >
              Strategy Session
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.nav>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden bg-white border border-slate-200 rounded-2xl p-5 my-2 shadow-2xl flex flex-col gap-4 text-[15px]"
            >
              <a
                href="#creator-score-section"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-blue-600 font-bold py-1 flex items-center gap-2"
              >
                <span>📊</span> Creator Score
              </a>
              <a
                href="#revenue-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-emerald-600 font-bold py-1 flex items-center gap-2"
              >
                <span>💸</span> Revenue Calculator
              </a>
              <a
                href="#audit"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-amber-600 font-bold py-1 flex items-center gap-2"
              >
                <span>🔍</span> Creator Diagnosis Tool
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-purple-600 font-bold py-1 flex items-center gap-2"
              >
                <span>🎯</span> Services
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-pink-600 font-bold py-1 flex items-center gap-2"
              >
                <span>👥</span> About Us
              </a>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 px-4 text-xs font-black text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl text-center cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Sprout className="w-4 h-4 text-emerald-100" /> Free Strategy Session
                </button>
                <div className="flex items-center justify-around pt-2 text-xs text-[#94A3B8]">
                  <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-1.5 hover:text-white">
                    <Mail className="w-3.5 h-3.5 text-[#60A5FA]" /> Email Us
                  </a>
                  <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white">
                    <Instagram className="w-3.5 h-3.5 text-[#60A5FA]" /> {CONTACT_INFO.instagramHandle}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

