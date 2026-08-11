import React, { useState, useMemo } from 'react';
import { TrendingUp, Sparkles, PieChart, ShieldAlert, ArrowRight, Zap, Target, Award, Users, IndianRupee } from 'lucide-react';
import { motion } from 'motion/react';

interface RevenueCalculatorProps {
  onNavigateToBlueprint: () => void;
  onOpenBooking: () => void;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({
  onNavigateToBlueprint,
  onOpenBooking,
}) => {
  // Inputs state
  const [followers, setFollowers] = useState<number>(25000);
  const [avgViews, setAvgViews] = useState<number>(10000);
  const [interactions, setInteractions] = useState<number>(2500);
  const [niche, setNiche] = useState<string>('Business, AI & Tech');

  // Multipliers based on Indian Market Niche
  const nicheMultiplier = useMemo(() => {
    switch (niche) {
      case 'Business, AI & Tech': return 1.25;
      case 'Finance & Personal Wealth': return 1.35;
      case 'Education, Career & Productivity': return 1.15;
      case 'Fitness, Health & Nutrition': return 1.05;
      case 'Lifestyle, Fashion & Travel': return 1.0;
      case 'Gaming, Comedy & Entertainment': return 0.85;
      default: return 1.0;
    }
  }, [niche]);

  // Calculations in Indian Rupees (₹)
  const calculatedBreakdown = useMemo(() => {
    // Base monthly reach factor (~10 reels/videos per month)
    const monthlyViews = avgViews * 10;
    
    // 1. Brand Deals & Collaborations (₹ / month) - Indian CPM (~₹50-80/1k views)
    const brandDealsEst = Math.round((monthlyViews / 1000) * 55 * nicheMultiplier);

    // 2. Digital Products, E-books & Guides (₹ / month) - Micro-conversions on engaged audience
    const digitalProductEst = Math.round((interactions * 0.008) * 199 * nicheMultiplier);

    // 3. Mentorship & High-Ticket Services (₹ / month) - 1-on-1 calls & consulting
    const coachingEst = Math.round((interactions * 0.0008) * 2499 * nicheMultiplier);

    // 4. Affiliate Links & EarnKaro (₹ / month) - Product links & recommendations
    const affiliateEst = Math.round((followers * 0.0005) * 150 * nicheMultiplier);

    const totalAverageMonthly = Math.round(
      brandDealsEst + digitalProductEst + coachingEst + affiliateEst
    );

    // Dynamic 15% range around average value
    const minMonthly = Math.round(totalAverageMonthly * 0.85);
    const maxMonthly = Math.round(totalAverageMonthly * 1.15);

    return {
      brandDeals: Math.max(1200, brandDealsEst),
      digitalProducts: Math.max(1000, digitalProductEst),
      coachingServices: Math.max(1000, coachingEst),
      affiliate: Math.max(500, affiliateEst),
      minMonthly: Math.max(3500, minMonthly),
      maxMonthly: Math.max(6000, maxMonthly),
      averageMonthly: Math.max(4800, totalAverageMonthly)
    };
  }, [followers, avgViews, interactions, nicheMultiplier]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full space-y-12">
      {/* HEADER HERO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-700 tracking-widest uppercase bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <IndianRupee className="w-3.5 h-3.5 text-emerald-600" /> INDIAN CREATOR MONETIZATION INTEL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
          What's Your Indian Creator <span className="text-emerald-600">Revenue Potential?</span> 🇮🇳
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
          Follower count alone doesn't pay Indian creators. Strategy does. Calculate your realistic monthly earning potential in Indian Rupees (₹) based on Indian brand deal rates, digital product sales, and mentorship opportunities.
        </p>
      </div>

      {/* MAIN CALCULATOR CONTAINER */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-emerald-600" />
              Creator Audience Metrics
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Adjust the sliders and parameters for your Indian audience profile.
            </p>
          </div>

          {/* SLIDER 1: Followers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 uppercase tracking-wider">Total Followers / Subscribers</span>
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-extrabold text-sm">
                {followers.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={500000}
              step={1000}
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>1K</span>
              <span>100K</span>
              <span>500K+</span>
            </div>
          </div>

          {/* SLIDER 2: Average Views */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 uppercase tracking-wider">Avg Views per Reel/Video</span>
              <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 font-extrabold text-sm">
                {avgViews.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={200000}
              step={500}
              value={avgViews}
              onChange={(e) => setAvgViews(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>500</span>
              <span>50K</span>
              <span>200K+</span>
            </div>
          </div>

          {/* SLIDER 3: Audience Interactions */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 uppercase tracking-wider flex items-center gap-1">
                Audience Interactions <span className="text-slate-500 font-medium lowercase">(check professional dashboard)</span>
              </span>
              <span className="text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 font-extrabold text-sm">
                {interactions.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={50000}
              step={100}
              value={interactions}
              onChange={(e) => setInteractions(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>100</span>
              <span>10,000</span>
              <span>50,000+</span>
            </div>
          </div>

          {/* DROPDOWNS */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Content Niche
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 cursor-pointer text-slate-800"
              >
                <option value="Business, AI & Tech">Business, AI & Tech</option>
                <option value="Finance & Personal Wealth">Finance & Personal Wealth</option>
                <option value="Education, Career & Productivity">Education, Career & Upskilling</option>
                <option value="Fitness, Health & Nutrition">Fitness, Health & Wellness</option>
                <option value="Lifestyle, Travel & Fashion">Lifestyle, Fashion & Travel</option>
                <option value="Gaming, Comedy & Entertainment">Gaming, Comedy & Entertainment</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS DASHBOARD */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* TOTAL ESTIMATED OPPORTUNITY HEADER */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden text-center">
            <span className="text-[11px] font-black uppercase text-emerald-400 tracking-widest bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full mb-3 inline-block">
              ESTIMATED MONTHLY EARNINGS (INR ₹)
            </span>

            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight my-2">
              {formatCurrency(calculatedBreakdown.minMonthly)} – {formatCurrency(calculatedBreakdown.maxMonthly)}
              <span className="text-xs font-bold text-slate-400 block mt-1">/ month range</span>
            </div>

            <div className="mt-3 py-2 px-4 bg-emerald-950/90 border border-emerald-500/40 rounded-xl inline-block shadow-inner">
              <span className="text-xs text-slate-300 font-medium">Average Expected Earnings: </span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-400">{formatCurrency(calculatedBreakdown.averageMonthly)} / mo</span>
            </div>
          </div>

          {/* MONETIZATION STREAM BREAKDOWN */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-emerald-600" /> Estimated Monthly Revenue Stream Breakdown (₹)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Brand Deals & Collaborations', val: calculatedBreakdown.brandDeals, icon: Award, desc: 'Sponsored Reel placements & Indian brand integrations.' },
                { title: 'Digital Products & Guides', val: calculatedBreakdown.digitalProducts, icon: Zap, desc: 'E-books, templates, checklists & micro-guides (₹99-₹299).' },
                { title: 'Mentorship & High-Ticket Services', val: calculatedBreakdown.coachingServices, icon: Target, desc: '1-on-1 calls, audits, agency retainer or advisory.' },
                { title: 'Affiliate Links & EarnKaro', val: calculatedBreakdown.affiliate, icon: Users, desc: 'Amazon.in links, tool recommendations & promo codes.' },
              ].map((stream, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 hover:border-emerald-300 transition-all shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <stream.icon className="w-3.5 h-3.5 text-emerald-600" />
                      {stream.title}
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      {formatCurrency(stream.val)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">
                    {stream.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DISCLAIMER BOX */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-2.5 text-slate-600 text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong>Indian Market Note:</strong> These estimates represent realistic potential benchmarks in the Indian content ecosystem for {niche}. Actual earnings depend on offer structure, audience trust, positioning, and conversion funnel optimization.
            </p>
          </div>

          {/* BOTTOM NAVIGATION CTA */}
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                Ready to monetize your Indian audience?
              </h4>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Turn your views into consistent monthly income in Rupees.
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onNavigateToBlueprint}
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <span>Build My Growth Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
