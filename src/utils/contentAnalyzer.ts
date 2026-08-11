export interface ContentAnalysisInput {
  script: string;
  concept?: string;
  caption?: string;
  hook?: string;
  cta?: string;
  niche?: string;
  targetAudience?: string;
  creatorGoal?: string;
}

export interface ScoreItem {
  score: number; // 0 to 10
  explanation: string;
  indicator?: '🔥 Strong' | '⚡ Moderate' | '⚠️ Needs Work';
}

export interface HookSuggestion {
  angle: 'Curiosity' | 'Contrarian' | 'Emotional/Storytelling';
  hook: string;
}

export interface ContentAnalysisResult {
  overallScore: number; // 0 to 100
  summary: string;
  scores: {
    hook: ScoreItem;
    retention: ScoreItem;
    value: ScoreItem;
    shareability: ScoreItem;
    saveability: ScoreItem;
    emotionalImpact: ScoreItem;
    originality: ScoreItem;
    clarity: ScoreItem;
    cta: ScoreItem;
    trendAlignment: ScoreItem;
  };
  strengths: string[];
  weaknesses: string[];
  verdict: string;
  biggestChange: string;
  hookSuggestions: HookSuggestion[];
  retentionFix: string;
  trendAnalysis: {
    score: number;
    explanation: string;
  };
  improvedVersion: string;
}

