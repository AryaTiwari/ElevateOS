import React, { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ClearHistoryDialogProps {
  isOpen: boolean;
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ClearHistoryDialog: React.FC<ClearHistoryDialogProps> = memo(({
  isOpen,
  count,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-[#101828] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-2xl shrink-0">
              <span>🗑️</span>
            </div>
            <button
              onClick={onCancel}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            >
              <span>✕</span>
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-white">
              Clear your {count > 0 ? count : ''} recent Reel {count === 1 ? 'analysis' : 'analyses'}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              This will remove your recent Reel analysis reports from your local history. This action cannot be undone.
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-950/40 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>🗑️</span>
              <span>Clear All</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
