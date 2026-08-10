import React, { useState, memo } from 'react';
import { DiagnosticInput, DiagnosticResult } from '../types';
import { Sparkles, Loader2, CheckCircle2, ArrowRight, RefreshCw, Layers, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateRoadmapPDF } from '../utils/pdfGenerator';

interface DiagnosticToolProps {
  onOpenBooking: () => void;
}

export const DiagnosticTool: React.FC<DiagnosticToolProps> = memo(({ onOpenBooking }) => {
  const [formData, setFormData] = useState<DiagnosticInput>({
    creatorName: '',
    niche: 'Tech, AI & Software',
    followers: 'Growing — 5K–25K',
    mainGoal: 'Sell High-Ticket Products',
    currentBottleneck: 'I get views but nobody buys my offer'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success && data.diagnosis) {
        setResult(data.diagnosis);
      } else {
        // Fallback result
        const fallbackName = formData.creatorName || 'Creator';
        setResult({
          creatorName: fallbackName,
          primaryNiche: formData.niche,
          audienceScale: formData.followers,
          primaryGoal: formData.mainGoal,
          growthBottleneckDiagnosis: `Your bottleneck around "${formData.currentBottleneck || "monetization"}" indicates a gap between raw audience views and high-intent offer positioning in ${formData.niche}.`,
          steps: [
            {
              stepNumber: "STEP 01",
              title: "FIX THE FOUNDATION: High-Trust Positioning Shift",
              whatToDo: `Reposition your content in ${formData.niche} to clearly demonstrate problem ownership rather than surface-level tips.`,
              actions: [
                `Audit your last 10 posts and remove topics that do not speak directly to qualified buyers.`,
                `Craft a signature 1-sentence bio value prop targeting your ${formData.followers} audience scale.`,
                `Introduce problem-aware hook lines that qualify your viewers immediately.`
              ],
              why: "Without positioning authority, high views fail to generate buyer trust.",
              expectedOutcome: "Immediate rise in qualified inquiry DMs and follower conversion."
            },
            {
              stepNumber: "STEP 02",
              title: "BUILD THE GROWTH ENGINE: Repeatable Conversion Content",
              whatToDo: `Establish a weekly content system that seamlessly transitions viewers from interest to demand.`,
              actions: [
                `Publish 2 case-study breakdown videos showing your process or transformation methodology.`,
                `Set up an automated direct lead capture mechanism off algorithmic platforms.`,
                `Create a high-value lead magnet that solves a painful sub-problem in ${formData.niche}.`
              ],
              why: "Predictable revenue requires an owned lead funnel rather than ad-hoc social posts.",
              expectedOutcome: "A steady, accumulating stream of warm leads and email subscribers."
            },
            {
              stepNumber: "STEP 03",
              title: "CREATE NEXT-LEVEL LEVERAGE: High-Ticket Offer Acceleration",
              whatToDo: `Package your expertise into an irresistible offer aligned with your primary goal of: ${formData.mainGoal}.`,
              actions: [
                `Define a clear 3-tier offer hierarchy for high-intent clients in ${formData.niche}.`,
                `Integrate subtle social-proof call-outs into your highest-reach content formats.`,
                `Implement a frictionless 2-step application intake process.`
              ],
              why: "Captures maximum revenue per view without needing millions of casual followers.",
              expectedOutcome: `Direct achievement of your goal: ${formData.mainGoal}.`
            }
          ],
          elevateMove: `Within the next 7 days: Re-package your top video from last month with a problem-focused hook line and a direct call-to-action to your primary intake link.`
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="audit" className="py-[70px] md:py-[90px] relative border-t border-slate-200 scroll-mt-24">
      <div className="w-[min(1120px,92%)] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 border border-blue-200 bg-blue-50 text-blue-700 rounded-full px-3.5 py-1 text-xs font-bold mb-3 uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            AI CREATOR ROADMAP GENERATOR
          </div>
          <h2 className="text-[32px] sm:text-[42px] font-bold text-slate-900 tracking-tight">
            Diagnose Your Creator Bottleneck
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            Select your niche and primary goals to instantly generate a customized Elevate OS strategic roadmap preview.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/40 gpu-layer"
        >
          {/* INPUT FORM */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Creator Diagnostic Input
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Creator / Channel Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera / @techcreator"
                  value={formData.creatorName}
                  onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Niche
                </label>
                <select
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                >
                  <option value="Fitness, Health">Fitness, Health</option>
                  <option value="Business, Startup & Finance">Business, Startup & Finance</option>
                  <option value="Design, Video & Creative">Design, Video & Creative</option>
                  <option value="Education & Self-Improvement">Education & Self-Improvement</option>
                  <option value="Tech, AI & Software">Tech, AI & Software</option>
                  <option value="Other / Specialty Niche">Other / Specialty Niche</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Audience Scale
                  </label>
                  <select
                    value={formData.followers}
                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                  >
                    <option value="Early Stage — 0–5K">Early Stage — 0–5K</option>
                    <option value="Growing — 5K–25K">Growing — 5K–25K</option>
                    <option value="Established — 25K–100K">Established — 25K–100K</option>
                    <option value="Scale — 100K+">Scale — 100K+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Goal
                  </label>
                  <select
                    value={formData.mainGoal}
                    onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                  >
                    <option value="Brand Collaborations">Brand Collaborations</option>
                    <option value="Sell High-Ticket Products">Sell High-Ticket Products</option>
                    <option value="Stand Out From Others">Stand Out From Others</option>
                    <option value="Gain Views, Followers & Likes">Gain Views, Followers & Likes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Main Bottleneck
                </label>
                <input
                  type="text"
                  value={formData.currentBottleneck}
                  onChange={(e) => setFormData({ ...formData, currentBottleneck: e.target.value })}
                  placeholder="e.g. Views are good but no one buys"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-50"
                id="run-audit-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing Creator Blueprint...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Growth Blueprint
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* DIAGNOSTIC OUTPUT RESULTS */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* HEADER */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>⚡</span> {result.creatorName}'s Creator Upgrade Roadmap
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                          Niche: {result.primaryNiche}
                        </span>
                        <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                          Stage: {result.audienceScale}
                        </span>
                        <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                          Goal: {result.primaryGoal}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => generateRoadmapPDF(result)}
                        className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" /> Download PDF Blueprint
                      </motion.button>

                      <button
                        onClick={() => setResult(null)}
                        className="p-2 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer rounded-xl border border-slate-200 bg-slate-50"
                        title="Reset Diagnosis"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* BOTTLENECK DIAGNOSIS */}
                  <div className="bg-blue-50/70 p-4 sm:p-5 rounded-2xl border border-blue-200 relative overflow-hidden">
                    <div className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <span>🔍</span> Your Growth Bottleneck
                    </div>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {result.growthBottleneckDiagnosis}
                    </p>
                  </div>

                  {/* 3-STEP ROADMAP */}
                  <div>
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span>🚀</span> Your 3-Step Growth Strategy
                      </span>
                      <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-bold">
                        Tailored for {result.creatorName}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {result.steps.map((stepItem, idx) => (
                        <div key={idx} className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5 hover:border-blue-300 transition-all shadow-sm relative overflow-hidden group gpu-layer">
                          {/* Top indicator bar */}
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                            <span className="text-xs font-black text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                              {stepItem.stepNumber}
                            </span>
                            <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              {idx === 0 ? '⚡ FOUNDATION' : idx === 1 ? '🚀 ENGINE' : '🔥 LEVERAGE'}
                            </span>
                          </div>

                          <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                            {stepItem.title}
                          </h4>

                          <div className="text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                            <span className="font-extrabold text-blue-700 uppercase text-[10px] tracking-wider block mb-1">
                              Strategy:
                            </span>
                            <p className="text-slate-700 leading-relaxed font-medium">{stepItem.whatToDo}</p>
                          </div>

                          {stepItem.actions && stepItem.actions.length > 0 && (
                            <div className="text-xs space-y-2 pt-0.5">
                              <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider block">
                                Action Checklist:
                              </span>
                              <div className="space-y-1.5">
                                {stepItem.actions.map((act, aIdx) => (
                                  <div key={aIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                    <span className="text-xs text-slate-700 leading-snug font-medium">{act}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-slate-200 text-xs">
                            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                              <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">Why It Works:</span>
                              <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed font-medium">{stepItem.why}</p>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                              <span className="font-bold text-emerald-700 block text-[10px] uppercase tracking-wider">Expected Outcome:</span>
                              <p className="text-emerald-800 text-[11px] mt-0.5 font-bold leading-relaxed">{stepItem.expectedOutcome}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ELEVATE MOVE */}
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 p-4 rounded-2xl">
                    <div className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <span>🎯</span> Your Elevate Move (Next 7 Days)
                    </div>
                    <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                      {result.elevateMove}
                    </p>
                  </div>

                  {/* CALL TO ACTION */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Ready to execute this 3-step strategy?</div>
                      <div className="text-sm font-bold text-slate-900">Save your blueprint & book your upgrade</div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => generateRoadmapPDF(result)}
                        className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Download className="w-4 h-4 text-blue-600" /> Download PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onOpenBooking}
                        className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
                      >
                        Book a Free Strategy Session <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[360px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
                >
                  <Sparkles className="w-12 h-12 text-blue-400/60 mb-3 animate-pulse" />
                  <h4 className="text-base font-bold text-slate-900">No Diagnosis Generated Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mt-1 font-medium">
                    Fill in your creator details on the left and click "Generate Growth Blueprint" to get your personalized Elevate OS 3-Step Roadmap.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

DiagnosticTool.displayName = 'DiagnosticTool';
