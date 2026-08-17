import { SevenDayRoadmapInput, SevenDayRoadmapResult } from '../types';

export function generateRuleBased7DayRoadmap(input: SevenDayRoadmapInput): SevenDayRoadmapResult {
  const name = input.creatorName?.trim() || 'Creator';
  const niche = input.niche || 'Business';
  const stage = input.audienceStage || 'Growing';
  const goal = input.mainGoal || 'Increase Views';
  const bottleneck = input.currentBottleneck?.trim() || 'Low reach and viewer drop-off';

  // Niche-specific insights
  const nicheActions: Record<string, { angle: string; hookTip: string; format: string }> = {
    Fitness: {
      angle: 'bust a common workout/diet myth or demonstrate a counter-intuitive form fix',
      hookTip: 'visual side-by-side comparison ("Stop doing X if you want Y")',
      format: '30s demonstration + immediate verbal cue'
    },
    Finance: {
      angle: 'break down a hidden money mistake or non-obvious tax/savings loophole',
      hookTip: 'bold numerical contrast ("How this 1 decision costs you $10k")',
      format: 'talking head with fast on-screen receipts/data overlays'
    },
    Tech: {
      angle: 'showcase a high-leverage workflow shortcut, tool comparison, or code optimization',
      hookTip: 'screen capture demo + direct problem statement ("If you still do X manually...")',
      format: 'split-screen screen recording with voiceover'
    },
    Gaming: {
      angle: 'capture an absurd clutch moment, niche lore debate, or high-skill reaction',
      hookTip: 'instant high-energy sound bite or relatable in-game scenario',
      format: 'fast-cut gameplay with punchy captions'
    },
    Fashion: {
      angle: 'solve a specific styling dilemma (e.g. proportions, color theory, capsule wardrobe)',
      hookTip: 'outfit transition with immediate aesthetic contrast',
      format: 'rapid outfit switch with styling rules on screen'
    },
    Lifestyle: {
      angle: 'share a relatable daily habit, raw realization, or aesthetic routine',
      hookTip: 'intimate talking-head or day-in-the-life POV hook',
      format: 'vlog-style micro-narrative'
    },
    Education: {
      angle: 'condense a complex concept into a 3-step intuitive mental model',
      hookTip: 'contrarian question ("Why what school taught you about X is backwards")',
      format: 'visual framework breakdown'
    },
    Business: {
      angle: 'reveal the non-obvious lever behind scaling, client acquisition, or positioning',
      hookTip: 'direct case breakdown ("The 1 change that unlocked our pipeline")',
      format: 'direct-to-camera authority breakdown with 3 clear steps'
    }
  };

  const nicheSpec = nicheActions[niche] || nicheActions.Business;

  // Bottleneck-tailored diagnoses
  const isHookProblem = /(hook|first 3|drop|drop-off|swipe|attention|boring|scroll)/i.test(bottleneck);
  const isReachProblem = /(views|reach|algorithm|flatline|shadowban|stuck|low views|0 views|200 views)/i.test(bottleneck);
  const isMonetizeProblem = /(monetiz|sales|client|money|dm|lead|buyer|offer|funnel)/i.test(bottleneck);
  const isBrandDealProblem = /(brand|sponsor|deal|partner|pitch|agency)/i.test(bottleneck);

  let intro = `As a ${stage.toLowerCase()} creator in ${niche}, your biggest growth multiplier is solving "${bottleneck}". This 7-day sprint removes content fluff, dials in your opening hooks, and installs a repeatable short-form retention workflow designed to achieve your goal of ${goal.toLowerCase()}.`;

  if (isMonetizeProblem || goal === 'Monetize') {
    intro = `For ${name} to turn ${niche} attention into high-intent revenue, your 7-day sprint pivots your content from generic entertainment to problem-solution authority with frictionless 1-word DM conversion triggers.`;
  } else if (isBrandDealProblem || goal === 'Get Brand Deals' || goal === 'Build Authority') {
    intro = `To position ${name} for high-ticket brand partnerships and authoritative authority in ${niche}, this 7-day roadmap focuses on sponsor-ready channel packaging, proof-point delivery, and high-retention showcase content.`;
  } else if (isHookProblem) {
    intro = `Your primary bottleneck with "${bottleneck}" happens in seconds 0 to 3. This 7-day sprint systematically overhauls your hook psychology, visual pattern interrupts, and curiosity gap execution in ${niche}.`;
  }

  const days = [
    {
      day: 1,
      focus: "🎯 Bottleneck Deconstruction & Angle Reset",
      action: `Audit your last 3 ${niche} videos to pinpoint where "${bottleneck}" occurs. Identify 1 specific audience pain point where you can ${nicheSpec.angle}.`,
      shortExplanation: "Single-topic focus with high contrast immediately cuts through saturated feed noise."
    },
    {
      day: 2,
      focus: "🪝 Hook Psychology & Opening 3 Seconds",
      action: `Draft 3 contrasting opening lines for your next video: 1 curiosity-driven, 1 contrarian, and 1 relatable using a ${nicheSpec.hookTip}.`,
      shortExplanation: "Testing multiple hook angles on one premise prevents viewer drop-off in the first 3 seconds."
    },
    {
      day: 3,
      focus: "🎥 Lean Scripting & Payoff Delivery",
      action: `Record a 30-45s Reel in ${niche} with zero introductory fluff—deliver the primary promise or answer before second 12.`,
      shortExplanation: "Front-loading high-value payoffs trains the audience and platform that your content respects watch time."
    },
    {
      day: 4,
      focus: "📊 24-Hour Retention & Drop-Off Diagnostic",
      action: `Analyze your Day 3 video's retention curve: identify the exact second where retention dipped and note which phrases triggered comment replies.`,
      shortExplanation: "Reading viewer drop-off points objectively exposes pacing drag and unnecessary filler words."
    },
    {
      day: 5,
      focus: "🔄 Pattern Interrupt & Framework Iteration",
      action: `Re-frame your highest-performing point from Day 3 using a new visual pattern interrupt (e.g. quick cut, screen pop, or reverse angle).`,
      shortExplanation: "Top creators scale by iterating on proven psychological hooks rather than guessing new topics daily."
    },
    {
      day: 6,
      focus: "⚡ High-Intent Conversion & Comment Signal",
      action: goal.includes('Monetize') || goal.includes('Brand')
        ? `Deploy a frictionless 1-word keyword comment trigger (e.g. 'Comment BLUEPRINT below') to convert viewers into private DM conversations.`
        : `Include an open-ended debate question in your closing 3 seconds to spark comment engagement signals.`,
      shortExplanation: "Active comment triggers signal high viewer investment and boost organic platform distribution."
    },
    {
      day: 7,
      focus: "🚀 Weekly Sprint Review & Execution System",
      action: `Evaluate your 7-day sprint metrics, retire formats that dragged, and lock in your top 3 proven content pillars for next week.`,
      shortExplanation: "Weekly iteration cycles compound creator momentum and guarantee systematic channel growth."
    }
  ];

  return {
    creatorName: name,
    niche,
    audienceStage: stage,
    mainGoal: goal,
    currentBottleneck: bottleneck,
    intro,
    days
  };
}
