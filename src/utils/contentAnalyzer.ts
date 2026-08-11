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

  const isComedyOrPOV = /(POV:|bro|💀|lmao|funny|gym|batman|gotham|meme|when you|nobody:|literally|me when|thought|haha|lol)/i.test(text);
  const isEmotionalOrStory = /(spent|years|realized|nobody|honest|wish|fail|hardest|truth|lost|started|alone)/i.test(text) && !isComedyOrPOV;

  const hasQuestion = /\?/.test(text);
  const hasNumbers = /\d+/.test(text);
  const hasStrongWords = /(secret|mistake|stop|never|how to|why|reason|truth|proven|fail|unlock|guaranteed|hidden|simple)/i.test(text);
  const hasCTA = /(comment|dm|follow|link|click|save|share|check|subscribe|get)/i.test(text) || Boolean(input.cta);

  const niche = input.niche || 'Content & Growth';
  const goal = input.creatorGoal || 'Grow followers';

  // Dynamic calculations based on actual script traits & style
  let hookScore = 7.0;
  if (isComedyOrPOV) hookScore += 1.5;
  if (hasQuestion || hasStrongWords) hookScore += 1.0;
  if (hasNumbers) hookScore += 0.5;
  hookScore = Math.min(9.8, Math.max(5.0, Number(hookScore.toFixed(1))));

  let retentionScore = 6.8;
  if (wordCount >= 10 && wordCount <= 80) retentionScore += 1.5;
  if (isComedyOrPOV || isEmotionalOrStory) retentionScore += 1.0;
  retentionScore = Math.min(9.6, Math.max(4.5, Number(retentionScore.toFixed(1))));

  let valueScore = isComedyOrPOV ? 7.8 : 6.5;
  if (hasNumbers || wordCount > 30) valueScore += 1.2;
  valueScore = Math.min(9.7, Math.max(5.0, Number(valueScore.toFixed(1))));

  let shareabilityScore = isComedyOrPOV ? 8.8 : 6.8;
  if (hasStrongWords || isEmotionalOrStory) shareabilityScore += 1.0;
  shareabilityScore = Math.min(9.8, Math.max(5.0, Number(shareabilityScore.toFixed(1))));

  let saveabilityScore = isComedyOrPOV ? 6.2 : 7.2;
  if (hasNumbers) saveabilityScore += 1.5;
  saveabilityScore = Math.min(9.8, Math.max(4.5, Number(saveabilityScore.toFixed(1))));

  let emotionalImpactScore = (isComedyOrPOV || isEmotionalOrStory) ? 8.5 : 6.8;
  if (hasStrongWords) emotionalImpactScore += 1.0;
  emotionalImpactScore = Math.min(9.8, Math.max(5.0, Number(emotionalImpactScore.toFixed(1))));

  let originalityScore = isComedyOrPOV ? 8.2 : 7.5;
  originalityScore = Math.min(9.6, Math.max(5.5, Number(originalityScore.toFixed(1))));

  let clarityScore = 8.0;
  if (wordCount > 5 && wordCount < 100) clarityScore += 1.2;
  clarityScore = Math.min(9.9, Math.max(6.0, Number(clarityScore.toFixed(1))));

  let ctaScore = hasCTA ? 8.5 : (isComedyOrPOV ? 6.8 : 5.0);
  if (input.cta) ctaScore += 0.8;
  ctaScore = Math.min(9.8, Math.max(4.0, Number(ctaScore.toFixed(1))));

  let trendScore = isComedyOrPOV ? 8.8 : 7.5;
  trendScore = Math.min(9.6, Math.max(5.5, Number(trendScore.toFixed(1))));

  // Reasoned overall synthesis based on style
  const weightedSum = isComedyOrPOV
    ? (hookScore * 0.22 + retentionScore * 0.20 + shareabilityScore * 0.20 + emotionalImpactScore * 0.15 + originalityScore * 0.13 + ctaScore * 0.10)
    : isEmotionalOrStory
    ? (emotionalImpactScore * 0.22 + retentionScore * 0.20 + hookScore * 0.18 + shareabilityScore * 0.15 + clarityScore * 0.15 + ctaScore * 0.10)
    : (hookScore * 0.18 + retentionScore * 0.16 + valueScore * 0.15 + saveabilityScore * 0.12 + clarityScore * 0.12 + shareabilityScore * 0.10 + ctaScore * 0.10 + trendScore * 0.07);

  const overallScore = Math.min(98, Math.max(45, Math.round(weightedSum * 10)));

  const getIndicator = (s: number): '🔥 Strong' | '⚡ Moderate' | '⚠️ Needs Work' => {
    if (s >= 8.0) return '🔥 Strong';
    if (s >= 6.5) return '⚡ Moderate';
    return '⚠️ Needs Work';
  };

  const summary = isComedyOrPOV
    ? `Your POV/comedic setup has strong comedic resonance and shareability. The primary goal is tightening the setup so the punchline lands faster.`
    : isEmotionalOrStory
    ? `Your story carries authentic emotional weight and vulnerability. Focusing on the pivotal realization moment will maximize watch time.`
    : `Your ${niche} content concept has solid clarity. Sharpening the first 2 seconds will lift total completion rate.`;

  const verdict = isComedyOrPOV
    ? `Great humorous premise! Comedy Reels succeed when the contrast and punchline land without unnecessary setup text.`
    : isEmotionalOrStory
    ? `Powerful personal narrative. Keep the sentence structure lean so the emotional realization hits the viewer directly.`
    : `Solid foundation for ${niche}. Enhancing the opening hook curiosity gap will increase your view-to-completion ratio.`;

  const biggestChange = isComedyOrPOV
    ? `Deliver the comedic payoff or punchline 1-2 seconds earlier so scrollers get the joke instantly before swiping.`
    : isEmotionalOrStory
    ? `Break up the narrative into punchy 2-line visual text blocks so viewers feel the emotional tension line by line.`
    : `Lead directly with the most surprising outcome or data point in sentence 1.`;

  // Preserve creator voice in improved script fallback
  let improvedVersion = text;
  if (isComedyOrPOV && text) {
    improvedVersion = text.includes("💀") ? text : `${text} 💀`;
  } else if (isEmotionalOrStory && text) {
    improvedVersion = text;
  } else if (text) {
    improvedVersion = `${text}\n\nComment "ELEVATE" below for the complete step-by-step breakdown!`;
  }

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
    verdict,
    biggestChange,
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
