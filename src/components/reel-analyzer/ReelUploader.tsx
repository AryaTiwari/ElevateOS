import React, { useRef, useState, useCallback, memo } from 'react';
import { MAX_REEL_UPLOAD_SIZE_MB, validateReelFile, formatFileSize } from '../../utils/reelAnalyzer';

interface ReelUploaderProps {
  videoFile: File | null;
  videoUrl: string | null;
  onFileSelect: (file: File) => void;
  onRemoveFile: () => void;
  error?: string | null;
  disabled?: boolean;
}

export const ReelUploader: React.FC<ReelUploaderProps> = memo(({
  videoFile,
  videoUrl,
  onFileSelect,
  onRemoveFile,
  error,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleProcessFile = useCallback((file: File) => {
    setLocalError(null);
    const validation = validateReelFile(file);
    if (!validation.valid) {
      setLocalError(validation.error || 'Invalid video file.');
      return;
    }
    onFileSelect(file);
  }, [onFileSelect]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const activeError = error || localError;

  return (
    <div className="w-full space-y-4">
      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={disabled}
      />

      {!videoFile ? (
        /* UPLOAD DROPZONE */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer select-none group backdrop-blur-xl ${
            isDragOver
              ? 'border-pink-400 bg-pink-500/15 shadow-2xl shadow-pink-500/20 scale-[1.01]'
              : 'border-slate-700/80 bg-[#101828]/90 hover:border-pink-500/60 hover:bg-[#131E33]/95 shadow-xl'
          } ${disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-amber-500/10 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-pink-400 transition-transform shadow-lg shadow-pink-500/10 text-3xl">
              <span>📹</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-pink-300 transition-colors">
                Upload your Reel
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Drag and drop your video here, or <span className="text-pink-400 font-bold underline underline-offset-4">browse files</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-semibold text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700">
                MP4, MOV, WEBM
              </span>
              <span className="px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-bold">
                Max Reel size: {MAX_REEL_UPLOAD_SIZE_MB} MB
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* REEL PREVIEW CARD */
        <div className="bg-[#101828]/95 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 text-base">
                <span>🎬</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate max-w-[220px] sm:max-w-md">
                  {videoFile.name}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {formatFileSize(videoFile.size)} • Ready for multimodal analysis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>🔄</span>
                <span>Change</span>
              </button>
              <button
                type="button"
                onClick={onRemoveFile}
                disabled={disabled}
                className="p-1.5 rounded-xl bg-slate-800/90 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
                title="Remove video"
              >
                <span>❌</span>
              </button>
            </div>
          </div>

          {/* Embedded Video Player */}
          {videoUrl && (
            <div className="relative rounded-2xl overflow-hidden bg-black/80 max-h-[360px] flex items-center justify-center border border-slate-800/80 group">
              <video
                src={videoUrl}
                controls
                playsInline
                className="max-h-[360px] w-auto max-w-full rounded-2xl object-contain mx-auto"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
            <span>✅</span>
            <span>Video loaded successfully. Enter your creator context below and click Analyze.</span>
          </div>
        </div>
      )}

      {activeError && (
        <div className="flex items-start gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium">
          <span>⚠️</span>
          <span>{activeError}</span>
        </div>
      )}
    </div>
  );
});
