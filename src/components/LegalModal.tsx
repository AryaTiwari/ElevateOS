import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_INFO } from '../data/elevateData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C111D]/80 backdrop-blur-md overflow-y-auto gpu-layer" style={{ willChange: 'opacity' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#101828]/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 relative shadow-2xl text-left text-slate-300 gpu-layer"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-[#0C111D] border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-2xl text-pink-400">
              {activeTab === 'privacy' ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <div className="text-[11px] font-black text-pink-400 uppercase tracking-widest">LEGAL DOCUMENTATION</div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h2>
            </div>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-2 p-1.5 bg-[#0C111D] border border-slate-800 rounded-2xl mb-6">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'privacy'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'terms'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Terms & Conditions
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="max-h-[55vh] overflow-y-auto pr-2 space-y-5 text-sm leading-relaxed border-t border-slate-800 pt-4 text-slate-300 font-medium">
            {activeTab === 'privacy' ? (
              <>
                <p className="text-xs text-slate-500">Effective Date: August 2026 | Last Updated: August 2026</p>
                <p>
                  At <strong className="text-white">Elevate OS</strong>, accessible from our digital platform, safeguarding the privacy of our creators, founders, and visitors is one of our top priorities. This Privacy Policy outlines the types of information collected and how we utilize it.
                </p>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">1. Information We Collect</h3>
                <p>
                  We collect personal and professional information that you voluntarily provide when applying for our programs, using our Diagnostic Tools, calculating revenue projections, or contacting our team:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-white">Identity & Contact Data:</strong> Full name, email address, phone number, and social media handles (Instagram, YouTube, etc.).</li>
                  <li><strong className="text-white">Creator Metrics:</strong> Niche category, follower counts, current monthly revenue estimates, and growth bottlenecks.</li>
                  <li><strong className="text-white">Technical Usage Data:</strong> IP addresses, browser types, session durations, and interaction preferences stored locally via browser cookies.</li>
                </ul>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">2. How We Use Your Information</h3>
                <p>We use the collected information for purposes including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Evaluating applications for the Creator's Upgrade Program™.</li>
                  <li>Providing tailored diagnostic feedback and personalized content growth roadmaps.</li>
                  <li>Communicating strategy session schedules and follow-up consultation materials.</li>
                  <li>Improving website performance, interactive calculators, and user experience.</li>
                </ul>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">3. Data Security & Retention</h3>
                <p>
                  We implement robust industry-standard encryption protocols to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We do not sell, rent, or trade your personal information to third-party advertisers.
                </p>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">4. Cookies & Local Storage</h3>
                <p>
                  Elevate OS utilizes local storage and essential cookies to remember your consent status, diagnostic progress, and session preferences across visits. You can control cookie preferences in your browser settings.
                </p>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">5. Your Rights & Contact</h3>
                <p>
                  You have the right to request access to, correction of, or deletion of your personal information stored with us. For inquiries regarding your privacy, contact our team at{' '}
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-pink-400 underline">
                    {CONTACT_INFO.email}
                  </a>.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500">Effective Date: August 2026 | Last Updated: August 2026</p>
                <p>
                  Welcome to <strong className="text-white">Elevate OS</strong>. By accessing our platform, booking consultations, or enrolling in our Creator's Upgrade Program™, you agree to comply with and be bound by the following Terms & Conditions.
                </p>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">1. Intellectual Property & Frameworks</h3>
                <p>
                  All proprietary content, diagnostic frameworks, hook templates, course structures, software design, and digital assets provided on Elevate OS remain the exclusive intellectual property of Elevate OS. Users are granted a limited, non-exclusive license for personal growth and channel expansion. Unlicensed commercial reproduction or distribution is strictly prohibited.
                </p>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">2. Services & Consultation Scope</h3>
                <p>
                  Elevate OS provides creator growth advisory, diagnostic roadmaps, digital product modeling, and 1-on-1 strategy sessions. While our strategies leverage empirical audience psychology, individual results may vary depending on creator execution, market conditions, and platform algorithms.
                </p>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">3. Revenue Estimator & Disclaimer</h3>
                <p>
                  Calculations produced by our Revenue Simulator and Diagnostic Tool are statistical models intended for illustrative and planning purposes only. They do not constitute guaranteed financial returns or contractual revenue promises.
                </p>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">4. User Responsibilities</h3>
                <p>When interacting with our platform and booking tools, you agree to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide truthful, accurate information regarding your channel metrics and contact details.</li>
                  <li>Maintain respectful conduct during 1-on-1 strategy sessions and founder calls.</li>
                  <li>Refrain from attempting to reverse-engineer or compromise platform security.</li>
                </ul>

                <h3 className="text-white font-bold text-base mt-4 border-b border-slate-800 pb-1">5. Modifications & Governing Law</h3>
                <p>
                  Elevate OS reserves the right to update these Terms at any time. Continued use of the platform after updates constitutes acceptance of the revised Terms. For legal inquiries, please contact us at{' '}
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-pink-400 underline">
                    {CONTACT_INFO.email}
                  </a>.
                </p>
              </>
            )}
          </div>

          {/* FOOTER ACTION */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Legal Documentation — Elevate OS
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
            >
              Understood & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
