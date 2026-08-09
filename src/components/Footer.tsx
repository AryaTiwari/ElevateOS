import React, { memo } from 'react';
import { CONTACT_INFO } from '../data/elevateData';
import { Instagram, Mail, ShieldCheck, FileText } from 'lucide-react';

interface FooterProps {
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = memo(({ onOpenLegal }) => {
  return (
    <footer className="border-t border-slate-200 py-[38px] text-slate-600 text-[13px] bg-white/80 backdrop-blur-md">
      <div className="w-[min(1120px,92%)] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 flex-wrap">
          <div>
            <strong className="text-slate-900 text-base font-extrabold block mb-1">
              Elevate <span className="text-blue-600">OS</span>
            </strong>
            <p className="text-slate-600 font-medium">The Operating System for Creators.</p>
            <p className="text-slate-500 mt-1 text-xs">© 2026 Elevate OS. All Rights Reserved.</p>
          </div>

          <div className="flex items-center gap-5 text-sm font-medium flex-wrap">
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Terms & Conditions
            </button>

            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Instagram className="w-3.5 h-3.5 text-blue-600" />
              {CONTACT_INFO.instagramHandle}
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';


