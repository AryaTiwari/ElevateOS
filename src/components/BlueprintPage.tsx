import React from 'react';
import { DiagnosticTool } from './DiagnosticTool';
import { Target, ArrowRight, Sparkles } from 'lucide-react';

interface BlueprintPageProps {
  onOpenBooking: () => void;
}

export const BlueprintPage: React.FC<BlueprintPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-indigo-700 tracking-widest uppercase bg-indigo-100 border border-indigo-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <Target className="w-3.5 h-3.5 text-indigo-600" /> 7-DAY CREATOR ROADMAP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
          Your 7-Day <span className="text-indigo-600">Creator Roadmap.</span> 🚀
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Get quick, surface-level direction for your next 7 days based on your niche, stage, main goal, and biggest bottleneck.
        </p>
      </div>

      {/* 7-DAY ROADMAP TOOL CONTAINER */}
      <DiagnosticTool onOpenBooking={onOpenBooking} />

      {/* BOTTOM CTA */}
      <div className="p-8 sm:p-12 bg-indigo-600 text-white rounded-3xl text-center space-y-4 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-black">
          Need help executing your growth strategy?
        </h3>
        <p className="text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto font-medium">
          Get 1-on-1 guidance from Arya Tiwari and the Elevate OS strategist team to implement your custom long-term creator strategy.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
          >
            <span>Book a Free Strategy Session</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
