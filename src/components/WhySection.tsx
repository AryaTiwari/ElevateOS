import React, { useState, memo, useMemo } from 'react';
import { motion } from 'motion/react';

interface WhySectionProps {
  onOpenBooking?: () => void;
}

const NICHE_MULTIPLIERS: Record<string, { factor: number; label: string; emoji: string }> = {
  finance: { factor: 1.25, label: 'Finance & Business', emoji: '💰' },
  tech: { factor: 1.15, label: 'Tech & AI', emoji: '💻' },
  fashion: { factor: 1.0, label: 'Fashion & Lifestyle', emoji: '👗' },
  fitness: { factor: 1.05, label: 'Fitness & Health', emoji: '🏋️' },
  education: { factor: 1.1, label: 'Education & Career', emoji: '🎓' },
  entertainment: { factor: 0.88, label: 'Gaming & Memes', emoji: '🎮' }
};

// Helper to parse numerical values and flexible string inputs (e.g. "200000", "20k", "20K", "2 Lakhs", "2.5 L", "1.5 Cr", "1.2M")
const parseFlexibleCount = (input: string): number => {
  if (!input) return 0;
  const rawStr = input.toString().trim();
  if (!rawStr) return 0;

  // Normalize string for case-insensitive checks
  const cleaned = rawStr.toLowerCase().replace(/,/g, '');

  // Check for Crores / Cr
  if (cleaned.includes('crore') || cleaned.includes('cr')) {
    const val = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
    return isNaN(val) ? 0 : Math.round(val * 10000000);
  }
  // Check for Lakhs / Lacs / L
  if (cleaned.includes('lakh') || cleaned.includes('lac') || /\b\d+(\.\d+)?\s*l\b/.test(cleaned) || cleaned.endsWith('l')) {
    const val = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
    return isNaN(val) ? 0 : Math.round(val * 100000);
  }
  // Check for Millions / M
  if (cleaned.includes('million') || /\b\d+(\.\d+)?\s*m\b/.test(cleaned) || cleaned.endsWith('m')) {
    const val = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
    return isNaN(val) ? 0 : Math.round(val * 1000000);
  }
  // Check for Thousands / K
  if (cleaned.includes('thousand') || /\b\d+(\.\d+)?\s*k\b/.test(cleaned) || cleaned.endsWith('k')) {
    const val = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
    return isNaN(val) ? 0 : Math.round(val * 1000);
  }

  // Raw numerical value fallback
  const rawNum = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
  return isNaN(rawNum) ? 0 : Math.round(rawNum);
};

// Helper to format raw numbers in standard Indian notation
const formatCountDisplay = (num: number) => {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakhs`;
  }
  if (num >= 1000) {
    return `${Math.round(num).toLocaleString('en-IN')}`;
  }
  return `${Math.round(num)}`;
};

const formatRupees = (num: number) => {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(1)} Lakhs`;
  }
  if (num >= 1000) {
    return `₹${Math.round(num).toLocaleString('en-IN')}`;
  }
  return `₹${Math.round(num)}`;
};

