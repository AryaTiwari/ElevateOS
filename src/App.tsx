import React, { useState, useCallback } from 'react';
import bgImage from './assets/images/creator_growth_bg_1786109638246.jpg';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CreatorScoreCard } from './components/CreatorScoreCard';
import { WhySection } from './components/WhySection';
import { ServicesSection } from './components/ServicesSection';
import { GenZBackground } from './components/GenZBackground';

import { DiagnosticTool } from './components/DiagnosticTool';
import { CtaSection } from './components/CtaSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FlagshipModal } from './components/FlagshipModal';
import { LegalModal } from './components/LegalModal';
import { TermsConsentModal } from './components/TermsConsentModal';
import { InstagramPromoSection } from './components/InstagramPromoSection';
import { FounderSection } from './components/FounderSection';
import { AboutSection } from './components/AboutSection';

import { ServiceItem } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [flagshipModalOpen, setFlagshipModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  const handleOpenBooking = useCallback((serviceTitle?: string) => {
    setSelectedServiceForBooking(serviceTitle);
    setBookingModalOpen(true);
  }, []);

  const handleOpenBookingFreeSession = useCallback(() => {
    handleOpenBooking("Free Strategy Session");
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
    handleOpenBooking(service.title || "Free Strategy Session");
  }, [handleOpenBooking]);

  const scrollToAudit = useCallback(() => {
    const el = document.getElementById('audit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
      {/* GEN Z FLOATING BACKGROUND GRAPHICS & SOCIAL MEDIA COMPONENTS */}
      <GenZBackground />

      <div className="relative z-10">
        {/* NAVBAR */}
        <Navbar
          onOpenBooking={handleOpenBookingFreeSession}
          onOpenFlagship={handleOpenBookingUpgradeProgram}
          onOpenAudit={scrollToAudit}
        />

        {/* MAIN CONTENT SECTIONS */}
        <main>
          {/* 1. THE INTRO PAGE */}
          <Hero
            onOpenBooking={handleOpenBookingFreeSession}
            onOpenFlagship={handleOpenBookingUpgradeProgram}
            onOpenAudit={scrollToAudit}
          />

          {/* ELEVATE AI CONTENT ANALYZER SECTION */}
          <section id="creator-score-section" className="py-12 md:py-20 w-[min(1120px,92%)] mx-auto relative z-10 scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-700 tracking-widest uppercase bg-blue-100/80 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI REELS STRATEGIST
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight leading-none">
                Elevate AI — <span className="text-blue-600">Content Analyzer</span> 🧠⚡
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-3 font-medium max-w-lg mx-auto leading-relaxed">
                Don't guess why your Reel isn't working. Paste your script or video concept and get instant, AI-powered retention, hook, and virality feedback.
              </p>
            </div>
            <CreatorScoreCard
              onOpenBooking={handleOpenBookingFreeSession}
              onOpenFlagship={handleOpenBookingUpgradeProgram}
            />
          </section>

          {/* 2. THE PROBLEM */}
          <WhySection onOpenBooking={handleOpenBookingFreeSession} />

          {/* 3. DIAGNOSE YOUR CREATOR BOTTLENECK */}
          <DiagnosticTool onOpenBooking={handleOpenBookingFreeSession} />

          <ServicesSection onSelectService={handleSelectServiceFromCard} />
          
          {/* ABOUT SECTION (INSTAGRAM & FOUNDER ARYA TIWARI) */}
          <AboutSection onOpenBooking={handleOpenBookingFreeSession} />

          {/* FREQUENTLY ASKED QUESTIONS */}
          <FaqSection onOpenBooking={handleOpenBookingFreeSession} />

          {/* FINAL CTA */}
          <CtaSection onOpenBooking={handleOpenBookingFreeSession} />
        </main>

        {/* FOOTER */}
        <Footer onOpenLegal={handleOpenLegal} />

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


