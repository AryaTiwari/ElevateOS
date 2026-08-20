import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { generateRuleBasedDiagnosis } from "./src/utils/creatorStrategist.ts";
import { generateRuleBasedAnalysis } from "./src/utils/contentAnalyzer.ts";
import { generateRuleBased7DayRoadmap } from "./src/utils/roadmapGenerator.ts";
import { generateRuleBasedReelAnalysis } from "./src/utils/reelRuleAnalyzer.ts";

const strategySubmissions: any[] = [];

// Helper to attempt generation across recommended models with automatic fallback on 503/429/quota limits
async function generateWithGeminiFallback(ai: GoogleGenAI, payload: { contents: any; config?: any }) {
  const models = ["gemini-3.7-flash", "gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let lastError: any = null;
  for (const model of models) {
    try {
      console.log(`[ELEVATE AI] Attempting generation with model: ${model}...`);
      const response = await ai.models.generateContent({
        model,
        contents: payload.contents,
        config: payload.config
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[ELEVATE AI] Model ${model} encountered error, trying fallback model if available:`, err?.message || err);
    }
  }
  throw lastError || new Error("All Gemini models were unavailable or exceeded rate limits.");
}

function isValidHttpUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Helper to get server-side Supabase client if credentials exist
function getServerSupabase(env?: any) {
  const envUrl = (env?.SUPABASE_URL || process.env.SUPABASE_URL || env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim();
  const url = isValidHttpUrl(envUrl) ? envUrl : 'https://ztvqbqtxvvaxiyefhadg.supabase.co';
  const key = env?.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || env?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_E_iPEkoYCyB4fUb7n1zNlg_1WjyYwQN';
  if (url && isValidHttpUrl(url) && key) {
    try {
      return createClient(url, key);
    } catch {
      return null;
    }
  }
  return null;
}

// In-memory usage store fallback
const inMemoryUsageStore = new Map<string, { count: number; monthYear: string }>();

export async function checkAndIncrementUsage(userIdOrSession: string, env?: any): Promise<{ allowed: boolean; used: number; limit: number }> {
  const currentMonthYear = new Date().toISOString().slice(0, 7); // e.g. "2026-08"
  const MAX_LIMIT = 5;
  const key = `${userIdOrSession || 'guest'}_${currentMonthYear}`;

  const sb = getServerSupabase(env);
  if (sb) {
    try {
      const { data } = await sb
        .from('usage_tracking')
        .select('count')
        .eq('user_id', userIdOrSession)
        .eq('month_year', currentMonthYear)
        .maybeSingle();

      const currentCount = data?.count || 0;
      if (currentCount >= MAX_LIMIT) {
        return { allowed: false, used: currentCount, limit: MAX_LIMIT };
      }

      const newCount = currentCount + 1;
      await sb.from('usage_tracking').upsert({
        user_id: userIdOrSession,
        month_year: currentMonthYear,
        count: newCount,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,month_year' });

      return { allowed: true, used: newCount, limit: MAX_LIMIT };
    } catch (dbErr) {
      console.warn("Supabase usage check warning (using memory fallback):", dbErr);
    }
  }

  // Memory fallback
  const record = inMemoryUsageStore.get(key) || { count: 0, monthYear: currentMonthYear };
  if (record.count >= MAX_LIMIT) {
    return { allowed: false, used: record.count, limit: MAX_LIMIT };
  }
  record.count += 1;
  inMemoryUsageStore.set(key, record);
  return { allowed: true, used: record.count, limit: MAX_LIMIT };
}

export async function getUsageStatus(userIdOrSession: string, env?: any): Promise<{ used: number; limit: number; monthYear: string; canAnalyze: boolean }> {
  const currentMonthYear = new Date().toISOString().slice(0, 7);
  const MAX_LIMIT = 5;
  const key = `${userIdOrSession || 'guest'}_${currentMonthYear}`;

  const sb = getServerSupabase(env);
  if (sb) {
    try {
      const { data } = await sb
        .from('usage_tracking')
        .select('count')
        .eq('user_id', userIdOrSession)
        .eq('month_year', currentMonthYear)
        .maybeSingle();

      const used = data?.count || 0;
      return {
        used,
        limit: MAX_LIMIT,
        monthYear: currentMonthYear,
        canAnalyze: used < MAX_LIMIT
      };
    } catch {
      // fallback to memory
    }
  }

  const record = inMemoryUsageStore.get(key) || { count: 0, monthYear: currentMonthYear };
  return {
    used: record.count,
    limit: MAX_LIMIT,
    monthYear: currentMonthYear,
    canAnalyze: record.count < MAX_LIMIT
  };
}

// Helper to clean markdown code blocks and parse JSON safely
function parseCleanJSON(rawText: string): any {
  if (!rawText) return null;
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const startIdx = cleaned.indexOf("{");
    const endIdx = cleaned.lastIndexOf("}");
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      const jsonSub = cleaned.substring(startIdx, endIdx + 1);
      return JSON.parse(jsonSub);
    }
    throw e;
  }
}

export async function handleGenerate7DayRoadmap(body: any, apiKey?: string) {
  const { creatorName, niche, audienceStage, mainGoal, currentBottleneck } = body || {};

  const name = (creatorName || "Creator").trim();
  const primaryNiche = niche || "Business";
  const stage = audienceStage || "Growing";
  const goal = mainGoal || "Increase Views";
  const problem = (currentBottleneck || "Low reach and viewer drop-off").trim();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are ELEVATE AI — an elite short-form video strategist and creator consultant (Instagram Reels, TikTok, YouTube Shorts).

==================================================
MISSION: 7-DAY CREATOR SPRINT ROADMAP
==================================================
Build a hyper-personalized, ultra-actionable 7-Day Sprint Roadmap for this creator.

CRITICAL MANDATES:
1. NO GENERIC CORPORATE FLUFF. Avoid textbook marketing jargon ("synergize touchpoints", "optimize value delivery streams", "execute stakeholder alignment").
2. SPEAK CREATOR LANGUAGE. Use modern, sharp, practical terms like "curiosity gap", "visual pattern interrupt", "contrarian angle", "1-word DM trigger", "retention drop-off point", "proof-point payoff".
3. ROOT-CAUSE THE BOTTLENECK: The entire 7-day roadmap MUST be built around actively diagnosing and solving the creator's exact stated problem ("${problem}") within their specific niche ("${primaryNiche}") and stage ("${stage}").
4. CONCRETE MICRO-ACTIONS: Every day MUST give ONE clear, practical, high-leverage action that a real creator can execute in under 45 minutes (e.g. not "Improve your content", but "Draft 3 contrasting hook lines for your next video: 1 curiosity-driven, 1 contrarian, 1 relatable").
5. PROGRESSIVE ARC:
   - Day 1: Bottleneck Root-Cause Deconstruction & Single-Angle Focus (define the 1 differentiated angle in ${primaryNiche} addressing ${problem}).
   - Day 2: Hook Architecture & Opening 3 Seconds (test 3 opening hook variations with zero fluff).
   - Day 3: Lean Scripting & Payoff Execution (record a 30-45s Reel with punchy pacing and immediate payoff).
   - Day 4: 24-Hour Retention Audit & Comment Signal Analysis (diagnose exactly where retention dipped).
   - Day 5: Framework Iteration & Visual Pattern Interrupt (re-shoot or adapt the top concept with an upgraded visual hook).
   - Day 6: Community Signal / Conversion Trigger (deploy a targeted interaction or 1-word DM trigger aligned with ${goal}).
   - Day 7: Sprint Synthesis & Weekly Execution System (lock in a repeatable 3-pillar content rhythm).

CREATOR PROFILE:
- Creator Name: ${name}
- Main Niche: ${primaryNiche}
- Audience Stage: ${stage}
- Primary Goal: ${goal}
- Biggest Bottleneck / Struggle: ${problem}

Return ONLY a JSON object matching this exact schema:
{
  "creatorName": "${name}",
  "niche": "${primaryNiche}",
  "audienceStage": "${stage}",
  "mainGoal": "${goal}",
  "currentBottleneck": "${problem}",
  "intro": "2-3 razor-sharp, personalized sentences that validate their current stage, directly address their specific bottleneck, and explain the strategic logic of this 7-day sprint.",
  "days": [
    {
      "day": 1,
      "focus": "Short punchy focus title with emoji (e.g. 🎯 Angle Reset & Core Problem)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 2,
      "focus": "Short punchy focus title with emoji (e.g. 🪝 Hook Psychology & 3s Drop-off Fix)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 3,
      "focus": "Short punchy focus title with emoji (e.g. 🎥 Lean Scripting & Zero-Fluff Delivery)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 4,
      "focus": "Short punchy focus title with emoji (e.g. 📊 24h Retention & Drop-off Diagnostic)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 5,
      "focus": "Short punchy focus title with emoji (e.g. 🔄 Pattern Interrupt & Framework Scale)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 6,
      "focus": "Short punchy focus title with emoji (e.g. ⚡ Conversion Trigger & Comment Engine)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 7,
      "focus": "Short punchy focus title with emoji (e.g. 🚀 Sprint Review & Weekly Content Engine)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      const parsed = parseCleanJSON(text);

      if (parsed && Array.isArray(parsed.days) && parsed.days.length === 7) {
        return {
          success: true,
          isAI: true,
          roadmap: parsed
        };
      }
    } catch (aiErr) {
      console.error("Gemini API call failed for 7-day roadmap, using fallback rule engine:", aiErr);
    }
  }

  // Fallback if AI Key is missing or API fails
  const fallbackRoadmap = generateRuleBased7DayRoadmap({
    creatorName: name,
    niche: primaryNiche,
    audienceStage: stage,
    mainGoal: goal,
    currentBottleneck: problem
  });

  return {
    success: true,
    isAI: false,
    roadmap: fallbackRoadmap
  };
}

export async function handleAnalyzeContent(body: any, apiKey?: string) {
  const { script, concept, caption, hook, cta, niche, targetAudience, creatorGoal } = body || {};

  const fullContent = [hook, script, concept, caption, cta].filter(Boolean).join("\n---\n");

  if (!fullContent || fullContent.trim().length === 0) {
    return {
      success: false,
      error: "Please enter a script, hook, or content concept to analyze."
    };
  }

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are ELEVATE AI — an elite social media content analyst and short-form video editor (Reels, TikTok, Shorts). You behave like an authentic, razor-sharp viral creator strategist who watches the actual script and says:
"I get what you're trying to do."
"Here's why it works."
"Here's where the viewer might lose interest."
"And here's how I'd improve YOUR version without changing what makes it yours."

==================================================
CRITICAL CORE MANDATE: DO NOT BE A GENERIC COPYWRITER
==================================================
You MUST NOT behave like a corporate copywriter or generic AI assistant.
NEVER:
- Make language overly professional or sanitized
- Strip out slang, internet language, profanity, or emojis (e.g. "bro", "💀", "POV", "literally", "gonna", "lmao", "nah")
- Remove sarcasm, deadpan delivery, or self-deprecating humor
- Turn jokes/memes into motivational advice or business lectures
- Turn personal, vulnerable stories into generic educational lists
- Turn conversational talking-head scripts into formal articles or essays
- Replace the creator's voice with a generic ChatGPT template
- Force every single script into HOOK -> 3 BULLET POINTS -> CTA. (That ruins comedy, memes, stories, and opinions!)

==================================================
THE REASONING & GENERATION PIPELINE
==================================================
You MUST follow this exact reasoning sequence before finalizing scores and rewrites:

STEP 1 — CONTENT DNA
Classify the true style and tone:
- STYLE: comedy | meme | sarcasm | storytelling | personal story | relatable | educational | motivational | controversial | opinion | commentary | reaction | entertainment | promotional | tutorial | lifestyle | personal experience | hybrid.
- TONE: casual | conversational | professional | sarcastic | funny | dark humor | playful | emotional | aggressive | motivational | deadpan | absurd | Gen-Z | wholesome | serious | vulnerable | confident.
(NEVER assume "professional" unless the input is clearly formal corporate communication).

STEP 2 — CREATOR VOICE EXTRACTION
Extract the creator's exact vocabulary, slang, emojis ("💀", "😭"), contractions ("gonna", "wanna", "ain't"), sentence length, conversational fragments, rhetorical questions, conversational fillers, and personality level.
TREAT THESE AS AUTHENTIC VOICE FEATURES — NEVER "CORRECT" THEM!
For example: "Bro thought he was HIM 💀" is NOT bad grammar; it is intentional internet comedy.

STEP 3 — DETECT ACTUAL INTENT
What is the creator trying to make the viewer feel or do?
- "I want the viewer to laugh"
- "I want the viewer to say 'that's literally me'"
- "I want the viewer to be shocked"
- "I want the viewer to learn something useful"
- "I want the viewer to feel emotionally validated or moved"
- "I want the viewer to argue in the comments"
- "I want the viewer to become curious and watch to the end"

STEP 4 — HUMOR & EMOTIONAL ANALYSIS
- If Comedy/Meme/Sarcasm: Analyze comedic timing, setup, punchline, absurdity, contrast, irony, and cultural references. Do NOT sanitize jokes!
  * BAD REWRITE: "Bro went to the gym for 3 days..." -> "Going to the gym develops discipline." (TOTAL FAILURE)
  * GOOD REWRITE: "Bro went to the gym for 3 days and started walking around like he's Batman 💀" -> "Bro went to the gym for THREE days and now he's walking around like Gotham personally called him 💀" (KEEPS JOKE, IMPROVES ESCALATION)
- If Storytelling/Emotional: Analyze vulnerability, tension, build-up, and realization.
  * BAD REWRITE: "I spent 2 years trying to grow on Instagram before realizing nobody cared..." -> "Here are 5 strategies to grow on Instagram." (TOTAL FAILURE)
  * GOOD REWRITE: "I spent two years trying to grow on Instagram before realizing something brutal: Nobody actually cared about my content. And honestly... I can't even blame them." (PRESERVED EMOTION)

STEP 5 — STRUCTURE DIAGNOSIS
Understand the natural structure:
- HOOK -> SETUP -> ESCALATION -> PUNCHLINE (Comedy)
- HOOK -> STORY -> CONFLICT -> REALIZATION -> PAYOFF (Story)
- QUESTION -> PROBLEM -> EXPLANATION -> SOLUTION (Educational)
- STATEMENT -> CONTRARIAN CLAIM -> PROOF -> CONCLUSION (Opinion)
Diagnose the REAL weakness (e.g. hook takes 2 seconds too long, punchline arrives too early/late, emotional payoff is undercut by sudden pitch, setup has 4 unnecessary words).
Do NOT invent fake problems if the script is already great.

STEP 6 — DYNAMIC SCORING (WEIGHTED BY FORMAT)
Rate each dimension (0.0 to 10.0) and calculate overallScore (0-100) dynamically:
- Comedy/POV: Humor, Retention, Relatability, Shareability dominate. Do NOT penalize for lacking educational steps!
- Story/Emotional: Emotional Impact, Retention, Curiosity, Payoff dominate.
- Educational/Tutorial: Value Density, Clarity, Retention, Saveability dominate.
- Opinion/Contrarian: Hook, Originality, Clarity, Comment Potential dominate.
- Promotional: Hook, Clarity, Trust, CTA dominate.
EVERY score explanation MUST directly quote or reference actual words/lines from the creator's input!

STEP 7 — THE IMPROVED SCRIPT: MINIMAL STRATEGIC EDITING
You are an EDITOR, NOT a ghostwriter. "Edit this creator", NOT "Write a new script about this topic".
- Apply the Minimal Editing Rule: Try to fix the script by changing only 10%–25% of the text.
- Choose internal improvement type:
  * Type A (Light Polish): Fix only 1-2 clunky words.
  * Type B (Hook Fix): Keep the rest identical, sharpen opening 1-2 lines.
  * Type C (Pacing Fix): Trim fluff while keeping voice.
  * Type D (Payoff Fix): Strengthen ending/punchline without changing joke or emotion.
  * Type E (Structure Fix): Reorder lines without rewriting voice.
  * Type F (Full Rewrite): ONLY if original structure is genuinely broken.
- NO PROFESSIONALIZATION: Never replace "you"->"creators", "bro"->"individual", "gonna"->"going to", "lol"->"humorous", "💀"->nothing, "crazy"->"remarkable".
- Two-Pass Self-Verification on the improved script:
  1. Would a real human creator actually say this in a Reel?
  2. Does this sound like an AI wrote it? (If yes, rewrite!)
  3. Does it still sound like the EXACT SAME CREATOR?
  4. Did I keep their joke, slang, story, and personality intact?

==================================================
CREATOR INPUT DETAILS:
==================================================
- Script / Main Content:
"""
${script || 'N/A'}
"""
- Optional Hook Override: ${hook || 'N/A'}
- Optional Concept: ${concept || 'N/A'}
- Optional Caption: ${caption || 'N/A'}
- Optional CTA: ${cta || 'N/A'}
- Niche: ${niche || 'General Creator'}
- Target Audience: ${targetAudience || 'General Instagram Viewers'}
- Primary Creator Goal: ${creatorGoal || 'Grow Followers & Reach'}

==================================================
OUTPUT FORMAT
==================================================
Return ONLY a valid JSON object matching this exact schema:
{
  "overallScore": 84,
  "summary": "1-2 sharp conversational sentences acknowledging what the creator is attempting to communicate and their specific vibe/style.",
  "scores": {
    "hook": { "score": 8.2, "explanation": "Direct feedback referencing creator's exact words and first 2-second hook dynamic.", "indicator": "🔥 Strong" },
    "retention": { "score": 7.5, "explanation": "Feedback referencing specific pacing, length, and drop-off points.", "indicator": "⚡ Moderate" },
    "value": { "score": 8.8, "explanation": "Feedback on entertainment value, actionable insight, or emotional payoff.", "indicator": "🔥 Strong" },
    "shareability": { "score": 8.5, "explanation": "Feedback on why target viewers would DM or share this specific idea.", "indicator": "🔥 Strong" },
    "saveability": { "score": 7.0, "explanation": "Feedback on save triggers, reference value, or bookmark appeal.", "indicator": "⚡ Moderate" },
    "emotionalImpact": { "score": 8.0, "explanation": "Feedback on humor landing, relatability, surprise, or emotional tension.", "indicator": "🔥 Strong" },
    "originality": { "score": 7.8, "explanation": "Feedback on unique angle vs tired creator clichés in this niche.", "indicator": "⚡ Moderate" },
    "clarity": { "score": 8.7, "explanation": "Feedback on mobile readability, flow, and sentence simplicity.", "indicator": "🔥 Strong" },
    "cta": { "score": 6.5, "explanation": "Feedback on call to action naturalness, comment trigger, or loop potential.", "indicator": "⚠️ Needs Work" },
    "trendAlignment": { "score": 8.3, "explanation": "Feedback on format fit with current Instagram Reels algorithms & user habits.", "indicator": "🔥 Strong" }
  },
  "strengths": [
    "🔥 Specific strength referencing actual script phrasing",
    "🔥 Specific strength referencing actual script phrasing",
    "🔥 Specific strength referencing actual script phrasing"
  ],
  "weaknesses": [
    "⚠️ Specific weakness referencing actual script phrasing",
    "⚠️ Specific weakness referencing actual script phrasing",
    "⚠️ Specific weakness referencing actual script phrasing"
  ],
  "verdict": "Brutally honest, encouraging, and human verdict from an expert social media strategist speaking directly to the creator.",
  "biggestChange": "ONE high-impact change telling the creator WHAT to change in their specific script, WHY, and HOW.",
  "hookSuggestions": [
    { "angle": "Curiosity", "hook": "Alternative hook strictly in creator's voice & vocabulary" },
    { "angle": "Contrarian", "hook": "Alternative hook strictly in creator's voice & vocabulary" },
    { "angle": "Emotional/Storytelling", "hook": "Alternative hook strictly in creator's voice & vocabulary" }
  ],
  "retentionFix": "Actionable pacing and structural advice specifically tailored to this script's flow.",
  "trendAnalysis": {
    "score": 8.3,
    "explanation": "Contextual trend fit analysis for this format on short-form video platforms."
  },
  "improvedVersion": "The improved version that preserves 80-90% of the creator's exact voice, slang, humor, emotion, and style while fixing the identified pacing or hook bottleneck!"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      const parsed = parseCleanJSON(text);

      if (parsed && typeof parsed === "object" && parsed.overallScore) {
        return {
          success: true,
          isAI: true,
          report: parsed
        };
      }
    } catch (aiErr) {
      console.error("Gemini API call for content analysis failed, using rule engine:", aiErr);
    }
  }

  // Fallback if AI Key is missing or API fails
  const fallbackReport = generateRuleBasedAnalysis({
    script: script || '',
    concept,
    caption,
    hook,
    cta,
    niche,
    targetAudience,
    creatorGoal
  });

  return {
    success: true,
    isAI: false,
    report: fallbackReport
  };
}

export async function handleAnalyzeReel(body: any, apiKey?: string, env?: any) {
  // 1. Validate request body
  if (!body || typeof body !== "object") {
    const err: any = new Error("Invalid request payload. Expected JSON object with video data.");
    err.statusCode = 400;
    throw err;
  }

  const {
    followers,
    averageViews,
    niche,
    targetAudience,
    fileName,
    fileSize,
    mimeType,
    durationSec,
    dimensions,
    aspectRatio,
    videoBase64,
    frames,
    userId,
    sessionId,
  } = body || {};

  // 2. Validate video presence & payload size
  const hasVideo = typeof videoBase64 === "string" && videoBase64.length > 0;
  const hasFrames = Array.isArray(frames) && frames.length > 0;

  if (!hasVideo && !hasFrames) {
    const noDataErr: any = new Error("No video data received for Reel analysis. A video file is required.");
    noDataErr.statusCode = 400;
    throw noDataErr;
  }

  // 3. Payload size check (80MB string safety cap)
  if (hasVideo && videoBase64.length > 80 * 1024 * 1024) {
    const payloadErr: any = new Error("Video payload exceeds maximum size limit (80MB). Please compress the video or upload a shorter clip.");
    payloadErr.statusCode = 413;
    throw payloadErr;
  }

  const cleanFileName = fileName ? String(fileName).slice(0, 100) : "uploaded_reel.mp4";
  const cleanFileSize = fileSize ? String(fileSize).slice(0, 20) : "unknown size";
  const effectiveUserId = userId || sessionId || "anon_" + Date.now();
  const safeSessionPrefix = typeof effectiveUserId === "string" ? effectiveUserId.slice(0, 12) : "anon";

  // 4. Safe metadata logging (NEVER log base64 data, API keys, or private auth headers)
  console.log(`[ELEVATE AI API] Reel Analysis Request: file="${cleanFileName}", size="${cleanFileSize}", duration=${durationSec || "unknown"}s, aspect=${aspectRatio || "9:16"}, frames=${Array.isArray(frames) ? frames.length : 0}, user="${safeSessionPrefix}"`);

  // 5. Check & increment monthly usage limit (5 free Reel analyses / month)
  const usageCheck = await checkAndIncrementUsage(effectiveUserId, env);
  if (!usageCheck.allowed) {
    console.warn(`[ELEVATE AI API] Usage limit exceeded for user/session ${safeSessionPrefix}: ${usageCheck.used}/${usageCheck.limit}`);
    const limitError: any = new Error(
      "You have reached your free monthly limit of 5 Reel analyses (5/5 used). Book a free strategy session or upgrade your tier for unlimited creator audits."
    );
    limitError.statusCode = 429;
    limitError.limitReached = true;
    limitError.used = usageCheck.used;
    limitError.limit = usageCheck.limit;
    throw limitError;
  }

  const cleanFollowers = String(followers || "10,000").trim().slice(0, 30);
  const cleanAvgViews = String(averageViews || "5,000").trim().slice(0, 30);
  const cleanNiche = String(niche || "Fitness").trim().slice(0, 50);
  const cleanAudience = String(targetAudience || "Target Audience in India").trim().slice(0, 100);

  // Helper to parse creator numbers (e.g. "25,000" or "8K" -> 25000 / 8000)
  const parseNum = (val: string): number => {
    if (!val) return 5000;
    const clean = val.toLowerCase().replace(/,/g, "").trim();
    if (clean.endsWith("m")) return (parseFloat(clean.replace("m", "")) || 5) * 1000000;
    if (clean.endsWith("k")) return (parseFloat(clean.replace("k", "")) || 5) * 1000;
    return parseInt(clean.replace(/[^0-9]/g, "")) || 5000;
  };

  const formatCount = (n: number): string => {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return n.toLocaleString("en-IN");
  };

  const avgViewsNum = parseNum(cleanAvgViews);
  const followersNum = parseNum(cleanFollowers);

  // 6. Verify GEMINI_API_KEY server-side configuration
  if (!apiKey) {
    console.error("[ELEVATE AI API ERROR] GEMINI_API_KEY is not configured on the server.");
    const keyErr: any = new Error("GEMINI_API_KEY is not configured on the server. Please check your environment variables or Settings panel.");
    keyErr.statusCode = 500;
    throw keyErr;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { "User-Agent": "aistudio-build" } }
  });

  const parts: any[] = [];

  // Ingest full video or keyframes into Gemini multimodal pipeline
  if (hasVideo) {
    const cleanVideoBase64 = String(videoBase64).replace(/^data:[a-zA-Z0-9/.-]+;base64,/, "");
    parts.push({
      inlineData: {
        mimeType: mimeType || "video/mp4",
        data: cleanVideoBase64
      }
    });
    parts.push({
      text: `[ATTACHED REEL VIDEO FILE: "${cleanFileName}" (${cleanFileSize}, duration: ${durationSec || 'unknown'}s, aspect ratio: ${aspectRatio || '9:16'})]`
    });
  }

  if (Array.isArray(frames) && frames.length > 0) {
    for (const frame of frames) {
      if (frame && frame.base64) {
        const cleanBase64 = String(frame.base64).replace(/^data:image\/[a-z]+;base64,/, "");
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanBase64
          }
        });
        parts.push({
          text: `[REEL KEYFRAME SNAPSHOT: "${frame.label || 'Frame'}" captured at timestamp ${frame.time || 0}s]`
        });
      }
    }
  }

  if (parts.length === 0) {
    const noDataErr: any = new Error("No valid video data could be extracted for Reel analysis.");
    noDataErr.statusCode = 400;
    throw noDataErr;
  }

  const promptText = `You are ELEVATE AI — an experienced Instagram Reels Content Strategist & Video Director inside Elevate OS.
You personally watched and listened to this uploaded Reel. You provide clear, encouraging, and razor-sharp feedback using natural creator language.

==================================================
MANDATORY STRATEGIST DIRECTIVES (EVIDENCE-FIRST)
==================================================
1. YOU PERSONALLY WATCHED AND LISTENED TO THIS REEL:
   - The uploaded video and audio stream are your EXCLUSIVE source of truth.
   - The creator must feel like an expert director sat down with them and reviewed their actual video.
   - Never give generic advice (e.g. NEVER say "Improve your hook" or "Improve pacing" without citing the exact detected moment).
   - Quote the creator's actual spoken words, describe their exact camera framing/movement, lighting, on-screen text, and audio cues detected in THIS Reel.
   - Before generating each recommendation, ask internally: "What EXACT thing in this Reel caused me to give this advice?"

2. REMOVE ALL TECHNICAL JARGON:
   - FORBIDDEN TERMS: Do NOT use "Stack Audit", "P0", "P1", "P2", "Priority Fix", "Forensic Analysis", "Content Diagnosis", "Technical Audit", "Performance Engineering", "Retention Architecture".
   - USE NATURAL CREATOR LANGUAGE: "What's Working", "What's Holding It Back", "The 3 Changes I'd Make", "Your Hook", "Your Pacing", "Your Audio", "Your Ending", "Try This Instead", "Your Better Version", "Before You Post".

3. NO LONG REEL TIMELINE DUMPS:
   - Do NOT output long 2-second timestamp breakdown tables. Use timestamps ONLY when they help pinpoint a specific problem or friction point (e.g. "At 0:03, the video stays on the same shot for too long").

4. CREATOR CONTEXT & BENCHMARKING:
   - Creator Profile: Niche = "${cleanNiche}", Followers = "${cleanFollowers}", Average Views = "${cleanAvgViews}" (${avgViewsNum.toLocaleString()} baseline), Target Audience = "${cleanAudience}" (IST timezone).
   - Realistic Performance Outlook: Compare this Reel against their baseline of ${avgViewsNum.toLocaleString()} views (Potential: "Above your normal performance" | "Around your normal performance" | "Below your normal performance").

==================================================
REQUIRED OUTPUT SCHEMA (JSON)
==================================================
Return ONLY a valid JSON object matching this exact schema:
{
  "id": "reel_${Date.now()}",
  "timestamp": ${Date.now()},
  "videoFileName": "${cleanFileName}",
  "videoFileSizeFormatted": "${cleanFileSize}",
  "durationFormatted": "${durationSec ? Math.floor(durationSec / 60) + ':' + (Math.floor(durationSec % 60) < 10 ? '0' : '') + Math.floor(durationSec % 60) : '0:25'}",
  "overallScore": 7.8,
  "verdict": "One clear, honest sentence summarizing this Reel's core opportunity (e.g., 'Strong premise with high value, but the visual doesn't back up the opening hook quickly enough').",
  
  "creatorScores": {
    "hook": { "score": 8, "explanation": "Your opening addresses the viewer directly, but visual proof is delayed by 1.5 seconds." },
    "pacing": { "score": 6, "explanation": "The middle section stays on the same camera angle for 4 seconds without cut or movement." },
    "value": { "score": 9, "explanation": "The actionable tip is practical, easy to grasp, and directly relevant to ${cleanNiche}." },
    "visuals": { "score": 7, "explanation": "Good lighting and clear subject, but on-screen text sits close to the bottom interface." },
    "audio": { "score": 8, "explanation": "Your voice delivery is crisp and clear with well-balanced background music." },
    "ending": { "score": 5, "explanation": "Ends abruptly without a conversation-starting question or loop trigger." }
  },

  "whatsWorking": [
    {
      "title": "Clear and immediate topic promise",
      "whatAiNoticed": "What the AI noticed: Quote or cite the exact visual or opening spoken words in 0-3s.",
      "whyItHelps": "Why it helps: Explains how this immediately signals value to viewers in ${cleanNiche}."
    },
    {
      "title": "Natural vocal presence & energy",
      "whatAiNoticed": "What the AI noticed: Specific audio/spoken observation from this video.",
      "whyItHelps": "Why it helps: Builds immediate creator rapport and authenticity."
    },
    {
      "title": "Practical and actionable payoff",
      "whatAiNoticed": "What the AI noticed: The specific takeaway or demonstration shown.",
      "whyItHelps": "Why it helps: Gives viewers a compelling reason to bookmark and share."
    }
  ],

  "whatsHoldingItBack": [
    {
      "title": "Visual delay on the opening promise",
      "whatAiNoticed": "What I noticed: At 0:02, you state the core problem but the visual stays stationary.",
      "whyItMatters": "Why it matters: Viewers need visual confirmation in under 2 seconds or they swipe away.",
      "timestamp": "0:00–0:03"
    },
    {
      "title": "Mid-video visual plateau",
      "whatAiNoticed": "What I noticed: A 4-second stretch with no cut, angle change, or overlay.",
      "whyItMatters": "Why it matters: Causes an attention dip during the explanation.",
      "timestamp": "0:06–0:10"
    },
    {
      "title": "Passive closing call to action",
      "whatAiNoticed": "What I noticed: Ending with a generic or abrupt closing.",
      "whyItMatters": "Why it matters: Misses the chance to trigger comment debates and boost algorithmic engagement.",
      "timestamp": "End of video"
    }
  ],

  "top3Changes": [
    {
      "number": 1,
      "title": "Show the problem immediately in the first frame",
      "whatToChange": "What I'd change: Replace the stationary intro with immediate visual evidence of what you're discussing.",
      "tryThis": "Try this: Quote the exact improved spoken line or opening hook to say.",
      "visualAndTextChange": "Visual edit: Cut directly to the action shot. Text: Place 3-word bold title at 40% screen height."
    },
    {
      "number": 2,
      "title": "Tighten the explanation with a quick B-roll cut",
      "whatToChange": "What I'd change: Break up the middle monologue with a punch-in or b-roll overlay.",
      "tryThis": "Try this: Trim 1.5 seconds of dead air and deliver the second tip without pausing.",
      "visualAndTextChange": "Visual edit: 1.15x zoom cut at the transition point to reset viewer attention."
    },
    {
      "number": 3,
      "title": "Swap the generic ending for a specific debate question",
      "whatToChange": "What I'd change: Replace 'Follow for more' with a question directly tied to the topic.",
      "tryThis": "Try this: End with a specific question relevant to this Reel's core insight.",
      "visualAndTextChange": "Visual edit: Hold the final takeaway card for 0.8s so the video loops seamlessly back to the start."
    }
  ],

  "betterVersion": {
    "newHook": "Exact rewritten hook line preserving the creator's voice and personality.",
    "bodyStructure": "Concise 2-part structure that delivers the core takeaway without fluff.",
    "betterEnding": "Engaging question or prompt that sparks comments and loops naturally.",
    "notes": "Why this version retains attention better while sounding 100% natural."
  },

  "audioAndEditing": {
    "voice": "Vocal tone is confident; pace is slightly fast at ~140 WPM with clear articulation.",
    "music": "Background track sits nicely under the voice without drowning out words.",
    "soundEffects": "Adding a subtle whoosh or pop on the key takeaway text would heighten retention.",
    "pauses": "Trim the 0.6s silence between point 1 and point 2.",
    "cutsAndTransitions": "Use a 1.1x punch-in cut midway to reset visual focus.",
    "captions": "Raise text overlay 40px higher so it is not obstructed by the Instagram audio tag."
  },

  "beforeYouPostChecklist": [
    "Fix the opening: Show the visual subject within the first 1.5 seconds",
    "Tighten the middle: Trim the 0.6s pause during the main explanation",
    "Raise the caption overlay so it sits well above the bottom navigation",
    "Replace the closing CTA with a direct question to drive comments",
    "Ensure the final frame transitions smoothly into the first frame for replay loops"
  ],

  "nextReelIdeas": [
    {
      "title": "Natural Part 2 / Follow-up Idea",
      "concept": "A direct companion Reel that builds on this topic (e.g., 'The only 2 exceptions to this rule').",
      "whyItWorksNext": "Captures the audience already interested in this Reel's core concept."
    },
    {
      "title": "Contrarian / Behind-the-Scenes Angle",
      "concept": "Show the alternative approach or how you personally implemented this solution.",
      "whyItWorksNext": "Deepens authority and trust within ${cleanNiche}."
    }
  ],

  "performanceOutlook": {
    "creatorBaseline": "${formatCount(avgViewsNum)} views",
    "potential": "Above your normal performance",
    "explanation": "With a tightened opening visual and the middle pacing trimmed, this topic has strong save and share dynamics to beat your baseline of ${formatCount(avgViewsNum)} views.",
    "formatNote": "This format works well in ${cleanNiche}. Opening with the demonstration before talking is currently driving high hold rates."
  },

  "analysisConfidence": "High",
  "analysisConfidenceReason": "Grounded in multimodal video and audio inspection",
  "creatorContext": {
    "followers": "${cleanFollowers}",
    "averageViews": "${cleanAvgViews}",
    "niche": "${cleanNiche}",
    "targetAudience": "${cleanAudience}"
  },
  "whatAiNoticed": [
    "Opening observation citing detected spoken words or visual gesture",
    "Lighting and framing observation from this video",
    "Pacing and cut timing observation from this video",
    "Audio delivery and music balance observation from this video"
  ],
  "timelineBreakdown": [],
  "performanceInsights": {
    "creatorAverage": "${formatCount(avgViewsNum)} views",
    "aiEstimatedRange": "${formatCount(Math.round(avgViewsNum * 1.1))} – ${formatCount(Math.round(avgViewsNum * 2.2))} views",
    "potentialUpside": "Up to ${formatCount(Math.round(avgViewsNum * 3.5))} views",
    "explanation": "Strong topic resonance in ${cleanNiche} with good delivery potential."
  },
  "contentDiagnosis": {
    "working": [
      {
        "category": "Hook & Value",
        "title": "Clear Topic Promise",
        "explanation": "The video establishes immediate value for the viewer.",
        "status": "positive",
        "microBadge": "👀 Topic Clarity"
      }
    ],
    "couldHurt": [
      {
        "category": "Retention & Pacing",
        "title": "Mid-Video Attention Dip",
        "explanation": "Pacing can be tightened to prevent viewer swiping.",
        "status": "warning",
        "microBadge": "⚠️ Pacing Friction"
      }
    ]
  },
  "beforeYouPost": [
    {
      "id": "rec_1",
      "number": "01",
      "title": "Tighten Opening Visual",
      "explanation": "Ensures viewer retention in the first 2 seconds.",
      "detectedIssue": "Slight visual delay on the promise.",
      "suggestedFix": "Cut straight to the action."
    }
  ],
  "postingIntelligence": {
    "bestDay": "Tuesday & Thursday",
    "bestTimeIST": "7:30 PM – 9:00 PM IST",
    "secondaryWindowIST": "12:45 PM – 2:00 PM IST",
    "reasoning": "Optimized for ${cleanAudience} active scrolling windows."
  },
  "trendSignals": {
    "nicheAlignment": { "label": "Niche Alignment", "score": "92%", "status": "strong", "summary": "Direct fit for ${cleanNiche} audience." },
    "topicRelevance": { "label": "Topic Relevance", "score": "88%", "status": "strong", "summary": "High curiosity trigger." },
    "contentSignals": { "label": "Format Signals", "score": "85%", "status": "strong", "summary": "Proven short-form structure." }
  },
  "summary": "1-2 sentence strategist verdict on this Reel's core strength and top change before posting."
}`;

  parts.push({ text: promptText });

  console.log(`[ELEVATE AI API] Calling Gemini 3.6 Flash for Reel analysis with ${parts.length} content parts...`);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [{ role: "user", parts }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const responseText = response.text || "";
    console.log(`[ELEVATE AI API] Gemini 3.6 Flash response received (${responseText.length} characters).`);

    const parsedData = parseCleanJSON(responseText);

    if (parsedData && parsedData.performanceInsights && parsedData.contentDiagnosis) {
      const finalResult = {
        ...parsedData,
        id: parsedData.id || "reel_" + Date.now(),
        timestamp: Date.now(),
        videoFileName: cleanFileName,
        videoFileSizeFormatted: cleanFileSize,
        analysisConfidence: parsedData.analysisConfidence || "High",
        analysisConfidenceReason: parsedData.analysisConfidenceReason || "Grounded in multimodal video and audio inspection",
        whatAiNoticed: Array.isArray(parsedData.whatAiNoticed) ? parsedData.whatAiNoticed : [],
        timelineBreakdown: Array.isArray(parsedData.timelineBreakdown) ? parsedData.timelineBreakdown : [],
        creatorContext: {
          followers: cleanFollowers,
          averageViews: cleanAvgViews,
          niche: cleanNiche,
          targetAudience: cleanAudience
        }
      };

      // Save to Supabase analyses table if configured
      const sb = getServerSupabase(env);
      if (sb) {
        Promise.resolve(
          sb.from('analyses').insert({
            id: finalResult.id,
            user_id: userId || null,
            session_id: effectiveUserId,
            video_filename: cleanFileName,
            video_file_size: cleanFileSize,
            niche: cleanNiche,
            estimated_range: finalResult.performanceInsights?.aiEstimatedRange || '',
            summary: finalResult.summary || '',
            creator_context: finalResult.creatorContext,
            result: finalResult,
            created_at: new Date().toISOString()
          })
        ).catch((err: any) => {
          console.warn('Supabase analyses table insert warning:', err?.message || err);
        });
      }

      console.log(`[ELEVATE AI API] Successfully processed and generated analysis for "${cleanFileName}".`);
      return {
        success: true,
        isAI: true,
        result: finalResult
      };
    }

    console.error("[ELEVATE AI API ERROR] Failed to parse structured JSON from Gemini response:", responseText.slice(0, 300));
    const parseErr: any = new Error("Unable to parse structured analysis from Gemini response. Please try again.");
    parseErr.statusCode = 500;
    throw parseErr;
  } catch (err: any) {
    if (err && err.statusCode) {
      throw err;
    }
    console.error("[ELEVATE AI API ERROR] Gemini generation failure:", err?.message || err);
    const apiError: any = new Error(`Gemini AI analysis failed: ${err?.message || "Internal generation error"}`);
    apiError.statusCode = 500;
    throw apiError;
  }
}

export async function handleDiagnose(body: any, apiKey?: string) {
  const { creatorName, niche, followers, mainGoal, currentBottleneck } = body || {};

  const name = creatorName || "Creator";
  const primaryNiche = niche || "Tech, AI & Software";
  const audienceScale = followers || "Early Stage — 0–5K";
  const primaryGoal = mainGoal || "Gain Views, Followers & Likes";
  const mainBottleneck = currentBottleneck || "Inconsistent growth and unclear positioning";

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the AI Creator Strategist inside Elevate OS.

Elevate OS helps creators turn views into a scalable brand, loyal community, and high-margin creator business.

Your job is to generate a simple, punchy, engaging, and hyper-personalized 3-step growth roadmap for an influencer/content creator. Keep tone energetic, modern, sharp, and easy to read in 20 seconds.

CREATOR INPUT:
Creator Name: ${name}
Primary Niche: ${primaryNiche}
Audience Scale: ${audienceScale}
Primary Goal: ${primaryGoal}
Current Bottleneck: ${mainBottleneck}

RULES FOR INFLUENCER-FRIENDLY COPY:
1. Make titles catch & punchy (e.g. "STEP 01: Profile & Hook Overhaul", "STEP 02: The Binge-Worthy Content Engine", "STEP 03: Monetization & Offer Unlock").
2. "whatToDo" must be 1-2 snappy sentences explaining the exact strategy in plain language.
3. Provide 3 direct, tactical bullet points in "actions" with clear verbs.
4. "why" should be a single compelling sentence explaining the psychology/algorithm reason.
5. "expectedOutcome" should highlight the exciting result (e.g., "2x profile-to-follower conversion rate", "Predictable incoming brand deal DMs").
6. Avoid dense corporate jargon. Speak like a top creator growth strategist.

Return ONLY a JSON object matching this exact schema:
{
  "creatorName": "${name}",
  "primaryNiche": "${primaryNiche}",
  "audienceScale": "${audienceScale}",
  "primaryGoal": "${primaryGoal}",
  "growthBottleneckDiagnosis": "1-2 snappy sentences diagnosing why they are currently stuck and what leverage point will unblock them.",
  "steps": [
    {
      "stepNumber": "STEP 01",
      "title": "Customized Step 1 Title",
      "whatToDo": "Clear, snappy explanation",
      "actions": ["Direct Action 1", "Direct Action 2", "Direct Action 3"],
      "why": "Punchy 1-sentence reason",
      "expectedOutcome": "Exciting 1-sentence outcome"
    },
    {
      "stepNumber": "STEP 02",
      "title": "Customized Step 2 Title",
      "whatToDo": "Clear, snappy explanation",
      "actions": ["Direct Action 1", "Direct Action 2", "Direct Action 3"],
      "why": "Punchy 1-sentence reason",
      "expectedOutcome": "Exciting 1-sentence outcome"
    },
    {
      "stepNumber": "STEP 03",
      "title": "Customized Step 3 Title",
      "whatToDo": "Clear, snappy explanation",
      "actions": ["Direct Action 1", "Direct Action 2", "Direct Action 3"],
      "why": "Punchy 1-sentence reason",
      "expectedOutcome": "Exciting 1-sentence outcome"
    }
  ],
  "elevateMove": "ONE high-impact, specific action step to execute in the next 7 days."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: systemInstruction,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);

      return {
        success: true,
        isAI: true,
        diagnosis: parsed
      };
    } catch (aiErr) {
      console.error("Gemini API call failed, using fallback rule engine:", aiErr);
    }
  }

  // Rule-based Fallback Generator if AI Key is absent or fails
  const fallbackDiagnosis = generateRuleBasedDiagnosis({
    creatorName: name,
    primaryNiche,
    audienceScale,
    primaryGoal,
    mainBottleneck
  });

  return {
    success: true,
    isAI: false,
    diagnosis: fallbackDiagnosis
  };
}

export async function handleBookStrategySession(body: any, envWebAppUrl?: string) {
  const { fullName, phoneNumber, instagramId, currentProblem, email } = body || {};

  if (!fullName || !phoneNumber || !instagramId || !currentProblem) {
    return { error: "Missing required fields", status: 400 };
  }

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const sheetPayload = {
    name: fullName,
    fullName: fullName,
    Name: fullName,
    email: email || "",
    Email: email || "",
    phone: phoneNumber,
    phoneNumber: phoneNumber,
    Phone: phoneNumber,
    instagram: instagramId,
    instagramId: instagramId,
    Instagram: instagramId,
    helpNeeded: currentProblem,
    currentProblem: currentProblem,
    bottleneck: currentProblem,
    Problem: currentProblem,
    timestamp: timestamp,
    Timestamp: timestamp
  };

  strategySubmissions.push(sheetPayload);
  console.log("Strategy Session Booking logged for Google Sheet:", sheetPayload);

  const webAppUrl = envWebAppUrl || process.env.GOOGLE_SHEET_WEB_APP_URL || "https://script.google.com/macros/s/AKfycbyyUmXiHTOFEWaxfQ2k36I6zlailBr4sxpQy1Q70QlUkI47MPeOow0BRZTsd_57G8b5/exec";

  if (webAppUrl) {
    try {
      await fetch(webAppUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(sheetPayload),
        redirect: "follow"
      });
    } catch (sheetErr) {
      console.error("Failed to forward to Google Sheet Web App (JSON):", sheetErr);
    }

    try {
      const formParams = new URLSearchParams();
      for (const [key, val] of Object.entries(sheetPayload)) {
        formParams.append(key, String(val ?? ""));
      }
      await fetch(webAppUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formParams.toString(),
        redirect: "follow"
      });
    } catch (formErr) {
      // Ignore secondary attempt
    }
  }

  return {
    success: true,
    message: "Successfully logged for strategy session",
    submission: sheetPayload
  };
}

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://elevateos.in/</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://elevateos.in/elevate-ai</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://elevateos.in/blueprint</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://elevateos.in/revenue</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateos.in/services</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateos.in/about</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

const ROBOTS_TXT = `User-agent: *
Allow: /

# Disallow internal API endpoints
Disallow: /api/

Sitemap: https://elevateos.in/sitemap.xml
`;

export function getStrategySubmissions() {
  return { submissions: strategySubmissions };
}

// Cloudflare Workers Fetch Handler
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Standard CORS Headers for Worker environment
    const corsHeaders: Record<string, string> = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-user-session-id",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Serve valid XML sitemap directly to avoid SPA rewrite
    if (url.pathname === "/sitemap.xml") {
      return new Response(SITEMAP_XML, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    // Serve robots.txt
    if (url.pathname === "/robots.txt") {
      return new Response(ROBOTS_TXT, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    // Health check endpoints for Worker / monitoring
    if ((url.pathname === "/api/health" || url.pathname === "/health") && request.method === "GET") {
      return Response.json({
        status: "ok",
        service: "elevateos-worker",
        model: "gemini-3.6-flash",
        timestamp: Date.now()
      }, { headers: corsHeaders });
    }

    // API endpoint for ELEVATE AI — 7-Day Creator Roadmap
    if (url.pathname === "/api/generate-roadmap" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const apiKey = env?.GEMINI_API_KEY || process.env?.GEMINI_API_KEY;
        const result = await handleGenerate7DayRoadmap(body, apiKey);
        return Response.json(result, { headers: corsHeaders });
      } catch (err: any) {
        return Response.json(
          { error: "Elevate AI couldn't build your roadmap right now. Please try again.", message: err?.message },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // API endpoint for ELEVATE AI Content Analyzer
    if (url.pathname === "/api/analyze-content" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const apiKey = env?.GEMINI_API_KEY || process.env?.GEMINI_API_KEY;
        const result = await handleAnalyzeContent(body, apiKey);
        return Response.json(result, { headers: corsHeaders });
      } catch (err: any) {
        return Response.json(
          { error: "Elevate AI couldn't analyze this content right now. Please try again.", message: err?.message },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // API endpoint for Reel Analyzer monthly usage tracking
    if (url.pathname === "/api/usage" && request.method === "GET") {
      try {
        const userId = url.searchParams.get("userId") || request.headers.get("x-user-session-id") || "guest";
        const usage = await getUsageStatus(userId, env);
        return Response.json(usage, { headers: corsHeaders });
      } catch (err: any) {
        return Response.json({ used: 0, limit: 5, monthYear: new Date().toISOString().slice(0, 7), canAnalyze: true }, { headers: corsHeaders });
      }
    }

    // API endpoint for ELEVATE AI Reel Analyzer (Part 1 / Part 2)
    if (url.pathname === "/api/analyze-reel" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const apiKey = env?.GEMINI_API_KEY || process.env?.GEMINI_API_KEY;
        const sessionId = request.headers.get("x-user-session-id") || body.sessionId;
        const result = await handleAnalyzeReel({ ...body, sessionId }, apiKey, env);
        return Response.json(result, { headers: corsHeaders });
      } catch (err: any) {
        const status = err?.statusCode || 500;
        return Response.json(
          {
            error: err?.message || "Elevate AI couldn't analyze this Reel right now. Please try again.",
            limitReached: Boolean(err?.limitReached),
            used: err?.used,
            limit: err?.limit,
          },
          { status, headers: corsHeaders }
        );
      }
    }

    // API endpoint for AI Creator OS Growth Audit & Strategic Diagnosis
    if (url.pathname === "/api/diagnose" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const apiKey = env?.GEMINI_API_KEY || process.env?.GEMINI_API_KEY;
        const result = await handleDiagnose(body, apiKey);
        return Response.json(result, { headers: corsHeaders });
      } catch (err: any) {
        return Response.json(
          { error: "Failed to generate diagnosis", message: err?.message || "Internal server error" },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // API endpoint for Free Strategy Session Google Sheets integration
    if (url.pathname === "/api/book-strategy-session" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const sheetUrl = env?.GOOGLE_SHEET_WEB_APP_URL || process.env?.GOOGLE_SHEET_WEB_APP_URL;
        const result = await handleBookStrategySession(body, sheetUrl);
        if ("error" in result && result.status) {
          return Response.json({ error: result.error }, { status: result.status, headers: corsHeaders });
        }
        return Response.json(result, { headers: corsHeaders });
      } catch (err: any) {
        return Response.json({ error: err?.message || "Internal server error" }, { status: 500, headers: corsHeaders });
      }
    }

    // API endpoint to retrieve logged strategy submissions
    if (url.pathname === "/api/strategy-submissions" && request.method === "GET") {
      return Response.json(getStrategySubmissions(), { headers: corsHeaders });
    }

    // Serve static assets through Cloudflare Workers Assets
    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return await env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }
};

// Node.js Express Server implementation for local development and Cloud Run containers
async function startServer() {
  const expressModule = await import("express");
  const express = expressModule.default;
  const pathModule = await import("path");
  const path = pathModule.default;

  const app = express();
  const PORT = 3000;

  // CORS middleware for Express
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-user-session-id");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Support up to 100mb base64 payloads for direct video Reel analysis
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: true, limit: "100mb" }));

  app.get(["/api/health", "/health"], (req, res) => {
    res.json({
      status: "ok",
      service: "elevateos-server",
      model: "gemini-3.6-flash",
      timestamp: Date.now()
    });
  });

  app.get("/api/usage", async (req, res) => {
    try {
      const userId = (req.query.userId as string) || (req.headers["x-user-session-id"] as string) || "guest";
      const usage = await getUsageStatus(userId);
      return res.json(usage);
    } catch {
      return res.json({ used: 0, limit: 5, monthYear: new Date().toISOString().slice(0, 7), canAnalyze: true });
    }
  });

  app.post("/api/generate-roadmap", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const result = await handleGenerate7DayRoadmap(req.body, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error("[EXPRESS API ERROR /api/generate-roadmap]:", error);
      return res.status(500).json({
        error: "Elevate AI couldn't build your roadmap right now. Please try again.",
        message: error?.message || "Internal server error"
      });
    }
  });

  app.post("/api/analyze-content", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const result = await handleAnalyzeContent(req.body, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error("[EXPRESS API ERROR /api/analyze-content]:", error);
      return res.status(500).json({
        error: "Elevate AI couldn't analyze this content right now. Please try again.",
        message: error?.message || "Internal server error"
      });
    }
  });

  app.post("/api/analyze-reel", async (req, res) => {
    console.log("[EXPRESS API] POST /api/analyze-reel received.");
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const sessionId = (req.headers["x-user-session-id"] as string) || req.body?.sessionId;
      const result = await handleAnalyzeReel({ ...req.body, sessionId }, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error("[EXPRESS API ERROR /api/analyze-reel]:", error?.message || error);
      const status = error?.statusCode || 500;
      return res.status(status).json({
        error: error?.message || "Elevate AI couldn't analyze this Reel right now. Please try again.",
        limitReached: Boolean(error?.limitReached),
        used: error?.used,
        limit: error?.limit,
      });
    }
  });

  app.post("/api/diagnose", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const result = await handleDiagnose(req.body, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error("[EXPRESS API ERROR /api/diagnose]:", error);
      return res.status(500).json({
        error: "Failed to generate diagnosis",
        message: error?.message || "Internal server error"
      });
    }
  });

  app.post("/api/book-strategy-session", async (req, res) => {
    try {
      const sheetUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;
      const result = await handleBookStrategySession(req.body, sheetUrl);
      if ("error" in result && result.status) {
        return res.status(result.status).json({ error: result.error });
      }
      return res.json(result);
    } catch (err: any) {
      console.error("[EXPRESS API ERROR /api/book-strategy-session]:", err);
      return res.status(500).json({ error: err?.message || "Internal server error" });
    }
  });

  app.get("/api/strategy-submissions", (req, res) => {
    res.json(getStrategySubmissions());
  });

  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.send(SITEMAP_XML);
  });

  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(ROBOTS_TXT);
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Start Node server if running directly in a Node.js CLI process
if (typeof process !== "undefined" && Array.isArray(process.argv) && process.argv.length > 0) {
  const isNode = typeof process.versions !== "undefined" && !!process.versions.node;
  const isWorkerEnv = typeof globalThis !== "undefined" && "WebSocketPair" in globalThis && !isNode;
  if (!isWorkerEnv) {
    startServer().catch((err) => {
      console.error("Failed to start Node server:", err);
    });
  }
}