export const WhySection: React.FC<WhySectionProps> = memo(({ onOpenBooking }) => {
  // Revenue Generator States
  const [followerInput, setFollowerInput] = useState<string>('2 Lakhs');
  const [viewInput, setViewInput] = useState<string>('3 Lakhs');

  const [nicheKey, setNicheKey] = useState<string>('finance');
  const [activeStreams, setActiveStreams] = useState<{ brandDeals: boolean; digitalProducts: boolean; affiliate: boolean; adSense: boolean }>({
    brandDeals: true,
    digitalProducts: true,
    affiliate: true,
    adSense: true
  });

  const toggleStream = (stream: keyof typeof activeStreams) => {
    setActiveStreams(prev => ({ ...prev, [stream]: !prev[stream] }));
  };

  // Parsed numeric values
  const parsedFollowerCount = useMemo(() => parseFlexibleCount(followerInput), [followerInput]);
  const parsedViewCount = useMemo(() => parseFlexibleCount(viewInput), [viewInput]);

  // Real-world Indian Market Revenue Calculations
  const calculations = useMemo(() => {
    const f = parsedFollowerCount;
    // Use view count if given, or fallback to 1.5x follower count if only followers are entered
    const v = parsedViewCount > 0 ? parsedViewCount : (f > 0 ? f * 1.5 : 0);
    const nicheFactor = (NICHE_MULTIPLIERS[nicheKey] || NICHE_MULTIPLIERS.finance).factor;

    let baseRevenue = 0;

    if (v <= 0 && f <= 0) {
      baseRevenue = 0;
    } else if (v <= 20000) {
      // 0 to 20k views -> ₹0 to ₹3,000
      baseRevenue = (v / 20000) * 3000;
    } else if (v <= 200000) {
      // 20k to 2 Lakhs views -> ₹3,000 to ₹15,000
      const ratio = (v - 20000) / 180000;
      baseRevenue = 3000 + ratio * 12000;
    } else if (v <= 500000) {
      // 2 Lakhs to 5 Lakhs views -> ₹15,000 to ₹35,000
      const ratio = (v - 200000) / 300000;
      baseRevenue = 15000 + ratio * 20000;
    } else if (v <= 1000000) {
      // 5 Lakhs to 10 Lakhs (1M) views -> ₹35,000 to ₹80,000
      const ratio = (v - 500000) / 500000;
      baseRevenue = 35000 + ratio * 45000;
    } else if (v <= 5000000) {
      // 10 Lakhs to 50 Lakhs (5M) views -> ₹80,000 to ₹3,50,000
      const ratio = (v - 1000000) / 4000000;
      baseRevenue = 80000 + ratio * 270000;
    } else if (v <= 10000000) {
      // 50 Lakhs to 1 Crore (10M) views -> ₹3,50,000 to ₹8,50,000
      const ratio = (v - 5000000) / 5000000;
      baseRevenue = 350000 + ratio * 500000;
    } else {
      // Above 1 Crore views -> ₹8,50,000 + continuous scaling
      const extra = v - 10000000;
      baseRevenue = 850000 + (extra / 10000000) * 700000;
    }

    // Add follower brand authority baseline retainer (up to ₹1.5 Lakhs max for mega profiles)
    const followerRetainer = f > 0 ? Math.min(f * 0.05, 150000) : 0;
    const totalPotentialBase = (baseRevenue + followerRetainer) * nicheFactor;

    // Stream allocations
    const rawBrandDeals = totalPotentialBase * 0.45;
    const rawDigital = totalPotentialBase * 0.25;
    const rawAffiliate = totalPotentialBase * 0.15;
    const rawAdSense = totalPotentialBase * 0.15;

    const brandDealsVal = activeStreams.brandDeals ? rawBrandDeals : 0;
    const digitalProductsVal = activeStreams.digitalProducts ? rawDigital : 0;
    const affiliateVal = activeStreams.affiliate ? rawAffiliate : 0;
    const adSenseVal = activeStreams.adSense ? rawAdSense : 0;

    const totalEstimatedMonthly = brandDealsVal + digitalProductsVal + affiliateVal + adSenseVal;
    const maxPotentialMonthly = totalPotentialBase * 1.35;

    // Realization Probability
    let prob = 35;
    if (activeStreams.brandDeals) prob += 15;
    if (activeStreams.digitalProducts) prob += 25;
    if (activeStreams.affiliate) prob += 10;
    if (activeStreams.adSense) prob += 10;
    if (v >= 1000000) prob += 5;

    const probability = Math.min(95, Math.max(25, prob));

    return {
      brandDealsVal,
      digitalProductsVal,
      affiliateVal,
      adSenseVal,
      totalEstimatedMonthly,
      maxPotentialMonthly,
      probability
    };
  }, [parsedViewCount, parsedFollowerCount, nicheKey, activeStreams]);

  return (
    <section id="revenue-calculator" className="py-[50px] md:py-[70px] relative scroll-mt-24">
      <div className="w-[min(1120px,92%)] mx-auto">
        {/* INDIAN CREATOR REVENUE POTENTIAL & REAL-WORLD PROBABILITY GENERATOR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-black uppercase tracking-wider mb-2">
                <span>🇮🇳</span>
                <span>🔥 ARE YOU UNDERMONETIZING YOUR CONTENT?</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Calculate How Much Money Your Channel SHOULD Be Making 💸
              </h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
                95% of Indian creators leave lakhs on the table every month. Type your followers and monthly video views below to instantly calculate your true earning potential across brand deals, digital products, and ad revenue.
              </p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl shrink-0 text-center md:text-right border border-slate-800 shadow-md">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">ESTIMATED MONTHLY REVENUE</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-0.5">
                {formatRupees(calculations.totalEstimatedMonthly)} <span className="text-xs font-normal text-slate-300">/mo</span>
              </div>
            </div>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
            {/* INPUT CONTROLS (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Followers Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>👥</span> 1. Followers / Subscribers
                  </label>
                  {parsedFollowerCount > 0 && (
                    <span className="text-[11px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      = {formatCountDisplay(parsedFollowerCount)}
                    </span>
                  )}
                </div>

                <div className="relative mb-2">
                  <input
                    type="text"
                    value={followerInput}
                    onChange={(e) => setFollowerInput(e.target.value)}
                    placeholder="Type raw number (e.g. 200000) or format (e.g. 2 Lakhs, 20k, 1 Cr)"
                    className="w-full py-3 px-4 pl-10 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-400 shadow-xs"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">✏️</span>
                </div>

                {/* Quick Numerical Shortcut Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {['20k', '2 Lakhs', '5 Lakhs', '10 Lakhs', '50 Lakhs', '1 Crore'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFollowerInput(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        followerInput === preset
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Monthly Views Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>👀</span> 2. 30-Day Video Views (Shorts / Reels / Longform)
                  </label>
                  {parsedViewCount > 0 && (
                    <span className="text-[11px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      = {formatCountDisplay(parsedViewCount)} Views
                    </span>
                  )}
                </div>

                <div className="relative mb-2">
                  <input
                    type="text"
                    value={viewInput}
                    onChange={(e) => setViewInput(e.target.value)}
                    placeholder="Type raw number (e.g. 300000) or format (e.g. 3 Lakhs, 30k, 1.5 Cr)"
                    className="w-full py-3 px-4 pl-10 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-400 shadow-xs"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">✏️</span>
                </div>

                {/* Quick Numerical Shortcut Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {['30k', '3 Lakhs', '7 Lakhs', '20 Lakhs', '70 Lakhs', '1.5 Crore'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setViewInput(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        viewInput === preset
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Niche Selector */}
              <div>
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block mb-2">
                  🎯 3. Content Niche & Industry RPM
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.entries(NICHE_MULTIPLIERS).map(([key, n]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setNicheKey(key)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        nicheKey === key
                          ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base mr-1.5">{n.emoji}</span>
                      <span className="text-xs font-bold">{n.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Active Monetization Channels */}
              <div>
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block mb-2">
                  ⚡ 4. Active Revenue Channels (Toggle On/Off)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleStream('brandDeals')}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                      activeStreams.brandDeals
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500 line-through'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>💼</span> Brand Deals & Sponsorships
                    </span>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900">
                      {activeStreams.brandDeals ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStream('digitalProducts')}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                      activeStreams.digitalProducts
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500 line-through'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>📦</span> Digital Products & E-books
                    </span>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900">
                      {activeStreams.digitalProducts ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStream('affiliate')}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                      activeStreams.affiliate
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500 line-through'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🔗</span> Affiliate & Brand Links
                    </span>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900">
                      {activeStreams.affiliate ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStream('adSense')}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                      activeStreams.adSense
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500 line-through'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>📺</span> Platform AdSense / Bonuses
                    </span>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900">
                      {activeStreams.adSense ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* RESULTS & PROBABILITY INSIGHTS (5 COLS) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-6">
              {/* Real World Revenue Generation Probability Meter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🔥</span> REVENUE REALIZATION PROBABILITY
                  </span>
                  <span className="text-sm font-black text-blue-700">
                    {calculations.probability}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${calculations.probability}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${
                      calculations.probability >= 75
                        ? 'bg-emerald-500'
                        : calculations.probability >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                  />
                </div>

                <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-medium">
                  {calculations.probability >= 75 ? (
                    <span className="text-emerald-800 font-bold">
                      🌟 High Monetization Probability: Multi-stream diversification captures both Indian brand budgets and direct customer transactions.
                    </span>
                  ) : calculations.probability >= 50 ? (
                    <span className="text-amber-800 font-bold">
                      ⚠️ Moderate Realization: Relying mostly on sponsorships leaves over 40% of potential income on the table.
                    </span>
                  ) : (
                    <span className="text-rose-800 font-bold">
                      🚨 Low Realization Probability: Single revenue channels or lack of digital offers lead to high audience leak.
                    </span>
                  )}
                </p>
              </div>

              {/* ESTIMATED BREAKDOWN BY CHANNEL */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                  ESTIMATED MONTHLY EARNINGS BREAKDOWN (₹)
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <span>💼</span> Brand Collabs:
                    </span>
                    <span className="font-black text-slate-900">
                      {formatRupees(calculations.brandDealsVal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <span>📦</span> Digital Products:
                    </span>
                    <span className="font-black text-emerald-700">
                      {formatRupees(calculations.digitalProductsVal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <span>🔗</span> Affiliate Revenue:
                    </span>
                    <span className="font-black text-slate-900">
                      {formatRupees(calculations.affiliateVal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <span>📺</span> AdSense / Payouts:
                    </span>
                    <span className="font-black text-slate-900">
                      {formatRupees(calculations.adSenseVal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* POTENTIAL UNLOCKED GAP */}
              <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl space-y-2">
                <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest block">
                  MAXIMUM REVENUE POTENTIAL GAP
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  By fully optimizing digital offers & pitch positioning, your channel can realistically unlock up to <strong className="text-emerald-400 font-bold">{formatRupees(calculations.maxPotentialMonthly)}/mo</strong> in the Indian market.
                </p>

                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full mt-2 py-3 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
                  >
                    <span>Unlock Revenue Strategy Session 🚀</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

WhySection.displayName = 'WhySection';

