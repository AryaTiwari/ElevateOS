import React, { useState, memo } from 'react';
import { CheckSquare, Square, CheckCircle, Sparkles } from 'lucide-react';

interface BeforeYouPostChecklistSectionProps {
  checklist?: string[];
}

export const BeforeYouPostChecklistSection: React.FC<BeforeYouPostChecklistSectionProps> = memo(({ checklist = [] }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!checklist || checklist.length === 0) return null;

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklist.length;

  return (
    <div id="section-before-you-post" className="bg-[#101828]/95 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30 inline-flex items-center gap-1.5 mb-2">
            <CheckSquare className="w-3 h-3" />
            <span>SECTION 7 • BEFORE YOU POST</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Pre-Publish Quick Checklist
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-[#0C111D] px-3.5 py-1.5 rounded-xl border border-indigo-500/30 text-xs font-bold self-start sm:self-auto">
          <span className="text-slate-400">Progress:</span>
          <span className="text-indigo-400 font-extrabold">{completedCount} / {totalCount} completed</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {checklist.slice(0, 5).map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              id={`checklist-item-${idx + 1}`}
              onClick={() => toggleCheck(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isChecked
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                  : 'bg-[#0C111D] border-slate-800 hover:border-slate-700 text-white'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {isChecked ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500" />
                )}
              </button>
              <span className={`text-xs sm:text-sm font-medium leading-relaxed ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {completedCount === totalCount && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>All checks passed! Your Reel is optimized and ready to post.</span>
        </div>
      )}
    </div>
  );
});
