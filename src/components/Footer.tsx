import React, { memo } from 'react';
import { CONTACT_INFO } from '../data/elevateData';
import { Instagram, Mail, ShieldCheck, FileText, Brain, Target, DollarSign, Calendar, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenBooking: () => void;
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = memo(({ onNavigate, onOpenBooking, onOpenLegal }) => {
  return (
    <footer className="border-t border-slate-200 pt-12 pb-8 text-slate-600 text-xs bg-white relative z-10">
      <div className="w-[min(1120px,92%)] mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          
          {/* COL 1: BRAND */}
          <div className="md:col-span-4 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-slate-900 text-xl font-black tracking-tight text-left cursor-pointer flex items-center gap-1"
            >
              Elevate <span className="text-blue-600">OS</span>
            </button>
            <p className="text-slate-600 font-medium leading-relaxed max-w-sm">
              The Creator Intelligence Platform. Helping creators understand content performance, build smart strategies, and turn audience attention into real income.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: TOOLS */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Creator Toolkit
            </h4>
            <ul className="space-y-2 font-medium text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('elevate-ai')}
                  className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5 text-blue-600" />
                  <span>Elevate AI Content Analyzer</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blueprint')}
                  className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5 text-indigo-600" />
                  <span>7-Day Creator Roadmap</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('revenue')}
                  className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Revenue Calculator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* COL 3: COMPANY */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 font-medium text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  About Elevate OS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Services & Programs
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: CALL TO ACTION */}
          <div className="md:col-span-3 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Ready to Upgrade?
            </h4>
            <p className="text-[11px] text-slate-600 font-medium leading-tight">
              Schedule a 1-on-1 session to build your personalized creator growth funnel.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Strategy Session</span>
            </button>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Elevate OS. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" /> Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
