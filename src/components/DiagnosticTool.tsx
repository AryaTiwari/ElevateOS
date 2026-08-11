import React, { memo } from 'react';
import { SevenDayRoadmapTool } from './SevenDayRoadmapTool';

interface DiagnosticToolProps {
  onOpenBooking: () => void;
}

export const DiagnosticTool: React.FC<DiagnosticToolProps> = memo(({ onOpenBooking }) => {
  return (
    <section id="audit" className="py-4 md:py-8 relative border-t border-slate-200 scroll-mt-24">
      <div className="w-[min(1120px,92%)] mx-auto">
        <SevenDayRoadmapTool onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
});

DiagnosticTool.displayName = 'DiagnosticTool';
