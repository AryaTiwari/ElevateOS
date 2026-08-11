import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ElevateAIPage } from './components/ElevateAIPage';
import { BlueprintPage } from './components/BlueprintPage';
import { RevenueCalculator } from './components/RevenueCalculator';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FlagshipModal } from './components/FlagshipModal';
import { LegalModal } from './components/LegalModal';
import { TermsConsentModal } from './components/TermsConsentModal';
import { GenZBackground } from './components/GenZBackground';
import { ServiceItem } from './types';

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

  const handleNavigate = useCallback((newRoute: string) => {
    const path = ROUTE_TO_PATH[newRoute] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-800 bg-slate-50 relative overflow-x-hidden">
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
        <main className="flex-1 w-[min(1120px,92%)] mx-auto py-8 sm:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="gpu-layer"
            >
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
                <BlueprintPage
                  onOpenBooking={handleOpenBookingFreeSession}
                />
              )}

              {route === 'revenue' && (
                <RevenueCalculator
                  onOpenBooking={handleOpenBookingFreeSession}
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
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={handleCloseBooking}
          preselectedService={selectedServiceForBooking}
        />

        {/* FLAGSHIP CREATOR UPGRADE PROGRAM INFO FUNNEL MODAL */}
        <FlagshipModal
          isOpen={flagshipModalOpen}
          onClose={handleCloseFlagship}
        />

        {/* LEGAL DOCUMENTATION MODAL (PRIVACY & TERMS) */}
        <LegalModal
          isOpen={legalModalOpen}
          onClose={handleCloseLegal}
          defaultTab={legalTab}
        />

        {/* FIRST-TIME VISIT CONSENT POPUP */}
        <TermsConsentModal onOpenLegal={handleOpenLegal} />
      </div>
    </div>
  );
}
