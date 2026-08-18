import React, { useState } from 'react';
import { FlagshipApplicationData } from '../types';
import { CONTACT_INFO, FLAGSHIP_PROGRAM_POINTS } from '../data/elevateData';
import { X, Send, Rocket, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Target, Zap, DollarSign, ShieldCheck, Award, AlertCircle, Phone, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlagshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlagshipModal: React.FC<FlagshipModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FlagshipApplicationData>({
    fullName: '',
    email: '',
    phone: '',
    instagramHandle: '',
    niche: '',
    currentReach: '10K - 50K Followers',
    primaryGoal: 'Scale Audience & Engagement',
    monthlyRevenueTarget: '$3,000 - $5,000 / month',
    biggestObstacle: ''
  });

  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.biggestObstacle.trim()) {
      setErrorMessage('Please fill in your current growth bottleneck before proceeding!');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setErrorMessage('Please enter a valid contact phone number with country code if applicable.');
      return;
    }

    setErrorMessage(null);

    try {
      await fetch('/api/book-strategy-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phone,
          instagramId: formData.instagramHandle,
          currentProblem: `[Flagship Program] Niche: ${formData.niche} | Reach: ${formData.currentReach} | Goal: ${formData.primaryGoal} | Revenue Target: ${formData.monthlyRevenueTarget} | Obstacle: ${formData.biggestObstacle}`,
          email: formData.email
        })
      });
    } catch (err) {
      console.error("Flagship booking error:", err);
    }

    // Construct Mailto URI
    const subject = encodeURIComponent(`FLAGSHIP APPLICATION: Creator Upgrade Program - ${formData.fullName}`);
    const body = encodeURIComponent(
      `Hello Elevate OS Team,\n\nI would like to submit my application for the Creator's Upgrade Program™ (Flagship)!\n\n` +
      `Creator Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone / WhatsApp: ${formData.phone}\n` +
      `Instagram / Channel Handle: ${formData.instagramHandle}\n` +
      `Niche: ${formData.niche}\n` +
      `Current Channel Scale: ${formData.currentReach}\n` +
      `Primary Goal: ${formData.primaryGoal}\n` +
      `Monthly Revenue Target: ${formData.monthlyRevenueTarget}\n` +
      `Biggest Growth Obstacle: ${formData.biggestObstacle}\n\n` +
      `Looking forward to scheduling my flagship application review call.`
    );

    window.open(`mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md gpu-layer"
          style={{ willChange: 'opacity' }}
        />

        {/* MODAL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#101828]/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 my-8 overflow-hidden text-left gpu-layer"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#0C111D] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer z-20"
            id="close-flagship-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* HEADER BADGE & TITLE */}
              <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">
                <Sprout className="w-4 h-4 text-pink-400" /> CREATOR CAREER ACCELERATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                Creator's Upgrade Program™
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed font-medium">
                Not a marketing agency. We help real people build full-time careers in content creation — with program rates adjusted to your budget.
              </p>

              {/* BUDGET-FRIENDLY CALLOUT */}
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-6 text-xs text-emerald-300 flex items-center justify-between gap-3 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>100% Budget-Friendly:</strong> Rates are tailored to your current creator stage and financial capacity.</span>
                </div>
                <span className="font-bold text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 uppercase tracking-wider shrink-0 border border-emerald-500/30">
                  Creator First
                </span>
              </div>

              {/* STEP PROGRESS BAR */}
              <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                <div
                  onClick={() => setCurrentStep(1)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    currentStep === 1
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500 text-white shadow-md'
                      : 'bg-[#0C111D] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  1. Program Pillars
                </div>
                <div
                  onClick={() => currentStep > 1 && setCurrentStep(2)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    currentStep === 2
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500 text-white shadow-md'
                      : currentStep > 2
                      ? 'bg-pink-500/10 border-pink-500/30 text-pink-300 cursor-pointer'
                      : 'bg-[#0C111D] border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  2. Channel Profile
                </div>
                <div
                  onClick={() => currentStep === 3 && setCurrentStep(3)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    currentStep === 3
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500 text-white shadow-md'
                      : 'bg-[#0C111D] border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  3. Application
                </div>
              </div>

              {/* FORM STEPS */}
              <form onSubmit={handleSubmit}>
                {/* STEP 1: PROGRAM PILLARS & OVERVIEW */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-[#0C111D] border border-slate-800 rounded-2xl space-y-3">
                      <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-pink-400" /> What Makes Flagship Unique?
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#121A2D] border border-slate-800 rounded-xl shadow-sm">
                          <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-pink-400" /> Retention & Hook Engine
                          </div>
                          <p className="text-slate-300 font-medium">Psychological video structures to double average viewer retention.</p>
                        </div>

                        <div className="p-3 bg-[#121A2D] border border-slate-800 rounded-xl shadow-sm">
                          <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-purple-400" /> Niche Edge & Positioning
                          </div>
                          <p className="text-slate-300 font-medium">Carve a clear unique value proposition (UVP) in crowded niches.</p>
                        </div>

                        <div className="p-3 bg-[#121A2D] border border-slate-800 rounded-xl shadow-sm">
                          <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> High-Margin Offers
                          </div>
                          <p className="text-slate-300 font-medium">Turn views into digital products, communities, or 1-on-1 offers.</p>
                        </div>

                        <div className="p-3 bg-[#121A2D] border border-slate-800 rounded-xl shadow-sm">
                          <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 1-on-1 Mentorship
                          </div>
                          <p className="text-slate-300 font-medium">30-60-90 day strategic execution guidance with the founders.</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-pink-500/10 border border-pink-500/30 rounded-xl text-xs text-slate-200 font-medium">
                      <span className="font-bold text-white">Included:</span> Complete Channel Audit, Custom Hook Frameworks, Sponsor Pitch Decks & Direct Founder Access.
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="w-full py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-pink-950/40 active:scale-[0.98]"
                      >
                        Start Channel Intake Application <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: CHANNEL INTAKE */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => {
                            setErrorMessage(null);
                            setFormData({ ...formData, fullName: e.target.value });
                          }}
                          placeholder="Alex Rivera"
                          className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setErrorMessage(null);
                            setFormData({ ...formData, email: e.target.value });
                          }}
                          placeholder="creator@domain.com"
                          className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => {
                            setErrorMessage(null);
                            setFormData({ ...formData, phone: e.target.value });
                          }}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">Instagram / Channel Handle *</label>
                        <input
                          type="text"
                          required
                          value={formData.instagramHandle}
                          onChange={(e) => {
                            setErrorMessage(null);
                            setFormData({ ...formData, instagramHandle: e.target.value });
                          }}
                          placeholder="@creator_handle / YouTube URL"
                          className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">Primary Niche</label>
                        <input
                          type="text"
                          value={formData.niche}
                          onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                          placeholder="e.g. AI, Tech, Business, Lifestyle"
                          className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">Current Reach / Scale</label>
                        <select
                          value={formData.currentReach}
                          onChange={(e) => setFormData({ ...formData, currentReach: e.target.value })}
                          className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium"
                        >
                          <option value="Under 5K Followers">Under 5K Followers (Early Stage)</option>
                          <option value="5K - 25K Followers">5K - 25K Followers (Building Momentum)</option>
                          <option value="25K - 100K Followers">25K - 100K Followers (Monetizing Scale)</option>
                          <option value="100K+ Followers">100K+ Followers (Category Leader)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage(null);
                          setCurrentStep(1);
                        }}
                        className="py-3 px-4 bg-[#0C111D] border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.instagramHandle.trim()) {
                            setErrorMessage('Please fill in all details before proceeding.');
                            return;
                          }
                          if (!isValidPhone(formData.phone)) {
                            setErrorMessage('Please enter a valid contact phone number.');
                            return;
                          }
                          setErrorMessage(null);
                          setCurrentStep(3);
                        }}
                        className="flex-1 py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-pink-950/40 active:scale-[0.98]"
                      >
                        Next: Goals & Bottlenecks <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: GOALS & BOTTLENECKS */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
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

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">Primary Upgrade Goal</label>
                      <select
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium"
                      >
                        <option value="Scale Audience & Engagement">Scale Audience & Viewer Retention</option>
                        <option value="Launch High-Margin Product/Offer">Launch Digital Product or Paid Community</option>
                        <option value="Secure High-Value Brand Deals">Secure Premium Brand Sponsorship Deals</option>
                        <option value="Build Authority & Unique Positioning">Carve Out Category Authority & UVP</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">Target Monthly Revenue Goal</label>
                      <select
                        value={formData.monthlyRevenueTarget}
                        onChange={(e) => setFormData({ ...formData, monthlyRevenueTarget: e.target.value })}
                        className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium"
                      >
                        <option value="$1,000 - $3,000 / month">$1,000 - $3,000 / month</option>
                        <option value="$3,000 - $5,000 / month">$3,000 - $5,000 / month</option>
                        <option value="$5,000 - $10,000 / month">$5,000 - $10,000 / month</option>
                        <option value="$10,000+ / month">$10,000+ / month</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">What is your biggest current growth bottleneck? *</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.biggestObstacle}
                        onChange={(e) => {
                          setErrorMessage(null);
                          setFormData({ ...formData, biggestObstacle: e.target.value });
                        }}
                        placeholder="e.g. Views drop off after 3 seconds, low engagement on reels, struggle turning views into revenue..."
                        className="w-full bg-[#0C111D] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:bg-[#0C111D] focus:outline-none focus:border-pink-500 font-medium placeholder:text-slate-500 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="py-3 px-4 bg-[#0C111D] border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>

                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-500 hover:via-purple-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-pink-950/40 active:scale-[0.98]"
                        id="submit-flagship-application-btn"
                      >
                        <Rocket className="w-4 h-4" /> Submit Flagship Application
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-pink-500/10 border border-pink-500/30 rounded-full flex items-center justify-center mx-auto text-pink-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Flagship Application Submitted!</h3>
              <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                Thank you, <span className="text-white font-bold">{formData.fullName}</span>! Your intake details for <span className="text-pink-400 font-bold">{formData.instagramHandle}</span> have been registered. Our founders will review your channel and follow up within 24 hours.
              </p>

              <div className="p-4 bg-[#0C111D] border border-slate-800 rounded-xl text-xs text-left space-y-1.5 text-slate-300 font-medium">
                <div><strong className="text-white font-bold">Program:</strong> Creator's Upgrade Program™ (Flagship)</div>
                <div><strong className="text-white font-bold">Handle:</strong> {formData.instagramHandle}</div>
                <div><strong className="text-white font-bold">Target Goal:</strong> {formData.primaryGoal}</div>
                <div><strong className="text-white font-bold">Target Revenue:</strong> {formData.monthlyRevenueTarget}</div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
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
    </AnimatePresence>
  );
};
