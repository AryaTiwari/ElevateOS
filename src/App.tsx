import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { TermsConsentModal } from './components/TermsConsentModal';
import { GenZBackground } from './components/GenZBackground';
import { ElevateLoadingScreen } from './components/ElevateLoadingScreen';
import { ServiceItem } from './types';

// Lazy-loaded routes & modals for code-splitting & lightning-fast initial load
const ElevateAIPage = lazy(() => import('./components/ElevateAIPage').then(m => ({ default: m.ElevateAIPage })));
const SevenDayRoadmapTool = lazy(() => import('./components/SevenDayRoadmapTool').then(m => ({ default: m.SevenDayRoadmapTool })));
const RevenueCalculator = lazy(() => import('./components/RevenueCalculator').then(m => ({ default: m.RevenueCalculator })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));
const FlagshipModal = lazy(() => import('./components/FlagshipModal').then(m => ({ default: m.FlagshipModal })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

function RouteFallback() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center py-20 gpu-layer">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-pink-500 border-r-purple-500 animate-spin-smooth" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Elevate OS...</span>
      </div>
    </div>
  );
}

function getInitialRoute(): string {
  const path = window.location.pathname;
  if (path === '/elevate-ai') return 'elevate-ai';
  if (path === '/blueprint') return 'blueprint';
  if (path === '/revenue') return 'revenue';
  if (path === '/services') return 'services';
  if (path === '/about') return 'about';
  return 'home';
}

const ROUTE_TO_PATH: Record<string, string> = {
  home: '/',
  'elevate-ai': '/elevate-ai',
  blueprint: '/blueprint',
  revenue: '/revenue',
  services: '/services',
  about: '/about'
};

export default function App() {
  const [route, setRoute] = useState<string>(getInitialRoute);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [flagshipModalOpen, setFlagshipModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  // Handle URL changes & back/forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top instantly whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const handleNavigate = useCallback((newRoute: string) => {
    const path = ROUTE_TO_PATH[newRoute] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo(0, 0);
    setRoute(newRoute);
  }, []);

  const handleOpenBooking = useCallback((serviceTitle?: string) => {
    setSelectedServiceForBooking(serviceTitle);
    setBookingModalOpen(true);
  }, []);

  const handleOpenBookingFreeSession = useCallback(() => {
    handleOpenBooking('Free Strategy Session');
  }, [handleOpenBooking]);

  const handleOpenBookingUpgradeProgram = useCallback(() => {
    handleOpenBooking("Creator's Upgrade Program");
  }, [handleOpenBooking]);

  const handleOpenFlagship = useCallback(() => {
    setFlagshipModalOpen(true);
  }, []);

  const handleOpenLegal = useCallback((tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  }, []);

  const handleSelectServiceFromCard = useCallback((service: ServiceItem) => {
    handleOpenBooking(service.title || 'Free Strategy Session');
  }, [handleOpenBooking]);

  const handleCloseBooking = useCallback(() => {
    setBookingModalOpen(false);
  }, []);

  const handleCloseFlagship = useCallback(() => {
    setFlagshipModalOpen(false);
  }, []);

  const handleCloseLegal = useCallback(() => {
    setLegalModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-pink-500/30 selection:text-pink-200 bg-[#0C111D] relative overflow-x-hidden">
      {/* GEN Z FLOATING BACKGROUND GRAPHICS & SOCIAL MEDIA ACCENTS */}
      <GenZBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* STICKY NAVBAR */}
        <Navbar
          currentRoute={route}
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBookingFreeSession}
        />

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 w-[min(1120px,92%)] mx-auto py-8 sm:py-12 min-h-[70vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="gpu-layer"
            >
              <Suspense fallback={<RouteFallback />}>
                {route === 'home' && (
                  <HomePage
                    onNavigate={handleNavigate}
                    onOpenBooking={handleOpenBookingFreeSession}
                  />
                )}

                {route === 'elevate-ai' && (
                  <ElevateAIPage
                    onOpenBooking={handleOpenBookingFreeSession}
                    onOpenFlagship={handleOpenBookingUpgradeProgram}
                    onNavigateToBlueprint={() => handleNavigate('blueprint')}
                  />
                )}

                {route === 'blueprint' && (
                  <div className="w-full space-y-10">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-pink-300 tracking-widest uppercase bg-pink-500/10 border border-pink-500/30 px-3.5 py-1.5 rounded-full shadow-xs">
                        🎯 7-DAY CREATOR ROADMAP
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
                        Your 7-Day <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">Creator Roadmap.</span> 🚀
                      </h1>
                      <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
                        Get quick, high-impact direction for your next 7 days based on your niche, stage, main goal, and biggest bottleneck.
                      </p>
                    </div>
                    <SevenDayRoadmapTool onOpenBooking={handleOpenBookingFreeSession} />
                  </div>
                )}

                {route === 'revenue' && (
                  <RevenueCalculator
                    onOpenBooking={handleOpenBookingFreeSession}
                    onNavigateToBlueprint={() => handleNavigate('blueprint')}
                  />
                )}

                {route === 'services' && (
                  <ServicesPage
                    onOpenBooking={handleOpenBookingFreeSession}
                    onSelectService={handleSelectServiceFromCard}
                  />
                )}

                {route === 'about' && (
                  <AboutPage
                    onOpenBooking={handleOpenBookingFreeSession}
                  />
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBookingFreeSession}
          onOpenLegal={handleOpenLegal}
        />

        {/* INTAKE / BOOKING MODAL */}
        <Suspense fallback={null}>
          {bookingModalOpen && (
            <BookingModal
              isOpen={bookingModalOpen}
              onClose={handleCloseBooking}
              preselectedService={selectedServiceForBooking}
            />
          )}

          {/* FLAGSHIP CREATOR UPGRADE PROGRAM INFO FUNNEL MODAL */}
          {flagshipModalOpen && (
            <FlagshipModal
              isOpen={flagshipModalOpen}
              onClose={handleCloseFlagship}
            />
          )}

          {/* LEGAL DOCUMENTATION MODAL (PRIVACY & TERMS) */}
          {legalModalOpen && (
            <LegalModal
              isOpen={legalModalOpen}
              onClose={handleCloseLegal}
              defaultTab={legalTab}
            />
          )}
        </Suspense>

        {/* FIRST-TIME VISIT CONSENT POPUP */}
        <TermsConsentModal onOpenLegal={handleOpenLegal} />

        {/* ELEVATE OS BRAND INITIAL LOADING SCREEN WITH CREATOR GRAPHICS */}
        <AnimatePresence>
          {showLoadingScreen && (
            <ElevateLoadingScreen onComplete={() => setShowLoadingScreen(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
