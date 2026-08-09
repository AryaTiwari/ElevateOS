import React, { useState } from 'react';
import { BookingFormData } from '../types';
import { CONTACT_INFO } from '../data/elevateData';
import { X, Send, Mail, CircleCheckBig, Calendar, Phone, User, CircleAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* Instagram was removed from lucide-react in v1.0 (brand-logo icons were
   dropped from the library entirely). Small inline replacement so this
   doesn't depend on a brand-icon package for one glyph. */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    instagramId: '',
    currentProblem: '',
    email: '',
  });

  const [lastSubmittedData, setLastSubmittedData] = useState<BookingFormData | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValidIndianPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-()]/g, '');
    return /^(?:\+?91|0)?[6-9]\d{9}$/.test(cleaned);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.instagramId.trim() || !formData.currentProblem.trim()) {
      setErrorMessage('Please fill in all required details before proceeding!');
      return;
    }

    if (!isValidIndianPhone(formData.phoneNumber)) {
      setErrorMessage('Invalid phone number! Please enter a valid 10-digit Indian mobile number (e.g., +91 98765 43210).');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyUmXiHTOFEWaxfQ2k36I6zlailBr4sxpQy1Q70QlUkI47MPeOow0BRZTsd_57G8b5/exec';

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const directPayload = {
      name: formData.fullName,
      fullName: formData.fullName,
      Name: formData.fullName,
      email: formData.email || '',
      Email: formData.email || '',
      phone: formData.phoneNumber,
      phoneNumber: formData.phoneNumber,
      Phone: formData.phoneNumber,
      instagram: formData.instagramId,
      instagramId: formData.instagramId,
      Instagram: formData.instagramId,
      helpNeeded: formData.currentProblem,
      currentProblem: formData.currentProblem,
      bottleneck: formData.currentProblem,
      Problem: formData.currentProblem,
      timestamp: timestamp,
      Timestamp: timestamp,
    };

    // Fire-and-forget to Google Apps Script. `mode: 'no-cors'` means the
    // browser deliberately hides the response from us (status, body — all
    // of it) as a security rule, not a bug — so this request can never be
    // used as a real success/failure check. It only sends the data; treat
    // it as best-effort.
    try {
      fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(directPayload),
      }).catch((err) => console.error('Google Apps Script submit error:', err));
    } catch (err) {
      console.error('Google Apps Script submit error:', err);
    }

    // No /api route exists on a static host like GitHub Pages, so there is
    // nothing to await here — the block that used to call
    // /api/book-strategy-session and parse its JSON response is removed.
    // Short delay so the submitting state reads as real, then show success.
    setTimeout(() => {
      setLastSubmittedData({ ...formData } as BookingFormData);
      setFormData({
        fullName: '',
        phoneNumber: '',
        instagramId: '',
        currentProblem: '',
        email: '',
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  <Calendar className="w-4 h-4" /> 1-ON-1 STRATEGY CALL
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                  Book a Free Strategy Session
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
                  Fill in your details below. Our team will analyze your channel and schedule a free 1-on-1 strategy call with you.
                </p>

                <form onSubmit={handleSendEmail} className="space-y-4">
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 font-bold text-xs flex items-center gap-2 shadow-sm"
                    >
                      <CircleAlert className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => {
                        setErrorMessage(null);
                        setFormData({ ...formData, fullName: e.target.value });
                      }}
                      placeholder="e.g. Alex Rivera"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-blue-600" /> Phone / WhatsApp (Indian Format +91) *
                      </span>
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        🇮🇳 +91 Format
                      </span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setErrorMessage(null);
                        setFormData({ ...formData, phoneNumber: e.target.value });
                      }}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  {/* Instagram ID Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <InstagramIcon className="w-3.5 h-3.5 text-blue-600" /> Instagram ID / Handle *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.instagramId}
                      onChange={(e) => {
                        setErrorMessage(null);
                        setFormData({ ...formData, instagramId: e.target.value });
                      }}
                      placeholder="@your_instagram_handle"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  {/* Current Problem Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <CircleAlert className="w-3.5 h-3.5 text-blue-600" /> What is your current main problem / bottleneck? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.currentProblem}
                      onChange={(e) => {
                        setErrorMessage(null);
                        setFormData({ ...formData, currentProblem: e.target.value });
                      }}
                      placeholder="e.g. Stuck at 15k followers, struggle converting views into sales, or low engagement on reels..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <motion.button
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
                      id="booking-submit-btn"
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Book Free Strategy Session
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-500 font-medium">
                      <span>Direct Team Contact:</span>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Mail className="w-3.5 h-3.5" /> {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto text-blue-600">
                  <CircleCheckBig className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Strategy Session Requested!</h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                  Your strategy session request has been received. We'll get back to you shortly.
                </p>
                {lastSubmittedData && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-left text-slate-700 font-medium">
                    <div className="pb-2 border-b border-slate-200">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">✓ Submission Details</span>
                    </div>
                    <div><strong className="text-slate-900 font-bold">Name:</strong> {lastSubmittedData.fullName}</div>
                    <div><strong className="text-slate-900 font-bold">Phone:</strong> {lastSubmittedData.phoneNumber}</div>
                    <div><strong className="text-slate-900 font-bold">Instagram:</strong> {lastSubmittedData.instagramId}</div>
                    <div><strong className="text-slate-900 font-bold">Current Problem:</strong> {lastSubmittedData.currentProblem}</div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 cursor-pointer shadow-md"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
