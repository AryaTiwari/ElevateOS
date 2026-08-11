import React from 'react';
import { Target, TrendingUp, HeartHandshake, Brain, Rocket, ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenBooking: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onSelectService,
}) => {
  const serviceCards = [
    {
      icon: Target,
      title: 'Creator Strategy',
      badge: 'FOUNDATION',
      desc: 'Channel positioning, audience qualification, and content pillars tailored around your long-term goal.',
      features: ['Niche Positioning Shift', 'Audience Qualification System', 'Bio & Profile Optimization'],
      theme: {
        cardBg: 'bg-gradient-to-br from-blue-50/90 via-white to-sky-50/60 border-2 border-blue-200 hover:border-blue-500 shadow-blue-500/5',
        iconBg: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
        badgeBg: 'bg-blue-100 text-blue-800 border border-blue-200',
        titleHover: 'group-hover:text-blue-600',
        checkColor: 'text-blue-600',
        btnBg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
      }
    },
    {
      icon: HeartHandshake,
      title: 'Brand & Monetization Strategy',
      badge: 'REVENUE',
      desc: 'Structure high-converting digital offers, brand deal pitch kits, and high-ticket service packages.',
      features: ['Digital Product Packaging', 'Brand Deal Pitch Templates', 'DM Lead Funnel Capture'],
      theme: {
        cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 border-2 border-emerald-200 hover:border-emerald-500 shadow-emerald-500/5',
        iconBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20',
        badgeBg: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
        titleHover: 'group-hover:text-emerald-600',
        checkColor: 'text-emerald-600',
        btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20'
      }
    },
    {
      icon: Brain,
      title: 'Content Psychology',
      badge: 'VIRALITY',
      desc: 'Master curiosity gaps, emotional triggers, and psychological framing to turn viewers into followers.',
      features: ['Curiosity Gap Framing', 'Contrarian View Points', 'Binge-Loop Retention Tricks'],
      theme: {
        cardBg: 'bg-gradient-to-br from-purple-50/90 via-white to-fuchsia-50/60 border-2 border-purple-200 hover:border-purple-500 shadow-purple-500/5',
        iconBg: 'bg-purple-600 text-white shadow-md shadow-purple-500/20',
        badgeBg: 'bg-purple-100 text-purple-800 border border-purple-200',
        titleHover: 'group-hover:text-purple-600',
        checkColor: 'text-purple-600',
        btnBg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20'
      }
    },
    {
      icon: TrendingUp,
      title: 'Multi-Platform Reach System',
      badge: 'SCALE',
      desc: 'Turn a single video idea into multi-platform reach across Instagram, YouTube, and Facebook without burning out.',
      features: ['Sustainable Content Workflow', 'Organic Community Flywheel', 'Multi-Platform Repurposing'],
      theme: {
        cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/60 border-2 border-amber-200 hover:border-amber-500 shadow-amber-500/5',
        iconBg: 'bg-amber-500 text-white shadow-md shadow-amber-500/20',
        badgeBg: 'bg-amber-100 text-amber-900 border border-amber-200',
        titleHover: 'group-hover:text-amber-600',
        checkColor: 'text-amber-600',
        btnBg: 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20'
      }
    },
    {
      icon: ShieldCheck,
      title: 'Creator-First Brand Sponsorships',
      badge: 'DEALS',
      desc: 'Pitch, negotiate, and land high-paying brand deals that respect your creative freedom while generating income.',
      features: ['Media Kit & Pitch Deck', 'Inbound Deal Management', 'Rate Negotiation Mastery'],
      theme: {
        cardBg: 'bg-gradient-to-br from-teal-50/90 via-white to-cyan-50/60 border-2 border-teal-200 hover:border-teal-500 shadow-teal-500/5',
        iconBg: 'bg-teal-600 text-white shadow-md shadow-teal-500/20',
        badgeBg: 'bg-teal-100 text-teal-800 border border-teal-200',
        titleHover: 'group-hover:text-teal-600',
        checkColor: 'text-teal-600',
        btnBg: 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/20',
        btnText: 'Explore Service'
      }
    },
    {
      icon: Rocket,
      title: "Creator's Upgrade Program™",
      badge: 'FLAGSHIP',
      desc: 'Our flagship 1-on-1 mentorship system to solve content creation problems and scale your channel with zero burnout.',
      features: ['1-on-1 Founder Mentorship', 'Custom Growth Blueprint', '100% Creator Budget-Adjusted Rates'],
      theme: {
        cardBg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-2 border-amber-400 hover:border-amber-300 shadow-xl shadow-amber-500/10',
        iconBg: 'bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 text-slate-950 font-black shadow-md shadow-orange-500/30',
        badgeBg: 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 text-slate-950 font-black border border-amber-300 shadow-xs',
        titleHover: 'group-hover:text-amber-300',
        checkColor: 'text-amber-400',
        titleColor: 'text-white',
        descColor: 'text-slate-300',
        featureTextColor: 'text-slate-200',
        btnBg: 'bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:opacity-95 text-slate-950 font-black shadow-lg shadow-orange-500/25',
        btnText: 'Apply For Upgrade Program'
      }
    }
  ];

  const processSteps = [
    { step: '01', title: 'Diagnose', desc: 'We analyze your current channel metrics, hook drop-offs, and audience bottlenecks to find what is capping your reach.' },
    { step: '02', title: 'Strategize', desc: 'We build a personalized 3-step growth blueprint, positioning strategy, and high-converting offer structure.' },
    { step: '03', title: 'Execute', desc: 'You implement strong short-form scripts, curiosity hooks, and automated lead capture funnels with our guidance.' },
    { step: '04', title: 'Optimize', desc: 'We review performance analytics, refine pacing and retention, and scale your monetization streams.' }
  ];

  return (
    <div className="w-full space-y-10">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-700 tracking-widest uppercase bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> CREATOR SERVICES & MENTORSHIP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
          From Content to <span className="text-blue-600">Growth.</span> 🚀
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          We don't just tell creators what to do. We help them build systems that actually move them forward.
        </p>
      </div>

      {/* CORE SERVICE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCards.map((srv, idx) => (
          <div 
            key={idx} 
            className={`${srv.theme.cardBg} rounded-3xl p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-lg transition-all transform hover:-translate-y-1 group relative overflow-hidden`}
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-2xl ${srv.theme.iconBg} flex items-center justify-center font-bold`}>
                  <srv.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${srv.theme.badgeBg}`}>
                  {srv.badge}
                </span>
              </div>

              <h3 className={`text-xl font-black ${srv.theme.titleColor || 'text-slate-900'} ${srv.theme.titleHover} transition-colors tracking-tight`}>
                {srv.title}
              </h3>

              <p className={`text-xs sm:text-sm ${srv.theme.descColor || 'text-slate-600'} font-medium leading-relaxed`}>
                {srv.desc}
              </p>

              <div className="space-y-2 pt-2">
                {srv.features.map((feat, fIdx) => (
                  <div key={fIdx} className={`flex items-center gap-2 text-xs font-bold ${srv.theme.featureTextColor || 'text-slate-800'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${srv.theme.checkColor} shrink-0`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService({ id: srv.title.toLowerCase().replace(/\s+/g, '-'), title: srv.title, description: srv.desc })}
              className={`w-full py-3.5 ${srv.theme.btnBg} font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 relative z-10 group-hover:scale-[1.02]`}
            >
              <span>{srv.theme.btnText || 'Explore Service'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* PROCESS SECTION (01 - 04) */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl border border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800 inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" /> HOW WE WORK WITH YOU
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            The 4-Step Elevate Process
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            From initial channel diagnosis to long-term audience scaling and monetization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((p, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative overflow-hidden">
              <span className="text-3xl font-black text-blue-500/40 block">
                {p.step}
              </span>
              <h4 className="text-lg font-black text-white">{p.title}</h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA — FREE STRATEGY SESSION */}
      <div className="p-8 sm:p-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl text-center space-y-6 shadow-2xl border border-blue-500/30 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          100% FREE STRATEGY SESSION • NO OBLIGATION
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            Get a Free 1-on-1 Strategy Session for Your Channel
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
            Book a complimentary 1-on-1 session with Arya Tiwari and the Elevate OS strategy team. We'll analyze your hooks, retention, and monetization gaps with zero sales pressure.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Call
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct 1-on-1 Channel Audit
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Actionable 7-Day Growth Plan
          </span>
        </div>

        <div className="pt-2">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-blue-500/30 cursor-pointer inline-flex items-center gap-2 transform hover:scale-105"
          >
            <span>Book Your Free Strategy Session Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
