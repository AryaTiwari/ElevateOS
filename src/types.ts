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
