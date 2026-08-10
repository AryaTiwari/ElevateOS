import React, { useState, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  Zap, 
  Target, 
  Flame, 
  Lock, 
  User, 
  Users, 
  BarChart3, 
  Video, 
  RotateCcw, 
  ShieldCheck, 
  HeartHandshake, 
  Download,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface CreatorScoreCardProps {
  onOpenBooking: () => void;
  onOpenFlagship: () => void;
}

interface AnalysisItem {
  title: string;
  description: string;
  tag: string;
  impact: 'High' | 'Medium' | 'Critical';
}

const computeAnalysis = (
  followersStr: string,
  interactionsStr: string,
  viewsRange: string,
  videosRange: string,
  overallScore: number,
  audienceScore: number,
  engagementScore: number,
  momentumScore: number
) => {
  const fCount = Math.max(1, parseInt(followersStr.replace(/,/g, ''), 10) || 0);
  const iCount = Math.max(0, parseInt(interactionsStr.replace(/,/g, ''), 10) || 0);

  const strengths: AnalysisItem[] = [];
  const weaknesses: AnalysisItem[] = [];

  const engagementRatio = fCount > 0 ? (iCount / fCount) : 0;

  // ------------------------------------
  // 🟢 DYNAMIC STRENGTHS GENERATION
  // ------------------------------------

  // 1. Interaction & Engagement Strength
  if (engagementRatio >= 0.12 || (iCount > 800 && fCount < 8000)) {
    strengths.push({
      title: "Hyper-Engaged Viewer Core",
      description: `Your interaction-to-follower ratio is high (~${(engagementRatio * 100).toFixed(1)}%). Your viewers actively comment, save, and share your posts rather than passively scrolling.`,
      tag: "Community Power 💬",
      impact: "High"
    });
  } else if (engagementRatio >= 0.04) {
    strengths.push({
      title: "Healthy Audience Resonance",
      description: `Generating ${iCount.toLocaleString()} monthly interactions demonstrates consistent relevance and trust among your active viewers.`,
      tag: "Loyal Base ⚡",
      impact: "Medium"
    });
  } else if (iCount >= 3000) {
    strengths.push({
      title: "High Interaction Volume",
      description: `Logging over ${iCount.toLocaleString()} total interactions monthly provides strong algorithmic signals for comment section viral loops.`,
      tag: "Active Feedback 🔥",
      impact: "High"
    });
  }

  // 2. Views & Algorithmic Reach Strength
  if (['10M+', '5M–10M', '1M–5M', '500K–1M'].includes(viewsRange)) {
    strengths.push({
      title: "Mass Algorithmic Feed Penetration",
      description: `Pulling ${viewsRange} monthly views proves your video hooks regularly get pushed to non-follower Explore & Shorts feeds.`,
      tag: "Viral Reach 🚀",
      impact: "High"
    });
  } else if (['100K–500K', '25K–100K'].includes(viewsRange)) {
    strengths.push({
      title: "Consistent Non-Follower Discovery",
      description: `A steady ${viewsRange} view range shows your topics regularly escape subscriber feeds into wider discovery pools.`,
      tag: "Steady Discovery 📈",
      impact: "Medium"
    });
  }

  // 3. Output Cadence Strength
  if (['11–20', '21–30'].includes(videosRange)) {
    strengths.push({
      title: "Optimal Publishing Cadence",
      description: `Posting ${videosRange} videos per month hits the ideal algorithmic rhythm for continuous impression velocity without audience fatigue.`,
      tag: "Perfect Rhythm 🎬",
      impact: "High"
    });
  } else if (['31–50', '50+'].includes(videosRange)) {
    strengths.push({
      title: "Relentless Content Output",
      description: `Publishing ${videosRange} pieces monthly gives you a huge volume of diagnostic data to test new hooks and formats quickly.`,
      tag: "High Velocity ⚡",
      impact: "Medium"
    });
  } else if (['6–10'].includes(videosRange)) {
    strengths.push({
      title: "Quality-Focused Output Rhythm",
      description: `Publishing ${videosRange} videos monthly protects production polish while maintaining steady brand presence.`,
      tag: "High Polish ✨",
      impact: "Medium"
    });
  }

  // 4. Follower Capital
  if (fCount >= 50000) {
    strengths.push({
      title: "Substantial Social Proof Capital",
      description: `Having ${fCount.toLocaleString()} followers gives you instant authority positioning for premium brand sponsorships and high-ticket offers.`,
      tag: "Brand Authority 👑",
      impact: "High"
    });
  } else if (fCount >= 5000) {
    strengths.push({
      title: "Proven Micro-Community Footprint",
      description: `With ${fCount.toLocaleString()} followers, you have passed the early validation phase and own a dedicated niche community.`,
      tag: "Solid Base 🏆",
      impact: "Medium"
    });
  } else {
    strengths.push({
      title: "Agile Format Iteration",
      description: `At ${fCount.toLocaleString()} followers, your channel can rapidly pivot content formats and test bold hooks without subscriber loss penalty.`,
      tag: "Agile Creator 🌱",
      impact: "Medium"
    });
  }

  if (strengths.length < 2) {
    strengths.push({
      title: "Unbounded Growth Runway",
      description: "Your baseline channel parameters leave wide open room for exponential growth once storytelling hooks are unlocked.",
      tag: "High Runway 🚀",
      impact: "High"
    });
  }

  // ------------------------------------
  // 🔴 DYNAMIC WEAKNESSES GENERATION
  // ------------------------------------

  // 1. High Views + Low Followers (Funnel Leak)
  if (['100K–500K', '500K–1M', '1M–5M', '5M–10M', '10M+'].includes(viewsRange) && fCount < 10000) {
    weaknesses.push({
      title: "Leaky View-to-Follower Conversion Funnel",
      description: `Generating ${viewsRange} views with only ${fCount.toLocaleString()} followers means millions watch but leave without following. Weak profile CTA and unanchored series are losing you subscribers daily.`,
      tag: "Conversion Leak 💧",
      impact: "Critical"
    });
  }

  // 2. High Views + Low Interactions (Passive Viewers)
  if (['25K–100K', '100K–500K', '500K–1M', '1M–5M', '5M–10M', '10M+'].includes(viewsRange) && (iCount < 500 || engagementRatio < 0.025)) {
    weaknesses.push({
      title: "Passive Retention & Unoptimized Call-to-Actions",
      description: `Despite getting ${viewsRange} views, your total interactions (${iCount.toLocaleString()}) remain low. Video scripts are missing curiosity gaps and explicit comment triggers.`,
      tag: "Passive Reach ⚠️",
      impact: "High"
    });
  }

  // 3. Low Publishing Volume (Algorithm Cold Start)
  if (['0–2', '3–5'].includes(videosRange)) {
    weaknesses.push({
      title: "Publishing Cadence Lag",
      description: `Posting only ${videosRange} videos in 30 days starves the algorithm feed and causes audience recall to decay between uploads.`,
      tag: "Cadence Bottleneck ⏳",
      impact: "High"
    });
  }

  // 4. Over-Posting Burnout Risk
  if (['31–50', '50+'].includes(videosRange) && (iCount < 2000 || ['Under 5K', '5K–25K'].includes(viewsRange))) {
    weaknesses.push({
      title: "High Output / Low Return Creative Burnout",
      description: `Publishing ${videosRange} videos monthly with views capped at ${viewsRange} indicates quantity is diluting content hooks and storytelling quality.`,
      tag: "Burnout Risk 🛑",
      impact: "Critical"
    });
  }

  // 5. High Followers + Low Views/Interactions (Audience Decay)
  if (fCount >= 20000 && (['Under 5K', '5K–25K'].includes(viewsRange) || iCount < 800)) {
    weaknesses.push({
      title: "Existing Subscriber Reach Suppression",
      description: `With ${fCount.toLocaleString()} followers, receiving ${viewsRange} views shows the recommendation system is not serving your posts to your existing audience.`,
      tag: "Algorithmic Drop 📉",
      impact: "Critical"
    });
  }

  // 6. Early Stage Growth Bottleneck
  if (fCount < 5000 && ['Under 5K', '5K–25K'].includes(viewsRange)) {
    weaknesses.push({
      title: "Cold-Start Hook & Retention Friction",
      description: `At ${fCount.toLocaleString()} followers and ${viewsRange} views, videos struggle to break out of baseline feeds. The first 3 seconds of short-form clips require sharper visual tension.`,
      tag: "Cold Start Hook 🧊",
      impact: "High"
    });
  }

  // 7. General Low Interactions
  if (iCount < 300 && weaknesses.length < 2) {
    weaknesses.push({
      title: "Low Engagement Trigger Density",
      description: `Only ${iCount} interactions recorded across 30 days. Video captions and pin-comments lack interactive questions and downloadable incentives.`,
      tag: "Low Triggers 💬",
      impact: "High"
    });
  }

  if (weaknesses.length < 2) {
    weaknesses.push({
      title: "Un-monetized Audience Traffic",
      description: "Without a structured lead magnet or community offer, over 90% of your monthly audience attention disappears without converting into long-term value.",
      tag: "Unmonetized Traffic 💸",
      impact: "Medium"
    });
  }

  return {
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 3)
  };
};