export function generateRuleBasedAnalysis(input: ContentAnalysisInput): ContentAnalysisResult {
  const fullText = [input.hook, input.script, input.caption, input.cta].filter(Boolean).join(' ');
  const text = fullText || input.script || '';
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hasQuestion = /\?/.test(text);
  const hasNumbers = /\d+/.test(text);
  const hasStrongWords = /(secret|mistake|stop|never|how to|why|reason|truth|proven|fail|unlock|guaranteed|hidden|simple)/i.test(text);
  const hasCTA = /(comment|dm|follow|link|click|save|share|check|subscribe|get)/i.test(text) || Boolean(input.cta);

  const niche = input.niche || 'Content & Growth';
  const goal = input.creatorGoal || 'Grow followers';

  // Dynamic calculations based on actual script traits
  let hookScore = 6.5;
  if (hasQuestion) hookScore += 1.0;
  if (hasNumbers) hookScore += 0.8;
  if (hasStrongWords) hookScore += 1.0;
  if (wordCount > 5 && wordCount < 40) hookScore += 0.5;
  hookScore = Math.min(9.8, Math.max(4.5, Number(hookScore.toFixed(1))));

  let retentionScore = 6.0;
  if (wordCount >= 20 && wordCount <= 120) retentionScore += 2.0; // Sweet spot for short-form
  else if (wordCount > 120 && wordCount <= 250) retentionScore += 1.0;
  else if (wordCount < 15) retentionScore -= 1.0;
  if (hasNumbers) retentionScore += 0.8;
  retentionScore = Math.min(9.6, Math.max(4.0, Number(retentionScore.toFixed(1))));

  let valueScore = 6.5;
  if (hasNumbers) valueScore += 1.2;
  if (wordCount > 30) valueScore += 1.0;
  valueScore = Math.min(9.7, Math.max(4.8, Number(valueScore.toFixed(1))));

  let shareabilityScore = 6.2;
  if (hasStrongWords) shareabilityScore += 1.2;
  if (hasQuestion) shareabilityScore += 0.8;
  shareabilityScore = Math.min(9.5, Math.max(4.2, Number(shareabilityScore.toFixed(1))));

  let saveabilityScore = 6.0;
  if (hasNumbers) saveabilityScore += 1.5;
  if (wordCount > 40) saveabilityScore += 1.0;
  saveabilityScore = Math.min(9.8, Math.max(4.0, Number(saveabilityScore.toFixed(1))));

  let emotionalImpactScore = 6.4;
  if (hasStrongWords) emotionalImpactScore += 1.5;
  if (hasQuestion) emotionalImpactScore += 0.8;
  emotionalImpactScore = Math.min(9.5, Math.max(4.5, Number(emotionalImpactScore.toFixed(1))));

  let originalityScore = 7.2;
  if (!hasStrongWords) originalityScore += 0.5; // Avoids cliché
  originalityScore = Math.min(9.4, Math.max(5.0, Number(originalityScore.toFixed(1))));

  let clarityScore = 7.0;
  if (wordCount > 10 && wordCount < 150) clarityScore += 1.5;
  clarityScore = Math.min(9.9, Math.max(5.2, Number(clarityScore.toFixed(1))));

  let ctaScore = hasCTA ? 8.5 : 4.8;
  if (input.cta) ctaScore += 0.8;
  ctaScore = Math.min(9.8, Math.max(3.5, Number(ctaScore.toFixed(1))));

  let trendScore = 7.5;
  if (hasNumbers || hasStrongWords) trendScore += 1.0;
  trendScore = Math.min(9.6, Math.max(5.0, Number(trendScore.toFixed(1))));

  // Reasoned overall synthesis (weighted)
  const weightedSum =
    hookScore * 0.18 +
    retentionScore * 0.16 +
    valueScore * 0.12 +
    shareabilityScore * 0.10 +
    saveabilityScore * 0.10 +
    emotionalImpactScore * 0.08 +
    originalityScore * 0.08 +
    clarityScore * 0.08 +
    ctaScore * 0.05 +
    trendScore * 0.05;

  const overallScore = Math.min(98, Math.max(42, Math.round(weightedSum * 10)));

  const getIndicator = (s: number): '🔥 Strong' | '⚡ Moderate' | '⚠️ Needs Work' => {
    if (s >= 8.0) return '🔥 Strong';
    if (s >= 6.5) return '⚡ Moderate';
    return '⚠️ Needs Work';
  };

  const firstSentence = text.split(/[.!?\n]/).filter(Boolean)[0] || text;

  return {
    overallScore,
    summary: `Based on current publicly observable Reels behavior, your ${niche} script has strong foundational clarity, but tuning the opening hook and payoff pacing will unblock higher retention.`,
    scores: {
      hook: {
        score: hookScore,
        explanation: hasStrongWords
          ? "Uses power trigger words that pull the eye in early."
          : "The opening idea is clear, but could open a sharper curiosity gap in the first 2 seconds.",
        indicator: getIndicator(hookScore)
      },
      retention: {
        score: retentionScore,
        explanation: wordCount >= 20 && wordCount <= 120
          ? "Ideal short-form script length that keeps drop-off low."
          : "The setup is clear, but ensure your main payoff lands before second 12.",
        indicator: getIndicator(retentionScore)
      },
      value: {
        score: valueScore,
        explanation: hasNumbers
          ? "Quantifiable steps/data make the advice immediately actionable."
          : "Good perspective; adding concrete numbers or a step-by-step framework will boost perceived authority.",
        indicator: getIndicator(valueScore)
      },
      shareability: {
        score: shareabilityScore,
        explanation: "Relatable topic that viewers in your target audience would send to peers in DMs.",
        indicator: getIndicator(shareabilityScore)
      },
      saveability: {
        score: saveabilityScore,
        explanation: hasNumbers
          ? "Information-dense layout naturally triggers the viewer to tap Save for later reference."
          : "Adding a quick reference checklist at the end will increase your save-to-view ratio.",
        indicator: getIndicator(saveabilityScore)
      },
      emotionalImpact: {
        score: emotionalImpactScore,
        explanation: "Taps into creator ambition and curiosity, creating tension that drives full views.",
        indicator: getIndicator(emotionalImpactScore)
      },
      originality: {
        score: originalityScore,
        explanation: "Fresh perspective on common creator questions in " + niche + ".",
        indicator: getIndicator(originalityScore)
      },
      clarity: {
        score: clarityScore,
        explanation: "Short, crisp phrasing that is effortless to scan on mobile screens.",
        indicator: getIndicator(clarityScore)
      },
      cta: {
        score: ctaScore,
        explanation: hasCTA
          ? "Includes a direct call to action to guide viewer behavior."
          : "Lacks a clear CTA. Ask viewers to comment a specific keyword for an instant DM resource.",
        indicator: getIndicator(ctaScore)
      },
      trendAlignment: {
        score: trendScore,
        explanation: "Fits current high-performing talking-head and text-overlay Reels formats.",
        indicator: getIndicator(trendScore)
      }
    },
    strengths: [
      hasNumbers ? "🔥 Quantifiable framework that builds instant authority" : "🔥 Clear, relatable message tuned for " + niche,
      hasStrongWords ? "🔥 High-impact trigger words in the setup" : "🔥 Clean sentence structure for easy mobile reading",
      wordCount >= 25 ? "🔥 Good depth of topic coverage without fluff" : "🔥 Concise script length that minimizes viewer drop-off",
      hasCTA ? "🔥 Direct action prompt for the viewer" : "🔥 High core potential once CTA is optimized"
    ],
    weaknesses: [
      hookScore < 8.0 ? "⚠️ Hook takes a moment to create an undeniable curiosity gap" : "⚠️ Hook can be tightened by 2-3 words for punchier delivery",
      !hasCTA ? "⚠️ Missing a clear comment trigger or lead-magnet CTA" : "⚠️ CTA could offer a stronger incentive than a generic ask",
      saveabilityScore < 8.0 ? "⚠️ Payoff could be formatted as a step-by-step list to boost saves" : "⚠️ Mid-video transition could use a pattern interrupt"
    ],
    verdict: `Your concept aligns well with your goal to ${goal.toLowerCase()}. Refining the first 3 seconds and delivering a concrete payoff will raise your completion and save metrics.`,
    biggestChange: `Open directly with a high-contrast claim like: "${firstSentence.length > 50 ? 'Stop scrolling if you want to grow in ' + niche : 'The real secret behind viral ' + niche + ' Reels is...'}"`,
    hookSuggestions: [
      {
        angle: "Curiosity",
        hook: `The real reason your ${niche} Reels cap out early isn't the algorithm—it's this 3-second mistake.`
      },
      {
        angle: "Contrarian",
        hook: `Stop doing what every other ${niche} creator is doing. Here's what top 1% accounts do instead.`
      },
      {
        angle: "Emotional/Storytelling",
        hook: `I tested this exact strategy in ${niche} for 30 days and here's what happened to my reach.`
      }
    ],
    retentionFix: "Hook the viewer in seconds 1-2 with a bold claim, use a visual text popup at second 4, and present your core point in a 3-step format before ending with a 3-second keyword CTA.",
    trendAnalysis: {
      score: trendScore,
      explanation: "Strong viral potential if paired with fast text overlays and dynamic talking-head pacing."
    },
    improvedVersion: text
      ? `Stop scrolling—here is the exact breakdown most ${niche} creators miss.\n\n${text}\n\nComment "ELEVATE" below and I'll send you the complete step-by-step guide!`
      : `Stop scrolling if you want to double your Reel retention.\n\nHere are 3 exact changes to fix your content today:\n1. Open with a curiosity gap\n2. Cut the fluff in seconds 2-4\n3. End with a 1-word comment trigger\n\nComment "GROWTH" below for the full breakdown!`
  };
}
