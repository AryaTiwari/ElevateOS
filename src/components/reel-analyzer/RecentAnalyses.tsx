import React, { useState, memo } from 'react';
import { SavedReelAnalysisSummary, ReelAnalysisResult } from '../../types';
import { ClearHistoryDialog } from './ClearHistoryDialog';

interface RecentAnalysesProps {
  history: SavedReelAnalysisSummary[];
  onSelectAnalysis: (analysis: ReelAnalysisResult) => void;
  onClearHistory: () => void;
}

export const RecentAnalyses: React.FC<RecentAnalysesProps> = memo(({
  history,
  onSelectAnalysis,
  onClearHistory,
}) => {
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const handleConfirmClear = () => {
    onClearHistory();
    setClearDialogOpen(false);
  };

  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <span>📜</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Recent Analyses
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Saved history of your last 5 Reel breakdowns.
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => setClearDialogOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🗑️</span>
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* List or Empty State */}
      {history.length === 0 ? (
        <div className="text-center py-10 sm:py-12 space-y-3 bg-[#0C111D]/60 rounded-2xl border border-slate-800/80 p-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto text-xl">
            <span>🎬</span>
          </div>
          <h4 className="text-sm font-bold text-white">No recent analyses</h4>
          <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
            Upload your first Reel to get started. Your recent 5 analysis reports will appear here for easy access.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-[#0C111D]/85 border border-slate-800 hover:border-pink-500/40 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                    🎬 {item.videoFileName}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-500/10 border border-pink-500/30 text-pink-300">
                    {item.niche}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span>📅</span>
                    <span>{formatDate(item.timestamp)}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium line-clamp-1">
                  {item.summary}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Estimated: <strong className="text-pink-300">{item.estimatedRange}</strong></span>
                  <span>•</span>
                  <span>Target: {item.data?.creatorContext?.targetAudience || 'Audience'}</span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectAnalysis(item.data)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600 hover:to-purple-600 text-pink-200 hover:text-white border border-pink-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-pink-950/20 active:scale-95"
                >
                  <span>View Analysis</span>
                  <span>👉</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <ClearHistoryDialog
        isOpen={clearDialogOpen}
        count={history.length}
        onConfirm={handleConfirmClear}
        onCancel={() => setClearDialogOpen(false)}
      />
    </div>
  );
});