export const CreatorScoreCard: React.FC<CreatorScoreCardProps> = memo(({ onOpenBooking, onOpenFlagship }) => {
  // Input states
  const [fullName, setFullName] = useState<string>('');
  const [followers, setFollowers] = useState<string>('');
  const [interactions, setInteractions] = useState<string>('');
  const [viewsRange, setViewsRange] = useState<string>('25K-100K');
  const [videosRange, setVideosRange] = useState<string>('11-20');

  
  // Validation state
  const [error, setError] = useState<string | null>(null);

  // Flow states
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Animated scoring states
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const [audienceScore, setAudienceScore] = useState<number>(0);
  const [engagementScore, setEngagementScore] = useState<number>(0);
  const [momentumScore, setMomentumScore] = useState<number>(0);

  // Certificate download state
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Range-to-value converters
  const getViewsValue = (range: string): number => {
    switch (range) {
      case 'Under 5K': return 2500;
      case '5K–25K': return 15000;
      case '25K–100K': return 60000;
      case '100K–500K': return 300000;
      case '500K–1M': return 750000;
      case '1M–5M': return 3000000;
      case '5M–10M': return 7500000;
      case '10M+': return 12500000;
      default: return 60000;
    }
  };

  const getVideosValue = (range: string): number => {
    switch (range) {
      case '0–2': return 1;
      case '3–5': return 4;
      case '6–10': return 8;
      case '11–20': return 15;
      case '21–30': return 25;
      case '31–50': return 40;
      case '50+': return 60;
      default: return 15;
    }
  };



  // Defensible Scoring Engine
  const calculateFinalScores = () => {
    const fCount = Math.max(1, parseInt(followers.replace(/,/g, ''), 10) || 0);
    const iCount = Math.max(0, parseInt(interactions.replace(/,/g, ''), 10) || 0);

    // 1. Follower Strength
    let followerScoreVal = 10;
    if (fCount < 1000) {
      followerScoreVal = 10 + (fCount / 1000) * 15; // 10 - 25
    } else if (fCount < 5000) {
      followerScoreVal = 25 + ((fCount - 1000) / 4000) * 20; // 25 - 45
    } else if (fCount < 20000) {
      followerScoreVal = 45 + ((fCount - 5000) / 15000) * 20; // 45 - 65
    } else if (fCount < 100000) {
      followerScoreVal = 65 + ((fCount - 20000) / 80000) * 20; // 65 - 85
    } else {
      followerScoreVal = 85 + Math.min(15, ((fCount - 100000) / 900000) * 15); // 85 - 100
    }

    // 2. Engagement Quality
    const engagementRate = iCount / fCount;
    let engagementScoreVal = Math.min(100, Math.max(10, (engagementRate / 0.06) * 60));
    if (iCount === 0) engagementScoreVal = 10;

    // 3. Reach/Views Score
    let reachScoreVal = 15;
    if (viewsRange === 'Under 5K') reachScoreVal = 15;
    else if (viewsRange === '5K–25K') reachScoreVal = 28;
    else if (viewsRange === '25K–100K') reachScoreVal = 42;
    else if (viewsRange === '100K–500K') reachScoreVal = 62;
    else if (viewsRange === '500K–1M') reachScoreVal = 78;
    else if (viewsRange === '1M–5M') reachScoreVal = 88;
    else if (viewsRange === '5M–10M') reachScoreVal = 94;
    else if (viewsRange === '10M+') reachScoreVal = 100;

    // 4. Content Consistency
    let consistencyScoreVal = 20;
    if (videosRange === '0–2') consistencyScoreVal = 20;
    else if (videosRange === '3–5') consistencyScoreVal = 40;
    else if (videosRange === '6–10') consistencyScoreVal = 60;
    else if (videosRange === '11–20') consistencyScoreVal = 80;
    else if (videosRange === '21–30') consistencyScoreVal = 95;
    else if (videosRange === '31–50') consistencyScoreVal = 85;
    else if (videosRange === '50+') consistencyScoreVal = 75;

    // 5. Growth Momentum / Potential
    const rawMomentumScoreVal = (engagementScoreVal * 0.4) + (reachScoreVal * 0.4) + (consistencyScoreVal * 0.2);
    const finalMomentumScoreVal = Math.min(100, Math.max(10, rawMomentumScoreVal));

    // Base Weighted Score
    let overallWeighted = (
      (followerScoreVal * 0.25) + 
      (engagementScoreVal * 0.30) + 
      (reachScoreVal * 0.25) + 
      (finalMomentumScoreVal * 0.20)
    );

    const isSmallViews = ['Under 5K', '5K–25K', '25K–100K'].includes(viewsRange);
    const isSmallFollowers = fCount < 5000;
    const isHighTier = fCount >= 20000 || ['500K–1M', '1M–5M', '5M–10M', '10M+'].includes(viewsRange);

    // Apply strict tier constraints based on user criteria
    if (isSmallFollowers || isSmallViews) {
      // Must stay below 50 for creators with followers < 5k or views < 100k
      overallWeighted = Math.min(48, overallWeighted);
    } else if (isHighTier) {
      // High tier creators get scores close to or above 70
      overallWeighted = Math.max(68, Math.min(98, overallWeighted));
    } else {
      // Mid tier (5k-20k followers & 100k-500k views) -> range ~ 50 - 66
      overallWeighted = Math.min(66, Math.max(50, overallWeighted));
    }

    const roundedFinal = Math.min(99, Math.max(12, Math.round(overallWeighted)));

    // Scale sub-scores smoothly if overall score was capped for consistency
    let finalAudience = Math.round(followerScoreVal);
    let finalEngagement = Math.round(engagementScoreVal);
    let finalMomentum = Math.round(finalMomentumScoreVal);

    if (isSmallFollowers || isSmallViews) {
      finalAudience = Math.min(48, finalAudience);
      finalEngagement = Math.min(65, finalEngagement);
      finalMomentum = Math.min(48, finalMomentum);
    }

    return {
      overall: roundedFinal,
      audience: finalAudience,
      engagement: finalEngagement,
      momentum: finalMomentum
    };
  };

  const getCreatorLevel = (score: number) => {
    if (score <= 20) return "Just Getting Started";
    if (score <= 40) return "Hidden Potential";
    if (score <= 60) return "Growing Creator";
    if (score <= 75) return "Strong Creator";
    if (score <= 88) return "High-Potential Creator";
    if (score <= 95) return "Elite Creator";
    return "Creator Powerhouse";
  };

  const getCreatorLevelBadge = (level: string) => {
    switch (level) {
      case "Just Getting Started": return "🌱 Rising Star";
      case "Hidden Potential": return "✨ Hidden Gem";
      case "Growing Creator": return "⚡ Growing Authority";
      case "Strong Creator": return "🏆 Strong Creator";
      case "High-Potential Creator": return "💎 High-Potential Creator";
      case "Elite Creator": return "👑 Elite Creator";
      default: return "🔥 Creator Powerhouse";
    }
  };

  const getInsights = (score: number, metrics: { audience: number; engagement: number; momentum: number }) => {
    // Choose strongest metric
    let strongest = "Monthly Reach";
    if (metrics.engagement >= metrics.audience && metrics.engagement >= metrics.momentum) {
      strongest = "Audience Connection";
    } else if (metrics.momentum >= metrics.audience && metrics.momentum >= metrics.engagement) {
      strongest = "Publishing Frequency";
    }

    // Choose opportunity and next move
    let opportunity = "Engagement → Audience Conversion";
    let nextMove = "Establish 2 signature repeatable content formats to retain random viewers.";

    if (score > 75) {
      opportunity = "Monetization Architecture";
      nextMove = "Convert cold video views into warm community members via custom value funnels.";
    } else if (score < 40) {
      opportunity = "Pacing & Retention Diagnostics";
      nextMove = "Optimize the first 3 seconds of short-form clips using curiosity gap formula.";
    }

    return { strongest, opportunity, nextMove };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your name to personalize your score card & certificate.");
      return;
    }

    const fNum = parseInt(followers.replace(/,/g, ''), 10);
    const iNum = parseInt(interactions.replace(/,/g, ''), 10);

    if (isNaN(fNum) || fNum < 0) {
      setError("Please enter a valid follower count.");
      return;
    }

    if (isNaN(iNum) || iNum < 0) {
      setError("Please enter valid total account interactions.");
      return;
    }

    setIsCalculating(true);

    const targetScores = calculateFinalScores();

    // Staged animation over 1.2 seconds
    let startTime: number | null = null;
    const duration = 1200;

    const stepAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Eased progress
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setAnimatedScore(Math.round(easedProgress * targetScores.overall));
      setAudienceScore(Math.round(easedProgress * targetScores.audience));
      setEngagementScore(Math.round(easedProgress * targetScores.engagement));
      setMomentumScore(Math.round(easedProgress * targetScores.momentum));

      if (progress < 1) {
        requestAnimationFrame(stepAnimation);
      } else {
        setIsCalculating(false);
        setShowResults(true);
      }
    };

    requestAnimationFrame(stepAnimation);
  };

  const handleReset = () => {
    setShowResults(false);
    setAnimatedScore(0);
    setAudienceScore(0);
    setEngagementScore(0);
    setMomentumScore(0);
  };

  // Certificate generator using HTML5 Canvas
  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDownloading(true);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution for printing/sharing
    canvas.width = 1200;
    canvas.height = 800;

    // 1. Solid Dark Background matching Elevate OS colors
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGradient.addColorStop(0, '#090D16');
    bgGradient.addColorStop(1, '#0E1624');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 800);

    // 2. Dynamic Abstract Studio Lights Background
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const blueGlow = ctx.createRadialGradient(200, 200, 50, 200, 200, 600);
    blueGlow.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
    blueGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = blueGlow;
    ctx.beginPath();
    ctx.arc(200, 200, 600, 0, Math.PI * 2);
    ctx.fill();

    const amberGlow = ctx.createRadialGradient(1000, 600, 50, 1000, 600, 500);
    amberGlow.addColorStop(0, 'rgba(245, 158, 11, 0.1)');
    amberGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = amberGlow;
    ctx.beginPath();
    ctx.arc(1000, 600, 500, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Dual Sleek Border Frames (No rounded corners + thick border conflict)
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#3B82F6';
    ctx.strokeRect(40, 40, 1120, 720);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
    ctx.strokeRect(55, 55, 1090, 690);

    // Decorative geometric corner notches
    const notches = [
      { x: 40, y: 40, dx: 30, dy: 30 },
      { x: 1160, y: 40, dx: -30, dy: 30 },
      { x: 40, y: 760, dx: 30, dy: -30 },
      { x: 1160, y: 760, dx: -30, dy: -30 }
    ];
    ctx.fillStyle = '#60A5FA';
    notches.forEach(n => {
      ctx.fillRect(n.x - 2, n.y - 2, 5, 5);
      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(n.x + n.dx, n.y);
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(n.x, n.y + n.dy);
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // 4. Header & Branding
    ctx.textAlign = 'center';
    ctx.fillStyle = '#60A5FA';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('⚡ ELEVATE OS DIAGNOSTICS ENGINE', 600, 130);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('CREATOR POWER CARD', 600, 185);

    // Underline accent
    ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.fillRect(450, 205, 300, 2);

    // 5. User Name
    ctx.fillStyle = '#94A3B8';
    ctx.font = '15px sans-serif';
    ctx.fillText('THIS CERTIFIES THAT THE DIGITAL INFLUENCE & CREATOR CAPABILITIES OF', 600, 275);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(fullName.toUpperCase(), 600, 335);

    // 6. Scores Display
    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px sans-serif';
    ctx.fillText('HAVE BEEN AUDITED AND GENERATED THE FOLLOWING BENCHMARKS:', 600, 400);

    // Render big circular indicator or nice card grid
    // Box 1: Audience Strength
    ctx.fillStyle = '#0E1624';
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.lineWidth = 1;
    ctx.fillRect(180, 440, 220, 130);
    ctx.strokeRect(180, 440, 220, 130);
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('AUDIENCE STRENGTH', 290, 475);
    ctx.fillStyle = '#60A5FA';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(`${audienceScore}%`, 290, 530);

    // Box 2: Engagement Quality
    ctx.fillStyle = '#0E1624';
    ctx.fillRect(490, 440, 220, 130);
    ctx.strokeRect(490, 440, 220, 130);
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('ENGAGEMENT QUALITY', 600, 475);
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(`${engagementScore}%`, 600, 530);

    // Box 3: Content Momentum
    ctx.fillStyle = '#0E1624';
    ctx.fillRect(800, 440, 220, 130);
    ctx.strokeRect(800, 440, 220, 130);
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('CONTENT MOMENTUM', 910, 475);
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(`${momentumScore}%`, 910, 530);

    // 7. Overall Score & Rank Banner
    const finalLevel = getCreatorLevel(animatedScore);
    const finalBadge = getCreatorLevelBadge(finalLevel);

    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fillRect(180, 600, 840, 60);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.strokeRect(180, 600, 840, 60);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`OVERALL CREATOR SCORE:  ${animatedScore}/100`, 210, 636);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`RANK LEVEL: ${finalBadge.toUpperCase()}`, 990, 636);

    // 8. Footer Signatures & Authenticity
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748B';
    ctx.font = '11px sans-serif';
    ctx.fillText(`Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}  •  Valid Diagnostic Verification Code: EOS-SC-${animatedScore}-${Math.floor(1000 + Math.random() * 9000)}`, 600, 715);
    
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('ELEVATE OS™  —  CREATING SUSTAINABLE CAREERS, NOT AGENCIES', 600, 735);

    // Convert canvas to image and trigger download
    try {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `ElevateOS_CreatorScore_${fullName.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Failed to generate certificate download:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const level = getCreatorLevel(animatedScore);
  const badge = getCreatorLevelBadge(level);
  const potentialScore = Math.min(99, Math.round(animatedScore + 16));
  const { strengths, weaknesses } = computeAnalysis(
    followers,
    interactions,
    viewsRange,
    videosRange,
    animatedScore,
    audienceScore,
    engagementScore,
    momentumScore
  );
  const { strongest, opportunity, nextMove } = getInsights(animatedScore, {
    audience: audienceScore,
    engagement: engagementScore,
    momentum: momentumScore
  });

  const getBadgeStyle = (score: number) => {
    if (score <= 45) {
      return "bg-red-50 border border-red-200 text-red-700";
    } else if (score <= 75) {
      return "bg-orange-50 border border-orange-200 text-orange-800";
    } else {
      return "bg-amber-50 border border-amber-200 text-amber-800";
    }
  };

  return (
    <section id="creator-score" className="py-12 md:py-20 relative border-t border-slate-200">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-r from-red-200/20 via-orange-200/20 to-yellow-200/20 blur-[50px] pointer-events-none rounded-full gpu-layer" />
      
      <div className="w-[min(1120px,92%)] mx-auto relative z-10">
        <div className="bg-white border-2 border-slate-200/90 hover:border-orange-400/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden transition-all duration-300 gpu-layer">
          {/* Background Highlight */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-red-100/20 via-orange-100/20 to-yellow-100/20 rounded-full blur-[40px] pointer-events-none gpu-layer" />

          {/* Static Ambient Emojis */}
          <div className="absolute top-4 left-10 opacity-15 text-3xl select-none pointer-events-none hidden sm:block">📸</div>
          <div className="absolute top-24 right-12 opacity-15 text-3xl select-none pointer-events-none hidden sm:block">🎥</div>
          <div className="absolute bottom-12 left-14 opacity-15 text-3xl select-none pointer-events-none hidden sm:block">❤️</div>
          <div className="absolute bottom-24 right-16 opacity-15 text-3xl select-none pointer-events-none hidden sm:block">👥</div>

          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-300 bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2.5 select-none shadow-sm">
                <Zap className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                ⚡ OFFICIAL CREATOR SCORE CALCULATOR
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Calculate Your Official Creator Score & Brand Potential 📊✨
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium max-w-2xl">
                Enter your channel stats below to generate your Creator Score, audience engagement index, and brand readiness level in 60 seconds.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-2xl shrink-0 self-start md:self-auto text-xs text-blue-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Independent Creator Score Tool</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              /* INPUT FORM STEP */
              <motion.form 
                key="score-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleCalculate}
                className="max-w-3xl mx-auto space-y-6"
              >
                <div className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* INPUT 0: CREATOR NAME */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      Creator Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* INPUT 1: FOLLOWERS */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-orange-500" />
                        Follower Count
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2400"
                        value={followers}
                        onChange={(e) => setFollowers(e.target.value.replace(/[^0-9,]/g, ''))}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* INPUT 2: ACCOUNT INTERACTIONS */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                        Total Account Interactions
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1200"
                        value={interactions}
                        onChange={(e) => setInteractions(e.target.value.replace(/[^0-9,]/g, ''))}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold transition-all placeholder:text-slate-400"
                      />
                      <p className="text-[10px] text-slate-500 font-medium pl-1">
                        Likes + comments + shares + saves in last 30 days.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* INPUT 3: VIEWS IN LAST 30 DAYS */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                        Views in Last 30 Days
                      </label>
                      <select
                        value={viewsRange}
                        onChange={(e) => setViewsRange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold transition-all cursor-pointer"
                      >
                        <option value="Under 5K">Under 5K</option>
                        <option value="5K–25K">5K–25K</option>
                        <option value="25K–100K">25K–100K</option>
                        <option value="100K–500K">100K–500K</option>
                        <option value="500K–1M">500K–1M</option>
                        <option value="1M–5M">1M–5M</option>
                        <option value="5M–10M">5M–10M</option>
                        <option value="10M+">10M+</option>
                      </select>
                    </div>

                    {/* INPUT 4: VIDEOS IN LAST 30 DAYS */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-orange-500" />
                        Videos Posted in Last 30 Days
                      </label>
                      <select
                        value={videosRange}
                        onChange={(e) => setVideosRange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold transition-all cursor-pointer"
                      >
                        <option value="0–2">0–2</option>
                        <option value="3–5">3–5</option>
                        <option value="6–10">6–10</option>
                        <option value="11–20">11–20</option>
                        <option value="21–30">21–30</option>
                        <option value="31–50">31–50</option>
                        <option value="50+">50+</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isCalculating}
                      className="w-full py-4 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:via-orange-600 hover:to-amber-600 disabled:bg-slate-300 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-3 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {isCalculating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>RUNNING ADVANCED DIAGNOSTICS...</span>
                        </>
                      ) : (
                        <>
                          <div className="flex items-end gap-[2px] h-4 shrink-0 select-none pb-[1px]">
                            <span className="w-1 bg-white/40 group-hover:bg-white rounded-sm animate-pulse" style={{ height: '40%', animationDelay: '0ms', animationDuration: '1s' }} />
                            <span className="w-1 bg-white/90 group-hover:bg-white rounded-sm animate-pulse" style={{ height: '90%', animationDelay: '150ms', animationDuration: '1s' }} />
                            <span className="w-1 bg-white/60 group-hover:bg-white rounded-sm animate-pulse" style={{ height: '65%', animationDelay: '300ms', animationDuration: '1s' }} />
                          </div>
                          <span>CALCULATE MY CREATOR SCORE</span>
                          <Zap className="w-4 h-4 text-yellow-100 group-hover:scale-125 transition-transform animate-pulse" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            ) : (
              /* RESULTS STEP */
              <motion.div 
                key="score-results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left"
              >
                {/* Canvas container for hidden certificate generation */}
                <canvas ref={canvasRef} className="hidden" />

                {/* LEFT COLUMN: PRIMARY RADIAL METER & LEVELLING */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-orange-50/50 border border-orange-200 p-6 rounded-2xl flex flex-col justify-between shadow-lg">
                  <div className="text-center py-4">
                    <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase block mb-1">YOUR RESULTS PROFILE</span>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{fullName}'s Creator Strength</h3>
                    
                    {/* RADIAL SCORE DISPLAY */}
                    <div className="relative w-44 h-44 mx-auto my-6 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="scoreRadialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" /> {/* Red */}
                            <stop offset="50%" stopColor="#F97316" /> {/* Orange */}
                            <stop offset="100%" stopColor="#FBBF24" /> {/* Yellow */}
                          </linearGradient>
                        </defs>
                        {/* Underlay Track */}
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="rgba(226, 232, 240, 1)"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        {/* Animated Score Arc */}
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="url(#scoreRadialGradient)"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={263.89}
                          strokeDashoffset={263.89 - (263.89 * animatedScore) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Central Text */}
                      <div className="absolute text-center">
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 tracking-tighter block leading-none">{animatedScore}</span>
                        <span className="text-[9px] font-black tracking-widest uppercase mt-1 block text-orange-700">SCORE / 100</span>
                      </div>
                    </div>

                    {/* UNLOCKED RANK */}
                    <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold mb-2.5 ${getBadgeStyle(animatedScore)}`}>
                      <Trophy className="w-4 h-4" />
                      <span>{badge.toUpperCase()}</span>
                    </div>
                    
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed mt-2 font-medium">
                      {animatedScore < 50 
                        ? "Your current score is only part of the story. You have substantial untapped engagement potential waiting to be activated." 
                        : "Your performance profile suggests exceptionally strong creator momentum and high audience value conversion potential."}
                    </p>
                  </div>

                  {/* SCORE BREAKDOWN */}
                  <div className="border-t border-slate-200 pt-4 space-y-3.5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Capabilities Audit</span>
                    
                    {/* Bar 1: Audience Strength */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-800">
                        <span>Audience Strength</span>
                        <span>{audienceScore}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${audienceScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Bar 2: Engagement Quality */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-800">
                        <span>Engagement Quality</span>
                        <span>{engagementScore}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-orange-600 to-orange-400 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${engagementScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Bar 3: Content Momentum */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-800">
                        <span>Content Momentum</span>
                        <span>{momentumScore}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${momentumScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: INSIGHTS & HIDDEN POTENTIAL */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  
                  {/* DYNAMIC STRENGTHS & WEAKNESSES ANALYSIS CHART */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest block">
                          ⚡ DIAGNOSTIC INSIGHTS CHART
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          Account Strengths & Bottlenecks Analysis
                        </h4>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-extrabold shrink-0 self-start sm:self-auto">
                        <Target className="w-3.5 h-3.5 text-blue-600" />
                        <span>Custom Data Matching</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* STRENGTHS COLUMN */}
                      <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl space-y-3">
                        <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-200/80 pb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <h5 className="text-xs font-black uppercase tracking-wider">
                            Channel Strengths ({strengths.length})
                          </h5>
                        </div>

                        <div className="space-y-2.5">
                          {strengths.map((s, idx) => (
                            <div key={idx} className="bg-white border border-emerald-200 p-3 rounded-xl shadow-2xs">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                  {s.title}
                                </span>
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                                  {s.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-medium pl-3 border-l-2 border-emerald-400">
                                {s.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* WEAKNESSES / BOTTLENECKS COLUMN */}
                      <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-xl space-y-3">
                        <div className="flex items-center gap-2 text-rose-900 border-b border-rose-200/80 pb-2">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <h5 className="text-xs font-black uppercase tracking-wider">
                            Critical Bottlenecks ({weaknesses.length})
                          </h5>
                        </div>

                        <div className="space-y-2.5">
                          {weaknesses.map((w, idx) => (
                            <div key={idx} className="bg-white border border-rose-200 p-3 rounded-xl shadow-2xs">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                  {w.title}
                                </span>
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 shrink-0">
                                  {w.impact} Priority
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-medium pl-3 border-l-2 border-rose-400">
                                {w.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MERGED POTENTIAL SCORE & UNLOCK CREATOR POTENTIAL HERO CTA */}
                  <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 border border-blue-500/30 rounded-2xl relative overflow-hidden shadow-xl text-white">
                    {/* Subtle background glows */}
                    <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                      <div className="space-y-3 text-center lg:text-left max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-wider select-none">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span>UNLOCKABLE POTENTIAL ROADMAP</span>
                        </div>

                        <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
                          Your Potential Creator Score: <span className="text-amber-400 font-black">{potentialScore} / 100</span> 🔓
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          Your current score is <span className="text-white font-bold">{animatedScore}/100</span>. By eliminating your top bottleneck (<span className="text-amber-300 font-semibold">{weaknesses[0]?.title || 'Content Hook Funnel'}</span>), your channel has a direct roadmap to achieve <span className="text-amber-300 font-bold">{potentialScore}/100</span>.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 pt-1 text-[11px] text-slate-300 font-semibold">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Free Strategy Session
                          </span>
                          <span className="flex items-center gap-1 text-blue-300">
                            <ShieldCheck className="w-3.5 h-3.5" /> 1-on-1 Bottleneck Audit
                          </span>
                          <span className="flex items-center gap-1 text-amber-300">
                            <Zap className="w-3.5 h-3.5" /> Custom Growth Blueprint
                          </span>
                        </div>
                      </div>

                      {/* ACTION CARD */}
                      <div className="bg-slate-900/90 border border-white/15 p-4 sm:p-5 rounded-2xl text-center shrink-0 w-full lg:w-auto min-w-[260px] space-y-3 shadow-lg gpu-layer">
                        <div className="text-center">
                          <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">POTENTIAL SCORE GAP</span>
                          <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1.5 mt-0.5">
                            <span>+{potentialScore - animatedScore} PTS</span>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">UNLOCKABLE</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={onOpenBooking}
                          className="w-full py-3.5 px-5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-500 hover:via-orange-600 hover:to-red-600 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider group"
                        >
                          <span>Unlock My Potential</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <a
                          href={`mailto:elevateosteam@gmail.com?subject=Free Creator Strategy Session&body=Hi Elevate OS Team,%0D%0A%0D%0AMy name is ${fullName} and I just calculated my Creator Score on Elevate OS!%0D%0A%0D%0AHere are my diagnostic details:%0D%0A- Followers: ${followers}%0D%0A- 30-Day Views: ${viewsRange}%0D%0A- 30-Day Videos Posted: ${videosRange}%0D%0A- Current Score: ${animatedScore}/100%0D%0A- Potential Score: ${potentialScore}/100%0D%0A%0D%0AI'd love to unlock my full potential and review my content bottlenecks during a Free Strategy Session.`}
                          className="text-[10px] text-slate-300 hover:text-white underline block font-medium"
                        >
                          Or email us directly with your score →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ACTION CONTROLS & SECONDARY LINK */}
                  <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={generateCertificate}
                        disabled={isDownloading}
                        className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>PRINTING CERTIFICATE...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 text-white" />
                            <span>DOWNLOAD SCORE CARD CERTIFICATE 📄</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-slate-900 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>RE-CALCULATE</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenFlagship}
                      className="text-xs text-slate-500 hover:text-blue-600 font-bold inline-flex items-center justify-center sm:justify-end gap-1 transition-all"
                    >
                      Explore the Creator's Upgrade Program →
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

CreatorScoreCard.displayName = 'CreatorScoreCard';
