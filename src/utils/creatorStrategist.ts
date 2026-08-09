export interface RuleInput {
  creatorName: string;
  primaryNiche: string;
  audienceScale: string;
  primaryGoal: string;
  mainBottleneck: string;
}

export function generateRuleBasedDiagnosis(input: RuleInput) {
  const { creatorName, primaryNiche, audienceScale, primaryGoal, mainBottleneck } = input;
  const name = creatorName || 'Creator';

  // Analyze underlying bottleneck category
  const lowerBottleneck = mainBottleneck.toLowerCase();
  let bottleneckAnalysis = `Your stated barrier around "${mainBottleneck}" indicates a gap between raw viewer attention and perceived positioning authority in ${primaryNiche}.`;

  if (lowerBottleneck.includes('buy') || lowerBottleneck.includes('convert') || lowerBottleneck.includes('sale') || lowerBottleneck.includes('monetiz')) {
    bottleneckAnalysis = `Your content successfully captures initial attention in ${primaryNiche}, but lacks clear problem ownership and intent-driven call-to-actions that convert views into paid customers.`;
  } else if (lowerBottleneck.includes('brand') || lowerBottleneck.includes('sponsor') || lowerBottleneck.includes('deal')) {
    bottleneckAnalysis = `Brands in ${primaryNiche} look for clear audience quality, niche authority, and brand safety—your current profile packaging makes it hard for brand managers to evaluate your ROI.`;
  } else if (lowerBottleneck.includes('view') || lowerBottleneck.includes('reach') || lowerBottleneck.includes('grow') || lowerBottleneck.includes('follow')) {
    bottleneckAnalysis = `Your reach bottleneck stems from weak initial retention hooks and topic packaging in ${primaryNiche}, causing high scroll-past rates before viewers experience your core value.`;
  } else if (lowerBottleneck.includes('time') || lowerBottleneck.includes('system') || lowerBottleneck.includes('post') || lowerBottleneck.includes('content')) {
    bottleneckAnalysis = `You are relying on ad-hoc creation without repeatable content frameworks for ${primaryNiche}, leading to creative fatigue and inconsistent distribution.`;
  }

  // Generate Step 1 based on Bottleneck & Niche
  const step1Title = `FIX THE FOUNDATION: ${primaryNiche.split(',')[0]} Positioning Shift`;
  const step1What = `Overhaul your core messaging to eliminate noise and clearly articulate why someone in ${primaryNiche} must follow ${name}.`;
  const step1Actions = [
    `Audit your last 10 posts in ${primaryNiche} and eliminate topics that do not directly address high-stakes audience pain points.`,
    `Craft a 1-sentence bio value proposition specifically targeting your audience stage (${audienceScale}).`,
    `Implement a standardized thumbnail & hook structure designed to stop the scroll in ${primaryNiche}.`
  ];
  const step1Why = `Without crisp positioning, even viral views fail to convert into long-term followers or commercial trust.`;
  const step1Outcome = `Immediate increase in profile-to-follower conversion rate and unified brand identity.`;

  // Generate Step 2 based on Audience Scale & Niche
  let step2Title = `BUILD THE ENGINE: Repeatable Distribution System`;
  let step2What = `Develop 2–3 signature content formats tailored for ${primaryNiche} that predictably drive engagement and trust.`;
  let step2Actions = [
    `Create a weekly content cadence balancing high-reach discovery pieces with deep-value authority breakdowns.`,
    `Build an audience feedback loop to systematically extract high-performing sub-topics in ${primaryNiche}.`,
    `Establish a lead capture mechanism (newsletter, free guide, or private community) to own your audience off third-party algorithms.`
  ];
  let step2Why = `Sustainable growth requires a repeatable engine, not random viral hits.`;
  let step2Outcome = `Consistent reach and an accumulating owned audience asset.`;

  if (audienceScale.includes('0–5K') || audienceScale.includes('0 - 5K')) {
    step2Title = `BUILD THE ENGINE: Rapid Content-Market Fit`;
    step2What = `Focus heavily on repeatable short-form formats to quickly test what resonates with your early ${primaryNiche} audience.`;
  } else if (audienceScale.includes('5K–25K') || audienceScale.includes('5K - 25K')) {
    step2Title = `BUILD THE ENGINE: Community & Trust Systems`;
    step2What = `Double down on your highest-performing content themes while introducing retention hooks and comment conversation prompts.`;
  } else if (audienceScale.includes('25K–100K') || audienceScale.includes('25K - 100K')) {
    step2Title = `BUILD THE ENGINE: Authority & Owned Audience`;
    step2What = `Transition casual social media viewers into an owned email list or community ecosystem to insulate ${name}'s brand from algorithm shifts.`;
  }

  // Generate Step 3 based on Primary Goal
  let step3Title = `CREATE LEVERAGE: Strategic Growth Move`;
  let step3What = `Align your distribution directly with your primary objective of ${primaryGoal}.`;
  let step3Actions = [
    `Package your content performance metrics into a high-impact media kit highlighting audience trust and demographic alignment.`,
    `Build a targeted pitch pipeline to reach out directly to brand managers and sponsors in ${primaryNiche}.`,
    `Introduce strategic brand placement segments into your top-performing content formats.`
  ];
  let step3Why = `Maximizes financial or strategic returns on the audience trust you have cultivated.`;
  let step3Outcome = `Direct realization of your primary goal: ${primaryGoal}.`;

  if (primaryGoal.includes('High-Ticket') || primaryGoal.includes('Monetize') || primaryGoal.includes('Sell')) {
    step3Title = `CREATE LEVERAGE: High-Ticket Offer Architecture`;
    step3What = `Design a high-converting offer (consulting, mentorship, cohort, or premium product) addressing the top bottleneck of your ${primaryNiche} audience.`;
    step3Actions = [
      `Map out a simple 3-tier offer structure tailored for high-intent buyers in ${primaryNiche}.`,
      `Create case-study breakdown content that subtly demonstrates your methodology and proof.`,
      `Set up a direct DM/application intake funnel to convert qualified leads without pushy sales tactics.`
    ];
  } else if (primaryGoal.includes('Stand Out') || primaryGoal.includes('Differentiate')) {
    step3Title = `CREATE LEVERAGE: Category Ownership & Signature Style`;
    step3What = `Develop a unique perspective, visual signature, or proprietary framework that sets ${name} completely apart from generic creators in ${primaryNiche}.`;
    step3Actions = [
      `Formulate a strong, contrarian point of view on a major debate in ${primaryNiche}.`,
      `Design a signature visual style and recurring segment format unique to your channel.`,
      `Publish breakdown pieces that position you as the definitive authority in your specific sub-category.`
    ];
  }

  // Generate Elevate Move (7-day action)
  const elevateMove = `In the next 7 days: Re-package your top-performing post from the last 30 days using a revised, problem-focused hook line, and attach a clear call-to-action inviting viewers to join your core community.`;

  return {
    creatorName: name,
    primaryNiche,
    audienceScale,
    primaryGoal,
    growthBottleneckDiagnosis: bottleneckAnalysis,
    steps: [
      {
        stepNumber: 'STEP 01',
        title: step1Title,
        whatToDo: step1What,
        actions: step1Actions,
        why: step1Why,
        expectedOutcome: step1Outcome
      },
      {
        stepNumber: 'STEP 02',
        title: step2Title,
        whatToDo: step2What,
        actions: step2Actions,
        why: step2Why,
        expectedOutcome: step2Outcome
      },
      {
        stepNumber: 'STEP 03',
        title: step3Title,
        whatToDo: step3What,
        actions: step3Actions,
        why: step3Why,
        expectedOutcome: step3Outcome
      }
    ],
    elevateMove
  };
}
