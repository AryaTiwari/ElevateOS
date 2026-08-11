import { SevenDayRoadmapInput, SevenDayRoadmapResult } from '../types';

export function generateRuleBased7DayRoadmap(input: SevenDayRoadmapInput): SevenDayRoadmapResult {
  const name = input.creatorName?.trim() || 'Creator';
  const niche = input.niche || 'Business';
  const stage = input.audienceStage || 'Growing';
  const goal = input.mainGoal || 'Increase Views';
  const bottleneck = input.currentBottleneck?.trim() || 'Low reach and viewer drop-off';

  // Customize intro based on Goal & Bottleneck
  let intro = `Based on your goal of ${goal.toLowerCase()} in ${niche} and your current challenge with "${bottleneck}", your first 7 days focus on strengthening your short-form content foundation before increasing volume.`;

  if (goal.includes('Brand Deals')) {
    intro = `To help ${name} position for brand partnerships in ${niche}, this 7-day roadmap focuses on establishing authority, clean content structure, and sponsor-ready channel packaging.`;
  } else if (goal.includes('Monetize')) {
    intro = `Based on your goal of monetizing your ${niche} audience, this week-one roadmap focuses on problem-focused messaging and building initial buyer intent.`;
  } else if (stage === 'Just Starting') {
    intro = `As an emerging ${niche} creator, your first 7 days focus on finding your core content angle and establishing a repeatable short-form video workflow.`;
  }

  // Customize Day 1-7 depending on Goal
  let days = [
    {
      day: 1,
      focus: "🎯 Find Your Core Content Angle",
      action: `Identify the 1 specific audience pain point in ${niche} that you want to be known for solving.`,
      shortExplanation: "Based on creator best practices, single-topic focus builds clear viewer recognition faster."
    },
    {
      day: 2,
      focus: "🪝 Audit & Strengthen Your Hooks",
      action: "Rewrite the opening 3 seconds of your next video script to create an immediate curiosity gap.",
      shortExplanation: "Publicly observable Reels patterns show 80% of retention is lost in the first 3 seconds."
    },
    {
      day: 3,
      focus: "🎥 Script & Film One Value Reel",
      action: `Record a 30-45 second Reel addressing your bottleneck: "${bottleneck}".`,
      shortExplanation: "Testing problem-driven content gives you clear feedback on audience resonance."
    },
    {
      day: 4,
      focus: "📊 Review Viewer Response & Pacing",
      action: "Check where viewers engage most or drop off, and note what sparked comments or saves.",
      shortExplanation: "Observing retention signals helps refine your video structure."
    },
    {
      day: 5,
      focus: "🔄 Double Down on Proven Structure",
      action: "Re-film or adapt your strongest performing concept using a new opening hook line.",
      shortExplanation: "Top creators scale by iterating on proven content frameworks rather than starting from scratch."
    },
    {
      day: 6,
      focus: "🤝 Direct Community Connection",
      action: "Publish a story or Reel directly answering a common question from your target audience.",
      shortExplanation: "Direct response content converts casual viewers into loyal profile followers."
    },
    {
      day: 7,
      focus: "🚀 Weekly Review & Next Direction",
      action: "Evaluate your 7-day progress and outline your top 3 content themes for the coming week.",
      shortExplanation: "Reflecting weekly ensures continuous strategic alignment with your goal."
    }
  ];

  if (goal.includes('Brand Deals') || goal.includes('Build Authority')) {
    days[0] = {
      day: 1,
      focus: "💼 Channel & Bio Positioning",
      action: `Optimize your Instagram bio and pinned posts to clearly show your niche authority in ${niche}.`,
      shortExplanation: "Brand managers look for immediate clarity on audience quality and niche alignment."
    };
    days[2] = {
      day: 3,
      focus: "🎥 Film High-Production Showcase",
      action: "Create a high-value breakdown Reel demonstrating deep expertise in your field.",
      shortExplanation: "Portfolio-grade content proves your capability to prospective sponsors."
    };
  }

  if (goal.includes('Monetize')) {
    days[1] = {
      day: 2,
      focus: "💡 Problem-Solution Framing",
      action: "Frame your Reel topic around a high-friction problem your target audience pays to solve.",
      shortExplanation: "Monetization starts by building trust around valuable, high-stakes solutions."
    };
    days[5] = {
      day: 6,
      focus: "📩 Intent-Driven Call To Action",
      action: "Add a clear comment-keyword trigger (e.g., 'Comment PLAN') to send interested viewers more details.",
      shortExplanation: "Frictionless DM lead funnels turn casual viewers into high-intent leads."
    };
  }

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
