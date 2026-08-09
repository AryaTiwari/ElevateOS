import { ServiceItem, ProcessStep, TeamMember } from '../types';

export const WHY_CARDS = [
  {
    icon: '🧠',
    title: 'Think Beyond Content',
    description: 'Understand attention, trust, positioning and audience behavior.',
    details: 'Stop chasing random viral trends. True creator longevity comes from understanding the core psychological triggers that convert passive viewers into loyal advocates.'
  },
  {
    icon: '🎯',
    title: 'Find Your Edge',
    description: 'Build a clearer identity and positioning made specifically for your niche and goals.',
    details: 'Uncover your Unique Value Proposition (UVP). Define why viewers should choose your perspective over hundreds of alternatives in your niche.'
  },
  {
    icon: '💼',
    title: 'Build The Business',
    description: 'Create paths toward monetization, collaborations and long-term opportunities.',
    details: 'Transform raw attention into structured monetization pipelines—digital products, brand partnerships, advisory, or high-margin offers.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'upgrade-program',
    icon: '🌱',
    title: "Creator's Upgrade Program™ (Budget-Adjusted)",
    category: 'core',
    description: 'A well-proven system to become the next popular creator. Our flagship program features 1-on-1 sessions with an expert who will solve all your content creation problems, share secret viral tricks, and pave a clear path for you to success and growth.',
    extendedDetails: [
      '1-on-1 Sessions with an Expert to Solve All Content Creation Problems 💎',
      'Pave a Direct Path to Growth, Success, and Performance 🚀',
      'Content-Enhancing Secrets & Hacks to Outperform Competing Creators 🔥',
      'Secrets to Outgrow Higher Accounts in Today’s Competitive Field 📈',
      'Budget-Adjusted Program Rates Built Specifically for Creators 🤝'
    ]
  },
  {
    id: 'growth-session',
    icon: '⚡',
    title: "1-on-1 Creator Success & Growth Session",
    category: 'core',
    description: 'A dedicated 1-on-1 session with an expert who will solve all your content creation problems, reveal top-tier retention secrets, and pave a clear path for you to success and growth.',
    extendedDetails: [
      '1-on-1 Deep-Dive Session to Unleash Your True Potential',
      'Viral Hook Secrets to Keep Viewers Hooked till the End',
      'Unfair Advantage Positioning to Beat Higher Creators',
      'Actionable Step-by-Step Blueprint to Stand Out'
    ]
  },
  {
    id: 'content-psychology',
    icon: '🧠',
    title: 'Content Psychology & Hook Engine',
    category: 'strategy',
    description: 'Master audience attention psychology, high-retention opening hooks, curiosity gaps, and organic storytelling built specifically for independent creators.',
    extendedDetails: [
      '3-Second Hook Formulas & Curiosity Gaps',
      'Audience Drop-off & Retention Pacing Systems',
      'Authentic Creator Authority & Trust Building',
      'Binge-Worthy Storytelling Playbook for Short-Form'
    ]
  },
  {
    id: 'brand-positioning',
    icon: '🎯',
    title: 'Niche Positioning & Personal Brand',
    category: 'strategy',
    description: 'Stand out from thousands of creators by building a distinct personal brand identity, signature series, and clear value proposition.',
    extendedDetails: [
      'Unique Creator Value Proposition (UVP)',
      'Signature Content Series & Format Blueprint',
      'Visual Aesthetic & Creator Style System',
      'Niche Category Leadership Matrix'
    ]
  },
  {
    id: 'growth-strategy',
    icon: '📈',
    title: 'Multi-Platform Reach System',
    category: 'strategy',
    description: 'Turn a single video idea into multi-platform reach across Instagram, YouTube, and Facebook without burning out.',
    extendedDetails: [
      'Sustainable Creator Content Workflow',
      'Organic Community Flywheel Strategy',
      'Analytics & Viewer Retention Diagnostics',
      'Multi-Platform Repurposing System'
    ]
  },
  {
    id: 'creator-business',
    icon: '💡',
    title: 'Independent Creator Monetization',
    category: 'monetization',
    description: 'Turn passive views into sustainable income through digital products, courses, communities, and high-value offers tailored to your budget.',
    extendedDetails: [
      'Digital Product & Community Offer Design',
      'Audience-to-Fan Loyalty Pipelines',
      'Reasonable Pricing & Value-First Product Models',
      'Sustainable Creator Revenue Diversification'
    ]
  },
  {
    id: 'brand-opportunities',
    icon: '🤝',
    title: 'Creator-First Brand Sponsorships',
    category: 'monetization',
    description: 'Learn how to pitch, negotiate, and land brand deals that respect your creative freedom while generating consistent income.',
    extendedDetails: [
      'Professional Creator Media Kit & Pitch Deck',
      'Inbound Brand Inquiry & DM Management',
      'Outbound Brand Pitching & Rate Negotiation',
      'Long-Term Ambassador & Partnership Retainers'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01 / DISCOVER',
    title: 'Understand',
    subtitle: 'Niche, Goals & Audience',
    description: 'Deep dive into your niche, target creator goals, audience demographics, and channel history.',
    keyOutputs: ['Creator Growth Session', 'Niche Benchmark Analysis', 'Audience Baseline Metrics']
  },
  {
    number: '02 / DIAGNOSE',
    title: 'Find Bottlenecks',
    subtitle: 'Growth Friction Analysis',
    description: 'Identify exact points of friction in hook retention, follower conversion, or monetization.',
    keyOutputs: ['Hook & Retention Leak Session', 'Monetization Gap Assessment', 'Brand Positioning Friction Matrix']
  },
  {
    number: '03 / STRATEGIZE',
    title: 'Build The Roadmap',
    subtitle: 'Tailored Creator Blueprint',
    description: 'Draft a customized 3-step action roadmap designed specifically for your channel scale.',
    keyOutputs: ['3-Step Growth Strategy Roadmap', 'Viral Psychology Framework', 'Monetization Funnel Design']
  },
  {
    number: '04 / EXECUTE',
    title: 'Put It To Work',
    subtitle: 'Systematic Implementation',
    description: 'Turn blueprint strategies into repeatable weekly workflows, hooks, and brand pitches.',
    keyOutputs: ['Weekly Content Production Engine', 'Brand Pitch Templates', 'Direct Offer Testing']
  },
  {
    number: '05 / SCALE',
    title: 'Level Up',
    subtitle: 'Refine & Unlock Next Stage',
    description: 'Track growth metrics, optimize high-converting formats, and add new revenue streams.',
    keyOutputs: ['Performance Diagnostics', 'System Optimization', 'New Revenue Channel Integration']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Arya Tiwari',
    role: 'FOUNDER',
    subtitle: 'Vision, Strategy & Creator Architecture',
    bio: 'Vision, strategy, creator growth and the long-term architecture of Elevate OS.',
    highlights: [
      'Brand Strategy & Creator Systems',
      'Content Psychology Architect',
      'Creator Business Ecosystems'
    ]
  },
  {
    name: 'Tanusri Nandi',
    role: 'CO-FOUNDER',
    subtitle: 'Operations, Partnerships & Community',
    bio: 'Operations, partnerships, community and execution.',
    highlights: [
      'Operations & Program Execution',
      'Strategic Partnerships & Deals',
      'Community & Creator Relations'
    ]
  }
];

export const FLAGSHIP_PROGRAM_POINTS = [
  'Personalized growth diagnosis',
  'Content & positioning strategy',
  'Business & monetization opportunities',
  'Brand collaboration direction',
  'Prioritized action roadmap'
];

export const CONTACT_INFO = {
  email: 'elevateosteam@gmail.com',
  instagram: 'https://instagram.com/elevate.os.in',
  instagramHandle: '@elevate.os.in'
};
