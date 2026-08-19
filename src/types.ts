export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  extendedDetails?: string[];
  category: 'core' | 'strategy' | 'monetization';
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyOutputs: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  subtitle: string;
  bio: string;
  linkedin?: string;
  instagram?: string;
  highlights: string[];
}

export interface DiagnosticInput {
  creatorName: string;
  niche: string;
  followers: string;
  mainGoal: string;
  currentBottleneck: string;
}

export interface SevenDayRoadmapInput {
  creatorName: string;
  niche: string;
  audienceStage: string;
  mainGoal: string;
  currentBottleneck: string;
}

export interface DayPlan {
  day: number;
  focus: string;
  action: string;
  shortExplanation: string;
}

export interface SevenDayRoadmapResult {
  creatorName: string;
  niche: string;
  audienceStage: string;
  mainGoal: string;
  currentBottleneck: string;
  intro: string;
  days: DayPlan[];
}

export interface RoadmapStep {
  stepNumber: string;
  title: string;
  whatToDo: string;
  actions: string[];
  why: string;
  expectedOutcome: string;
}

export interface DiagnosticResult {
  creatorName: string;
  primaryNiche: string;
  audienceScale: string;
  primaryGoal: string;
  growthBottleneckDiagnosis: string;
  steps: RoadmapStep[];
  elevateMove: string;
}

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  instagramId: string;
  currentProblem: string;
  email?: string;
  niche?: string;
}

export interface FlagshipApplicationData {
  fullName: string;
  email: string;
  phone: string;
  instagramHandle: string;
  niche: string;
  currentReach: string;
  primaryGoal: string;
  monthlyRevenueTarget: string;
  biggestObstacle: string;
}

// ==========================================
// ELEVATE AI REEL ANALYZER (DEEP VIDEO-GROUNDED TYPES)
// ==========================================

export interface ReelCreatorContext {
  followers: string;
  averageViews: string;
  niche: string;
  targetAudience: string;
}

export interface DiagnosisFinding {
  category: string;
  title: string;
  explanation: string;
  status: 'positive' | 'warning';
  microBadge?: string; // e.g. "⚡ Pattern Interrupt", "👀 Close-up Framing", "⚠️ Safe Zone Hazard"
}

export interface TimelineBreakdownSegment {
  timestampRange: string; // e.g. "00:00–00:02"
  label: string; // e.g. "HOOK", "PACING", "VISUAL SHIFT", "PAYOFF", "CALL TO ACTION"
  tag?: string; // e.g. "👀 Close-Up Opening", "⚡ Strongest Pattern Interrupt", "⚠️ Attention Dip Risk", "🔥 Climax Payoff", "🎯 Value Proposition", "😂 Joke Lands Here"
  observation: string; // Grounded description of what is actually happening / spoken / shown
  strategicImpact: string; // Why it matters for retention & algorithmic velocity
}

export interface BeforeYouPostAction {
  id: string;
  number: string;
  title: string;
  explanation: string;
  detectedIssue?: string;
  suggestedFix: string;
}

export interface TrendSignalIndicator {
  label: string;
  score: string;
  status: 'strong' | 'moderate' | 'emerging';
  summary: string;
}

export interface ReelAnalysisResult {
  id: string;
  timestamp: number;
  videoFileName: string;
  videoFileSizeFormatted: string;
  videoUrl?: string;
  analysisConfidence?: 'High' | 'Moderate' | 'Limited';
  analysisConfidenceReason?: string;
  creatorContext: ReelCreatorContext;
  whatAiNoticed: string[]; // 3–5 specific video-grounded observations showing the AI actually watched the video
  timelineBreakdown: TimelineBreakdownSegment[]; // 3–6 meaningful timestamp segments
  performanceInsights: {
    creatorAverage: string;
    aiEstimatedRange: string;
    potentialUpside: string;
    explanation: string;
  };
  contentDiagnosis: {
    working: DiagnosisFinding[];
    couldHurt: DiagnosisFinding[];
  };
  beforeYouPost: BeforeYouPostAction[];
  postingIntelligence: {
    bestDay: string;
    bestTimeIST: string;
    secondaryWindowIST: string;
    reasoning: string;
  };
  trendSignals: {
    nicheAlignment: TrendSignalIndicator;
    topicRelevance: TrendSignalIndicator;
    contentSignals: TrendSignalIndicator;
  };
  summary: string;
}

export interface SavedReelAnalysisSummary {
  id: string;
  timestamp: number;
  videoFileName: string;
  niche: string;
  estimatedRange: string;
  summary: string;
  followers: string;
  averageViews: string;
  data: ReelAnalysisResult;
}

