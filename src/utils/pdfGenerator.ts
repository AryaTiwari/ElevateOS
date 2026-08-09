import jsPDF from 'jspdf';
import { DiagnosticResult } from '../types';

export function generateRoadmapPDF(result: DiagnosticResult) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 15;

  // Helper for adding new page if needed
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > 280) {
      doc.addPage();
      y = 15;
    }
  };

  // Header Banner
  doc.setFillColor(14, 22, 36); // #0E1624
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Brand Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(59, 130, 246); // #3B82F6 Blue
  doc.text('ELEVATE OS', margin, 14);

  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // #94A3B8
  doc.text('CREATOR UPGRADE ROADMAP', margin, 21);

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('PREPARED FOR:', pageWidth - margin, 14, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(96, 165, 250);
  doc.text(result.creatorName || 'Creator', pageWidth - margin, 21, { align: 'right' });

  y = 40;

  // Overview Info Box
  doc.setFillColor(241, 245, 249); // light blue gray
  doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);

  doc.text(`Primary Niche: `, margin + 5, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${result.primaryNiche}`, margin + 30, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.text(`Audience Scale: `, margin + 95, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${result.audienceScale}`, margin + 122, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.text(`Primary Goal: `, margin + 5, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`${result.primaryGoal}`, margin + 30, y + 16);

  y += 28;

  // Bottleneck Section
  doc.setFillColor(239, 246, 255); // soft blue bg
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);

  const bottleneckText = doc.splitTextToSize(result.growthBottleneckDiagnosis, contentWidth - 10);
  const bottleneckBoxHeight = 14 + bottleneckText.length * 5;

  doc.roundedRect(margin, y, contentWidth, bottleneckBoxHeight, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(29, 78, 216); // dark blue
  doc.text('GROWTH BOTTLENECK DIAGNOSIS', margin + 5, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text(bottleneckText, margin + 5, y + 14);

  y += bottleneckBoxHeight + 8;

  // 3-Step Strategy
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('YOUR 3-STEP GROWTH ROADMAP', margin, y);
  y += 6;

  result.steps.forEach((step, idx) => {
    checkPageBreak(50);

    // Step Header
    doc.setFillColor(14, 22, 36);
    doc.rect(margin, y, contentWidth, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(96, 165, 250);
    doc.text(`${step.stepNumber}: ${step.title.toUpperCase()}`, margin + 4, y + 5.5);

    y += 11;

    // Strategy
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('Strategy:', margin, y);

    doc.setFont('helvetica', 'normal');
    const strategyLines = doc.splitTextToSize(step.whatToDo, contentWidth - 20);
    doc.text(strategyLines, margin + 18, y);
    y += strategyLines.length * 4.5 + 3;

    // Actions
    if (step.actions && step.actions.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Action Items:', margin, y);
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      step.actions.forEach((act) => {
        checkPageBreak(10);
        const actLines = doc.splitTextToSize(`• ${act}`, contentWidth - 8);
        doc.text(actLines, margin + 4, y);
        y += actLines.length * 4 + 1.5;
      });
    }

    // Why & Outcome
    checkPageBreak(15);
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text('Why It Works: ', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const whyLines = doc.splitTextToSize(step.why, contentWidth - 30);
    doc.text(whyLines, margin + 28, y);
    y += whyLines.length * 4 + 2;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 150, 105); // emerald green
    doc.text('Expected Outcome: ', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 118, 110);
    const outcomeLines = doc.splitTextToSize(step.expectedOutcome, contentWidth - 36);
    doc.text(outcomeLines, margin + 34, y);
    y += outcomeLines.length * 4 + 8;
  });

  // 7-Day Elevate Move
  checkPageBreak(25);
  doc.setFillColor(254, 243, 199); // amber soft
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);

  const moveLines = doc.splitTextToSize(result.elevateMove, contentWidth - 10);
  const moveBoxHeight = 12 + moveLines.length * 4.5;

  doc.roundedRect(margin, y, contentWidth, moveBoxHeight, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(180, 83, 9);
  doc.text('7-DAY ELEVATE MOVE', margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(69, 26, 3);
  doc.text(moveLines, margin + 5, y + 13);

  y += moveBoxHeight + 12;

  // Footer / CTA
  checkPageBreak(20);
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 16, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Elevate OS - Creator Upgrade Program™', margin + 6, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Book your 1-on-1 strategy call to execute this blueprint: www.elevateos.co', margin + 6, y + 12);

  // Save the PDF
  const safeFileName = (result.creatorName || 'Creator')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase();
  doc.save(`${safeFileName}_creator_upgrade_roadmap.pdf`);
}
