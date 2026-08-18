import React, { useState } from 'react';
import { BookingFormData } from '../types';
import { CONTACT_INFO } from '../data/elevateData';
import { X, Send, Mail, CheckCircle2, Calendar, Phone, Instagram, User, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BookingFormData>({
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

  // Lock background body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isValidPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
    return /^\d{10,14}$/.test(cleaned);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.instagramId.trim() || !formData.currentProblem.trim()) {
      setErrorMessage('Please fill in all required details before proceeding!');
      return;
    }

    if (!isValidPhone(formData.phoneNumber)) {
      setErrorMessage('Please enter a valid contact phone number with country code if applicable.');
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
      Timestamp: timestamp
    };

    // Direct browser post to Google Apps Script as text/plain (no-cors)
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(directPayload)
      });
    } catch (err) {
      console.error('Direct Google Apps Script fetch error:', err);
    }

    setLastSubmittedData({ ...formData });
    setFormData({
      fullName: '',
      phoneNumber: '',
      instagramId: '',
      currentProblem: '',
      email: '',
    });
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto contain-strict">
          {/* Smooth Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm gpu-layer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#101828]/95 backdrop-blur-2xl border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8 text-left z-10 gpu-layer text-white"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-pink-400 uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-pink-400" /> 1-ON-1 STRATEGY CALL
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    Complimentary Session
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                  Book Your Free Strategy Session 🚀
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-5 leading-relaxed font-medium">
                  Fill in your details below for a complimentary 1-on-1 strategy call with Arya Tiwari & the Elevate OS team. We'll analyze your channel, hooks, and growth bottlenecks.
                </p>

                <form onSubmit={handleSendEmail} className="space-y-4">
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 font-bold text-xs flex items-center gap-2 shadow-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-pink-400" /> Full Name *
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
                      className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500 transition-colors"
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-pink-400" /> Phone / WhatsApp Number *
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
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500 transition-colors"
                    />
                  </div>

                  {/* Instagram ID Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram ID / Handle *
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
                      className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500 transition-colors"
                    />
                  </div>

                  {/* Current Problem Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-pink-400" /> What is your current main problem / bottleneck? *
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
                      className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <motion.button
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-pink-950/40"
                      id="booking-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin-smooth" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Book Free Strategy Session
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-400 font-medium">
                      <span>Direct Team Contact:</span>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-pink-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Mail className="w-3.5 h-3.5" /> {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-pink-500/10 border border-pink-500/30 rounded-full flex items-center justify-center mx-auto text-pink-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Strategy Session Requested!</h3>
                <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                  Your strategy session request has been received. We'll get back to you shortly.
                </p>
                {lastSubmittedData && (
                  <div className="p-4 bg-[#0C111D] border border-slate-800 rounded-xl text-xs space-y-1.5 text-left text-slate-300 font-medium">
                    <div className="pb-2 border-b border-slate-800">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Submission Details</span>
                    </div>
                    <div><strong className="text-white font-bold">Name:</strong> {lastSubmittedData.fullName}</div>
                    <div><strong className="text-white font-bold">Phone:</strong> {lastSubmittedData.phoneNumber}</div>
                    <div><strong className="text-white font-bold">Instagram:</strong> {lastSubmittedData.instagramId}</div>
                    <div><strong className="text-white font-bold">Current Problem:</strong> {lastSubmittedData.currentProblem}</div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
