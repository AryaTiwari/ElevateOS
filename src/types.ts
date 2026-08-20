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

export interface AudioAnalysisDetail {
  spokenDialogue?: string;
  speechClarity?: string;
  energyAndTone?: string;
  musicAndSoundBalance?: string;
  audioHookStrength?: string;
  audioSupportsVisual?: boolean;
}

export interface VisualAnalysisDetail {
  framingAndLighting?: string;
  pacingAndEditing?: string;
  captionPlacementAndSafeZone?: string;
  bRollAndVisualVariety?: string;
  loopPotential?: string;
}

export interface RetentionAnalysisDetail {
  hookHoldRatePotential?: string;
  attentionDipRisks?: string[];
  climaxPayoffStrength?: string;
  loopTrigger?: string;
}

// ----------------------------------------------------
// CREATOR STRATEGY & REEL ANALYSIS TYPES
// ----------------------------------------------------

export interface CreatorScoreItem {
  score: number; // 1 to 10
  explanation: string;
}

export interface CreatorScores {
  hook: CreatorScoreItem;
  pacing: CreatorScoreItem;
  value: CreatorScoreItem;
  visuals: CreatorScoreItem;
  audio: CreatorScoreItem;
  ending: CreatorScoreItem;
}

export interface WhatsWorkingItem {
  title: string;
  whatAiNoticed: string;
  whyItHelps: string;
}

export interface WhatsHoldingItBackItem {
  title: string;
  whatAiNoticed: string;
  whyItMatters: string;
  timestamp?: string;
}

export interface StrategicChangeItem {
  number: number; // 1, 2, 3
  title: string;
  whatToChange: string;
  tryThis: string;
  visualAndTextChange?: string;
}

export interface BetterVersionScript {
  newHook: string;
  bodyStructure: string;
  betterEnding: string;
  notes?: string;
}

export interface AudioAndEditingNotes {
  voice?: string;
  music?: string;
  soundEffects?: string;
  pauses?: string;
  cutsAndTransitions?: string;
  captions?: string;
}

export interface NextReelIdea {
  title: string;
  concept: string;
  whyItWorksNext: string;
}

export interface PerformanceOutlook {
  creatorBaseline: string; // e.g. "5,000 views"
  potential: 'Above your normal performance' | 'Around your normal performance' | 'Below your normal performance';
  explanation: string;
  formatNote?: string;
}

export interface PostingIntelligenceData {
  bestDay: string;
  bestTimeIST: string;
  secondaryWindowIST?: string;
  reasoning: string;
}

export type NextReelIdeaItem = NextReelIdea;
export type PerformanceOutlookInfo = PerformanceOutlook;
export type PostingIntelligence = PostingIntelligenceData;



export interface HookAnalysisDimension {
  dimension: string;
  score: number; // 1 to 10
  justification: string;
}

export interface HookAnalysisReport {
  overallHookScore: number; // 1 to 10
  detectedOpeningHook: string;
  dimensions: HookAnalysisDimension[];
  hookDiagnosis: string;
}

export interface RetentionRiskZone {
  timestamp: string; // e.g. "00:04–00:07"
  whatHappens: string;
  whyAttentionDeclines: string;
  specificEditFix: string;
}

export interface AudioForensics {
  spokenDialogueDetected: boolean;
  transcriptExcerpt?: string;
  spokenDelivery: string;
  speechSpeedAndPacing: string;
  pausesAndBreaths: string;
  vocalEnergyAndTone: string;
  vocalClarity: string;
  musicTrackBalance: string;
  soundEffectsUsage: string;
  audioVisualSync: string;
}

export interface ContentArchitecture {
  corePromise: string;
  targetViewerPersona: string;
  curiosityGap: string;
  valueDelivery: string;
  storytellingStructure: string;
  payoffExecution: string;
  callToActionAnalysis: string;
  commentPotential: string;
  sharePotential: string;
  savePotential: string;
  loopPotential: string;
}

export interface ConcreteRewriteItem {
  id: string;
  priority: 'P0' | 'P1' | 'P2';
  targetSection: string;
  currentDetected: string;
  problemIdentified: string;
  concreteRewrite: string;
  visualChange: string;
  onScreenText: string;
  timestamp: string;
  whyItMatters: string;
}

export interface EditingBlueprintEntry {
  timestampRange: string;
  currentContent: string;
  identifiedFriction: string;
  recommendedChange: string;
}

export interface PriorityRecommendation {
  priority: 'P0' | 'P1' | 'P2';
  issue: string;
  evidenceFromReel: string;
  exactFix: string;
  whyItMatters: string;
}

export interface TrendIntelligenceReport {
  isLiveApiConnected: boolean;
  trendContextStatus: string;
  relevantFormatTrend: string;
  whyItIsRelevant: string;
  usedInThisReel: boolean;
  howToAdapt: string;
}

export interface PerformanceCategoryAssessment {
  creatorBaseline: string;
  potentialPerformanceCategory: string;
  supportingReasons: string[];
  factorsIncreasingPerformance: string[];
  factorsDecreasingPerformance: string[];
}

export interface ReelAnalysisResult {
  id: string;
  timestamp: number;
  videoFileName: string;
  videoFileSizeFormatted: string;
  videoUrl?: string;
  durationFormatted?: string;
  overallScore?: number; // 1 to 10
  verdict?: string; // 1-sentence verdict
  creatorScores?: CreatorScores; // 6 core category scores
  whatsWorking?: WhatsWorkingItem[]; // 3 strongest elements
  whatsHoldingItBack?: WhatsHoldingItBackItem[]; // 3 biggest friction points
  top3Changes?: StrategicChangeItem[]; // Change 1, 2, 3
  betterVersion?: BetterVersionScript; // Improved script (Hook, Body, Ending)
  audioAndEditing?: AudioAndEditingNotes; // Concise audio & editing review
  beforeYouPostChecklist?: string[]; // Simple max 5-item checklist
  nextReelIdeas?: NextReelIdea[]; // 2–3 follow-up ideas
  performanceOutlook?: PerformanceOutlook; // Baseline comparison & natural format note
  analysisConfidence?: 'High' | 'Moderate' | 'Limited';
  analysisConfidenceReason?: string;
  creatorContext: ReelCreatorContext;
  whatAiNoticed: string[];
  timelineBreakdown: TimelineBreakdownSegment[];
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
  transcript?: string;
  audioAnalysis?: AudioAnalysisDetail;
  visualAnalysis?: VisualAnalysisDetail;
  retentionAnalysis?: RetentionAnalysisDetail;
  hookAnalysis?: HookAnalysisReport;
  retentionRiskZones?: RetentionRiskZone[];
  audioForensics?: AudioForensics;
  contentArchitecture?: ContentArchitecture;
  concreteRewrites?: ConcreteRewriteItem[];
  editingBlueprint?: EditingBlueprintEntry[];
  priorityRecommendations?: PriorityRecommendation[];
  trendIntelligence?: TrendIntelligenceReport;
  performanceCategoryAssessment?: PerformanceCategoryAssessment;
}

export interface MonthlyUsageInfo {
  used: number;
  limit: number;
  remaining: number;
  monthYear: string;
  canAnalyze: boolean;
}

export interface UserProfile {
  id: string;
  email?: string;
  tier: 'free' | 'creator_pro' | 'flagship';
  createdAt?: string;
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

